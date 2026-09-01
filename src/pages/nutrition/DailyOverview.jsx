import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { datumsLocale, wochentagKuerzel } from '../../lib/datumsformat';
import i18nInstanz from '../../i18n';
import { ChevronLeft, ChevronRight, Plus, Trash2, Settings, UtensilsCrossed, Pencil, X, Check, GlassWater, BookOpen } from 'lucide-react';
import CardPhotoMotif from '../../components/CardPhotoMotif';
import MacroRing from './MacroRing';
import FullRepLogo from '../../components/FullRepLogo';
import { useAuth } from '../../context/AuthContext';
import { getNutritionEntries, getNutritionGoals, deleteNutritionEntry, saveNutritionGoals, getWaterTotal, addWater, removeWaterAmount } from '../../data/nutritionStorage';
import { toLocalDateString } from '../../lib/dateUtils';
import { appSprache } from '../../lib/sprache';

const MEAL_SLOTS = ['breakfast', 'lunch', 'dinner', 'snack'];

function getFoodEmoji(source) {
  if (source === 'openfoodfacts') return '🏷️';
  if (source === 'custom_meal') return '🍱';
  if (source === 'barcode') return '📷';
  return '🍽️';
}

export default function DailyOverview({ onAddFood, onEditEntry, onOpenTDEE, onOpenCustomMeals, onOpenCookbook, onOpenSupplements }) {
  const { t, i18n } = useTranslation();
  const lang = appSprache(i18n.language);
  const { user } = useAuth();
  const [selectedDate, setSelectedDate] = useState(formatDate(new Date()));
  const [entries, setEntries] = useState([]);
  const [goals, setGoals] = useState({ calories: 2000, protein: 150, carbs: 250, fat: 70, water_ml: 3000 });
  const [waterTotal, setWaterTotal] = useState(0);
  const [showGoalEditor, setShowGoalEditor] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);
  const [showWaterInput, setShowWaterInput] = useState(false);
  const [customWaterAmount, setCustomWaterAmount] = useState('');

  // Load goals only once on mount
  useEffect(() => {
    if (user) {
      getNutritionGoals(user.id).then((g) => setGoals(g));
    }
  }, [user]);

  // Load entries + water when date changes
  useEffect(() => {
    if (user) loadDateData();
  }, [user, selectedDate]);

  async function loadDateData() {
    const [entriesData, waterData] = await Promise.all([
      getNutritionEntries(user.id, selectedDate),
      getWaterTotal(user.id, selectedDate),
    ]);
    setEntries(entriesData);
    setWaterTotal(waterData.total);
  }

  function handleAddWater(ml) {
    setWaterTotal((prev) => prev + ml);
    addWater(user.id, selectedDate, ml);
  }

  function handleRemoveWaterAmount(ml) {
    setWaterTotal((prev) => Math.max(0, prev - ml));
    removeWaterAmount(user.id, selectedDate, ml);
  }

  function handleCustomWaterAdd() {
    const ml = parseInt(customWaterAmount);
    if (ml > 0) {
      handleAddWater(ml);
      setCustomWaterAmount('');
      setShowWaterInput(false);
    }
  }

  function changeDate(offset) {
    const d = new Date(selectedDate);
    d.setDate(d.getDate() + offset);
    setSelectedDate(formatDate(d));
  }

  const totals = entries.reduce(
    (acc, e) => ({
      calories: acc.calories + (e.calories || 0),
      protein: acc.protein + (e.protein || 0),
      carbs: acc.carbs + (e.carbs || 0),
      fat: acc.fat + (e.fat || 0),
    }),
    { calories: 0, protein: 0, carbs: 0, fat: 0 }
  );

  const isToday = selectedDate === formatDate(new Date());

  async function handleDelete(entry) {
    await deleteNutritionEntry(user.id, entry.id, entry.date);
    setEntries((prev) => prev.filter((e) => e.id !== entry.id));
  }

  async function handleSaveGoals(newGoals) {
    await saveNutritionGoals(user.id, { ...goals, ...newGoals });
    setGoals((prev) => ({ ...prev, ...newGoals }));
    setShowGoalEditor(false);
  }


  return (
    <div className="p-4 pt-16 pb-24">
      {/* Header */}
      <div className="flex flex-col items-center pt-12 mb-4">
        <FullRepLogo size={36} />
        <h1 className="text-2xl font-bold mt-2">{t('nutrition.title')}</h1>
      </div>
      <div className="flex items-center justify-end mb-4">
        <div className="flex gap-2">
          <button
            onClick={onOpenCookbook}
            className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
          >
            <BookOpen className="w-5 h-5" />
          </button>
          <button
            onClick={onOpenCustomMeals}
            className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
          >
            <UtensilsCrossed className="w-5 h-5" />
          </button>
          <button
            onClick={onOpenTDEE}
            className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
          >
            <Settings className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Date Picker Bar */}
      <div className="flex items-center gap-2 mb-4">
        <button
          onClick={() => changeDate(-1)}
          className="p-2 rounded-xl bg-white dark:bg-surface-dark-alt shadow-soft border border-slate-100 dark:border-slate-800/60 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
        >
          <ChevronLeft className="w-5 h-5 text-slate-500" />
        </button>

        <button
          onClick={() => setShowCalendar(true)}
          className={`flex-1 py-2.5 rounded-xl text-sm font-semibold text-center transition-colors ${
            isToday
              ? 'bg-gradient-to-b from-primary-400 to-primary-500 text-white shadow-md shadow-primary-500/25'
              : 'bg-white dark:bg-surface-dark-alt text-slate-700 dark:text-slate-200 shadow-soft border border-slate-100 dark:border-slate-800/60 hover:bg-slate-50 dark:hover:bg-slate-800'
          }`}
        >
          {formatDisplayDate(selectedDate, lang)}
        </button>

        <button
          onClick={() => changeDate(1)}
          className="p-2 rounded-xl bg-white dark:bg-surface-dark-alt shadow-soft border border-slate-100 dark:border-slate-800/60 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
        >
          <ChevronRight className="w-5 h-5 text-slate-500" />
        </button>

        {!isToday && (
          <button
            onClick={() => setSelectedDate(formatDate(new Date()))}
            className="px-3 py-2.5 rounded-xl bg-gradient-to-b from-primary-400 to-primary-500 text-white text-xs font-semibold shadow-md shadow-primary-500/25 hover:to-primary-600 transition-colors whitespace-nowrap"
          >
            {t('nutrition.today')}
          </button>
        )}
      </div>

      {/* Macro Rings */}
      <div className="relative overflow-hidden bg-white dark:bg-surface-dark-alt rounded-2xl p-5 shadow-soft border border-slate-100 dark:border-slate-800/60 mb-4">
        <CardPhotoMotif src="/bg-photos/flame-icon.png" />
        <div className="relative flex items-center justify-between mb-3">
          <h2 className="text-xs font-medium text-slate-400 dark:text-slate-500">{t('nutrition.macros')}</h2>
          <button
            onClick={() => setShowGoalEditor(true)}
            className="flex items-center gap-1 text-xs text-slate-400 hover:text-primary-500 dark:text-slate-500 dark:hover:text-primary-400 transition-colors"
          >
            <Pencil className="w-3 h-3" />
            {t('nutrition.setGoal')}
          </button>
        </div>

        <div className="flex justify-between">
          <MacroRing value={totals.calories} goal={goals.calories} label="kcal" strokeColor="stroke-primary-500" size={76} />
          <MacroRing value={totals.protein} goal={goals.protein} label={t('nutrition.protein')} unit="g" strokeColor="stroke-blue-500" size={76} />
          <MacroRing value={totals.carbs} goal={goals.carbs} label={t('nutrition.carbs')} unit="g" strokeColor="stroke-emerald-500" size={76} />
          <MacroRing value={totals.fat} goal={goals.fat} label={t('nutrition.fat')} unit="g" strokeColor="stroke-rose-400" size={76} />
        </div>

        <div className="mt-3 text-center">
          {totals.calories <= goals.calories ? (
            <p className="text-sm text-slate-500 dark:text-slate-400">
              <span className="font-semibold text-primary-600 dark:text-primary-400">{Math.round(goals.calories - totals.calories)}</span>{' '}
              kcal {t('nutrition.remaining')}
            </p>
          ) : (
            <p className="text-sm text-red-500">
              <span className="font-semibold">{Math.round(totals.calories - goals.calories)}</span> kcal {t('nutrition.over')}
            </p>
          )}
        </div>
      </div>

      {/* Meal Slots */}
      {MEAL_SLOTS.map((slot) => {
        const slotEntries = entries.filter((e) => e.meal_slot === slot);
        const slotCalories = slotEntries.reduce((sum, e) => sum + (e.calories || 0), 0);

        return (
          <div key={slot} className="bg-white dark:bg-surface-dark-alt rounded-2xl shadow-soft border border-slate-100 dark:border-slate-800/60 mb-3 overflow-hidden">
            <div className="flex items-center justify-between px-4 py-3 border-b border-slate-100 dark:border-slate-700">
              <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-200">{t(`nutrition.${slot}`)}</h3>
              {slotEntries.length > 0 && (
                <span className="text-xs text-slate-400 dark:text-slate-500 font-medium">{Math.round(slotCalories)} kcal</span>
              )}
            </div>

            {slotEntries.map((entry) => (
              <div key={entry.id} className="flex items-center gap-3 px-4 py-3 border-b border-slate-50 dark:border-slate-700/50 last:border-0">
                {/* Food emoji */}
                <div className="w-9 h-9 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center flex-shrink-0 text-base">
                  {getFoodEmoji(entry.source)}
                </div>
                <button onClick={() => onEditEntry(entry)} className="flex-1 text-left min-w-0">
                  <div className="flex items-baseline justify-between gap-2 mb-1">
                    <p className="text-sm font-medium text-slate-700 dark:text-slate-200 truncate">
                      {entry.food_name}
                      {entry.brand && <span className="text-xs text-slate-400 dark:text-slate-500 ml-1">{entry.brand}</span>}
                    </p>
                    <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 whitespace-nowrap">
                      {Math.round(entry.calories)} kcal
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-[11px] text-slate-400 dark:text-slate-500">{entry.serving_size}{entry.serving_unit}</span>
                    <span className="text-slate-200 dark:text-slate-700">·</span>
                    <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-md bg-blue-50 dark:bg-blue-900/20 text-[10px] font-semibold text-blue-600 dark:text-blue-400">
                      P {r1(entry.protein)}
                    </span>
                    <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-md bg-emerald-50 dark:bg-emerald-900/20 text-[10px] font-semibold text-emerald-600 dark:text-emerald-400">
                      C {r1(entry.carbs)}
                    </span>
                    <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-md bg-rose-50 dark:bg-rose-900/20 text-[10px] font-semibold text-rose-600 dark:text-rose-400">
                      F {r1(entry.fat)}
                    </span>
                  </div>
                </button>
                <button
                  onClick={() => handleDelete(entry)}
                  className="p-2 text-slate-300 dark:text-slate-600 hover:text-red-400 dark:hover:text-red-400 transition-colors flex-shrink-0"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}

            <button
              onClick={() => onAddFood(slot, selectedDate)}
              className="w-full px-4 py-2.5 flex items-center justify-center gap-1.5 text-slate-400 dark:text-slate-500 hover:text-primary-500 dark:hover:text-primary-400 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors text-sm"
            >
              <Plus className="w-4 h-4" />
              {t('nutrition.addFood')}
            </button>
          </div>
        );
      })}

      {/* Water Tracker */}
      <div className="relative overflow-hidden bg-white dark:bg-surface-dark-alt rounded-2xl p-4 shadow-soft border border-slate-100 dark:border-slate-800/60 mb-4">
        <CardPhotoMotif src="/bg-photos/drop-icon.png" />
        <div className="relative flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <img src="/bg-photos/drop-icon.png" alt="" aria-hidden="true" className="h-5 w-auto object-contain -my-0.5" />
            <h2 className="text-sm font-semibold text-slate-700 dark:text-slate-200">{t('nutrition.water')}</h2>
          </div>
          <span className="text-sm font-medium text-slate-500 dark:text-slate-400">
            {(waterTotal / 1000).toFixed(1)}{t('nutrition.liters')} / {((goals.water_ml || 3000) / 1000).toFixed(1)}{t('nutrition.liters')}
          </span>
        </div>

        <div className="w-full h-3 bg-slate-100 dark:bg-slate-700 rounded-full mb-3 overflow-hidden">
          <div
            className="h-full bg-cyan-500 rounded-full transition-all duration-300"
            style={{ width: `${Math.min(100, (waterTotal / (goals.water_ml || 3000)) * 100)}%` }}
          />
        </div>

        <div className="flex items-center gap-2">
          <button onClick={() => handleRemoveWaterAmount(250)} className="flex-1 py-2 rounded-xl bg-rose-50 dark:bg-rose-900/20 text-rose-600 dark:text-rose-400 text-sm font-medium hover:bg-rose-100 dark:hover:bg-rose-900/30 transition-colors">
            -250ml
          </button>
          <button onClick={() => handleRemoveWaterAmount(500)} className="flex-1 py-2 rounded-xl bg-rose-50 dark:bg-rose-900/20 text-rose-600 dark:text-rose-400 text-sm font-medium hover:bg-rose-100 dark:hover:bg-rose-900/30 transition-colors">
            -500ml
          </button>
          <button onClick={() => handleAddWater(250)} className="flex-1 py-2 rounded-xl bg-cyan-50 dark:bg-cyan-900/20 text-cyan-600 dark:text-cyan-400 text-sm font-medium hover:bg-cyan-100 dark:hover:bg-cyan-900/30 transition-colors">
            +250ml
          </button>
          <button onClick={() => handleAddWater(500)} className="flex-1 py-2 rounded-xl bg-cyan-50 dark:bg-cyan-900/20 text-cyan-600 dark:text-cyan-400 text-sm font-medium hover:bg-cyan-100 dark:hover:bg-cyan-900/30 transition-colors">
            +500ml
          </button>
        </div>
        <div className="flex items-center gap-2 mt-2">
          <button onClick={() => setShowWaterInput(!showWaterInput)} className="flex-1 px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 text-sm font-medium hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">
            {t('nutrition.customAmount')}
          </button>
        </div>

        {showWaterInput && (
          <div className="flex items-center gap-2 mt-3">
            <input type="number" inputMode="numeric" value={customWaterAmount} onChange={(e) => setCustomWaterAmount(e.target.value)} placeholder="ml" className="flex-1 px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm text-center focus:outline-none focus:ring-2 focus:ring-cyan-500" />
            <button onClick={handleCustomWaterAdd} disabled={!customWaterAmount || parseInt(customWaterAmount) <= 0} className="px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-600 disabled:bg-slate-300 dark:disabled:bg-slate-700 text-white text-sm font-medium transition-colors">
              {t('nutrition.add')}
            </button>
          </div>
        )}
      </div>

      {/* Supplements Card */}
      <button
        onClick={onOpenSupplements}
        className="relative overflow-hidden w-full bg-white dark:bg-surface-dark-alt rounded-2xl p-4 shadow-soft border border-slate-100 dark:border-slate-800/60 mb-4 flex items-center gap-3 text-left hover:shadow-md transition-shadow"
      >
        <CardPhotoMotif src="/bg-photos/supplement-icon.png" />
        <div className="w-10 h-10 rounded-xl bg-purple-100 dark:bg-purple-900/20 flex items-center justify-center">
          <img src="/bg-photos/supplement-icon.png" alt="" aria-hidden="true" className="h-6 w-auto object-contain" />
        </div>
        <div className="flex-1">
          <p className="text-sm font-semibold text-slate-700 dark:text-slate-200">{t('supplements.title')}</p>
          <p className="text-xs text-slate-400">{t('supplements.cardSubtitle')}</p>
        </div>
        <ChevronRight className="w-5 h-5 text-slate-300 dark:text-slate-600" />
      </button>

      {!goals.tdee && (
        <button
          onClick={onOpenTDEE}
          className="w-full border-2 border-dashed border-primary-300 dark:border-primary-700 rounded-2xl p-4 text-center hover:border-primary-400 hover:bg-primary-50/50 dark:hover:bg-primary-900/10 transition-colors"
        >
          <p className="text-sm font-semibold text-primary-500 dark:text-primary-400">{t('nutrition.goalPrompt')}</p>
          <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">{t('nutrition.goalPromptDesc')}</p>
        </button>
      )}

      {showGoalEditor && <GoalEditorModal goals={goals} onSave={handleSaveGoals} onClose={() => setShowGoalEditor(false)} t={t} />}
      {showCalendar && (
        <CalendarModal
          selectedDate={selectedDate}
          onSelect={(d) => { setSelectedDate(d); setShowCalendar(false); }}
          onClose={() => setShowCalendar(false)}
          lang={lang}
          t={t}
        />
      )}
    </div>
  );
}

