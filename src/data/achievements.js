import { getWorkouts } from './workoutStorage';
import { getWeightEntries } from './weightStorage';
import { getExerciseById } from './exercises';
import { getWeekYear } from '../hooks/useProgressComparison';
import { getAchievementState, saveAchievementState } from './achievementStorage';
import { todayLocal } from '../lib/dateUtils';

const toKg = (v, unit) => (unit === 'lbs' ? v * 0.453592 : v);

// ── Katalog ──────────────────────────────────────────────────
// check(state, ctx) → bool | progress(state) → {current, target} für die Galerie

export const ACHIEVEMENTS = [
  // Workouts gesamt
  { id: 'workouts_1', icon: '🌱', family: 'workouts', check: (s) => c(s, 'totalWorkouts') >= 1, progress: (s) => p(s, 'totalWorkouts', 1) },
  { id: 'workouts_10', icon: '💪', family: 'workouts', check: (s) => c(s, 'totalWorkouts') >= 10, progress: (s) => p(s, 'totalWorkouts', 10) },
  { id: 'workouts_50', icon: '🏋️', family: 'workouts', check: (s) => c(s, 'totalWorkouts') >= 50, progress: (s) => p(s, 'totalWorkouts', 50) },
  { id: 'workouts_100', icon: '🏆', family: 'workouts', check: (s) => c(s, 'totalWorkouts') >= 100, progress: (s) => p(s, 'totalWorkouts', 100) },
  // Streak
  { id: 'streak_7', icon: '🔥', family: 'streak', check: (s) => c(s, 'bestStreak') >= 7, progress: (s) => p(s, 'bestStreak', 7) },
  { id: 'streak_30', icon: '⚡', family: 'streak', check: (s) => c(s, 'bestStreak') >= 30, progress: (s) => p(s, 'bestStreak', 30) },
  { id: 'streak_100', icon: '👑', family: 'streak', check: (s) => c(s, 'bestStreak') >= 100, progress: (s) => p(s, 'bestStreak', 100) },
  // Persönliche Rekorde
  { id: 'prs_1', icon: '📈', family: 'prs', check: (s) => c(s, 'totalPrs') >= 1, progress: (s) => p(s, 'totalPrs', 1) },
  { id: 'prs_10', icon: '🎯', family: 'prs', check: (s) => c(s, 'totalPrs') >= 10, progress: (s) => p(s, 'totalPrs', 10) },
  { id: 'prs_25', icon: '🥇', family: 'prs', check: (s) => c(s, 'totalPrs') >= 25, progress: (s) => p(s, 'totalPrs', 25) },
  // Wochenvolumen (kg)
  { id: 'weekvol_5000', icon: '⛰️', family: 'weekvol', check: (s) => c(s, 'bestWeekVolumeKg') >= 5000, progress: (s) => p(s, 'bestWeekVolumeKg', 5000) },
  { id: 'weekvol_10000', icon: '🏔️', family: 'weekvol', check: (s) => c(s, 'bestWeekVolumeKg') >= 10000, progress: (s) => p(s, 'bestWeekVolumeKg', 10000) },
  { id: 'weekvol_20000', icon: '🌋', family: 'weekvol', check: (s) => c(s, 'bestWeekVolumeKg') >= 20000, progress: (s) => p(s, 'bestWeekVolumeKg', 20000) },
  // Gesamtvolumen (kg)
  { id: 'totalvol_100000', icon: '🐘', family: 'totalvol', check: (s) => c(s, 'totalVolumeKg') >= 100000, progress: (s) => p(s, 'totalVolumeKg', 100000) },
  { id: 'totalvol_500000', icon: '🦖', family: 'totalvol', check: (s) => c(s, 'totalVolumeKg') >= 500000, progress: (s) => p(s, 'totalVolumeKg', 500000) },
  // Ernährung geloggt (Tage)
  { id: 'nutrition_7', icon: '🥗', family: 'nutrition', check: (s) => c(s, 'nutritionDays') >= 7, progress: (s) => p(s, 'nutritionDays', 7) },
  { id: 'nutrition_30', icon: '🍽️', family: 'nutrition', check: (s) => c(s, 'nutritionDays') >= 30, progress: (s) => p(s, 'nutritionDays', 30) },
  { id: 'nutrition_100', icon: '👨‍🍳', family: 'nutrition', check: (s) => c(s, 'nutritionDays') >= 100, progress: (s) => p(s, 'nutritionDays', 100) },
  // Gewicht getrackt (Einträge)
  { id: 'weight_10', icon: '⚖️', family: 'weight', check: (s) => c(s, 'weightEntries') >= 10, progress: (s) => p(s, 'weightEntries', 10) },
  // Spezial
  { id: 'early_bird', icon: '🌅', family: 'special', check: (s, ctx) => ctx?.type === 'workout' && new Date().getHours() < 7 },
  { id: 'night_owl', icon: '🦉', family: 'special', check: (s, ctx) => ctx?.type === 'workout' && new Date().getHours() >= 21 },
  { id: 'marathon', icon: '⏱️', family: 'special', check: (s, ctx) => ctx?.type === 'workout' && (ctx.workout?.duration || 0) > 90 * 60000 },
  { id: 'allrounder', icon: '🎨', family: 'special', check: (s) => c(s, 'weekMuscleGroups') >= 10, progress: (s) => p(s, 'weekMuscleGroups', 10) },
];

