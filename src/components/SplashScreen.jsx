import { useState, useEffect } from 'react';
import { LogoParts, LOGO_GOLD } from './FullRepLogo';

export default function SplashScreen({ onFinished }) {
  const [phase, setPhase] = useState('drawing'); // drawing | text | fading | done

  useEffect(() => {
    const t1 = setTimeout(() => setPhase('text'), 600);
    const t2 = setTimeout(() => setPhase('fading'), 1200);
    const t3 = setTimeout(() => onFinished(), 1600);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, [onFinished]);

  return (
    <div className={`fixed inset-0 bg-[#0a0a0a] flex items-center justify-center z-[100] transition-opacity duration-400 ${phase === 'fading' ? 'opacity-0' : 'opacity-100'}`}>
      <svg width="280" height="280" viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Zeichen verkleinert und nach oben gerueckt, damit darunter Platz fuer den Schriftzug bleibt */}
        <g transform="translate(87,47) scale(0.66)">
          <circle
            cx="256"
            cy="256"
            r="176"
            stroke={LOGO_GOLD}
            strokeWidth="15"
            fill="none"
            className="splash-circle"
          />
          <LogoParts className="splash-parts" />
        </g>

        {/* FullRep — blendet ein, nachdem der Kreis gezeichnet ist */}
        <text
          x="256" y="418"
          textAnchor="middle"
          fontFamily="system-ui, -apple-system, sans-serif"
          fontSize="50"
          fontWeight="500"
          fill="#fef3c7"
          letterSpacing="3"
          className={`transition-opacity duration-300 ${phase === 'drawing' ? 'opacity-0' : 'opacity-100'}`}
        >
          FullRep
        </text>

        <text
          x="256" y="458"
          textAnchor="middle"
          fontFamily="system-ui, -apple-system, sans-serif"
          fontSize="24"
          fontWeight="400"
          fill={LOGO_GOLD}
          letterSpacing="6"
          className={`transition-opacity duration-300 delay-100 ${phase === 'drawing' ? 'opacity-0' : 'opacity-100'}`}
        >
          FITNESS
        </text>
      </svg>
    </div>
  );
}
