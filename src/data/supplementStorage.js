import { supabase } from '../lib/supabase';
import { isGuest } from '../context/AuthContext';
import { parseLocalDate } from '../lib/dateUtils';
import { localId } from './localId';
import { saveNutritionEntry, deleteNutritionEntry } from './nutritionStorage';

function guestSkip(userId) { return isGuest(userId); }

const SUPPLEMENTS_KEY = 'supplements_list';
const LOGS_PREFIX = 'supplement_logs_';

// ── Nährwerte je Einnahme (optional) ────────────────────────────
// Ein Proteinshake hat 120 kcal, eine Vitamin-D-Kapsel praktisch nichts.
// Wer Werte einträgt, bekommt sie beim Abhaken als Ernährungseintrag
// (source 'supplement') in die Tagessumme; Abwählen nimmt ihn wieder heraus.
export const NAEHRWERT_FELDER = ['calories', 'protein', 'carbs', 'fat', 'fiber'];

function zahlOderNull(wert) {
  if (wert === '' || wert === null || wert === undefined) return null;
  const n = parseFloat(String(wert).replace(',', '.'));
  return Number.isFinite(n) && n >= 0 ? n : null;
}

export function naehrwerteBereinigen(quelle = {}) {
  return Object.fromEntries(NAEHRWERT_FELDER.map((f) => [f, zahlOderNull(quelle[f])]));
}

// Hat das Supplement irgendeinen Wert über 0? Nur dann entsteht ein Eintrag.
export function hatNaehrwerte(supplement) {
  return NAEHRWERT_FELDER.some((f) => (supplement?.[f] || 0) > 0);
}

// Verknüpfung Eintrag ↔ Einnahme. Das Datum steckt schon im Eintrag selbst.
export function supplementQuelle(supplementId, timeSlot) {
  return `supp:${supplementId}:${timeSlot}`;
}

// ── Supplements CRUD ────────────────────────────────────────────

export async function getSupplements(userId) {
  // localStorage first — instant
  const cached = localStorage.getItem(SUPPLEMENTS_KEY);
  if (cached) {
    if (!guestSkip(userId)) {
      supabase
        .from('supplements')
        .select('*')
        .eq('user_id', userId)
        .is('deleted_at', null)
        .order('created_at', { ascending: true })
        .then(({ data, error }) => {
          if (!error && data) {
            // Noch nicht gesyncte lokale Supplements behalten
            const currentLocal = JSON.parse(localStorage.getItem(SUPPLEMENTS_KEY) || '[]');
            const localOnly = currentLocal.filter((s) => String(s.id).startsWith('local_'));
            localStorage.setItem(SUPPLEMENTS_KEY, JSON.stringify([...data, ...localOnly]));
          }
        })
        .catch(() => {});
    }
    try { return JSON.parse(cached); } catch { return []; }
  }

  // No cache → must await Supabase
  if (!guestSkip(userId)) {
    try {
      const { data, error } = await supabase
        .from('supplements')
        .select('*')
        .eq('user_id', userId)
        .is('deleted_at', null)
        .order('created_at', { ascending: true });

      if (!error && data) {
        localStorage.setItem(SUPPLEMENTS_KEY, JSON.stringify(data));
        return data;
      }
    } catch (err) {
      console.error('Failed to load supplements:', err);
    }
  }

  return [];
}

export async function saveSupplement(userId, supplement) {
  const entry = {
    user_id: userId,
    name: supplement.name,
    brand: supplement.brand || null,
    form: supplement.form || 'tablet',
    dosage_amount: supplement.dosage_amount || 1,
    dosage_unit: supplement.dosage_unit || 'Stück',
    notes: supplement.notes || '',
    barcode: supplement.barcode || null,
    schedule: supplement.schedule || {},
    ...naehrwerteBereinigen(supplement),
  };

  // localStorage first
  const cached = JSON.parse(localStorage.getItem(SUPPLEMENTS_KEY) || '[]');
  const localEntry = { ...entry, id: localId(), created_at: new Date().toISOString() };
  cached.push(localEntry);
  localStorage.setItem(SUPPLEMENTS_KEY, JSON.stringify(cached));

  if (!guestSkip(userId)) {
    try {
      const { data, error } = await supabase
        .from('supplements')
        .insert(entry)
        .select()
        .single();

      if (!error && data) {
        // Replace local entry with Supabase entry
        const updated = JSON.parse(localStorage.getItem(SUPPLEMENTS_KEY) || '[]');
        const idx = updated.findIndex((s) => s.id === localEntry.id);
        if (idx >= 0) {
          updated[idx] = data;
          localStorage.setItem(SUPPLEMENTS_KEY, JSON.stringify(updated));
        }
        return { data, error: null };
      }
    } catch (err) {
      console.error('Failed to save supplement to Supabase:', err);
    }
  }

  return { data: localEntry, error: null };
}

