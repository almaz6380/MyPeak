export default function MyPeakLogo({ size = 28, showText = false, className = '' }) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="peakGrad" x1="16" y1="2" x2="16" y2="30" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#818cf8" />
            <stop offset="100%" stopColor="#6366f1" />
          </linearGradient>
          <linearGradient id="peakGrad2" x1="16" y1="2" x2="16" y2="30" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#a78bfa" />
            <stop offset="100%" stopColor="#8b5cf6" />
          </linearGradient>
        </defs>
        {/* Upward bolt / arrow */}
        <path
          d="M18 2L7 17h7l-2 13L25 15h-7l2-13z"
          fill="url(#peakGrad)"
        />
        <path
          d="M18 2L7 17h7"
          fill="url(#peakGrad2)"
        />
      </svg>
      {showText && (
        <span className="font-bold text-lg bg-gradient-to-r from-primary-500 to-violet-500 bg-clip-text text-transparent">
          MyPeak
        </span>
      )}
    </div>
  );
}
