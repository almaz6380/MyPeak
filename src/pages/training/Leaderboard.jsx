import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { ArrowLeft, Trophy, TrendingUp, Flame, Dumbbell } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { getFriends, getLeaderboardCategory, getLeaderboardData, getLevelTitle, hasGoldenFrame } from '../../data/socialStorage';

export default function Leaderboard({ onBack }) {
  const { t } = useTranslation();
  const { user, isGuestMode } = useAuth();
  const lang = t('common.back') === 'Zurück' ? 'de' : 'en';
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const category = getLeaderboardCategory();

  const categoryInfo = {
    volume: { labelDE: 'Gesamtvolumen', labelEN: 'Total Volume', icon: Dumbbell, unit: 'kg', color: 'text-blue-500' },
    streak: { labelDE: 'Trainings-Streak', labelEN: 'Training Streak', icon: Flame, unit: lang === 'de' ? 'Tage' : 'days', color: 'text-orange-500' },
    workouts: { labelDE: 'Anzahl Trainings', labelEN: 'Workout Count', icon: TrendingUp, unit: '', color: 'text-green-500' },
  };

  const info = categoryInfo[category];
  const CatIcon = info.icon;

  useEffect(() => {
    if (user && !isGuestMode) {
      getFriends(user.id).then((friends) => {
        getLeaderboardData(user.id, friends).then((data) => {
          setEntries(data);
          setLoading(false);
        });
      });
    } else {
      setLoading(false);
    }
  }, [user]);

  return (
    <div className="p-4 pt-16 pb-24">
      <div className="flex items-center gap-3 mb-6">
        <button onClick={onBack} className="p-2 -ml-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800"><ArrowLeft className="w-5 h-5" /></button>
        <h1 className="text-2xl font-bold">{lang === 'de' ? 'Ranking' : 'Ranking'}</h1>
      </div>

      {/* Category Banner */}
      <div className="bg-white dark:bg-surface-dark-alt rounded-2xl p-4 shadow-soft border border-slate-100 dark:border-slate-800/60 mb-4 flex items-center gap-3">
        <div className={`w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center ${info.color}`}>
          <CatIcon className="w-5 h-5" />
        </div>
        <div>
          <p className="text-sm font-semibold">{lang === 'de' ? info.labelDE : info.labelEN}</p>
          <p className="text-xs text-slate-400 dark:text-slate-500">{lang === 'de' ? 'Diese Woche' : 'This week'}</p>
        </div>
      </div>

      {loading ? (
        <p className="text-center text-sm text-slate-400 py-8">{t('common.loading')}</p>
      ) : entries.length === 0 ? (
        <p className="text-center text-sm text-slate-400 dark:text-slate-500 py-8">
          {lang === 'de' ? 'Füge Freunde hinzu, um das Ranking zu sehen.' : 'Add friends to see the ranking.'}
        </p>
      ) : (
        <div className="space-y-2">
          {entries.map((entry, i) => (
            <div
              key={entry.userId}
              className={`flex items-center gap-3 p-3 rounded-2xl ${
                entry.isMe
                  ? 'bg-primary-50 dark:bg-primary-900/20 ring-2 ring-primary-400'
                  : 'bg-white dark:bg-surface-dark-alt shadow-soft border border-slate-100 dark:border-slate-800/60'
              }`}
            >
              {/* Rank */}
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 ${
                i === 0 ? 'bg-amber-100 dark:bg-amber-900/30 text-amber-600' :
                i === 1 ? 'bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300' :
                i === 2 ? 'bg-orange-100 dark:bg-orange-900/30 text-orange-600' :
                'bg-slate-100 dark:bg-slate-800 text-slate-500'
              }`}>
                {i === 0 ? '🥇' : i === 1 ? '🥈' : i === 2 ? '🥉' : i + 1}
              </div>

              {/* Name + Level + Title */}
              <div className="flex-1 min-w-0">
                <p className={`text-sm font-semibold truncate ${entry.isMe ? 'text-primary-500' : ''}`}>
                  {entry.isMe ? (lang === 'de' ? 'Du' : 'You') : entry.name}
                </p>
                <p className="text-[10px] text-slate-400">
                  {getLevelTitle(entry.level).emoji} Lv. {entry.level} · {lang === 'de' ? getLevelTitle(entry.level).de : getLevelTitle(entry.level).en}
                </p>
              </div>

              {/* Score */}
              <div className="text-right flex-shrink-0">
                <p className="text-sm font-bold">{entry.score.toLocaleString()}</p>
                {info.unit && <p className="text-[10px] text-slate-400">{info.unit}</p>}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
