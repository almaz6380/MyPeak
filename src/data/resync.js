import { supabase } from '../lib/supabase';
import { isGuest } from '../context/AuthContext';
import { GUEST_XP_KEY, calculateLevel } from './socialStorage';

// ── Zentraler Sync: lädt alle noch nicht synchronisierten (local_) Einträge
// in die Cloud. Deckt zwei Fälle ab:
//   1. Gast registriert sich → alle Gast-Daten werden übernommen
//   2. Ein Cloud-Write ist fehlgeschlagen (offline etc.) → Retry beim
//      nächsten App-Start bzw. sobald die Verbindung zurückkommt
// Erfolgreich hochgeladene local_-Einträge werden durch die Cloud-Zeilen
// ersetzt (keine Duplikate mehr nach Gast-Registrierung).

const isLocal = (id) => String(id).startsWith('local_');

let syncRunning = false;

export async function syncLocalDataToCloud(userId) {
  if (!userId || isGuest(userId) || syncRunning) return;
  syncRunning = true;
  try {
    await syncWorkouts(userId);
    await syncCustomPlans(userId);
    await syncWeeklySchedules(userId);
    await syncCustomExercises(userId);
    // Supplements VOR den Ernährungseinträgen: Ein abgehaktes Supplement mit
    // Nährwerten trägt seine Kennung in source_id, die hier erst auf die
    // Cloud-Kennung umgeschrieben wird.
    await syncSupplements(userId);
    await syncNutritionEntries(userId);
    await syncCustomMeals(userId);
    await syncWater(userId);
    await syncWeight(userId);
    await syncKeyedUpserts(userId);
    await syncGastXP(userId);
  } catch (err) {
    console.error('Cloud-Sync fehlgeschlagen (wird beim nächsten Start erneut versucht):', err);
  } finally {
    syncRunning = false;
  }
}

// Sync-Trigger, sobald die Internetverbindung zurückkommt
export function registerOnlineSync() {
  window.addEventListener('online', () => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) syncLocalDataToCloud(session.user.id);
    }).catch(() => {});
  });
}

// Gast-XP/Streak ins Konto übernehmen. Zusammengeführt wird großzügig für den
// Nutzer: mehr XP gewinnt, der Streak kommt aus dem jüngeren Trainingstag.
// Läuft auch bei einem Bestandskonto, das sich nach einer Gastsitzung anmeldet.
async function syncGastXP(userId) {
  const gast = readJson(GUEST_XP_KEY, null);
  if (!gast) return;

  const { data: konto, error } = await supabase
    .from('user_xp')
    .select('*')
    .eq('user_id', userId)
    .maybeSingle();
  if (error) return;

  const k = konto || {};
  const totalXP = Math.max(k.total_xp || 0, gast.total_xp || 0);
  const gastJuenger = (gast.last_workout_date || '') > (k.last_workout_date || '');
  const zeile = {
    user_id: userId,
    total_xp: totalXP,
    level: calculateLevel(totalXP).level,
    streak_days: gastJuenger ? (gast.streak_days || 0) : (k.streak_days || 0),
    last_workout_date: gastJuenger ? gast.last_workout_date : (k.last_workout_date ?? null),
    updated_at: new Date().toISOString(),
  };
  const { error: fehler } = await supabase.from('user_xp').upsert(zeile);
  if (fehler) return;

  localStorage.setItem('user_xp', JSON.stringify(zeile));
  localStorage.removeItem(GUEST_XP_KEY);
}

function readJson(key, fallback) {
  try { return JSON.parse(localStorage.getItem(key)) ?? fallback; } catch { return fallback; }
}

function keysWithPrefix(prefix) {
  return Object.keys(localStorage).filter((k) => k.startsWith(prefix));
}

async function syncWorkouts(userId) {
  const cached = readJson('workouts', []);
  const locals = cached.filter((w) => isLocal(w.id));
  if (!locals.length) return;

  // type mitnehmen: ohne ihn wird ein Gast-Cardio/HIIT-Workout nach der
  // Registrierung zum Krafttraining (Verlauf, PRs, Heatmap).
  const rows = locals.map((w) => ({ user_id: userId, date: w.date, duration: w.duration, type: w.type ?? null, exercises: w.exercises }));
  const { data, error } = await supabase.from('workouts').insert(rows).select();
  if (error || !data) return;

  const localIds = new Set(locals.map((w) => w.id));
  const current = readJson('workouts', []).filter((w) => !localIds.has(w.id));
  const cloudRows = data.map((row) => ({ id: row.id, date: row.date, duration: row.duration, type: row.type ?? undefined, exercises: row.exercises }));
  localStorage.setItem('workouts', JSON.stringify([...cloudRows, ...current]));
}

