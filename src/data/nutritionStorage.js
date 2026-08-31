import { supabase } from '../lib/supabase';
import { isGuest } from '../context/AuthContext';
import { localId } from './localId';

// Helper: skip Supabase for guest users
function guestSkip(userId) { return isGuest(userId); }

const ENTRIES_PREFIX = 'nutrition_entries_';
const CUSTOM_MEALS_KEY = 'custom_meals';
const GOALS_KEY = 'nutrition_goals';
const PENDING_DELETES_KEY = 'nutrition_pending_deletes';

// Offline fehlgeschlagene Cloud-Deletes — sonst „ersteht" der Eintrag beim
// nächsten Hintergrund-Refresh aus der Cloud wieder auf
function getPendingDeletes() {
  try { return JSON.parse(localStorage.getItem(PENDING_DELETES_KEY) || '[]'); } catch { return []; }
}

function retryPendingDeletes(userId) {
  const pending = getPendingDeletes();
  if (pending.length === 0 || guestSkip(userId)) return;
  supabase
    .from('nutrition_entries')
    .delete()
    .in('id', pending)
    .eq('user_id', userId)
    .then(({ error }) => {
      if (!error) localStorage.removeItem(PENDING_DELETES_KEY);
    })
    .catch(() => {});
}

// ── Nutrition Entries ────────────────────────────────────────

export async function getNutritionEntries(userId, date) {
  const cacheKey = ENTRIES_PREFIX + date;
  retryPendingDeletes(userId);

  // localStorage first — instant
  const cached = localStorage.getItem(cacheKey);
  if (cached) {
    // Refresh from Supabase in background
    if (!guestSkip(userId)) {
      supabase
        .from('nutrition_entries')
        .select('*')
        .eq('user_id', userId)
        .eq('date', date)
        .order('created_at', { ascending: true })
        .then(({ data, error }) => {
          if (!error && data) {
            // Noch nicht gesyncte lokale Einträge behalten (kein stiller Verlust),
            // offline gelöschte Einträge NICHT wieder aufnehmen
            const pendingDeletes = getPendingDeletes();
            const fresh = data.filter((e) => !pendingDeletes.includes(e.id));
            const currentLocal = JSON.parse(localStorage.getItem(cacheKey) || '[]');
            const localOnly = currentLocal.filter((e) => String(e.id).startsWith('local_'));
            localStorage.setItem(cacheKey, JSON.stringify([...fresh, ...localOnly]));
          }
        })
        .catch(() => {});
    }
    return JSON.parse(cached);
  }

  // No cache → must await Supabase
  if (!guestSkip(userId)) {
    const { data, error } = await supabase
      .from('nutrition_entries')
      .select('*')
      .eq('user_id', userId)
      .eq('date', date)
      .order('created_at', { ascending: true });

    if (!error && data) {
      localStorage.setItem(cacheKey, JSON.stringify(data));
      return data;
    }
  }

  return [];
}

export async function saveNutritionEntry(userId, entry) {
  let data = null, error = null;

  if (!guestSkip(userId)) {
    ({ data, error } = await supabase
      .from('nutrition_entries')
      .insert({
        user_id: userId,
      date: entry.date,
      meal_slot: entry.meal_slot,
      food_name: entry.food_name,
      brand: entry.brand || null,
      serving_size: entry.serving_size,
      serving_unit: entry.serving_unit || 'g',
      calories: entry.calories,
      protein: entry.protein,
      carbs: entry.carbs,
      fat: entry.fat,
      fiber: entry.fiber || 0,
      sugar: entry.sugar || 0,
      source: entry.source || 'manual',
        source_id: entry.source_id || null,
      })
      .select()
      .single());
  }

  const cacheKey = ENTRIES_PREFIX + entry.date;
  const cached = JSON.parse(localStorage.getItem(cacheKey) || '[]');
  cached.push(data || { ...entry, id: localId() });
  localStorage.setItem(cacheKey, JSON.stringify(cached));

  return { data, error };
}

