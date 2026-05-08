export default function MyPeakLogo({ size = 32, className = '' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <defs>
        <linearGradient id="peakGrad" x1="2" y1="28" x2="30" y2="4" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#6366f1" />
          <stop offset="100%" stopColor="#a78bfa" />
        </linearGradient>
      </defs>
      {/* Pfeil komplett durchgehend */}
      <path
        d="M1 30L9 18L13 22L28 2"
        stroke="url(#peakGrad)"
        strokeWidth="2.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      {/* Pfeilspitze */}
      <path
        d="M23 2H28V7"
        stroke="url(#peakGrad)"
        strokeWidth="2.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      {/* Hintergrund-Block hinter dem Text (überdeckt den Pfeil) */}
      <rect x="4" y="8" width="24" height="9" rx="1.5" className="fill-surface-alt dark:fill-surface-dark" />
      {/* MyPeak Text im Vordergrund */}
      <text
        x="16"
        y="15"
        textAnchor="middle"
        fontFamily="Inter, system-ui, sans-serif"
        fontWeight="800"
        fontSize="8"
        fill="url(#peakGrad)"
      >
        MyPeak
      </text>
    </svg>
  );
}
