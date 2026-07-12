import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ACHIEVEMENTS } from '../../data/achievements';
import { getAchievementState } from '../../data/achievementStorage';

// Abzeichen-Galerie im Profil: Gold = freigeschaltet, Grau = gesperrt (+ Fortschritt)
export default function AchievementGallery({ userId }) {
  const { t } = useTranslation();
  const [state, setState] = useState(null);

  useEffect(() => {
    if (!userId) return;
    getAchievementState(userId).then(setState);
  }, [userId]);

  if (!state) return null;

  const unlockedCount = Object.keys(state.badges).length;

  return (
    <div className="bg-white dark:bg-surface-dark-alt rounded-2xl shadow-soft border border-slate-100 dark:border-slate-800/60 p-4 mb-4">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-sm font-semibold text-slate-700 dark:text-slate-200">{t('achievements.title')}</h2>
        <span className="text-xs text-slate-400">{unlockedCount}/{ACHIEVEMENTS.length}</span>
      </div>

      <div className="grid grid-cols-4 gap-2">
        {ACHIEVEMENTS.map((a) => {
          const unlocked = Boolean(state.badges[a.id]);
          const prog = !unlocked && a.progress ? a.progress(state) : null;
          return (
            <div
              key={a.id}
              className={`flex flex-col items-center rounded-xl p-2 text-center ${
                unlocked
                  ? 'bg-primary-50 dark:bg-primary-900/20 border border-primary-200 dark:border-primary-800'
                  : 'bg-slate-50 dark:bg-slate-800/50'
              }`}
              title={t(`achievements.badges.${a.id}.desc`)}
            >
              <span className={`text-xl ${unlocked ? '' : 'grayscale opacity-40'}`}>{a.icon}</span>
              <span className={`text-[8.5px] leading-tight mt-1 ${
                unlocked ? 'text-primary-600 dark:text-primary-400 font-semibold' : 'text-slate-400'
              }`}>
                {t(`achievements.badges.${a.id}.name`)}
              </span>
              {prog && (
                <div className="w-full h-1 bg-slate-200 dark:bg-slate-700 rounded-full mt-1 overflow-hidden">
                  <div
                    className="h-full bg-primary-400 rounded-full"
                    style={{ width: `${Math.min(100, Math.round((prog.current / prog.target) * 100))}%` }}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
