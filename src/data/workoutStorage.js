import { supabase } from '../lib/supabase';
import { isGuest } from '../context/AuthContext';
import { localId } from './localId';

const WORKOUTS_KEY = 'workouts';
const CUSTOM_EXERCISES_KEY = 'custom_exercises';

// ── Workouts ──────────────────────────────────────────────

export async function getWorkouts(userId) {
  // localStorage first — instant
  const cached = localStorage.getItem(WORKOUTS_KEY);
  const localData = cached ? JSON.parse(cached) : null;

  if (localData) {
    // Refresh from Supabase in background (don't block)
    if (!isGuest(userId)) {
      supabase
        .from('workouts')
        .select('*')
        .eq('user_id', userId)
        .order('date', { ascending: false })
        .then(({ data, error }) => {
          if (!error && data) {
            const supabaseWorkouts = data.map((row) => ({
              id: row.id, date: row.date, duration: row.duration, type: row.type, exercises: row.exercises,
            }));
            // Keep local-only workouts (not yet synced) and merge with Supabase data
            const currentLocal = JSON.parse(localStorage.getItem(WORKOUTS_KEY) || '[]');
            const localOnly = currentLocal.filter((w) => String(w.id).startsWith('local_'));
            const merged = [...localOnly, ...supabaseWorkouts];
            localStorage.setItem(WORKOUTS_KEY, JSON.stringify(merged));
          }
        })
        .catch(() => {});
    }
    return localData;
  }

  // No cache → must await Supabase
  if (!isGuest(userId)) {
    try {
      const { data, error } = await supabase
        .from('workouts')
        .select('*')
        .eq('user_id', userId)
        .order('date', { ascending: false });

      if (!error && data) {
        const workouts = data.map((row) => ({
          id: row.id, date: row.date, duration: row.duration, type: row.type, exercises: row.exercises,
        }));
        localStorage.setItem(WORKOUTS_KEY, JSON.stringify(workouts));
        return workouts;
      }
    } catch (err) {
      console.error('Failed to load workouts from Supabase:', err);
    }
  }

  return [];
}

export async function saveWorkout(userId, workout) {
  // Save to localStorage FIRST (always works, even offline)
  const localEntry = { ...workout, id: localId() };
  const cached = JSON.parse(localStorage.getItem(WORKOUTS_KEY) || '[]');
  cached.unshift(localEntry);
  localStorage.setItem(WORKOUTS_KEY, JSON.stringify(cached));

  let data = null, error = null;

  if (!isGuest(userId)) {
    try {
      ({ data, error } = await supabase
        .from('workouts')
        .insert({
          user_id: userId,
          date: workout.date,
          duration: workout.duration,
          type: workout.type || null,
          exercises: workout.exercises,
        })
        .select()
        .single());

      if (error) console.error('Failed to save workout to Supabase:', error);

      // Update localStorage with Supabase ID if available (per ID suchen,
      // nicht Index 0 — parallel gespeicherte Workouts vertauschen sonst IDs)
      if (data) {
        const c = JSON.parse(localStorage.getItem(WORKOUTS_KEY) || '[]');
        const idx = c.findIndex((w) => w.id === localEntry.id);
        if (idx >= 0) {
          c[idx] = { ...c[idx], id: data.id };
          localStorage.setItem(WORKOUTS_KEY, JSON.stringify(c));
        }
      }
    } catch (err) {
      console.error('Workout save exception:', err);
    }
  }

  return { data: data || localEntry, error };
}

export async function updateWorkout(userId, workoutId, updates) {
  // localStorage first
  const cached = JSON.parse(localStorage.getItem(WORKOUTS_KEY) || '[]');
  const idx = cached.findIndex((w) => w.id === workoutId);
  if (idx >= 0) {
    cached[idx] = { ...cached[idx], exercises: updates.exercises, duration: updates.duration };
    localStorage.setItem(WORKOUTS_KEY, JSON.stringify(cached));
  }

  if (!isGuest(userId) && !workoutId.startsWith('local_')) {
    try {
      await supabase.from('workouts')
        .update({ exercises: updates.exercises, duration: updates.duration })
        .eq('id', workoutId).eq('user_id', userId);
    } catch (err) { console.error('Failed to update workout:', err); }
  }

  return { data: cached[idx], error: null };
}

