import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { ChevronLeft, ChevronRight, Plus, Trash2, Settings, UtensilsCrossed, Pencil, X, Check, Droplets, Minus, GlassWater } from 'lucide-react';
import MacroRing from './MacroRing';
import MyPeakLogo from '../../components/MyPeakLogo';
import { useAuth } from '../../context/AuthContext';
import { getNutritionEntries, getNutritionGoals, deleteNutritionEntry, saveNutritionGoals, getWaterTotal, addWater, removeLastWater } from '../../data/nutritionStorage';

const MEAL_SLOTS = ['breakfast', 'lunch', 'dinner', 'snack'];

export default function DailyOverview({ onAddFood, onEditEntry, onOpenTDEE, onOpenCustomMeals }) {
  const { t } = useTranslation();
  const { user } = useAuth();
  const [selectedDate, setSelectedDate] = useState(formatDate(new Date()));
  const [entries, setEntries] = useState([]);
  const [goals, setGoals] = useState({ calories: 2000, protein: 150, carbs: 250, fat: 70, water_ml: 3000 });
  const [waterTotal, setWaterTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [showGoalEditor, setShowGoalEditor] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);
  const [showWaterInput, setShowWaterInput] = useState(false);
  const [customWaterAmount, setCustomWaterAmount] = useState('');

  useEffect(() => {
    if (user) loadData();
  }, [user, selectedDate]);

  async function loadData() {
    setLoading(true);
    const [entriesData, goalsData, waterData] = await Promise.all([
      getNutritionEntries(user.id, selectedDate),
      getNutritionGoals(user.id),
      getWaterTotal(user.id, selectedDate),
    ]);
    setEntries(entriesData);
    setGoals(goalsData);
    setWaterTotal(waterData.total);
    setLoading(false);
  }

  async function handleAddWater(ml) {
    await addWater(user.id, selectedDate, ml);
    setWaterTotal((prev) => prev + ml);
  }

  async function handleRemoveWater() {
    await removeLastWater(user.id, selectedDate);
    const waterData = await getWaterTotal(user.id, selectedDate);
    setWaterTotal(waterData.total);
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

  const lang = t('common.back') === 'Zurück' ? 'de' : 'en';

  return (
    <div className="p-4 pb-24">
      {/* Header */}
      <div className="flex flex-col items-center pt-10 mb-4">
        <MyPeakLogo size={36} />
        <h1 className="text-2xl font-bold mt-2">{t('nutrition.title')}</h1>
      </div>
      <div className="flex items-center justify-end mb-4">
        <div className="flex gap-2">
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
          className="p-2 rounded-xl bg-white dark:bg-surface-dark-alt shadow-sm hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
        >
          <ChevronLeft className="w-5 h-5 text-slate-500" />
        </button>

        <button
          onClick={() => setShowCalendar(true)}
          className={`flex-1 py-2.5 rounded-xl text-sm font-semibold text-center shadow-sm transition-colors ${
            isToday
              ? 'bg-primary-600 text-white'
              : 'bg-white dark:bg-surface-dark-alt text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800'
          }`}
        >
          {formatDisplayDate(selectedDate, lang)}
        </button>

        <button
          onClick={() => changeDate(1)}
          className="p-2 rounded-xl bg-white dark:bg-surface-dark-alt shadow-sm hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
        >
          <ChevronRight className="w-5 h-5 text-slate-500" />
        </button>

        {!isToday && (
          <button
            onClick={() => setSelectedDate(formatDate(new Date()))}
            className="px-3 py-2.5 rounded-xl bg-primary-600 text-white text-xs font-semibold shadow-sm hover:bg-primary-700 transition-colors whitespace-nowrap"
          >
            {t('nutrition.today')}
          </button>
        )}
      </div>

      {/* Macro Rings */}
      <div className="bg-white dark:bg-surface-dark-alt rounded-2xl p-5 shadow-sm mb-4">
        <div className="flex items-center justify-between mb-3">
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
          <MacroRing value={totals.calories} goal={goals.calories} label="kcal" color="text-primary-500" strokeColor="stroke-primary-500" size={76} />
          <MacroRing value={totals.protein} goal={goals.protein} label={t('nutrition.protein')} unit="g" color="text-blue-500" strokeColor="stroke-blue-500" size={76} />
          <MacroRing value={totals.carbs} goal={goals.carbs} label={t('nutrition.carbs')} unit="g" color="text-amber-500" strokeColor="stroke-amber-500" size={76} />
          <MacroRing value={totals.fat} goal={goals.fat} label={t('nutrition.fat')} unit="g" color="text-rose-500" strokeColor="stroke-rose-500" size={76} />
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
          <div key={slot} className="bg-white dark:bg-surface-dark-alt rounded-2xl shadow-sm mb-3 overflow-hidden">
            <div className="flex items-center justify-between px-4 py-3 border-b border-slate-100 dark:border-slate-700">
              <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-200">{t(`nutrition.${slot}`)}</h3>
              {slotEntries.length > 0 && (
                <span className="text-xs text-slate-400 dark:text-slate-500 font-medium">{Math.round(slotCalories)} kcal</span>
              )}
            </div>

            {slotEntries.map((entry) => (
              <div key={entry.id} className="flex items-center gap-3 px-4 py-3 border-b border-slate-50 dark:border-slate-700/50 last:border-0">
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
                    <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-md bg-amber-50 dark:bg-amber-900/20 text-[10px] font-semibold text-amber-600 dark:text-amber-400">
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
      <div className="bg-white dark:bg-surface-dark-alt rounded-2xl p-4 shadow-sm mb-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Droplets className="w-5 h-5 text-cyan-500" />
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
          <button onClick={handleRemoveWater} className="w-9 h-9 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-400 hover:text-red-400 transition-colors">
            <Minus className="w-4 h-4" />
          </button>
          <button onClick={() => handleAddWater(250)} className="flex-1 py-2 rounded-xl bg-cyan-50 dark:bg-cyan-900/20 text-cyan-600 dark:text-cyan-400 text-sm font-medium hover:bg-cyan-100 dark:hover:bg-cyan-900/30 transition-colors">
            +250ml
          </button>
          <button onClick={() => handleAddWater(500)} className="flex-1 py-2 rounded-xl bg-cyan-50 dark:bg-cyan-900/20 text-cyan-600 dark:text-cyan-400 text-sm font-medium hover:bg-cyan-100 dark:hover:bg-cyan-900/30 transition-colors">
            +500ml
          </button>
          <button onClick={() => setShowWaterInput(!showWaterInput)} className="px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 text-sm font-medium hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">
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

      {!goals.tdee && (
        <button
          onClick={onOpenTDEE}
          className="w-full border-2 border-dashed border-primary-300 dark:border-primary-700 rounded-2xl p-4 text-center hover:border-primary-400 hover:bg-primary-50/50 dark:hover:bg-primary-900/10 transition-colors"
        >
          <p className="text-sm font-semibold text-primary-600 dark:text-primary-400">{t('nutrition.goalPrompt')}</p>
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

  const dayNames = lang === 'de'
    ? ['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So']
    : ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'];

  const monthNames = lang === 'de'
    ? ['Januar', 'Februar', 'März', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember']
    : ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

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
                    ? 'bg-primary-600 text-white font-bold shadow-md shadow-primary-500/30'
                    : isToday
                    ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400 font-semibold'
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
            className="flex-1 py-2.5 rounded-xl bg-primary-600 text-white text-sm font-semibold hover:bg-primary-700 transition-colors"
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
  const [calories, setCalories] = useState(Math.round(goals.calories));
  const [protein, setProtein] = useState(Math.round(goals.protein));
  const [carbs, setCarbs] = useState(Math.round(goals.carbs));
  const [fat, setFat] = useState(Math.round(goals.fat));
  const [waterMl, setWaterMl] = useState(Math.round(goals.water_ml || 3000));

  function handleSave() {
    onSave({
      calories: parseInt(calories) || 0,
      protein: parseInt(protein) || 0,
      carbs: parseInt(carbs) || 0,
      fat: parseInt(fat) || 0,
      water_ml: parseInt(waterMl) || 3000,
    });
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div className="bg-white dark:bg-surface-dark-alt rounded-2xl w-full max-w-sm shadow-xl" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between px-6 pt-6 pb-4">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">{t('nutrition.setGoal')}</h3>
          <button onClick={onClose} className="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300">
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="px-6 space-y-3">
          <GoalField label={`${t('nutrition.calories')} (kcal)`} value={calories} onChange={setCalories} color="bg-primary-50 dark:bg-primary-900/20 border-primary-200 dark:border-primary-800 focus:ring-primary-500" />
          <GoalField label={`${t('nutrition.protein')} (g)`} value={protein} onChange={setProtein} color="bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800 focus:ring-blue-500" />
          <GoalField label={`${t('nutrition.carbs')} (g)`} value={carbs} onChange={setCarbs} color="bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800 focus:ring-amber-500" />
          <GoalField label={`${t('nutrition.fat')} (g)`} value={fat} onChange={setFat} color="bg-rose-50 dark:bg-rose-900/20 border-rose-200 dark:border-rose-800 focus:ring-rose-500" />
          <GoalField label={`${t('nutrition.water')} (ml)`} value={waterMl} onChange={setWaterMl} color="bg-cyan-50 dark:bg-cyan-900/20 border-cyan-200 dark:border-cyan-800 focus:ring-cyan-500" />
        </div>
        <div className="px-6 pt-5 pb-6">
          <button onClick={handleSave} className="w-full py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-xl font-semibold transition-colors flex items-center justify-center gap-2">
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
  return date.toISOString().split('T')[0];
}

function formatDisplayDate(dateStr, lang) {
  const today = formatDate(new Date());
  const yesterday = formatDate(new Date(Date.now() - 86400000));
  const tomorrow = formatDate(new Date(Date.now() + 86400000));

  if (dateStr === today) return lang === 'de' ? 'Heute' : 'Today';
  if (dateStr === yesterday) return lang === 'de' ? 'Gestern' : 'Yesterday';
  if (dateStr === tomorrow) return lang === 'de' ? 'Morgen' : 'Tomorrow';

  const d = new Date(dateStr);
  const locale = lang === 'de' ? 'de-DE' : 'en-US';
  return d.toLocaleDateString(locale, { weekday: 'short', day: 'numeric', month: 'short' });
}
