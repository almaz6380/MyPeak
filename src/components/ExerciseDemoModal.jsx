import { X } from 'lucide-react';
import ExerciseDemoImage from './ExerciseDemoImage';

// Kleines Overlay mit der Übungs-Demo (z. B. aus dem aktiven Workout heraus)
export default function ExerciseDemoModal({ exerciseId, title, onClose }) {
  return (
    <div className="fixed inset-0 bg-black/60 flex items-end sm:items-center justify-center z-50" onClick={onClose}>
      <div
        className="bg-white dark:bg-surface-dark-alt rounded-t-3xl sm:rounded-2xl w-full max-w-lg shadow-xl p-5 pb-8 sm:pb-5"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">{title}</h3>
          <button onClick={onClose} className="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300">
            <X className="w-5 h-5" />
          </button>
        </div>
        <ExerciseDemoImage exerciseId={exerciseId} alt={title} />
      </div>
    </div>
  );
}
