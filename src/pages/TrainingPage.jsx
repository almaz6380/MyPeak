import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Dumbbell, Plus, History, ClipboardList, Trophy, ArrowLeft, ChevronRight } from 'lucide-react';
import ExerciseLibrary from './training/ExerciseLibrary';
import ActiveWorkout from './training/ActiveWorkout';
import WorkoutHistory from './training/WorkoutHistory';
import TrainingPlans, { defaultPlans } from './training/TrainingPlans';
import { getExerciseById } from '../data/exercises';
import { getCustomPlans } from '../data/workoutStorage';
import { getHiddenDefaultPlans, getPermanentDeletedDefaultPlans } from '../data/settingsStorage';
import { useAuth } from '../context/AuthContext';

export default function TrainingPage() {
  const { t } = useTranslation();
  const { user } = useAuth();
  const [view, setView] = useState('home');
  const [workoutExercises, setWorkoutExercises] = useState([]);
  const [prNotification, setPrNotification] = useState(null);

  const startWorkout = () => {
    setView('startChoice');
  };

  const startEmptyWorkout = () => {
    setWorkoutExercises([]);
    setView('selectForWorkout');
  };

  const handleExercisesSelected = (exercises) => {
    setWorkoutExercises((prev) => [...prev, ...exercises]);
    setView('activeWorkout');
  };

  const handleAddMoreExercises = () => {
    setView('selectForWorkout');
  };

  const handleFinishWorkout = (prs) => {
    if (Object.keys(prs).length > 0) {
      setPrNotification(prs);
      setTimeout(() => setPrNotification(null), 3000);
    }
    setWorkoutExercises([]);
    setView('home');
  };

  const handleDiscardWorkout = () => {
    setWorkoutExercises([]);
    setView('home');
  };

  const handleStartPlan = (planExercises) => {
    // planExercises: array of { id, sets, reps }
    const enriched = planExercises
      .map((pe) => {
        const ex = getExerciseById(pe.id);
        if (!ex) return null;
        return { ...ex, presetSets: pe.sets, presetReps: pe.reps };
      })
      .filter(Boolean);
    setWorkoutExercises(enriched);
    setView('activeWorkout');
  };

  if (view === 'startChoice') {
    return <WorkoutStartChooser onBack={() => setView('home')} onStartPlan={handleStartPlan} onStartEmpty={startEmptyWorkout} />;
  }

  if (view === 'exercises') {
    return <ExerciseLibrary onBack={() => setView('home')} />;
  }

  if (view === 'selectForWorkout') {
    return (
      <ExerciseLibrary
        onBack={() => workoutExercises.length > 0 ? setView('activeWorkout') : setView('home')}
        onSelect={handleExercisesSelected}
        selectionMode
      />
    );
  }

  if (view === 'activeWorkout') {
    return (
      <ActiveWorkout
        initialExercises={workoutExercises}
        onFinish={handleFinishWorkout}
        onDiscard={handleDiscardWorkout}
        onAddExercise={handleAddMoreExercises}
      />
    );
  }

  if (view === 'history') {
    return <WorkoutHistory onBack={() => setView('home')} />;
  }

  if (view === 'plans') {
    return <TrainingPlans onBack={() => setView('home')} onStartPlan={handleStartPlan} />;
  }

  return (
    <div className="p-4 pb-24">
      <h1 className="text-2xl font-bold mb-6">{t('training.title')}</h1>

      {prNotification && (
        <div className="bg-amber-50 dark:bg-amber-900/30 border border-amber-200 dark:border-amber-800 rounded-2xl p-4 mb-4 flex items-center gap-3 animate-pulse">
          <Trophy className="w-6 h-6 text-amber-500" />
          <span className="font-semibold text-amber-700 dark:text-amber-400">{t('training.newPR')}</span>
        </div>
      )}

      <button
        onClick={startWorkout}
        className="w-full bg-primary-600 hover:bg-primary-700 text-white rounded-2xl p-4 flex items-center justify-center gap-3 text-lg font-semibold transition-colors mb-6 dark:bg-primary-500 dark:hover:bg-primary-600"
      >
        <Plus className="w-6 h-6" />
        {t('training.startWorkout')}
      </button>

      <div className="grid grid-cols-2 gap-3">
        <QuickAction icon={<ClipboardList className="w-6 h-6" />} label={t('training.plans')} onClick={() => setView('plans')} />
        <QuickAction icon={<Dumbbell className="w-6 h-6" />} label={t('training.exercises')} onClick={() => setView('exercises')} />
        <QuickAction icon={<History className="w-6 h-6" />} label={t('training.history')} onClick={() => setView('history')} className="col-span-2" />
      </div>
    </div>
  );
}

