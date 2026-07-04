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
  // Läuft serverseitig (SECURITY DEFINER RPC) — Clients können Community-Daten
  // nicht mehr direkt überschreiben und fremde Overrides nicht mehr lesen.
  try {
    await supabase.rpc('apply_crowdsource_correction', { barcode_input: barcode });
  } catch (err) {
    console.error('Crowdsource check failed:', err);
  }
}