async function syncCustomPlans(userId) {
  const cached = readJson('customPlans', []);
  const locals = cached.filter((p) => isLocal(p.id));
  if (!locals.length) return;

  const rows = locals.map((p) => ({ user_id: userId, name: p.name, days: p.days }));
  const { data, error } = await supabase.from('custom_plans').insert(rows).select();
  if (error || !data) return;

  const localIds = new Set(locals.map((p) => p.id));
  const current = readJson('customPlans', []).filter((p) => !localIds.has(p.id));
  const cloudRows = data.map((row) => ({ id: row.id, name: row.name, days: row.days }));
  localStorage.setItem('customPlans', JSON.stringify([...cloudRows, ...current]));
}

async function syncWeeklySchedules(userId) {
  const cached = readJson('weekly_schedules', []);
  const locals = cached.filter((s) => isLocal(s.id));
  if (!locals.length) return;

  // Bringt ein lokaler Plan is_active mit, zuerst die Cloud-Pläne des Kontos
  // deaktivieren — sonst stehen nach dem Merge zwei aktive Zeilen in der Tabelle
  // und getActiveSchedule wird nichtdeterministisch.
  if (locals.some((s) => s.is_active)) {
    const { error } = await supabase
      .from('weekly_schedules')
      .update({ is_active: false })
      .eq('user_id', userId);
    if (error) return;
  }

  const rows = locals.map((s) => ({
    user_id: userId,
    name: s.name,
    sessions_per_week: s.sessions_per_week,
    days: s.days,
    is_active: !!s.is_active,
  }));
  const { data, error } = await supabase.from('weekly_schedules').insert(rows).select();
  if (error || !data) return;

  const localIds = new Set(locals.map((s) => s.id));
  const current = readJson('weekly_schedules', []).filter((s) => !localIds.has(s.id));
  localStorage.setItem('weekly_schedules', JSON.stringify([...data, ...current]));
}

async function syncCustomExercises(userId) {
  // Gast-Einträge haben kein user_id-Feld (kamen nie aus der Cloud)
  const cached = readJson('custom_exercises', []);
  const locals = cached.filter((e) => !e.user_id || isGuest(e.user_id));
  if (!locals.length) return;

  const rows = locals.map((e) => ({
    user_id: userId,
    exercise_id: e.exercise_id || e.id,
    name: e.name,
    muscle_group: e.muscle_group || e.muscleGroup || null,
    equipment: e.equipment || null,
  }));
  await supabase.from('custom_exercises').upsert(rows, { onConflict: 'user_id,exercise_id' });
}

const ENTRY_FIELDS = ['date', 'meal_slot', 'food_name', 'brand', 'serving_size', 'serving_unit', 'calories', 'protein', 'carbs', 'fat', 'fiber', 'sugar', 'source', 'source_id'];

async function syncNutritionEntries(userId) {
  for (const key of keysWithPrefix('nutrition_entries_')) {
    const date = key.slice('nutrition_entries_'.length);
    const cached = readJson(key, []);
    const locals = cached.filter((e) => isLocal(e.id));
    if (!locals.length) continue;

    const rows = locals.map((e) => {
      const row = { user_id: userId, date };
      for (const f of ENTRY_FIELDS) if (e[f] !== undefined && f !== 'date') row[f] = e[f];
      return row;
    });
    const { data, error } = await supabase.from('nutrition_entries').insert(rows).select();
    if (error || !data) continue;

    const localIds = new Set(locals.map((e) => e.id));
    const current = readJson(key, []).filter((e) => !localIds.has(e.id));
    localStorage.setItem(key, JSON.stringify([...current, ...data]));
  }
}

