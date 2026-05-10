import { supabase } from '../lib/supabase';
import { isGuest } from '../context/AuthContext';

// ── Friend Codes ─────────────────────────────────────────────

export function generateFriendCode(name) {
  const cleanName = (name || 'USER').toUpperCase().replace(/[^A-Z]/g, '').slice(0, 8);
  const num = Math.floor(1000 + Math.random() * 9000);
  return `MP-${cleanName}-${num}`;
}

export async function getOrCreateFriendCode(userId, name) {
  if (isGuest(userId)) return null;

  // Check if code exists
  const { data } = await supabase
    .from('friend_codes')
    .select('code')
    .eq('user_id', userId)
    .single();

  if (data) return data.code;

  // Generate and insert new code
  let code = generateFriendCode(name);
  let attempts = 0;
  while (attempts < 5) {
    const { error } = await supabase
      .from('friend_codes')
      .insert({ user_id: userId, code });
    if (!error) return code;
    // Code collision — regenerate
    code = generateFriendCode(name);
    attempts++;
  }
  return null;
}

export async function lookupFriendCode(code) {
  const { data } = await supabase
    .from('friend_codes')
    .select('user_id')
    .eq('code', code.toUpperCase().trim())
    .single();
  return data?.user_id || null;
}

// ── Friendships ──────────────────────────────────────────────

export async function sendFriendRequest(userId, friendId) {
  if (isGuest(userId) || userId === friendId) return { error: 'invalid' };

  // Check if friendship already exists (in either direction)
  const { data: existing } = await supabase
    .from('friendships')
    .select('id, status')
    .or(`and(sender_id.eq.${userId},receiver_id.eq.${friendId}),and(sender_id.eq.${friendId},receiver_id.eq.${userId})`)
    .in('status', ['pending', 'accepted']);

  if (existing && existing.length > 0) {
    return { error: 'already_exists' };
  }

  const { data, error } = await supabase
    .from('friendships')
    .insert({ sender_id: userId, receiver_id: friendId, status: 'pending' })
    .select()
    .single();

  return { data, error };
}

export async function getFriendRequests(userId) {
  if (isGuest(userId)) return [];

  const { data, error } = await supabase
    .from('friendships')
    .select('id, sender_id, receiver_id, status, created_at')
    .eq('receiver_id', userId)
    .eq('status', 'pending')
    .order('created_at', { ascending: false });

  if (error || !data) return [];

  // Fetch sender profiles separately
  const senderIds = data.map((r) => r.sender_id);
  const { data: profiles } = await supabase
    .from('profiles')
    .select('id, name')
    .in('id', senderIds);

  return data.map((r) => ({
    ...r,
    sender: profiles?.find((p) => p.id === r.sender_id) || { id: r.sender_id, name: 'User' },
  }));
}

export async function respondToFriendRequest(requestId, accept) {
  const { error } = await supabase
    .from('friendships')
    .update({ status: accept ? 'accepted' : 'declined' })
    .eq('id', requestId);

  return { error };
}

export async function getFriends(userId) {
  if (isGuest(userId)) return [];

  const { data, error } = await supabase
    .from('friendships')
    .select('id, sender_id, receiver_id, status')
    .or(`sender_id.eq.${userId},receiver_id.eq.${userId}`)
    .eq('status', 'accepted');

  if (error || !data || data.length === 0) return [];

  // Get all friend user IDs
  const friendIds = data.map((f) => f.sender_id === userId ? f.receiver_id : f.sender_id);
  const { data: profiles } = await supabase
    .from('profiles')
    .select('id, name')
    .in('id', friendIds);

  return data.map((f) => {
    const friendId = f.sender_id === userId ? f.receiver_id : f.sender_id;
    const profile = profiles?.find((p) => p.id === friendId) || { id: friendId, name: 'User' };
    return { friendshipId: f.id, ...profile };
  });
}

export async function removeFriend(friendshipId) {
  await supabase.from('friendships').delete().eq('id', friendshipId);
}

// ── Challenges ───────────────────────────────────────────────

export async function createChallenge(userId, challenge) {
  if (isGuest(userId)) return { error: 'guest' };

  const { data, error } = await supabase
    .from('challenges')
    .insert({
      challenger_id: userId,
      opponent_id: challenge.opponentId,
      exercise_ids: challenge.exerciseIds,
      criteria: challenge.criteria || 'volume',
      start_date: challenge.startDate,
      end_date: challenge.endDate,
      xp_reward: challenge.xpReward || 50,
    })
    .select()
    .single();

  return { data, error };
}

