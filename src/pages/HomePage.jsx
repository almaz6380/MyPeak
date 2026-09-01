import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { datumsLocale, wochentagKuerzel } from '../lib/datumsformat';
import { Flame, ChevronRight, ChevronLeft, ChevronDown, ChevronUp, Calendar, Plus } from 'lucide-react';
import FullRepLogo from '../components/FullRepLogo';
import CardPhotoMotif from '../components/CardPhotoMotif';
import { useAuth } from '../context/AuthContext';
import { getNutritionEntries, getNutritionGoals, getWaterTotal } from '../data/nutritionStorage';
import { getWorkouts } from '../data/workoutStorage';
import { getXP } from '../data/socialStorage';
import { widgetDatenAktualisieren } from '../lib/widgetDaten';
import { istVerbunden, schritteHeute, gewichtImportieren } from '../lib/health';
import { getSupplements, getSupplementLogs, getTodayScheduledSupplements, getSupplementProgress } from '../data/supplementStorage';
import { getCycleSettings, getCyclePhase, getPhaseRecommendations } from '../data/cycleStorage';
import { getWeightEntries, saveWeightEntry } from '../data/weightStorage';
import { checkAchievements } from '../data/achievements';
import { toLocalDateString } from '../lib/dateUtils';

function formatDate(d) {
  return toLocalDateString(d);
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
  return d.toLocaleDateString(datumsLocale(lang), {
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
  const [nutrition, setNutrition] = useState({ calories: 0, protein: 0, carbs: 0, fat: 0, fiber: 0 });
  const [goals, setGoals] = useState({ calories: 2000, protein: 150, carbs: 250, fat: 70, water_ml: 3000 });
  const [waterTotal, setWaterTotal] = useState(0);
  const [dayWorkouts, setDayWorkouts] = useState(0);
  const [xpData, setXpData] = useState({ total_xp: 0, level: 1, streak_days: 0 });
  const [suppProgress, setSuppProgress] = useState({ total: 0, taken: 0 });
  const [cyclePhase, setCyclePhase] = useState(null);
  const [showCycle, setShowCycle] = useState(false);
  const [weightEntries, setWeightEntries] = useState([]);
  const [showWeightChart, setShowWeightChart] = useState(() => {
    const saved = localStorage.getItem('weight_chart_collapsed');
    return saved !== 'true';
  });
  const [showWeightInput, setShowWeightInput] = useState(false);
  const [weightInput, setWeightInput] = useState('');
  const [weightRange, setWeightRange] = useState('3m');
  const [weightCustomFrom, setWeightCustomFrom] = useState('');
  const [weightCustomTo, setWeightCustomTo] = useState('');
  useEffect(() => {
    if (!user) return;
    // Abbruch-Guard: bei schnellem Datumswechsel darf eine ältere Antwort
    // den State der neueren nicht überschreiben
    let alive = true;
    loadDashboard(() => alive);
    return () => { alive = false; };
  }, [user, selectedDate]);

  // Homescreen-Widget mit frischen Zahlen versorgen — beim App-Start reicht
  // einmal je Nutzer (nach Workouts schreibt ActiveWorkout selbst).
  useEffect(() => {
    if (user?.id) widgetDatenAktualisieren(user.id);
  }, [user?.id]);

  // Health (Opt-in): Schritte fuer die Trainings-Karte lesen und neue
  // Gewichtseintraege aus Health uebernehmen. Beides still — schlaegt es
  // fehl, sieht die Seite aus wie ohne Verbindung.
  const [healthSteps, setHealthSteps] = useState(null);
  useEffect(() => {
    if (!user?.id || !istVerbunden(user.id)) { setHealthSteps(null); return; }
    let alive = true;
    schritteHeute(user.id).then((s) => { if (alive) setHealthSteps(s); });
    gewichtImportieren(user.id).then((n) => {
      // Frisch importierte Eintraege sollen den Verlauf sofort zeigen.
      if (alive && n > 0) loadDashboard(() => alive);
    });
    return () => { alive = false; };
  }, [user?.id]);

  async function loadDashboard(isAlive = () => true) {
    try {
      const [entries, goalsData, waterData, workouts, xp, supps, suppLogs, weights, cycleSettings] = await Promise.all([
        getNutritionEntries(user.id, selectedDate),
        getNutritionGoals(user.id),
        getWaterTotal(user.id, selectedDate),
        getWorkouts(user.id),
        getXP(user.id),
        getSupplements(user.id),
        getSupplementLogs(user.id, selectedDate),
        getWeightEntries(user.id),
        profile?.gender === 'female' ? getCycleSettings(user.id) : Promise.resolve(null),
      ]);

      if (!isAlive()) return; // veralteter Aufruf — State nicht mehr anfassen

      const totals = entries.reduce(
        (acc, e) => ({
          calories: acc.calories + (e.calories || 0),
          protein: acc.protein + (e.protein || 0),
          carbs: acc.carbs + (e.carbs || 0),
          fat: acc.fat + (e.fat || 0),
          fiber: acc.fiber + (e.fiber || 0),
        }),
        { calories: 0, protein: 0, carbs: 0, fat: 0, fiber: 0 }
      );
      setNutrition(totals);
      if (goalsData) setGoals(goalsData);
      setWaterTotal(waterData.total);

      // Cloud liefert timestamptz ("2026-07-06T00:00:00+00:00"), lokal steht "2026-07-06"
      const workoutDay = (d) => (typeof d === 'string' && !d.includes('T') ? d : toLocalDateString(new Date(d)));
      const count = (workouts || []).filter((w) => workoutDay(w.date) === selectedDate).length;
      setDayWorkouts(count);

      setXpData(xp || { total_xp: 0, level: 1, streak_days: 0 });

      const scheduled = getTodayScheduledSupplements(supps || [], selectedDate);
      const progress = getSupplementProgress(scheduled, suppLogs || []);
      setSuppProgress(progress);

      // Weight (prepend profile weight as starting point)
      if (profile?.weight_kg && (weights.length === 0 || weights[0].date > (profile?.updated_at || profile?.created_at || '').split('T')[0])) {
        const profileDate = (profile?.updated_at || profile?.created_at || new Date().toISOString()).split('T')[0];
        const hasProfileDate = weights.some((w) => w.date === profileDate);
        if (!hasProfileDate) {
          weights.unshift({ date: profileDate, weight_kg: profile.weight_kg, id: 'profile_initial' });
        }
      }
      setWeightEntries(weights);

      // Cycle (only for female users)
      if (profile?.gender === 'female') {
        if (cycleSettings && cycleSettings.tracking_enabled !== false) {
          setCyclePhase(getCyclePhase(cycleSettings, selectedDate));
          setShowCycle(true);
        } else {
          setCyclePhase(null);
          setShowCycle(true);
        }
      }
    } catch (err) {
      console.error('Dashboard load error:', err);
    }
  }

  function changeDate(offset) {
    const d = new Date(selectedDate + 'T12:00:00');
    d.setDate(d.getDate() + offset);
    setSelectedDate(formatDate(d));
  }

  async function handleAddWeight() {
    const w = parseFloat(weightInput);
    if (!w || w < 20 || w > 400) return;
    await saveWeightEntry(user.id, selectedDate, w);
    const updated = await getWeightEntries(user.id);
    setWeightEntries(updated);
    setWeightInput('');
    setShowWeightInput(false);
    checkAchievements(user.id, { type: 'weight' }).catch(() => {});
  }

  const calPercent = goals.calories > 0 ? Math.min(100, Math.round((nutrition.calories / goals.calories) * 100)) : 0;
  const waterPercent = (goals.water_ml || 3000) > 0 ? Math.min(100, Math.round((waterTotal / (goals.water_ml || 3000)) * 100)) : 0;
  const isToday = selectedDate === formatDate(new Date());

  return (
    <div className="p-4 pt-16 pb-24">
      {/* Header */}
      <div className="flex items-center justify-between mb-1">
        <div className="w-9" />
        <FullRepLogo size={32} />
        <button onClick={() => navigate('/profile')} className="w-9 h-9 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center overflow-hidden">
          <img src="/bg-photos/profile-icon.png" alt="" aria-hidden="true" className="h-7 w-auto object-contain" />
        </button>
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

      <div className="space-y-3">
          {/* Calories + Macros Card */}
          <button
            onClick={() => navigate('/nutrition')}
            className="relative overflow-hidden w-full bg-white dark:bg-surface-dark-alt rounded-2xl p-4 shadow-soft border border-slate-100 dark:border-slate-800/60 text-start hover:shadow-md transition-shadow"
          >
            <CardPhotoMotif src="/bg-photos/flame-icon.png" />
            <div className="relative flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <img src="/bg-photos/flame-icon.png" alt="" aria-hidden="true" className="h-6 w-auto object-contain -my-1" />
                <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">{t('home.calories')}</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="text-lg font-bold text-primary-600 dark:text-primary-400">{Math.round(nutrition.calories)}</span>
                <span className="text-sm text-slate-400">/ {goals.calories}</span>
                <ChevronRight className="w-4 h-4 text-slate-300 ms-1" />
              </div>
            </div>

            <div className="relative h-2.5 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden mb-4">
              <div
                className="h-full bg-primary-500 rounded-full transition-all duration-500"
                style={{ width: `${calPercent}%` }}
              />
            </div>

            <div className="relative flex gap-2">
              <MacroPill label="P" value={Math.round(nutrition.protein)} goal={goals.protein} color="bg-blue-500" />
              <MacroPill label="C" value={Math.round(nutrition.carbs)} goal={goals.carbs} color="bg-emerald-500" />
              <MacroPill label="F" value={Math.round(nutrition.fat)} goal={goals.fat} color="bg-rose-500" />
              <MacroPill label="B" value={Math.round(nutrition.fiber)} goal={goals.fiber || 30} color="bg-violet-500" />
            </div>
          </button>

          {/* Water + Supplements Row */}
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => navigate('/nutrition')}
              className="relative overflow-hidden bg-white dark:bg-surface-dark-alt rounded-2xl p-4 shadow-soft border border-slate-100 dark:border-slate-800/60 text-start hover:shadow-md transition-shadow"
            >
              <CardPhotoMotif src="/bg-photos/drop-icon.png" />
              <div className="relative flex items-center gap-2 mb-2">
                <img src="/bg-photos/drop-icon.png" alt="" aria-hidden="true" className="h-5 w-auto object-contain -my-0.5" />
                <span className="text-xs font-semibold text-slate-600 dark:text-slate-400">{t('home.water')}</span>
              </div>
              <p className="relative text-lg font-bold text-slate-900 dark:text-white">
                {(waterTotal / 1000).toFixed(1)}<span className="text-sm font-normal text-slate-400">L</span>
              </p>
              <div className="relative h-1.5 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden mt-2">
                <div className="h-full bg-cyan-500 rounded-full" style={{ width: `${waterPercent}%` }} />
              </div>
            </button>

            <button
              onClick={() => navigate('/nutrition')}
              className="relative overflow-hidden bg-white dark:bg-surface-dark-alt rounded-2xl p-4 shadow-soft border border-slate-100 dark:border-slate-800/60 text-start hover:shadow-md transition-shadow"
            >
              <CardPhotoMotif src="/bg-photos/supplement-icon.png" />
              <div className="relative flex items-center gap-2 mb-2">
                <img src="/bg-photos/supplement-icon.png" alt="" aria-hidden="true" className="h-5 w-auto object-contain -my-0.5" />
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

          {/* Cycle Widget (female only) */}
          {showCycle && cyclePhase && (
            <button
              onClick={() => navigate('/cycle')}
              className="w-full bg-white dark:bg-surface-dark-alt rounded-2xl p-4 shadow-soft border border-slate-100 dark:border-slate-800/60 text-start hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div className={`w-3 h-3 rounded-full ${cyclePhase.bgClass}`} />
                  <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">
                    {t(`cycle.phase_${cyclePhase.phase}`)}
                  </span>
                  <span className="text-xs text-slate-400">
                    · {t('cycle.day')} {cyclePhase.dayInPhase}/{cyclePhase.phaseLength}
                  </span>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-300" />
              </div>
              <div className="h-1.5 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden mb-2">
                <div className={`h-full ${cyclePhase.bgClass} rounded-full`} style={{ width: `${Math.round((cyclePhase.dayInPhase / cyclePhase.phaseLength) * 100)}%` }} />
              </div>
              <p className="text-xs text-slate-400">
                {getPhaseRecommendations(cyclePhase.phase, lang)?.training?.split('.')[0]}.
              </p>
            </button>
          )}
          {showCycle && !cyclePhase && (
            <button
              onClick={() => navigate('/cycle')}
              className="w-full bg-white dark:bg-surface-dark-alt rounded-2xl p-4 shadow-soft text-start hover:shadow-md transition-shadow border-2 border-dashed border-pink-300 dark:border-pink-700"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-pink-100 dark:bg-pink-900/20 flex items-center justify-center">
                  <span className="text-lg">🌸</span>
                </div>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-slate-900 dark:text-white">{t('cycle.title')}</p>
                  <p className="text-xs text-slate-400">{t('ui.setUpCycleAndGetRecommendations')}</p>
                </div>
                <ChevronRight className="w-5 h-5 text-slate-300" />
              </div>
            </button>
          )}

          {/* Training + Streak Card */}
          <button
            onClick={() => navigate('/training')}
            className="relative overflow-hidden w-full bg-white dark:bg-surface-dark-alt rounded-2xl p-4 shadow-soft border border-slate-100 dark:border-slate-800/60 text-start hover:shadow-md transition-shadow"
          >
            <CardPhotoMotif src="/bg-photos/training-icon.png" />
            <div className="relative flex items-center justify-between">
              <div className="flex items-center gap-2">
                <img src="/bg-photos/training-icon.png" alt="" aria-hidden="true" className="h-6 w-auto object-contain -my-1" />
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
              {/* Schritte aus Apple Health / Health Connect — nur wenn die
                  Verbindung im Profil aktiv ist und ein Wert lesbar war. */}
              {healthSteps !== null && (
                <>
                  <div className="w-px h-8 bg-slate-200 dark:bg-slate-700" />
                  <div>
                    <p className="text-2xl font-bold text-slate-900 dark:text-white">{healthSteps.toLocaleString(i18n.language)}</p>
                    <p className="text-xs text-slate-400">{t('home.steps')}</p>
                  </div>
                </>
              )}
            </div>
          </button>
          {/* Weight Chart Card */}
          <div className="relative bg-white dark:bg-surface-dark-alt rounded-2xl shadow-soft border border-slate-100 dark:border-slate-800/60 overflow-hidden">
            <CardPhotoMotif src="/bg-photos/weight-icon.png" />
            <div
              role="button"
              tabIndex={0}
              onClick={() => { const next = !showWeightChart; setShowWeightChart(next); localStorage.setItem('weight_chart_collapsed', (!next).toString()); }}
              className="relative w-full p-4 flex items-center justify-between cursor-pointer"
            >
              <div className="flex items-center gap-2">
                <img src="/bg-photos/weight-icon.png" alt="" aria-hidden="true" className="h-6 w-auto object-contain -my-1" />
                <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">{t('home.weight')}</span>
                {weightEntries.length > 0 && (
                  <span className="text-sm text-slate-400 ms-1">
                    {weightEntries[weightEntries.length - 1].weight_kg} kg
                  </span>
                )}
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={(e) => { e.stopPropagation(); setShowWeightInput(!showWeightInput); setShowWeightChart(true); localStorage.setItem('weight_chart_collapsed', 'false'); }}
                  className="p-1.5 rounded-lg bg-primary-500 text-white"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
                {showWeightChart ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
              </div>
            </div>

            {showWeightChart && (
              <div className="px-4 pb-4">
                {/* Weight input */}
                {showWeightInput && (
                  <div className="flex gap-2 mb-3">
                    <input
                      type="number"
                      inputMode="decimal"
                      step="0.1"
                      value={weightInput}
                      onChange={(e) => setWeightInput(e.target.value)}
                      placeholder="kg"
                      className="flex-1 px-3 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm text-center focus:outline-none focus:ring-2 focus:ring-primary-500"
                    />
                    <button
                      onClick={handleAddWeight}
                      disabled={!weightInput || parseFloat(weightInput) < 20}
                      className="px-4 py-2.5 bg-gradient-to-b from-primary-400 to-primary-500 hover:to-primary-600 disabled:opacity-50 text-white text-sm font-semibold rounded-xl shadow-md shadow-primary-500/25"
                    >
                      {t('nutrition.add')}
                    </button>
                  </div>
                )}

                {/* Time range selector */}
                <div className="flex gap-1 mb-2 flex-wrap">
                  {[
                    { key: '7d', label: '7T' },
                    { key: '14d', label: '14T' },
                    { key: '1m', label: '1M' },
                    { key: '3m', label: '3M' },
                    { key: '6m', label: '6M' },
                    { key: '1y', label: '1J' },
                    { key: 'all', label: t('home.weightAll') },
                  ].map((r) => (
                    <button
                      key={r.key}
                      onClick={() => { setWeightRange(r.key); setWeightCustomFrom(''); setWeightCustomTo(''); }}
                      className={`flex-1 py-1.5 rounded-lg text-xs font-medium transition-colors min-w-[36px] ${
                        weightRange === r.key && !weightCustomFrom
                          ? 'bg-primary-500 text-white'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400'
                      }`}
                    >
                      {r.label}
                    </button>
                  ))}
                </div>
                {/* Custom date range */}
                <div className="flex gap-2 mb-3">
                  <input
                    type="date"
                    value={weightCustomFrom}
                    onChange={(e) => { setWeightCustomFrom(e.target.value); setWeightRange('custom'); }}
                    className="flex-1 px-2 py-1.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                  <span className="text-xs text-slate-400 self-center">–</span>
                  <input
                    type="date"
                    value={weightCustomTo}
                    onChange={(e) => { setWeightCustomTo(e.target.value); setWeightRange('custom'); }}
                    max={formatDate(new Date())}
                    className="flex-1 px-2 py-1.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>

                {/* Chart */}
                {weightEntries.length >= 2 ? (
                  <WeightChart entries={weightEntries} range={weightRange} customFrom={weightCustomFrom} customTo={weightCustomTo} />
                ) : (
                  <p className="text-xs text-slate-400 text-center py-4">
                    {t('home.weightNoData')}
                  </p>
                )}
              </div>
            )}
          </div>

        </div>

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
  const { t } = useTranslation();
  const [viewDate, setViewDate] = useState(() => {
    const d = new Date(selectedDate + 'T12:00:00');
    return { year: d.getFullYear(), month: d.getMonth() };
  });

  const daysInMonth = new Date(viewDate.year, viewDate.month + 1, 0).getDate();
  const firstDay = new Date(viewDate.year, viewDate.month, 1).getDay();
  const adjustedFirst = firstDay === 0 ? 6 : firstDay - 1; // Monday first

  const monthName = new Date(viewDate.year, viewDate.month).toLocaleDateString(
    datumsLocale(lang),
    { month: 'long', year: 'numeric' }
  );

  const dayLabels = wochentagKuerzel(lang);

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
            className="flex-1 py-2.5 rounded-xl bg-gradient-to-b from-primary-400 to-primary-500 text-white text-sm font-semibold shadow-md shadow-primary-500/25"
          >
            {t('ui.today')}
          </button>
          <button
            onClick={onClose}
            className="flex-1 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 text-sm font-semibold"
          >
            {t('ui.close')}
          </button>
        </div>
      </div>
    </div>
  );
}

function WeightChart({ entries, range = '3m', customFrom = '', customTo = '' }) {
  const now = new Date();
  let fromStr, toStr;

  if (range === 'custom' && customFrom) {
    fromStr = customFrom;
    toStr = customTo || formatDate(now);
  } else {
    const cutoff = new Date(now);
    switch (range) {
      case '7d': cutoff.setDate(cutoff.getDate() - 7); break;
      case '14d': cutoff.setDate(cutoff.getDate() - 14); break;
      case '1m': cutoff.setMonth(cutoff.getMonth() - 1); break;
      case '3m': cutoff.setMonth(cutoff.getMonth() - 3); break;
      case '6m': cutoff.setMonth(cutoff.getMonth() - 6); break;
      case '1y': cutoff.setFullYear(cutoff.getFullYear() - 1); break;
      default: cutoff.setFullYear(2000); break;
    }
    fromStr = toLocalDateString(cutoff);
    toStr = formatDate(now);
  }

  const filtered = entries.filter((e) => e.date >= fromStr && e.date <= toStr);
  const last30 = filtered.length > 60 ? filtered.slice(-60) : filtered;
  if (last30.length < 2) return null;

  const weights = last30.map((e) => e.weight_kg);
  const minW = Math.floor(Math.min(...weights) - 1);
  const maxW = Math.ceil(Math.max(...weights) + 1);
  const valueRange = maxW - minW || 1;

  const chartW = 320;
  const chartH = 120;
  const padX = 35;
  const padY = 10;
  const w = chartW - padX;
  const h = chartH - padY * 2;

  const points = last30.map((e, i) => {
    const x = padX + (i / (last30.length - 1)) * w;
    const y = padY + h - ((e.weight_kg - minW) / valueRange) * h;
    return `${x},${y}`;
  }).join(' ');

  // Area fill path
  const firstX = padX;
  const lastX = padX + w;
  const areaPath = `M${firstX},${padY + h} ` + last30.map((e, i) => {
    const x = padX + (i / (last30.length - 1)) * w;
    const y = padY + h - ((e.weight_kg - minW) / valueRange) * h;
    return `L${x},${y}`;
  }).join(' ') + ` L${lastX},${padY + h} Z`;

  const gridLines = 3;
  const gridValues = Array.from({ length: gridLines }, (_, i) => minW + (valueRange / (gridLines - 1)) * i);

  return (
    <svg viewBox={`0 0 ${chartW} ${chartH}`} className="w-full" style={{ maxHeight: 140 }}>
      {/* Grid lines + labels */}
      {gridValues.map((v, i) => {
        const y = padY + h - ((v - minW) / valueRange) * h;
        return (
          <g key={i}>
            <line x1={padX} y1={y} x2={chartW} y2={y} stroke="currentColor" className="text-slate-200 dark:text-slate-700" strokeWidth="0.5" />
            <text x={padX - 4} y={y + 3} textAnchor="end" className="fill-slate-400 text-[8px]">{v.toFixed(0)}</text>
          </g>
        );
      })}

      {/* Area */}
      <path d={areaPath} fill="url(#weightGradient)" opacity="0.2" />

      {/* Line */}
      <polyline points={points} fill="none" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />

      {/* Dots on first and last */}
      {[last30[0], last30[last30.length - 1]].map((e, idx) => {
        const i = idx === 0 ? 0 : last30.length - 1;
        const x = padX + (i / (last30.length - 1)) * w;
        const y = padY + h - ((e.weight_kg - minW) / valueRange) * h;
        return <circle key={idx} cx={x} cy={y} r="3" fill="#f59e0b" />;
      })}

      {/* Date labels */}
      <text x={padX} y={chartH - 1} className="fill-slate-400 text-[7px]">
        {last30[0].date.slice(5)}
      </text>
      <text x={chartW} y={chartH - 1} textAnchor="end" className="fill-slate-400 text-[7px]">
        {last30[last30.length - 1].date.slice(5)}
      </text>

      <defs>
        <linearGradient id="weightGradient" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#f59e0b" stopOpacity="0" />
        </linearGradient>
      </defs>
    </svg>
  );
}
