import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Check, Play, Pause } from 'lucide-react';
import { saveWorkout } from '../../data/workoutStorage';
import { useAuth } from '../../context/AuthContext';
import { getExerciseById } from '../../data/exercises';
import useSegmentTimer from '../../hooks/useSegmentTimer';

// Anzeige-Infos pro Schritt-Art (Farben analog ActiveHiit: Arbeit grün, Pause rot)
const KIND_INFO = {
  warmup:   { de: 'Aufwärmen',      en: 'Warm-up',   text: 'text-blue-600 dark:text-blue-400',   bg: 'bg-blue-50 dark:bg-blue-900/20',   ring: 'text-blue-500' },
  work:     { de: 'Belastung',      en: 'Work',      text: 'text-green-600 dark:text-green-400', bg: 'bg-green-50 dark:bg-green-900/20', ring: 'text-green-500' },
  steady:   { de: 'Dauerbelastung', en: 'Steady',    text: 'text-green-600 dark:text-green-400', bg: 'bg-green-50 dark:bg-green-900/20', ring: 'text-green-500' },
  rest:     { de: 'Erholung',       en: 'Recovery',  text: 'text-red-600 dark:text-red-400',     bg: 'bg-red-50 dark:bg-red-900/20',     ring: 'text-red-500' },
  cooldown: { de: 'Auslaufen',      en: 'Cool-down', text: 'text-slate-500 dark:text-slate-400', bg: 'bg-slate-100 dark:bg-slate-800',   ring: 'text-slate-400' },
};

function formatMins(seconds) {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  if (s === 0) return `${m}'`;
  if (m === 0) return `${s}s`;
  return `${m}:${String(s).padStart(2, '0')}`;
}

