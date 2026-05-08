export default function MyPeakLogo({ size = 36, className = '' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg" className={className}>
      <rect x="0" y="0" width="512" height="512" rx="100" fill="#0a0a0a" />
      <polyline points="85,330 160,220 215,280 285,170 340,230 415,120" stroke="#fbbf24" strokeWidth="7" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M388,133 L415,120 L417,151" stroke="#fef3c7" strokeWidth="7" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <text x="256" y="418" textAnchor="middle" fontFamily="system-ui, -apple-system, sans-serif" fontSize="50" fontWeight="500" fill="#fef3c7" letterSpacing="3">MyPeak</text>
      <text x="256" y="458" textAnchor="middle" fontFamily="system-ui, -apple-system, sans-serif" fontSize="24" fontWeight="400" fill="#fbbf24" letterSpacing="6">FITNESS</text>
    </svg>
  );
}
