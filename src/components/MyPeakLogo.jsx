import { useContext } from 'react';
import { PullToRefreshContext } from './PullToRefresh';

export default function MyPeakLogo({ size = 36, className = '' }) {
  const ptr = useContext(PullToRefreshContext);
  const animating = ptr?.refreshing || false;

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 512 512"
      fill="none"
      className={className}
    >
      <polyline
        points="45,400 130,270 195,340 275,210 340,280 430,150"
        stroke="#fbbf24"
        strokeWidth="9"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={animating ? 'ptr-line-animate' : ''}
      />
      <path
        d="M400,165 L430,150 L432,183"
        stroke="#fbbf24"
        strokeWidth="9"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={animating ? 'ptr-arrow-animate' : ''}
      />
    </svg>
  );
}
