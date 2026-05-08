export default function MyPeakLogo({ size = 32, className = '' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <defs>
        <linearGradient id="peakGrad" x1="2" y1="28" x2="30" y2="4" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#6366f1" />
          <stop offset="100%" stopColor="#a78bfa" />
        </linearGradient>
      </defs>
      {/* Unterer Pfeil-Teil: links unten → hoch → runter (stoppt vor Text) */}
      <path
        d="M2 28L10 16L14.5 20.5"
        stroke="url(#peakGrad)"
        strokeWidth="2.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      {/* Oberer Pfeil-Teil: nach Text weiter → rechts oben + Spitze */}
      <path
        d="M17.5 14L27 3"
        stroke="url(#peakGrad)"
        strokeWidth="2.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <path
        d="M22 3H27V8"
        stroke="url(#peakGrad)"
        strokeWidth="2.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      {/* "MyPeak" Text — sitzt in der Lücke des Pfads */}
      <text
        x="16"
        y="19"
        textAnchor="middle"
        fontFamily="Inter, system-ui, sans-serif"
        fontWeight="800"
        fontSize="5.5"
        fill="url(#peakGrad)"
        letterSpacing="0.3"
      >
        MyPeak
      </text>
    </svg>
  );
}