function c(state, key) { return state.counters[key] || 0; }
function p(state, key, target) { return { current: Math.min(c(state, key), target), target }; }

// ── Zähler-Pflege ────────────────────────────────────────────

function workoutVolumeKg(workout) {
  let vol = 0;
  for (const ex of workout?.exercises || []) {
    for (const s of ex.sets || []) vol += toKg((s.weight || 0) * (s.reps || 0), ex.unit);
  }
  return vol;
}

// Einmaliger Backfill für Bestandsnutzer: Workout-/Volumen-Zähler aus der Historie
async function backfill(state, userId) {
  const workouts = (await getWorkouts(userId)) || [];
  let totalVolumeKg = 0;
  const weekVol = {};
  for (const w of workouts) {
    const vol = workoutVolumeKg(w);
    totalVolumeKg += vol;
    if (w.date) {
      const wk = getWeekYear(new Date(w.date + 'T12:00:00'));
      weekVol[wk] = (weekVol[wk] || 0) + vol;
    }
  }
  state.counters.totalWorkouts = Math.max(state.counters.totalWorkouts || 0, workouts.length);
  state.counters.totalVolumeKg = Math.max(state.counters.totalVolumeKg || 0, Math.round(totalVolumeKg));
  state.counters.bestWeekVolumeKg = Math.max(state.counters.bestWeekVolumeKg || 0, Math.round(Math.max(0, ...Object.values(weekVol))));
  state.backfilled = true;
}

async function updateCounters(state, ctx, userId) {
  const cnt = state.counters;

  if (ctx.type === 'workout' && ctx.workout) {
    cnt.totalWorkouts = (cnt.totalWorkouts || 0) + 1;
    cnt.totalVolumeKg = Math.round((cnt.totalVolumeKg || 0) + workoutVolumeKg(ctx.workout));
    if (ctx.prCount) cnt.totalPrs = (cnt.totalPrs || 0) + ctx.prCount;
    if (ctx.streak) cnt.bestStreak = Math.max(cnt.bestStreak || 0, ctx.streak);

    // Wochen-Metriken aus der (localStorage-first bereits aktuellen) Historie
    const workouts = (await getWorkouts(userId)) || [];
    const currentWeek = getWeekYear(new Date());
    let weekVol = 0;
    const weekGroups = new Set();
    for (const w of workouts) {
      if (!w.date || getWeekYear(new Date(w.date + 'T12:00:00')) !== currentWeek) continue;
      weekVol += workoutVolumeKg(w);
      for (const ex of w.exercises || []) {
        const g = getExerciseById(ex.exerciseId)?.muscleGroup;
        if (g) weekGroups.add(g);
      }
    }
    cnt.bestWeekVolumeKg = Math.max(cnt.bestWeekVolumeKg || 0, Math.round(weekVol));
    cnt.weekMuscleGroups = Math.max(cnt.weekMuscleGroups || 0, weekGroups.size);
  }

  if (ctx.type === 'nutrition') {
    const today = todayLocal();
    if (cnt.lastNutritionDate !== today) {
      cnt.lastNutritionDate = today;
      cnt.nutritionDays = (cnt.nutritionDays || 0) + 1;
    }
  }

  if (ctx.type === 'weight') {
    const entries = (await getWeightEntries(userId)) || [];
    cnt.weightEntries = Math.max(cnt.weightEntries || 0, entries.length);
  }
}

// ── Prüf-Engine ──────────────────────────────────────────────
// Liefert die NEU freigeschalteten Achievements (idempotent).
export async function checkAchievements(userId, ctx) {
  try {
    const state = await getAchievementState(userId);
    if (!state.backfilled) await backfill(state, userId);
    await updateCounters(state, ctx, userId);

    const newly = [];
    for (const a of ACHIEVEMENTS) {
      if (state.badges[a.id]) continue;
      if (a.check(state, ctx)) {
        state.badges[a.id] = { unlockedAt: todayLocal() };
        newly.push(a);
      }
    }

    await saveAchievementState(userId, state);
    return newly;
  } catch (err) {
    console.error('checkAchievements failed:', err);
    return [];
  }
}
