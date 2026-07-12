import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { getWorkouts } from '../data/workoutStorage';

/**
 * ISO week number from a Date object.
 */
function getISOWeek(date) {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  d.setDate(d.getDate() + 3 - ((d.getDay() + 6) % 7));
  const week1 = new Date(d.getFullYear(), 0, 4);
  return 1 + Math.round(((d - week1) / 86400000 - 3 + ((week1.getDay() + 6) % 7)) / 7);
}

export function getWeekYear(date) {
  const d = new Date(date);
  return `${d.getFullYear()}-W${String(getISOWeek(d)).padStart(2, '0')}`;
}

function getWeekRange(date) {
  const d = new Date(date);
  const day = d.getDay();
  const monday = new Date(d);
  monday.setDate(d.getDate() - ((day + 6) % 7));
  const sunday = new Date(monday);
  sunday.setDate(monday.getDate() + 6);
  return { start: monday, end: sunday };
}

function bestSetFromSets(sets) {
  if (!sets || sets.length === 0) return null;
  let best = sets[0];
  for (const s of sets) {
    if ((s.weight || 0) > (best.weight || 0) ||
        ((s.weight || 0) === (best.weight || 0) && (s.reps || 0) > (best.reps || 0))) {
      best = s;
    }
  }
  return best;
}

/**
 * Central data hook for progressive overload comparison.
 * Loads all workouts once, derives per-exercise history, weekly groupings, and comparisons.
 */
