import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ArrowLeft, ArrowRight, Check, Plus, X, Minus, Dumbbell } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { saveWeeklySchedule, updateWeeklySchedule } from '../../data/workoutStorage';
import { getExerciseById, getExerciseDisplayName } from '../../data/exercises';
import ExerciseLibrary from './ExerciseLibrary';
import Toast from '../../components/Toast';

const DAY_KEYS = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];

const SPLIT_IDS = ['push', 'pull', 'legs', 'upper', 'lower', 'full', 'chest', 'back', 'shoulders', 'arms', 'core', 'cardio'];

// Strukturierte Tage (Peak-Programme: Cardio-Segmente, HIIT/Kampfsport-Runden)
// werden im Builder nicht angefasst — ihr Format gehört den Programm-Runnern.
function isStructuredDay(cfg) {
  return !!cfg && (['cardio', 'hiit', 'martial_arts'].includes(cfg.type) || cfg.segments?.length > 0 || cfg.rounds);
}

// Alt-Formate normalisieren: type 'exercises' → 'strength', String-Einträge → Objekte
function normalizeDayConfig(cfg) {
  if (!cfg || isStructuredDay(cfg)) return cfg;
  const next = { ...cfg };
  if (Array.isArray(next.exercises)) {
    next.exercises = next.exercises.map((e) =>
      typeof e === 'string' ? { id: e, sets: 3, reps: 10 } : { sets: 3, reps: 10, ...e }
    );
  }
  if (next.type === 'exercises') next.type = 'strength';
  return next;
}

function isConfigured(cfg) {
  return !!cfg && (cfg.splitId || cfg.label || cfg.exercises?.length > 0 || isStructuredDay(cfg));
}

