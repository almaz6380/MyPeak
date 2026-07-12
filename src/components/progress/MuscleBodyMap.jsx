// Stilisierte Körper-Silhouette (Front/Back) mit einfärbbaren Muskelregionen.
// Bewusst geometrisch-reduziert (passend zur Line-Art der App), nicht anatomisch-realistisch.
// intensities: { muscleGroup: 0..4 } — Stufen aus useMuscleHeatmap.intensityLevel.

const INTENSITY_FILL = {
  1: { fill: '#fde68a', opacity: 0.55 },
  2: { fill: '#fcd34d', opacity: 0.75 },
  3: { fill: '#fbbf24', opacity: 0.9 },
  4: { fill: '#f59e0b', opacity: 1 },
};

function Region({ group, intensities, onSelect, children }) {
  const level = intensities[group] || 0;
  const style = level > 0
    ? { fill: INTENSITY_FILL[level].fill, fillOpacity: INTENSITY_FILL[level].opacity }
    : undefined;
  return (
    <g
      data-group={group}
      className={level === 0 ? 'fill-slate-200 dark:fill-slate-800' : ''}
      style={{ ...style, cursor: onSelect ? 'pointer' : 'default' }}
      onClick={onSelect ? () => onSelect(group) : undefined}
    >
      {children}
    </g>
  );
}

// Basis-Skelett (Kopf, Rumpf-Umriss, Arme, Beine) — gleiche Geometrie für beide Ansichten
function Skeleton() {
  return (
    <g className="fill-slate-100 dark:fill-slate-800/60 stroke-slate-300 dark:stroke-slate-700" strokeWidth="1.5">
      {/* Kopf + Hals */}
      <circle cx="100" cy="28" r="16" />
      <rect x="92" y="43" width="16" height="12" rx="4" />
      {/* Rumpf */}
      <path d="M62 62 Q100 54 138 62 L132 130 Q126 175 126 200 L74 200 Q74 175 68 130 Z" />
      {/* Arme */}
      <path d="M60 68 Q46 100 44 138 L40 195 Q40 202 46 202 Q52 202 53 195 L58 140 Q62 100 70 72 Z" />
      <path d="M140 68 Q154 100 156 138 L160 195 Q160 202 154 202 Q148 202 147 195 L142 140 Q138 100 130 72 Z" />
      {/* Beine */}
      <path d="M76 200 L72 300 L74 395 Q74 402 81 402 Q88 402 88 395 L92 300 L97 205 Z" />
      <path d="M124 200 L128 300 L126 395 Q126 402 119 402 Q112 402 112 395 L108 300 L103 205 Z" />
    </g>
  );
}

export default function MuscleBodyMap({ view = 'front', intensities = {}, onSelectGroup, className }) {
  const R = (group, children) => (
    <Region key={group + view} group={group} intensities={intensities} onSelect={onSelectGroup}>
      {children}
    </Region>
  );

  return (
    <svg viewBox="0 0 200 415" className={className} aria-hidden="true">
      <Skeleton />
      {view === 'front' ? (
        <>
          {R('shoulders', <><circle cx="64" cy="76" r="11" /><circle cx="136" cy="76" r="11" /></>)}
          {R('chest', <><ellipse cx="85" cy="94" rx="15" ry="13" /><ellipse cx="115" cy="94" rx="15" ry="13" /></>)}
          {R('biceps', <><ellipse cx="52" cy="112" rx="8" ry="17" /><ellipse cx="148" cy="112" rx="8" ry="17" /></>)}
          {R('forearms', <><ellipse cx="45" cy="168" rx="6.5" ry="22" /><ellipse cx="155" cy="168" rx="6.5" ry="22" /></>)}
          {R('abs', (
            <>
              <rect x="86" y="112" width="28" height="62" rx="9" />
              {(intensities.abs || 0) > 0 && (
                <>
                  <line x1="100" y1="118" x2="100" y2="168" className="stroke-white dark:stroke-surface-dark" strokeWidth="1.5" />
                  <line x1="88" y1="132" x2="112" y2="132" className="stroke-white dark:stroke-surface-dark" strokeWidth="1.5" />
                  <line x1="88" y1="150" x2="112" y2="150" className="stroke-white dark:stroke-surface-dark" strokeWidth="1.5" />
                </>
              )}
            </>
          ))}
          {R('legs', <><ellipse cx="85" cy="252" rx="12.5" ry="44" /><ellipse cx="115" cy="252" rx="12.5" ry="44" /></>)}
          {R('calves', <><ellipse cx="80" cy="350" rx="7" ry="28" /><ellipse cx="120" cy="350" rx="7" ry="28" /></>)}
        </>
      ) : (
        <>
          {R('shoulders', <><circle cx="64" cy="76" r="11" /><circle cx="136" cy="76" r="11" /></>)}
          {R('back', (
            <path d="M74 70 Q100 64 126 70 L122 128 Q112 148 100 152 Q88 148 78 128 Z" />
          ))}
          {R('triceps', <><ellipse cx="52" cy="112" rx="8" ry="17" /><ellipse cx="148" cy="112" rx="8" ry="17" /></>)}
          {R('forearms', <><ellipse cx="45" cy="168" rx="6.5" ry="22" /><ellipse cx="155" cy="168" rx="6.5" ry="22" /></>)}
          {R('glutes', <><ellipse cx="87" cy="208" rx="14" ry="13" /><ellipse cx="113" cy="208" rx="14" ry="13" /></>)}
          {R('legs', <><ellipse cx="85" cy="268" rx="12.5" ry="40" /><ellipse cx="115" cy="268" rx="12.5" ry="40" /></>)}
          {R('calves', <><ellipse cx="80" cy="350" rx="8" ry="30" /><ellipse cx="120" cy="350" rx="8" ry="30" /></>)}
        </>
      )}
    </svg>
  );
}
