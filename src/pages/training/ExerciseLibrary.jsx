import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { ArrowLeft, Search, Plus, X, Check } from 'lucide-react';
import exercises, { muscleGroups } from '../../data/exercises';
import { getCustomExercises, saveCustomExercise } from '../../data/workoutStorage';
import { useAuth } from '../../context/AuthContext';
import MuscleGroupIcon from '../../components/icons/MuscleGroupIcon';

export default function ExerciseLibrary({ onBack, onSelect, selectionMode = false }) {
  const { t } = useTranslation();
  const { user } = useAuth();
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState([]);
  const [customExercises, setCustomExercises] = useState([]);
  const [showCreateModal, setShowCreateModal] = useState(false);

  useEffect(() => {
    if (user) getCustomExercises(user.id).then(setCustomExercises);
  }, [user]);

  // Combine built-in + custom exercises
  const allExercises = [
    ...exercises,
    ...customExercises.map((ce) => ({
      id: ce.exercise_id,
      type: 'strength',
      muscleGroup: ce.muscle_group || 'chest',
      equipment: ce.equipment || 'bodyweight',
      nameKey: `__custom__${ce.name}`,
      descKey: '',
      _customName: ce.name,
    })),
  ];

  const filtered = allExercises.filter((ex) => {
    const name = (ex._customName || t(ex.nameKey)).toLowerCase();
    const matchesMuscle = filter === 'all' || ex.muscleGroup === filter;
    const matchesSearch = !search || name.includes(search.toLowerCase());
    return matchesMuscle && matchesSearch;
  });

  const toggleSelect = (id) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const handleConfirm = () => {
    const selectedExercises = allExercises.filter((ex) => selected.includes(ex.id));
    onSelect(selectedExercises);
  };

  async function handleCreateExercise(data) {
    const exercise = {
      exercise_id: `custom_${Date.now()}`,
      name: data.name,
      muscle_group: data.muscleGroup,
      equipment: data.equipment,
    };
    await saveCustomExercise(user.id, exercise);
    setCustomExercises((prev) => [...prev, exercise]);
    setShowCreateModal(false);
  }

  return (
    <div className="p-4 pb-24">
      <div className="flex items-center gap-3 mb-4">
        <button onClick={onBack} className="p-2 -ml-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h1 className="text-2xl font-bold">
          {selectionMode ? t('training.selectExercises') : t('training.exercises')}
        </h1>
      </div>

      <div className="relative mb-4">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search..."
          className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white dark:bg-surface-dark-alt border border-slate-200 dark:border-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-primary-400"
        />
      </div>

      <div className="flex gap-2 overflow-x-auto pb-2 mb-4 scrollbar-hide">
        <FilterPill
          label={t('training.allMuscles')}
          active={filter === 'all'}
          onClick={() => setFilter('all')}
        />
        {muscleGroups.map((mg) => (
          <FilterPill
            key={mg}
            label={t(`muscleGroups.${mg}`)}
            active={filter === mg}
            onClick={() => setFilter(mg)}
          />
        ))}
      </div>

      {/* Create custom exercise button */}
      <button
        onClick={() => setShowCreateModal(true)}
        className="w-full mb-4 border-2 border-dashed border-slate-300 dark:border-slate-600 rounded-xl py-3 flex items-center justify-center gap-2 text-slate-500 dark:text-slate-400 hover:border-primary-400 hover:text-primary-500 transition-colors"
      >
        <Plus className="w-5 h-5" />
        {t('training.createExercise')}
      </button>

      <div className="flex flex-col gap-2">
        {filtered.map((ex) => {
          const displayName = ex._customName || t(ex.nameKey);
          return (
            <button
              key={ex.id}
              onClick={() => selectionMode ? toggleSelect(ex.id) : null}
              className={`bg-white dark:bg-surface-dark-alt rounded-xl p-3 text-left shadow-sm transition-all ${
                selected.includes(ex.id) ? 'ring-2 ring-primary-400' : ''
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <div className="w-10 h-10 rounded-lg bg-primary-50 dark:bg-primary-900/20 flex items-center justify-center flex-shrink-0">
                    <MuscleGroupIcon group={ex.muscleGroup || ex.type} size={24} className="text-primary-500" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium truncate">{displayName}</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                      {t(`muscleGroups.${ex.muscleGroup}`)} · {t(`equipment.${ex.equipment}`)}
                    </p>
                  </div>
                </div>
                {selectionMode && (
                  <div className={`w-5 h-5 rounded-full border-2 flex-shrink-0 ml-3 flex items-center justify-center ${
                    selected.includes(ex.id)
                      ? 'bg-primary-500 border-primary-500'
                      : 'border-slate-300 dark:border-slate-600'
                  }`}>
                    {selected.includes(ex.id) && (
                      <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </div>
                )}
              </div>
              {ex.descKey && <p className="text-xs text-slate-400 dark:text-slate-500 mt-1 line-clamp-2">{t(ex.descKey)}</p>}
            </button>
          );
        })}
      </div>

      {showCreateModal && (
        <CreateExerciseModal
          onSave={handleCreateExercise}
          onClose={() => setShowCreateModal(false)}
          t={t}
        />
      )}

      {selectionMode && selected.length > 0 && (
        <div className="fixed bottom-20 left-0 right-0 px-4 pb-2">
          <button
            onClick={handleConfirm}
            className="w-full max-w-lg mx-auto block bg-primary-500 hover:bg-primary-500 text-white rounded-2xl py-3.5 font-semibold text-center shadow-lg transition-colors bg-primary-500 hover:bg-primary-600"
          >
            {t('training.addExercise')} ({selected.length})
          </button>
        </div>
      )}
    </div>
  );
}

function CreateExerciseModal({ onSave, onClose, t }) {
  const [name, setName] = useState('');
  const [muscleGroup, setMuscleGroup] = useState('chest');
  const [equipment, setEquipment] = useState('bodyweight');

  const equipmentOptions = ['barbell', 'dumbbell', 'cable', 'machine', 'bodyweight'];

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div className="bg-white dark:bg-surface-dark-alt rounded-2xl w-full max-w-sm shadow-xl" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between px-5 pt-5 pb-3">
          <h3 className="text-lg font-bold">{t('training.createExercise')}</h3>
          <button onClick={onClose} className="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="px-5 space-y-4">
          <div>
            <label className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-1 block">{t('training.exerciseName')}</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder={t('training.exerciseNamePlaceholder')}
              className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-primary-400"
            />
          </div>

          <div>
            <label className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-1 block">{t('training.muscleGroup')}</label>
            <div className="flex flex-wrap gap-1.5">
              {muscleGroups.map((mg) => (
                <button
                  key={mg}
                  onClick={() => setMuscleGroup(mg)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                    muscleGroup === mg
                      ? 'bg-primary-500 text-white'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                  }`}
                >
                  {t(`muscleGroups.${mg}`)}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-1 block">{t('training.equipment')}</label>
            <div className="flex flex-wrap gap-1.5">
              {equipmentOptions.map((eq) => (
                <button
                  key={eq}
                  onClick={() => setEquipment(eq)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                    equipment === eq
                      ? 'bg-primary-500 text-white'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                  }`}
                >
                  {t(`equipment.${eq}`)}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="px-5 pt-5 pb-5">
          <button
            onClick={() => name.trim() && onSave({ name: name.trim(), muscleGroup, equipment })}
            disabled={!name.trim()}
            className="w-full py-3 bg-primary-500 hover:bg-primary-600 disabled:bg-slate-300 dark:disabled:bg-slate-700 text-white rounded-xl font-semibold flex items-center justify-center gap-2 transition-colors"
          >
            <Check className="w-4 h-4" />
            {t('common.save')}
          </button>
        </div>
      </div>
    </div>
  );
}

function FilterPill({ label, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors ${
        active
          ? 'bg-primary-500 text-white'
          : 'bg-white dark:bg-surface-dark-alt text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700'
      }`}
    >
      {label}
    </button>
  );
}
