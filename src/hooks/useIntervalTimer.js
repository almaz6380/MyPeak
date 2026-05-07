import { useState, useEffect, useCallback, useRef } from 'react';

/**
 * Shared interval timer hook for HIIT, Circuit, and Martial Arts workouts.
 *
 * Features:
 * - Work/rest phase alternation with configurable durations
 * - Round and exercise tracking
 * - Audio beep on phase transitions (Web Audio API — works in background)
 * - Vibration on phase transitions
 * - Wake Lock to keep screen on during workout
 * - Pause/resume support
 *
 * @param {Object} config
 * @param {number} config.totalRounds - Number of rounds
 * @param {number} config.workTime - Work phase duration in seconds
 * @param {number} config.restTime - Rest phase duration in seconds
 * @param {string[]} config.exerciseIds - Array of exercise IDs
 * @param {'hiit'|'circuit'|'martial-arts'} config.mode - Timer advancement mode
 *   - 'hiit': cycles through exercises within a round, round advances when all done
 *   - 'circuit'/'martial-arts': exercises advance sequentially, round advances when list ends
 */
export default function useIntervalTimer({ totalRounds, workTime, restTime, exerciseIds, mode = 'circuit' }) {
  const [started, setStarted] = useState(false);
  const [paused, setPaused] = useState(false);
  const [currentRound, setCurrentRound] = useState(1);
  const [phase, setPhase] = useState('work'); // 'work' | 'rest'
  const [timeLeft, setTimeLeft] = useState(workTime);
  const [currentExIdx, setCurrentExIdx] = useState(0);
  const [finished, setFinished] = useState(false);
  const [startTime, setStartTime] = useState(null);

  const audioCtxRef = useRef(null);
  const wakeLockRef = useRef(null);

  const currentExerciseId = exerciseIds[currentExIdx % exerciseIds.length];

  // ── Audio beep via Web Audio API ──
  const playBeep = useCallback((frequency = 880, duration = 0.15, count = 1) => {
    try {
      if (!audioCtxRef.current) {
        audioCtxRef.current = new (window.AudioContext || window.webkitAudioContext)();
      }
      const ctx = audioCtxRef.current;
      if (ctx.state === 'suspended') ctx.resume();

      for (let i = 0; i < count; i++) {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.frequency.value = frequency;
        osc.type = 'sine';
        gain.gain.value = 0.3;

        const offset = i * (duration + 0.08);
        osc.start(ctx.currentTime + offset);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + offset + duration);
        osc.stop(ctx.currentTime + offset + duration + 0.01);
      }
    } catch (e) {
      // Audio not available — silent fallback
    }
  }, []);

  const playWorkBeep = useCallback(() => playBeep(880, 0.12, 2), [playBeep]);
  const playRestBeep = useCallback(() => playBeep(440, 0.2, 1), [playBeep]);
  const playFinishBeep = useCallback(() => playBeep(1200, 0.15, 3), [playBeep]);

  // ── Countdown beep at 3, 2, 1 ──
  const playCountdownBeep = useCallback(() => playBeep(660, 0.08, 1), [playBeep]);

  // ── Vibration ──
  const vibrate = useCallback((pattern = 200) => {
    if (navigator.vibrate) navigator.vibrate(pattern);
  }, []);

  // ── Wake Lock ──
  const requestWakeLock = useCallback(async () => {
    try {
      if ('wakeLock' in navigator) {
        wakeLockRef.current = await navigator.wakeLock.request('screen');
      }
    } catch (e) {
      // Wake Lock not available
    }
  }, []);

  const releaseWakeLock = useCallback(() => {
    if (wakeLockRef.current) {
      wakeLockRef.current.release();
      wakeLockRef.current = null;
    }
  }, []);

  // ── Start ──
  const start = useCallback(() => {
    setStarted(true);
    setStartTime(Date.now());
    requestWakeLock();

    // Initialize AudioContext on user gesture
    if (!audioCtxRef.current) {
      audioCtxRef.current = new (window.AudioContext || window.webkitAudioContext)();
    }
  }, [requestWakeLock]);

  // ── Pause / Resume ──
  const togglePause = useCallback(() => {
    setPaused((p) => !p);
  }, []);

  // ── Timer tick ──
  useEffect(() => {
    if (!started || paused || finished) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        // Countdown beeps at 3, 2, 1
        if (prev === 4 || prev === 3 || prev === 2) {
          playCountdownBeep();
        }

        if (prev <= 1) {
          if (phase === 'work') {
            // Work phase done → rest
            playRestBeep();
            vibrate(200);
            setPhase('rest');
            return restTime;
          } else {
            // Rest phase done → advance
            if (mode === 'hiit') {
              // HIIT: cycle through exercises, round advances when all done
              const nextIdx = currentExIdx + 1;
              if (nextIdx % exerciseIds.length === 0) {
                const nextRound = currentRound + 1;
                if (nextRound > totalRounds) {
                  playFinishBeep();
                  vibrate([200, 100, 200, 100, 200]);
                  setFinished(true);
                  return 0;
                }
                setCurrentRound(nextRound);
              }
              setCurrentExIdx(nextIdx);
            } else {
              // Circuit / Martial Arts: sequential exercise advance
              const nextIdx = currentExIdx + 1;
              if (nextIdx >= exerciseIds.length) {
                const nextRound = currentRound + 1;
                if (nextRound > totalRounds) {
                  playFinishBeep();
                  vibrate([200, 100, 200, 100, 200]);
                  setFinished(true);
                  return 0;
                }
                setCurrentRound(nextRound);
                setCurrentExIdx(0);
              } else {
                setCurrentExIdx(nextIdx);
              }
            }
            playWorkBeep();
            vibrate(200);
            setPhase('work');
            return workTime;
          }
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [started, paused, finished, phase, currentRound, currentExIdx, totalRounds, workTime, restTime, exerciseIds.length, mode, playWorkBeep, playRestBeep, playFinishBeep, playCountdownBeep, vibrate]);

  // ── Cleanup ──
  useEffect(() => {
    return () => {
      releaseWakeLock();
      if (audioCtxRef.current) {
        audioCtxRef.current.close().catch(() => {});
      }
    };
  }, [releaseWakeLock]);

  // ── Progress (0 to 1) ──
  const progress = phase === 'work' ? timeLeft / workTime : timeLeft / restTime;

  // ── Elapsed time ──
  const elapsed = startTime ? Date.now() - startTime : 0;

  return {
    started,
    paused,
    finished,
    phase,
    currentRound,
    currentExIdx,
    currentExerciseId,
    timeLeft,
    progress,
    elapsed,
    start,
    togglePause,
    totalRounds,
    exerciseIds,
  };
}