export async function updateNutritionEntry(userId, entryId, updates, date = null) {
  // localStorage first — funktioniert auch für Gäste und noch nicht gesyncte Einträge
  if (date) {
    const cacheKey = ENTRIES_PREFIX + date;
    const cached = JSON.parse(localStorage.getItem(cacheKey) || '[]');
    const idx = cached.findIndex((e) => e.id === entryId);
    if (idx >= 0) {
      cached[idx] = { ...cached[idx], ...updates };
      localStorage.setItem(cacheKey, JSON.stringify(cached));
    }
  }

  if (guestSkip(userId) || String(entryId).startsWith('local_')) {
    return { data: null, error: null };
  }

  const { data, error } = await supabase
    .from('nutrition_entries')
    .update(updates)
    .eq('id', entryId)
    .eq('user_id', userId)
    .select()
    .single();

  if (!error && data) {
    const cacheKey = ENTRIES_PREFIX + data.date;
    const cached = JSON.parse(localStorage.getItem(cacheKey) || '[]');
    const idx = cached.findIndex((e) => e.id === entryId);
    if (idx >= 0) {
      cached[idx] = data;
      localStorage.setItem(cacheKey, JSON.stringify(cached));
    }
  }

  return { data, error };
}

export async function deleteNutritionEntry(userId, entryId, date) {
  // localStorage first — funktioniert auch für Gäste und noch nicht gesyncte Einträge
  const cacheKey = ENTRIES_PREFIX + date;
  const cached = JSON.parse(localStorage.getItem(cacheKey) || '[]');
  localStorage.setItem(cacheKey, JSON.stringify(cached.filter((e) => e.id !== entryId)));

  if (guestSkip(userId) || String(entryId).startsWith('local_')) return;

  try {
    const { error } = await supabase
      .from('nutrition_entries')
      .delete()
      .eq('id', entryId)
      .eq('user_id', userId);
    if (error) throw error;
    // Gelegenheit nutzen, frühere fehlgeschlagene Deletes nachzuholen
    retryPendingDeletes(userId);
  } catch {
    // Offline/Fehler: Löschung merken und beim nächsten Refresh/Delete nachholen
    const pending = getPendingDeletes();
    if (!pending.includes(entryId)) pending.push(entryId);
    localStorage.setItem(PENDING_DELETES_KEY, JSON.stringify(pending));
  }
}

// ── Custom Meals ─────────────────────────────────────────────

export async function getCustomMeals(userId) {
  // localStorage first — instant
  let localData = [];
  try { localData = JSON.parse(localStorage.getItem(CUSTOM_MEALS_KEY) || '[]'); } catch {}

  if (localData.length > 0) {
    // Refresh from Supabase in background
    if (!guestSkip(userId)) {
      supabase
        .from('custom_meals')
        .select('*')
        .eq('user_id', userId)
        .is('deleted_at', null)
        .order('created_at', { ascending: false })
        .then(({ data, error }) => {
          if (!error && data) {
            // Noch nicht gesyncte lokale Meals behalten
            const currentLocal = JSON.parse(localStorage.getItem(CUSTOM_MEALS_KEY) || '[]');
            const localOnly = currentLocal.filter((m) => String(m.id).startsWith('local_'));
            localStorage.setItem(CUSTOM_MEALS_KEY, JSON.stringify([...localOnly, ...data]));
          }
        })
        .catch(() => {});
    }
    return localData;
  }

  // No cache → must await Supabase
  if (!guestSkip(userId)) {
    try {
      const { data, error } = await supabase
        .from('custom_meals')
        .select('*')
        .eq('user_id', userId)
        .is('deleted_at', null)
        .order('created_at', { ascending: false });

      if (!error && data) {
        localStorage.setItem(CUSTOM_MEALS_KEY, JSON.stringify(data));
        return data;
      }
    } catch (err) {
      console.error('Failed to load custom meals:', err);
    }
  }

  return localData;
}

