export default function MyPeakLogo({ size = 32, className = '' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <defs>
        <linearGradient id="peakGrad" x1="2" y1="28" x2="30" y2="4" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#6366f1" />
          <stop offset="100%" stopColor="#a78bfa" />
        </linearGradient>
      </defs>
      {/* Zigzag bolt */}
      <path
        d="M3 26L12 14L17 19L28 4"
        stroke="url(#peakGrad)"
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      {/* Pfeilspitze */}
      <path
        d="M22 4H28V10"
        stroke="url(#peakGrad)"
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      {/* Weißer Balken überdeckt Pfad-Mitte */}
      <rect x="5" y="15" width="22" height="9" rx="2" className="fill-surface-alt dark:fill-surface-dark" />
      {/* MyPeak Text */}
      <text
        x="16"
        y="22"
        textAnchor="middle"
        fontFamily="Inter, system-ui, sans-serif"
        fontWeight="800"
        fontSize="7"
        fill="url(#peakGrad)"
      >
        MyPeak
      </text>
    </svg>
  );
}
