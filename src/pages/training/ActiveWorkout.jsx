import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Plus, Trash2, X, Check, Save, Target, StickyNote } from 'lucide-react';
import { saveWorkout, getPersonalRecord, saveCustomPlan, getAllExerciseNotes } from '../../data/workoutStorage';
import ExerciseNoteModal from './ExerciseNoteModal';
import { useAuth } from '../../context/AuthContext';
import { useActiveWorkout } from '../../context/ActiveWorkoutContext';
import { getExerciseById } from '../../data/exercises';
import MuscleGroupIcon from '../../components/icons/MuscleGroupIcon';
import MiniSparkline from '../../components/progress/MiniSparkline';
import ProgressRing from '../../components/progress/ProgressRing';
import PostWorkoutSummary from '../../components/progress/PostWorkoutSummary';
import useProgressComparison, { getExerciseTarget, setExerciseTarget } from '../../hooks/useProgressComparison';

export default function ActiveWorkout({ onFinish, onDiscard, onAddExercise }) {
  const { t } = useTranslation();
  const { user } = useAuth();
  const ctx = useActiveWorkout();
  const exercises = ctx.workout?.exercises || [];

  const [elapsed, setElapsed] = useState(0);
  const [showDiscardConfirm, setShowDiscardConfirm] = useState(false);
  const [showNoValidSets, setShowNoValidSets] = useState(false);
  const [showSaveAsPlan, setShowSaveAsPlan] = useState(false);
  const [showPostSummary, setShowPostSummary] = useState(false);
  const [savedWorkoutExercises, setSavedWorkoutExercises] = useState(null);
  const [planName, setPlanName] = useState('');
  const [pendingPrs, setPendingPrs] = useState({});
  const [editingTarget, setEditingTarget] = useState(null);
  const [noteModal, setNoteModal] = useState(null); // { exerciseId, name }
  const [exerciseNotes, setExerciseNotes] = useState({});
  const weightUnit = localStorage.getItem('weightUnit') || 'kg';

  // Load all notes on mount
  useEffect(() => {
    if (user) getAllExerciseNotes(user.id).then(setExerciseNotes);
  }, [user]);

  const wasFromPlan = ctx.workout?.fromPlan || false;
  const progress = useProgressComparison(user?.id);

  // Timer — derived from context startTime
  useEffect(() => {
    if (!ctx.workout?.startTime) return;
    const timer = setInterval(() => setElapsed(Date.now() - ctx.workout.startTime), 1000);
    return () => clearInterval(timer);
  }, [ctx.workout?.startTime]);

  const formatTime = (ms) => {
    const mins = Math.floor(ms / 60000);
    const secs = Math.floor((ms % 60000) / 1000);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const checkForPRs = async () => {
    const newPrs = {};
    for (const ex of exercises) {
      const record = await getPersonalRecord(user.id, ex.exerciseId);
      for (const set of ex.sets) {
        const w = parseFloat(set.weight);
        if (w && w > record.maxWeight) newPrs[ex.exerciseId] = true;
      }
    }
    return newPrs;
  };

  const handleFinish = async () => {
    const validExercises = exercises
      .map((ex) => ({ ...ex, sets: ex.sets.filter((s) => s.reps && s.weight) }))
      .filter((ex) => ex.sets.length > 0);

    if (validExercises.length === 0) {
      setShowNoValidSets(true);
      return;
    }

    const workout = {
      date: new Date().toISOString(),
      duration: elapsed,
      exercises: validExercises.map((ex) => ({
        exerciseId: ex.exerciseId,
        nameKey: ex.nameKey,
        sets: ex.sets.map((s) => ({ reps: parseFloat(s.reps), weight: parseFloat(s.weight) })),
      })),
    };

    // Save to localStorage + Supabase (fire-and-forget, never blocks)
    saveWorkout(user.id, workout).catch((err) => console.error('Save workout error:', err));

    // PR check in background
    checkForPRs().then((prs) => setPendingPrs(prs || {})).catch(() => {});

    // Save data before clearing context
    setSavedWorkoutExercises(workout.exercises);
    ctx.discardWorkout();
    setShowPostSummary(true);
  };

  const handlePostSummaryDismiss = () => {
    setShowPostSummary(false);
    if (!wasFromPlan && savedWorkoutExercises?.length > 0) {
      setShowSaveAsPlan(true);
      return;
    }
    onFinish(pendingPrs);
  };

  const handleSaveAsPlan = async () => {
    if (!planName.trim()) return;
    await saveCustomPlan(user.id, {
      name: planName.trim(),
      days: [{ name: planName.trim(), exercises: exercises.map((ex) => ex.exerciseId) }],
    });
    onFinish(pendingPrs);
  };

  const handleSkipSavePlan = () => onFinish(pendingPrs);

  const handleDiscard = () => {
    ctx.discardWorkout();
    onDiscard();
  };

  // Post-workout summary
  if (showPostSummary && savedWorkoutExercises) {
    return (
      <PostWorkoutSummary
        exercises={savedWorkoutExercises}
        prs={pendingPrs}
        duration={elapsed}
        userId={user?.id}
        onDismiss={handlePostSummaryDismiss}
      />
    );
  }

  return (
    <div className="p-4 pt-16 pb-24">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">{t('training.activeWorkout')}</h1>
        <span className="text-sm font-mono text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-3 py-1 rounded-lg">
          {formatTime(elapsed)}
        </span>
      </div>

      {exercises.length === 0 && (
        <p className="text-center text-slate-400 dark:text-slate-500 py-8">{t('training.emptyWorkout')}</p>
      )}

      <div className="flex flex-col gap-4">
        {exercises.map((ex, exIdx) => {
          const exData = getExerciseById(ex.exerciseId) || {};
          const lastSession = progress.getLastSession(ex.exerciseId);
          const sparkData = progress.getSparklineData(ex.exerciseId);
          const comparison = progress.getComparison(
            ex.exerciseId,
            ex.sets.filter((s) => s.reps && s.weight).map((s) => ({ reps: parseFloat(s.reps), weight: parseFloat(s.weight) }))
          );
          const target = getExerciseTarget(ex.exerciseId);
          const setsAtTarget = ex.sets.filter((s) => parseFloat(s.reps) >= target && s.reps !== '').length;
          const allAtTarget = setsAtTarget === ex.sets.length && ex.sets.length > 0 && ex.sets.every((s) => s.reps !== '');
          const increment = weightUnit === 'kg' ? '2.5kg' : '5lbs';

          return (
            <div key={`${ex.exerciseId}-${exIdx}`} className="bg-white dark:bg-surface-dark-alt rounded-2xl p-4 shadow-sm">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <ProgressRing status={comparison.status} size={24}>
                    <MuscleGroupIcon group={exData.muscleGroup} size={16} className="text-primary-400" />
                  </ProgressRing>
                  <h3 className="font-semibold">{t(ex.nameKey)}</h3>
                  <MiniSparkline data={sparkData} />
                </div>
                <button onClick={() => setNoteModal({ exerciseId: ex.exerciseId, name: t(ex.nameKey) })}
                  className={`p-1.5 ${exerciseNotes[ex.exerciseId]?.note || exerciseNotes[ex.exerciseId]?.settings?.length ? 'text-primary-400' : 'text-slate-400 hover:text-primary-500'}`}>
                  <StickyNote className="w-4 h-4" />
                </button>
                <button onClick={() => ctx.removeExercise(exIdx)} className="p-1.5 text-slate-400 hover:text-red-500">
                  <X className="w-4 h-4" />
                </button>
              </div>

              {lastSession ? (
                <p className="text-xs text-slate-400 dark:text-slate-500 mb-2">
                  {t('training.lastTime')}: {lastSession.sets.map((s) => `${s.weight}${t(`training.${weightUnit}`)} × ${s.reps}`).join(', ')}
                </p>
              ) : (
                <p className="text-xs text-green-500 mb-2">{t('training.firstTime')}</p>
              )}

              {/* Note preview */}
              {exerciseNotes[ex.exerciseId] && (exerciseNotes[ex.exerciseId].note || exerciseNotes[ex.exerciseId].settings?.length > 0) && (
                <div className="bg-primary-50 dark:bg-primary-900/10 rounded-lg px-2.5 py-1.5 mb-2">
                  {exerciseNotes[ex.exerciseId].settings?.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mb-1">
                      {exerciseNotes[ex.exerciseId].settings.map((s, si) => (
                        <span key={si} className="text-[10px] font-semibold text-primary-500 bg-primary-100 dark:bg-primary-900/30 px-1.5 py-0.5 rounded">
                          {s.label}: {s.value}
                        </span>
                      ))}
                    </div>
                  )}
                  {exerciseNotes[ex.exerciseId].note && (
                    <p className="text-[10px] text-primary-400 truncate">{exerciseNotes[ex.exerciseId].note}</p>
                  )}
                </div>
              )}

              <div className="flex items-center gap-2 mb-2">
                {editingTarget === ex.exerciseId ? (
                  <div className="flex items-center gap-1">
                    <Target className="w-3.5 h-3.5 text-primary-500" />
                    <input
                      type="number"
                      inputMode="numeric"
                      defaultValue={target}
                      autoFocus
                      onBlur={(e) => { setExerciseTarget(ex.exerciseId, parseInt(e.target.value) || 12); setEditingTarget(null); }}
                      onKeyDown={(e) => { if (e.key === 'Enter') e.target.blur(); }}
                      className="w-12 px-1 py-0.5 rounded text-xs text-center bg-slate-50 dark:bg-slate-800 border border-primary-300 focus:outline-none"
                    />
                    <span className="text-xs text-slate-400">{t('training.reps')}</span>
                  </div>
                ) : (
                  <button onClick={() => setEditingTarget(ex.exerciseId)} className="flex items-center gap-1 text-xs text-slate-400 hover:text-primary-500">
                    <Target className="w-3.5 h-3.5" />
                    <span>{t('training.target')}: {target} {t('training.reps')}</span>
                    <span className="text-slate-300 dark:text-slate-600 mx-1">·</span>
                    <span className={setsAtTarget > 0 ? 'text-green-500' : ''}>{t('training.setsReached', { count: setsAtTarget, total: ex.sets.length })}</span>
                  </button>
                )}
              </div>

              {allAtTarget && (
                <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg px-3 py-2 mb-2 text-xs text-green-700 dark:text-green-400 font-medium">
                  {t('training.allSetsAtTarget', { increment })}
                </div>
              )}

              <div className="grid grid-cols-[2.5rem_1fr_1fr_2rem] gap-2 items-center text-xs font-medium text-slate-400 dark:text-slate-500 mb-2">
                <span className="text-center">{t('training.set')}</span>
                <span className="text-center">{t('training.weight')} ({t(`training.${weightUnit}`)})</span>
                <span className="text-center">{t('training.reps')}</span>
                <span></span>
              </div>

              {ex.sets.map((set, setIdx) => {
                const setStatus = progress.getSetComparison(ex.exerciseId, setIdx, set);
                const borderColor = setStatus === 'improved' ? 'border-green-400 dark:border-green-600'
                  : setStatus === 'worse' ? 'border-red-400 dark:border-red-600'
                  : 'border-slate-200 dark:border-slate-700';

                return (
                  <div key={setIdx} className="grid grid-cols-[2.5rem_1fr_1fr_2rem] gap-2 items-center mb-2">
                    <span className="text-sm text-center text-slate-400 font-semibold">{setIdx + 1}</span>
                    <input
                      type="number"
                      inputMode="decimal"
                      value={set.weight}
                      onChange={(e) => ctx.updateSet(exIdx, setIdx, 'weight', e.target.value)}
                      placeholder="0"
                      className={`w-full px-2 py-2 rounded-lg bg-slate-50 dark:bg-slate-800 border ${borderColor} text-sm text-center focus:outline-none focus:ring-2 focus:ring-primary-400`}
                    />
                    <input
                      type="number"
                      inputMode="decimal"
                      value={set.reps}
                      onChange={(e) => ctx.updateSet(exIdx, setIdx, 'reps', e.target.value)}
                      placeholder="0"
                      className={`w-full px-2 py-2 rounded-lg bg-slate-50 dark:bg-slate-800 border ${borderColor} text-sm text-center focus:outline-none focus:ring-2 focus:ring-primary-400`}
                    />
                    <button onClick={() => ctx.removeSet(exIdx, setIdx)} className="flex items-center justify-center text-slate-300 hover:text-red-400">
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                );
              })}

              <button onClick={() => ctx.addSet(exIdx)} className="w-full text-sm text-primary-500 hover:text-primary-600 font-medium py-1.5 mt-1">
                {t('training.addSet')}
              </button>
            </div>
          );
        })}
      </div>

      <div className="flex flex-col gap-3 mt-6">
        <button onClick={onAddExercise} className="w-full border-2 border-dashed border-slate-300 dark:border-slate-600 rounded-2xl py-3 flex items-center justify-center gap-2 text-slate-500 dark:text-slate-400 hover:border-primary-400 hover:text-primary-500 transition-colors">
          <Plus className="w-5 h-5" />
          {t('training.addExercise')}
        </button>
        <button onClick={handleFinish} className="w-full bg-green-600 hover:bg-green-700 text-white rounded-2xl py-3.5 font-semibold flex items-center justify-center gap-2 transition-colors">
          <Check className="w-5 h-5" />
          {t('training.finishWorkout')}
        </button>
        <button onClick={() => setShowDiscardConfirm(true)} className="w-full text-red-500 hover:text-red-600 font-medium py-2 text-sm transition-colors">
          {t('training.discardWorkout')}
        </button>
      </div>

      {showDiscardConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-surface-dark-alt rounded-2xl p-6 w-full max-w-sm shadow-xl">
            <p className="text-center font-semibold mb-4">{t('training.confirmDiscard')}</p>
            <div className="flex gap-3">
              <button onClick={() => setShowDiscardConfirm(false)} className="flex-1 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 font-medium text-sm">{t('common.cancel')}</button>
              <button onClick={handleDiscard} className="flex-1 py-2.5 rounded-xl bg-red-500 hover:bg-red-600 text-white font-medium text-sm">{t('training.discardWorkout')}</button>
            </div>
          </div>
        </div>
      )}

      {showNoValidSets && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-surface-dark-alt rounded-2xl p-6 w-full max-w-sm shadow-xl">
            <p className="text-center font-semibold mb-2">{t('training.noValidSets')}</p>
            <p className="text-center text-sm text-slate-500 dark:text-slate-400 mb-4">{t('training.noValidSetsDesc')}</p>
            <button onClick={() => setShowNoValidSets(false)} className="w-full py-2.5 rounded-xl bg-primary-500 hover:bg-primary-500 text-white font-medium text-sm">OK</button>
          </div>
        </div>
      )}

      {showSaveAsPlan && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-surface-dark-alt rounded-2xl p-6 w-full max-w-sm shadow-xl">
            <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-primary-50 dark:bg-primary-900/30 mx-auto mb-3">
              <Save className="w-6 h-6 text-primary-500" />
            </div>
            <p className="text-center font-semibold mb-1">{t('training.saveAsPlan')}</p>
            <p className="text-center text-sm text-slate-500 dark:text-slate-400 mb-4">{t('training.saveAsPlanDesc')}</p>
            <input type="text" value={planName} onChange={(e) => setPlanName(e.target.value)} placeholder={t('training.savePlanName')} className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-primary-400 mb-4" />
            <div className="flex gap-3">
              <button onClick={handleSkipSavePlan} className="flex-1 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 font-medium text-sm">{t('training.no')}</button>
              <button onClick={handleSaveAsPlan} disabled={!planName.trim()} className="flex-1 py-2.5 rounded-xl bg-primary-500 hover:bg-primary-600 disabled:opacity-50 text-white font-medium text-sm">{t('training.yes')}</button>
            </div>
          </div>
        </div>
      )}

      {noteModal && (
        <ExerciseNoteModal
          exerciseId={noteModal.exerciseId}
          exerciseName={noteModal.name}
          initialNote={exerciseNotes[noteModal.exerciseId]?.note || ''}
          initialSettings={exerciseNotes[noteModal.exerciseId]?.settings || []}
          onClose={() => setNoteModal(null)}
          onSaved={(note, settings) => {
            setExerciseNotes((prev) => ({ ...prev, [noteModal.exerciseId]: { ...prev[noteModal.exerciseId], note, settings } }));
          }}
        />
      )}
    </div>
  );
}
