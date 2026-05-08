import { createContext, useContext, useState, useCallback, useEffect } from 'react';

const ActiveWorkoutContext = createContext(null);
const STORAGE_KEY = 'activeWorkout';

export function ActiveWorkoutProvider({ children }) {
  const [workout, setWorkout] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        // Validate: must have isActive, startTime, and exercises array
        if (parsed?.isActive && parsed?.startTime && Array.isArray(parsed?.exercises)) {
          return parsed;
        }
        // Invalid data — clean up
        localStorage.removeItem(STORAGE_KEY);
      }
    } catch {
      localStorage.removeItem(STORAGE_KEY);
    }
    return null;
  });

  // Persist to localStorage on every change
  useEffect(() => {
    if (workout) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(workout));
    } else {
      localStorage.removeItem(STORAGE_KEY);
    }
  }, [workout]);

  const startWorkout = useCallback((type, exercises, config = null) => {
    const initial = {
      isActive: true,
      startTime: Date.now(),
      type,
      exercises: exercises.map((ex) => ({
        exerciseId: ex.exerciseId || ex.id,
        nameKey: ex.nameKey,
        sets: ex.sets || [{ reps: '', weight: '' }],
      })),
      config,
    };
    setWorkout(initial);
  }, []);

  const updateExercises = useCallback((exercises) => {
    setWorkout((prev) => {
      if (!prev) return prev;
      return { ...prev, exercises };
    });
  }, []);

  const addExercises = useCallback((newExercises) => {
    setWorkout((prev) => {
      if (!prev) return prev;
      const existingIds = new Set(prev.exercises.map((e) => e.exerciseId));
      const toAdd = newExercises
        .filter((ex) => !existingIds.has(ex.exerciseId || ex.id))
        .map((ex) => ({
          exerciseId: ex.exerciseId || ex.id,
          nameKey: ex.nameKey,
          sets: [{ reps: '', weight: '' }],
        }));
      if (toAdd.length === 0) return prev;
      return { ...prev, exercises: [...prev.exercises, ...toAdd] };
    });
  }, []);

  const removeExercise = useCallback((index) => {
    setWorkout((prev) => {
      if (!prev) return prev;
      return { ...prev, exercises: prev.exercises.filter((_, i) => i !== index) };
    });
  }, []);

  const updateSet = useCallback((exIdx, setIdx, field, value) => {
    setWorkout((prev) => {
      if (!prev) return prev;
      const exercises = prev.exercises.map((ex, ei) => {
        if (ei !== exIdx) return ex;
        const sets = ex.sets.map((s, si) => {
          if (si !== setIdx) return s;
          return { ...s, [field]: value };
        });
        return { ...ex, sets };
      });
      return { ...prev, exercises };
    });
  }, []);

  const addSet = useCallback((exIdx) => {
    setWorkout((prev) => {
      if (!prev) return prev;
      const exercises = prev.exercises.map((ex, ei) => {
        if (ei !== exIdx) return ex;
        const lastSet = ex.sets[ex.sets.length - 1] || { reps: '', weight: '' };
        return { ...ex, sets: [...ex.sets, { reps: lastSet.reps, weight: lastSet.weight }] };
      });
      return { ...prev, exercises };
    });
  }, []);

  const removeSet = useCallback((exIdx, setIdx) => {
    setWorkout((prev) => {
      if (!prev) return prev;
      const exercises = prev.exercises.map((ex, ei) => {
        if (ei !== exIdx) return ex;
        if (ex.sets.length <= 1) return ex;
        return { ...ex, sets: ex.sets.filter((_, si) => si !== setIdx) };
      });
      return { ...prev, exercises };
    });
  }, []);

  const finishWorkout = useCallback(() => {
    if (!workout) return null;
    const result = {
      ...workout,
      endTime: Date.now(),
      duration: Date.now() - workout.startTime,
    };
    setWorkout(null);
    return result;
  }, [workout]);

  const discardWorkout = useCallback(() => {
    setWorkout(null);
  }, []);

  const isActive = !!workout?.isActive;
  const elapsed = isActive ? Date.now() - workout.startTime : 0;

  const value = {
    workout,
    isActive,
    elapsed,
    startWorkout,
    updateExercises,
    addExercises,
    removeExercise,
    updateSet,
    addSet,
    removeSet,
    finishWorkout,
    discardWorkout,
  };

  return (
    <ActiveWorkoutContext.Provider value={value}>
      {children}
    </ActiveWorkoutContext.Provider>
  );
}

export function useActiveWorkout() {
  const ctx = useContext(ActiveWorkoutContext);
  if (!ctx) throw new Error('useActiveWorkout must be used within ActiveWorkoutProvider');
  return ctx;
}
