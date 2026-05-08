export default function MyPeakLogo({ size = 28, showText = false, className = '' }) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="peakGrad" x1="2" y1="28" x2="30" y2="4" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#6366f1" />
            <stop offset="100%" stopColor="#a78bfa" />
          </linearGradient>
        </defs>
        {/* Zigzag bolt: links unten → rechts rauf → rechts runter → rechts rauf (Spitze) */}
        <path
          d="M3 26L12 14L17 19L28 4"
          stroke="url(#peakGrad)"
          strokeWidth="3.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
        {/* Pfeilspitze oben */}
        <path
          d="M22 4H28V10"
          stroke="url(#peakGrad)"
          strokeWidth="3.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
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
