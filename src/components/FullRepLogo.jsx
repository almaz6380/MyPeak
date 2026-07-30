import { useContext } from 'react';
import { PullToRefreshContext } from './pullToRefreshContext';

// Symbolpfade 1:1 aus lucide-react (v1.14.0) — dieselben Icons, die BottomNav.jsx
// verwendet: Dumbbell, BookOpen, Apple. Nicht nachzeichnen; bei einem lucide-Update
// erneut von dort uebernehmen. Positionen wie in public/favicon.svg.
const DUMBBELL = [
  'M17.596 12.768a2 2 0 1 0 2.829-2.829l-1.768-1.767a2 2 0 0 0 2.828-2.829l-2.828-2.828a2 2 0 0 0-2.829 2.828l-1.767-1.768a2 2 0 1 0-2.829 2.829z',
  'm2.5 21.5 1.4-1.4',
  'm20.1 3.9 1.4-1.4',
  'M5.343 21.485a2 2 0 1 0 2.829-2.828l1.767 1.768a2 2 0 1 0 2.829-2.829l-6.364-6.364a2 2 0 1 0-2.829 2.829l1.768 1.767a2 2 0 0 0-2.828 2.829z',
  'm9.6 14.4 4.8-4.8',
];
const BOOK_OPEN = [
  'M12 7v14',
  'M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z',
];
const APPLE = [
  'M12 6.528V3a1 1 0 0 1 1-1h0',
  'M18.237 21A15 15 0 0 0 22 11a6 6 0 0 0-10-4.472A6 6 0 0 0 2 11a15.1 15.1 0 0 0 3.763 10 3 3 0 0 0 3.648.648 5.5 5.5 0 0 1 5.178 0A3 3 0 0 0 18.237 21',
];

// Hantel oben, Buch rechts, Apfel links
export const LOGO_SYMBOLS = [
  { paths: DUMBBELL, x: 212.0, y: 113.44 },
  { paths: BOOK_OPEN, x: 297.36, y: 261.28 },
  { paths: APPLE, x: 126.64, y: 261.28 },
];
export const LOGO_SYMBOL_SCALE = 3.6667;
export const LOGO_GOLD = '#fbbf24';

/** Speichen + Symbole — geteilt mit dem SplashScreen. */
export function LogoParts({ className = '' }) {
  return (
    <g className={className}>
      <g stroke={LOGO_GOLD} strokeWidth="15" fill="none" strokeLinecap="round" strokeLinejoin="round">
        <path d="M256,256 L103.58,168" />
        <path d="M256,256 L408.42,168" />
        <path d="M256,256 L256,432" />
      </g>
      {LOGO_SYMBOLS.map((s, i) => (
        <g
          key={i}
          transform={`translate(${s.x},${s.y}) scale(${LOGO_SYMBOL_SCALE})`}
          stroke={LOGO_GOLD}
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {s.paths.map((d, j) => <path key={j} d={d} />)}
        </g>
      ))}
    </g>
  );
}

export default function FullRepLogo({ size = 36, className = '' }) {
  const ptr = useContext(PullToRefreshContext);
  const animating = ptr?.refreshing || false;

  return (
    <svg width={size} height={size} viewBox="0 0 512 512" fill="none" className={className}>
      <circle
        cx="256"
        cy="256"
        r="176"
        stroke={LOGO_GOLD}
        strokeWidth="15"
        fill="none"
        className={animating ? 'ptr-circle-animate' : ''}
      />
      <LogoParts className={animating ? 'ptr-parts-animate' : ''} />
    </svg>
  );
}
