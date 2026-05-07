import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { ArrowLeft, ChevronRight, Plus, Trash2, X, Search, Loader2 } from 'lucide-react';
import exercises, { muscleGroups } from '../../data/exercises';
import { getCustomPlans, saveCustomPlan, deleteCustomPlan as deleteCustomPlanApi } from '../../data/workoutStorage';
import { getHiddenDefaultPlans, hideDefaultPlan, getPermanentDeletedDefaultPlans } from '../../data/settingsStorage';
import { useAuth } from '../../context/AuthContext';
import DeletedPlans from './DeletedPlans';

// e(id, sets, reps) shorthand for plan exercise entries
const e = (id, sets, reps) => ({ id, sets, reps });

const defaultPlans = [
  {
    id: 'ppl',
    nameKey: 'plans.pushPullLegs',
    descKey: 'plans.pushPullLegsDesc',
    days: [
      { nameKey: 'plans.push', exercises: [e('bench-press',4,8), e('incline-bench-press',3,10), e('dumbbell-flyes',3,12), e('overhead-press',4,8), e('lateral-raise',3,15), e('tricep-pushdown',3,12), e('skull-crushers',3,10)] },
      { nameKey: 'plans.pull', exercises: [e('deadlift',4,6), e('barbell-row',4,8), e('lat-pulldown',3,10), e('seated-cable-row',3,12), e('face-pull',3,15), e('barbell-curl',3,10), e('hammer-curl',3,12)] },
      { nameKey: 'plans.legDay', exercises: [e('squat',4,8), e('leg-press',3,10), e('leg-extension',3,12), e('leg-curl',3,12), e('lunges',3,10), e('calf-raise-standing',4,15)] },
    ],
  },
  {
    id: 'ul',
    nameKey: 'plans.upperLower',
    descKey: 'plans.upperLowerDesc',
    days: [
      { nameKey: 'plans.upper', exercises: [e('bench-press',4,8), e('barbell-row',4,8), e('overhead-press',3,10), e('lat-pulldown',3,10), e('dumbbell-curl',3,12), e('tricep-pushdown',3,12)] },
      { nameKey: 'plans.lower', exercises: [e('squat',4,8), e('romanian-deadlift',3,10), e('leg-press',3,10), e('leg-curl',3,12), e('hip-thrust',3,10), e('calf-raise-standing',4,15)] },
    ],
  },
  {
    id: '5split',
    nameKey: 'plans.fiveDaySplit',
    descKey: 'plans.fiveDaySplitDesc',
    days: [
      { nameKey: 'plans.chestDay', exercises: [e('bench-press',4,8), e('incline-bench-press',4,10), e('dumbbell-flyes',3,12), e('cable-crossover',3,12), e('chest-dips',3,10)] },
      { nameKey: 'plans.backDay', exercises: [e('deadlift',4,6), e('pull-ups',4,8), e('barbell-row',4,8), e('lat-pulldown',3,10), e('seated-cable-row',3,12)] },
      { nameKey: 'plans.shoulderDay', exercises: [e('overhead-press',4,8), e('lateral-raise',4,15), e('face-pull',3,15), e('front-raise',3,12), e('reverse-flyes',3,15)] },
      { nameKey: 'plans.armDay', exercises: [e('barbell-curl',3,10), e('hammer-curl',3,12), e('preacher-curl',3,10), e('tricep-pushdown',3,12), e('skull-crushers',3,10), e('overhead-tricep-extension',3,12)] },
      { nameKey: 'plans.legDay', exercises: [e('squat',4,8), e('leg-press',3,10), e('leg-extension',3,12), e('leg-curl',3,12), e('lunges',3,10), e('calf-raise-standing',4,15), e('calf-raise-seated',4,15)] },
    ],
  },
];

// Export defaultPlans for use in workout start chooser
export { defaultPlans };

