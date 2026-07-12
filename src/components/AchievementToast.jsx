import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

// Unlock-Overlay für EIN Achievement — der Aufrufer hält die Queue
// und zeigt das nächste, sobald onDismiss feuert.
export default function AchievementToast({ achievement, onDismiss }) {
  const { t } = useTranslation();
  const [phase, setPhase] = useState('entering');

  useEffect(() => {
    const t1 = setTimeout(() => setPhase('showing'), 50);
    const t2 = setTimeout(() => setPhase('exiting'), 2600);
    const t3 = setTimeout(() => onDismiss(), 3000);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, [onDismiss, achievement.id]);

  return (
    <div
      className={`fixed left-4 right-4 bottom-24 z-[190] flex justify-center transition-all duration-400 ${
        phase === 'showing' ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
      }`}
      onClick={onDismiss}
    >
      <div className="flex items-center gap-3 bg-white dark:bg-surface-dark-alt rounded-2xl px-4 py-3 shadow-xl border border-primary-300 dark:border-primary-700 max-w-sm">
        <span className="text-3xl">{achievement.icon}</span>
        <div>
          <p className="text-[10px] font-bold tracking-widest uppercase text-primary-500">
            {t('achievements.unlocked')}
          </p>
          <p className="text-sm font-bold text-slate-900 dark:text-white">
            {t(`achievements.badges.${achievement.id}.name`)}
          </p>
          <p className="text-[11px] text-slate-400">+50 XP</p>
        </div>
      </div>
    </div>
  );
}
