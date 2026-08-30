import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { ArrowLeft, Plus, Trash2, Check, Dumbbell, Play, Zap, Pencil } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import {
  getWeeklySchedules, deleteWeeklySchedule, activateWeeklySchedule,
  getCustomPlans, deleteCustomPlan, getPlanType,
} from '../../data/workoutStorage';
import { getExerciseById } from '../../data/exercises';
import { PlanCard } from './TrainingPlans';
import Toast from '../../components/Toast';

const DAY_KEYS = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];

// Runden-Konfiguration eines HIIT-/Zirkel-/Kampfsport-Plans auslesen.
// Die Werte liegen je nach Herkunft direkt am Plan oder unter days.
function intervalConfig(plan) {
  return {
    rounds: plan.rounds || plan.days?.rounds,
    workTime: plan.workTime || plan.days?.workTime,
    restTime: plan.restTime || plan.days?.restTime,
    exercises: plan.exercises || plan.days?.exercises,
  };
}

export default function MyPlans({
  onBack, onCreate, onCreateSinglePlan, onEdit, onStartFreeWorkout,
  onStartPlan, onViewPlan, onStartHiit, onStartCircuit, onStartCardio, onStartMartialArts,
}) {
  const { t, i18n } = useTranslation();
  const { user } = useAuth();
  const lang = i18n.language?.startsWith('de') ? 'de' : 'en';
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [toast, setToast] = useState(null);
  // Eigene Einzelplaene lagen bisher unter „Trainingsplaene" — zwei Orte, die
  // beide „Plan" hiessen. Sie stehen jetzt hier, bei den uebrigen eigenen Plaenen.
  const [singlePlans, setSinglePlans] = useState([]);
  const [deleteSingleConfirm, setDeleteSingleConfirm] = useState(null);
  const [showCreateChoice, setShowCreateChoice] = useState(false);

  const DAY_SHORT = lang === 'de' ? ['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So'] : ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  useEffect(() => {
    if (user) loadPlans();
  }, [user]);

  async function loadPlans() {
    setLoading(true);
    const [weekly, singles] = await Promise.all([
      getWeeklySchedules(user.id),
      getCustomPlans(user.id),
    ]);
    setPlans(weekly);
    setSinglePlans(singles);
    setLoading(false);
  }

  async function handleDeleteSingle(planId) {
    setDeleteSingleConfirm(null);
    try {
      await deleteCustomPlan(user.id, planId);
      setSinglePlans((prev) => prev.filter((p) => p.id !== planId));
    } catch (err) {
      console.error('Failed to delete plan:', err);
      setToast({
        variant: 'error',
        message: lang === 'de' ? 'Der Plan konnte nicht gelöscht werden.' : 'The plan could not be deleted.',
      });
    }
  }

  function startSinglePlan(plan, type, arg) {
    if (type === 'strength') {
      onStartPlan?.(arg);
    } else if (type === 'hiit') {
      onStartHiit?.(intervalConfig(plan));
    } else if (type === 'circuit') {
      onStartCircuit?.(intervalConfig(plan));
    } else if (type === 'martial-arts') {
      onStartMartialArts?.(intervalConfig(plan));
    } else if (type === 'cardio') {
      const activity = getExerciseById(arg?.exerciseId);
      if (activity) onStartCardio?.(activity);
    }
  }

  async function handleDelete(planId) {
    setDeleteConfirm(null);
    try {
      await deleteWeeklySchedule(user.id, planId);
      setPlans((prev) => prev.filter((p) => p.id !== planId));
    } catch (err) {
      console.error('Failed to delete plan:', err);
      setToast({
        variant: 'error',
        message: lang === 'de' ? 'Der Plan konnte nicht gelöscht werden.' : 'The plan could not be deleted.',
      });
    }
  }

  async function handleActivate(plan) {
    // Früher lief das über saveWeeklySchedule() — das legt immer neu an und
    // erzeugte bei jedem Aktivieren ein Duplikat.
    try {
      const { error } = await activateWeeklySchedule(user.id, plan.id);
      if (error) throw error;
      await loadPlans();
    } catch (err) {
      console.error('Failed to activate plan:', err);
      setToast({
        variant: 'error',
        message: lang === 'de' ? 'Der Plan konnte nicht aktiviert werden.' : 'The plan could not be activated.',
      });
    }
  }

  return (
    <div className="p-4 pt-16 pb-24">
      {toast && <Toast variant={toast.variant} message={toast.message} onDismiss={() => setToast(null)} />}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <button onClick={onBack} className="p-2 -ml-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-2xl font-bold">{lang === 'de' ? 'Meine Pläne' : 'My Plans'}</h1>
        </div>
        <button onClick={() => setShowCreateChoice(true)} className="p-2 rounded-xl bg-primary-500 text-white">
          <Plus className="w-5 h-5" />
        </button>
      </div>

      {/* Free Workout Button */}
      <button
        onClick={onStartFreeWorkout}
        className="w-full bg-white dark:bg-surface-dark-alt rounded-2xl p-4 shadow-soft border border-slate-100 dark:border-slate-800/60 mb-4 flex items-center gap-4 hover:shadow-md transition-shadow"
      >
        <div className="w-12 h-12 rounded-xl bg-green-100 dark:bg-green-900/20 flex items-center justify-center">
          <Zap className="w-6 h-6 text-green-500" />
        </div>
        <div className="flex-1 text-left">
          <p className="text-base font-semibold text-slate-900 dark:text-white">
            {lang === 'de' ? 'Freies Training' : 'Free Workout'}
          </p>
          <p className="text-xs text-slate-400 mt-0.5">
            {lang === 'de' ? 'Wähle Übungen frei aus und starte sofort' : 'Choose exercises freely and start right away'}
          </p>
        </div>
        <Play className="w-5 h-5 text-green-500" />
      </button>

      {/* Saved Plans */}
      {loading ? (
        <p className="text-center text-sm text-slate-400 py-8">{t('common.loading')}</p>
      ) : plans.length === 0 && singlePlans.length === 0 ? (
        <div className="text-center py-12">
          <Dumbbell className="w-12 h-12 text-slate-300 dark:text-slate-600 mx-auto mb-3" />
          <p className="text-slate-500 dark:text-slate-400 mb-4">
            {lang === 'de' ? 'Noch keine Pläne erstellt.' : 'No plans created yet.'}
          </p>
          <button onClick={() => setShowCreateChoice(true)} className="px-6 py-3 bg-primary-500 text-white font-semibold rounded-2xl">
            {lang === 'de' ? 'Plan erstellen' : 'Create Plan'}
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          {plans.length > 0 && (
            <h2 className="text-sm font-medium text-slate-500 dark:text-slate-400">
              {lang === 'de' ? 'Wochenpläne' : 'Weekly plans'}
            </h2>
          )}
          {plans.map((plan) => (
            <div key={plan.id} className={`bg-white dark:bg-surface-dark-alt rounded-2xl p-4 shadow-soft border border-slate-100 dark:border-slate-800/60 ${plan.is_active ? 'ring-2 ring-primary-400' : ''}`}>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-semibold text-slate-900 dark:text-white">{plan.name}</p>
                  {plan.is_active && (
                    <span className="px-2 py-0.5 rounded-full bg-primary-100 dark:bg-primary-900/30 text-[10px] font-semibold text-primary-600 dark:text-primary-400">
                      {lang === 'de' ? 'Aktiv' : 'Active'}
                    </span>
                  )}
                </div>
                <div className="flex gap-1">
                  <button onClick={() => onEdit(plan)} className="p-1.5 text-slate-400 hover:text-primary-500">
                    <Pencil className="w-4 h-4" />
                  </button>
                  {!plan.is_active && (
                    <button onClick={() => handleActivate(plan)} className="p-1.5 text-slate-400 hover:text-green-500">
                      <Check className="w-4 h-4" />
                    </button>
                  )}
                  <button onClick={() => setDeleteConfirm(plan)} className="p-1.5 text-slate-400 hover:text-red-500">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Day dots */}
              <div className="flex gap-1.5">
                {DAY_KEYS.map((key, i) => {
                  const hasTraining = plan.days?.[key] !== null && plan.days?.[key] !== undefined;
                  return (
                    <div key={key} className="flex flex-col items-center gap-0.5">
                      <span className="text-[9px] text-slate-400">{DAY_SHORT[i]}</span>
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[9px] font-bold ${
                        hasTraining
                          ? 'bg-primary-500 text-white'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-400'
                      }`}>
                        {hasTraining ? '✓' : '–'}
                      </div>
                    </div>
                  );
                })}
              </div>

              <p className="text-xs text-slate-400 mt-2">
                {plan.sessions_per_week}x / {lang === 'de' ? 'Woche' : 'week'}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* Eigene Einzelpläne (früher unter „Trainingspläne") */}
      {!loading && singlePlans.length > 0 && (
        <div className="mt-6">
          <h2 className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-3">
            {lang === 'de' ? 'Einzelne Trainingspläne' : 'Single workout plans'}
          </h2>
          <div className="flex flex-col gap-4">
            {singlePlans.map((plan) => {
              const type = getPlanType(plan);
              return (
                <PlanCard
                  key={plan.id}
                  plan={plan}
                  type={type}
                  t={t}
                  isCustom
                  onStart={(arg) => startSinglePlan(plan, type, arg)}
                  onView={type === 'strength' && onViewPlan
                    ? (p, dayIdx) => onViewPlan({
                        id: p.id,
                        name: p.name,
                        days: Array.isArray(p.days)
                          ? p.days.map((d) => ({
                              name: d.name,
                              exercises: (d.exercises || []).map((e) => (typeof e === 'object' ? (e.id || e) : e)),
                            }))
                          : [],
                      }, dayIdx)
                    : null}
                  onDelete={() => setDeleteSingleConfirm(plan)}
                />
              );
            })}
          </div>
        </div>
      )}

      {/* Was soll entstehen? Bisher gab es zwei Erstellen-Knoepfe an zwei Orten. */}
      {showCreateChoice && (
        <div className="fixed inset-0 bg-black/50 z-[80] flex items-end" onClick={() => setShowCreateChoice(false)}>
          <div className="w-full bg-white dark:bg-surface-dark-alt rounded-t-3xl p-6 pb-8" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-lg font-bold mb-1">
              {lang === 'de' ? 'Was möchtest du erstellen?' : 'What do you want to create?'}
            </h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-5">
              {lang === 'de'
                ? 'Beides findest du danach hier unter „Meine Pläne".'
                : 'Both will appear here under "My Plans".'}
            </p>
            <button
              onClick={() => { setShowCreateChoice(false); onCreate(); }}
              className="w-full text-left p-4 mb-3 rounded-2xl border-2 border-slate-200 dark:border-slate-700 hover:border-primary-400 transition-colors"
            >
              <p className="font-semibold text-slate-900 dark:text-white">
                {lang === 'de' ? 'Wochenplan' : 'Weekly plan'}
              </p>
              <p className="text-xs text-slate-400 mt-0.5">
                {lang === 'de'
                  ? 'Feste Trainingstage pro Woche — erscheint im Kalender.'
                  : 'Fixed training days per week — shows up in the calendar.'}
              </p>
            </button>
            <button
              onClick={() => { setShowCreateChoice(false); onCreateSinglePlan?.(); }}
              className="w-full text-left p-4 mb-4 rounded-2xl border-2 border-slate-200 dark:border-slate-700 hover:border-primary-400 transition-colors"
            >
              <p className="font-semibold text-slate-900 dark:text-white">
                {lang === 'de' ? 'Einzelner Trainingsplan' : 'Single workout plan'}
              </p>
              <p className="text-xs text-slate-400 mt-0.5">
                {lang === 'de'
                  ? 'Eine Übungsliste zum direkten Starten — auch Cardio, HIIT oder Zirkel.'
                  : 'One exercise list to start right away — also cardio, HIIT or circuit.'}
              </p>
            </button>
            <button
              onClick={() => setShowCreateChoice(false)}
              className="w-full py-3 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-500 text-sm font-medium"
            >
              {t('common.cancel')}
            </button>
          </div>
        </div>
      )}

      {/* Einzelplan löschen bestätigen */}
      {deleteSingleConfirm && (
        <div className="fixed inset-0 bg-black/50 z-[80] flex items-center justify-center p-6" onClick={() => setDeleteSingleConfirm(null)}>
          <div className="bg-white dark:bg-surface-dark-alt rounded-2xl p-6 w-full max-w-sm" onClick={(e) => e.stopPropagation()}>
            <p className="text-base font-semibold mb-2">
              {lang === 'de' ? 'Plan löschen?' : 'Delete plan?'}
            </p>
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-5">
              {lang === 'de'
                ? `„${deleteSingleConfirm.name}" wird entfernt.`
                : `"${deleteSingleConfirm.name}" will be removed.`}
            </p>
            <div className="flex flex-col gap-2">
              <button
                onClick={() => handleDeleteSingle(deleteSingleConfirm.id)}
                className="w-full py-3 bg-red-500 hover:bg-red-600 text-white rounded-xl text-sm font-semibold"
              >
                {lang === 'de' ? 'Löschen' : 'Delete'}
              </button>
              <button
                onClick={() => setDeleteSingleConfirm(null)}
                className="w-full py-3 border border-slate-200 dark:border-slate-700 text-slate-500 rounded-xl text-sm font-medium"
              >
                {t('common.cancel')}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Löschen bestätigen — vorher verschwand der Plan mit einem Fehltipp */}
      {deleteConfirm && (
        <div className="fixed inset-0 bg-black/50 z-[80] flex items-center justify-center p-6" onClick={() => setDeleteConfirm(null)}>
          <div className="bg-white dark:bg-surface-dark-alt rounded-2xl p-6 w-full max-w-sm" onClick={(e) => e.stopPropagation()}>
            <p className="text-base font-semibold mb-2">
              {lang === 'de' ? 'Plan löschen?' : 'Delete plan?'}
            </p>
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-5">
              {lang === 'de'
                ? `„${deleteConfirm.name}" wird dauerhaft entfernt.`
                : `"${deleteConfirm.name}" will be removed permanently.`}
            </p>
            <div className="flex flex-col gap-2">
              <button
                onClick={() => handleDelete(deleteConfirm.id)}
                className="w-full py-3 bg-red-500 hover:bg-red-600 text-white rounded-xl text-sm font-semibold"
              >
                {lang === 'de' ? 'Löschen' : 'Delete'}
              </button>
              <button
                onClick={() => setDeleteConfirm(null)}
                className="w-full py-3 border border-slate-200 dark:border-slate-700 text-slate-500 rounded-xl text-sm font-medium"
              >
                {t('common.cancel')}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
