import { supabase } from '../lib/supabase';
import { isGuest } from '../context/AuthContext';
import { SPRACHEN } from '../lib/sprache';

export async function loadSettings(userId) {
  if (isGuest(userId)) return null;

  const { data, error } = await supabase
    .from('user_settings')
    .select('*')
    .eq('user_id', userId)
    .single();

  if (!error && data) {
    localStorage.setItem('weightUnit', data.weight_unit || 'kg');
    // Nur eine echte Wahl übernehmen. NULL heißt „nie gewählt" — dann bleibt
    // die Gerätesprache stehen, statt auf Deutsch zurückzuspringen.
    if (SPRACHEN.includes(data.language)) localStorage.setItem('language', data.language);
    // Cloud-Dark-Mode geräteübergreifend anwenden: themeChosen setzen (aktive
    // Wahl zählt auch nach Reload) und ThemeProvider benachrichtigen — sonst
    // ist der ThemeContext schon initialisiert und ignoriert den neuen Wert.
    if (typeof data.dark_mode === 'boolean') {
      localStorage.setItem('darkMode', JSON.stringify(data.dark_mode));
      localStorage.setItem('themeChosen', 'true');
      window.dispatchEvent(new CustomEvent('mypeak:darkmode', { detail: data.dark_mode }));
    }
    return data;
  }

  return null;
}

export async function saveSetting(userId, key, value) {
  const columnMap = {
    weightUnit: 'weight_unit',
    language: 'language',
    darkMode: 'dark_mode',
  };

  const column = columnMap[key];
  if (!column) return;

  // Guest: only localStorage (already saved by caller)
  if (isGuest(userId)) return;

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
