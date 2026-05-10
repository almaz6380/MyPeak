import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Droplets, Dumbbell, Flame, ChevronRight, Pill, User } from 'lucide-react';
import MyPeakLogo from '../components/MyPeakLogo';
import { useAuth } from '../context/AuthContext';
import { getNutritionEntries, getNutritionGoals, getWaterTotal } from '../data/nutritionStorage';
import { getWorkouts } from '../data/workoutStorage';
import { getXP } from '../data/socialStorage';
import { getSupplements, getSupplementLogs, getTodayScheduledSupplements, getSupplementProgress } from '../data/supplementStorage';

function formatDate(d) {
  return d.toISOString().split('T')[0];
}

function getGreeting(t) {
  const hour = new Date().getHours();
  if (hour < 12) return t('home.goodMorning');
  if (hour < 18) return t('home.goodAfternoon');
  return t('home.goodEvening');
}

function getDateString(lang) {
  const now = new Date();
  return now.toLocaleDateString(lang === 'de' ? 'de-DE' : 'en-US', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

export default function HomePage() {
  const { t, i18n } = useTranslation();
  const { user, profile } = useAuth();
  const navigate = useNavigate();
  const lang = i18n.language || 'de';
  const today = formatDate(new Date());

  const [nutrition, setNutrition] = useState({ calories: 0, protein: 0, carbs: 0, fat: 0 });
  const [goals, setGoals] = useState({ calories: 2000, protein: 150, carbs: 250, fat: 70, water_ml: 3000 });
  const [waterTotal, setWaterTotal] = useState(0);
  const [weeklyWorkouts, setWeeklyWorkouts] = useState(0);
  const [xpData, setXpData] = useState({ total_xp: 0, level: 1, streak_days: 0 });
  const [suppProgress, setSuppProgress] = useState({ total: 0, taken: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) loadDashboard();
  }, [user]);

  async function loadDashboard() {
    setLoading(true);
    try {
      const [entries, goalsData, waterData, workouts, xp, supps, suppLogs] = await Promise.all([
        getNutritionEntries(user.id, today),
        getNutritionGoals(user.id),
        getWaterTotal(user.id, today),
        getWorkouts(user.id),
        getXP(user.id),
        getSupplements(user.id),
        getSupplementLogs(user.id, today),
      ]);

      // Nutrition totals
      const totals = entries.reduce(
        (acc, e) => ({
          calories: acc.calories + (e.calories || 0),
          protein: acc.protein + (e.protein || 0),
          carbs: acc.carbs + (e.carbs || 0),
          fat: acc.fat + (e.fat || 0),
        }),
        { calories: 0, protein: 0, carbs: 0, fat: 0 }
      );
      setNutrition(totals);
      if (goalsData) setGoals(goalsData);
      setWaterTotal(waterData.total);

      // Weekly workouts
      const now = new Date();
      const weekStart = new Date(now);
      weekStart.setDate(now.getDate() - now.getDay());
      weekStart.setHours(0, 0, 0, 0);
      const weekCount = (workouts || []).filter((w) => new Date(w.date) >= weekStart).length;
      setWeeklyWorkouts(weekCount);

      // XP
      setXpData(xp || { total_xp: 0, level: 1, streak_days: 0 });

      // Supplements
      const scheduled = getTodayScheduledSupplements(supps || [], today);
      const progress = getSupplementProgress(scheduled, suppLogs || []);
      setSuppProgress(progress);
    } catch (err) {
      console.error('Dashboard load error:', err);
    }
    setLoading(false);
  }

  const calPercent = goals.calories > 0 ? Math.min(100, Math.round((nutrition.calories / goals.calories) * 100)) : 0;
  const waterPercent = (goals.water_ml || 3000) > 0 ? Math.min(100, Math.round((waterTotal / (goals.water_ml || 3000)) * 100)) : 0;

  return (
    <div className="p-4 pt-16 pb-24">
      {/* Header */}
      <div className="flex items-center justify-between mb-1">
        <button onClick={() => navigate('/profile')} className="w-9 h-9 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center">
          <User className="w-5 h-5 text-slate-500 dark:text-slate-400" />
        </button>
        <MyPeakLogo size={32} />
        <div className="w-9" />
      </div>
      <h1 className="text-xl font-bold text-slate-900 dark:text-white text-center">
        {getGreeting(t)}, {profile?.name || 'User'}
      </h1>
      <p className="text-sm text-slate-400 dark:text-slate-500 mb-6 text-center">
        {getDateString(lang)}
      </p>

      {loading ? (
        <div className="flex justify-center py-12">
          <div className="w-6 h-6 border-2 border-primary-500 border-t-transparent rounded-full animate-spin" />
        </div>
      ) : (
        <div className="space-y-3">
          {/* Calories + Macros Card */}
          <button
            onClick={() => navigate('/nutrition')}
            className="w-full bg-white dark:bg-surface-dark-alt rounded-2xl p-4 shadow-sm text-left hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Flame className="w-5 h-5 text-primary-500" />
                <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">{t('home.calories')}</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="text-lg font-bold text-primary-500">{Math.round(nutrition.calories)}</span>
                <span className="text-sm text-slate-400">/ {goals.calories}</span>
                <ChevronRight className="w-4 h-4 text-slate-300 ml-1" />
              </div>
            </div>

            {/* Calorie bar */}
            <div className="h-2.5 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden mb-4">
              <div
                className="h-full bg-primary-500 rounded-full transition-all duration-500"
                style={{ width: `${calPercent}%` }}
              />
            </div>

            {/* Macro pills */}
            <div className="flex gap-2">
              <MacroPill label="P" value={Math.round(nutrition.protein)} goal={goals.protein} color="bg-blue-500" />
              <MacroPill label="C" value={Math.round(nutrition.carbs)} goal={goals.carbs} color="bg-amber-500" />
              <MacroPill label="F" value={Math.round(nutrition.fat)} goal={goals.fat} color="bg-rose-500" />
            </div>
          </button>

          {/* Water + Supplements Row */}
          <div className="grid grid-cols-2 gap-3">
            {/* Water */}
            <button
              onClick={() => navigate('/nutrition')}
              className="bg-white dark:bg-surface-dark-alt rounded-2xl p-4 shadow-sm text-left hover:shadow-md transition-shadow"
            >
              <div className="flex items-center gap-2 mb-2">
                <Droplets className="w-4 h-4 text-cyan-500" />
                <span className="text-xs font-semibold text-slate-600 dark:text-slate-400">{t('home.water')}</span>
              </div>
              <p className="text-lg font-bold text-slate-900 dark:text-white">
                {(waterTotal / 1000).toFixed(1)}<span className="text-sm font-normal text-slate-400">L</span>
              </p>
              <div className="h-1.5 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden mt-2">
                <div className="h-full bg-cyan-500 rounded-full" style={{ width: `${waterPercent}%` }} />
              </div>
            </button>

            {/* Supplements */}
            <button
              onClick={() => navigate('/nutrition')}
              className="bg-white dark:bg-surface-dark-alt rounded-2xl p-4 shadow-sm text-left hover:shadow-md transition-shadow"
            >
              <div className="flex items-center gap-2 mb-2">
                <Pill className="w-4 h-4 text-purple-500" />
                <span className="text-xs font-semibold text-slate-600 dark:text-slate-400">{t('home.supplements')}</span>
              </div>
              <p className="text-lg font-bold text-slate-900 dark:text-white">
                {suppProgress.taken}<span className="text-sm font-normal text-slate-400">/{suppProgress.total}</span>
              </p>
              <div className="h-1.5 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden mt-2">
                <div className="h-full bg-purple-500 rounded-full" style={{ width: `${suppProgress.percentage || 0}%` }} />
              </div>
            </button>
          </div>

          {/* Training + Streak Card */}
          <button
            onClick={() => navigate('/training')}
            className="w-full bg-white dark:bg-surface-dark-alt rounded-2xl p-4 shadow-sm text-left hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Dumbbell className="w-5 h-5 text-primary-500" />
                <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">{t('home.training')}</span>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-300" />
            </div>
            <div className="flex items-center gap-6 mt-3">
              <div>
                <p className="text-2xl font-bold text-slate-900 dark:text-white">{weeklyWorkouts}</p>
                <p className="text-xs text-slate-400">{t('home.workouts')}</p>
              </div>
              <div className="w-px h-8 bg-slate-200 dark:bg-slate-700" />
              <div className="flex items-center gap-2">
                <Flame className="w-5 h-5 text-orange-500" />
                <div>
                  <p className="text-2xl font-bold text-slate-900 dark:text-white">{xpData.streak_days || 0}</p>
                  <p className="text-xs text-slate-400">{t('home.streak')} ({t('home.days')})</p>
                </div>
              </div>
            </div>
          </button>

        </div>
      )}
    </div>
  );
}

function MacroPill({ label, value, goal, color }) {
  const percent = goal > 0 ? Math.min(100, Math.round((value / goal) * 100)) : 0;
  return (
    <div className="flex-1 bg-slate-50 dark:bg-slate-800 rounded-xl p-2.5">
      <div className="flex items-center justify-between mb-1">
        <span className={`w-5 h-5 rounded-md ${color} text-white text-[10px] font-bold flex items-center justify-center`}>
          {label}
        </span>
        <span className="text-xs text-slate-400">{percent}%</span>
      </div>
      <p className="text-sm font-bold text-slate-900 dark:text-white">{value}<span className="text-xs font-normal text-slate-400">g</span></p>
      <div className="h-1 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden mt-1">
        <div className={`h-full ${color} rounded-full`} style={{ width: `${percent}%` }} />
      </div>
    </div>
  );
}
