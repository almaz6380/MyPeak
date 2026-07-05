import { useTranslation } from 'react-i18next';
import { ArrowUpRight, ArrowDownRight, Minus, Trophy, Clock, TrendingUp } from 'lucide-react';
import useProgressComparison from '../../hooks/useProgressComparison';

export default function PostWorkoutSummary({ exercises, prs = {}, duration, userId, onDismiss }) {
  const { t } = useTranslation();
  const progress = useProgressComparison(userId);
  const weightUnit = localStorage.getItem('weightUnit') || 'kg';

  const formatDuration = (ms) => {
    const mins = Math.floor(ms / 60000);
    if (mins < 60) return `${mins} min`;
    return `${Math.floor(mins / 60)}h ${mins % 60}min`;
  };

  // Compare each exercise
  const results = exercises.map((ex) => {
    const lastSession = progress.getLastSession(ex.exerciseId);
    if (!lastSession || !ex.sets || ex.sets.length === 0) {
      return { ...ex, status: 'new', weightDiff: 0, repsDiff: 0, isPR: !!prs[ex.exerciseId] };
    }

    // Best set comparison
    const currentBest = ex.sets.reduce((best, s) => (s.weight || 0) > (best.weight || 0) || ((s.weight || 0) === (best.weight || 0) && (s.reps || 0) > (best.reps || 0)) ? s : best, ex.sets[0]);
    const lastBest = lastSession.sets.reduce((best, s) => (s.weight || 0) > (best.weight || 0) || ((s.weight || 0) === (best.weight || 0) && (s.reps || 0) > (best.reps || 0)) ? s : best, lastSession.sets[0]);

    const weightDiff = (currentBest.weight || 0) - (lastBest.weight || 0);
    const repsDiff = (currentBest.reps || 0) - (lastBest.reps || 0);

    let status;
    if ((currentBest.weight || 0) > (lastBest.weight || 0)) status = 'improved';
    else if ((currentBest.weight || 0) === (lastBest.weight || 0) && (currentBest.reps || 0) > (lastBest.reps || 0)) status = 'improved';
    else if ((currentBest.weight || 0) === (lastBest.weight || 0) && (currentBest.reps || 0) === (lastBest.reps || 0)) status = 'same';
    else status = 'worse';

    return {
      ...ex,
      status,
      weightDiff,
      repsDiff,
      currentBest,
      lastBest,
      isPR: !!prs[ex.exerciseId],
    };
  });

  const improved = results.filter((r) => r.status === 'improved').length;
  const same = results.filter((r) => r.status === 'same').length;
  const worse = results.filter((r) => r.status === 'worse').length;
  const newExercises = results.filter((r) => r.status === 'new').length;
  const prCount = results.filter((r) => r.isPR).length;

  // Volume comparison
  const currentVolume = exercises.reduce((total, ex) => {
    if (!ex.sets) return total;
    return total + ex.sets.reduce((v, s) => v + (s.weight || 0) * (s.reps || 0), 0);
  }, 0);

  return (
    <div className="p-4 pb-24">
      <h1 className="text-2xl font-bold mb-2">{t('training.postSummaryTitle')}</h1>
      <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">
        <Clock className="w-4 h-4 inline mr-1" />{formatDuration(duration)}
      </p>

      {/* Summary counts */}
      <div className="flex gap-3 mb-6">
        {improved > 0 && (
          <div className="flex-1 bg-green-50 dark:bg-green-900/20 rounded-xl p-3 text-center">
            <p className="text-2xl font-bold text-green-600 dark:text-green-400">{improved}</p>
            <p className="text-xs text-green-600 dark:text-green-400">{t('training.improved')}</p>
          </div>
        )}
        {same > 0 && (
          <div className="flex-1 bg-amber-50 dark:bg-amber-900/20 rounded-xl p-3 text-center">
            <p className="text-2xl font-bold text-amber-600 dark:text-amber-400">{same}</p>
            <p className="text-xs text-amber-600 dark:text-amber-400">{t('training.same')}</p>
          </div>
        )}
        {worse > 0 && (
          <div className="flex-1 bg-red-50 dark:bg-red-900/20 rounded-xl p-3 text-center">
            <p className="text-2xl font-bold text-red-600 dark:text-red-400">{worse}</p>
            <p className="text-xs text-red-600 dark:text-red-400">{t('training.worse')}</p>
          </div>
        )}
        {newExercises > 0 && (
          <div className="flex-1 bg-primary-50 dark:bg-primary-900/20 rounded-xl p-3 text-center">
            <p className="text-2xl font-bold text-primary-500 dark:text-primary-400">{newExercises}</p>
            <p className="text-xs text-primary-500 dark:text-primary-400">{t('training.noLastData')}</p>
          </div>
        )}
      </div>

      {/* PR banner */}
      {prCount > 0 && (
        <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-2xl p-4 mb-4 flex items-center gap-3">
          <Trophy className="w-6 h-6 text-amber-500" />
          <span className="font-semibold text-amber-700 dark:text-amber-400">{prCount} {t('training.newPRBadge')}</span>
        </div>
      )}

      {/* Per-exercise results */}
      <div className="flex flex-col gap-3 mb-6">
        {results.map((r, i) => (
          <div key={i} className="bg-white dark:bg-surface-dark-alt rounded-xl p-3 shadow-soft border border-slate-100 dark:border-slate-800/60">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 flex-1 min-w-0">
                <span className="font-medium text-sm truncate">{t(r.nameKey)}</span>
                {r.isPR && (
                  <span className="text-xs bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 px-1.5 py-0.5 rounded font-medium">PR</span>
                )}
              </div>
              <div className="flex items-center gap-1 ml-2">
                {r.status === 'improved' && (
                  <div className="flex items-center gap-1 text-green-500">
                    <ArrowUpRight className="w-4 h-4" />
                    <span className="text-xs font-bold">
                      {r.weightDiff !== 0 ? `${r.weightDiff > 0 ? '+' : ''}${r.weightDiff}${r.unit || weightUnit}` : `+${r.repsDiff} ${t('training.reps')}`}
                    </span>
                  </div>
                )}
                {r.status === 'same' && (
                  <div className="flex items-center gap-1 text-amber-500">
                    <Minus className="w-4 h-4" />
                    <span className="text-xs">{t('training.same')}</span>
                  </div>
                )}
                {r.status === 'worse' && (
                  <div className="flex items-center gap-1 text-red-500">
                    <ArrowDownRight className="w-4 h-4" />
                    <span className="text-xs font-bold">
                      {r.weightDiff !== 0 ? `${r.weightDiff}${r.unit || weightUnit}` : `${r.repsDiff} ${t('training.reps')}`}
                    </span>
                  </div>
                )}
                {r.status === 'new' && (
                  <span className="text-xs text-primary-500">{t('training.noLastData')}</span>
                )}
              </div>
            </div>
            {r.currentBest && r.lastBest && (
              <div className="flex items-center gap-2 mt-1 text-xs text-slate-400">
                <span>{r.lastBest.weight}{r.unit || weightUnit} × {r.lastBest.reps}</span>
                <span>→</span>
                <span className={r.status === 'improved' ? 'text-green-500 font-medium' : r.status === 'worse' ? 'text-red-500' : ''}>
                  {r.currentBest.weight}{r.unit || weightUnit} × {r.currentBest.reps}
                </span>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Volume */}
      {currentVolume > 0 && (
        <div className="bg-white dark:bg-surface-dark-alt rounded-xl p-3 shadow-soft border border-slate-100 dark:border-slate-800/60 mb-6 flex items-center gap-3">
          <TrendingUp className="w-5 h-5 text-primary-500" />
          <div>
            <p className="text-sm font-medium">{t('training.totalVolumeChange')}</p>
            <p className="text-xs text-slate-400">{currentVolume.toLocaleString()} {t(`training.${weightUnit}`)}</p>
          </div>
        </div>
      )}

      <button
        onClick={onDismiss}
        className="w-full bg-primary-500 hover:bg-primary-500 text-white rounded-2xl py-3.5 font-semibold transition-colors dark:bg-primary-500"
      >
        {t('training.continue')}
      </button>
    </div>
  );
}
