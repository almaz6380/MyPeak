import { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { pausenSignalPlanen, pausenSignalAbbrechen } from '../lib/restNotification';

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

  // Rest timer state — { remaining, duration, endsAt, exIdx, setIdx }
  //
  // ⚠ `remaining` wird aus `endsAt` (Wanduhr) ABGELEITET, nicht heruntergezaehlt.
  // Die alte Fassung zog je Intervall-Tick 1 ab — im Gym liegt das Handy aber
  // gesperrt auf der Bank, die WebView friert setInterval ein, und aus 90 s
  // Pause wurden beliebig viele. Mit endsAt korrigiert sich die Anzeige beim
  // Zurueckkommen von selbst; das Pausenende meldet nativ die geplante
  // Benachrichtigung (restNotification.js), die vom SYSTEM feuert, egal was
  // die WebView gerade tut.
  const [restTimer, setRestTimer] = useState(null);

  // Countdown fuer die Anzeige. 250 ms statt 1 s: Nach der Rueckkehr aus dem
  // Hintergrund springt die Anzeige binnen eines Wimpernschlags auf den echten
  // Wert; neu gerendert wird trotzdem nur bei geaenderter Sekunde.
  useEffect(() => {
    if (!restTimer) return;
    const tick = setInterval(() => {
      setRestTimer((prev) => {
        if (!prev) return prev;
        const rest = Math.max(0, Math.round((prev.endsAt - Date.now()) / 1000));
        if (rest <= 0) {
          // Vordergrund-Signal. ⚠ navigator.vibrate existiert in iOS-WKWebView
          // nicht — dort (und bei gesperrtem Schirm ueberall) ist die geplante
          // Benachrichtigung das eigentliche Signal.
          if (navigator.vibrate) navigator.vibrate([200, 100, 200]);
          return null;
        }
        return rest === prev.remaining ? prev : { ...prev, remaining: rest };
      });
    }, 250);
    return () => clearInterval(tick);
  }, [restTimer !== null]);

  const startRestTimer = useCallback((seconds, exIdx = null, setIdx = null) => {
    setRestTimer({ remaining: seconds, duration: seconds, endsAt: Date.now() + seconds * 1000, exIdx, setIdx });
    // Feste Benachrichtigungs-ID: ein erneuter Start (auch der +30s-Knopf)
    // verschiebt die bestehende Meldung, statt eine zweite zu erzeugen.
    pausenSignalPlanen(seconds);
  }, []);

  const stopRestTimer = useCallback(() => {
    setRestTimer(null);
    pausenSignalAbbrechen();
  }, []);

  // Persist to localStorage on every change
  useEffect(() => {
    if (workout) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(workout));
    } else {
      localStorage.removeItem(STORAGE_KEY);
    }
  }, [workout]);

  const startWorkout = useCallback((type, exercises, config = null, planMeta = null) => {
    const initial = {
      isActive: true,
      startTime: Date.now(),
      type,
      exercises: exercises.map((ex) => ({
        exerciseId: ex.exerciseId || ex.id,
        nameKey: ex.nameKey,
        unit: localStorage.getItem('weightUnit') || 'kg',
        sets: ex.sets || [{ reps: '', weight: '' }],
      })),
      config,
      fromPlan: planMeta?.fromPlan || false,
      planId: planMeta?.planId || null,
      planName: planMeta?.planName || null,
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
          unit: localStorage.getItem('weightUnit') || 'kg',
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

  const toggleExerciseUnit = useCallback((exIdx) => {
    setWorkout((prev) => {
      if (!prev) return prev;
      const exercises = prev.exercises.map((ex, ei) => {
        if (ei !== exIdx) return ex;
        const currentUnit = ex.unit || localStorage.getItem('weightUnit') || 'kg';
        return { ...ex, unit: currentUnit === 'kg' ? 'lbs' : 'kg' };
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
    // Laufende Pause raeumen — sonst meldet sich „Pause vorbei" nach einem
    // Workout, das es nicht mehr gibt.
    setRestTimer(null);
    pausenSignalAbbrechen();
    return result;
  }, [workout]);

  const discardWorkout = useCallback(() => {
    setWorkout(null);
    setRestTimer(null);
    pausenSignalAbbrechen();
  }, []);

  const isActive = !!workout?.isActive;
  const elapsed = isActive ? Date.now() - workout.startTime : 0;

  const value = {
    workout,
    isActive,
    elapsed,
    restTimer,
    startRestTimer,
    stopRestTimer,
    startWorkout,
    updateExercises,
    addExercises,
    removeExercise,
    toggleExerciseUnit,
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
