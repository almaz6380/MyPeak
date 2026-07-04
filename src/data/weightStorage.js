import { supabase } from '../lib/supabase';
import { isGuest } from '../context/AuthContext';

function guestSkip(userId) { return isGuest(userId); }

const WEIGHT_KEY = 'weight_entries';

// Neueste `limit` Einträge holen (absteigend), dann fürs Diagramm aufsteigend sortieren.
// Vorher wurde aufsteigend limitiert → man bekam die ÄLTESTEN 90 statt der neuesten.
function _fetchWeights(userId, limit) {
  return supabase
    .from('weight_entries')
    .select('*')
    .eq('user_id', userId)
    .order('date', { ascending: false })
    .limit(limit)
    .then(({ data, error }) => (!error && data ? data.reverse() : null));
}

// Cloud-Daten übernehmen, aber noch nicht gesyncte lokale Einträge behalten
function _mergeWeights(cloudRows) {
  const currentLocal = JSON.parse(localStorage.getItem(WEIGHT_KEY) || '[]');
  const cloudDates = new Set(cloudRows.map((e) => e.date));
  const localOnly = currentLocal.filter((e) => String(e.id).startsWith('local_') && !cloudDates.has(e.date));
  const merged = [...cloudRows, ...localOnly].sort((a, b) => a.date.localeCompare(b.date));
  localStorage.setItem(WEIGHT_KEY, JSON.stringify(merged));
  return merged;
}

export async function getWeightEntries(userId, limit = 90) {
  // localStorage first — instant
  const cached = localStorage.getItem(WEIGHT_KEY);
  if (cached) {
    // Refresh from Supabase in background
    if (!guestSkip(userId)) {
      _fetchWeights(userId, limit)
        .then((data) => { if (data) _mergeWeights(data); })
        .catch(() => {});
    }
    try { return JSON.parse(cached); } catch { return []; }
  }

  // No cache → must await Supabase
  if (!guestSkip(userId)) {
    try {
      const data = await _fetchWeights(userId, limit);
      if (data) return _mergeWeights(data);
    } catch (err) {
      console.error('Failed to load weight entries:', err);
    }
  }

  return [];
}

export async function saveWeightEntry(userId, date, weightKg) {
  // localStorage first
  const cached = JSON.parse(localStorage.getItem(WEIGHT_KEY) || '[]');
  const existing = cached.findIndex((e) => e.date === date);
  const entry = { id: `local_${Date.now()}`, user_id: userId, date, weight_kg: weightKg, created_at: new Date().toISOString() };

  if (existing >= 0) {
    cached[existing] = { ...cached[existing], weight_kg: weightKg };
  } else {
    cached.push(entry);
    cached.sort((a, b) => a.date.localeCompare(b.date));
  }
  localStorage.setItem(WEIGHT_KEY, JSON.stringify(cached));

  if (!guestSkip(userId)) {
    try {
      await supabase
        .from('weight_entries')
        .upsert({ user_id: userId, date, weight_kg: weightKg }, { onConflict: 'user_id,date' });
    } catch (err) {
      console.error('Failed to save weight entry:', err);
    }
  }

  return { data: entry, error: null };
}
