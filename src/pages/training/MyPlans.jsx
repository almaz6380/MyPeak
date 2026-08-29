import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { ArrowLeft, Plus, Trash2, Check, Dumbbell, Play, Zap, Pencil } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { getWeeklySchedules, deleteWeeklySchedule, setActiveSchedule } from '../../data/workoutStorage';
import Toast from '../../components/Toast';

const DAY_KEYS = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];
const JS_DAY_KEYS = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];

export default function MyPlans({ onBack, onCreate, onEdit, onStartFreeWorkout, onStartDay, initialToastMessage = null, onToastDone, onChanged }) {
  const { t, i18n } = useTranslation();
  const { user } = useAuth();
  const lang = i18n.language?.startsWith('de') ? 'de' : 'en';
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [confirmDelete, setConfirmDelete] = useState(null); // Plan-Objekt
  const [toast, setToast] = useState(initialToastMessage);

  const DAY_SHORT = lang === 'de' ? ['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So'] : ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const todayKey = JS_DAY_KEYS[new Date().getDay()];

  useEffect(() => {
    if (user) loadPlans();
  }, [user]);

  async function loadPlans() {
    setLoading(true);
    const data = await getWeeklySchedules(user?.id || 'guest');
    setPlans(data);
    setLoading(false);
  }

  async function handleDelete(plan) {
    setConfirmDelete(null);
    await deleteWeeklySchedule(user?.id || 'guest', plan.id);
    setPlans((prev) => prev.filter((p) => p.id !== plan.id));
    onChanged?.();
  }

  async function handleActivate(plan) {
    // is_active flippen — kein Neu-Insert (der alte Weg duplizierte den Plan)
    await setActiveSchedule(user?.id || 'guest', plan.id);
    setToast(t('planBuilder.activated'));
    loadPlans();
    onChanged?.();
  }

  // Heutiger Tag eines Plans, wenn er als Kraft-Workout direkt startbar ist
  function todayStartableDay(plan) {
    const day = plan.days?.[todayKey];
    return day?.type === 'strength' && day.exercises?.length > 0 ? day : null;
  }

  return (
    <div className="p-4 pt-16 pb-24">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <button onClick={onBack} className="p-2 -ml-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-2xl font-bold">{lang === 'de' ? 'Meine Pläne' : 'My Plans'}</h1>
        </div>
        <button onClick={onCreate} className="p-2 rounded-xl bg-primary-500 text-white">
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
      ) : plans.length === 0 ? (
        <div className="text-center py-12">
          <Dumbbell className="w-12 h-12 text-slate-300 dark:text-slate-600 mx-auto mb-3" />
          <p className="text-slate-500 dark:text-slate-400 mb-4">
            {lang === 'de' ? 'Noch keine Pläne erstellt.' : 'No plans created yet.'}
          </p>
          <button onClick={onCreate} className="px-6 py-3 bg-primary-500 text-white font-semibold rounded-2xl">
            {lang === 'de' ? 'Plan erstellen' : 'Create Plan'}
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          {plans.map((plan) => {
            const startDay = todayStartableDay(plan);
            return (
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
                    <button onClick={() => setConfirmDelete(plan)} className="p-1.5 text-slate-400 hover:text-red-500">
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

                <div className="flex items-center justify-between mt-2">
                  <p className="text-xs text-slate-400">
                    {plan.sessions_per_week}x / {lang === 'de' ? 'Woche' : 'week'}
                  </p>
                  {startDay && onStartDay && (
                    <button
                      onClick={() => onStartDay(startDay, plan.name)}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-primary-500 hover:bg-primary-600 text-white text-xs font-semibold"
                    >
                      <Play className="w-3.5 h-3.5" />
                      {t('planBuilder.startToday')}
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Lösch-Bestätigung — Hard-Delete, deshalb nie ohne Nachfrage */}
      {confirmDelete && (
        <div className="fixed inset-0 bg-black/50 z-[70] flex items-center justify-center p-4" onClick={() => setConfirmDelete(null)}>
          <div className="bg-white dark:bg-surface-dark-alt rounded-2xl w-full max-w-sm shadow-xl p-5" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-lg font-bold mb-2">{t('planBuilder.deleteTitle')}</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-5">
              {t('planBuilder.deleteBody', { name: confirmDelete.name })}
            </p>
            <div className="flex gap-2">
              <button
                onClick={() => setConfirmDelete(null)}
                className="flex-1 py-3 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 text-sm font-medium"
              >
                {t('common.cancel')}
              </button>
              <button
                onClick={() => handleDelete(confirmDelete)}
                className="flex-1 py-3 rounded-xl bg-red-500 hover:bg-red-600 text-white text-sm font-semibold"
              >
                {t('common.delete')}
              </button>
            </div>
          </div>
        </div>
      )}

      {toast && (
        <Toast
          message={toast}
          variant="success"
          onDismiss={() => { setToast(null); onToastDone?.(); }}
        />
      )}
    </div>
  );
}
