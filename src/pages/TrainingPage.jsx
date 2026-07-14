import { useState, useEffect, lazy, Suspense } from 'react';
import { useTranslation } from 'react-i18next';
import { Dumbbell, Plus, History, ClipboardList, Trophy, ArrowLeft, ChevronRight, Heart, Zap, RefreshCw, X, Search, Play, Users, Swords, Medal, Moon } from 'lucide-react';
import ExerciseLibrary from './training/ExerciseLibrary';
import ActiveWorkout from './training/ActiveWorkout';
import ActiveCardio from './training/ActiveCardio';
import ActiveStructuredCardio from './training/ActiveStructuredCardio';
import ActiveHiit from './training/ActiveHiit';
import ActiveCircuit from './training/ActiveCircuit';
import ActiveMartialArts from './training/ActiveMartialArts';
import WorkoutHistory from './training/WorkoutHistory';
import TrainingPlans, { defaultPlans } from './training/TrainingPlans';
import FriendsList from './training/FriendsList';
import Leaderboard from './training/Leaderboard';
import ChallengesList from './training/ChallengesList';
import exercises, { getExerciseById, getExercisesByType } from '../data/exercises';
import { getCustomPlans, getCustomPlansByType, saveCustomPlan, getActiveSchedule, getScheduledDaysForMonth, getWorkouts, deactivateAllSchedules } from '../data/workoutStorage';
import { resolveScheduledDay } from '../data/programResolver';
import { getHiddenDefaultPlans, getPermanentDeletedDefaultPlans } from '../data/settingsStorage';
import { useAuth } from '../context/AuthContext';
import { useActiveWorkout } from '../context/ActiveWorkoutContext';
import MuscleGroupIcon from '../components/icons/MuscleGroupIcon';
import WeeklySummaryBanner from '../components/progress/WeeklySummaryBanner';
import MuscleHeatmapCard from '../components/progress/MuscleHeatmapCard';
import MyPeakLogo from '../components/MyPeakLogo';
import Toast from '../components/Toast';
import DiamondCalendar from '../components/DiamondCalendar';
import WeeklyPlanBuilder from './training/WeeklyPlanBuilder';
import MyPlans from './training/MyPlans';
import PlanDetail from './training/PlanDetail';

// Lazy: hält die (großen) Programmdaten aus dem Hauptbundle
const PeakPrograms = lazy(() => import('./training/PeakPrograms'));
import { todayLocal, toLocalDateString } from '../lib/dateUtils';

