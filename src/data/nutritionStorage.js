import { supabase } from '../lib/supabase';
import { isGuest } from '../context/AuthContext';

// Helper: skip Supabase for guest users
function guestSkip(userId) { return isGuest(userId); }

const ENTRIES_PREFIX = 'nutrition_entries_';
const CUSTOM_MEALS_KEY = 'custom_meals';
const GOALS_KEY = 'nutrition_goals';

// ── Nutrition Entries ────────────────────────────────────────

export async function getNutritionEntries(userId, date) {
  const cacheKey = ENTRIES_PREFIX + date;

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

  const cached = localStorage.getItem(cacheKey);
  return cached ? JSON.parse(cached) : [];
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
  cached.push(data || { ...entry, id: `local_${Date.now()}` });
  localStorage.setItem(cacheKey, JSON.stringify(cached));

  return { data, error };
}

export async function updateNutritionEntry(userId, entryId, updates) {
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
  await supabase
    .from('nutrition_entries')
    .delete()
    .eq('id', entryId)
    .eq('user_id', userId);

  const cacheKey = ENTRIES_PREFIX + date;
  const cached = JSON.parse(localStorage.getItem(cacheKey) || '[]');
  localStorage.setItem(cacheKey, JSON.stringify(cached.filter((e) => e.id !== entryId)));
}

// ── Custom Meals ─────────────────────────────────────────────

export async function getCustomMeals(userId) {
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

  try {
    return JSON.parse(localStorage.getItem(CUSTOM_MEALS_KEY) || '[]');
  } catch {
    return [];
  }
}

export async function saveCustomMeal(userId, meal) {
  const { data, error } = await supabase
    .from('custom_meals')
    .insert({
      user_id: userId,
      name: meal.name,
      items: meal.items,
      total_calories: meal.total_calories,
      total_protein: meal.total_protein,
      total_carbs: meal.total_carbs,
      total_fat: meal.total_fat,
    })
    .select()
    .single();

  const cached = JSON.parse(localStorage.getItem(CUSTOM_MEALS_KEY) || '[]');
  cached.unshift(data || meal);
  localStorage.setItem(CUSTOM_MEALS_KEY, JSON.stringify(cached));

  return { data, error };
}

export async function updateCustomMeal(userId, mealId, meal) {
  const { data, error } = await supabase
    .from('custom_meals')
    .update({
      name: meal.name,
      items: meal.items,
      total_calories: meal.total_calories,
      total_protein: meal.total_protein,
      total_carbs: meal.total_carbs,
      total_fat: meal.total_fat,
    })
    .eq('id', mealId)
    .eq('user_id', userId)
    .select()
    .single();

  const cached = JSON.parse(localStorage.getItem(CUSTOM_MEALS_KEY) || '[]');
  const idx = cached.findIndex((m) => m.id === mealId);
  if (idx >= 0) {
    cached[idx] = data || { ...cached[idx], ...meal };
    localStorage.setItem(CUSTOM_MEALS_KEY, JSON.stringify(cached));
  }

  return { data, error };
}

export async function deleteCustomMeal(userId, mealId) {
  await supabase
    .from('custom_meals')
    .update({ deleted_at: new Date().toISOString() })
    .eq('id', mealId)
    .eq('user_id', userId);

  const cached = JSON.parse(localStorage.getItem(CUSTOM_MEALS_KEY) || '[]');
  localStorage.setItem(CUSTOM_MEALS_KEY, JSON.stringify(cached.filter((m) => m.id !== mealId)));
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

  const { data, error } = await supabase
    .from('nutrition_entries')
    .insert(entries)
    .select();

  if (!error && data) {
    const cacheKey = ENTRIES_PREFIX + date;
    const cached = JSON.parse(localStorage.getItem(cacheKey) || '[]');
    cached.push(...data);
    localStorage.setItem(cacheKey, JSON.stringify(cached));
  }

  return { data, error };
}

// ── Nutrition Goals ──────────────────────────────────────────

export async function getNutritionGoals(userId) {
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

  const cached = localStorage.getItem(GOALS_KEY);
  if (cached) return JSON.parse(cached);

  return { calories: 2000, protein: 150, carbs: 250, fat: 70, water_ml: 3000 };
}

export async function saveNutritionGoals(userId, goals) {
  let data = null;

  if (!guestSkip(userId)) {
    ({ data } = await supabase
      .from('nutrition_goals')
      .upsert({
        user_id: userId,
        calories: goals.calories,
        protein: goals.protein,
        carbs: goals.carbs,
        fat: goals.fat,
        tdee: goals.tdee || null,
        water_ml: goals.water_ml || 3000,
        updated_at: new Date().toISOString(),
      })
      .select()
      .single());
  }

  localStorage.setItem(GOALS_KEY, JSON.stringify(data || goals));

  return { data, error: null };
}

// ── Recent Foods ─────────────────────────────────────────────

export async function getRecentFoods(userId, limit = 10) {
  let data = null;

  if (!guestSkip(userId)) {
    ({ data } = await supabase
      .from('nutrition_entries')
      .select('food_name, brand, serving_size, serving_unit, calories, protein, carbs, fat, source, source_id')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
      .limit(50));
  }

  if (!data) return [];

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

  if (!guestSkip(userId)) {
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
  }

  const cached = localStorage.getItem(cacheKey);
  if (cached) return JSON.parse(cached);
  return { entries: [], total: 0 };
}

export async function addWater(userId, date, amountMl) {
  let data = null;

  if (!guestSkip(userId)) {
    ({ data } = await supabase
      .from('water_entries')
      .insert({ user_id: userId, date, amount_ml: amountMl })
      .select()
      .single());
  }

  const cacheKey = WATER_PREFIX + date;
  const cached = JSON.parse(localStorage.getItem(cacheKey) || '{"entries":[],"total":0}');
  cached.entries.push(data || { id: `local_${Date.now()}`, amount_ml: amountMl });
  cached.total += amountMl;
  localStorage.setItem(cacheKey, JSON.stringify(cached));

  return { data, error: null };
}

export async function removeLastWater(userId, date) {
  const cacheKey = WATER_PREFIX + date;

  // Get the most recent entry for this date
  const { data: entries } = await supabase
    .from('water_entries')
    .select('id, amount_ml')
    .eq('user_id', userId)
    .eq('date', date)
    .order('created_at', { ascending: false })
    .limit(1);

  if (!entries || entries.length === 0) return;

  const last = entries[0];
  await supabase.from('water_entries').delete().eq('id', last.id);

  const cached = JSON.parse(localStorage.getItem(cacheKey) || '{"entries":[],"total":0}');
  cached.entries = cached.entries.filter((e) => e.id !== last.id);
  cached.total = Math.max(0, cached.total - last.amount_ml);
  localStorage.setItem(cacheKey, JSON.stringify(cached));
}
