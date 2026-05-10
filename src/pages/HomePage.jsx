import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Droplets, Dumbbell, Flame, ChevronRight, ChevronLeft, Pill, User, Calendar } from 'lucide-react';
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

function getDateLabel(dateStr, lang, t) {
  const today = formatDate(new Date());
  const yesterday = formatDate(new Date(Date.now() - 86400000));
  const tomorrow = formatDate(new Date(Date.now() + 86400000));

  if (dateStr === today) return t('home.today');
  if (dateStr === yesterday) return t('home.yesterday');
  if (dateStr === tomorrow) return t('home.tomorrow');

  const d = new Date(dateStr + 'T12:00:00');
  return d.toLocaleDateString(lang === 'de' ? 'de-DE' : 'en-US', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
  });
}

export default function HomePage() {
  const { t, i18n } = useTranslation();
  const { user, profile } = useAuth();
  const navigate = useNavigate();
  const lang = i18n.language || 'de';

  const [selectedDate, setSelectedDate] = useState(formatDate(new Date()));
  const [showCalendar, setShowCalendar] = useState(false);
  const [nutrition, setNutrition] = useState({ calories: 0, protein: 0, carbs: 0, fat: 0 });
  const [goals, setGoals] = useState({ calories: 2000, protein: 150, carbs: 250, fat: 70, water_ml: 3000 });
  const [waterTotal, setWaterTotal] = useState(0);
  const [dayWorkouts, setDayWorkouts] = useState(0);
  const [xpData, setXpData] = useState({ total_xp: 0, level: 1, streak_days: 0 });
  const [suppProgress, setSuppProgress] = useState({ total: 0, taken: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) loadDashboard();
  }, [user, selectedDate]);

  async function loadDashboard() {
    setLoading(true);
    try {
      const [entries, goalsData, waterData, workouts, xp, supps, suppLogs] = await Promise.all([
        getNutritionEntries(user.id, selectedDate),
        getNutritionGoals(user.id),
        getWaterTotal(user.id, selectedDate),
        getWorkouts(user.id),
        getXP(user.id),
        getSupplements(user.id),
        getSupplementLogs(user.id, selectedDate),
      ]);

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

      // Workouts on selected date
      const count = (workouts || []).filter((w) => w.date === selectedDate).length;
      setDayWorkouts(count);

      setXpData(xp || { total_xp: 0, level: 1, streak_days: 0 });

      const scheduled = getTodayScheduledSupplements(supps || [], selectedDate);
      const progress = getSupplementProgress(scheduled, suppLogs || []);
      setSuppProgress(progress);
    } catch (err) {
      console.error('Dashboard load error:', err);
    }
    setLoading(false);
  }

  function changeDate(offset) {
    const d = new Date(selectedDate + 'T12:00:00');
    d.setDate(d.getDate() + offset);
    setSelectedDate(formatDate(d));
  }

  const calPercent = goals.calories > 0 ? Math.min(100, Math.round((nutrition.calories / goals.calories) * 100)) : 0;
  const waterPercent = (goals.water_ml || 3000) > 0 ? Math.min(100, Math.round((waterTotal / (goals.water_ml || 3000)) * 100)) : 0;
  const isToday = selectedDate === formatDate(new Date());

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

      {/* Date Navigator */}
      <div className="flex items-center justify-center gap-2 mt-3 mb-6">
        <button
          onClick={() => changeDate(-1)}
          className="p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
        >
          <ChevronLeft className="w-5 h-5 text-slate-400" />
        </button>
        <button
          onClick={() => setShowCalendar(true)}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white dark:bg-surface-dark-alt border border-slate-200 dark:border-slate-700 hover:border-primary-400 transition-colors"
        >
          <Calendar className="w-4 h-4 text-primary-500" />
          <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">
            {getDateLabel(selectedDate, lang, t)}
          </span>
        </button>
        <button
          onClick={() => changeDate(1)}
          className="p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
        >
          <ChevronRight className="w-5 h-5 text-slate-400" />
        </button>
      </div>

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

            <div className="h-2.5 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden mb-4">
              <div
                className="h-full bg-primary-500 rounded-full transition-all duration-500"
                style={{ width: `${calPercent}%` }}
              />
            </div>

            <div className="flex gap-2">
              <MacroPill label="P" value={Math.round(nutrition.protein)} goal={goals.protein} color="bg-blue-500" />
              <MacroPill label="C" value={Math.round(nutrition.carbs)} goal={goals.carbs} color="bg-amber-500" />
              <MacroPill label="F" value={Math.round(nutrition.fat)} goal={goals.fat} color="bg-rose-500" />
            </div>
          </button>

          {/* Water + Supplements Row */}
          <div className="grid grid-cols-2 gap-3">
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
                <p className="text-2xl font-bold text-slate-900 dark:text-white">{dayWorkouts}</p>
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

      {/* Calendar Modal */}
      {showCalendar && (
        <CalendarModal
          selectedDate={selectedDate}
          onSelect={(d) => { setSelectedDate(d); setShowCalendar(false); }}
          onClose={() => setShowCalendar(false)}
          lang={lang}
        />
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

function CalendarModal({ selectedDate, onSelect, onClose, lang }) {
  const [viewDate, setViewDate] = useState(() => {
    const d = new Date(selectedDate + 'T12:00:00');
    return { year: d.getFullYear(), month: d.getMonth() };
  });

  const daysInMonth = new Date(viewDate.year, viewDate.month + 1, 0).getDate();
  const firstDay = new Date(viewDate.year, viewDate.month, 1).getDay();
  const adjustedFirst = firstDay === 0 ? 6 : firstDay - 1; // Monday first

  const monthName = new Date(viewDate.year, viewDate.month).toLocaleDateString(
    lang === 'de' ? 'de-DE' : 'en-US',
    { month: 'long', year: 'numeric' }
  );

  const dayLabels = lang === 'de'
    ? ['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So']
    : ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  function prevMonth() {
    setViewDate((v) => {
      const m = v.month - 1;
      return m < 0 ? { year: v.year - 1, month: 11 } : { ...v, month: m };
    });
  }

  function nextMonth() {
    setViewDate((v) => {
      const m = v.month + 1;
      return m > 11 ? { year: v.year + 1, month: 0 } : { ...v, month: m };
    });
  }

  function selectDay(day) {
    const d = new Date(viewDate.year, viewDate.month, day, 12);
    onSelect(formatDate(d));
  }

  const todayStr = formatDate(new Date());

  return (
    <div className="fixed inset-0 bg-black/50 z-[60] flex items-center justify-center p-6" onClick={onClose}>
      <div className="bg-white dark:bg-surface-dark-alt rounded-2xl w-full max-w-sm shadow-xl" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between px-5 pt-5 pb-3">
          <button onClick={prevMonth} className="p-1"><ChevronLeft className="w-5 h-5 text-slate-400" /></button>
          <span className="text-sm font-semibold text-slate-700 dark:text-slate-200 capitalize">{monthName}</span>
          <button onClick={nextMonth} className="p-1"><ChevronRight className="w-5 h-5 text-slate-400" /></button>
        </div>

        <div className="grid grid-cols-7 px-4 pb-1">
          {dayLabels.map((d) => (
            <span key={d} className="text-[10px] font-medium text-slate-400 text-center py-1">{d}</span>
          ))}
        </div>

        <div className="grid grid-cols-7 px-4 pb-4 gap-y-0.5">
          {Array.from({ length: adjustedFirst }).map((_, i) => <span key={`e${i}`} />)}
          {Array.from({ length: daysInMonth }).map((_, i) => {
            const day = i + 1;
            const dateStr = `${viewDate.year}-${String(viewDate.month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
            const isSelected = dateStr === selectedDate;
            const isToday = dateStr === todayStr;
            return (
              <button
                key={day}
                onClick={() => selectDay(day)}
                className={`h-9 w-9 mx-auto rounded-full text-sm font-medium flex items-center justify-center transition-colors ${
                  isSelected
                    ? 'bg-primary-500 text-white'
                    : isToday
                      ? 'ring-2 ring-primary-400 text-primary-500'
                      : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                {day}
              </button>
            );
          })}
        </div>

        <div className="flex gap-2 px-5 pb-5">
          <button
            onClick={() => { onSelect(todayStr); }}
            className="flex-1 py-2.5 rounded-xl bg-primary-500 text-white text-sm font-semibold"
          >
            {lang === 'de' ? 'Heute' : 'Today'}
          </button>
          <button
            onClick={onClose}
            className="flex-1 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 text-sm font-semibold"
          >
            {lang === 'de' ? 'Schließen' : 'Close'}
          </button>
        </div>
      </div>
    </div>
  );
}