export default function TrainingPlans({ onBack, onStartPlan }) {
  const { t } = useTranslation();
  const { user } = useAuth();
  const [customPlans, setCustomPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState('list');
  const [newPlan, setNewPlan] = useState({ name: '', days: [] });
  const [selectingDayIdx, setSelectingDayIdx] = useState(null);
  const [hiddenDefaults, setHiddenDefaults] = useState([]);
  const [deleteConfirm, setDeleteConfirm] = useState(null); // { type: 'custom'|'default', id: string }

  useEffect(() => {
    if (user) {
      getCustomPlans(user.id).then((plans) => {
        setCustomPlans(plans);
        setLoading(false);
      });
    }
    setHiddenDefaults(getHiddenDefaultPlans());
  }, [user]);

  const permaDeleted = getPermanentDeletedDefaultPlans();
  const visibleDefaultPlans = defaultPlans.filter((p) => !hiddenDefaults.includes(p.id) && !permaDeleted.includes(p.id));

  const handleDeletePlan = async (id) => {
    setCustomPlans((prev) => prev.filter((p) => p.id !== id));
    await deleteCustomPlanApi(user.id, id);
    setDeleteConfirm(null);
  };

  const handleDeleteDefaultPlan = (id) => {
    hideDefaultPlan(id);
    setHiddenDefaults(getHiddenDefaultPlans());
    setDeleteConfirm(null);
  };

  const handlePlansRestored = () => {
    setHiddenDefaults(getHiddenDefaultPlans());
    if (user) {
      getCustomPlans(user.id).then(setCustomPlans);
    }
    setView('list');
  };

  const addDay = () => {
    setNewPlan((prev) => ({
      ...prev,
      days: [...prev.days, { name: '', exercises: [] }],
    }));
  };

  const updateDayName = (idx, name) => {
    setNewPlan((prev) => {
      const days = [...prev.days];
      days[idx] = { ...days[idx], name };
      return { ...prev, days };
    });
  };

  const removeDay = (idx) => {
    setNewPlan((prev) => ({
      ...prev,
      days: prev.days.filter((_, i) => i !== idx),
    }));
  };

  const handleExercisesSelected = (exerciseIds) => {
    setNewPlan((prev) => {
      const days = [...prev.days];
      days[selectingDayIdx] = { ...days[selectingDayIdx], exercises: exerciseIds };
      return { ...prev, days };
    });
    setSelectingDayIdx(null);
  };

  const savePlan = async () => {
    if (!newPlan.name.trim() || newPlan.days.length === 0) return;
    const plan = {
      name: newPlan.name.trim(),
      days: newPlan.days
        .filter((d) => d.name.trim() && d.exercises.length > 0)
        .map((d) => ({ name: d.name.trim(), exercises: d.exercises })),
    };
    if (plan.days.length === 0) return;
    const { data } = await saveCustomPlan(user.id, plan);
    setCustomPlans((prev) => [{ id: data?.id || `custom-${Date.now()}`, ...plan }, ...prev]);
    setNewPlan({ name: '', days: [] });
    setView('list');
  };

  // Deleted plans screen
  if (view === 'deleted') {
    return <DeletedPlans onBack={handlePlansRestored} />;
  }

  // Exercise picker for a specific day
  if (selectingDayIdx !== null) {
    const currentExercises = newPlan.days[selectingDayIdx]?.exercises || [];
    return (
      <ExercisePicker
        initialSelected={currentExercises}
        onBack={() => setSelectingDayIdx(null)}
        onConfirm={handleExercisesSelected}
      />
    );
  }

  // Create plan form
  if (view === 'create') {
    return (
      <div className="p-4 pb-24">
        <div className="flex items-center gap-3 mb-6">
          <button onClick={() => { setView('list'); setNewPlan({ name: '', days: [] }); }} className="p-2 -ml-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-2xl font-bold">{t('plans.createPlan')}</h1>
        </div>

        <div className="mb-4">
          <label className="text-sm font-medium text-slate-600 dark:text-slate-400 mb-1 block">{t('plans.planName')}</label>
          <input
            type="text"
            value={newPlan.name}
            onChange={(e) => setNewPlan((prev) => ({ ...prev, name: e.target.value }))}
            placeholder={t('plans.enterPlanName')}
            className="w-full px-4 py-2.5 rounded-xl bg-white dark:bg-surface-dark-alt border border-slate-200 dark:border-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
        </div>

        <div className="flex flex-col gap-3 mb-4">
          {newPlan.days.map((day, i) => (
            <div key={i} className="bg-white dark:bg-surface-dark-alt rounded-2xl p-4 shadow-sm">
              <div className="flex items-center gap-2 mb-3">
                <input
                  type="text"
                  value={day.name}
                  onChange={(e) => updateDayName(i, e.target.value)}
                  placeholder={t('plans.enterDayName')}
                  className="flex-1 px-3 py-2 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
                <button onClick={() => removeDay(i)} className="p-2 text-slate-400 hover:text-red-500">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              <button
                onClick={() => setSelectingDayIdx(i)}
                className="w-full text-sm text-primary-500 hover:text-primary-600 font-medium py-2 rounded-lg bg-slate-50 dark:bg-slate-800 transition-colors"
              >
                {day.exercises.length > 0
                  ? `${day.exercises.length} ${t('training.exercises')}`
                  : t('plans.selectExercisesForDay')}
              </button>
            </div>
          ))}
        </div>

        <button
          onClick={addDay}
          className="w-full flex items-center justify-center gap-2 py-3 rounded-xl border-2 border-dashed border-slate-300 dark:border-slate-600 text-slate-500 dark:text-slate-400 hover:border-primary-400 hover:text-primary-500 transition-colors mb-4"
        >
          <Plus className="w-4 h-4" />
          <span className="text-sm font-medium">{t('plans.addDay')}</span>
        </button>

        <button
          onClick={savePlan}
          disabled={!newPlan.name.trim() || newPlan.days.length === 0}
          className="w-full bg-primary-600 hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-2xl py-3.5 font-semibold transition-colors dark:bg-primary-500 dark:hover:bg-primary-600"
        >
          {t('plans.savePlan')}
        </button>
      </div>
    );
  }

  // Plan list (default view)
  return (
    <div className="p-4 pb-24">
      <div className="flex items-center gap-3 mb-6">
        <button onClick={onBack} className="p-2 -ml-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h1 className="text-2xl font-bold">{t('plans.title')}</h1>
      </div>

      <button
        onClick={() => setView('create')}
        className="w-full flex items-center justify-center gap-2 py-3 rounded-xl border-2 border-dashed border-slate-300 dark:border-slate-600 text-slate-500 dark:text-slate-400 hover:border-primary-400 hover:text-primary-500 transition-colors mb-4"
      >
        <Plus className="w-5 h-5" />
        <span className="font-medium">{t('plans.createPlan')}</span>
      </button>

      {/* Custom Plans */}
      {customPlans.length > 0 && (
        <div className="mb-6">
          <h2 className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-3">{t('plans.customPlans')}</h2>
          <div className="flex flex-col gap-4">
            {customPlans.map((plan) => (
              <div key={plan.id} className="bg-white dark:bg-surface-dark-alt rounded-2xl p-4 shadow-sm">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-semibold text-lg">{plan.name}</h3>
                  <button onClick={() => setDeleteConfirm({ type: 'custom', id: plan.id })} className="p-1.5 text-slate-400 hover:text-red-500">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
                <div className="flex flex-col gap-2">
                  {plan.days.map((day, i) => (
                    <button
                      key={i}
                      onClick={() => onStartPlan(day.exercises.map((id) => ({ id, sets: 3, reps: 10 })))}
                      className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
                    >
                      <span className="text-sm font-medium">{day.name}</span>
                      <div className="flex items-center gap-1 text-xs text-slate-400">
                        <span>{day.exercises.length} {t('training.exercises')}</span>
                        <ChevronRight className="w-4 h-4" />
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Default Plans */}
      {visibleDefaultPlans.length > 0 && (
        <div className="flex flex-col gap-4 mb-6">
          {visibleDefaultPlans.map((plan) => (
            <div key={plan.id} className="bg-white dark:bg-surface-dark-alt rounded-2xl p-4 shadow-sm">
              <div className="flex items-center justify-between mb-1">
                <h3 className="font-semibold text-lg">{t(plan.nameKey)}</h3>
                <button onClick={() => setDeleteConfirm({ type: 'default', id: plan.id })} className="p-1.5 text-slate-400 hover:text-red-500">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
              <p className="text-sm text-slate-500 dark:text-slate-400 mb-3">{t(plan.descKey)}</p>

              <div className="flex flex-col gap-2">
                {plan.days.map((day, i) => (
                  <button
                    key={i}
                    onClick={() => onStartPlan(day.exercises)}
                    className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
                  >
                    <span className="text-sm font-medium">{t(day.nameKey)}</span>
                    <div className="flex items-center gap-1 text-xs text-slate-400">
                      <span>{day.exercises.length} {t('training.exercises')}</span>
                      <ChevronRight className="w-4 h-4" />
                    </div>
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Link to Deleted Plans */}
      <button
        onClick={() => setView('deleted')}
        className="w-full flex items-center justify-center gap-2 py-3 text-sm text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors"
      >
        <Trash2 className="w-4 h-4" />
        <span>{t('plans.deletedPlans')}</span>
      </button>

      {/* Delete confirmation dialog */}
      {deleteConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-surface-dark-alt rounded-2xl p-6 w-full max-w-sm shadow-xl">
            <p className="text-center font-semibold mb-2">{t('plans.deletePlan')}</p>
            <p className="text-center text-sm text-slate-500 dark:text-slate-400 mb-4">{t('plans.confirmDeletePlan')}</p>
            <div className="flex gap-3">
              <button
                onClick={() => setDeleteConfirm(null)}
                className="flex-1 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 font-medium text-sm hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
              >
                {t('common.cancel')}
              </button>
              <button
                onClick={() => deleteConfirm.type === 'custom' ? handleDeletePlan(deleteConfirm.id) : handleDeleteDefaultPlan(deleteConfirm.id)}
                className="flex-1 py-2.5 rounded-xl bg-red-500 hover:bg-red-600 text-white font-medium text-sm transition-colors"
              >
                {t('common.delete')}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function ExercisePicker({ initialSelected, onBack, onConfirm }) {
  const { t } = useTranslation();
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState(initialSelected);

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

  return (
    <div className="p-4 pb-24">
      <div className="flex items-center gap-3 mb-4">
        <button onClick={onBack} className="p-2 -ml-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h1 className="text-2xl font-bold">{t('plans.selectExercisesForDay')}</h1>
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
        <FilterPill label={t('training.allMuscles')} active={filter === 'all'} onClick={() => setFilter('all')} />
        {muscleGroups.map((mg) => (
          <FilterPill key={mg} label={t(`muscleGroups.${mg}`)} active={filter === mg} onClick={() => setFilter(mg)} />
        ))}
      </div>

      <div className="flex flex-col gap-2">
        {filtered.map((ex) => (
          <button
            key={ex.id}
            onClick={() => toggleSelect(ex.id)}
            className={`bg-white dark:bg-surface-dark-alt rounded-xl p-3 text-left shadow-sm transition-all ${
              selected.includes(ex.id) ? 'ring-2 ring-primary-500' : ''
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex-1 min-w-0">
                <p className="font-medium truncate">{t(ex.nameKey)}</p>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  {t(`muscleGroups.${ex.muscleGroup}`)} · {t(`equipment.${ex.equipment}`)}
                </p>
              </div>
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
            </div>
          </button>
        ))}
      </div>

      {selected.length > 0 && (
        <div className="fixed bottom-20 left-0 right-0 px-4 pb-2">
          <button
            onClick={() => onConfirm(selected)}
            className="w-full max-w-lg mx-auto block bg-primary-600 hover:bg-primary-700 text-white rounded-2xl py-3.5 font-semibold text-center shadow-lg transition-colors dark:bg-primary-500 dark:hover:bg-primary-600"
          >
            {t('training.done')} ({selected.length})
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