function QuickAction({ icon, label, onClick, className = '' }) {
  return (
    <button
      onClick={onClick}
      className={`bg-white dark:bg-surface-dark-alt rounded-2xl p-4 flex items-center gap-3 text-left shadow-sm hover:shadow-md transition-shadow ${className}`}
    >
      <span className="text-primary-500">{icon}</span>
      <span className="font-medium">{label}</span>
    </button>
  );
}

function WorkoutStartChooser({ onBack, onStartPlan, onStartEmpty }) {
  const { t } = useTranslation();
  const { user } = useAuth();
  const [showPlans, setShowPlans] = useState(false);
  const [customPlans, setCustomPlans] = useState([]);
  const [hiddenDefaults, setHiddenDefaults] = useState([]);

  useEffect(() => {
    if (user) {
      getCustomPlans(user.id).then(setCustomPlans);
    }
    setHiddenDefaults(getHiddenDefaultPlans());
  }, [user]);

  const permaDeleted = getPermanentDeletedDefaultPlans();
  const visibleDefaultPlans = defaultPlans.filter((p) => !hiddenDefaults.includes(p.id) && !permaDeleted.includes(p.id));

  if (showPlans) {
    return (
      <div className="p-4 pb-24">
        <div className="flex items-center gap-3 mb-6">
          <button onClick={() => setShowPlans(false)} className="p-2 -ml-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-2xl font-bold">{t('training.choosePlanDay')}</h1>
        </div>

        {/* Custom Plans */}
        {customPlans.length > 0 && (
          <div className="mb-6">
            <h2 className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-3">{t('plans.customPlans')}</h2>
            <div className="flex flex-col gap-4">
              {customPlans.map((plan) => (
                <div key={plan.id} className="bg-white dark:bg-surface-dark-alt rounded-2xl p-4 shadow-sm">
                  <h3 className="font-semibold text-lg mb-3">{plan.name}</h3>
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
          <div className="flex flex-col gap-4">
            {visibleDefaultPlans.map((plan) => (
              <div key={plan.id} className="bg-white dark:bg-surface-dark-alt rounded-2xl p-4 shadow-sm">
                <h3 className="font-semibold text-lg mb-1">{t(plan.nameKey)}</h3>
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
      </div>
    );
  }

  return (
    <div className="p-4 pb-24">
      <div className="flex items-center gap-3 mb-6">
        <button onClick={onBack} className="p-2 -ml-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h1 className="text-2xl font-bold">{t('training.chooseWorkoutType')}</h1>
      </div>

      <div className="flex flex-col gap-4">
        <button
          onClick={() => setShowPlans(true)}
          className="bg-white dark:bg-surface-dark-alt rounded-2xl p-5 text-left shadow-sm hover:shadow-md transition-shadow"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-primary-50 dark:bg-primary-900/30 flex items-center justify-center">
              <ClipboardList className="w-6 h-6 text-primary-500" />
            </div>
            <div className="flex-1">
              <p className="font-semibold text-lg">{t('training.fromPlan')}</p>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">{t('training.fromPlanDesc')}</p>
            </div>
            <ChevronRight className="w-5 h-5 text-slate-400" />
          </div>
        </button>

        <div className="flex items-center gap-3 px-4">
          <div className="flex-1 h-px bg-slate-200 dark:bg-slate-700" />
          <span className="text-xs font-medium text-slate-400 dark:text-slate-500 uppercase">{t('training.or')}</span>
          <div className="flex-1 h-px bg-slate-200 dark:bg-slate-700" />
        </div>

        <button
          onClick={onStartEmpty}
          className="bg-white dark:bg-surface-dark-alt rounded-2xl p-5 text-left shadow-sm hover:shadow-md transition-shadow"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-green-50 dark:bg-green-900/30 flex items-center justify-center">
              <Plus className="w-6 h-6 text-green-500" />
            </div>
            <div className="flex-1">
              <p className="font-semibold text-lg">{t('training.emptyWorkoutOption')}</p>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">{t('training.emptyWorkoutDesc')}</p>
            </div>
            <ChevronRight className="w-5 h-5 text-slate-400" />
          </div>
        </button>
      </div>
    </div>
  );
}
