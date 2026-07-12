import { useEffect, useState } from 'react';
import { getWorkouts } from '../data/workoutStorage';
import { getExerciseById } from '../data/exercises';
import { getWeekYear } from './useProgressComparison';

const toKg = (v, unit) => (unit === 'lbs' ? v * 0.453592 : v);

// Trainingsvolumen der aktuellen ISO-Woche pro Muskelgruppe.
// Metrik: Sätze/Woche (etablierte Größe, kg/lbs-unabhängig, feste Farbschwellen);
// Volumen in kg als Zusatzinfo. Cardio/HIIT/Übungen ohne muscleGroup werden übersprungen.
export default function useMuscleHeatmap(userId) {
  const [data, setData] = useState({ groups: {}, totalSets: 0, loading: true });

  useEffect(() => {
    if (!userId) return;
    let cancelled = false;

    getWorkouts(userId).then((workouts) => {
      if (cancelled) return;
      const currentWeek = getWeekYear(new Date());
      const groups = {};
      let totalSets = 0;

      for (const w of workouts || []) {
        // Datums-String "YYYY-MM-DD" mittags parsen (Zeitzonen-Konvention der App)
        if (!w.date || getWeekYear(new Date(w.date + 'T12:00:00')) !== currentWeek) continue;
        for (const ex of w.exercises || []) {
          if (!ex.sets?.length) continue;
          const group = getExerciseById(ex.exerciseId)?.muscleGroup;
          if (!group) continue;
          if (!groups[group]) groups[group] = { sets: 0, volumeKg: 0, exercises: {} };
          const g = groups[group];
          g.sets += ex.sets.length;
          totalSets += ex.sets.length;
          for (const s of ex.sets) {
            g.volumeKg += toKg((s.weight || 0) * (s.reps || 0), ex.unit);
          }
          if (!g.exercises[ex.exerciseId]) {
            g.exercises[ex.exerciseId] = { nameKey: ex.nameKey, sets: 0, volumeKg: 0 };
          }
          g.exercises[ex.exerciseId].sets += ex.sets.length;
          for (const s of ex.sets) {
            g.exercises[ex.exerciseId].volumeKg += toKg((s.weight || 0) * (s.reps || 0), ex.unit);
          }
        }
      }

      setData({ groups, totalSets, loading: false });
    });

    return () => { cancelled = true; };
  }, [userId]);

  return data;
}

// Feste Schwellen (Sätze/Woche): 0 · 1–4 · 5–9 · 10–14 · 15+
export function intensityLevel(sets) {
  if (!sets) return 0;
  if (sets < 5) return 1;
  if (sets < 10) return 2;
  if (sets < 15) return 3;
  return 4;
}
