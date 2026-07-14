import { useState, useEffect, useCallback, useMemo } from 'react';
import useTimerEffects from './timerEffects';

/**
 * Timer für strukturierte Cardio-Sessions aus Segmenten.
 *
 * Segment-Shapes (aus peakPrograms.js):
 * - { phase: 'warmup'|'steady'|'cooldown', duration, rpe? }
 * - { phase: 'interval', work, rest, repeats, workRpe?, restRpe? }
 *
 * Intervalle werden zu einzelnen Work/Rest-Schritten abgeflacht, sodass der
 * Tick-Loop nur eine lineare Schritt-Liste kennt.
 */
export function flattenSegments(segments = []) {
  const steps = [];
  segments.forEach((seg, segIdx) => {
    if (seg.phase === 'interval') {
      const repeats = seg.repeats || 1;
      for (let rep = 1; rep <= repeats; rep++) {
        steps.push({ kind: 'work', duration: seg.work, rpe: seg.workRpe, segIdx, rep, repTotal: repeats });
        // Nach dem letzten Intervall keine Pause — es folgt direkt das nächste Segment
        if (rep < repeats && seg.rest > 0) {
          steps.push({ kind: 'rest', duration: seg.rest, rpe: seg.restRpe, segIdx, rep, repTotal: repeats });
        }
      }
    } else {
      steps.push({ kind: seg.phase, duration: seg.duration, rpe: seg.rpe, segIdx });
    }
  });
  return steps.filter((s) => s.duration > 0);
}

export default function useSegmentTimer({ segments }) {
  const steps = useMemo(() => flattenSegments(segments), [segments]);
  const totalDuration = useMemo(() => steps.reduce((sum, s) => sum + s.duration, 0), [steps]);

  const [started, setStarted] = useState(false);
  const [paused, setPaused] = useState(false);
  const [stepIdx, setStepIdx] = useState(0);
  const [timeLeft, setTimeLeft] = useState(steps[0]?.duration || 0);
  const [finished, setFinished] = useState(false);
  const [startTime, setStartTime] = useState(null);

  const {
    playWorkBeep, playRestBeep, playFinishBeep, playCountdownBeep,
    vibrate, requestWakeLock, initAudio,
  } = useTimerEffects();

  const currentStep = steps[stepIdx] || null;

  const start = useCallback(() => {
    setStarted(true);
    setStartTime(Date.now());
    requestWakeLock();
    initAudio();
  }, [requestWakeLock, initAudio]);

  const togglePause = useCallback(() => setPaused((p) => !p), []);

  useEffect(() => {
    if (!started || paused || finished) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev === 4 || prev === 3 || prev === 2) {
          playCountdownBeep();
        }

        if (prev <= 1) {
          const nextIdx = stepIdx + 1;
          if (nextIdx >= steps.length) {
            playFinishBeep();
            vibrate([200, 100, 200, 100, 200]);
            setFinished(true);
            return 0;
          }
          const next = steps[nextIdx];
          // Beep-Ton signalisiert, was kommt: Belastung hoch vs. locker
          if (next.kind === 'work' || next.kind === 'steady') playWorkBeep();
          else playRestBeep();
          vibrate(200);
          setStepIdx(nextIdx);
          return next.duration;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [started, paused, finished, stepIdx, steps, playWorkBeep, playRestBeep, playFinishBeep, playCountdownBeep, vibrate]);

  const progress = currentStep ? timeLeft / currentStep.duration : 0;
  const elapsed = startTime ? Date.now() - startTime : 0;
  // Bereits absolvierte Zeit über alle Schritte (für Gesamt-Fortschrittsbalken)
  const completedDuration = steps.slice(0, stepIdx).reduce((sum, s) => sum + s.duration, 0)
    + (currentStep ? currentStep.duration - timeLeft : 0);

  return {
    started,
    paused,
    finished,
    steps,
    stepIdx,
    currentStep,
    timeLeft,
    progress,
    elapsed,
    totalDuration,
    completedDuration,
    start,
    togglePause,
  };
}
