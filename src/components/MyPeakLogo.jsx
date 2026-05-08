export default function MyPeakLogo({ size = 32, className = '' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <defs>
        <linearGradient id="peakGrad" x1="2" y1="28" x2="30" y2="4" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#6366f1" />
          <stop offset="100%" stopColor="#a78bfa" />
        </linearGradient>
      </defs>
      {/* Unterer Pfeil-Teil: links unten → hoch → runter (stoppt weit vor Text) */}
      <path
        d="M2 29L9 18L13 22"
        stroke="url(#peakGrad)"
        strokeWidth="2.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      {/* Oberer Pfeil-Teil: startet weit nach Text → rechts oben + Spitze */}
      <path
        d="M19 12L28 2"
        stroke="url(#peakGrad)"
        strokeWidth="2.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <path
        d="M23 2H28V7"
        stroke="url(#peakGrad)"
        strokeWidth="2.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      {/* "MyPeak" Text — größer, in der Lücke */}
      <text
        x="16"
        y="19.5"
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