export async function deleteWorkout(userId, workoutId) {
  // localStorage first
  const cached = JSON.parse(localStorage.getItem(WORKOUTS_KEY) || '[]');
  localStorage.setItem(WORKOUTS_KEY, JSON.stringify(cached.filter((w) => w.id !== workoutId)));

  if (!isGuest(userId) && !workoutId.startsWith('local_')) {
    try {
      await supabase.from('workouts').delete().eq('id', workoutId).eq('user_id', userId);
    } catch (err) { console.error('Failed to delete workout:', err); }
  }
}

// ── Custom Exercises ──────────────────────────────────────

export async function getCustomExercises(userId) {
  // localStorage first — instant
  const cached = localStorage.getItem(CUSTOM_EXERCISES_KEY);
  if (cached) {
    if (!isGuest(userId)) {
      supabase
        .from('custom_exercises')
        .select('*')
        .eq('user_id', userId)
        .then(({ data, error }) => {
          if (!error && data) {
            // Lokal erstellte, noch nicht gesyncte Übungen (ohne user_id) bewahren —
            // sonst löscht der Hintergrund-Refresh sie, bevor resync sie hochlädt.
            const currentLocal = JSON.parse(localStorage.getItem(CUSTOM_EXERCISES_KEY) || '[]');
            const cloudIds = new Set(data.map((e) => e.exercise_id || e.id));
            const localOnly = currentLocal.filter(
              (e) => !e.user_id && !cloudIds.has(e.exercise_id || e.id)
            );
            localStorage.setItem(CUSTOM_EXERCISES_KEY, JSON.stringify([...localOnly, ...data]));
          }
        })
        .catch(() => {});
    }
    try { return JSON.parse(cached); } catch { return []; }
  }

  // No cache → must await Supabase
  if (!isGuest(userId)) {
    const { data, error } = await supabase
      .from('custom_exercises')
      .select('*')
      .eq('user_id', userId);

    if (!error && data) {
      localStorage.setItem(CUSTOM_EXERCISES_KEY, JSON.stringify(data));
      return data;
    }
  }

  return [];
}

export async function saveCustomExercise(userId, exercise) {
  // Save to localStorage FIRST (always works)
  const cached = JSON.parse(localStorage.getItem(CUSTOM_EXERCISES_KEY) || '[]');
  cached.push(exercise);
  localStorage.setItem(CUSTOM_EXERCISES_KEY, JSON.stringify(cached));

  // Then try Supabase
  if (!isGuest(userId)) {
    try {
      await supabase
        .from('custom_exercises')
        .insert({ user_id: userId, ...exercise });
    } catch (err) {
      console.error('Failed to save custom exercise to Supabase:', err);
    }
  }

  return { data: exercise, error: null };
}

export async function deleteCustomExercise(userId, exerciseId) {
  // Remove from localStorage
  const cached = JSON.parse(localStorage.getItem(CUSTOM_EXERCISES_KEY) || '[]');
  const updated = cached.filter((e) => (e.exercise_id || e.id) !== exerciseId);
  localStorage.setItem(CUSTOM_EXERCISES_KEY, JSON.stringify(updated));

  // Remove from Supabase
  if (!isGuest(userId)) {
    try {
      await supabase
        .from('custom_exercises')
        .delete()
        .eq('user_id', userId)
        .eq('exercise_id', exerciseId);
    } catch (err) {
      console.error('Failed to delete custom exercise from Supabase:', err);
    }
  }
}

// ── Exercise History & PR ─────────────────────────────────

export async function getExerciseHistory(userId, exerciseId) {
  const workouts = await getWorkouts(userId);
  const history = [];
  for (const workout of workouts) {
    for (const exercise of workout.exercises) {
      if (exercise.exerciseId === exerciseId && exercise.sets) {
        history.push({
          date: workout.date,
          sets: exercise.sets,
          unit: exercise.unit || null,
        });
      }
    }
  }
  return history;
}

