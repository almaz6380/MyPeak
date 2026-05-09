import { useState, useEffect } from 'react';

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
        {/* Zigzag line — animated draw */}
        <polyline
          points="85,330 160,220 215,280 285,170 340,230 415,120"
          stroke="#fbbf24"
          strokeWidth="9"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="splash-line"
        />

        {/* Arrow head */}
        <path
          d="M388,133 L415,120 L417,151"
          stroke="#fbbf24"
          strokeWidth="9"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="splash-arrow"
        />

        {/* MyPeak text — fade in after line draws */}
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
          MyPeak
        </text>

        {/* FITNESS text */}
        <text
          x="256" y="458"
          textAnchor="middle"
          fontFamily="system-ui, -apple-system, sans-serif"
          fontSize="24"
          fontWeight="400"
          fill="#fbbf24"
          letterSpacing="6"
          className={`transition-opacity duration-300 delay-100 ${phase === 'drawing' ? 'opacity-0' : 'opacity-100'}`}
        >
          FITNESS
        </text>
      </svg>
    </div>
  );
}
