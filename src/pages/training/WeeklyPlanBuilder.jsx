import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ArrowLeft, ArrowRight, Check, Plus, X, Dumbbell } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { saveWeeklySchedule } from '../../data/workoutStorage';
import { getExerciseById } from '../../data/exercises';

const DAY_KEYS = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];

const SPLIT_TYPES = [
  { id: 'push', labelDE: 'Push', labelEN: 'Push' },
  { id: 'pull', labelDE: 'Pull', labelEN: 'Pull' },
  { id: 'legs', labelDE: 'Beine', labelEN: 'Legs' },
  { id: 'upper', labelDE: 'Oberkörper', labelEN: 'Upper Body' },
  { id: 'lower', labelDE: 'Unterkörper', labelEN: 'Lower Body' },
  { id: 'full', labelDE: 'Ganzkörper', labelEN: 'Full Body' },
  { id: 'chest', labelDE: 'Brust', labelEN: 'Chest' },
  { id: 'back', labelDE: 'Rücken', labelEN: 'Back' },
  { id: 'shoulders', labelDE: 'Schultern', labelEN: 'Shoulders' },
  { id: 'arms', labelDE: 'Arme', labelEN: 'Arms' },
  { id: 'core', labelDE: 'Core', labelEN: 'Core' },
  { id: 'cardio', labelDE: 'Cardio', labelEN: 'Cardio' },
];