export async function getPersonalRecord(userId, exerciseId) {
  const history = await getExerciseHistory(userId, exerciseId);
  const globalUnit = localStorage.getItem('weightUnit') || 'kg';
  const toKg = (v, unit) => unit === 'lbs' ? v * 0.453592 : v;
  let maxWeight = 0;
  let maxVolume = 0;
  for (const entry of history) {
    if (!entry.sets) continue;
    const entryUnit = entry.unit || globalUnit;
    for (const set of entry.sets) {
      const wKg = toKg(set.weight, entryUnit);
      if (wKg > maxWeight) maxWeight = wKg;
      const volume = (wKg || 0) * (set.reps || 0);
      if (volume > maxVolume) maxVolume = volume;
    }
  }
  return { maxWeight, maxVolume };
}

export async function getCardioRecord(userId, exerciseId) {
  const workouts = await getWorkouts(userId);
  let maxDistance = 0;
  let bestPace = Infinity;
  for (const w of workouts) {
    if (w.type !== 'cardio') continue;
    for (const ex of w.exercises) {
      if (ex.exerciseId !== exerciseId) continue;
      if (ex.distance > maxDistance) maxDistance = ex.distance;
      if (ex.distance > 0 && ex.duration > 0) {
        const pace = ex.duration / (ex.distance / 1000);
        if (pace < bestPace) bestPace = pace;
      }
    }
  }
  return { maxDistance, bestPace: bestPace === Infinity ? 0 : bestPace };
}

// ── Plan Type Helper ─────────────────────────────────────

export function getPlanType(plan) {
  if (Array.isArray(plan.days)) return 'strength';
  return plan.days?.type || 'strength';
}

export async function getCustomPlansByType(userId, type) {
  const all = await getCustomPlans(userId);
  return all.filter((p) => getPlanType(p) === type);
}

export async function updateCustomPlan(userId, planId, plan) {
  // localStorage first
  const cached = JSON.parse(localStorage.getItem('customPlans') || '[]');
  const idx = cached.findIndex((p) => p.id === planId);
  if (idx >= 0) {
    cached[idx] = { ...cached[idx], name: plan.name, days: plan.days };
    localStorage.setItem('customPlans', JSON.stringify(cached));
  }

  if (!isGuest(userId) && !planId.startsWith('local_')) {
    try {
      await supabase
        .from('custom_plans')
        .update({ name: plan.name, days: plan.days })
        .eq('id', planId)
        .eq('user_id', userId);
    } catch (err) {
      console.error('Failed to update plan in Supabase:', err);
    }
  }

  return { data: plan, error: null };
}

// ── Custom Plans ──────────────────────────────────────────

export async function getCustomPlans(userId) {
  // localStorage first — instant
  let localData = null;
  try {
    const cached = localStorage.getItem('customPlans');
    if (cached) localData = JSON.parse(cached);
  } catch {}

  if (localData) {
    // Refresh from Supabase in background
    if (!isGuest(userId)) {
      supabase
        .from('custom_plans')
        .select('*')
        .eq('user_id', userId)
        .is('deleted_at', null)
        .order('created_at', { ascending: false })
        .then(({ data, error }) => {
          if (!error && data) {
            const plans = data.map((row) => ({ id: row.id, name: row.name, days: row.days }));
            // Noch nicht gesyncte lokale Pläne behalten
            const currentLocal = JSON.parse(localStorage.getItem('customPlans') || '[]');
            const localOnly = currentLocal.filter((p) => String(p.id).startsWith('local_'));
            localStorage.setItem('customPlans', JSON.stringify([...localOnly, ...plans]));
          }
        })
        .catch(() => {});
    }
    return localData;
  }

  // No cache → must await Supabase
  if (!isGuest(userId)) {
    try {
      const { data, error } = await supabase
        .from('custom_plans')
        .select('*')
        .eq('user_id', userId)
        .is('deleted_at', null)
        .order('created_at', { ascending: false });

      if (!error && data) {
        const plans = data.map((row) => ({ id: row.id, name: row.name, days: row.days }));
        localStorage.setItem('customPlans', JSON.stringify(plans));
        return plans;
      }
    } catch (err) {
      console.error('Failed to load custom plans from Supabase:', err);
    }
  }

  return [];
}