// ── Custom Calendar Modal ────────────────────────────────────

function CalendarModal({ selectedDate, onSelect, onClose, lang, t }) {
  const selected = new Date(selectedDate);
  const [viewYear, setViewYear] = useState(selected.getFullYear());
  const [viewMonth, setViewMonth] = useState(selected.getMonth());

  const todayStr = formatDate(new Date());

  const dayNames = wochentagKuerzel(lang);

  const monthNames = Array.from({ length: 12 }, (_, m) =>
    new Date(Date.UTC(2026, m, 15)).toLocaleDateString(datumsLocale(lang), { month: 'long', timeZone: 'UTC' }));

  function prevMonth() {
    if (viewMonth === 0) { setViewMonth(11); setViewYear((y) => y - 1); }
    else setViewMonth((m) => m - 1);
  }

  function nextMonth() {
    if (viewMonth === 11) { setViewMonth(0); setViewYear((y) => y + 1); }
    else setViewMonth((m) => m + 1);
  }

  // Build calendar grid
  const firstDay = new Date(viewYear, viewMonth, 1);
  let startWeekday = firstDay.getDay() - 1; // Monday = 0
  if (startWeekday < 0) startWeekday = 6;
  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
  const daysInPrevMonth = new Date(viewYear, viewMonth, 0).getDate();

  const cells = [];
  // Previous month trailing days
  for (let i = startWeekday - 1; i >= 0; i--) {
    cells.push({ day: daysInPrevMonth - i, current: false });
  }
  // Current month
  for (let d = 1; d <= daysInMonth; d++) {
    cells.push({ day: d, current: true });
  }
  // Next month leading days
  const remaining = 42 - cells.length;
  for (let d = 1; d <= remaining; d++) {
    cells.push({ day: d, current: false });
  }

  function handleDayClick(cell) {
    if (!cell.current) return;
    const dateStr = `${viewYear}-${String(viewMonth + 1).padStart(2, '0')}-${String(cell.day).padStart(2, '0')}`;
    onSelect(dateStr);
  }

  function getDayStr(day) {
    return `${viewYear}-${String(viewMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div
        className="bg-white dark:bg-surface-dark-alt rounded-2xl w-full max-w-sm shadow-xl animate-slide-up"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Month/Year Header */}
        <div className="flex items-center justify-between px-5 pt-5 pb-3">
          <button onClick={prevMonth} className="p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
            <ChevronLeft className="w-5 h-5 text-slate-500" />
          </button>
          <h3 className="text-base font-bold text-slate-900 dark:text-white">
            {monthNames[viewMonth]} {viewYear}
          </h3>
          <button onClick={nextMonth} className="p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
            <ChevronRight className="w-5 h-5 text-slate-500" />
          </button>
        </div>

        {/* Day Names */}
        <div className="grid grid-cols-7 px-4 pb-1">
          {dayNames.map((d) => (
            <div key={d} className="text-center text-[11px] font-semibold text-slate-400 dark:text-slate-500 py-1">
              {d}
            </div>
          ))}
        </div>

        {/* Day Grid */}
        <div className="grid grid-cols-7 px-4 pb-4 gap-y-0.5">
          {cells.map((cell, i) => {
            const dayStr = cell.current ? getDayStr(cell.day) : '';
            const isSelected = dayStr === selectedDate;
            const isToday = dayStr === todayStr;

            return (
              <button
                key={i}
                onClick={() => handleDayClick(cell)}
                disabled={!cell.current}
                className={`relative w-full aspect-square flex items-center justify-center rounded-xl text-sm transition-all ${
                  !cell.current
                    ? 'text-slate-200 dark:text-slate-700 cursor-default'
                    : isSelected
                    ? 'bg-primary-500 text-white font-bold shadow-md shadow-primary-500/30'
                    : isToday
                    ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-500 dark:text-primary-400 font-semibold'
                    : 'text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 font-medium'
                }`}
              >
                {cell.day}
                {isToday && !isSelected && (
                  <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-primary-500" />
                )}
              </button>
            );
          })}
        </div>

        {/* Footer */}
        <div className="flex gap-2 px-5 pb-5">
          <button
            onClick={onClose}
            className="flex-1 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-sm font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
          >
            {t('common.cancel')}
          </button>
          <button
            onClick={() => onSelect(todayStr)}
            className="flex-1 py-2.5 rounded-xl bg-primary-500 text-white text-sm font-semibold hover:bg-primary-600 transition-colors"
          >
            {t('nutrition.today')}
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Goal Editor Modal ────────────────────────────────────────

function GoalEditorModal({ goals, onSave, onClose, t }) {
  const [calories, setCalories] = useState(String(Math.round(goals.calories)));
  const [protein, setProtein] = useState(String(Math.round(goals.protein)));
  const [carbs, setCarbs] = useState(String(Math.round(goals.carbs)));
  const [fat, setFat] = useState(String(Math.round(goals.fat)));
  const [fiber, setFiber] = useState(String(Math.round(goals.fiber || 30)));
  const [waterMl, setWaterMl] = useState(String(Math.round(goals.water_ml || 3000)));
  const [autoCalc, setAutoCalc] = useState(null); // 'protein' | 'carbs' | 'fat' — which to auto-calculate

  // kcal auto mode: true = kcal calculated from macros, false = manual kcal
  const initMacroKcal = Math.round(goals.protein) * 4 + Math.round(goals.carbs) * 4 + Math.round(goals.fat) * 9;
  const [kcalAuto, setKcalAuto] = useState(Math.abs(Math.round(goals.calories) - initMacroKcal) < 5);

  const cal = parseInt(calories) || 0;
  const p = parseInt(protein) || 0;
  const c = parseInt(carbs) || 0;
  const f = parseInt(fat) || 0;

  const proteinKcal = p * 4;
  const carbsKcal = c * 4;
  const fatKcal = f * 9;
  const macroKcal = proteinKcal + carbsKcal + fatKcal;
  const remaining = cal - macroKcal;

  // Macro onChange handlers — auto-update kcal when in auto mode
  function handleProteinChange(v) {
    setProtein(v);
    setAutoCalc(null);
    if (kcalAuto) {
      const newP = parseInt(v) || 0;
      setCalories(String(newP * 4 + c * 4 + f * 9));
    }
  }
  function handleCarbsChange(v) {
    setCarbs(v);
    setAutoCalc(null);
    if (kcalAuto) {
      const newC = parseInt(v) || 0;
      setCalories(String(p * 4 + newC * 4 + f * 9));
    }
  }
  function handleFatChange(v) {
    setFat(v);
    setAutoCalc(null);
    if (kcalAuto) {
      const newF = parseInt(v) || 0;
      setCalories(String(p * 4 + c * 4 + newF * 9));
    }
  }

  function handleCaloriesChange(v) {
    setCalories(v);
    setKcalAuto(false);
  }

  function toggleKcalAuto() {
    if (!kcalAuto) {
      // Switch to auto — sync kcal to current macros
      setCalories(String(macroKcal));
      setKcalAuto(true);
    } else {
      setKcalAuto(false);
    }
  }

  function autoCalcMacro(field) {
    if (!cal) return;
    if (field === 'protein') {
      const rest = cal - (c * 4) - (f * 9);
      setProtein(String(Math.max(0, Math.round(rest / 4))));
    } else if (field === 'carbs') {
      const rest = cal - (p * 4) - (f * 9);
      setCarbs(String(Math.max(0, Math.round(rest / 4))));
    } else if (field === 'fat') {
      const rest = cal - (p * 4) - (c * 4);
      setFat(String(Math.max(0, Math.round(rest / 9))));
    }
    setAutoCalc(field);
    setKcalAuto(false);
  }

  function handleSave() {
    // parseFloat statt parseInt (Dezimalziele), bewusste 0 nicht zu Default überschreiben
    const parsedFiber = parseFloat(fiber);
    const parsedWater = parseFloat(waterMl);
    onSave({
      calories: parseFloat(calories) || 0,
      protein: parseFloat(protein) || 0,
      carbs: parseFloat(carbs) || 0,
      fat: parseFloat(fat) || 0,
      fiber: Number.isFinite(parsedFiber) ? parsedFiber : 30,
      water_ml: Number.isFinite(parsedWater) ? parsedWater : 3000,
    });
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div className="bg-white dark:bg-surface-dark-alt rounded-2xl w-full max-w-sm shadow-xl max-h-[85vh] flex flex-col" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between px-6 pt-6 pb-3 shrink-0">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">{t('nutrition.setGoal')}</h3>
          <button onClick={onClose} className="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="overflow-y-auto flex-1 px-6">
          <p className="text-[10px] text-slate-400 dark:text-slate-500 mb-3">
            {t('ui.allValuesAreFreelyAdjustableOnboar')}
          </p>

          <div className="space-y-3">
            {/* Calories field with Auto/Manual toggle */}
            <div className="flex items-end gap-2">
              <div className="flex-1">
                <GoalField
                  label={`${t('nutrition.calories')} (kcal)`}
                  value={calories}
                  onChange={handleCaloriesChange}
                  color={kcalAuto
                    ? 'bg-primary-50/50 dark:bg-primary-900/10 border-primary-200 dark:border-primary-800 focus:ring-primary-400'
                    : 'bg-primary-50 dark:bg-primary-900/20 border-primary-200 dark:border-primary-800 focus:ring-primary-400'
                  }
                />
              </div>
              <button
                onClick={toggleKcalAuto}
                className={`mb-0.5 px-2.5 py-2.5 rounded-lg text-[10px] font-medium transition-colors ${
                  kcalAuto
                    ? 'bg-primary-500 text-white'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-400'
                }`}
              >
                Auto
              </button>
            </div>

            <div className="flex items-end gap-2">
              <div className="flex-1"><GoalField label={`${t('nutrition.protein')} (g)`} value={protein} onChange={handleProteinChange} color="bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800 focus:ring-blue-500" /></div>
              <button onClick={() => autoCalcMacro('protein')} className={`mb-0.5 px-2 py-2.5 rounded-lg text-[10px] font-medium ${autoCalc === 'protein' ? 'bg-blue-500 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-400'}`}>Auto</button>
            </div>

            <div className="flex items-end gap-2">
              <div className="flex-1"><GoalField label={`${t('nutrition.carbs')} (g)`} value={carbs} onChange={handleCarbsChange} color="bg-emerald-50 dark:bg-emerald-900/20 border-emerald-200 dark:border-emerald-800 focus:ring-emerald-500" /></div>
              <button onClick={() => autoCalcMacro('carbs')} className={`mb-0.5 px-2 py-2.5 rounded-lg text-[10px] font-medium ${autoCalc === 'carbs' ? 'bg-emerald-500 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-400'}`}>Auto</button>
            </div>

            <div className="flex items-end gap-2">
              <div className="flex-1"><GoalField label={`${t('nutrition.fat')} (g)`} value={fat} onChange={handleFatChange} color="bg-rose-50 dark:bg-rose-900/20 border-rose-200 dark:border-rose-800 focus:ring-rose-500" /></div>
              <button onClick={() => autoCalcMacro('fat')} className={`mb-0.5 px-2 py-2.5 rounded-lg text-[10px] font-medium ${autoCalc === 'fat' ? 'bg-rose-500 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-400'}`}>Auto</button>
            </div>

            {/* Macro kcal breakdown */}
            <div className="bg-slate-50 dark:bg-slate-800 rounded-xl p-3">
              <div className="flex justify-between text-[10px] text-slate-400 mb-1">
                <span>P: {proteinKcal} kcal</span>
                <span>C: {carbsKcal} kcal</span>
                <span>F: {fatKcal} kcal</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="font-medium">{t('ui.macroTotal')}: {macroKcal} kcal</span>
                {kcalAuto ? (
                  <span className="font-semibold text-green-500">✓ Auto</span>
                ) : remaining !== 0 ? (
                  <button
                    onClick={() => { setCalories(String(macroKcal)); setKcalAuto(true); }}
                    className="px-2 py-1 rounded-lg bg-primary-500 text-white text-[10px] font-medium"
                  >
                    kcal → {macroKcal}
                  </button>
                ) : (
                  <span className="font-semibold text-green-500">✓</span>
                )}
              </div>
            </div>

            <GoalField label={`${t('nutrition.fiber') || (t('ui.fiber2'))} (g)`} value={fiber} onChange={setFiber} color="bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800 focus:ring-green-500" />
            <GoalField label={`${t('nutrition.water')} (ml)`} value={waterMl} onChange={setWaterMl} color="bg-cyan-50 dark:bg-cyan-900/20 border-cyan-200 dark:border-cyan-800 focus:ring-cyan-500" />
          </div>
        </div>

        <div className="px-6 pt-4 pb-6 shrink-0">
          <button onClick={handleSave} className="w-full py-3 bg-gradient-to-b from-primary-400 to-primary-500 hover:to-primary-600 text-white rounded-xl font-semibold shadow-md shadow-primary-500/25 transition-colors flex items-center justify-center gap-2">
            <Check className="w-4 h-4" />
            {t('common.save')}
          </button>
        </div>
      </div>
    </div>
  );
}

function GoalField({ label, value, onChange, color }) {
  return (
    <div>
      <label className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-1 block">{label}</label>
      <input
        type="number"
        inputMode="numeric"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`w-full px-4 py-2.5 rounded-xl border text-sm font-semibold text-center focus:outline-none focus:ring-2 ${color}`}
      />
    </div>
  );
}

// ── Helpers ──────────────────────────────────────────────────

function r1(val) {
  return Math.round((val || 0) * 10) / 10 + 'g';
}

function formatDate(date) {
  return toLocalDateString(date);
}

// Keine Komponente, also kein useTranslation — hier übersetzt die Instanz.
function formatDisplayDate(dateStr, lang) {
  const today = formatDate(new Date());
  const yesterday = formatDate(new Date(Date.now() - 86400000));
  const tomorrow = formatDate(new Date(Date.now() + 86400000));

  if (dateStr === today) return i18nInstanz.t('ui.today');
  if (dateStr === yesterday) return i18nInstanz.t('ui.yesterday');
  if (dateStr === tomorrow) return i18nInstanz.t('ui.tomorrow');

  const d = new Date(dateStr);
  const locale = datumsLocale(lang);
  return d.toLocaleDateString(locale, { weekday: 'short', day: 'numeric', month: 'short' });
}
