import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { ArrowLeft, Calendar, Dumbbell, TrendingUp, ChevronDown, ChevronUp, GitCompareArrows, X, ArrowUpRight, ArrowDownRight, Minus, Loader2, Trash2, BarChart3 } from 'lucide-react';
import { getWorkouts, deleteWorkout } from '../../data/workoutStorage';
import { useAuth } from '../../context/AuthContext';
import { getExerciseById } from '../../data/exercises';
import MuscleGroupIcon from '../../components/icons/MuscleGroupIcon';
import useProgressComparison from '../../hooks/useProgressComparison';
import ExerciseLineGraph from '../../components/progress/ExerciseLineGraph';

export default function WorkoutHistory({ onBack }) {
  const { t } = useTranslation();
  const { user } = useAuth();
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const weightUnit = localStorage.getItem('weightUnit') || 'kg';

  useEffect(() => {
    if (user) {
      getWorkouts(user.id).then((data) => {
        setWorkouts(data);
        setLoading(false);
      });
    }
  }, [user]);
  const [expandedId, setExpandedId] = useState(null);
  const [compareMode, setCompareMode] = useState(false);
  const [compareSelection, setCompareSelection] = useState([]);
  const [showComparison, setShowComparison] = useState(false);
  const [deleteConfirmId, setDeleteConfirmId] = useState(null);
  const [graphExercise, setGraphExercise] = useState(null);
  const progress = useProgressComparison(user?.id);
  const weeklyWorkouts = progress.getWorkoutsByWeek();

  const handleDeleteWorkout = async (workoutId) => {
    await deleteWorkout(user.id, workoutId);
    setWorkouts((prev) => prev.filter((w) => w.id !== workoutId));
    setDeleteConfirmId(null);
  };

  const formatDate = (iso) => {
    const d = new Date(iso);
    return d.toLocaleDateString(undefined, { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' });
  };

  const formatDuration = (ms) => {
    const mins = Math.floor(ms / 60000);
    if (mins < 60) return `${mins} min`;
    const hrs = Math.floor(mins / 60);
    const rem = mins % 60;
    return `${hrs}h ${rem}min`;
  };

  const totalVolume = (exercises) => {
    let vol = 0;
    for (const ex of exercises) {
      if (!ex.sets) continue;
      for (const set of ex.sets) {
        vol += (set.weight || 0) * (set.reps || 0);
      }
    }
    return vol.toLocaleString();
  };

  const bestSet = (sets) => {
    if (!sets || sets.length === 0) return null;
    let best = sets[0];
    for (const s of sets) {
      if (s.weight > best.weight || (s.weight === best.weight && s.reps > best.reps)) {
        best = s;
      }
    }
    return best;
  };

  const toggleExpanded = (id) => {
    if (compareMode) return;
    setExpandedId(expandedId === id ? null : id);
  };

  const toggleCompareSelect = (id) => {
    setCompareSelection((prev) => {
      if (prev.includes(id)) return prev.filter((x) => x !== id);
      if (prev.length >= 2) return [prev[1], id];
      return [...prev, id];
    });
  };

  const startCompare = () => {
    if (compareSelection.length === 2) setShowComparison(true);
  };

  const exitCompareMode = () => {
    setCompareMode(false);
    setCompareSelection([]);
    setShowComparison(false);
  };

  // Comparison view
  if (showComparison && compareSelection.length === 2) {
    const w1 = workouts.find((w) => w.id === compareSelection[0]);
    const w2 = workouts.find((w) => w.id === compareSelection[1]);
    if (!w1 || !w2) return null;

    // Older workout first
    const [older, newer] = new Date(w1.date) < new Date(w2.date) ? [w1, w2] : [w2, w1];

    // Build exercise comparison map
    const allExerciseIds = new Set([
      ...older.exercises.map((e) => e.exerciseId),
      ...newer.exercises.map((e) => e.exerciseId),
    ]);

    const comparisons = [];
    for (const exId of allExerciseIds) {
      const oldEx = older.exercises.find((e) => e.exerciseId === exId);
      const newEx = newer.exercises.find((e) => e.exerciseId === exId);
      const nameKey = (newEx || oldEx).nameKey;
      const oldBest = oldEx ? bestSet(oldEx.sets) : null;
      const newBest = newEx ? bestSet(newEx.sets) : null;
      const weightDiff = oldBest && newBest ? newBest.weight - oldBest.weight : null;

      comparisons.push({ exId, nameKey, oldEx, newEx, oldBest, newBest, weightDiff });
    }

    return (
      <div className="p-4 pb-24">
        <div className="flex items-center gap-3 mb-6">
          <button onClick={exitCompareMode} className="p-2 -ml-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-2xl font-bold">{t('training.compareWorkouts')}</h1>
        </div>

        {/* Date headers */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="bg-slate-100 dark:bg-slate-800 rounded-xl p-3 text-center">
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-0.5">{t('training.workout')} 1</p>
            <p className="text-sm font-medium">{formatDate(older.date)}</p>
          </div>
          <div className="bg-primary-50 dark:bg-primary-900/30 rounded-xl p-3 text-center">
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-0.5">{t('training.workout')} 2</p>
            <p className="text-sm font-medium">{formatDate(newer.date)}</p>
          </div>
        </div>

        {/* Exercise comparisons */}
        <div className="flex flex-col gap-3">
          {comparisons.map(({ exId, nameKey, oldBest, newBest, weightDiff }) => (
            <div key={exId} className="bg-white dark:bg-surface-dark-alt rounded-2xl p-4 shadow-sm">
              <h3 className="font-semibold mb-3">{t(nameKey)}</h3>
              <div className="grid grid-cols-[1fr_auto_1fr] gap-2 items-center">
                {/* Old */}
                <div className="text-center">
                  {oldBest ? (
                    <p className="text-sm text-slate-600 dark:text-slate-300">
                      {oldBest.weight} {t(`training.${weightUnit}`)} x {oldBest.reps}
                    </p>
                  ) : (
                    <p className="text-sm text-slate-400">—</p>
                  )}
                </div>

                {/* Arrow + diff */}
                <div className="flex flex-col items-center">
                  {weightDiff !== null ? (
                    weightDiff > 0 ? (
                      <div className="flex items-center gap-1 text-green-500">
                        <ArrowUpRight className="w-4 h-4" />
                        <span className="text-xs font-bold">+{weightDiff} {t(`training.${weightUnit}`)}</span>
                      </div>
                    ) : weightDiff < 0 ? (
                      <div className="flex items-center gap-1 text-red-500">
                        <ArrowDownRight className="w-4 h-4" />
                        <span className="text-xs font-bold">{weightDiff} {t(`training.${weightUnit}`)}</span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-1 text-slate-400">
                        <Minus className="w-4 h-4" />
                        <span className="text-xs">{t('training.noChange')}</span>
                      </div>
                    )
                  ) : (
                    <span className="text-xs text-slate-400">—</span>
                  )}
                </div>

                {/* New */}
                <div className="text-center">
                  {newBest ? (
                    <p className={`text-sm font-medium ${weightDiff && weightDiff > 0 ? 'text-green-600 dark:text-green-400' : 'text-slate-600 dark:text-slate-300'}`}>
                      {newBest.weight} {t(`training.${weightUnit}`)} x {newBest.reps}
                    </p>
                  ) : (
                    <p className="text-sm text-slate-400">—</p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Volume comparison */}
        <div className="mt-4 bg-white dark:bg-surface-dark-alt rounded-2xl p-4 shadow-sm">
          <h3 className="font-semibold mb-2">{t('training.totalVolume')}</h3>
          <div className="grid grid-cols-2 gap-3">
            <div className="text-center">
              <p className="text-lg font-bold text-slate-600 dark:text-slate-300">{totalVolume(older.exercises)}</p>
              <p className="text-xs text-slate-400">{t(`training.${weightUnit}`)}</p>
            </div>
            <div className="text-center">
              <p className="text-lg font-bold text-primary-600 dark:text-primary-400">{totalVolume(newer.exercises)}</p>
              <p className="text-xs text-slate-400">{t(`training.${weightUnit}`)}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Exercise graph view
  if (graphExercise) {
    const weeklyData = progress.getWeeklyHistory(graphExercise.exerciseId);
    const graphData = weeklyData.map((w) => ({
      label: w.week.split('-W')[1],
      value: w.maxWeight,
    }));

    return (
      <div className="p-4 pb-24">
        <div className="flex items-center gap-3 mb-6">
          <button onClick={() => setGraphExercise(null)} className="p-2 -ml-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-2xl font-bold">{t(graphExercise.nameKey)}</h1>
        </div>

        <div className="bg-white dark:bg-surface-dark-alt rounded-2xl p-4 shadow-sm mb-4">
          <h2 className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-3">
            {t('training.exerciseGraph')} — {t('training.maxWeightLabel')} ({t(`training.${weightUnit}`)})
          </h2>
          <ExerciseLineGraph data={graphData} unit={t(`training.${weightUnit}`)} />
        </div>

        {/* Weekly breakdown */}
        <div className="flex flex-col gap-2">
          {weeklyData.slice().reverse().map((w, i) => (
            <div key={i} className="bg-white dark:bg-surface-dark-alt rounded-xl p-3 shadow-sm flex items-center justify-between">
              <span className="text-sm font-medium">{t('training.calendarWeek', { week: w.week.split('-W')[1] })}</span>
              <div className="flex items-center gap-3 text-sm">
                <span className="font-semibold">{w.maxWeight} {t(`training.${weightUnit}`)}</span>
                <span className="text-xs text-slate-400">{t('training.totalVolume')}: {w.totalVolume.toLocaleString()}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 pb-24">
      <div className="flex items-center gap-3 mb-6">
        <button onClick={compareMode ? exitCompareMode : onBack} className="p-2 -ml-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h1 className="text-2xl font-bold flex-1">
          {compareMode ? t('training.selectToCompare') : t('training.history')}
        </h1>
        {!compareMode && workouts.length >= 2 && (
          <button
            onClick={() => setCompareMode(true)}
            className="p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-primary-500"
          >
            <GitCompareArrows className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Compare mode bottom bar */}
      {compareMode && (
        <div className="mb-4 bg-primary-50 dark:bg-primary-900/20 border border-primary-200 dark:border-primary-800 rounded-2xl p-3 flex items-center justify-between">
          <p className="text-sm text-primary-700 dark:text-primary-300">
            {compareSelection.length}/2 {t('training.selectToCompare')}
          </p>
          <button
            onClick={startCompare}
            disabled={compareSelection.length < 2}
            className="px-4 py-1.5 rounded-lg bg-primary-600 hover:bg-primary-700 disabled:opacity-40 text-white text-sm font-medium transition-colors dark:bg-primary-500"
          >
            {t('training.compare')}
          </button>
        </div>
      )}

      {loading ? (
        <div className="text-center py-16">
          <Loader2 className="w-8 h-8 text-primary-600 animate-spin mx-auto" />
        </div>
      ) : workouts.length === 0 ? (
        <div className="text-center py-16 text-slate-400 dark:text-slate-500">
          <Dumbbell className="w-12 h-12 mx-auto mb-3 opacity-50" />
          <p>{t('training.noHistory')}</p>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {weeklyWorkouts.map((week) => (
            <div key={week.weekYear}>
              {/* Week header */}
              <div className="flex items-center justify-between mb-2 px-1">
                <span className="text-sm font-semibold text-slate-600 dark:text-slate-300">
                  {t('training.calendarWeek', { week: week.weekNumber })}
                </span>
                <span className="text-xs text-slate-400">
                  {week.start.toLocaleDateString(undefined, { day: 'numeric', month: 'short' })} – {week.end.toLocaleDateString(undefined, { day: 'numeric', month: 'short' })}
                </span>
              </div>
              <div className="flex flex-col gap-3">
          {week.workouts.map((workout) => {
            const isExpanded = expandedId === workout.id;
            const isSelected = compareSelection.includes(workout.id);

            return (
              <div
                key={workout.id}
                onClick={() => compareMode ? toggleCompareSelect(workout.id) : null}
                className={`bg-white dark:bg-surface-dark-alt rounded-2xl shadow-sm transition-all ${
                  compareMode ? 'cursor-pointer' : ''
                } ${isSelected ? 'ring-2 ring-primary-500' : ''}`}
              >
                {/* Header — always visible */}
                <div
                  onClick={() => toggleExpanded(workout.id)}
                  className="p-4 cursor-pointer"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-primary-500" />
                      <span className="font-semibold text-sm">{formatDate(workout.date)}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-slate-400 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-md">
                        {formatDuration(workout.duration)}
                      </span>
                      {!compareMode && (
                        <button
                          onClick={(e) => { e.stopPropagation(); setDeleteConfirmId(workout.id); }}
                          className="p-1 text-slate-400 hover:text-red-500 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                      {!compareMode && (
                        isExpanded
                          ? <ChevronUp className="w-4 h-4 text-slate-400" />
                          : <ChevronDown className="w-4 h-4 text-slate-400" />
                      )}
                    </div>
                  </div>

                  {/* Summary line */}
                  <div className="flex items-center gap-3 text-xs text-slate-500 dark:text-slate-400">
                    {(!workout.type || workout.type === 'strength') ? (
                      <>
                        <span>{workout.exercises.length} {t('training.exercises')}</span>
                        <span>·</span>
                        <span>{t('training.totalVolume')}: {totalVolume(workout.exercises)} {t(`training.${weightUnit}`)}</span>
                      </>
                    ) : workout.type === 'cardio' ? (
                      <>
                        <span>{t('training.cardio')}</span>
                        <span>·</span>
                        <span>{workout.exercises[0]?.distance ? `${workout.exercises[0].distance} ${t('training.distanceKm')}` : ''}</span>
                      </>
                    ) : (
                      <>
                        <span>{t(`training.${workout.type}`)}</span>
                        <span>·</span>
                        <span>{workout.exercises[0]?.rounds || '?'} {t('training.rounds')}</span>
                      </>
                    )}
                  </div>

                  {/* Compact exercise list (collapsed) */}
                  {!isExpanded && (
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      {workout.exercises.map((ex, i) => {
                        const exData = getExerciseById(ex.exerciseId);
                        return (
                          <span key={i} className="text-xs bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-400 px-2 py-0.5 rounded-md inline-flex items-center gap-1">
                            <MuscleGroupIcon group={exData?.muscleGroup} size={14} className="text-primary-400" />
                            {t(ex.nameKey)}
                          </span>
                        );
                      })}
                    </div>
                  )}
                </div>

                {/* Expanded details */}
                {isExpanded && !compareMode && (
                  <div className="px-4 pb-4 border-t border-slate-100 dark:border-slate-700 pt-3">
                    <div className="flex flex-col gap-3">
                      {workout.exercises.map((ex, i) => {
                        const best = bestSet(ex.sets);
                        const isStrength = ex.sets && ex.sets.length > 0;
                        return (
                          <div key={i}>
                            <div className="flex items-center justify-between mb-1.5">
                              <button onClick={(e) => { e.stopPropagation(); setGraphExercise({ exerciseId: ex.exerciseId, nameKey: ex.nameKey }); }} className="font-medium text-sm flex items-center gap-1.5 hover:text-primary-500 transition-colors">
                                <MuscleGroupIcon group={(getExerciseById(ex.exerciseId) || {}).muscleGroup || workout.type} size={16} className="text-primary-400" />
                                {t(ex.nameKey)}
                                <BarChart3 className="w-3 h-3 text-slate-400" />
                              </button>
                              {isStrength && best && (
                                <span className="text-xs text-primary-500 font-medium">
                                  {t('training.bestSet')}: {best.weight}{t(`training.${weightUnit}`)} x {best.reps}
                                </span>
                              )}
                            </div>
                            {/* Cardio details */}
                            {ex.duration != null && !isStrength && (
                              <div className="flex gap-4 text-xs text-slate-600 dark:text-slate-400">
                                <span>{Math.floor(ex.duration / 60)} {t('training.min')}</span>
                                {ex.distance > 0 && <span>{ex.distance} {t('training.distanceKm')}</span>}
                              </div>
                            )}
                            {/* HIIT/Circuit details */}
                            {ex.rounds != null && (
                              <div className="flex gap-4 text-xs text-slate-600 dark:text-slate-400">
                                <span>{ex.rounds} {t('training.rounds')}</span>
                                <span>{ex.workTime}s {t('training.work')} / {ex.restTime}s {t('training.rest')}</span>
                              </div>
                            )}
                            {/* Strength set details */}
                            {isStrength && (
                            <div className="grid grid-cols-[2rem_1fr_1fr] gap-1 text-xs">
                              <span className="text-slate-400 text-center font-medium">#</span>
                              <span className="text-slate-400 text-center">{t('training.weight')}</span>
                              <span className="text-slate-400 text-center">{t('training.reps')}</span>
                              {ex.sets.map((set, si) => (
                                <div key={si} className="contents">
                                  <span className="text-slate-400 text-center">{si + 1}</span>
                                  <span className="text-center text-slate-700 dark:text-slate-300">{set.weight} {t(`training.${weightUnit}`)}</span>
                                  <span className="text-center text-slate-700 dark:text-slate-300">{set.reps}</span>
                                </div>
                              ))}
                            </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Delete confirmation dialog */}
      {deleteConfirmId && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-surface-dark-alt rounded-2xl p-6 w-full max-w-sm shadow-xl">
            <p className="text-center font-semibold mb-2">{t('training.deleteWorkout')}</p>
            <p className="text-center text-sm text-slate-500 dark:text-slate-400 mb-4">{t('training.confirmDeleteWorkout')}</p>
            <div className="flex gap-3">
              <button
                onClick={() => setDeleteConfirmId(null)}
                className="flex-1 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 font-medium text-sm hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
              >
                {t('common.cancel')}
              </button>
              <button
                onClick={() => handleDeleteWorkout(deleteConfirmId)}
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
