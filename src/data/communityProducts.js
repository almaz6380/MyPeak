import { supabase } from '../lib/supabase';
import { isGuest } from '../context/AuthContext';

// ── Community Product Lookup ─────────────────────────────────

export async function lookupCommunityProduct(barcode) {
  try {
    const { data } = await supabase
      .from('community_products')
      .select('*')
      .eq('barcode', barcode)
      .single();

    return data || null;
  } catch {
    return null;
  }
}

export async function addCommunityProduct(userId, product) {
  if (isGuest(userId)) return null;

  try {
    const { data, error } = await supabase
      .from('community_products')
      .insert({
        barcode: product.barcode,
        name: product.name,
        brand: product.brand || null,
        calories: product.calories,
        protein: product.protein,
        carbs: product.carbs,
        fat: product.fat,
        created_by: userId,
      })
      .select()
      .single();

    if (error?.code === '23505') {
      // Already exists — increment confirmations
      await supabase.rpc('increment_confirmations', { barcode_input: product.barcode });
      return await lookupCommunityProduct(product.barcode);
    }

    return data;
  } catch {
    return null;
  }
}

// ── Personal Overrides ───────────────────────────────────────

export async function getPersonalOverride(userId, barcode) {
  if (isGuest(userId)) return null;

  const { data } = await supabase
    .from('product_overrides')
    .select('*')
    .eq('user_id', userId)
    .eq('barcode', barcode)
    .single();

  return data || null;
}

export async function savePersonalOverride(userId, barcode, nutrition) {
  if (isGuest(userId)) return;

  await supabase
    .from('product_overrides')
    .upsert({
      user_id: userId,
      barcode,
      calories: nutrition.calories,
      protein: nutrition.protein,
      carbs: nutrition.carbs,
      fat: nutrition.fat,
    });

  // Check crowdsource: if 3+ users have similar overrides, update community product
  await checkCrowdsource(barcode);
}

async function checkCrowdsource(barcode) {
  const { data: overrides } = await supabase
    .from('product_overrides')
    .select('calories, protein, carbs, fat')
    .eq('barcode', barcode);

  if (!overrides || overrides.length < 3) return;

  // Calculate average
  const avg = {
    calories: Math.round(overrides.reduce((s, o) => s + o.calories, 0) / overrides.length),
    protein: Math.round(overrides.reduce((s, o) => s + o.protein, 0) / overrides.length * 10) / 10,
    carbs: Math.round(overrides.reduce((s, o) => s + o.carbs, 0) / overrides.length * 10) / 10,
    fat: Math.round(overrides.reduce((s, o) => s + o.fat, 0) / overrides.length * 10) / 10,
  };

  // Check if values are similar (within 15% of each other)
  const allSimilar = overrides.every((o) => {
    if (avg.calories === 0) return true;
    return Math.abs(o.calories - avg.calories) / avg.calories < 0.15;
  });

  if (allSimilar) {
    await supabase
      .from('community_products')
      .update({
        calories: avg.calories,
        protein: avg.protein,
        carbs: avg.carbs,
        fat: avg.fat,
        confirmations: overrides.length,
      })
      .eq('barcode', barcode);
  }
}
