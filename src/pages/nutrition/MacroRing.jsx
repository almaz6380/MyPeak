export default function MacroRing({ value = 0, goal = 1, label, unit, color = 'text-primary-500', strokeColor = 'stroke-primary-500', size = 72 }) {
  const radius = (size - 8) / 2;
  const circumference = 2 * Math.PI * radius;
  const progress = Math.min(value / (goal || 1), 1);
  const offset = circumference - progress * circumference;
  const isOver = value > goal;

  return (
    <div className="flex flex-col items-center gap-1">
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="-rotate-90">
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="currentColor"
            strokeWidth={4}
            className="text-slate-200 dark:text-slate-700"
          />
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            strokeWidth={4}
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            className={`transition-all duration-500 ${isOver ? 'stroke-red-500' : strokeColor}`}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className={`text-sm font-bold ${isOver ? 'text-red-500' : color}`}>
            {Math.round(value)}
          </span>
        </div>
      </div>
      <span className="text-xs text-slate-500 dark:text-slate-400">{label}</span>
      {goal > 0 && (
        <span className="text-[10px] text-slate-400 dark:text-slate-500">
          / {Math.round(goal)}{unit || ''}
        </span>
      )}
    </div>
  );
}
