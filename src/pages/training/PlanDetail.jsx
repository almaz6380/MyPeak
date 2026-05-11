import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ArrowLeft, Play, Plus, Trash2, GripVertical } from 'lucide-react';
import { getExerciseById } from '../../data/exercises';
import { useAuth } from '../../context/AuthContext';
import { updateCustomPlan } from '../../data/workoutStorage';

export default function PlanDetail({ plan, dayIndex, onBack, onStartWorkout, onAddExercise }) {
  const { t } = useTranslation();
  const { user } = useAuth();
  const lang = t('common.back') === 'Zurück' ? 'de' : 'en';

  const day = plan.days?.[dayIndex];
  if (!day) return null;

  const [exercises, setExercises] = useState(() => {
    return (day.exercises || []).map((id) => {
      const ex = getExerciseById(typeof id === 'object' ? id.id : id);
      return ex ? { id: ex.id, nameKey: ex.nameKey, name: lang === 'de' ? t(ex.nameKey) : t(ex.nameKey) } : { id, name: id };
    });
  });
  const [changed, setChanged] = useState(false);

  function removeExercise(index) {
    setExercises((prev) => prev.filter((_, i) => i !== index));
    setChanged(true);
  }

  function addExercises(newExercises) {
    setExercises((prev) => [
      ...prev,
      ...newExercises.map((ex) => ({ id: ex.id, nameKey: ex.nameKey, name: lang === 'de' ? t(ex.nameKey) : t(ex.nameKey) })),
    ]);
    setChanged(true);
  }

  async function saveChanges() {
    const updatedDays = [...plan.days];
    updatedDays[dayIndex] = { ...updatedDays[dayIndex], exercises: exercises.map((ex) => ex.id) };
    await updateCustomPlan(user.id, plan.id, { name: plan.name, days: updatedDays });
    setChanged(false);
  }

  function handleStart() {
    // Save changes first if any, then start
    if (changed) {
      const updatedDays = [...plan.days];
      updatedDays[dayIndex] = { ...updatedDays[dayIndex], exercises: exercises.map((ex) => ex.id) };
      updateCustomPlan(user.id, plan.id, { name: plan.name, days: updatedDays }).catch(() => {});
    }
    onStartWorkout(exercises.map((ex) => ({ id: ex.id, sets: 3, reps: 10 })), plan.id, plan.name);
  }

  return (
    <div className="p-4 pt-16 pb-24">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <button onClick={onBack} className="p-2 -ml-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div className="flex-1">
          <h1 className="text-xl font-bold">{plan.name}</h1>
          <p className="text-xs text-slate-400">{day.name || `Tag ${dayIndex + 1}`}</p>
        </div>
      </div>

      {/* Exercise list */}
      <div className="bg-white dark:bg-surface-dark-alt rounded-2xl shadow-sm overflow-hidden mb-4">
        {exercises.length === 0 ? (
          <p className="text-center text-sm text-slate-400 py-8">
            {lang === 'de' ? 'Keine Übungen' : 'No exercises'}
          </p>
        ) : (
          exercises.map((ex, i) => (
            <div key={`${ex.id}-${i}`} className="flex items-center gap-3 px-4 py-3 border-b border-slate-50 dark:border-slate-700/50 last:border-0">
              <span className="w-6 h-6 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-xs font-bold text-slate-500">
                {i + 1}
              </span>
              <p className="flex-1 text-sm font-medium text-slate-700 dark:text-slate-200">{ex.name}</p>
              <button onClick={() => removeExercise(i)} className="p-1.5 text-slate-300 hover:text-red-500 transition-colors">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))
        )}
      </div>

      {/* Add exercise button */}
      <button
        onClick={() => onAddExercise(addExercises)}
        className="w-full py-3 border-2 border-dashed border-slate-300 dark:border-slate-600 rounded-2xl text-sm font-medium text-slate-500 dark:text-slate-400 flex items-center justify-center gap-2 hover:border-primary-400 hover:text-primary-500 transition-colors mb-6"
      >
        <Plus className="w-4 h-4" />
        {lang === 'de' ? 'Übung hinzufügen' : 'Add exercise'}
      </button>

      {/* Save changes (if changed) */}
      {changed && (
        <button
          onClick={saveChanges}
          className="w-full py-3 mb-3 border border-primary-500 text-primary-500 rounded-2xl text-sm font-semibold hover:bg-primary-50 dark:hover:bg-primary-900/10 transition-colors"
        >
          {lang === 'de' ? 'Änderungen speichern' : 'Save changes'}
        </button>
      )}

      {/* Start workout button */}
      <button
        onClick={handleStart}
        className="w-full py-4 bg-primary-500 hover:bg-primary-600 text-white rounded-2xl font-semibold flex items-center justify-center gap-2 transition-colors"
      >
        <Play className="w-5 h-5" />
        {lang === 'de' ? 'Workout starten' : 'Start Workout'}
      </button>
    </div>
  );
}