export default function useProgressComparison(userId) {
  const [loading, setLoading] = useState(true);
  const workoutsRef = useRef([]);
  const historyMapRef = useRef({});
  const [ready, setReady] = useState(false);

  // Load workouts once
  useEffect(() => {
    if (!userId) return;
    let cancelled = false;
    getWorkouts(userId).then((data) => {
      if (cancelled) return;
      workoutsRef.current = data || [];
      // Build history map: { exerciseId: [{ date, weekYear, sets }] }
      const map = {};
      for (const w of workoutsRef.current) {
        if (!w.exercises) continue;
        const weekYear = getWeekYear(w.date);
        for (const ex of w.exercises) {
          if (!ex.sets || !ex.exerciseId) continue;
          if (!map[ex.exerciseId]) map[ex.exerciseId] = [];
          map[ex.exerciseId].push({
            date: w.date,
            weekYear,
            sets: ex.sets,
            duration: w.duration,
          });
        }
      }
      // Sort each exercise history by date DESC
      for (const id in map) {
        map[id].sort((a, b) => new Date(b.date) - new Date(a.date));
      }
      historyMapRef.current = map;
      setLoading(false);
      setReady(true);
    });
    return () => { cancelled = true; };
  }, [userId]);

  // Last session for a given exercise
  const getLastSession = useCallback((exerciseId) => {
    const history = historyMapRef.current[exerciseId];
    if (!history || history.length === 0) return null;
    return history[0]; // Most recent
  }, [ready]);

  // Compare current sets against last session — Progressive Overload logic
  const getComparison = useCallback((exerciseId, currentSets) => {
    const last = getLastSession(exerciseId);
    if (!last) return { status: 'none', weightDiff: 0, repsDiff: 0 };

    const lastBest = bestSetFromSets(last.sets);
    const currentBest = bestSetFromSets(currentSets);

    if (!lastBest || !currentBest) return { status: 'none', weightDiff: 0, repsDiff: 0 };

    const cw = currentBest.weight || 0;
    const cr = currentBest.reps || 0;
    const lw = lastBest.weight || 0;
    const lr = lastBest.reps || 0;

    const weightDiff = cw - lw;
    const repsDiff = cr - lr;

    let status;
    if (cw > lw) {
      status = 'improved'; // Higher weight = always improved
    } else if (cw === lw && cr > lr) {
      status = 'improved'; // Same weight, more reps = improved
    } else if (cw === lw && cr === lr) {
      status = 'same';
    } else {
      status = 'worse';
    }

    return { status, weightDiff, repsDiff };
  }, [ready, getLastSession]);

  // Compare a single set against the same set index from last session
  const getSetComparison = useCallback((exerciseId, setIndex, currentSet) => {
    const last = getLastSession(exerciseId);
    if (!last || !last.sets[setIndex]) return 'none';

    const ls = last.sets[setIndex];
    const cw = parseFloat(currentSet.weight) || 0;
    const cr = parseInt(currentSet.reps) || 0;
    const lw = ls.weight || 0;
    const lr = ls.reps || 0;

    if (cw === 0 && cr === 0) return 'none';
    if (cw > lw) return 'improved';
    if (cw === lw && cr > lr) return 'improved';
    if (cw === lw && cr === lr) return 'same';
    return 'worse';
  }, [ready, getLastSession]);

  // Sparkline data: max weight per week for last 4 weeks
  const getSparklineData = useCallback((exerciseId) => {
    const history = historyMapRef.current[exerciseId];
    if (!history || history.length === 0) return [];

    // Group by weekYear, get max weight per week
    const weekMap = {};
    for (const entry of history) {
      const w = entry.weekYear;
      const best = bestSetFromSets(entry.sets);
      if (best && best.weight) {
        weekMap[w] = Math.max(weekMap[w] || 0, best.weight);
      }
    }

    // Sort weeks and take last 4
    const weeks = Object.keys(weekMap).sort();
    return weeks.slice(-4).map((w) => weekMap[w]);
  }, [ready]);

  // Weekly history: max weight + volume per week for an exercise (last 8 weeks)
  const getWeeklyHistory = useCallback((exerciseId) => {
    const history = historyMapRef.current[exerciseId];
    if (!history || history.length === 0) return [];

    const weekMap = {};
    for (const entry of history) {
      const w = entry.weekYear;
      if (!weekMap[w]) weekMap[w] = { week: w, maxWeight: 0, totalVolume: 0, date: entry.date };
      const best = bestSetFromSets(entry.sets);
      if (best && best.weight > weekMap[w].maxWeight) weekMap[w].maxWeight = best.weight;
      for (const s of entry.sets) {
        weekMap[w].totalVolume += (s.weight || 0) * (s.reps || 0);
      }
    }

    return Object.values(weekMap).sort((a, b) => a.week.localeCompare(b.week)).slice(-8);
  }, [ready]);

  // Week summary: compare this week vs last week across all exercises
  const getWeekSummary = useCallback(() => {
    const now = new Date();
    const currentWeek = getWeekYear(now);
    const lastWeekDate = new Date(now);
    lastWeekDate.setDate(lastWeekDate.getDate() - 7);
    const lastWeek = getWeekYear(lastWeekDate);

    let improved = 0, same = 0, worse = 0;
    let currentVolume = 0, lastVolume = 0;

    for (const [exerciseId, history] of Object.entries(historyMapRef.current)) {
      const currentEntries = history.filter((e) => e.weekYear === currentWeek);
      const lastEntries = history.filter((e) => e.weekYear === lastWeek);

      if (currentEntries.length === 0 || lastEntries.length === 0) continue;

      // Best set comparison
      let currentBestWeight = 0, lastBestWeight = 0;
      let currentBestReps = 0, lastBestReps = 0;

      for (const e of currentEntries) {
        const b = bestSetFromSets(e.sets);
        if (b && b.weight > currentBestWeight) { currentBestWeight = b.weight; currentBestReps = b.reps; }
        else if (b && b.weight === currentBestWeight && b.reps > currentBestReps) { currentBestReps = b.reps; }
        for (const s of e.sets) currentVolume += (s.weight || 0) * (s.reps || 0);
      }
      for (const e of lastEntries) {
        const b = bestSetFromSets(e.sets);
        if (b && b.weight > lastBestWeight) { lastBestWeight = b.weight; lastBestReps = b.reps; }
        else if (b && b.weight === lastBestWeight && b.reps > lastBestReps) { lastBestReps = b.reps; }
        for (const s of e.sets) lastVolume += (s.weight || 0) * (s.reps || 0);
      }

      if (currentBestWeight > lastBestWeight) improved++;
      else if (currentBestWeight === lastBestWeight && currentBestReps > lastBestReps) improved++;
      else if (currentBestWeight === lastBestWeight && currentBestReps === lastBestReps) same++;
      else worse++;
    }

    const volumeChange = lastVolume > 0 ? Math.round(((currentVolume - lastVolume) / lastVolume) * 100) : 0;

    return { improved, same, worse, volumeChange, currentWeek, hasData: improved + same + worse > 0 };
  }, [ready]);

  // Group all workouts by week (for WorkoutHistory)
  const getWorkoutsByWeek = useCallback(() => {
    const weekMap = {};
    for (const w of workoutsRef.current) {
      const weekYear = getWeekYear(w.date);
      if (!weekMap[weekYear]) {
        const range = getWeekRange(w.date);
        weekMap[weekYear] = {
          weekYear,
          weekNumber: getISOWeek(w.date),
          start: range.start,
          end: range.end,
          workouts: [],
        };
      }
      weekMap[weekYear].workouts.push(w);
    }
    return Object.values(weekMap).sort((a, b) => b.weekYear.localeCompare(a.weekYear));
  }, [ready]);

  return {
    loading,
    getLastSession,
    getComparison,
    getSetComparison,
    getSparklineData,
    getWeeklyHistory,
    getWeekSummary,
    getWorkoutsByWeek,
  };
}

// ── Exercise Target Helpers ──

export function getExerciseTarget(exerciseId) {
  try {
    const targets = JSON.parse(localStorage.getItem('exerciseTargets') || '{}');
    return targets[exerciseId] || getDefaultRepTarget();
  } catch {
    return getDefaultRepTarget();
  }
}

export function setExerciseTarget(exerciseId, target) {
  try {
    const targets = JSON.parse(localStorage.getItem('exerciseTargets') || '{}');
    targets[exerciseId] = target;
    localStorage.setItem('exerciseTargets', JSON.stringify(targets));
  } catch {}
}

export function getDefaultRepTarget() {
  return parseInt(localStorage.getItem('defaultRepTarget')) || 12;
}