export async function saveCustomMeal(userId, meal) {
  // localStorage first
  const cached = JSON.parse(localStorage.getItem(CUSTOM_MEALS_KEY) || '[]');
  const localEntry = { ...meal, id: localId() };
  cached.unshift(localEntry);
  localStorage.setItem(CUSTOM_MEALS_KEY, JSON.stringify(cached));

  if (!guestSkip(userId)) {
    try {
      const { data } = await supabase
        .from('custom_meals')
        .insert({ user_id: userId, name: meal.name, items: meal.items, total_calories: meal.total_calories, total_protein: meal.total_protein, total_carbs: meal.total_carbs, total_fat: meal.total_fat })
        .select().single();
      if (data) {
        const c = JSON.parse(localStorage.getItem(CUSTOM_MEALS_KEY) || '[]');
        const idx = c.findIndex((m) => m.id === localEntry.id);
        if (idx >= 0) { c[idx] = data; localStorage.setItem(CUSTOM_MEALS_KEY, JSON.stringify(c)); }
      }
    } catch (err) { console.error('Failed to save custom meal:', err); }
  }

  return { data: localEntry, error: null };
}

export async function updateCustomMeal(userId, mealId, meal) {
  // localStorage first
  const cached = JSON.parse(localStorage.getItem(CUSTOM_MEALS_KEY) || '[]');
  const idx = cached.findIndex((m) => m.id === mealId);
  if (idx >= 0) { cached[idx] = { ...cached[idx], ...meal }; localStorage.setItem(CUSTOM_MEALS_KEY, JSON.stringify(cached)); }

  if (!guestSkip(userId) && !mealId.startsWith('local_')) {
    try {
      await supabase.from('custom_meals')
        .update({ name: meal.name, items: meal.items, total_calories: meal.total_calories, total_protein: meal.total_protein, total_carbs: meal.total_carbs, total_fat: meal.total_fat })
        .eq('id', mealId).eq('user_id', userId);
    } catch (err) { console.error('Failed to update custom meal:', err); }
  }

  return { data: cached[idx], error: null };
}

export async function deleteCustomMeal(userId, mealId) {
  // localStorage first
  const cached = JSON.parse(localStorage.getItem(CUSTOM_MEALS_KEY) || '[]');
  localStorage.setItem(CUSTOM_MEALS_KEY, JSON.stringify(cached.filter((m) => m.id !== mealId)));

  if (!guestSkip(userId) && !mealId.startsWith('local_')) {
    try {
      await supabase.from('custom_meals').update({ deleted_at: new Date().toISOString() }).eq('id', mealId).eq('user_id', userId);
    } catch (err) { console.error('Failed to delete custom meal:', err); }
  }
}

export async function logCustomMeal(userId, meal, date, mealSlot) {
  const entries = meal.items.map((item) => ({
    user_id: userId,
    date,
    meal_slot: mealSlot,
    food_name: item.food_name,
    brand: item.brand || null,
    serving_size: item.serving_size,
    serving_unit: item.serving_unit || 'g',
    calories: item.calories,
    protein: item.protein,
    carbs: item.carbs,
    fat: item.fat,
    fiber: item.fiber || 0,
    sugar: item.sugar || 0,
    source: 'custom_meal',
    source_id: meal.id,
  }));

  // localStorage first — funktioniert auch für Gäste und offline
  const cacheKey = ENTRIES_PREFIX + date;
  const localEntries = entries.map((e) => ({ ...e, id: localId() }));
  const cached = JSON.parse(localStorage.getItem(cacheKey) || '[]');
  cached.push(...localEntries);
  localStorage.setItem(cacheKey, JSON.stringify(cached));

  if (guestSkip(userId)) {
    return { data: localEntries, error: null };
  }

  const { data, error } = await supabase
    .from('nutrition_entries')
    .insert(entries)
    .select();

  if (!error && data) {
    // Lokale Platzhalter durch Cloud-Zeilen ersetzen
    const localIds = new Set(localEntries.map((e) => e.id));
    const current = JSON.parse(localStorage.getItem(cacheKey) || '[]');
    localStorage.setItem(cacheKey, JSON.stringify([...current.filter((e) => !localIds.has(e.id)), ...data]));
  }

  return { data: data || localEntries, error };
}

