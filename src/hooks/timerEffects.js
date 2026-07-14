import { useCallback, useEffect, useRef } from 'react';

/**
 * Gemeinsame Timer-Effekte für Interval- und Segment-Timer:
 * - Audio-Beeps via Web Audio API (funktioniert im Hintergrund)
 * - Vibration
 * - Wake Lock (Bildschirm an während des Workouts)
 *
 * Aus useIntervalTimer extrahiert, damit useSegmentTimer dieselben
 * Effekte nutzt, ohne den Code zu duplizieren.
 */
export default function useTimerEffects() {
  const audioCtxRef = useRef(null);
  const wakeLockRef = useRef(null);

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
  const playCountdownBeep = useCallback(() => playBeep(660, 0.08, 1), [playBeep]);

  const vibrate = useCallback((pattern = 200) => {
    if (navigator.vibrate) navigator.vibrate(pattern);
  }, []);

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

  // AudioContext braucht eine User-Geste — beim Start aufrufen
  const initAudio = useCallback(() => {
    if (!audioCtxRef.current) {
      audioCtxRef.current = new (window.AudioContext || window.webkitAudioContext)();
    }
  }, []);

  useEffect(() => {
    return () => {
      releaseWakeLock();
      if (audioCtxRef.current) {
        audioCtxRef.current.close().catch(() => {});
      }
    };
  }, [releaseWakeLock]);

  return {
    playBeep,
    playWorkBeep,
    playRestBeep,
    playFinishBeep,
    playCountdownBeep,
    vibrate,
    requestWakeLock,
    releaseWakeLock,
    initAudio,
  };
}
