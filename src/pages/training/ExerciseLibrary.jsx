import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ArrowLeft, Search } from 'lucide-react';
import exercises, { muscleGroups } from '../../data/exercises';
import MuscleGroupIcon from '../../components/icons/MuscleGroupIcon';

export default function ExerciseLibrary({ onBack, onSelect, selectionMode = false }) {
  const { t } = useTranslation();
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState([]);

  const filtered = exercises.filter((ex) => {
    const name = t(ex.nameKey).toLowerCase();
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
    const selectedExercises = exercises.filter((ex) => selected.includes(ex.id));
    onSelect(selectedExercises);
  };

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
          className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white dark:bg-surface-dark-alt border border-slate-200 dark:border-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
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

      <div className="flex flex-col gap-2">
        {filtered.map((ex) => (
          <button
            key={ex.id}
            onClick={() => selectionMode ? toggleSelect(ex.id) : null}
            className={`bg-white dark:bg-surface-dark-alt rounded-xl p-3 text-left shadow-sm transition-all ${
              selected.includes(ex.id) ? 'ring-2 ring-primary-500' : ''
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3 flex-1 min-w-0">
                <div className="w-10 h-10 rounded-lg bg-primary-50 dark:bg-primary-900/20 flex items-center justify-center flex-shrink-0">
                  <MuscleGroupIcon group={ex.muscleGroup || ex.type} size={24} className="text-primary-500" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium truncate">{t(ex.nameKey)}</p>
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
            <p className="text-xs text-slate-400 dark:text-slate-500 mt-1 line-clamp-2">{t(ex.descKey)}</p>
          </button>
        ))}
      </div>

      {selectionMode && selected.length > 0 && (
        <div className="fixed bottom-20 left-0 right-0 px-4 pb-2">
          <button
            onClick={handleConfirm}
            className="w-full max-w-lg mx-auto block bg-primary-600 hover:bg-primary-700 text-white rounded-2xl py-3.5 font-semibold text-center shadow-lg transition-colors dark:bg-primary-500 dark:hover:bg-primary-600"
          >
            {t('training.addExercise')} ({selected.length})
          </button>
        </div>
      )}
    </div>
  );
}

function FilterPill({ label, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors ${
        active
          ? 'bg-primary-600 text-white dark:bg-primary-500'
          : 'bg-white dark:bg-surface-dark-alt text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700'
      }`}
    >
      {label}
    </button>
  );
}