export default function TrainingPage() {
  const { t, i18n } = useTranslation();
  const { user, profile } = useAuth();
  const activeWorkout = useActiveWorkout();
  const hasValidWorkout = activeWorkout.isActive && activeWorkout.workout?.exercises?.length > 0;
  const [view, setView] = useState(hasValidWorkout ? 'activeWorkout' : 'home');
  const [prNotification, setPrNotification] = useState(null);
  const [toast, setToast] = useState(null); // { variant, message }
  const [cardioActivity, setCardioActivity] = useState(null);
  const [structuredSession, setStructuredSession] = useState(null);
  const [todaySession, setTodaySession] = useState(null);
  const [activeSchedule, setActiveSchedule] = useState(null);
  const [confirmEndProgram, setConfirmEndProgram] = useState(false);
  const [hiitConfig, setHiitConfig] = useState(null);
  const [circuitConfig, setCircuitConfig] = useState(null);
  const [martialArtsConfig, setMartialArtsConfig] = useState(null);
  const [editingPlan, setEditingPlan] = useState(null);
  const [viewingPlan, setViewingPlan] = useState(null);
  const [viewingDayIndex, setViewingDayIndex] = useState(0);
  const [planDetailExercises, setPlanDetailExercises] = useState(null); // persisted exercise list for PlanDetail

  // Diamond Calendar state
  const [selectedDate, setSelectedDate] = useState(todayLocal());
  const [scheduledDays, setScheduledDays] = useState(new Set());
  const [completedDays, setCompletedDays] = useState(new Set());
  const [showTrainingCalendar, setShowTrainingCalendar] = useState(false);
  const lang = i18n.language?.startsWith('de') ? 'de' : 'en';

  useEffect(() => {
    if (user) loadCalendarData();
  }, [user, selectedDate]);

  async function loadCalendarData() {
    const [schedule, workouts] = await Promise.all([
      getActiveSchedule(user.id),
      getWorkouts(user.id),
    ]);

    // Scheduled days from weekly plan (date strings)
    const DAY_KEYS = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];
    const scheduled = new Set();
    if (schedule?.days) {
      // Check ±30 days around selected date
      for (let offset = -30; offset <= 30; offset++) {
        const d = new Date(selectedDate + 'T12:00:00');
        d.setDate(d.getDate() + offset);
        const dayKey = DAY_KEYS[d.getDay()];
        if (schedule.days[dayKey]) {
          scheduled.add(toLocalDateString(d));
        }
      }
    }
    setScheduledDays(scheduled);
    setActiveSchedule(schedule || null);

    // Heutige Session aus dem aktiven Plan auflösen (inkl. Wochen-Progression)
    try {
      const todayKey = DAY_KEYS[new Date().getDay()];
      const resolved = await resolveScheduledDay(schedule, todayKey);
      setTodaySession(resolved);
    } catch (e) {
      setTodaySession(null);
    }

    // Completed days from workout history (normalize to YYYY-MM-DD)
    const completed = new Set();
    (workouts || []).forEach((w) => {
      if (w.date) {
        // Handle both ISO timestamps and date-only strings
        const dateStr = w.date.length > 10 ? w.date.split('T')[0] : w.date;
        completed.add(dateStr);
      }
    });
    setCompletedDays(completed);
  }

  const startWorkout = () => {
    setView('startChoice');
  };

  const startEmptyWorkout = () => {
    setView('selectForWorkout');
  };

  const handleExercisesSelected = (selectedExercises) => {
    if (activeWorkout.isActive) {
      // Workout already running — add exercises to context
      activeWorkout.addExercises(selectedExercises);
    } else {
      // Start new workout with selected exercises
      const mapped = selectedExercises.map((ex) => ({
        exerciseId: ex.id,
        nameKey: ex.nameKey,
        sets: [{ reps: '', weight: '' }],
      }));
      activeWorkout.startWorkout('strength', mapped);
    }
    setView('activeWorkout');
  };

  const handleAddMoreExercises = () => {
    setView('selectForWorkout');
  };

  const handleFinishWorkout = (prs) => {
    if (prs && Object.keys(prs).length > 0) {
      setPrNotification(prs);
      setTimeout(() => setPrNotification(null), 3000);
    }
    setView('home');
  };

  const handleDiscardWorkout = () => {
    setView('home');
  };

  const handleStartPlan = (planExercises, planId, planName) => {
    const enriched = planExercises
      .map((pe) => {
        const ex = getExerciseById(pe.id);
        if (!ex) return null;
        return {
          exerciseId: ex.id,
          nameKey: ex.nameKey,
          sets: Array.from({ length: pe.sets || 3 }, () => ({ reps: String(pe.reps || ''), weight: '' })),
        };
      })
      .filter(Boolean);
    activeWorkout.startWorkout('strength', enriched, null, {
      fromPlan: true,
      planId: planId || null,
      planName: planName || null,
    });
    setView('activeWorkout');
  };

  const handleStartCardio = (activity) => {
    setCardioActivity(activity);
    setView('activeCardio');
  };

  const handleStartHiit = (config) => {
    setHiitConfig(config);
    setView('activeHiit');
  };

  const handleStartCircuit = (config) => {
    setCircuitConfig(config);
    setView('activeCircuit');
  };

  const handleStartMartialArts = (config) => {
    setMartialArtsConfig(config);
    setView('activeMartialArts');
  };

  const handleFinishCardioHiitCircuit = () => {
    setView('home');
  };

  // „Heute"-Session aus dem aktiven Wochenplan starten — Dispatch nach Tages-Typ
  const startTodaySession = () => {
    const day = todaySession;
    if (!day) return;
    if (day.type === 'strength' && Array.isArray(day.exercises) && day.exercises.length > 0) {
      handleStartPlan(day.exercises, null, day.label || null);
    } else if (day.type === 'cardio' && Array.isArray(day.segments) && day.segments.length > 0) {
      setStructuredSession(day);
      setView('activeStructuredCardio');
    } else if (day.type === 'cardio' && day.exerciseId) {
      const ex = getExerciseById(day.exerciseId);
      if (ex) handleStartCardio(ex);
    } else if (day.type === 'hiit' && day.rounds) {
      handleStartHiit({ rounds: day.rounds, workTime: day.workTime, restTime: day.restTime, exercises: day.exercises || [] });
    } else if (day.type === 'martial_arts' && day.rounds) {
      handleStartMartialArts({ rounds: day.rounds, workTime: day.workTime, restTime: day.restTime, exercises: day.exercises || [] });
    }
  };

  // Aktives Programm/Plan beenden = deaktivieren (bleibt in „Meine Pläne")
  const endActiveProgram = async () => {
    setConfirmEndProgram(false);
    await deactivateAllSchedules(user?.id || 'guest');
    await loadCalendarData();
    setToast({
      variant: 'success',
      message: lang === 'de'
        ? 'Programm beendet — du findest es weiter unter „Meine Pläne".'
        : 'Program ended — you can find it under "My Plans".',
    });
  };

  // Kann die Heute-Session direkt gestartet werden? (Custom-'split'-Tage z. B. nicht)
  const todayStartable = !!todaySession && (
    (todaySession.type === 'strength' && todaySession.exercises?.length > 0)
    || (todaySession.type === 'cardio' && (todaySession.segments?.length > 0 || todaySession.exerciseId))
    || ((todaySession.type === 'hiit' || todaySession.type === 'martial_arts') && todaySession.rounds)
  );

  if (view === 'startChoice') {
    return (
      <WorkoutStartChooser
        onBack={() => setView('home')}
        onStartPlan={handleStartPlan}
        onViewPlan={(plan, dayIdx) => { setViewingPlan(plan); setViewingDayIndex(dayIdx); setView('planDetail'); }}
        onStartEmpty={startEmptyWorkout}
        onStartCardio={handleStartCardio}
        onStartHiit={handleStartHiit}
        onStartCircuit={handleStartCircuit}
        onStartMartialArts={handleStartMartialArts}
      />
    );
  }

  if (view === 'exercises') {
    return <ExerciseLibrary onBack={() => setView('home')} />;
  }

  if (view === 'selectForWorkout') {
    return (
      <ExerciseLibrary
        onBack={() => activeWorkout.isActive ? setView('activeWorkout') : setView('home')}
        onSelect={handleExercisesSelected}
        selectionMode
      />
    );
  }


  if (view === 'activeWorkout') {
    return (
      <ActiveWorkout
        onFinish={handleFinishWorkout}
        onDiscard={handleDiscardWorkout}
        onAddExercise={handleAddMoreExercises}
      />
    );
  }

  if (view === 'activeCardio') {
    return (
      <ActiveCardio
        activity={cardioActivity}
        onFinish={handleFinishCardioHiitCircuit}
        onDiscard={() => { setCardioActivity(null); setView('home'); }}
      />
    );
  }

  if (view === 'activeStructuredCardio' && structuredSession) {
    return (
      <ActiveStructuredCardio
        session={structuredSession}
        onFinish={() => { setStructuredSession(null); loadCalendarData(); setView('home'); }}
        onDiscard={() => { setStructuredSession(null); setView('home'); }}
      />
    );
  }

  if (view === 'activeHiit') {
    return (
      <ActiveHiit
        config={hiitConfig}
        onFinish={handleFinishCardioHiitCircuit}
        onDiscard={() => { setHiitConfig(null); setView('home'); }}
      />
    );
  }

  if (view === 'activeCircuit') {
    return (
      <ActiveCircuit
        config={circuitConfig}
        onFinish={handleFinishCardioHiitCircuit}
        onDiscard={() => { setCircuitConfig(null); setView('home'); }}
      />
    );
  }

  if (view === 'activeMartialArts') {
    return (
      <ActiveMartialArts
        config={martialArtsConfig}
        onFinish={handleFinishCardioHiitCircuit}
        onDiscard={() => { setMartialArtsConfig(null); setView('home'); }}
      />
    );
  }

  if (view === 'history') {
    return <WorkoutHistory onBack={() => setView('home')} />;
  }

  if (view === 'plans') {
    return (
      <TrainingPlans
        onBack={() => setView('home')}
        onStartPlan={handleStartPlan}
        onViewPlan={(plan, dayIdx) => { setViewingPlan(plan); setViewingDayIndex(dayIdx); setView('planDetail'); }}
        onStartHiit={handleStartHiit}
        onStartCircuit={handleStartCircuit}
        onStartCardio={handleStartCardio}
        onStartMartialArts={handleStartMartialArts}
      />
    );
  }

  if (view === 'friends') {
    return <FriendsList onBack={() => setView('home')} />;
  }

  if (view === 'leaderboard') {
    return <Leaderboard onBack={() => setView('home')} />;
  }

  if (view === 'challenges') {
    return <ChallengesList onBack={() => setView('home')} onCreateChallenge={() => setView('home')} />;
  }

  if (view === 'myPlans') {
    return <MyPlans onBack={() => setView('home')} onCreate={() => { setEditingPlan(null); setView('weeklyPlan'); }} onEdit={(plan) => { setEditingPlan(plan); setView('weeklyPlan'); }} onStartFreeWorkout={() => setView('startChoice')} />;
  }

  if (view === 'weeklyPlan') {
    return <WeeklyPlanBuilder editPlan={editingPlan} onBack={() => setView('myPlans')} onSaved={() => { setEditingPlan(null); loadCalendarData(); setView('myPlans'); }} />;
  }

  if (view === 'selectForPlanDetail') {
    return (
      <ExerciseLibrary
        onBack={() => setView('planDetail')}
        onSelect={(selected) => {
          setPlanDetailExercises((prev) => [...(prev || []), ...selected.map((ex) => ({ id: ex.id, nameKey: ex.nameKey }))]);
          setView('planDetail');
        }}
        selectionMode
      />
    );
  }

  if (view === 'planDetail' && viewingPlan) {
    return (
      <PlanDetail
        plan={viewingPlan}
        dayIndex={viewingDayIndex}
        exercises={planDetailExercises}
        onExercisesChange={setPlanDetailExercises}
        onBack={() => { setPlanDetailExercises(null); setView('plans'); }}
        onStartWorkout={(exs, planId, planName) => { setPlanDetailExercises(null); handleStartPlan(exs, planId, planName); }}
        onAddExercise={() => setView('selectForPlanDetail')}
      />
    );
  }

  if (view === 'peakPrograms') {
    try {
      return (
        <Suspense fallback={<div className="p-4 pt-24 text-center text-slate-400 text-sm">…</div>}>
        <PeakPrograms
          onBack={() => setView('home')}
          onProgramActivated={(name) => {
            loadCalendarData();
            setView('home');
            setToast({
              variant: 'success',
              message: lang === 'de'
                ? `„${name}" aktiviert — deine Trainingstage sind jetzt blau im Kalender markiert.`
                : `"${name}" activated — your training days are now marked blue in the calendar.`,
            });
          }}
          userGoal={profile?.goal || ''}
          userExperience={profile?.experience || ''}
        />
        </Suspense>
      );
    } catch (err) {
      console.error('PeakPrograms error:', err);
      return (
        <div className="p-4 pt-16">
          <p className="text-red-500">Error: {err.message}</p>
          <button onClick={() => setView('home')} className="mt-4 px-4 py-2 bg-primary-500 text-white rounded-xl">Zurück</button>
        </div>
      );
    }
  }

  return (
    <div className="p-4 pt-16 pb-24">
      {toast && (
        <Toast variant={toast.variant} message={toast.message} onDismiss={() => setToast(null)} />
      )}
      <div className="flex flex-col items-center pt-6 mb-4">
        <MyPeakLogo size={32} />
        <h1 className="text-2xl font-bold mt-2">{t('training.title')}</h1>
      </div>

      {/* Diamond Calendar */}
      <DiamondCalendar
        selectedDate={selectedDate}
        onSelectDate={setSelectedDate}
        scheduledDays={scheduledDays}
        completedDays={completedDays}
        lang={lang}
        onOpenCalendar={() => setShowTrainingCalendar(true)}
      />

      {/* Aktives Programm: heutige Session (oder Ruhetag) + Beenden */}
      {activeSchedule && (
        <div className="mb-4">
          <button
            onClick={todayStartable ? startTodaySession : undefined}
            className={`w-full bg-white dark:bg-surface-dark-alt rounded-2xl p-4 shadow-soft border border-primary-200 dark:border-primary-800/60 flex items-center gap-3 text-left ${todayStartable ? 'hover:shadow-md transition-shadow' : 'cursor-default'}`}
          >
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${todaySession ? 'bg-primary-50 dark:bg-primary-900/30' : 'bg-slate-100 dark:bg-slate-800'}`}>
              {todaySession
                ? <Play className="w-5 h-5 text-primary-500" />
                : <Moon className="w-5 h-5 text-slate-400" />}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-slate-900 dark:text-white truncate">
                {lang === 'de' ? 'Heute' : 'Today'}: {todaySession ? (todaySession.label || todaySession.type) : (lang === 'de' ? 'Ruhetag' : 'Rest day')}
              </p>
              <p className="text-xs text-slate-400 truncate">
                {todaySession?.week && todaySession?.durationWeeks
                  ? `${activeSchedule.name} · ${lang === 'de' ? 'Woche' : 'Week'} ${todaySession.week}/${todaySession.durationWeeks}`
                  : activeSchedule.name}
              </p>
            </div>
            {todayStartable && <ChevronRight className="w-5 h-5 text-slate-300 flex-shrink-0" />}
          </button>
          <div className="text-center mt-1.5">
            <button
              onClick={() => setConfirmEndProgram(true)}
              className="text-xs text-slate-400 hover:text-red-500 font-medium transition-colors"
            >
              {lang === 'de' ? 'Programm beenden' : 'End program'}
            </button>
          </div>
        </div>
      )}

      {prNotification && (
        <div className="bg-amber-50 dark:bg-amber-900/30 border border-amber-200 dark:border-amber-800 rounded-2xl p-4 mb-4 flex items-center gap-3 animate-pulse">
          <Trophy className="w-6 h-6 text-amber-500" />
          <span className="font-semibold text-amber-700 dark:text-amber-400">{t('training.newPR')}</span>
        </div>
      )}

      <WeeklySummaryBanner userId={user?.id} />

      <MuscleHeatmapCard userId={user?.id} />

      {/* Resume active workout banner */}
      {hasValidWorkout && (
        <button
          onClick={() => setView('activeWorkout')}
          className="w-full bg-green-600 hover:bg-green-700 text-white rounded-2xl p-4 flex items-center justify-center gap-3 text-lg font-semibold transition-colors mb-4 animate-pulse"
        >
          <Play className="w-6 h-6" />
          {t('training.continue')} — {formatElapsed(Date.now() - activeWorkout.workout.startTime)}
        </button>
      )}

      <button
        onClick={startWorkout}
        className="w-full bg-primary-500 hover:bg-primary-500 text-white rounded-2xl p-4 flex items-center justify-center gap-3 text-lg font-semibold transition-colors mb-6 bg-primary-500 hover:bg-primary-600"
      >
        <Plus className="w-6 h-6" />
        {t('training.startWorkout')}
      </button>

      {/* Two-tab layout: Meine Pläne / Peak-Programme */}
      <div className="flex gap-1 bg-slate-100 dark:bg-slate-800 rounded-xl p-1 mb-4">
        <button
          onClick={() => setView('myPlans')}
          className="flex-1 py-2.5 rounded-lg text-sm font-semibold bg-white dark:bg-surface-dark-alt text-slate-900 dark:text-white shadow-soft border border-slate-100 dark:border-slate-800/60"
        >
          {lang === 'de' ? 'Meine Pläne' : 'My Plans'}
        </button>
        <button
          onClick={() => setView('peakPrograms')}
          className="flex-1 py-2.5 rounded-lg text-sm font-semibold text-slate-500 dark:text-slate-400"
        >
          Peak-{lang === 'de' ? 'Programme' : 'Programs'}
        </button>
      </div>

      <div className="grid grid-cols-2 gap-3 mb-6">
        <QuickAction icon={<ClipboardList className="w-6 h-6" />} label={t('training.plans')} onClick={() => setView('plans')} />
        <QuickAction icon={<Dumbbell className="w-6 h-6" />} label={t('training.exercises')} onClick={() => setView('exercises')} />
      </div>

      {/* History */}
      <button
        onClick={() => setView('history')}
        className="w-full bg-white dark:bg-surface-dark-alt rounded-2xl p-4 shadow-soft border border-slate-100 dark:border-slate-800/60 flex items-center gap-4 hover:shadow-md transition-shadow mb-6"
      >
        <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
          <History className="w-5 h-5 text-slate-500" />
        </div>
        <div className="flex-1 text-left">
          <p className="text-sm font-semibold text-slate-900 dark:text-white">{t('training.history')}</p>
          <p className="text-xs text-slate-400">{lang === 'de' ? 'Alle vergangenen Trainingseinheiten' : 'All past training sessions'}</p>
        </div>
        <ChevronRight className="w-5 h-5 text-slate-300" />
      </button>

      {/* Social */}
      <h2 className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-3">Social</h2>
      <div className="grid grid-cols-3 gap-3">
        <QuickAction icon={<Medal className="w-6 h-6" />} label="Ranking" onClick={() => setView('leaderboard')} vertical />
        <QuickAction icon={<Swords className="w-6 h-6" />} label="Challenges" onClick={() => setView('challenges')} vertical />
        <QuickAction icon={<Users className="w-6 h-6" />} label={lang === 'de' ? 'Freunde' : 'Friends'} onClick={() => setView('friends')} vertical />
      </div>

      {/* Training Calendar Modal */}
      {showTrainingCalendar && (
        <TrainingCalendarModal
          selectedDate={selectedDate}
          lang={lang}
          onSelect={(dateStr) => {
            setSelectedDate(dateStr);
            setShowTrainingCalendar(false);
          }}
          onClose={() => setShowTrainingCalendar(false)}
        />
      )}

      {/* Programm-beenden-Bestätigung */}
      {confirmEndProgram && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-surface-dark-alt rounded-2xl p-6 w-full max-w-sm shadow-xl">
            <p className="text-center font-semibold mb-1">
              {lang === 'de' ? 'Programm beenden?' : 'End program?'}
            </p>
            <p className="text-center text-sm text-slate-500 dark:text-slate-400 mb-4">
              {lang === 'de'
                ? 'Es wird nicht gelöscht — du findest es weiter unter „Meine Pläne" und kannst es jederzeit wieder starten.'
                : 'It will not be deleted — you can find it under "My Plans" and restart it anytime.'}
            </p>
            <div className="flex gap-3">
              <button onClick={() => setConfirmEndProgram(false)} className="flex-1 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 font-medium text-sm">
                {t('common.cancel')}
              </button>
              <button onClick={endActiveProgram} className="flex-1 py-2.5 rounded-xl bg-red-500 text-white font-medium text-sm">
                {lang === 'de' ? 'Beenden' : 'End'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function formatElapsed(ms) {
  const mins = Math.floor(ms / 60000);
  const secs = Math.floor((ms % 60000) / 1000);
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}

function QuickAction({ icon, label, onClick, className = '', vertical = false }) {
  return (
    <button
      onClick={onClick}
      className={`bg-white dark:bg-surface-dark-alt rounded-2xl shadow-soft border border-slate-100 dark:border-slate-800/60 hover:shadow-md transition-shadow overflow-hidden ${
        vertical
          ? 'flex flex-col items-center justify-center gap-1.5 py-4 px-1 text-center min-h-[88px]'
          : 'flex items-center gap-3 p-4 text-left'
      } ${className}`}
    >
      <span className="text-primary-500 flex-shrink-0">{icon}</span>
      <span className={`font-medium leading-tight ${vertical ? 'text-[11px]' : 'text-sm'}`}>{label}</span>
    </button>
  );
}

function WorkoutStartChooser({ onBack, onStartPlan, onViewPlan, onStartEmpty, onStartCardio, onStartHiit, onStartCircuit, onStartMartialArts }) {
  const { t, i18n } = useTranslation();
  const { user } = useAuth();
  const [step, setStep] = useState('type'); // 'type' | 'strengthChoice' | 'plans' | 'cardioChoice' | 'hiitChoice' | 'circuitChoice' | 'martialArtsChoice'
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

  const cardioExercises = getExercisesByType('cardio');
  const hiitExercises = getExercisesByType('hiit');
  const circuitExercises = getExercisesByType('circuit');

  // Step: Choose strength plan day
  if (step === 'plans') {
    return (
      <div className="p-4 pt-16 pb-24">
        <div className="flex items-center gap-3 mb-6">
          <button onClick={() => setStep('strengthChoice')} className="p-2 -ml-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-2xl font-bold">{t('training.choosePlanDay')}</h1>
        </div>

        {customPlans.length > 0 && (
          <div className="mb-6">
            <h2 className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-3">{t('plans.customPlans')}</h2>
            <div className="flex flex-col gap-4">
              {customPlans.map((plan) => (
                <div key={plan.id} className="bg-white dark:bg-surface-dark-alt rounded-2xl p-4 shadow-soft border border-slate-100 dark:border-slate-800/60">
                  <h3 className="font-semibold text-lg mb-3">{plan.name}</h3>
                  <div className="flex flex-col gap-2">
                    {plan.days.map((day, i) => (
                      <button
                        key={i}
                        onClick={() => onViewPlan(plan, i)}
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

        {visibleDefaultPlans.length > 0 && (
          <div className="flex flex-col gap-4">
            {visibleDefaultPlans.map((plan) => (
              <div key={plan.id} className="bg-white dark:bg-surface-dark-alt rounded-2xl p-4 shadow-soft border border-slate-100 dark:border-slate-800/60">
                <h3 className="font-semibold text-lg mb-1">{t(plan.nameKey)}</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 mb-3">{t(plan.descKey)}</p>
                <div className="flex flex-col gap-2">
                  {plan.days.map((day, i) => (
                    <button
                      key={i}
                      onClick={() => onViewPlan({ ...plan, name: t(plan.nameKey), days: plan.days.map((d) => ({ name: t(d.nameKey), exercises: d.exercises.map((e) => e.id || e) })) }, i)}
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

  // Step: Strength sub-choice (plan or free)
  if (step === 'strengthChoice') {
    return (
      <div className="p-4 pt-16 pb-24">
        <div className="flex items-center gap-3 mb-6">
          <button onClick={() => setStep('type')} className="p-2 -ml-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-2xl font-bold">{t('training.strength')}</h1>
        </div>

        <div className="flex flex-col gap-4">
          <button
            onClick={() => setStep('plans')}
            className="bg-white dark:bg-surface-dark-alt rounded-2xl p-5 text-left shadow-soft border border-slate-100 dark:border-slate-800/60 hover:shadow-md transition-shadow"
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
            className="bg-white dark:bg-surface-dark-alt rounded-2xl p-5 text-left shadow-soft border border-slate-100 dark:border-slate-800/60 hover:shadow-md transition-shadow"
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

  // Step: Cardio activity selection
  if (step === 'cardioChoice') {
    return (
      <div className="p-4 pt-16 pb-24">
        <div className="flex items-center gap-3 mb-6">
          <button onClick={() => setStep('type')} className="p-2 -ml-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-2xl font-bold">{t('training.selectCardioActivity')}</h1>
        </div>
        <div className="flex flex-col gap-3">
          {cardioExercises.map((ex) => (
            <button
              key={ex.id}
              onClick={() => onStartCardio(ex)}
              className="bg-white dark:bg-surface-dark-alt rounded-2xl p-4 text-left shadow-soft border border-slate-100 dark:border-slate-800/60 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg bg-red-50 dark:bg-red-900/20 flex items-center justify-center">
                  <MuscleGroupIcon group="cardio" size={24} className="text-red-500" />
                </div>
                <div className="flex-1">
                  <p className="font-semibold">{t(ex.nameKey)}</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{t(ex.descKey)}</p>
                </div>
                <ChevronRight className="w-5 h-5 text-slate-400" />
              </div>
            </button>
          ))}
        </div>
      </div>
    );
  }

  // Step: HIIT configuration
  if (step === 'hiitChoice') {
    return (
      <HiitSetup
        onBack={() => setStep('type')}
        onStart={onStartHiit}
        exercises={hiitExercises}
        t={t}
      />
    );
  }

  // Step: Circuit configuration
  if (step === 'circuitChoice') {
    return (
      <CircuitSetup
        onBack={() => setStep('type')}
        onStart={onStartCircuit}
        exercises={circuitExercises}
        t={t}
      />
    );
  }

  // Step: Martial Arts configuration
  if (step === 'martialArtsChoice') {
    return (
      <MartialArtsSetup
        onBack={() => setStep('type')}
        onStart={onStartMartialArts}
        t={t}
      />
    );
  }

  // Step: Training type selection (initial)
  return (
    <div className="p-4 pt-16 pb-24">
      <div className="flex items-center gap-3 mb-6">
        <button onClick={onBack} className="p-2 -ml-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h1 className="text-2xl font-bold">{t('training.chooseTrainingType')}</h1>
      </div>

      <div className="flex flex-col gap-3">
        <TrainingTypeCard
          icon={<Dumbbell className="w-6 h-6" />}
          label={t('training.strength')}
          desc={t('training.strengthDesc')}
          color="primary"
          onClick={() => setStep('strengthChoice')}
        />
        <TrainingTypeCard
          icon={<Heart className="w-6 h-6" />}
          label={t('training.cardio')}
          desc={t('training.cardioDesc')}
          color="red"
          onClick={() => setStep('cardioChoice')}
        />
        <TrainingTypeCard
          icon={<Zap className="w-6 h-6" />}
          label={t('training.hiit')}
          desc={t('training.hiitDesc')}
          color="amber"
          onClick={() => setStep('hiitChoice')}
        />
        <TrainingTypeCard
          icon={<RefreshCw className="w-6 h-6" />}
          label={t('training.circuit')}
          desc={t('training.circuitDesc')}
          color="emerald"
          onClick={() => setStep('circuitChoice')}
        />
        <TrainingTypeCard
          icon={<BoxingGlovesIcon className="w-6 h-6" />}
          label={t('training.martialArts')}
          desc={t('training.martialArtsDesc')}
          color="violet"
          onClick={() => setStep('martialArtsChoice')}
        />
      </div>
    </div>
  );
}

function TrainingTypeCard({ icon, label, desc, color, onClick }) {
  const colorClasses = {
    primary: 'bg-primary-50 dark:bg-primary-900/20 text-primary-500',
    red: 'bg-red-50 dark:bg-red-900/20 text-red-500',
    amber: 'bg-amber-50 dark:bg-amber-900/20 text-amber-500',
    emerald: 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-500',
    violet: 'bg-violet-50 dark:bg-violet-900/20 text-violet-500',
  };

  return (
    <button
      onClick={onClick}
      className="w-full bg-white dark:bg-surface-dark-alt rounded-2xl p-4 text-left shadow-soft border border-slate-100 dark:border-slate-800/60 hover:shadow-md transition-shadow flex items-center gap-4"
    >
      <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${colorClasses[color]}`}>
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <p className="font-semibold">{label}</p>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{desc}</p>
      </div>
      <ChevronRight className="w-5 h-5 text-slate-300 dark:text-slate-600 flex-shrink-0" />
    </button>
  );
}

function BoxingGlovesIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      {/* Glove body — left fist punching right, side view */}
      <path d="M4 10c0-3 2-5.5 5.5-5.5S15 7 15 10v1.5c0 2-1 3.5-3.5 3.5H7c-2 0-3-1.5-3-3.5V10z" fill="currentColor" opacity="0.12" />
      <path d="M4 10c0-3 2-5.5 5.5-5.5S15 7 15 10v1.5c0 2-1 3.5-3.5 3.5H7c-2 0-3-1.5-3-3.5V10z" />
      {/* Thumb — pointing up/forward on top */}
      <path d="M13 7.5c1.5-.5 2.5 0 2.5 1.5s-1 2-2.5 2" />
      {/* Knuckle area — front of fist facing right */}
      <path d="M4 8v5" strokeWidth="2" opacity="0.3" />
      {/* Wrist/cuff */}
      <path d="M7 15h5.5" />
      <rect x="7" y="15.5" width="5.5" height="3" rx="1" fill="currentColor" opacity="0.12" />
      <rect x="7" y="15.5" width="5.5" height="3" rx="1" />
      {/* Arm going right */}
      <path d="M9 18.5v2" />
      <path d="M11 18.5v2" />
    </svg>
  );
}

function HiitSetup({ onBack, onStart, exercises, t }) {
  const { user } = useAuth();
  const presets = [
    { nameKey: 'plans.tabata', descKey: 'plans.tabataDesc', rounds: 8, workTime: 20, restTime: 10, exercises: ['burpees', 'mountain-climbers', 'jump-squats', 'high-knees'] },
    { nameKey: 'plans.hiit3030', descKey: 'plans.hiit3030Desc', rounds: 10, workTime: 30, restTime: 30, exercises: ['burpees', 'kettlebell-swings', 'box-jumps', 'battle-ropes'] },
  ];

  const [rounds, setRounds] = useState(8);
  const [workTime, setWorkTime] = useState(20);
  const [restTime, setRestTime] = useState(10);
  const [selectedExercises, setSelectedExercises] = useState(exercises.slice(0, 4).map((e) => e.id));
  const [savedPlans, setSavedPlans] = useState([]);
  const [showSave, setShowSave] = useState(false);
  const [saveName, setSaveName] = useState('');

  useEffect(() => {
    if (user) {
      getCustomPlansByType(user.id, 'hiit').then(setSavedPlans);
    }
  }, [user]);

  const loadSavedPlan = (plan) => {
    const d = plan.days;
    setRounds(d.rounds); setWorkTime(d.workTime); setRestTime(d.restTime); setSelectedExercises(d.exercises);
  };

  const handleSave = async () => {
    if (!saveName.trim() || selectedExercises.length === 0) return;
    await saveCustomPlan(user.id, { name: saveName.trim(), days: { type: 'hiit', rounds, workTime, restTime, exercises: selectedExercises } });
    setSaveName(''); setShowSave(false);
    getCustomPlansByType(user.id, 'hiit').then(setSavedPlans);
  };

  const toggleExercise = (id) => {
    setSelectedExercises((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  return (
    <div className="p-4 pt-16 pb-24">
      <div className="flex items-center gap-3 mb-6">
        <button onClick={onBack} className="p-2 -ml-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h1 className="text-2xl font-bold">{t('training.configureHiit')}</h1>
      </div>

      {/* Saved Plans + Presets */}
      <div className="flex gap-2 overflow-x-auto pb-2 mb-4 scrollbar-hide">
        {savedPlans.map((p) => (
          <button
            key={p.id}
            onClick={() => loadSavedPlan(p)}
            className="flex-shrink-0 px-4 py-2 rounded-xl bg-primary-50 dark:bg-primary-900/20 border border-primary-200 dark:border-primary-800 text-sm font-medium text-primary-500 dark:text-primary-400 hover:bg-primary-100 dark:hover:bg-primary-900/30 transition-colors"
          >
            {p.name}
          </button>
        ))}
        {presets.map((p, i) => (
          <button
            key={i}
            onClick={() => { setRounds(p.rounds); setWorkTime(p.workTime); setRestTime(p.restTime); setSelectedExercises(p.exercises); }}
            className="flex-shrink-0 px-4 py-2 rounded-xl bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 text-sm font-medium text-amber-700 dark:text-amber-400 hover:bg-amber-100 dark:hover:bg-amber-900/30 transition-colors"
          >
            {t(p.nameKey)}
          </button>
        ))}
      </div>

      <div className="bg-white dark:bg-surface-dark-alt rounded-2xl p-4 shadow-soft border border-slate-100 dark:border-slate-800/60 mb-4">
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <span className="font-medium">{t('training.rounds')}</span>
            <div className="flex items-center gap-3">
              <button onClick={() => setRounds(Math.max(1, rounds - 1))} className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center font-bold">-</button>
              <span className="w-8 text-center font-bold text-lg">{rounds}</span>
              <button onClick={() => setRounds(Math.min(20, rounds + 1))} className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center font-bold">+</button>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <span className="font-medium">{t('training.workTime')}</span>
            <div className="flex items-center gap-3">
              <button onClick={() => setWorkTime(Math.max(5, workTime - 5))} className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center font-bold">-</button>
              <span className="w-12 text-center font-bold text-lg">{workTime}s</span>
              <button onClick={() => setWorkTime(Math.min(120, workTime + 5))} className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center font-bold">+</button>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <span className="font-medium">{t('training.restTime')}</span>
            <div className="flex items-center gap-3">
              <button onClick={() => setRestTime(Math.max(5, restTime - 5))} className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center font-bold">-</button>
              <span className="w-12 text-center font-bold text-lg">{restTime}s</span>
              <button onClick={() => setRestTime(Math.min(120, restTime + 5))} className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center font-bold">+</button>
            </div>
          </div>
        </div>
      </div>

      <h2 className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-3">{t('training.exercises')}</h2>
      <div className="flex flex-col gap-2 mb-6">
        {exercises.map((ex) => (
          <button
            key={ex.id}
            onClick={() => toggleExercise(ex.id)}
            className={`bg-white dark:bg-surface-dark-alt rounded-xl p-3 text-left shadow-soft border border-slate-100 dark:border-slate-800/60 transition-all ${
              selectedExercises.includes(ex.id) ? 'ring-2 ring-amber-500' : ''
            }`}
          >
            <div className="flex items-center gap-3">
              <div className={`w-5 h-5 rounded-full border-2 flex-shrink-0 flex items-center justify-center ${
                selectedExercises.includes(ex.id) ? 'bg-amber-500 border-amber-500' : 'border-slate-300 dark:border-slate-600'
              }`}>
                {selectedExercises.includes(ex.id) && (
                  <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </div>
              <div>
                <p className="font-medium text-sm">{t(ex.nameKey)}</p>
                <p className="text-xs text-slate-400">{t(ex.descKey)}</p>
              </div>
            </div>
          </button>
        ))}
      </div>

      <button
        onClick={() => onStart({ rounds, workTime, restTime, exercises: selectedExercises })}
        disabled={selectedExercises.length === 0}
        className="w-full bg-amber-500 hover:bg-amber-600 disabled:opacity-50 text-white rounded-2xl py-3.5 font-semibold transition-colors mb-3"
      >
        {t('training.startWorkout')}
      </button>

      {!showSave ? (
        <button onClick={() => setShowSave(true)} disabled={selectedExercises.length === 0} className="w-full text-sm text-slate-500 dark:text-slate-400 hover:text-primary-500 font-medium py-2 disabled:opacity-50">{t('plans.saveHiitPlan')}</button>
      ) : (
        <div className="flex gap-2">
          <input type="text" value={saveName} onChange={(e) => setSaveName(e.target.value)} placeholder={t('plans.hiitPlanName')} className="flex-1 px-3 py-2.5 rounded-xl bg-white dark:bg-surface-dark-alt border border-slate-200 dark:border-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-primary-400" />
          <button onClick={handleSave} disabled={!saveName.trim()} className="px-4 py-2.5 rounded-xl bg-primary-500 text-white text-sm font-medium disabled:opacity-50">{t('common.save')}</button>
        </div>
      )}
    </div>
  );
}

function CircuitSetup({ onBack, onStart, exercises: circuitExercises, t }) {
  const { user } = useAuth();
  const presets = [
    { nameKey: 'plans.fullBodyCircuit', rounds: 3, workTime: 40, restTime: 20, exercises: ['push-ups', 'bodyweight-squats', 'burpees', 'plank', 'lunges', 'jumping-jacks'] },
    { nameKey: 'plans.coreCircuit', rounds: 4, workTime: 30, restTime: 15, exercises: ['crunches', 'plank', 'hanging-leg-raise', 'mountain-climbers'] },
  ];

  const [rounds, setRounds] = useState(3);
  const [workTime, setWorkTime] = useState(40);
  const [restTime, setRestTime] = useState(20);
  const [selectedExercises, setSelectedExercises] = useState([]);
  const [savedPlans, setSavedPlans] = useState([]);
  const [showSave, setShowSave] = useState(false);
  const [saveName, setSaveName] = useState('');
  const [showExercisePicker, setShowExercisePicker] = useState(false);

  useEffect(() => {
    if (user) {
      getCustomPlansByType(user.id, 'circuit').then(setSavedPlans);
    }
  }, [user]);

  const loadSavedPlan = (plan) => {
    const d = plan.days;
    setRounds(d.rounds); setWorkTime(d.workTime); setRestTime(d.restTime); setSelectedExercises(d.exercises);
  };

  const handleSaveCircuit = async () => {
    if (!saveName.trim() || selectedExercises.length === 0) return;
    await saveCustomPlan(user.id, { name: saveName.trim(), days: { type: 'circuit', rounds, workTime, restTime, exercises: selectedExercises } });
    setSaveName(''); setShowSave(false);
    getCustomPlansByType(user.id, 'circuit').then(setSavedPlans);
  };

  // Exercise picker sub-view
  if (showExercisePicker) {
    return (
      <CircuitExercisePicker
        initialSelected={selectedExercises}
        onBack={() => setShowExercisePicker(false)}
        onConfirm={(ids) => { setSelectedExercises(ids); setShowExercisePicker(false); }}
        t={t}
      />
    );
  }

  return (
    <div className="p-4 pt-16 pb-24">
      <div className="flex items-center gap-3 mb-6">
        <button onClick={onBack} className="p-2 -ml-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h1 className="text-2xl font-bold">{t('training.configureCircuit')}</h1>
      </div>

      {/* Saved Plans + Presets */}
      {(savedPlans.length > 0 || presets.length > 0) && (
        <div className="flex gap-2 overflow-x-auto pb-2 mb-4 scrollbar-hide">
          {savedPlans.map((p) => (
            <button
              key={p.id}
              onClick={() => loadSavedPlan(p)}
              className="flex-shrink-0 px-4 py-2 rounded-xl bg-primary-50 dark:bg-primary-900/20 border border-primary-200 dark:border-primary-800 text-sm font-medium text-primary-500 dark:text-primary-400 hover:bg-primary-100 dark:hover:bg-primary-900/30 transition-colors"
            >
              {p.name}
            </button>
          ))}
          {presets.map((p, i) => (
            <button
              key={i}
              onClick={() => { setRounds(p.rounds); setWorkTime(p.workTime); setRestTime(p.restTime); setSelectedExercises(p.exercises); }}
              className="flex-shrink-0 px-4 py-2 rounded-xl bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800 text-sm font-medium text-emerald-700 dark:text-emerald-400 hover:bg-emerald-100 dark:hover:bg-emerald-900/30 transition-colors"
            >
              {t(p.nameKey)}
            </button>
          ))}
        </div>
      )}

      <div className="bg-white dark:bg-surface-dark-alt rounded-2xl p-4 shadow-soft border border-slate-100 dark:border-slate-800/60 mb-4">
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <span className="font-medium">{t('training.rounds')}</span>
            <div className="flex items-center gap-3">
              <button onClick={() => setRounds(Math.max(1, rounds - 1))} className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center font-bold">-</button>
              <span className="w-8 text-center font-bold text-lg">{rounds}</span>
              <button onClick={() => setRounds(Math.min(10, rounds + 1))} className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center font-bold">+</button>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <span className="font-medium">{t('training.workTime')}</span>
            <div className="flex items-center gap-3">
              <button onClick={() => setWorkTime(Math.max(10, workTime - 5))} className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center font-bold">-</button>
              <span className="w-12 text-center font-bold text-lg">{workTime}s</span>
              <button onClick={() => setWorkTime(Math.min(120, workTime + 5))} className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center font-bold">+</button>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <span className="font-medium">{t('training.restTime')}</span>
            <div className="flex items-center gap-3">
              <button onClick={() => setRestTime(Math.max(5, restTime - 5))} className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center font-bold">-</button>
              <span className="w-12 text-center font-bold text-lg">{restTime}s</span>
              <button onClick={() => setRestTime(Math.min(120, restTime + 5))} className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center font-bold">+</button>
            </div>
          </div>
        </div>
      </div>

      {/* Selected exercises */}
      <h2 className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-3">{t('training.exercises')} ({selectedExercises.length})</h2>
      {selectedExercises.length > 0 && (
        <div className="flex flex-col gap-2 mb-3">
          {selectedExercises.map((id, i) => {
            const ex = getExerciseById(id);
            return (
              <div key={id} className="flex items-center gap-3 bg-white dark:bg-surface-dark-alt rounded-xl p-3 shadow-soft border border-slate-100 dark:border-slate-800/60">
                <span className="w-6 h-6 rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 text-xs font-bold flex items-center justify-center">{i + 1}</span>
                <span className="flex-1 text-sm font-medium">{ex ? t(ex.nameKey) : id}</span>
                <button onClick={() => setSelectedExercises((prev) => prev.filter((x) => x !== id))} className="p-1 text-slate-400 hover:text-red-500">
                  <X className="w-4 h-4" />
                </button>
              </div>
            );
          })}
        </div>
      )}

      <button
        onClick={() => setShowExercisePicker(true)}
        className="w-full flex items-center justify-center gap-2 py-3 rounded-xl border-2 border-dashed border-slate-300 dark:border-slate-600 text-slate-500 dark:text-slate-400 hover:border-emerald-400 hover:text-emerald-500 transition-colors mb-6"
      >
        <Plus className="w-5 h-5" />
        <span className="font-medium">{t('training.addExercise')}</span>
      </button>

      <button
        onClick={() => onStart({ rounds, workTime, restTime, exercises: selectedExercises })}
        disabled={selectedExercises.length === 0}
        className="w-full bg-emerald-500 hover:bg-emerald-600 disabled:opacity-50 text-white rounded-2xl py-3.5 font-semibold transition-colors mb-3"
      >
        {t('training.startWorkout')}
      </button>

      {!showSave ? (
        <button onClick={() => setShowSave(true)} disabled={selectedExercises.length === 0} className="w-full text-sm text-slate-500 dark:text-slate-400 hover:text-primary-500 font-medium py-2 disabled:opacity-50">{t('plans.saveCircuit')}</button>
      ) : (
        <div className="flex gap-2">
          <input type="text" value={saveName} onChange={(e) => setSaveName(e.target.value)} placeholder={t('plans.circuitName')} className="flex-1 px-3 py-2.5 rounded-xl bg-white dark:bg-surface-dark-alt border border-slate-200 dark:border-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-primary-400" />
          <button onClick={handleSaveCircuit} disabled={!saveName.trim()} className="px-4 py-2.5 rounded-xl bg-primary-500 text-white text-sm font-medium disabled:opacity-50">{t('common.save')}</button>
        </div>
      )}
    </div>
  );
}

// Full exercise picker for circuits — shows ALL exercises with search + filter
function CircuitExercisePicker({ initialSelected, onBack, onConfirm, t }) {
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState(initialSelected);

  const typeFilters = [
    { key: 'all', label: t('plans.allExercises') },
    { key: 'strength', label: t('training.strength') },
    { key: 'hiit', label: t('training.hiit') },
    { key: 'circuit', label: t('training.circuit') },
  ];

  const filtered = exercises.filter((ex) => {
    if (ex.type === 'cardio') return false; // cardio not useful in circuits
    const exType = ex.type || 'strength';
    if (filter !== 'all' && exType !== filter) return false;
    if (search) {
      const name = t(ex.nameKey).toLowerCase();
      if (!name.includes(search.toLowerCase())) return false;
    }
    return true;
  });

  const toggle = (id) => setSelected((prev) => prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]);

  return (
    <div className="p-4 pt-16 pb-24">
      <div className="flex items-center gap-3 mb-4">
        <button onClick={onBack} className="p-2 -ml-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800"><ArrowLeft className="w-5 h-5" /></button>
        <h1 className="text-2xl font-bold">{t('training.addExercise')}</h1>
      </div>

      <div className="relative mb-4">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
        <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder={t('common.search')} className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white dark:bg-surface-dark-alt border border-slate-200 dark:border-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-primary-400" />
      </div>

      <div className="flex gap-2 overflow-x-auto pb-2 mb-4 scrollbar-hide">
        {typeFilters.map((f) => (
          <button key={f.key} onClick={() => setFilter(f.key)} className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors ${filter === f.key ? 'bg-emerald-600 text-white' : 'bg-white dark:bg-surface-dark-alt text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700'}`}>{f.label}</button>
        ))}
      </div>

      <div className="flex flex-col gap-2">
        {filtered.map((ex) => (
          <button key={ex.id} onClick={() => toggle(ex.id)} className={`bg-white dark:bg-surface-dark-alt rounded-xl p-3 text-left shadow-soft border border-slate-100 dark:border-slate-800/60 transition-all ${selected.includes(ex.id) ? 'ring-2 ring-emerald-500' : ''}`}>
            <div className="flex items-center gap-3">
              <div className={`w-5 h-5 rounded-full border-2 flex-shrink-0 flex items-center justify-center ${selected.includes(ex.id) ? 'bg-emerald-500 border-emerald-500' : 'border-slate-300 dark:border-slate-600'}`}>
                {selected.includes(ex.id) && (
                  <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-sm truncate">{t(ex.nameKey)}</p>
                <p className="text-xs text-slate-400">{ex.muscleGroup ? `${t(`muscleGroups.${ex.muscleGroup}`)} · ${t(`equipment.${ex.equipment}`)}` : t(`training.${ex.type}`)}</p>
              </div>
            </div>
          </button>
        ))}
      </div>

      {selected.length > 0 && (
        <div className="fixed bottom-20 left-0 right-0 px-4 pb-2">
          <button onClick={() => onConfirm(selected)} className="w-full max-w-lg mx-auto block bg-emerald-500 hover:bg-emerald-600 text-white rounded-2xl py-3.5 font-semibold text-center shadow-lg transition-colors">
            {t('training.done')} ({selected.length})
          </button>
        </div>
      )}
    </div>
  );
}

function MartialArtsSetup({ onBack, onStart, t }) {
  const { user } = useAuth();
  const martialArtsExercises = getExercisesByType('martial-arts');
  const categories = [
    { key: 'all', label: t('plans.allStyles') },
    { key: 'boxing', label: t('plans.boxing') },
    { key: 'kickboxing', label: t('plans.kickboxing') },
    { key: 'mma', label: t('plans.mma') },
    { key: 'karate', label: t('plans.karate') },
    { key: 'judo', label: t('plans.judo') },
    { key: 'bjj', label: t('plans.bjj') },
    { key: 'taekwondo', label: t('plans.taekwondo') },
    { key: 'wrestling', label: t('plans.wrestling') },
  ];

  const presets = [
    { nameKey: 'plans.boxingBasics', rounds: 6, workTime: 180, restTime: 60, exercises: ['shadow-boxing', 'heavy-bag-rounds', 'pad-work', 'speed-bag', 'slip-and-roll', 'shadow-boxing'] },
    { nameKey: 'plans.kickboxingWorkout', rounds: 5, workTime: 180, restTime: 60, exercises: ['shadow-boxing', 'kick-combos', 'roundhouse-kick-drill', 'thai-clinch', 'low-kick-drill'] },
    { nameKey: 'plans.mmaConditioning', rounds: 5, workTime: 300, restTime: 60, exercises: ['shadow-boxing', 'takedown-drill', 'ground-and-pound', 'sprawl-drill', 'cage-work'] },
  ];

  const [categoryFilter, setCategoryFilter] = useState('all');
  const [rounds, setRounds] = useState(6);
  const [workTime, setWorkTime] = useState(180);
  const [restTime, setRestTime] = useState(60);
  const [selectedExercises, setSelectedExercises] = useState([]);
  const [savedPlans, setSavedPlans] = useState([]);
  const [showSave, setShowSave] = useState(false);
  const [saveName, setSaveName] = useState('');

  useEffect(() => {
    if (user) getCustomPlansByType(user.id, 'martial-arts').then(setSavedPlans);
  }, [user]);

  const filteredExercises = martialArtsExercises.filter(
    (ex) => categoryFilter === 'all' || ex.martialArtsCategory === categoryFilter
  );

  const toggleExercise = (id) => {
    setSelectedExercises((prev) => prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]);
  };

  const loadPreset = (p) => {
    setRounds(p.rounds); setWorkTime(p.workTime); setRestTime(p.restTime); setSelectedExercises(p.exercises);
  };

  const loadSavedPlan = (plan) => {
    const d = plan.days;
    setRounds(d.rounds); setWorkTime(d.workTime); setRestTime(d.restTime); setSelectedExercises(d.exercises);
  };

  const handleSave = async () => {
    if (!saveName.trim() || selectedExercises.length === 0) return;
    await saveCustomPlan(user.id, { name: saveName.trim(), days: { type: 'martial-arts', rounds, workTime, restTime, exercises: selectedExercises } });
    setSaveName(''); setShowSave(false);
    getCustomPlansByType(user.id, 'martial-arts').then(setSavedPlans);
  };

  const formatTime = (s) => `${Math.floor(s / 60)}:${(s % 60).toString().padStart(2, '0')}`;

  return (
    <div className="p-4 pt-16 pb-24">
      <div className="flex items-center gap-3 mb-6">
        <button onClick={onBack} className="p-2 -ml-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h1 className="text-2xl font-bold">{t('training.configureMartialArts')}</h1>
      </div>

      {/* Saved Plans + Presets */}
      <div className="flex gap-2 overflow-x-auto pb-2 mb-4 scrollbar-hide">
        {savedPlans.map((p) => (
          <button key={p.id} onClick={() => loadSavedPlan(p)} className="flex-shrink-0 px-4 py-2 rounded-xl bg-primary-50 dark:bg-primary-900/20 border border-primary-200 dark:border-primary-800 text-sm font-medium text-primary-500 dark:text-primary-400">{p.name}</button>
        ))}
        {presets.map((p, i) => (
          <button key={i} onClick={() => loadPreset(p)} className="flex-shrink-0 px-4 py-2 rounded-xl bg-violet-50 dark:bg-violet-900/20 border border-violet-200 dark:border-violet-800 text-sm font-medium text-violet-700 dark:text-violet-400">{t(p.nameKey)}</button>
        ))}
      </div>

      {/* Config */}
      <div className="bg-white dark:bg-surface-dark-alt rounded-2xl p-4 shadow-soft border border-slate-100 dark:border-slate-800/60 mb-4">
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <span className="font-medium">{t('training.rounds')}</span>
            <div className="flex items-center gap-3">
              <button onClick={() => setRounds(Math.max(1, rounds - 1))} className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center font-bold">-</button>
              <span className="w-8 text-center font-bold text-lg">{rounds}</span>
              <button onClick={() => setRounds(Math.min(15, rounds + 1))} className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center font-bold">+</button>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <span className="font-medium">{t('training.workTime')}</span>
            <div className="flex items-center gap-3">
              <button onClick={() => setWorkTime(Math.max(30, workTime - 30))} className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center font-bold">-</button>
              <span className="w-16 text-center font-bold text-lg">{formatTime(workTime)}</span>
              <button onClick={() => setWorkTime(Math.min(600, workTime + 30))} className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center font-bold">+</button>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <span className="font-medium">{t('training.restTime')}</span>
            <div className="flex items-center gap-3">
              <button onClick={() => setRestTime(Math.max(15, restTime - 15))} className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center font-bold">-</button>
              <span className="w-16 text-center font-bold text-lg">{formatTime(restTime)}</span>
              <button onClick={() => setRestTime(Math.min(300, restTime + 15))} className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center font-bold">+</button>
            </div>
          </div>
        </div>
      </div>

      {/* Category filter */}
      <div className="flex gap-2 overflow-x-auto pb-2 mb-3 scrollbar-hide">
        {categories.map((c) => (
          <button key={c.key} onClick={() => setCategoryFilter(c.key)} className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors ${categoryFilter === c.key ? 'bg-violet-600 text-white' : 'bg-white dark:bg-surface-dark-alt text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700'}`}>{c.label}</button>
        ))}
      </div>

      {/* Exercises */}
      <div className="flex flex-col gap-2 mb-6">
        {filteredExercises.map((ex) => (
          <button key={ex.id} onClick={() => toggleExercise(ex.id)} className={`bg-white dark:bg-surface-dark-alt rounded-xl p-3 text-left shadow-soft border border-slate-100 dark:border-slate-800/60 transition-all ${selectedExercises.includes(ex.id) ? 'ring-2 ring-violet-500' : ''}`}>
            <div className="flex items-center gap-3">
              <div className={`w-5 h-5 rounded-full border-2 flex-shrink-0 flex items-center justify-center ${selectedExercises.includes(ex.id) ? 'bg-violet-500 border-violet-500' : 'border-slate-300 dark:border-slate-600'}`}>
                {selectedExercises.includes(ex.id) && (
                  <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                )}
              </div>
              <div>
                <p className="font-medium text-sm">{t(ex.nameKey)}</p>
                <p className="text-xs text-slate-400">{t(ex.descKey)}</p>
              </div>
            </div>
          </button>
        ))}
      </div>

      <button onClick={() => onStart({ rounds, workTime, restTime, exercises: selectedExercises })} disabled={selectedExercises.length === 0} className="w-full bg-violet-500 hover:bg-violet-600 disabled:opacity-50 text-white rounded-2xl py-3.5 font-semibold transition-colors mb-3">
        {t('training.startWorkout')}
      </button>

      {!showSave ? (
        <button onClick={() => setShowSave(true)} disabled={selectedExercises.length === 0} className="w-full text-sm text-slate-500 dark:text-slate-400 hover:text-primary-500 font-medium py-2 disabled:opacity-50">{t('plans.saveMartialArtsPlan')}</button>
      ) : (
        <div className="flex gap-2">
          <input type="text" value={saveName} onChange={(e) => setSaveName(e.target.value)} placeholder={t('plans.martialArtsPlanName')} className="flex-1 px-3 py-2.5 rounded-xl bg-white dark:bg-surface-dark-alt border border-slate-200 dark:border-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-primary-400" />
          <button onClick={handleSave} disabled={!saveName.trim()} className="px-4 py-2.5 rounded-xl bg-primary-500 text-white text-sm font-medium disabled:opacity-50">{t('common.save')}</button>
        </div>
      )}
    </div>
  );
}

function TrainingCalendarModal({ selectedDate, lang, onSelect, onClose }) {
  const selDate = new Date(selectedDate + 'T12:00:00');
  const [viewYear, setViewYear] = useState(selDate.getFullYear());
  const [viewMonth, setViewMonth] = useState(selDate.getMonth());

  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
  const firstDay = new Date(viewYear, viewMonth, 1).getDay();
  const adjustedFirst = firstDay === 0 ? 6 : firstDay - 1;

  const monthName = new Date(viewYear, viewMonth).toLocaleDateString(
    lang === 'de' ? 'de-DE' : 'en-US',
    { month: 'long', year: 'numeric' }
  );

  const dayHeaders = lang === 'de'
    ? ['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So']
    : ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  function prevMonth() {
    if (viewMonth === 0) { setViewYear(viewYear - 1); setViewMonth(11); }
    else setViewMonth(viewMonth - 1);
  }

  function nextMonth() {
    if (viewMonth === 11) { setViewYear(viewYear + 1); setViewMonth(0); }
    else setViewMonth(viewMonth + 1);
  }

  const todayStr = todayLocal();

  return (
    <div className="fixed inset-0 bg-black/50 z-[60] flex items-center justify-center p-6" onClick={onClose}>
      <div className="bg-white dark:bg-surface-dark-alt rounded-2xl w-full max-w-sm shadow-xl" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between px-5 pt-5 pb-3">
          <button onClick={prevMonth} className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800">
            <ArrowLeft className="w-5 h-5 text-slate-400" />
          </button>
          <span className="text-sm font-semibold text-slate-700 dark:text-slate-200 capitalize">{monthName}</span>
          <button onClick={nextMonth} className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800">
            <ChevronRight className="w-5 h-5 text-slate-400" />
          </button>
        </div>

        <div className="grid grid-cols-7 px-4 pb-1">
          {dayHeaders.map((d) => (
            <span key={d} className="text-[10px] font-medium text-slate-400 text-center py-1">{d}</span>
          ))}
        </div>

        <div className="grid grid-cols-7 px-4 pb-4 gap-y-0.5">
          {Array.from({ length: adjustedFirst }).map((_, i) => <span key={`e${i}`} />)}
          {Array.from({ length: daysInMonth }).map((_, i) => {
            const day = i + 1;
            const dateStr = `${viewYear}-${String(viewMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
            const isSelected = dateStr === selectedDate;
            const isToday = dateStr === todayStr;
            return (
              <button
                key={day}
                onClick={() => onSelect(dateStr)}
                className={`h-9 w-9 mx-auto rounded-full text-sm font-medium flex items-center justify-center transition-colors ${
                  isSelected
                    ? 'bg-primary-500 text-white'
                    : isToday
                      ? 'ring-2 ring-primary-400 text-primary-500'
                      : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                {day}
              </button>
            );
          })}
        </div>

        <div className="flex gap-2 px-5 pb-5">
          <button
            onClick={() => onSelect(todayLocal())}
            className="flex-1 py-2.5 rounded-xl bg-primary-500 text-white text-sm font-semibold"
          >
            {lang === 'de' ? 'Heute' : 'Today'}
          </button>
          <button onClick={onClose} className="flex-1 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 text-sm font-semibold">
            {lang === 'de' ? 'Schließen' : 'Close'}
          </button>
        </div>
      </div>
    </div>
  );
}