export default function WeeklyPlanBuilder({ onBack, onSaved, onSelectExercises, editPlan }) {
  const { t } = useTranslation();
  const { user } = useAuth();
  const lang = t('common.back') === 'Zurück' ? 'de' : 'en';
  const isEditing = !!editPlan;

  // Initialize from editPlan if editing
  const [step, setStep] = useState(isEditing ? 3 : 1);
  const [planName, setPlanName] = useState(editPlan?.name || '');
  const [sessionsPerWeek, setSessionsPerWeek] = useState(() => {
    if (editPlan?.sessions_per_week) return editPlan.sessions_per_week;
    if (editPlan?.days) return Object.values(editPlan.days).filter(Boolean).length;
    return 4;
  });
  const [selectedDays, setSelectedDays] = useState(() => {
    if (!editPlan?.days) return new Set();
    return new Set(DAY_KEYS.filter((k) => editPlan.days[k]));
  });
  const [dayConfigs, setDayConfigs] = useState(() => {
    if (!editPlan?.days) return {};
    const configs = {};
    DAY_KEYS.forEach((k) => { if (editPlan.days[k]) configs[k] = editPlan.days[k]; });
    return configs;
  });
  const [configuringDay, setConfiguringDay] = useState(null);
  const [saving, setSaving] = useState(false);

  function toggleDay(day) {
    setSelectedDays((prev) => {
      const next = new Set(prev);
      if (next.has(day)) {
        next.delete(day);
        setDayConfigs((dc) => { const c = { ...dc }; delete c[day]; return c; });
      } else if (next.size < sessionsPerWeek) {
        next.add(day);
      }
      return next;
    });
  }

  function setDayType(day, splitId) {
    const split = SPLIT_TYPES.find((s) => s.id === splitId);
    setDayConfigs((prev) => ({
      ...prev,
      [day]: { type: 'split', label: lang === 'de' ? split.labelDE : split.labelEN, splitId },
    }));
  }

  function setDayExercises(day, exercises) {
    setDayConfigs((prev) => ({
      ...prev,
      [day]: { type: 'exercises', label: `${exercises.length} ${lang === 'de' ? 'Übungen' : 'exercises'}`, exercises },
    }));
  }

  async function handleSave() {
    if (!planName.trim()) return;
    setSaving(true);

    const days = {};
    DAY_KEYS.forEach((day) => {
      if (selectedDays.has(day) && dayConfigs[day]) {
        days[day] = dayConfigs[day];
      } else {
        days[day] = null;
      }
    });

    if (isEditing && editPlan.id) {
      // Update existing plan
      const { deleteWeeklySchedule } = await import('../../data/workoutStorage');
      await deleteWeeklySchedule(user.id, editPlan.id);
    }

    await saveWeeklySchedule(user.id, {
      name: planName.trim(),
      sessions_per_week: Object.values(days).filter(Boolean).length,
      days,
    });

    setSaving(false);
    onSaved();
  }

  const dayLabel = (day) => t(`training.day_${day}`);

  // ── Step 1: Name + Sessions per week ──
  if (step === 1) {
    return (
      <div className="p-4 pt-16 pb-24">
        <div className="flex items-center gap-3 mb-6">
          <button onClick={onBack} className="p-2 -ml-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-2xl font-bold">{lang === 'de' ? 'Wochenplan erstellen' : 'Create Weekly Plan'}</h1>
        </div>

        <div className="space-y-8">
          <div>
            <label className="block text-sm font-medium text-slate-600 dark:text-slate-400 mb-2">
              {lang === 'de' ? 'Planname' : 'Plan Name'}
            </label>
            <input
              type="text"
              value={planName}
              onChange={(e) => setPlanName(e.target.value)}
              placeholder={lang === 'de' ? 'z.B. Mein 4er Split' : 'e.g. My 4-Day Split'}
              className="w-full px-4 py-3.5 bg-white dark:bg-surface-dark-alt border border-slate-200 dark:border-slate-700 rounded-2xl text-base focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-600 dark:text-slate-400 mb-2">
              {lang === 'de' ? 'Einheiten pro Woche' : 'Sessions per week'}
            </label>
            <div className="text-center mb-3">
              <span className="text-5xl font-bold text-primary-500">{sessionsPerWeek}</span>
              <span className="text-lg text-slate-400 ml-2">/ 7</span>
            </div>
            <input
              type="range"
              min={1}
              max={7}
              value={sessionsPerWeek}
              onChange={(e) => {
                const v = parseInt(e.target.value);
                setSessionsPerWeek(v);
                // Trim selected days if too many
                setSelectedDays((prev) => {
                  if (prev.size <= v) return prev;
                  const arr = [...prev];
                  return new Set(arr.slice(0, v));
                });
              }}
              className="w-full h-3 rounded-full appearance-none cursor-pointer slider-primary"
            />
          </div>

          <button
            onClick={() => setStep(2)}
            disabled={!planName.trim()}
            className="w-full py-4 bg-primary-500 hover:bg-primary-600 disabled:opacity-50 text-white font-semibold rounded-2xl flex items-center justify-center gap-2"
          >
            {lang === 'de' ? 'Weiter' : 'Next'}
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    );
  }

  // ── Step 2: Select Days ──
  if (step === 2) {
    return (
      <div className="p-4 pt-16 pb-24">
        <div className="flex items-center gap-3 mb-6">
          <button onClick={() => setStep(1)} className="p-2 -ml-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-2xl font-bold">{lang === 'de' ? 'Trainingstage wählen' : 'Choose Training Days'}</h1>
        </div>

        <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">
          {lang === 'de'
            ? `Wähle ${sessionsPerWeek} Tage für dein Training`
            : `Select ${sessionsPerWeek} days for your training`}
        </p>
        <p className="text-xs text-slate-400 mb-6">
          {selectedDays.size}/{sessionsPerWeek} {lang === 'de' ? 'ausgewählt' : 'selected'}
        </p>

        <div className="space-y-2 mb-8">
          {DAY_KEYS.map((day) => {
            const active = selectedDays.has(day);
            const canAdd = selectedDays.size < sessionsPerWeek;
            return (
              <button
                key={day}
                onClick={() => toggleDay(day)}
                disabled={!active && !canAdd}
                className={`w-full py-4 px-5 rounded-2xl border-2 flex items-center justify-between transition-all ${
                  active
                    ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
                    : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-surface-dark-alt disabled:opacity-40'
                }`}
              >
                <span className={`text-base font-semibold ${active ? 'text-primary-600 dark:text-primary-400' : 'text-slate-700 dark:text-slate-300'}`}>
                  {dayLabel(day)}
                </span>
                {active ? (
                  <div className="w-6 h-6 rounded-full bg-primary-500 flex items-center justify-center">
                    <Check className="w-4 h-4 text-white" />
                  </div>
                ) : (
                  <div className="w-6 h-6 rounded-full border-2 border-slate-300 dark:border-slate-600" />
                )}
              </button>
            );
          })}
        </div>

        <button
          onClick={() => setStep(3)}
          disabled={selectedDays.size !== sessionsPerWeek}
          className="w-full py-4 bg-primary-500 hover:bg-primary-600 disabled:opacity-50 text-white font-semibold rounded-2xl flex items-center justify-center gap-2"
        >
          {lang === 'de' ? 'Weiter' : 'Next'}
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    );
  }

  // ── Step 3: Configure each day ──
  return (
    <div className="p-4 pt-16 pb-24">
      <div className="flex items-center gap-3 mb-6">
        <button onClick={() => setStep(2)} className="p-2 -ml-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h1 className="text-2xl font-bold">{lang === 'de' ? 'Tage konfigurieren' : 'Configure Days'}</h1>
      </div>

      <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">
        {lang === 'de'
          ? 'Wähle für jeden Tag einen Split-Typ oder weise Übungen zu.'
          : 'Choose a split type or assign exercises for each day.'}
      </p>

      {/* Day config for selecting split */}
      {configuringDay && (
        <div className="fixed inset-0 bg-black/50 z-[60] flex items-end" onClick={() => setConfiguringDay(null)}>
          <div className="w-full bg-white dark:bg-surface-dark-alt rounded-t-3xl p-6 pb-8 max-h-[70vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-lg font-bold mb-4">{dayLabel(configuringDay)}</h3>
            <div className="grid grid-cols-3 gap-2 mb-4">
              {SPLIT_TYPES.map((split) => {
                const isActive = dayConfigs[configuringDay]?.splitId === split.id;
                return (
                  <button
                    key={split.id}
                    onClick={() => { setDayType(configuringDay, split.id); setConfiguringDay(null); }}
                    className={`py-3 rounded-xl text-sm font-medium border-2 transition-all ${
                      isActive
                        ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400'
                        : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400'
                    }`}
                  >
                    {lang === 'de' ? split.labelDE : split.labelEN}
                  </button>
                );
              })}
            </div>
            <button
              onClick={() => setConfiguringDay(null)}
              className="w-full py-3 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-500 text-sm font-medium"
            >
              {lang === 'de' ? 'Schließen' : 'Close'}
            </button>
          </div>
        </div>
      )}

      <div className="space-y-3 mb-8">
        {DAY_KEYS.filter((day) => selectedDays.has(day)).map((day) => {
          const config = dayConfigs[day];
          return (
            <div key={day} className="bg-white dark:bg-surface-dark-alt rounded-2xl p-4 shadow-soft border border-slate-100 dark:border-slate-800/60">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Dumbbell className="w-5 h-5 text-primary-500" />
                  <span className="font-semibold text-slate-900 dark:text-white">{dayLabel(day)}</span>
                </div>
                {config && (
                  <span className="text-xs px-2 py-1 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 font-medium">
                    {config.label}
                  </span>
                )}
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setConfiguringDay(day)}
                  className={`flex-1 py-2.5 rounded-xl text-sm font-medium border-2 transition-all ${
                    config?.type === 'split'
                      ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20 text-primary-600'
                      : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400'
                  }`}
                >
                  {lang === 'de' ? 'Split-Typ' : 'Split Type'}
                </button>
                <button
                  onClick={() => {
                    if (onSelectExercises) {
                      onSelectExercises(day, (exercises) => setDayExercises(day, exercises));
                    }
                  }}
                  className={`flex-1 py-2.5 rounded-xl text-sm font-medium border-2 transition-all ${
                    config?.type === 'exercises'
                      ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20 text-primary-600'
                      : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400'
                  }`}
                >
                  {lang === 'de' ? 'Übungen' : 'Exercises'}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Save */}
      <button
        onClick={handleSave}
        disabled={saving || [...selectedDays].some((d) => !dayConfigs[d])}
        className="w-full py-4 bg-primary-500 hover:bg-primary-600 disabled:opacity-50 text-white font-semibold rounded-2xl flex items-center justify-center gap-2"
      >
        {saving ? '...' : (
          <>
            <Check className="w-5 h-5" />
            {lang === 'de' ? 'Plan speichern' : 'Save Plan'}
          </>
        )}
      </button>
    </div>
  );
}