export async function updateSupplement(userId, supplementId, updates) {
  // localStorage first
  const cached = JSON.parse(localStorage.getItem(SUPPLEMENTS_KEY) || '[]');
  const idx = cached.findIndex((s) => s.id === supplementId);
  if (idx >= 0) {
    cached[idx] = { ...cached[idx], ...updates };
    localStorage.setItem(SUPPLEMENTS_KEY, JSON.stringify(cached));
  }

  if (!guestSkip(userId) && !supplementId.startsWith('local_')) {
    try {
      await supabase
        .from('supplements')
        .update({
          name: updates.name,
          brand: updates.brand || null,
          form: updates.form,
          dosage_amount: updates.dosage_amount,
          dosage_unit: updates.dosage_unit,
          notes: updates.notes || '',
          barcode: updates.barcode || null,
          schedule: updates.schedule || {},
          ...naehrwerteBereinigen(updates),
        })
        .eq('id', supplementId)
        .eq('user_id', userId);
    } catch (err) {
      console.error('Failed to update supplement:', err);
    }
  }

  return { data: cached[idx], error: null };
}

export async function deleteSupplement(userId, supplementId) {
  // localStorage first
  const cached = JSON.parse(localStorage.getItem(SUPPLEMENTS_KEY) || '[]');
  localStorage.setItem(SUPPLEMENTS_KEY, JSON.stringify(cached.filter((s) => s.id !== supplementId)));

  if (!guestSkip(userId) && !supplementId.startsWith('local_')) {
    try {
      await supabase
        .from('supplements')
        .update({ deleted_at: new Date().toISOString() })
        .eq('id', supplementId)
        .eq('user_id', userId);
    } catch (err) {
      console.error('Failed to delete supplement:', err);
    }
  }
}

// ── Supplement Logs (Einnahme-Tracking) ─────────────────────────

export async function getSupplementLogs(userId, date) {
  const cacheKey = LOGS_PREFIX + date;

  // localStorage first — instant
  const cached = localStorage.getItem(cacheKey);
  if (cached) {
    if (!guestSkip(userId)) {
      supabase
        .from('supplement_logs')
        .select('*')
        .eq('user_id', userId)
        .eq('date', date)
        .then(({ data, error }) => {
          if (!error && data) {
            // Noch nicht gesyncte lokale Logs behalten
            const currentLocal = JSON.parse(localStorage.getItem(cacheKey) || '[]');
            const localOnly = currentLocal.filter((l) => String(l.id).startsWith('local_'));
            localStorage.setItem(cacheKey, JSON.stringify([...data, ...localOnly]));
          }
        })
        .catch(() => {});
    }
    try { return JSON.parse(cached); } catch { return []; }
  }

  // No cache → must await Supabase
  if (!guestSkip(userId)) {
    try {
      const { data, error } = await supabase
        .from('supplement_logs')
        .select('*')
        .eq('user_id', userId)
        .eq('date', date);

      if (!error && data) {
        localStorage.setItem(cacheKey, JSON.stringify(data));
        return data;
      }
    } catch (err) {
      console.error('Failed to load supplement logs:', err);
    }
  }

  return [];
}

