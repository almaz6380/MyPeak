import { useTranslation } from 'react-i18next';
import { Check, Play, Pause } from 'lucide-react';
import { saveWorkout } from '../../data/workoutStorage';
import { awardWorkoutCompletion } from '../../data/socialStorage';
import { useAuth } from '../../context/AuthContext';
import { getExerciseById } from '../../data/exercises';
import useIntervalTimer from '../../hooks/useIntervalTimer';
import MuscleGroupIcon from '../../components/icons/MuscleGroupIcon';
import { useState } from 'react';

export default function ActiveMartialArts({ config, onFinish, onDiscard }) {
  const { t } = useTranslation();
  const { user } = useAuth();
  const [showDiscardConfirm, setShowDiscardConfirm] = useState(false);

  const timer = useIntervalTimer({
    totalRounds: config.rounds,
    workTime: config.workTime,
    restTime: config.restTime,
    exerciseIds: config.exercises,
    mode: 'circuit',
  });

  const currentExercise = getExerciseById(timer.currentExerciseId);

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  const handleFinish = async () => {
    const workout = {
      date: new Date().toISOString(),
      duration: timer.elapsed,
      type: 'martial-arts',
      exercises: [{
        exerciseId: 'martial-arts-session',
        nameKey: 'training.martialArts',
        rounds: timer.finished ? timer.totalRounds : timer.currentRound,
        workTime: config.workTime,
        restTime: config.restTime,
        exerciseList: config.exercises,
      }],
    };
    await saveWorkout(user.id, workout);
    await awardWorkoutCompletion(user.id, workout);
    onFinish();
  };

  // Pre-start screen
  if (!timer.started) {
    return (
      <div className="p-4 pt-16 pb-24">
        <div className="flex items-center gap-3 mb-6">
          <MuscleGroupIcon group="martial-arts" size={28} className="text-violet-500" />
          <h1 className="text-2xl font-bold">{t('training.martialArts')}</h1>
        </div>
        <div className="bg-white dark:bg-surface-dark-alt rounded-2xl p-6 shadow-soft border border-slate-100 dark:border-slate-800/60 text-center mb-6">
          <p className="text-5xl font-bold mb-2">{config.rounds}</p>
          <p className="text-slate-500 dark:text-slate-400">{t('training.rounds')}</p>
          <div className="flex justify-center gap-6 mt-4">
            <div>
              <p className="text-2xl font-bold text-violet-500">{formatTime(config.workTime)}</p>
              <p className="text-xs text-slate-400">{t('training.work')}</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-red-500">{formatTime(config.restTime)}</p>
              <p className="text-xs text-slate-400">{t('training.rest')}</p>
            </div>
          </div>
        </div>
        <div className="mb-6">
          <h2 className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-3">{t('training.exercises')}</h2>
          <div className="flex flex-col gap-2">
            {config.exercises.map((id, i) => {
              const ex = getExerciseById(id);
              return (
                <div key={i} className="bg-white dark:bg-surface-dark-alt rounded-xl p-3 shadow-soft border border-slate-100 dark:border-slate-800/60 flex items-center gap-3">
                  <span className="w-6 h-6 rounded-full bg-violet-100 dark:bg-violet-900/30 text-violet-600 dark:text-violet-400 text-xs font-bold flex items-center justify-center">{i + 1}</span>
                  <p className="font-medium text-sm">{ex ? t(ex.nameKey) : id}</p>
                </div>
              );
            })}
          </div>
        </div>
        <button onClick={timer.start} className="w-full bg-violet-500 hover:bg-violet-600 text-white rounded-2xl py-4 font-semibold text-lg flex items-center justify-center gap-2 transition-colors">
          <Play className="w-6 h-6" />
          {t('training.startTimer')}
        </button>
      </div>
    );
  }

  // Active timer screen
  const circumference = 2 * Math.PI * 70;
  const strokeOffset = circumference * (1 - timer.progress);

  return (
    <div className="p-4 pt-16 pb-24">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">{t('training.martialArts')}</h1>
        <span className="text-sm text-slate-500 dark:text-slate-400">
          {t('training.roundOf', { current: timer.currentRound, total: timer.totalRounds })}
        </span>
      </div>

      {/* Circular timer */}
      <div className={`rounded-2xl p-6 shadow-sm text-center mb-4 transition-colors ${
        timer.finished
          ? 'bg-violet-50 dark:bg-violet-900/20'
          : timer.phase === 'work'
            ? 'bg-violet-50 dark:bg-violet-900/20'
            : 'bg-red-50 dark:bg-red-900/20'
      }`}>
        {timer.finished ? (
          <div>
            <p className="text-2xl font-bold text-violet-600 dark:text-violet-400 mb-2">{t('training.finishWorkout')}!</p>
            <p className="text-slate-500">{timer.totalRounds} {t('training.rounds')}</p>
          </div>
        ) : (
          <>
            <p className={`text-sm font-bold uppercase tracking-wide mb-3 ${
              timer.phase === 'work' ? 'text-violet-600 dark:text-violet-400' : 'text-red-600 dark:text-red-400'
            }`}>
              {timer.phase === 'work' ? t('training.work') : t('training.rest')}
            </p>

            {/* Circular countdown */}
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
                  className={`transition-all duration-1000 ${timer.phase === 'work' ? 'text-violet-500' : 'text-red-500'}`}
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-5xl font-bold font-mono text-slate-900 dark:text-white">
                  {formatTime(timer.timeLeft)}
                </span>
              </div>
            </div>

            {currentExercise && (
              <p className="font-semibold text-lg text-slate-700 dark:text-slate-300">
                {t(currentExercise.nameKey)}
              </p>
            )}
          </>
        )}
      </div>

      {/* Exercise progress */}
      {!timer.finished && (
        <div className="bg-white dark:bg-surface-dark-alt rounded-2xl p-4 shadow-soft border border-slate-100 dark:border-slate-800/60 mb-4">
          <div className="flex flex-col gap-2">
            {timer.exerciseIds.map((id, i) => {
              const ex = getExerciseById(id);
              const isDone = i < timer.currentExIdx;
              const isCurrent = i === timer.currentExIdx;
              return (
                <div key={i} className={`flex items-center gap-3 p-2 rounded-lg ${isCurrent ? 'bg-violet-50 dark:bg-violet-900/20' : ''}`}>
                  <span className={`w-6 h-6 rounded-full text-xs font-bold flex items-center justify-center ${
                    isDone ? 'bg-violet-500 text-white' : isCurrent ? 'bg-violet-100 dark:bg-violet-900/30 text-violet-600' : 'bg-slate-100 dark:bg-slate-800 text-slate-400'
                  }`}>{isDone ? '✓' : i + 1}</span>
                  <span className={`text-sm ${isDone ? 'text-slate-400 line-through' : isCurrent ? 'font-semibold' : 'text-slate-500'}`}>
                    {ex ? t(ex.nameKey) : id}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Controls */}
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