export async function getChallenges(userId) {
  if (isGuest(userId)) return [];

  const { data, error } = await supabase
    .from('challenges')
    .select('*')
    .or(`challenger_id.eq.${userId},opponent_id.eq.${userId}`)
    .order('created_at', { ascending: false });

  if (error || !data || data.length === 0) return [];

  // Fetch all involved user profiles
  const userIds = [...new Set(data.flatMap((c) => [c.challenger_id, c.opponent_id]))];
  const { data: profiles } = await supabase
    .from('profiles')
    .select('id, name')
    .in('id', userIds);

  return data.map((c) => ({
    ...c,
    challenger: profiles?.find((p) => p.id === c.challenger_id) || { id: c.challenger_id, name: 'User' },
    opponent: profiles?.find((p) => p.id === c.opponent_id) || { id: c.opponent_id, name: 'User' },
  }));
}

export async function respondToChallenge(challengeId, accept) {
  const { error } = await supabase
    .from('challenges')
    .update({ status: accept ? 'active' : 'declined' })
    .eq('id', challengeId);

  return { error };
}

export async function updateChallengeScore(challengeId, userId, score) {
  const { data: challenge } = await supabase
    .from('challenges')
    .select('challenger_id')
    .eq('id', challengeId)
    .single();

  if (!challenge) return;

  const field = challenge.challenger_id === userId ? 'challenger_score' : 'opponent_score';
  await supabase
    .from('challenges')
    .update({ [field]: score })
    .eq('id', challengeId);
}

export async function completeChallenge(challengeId) {
  const { data } = await supabase
    .from('challenges')
    .select('*')
    .eq('id', challengeId)
    .single();

  if (!data) return;

  const winnerId = data.challenger_score >= data.opponent_score
    ? data.challenger_id
    : data.opponent_id;

  await supabase
    .from('challenges')
    .update({ status: 'completed', winner_id: winnerId })
    .eq('id', challengeId);

  // Award XP to winner
  await addXP(winnerId, data.xp_reward || 50);

  return winnerId;
}

// ── XP System ────────────────────────────────────────────────

// XP-Werte
export const XP_VALUES = {
  WORKOUT_COMPLETED: 50,
  NEW_PR: 100,
  STREAK_7: 100,
  STREAK_14: 200,
  STREAK_30: 500,
  NUTRITION_LOGGED: 20,
  CHALLENGE_WON: 150,
  FRIEND_INVITED: 75,
  DAILY_LOGIN: 5,
};

// Titel basierend auf Level
export function getLevelTitle(level) {
  if (level >= 51) return { de: 'GOAT', en: 'GOAT', emoji: '🐐' };
  if (level >= 31) return { de: 'Legende', en: 'Legend', emoji: '👑' };
  if (level >= 16) return { de: 'Champion', en: 'Champion', emoji: '🏆' };
  if (level >= 6) return { de: 'Warrior', en: 'Warrior', emoji: '⚔️' };
  return { de: 'Rookie', en: 'Rookie', emoji: '🌱' };
}

// XP pro Level (progressiv: Level 1=100, Level 2=150, Level 3=200...)
export function xpForLevel(level) {
  return 100 + (level - 1) * 50;
}

export function calculateLevel(totalXP) {
  let level = 1;
  let xpNeeded = 0;
  while (xpNeeded + xpForLevel(level) <= totalXP) {
    xpNeeded += xpForLevel(level);
    level++;
  }
  const xpInCurrentLevel = totalXP - xpNeeded;
  const xpToNextLevel = xpForLevel(level);
  return { level, xpInCurrentLevel, xpToNextLevel, progress: xpInCurrentLevel / xpToNextLevel };
}

// Kosmetische Rewards
export function hasGoldenFrame(level) {
  return level >= 30;
}

export async function getXP(userId) {
  if (isGuest(userId)) return { total_xp: 0, level: 1, streak_days: 0 };

  const { data } = await supabase
    .from('user_xp')
    .select('*')
    .eq('user_id', userId)
    .single();

  if (data) return data;

  const { data: created } = await supabase
    .from('user_xp')
    .upsert({ user_id: userId })
    .select()
    .single();

  return created || { total_xp: 0, level: 1, streak_days: 0 };
}

