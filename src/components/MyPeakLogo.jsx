export default function MyPeakLogo({ size = 28, showText = false, className = '' }) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="peakGrad" x1="0" y1="0" x2="32" y2="32" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#6366f1" />
            <stop offset="100%" stopColor="#8b5cf6" />
          </linearGradient>
          <linearGradient id="peakGradLight" x1="0" y1="0" x2="32" y2="32" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#818cf8" />
            <stop offset="100%" stopColor="#a78bfa" />
          </linearGradient>
        </defs>
        {/* Main peak */}
        <path
          d="M16 3L28 27H4L16 3Z"
          fill="url(#peakGrad)"
        />
        {/* Snow cap / highlight */}
        <path
          d="M16 3L21 13H11L16 3Z"
          fill="url(#peakGradLight)"
        />
        {/* Small secondary peak */}
        <path
          d="M24 15L30 27H18L24 15Z"
          fill="url(#peakGrad)"
          opacity="0.4"
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
