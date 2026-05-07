import { supabase } from '../lib/supabase';

const WORKOUTS_KEY = 'workouts';
const CUSTOM_EXERCISES_KEY = 'custom_exercises';

// ── Workouts ──────────────────────────────────────────────

export async function getWorkouts(userId) {
  // Try Supabase first
  const { data, error } = await supabase
    .from('workouts')
    .select('*')
    .eq('user_id', userId)
    .order('date', { ascending: false });

  if (!error && data) {
    // Map to the shape the app expects
    const workouts = data.map((row) => ({
      id: row.id,
      date: row.date,
      duration: row.duration,
      exercises: row.exercises,
    }));
    // Cache locally
    localStorage.setItem(WORKOUTS_KEY, JSON.stringify(workouts));
    return workouts;
  }

  // Fallback to localStorage
  const cached = localStorage.getItem(WORKOUTS_KEY);
  return cached ? JSON.parse(cached) : [];
}

export async function saveWorkout(userId, workout) {
  // Save to Supabase
  const { data, error } = await supabase
    .from('workouts')
    .insert({
      user_id: userId,
      date: workout.date,
      duration: workout.duration,
      exercises: workout.exercises,
    })
    .select()
    .single();

  // Also save to localStorage cache
  const cached = JSON.parse(localStorage.getItem(WORKOUTS_KEY) || '[]');
  cached.unshift(data || workout);
  localStorage.setItem(WORKOUTS_KEY, JSON.stringify(cached));

  return { data, error };
}

export async function deleteWorkout(userId, workoutId) {
  await supabase
    .from('workouts')
    .delete()
    .eq('id', workoutId)
    .eq('user_id', userId);

  const cached = JSON.parse(localStorage.getItem(WORKOUTS_KEY) || '[]');
  localStorage.setItem(WORKOUTS_KEY, JSON.stringify(cached.filter((w) => w.id !== workoutId)));
}

// ── Custom Exercises ──────────────────────────────────────

export async function getCustomExercises(userId) {
  const { data, error } = await supabase
    .from('custom_exercises')
    .select('*')
    .eq('user_id', userId);

  if (!error && data) {
    localStorage.setItem(CUSTOM_EXERCISES_KEY, JSON.stringify(data));
    return data;
  }

  const cached = localStorage.getItem(CUSTOM_EXERCISES_KEY);
  return cached ? JSON.parse(cached) : [];
}

export async function saveCustomExercise(userId, exercise) {
  const { data, error } = await supabase
    .from('custom_exercises')
    .insert({ user_id: userId, ...exercise })
    .select()
    .single();

  const cached = JSON.parse(localStorage.getItem(CUSTOM_EXERCISES_KEY) || '[]');
  cached.push(data || exercise);
  localStorage.setItem(CUSTOM_EXERCISES_KEY, JSON.stringify(cached));

  return { data, error };
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
        });
      }
    }
  }
  return history;
}

export async function getPersonalRecord(userId, exerciseId) {
  const history = await getExerciseHistory(userId, exerciseId);
  let maxWeight = 0;
  let maxVolume = 0;
  for (const entry of history) {
    if (!entry.sets) continue;
    for (const set of entry.sets) {
      if (set.weight > maxWeight) maxWeight = set.weight;
      const volume = (set.weight || 0) * (set.reps || 0);
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
  const { data, error } = await supabase
    .from('custom_plans')
    .update({ name: plan.name, days: plan.days })
    .eq('id', planId)
    .eq('user_id', userId)
    .select()
    .single();

  // Update localStorage cache
  const cached = JSON.parse(localStorage.getItem('customPlans') || '[]');
  const idx = cached.findIndex((p) => p.id === planId);
  if (idx >= 0) {
    cached[idx] = { id: planId, name: plan.name, days: plan.days };
    localStorage.setItem('customPlans', JSON.stringify(cached));
  }

  return { data, error };
}

// ── Custom Plans ──────────────────────────────────────────

export async function getCustomPlans(userId) {
  const { data, error } = await supabase
    .from('custom_plans')
    .select('*')
    .eq('user_id', userId)
    .is('deleted_at', null)
    .order('created_at', { ascending: false });

  if (!error && data) {
    const plans = data.map((row) => ({
      id: row.id,
      name: row.name,
      days: row.days,
    }));
    localStorage.setItem('customPlans', JSON.stringify(plans));
    return plans;
  }

  try {
    return JSON.parse(localStorage.getItem('customPlans') || '[]');
  } catch {
    return [];
  }
}

export async function saveCustomPlan(userId, plan) {
  const { data, error } = await supabase
    .from('custom_plans')
    .insert({
      user_id: userId,
      name: plan.name,
      days: plan.days,
    })
    .select()
    .single();

  // Update localStorage cache
  const cached = JSON.parse(localStorage.getItem('customPlans') || '[]');
  cached.unshift({ id: data?.id || plan.id, name: plan.name, days: plan.days });
  localStorage.setItem('customPlans', JSON.stringify(cached));

  return { data, error };
}

export async function deleteCustomPlan(userId, planId) {
  await supabase
    .from('custom_plans')
    .update({ deleted_at: new Date().toISOString() })
    .eq('id', planId)
    .eq('user_id', userId);

  const cached = JSON.parse(localStorage.getItem('customPlans') || '[]');
  localStorage.setItem('customPlans', JSON.stringify(cached.filter((p) => p.id !== planId)));
}

export async function getDeletedCustomPlans(userId) {
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
  await supabase
    .from('custom_plans')
    .delete()
    .eq('id', planId)
    .eq('user_id', userId);
}

// ── Migration: Upload localStorage data on first login ───

export async function migrateLocalDataToSupabase(userId) {
  // Migrate workouts
  const localWorkouts = JSON.parse(localStorage.getItem(WORKOUTS_KEY) || '[]');
  if (localWorkouts.length > 0) {
    const { data: existing } = await supabase
      .from('workouts')
      .select('id')
      .eq('user_id', userId)
      .limit(1);

    if (!existing || existing.length === 0) {
      const rows = localWorkouts.map((w) => ({
        user_id: userId,
        date: w.date,
        duration: w.duration,
        exercises: w.exercises,
      }));
      await supabase.from('workouts').insert(rows);
    }
  }

  // Migrate custom plans
  const localPlans = JSON.parse(localStorage.getItem('customPlans') || '[]');
  if (localPlans.length > 0) {
    const { data: existing } = await supabase
      .from('custom_plans')
      .select('id')
      .eq('user_id', userId)
      .limit(1);

    if (!existing || existing.length === 0) {
      const rows = localPlans.map((p) => ({
        user_id: userId,
        name: p.name,
        days: p.days,
      }));
      await supabase.from('custom_plans').insert(rows);
    }
  }
}
