import { supabase } from '../lib/supabase';
import { isGuest } from '../context/AuthContext';

function guestSkip(userId) { return isGuest(userId); }

const WEIGHT_KEY = 'weight_entries';

export async function getWeightEntries(userId, limit = 90) {
  if (!guestSkip(userId)) {
    try {
      const { data, error } = await supabase
        .from('weight_entries')
        .select('*')
        .eq('user_id', userId)
        .order('date', { ascending: true })
        .limit(limit);

      if (!error && data) {
        localStorage.setItem(WEIGHT_KEY, JSON.stringify(data));
        return data;
      }
    } catch (err) {
      console.error('Failed to load weight entries:', err);
    }
  }

  try {
    return JSON.parse(localStorage.getItem(WEIGHT_KEY) || '[]');
  } catch {
    return [];
  }
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
