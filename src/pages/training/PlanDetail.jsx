import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ArrowLeft, Play, Plus, Trash2, Search, X } from 'lucide-react';
import exercises, { getExerciseById } from '../../data/exercises';
import { useAuth } from '../../context/AuthContext';
import { updateCustomPlan } from '../../data/workoutStorage';

function mapExercise(id, t) {
  const rawId = typeof id === 'object' ? id.id : id;
  const ex = getExerciseById(rawId);
  return ex ? { id: ex.id, nameKey: ex.nameKey, name: t(ex.nameKey) } : { id: rawId, name: rawId };
}

export default function PlanDetail({ plan, dayIndex, onBack, onStartWorkout }) {
  const { t } = useTranslation();
  const { user } = useAuth();
  const lang = t('common.back') === 'Zurück' ? 'de' : 'en';

  const day = plan.days?.[dayIndex];
  if (!day) return null;

  const [exerciseList, setExerciseList] = useState(() =>
    (day.exercises || []).map((id) => mapExercise(id, t))
  );
  const [changed, setChanged] = useState(false);
  const [showPicker, setShowPicker] = useState(false);
  const [pickerSearch, setPickerSearch] = useState('');

  function removeExercise(index) {
    setExerciseList((prev) => prev.filter((_, i) => i !== index));
    setChanged(true);
  }

  function addExercise(ex) {
    setExerciseList((prev) => [...prev, { id: ex.id, nameKey: ex.nameKey, name: t(ex.nameKey) }]);
    setChanged(true);
    setShowPicker(false);
    setPickerSearch('');
  }

  async function saveChanges() {
    const updatedDays = [...plan.days];
    updatedDays[dayIndex] = { ...updatedDays[dayIndex], exercises: exerciseList.map((ex) => ex.id) };
    await updateCustomPlan(user.id, plan.id, { name: plan.name, days: updatedDays });
    setChanged(false);
  }

  function handleStart() {
    if (changed) {
      const updatedDays = [...plan.days];
      updatedDays[dayIndex] = { ...updatedDays[dayIndex], exercises: exerciseList.map((ex) => ex.id) };
      updateCustomPlan(user.id, plan.id, { name: plan.name, days: updatedDays }).catch(() => {});
    }
    onStartWorkout(exerciseList.map((ex) => ({ id: ex.id, sets: 3, reps: 10 })), plan.id, plan.name);
  }

  // Filter exercises for picker
  const pickerExercises = pickerSearch.length >= 2
    ? exercises.filter((ex) => {
        const name = t(ex.nameKey).toLowerCase();
        return name.includes(pickerSearch.toLowerCase());
      }).slice(0, 20)
    : [];

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
        {exerciseList.length === 0 ? (
          <p className="text-center text-sm text-slate-400 py-8">
            {lang === 'de' ? 'Keine Übungen' : 'No exercises'}
          </p>
        ) : (
          exerciseList.map((ex, i) => (
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
        onClick={() => setShowPicker(true)}
        className="w-full py-3 border-2 border-dashed border-slate-300 dark:border-slate-600 rounded-2xl text-sm font-medium text-slate-500 dark:text-slate-400 flex items-center justify-center gap-2 hover:border-primary-400 hover:text-primary-500 transition-colors mb-6"
      >
        <Plus className="w-4 h-4" />
        {lang === 'de' ? 'Übung hinzufügen' : 'Add exercise'}
      </button>

      {/* Save changes */}
      {changed && (
        <button
          onClick={saveChanges}
          className="w-full py-3 mb-3 border border-primary-500 text-primary-500 rounded-2xl text-sm font-semibold hover:bg-primary-50 dark:hover:bg-primary-900/10 transition-colors"
        >
          {lang === 'de' ? 'Änderungen speichern' : 'Save changes'}
        </button>
      )}

      {/* Start workout */}
      <button
        onClick={handleStart}
        className="w-full py-4 bg-primary-500 hover:bg-primary-600 text-white rounded-2xl font-semibold flex items-center justify-center gap-2 transition-colors"
      >
        <Play className="w-5 h-5" />
        {lang === 'de' ? 'Workout starten' : 'Start Workout'}
      </button>

      {/* Exercise Picker Modal */}
      {showPicker && (
        <div className="fixed inset-0 bg-black/50 z-[60] flex items-end" onClick={() => { setShowPicker(false); setPickerSearch(''); }}>
          <div className="w-full bg-white dark:bg-surface-dark-alt rounded-t-2xl max-h-[75vh] flex flex-col" onClick={(e) => e.stopPropagation()}>
            <div className="px-4 pt-4 pb-2 flex items-center gap-3">
              <div className="flex-1 flex items-center gap-2 bg-slate-100 dark:bg-slate-800 rounded-xl px-3 py-2.5">
                <Search className="w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  value={pickerSearch}
                  onChange={(e) => setPickerSearch(e.target.value)}
                  placeholder={lang === 'de' ? 'Übung suchen...' : 'Search exercise...'}
                  className="flex-1 bg-transparent text-sm focus:outline-none"
                  autoFocus
                />
                {pickerSearch && (
                  <button onClick={() => setPickerSearch('')}>
                    <X className="w-4 h-4 text-slate-400" />
                  </button>
                )}
              </div>
              <button onClick={() => { setShowPicker(false); setPickerSearch(''); }} className="text-sm text-primary-500 font-medium">
                {lang === 'de' ? 'Fertig' : 'Done'}
              </button>
            </div>

            <div className="overflow-y-auto flex-1 px-4 pb-6">
              {pickerSearch.length < 2 ? (
                <p className="text-center text-sm text-slate-400 py-8">
                  {lang === 'de' ? 'Mindestens 2 Buchstaben eingeben' : 'Type at least 2 characters'}
                </p>
              ) : pickerExercises.length === 0 ? (
                <p className="text-center text-sm text-slate-400 py-8">
                  {lang === 'de' ? 'Keine Ergebnisse' : 'No results'}
                </p>
              ) : (
                pickerExercises.map((ex) => (
                  <button
                    key={ex.id}
                    onClick={() => addExercise(ex)}
                    className="w-full flex items-center gap-3 px-3 py-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                  >
                    <Plus className="w-4 h-4 text-primary-500" />
                    <span className="text-sm font-medium text-slate-700 dark:text-slate-200">{t(ex.nameKey)}</span>
                  </button>
                ))
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
