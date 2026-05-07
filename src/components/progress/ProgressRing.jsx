/**
 * Color-coded ring around an element indicating progress status.
 * Green = improved, amber = same, red = worse, transparent = no data.
 */
export default function ProgressRing({ status = 'none', size = 28, children, className = '' }) {
  const colors = {
    improved: '#22c55e',
    same: '#f59e0b',
    worse: '#ef4444',
    none: 'transparent',
  };

  const strokeColor = colors[status] || colors.none;
  const r = size / 2 - 2;
  const circumference = 2 * Math.PI * r;

  return (
    <div className={`relative inline-flex items-center justify-center ${className}`} style={{ width: size, height: size }}>
      {status !== 'none' && (
        <svg
          className="absolute inset-0"
          width={size}
          height={size}
          viewBox={`0 0 ${size} ${size}`}
        >
          <circle
            cx={size / 2}
            cy={size / 2}
            r={r}
            fill="none"
            stroke={strokeColor}
            strokeWidth={2.5}
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={0}
            opacity={0.8}
          />
        </svg>
      )}
      {children}
    </div>
  );
}
