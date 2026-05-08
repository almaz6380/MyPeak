import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { ArrowLeft, ChevronRight, Plus, Trash2, X, Search, Loader2 } from 'lucide-react';
import exercises, { muscleGroups, getExercisesByType, getExerciseById } from '../../data/exercises';
import { getCustomPlans, saveCustomPlan, deleteCustomPlan as deleteCustomPlanApi, getPlanType } from '../../data/workoutStorage';
import { getHiddenDefaultPlans, hideDefaultPlan, getPermanentDeletedDefaultPlans } from '../../data/settingsStorage';
import { defaultStrengthPlans, getDefaultPlansByType, allDefaultPlans } from '../../data/defaultPlans';
import { useAuth } from '../../context/AuthContext';
import DeletedPlans from './DeletedPlans';

// Re-export for backward compatibility (WorkoutStartChooser imports this)
export const defaultPlans = defaultStrengthPlans;

export default function TrainingPlans({ onBack, onStartPlan, onStartHiit, onStartCircuit, onStartCardio, onStartMartialArts }) {
  const { t } = useTranslation();
  const { user } = useAuth();
  const [allCustomPlans, setAllCustomPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedArea, setSelectedArea] = useState('strength');
  const [view, setView] = useState('list'); // 'list' | 'create' | 'deleted'
  const [hiddenDefaults, setHiddenDefaults] = useState([]);
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  // Strength create form state
  const [newStrengthPlan, setNewStrengthPlan] = useState({ name: '', days: [] });
  const [selectingDayIdx, setSelectingDayIdx] = useState(null);

  // HIIT/Circuit create form state
  const [newIntervalPlan, setNewIntervalPlan] = useState({ name: '', rounds: 3, workTime: 40, restTime: 20, exercises: [] });
  const [selectingIntervalExercises, setSelectingIntervalExercises] = useState(false);

  // Cardio create form state
  const [newCardioPlan, setNewCardioPlan] = useState({ name: '', sessions: [] });

  useEffect(() => {
    if (user) {
      getCustomPlans(user.id).then((plans) => {
        setAllCustomPlans(plans);
        setLoading(false);
      });
    }
    setHiddenDefaults(getHiddenDefaultPlans());
  }, [user]);

  const permaDeleted = getPermanentDeletedDefaultPlans();
  const defaults = getDefaultPlansByType(selectedArea).filter((p) => !hiddenDefaults.includes(p.id) && !permaDeleted.includes(p.id));
  const customPlans = allCustomPlans.filter((p) => getPlanType(p) === selectedArea);

  const areas = [
    { key: 'strength', label: t('training.strength') },
    { key: 'cardio', label: t('training.cardio') },
    { key: 'hiit', label: t('training.hiit') },
    { key: 'circuit', label: t('training.circuit') },
    { key: 'martial-arts', label: t('training.martialArts') },
  ];

  const handleDeletePlan = async (id) => {
    setAllCustomPlans((prev) => prev.filter((p) => p.id !== id));
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
    if (user) getCustomPlans(user.id).then(setAllCustomPlans);
    setView('list');
  };

  const resetCreateForms = () => {
    setNewStrengthPlan({ name: '', days: [] });
    setNewIntervalPlan({ name: '', rounds: 3, workTime: 40, restTime: 20, exercises: [] });
    setNewCardioPlan({ name: '', sessions: [] });
  };

  // ── Start plan handlers per type ──
  const handleStartStrengthPlan = (dayExercises) => {
    if (onStartPlan) onStartPlan(dayExercises);
  };

  const handleStartHiitPlan = (plan) => {
    const config = {
      rounds: plan.rounds || plan.days?.rounds,
      workTime: plan.workTime || plan.days?.workTime,
      restTime: plan.restTime || plan.days?.restTime,
      exercises: plan.exercises || plan.days?.exercises,
    };
    if (onStartHiit) onStartHiit(config);
  };

  const handleStartCircuitPlan = (plan) => {
    const config = {
      rounds: plan.rounds || plan.days?.rounds,
      workTime: plan.workTime || plan.days?.workTime,
      restTime: plan.restTime || plan.days?.restTime,
      exercises: plan.exercises || plan.days?.exercises,
    };
    if (onStartCircuit) onStartCircuit(config);
  };

  const handleStartMartialArtsPlan = (plan) => {
    const config = {
      rounds: plan.rounds || plan.days?.rounds,
      workTime: plan.workTime || plan.days?.workTime,
      restTime: plan.restTime || plan.days?.restTime,
      exercises: plan.exercises || plan.days?.exercises,
    };
    if (onStartMartialArts) onStartMartialArts(config);
  };

  const handleStartCardioSession = (session) => {
    const activity = getExerciseById(session.exerciseId);
    if (activity && onStartCardio) onStartCardio(activity);
  };

  // ── Save handlers ──
  const saveStrengthPlan = async () => {
    if (!newStrengthPlan.name.trim() || newStrengthPlan.days.length === 0) return;
    const plan = {
      name: newStrengthPlan.name.trim(),
      days: newStrengthPlan.days.filter((d) => d.name.trim() && d.exercises.length > 0).map((d) => ({ name: d.name.trim(), exercises: d.exercises })),
    };
    if (plan.days.length === 0) return;
    const { data } = await saveCustomPlan(user.id, plan);
    setAllCustomPlans((prev) => [{ id: data?.id || `custom-${Date.now()}`, ...plan }, ...prev]);
    resetCreateForms();
    setView('list');
  };

  const saveIntervalPlan = async () => {
    if (!newIntervalPlan.name.trim() || newIntervalPlan.exercises.length === 0) return;
    const plan = {
      name: newIntervalPlan.name.trim(),
      days: {
        type: selectedArea, // 'hiit' or 'circuit'
        rounds: newIntervalPlan.rounds,
        workTime: newIntervalPlan.workTime,
        restTime: newIntervalPlan.restTime,
        exercises: newIntervalPlan.exercises,
      },
    };
    const { data } = await saveCustomPlan(user.id, plan);
    setAllCustomPlans((prev) => [{ id: data?.id || `custom-${Date.now()}`, ...plan }, ...prev]);
    resetCreateForms();
    setView('list');
  };

  const saveCardioPlan = async () => {
    if (!newCardioPlan.name.trim() || newCardioPlan.sessions.length === 0) return;
    const plan = {
      name: newCardioPlan.name.trim(),
      days: {
        type: 'cardio',
        sessions: newCardioPlan.sessions.filter((s) => s.name.trim() && s.exerciseId),
      },
    };
    if (plan.days.sessions.length === 0) return;
    const { data } = await saveCustomPlan(user.id, plan);
    setAllCustomPlans((prev) => [{ id: data?.id || `custom-${Date.now()}`, ...plan }, ...prev]);
    resetCreateForms();
    setView('list');
  };

  // ── Strength day helpers ──
  const addDay = () => setNewStrengthPlan((p) => ({ ...p, days: [...p.days, { name: '', exercises: [] }] }));
  const updateDayName = (idx, name) => setNewStrengthPlan((p) => { const d = [...p.days]; d[idx] = { ...d[idx], name }; return { ...p, days: d }; });
  const removeDay = (idx) => setNewStrengthPlan((p) => ({ ...p, days: p.days.filter((_, i) => i !== idx) }));
  const handleDayExercisesSelected = (exerciseIds) => {
    setNewStrengthPlan((p) => { const d = [...p.days]; d[selectingDayIdx] = { ...d[selectingDayIdx], exercises: exerciseIds }; return { ...p, days: d }; });
    setSelectingDayIdx(null);
  };

  // ── Cardio session helpers ──
  const addSession = () => setNewCardioPlan((p) => ({ ...p, sessions: [...p.sessions, { name: '', exerciseId: '', targetDuration: 30 }] }));
  const updateSession = (idx, field, value) => setNewCardioPlan((p) => { const s = [...p.sessions]; s[idx] = { ...s[idx], [field]: value }; return { ...p, sessions: s }; });
  const removeSession = (idx) => setNewCardioPlan((p) => ({ ...p, sessions: p.sessions.filter((_, i) => i !== idx) }));
  const cardioExercises = getExercisesByType('cardio');

  // ── Deleted Plans View ──
  if (view === 'deleted') return <DeletedPlans onBack={handlePlansRestored} />;

  // ── Exercise Picker (for strength days) ──
  if (selectingDayIdx !== null) {
    return (
      <ExercisePicker
        initialSelected={newStrengthPlan.days[selectingDayIdx]?.exercises || []}
        onBack={() => setSelectingDayIdx(null)}
        onConfirm={handleDayExercisesSelected}
        exerciseType="strength"
      />
    );
  }

  // ── Exercise Picker (for HIIT/Circuit) ──
  if (selectingIntervalExercises) {
    return (
      <ExercisePicker
        initialSelected={newIntervalPlan.exercises}
        onBack={() => setSelectingIntervalExercises(false)}
        onConfirm={(ids) => { setNewIntervalPlan((p) => ({ ...p, exercises: ids })); setSelectingIntervalExercises(false); }}
        exerciseType="all"
      />
    );
  }

  // ── Create Form ──
  if (view === 'create') {
    return (
      <div className="p-4 pb-24">
        <div className="flex items-center gap-3 mb-6">
          <button onClick={() => { setView('list'); resetCreateForms(); }} className="p-2 -ml-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-2xl font-bold">{t('plans.createPlan')}</h1>
        </div>

        {/* Strength Create */}
        {selectedArea === 'strength' && (
          <>
            <div className="mb-4">
              <label className="text-sm font-medium text-slate-600 dark:text-slate-400 mb-1 block">{t('plans.planName')}</label>
              <input type="text" value={newStrengthPlan.name} onChange={(e) => setNewStrengthPlan((p) => ({ ...p, name: e.target.value }))} placeholder={t('plans.enterPlanName')} className="w-full px-4 py-2.5 rounded-xl bg-white dark:bg-surface-dark-alt border border-slate-200 dark:border-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-primary-400" />
            </div>
            <div className="flex flex-col gap-3 mb-4">
              {newStrengthPlan.days.map((day, i) => (
                <div key={i} className="bg-white dark:bg-surface-dark-alt rounded-2xl p-4 shadow-sm">
                  <div className="flex items-center gap-2 mb-3">
                    <input type="text" value={day.name} onChange={(e) => updateDayName(i, e.target.value)} placeholder={t('plans.enterDayName')} className="flex-1 px-3 py-2 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-primary-400" />
                    <button onClick={() => removeDay(i)} className="p-2 text-slate-400 hover:text-red-500"><Trash2 className="w-4 h-4" /></button>
                  </div>
                  <button onClick={() => setSelectingDayIdx(i)} className="w-full text-sm text-primary-500 hover:text-primary-600 font-medium py-2 rounded-lg bg-slate-50 dark:bg-slate-800 transition-colors">
                    {day.exercises.length > 0 ? `${day.exercises.length} ${t('training.exercises')}` : t('plans.selectExercisesForDay')}
                  </button>
                </div>
              ))}
            </div>
            <button onClick={addDay} className="w-full flex items-center justify-center gap-2 py-3 rounded-xl border-2 border-dashed border-slate-300 dark:border-slate-600 text-slate-500 dark:text-slate-400 hover:border-primary-400 hover:text-primary-500 transition-colors mb-4">
              <Plus className="w-4 h-4" /><span className="text-sm font-medium">{t('plans.addDay')}</span>
            </button>
            <button onClick={saveStrengthPlan} disabled={!newStrengthPlan.name.trim() || newStrengthPlan.days.length === 0} className="w-full bg-primary-500 hover:bg-primary-600 disabled:opacity-50 text-white rounded-2xl py-3.5 font-semibold transition-colors dark:bg-primary-500">{t('plans.savePlan')}</button>
          </>
        )}

        {/* HIIT / Circuit Create */}
        {(selectedArea === 'hiit' || selectedArea === 'circuit' || selectedArea === 'martial-arts') && (
          <>
            <div className="mb-4">
              <label className="text-sm font-medium text-slate-600 dark:text-slate-400 mb-1 block">{selectedArea === 'hiit' ? t('plans.hiitPlanName') : t('plans.circuitName')}</label>
              <input type="text" value={newIntervalPlan.name} onChange={(e) => setNewIntervalPlan((p) => ({ ...p, name: e.target.value }))} placeholder={t('plans.enterPlanName')} className="w-full px-4 py-2.5 rounded-xl bg-white dark:bg-surface-dark-alt border border-slate-200 dark:border-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-primary-400" />
            </div>
            <div className="bg-white dark:bg-surface-dark-alt rounded-2xl p-4 shadow-sm mb-4">
              <div className="flex flex-col gap-4">
                <NumberStepper label={t('training.rounds')} value={newIntervalPlan.rounds} min={1} max={20} step={1} onChange={(v) => setNewIntervalPlan((p) => ({ ...p, rounds: v }))} />
                <NumberStepper label={t('training.workTime')} value={newIntervalPlan.workTime} min={5} max={120} step={5} suffix="s" onChange={(v) => setNewIntervalPlan((p) => ({ ...p, workTime: v }))} />
                <NumberStepper label={t('training.restTime')} value={newIntervalPlan.restTime} min={5} max={120} step={5} suffix="s" onChange={(v) => setNewIntervalPlan((p) => ({ ...p, restTime: v }))} />
              </div>
            </div>
            <button onClick={() => setSelectingIntervalExercises(true)} className="w-full flex items-center justify-center gap-2 py-3 rounded-xl border-2 border-dashed border-slate-300 dark:border-slate-600 text-slate-500 dark:text-slate-400 hover:border-primary-400 hover:text-primary-500 transition-colors mb-4">
              <Plus className="w-4 h-4" />
              <span className="text-sm font-medium">{newIntervalPlan.exercises.length > 0 ? `${newIntervalPlan.exercises.length} ${t('training.exercises')}` : t('plans.selectExercisesForDay')}</span>
            </button>
            <button onClick={saveIntervalPlan} disabled={!newIntervalPlan.name.trim() || newIntervalPlan.exercises.length === 0} className="w-full bg-primary-500 hover:bg-primary-600 disabled:opacity-50 text-white rounded-2xl py-3.5 font-semibold transition-colors dark:bg-primary-500">{t('plans.savePlan')}</button>
          </>
        )}

        {/* Cardio Create */}
        {selectedArea === 'cardio' && (
          <>
            <div className="mb-4">
              <label className="text-sm font-medium text-slate-600 dark:text-slate-400 mb-1 block">{t('plans.cardioPlanName')}</label>
              <input type="text" value={newCardioPlan.name} onChange={(e) => setNewCardioPlan((p) => ({ ...p, name: e.target.value }))} placeholder={t('plans.enterCardioPlanName')} className="w-full px-4 py-2.5 rounded-xl bg-white dark:bg-surface-dark-alt border border-slate-200 dark:border-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-primary-400" />
            </div>
            <div className="flex flex-col gap-3 mb-4">
              {newCardioPlan.sessions.map((session, i) => (
                <div key={i} className="bg-white dark:bg-surface-dark-alt rounded-2xl p-4 shadow-sm">
                  <div className="flex items-center gap-2 mb-3">
                    <input type="text" value={session.name} onChange={(e) => updateSession(i, 'name', e.target.value)} placeholder={t('plans.enterSessionName')} className="flex-1 px-3 py-2 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-primary-400" />
                    <button onClick={() => removeSession(i)} className="p-2 text-slate-400 hover:text-red-500"><Trash2 className="w-4 h-4" /></button>
                  </div>
                  <div className="flex gap-2">
                    <select value={session.exerciseId} onChange={(e) => updateSession(i, 'exerciseId', e.target.value)} className="flex-1 px-3 py-2 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-primary-400">
                      <option value="">{t('plans.selectActivity')}</option>
                      {cardioExercises.map((ex) => (<option key={ex.id} value={ex.id}>{t(ex.nameKey)}</option>))}
                    </select>
                    <input type="number" value={session.targetDuration} onChange={(e) => updateSession(i, 'targetDuration', parseInt(e.target.value) || 0)} className="w-20 px-3 py-2 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm text-center focus:outline-none focus:ring-2 focus:ring-primary-400" />
                    <span className="self-center text-sm text-slate-400">{t('training.min')}</span>
                  </div>
                </div>
              ))}
            </div>
            <button onClick={addSession} className="w-full flex items-center justify-center gap-2 py-3 rounded-xl border-2 border-dashed border-slate-300 dark:border-slate-600 text-slate-500 dark:text-slate-400 hover:border-primary-400 hover:text-primary-500 transition-colors mb-4">
              <Plus className="w-4 h-4" /><span className="text-sm font-medium">{t('plans.addSession')}</span>
            </button>
            <button onClick={saveCardioPlan} disabled={!newCardioPlan.name.trim() || newCardioPlan.sessions.length === 0} className="w-full bg-primary-500 hover:bg-primary-600 disabled:opacity-50 text-white rounded-2xl py-3.5 font-semibold transition-colors dark:bg-primary-500">{t('plans.savePlan')}</button>
          </>
        )}
      </div>
    );
  }

  // ── Plan List View ──
  return (
    <div className="p-4 pb-24">
      <div className="flex items-center gap-3 mb-4">
        <button onClick={onBack} className="p-2 -ml-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h1 className="text-2xl font-bold">{t('plans.title')}</h1>
      </div>

      {/* Area Selector */}
      <div className="flex gap-2 overflow-x-auto pb-2 mb-4 scrollbar-hide">
        {areas.map((a) => (
          <FilterPill key={a.key} label={a.label} active={selectedArea === a.key} onClick={() => setSelectedArea(a.key)} />
        ))}
      </div>

      {/* Create Button */}
      <button onClick={() => setView('create')} className="w-full flex items-center justify-center gap-2 py-3 rounded-xl border-2 border-dashed border-slate-300 dark:border-slate-600 text-slate-500 dark:text-slate-400 hover:border-primary-400 hover:text-primary-500 transition-colors mb-4">
        <Plus className="w-5 h-5" /><span className="font-medium">{t('plans.createPlan')}</span>
      </button>

      {loading ? (
        <div className="text-center py-16"><Loader2 className="w-8 h-8 text-primary-600 animate-spin mx-auto" /></div>
      ) : (
        <>
          {/* Custom Plans */}
          {customPlans.length > 0 && (
            <div className="mb-6">
              <h2 className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-3">{t('plans.customPlans')}</h2>
              <div className="flex flex-col gap-4">
                {customPlans.map((plan) => (
                  <PlanCard
                    key={plan.id}
                    plan={plan}
                    type={selectedArea}
                    t={t}
                    onStart={selectedArea === 'strength' ? handleStartStrengthPlan : selectedArea === 'hiit' ? handleStartHiitPlan : selectedArea === 'circuit' ? handleStartCircuitPlan : selectedArea === 'martial-arts' ? handleStartMartialArtsPlan : handleStartCardioSession}
                    onDelete={() => setDeleteConfirm({ type: 'custom', id: plan.id })}
                    isCustom
                  />
                ))}
              </div>
            </div>
          )}

          {/* Default Plans */}
          {defaults.length > 0 && (
            <div className="flex flex-col gap-4 mb-6">
              {defaults.map((plan) => (
                <PlanCard
                  key={plan.id}
                  plan={plan}
                  type={selectedArea}
                  t={t}
                  onStart={selectedArea === 'strength' ? handleStartStrengthPlan : selectedArea === 'hiit' ? handleStartHiitPlan : selectedArea === 'circuit' ? handleStartCircuitPlan : selectedArea === 'martial-arts' ? handleStartMartialArtsPlan : handleStartCardioSession}
                  onDelete={() => setDeleteConfirm({ type: 'default', id: plan.id })}
                />
              ))}
            </div>
          )}

          {customPlans.length === 0 && defaults.length === 0 && (
            <div className="text-center py-12 text-slate-400 dark:text-slate-500">
              <p>{t('training.noHistory')}</p>
            </div>
          )}
        </>
      )}

      {/* Deleted Plans Link */}
      <button onClick={() => setView('deleted')} className="w-full flex items-center justify-center gap-2 py-3 text-sm text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors">
        <Trash2 className="w-4 h-4" /><span>{t('plans.deletedPlans')}</span>
      </button>

      {/* Delete Confirmation */}
      {deleteConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-surface-dark-alt rounded-2xl p-6 w-full max-w-sm shadow-xl">
            <p className="text-center font-semibold mb-2">{t('plans.deletePlan')}</p>
            <p className="text-center text-sm text-slate-500 dark:text-slate-400 mb-4">{t('plans.confirmDeletePlan')}</p>
            <div className="flex gap-3">
              <button onClick={() => setDeleteConfirm(null)} className="flex-1 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 font-medium text-sm">{t('common.cancel')}</button>
              <button onClick={() => deleteConfirm.type === 'custom' ? handleDeletePlan(deleteConfirm.id) : handleDeleteDefaultPlan(deleteConfirm.id)} className="flex-1 py-2.5 rounded-xl bg-red-500 hover:bg-red-600 text-white font-medium text-sm">{t('common.delete')}</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ── Plan Card Component ──────────────────────────────────────
function PlanCard({ plan, type, t, onStart, onDelete, isCustom }) {
  const weightUnit = localStorage.getItem('weightUnit') || 'kg';

  // Strength plans (days array)
  if (type === 'strength') {
    const days = Array.isArray(plan.days) ? plan.days : [];
    return (
      <div className="bg-white dark:bg-surface-dark-alt rounded-2xl p-4 shadow-sm">
        <div className="flex items-center justify-between mb-1">
          <h3 className="font-semibold text-lg">{isCustom ? plan.name : t(plan.nameKey)}</h3>
          <button onClick={onDelete} className="p-1.5 text-slate-400 hover:text-red-500"><Trash2 className="w-4 h-4" /></button>
        </div>
        {plan.descKey && <p className="text-sm text-slate-500 dark:text-slate-400 mb-3">{t(plan.descKey)}</p>}
        <div className="flex flex-col gap-2">
          {days.map((day, i) => (
            <button key={i} onClick={() => onStart(isCustom ? day.exercises.map((id) => ({ id, sets: 3, reps: 10 })) : day.exercises)} className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors">
              <span className="text-sm font-medium">{isCustom ? day.name : t(day.nameKey)}</span>
              <div className="flex items-center gap-1 text-xs text-slate-400">
                <span>{day.exercises.length} {t('training.exercises')}</span>
                <ChevronRight className="w-4 h-4" />
              </div>
            </button>
          ))}
        </div>
      </div>
    );
  }

  // HIIT / Circuit plans
  if (type === 'hiit' || type === 'circuit' || type === 'martial-arts') {
    const config = isCustom ? plan.days : plan;
    const exerciseIds = config.exercises || [];
    return (
      <div className="bg-white dark:bg-surface-dark-alt rounded-2xl p-4 shadow-sm">
        <div className="flex items-center justify-between mb-1">
          <h3 className="font-semibold text-lg">{isCustom ? plan.name : t(plan.nameKey)}</h3>
          <button onClick={onDelete} className="p-1.5 text-slate-400 hover:text-red-500"><Trash2 className="w-4 h-4" /></button>
        </div>
        {plan.descKey && <p className="text-sm text-slate-500 dark:text-slate-400 mb-2">{t(plan.descKey)}</p>}
        <div className="flex gap-3 text-sm text-slate-600 dark:text-slate-400 mb-3">
          <span>{config.rounds} {t('training.rounds')}</span>
          <span>·</span>
          <span>{config.workTime}s / {config.restTime}s</span>
          <span>·</span>
          <span>{exerciseIds.length} {t('training.exercises')}</span>
        </div>
        <div className="flex flex-wrap gap-1.5 mb-3">
          {exerciseIds.slice(0, 6).map((id) => {
            const ex = getExerciseById(id);
            return <span key={id} className="text-xs bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-400 px-2 py-0.5 rounded-md">{ex ? t(ex.nameKey) : id}</span>;
          })}
          {exerciseIds.length > 6 && <span className="text-xs text-slate-400">+{exerciseIds.length - 6}</span>}
        </div>
        <button onClick={() => onStart(isCustom ? { ...plan.days, name: plan.name } : plan)} className="w-full py-2.5 rounded-xl bg-primary-500 hover:bg-primary-600 text-white font-medium text-sm transition-colors dark:bg-primary-500">
          {t('plans.startPlan')}
        </button>
      </div>
    );
  }

  // Cardio plans
  if (type === 'cardio') {
    const sessions = isCustom ? (plan.days?.sessions || []) : (plan.sessions || []);
    return (
      <div className="bg-white dark:bg-surface-dark-alt rounded-2xl p-4 shadow-sm">
        <div className="flex items-center justify-between mb-1">
          <h3 className="font-semibold text-lg">{isCustom ? plan.name : t(plan.nameKey)}</h3>
          <button onClick={onDelete} className="p-1.5 text-slate-400 hover:text-red-500"><Trash2 className="w-4 h-4" /></button>
        </div>
        {plan.descKey && <p className="text-sm text-slate-500 dark:text-slate-400 mb-3">{t(plan.descKey)}</p>}
        <div className="flex flex-col gap-2">
          {sessions.map((session, i) => {
            const ex = getExerciseById(session.exerciseId);
            return (
              <button key={i} onClick={() => onStart(session)} className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors">
                <span className="text-sm font-medium">{session.name || (session.nameKey ? t(session.nameKey) : '')}</span>
                <div className="flex items-center gap-2 text-xs text-slate-400">
                  <span>{ex ? t(ex.nameKey) : ''}</span>
                  {session.targetDuration > 0 && <span>{Math.round(session.targetDuration / 60)} {t('training.min')}</span>}
                  <ChevronRight className="w-4 h-4" />
                </div>
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  return null;
}

// ── Number Stepper ───────────────────────────────────────────
function NumberStepper({ label, value, min, max, step, suffix = '', onChange }) {
  return (
    <div className="flex items-center justify-between">
      <span className="font-medium">{label}</span>
      <div className="flex items-center gap-3">
        <button onClick={() => onChange(Math.max(min, value - step))} className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center font-bold">-</button>
        <span className="w-12 text-center font-bold text-lg">{value}{suffix}</span>
        <button onClick={() => onChange(Math.min(max, value + step))} className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center font-bold">+</button>
      </div>
    </div>
  );
}

// ── Exercise Picker (enhanced) ───────────────────────────────
function ExercisePicker({ initialSelected, onBack, onConfirm, exerciseType = 'strength' }) {
  const { t } = useTranslation();
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState(initialSelected);

  const showAllTypes = exerciseType === 'all';
  const typeFilters = showAllTypes ? ['all', 'strength', 'hiit', 'circuit'] : null;

  const filtered = exercises.filter((ex) => {
    const exType = ex.type || 'strength';
    if (!showAllTypes && exType !== exerciseType) return false;
    if (showAllTypes && filter !== 'all') {
      if (['strength', 'hiit', 'circuit'].includes(filter)) {
        if (exType !== filter) return false;
      } else {
        // Muscle group filter (only applies to strength)
        if (ex.muscleGroup !== filter) return false;
      }
    }
    const name = t(ex.nameKey).toLowerCase();
    if (search && !name.includes(search.toLowerCase())) return false;
    return true;
  });

  const toggleSelect = (id) => setSelected((prev) => prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]);

  return (
    <div className="p-4 pb-24">
      <div className="flex items-center gap-3 mb-4">
        <button onClick={onBack} className="p-2 -ml-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800"><ArrowLeft className="w-5 h-5" /></button>
        <h1 className="text-2xl font-bold">{t('plans.selectExercisesForDay')}</h1>
      </div>

      <div className="relative mb-4">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
        <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search..." className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white dark:bg-surface-dark-alt border border-slate-200 dark:border-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-primary-400" />
      </div>

      <div className="flex gap-2 overflow-x-auto pb-2 mb-4 scrollbar-hide">
        {showAllTypes ? (
          <>
            <FilterPill label={t('plans.allExercises')} active={filter === 'all'} onClick={() => setFilter('all')} />
            <FilterPill label={t('training.strength')} active={filter === 'strength'} onClick={() => setFilter('strength')} />
            <FilterPill label={t('training.hiit')} active={filter === 'hiit'} onClick={() => setFilter('hiit')} />
            <FilterPill label={t('training.circuit')} active={filter === 'circuit'} onClick={() => setFilter('circuit')} />
          </>
        ) : (
          <>
            <FilterPill label={t('training.allMuscles')} active={filter === 'all'} onClick={() => setFilter('all')} />
            {muscleGroups.map((mg) => (
              <FilterPill key={mg} label={t(`muscleGroups.${mg}`)} active={filter === mg} onClick={() => setFilter(mg)} />
            ))}
          </>
        )}
      </div>

      <div className="flex flex-col gap-2">
        {filtered.map((ex) => (
          <button key={ex.id} onClick={() => toggleSelect(ex.id)} className={`bg-white dark:bg-surface-dark-alt rounded-xl p-3 text-left shadow-sm transition-all ${selected.includes(ex.id) ? 'ring-2 ring-primary-400' : ''}`}>
            <div className="flex items-center justify-between">
              <div className="flex-1 min-w-0">
                <p className="font-medium truncate">{t(ex.nameKey)}</p>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  {ex.muscleGroup ? `${t(`muscleGroups.${ex.muscleGroup}`)} · ${t(`equipment.${ex.equipment}`)}` : t(`training.${ex.type || 'strength'}`)}
                </p>
              </div>
              <div className={`w-5 h-5 rounded-full border-2 flex-shrink-0 ml-3 flex items-center justify-center ${selected.includes(ex.id) ? 'bg-primary-500 border-primary-500' : 'border-slate-300 dark:border-slate-600'}`}>
                {selected.includes(ex.id) && (
                  <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                )}
              </div>
            </div>
          </button>
        ))}
      </div>

      {selected.length > 0 && (
        <div className="fixed bottom-20 left-0 right-0 px-4 pb-2">
          <button onClick={() => onConfirm(selected)} className="w-full max-w-lg mx-auto block bg-primary-500 hover:bg-primary-600 text-white rounded-2xl py-3.5 font-semibold text-center shadow-lg transition-colors dark:bg-primary-500">{t('training.done')} ({selected.length})</button>
        </div>
      )}
    </div>
  );
}

function FilterPill({ label, active, onClick }) {
  return (
    <button onClick={onClick} className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors ${active ? 'bg-primary-600 text-white dark:bg-primary-500' : 'bg-white dark:bg-surface-dark-alt text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700'}`}>{label}</button>
  );
}