// ── Nutrition Goals ──────────────────────────────────────────

export async function getNutritionGoals(userId) {
  // localStorage is the primary source of truth
  const cached = localStorage.getItem(GOALS_KEY);
  if (cached) {
    const cachedGoals = JSON.parse(cached);
    // Hintergrund-Abgleich: neuere Cloud-Ziele (z.B. vom 2. Gerät) übernehmen
    if (!guestSkip(userId)) {
      supabase
        .from('nutrition_goals')
        .select('*')
        .eq('user_id', userId)
        .single()
        .then(({ data }) => {
          if (data?.updated_at && (!cachedGoals.updated_at || data.updated_at > cachedGoals.updated_at)) {
            localStorage.setItem(GOALS_KEY, JSON.stringify(data));
          }
        })
        .catch(() => {});
    }
    return cachedGoals;
  }

  // No cache → first time → try Supabase
  if (!guestSkip(userId)) {
    const { data, error } = await supabase
      .from('nutrition_goals')
      .select('*')
      .eq('user_id', userId)
      .single();

    if (!error && data) {
      localStorage.setItem(GOALS_KEY, JSON.stringify(data));
      return data;
    }
  }

  return { calories: 2000, protein: 150, carbs: 250, fat: 70, fiber: 30, water_ml: 3000 };
}

export async function saveNutritionGoals(userId, goals) {
  // Save to localStorage FIRST — this is the source of truth
  const toCache = { ...goals, user_id: userId, updated_at: new Date().toISOString() };
  localStorage.setItem(GOALS_KEY, JSON.stringify(toCache));

  if (!guestSkip(userId)) {
    // Try Supabase — only save fields that exist in the table
    const { error } = await supabase
      .from('nutrition_goals')
      .upsert({
        user_id: userId,
        calories: goals.calories,
        protein: goals.protein,
        carbs: goals.carbs,
        fat: goals.fat,
        fiber: goals.fiber ?? 30,
        tdee: goals.tdee || null,
        water_ml: goals.water_ml || 3000,
        updated_at: new Date().toISOString(),
      }, { onConflict: 'user_id' });

    if (error) console.error('Failed to save goals to Supabase:', error);
  }

  return { data: toCache, error: null };
}

// ── Recent Foods ─────────────────────────────────────────────

const RECENT_FOODS_KEY = 'recent_foods';

export async function getRecentFoods(userId, limit = 10) {
  // localStorage first — instant
  const cached = localStorage.getItem(RECENT_FOODS_KEY);
  if (cached) {
    // Refresh in background
    if (!guestSkip(userId)) {
      supabase
        .from('nutrition_entries')
        .select('food_name, brand, serving_size, serving_unit, calories, protein, carbs, fat, source, source_id')
        .eq('user_id', userId)
        .order('created_at', { ascending: false })
        .limit(50)
        .then(({ data }) => {
          if (data) {
            const unique = _dedupeRecentFoods(data, limit);
            localStorage.setItem(RECENT_FOODS_KEY, JSON.stringify(unique));
          }
        })
        .catch(() => {});
    }
    try { return JSON.parse(cached).slice(0, limit); } catch { return []; }
  }

  // No cache → await Supabase
  let data = null;
  if (!guestSkip(userId)) {
    try {
      ({ data } = await supabase
        .from('nutrition_entries')
        .select('food_name, brand, serving_size, serving_unit, calories, protein, carbs, fat, source, source_id')
        .eq('user_id', userId)
        .order('created_at', { ascending: false })
        .limit(50));
    } catch (err) {
      console.error('Failed to load recent foods:', err);
    }
  }

  if (!data) return [];

  const unique = _dedupeRecentFoods(data, limit);
  localStorage.setItem(RECENT_FOODS_KEY, JSON.stringify(unique));
  return unique;
}

function _dedupeRecentFoods(data, limit) {
  const seen = new Set();
  const unique = [];
  for (const entry of data) {
    const key = entry.food_name + (entry.brand || '');
    if (!seen.has(key)) {
      seen.add(key);
      unique.push(entry);
      if (unique.length >= limit) break;
    }
  }
  return unique;
}