export async function logSupplementTaken(userId, supplementId, date, timeSlot) {
  const cacheKey = LOGS_PREFIX + date;
  const cached = JSON.parse(localStorage.getItem(cacheKey) || '[]');

  // Check if already logged
  const existing = cached.find(
    (l) => l.supplement_id === supplementId && l.time_slot === timeSlot
  );
  if (existing) return { data: existing, error: null };

  const localLog = {
    id: localId(),
    user_id: userId,
    supplement_id: supplementId,
    date,
    time_slot: timeSlot,
    taken_at: new Date().toISOString(),
  };

  cached.push(localLog);
  localStorage.setItem(cacheKey, JSON.stringify(cached));

  await naehrwerteEintragen(userId, supplementId, date, timeSlot);

  if (!guestSkip(userId)) {
    try {
      const { data, error } = await supabase
        .from('supplement_logs')
        .upsert({
          user_id: userId,
          supplement_id: supplementId,
          date,
          time_slot: timeSlot,
        }, { onConflict: 'user_id,supplement_id,date,time_slot' })
        .select()
        .single();

      if (!error && data) {
        const updated = JSON.parse(localStorage.getItem(cacheKey) || '[]');
        const idx = updated.findIndex((l) => l.id === localLog.id);
        if (idx >= 0) {
          updated[idx] = data;
          localStorage.setItem(cacheKey, JSON.stringify(updated));
        }
      }
    } catch (err) {
      console.error('Failed to log supplement:', err);
    }
  }

  return { data: localLog, error: null };
}

export async function unlogSupplementTaken(userId, supplementId, date, timeSlot) {
  const cacheKey = LOGS_PREFIX + date;
  const cached = JSON.parse(localStorage.getItem(cacheKey) || '[]');

  const entry = cached.find(
    (l) => l.supplement_id === supplementId && l.time_slot === timeSlot
  );

  localStorage.setItem(
    cacheKey,
    JSON.stringify(cached.filter((l) => !(l.supplement_id === supplementId && l.time_slot === timeSlot)))
  );

  await naehrwerteAustragen(userId, supplementId, date, timeSlot);

  if (!guestSkip(userId) && entry && entry.id && !entry.id.startsWith('local_')) {
    try {
      await supabase
        .from('supplement_logs')
        .delete()
        .eq('id', entry.id);
    } catch (err) {
      console.error('Failed to unlog supplement:', err);
    }
  }
}

function supplementEintraege(date, supplementId, timeSlot) {
  const quelle = supplementQuelle(supplementId, timeSlot);
  const eintraege = JSON.parse(localStorage.getItem('nutrition_entries_' + date) || '[]');
  return eintraege.filter((e) => e.source === 'supplement' && e.source_id === quelle);
}

async function naehrwerteEintragen(userId, supplementId, date, timeSlot) {
  const liste = JSON.parse(localStorage.getItem(SUPPLEMENTS_KEY) || '[]');
  const supp = liste.find((s) => s.id === supplementId);
  if (!hatNaehrwerte(supp)) return;
  // Schon eingetragen (z. B. Doppeltipp)? Dann nicht noch einmal zählen.
  if (supplementEintraege(date, supplementId, timeSlot).length) return;
  try {
    await saveNutritionEntry(userId, {
      date,
      meal_slot: 'snack',
      food_name: supp.name,
      brand: supp.brand || null,
      serving_size: 1,
      serving_unit: 'portion',
      calories: supp.calories || 0,
      protein: supp.protein || 0,
      carbs: supp.carbs || 0,
      fat: supp.fat || 0,
      fiber: supp.fiber || 0,
      source: 'supplement',
      source_id: supplementQuelle(supplementId, timeSlot),
    });
  } catch (err) {
    console.error('Supplement-Nährwerte nicht eingetragen:', err);
  }
}

async function naehrwerteAustragen(userId, supplementId, date, timeSlot) {
  for (const e of supplementEintraege(date, supplementId, timeSlot)) {
    try {
      await deleteNutritionEntry(userId, e.id, date);
    } catch (err) {
      console.error('Supplement-Nährwerte nicht ausgetragen:', err);
    }
  }
}

// ── Helpers ─────────────────────────────────────────────────────

const DAY_KEYS = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];

export function getTodayScheduledSupplements(supplements, date) {
  const dayOfWeek = DAY_KEYS[parseLocalDate(date).getDay()];
  return supplements
    .filter((s) => {
      const schedule = s.schedule || {};
      const daySlots = schedule[dayOfWeek];
      return daySlots && daySlots.length > 0;
    })
    .map((s) => ({
      ...s,
      todaySlots: s.schedule[dayOfWeek],
    }));
}

export function getSupplementProgress(scheduledSupplements, logs) {
  let total = 0;
  let taken = 0;

  for (const supp of scheduledSupplements) {
    for (const slot of supp.todaySlots) {
      total++;
      if (logs.some((l) => l.supplement_id === supp.id && l.time_slot === slot)) {
        taken++;
      }
    }
  }

  return { total, taken, percentage: total > 0 ? Math.round((taken / total) * 100) : 0 };
}
