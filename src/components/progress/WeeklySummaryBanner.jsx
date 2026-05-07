import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { TrendingUp, X, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import useProgressComparison from '../../hooks/useProgressComparison';

export default function WeeklySummaryBanner({ userId }) {
  const { t } = useTranslation();
  const progress = useProgressComparison(userId);
  const [dismissed, setDismissed] = useState(false);

  const summary = progress.getWeekSummary();

  // Check if already dismissed this week
  useEffect(() => {
    const dismissedWeek = localStorage.getItem('weekSummaryDismissed');
    if (dismissedWeek === summary.currentWeek) setDismissed(true);
  }, [summary.currentWeek]);

  const handleDismiss = () => {
    localStorage.setItem('weekSummaryDismissed', summary.currentWeek);
    setDismissed(true);
  };

  if (progress.loading || dismissed || !summary.hasData) return null;

  const volumeDir = summary.volumeChange > 0 ? '+' : '';

  return (
    <div className="bg-white dark:bg-surface-dark-alt rounded-2xl p-4 shadow-sm mb-4 relative">
      <button onClick={handleDismiss} className="absolute top-3 right-3 p-1 text-slate-400 hover:text-slate-600">
        <X className="w-4 h-4" />
      </button>

      <div className="flex items-center gap-3 mb-3">
        <div className="w-10 h-10 rounded-xl bg-primary-50 dark:bg-primary-900/20 flex items-center justify-center">
          <TrendingUp className="w-5 h-5 text-primary-500" />
        </div>
        <div>
          <p className="font-semibold text-sm">{t('training.weekSummary')}</p>
          <p className="text-xs text-slate-400">{t('training.vsLastWeek')}</p>
        </div>
      </div>

      <div className="flex gap-2 mb-2">
        {summary.improved > 0 && (
          <div className="flex items-center gap-1 bg-green-50 dark:bg-green-900/20 px-2 py-1 rounded-lg">
            <ArrowUpRight className="w-3.5 h-3.5 text-green-500" />
            <span className="text-xs font-medium text-green-600 dark:text-green-400">{t('training.exercisesImproved', { count: summary.improved })}</span>
          </div>
        )}
        {summary.same > 0 && (
          <div className="flex items-center gap-1 bg-amber-50 dark:bg-amber-900/20 px-2 py-1 rounded-lg">
            <span className="text-xs font-medium text-amber-600 dark:text-amber-400">{t('training.exercisesSame', { count: summary.same })}</span>
          </div>
        )}
        {summary.worse > 0 && (
          <div className="flex items-center gap-1 bg-red-50 dark:bg-red-900/20 px-2 py-1 rounded-lg">
            <ArrowDownRight className="w-3.5 h-3.5 text-red-500" />
            <span className="text-xs font-medium text-red-600 dark:text-red-400">{t('training.exercisesWorse', { count: summary.worse })}</span>
          </div>
        )}
      </div>

      {summary.volumeChange !== 0 && (
        <p className="text-xs text-slate-500 dark:text-slate-400">
          {t('training.totalVolumeChange')}: <span className={summary.volumeChange > 0 ? 'text-green-500 font-medium' : 'text-red-500 font-medium'}>{volumeDir}{summary.volumeChange}%</span>
        </p>
      )}
    </div>
  );
}