// ── Water Tracking ───────────────────────────────────────────

const WATER_PREFIX = 'water_';

export async function getWaterTotal(userId, date) {
  const cacheKey = WATER_PREFIX + date;

  // localStorage first (instant)
  const cached = localStorage.getItem(cacheKey);
  if (cached) return JSON.parse(cached);

  // No cache → try Supabase
  if (!guestSkip(userId)) {
    try {
      const { data, error } = await supabase
        .from('water_entries')
        .select('id, amount_ml')
        .eq('user_id', userId)
        .eq('date', date);

      if (!error && data) {
        const total = data.reduce((sum, e) => sum + e.amount_ml, 0);
        localStorage.setItem(cacheKey, JSON.stringify({ entries: data, total }));
        return { entries: data, total };
      }
    } catch (err) {
      console.error('Failed to load water from Supabase:', err);
    }
  }

  return { entries: [], total: 0 };
}

export async function addWater(userId, date, amountMl) {
  // Save to localStorage FIRST (always works)
  const cacheKey = WATER_PREFIX + date;
  const cached = JSON.parse(localStorage.getItem(cacheKey) || '{"entries":[],"total":0}');
  const localEntry = { id: localId(), amount_ml: amountMl };
  cached.entries.push(localEntry);
  cached.total += amountMl;
  localStorage.setItem(cacheKey, JSON.stringify(cached));

  // Then try Supabase
  if (!guestSkip(userId)) {
    try {
      await supabase
        .from('water_entries')
        .insert({ user_id: userId, date, amount_ml: amountMl });
    } catch (err) {
      console.error('Failed to save water to Supabase:', err);
    }
  }

  return { data: localEntry, error: null };
}

export async function removeLastWater(userId, date) {
  const cacheKey = WATER_PREFIX + date;
  const cached = JSON.parse(localStorage.getItem(cacheKey) || '{"entries":[],"total":0}');

  // Remove last entry from localStorage
  if (cached.entries.length > 0) {
    const last = cached.entries.pop();
    cached.total = Math.max(0, cached.total - (last.amount_ml || 0));
    localStorage.setItem(cacheKey, JSON.stringify(cached));

    // Try to delete from Supabase too
    if (!guestSkip(userId) && last.id && !last.id.startsWith('local_')) {
      try {
        await supabase.from('water_entries').delete().eq('id', last.id);
      } catch (err) {
        console.error('Failed to delete water from Supabase:', err);
      }
    }
  }
}

export async function removeWaterAmount(userId, date, amountMl) {
  const cacheKey = WATER_PREFIX + date;
  const cached = JSON.parse(localStorage.getItem(cacheKey) || '{"entries":[],"total":0}');

  // Ganze Einträge vom Ende entfernen, bis die gewünschte Menge gedeckt ist,
  // dann total aus den verbleibenden Einträgen NEU berechnen. total separat zu
  // dekrementieren driftet auseinander (z. B. 300 ml von einem 500-ml-Eintrag:
  // Eintrag ganz weg, aber total bliebe fälschlich bei 200).
  let remaining = amountMl;
  const toDeleteFromSupabase = [];
  while (remaining > 0 && cached.entries.length > 0) {
    const last = cached.entries.pop();
    remaining -= last.amount_ml || 0;
    if (last.id && !last.id.startsWith('local_')) {
      toDeleteFromSupabase.push(last.id);
    }
  }
  cached.total = cached.entries.reduce((sum, e) => sum + (e.amount_ml || 0), 0);

  localStorage.setItem(cacheKey, JSON.stringify(cached));

  // Try to delete from Supabase
  if (!guestSkip(userId) && toDeleteFromSupabase.length > 0) {
    try {
      for (const id of toDeleteFromSupabase) {
        await supabase.from('water_entries').delete().eq('id', id);
      }
    } catch (err) {
      console.error('Failed to delete water from Supabase:', err);
    }
  }
}
