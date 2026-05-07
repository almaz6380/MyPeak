import { supabase } from '../lib/supabase';

export async function loadSettings(userId) {
  const { data, error } = await supabase
    .from('user_settings')
    .select('*')
    .eq('user_id', userId)
    .single();

  if (!error && data) {
    // Cache to localStorage
    localStorage.setItem('weightUnit', data.weight_unit || 'kg');
    localStorage.setItem('language', data.language || 'de');
    localStorage.setItem('darkMode', JSON.stringify(data.dark_mode ?? false));
    return data;
  }

  return null;
}

export async function saveSetting(userId, key, value) {
  // Map localStorage key names to Supabase column names
  const columnMap = {
    weightUnit: 'weight_unit',
    language: 'language',
    darkMode: 'dark_mode',
  };

  const column = columnMap[key];
  if (!column) return;

  await supabase
    .from('user_settings')
    .update({ [column]: value, updated_at: new Date().toISOString() })
    .eq('user_id', userId);
}

export function getHiddenDefaultPlans() {
  try {
    return JSON.parse(localStorage.getItem('hiddenDefaultPlans') || '[]');
  } catch {
    return [];
  }
}

export function saveHiddenDefaultPlans(planIds) {
  localStorage.setItem('hiddenDefaultPlans', JSON.stringify(planIds));
}

export function hideDefaultPlan(planId) {
  const hidden = getHiddenDefaultPlans();
  if (!hidden.includes(planId)) {
    hidden.push(planId);
    saveHiddenDefaultPlans(hidden);
  }
}

export function restoreDefaultPlan(planId) {
  const hidden = getHiddenDefaultPlans().filter((id) => id !== planId);
  saveHiddenDefaultPlans(hidden);
}

export function getPermanentDeletedDefaultPlans() {
  try {
    return JSON.parse(localStorage.getItem('permanentDeletedDefaultPlans') || '[]');
  } catch {
    return [];
  }
}

export function permanentDeleteDefaultPlan(planId) {
  // Remove from hidden list
  const hidden = getHiddenDefaultPlans().filter((id) => id !== planId);
  saveHiddenDefaultPlans(hidden);
  // Add to permanently deleted list
  const permaDeleted = getPermanentDeletedDefaultPlans();
  if (!permaDeleted.includes(planId)) {
    permaDeleted.push(planId);
    localStorage.setItem('permanentDeletedDefaultPlans', JSON.stringify(permaDeleted));
  }
}
