import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { ArrowLeft, Play, Plus, Trash2 } from 'lucide-react';
import { getExerciseDisplayName } from '../../data/exercises';
import { useAuth } from '../../context/AuthContext';
import { updateCustomPlan, getCustomExercises } from '../../data/workoutStorage';
import ExerciseLibrary from './ExerciseLibrary';
import Toast from '../../components/Toast';

const DEFAULT_SETS = 3;
const DEFAULT_REPS = 10;

// Plan-Einträge sind historisch mal eine blanke ID, mal ein Objekt.
function normalizeEntry(entry) {
  if (typeof entry === 'object' && entry !== null) {
    return {
      id: entry.id ?? entry.exerciseId,
      sets: entry.sets ?? DEFAULT_SETS,
      reps: entry.reps ?? DEFAULT_REPS,
    };
  }
  return { id: entry, sets: DEFAULT_SETS, reps: DEFAULT_REPS };
}

export default function PlanDetail({ plan, dayIndex, onBack, onStartWorkout }) {
  const { t } = useTranslation();
  const { user } = useAuth();

  const day = plan.days?.[dayIndex];

  const [entries, setEntries] = useState(() => (day?.exercises || []).map(normalizeEntry));
  const [changed, setChanged] = useState(false);
  const [saving, setSaving] = useState(false);
  const [showPicker, setShowPicker] = useState(false);
  const [customExercises, setCustomExercises] = useState([]);
  const [toast, setToast] = useState(null);
  const [confirmLeave, setConfirmLeave] = useState(false);

  // Ohne die eigenen Übungen stünde bei ihnen die rohe technische ID.
  useEffect(() => {
    getCustomExercises(user?.id || 'guest').then(setCustomExercises).catch(() => {});
  }, [user]);

  if (!day) return null;

  const nameOf = (id) => getExerciseDisplayName(id, customExercises, t);

  function removeExercise(index) {
    setEntries((prev) => prev.filter((_, i) => i !== index));
    setChanged(true);
  }

  function updateEntry(index, field, value) {
    const n = Math.max(1, parseInt(value, 10) || 1);
    setEntries((prev) => prev.map((e, i) => (i === index ? { ...e, [field]: n } : e)));
    setChanged(true);
  }

  function addPicked(picked) {
    if (!picked?.length) return;
    setEntries((prev) => [
      ...prev,
      ...picked.map((ex) => ({ id: ex.id, sets: DEFAULT_SETS, reps: DEFAULT_REPS })),
    ]);
    setChanged(true);
  }

  function buildDays() {
    const updatedDays = [...plan.days];
    // Sätze und Wiederholungen mitschreiben — früher blieben nur die IDs übrig.
    updatedDays[dayIndex] = { ...updatedDays[dayIndex], exercises: entries };
    return updatedDays;
  }

  async function persist() {
    const { error } = await updateCustomPlan(user.id, plan.id, {
      name: plan.name,
      days: buildDays(),
    });
    if (error) throw error;
  }

  async function saveChanges() {
    if (!plan.id) return;
    setSaving(true);
    try {
      await persist();
      setChanged(false);
      setToast({ variant: 'success', message: t('ui.planSaved') });
    } catch (err) {
      console.error('Failed to save plan:', err);
      setToast({
        variant: 'error',
        message: t('ui.thePlanCouldNotBeSaved2'),
      });
    } finally {
      setSaving(false);
    }
  }

  async function handleStart() {
    if (changed && plan.id) {
      try {
        await persist();
        setChanged(false);
      } catch (err) {
        console.error('Failed to save plan before start:', err);
      }
    }
    onStartWorkout(entries, plan.id, plan.name);
  }

  function handleBack() {
    // Früher wurden ungespeicherte Änderungen wortlos verworfen.
    if (changed && plan.id) {
      setConfirmLeave(true);
      return;
    }
    onBack();
  }

  // Der Katalog liegt als Overlay über der Seite. Ein Seitenwechsel hätte diese
  // Komponente abgebaut — die neu gewählten Übungen wären verloren gewesen.
  if (showPicker) {
    return (
      <div className="fixed inset-0 z-[70] bg-surface-light dark:bg-surface-dark overflow-y-auto">
        <ExerciseLibrary
          selectionMode
          onBack={() => setShowPicker(false)}
          onSelect={(picked) => {
            addPicked(picked);
            setShowPicker(false);
          }}
        />
      </div>
    );
  }

  return (
    <div className="p-4 pt-16 pb-24">
      {toast && <Toast variant={toast.variant} message={toast.message} onDismiss={() => setToast(null)} />}

      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <button onClick={handleBack} className="p-2 -ms-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div className="flex-1">
          <h1 className="text-xl font-bold">{plan.name}</h1>
          <p className="text-xs text-slate-400">
            {day.name || `${t('ui.day')} ${dayIndex + 1}`}
          </p>
        </div>
      </div>

      {/* Exercise list */}
      <div className="bg-white dark:bg-surface-dark-alt rounded-2xl shadow-soft border border-slate-100 dark:border-slate-800/60 overflow-hidden mb-4">
        {entries.length === 0 ? (
          <p className="text-center text-sm text-slate-400 py-8">
            {t('ui.noExercisesYetAddSomeBelow')}
          </p>
        ) : (
          entries.map((entry, i) => (
            <div key={`${entry.id}-${i}`} className="flex items-center gap-3 px-4 py-3 border-b border-slate-50 dark:border-slate-700/50 last:border-0">
              <span className="w-6 h-6 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-xs font-bold text-slate-500 flex-shrink-0">
                {i + 1}
              </span>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-slate-700 dark:text-slate-200 truncate">{nameOf(entry.id)}</p>
                <div className="flex items-center gap-2 mt-1">
                  <label className="flex items-center gap-1 text-[11px] text-slate-400">
                    <input
                      type="number"
                      min={1}
                      value={entry.sets}
                      onChange={(e) => updateEntry(i, 'sets', e.target.value)}
                      className="w-11 px-1.5 py-0.5 rounded-md bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-center text-slate-700 dark:text-slate-200"
                    />
                    {t('ui.sets')}
                  </label>
                  <label className="flex items-center gap-1 text-[11px] text-slate-400">
                    <input
                      type="number"
                      min={1}
                      value={entry.reps}
                      onChange={(e) => updateEntry(i, 'reps', e.target.value)}
                      className="w-11 px-1.5 py-0.5 rounded-md bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-center text-slate-700 dark:text-slate-200"
                    />
                    {t('ui.reps')}
                  </label>
                </div>
              </div>
              <button onClick={() => removeExercise(i)} className="p-1.5 text-slate-300 hover:text-red-500 transition-colors flex-shrink-0">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))
        )}
      </div>

      {/* Add exercise */}
      <button
        onClick={() => setShowPicker(true)}
        className="w-full py-3 border-2 border-dashed border-slate-300 dark:border-slate-600 rounded-2xl text-sm font-medium text-slate-500 dark:text-slate-400 flex items-center justify-center gap-2 hover:border-primary-400 hover:text-primary-500 transition-colors mb-6"
      >
        <Plus className="w-4 h-4" />
        {t('ui.addExercise')}
      </button>

      {/* Save changes */}
      {changed && plan.id && (
        <button
          onClick={saveChanges}
          disabled={saving}
          className="w-full py-3 mb-3 border border-primary-500 text-primary-500 rounded-2xl text-sm font-semibold hover:bg-primary-50 dark:hover:bg-primary-900/10 disabled:opacity-50 transition-colors"
        >
          {saving
            ? (t('ui.saving'))
            : (t('ui.saveChanges'))}
        </button>
      )}

      {/* Start workout */}
      <button
        onClick={handleStart}
        disabled={entries.length === 0}
        className="w-full py-4 bg-primary-500 hover:bg-primary-600 disabled:opacity-50 text-white rounded-2xl font-semibold flex items-center justify-center gap-2 transition-colors"
      >
        <Play className="w-5 h-5" />
        {t('ui.startWorkout')}
      </button>

      {/* Unsaved changes */}
      {confirmLeave && (
        <div className="fixed inset-0 bg-black/50 z-[80] flex items-center justify-center p-6" onClick={() => setConfirmLeave(false)}>
          <div className="bg-white dark:bg-surface-dark-alt rounded-2xl p-6 w-full max-w-sm" onClick={(e) => e.stopPropagation()}>
            <p className="text-base font-semibold mb-2">
              {t('ui.unsavedChanges')}
            </p>
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-5">
              {t('ui.youChangedThePlanDoYou')}
            </p>
            <div className="flex flex-col gap-2">
              <button
                onClick={async () => { await saveChanges(); setConfirmLeave(false); onBack(); }}
                className="w-full py-3 bg-primary-500 hover:bg-primary-600 text-white rounded-xl text-sm font-semibold"
              >
                {t('ui.saveAndGoBack')}
              </button>
              <button
                onClick={() => { setConfirmLeave(false); onBack(); }}
                className="w-full py-3 border border-slate-200 dark:border-slate-700 text-slate-500 rounded-xl text-sm font-medium"
              >
                {t('ui.discard')}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
