import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Check, X, Play, Pause } from 'lucide-react';
import { saveWorkout } from '../../data/workoutStorage';
import { awardWorkoutCompletion } from '../../data/socialStorage';
import { workoutExportieren } from '../../lib/health';
import { maybeAskForReview } from '../../lib/review';
import { useAuth } from '../../context/AuthContext';
import MuscleGroupIcon from '../../components/icons/MuscleGroupIcon';

export default function ActiveCardio({ activity, onFinish, onDiscard }) {
  const { t } = useTranslation();
  const { user } = useAuth();
  const [startTime] = useState(Date.now());
  const [elapsed, setElapsed] = useState(0);
  const [running, setRunning] = useState(true);
  const [distance, setDistance] = useState('');
  const [showDiscardConfirm, setShowDiscardConfirm] = useState(false);

  useEffect(() => {
    if (!running) return;
    const timer = setInterval(() => setElapsed(Date.now() - startTime), 1000);
    return () => clearInterval(timer);
  }, [startTime, running]);

  const formatTime = (ms) => {
    const totalSecs = Math.floor(ms / 1000);
    const hrs = Math.floor(totalSecs / 3600);
    const mins = Math.floor((totalSecs % 3600) / 60);
    const secs = totalSecs % 60;
    if (hrs > 0) return `${hrs}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const pace = () => {
    const distNum = parseFloat(distance);
    if (!distNum || elapsed < 1000) return '--:--';
    const km = distNum;
    const totalMins = elapsed / 60000;
    const pacePerKm = totalMins / km;
    const paceMins = Math.floor(pacePerKm);
    const paceSecs = Math.round((pacePerKm - paceMins) * 60);
    return `${paceMins}:${paceSecs.toString().padStart(2, '0')}`;
  };

  const handleFinish = async () => {
    const workout = {
      date: new Date().toISOString(),
      duration: elapsed,
      type: 'cardio',
      exercises: [{
        exerciseId: activity.id,
        nameKey: activity.nameKey,
        duration: Math.floor(elapsed / 1000),
        distance: parseFloat(distance) || 0,
      }],
    };
    await saveWorkout(user.id, workout);
    await awardWorkoutCompletion(user.id, workout);
    workoutExportieren(user.id, workout);
    // Bewertungsanfrage ab dem 2. Training jeder Art (s. lib/review.js), nur nativ.
    setTimeout(() => { maybeAskForReview(user.id); }, 1500);
    onFinish();
  };

  return (
    <div className="p-4 pt-16 pb-24">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <MuscleGroupIcon group="cardio" size={24} className="text-red-500" />
          <h1 className="text-2xl font-bold">{t(activity.nameKey)}</h1>
        </div>
      </div>

      {/* Large timer */}
      <div className="bg-white dark:bg-surface-dark-alt rounded-2xl p-8 shadow-soft border border-slate-100 dark:border-slate-800/60 text-center mb-4">
        <p className="text-6xl font-bold font-mono text-slate-900 dark:text-white mb-2">
          {formatTime(elapsed)}
        </p>
        <button
          onClick={() => setRunning(!running)}
          className={`mt-2 px-6 py-2 rounded-xl font-medium text-sm transition-colors ${
            running
              ? 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
              : 'bg-red-500 text-white'
          }`}
        >
          {running ? (
            <span className="flex items-center gap-2"><Pause className="w-4 h-4" /> {t('training.pauseTimer')}</span>
          ) : (
            <span className="flex items-center gap-2"><Play className="w-4 h-4" /> {t('training.startTimer')}</span>
          )}
        </button>
      </div>

      {/* Distance input */}
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

      {/* Pace */}
      <div className="bg-white dark:bg-surface-dark-alt rounded-2xl p-4 shadow-soft border border-slate-100 dark:border-slate-800/60 mb-6">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-slate-500 dark:text-slate-400">{t('training.pace')}</span>
          <span className="text-lg font-bold font-mono">{pace()} {t('training.paceUnit')}</span>
        </div>
      </div>

      {/* Action buttons */}
      <div className="flex flex-col gap-3">
        <button
          onClick={handleFinish}
          className="w-full bg-green-600 hover:bg-green-700 text-white rounded-2xl py-3.5 font-semibold flex items-center justify-center gap-2 transition-colors"
        >
          <Check className="w-5 h-5" />
          {t('training.finishWorkout')}
        </button>
        <button
          onClick={() => setShowDiscardConfirm(true)}
          className="w-full text-red-500 hover:text-red-600 font-medium py-2 text-sm transition-colors"
        >
          {t('training.discardWorkout')}
        </button>
      </div>

      {showDiscardConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-surface-dark-alt rounded-2xl p-6 w-full max-w-sm shadow-xl">
            <p className="text-center font-semibold mb-4">{t('training.confirmDiscard')}</p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowDiscardConfirm(false)}
                className="flex-1 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 font-medium text-sm"
              >
                {t('common.cancel')}
              </button>
              <button
                onClick={onDiscard}
                className="flex-1 py-2.5 rounded-xl bg-red-500 text-white font-medium text-sm"
              >
                {t('training.discardWorkout')}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
