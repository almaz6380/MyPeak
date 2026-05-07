import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Plus, Trash2, X, Check, Save } from 'lucide-react';
import { saveWorkout, getPersonalRecord, getCustomPlans, saveCustomPlan } from '../../data/workoutStorage';
import { useAuth } from '../../context/AuthContext';

export default function ActiveWorkout({ initialExercises = [], onFinish, onDiscard, onAddExercise }) {
  const { t } = useTranslation();
  const { user } = useAuth();
  const [exercises, setExercises] = useState(
    initialExercises.map((ex) => ({
      exerciseId: ex.id,
      nameKey: ex.nameKey,
      sets: ex.presetSets
        ? Array.from({ length: ex.presetSets }, () => ({ reps: String(ex.presetReps || ''), weight: '' }))
        : [{ reps: '', weight: '' }],
    }))
  );
  const [startTime] = useState(Date.now());
  const [elapsed, setElapsed] = useState(0);
  const [showDiscardConfirm, setShowDiscardConfirm] = useState(false);
  const [showNoValidSets, setShowNoValidSets] = useState(false);
  const [showSaveAsPlan, setShowSaveAsPlan] = useState(false);
  const [planName, setPlanName] = useState('');
  const [pendingPrs, setPendingPrs] = useState({});
  const weightUnit = localStorage.getItem('weightUnit') || 'kg';

  // Track if workout was started from a plan (has presets) or empty
  const wasFromPlan = initialExercises.some((ex) => ex.presetSets);

  useEffect(() => {
    const timer = setInterval(() => setElapsed(Date.now() - startTime), 1000);
    return () => clearInterval(timer);
  }, [startTime]);

  useEffect(() => {
    setExercises((prev) => {
      const existingIds = new Set(prev.map((e) => e.exerciseId));
      const newOnes = initialExercises
        .filter((ex) => !existingIds.has(ex.id))
        .map((ex) => ({
          exerciseId: ex.id,
          nameKey: ex.nameKey,
          sets: [{ reps: '', weight: '' }],
        }));
      return newOnes.length > 0 ? [...prev, ...newOnes] : prev;
    });
  }, [initialExercises]);

  const formatTime = (ms) => {
    const mins = Math.floor(ms / 60000);
    const secs = Math.floor((ms % 60000) / 1000);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const updateSet = (exIdx, setIdx, field, value) => {
    setExercises((prev) => {
      const updated = [...prev];
      updated[exIdx] = { ...updated[exIdx], sets: [...updated[exIdx].sets] };
      updated[exIdx].sets[setIdx] = { ...updated[exIdx].sets[setIdx], [field]: value };
      return updated;
    });
  };

  const addSet = (exIdx) => {
    setExercises((prev) => {
      const updated = [...prev];
      const lastSet = updated[exIdx].sets[updated[exIdx].sets.length - 1];
      updated[exIdx] = {
        ...updated[exIdx],
        sets: [...updated[exIdx].sets, { reps: lastSet.reps, weight: lastSet.weight }],
      };
      return updated;
    });
  };

  const removeSet = (exIdx, setIdx) => {
    setExercises((prev) => {
      const updated = [...prev];
      if (updated[exIdx].sets.length <= 1) return prev;
      updated[exIdx] = {
        ...updated[exIdx],
        sets: updated[exIdx].sets.filter((_, i) => i !== setIdx),
      };
      return updated;
    });
  };

  const removeExercise = (exIdx) => {
    setExercises((prev) => prev.filter((_, i) => i !== exIdx));
  };

  const checkForPRs = async () => {
    const newPrs = {};
    for (const ex of exercises) {
      const record = await getPersonalRecord(user.id, ex.exerciseId);
      for (const set of ex.sets) {
        const w = parseFloat(set.weight);
        if (w && w > record.maxWeight) {
          newPrs[ex.exerciseId] = true;
        }
      }
    }
    return newPrs;
  };

  const handleFinish = async () => {
    const validExercises = exercises
      .map((ex) => ({
        ...ex,
        sets: ex.sets.filter((s) => s.reps && s.weight),
      }))
      .filter((ex) => ex.sets.length > 0);

    // No valid sets → show info dialog, don't save
    if (validExercises.length === 0) {
      setShowNoValidSets(true);
      return;
    }

    const detectedPrs = await checkForPRs();

    const workout = {
      date: new Date().toISOString(),
      duration: elapsed,
      exercises: validExercises.map((ex) => ({
        exerciseId: ex.exerciseId,
        nameKey: ex.nameKey,
        sets: ex.sets.map((s) => ({
          reps: parseInt(s.reps),
          weight: parseFloat(s.weight),
        })),
      })),
    };

    await saveWorkout(user.id, workout);

    // If workout was NOT from a plan, offer to save as plan
    if (!wasFromPlan && exercises.length > 0) {
      setPendingPrs(detectedPrs);
      setShowSaveAsPlan(true);
      return;
    }

    onFinish(detectedPrs);
  };

  const handleSaveAsPlan = async () => {
    if (!planName.trim()) return;
    const plan = {
      name: planName.trim(),
      days: [{ name: planName.trim(), exercises: exercises.map((ex) => ex.exerciseId) }],
    };
    await saveCustomPlan(user.id, plan);
    onFinish(pendingPrs);
  };

  const handleSkipSavePlan = () => {
    onFinish(pendingPrs);
  };

  return (
    <div className="p-4 pb-24">
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
        {exercises.map((ex, exIdx) => (
          <div key={`${ex.exerciseId}-${exIdx}`} className="bg-white dark:bg-surface-dark-alt rounded-2xl p-4 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold">{t(ex.nameKey)}</h3>
              <button onClick={() => removeExercise(exIdx)} className="p-1.5 text-slate-400 hover:text-red-500">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-[2.5rem_1fr_1fr_2rem] gap-2 items-center text-xs font-medium text-slate-400 dark:text-slate-500 mb-2">
              <span className="text-center">{t('training.set')}</span>
              <span className="text-center">{t('training.weight')} ({t(`training.${weightUnit}`)})</span>
              <span className="text-center">{t('training.reps')}</span>
              <span></span>
            </div>

            {ex.sets.map((set, setIdx) => (
              <div key={setIdx} className="grid grid-cols-[2.5rem_1fr_1fr_2rem] gap-2 items-center mb-2">
                <span className="text-sm text-center text-slate-400 font-semibold">{setIdx + 1}</span>
                <input
                  type="number"
                  inputMode="decimal"
                  value={set.weight}
                  onChange={(e) => updateSet(exIdx, setIdx, 'weight', e.target.value)}
                  placeholder="0"
                  className="w-full px-2 py-2 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm text-center focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
                <input
                  type="number"
                  inputMode="numeric"
                  value={set.reps}
                  onChange={(e) => updateSet(exIdx, setIdx, 'reps', e.target.value)}
                  placeholder="0"
                  className="w-full px-2 py-2 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm text-center focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
                <button
                  onClick={() => removeSet(exIdx, setIdx)}
                  className="flex items-center justify-center text-slate-300 hover:text-red-400"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}

            <button
              onClick={() => addSet(exIdx)}
              className="w-full text-sm text-primary-500 hover:text-primary-600 font-medium py-1.5 mt-1"
            >
              {t('training.addSet')}
            </button>
          </div>
        ))}
      </div>

      <div className="flex flex-col gap-3 mt-6">
        <button
          onClick={onAddExercise}
          className="w-full border-2 border-dashed border-slate-300 dark:border-slate-600 rounded-2xl py-3 flex items-center justify-center gap-2 text-slate-500 dark:text-slate-400 hover:border-primary-400 hover:text-primary-500 transition-colors"
        >
          <Plus className="w-5 h-5" />
          {t('training.addExercise')}
        </button>

        <button
          onClick={handleFinish}
          className="w-full bg-green-600 hover:bg-green-700 text-white rounded-2xl py-3.5 font-semibold flex items-center justify-center gap-2 transition-colors"
        >
          <Check className="w-5 h-5" />
          {t('training.finishWorkout')}
        </button>

        <button
          onClick={() => setShowDiscardConfirm(true)}
          className="w-full text-red-500 hover:text-red-600 font-medium py-2 text-sm transition-colors"
        >
          {t('training.discardWorkout')}
        </button>
      </div>

      {/* Discard confirmation */}
      {showDiscardConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-surface-dark-alt rounded-2xl p-6 w-full max-w-sm shadow-xl">
            <p className="text-center font-semibold mb-4">{t('training.confirmDiscard')}</p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowDiscardConfirm(false)}
                className="flex-1 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 font-medium text-sm hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
              >
                {t('common.cancel')}
              </button>
              <button
                onClick={onDiscard}
                className="flex-1 py-2.5 rounded-xl bg-red-500 hover:bg-red-600 text-white font-medium text-sm transition-colors"
              >
                {t('training.discardWorkout')}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* No valid sets info */}
      {showNoValidSets && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-surface-dark-alt rounded-2xl p-6 w-full max-w-sm shadow-xl">
            <p className="text-center font-semibold mb-2">{t('training.noValidSets')}</p>
            <p className="text-center text-sm text-slate-500 dark:text-slate-400 mb-4">{t('training.noValidSetsDesc')}</p>
            <button
              onClick={() => setShowNoValidSets(false)}
              className="w-full py-2.5 rounded-xl bg-primary-600 hover:bg-primary-700 text-white font-medium text-sm transition-colors dark:bg-primary-500"
            >
              OK
            </button>
          </div>
        </div>
      )}

      {/* Save as plan dialog */}
      {showSaveAsPlan && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-surface-dark-alt rounded-2xl p-6 w-full max-w-sm shadow-xl">
            <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-primary-50 dark:bg-primary-900/30 mx-auto mb-3">
              <Save className="w-6 h-6 text-primary-500" />
            </div>
            <p className="text-center font-semibold mb-1">{t('training.saveAsPlan')}</p>
            <p className="text-center text-sm text-slate-500 dark:text-slate-400 mb-4">{t('training.saveAsPlanDesc')}</p>
            <input
              type="text"
              value={planName}
              onChange={(e) => setPlanName(e.target.value)}
              placeholder={t('training.savePlanName')}
              className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 mb-4"
            />
            <div className="flex gap-3">
              <button
                onClick={handleSkipSavePlan}
                className="flex-1 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 font-medium text-sm hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
              >
                {t('training.no')}
              </button>
              <button
                onClick={handleSaveAsPlan}
                disabled={!planName.trim()}
                className="flex-1 py-2.5 rounded-xl bg-primary-600 hover:bg-primary-700 disabled:opacity-50 text-white font-medium text-sm transition-colors dark:bg-primary-500"
              >
                {t('training.yes')}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
