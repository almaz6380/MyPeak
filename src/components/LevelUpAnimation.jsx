import { useState, useEffect } from 'react';
import { getLevelTitle } from '../data/socialStorage';
import { beschriftung } from '../lib/sprache';

export default function LevelUpAnimation({ level, lang = 'de', onDismiss }) {
  const [phase, setPhase] = useState('entering'); // entering | showing | exiting
  const title = getLevelTitle(level);

  useEffect(() => {
    const t1 = setTimeout(() => setPhase('showing'), 100);
    const t2 = setTimeout(() => setPhase('exiting'), 2500);
    const t3 = setTimeout(() => onDismiss(), 3000);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, [onDismiss]);

  return (
    <div
      className={`fixed inset-0 z-[200] flex items-center justify-center bg-black/80 transition-opacity duration-500 ${
        phase === 'entering' ? 'opacity-0' : phase === 'exiting' ? 'opacity-0' : 'opacity-100'
      }`}
      onClick={onDismiss}
    >
      <div className={`text-center transition-all duration-700 ${
        phase === 'showing' ? 'scale-100 opacity-100' : 'scale-50 opacity-0'
      }`}>
        {/* Glow effect */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-64 h-64 rounded-full bg-primary-400/20 blur-3xl animate-pulse" />
        </div>

        {/* Level number */}
        <div className="relative">
          <p className="text-7xl font-black text-primary-400 drop-shadow-[0_0_30px_rgba(251,191,36,0.5)]">
            {level}
          </p>
          <p className="text-sm font-bold text-primary-300 tracking-widest uppercase mt-1">
            LEVEL UP
          </p>
        </div>

        {/* Title */}
        <div className="mt-4 px-6 py-2 rounded-full bg-primary-400/20 border border-primary-400/40 inline-block">
          <p className="text-lg font-bold text-primary-300">
            {title.emoji} {beschriftung(title, lang)}
          </p>
        </div>
      </div>
    </div>
  );
}