function formatClock(seconds) {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${String(s).padStart(2, '0')}`;
}

// Kompakte Segment-Zusammenfassung, z. B. „10' Aufwärmen · 4× (4' hart / 3' locker) · 5' Auslaufen"
export function describeSegments(segments = [], lang = 'de') {
  return segments.map((seg) => {
    if (seg.phase === 'interval') {
      const hard = lang === 'de' ? 'hart' : 'hard';
      const easy = lang === 'de' ? 'locker' : 'easy';
      if (!seg.rest) return `${seg.repeats}× ${formatMins(seg.work)} ${hard}`;
      return `${seg.repeats}× (${formatMins(seg.work)} ${hard} / ${formatMins(seg.rest)} ${easy})`;
    }
    const info = KIND_INFO[seg.phase] || KIND_INFO.steady;
    return `${formatMins(seg.duration)} ${lang === 'de' ? info.de : info.en}`;
  }).join(' · ');
}

/**
 * Runner für strukturierte Cardio-Sessions (Peak-Programme):
 * session = { label, exerciseId, segments, intensity?, week?, durationWeeks? }
 */
export default function ActiveStructuredCardio({ session, onFinish, onDiscard }) {
  const { t, i18n } = useTranslation();
  const { user } = useAuth();
  const lang = i18n.language?.startsWith('de') ? 'de' : 'en';
  const [showDiscardConfirm, setShowDiscardConfirm] = useState(false);
  const [distance, setDistance] = useState('');

  const timer = useSegmentTimer({ segments: session.segments || [] });
  const exercise = getExerciseById(session.exerciseId);
  const title = session.label || (exercise ? t(exercise.nameKey) : 'Cardio');

  const handleFinish = async () => {
    const durationSecs = timer.finished
      ? timer.totalDuration
      : Math.round(timer.completedDuration);
    const workout = {
      date: new Date().toISOString(),
      duration: durationSecs * 1000,
      type: 'cardio',
      exercises: [{
        exerciseId: session.exerciseId || 'running',
        nameKey: exercise?.nameKey || 'training.cardio',
        duration: durationSecs,
        distance: parseFloat(distance) || 0,
      }],
    };
    await saveWorkout(user?.id || 'guest', workout);
    onFinish();
  };

  // ── Pre-Start: Session-Übersicht ──
  if (!timer.started) {
    return (
      <div className="p-4 pt-16 pb-24">
        <h1 className="text-2xl font-bold mb-1">{title}</h1>
        {session.week && session.durationWeeks && (
          <p className="text-sm text-primary-500 font-medium mb-4">
            {lang === 'de' ? 'Woche' : 'Week'} {session.week}/{session.durationWeeks}
          </p>
        )}

        <div className="bg-white dark:bg-surface-dark-alt rounded-2xl p-6 shadow-soft border border-slate-100 dark:border-slate-800/60 text-center mb-4 mt-2">
          <p className="text-5xl font-bold mb-1">{Math.round(timer.totalDuration / 60)}</p>
          <p className="text-slate-500 dark:text-slate-400">{lang === 'de' ? 'Minuten gesamt' : 'total minutes'}</p>
          {session.intensity?.rpe && (
            <p className="text-xs text-slate-400 mt-2">
              {lang === 'de' ? 'Anstrengung bis' : 'Effort up to'} RPE {session.intensity.rpe}/10
              {session.intensity.hrZone ? ` · ${lang === 'de' ? 'Pulszone' : 'HR zone'} ${session.intensity.hrZone}` : ''}
            </p>
          )}
        </div>

        <h2 className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-3">
          {lang === 'de' ? 'Ablauf' : 'Session plan'}
        </h2>
        <div className="flex flex-col gap-2 mb-6">
          {(session.segments || []).map((seg, i) => {
            const info = KIND_INFO[seg.phase === 'interval' ? 'work' : seg.phase] || KIND_INFO.steady;
            return (
              <div key={i} className="bg-white dark:bg-surface-dark-alt rounded-xl p-3 shadow-soft border border-slate-100 dark:border-slate-800/60 flex items-center gap-3">
                <span className={`w-2 h-8 rounded-full flex-shrink-0 ${info.bg}`} />
                <div className="flex-1">
                  <p className="font-medium text-sm">
                    {seg.phase === 'interval'
                      ? `${seg.repeats}× ${lang === 'de' ? 'Intervall' : 'interval'}`
                      : (lang === 'de' ? info.de : info.en)}
                  </p>
                  <p className="text-xs text-slate-400">
                    {seg.phase === 'interval'
                      ? `${formatMins(seg.work)} ${lang === 'de' ? 'hart' : 'hard'}${seg.rest ? ` / ${formatMins(seg.rest)} ${lang === 'de' ? 'locker' : 'easy'}` : ''}`
                      : formatMins(seg.duration)}
                  </p>
                </div>
                {(seg.rpe || seg.workRpe) && (
                  <span className="text-[10px] font-semibold px-2 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400">
                    RPE {seg.rpe || seg.workRpe}
                  </span>
                )}
              </div>
            );
          })}
        </div>

        <button onClick={timer.start} className="w-full bg-red-500 hover:bg-red-600 text-white rounded-2xl py-4 font-semibold text-lg flex items-center justify-center gap-2 transition-colors">
          <Play className="w-6 h-6" />
          {t('training.startTimer')}
        </button>
        <button onClick={onDiscard} className="w-full text-slate-400 hover:text-slate-500 font-medium py-3 text-sm">
          {t('common.cancel')}
        </button>
      </div>
    );
  }

  const kind = timer.currentStep?.kind || 'steady';
  const info = KIND_INFO[kind] || KIND_INFO.steady;
  const circumference = 2 * Math.PI * 70;
  const strokeOffset = circumference * (1 - timer.progress);
  const overallPct = timer.totalDuration > 0 ? Math.min(100, (timer.completedDuration / timer.totalDuration) * 100) : 0;

  // ── Laufender Timer ──
  return (
    <div className="p-4 pt-16 pb-24">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-xl font-bold">{title}</h1>
        <span className="text-sm text-slate-500 dark:text-slate-400">
          {lang === 'de' ? 'Abschnitt' : 'Step'} {Math.min(timer.stepIdx + 1, timer.steps.length)}/{timer.steps.length}
        </span>
      </div>

      <div className={`rounded-2xl p-6 shadow-sm text-center mb-4 transition-colors ${timer.finished ? 'bg-green-50 dark:bg-green-900/20' : info.bg}`}>
        {timer.finished ? (
          <div>
            <p className="text-2xl font-bold text-green-600 dark:text-green-400 mb-2">{t('training.finishWorkout')}!</p>
            <p className="text-slate-500">{Math.round(timer.totalDuration / 60)} {lang === 'de' ? 'Minuten' : 'minutes'}</p>
          </div>
        ) : (
          <>
            <p className={`text-sm font-bold uppercase tracking-wide mb-1 ${info.text}`}>
              {lang === 'de' ? info.de : info.en}
              {timer.currentStep?.repTotal > 1 && ` ${timer.currentStep.rep}/${timer.currentStep.repTotal}`}
            </p>
            {(timer.currentStep?.rpe) && (
              <p className="text-[11px] text-slate-400 mb-2">RPE {timer.currentStep.rpe}/10</p>
            )}

            <div className="relative w-44 h-44 mx-auto mb-3">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 160 160">
                <circle cx="80" cy="80" r="70" stroke="currentColor" strokeWidth="6" fill="none" className="text-slate-200 dark:text-slate-700" />
                <circle
                  cx="80" cy="80" r="70"
                  stroke="currentColor"
                  strokeWidth="6"
                  fill="none"
                  strokeLinecap="round"
                  strokeDasharray={circumference}
                  strokeDashoffset={strokeOffset}
                  className={`transition-all duration-1000 ${info.ring}`}
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-5xl font-bold font-mono text-slate-900 dark:text-white">
                  {formatClock(timer.timeLeft)}
                </span>
              </div>
            </div>

            {exercise && (
              <p className="font-semibold text-slate-700 dark:text-slate-300">{t(exercise.nameKey)}</p>
            )}
          </>
        )}
      </div>

      {/* Gesamt-Fortschritt */}
      <div className="mb-4">
        <div className="h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
          <div className="h-full bg-primary-500 rounded-full transition-all duration-1000" style={{ width: `${overallPct}%` }} />
        </div>
        <p className="text-[10px] text-slate-400 text-right mt-1">
          {formatClock(Math.round(timer.completedDuration))} / {formatClock(timer.totalDuration)}
        </p>
      </div>

      {/* Distanz (optional, wie ActiveCardio) */}
      {timer.finished && (
        <div className="bg-white dark:bg-surface-dark-alt rounded-2xl p-4 shadow-soft border border-slate-100 dark:border-slate-800/60 mb-4">
          <label className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-2 block">
            {t('training.distance')} ({t('training.distanceKm')})
          </label>
          <input
            type="number"
            inputMode="decimal"
            value={distance}
            onChange={(e) => setDistance(e.target.value)}
            placeholder="0.0"
            className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-2xl text-center font-bold focus:outline-none focus:ring-2 focus:ring-red-500"
          />
        </div>
      )}

      {!timer.finished && (
        <button onClick={timer.togglePause} className="w-full py-3 rounded-xl bg-slate-100 dark:bg-slate-800 font-medium text-sm flex items-center justify-center gap-2 mb-4">
          {timer.paused ? <Play className="w-4 h-4" /> : <Pause className="w-4 h-4" />}
          {timer.paused ? t('training.startTimer') : t('training.pauseTimer')}
        </button>
      )}

      <button onClick={handleFinish} className="w-full bg-green-600 hover:bg-green-700 text-white rounded-2xl py-3.5 font-semibold flex items-center justify-center gap-2 transition-colors">
        <Check className="w-5 h-5" />
        {t('training.finishWorkout')}
      </button>

      {!timer.finished && (
        <button onClick={() => setShowDiscardConfirm(true)} className="w-full text-red-500 hover:text-red-600 font-medium py-2 text-sm mt-2">
          {t('training.discardWorkout')}
        </button>
      )}

      {showDiscardConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-surface-dark-alt rounded-2xl p-6 w-full max-w-sm shadow-xl">
            <p className="text-center font-semibold mb-4">{t('training.confirmDiscard')}</p>
            <div className="flex gap-3">
              <button onClick={() => setShowDiscardConfirm(false)} className="flex-1 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 font-medium text-sm">{t('common.cancel')}</button>
              <button onClick={onDiscard} className="flex-1 py-2.5 rounded-xl bg-red-500 text-white font-medium text-sm">{t('training.discardWorkout')}</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