async function syncCustomMeals(userId) {
  const cached = readJson('custom_meals', []);
  const locals = cached.filter((m) => isLocal(m.id));
  if (!locals.length) return;

  const rows = locals.map((m) => ({
    user_id: userId, name: m.name, items: m.items,
    total_calories: m.total_calories, total_protein: m.total_protein,
    total_carbs: m.total_carbs, total_fat: m.total_fat,
  }));
  const { data, error } = await supabase.from('custom_meals').insert(rows).select();
  if (error || !data) return;

  const localIds = new Set(locals.map((m) => m.id));
  const current = readJson('custom_meals', []).filter((m) => !localIds.has(m.id));
  localStorage.setItem('custom_meals', JSON.stringify([...data, ...current]));
}

async function syncWater(userId) {
  for (const key of keysWithPrefix('water_')) {
    const date = key.slice('water_'.length);
    const cached = readJson(key, { entries: [], total: 0 });
    const locals = (cached.entries || []).filter((e) => isLocal(e.id));
    if (!locals.length) continue;

    const rows = locals.map((e) => ({ user_id: userId, date, amount_ml: e.amount_ml }));
    const { data, error } = await supabase.from('water_entries').insert(rows).select();
    if (error || !data) continue;

    const current = readJson(key, { entries: [], total: 0 });
    let di = 0;
    current.entries = (current.entries || []).map((e) => (isLocal(e.id) && di < data.length ? data[di++] : e));
    localStorage.setItem(key, JSON.stringify(current));
  }
}

async function syncWeight(userId) {
  const cached = readJson('weight_entries', []);
  const locals = cached.filter((e) => isLocal(e.id));
  if (!locals.length) return;

  const rows = locals.map((e) => ({ user_id: userId, date: e.date, weight_kg: e.weight_kg }));
  const { data, error } = await supabase
    .from('weight_entries')
    .upsert(rows, { onConflict: 'user_id,date' })
    .select();
  if (error || !data) return;

  const current = readJson('weight_entries', []);
  const byDate = new Map(data.map((row) => [row.date, row]));
  const updated = current.map((e) => (isLocal(e.id) && byDate.has(e.date) ? byDate.get(e.date) : e));
  localStorage.setItem('weight_entries', JSON.stringify(updated));
}

async function syncSupplements(userId) {
  const cached = readJson('supplements_list', []);
  const locals = cached.filter((s) => isLocal(s.id));
  const idMap = new Map();

  if (locals.length) {
    for (const s of locals) {
      const { data, error } = await supabase
        .from('supplements')
        .insert({
          user_id: userId, name: s.name, brand: s.brand || null, form: s.form || 'tablet',
          dosage_amount: s.dosage_amount || 1, dosage_unit: s.dosage_unit || 'Stück',
          notes: s.notes || '', barcode: s.barcode || null, schedule: s.schedule || {},
          calories: s.calories ?? null, protein: s.protein ?? null, carbs: s.carbs ?? null,
          fat: s.fat ?? null, fiber: s.fiber ?? null,
        })
        .select()
        .single();
      if (!error && data) idMap.set(s.id, data);
    }
    if (idMap.size) {
      const current = readJson('supplements_list', []);
      localStorage.setItem('supplements_list', JSON.stringify(current.map((s) => idMap.get(s.id) || s)));
      // Verweise der Supplement-Ernährungseinträge (supp:<id>:<slot>) mitziehen
      for (const key of keysWithPrefix('nutrition_entries_')) {
        const eintraege = readJson(key, []);
        let geaendert = false;
        for (const e of eintraege) {
          if (e.source !== 'supplement' || !e.source_id) continue;
          const [, altId, slot] = e.source_id.split(':');
          const neu = idMap.get(altId);
          if (neu) { e.source_id = `supp:${neu.id}:${slot}`; geaendert = true; }
        }
        if (geaendert) localStorage.setItem(key, JSON.stringify(eintraege));
      }
    }
  }

  // Einnahme-Logs: local_-Logs hochladen, supplement_id ggf. auf Cloud-ID umschreiben
  for (const key of keysWithPrefix('supplement_logs_')) {
    const date = key.slice('supplement_logs_'.length);
    const cached2 = readJson(key, []);
    let changed = false;
    const updated = [];
    for (const log of cached2) {
      let suppId = log.supplement_id;
      if (isLocal(suppId) && idMap.has(suppId)) suppId = idMap.get(suppId).id;
      if (isLocal(log.id) && !isLocal(suppId)) {
        const { data } = await supabase
          .from('supplement_logs')
          .upsert({ user_id: userId, supplement_id: suppId, date, time_slot: log.time_slot },
            { onConflict: 'user_id,supplement_id,date,time_slot' })
          .select()
          .single();
        updated.push(data || { ...log, supplement_id: suppId });
        changed = true;
      } else {
        updated.push(suppId !== log.supplement_id ? { ...log, supplement_id: suppId } : log);
        if (suppId !== log.supplement_id) changed = true;
      }
    }
    if (changed) localStorage.setItem(key, JSON.stringify(updated));
  }
}

