import { useEffect, useState } from 'react';
import { Check, X } from 'lucide-react';

// Generischer Feedback-Toast (Vorbild: AchievementToast) — der Aufrufer
// hält den State und blendet aus, sobald onDismiss feuert.
export default function Toast({ message, variant = 'success', onDismiss }) {
  const [phase, setPhase] = useState('entering');

  useEffect(() => {
    const t1 = setTimeout(() => setPhase('showing'), 50);
    const t2 = setTimeout(() => setPhase('exiting'), 3600);
    const t3 = setTimeout(() => onDismiss(), 4000);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, [onDismiss, message]);

  const isError = variant === 'error';

  return (
    <div
      className={`fixed left-4 right-4 bottom-24 z-[190] flex justify-center transition-all duration-400 ${
        phase === 'showing' ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
      }`}
      onClick={onDismiss}
    >
      <div
        className={`flex items-center gap-3 bg-white dark:bg-surface-dark-alt rounded-2xl px-4 py-3 shadow-xl border max-w-sm ${
          isError ? 'border-red-300 dark:border-red-800' : 'border-primary-300 dark:border-primary-700'
        }`}
      >
        <span
          className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
            isError ? 'bg-red-100 dark:bg-red-900/30' : 'bg-primary-100 dark:bg-primary-900/30'
          }`}
        >
          {isError
            ? <X className="w-5 h-5 text-red-500" />
            : <Check className="w-5 h-5 text-primary-500" />}
        </span>
        <p className="text-sm font-medium text-slate-900 dark:text-white">{message}</p>
      </div>
    </div>
  );
}
