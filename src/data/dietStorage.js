import { supabase } from '../lib/supabase';
import { isGuest } from '../context/AuthContext';
import { saveNutritionGoals, getNutritionGoals } from './nutritionStorage';

function guestSkip(userId) { return isGuest(userId); }

const ACTIVE_DIET_KEY = 'active_diet';

// ── Active Diet CRUD ────────────────────────────────────────────

export async function getActiveDiet(userId) {
  const cached = localStorage.getItem(ACTIVE_DIET_KEY);
  if (cached) return JSON.parse(cached);

  if (!guestSkip(userId)) {
    try {
      const { data, error } = await supabase
        .from('active_diet')
        .select('*')
        .eq('user_id', userId)
        .single();

      if (!error && data) {
        localStorage.setItem(ACTIVE_DIET_KEY, JSON.stringify(data));
        return data;
      }
    } catch (err) {
      console.error('Failed to load active diet:', err);
    }
  }

  return null;
}

export async function startDiet(userId, dietId, config = {}) {
  const entry = {
    user_id: userId,
    diet_id: dietId,
    started_at: new Date().toISOString().split('T')[0],
    config,
    updated_at: new Date().toISOString(),
  };

  localStorage.setItem(ACTIVE_DIET_KEY, JSON.stringify(entry));

  if (!guestSkip(userId)) {
    try {
      await supabase
        .from('active_diet')
        .upsert(entry, { onConflict: 'user_id' });
    } catch (err) {
      console.error('Failed to save active diet:', err);
    }
  }

  return entry;
}

export async function stopDiet(userId) {
  localStorage.removeItem(ACTIVE_DIET_KEY);

  if (!guestSkip(userId)) {
    try {
      await supabase
        .from('active_diet')
        .delete()
        .eq('user_id', userId);
    } catch (err) {
      console.error('Failed to delete active diet:', err);
    }
  }
}

// ── Diet Goal Calculation ───────────────────────────────────────

export function calculateDietGoals(diet, profile, tdee) {
  if (!diet?.adjustments || !tdee) return null;

  const adj = diet.adjustments;
  const weightKg = profile?.weight_kg || 75;
  const baseCalories = tdee + (adj.calorie_offset || 0);
  const proteinG = Math.round(weightKg * (adj.protein_per_kg || 2.0));

  // Protein calories = protein * 4
  // Remaining calories split between carbs (55%) and fat (30%)
  const proteinCal = proteinG * 4;
  const remaining = Math.max(0, baseCalories - proteinCal);
  const fatCal = remaining * 0.35;
  const carbCal = remaining * 0.65;

  return {
    calories: Math.round(baseCalories),
    protein: proteinG,
    carbs: Math.round(carbCal / 4),
    fat: Math.round(fatCal / 9),
  };
}

export async function applyDietGoals(userId, goals) {
  const current = await getNutritionGoals(userId);
  const merged = {
    ...current,
    calories: goals.calories,
    protein: goals.protein,
    carbs: goals.carbs,
    fat: goals.fat,
  };
  await saveNutritionGoals(userId, merged);
}

// ── Progressive Diet Phase Check ────────────────────────────────

export function getCurrentPhase(diet, startedAt) {
  if (!diet?.adjustments?.phases || diet.adjustments.type !== 'progressive') return null;

  const start = new Date(startedAt);
  const now = new Date();
  const daysSinceStart = Math.floor((now - start) / 86400000);
  const weeksSinceStart = Math.floor(daysSinceStart / 7);

  let accumulatedWeeks = 0;
  let currentPhaseIndex = 0;
  let cumulativeCalorieChange = 0;

  for (let i = 0; i < diet.adjustments.phases.length; i++) {
    const phase = diet.adjustments.phases[i];
    if (weeksSinceStart < accumulatedWeeks + phase.weeks) {
      currentPhaseIndex = i;
      break;
    }
    accumulatedWeeks += phase.weeks;
    cumulativeCalorieChange += phase.calorie_change;
    currentPhaseIndex = i;
  }

  const totalWeeks = diet.adjustments.phases.reduce((sum, p) => sum + p.weeks, 0);
  const weeksInPhase = weeksSinceStart - accumulatedWeeks;

  return {
    phaseIndex: currentPhaseIndex,
    weeksInPhase,
    totalWeeks,
    weeksSinceStart,
    cumulativeCalorieChange,
    isComplete: weeksSinceStart >= totalWeeks,
  };
}
