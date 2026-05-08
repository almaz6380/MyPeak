export default function MyPeakLogo({ size = 36, className = '' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg" className={className}>
      <rect x="0" y="0" width="512" height="512" rx="100" fill="#0a0a0a" />
      <polyline points="85,370 160,250 215,310 285,200 340,260 415,150" stroke="#fbbf24" strokeWidth="7" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M388,163 L415,150 L417,181" stroke="#fef3c7" strokeWidth="7" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <text x="256" y="445" textAnchor="middle" fontFamily="system-ui, -apple-system, sans-serif" fontSize="48" fontWeight="500" fill="#fef3c7" letterSpacing="3">MyPeak</text>
      <text x="256" y="473" textAnchor="middle" fontFamily="system-ui, -apple-system, sans-serif" fontSize="16" fontWeight="400" fill="#fbbf24" letterSpacing="5" opacity="0.7">FITNESS</text>
    </svg>
  );
}
