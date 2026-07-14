import { useState, useEffect, useCallback } from 'react';
import useTimerEffects from './timerEffects';

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

  const {
    playWorkBeep, playRestBeep, playFinishBeep, playCountdownBeep,
    vibrate, requestWakeLock, initAudio,
  } = useTimerEffects();

  const currentExerciseId = exerciseIds[currentExIdx % exerciseIds.length];

  // ── Start ──
  const start = useCallback(() => {
    setStarted(true);
    setStartTime(Date.now());
    requestWakeLock();
    // Initialize AudioContext on user gesture
    initAudio();
  }, [requestWakeLock, initAudio]);

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

  // Cleanup (WakeLock + AudioContext) übernimmt useTimerEffects.

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