export async function saveCustomPlan(userId, plan) {
  let data = null;

  if (!isGuest(userId)) {
    ({ data } = await supabase
      .from('custom_plans')
      .insert({ user_id: userId, name: plan.name, days: plan.days })
      .select()
      .single());
  }

  const cached = JSON.parse(localStorage.getItem('customPlans') || '[]');
  cached.unshift({ id: data?.id || localId(), name: plan.name, days: plan.days });
  localStorage.setItem('customPlans', JSON.stringify(cached));

  return { data, error: null };
}

export async function deleteCustomPlan(userId, planId) {
  // localStorage first
  const cached = JSON.parse(localStorage.getItem('customPlans') || '[]');
  localStorage.setItem('customPlans', JSON.stringify(cached.filter((p) => p.id !== planId)));

  // Soft-delete in Supabase (skip for guests and local-only plans)
  if (!isGuest(userId) && !planId.startsWith('local_')) {
    try {
      await supabase
        .from('custom_plans')
        .update({ deleted_at: new Date().toISOString() })
        .eq('id', planId)
        .eq('user_id', userId);
    } catch (err) {
      console.error('Failed to delete plan in Supabase:', err);
    }
  }
}

export async function getDeletedCustomPlans(userId) {
  // Ein Gast hat keinen Papierkorb: deleteCustomPlan entfernt seinen Plan
  // sofort aus dem lokalen Speicher, ein Soft-Delete existiert nur in der
  // Cloud. Ohne diese Weiche liefe hier ein Netzaufruf mit userId 'guest',
  // der nichts finden kann und den Bildschirm bis zum Timeout blockiert.
  if (isGuest(userId)) return [];

  const { data, error } = await supabase
    .from('custom_plans')
    .select('*')
    .eq('user_id', userId)
    .not('deleted_at', 'is', null)
    .order('deleted_at', { ascending: false });

  if (!error && data) {
    return data.map((row) => ({
      id: row.id,
      name: row.name,
      days: row.days,
    }));
  }
  return [];
}

export async function restoreCustomPlan(userId, planId) {
  if (isGuest(userId)) return getCustomPlans(userId);

  await supabase
    .from('custom_plans')
    .update({ deleted_at: null })
    .eq('id', planId)
    .eq('user_id', userId);

  // Refresh localStorage cache
  const plans = await getCustomPlans(userId);
  return plans;
}

export async function permanentDeleteCustomPlan(userId, planId) {
  if (isGuest(userId)) return;

  await supabase
    .from('custom_plans')
    .delete()
    .eq('id', planId)
    .eq('user_id', userId);
}

// Migration Gast→Konto + Offline-Retry: siehe src/data/resync.js
// (ersetzt die frühere migrateLocalDataToSupabase, die Duplikate erzeugte)

// ── Exercise Notes ───────────────────────────────────────────

const NOTES_CACHE_KEY = 'exercise_notes';

export async function getExerciseNote(userId, exerciseId) {
  // Check cache first
  const cached = JSON.parse(localStorage.getItem(NOTES_CACHE_KEY) || '{}');
  const cacheKey = `${userId}_${exerciseId}`;

  if (!isGuest(userId)) {
    const { data } = await supabase
      .from('exercise_notes')
      .select('*')
      .eq('user_id', userId)
      .eq('exercise_id', exerciseId)
      .single();

    if (data) {
      cached[cacheKey] = data;
      localStorage.setItem(NOTES_CACHE_KEY, JSON.stringify(cached));
      return data;
    }
  }

  return cached[cacheKey] || { note: '', settings: [] };
}

export async function saveExerciseNote(userId, exerciseId, note, settings) {
  const cacheKey = `${userId}_${exerciseId}`;
  const entry = { user_id: userId, exercise_id: exerciseId, note, settings, updated_at: new Date().toISOString() };

  // Cache first
  const cached = JSON.parse(localStorage.getItem(NOTES_CACHE_KEY) || '{}');
  cached[cacheKey] = entry;
  localStorage.setItem(NOTES_CACHE_KEY, JSON.stringify(cached));

  if (!isGuest(userId)) {
    await supabase
      .from('exercise_notes')
      .upsert(entry, { onConflict: 'user_id,exercise_id' });
  }
}

