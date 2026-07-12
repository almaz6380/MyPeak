import { supabase } from '../lib/supabase';
import { isGuest } from '../context/AuthContext';

function guestSkip(userId) { return isGuest(userId); }

const ACHIEVEMENTS_KEY = 'user_achievements';

// State-Shape: { badges: {id:{unlockedAt}}, counters: {...}, backfilled: bool }
const EMPTY_STATE = { badges: {}, counters: {}, backfilled: false };

function _readLocal() {
  try {
    return { ...EMPTY_STATE, ...JSON.parse(localStorage.getItem(ACHIEVEMENTS_KEY) || '{}') };
  } catch {
    return { ...EMPTY_STATE };
  }
}

// Cloud + lokal vereinen: Badges = Union (frühestes Datum gewinnt), Zähler = Maximum
function _merge(cloud, local) {
  const badges = { ...cloud.badges };
  for (const [id, b] of Object.entries(local.badges || {})) {
    if (!badges[id] || (b.unlockedAt || '') < (badges[id].unlockedAt || '')) badges[id] = b;
  }
  const counters = { ...cloud.counters };
  for (const [k, v] of Object.entries(local.counters || {})) {
    if (typeof v === 'number') counters[k] = Math.max(counters[k] || 0, v);
    else if (counters[k] === undefined) counters[k] = v;
  }
  return { badges, counters, backfilled: Boolean(cloud.backfilled || local.backfilled) };
}

export async function getAchievementState(userId) {
  const local = _readLocal();

  if (guestSkip(userId)) return local;

  try {
    const { data } = await supabase
      .from('user_achievements')
      .select('achievements')
      .eq('user_id', userId)
      .single();
    if (data?.achievements) {
      const merged = _merge({ ...EMPTY_STATE, ...data.achievements }, local);
      localStorage.setItem(ACHIEVEMENTS_KEY, JSON.stringify(merged));
      return merged;
    }
  } catch {
    // offline → lokaler Stand
  }
  return local;
}

export async function saveAchievementState(userId, state) {
  localStorage.setItem(ACHIEVEMENTS_KEY, JSON.stringify(state));

  if (guestSkip(userId)) return;

  try {
    await supabase
      .from('user_achievements')
      .upsert(
        { user_id: userId, achievements: state, updated_at: new Date().toISOString() },
        { onConflict: 'user_id' }
      );
  } catch (err) {
    console.error('Failed to save achievements:', err);
  }
}