export default function WeeklyPlanBuilder({ onBack, onSaved, editPlan, activeSchedule }) {
  const { t } = useTranslation();
  const { user } = useAuth();
  const isEditing = !!editPlan;

  // Initialize from editPlan if editing
  const [step, setStep] = useState(isEditing ? 3 : 1);
  const [planName, setPlanName] = useState(editPlan?.name || '');
  const [sessionsPerWeek, setSessionsPerWeek] = useState(() => {
    if (editPlan?.sessions_per_week) return editPlan.sessions_per_week;
    // Über DAY_KEYS zählen — days kann einen _meta-Key tragen (Peak-Programme)
    if (editPlan?.days) return DAY_KEYS.filter((k) => editPlan.days[k]).length;
    return 4;
  });
  const [selectedDays, setSelectedDays] = useState(() => {
    if (!editPlan?.days) return new Set();
    return new Set(DAY_KEYS.filter((k) => editPlan.days[k]));
  });
  const [dayConfigs, setDayConfigs] = useState(() => {
    if (!editPlan?.days) return {};
    const configs = {};
    DAY_KEYS.forEach((k) => { if (editPlan.days[k]) configs[k] = normalizeDayConfig(editPlan.days[k]); });
    return configs;
  });
  const [editingDay, setEditingDay] = useState(null);
  const [pickingDay, setPickingDay] = useState(null);
  const [confirmReplace, setConfirmReplace] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);

  function toggleDay(day) {
    const willRemove = selectedDays.has(day);
    if (willRemove) {
      setDayConfigs((dc) => { const c = { ...dc }; delete c[day]; return c; });
      setSelectedDays((prev) => { const next = new Set(prev); next.delete(day); return next; });
    } else if (selectedDays.size < sessionsPerWeek) {
      setSelectedDays((prev) => { const next = new Set(prev); next.add(day); return next; });
    }
  }

  // Tages-Änderung: bestehende Config immer spreaden (erhält sessionId etc. von
  // Peak-Tagen); Typ nur für Builder-Tage ableiten (Übungen → strength, sonst split).
  function applyDayChange(day, patch) {
    setDayConfigs((prev) => {
      const base = prev[day] || {};
      const next = { ...base, ...patch };
      if (!isStructuredDay(base)) {
        next.type = next.exercises?.length > 0 ? 'strength' : 'split';
      }
      return { ...prev, [day]: next };
    });
  }

  function toggleSplit(day, splitId) {
    const current = dayConfigs[day]?.splitId;
    if (current === splitId) {
      applyDayChange(day, { splitId: null, label: null });
    } else {
      // label als Legacy-Fallback mitschreiben; maßgeblich ist ab jetzt splitId
      applyDayChange(day, { splitId, label: t(`training.split_${splitId}`) });
    }
  }

  function addExercises(day, selected) {
    setDayConfigs((prev) => {
      const base = prev[day] || {};
      const existing = base.exercises || [];
      const existingIds = new Set(existing.map((e) => e.id));
      const added = selected
        .filter((ex) => !existingIds.has(ex.id))
        .map((ex) => ({ id: ex.id, sets: 3, reps: 10 }));
      const next = { ...base, exercises: [...existing, ...added] };
      if (!isStructuredDay(base)) {
        next.type = next.exercises.length > 0 ? 'strength' : 'split';
      }
      return { ...prev, [day]: next };
    });
  }

  function updateExercise(day, exerciseId, field, delta, min, max) {
    setDayConfigs((prev) => {
      const base = prev[day];
      if (!base?.exercises) return prev;
      const exercises = base.exercises.map((e) => {
        if (e.id !== exerciseId) return e;
        const value = Math.min(max, Math.max(min, (e[field] || 0) + delta));
        return { ...e, [field]: value };
      });
      return { ...prev, [day]: { ...base, exercises } };
    });
  }

  function removeExercise(day, exerciseId) {
    setDayConfigs((prev) => {
      const base = prev[day];
      if (!base?.exercises) return prev;
      const exercises = base.exercises.filter((e) => e.id !== exerciseId);
      const next = { ...base, exercises };
      if (!isStructuredDay(base)) {
        next.type = exercises.length > 0 ? 'strength' : 'split';
      }
      return { ...prev, [day]: next };
    });
  }

  async function handleSave({ activate } = {}) {
    if (!planName.trim()) return;
    // Ersetzen-Bestätigung: nur bei neuem Plan, wenn ein anderer Plan aktiv ist
    if (activate === undefined && !isEditing && activeSchedule) {
      setConfirmReplace(true);
      return;
    }
    setSaving(true);
    try {
      const days = {};
      DAY_KEYS.forEach((day) => {
        days[day] = selectedDays.has(day) && isConfigured(dayConfigs[day]) ? dayConfigs[day] : null;
      });
      // Peak-Programm-Metadaten (Wochen-Progression) beim Editieren erhalten
      if (editPlan?.days?._meta) days._meta = editPlan.days._meta;

      const payload = {
        name: planName.trim(),
        sessions_per_week: DAY_KEYS.filter((k) => days[k]).length,
        days,
      };

      if (isEditing && editPlan.id) {
        // In-place-Update: gleiche id, Aktiv-Status bleibt unangetastet
        await updateWeeklySchedule(user?.id || 'guest', editPlan.id, payload);
      } else {
        await saveWeeklySchedule(user?.id || 'guest', payload, { activate: activate ?? true });
      }

      onSaved(t(isEditing ? 'planBuilder.updated' : 'planBuilder.saved'));
    } catch (err) {
      console.error('Failed to save weekly plan:', err);
      setError(t('planBuilder.saveError'));
    } finally {
      setSaving(false);
    }
  }

  const dayLabel = (day) => t(`training.day_${day}`);
  const splitLabel = (cfg) => (cfg?.splitId ? t(`training.split_${cfg.splitId}`) : cfg?.label || null);

  function daySummary(cfg) {
    if (!cfg) return null;
    const parts = [];
    const sl = splitLabel(cfg);
    if (sl) parts.push(sl);
    if (cfg.exercises?.length > 0) parts.push(t('planBuilder.exerciseCount', { count: cfg.exercises.length }));
    return parts.join(' · ') || null;
  }

  // ── Übungs-Picker (Sub-View — Builder bleibt gemountet, Entwurf geht nicht verloren) ──
  if (pickingDay) {
    return (
      <ExerciseLibrary
        selectionMode
        initialType="strength"
        onBack={() => { setEditingDay(pickingDay); setPickingDay(null); }}
        onSelect={(selected) => {
          addExercises(pickingDay, selected);
          setEditingDay(pickingDay);
          setPickingDay(null);
        }}
      />
    );
  }

  // ── Step 1: Name + Sessions per week ──
  if (step === 1) {
    return (
      <div className="p-4 pt-16 pb-24">
        <div className="flex items-center gap-3 mb-6">
          <button onClick={onBack} className="p-2 -ms-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-2xl font-bold">{t('planBuilder.title')}</h1>
        </div>

        <div className="space-y-8">
          <div>
            <label className="block text-sm font-medium text-slate-600 dark:text-slate-400 mb-2">
              {t('planBuilder.planName')}
            </label>
            <input
              type="text"
              value={planName}
              onChange={(e) => setPlanName(e.target.value)}
              placeholder={t('planBuilder.planNamePlaceholder')}
              className="w-full px-4 py-3.5 bg-white dark:bg-surface-dark-alt border border-slate-200 dark:border-slate-700 rounded-2xl text-base focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-600 dark:text-slate-400 mb-2">
              {t('planBuilder.sessionsPerWeek')}
            </label>
            <div className="text-center mb-3">
              <span className="text-5xl font-bold text-primary-500">{sessionsPerWeek}</span>
              <span className="text-lg text-slate-400 ms-2">/ 7</span>
            </div>
            <input
              type="range"
              min={1}
              max={7}
              value={sessionsPerWeek}
              onChange={(e) => {
                const v = parseInt(e.target.value);
                setSessionsPerWeek(v);
                // Überzählige Tage in Wochentags-Reihenfolge abschneiden
                setSelectedDays((prev) => {
                  if (prev.size <= v) return prev;
                  return new Set(DAY_KEYS.filter((k) => prev.has(k)).slice(0, v));
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
            {t('planBuilder.next')}
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
          <button onClick={() => setStep(1)} className="p-2 -ms-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-2xl font-bold">{t('planBuilder.chooseDays')}</h1>
        </div>

        <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">
          {t('planBuilder.chooseDaysHint', { count: sessionsPerWeek })}
        </p>
        <p className="text-xs text-slate-400 mb-6">
          {t('planBuilder.selectedOf', { sel: selectedDays.size, total: sessionsPerWeek })}
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
          {t('planBuilder.next')}
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    );
  }

  // ── Step 3: Configure each day ──
  const editingConfig = editingDay ? dayConfigs[editingDay] : null;

  return (
    <div className="p-4 pt-16 pb-24">
      <div className="flex items-center gap-3 mb-6">
        <button onClick={() => setStep(2)} className="p-2 -ms-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h1 className="text-2xl font-bold">{t(isEditing ? 'planBuilder.editTitle' : 'planBuilder.configureDays')}</h1>
      </div>

      <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">
        {t('planBuilder.configureHint')}
      </p>

      {/* Tages-Sheet: Split wählen + Übungen mit Sätzen/Wdh. */}
      {editingDay && (
        <div className="fixed inset-0 bg-black/50 z-[60] flex items-end" onClick={() => setEditingDay(null)}>
          <div className="w-full bg-white dark:bg-surface-dark-alt rounded-t-3xl p-6 pb-8 max-h-[80vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-lg font-bold mb-4">{dayLabel(editingDay)}</h3>

            {/* Übungen */}
            <div className="mb-5">
              {(editingConfig?.exercises?.length || 0) === 0 ? (
                <p className="text-sm text-slate-400 dark:text-slate-500 mb-3">{t('planBuilder.noExercisesYet')}</p>
              ) : (
                <div className="space-y-2 mb-3">
                  {editingConfig.exercises.map((pe) => {
                    const ex = getExerciseById(pe.id);
                    const name = getExerciseDisplayName(ex || pe.id, null, t);
                    return (
                      <div key={pe.id} className="bg-slate-50 dark:bg-slate-800/60 rounded-xl p-3">
                        <div className="flex items-center justify-between mb-2">
                          <p className="text-sm font-medium text-slate-900 dark:text-white truncate flex-1">{name}</p>
                          <button
                            onClick={() => removeExercise(editingDay, pe.id)}
                            className="p-1 ms-2 text-slate-400 hover:text-red-500 flex-shrink-0"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                        <div className="flex items-center gap-4">
                          <Stepper
                            label={t('training.sets')}
                            value={pe.sets || 3}
                            onDec={() => updateExercise(editingDay, pe.id, 'sets', -1, 1, 10)}
                            onInc={() => updateExercise(editingDay, pe.id, 'sets', 1, 1, 10)}
                          />
                          <Stepper
                            label={t('training.reps')}
                            value={pe.reps || 10}
                            onDec={() => updateExercise(editingDay, pe.id, 'reps', -1, 1, 50)}
                            onInc={() => updateExercise(editingDay, pe.id, 'reps', 1, 1, 50)}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
              <button
                onClick={() => setPickingDay(editingDay)}
                className="w-full border-2 border-dashed border-slate-300 dark:border-slate-600 rounded-xl py-3 flex items-center justify-center gap-2 text-slate-500 dark:text-slate-400 hover:border-primary-400 hover:text-primary-500 transition-colors"
              >
                <Plus className="w-5 h-5" />
                {t('planBuilder.addExercises')}
              </button>
            </div>

            {/* Split-Typ (optional) */}
            <p className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-2">{t('planBuilder.splitType')}</p>
            <div className="grid grid-cols-3 gap-2 mb-5">
              {SPLIT_IDS.map((splitId) => {
                const isActive = editingConfig?.splitId === splitId;
                return (
                  <button
                    key={splitId}
                    onClick={() => toggleSplit(editingDay, splitId)}
                    className={`py-3 rounded-xl text-sm font-medium border-2 transition-all ${
                      isActive
                        ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400'
                        : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400'
                    }`}
                  >
                    {t(`training.split_${splitId}`)}
                  </button>
                );
              })}
            </div>

            <button
              onClick={() => setEditingDay(null)}
              className="w-full py-3 rounded-xl bg-primary-500 hover:bg-primary-600 text-white text-sm font-semibold"
            >
              {t('planBuilder.dayDone')}
            </button>
          </div>
        </div>
      )}

      <div className="space-y-3 mb-8">
        {DAY_KEYS.filter((day) => selectedDays.has(day)).map((day) => {
          const config = dayConfigs[day];
          const summary = daySummary(config);
          const structured = isStructuredDay(config);
          return (
            <button
              key={day}
              onClick={() => !structured && setEditingDay(day)}
              disabled={structured}
              className={`w-full text-start bg-white dark:bg-surface-dark-alt rounded-2xl p-4 shadow-soft border transition-all ${
                isConfigured(config)
                  ? 'border-primary-200 dark:border-primary-900/60'
                  : 'border-slate-100 dark:border-slate-800/60'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Dumbbell className="w-5 h-5 text-primary-500" />
                  <span className="font-semibold text-slate-900 dark:text-white">{dayLabel(day)}</span>
                </div>
                {summary ? (
                  <span className="text-xs px-2 py-1 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 font-medium">
                    {summary}
                  </span>
                ) : (
                  <span className="flex items-center gap-1 text-xs text-slate-400">
                    <Plus className="w-3.5 h-3.5" />
                    {t('planBuilder.addExercises')}
                  </span>
                )}
              </div>
            </button>
          );
        })}
      </div>

      {/* Save */}
      <button
        onClick={() => handleSave()}
        disabled={saving || [...selectedDays].some((d) => !isConfigured(dayConfigs[d]))}
        className="w-full py-4 bg-primary-500 hover:bg-primary-600 disabled:opacity-50 text-white font-semibold rounded-2xl flex items-center justify-center gap-2"
      >
        {saving ? '...' : (
          <>
            <Check className="w-5 h-5" />
            {t('planBuilder.save')}
          </>
        )}
      </button>

      {/* Ersetzen-Bestätigung: ein anderer Plan ist gerade aktiv */}
      {confirmReplace && (
        <div className="fixed inset-0 bg-black/50 z-[70] flex items-center justify-center p-4" onClick={() => setConfirmReplace(false)}>
          <div className="bg-white dark:bg-surface-dark-alt rounded-2xl w-full max-w-sm shadow-xl p-5" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-lg font-bold mb-2">{t('planBuilder.replaceTitle')}</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-5">
              {t('planBuilder.replaceBody', { name: activeSchedule?.name || '' })}
            </p>
            <div className="space-y-2">
              <button
                onClick={() => { setConfirmReplace(false); handleSave({ activate: true }); }}
                className="w-full py-3 rounded-xl bg-primary-500 hover:bg-primary-600 text-white text-sm font-semibold"
              >
                {t('planBuilder.replaceConfirm')}
              </button>
              <button
                onClick={() => { setConfirmReplace(false); handleSave({ activate: false }); }}
                className="w-full py-3 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 text-sm font-medium"
              >
                {t('planBuilder.saveOnly')}
              </button>
              <button
                onClick={() => setConfirmReplace(false)}
                className="w-full py-3 rounded-xl text-slate-400 text-sm font-medium"
              >
                {t('common.cancel')}
              </button>
            </div>
          </div>
        </div>
      )}

      {error && <Toast message={error} variant="error" onDismiss={() => setError(null)} />}
    </div>
  );
}

function Stepper({ label, value, onDec, onInc }) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-xs text-slate-500 dark:text-slate-400 w-10">{label}</span>
      <button onClick={onDec} className="w-7 h-7 rounded-lg bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 flex items-center justify-center text-slate-500">
        <Minus className="w-3.5 h-3.5" />
      </button>
      <span className="text-sm font-semibold w-6 text-center">{value}</span>
      <button onClick={onInc} className="w-7 h-7 rounded-lg bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 flex items-center justify-center text-slate-500">
        <Plus className="w-3.5 h-3.5" />
      </button>
    </div>
  );
}