export async function getAllExerciseNotes(userId) {
  const cached = JSON.parse(localStorage.getItem(NOTES_CACHE_KEY) || '{}');

  if (!isGuest(userId)) {
    const { data } = await supabase
      .from('exercise_notes')
      .select('*')
      .eq('user_id', userId);

    if (data) {
      data.forEach((d) => { cached[`${userId}_${d.exercise_id}`] = d; });
      localStorage.setItem(NOTES_CACHE_KEY, JSON.stringify(cached));
    }
  }

  // Return as map: exerciseId → note data
  const result = {};
  Object.entries(cached).forEach(([key, val]) => {
    if (key.startsWith(userId)) {
      result[val.exercise_id] = val;
    }
  });
  return result;
}

// ── Weekly Schedules ────────────────────────────────────────────

const SCHEDULE_KEY = 'weekly_schedules';
const ACTIVE_SCHEDULE_KEY = 'active_weekly_schedule';

export async function getWeeklySchedules(userId) {
  // localStorage first — instant
  const cached = localStorage.getItem(SCHEDULE_KEY);
  if (cached) {
    if (!isGuest(userId)) {
      supabase
        .from('weekly_schedules')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false })
        .then(({ data, error }) => {
          if (!error && data) {
            // Noch nicht gesyncte lokale Wochenpläne behalten
            const currentLocal = JSON.parse(localStorage.getItem(SCHEDULE_KEY) || '[]');
            const localOnly = currentLocal.filter((s) => String(s.id).startsWith('local_'));
            localStorage.setItem(SCHEDULE_KEY, JSON.stringify([...localOnly, ...data]));
          }
        })
        .catch(() => {});
    }
    try { return JSON.parse(cached); } catch { return []; }
  }

  // No cache → must await Supabase
  if (!isGuest(userId)) {
    try {
      const { data, error } = await supabase
        .from('weekly_schedules')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false });

      if (!error && data) {
        localStorage.setItem(SCHEDULE_KEY, JSON.stringify(data));
        return data;
      }
    } catch (err) {
      console.error('Failed to load weekly schedules:', err);
    }
  }

  return [];
}

export async function getActiveSchedule(userId) {
  const schedules = await getWeeklySchedules(userId);
  return schedules.find((s) => s.is_active) || null;
}

export async function saveWeeklySchedule(userId, schedule) {
  const entry = {
    user_id: userId,
    name: schedule.name,
    sessions_per_week: schedule.sessions_per_week,
    days: schedule.days,
    is_active: true,
  };

  // Deactivate other schedules in localStorage
  const cached = JSON.parse(localStorage.getItem(SCHEDULE_KEY) || '[]').map((s) => ({ ...s, is_active: false }));
  const localEntry = { ...entry, id: localId(), created_at: new Date().toISOString() };
  cached.unshift(localEntry);
  localStorage.setItem(SCHEDULE_KEY, JSON.stringify(cached));

  if (!isGuest(userId)) {
    try {
      // Deactivate all existing
      await supabase
        .from('weekly_schedules')
        .update({ is_active: false })
        .eq('user_id', userId);

      const { data } = await supabase
        .from('weekly_schedules')
        .insert(entry)
        .select()
        .single();

      if (data) {
        const updated = JSON.parse(localStorage.getItem(SCHEDULE_KEY) || '[]');
        const idx = updated.findIndex((s) => s.id === localEntry.id);
        if (idx >= 0) updated[idx] = data;
        localStorage.setItem(SCHEDULE_KEY, JSON.stringify(updated));
        return { data, error: null };
      }
    } catch (err) {
      console.error('Failed to save weekly schedule:', err);
    }
  }

  return { data: localEntry, error: null };
}

