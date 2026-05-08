export default function MyPeakLogo({ size = 28, className = '' }) {
  const width = size * 5.5;
  const height = size;

  return (
    <svg width={width} height={height} viewBox="0 0 176 32" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <defs>
        <linearGradient id="peakGrad" x1="0" y1="28" x2="176" y2="4" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#6366f1" />
          <stop offset="100%" stopColor="#a78bfa" />
        </linearGradient>
      </defs>
      {/* Left part of zigzag: start bottom-left → up-right */}
      <path
        d="M3 26L14 12"
        stroke="url(#peakGrad)"
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* "MyPeak" text in the middle */}
      <text
        x="88"
        y="22"
        textAnchor="middle"
        fontFamily="Inter, system-ui, -apple-system, sans-serif"
        fontWeight="800"
        fontSize="18"
        fill="url(#peakGrad)"
      >
        MyPeak
      </text>
      {/* Right part of zigzag: down-right → up-right with arrow */}
      <path
        d="M162 20L173 5"
        stroke="url(#peakGrad)"
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Arrow tip */}
      <path
        d="M168 5H173V10"
        stroke="url(#peakGrad)"
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
