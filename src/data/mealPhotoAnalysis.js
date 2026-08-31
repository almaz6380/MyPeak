import { compressImage } from './exercisePhotos';
import { supabase } from '../lib/supabase';
import { API_BASIS } from './apiBasis';

// Oil level adjustment multipliers (applied to fat content)
const OIL_MULTIPLIERS = {
  wenig: 0.7,
  normal: 1.0,
  viel: 1.5,
};

/**
 * Compress a meal photo for API upload.
 * Ensures base64 output stays under ~3MB (safe for Vercel's 4.5MB body limit).
 * Tries higher quality first, then reduces if still too large.
 */
export async function compressMealPhoto(file) {
  // First attempt: 1024px, quality 0.7
  let result = await compressImage(file, 1024, 0.7);

  // Check base64 size (each char ≈ 1 byte, data URL prefix ~23 chars)
  if (result.length > 3_000_000) {
    // Too large — retry with lower quality
    result = await compressImage(file, 800, 0.5);
  }

  if (result.length > 3_000_000) {
    // Still too large — aggressive compression
    result = await compressImage(file, 640, 0.3);
  }

  return result;
}

/**
 * Send meal photo to API for analysis
 */
export async function analyzeMealPhoto(base64Image, language = 'de') {
  const controller = new AbortController();
  // Gemini can take a while — 25s timeout (was 15s, too short for large images)
  const timeout = setTimeout(() => controller.abort(), 25000);

  try {
    // Login-Pflicht: Der Endpoint verlangt ein gültiges Supabase-Token
    const { data: { session } } = await supabase.auth.getSession();
    const token = session?.access_token;
    if (!token) {
      throw new Error('auth_required');
    }

    const response = await fetch(`${API_BASIS}/api/analyze-meal`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify({ image: base64Image, language }),
      signal: controller.signal,
    });

    if (!response.ok) {
      const err = await response.json().catch(() => ({}));
      if (response.status === 401) {
        throw new Error('auth_required');
      }
      if (response.status === 413) {
        throw new Error('image_too_large');
      }
      if (response.status === 429) {
        throw new Error('rate_limit');
      }
      if (response.status === 502) {
        throw new Error('ai_service_unavailable');
      }
      throw new Error(err.error || `API request failed (${response.status})`);
    }

    const data = await response.json();

    if (data.error === 'no_food_detected') {
      return { error: 'no_food_detected', items: [] };
    }

    return data;
  } catch (err) {
    if (err.name === 'AbortError') {
      throw new Error('timeout');
    }
    throw err;
  } finally {
    clearTimeout(timeout);
  }
}

/**
 * Apply oil level adjustment to AI-detected items
 * Only affects fat and calories (protein + carbs stay the same)
 */
export function applyOilAdjustment(items, oilLevel = 'normal') {
  const multiplier = OIL_MULTIPLIERS[oilLevel] || 1.0;
  if (multiplier === 1.0) return items;

  return items.map((item) => {
    const originalFat = item.fat;
    const adjustedFat = Math.round(originalFat * multiplier * 10) / 10;
    const fatDiff = adjustedFat - originalFat;
    const adjustedCalories = Math.round(item.calories + fatDiff * 9);

    return {
      ...item,
      fat: adjustedFat,
      calories: adjustedCalories,
    };
  });
}

/**
 * Convert AI result items to nutrition entry format
 */
export function itemsToNutritionEntries(items, language = 'de') {
  return items.map((item) => ({
    food_name: language === 'de' ? item.name_de : item.name_en,
    brand: null,
    serving_size: item.portion_g,
    serving_unit: 'g',
    calories: Math.round(item.calories),
    protein: Math.round(item.protein * 10) / 10,
    carbs: Math.round(item.carbs * 10) / 10,
    fat: Math.round(item.fat * 10) / 10,
    source: 'ai_photo',
    source_id: null,
  }));
}