// Programm/Plan „beenden": deaktivieren (nicht löschen) — der Plan bleibt in
// „Meine Pläne" erhalten und kann später wieder aktiviert werden.
export async function deactivateAllSchedules(userId) {
  const cached = JSON.parse(localStorage.getItem(SCHEDULE_KEY) || '[]').map((s) => ({ ...s, is_active: false }));
  localStorage.setItem(SCHEDULE_KEY, JSON.stringify(cached));

  if (!isGuest(userId)) {
    try {
      await supabase
        .from('weekly_schedules')
        .update({ is_active: false })
        .eq('user_id', userId);
    } catch (err) {
      console.error('Failed to deactivate weekly schedules:', err);
    }
  }
}

export async function deleteWeeklySchedule(userId, scheduleId) {
  const cached = JSON.parse(localStorage.getItem(SCHEDULE_KEY) || '[]');
  localStorage.setItem(SCHEDULE_KEY, JSON.stringify(cached.filter((s) => s.id !== scheduleId)));

  if (!isGuest(userId) && !scheduleId.startsWith('local_')) {
    try {
      // Auch auf den Nutzer eingrenzen. RLS verhindert Fremdzugriffe zwar
      // ohnehin, aber alle anderen Löschpfade in dieser Datei tun es —
      // eine Ausnahme liest sich beim Prüfen wie ein Versehen.
      await supabase.from('weekly_schedules').delete().eq('id', scheduleId).eq('user_id', userId);
    } catch (err) {
      console.error('Failed to delete weekly schedule:', err);
    }
  }
}

export function getScheduledDaysForMonth(schedule, year, month) {
  if (!schedule?.days) return new Set();
  const DAY_KEYS = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const scheduled = new Set();

  for (let d = 1; d <= daysInMonth; d++) {
    const date = new Date(year, month, d);
    const dayKey = DAY_KEYS[date.getDay()];
    if (schedule.days[dayKey]) {
      scheduled.add(d);
    }
  }
  return scheduled;
}

// Bestehenden Wochenplan ändern, OHNE ihn vorher zu löschen. Der Builder hat
// früher delete+insert gemacht — schlug das Speichern fehl, war der Plan weg.
export async function updateWeeklySchedule(userId, scheduleId, schedule) {
  const patch = {
    name: schedule.name,
    sessions_per_week: schedule.sessions_per_week,
    days: schedule.days,
  };

  const cached = JSON.parse(localStorage.getItem(SCHEDULE_KEY) || '[]');
  const idx = cached.findIndex((s) => s.id === scheduleId);
  if (idx >= 0) {
    cached[idx] = { ...cached[idx], ...patch };
    localStorage.setItem(SCHEDULE_KEY, JSON.stringify(cached));
  }

  if (!isGuest(userId) && !String(scheduleId).startsWith('local_')) {
    try {
      const { error } = await supabase
        .from('weekly_schedules')
        .update(patch)
        .eq('id', scheduleId)
        .eq('user_id', userId);
      if (error) return { data: null, error };
    } catch (err) {
      console.error('Failed to update weekly schedule:', err);
      return { data: null, error: err };
    }
  }

  return { data: { id: scheduleId, ...patch }, error: null };
}

// Einen vorhandenen Plan aktiv schalten. Vorher lief das über
// saveWeeklySchedule(), das immer INSERT macht — jedes Aktivieren erzeugte
// dadurch ein Duplikat.
export async function activateWeeklySchedule(userId, scheduleId) {
  const cached = JSON.parse(localStorage.getItem(SCHEDULE_KEY) || '[]').map((s) => ({
    ...s,
    is_active: s.id === scheduleId,
  }));
  localStorage.setItem(SCHEDULE_KEY, JSON.stringify(cached));

  if (!isGuest(userId) && !String(scheduleId).startsWith('local_')) {
    try {
      await supabase
        .from('weekly_schedules')
        .update({ is_active: false })
        .eq('user_id', userId);

      const { error } = await supabase
        .from('weekly_schedules')
        .update({ is_active: true })
        .eq('id', scheduleId)
        .eq('user_id', userId);
      if (error) return { data: null, error };
    } catch (err) {
      console.error('Failed to activate weekly schedule:', err);
      return { data: null, error: err };
    }
  }

  return { data: cached.find((s) => s.id === scheduleId) || null, error: null };
}
