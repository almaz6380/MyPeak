import { useTranslation } from 'react-i18next';
import { X } from 'lucide-react';
import MuscleGroupIcon from '../../components/icons/MuscleGroupIcon';
import ExerciseDemoImage from '../../components/ExerciseDemoImage';
import { hasDemo } from '../../data/exerciseDemos';

export default function ExerciseDetailSheet({ exercise, onClose }) {
  const { t } = useTranslation();
  if (!exercise) return null;

  const displayName = exercise._customName || t(exercise.nameKey);

  return (
    <div className="fixed inset-0 bg-black/60 flex items-end sm:items-center justify-center z-50" onClick={onClose}>
      <div
        className="bg-white dark:bg-surface-dark-alt rounded-t-3xl sm:rounded-2xl w-full max-w-lg shadow-xl p-5 pb-8 sm:pb-5 max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Kopf */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-primary-50 dark:bg-primary-900/20 flex items-center justify-center flex-shrink-0">
              <MuscleGroupIcon group={exercise.muscleGroup || exercise.type} size={26} className="text-primary-500" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white leading-tight">{displayName}</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                {exercise.muscleGroup ? t(`muscleGroups.${exercise.muscleGroup}`) : ''}
                {exercise.equipment ? ` · ${t(`equipment.${exercise.equipment}`)}` : ''}
              </p>
            </div>
          </div>
          <button onClick={onClose} className="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Demo (nur wenn vorhanden) */}
        {hasDemo(exercise.id) && (
          <div className="mb-4">
            <ExerciseDemoImage exerciseId={exercise.id} alt={displayName} />
          </div>
        )}

        {/* Beschreibung */}
        {exercise.descKey && (
          <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">{t(exercise.descKey)}</p>
        )}
      </div>
    </div>
  );
}