// Returns { oldLevel, newLevel, xpGained } for level-up detection
export async function addXP(userId, amount) {
  if (isGuest(userId)) return { oldLevel: 1, newLevel: 1, xpGained: 0 };

  const current = await getXP(userId);
  const oldLevel = calculateLevel(current.total_xp || 0).level;
  const newXP = (current.total_xp || 0) + amount;
  const { level: newLevel } = calculateLevel(newXP);

  await supabase
    .from('user_xp')
    .upsert({
      user_id: userId,
      total_xp: newXP,
      level: newLevel,
      updated_at: new Date().toISOString(),
    });

  return { oldLevel, newLevel, xpGained: amount };
}

export async function updateStreak(userId) {
  if (isGuest(userId)) return null;

  const xp = await getXP(userId);
  const today = new Date().toISOString().split('T')[0];
  const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];

  let newStreak = 1;
  if (xp.last_workout_date === yesterday) {
    newStreak = (xp.streak_days || 0) + 1;
  } else if (xp.last_workout_date === today) {
    return null; // Already counted today
  }

  // Streak bonuses (gestaffelt)
  let totalXPGain = XP_VALUES.WORKOUT_COMPLETED;
  if (newStreak >= 30 && (xp.streak_days || 0) < 30) totalXPGain += XP_VALUES.STREAK_30;
  else if (newStreak >= 14 && (xp.streak_days || 0) < 14) totalXPGain += XP_VALUES.STREAK_14;
  else if (newStreak >= 7 && (xp.streak_days || 0) < 7) totalXPGain += XP_VALUES.STREAK_7;

  const newTotalXP = (xp.total_xp || 0) + totalXPGain;
  const { level: newLevel } = calculateLevel(newTotalXP);
  const oldLevel = calculateLevel(xp.total_xp || 0).level;

  await supabase
    .from('user_xp')
    .upsert({
      user_id: userId,
      total_xp: newTotalXP,
      level: newLevel,
      streak_days: newStreak,
      last_workout_date: today,
      updated_at: new Date().toISOString(),
    });

  return { oldLevel, newLevel, xpGained: totalXPGain, streak: newStreak };
}

// ── Leaderboard ──────────────────────────────────────────────

export function getLeaderboardCategory() {
  // Rotate weekly: volume → streak → workouts
  const weekNum = Math.floor(Date.now() / (7 * 86400000));
  const categories = ['volume', 'streak', 'workouts'];
  return categories[weekNum % 3];
}

export async function getLeaderboardData(userId, friends) {
  if (isGuest(userId) || friends.length === 0) return [];

  const allUserIds = [userId, ...friends.map((f) => f.id)];
  const category = getLeaderboardCategory();

  // Get XP data for all users
  const { data: xpData } = await supabase
    .from('user_xp')
    .select('user_id, total_xp, level, streak_days')
    .in('user_id', allUserIds);

  // Get this week's workouts for all users
  const weekStart = new Date();
  weekStart.setDate(weekStart.getDate() - weekStart.getDay());
  const weekStartStr = weekStart.toISOString().split('T')[0];

  const { data: workouts } = await supabase
    .from('workouts')
    .select('user_id, exercises, date')
    .in('user_id', allUserIds)
    .gte('date', weekStartStr);

  // Build leaderboard entries
  const entries = allUserIds.map((uid) => {
    const userXP = xpData?.find((x) => x.user_id === uid) || {};
    const userWorkouts = (workouts || []).filter((w) => w.user_id === uid);
    const friend = friends.find((f) => f.id === uid);
    const name = uid === userId ? 'Du' : (friend?.name || 'User');

    let score = 0;
    if (category === 'volume') {
      for (const w of userWorkouts) {
        for (const ex of (w.exercises || [])) {
          for (const s of (ex.sets || [])) {
            score += (s.weight || 0) * (s.reps || 0);
          }
        }
      }
    } else if (category === 'streak') {
      score = userXP.streak_days || 0;
    } else if (category === 'workouts') {
      score = userWorkouts.length;
    }

    return {
      userId: uid,
      name,
      score,
      level: userXP.level || 1,
      totalXP: userXP.total_xp || 0,
      isMe: uid === userId,
    };
  });

  entries.sort((a, b) => b.score - a.score);
  return entries;
}