// Upsert-Daten mit user_id-Feld: gehören sie noch dem Gast (oder einem
// anderen Konto), werden sie für den aktuellen User in die Cloud geschrieben.
async function syncKeyedUpserts(userId) {
  // Ernährungsziele
  const goals = readJson('nutrition_goals', null);
  if (goals && goals.user_id !== userId) {
    const { error } = await supabase.from('nutrition_goals').upsert({
      user_id: userId, calories: goals.calories, protein: goals.protein,
      carbs: goals.carbs, fat: goals.fat, tdee: goals.tdee || null,
      water_ml: goals.water_ml || 3000, updated_at: new Date().toISOString(),
    }, { onConflict: 'user_id' });
    if (!error) localStorage.setItem('nutrition_goals', JSON.stringify({ ...goals, user_id: userId }));
  }

  // Zyklus-Einstellungen + Tagebuch
  const cycle = readJson('cycle_settings', null);
  if (cycle && cycle.user_id !== userId) {
    const { error } = await supabase.from('cycle_settings').upsert({
      user_id: userId, cycle_length: cycle.cycle_length, period_length: cycle.period_length,
      last_period_start: cycle.last_period_start, tracking_enabled: cycle.tracking_enabled !== false,
      updated_at: new Date().toISOString(),
    }, { onConflict: 'user_id' });
    if (!error) localStorage.setItem('cycle_settings', JSON.stringify({ ...cycle, user_id: userId }));
  }
  for (const key of keysWithPrefix('cycle_log_')) {
    const log = readJson(key, null);
    if (!log || log.user_id === userId) continue;
    const date = key.slice('cycle_log_'.length);
    const { error } = await supabase.from('cycle_logs').upsert({
      user_id: userId, date, mood: log.mood || null, energy: log.energy || null,
      pain: log.pain || null, sleep: log.sleep || null, bloating: log.bloating || false,
      headache: log.headache || false, cravings: log.cravings || false, notes: log.notes || '',
    }, { onConflict: 'user_id,date' });
    if (!error) localStorage.setItem(key, JSON.stringify({ ...log, user_id: userId }));
  }

  // Aktive Diät
  const diet = readJson('active_diet', null);
  if (diet && diet.user_id && diet.user_id !== userId && diet.diet_id) {
    const { error } = await supabase.from('active_diet').upsert({
      user_id: userId, diet_id: diet.diet_id, started_at: diet.started_at,
      config: diet.config || {}, updated_at: new Date().toISOString(),
    }, { onConflict: 'user_id' });
    if (!error) localStorage.setItem('active_diet', JSON.stringify({ ...diet, user_id: userId }));
  }

  // Übungsnotizen (Cache-Keys: `${userId}_${exerciseId}`, Gast = guest_...)
  const notes = readJson('exercise_notes', {});
  let notesChanged = false;
  for (const [key, note] of Object.entries(notes)) {
    if (!key.startsWith('guest_')) continue;
    const exerciseId = note.exercise_id || key.slice('guest_'.length);
    const entry = { user_id: userId, exercise_id: exerciseId, note: note.note || '', settings: note.settings || [], updated_at: new Date().toISOString() };
    const { error } = await supabase.from('exercise_notes').upsert(entry, { onConflict: 'user_id,exercise_id' });
    if (!error) {
      delete notes[key];
      notes[`${userId}_${exerciseId}`] = entry;
      notesChanged = true;
    }
  }
  if (notesChanged) localStorage.setItem('exercise_notes', JSON.stringify(notes));
}
