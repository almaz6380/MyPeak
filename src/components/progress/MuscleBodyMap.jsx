// Stilisierte Körper-Silhouette (Front/Back) mit einfärbbaren Muskelregionen.
// Proportionen je nach Profil-Geschlecht: 'male' (breite Schultern, V-Form)
// oder 'female' (schmalere Schultern, betonte Taille/Hüfte).
// intensities: { muscleGroup: 0..4 } — Stufen aus useMuscleHeatmap.intensityLevel.

const INTENSITY_FILL = {
  1: { fill: '#fde68a', opacity: 0.55 },
  2: { fill: '#fcd34d', opacity: 0.75 },
  3: { fill: '#fbbf24', opacity: 0.9 },
  4: { fill: '#f59e0b', opacity: 1 },
};

// Geometrie-Parameter pro Geschlecht
const GEOM = {
  male: {
    shoulderX: 63, shoulderR: 11,
    torso: 'M60 62 Q100 53 140 62 Q136 100 130 128 Q124 160 123 200 L77 200 Q76 160 70 128 Q64 100 60 62 Z',
    armL: 'M58 66 Q45 98 43 138 L39 193 Q38 201 45 202 Q52 203 53 195 L58 140 Q61 102 69 74 Z',
    armR: 'M142 66 Q155 98 157 138 L161 193 Q162 201 155 202 Q148 203 147 195 L142 140 Q139 102 131 74 Z',
    legL: 'M77 200 Q71 255 72 300 L74 393 Q74 401 81 401 Q88 401 88 393 L92 302 Q96 250 98 205 Z',
    legR: 'M123 200 Q129 255 128 300 L126 393 Q126 401 119 401 Q112 401 112 393 L108 302 Q104 250 102 205 Z',
    chest: { cx: [85, 115], cy: 94, rx: 15, ry: 13 },
    absX: 86, absW: 28,
    arm: { cx: [51, 149], forearmCx: [44, 156] },
    thighCx: [85, 115], thighRy: 44,
    gluteRx: 14, gluteRy: 13,
    back: 'M74 70 Q100 63 126 70 L122 128 Q112 148 100 152 Q88 148 78 128 Z',
  },
  female: {
    shoulderX: 68, shoulderR: 9.5,
    torso: 'M66 62 Q100 55 134 62 Q130 95 122 122 Q114 150 116 170 Q124 188 126 205 L74 205 Q76 188 84 170 Q86 150 78 122 Q70 95 66 62 Z',
    armL: 'M64 66 Q51 98 49 136 L45 191 Q44 199 51 200 Q58 201 59 193 L63 138 Q66 102 73 74 Z',
    armR: 'M136 66 Q149 98 151 136 L155 191 Q156 199 149 200 Q142 201 141 193 L137 138 Q134 102 127 74 Z',
    legL: 'M76 205 Q70 258 72 302 L75 393 Q75 401 82 401 Q88 401 88 393 L92 302 Q96 252 98 208 Z',
    legR: 'M124 205 Q130 258 128 302 L125 393 Q125 401 118 401 Q112 401 112 393 L108 302 Q104 252 102 208 Z',
    chest: { cx: [87, 113], cy: 96, rx: 12, ry: 11 },
    absX: 89, absW: 22,
    arm: { cx: [56, 144], forearmCx: [50, 150] },
    thighCx: [85, 115], thighRy: 42,
    gluteRx: 15, gluteRy: 14,
    back: 'M78 70 Q100 64 122 70 L118 125 Q110 145 100 149 Q90 145 82 125 Z',
  },
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

function Skeleton({ g }) {
  return (
    <g className="fill-slate-100 dark:fill-slate-800/60 stroke-slate-300 dark:stroke-slate-700" strokeWidth="1.5" strokeLinejoin="round">
      <circle cx="100" cy="28" r="15" />
      <path d="M93 42 Q100 48 107 42 L107 56 L93 56 Z" />
      <path d={g.torso} />
      <path d={g.armL} />
      <path d={g.armR} />
      <path d={g.legL} />
      <path d={g.legR} />
    </g>
  );
}

export default function MuscleBodyMap({ view = 'front', gender = 'male', intensities = {}, onSelectGroup, className }) {
  const g = GEOM[gender] || GEOM.male;

  const R = (group, children) => (
    <Region key={group + view} group={group} intensities={intensities} onSelect={onSelectGroup}>
      {children}
    </Region>
  );

  return (
    <svg viewBox="0 0 200 415" className={className} aria-hidden="true">
      <Skeleton g={g} />
      {view === 'front' ? (
        <>
          {R('shoulders', <><circle cx={g.shoulderX} cy="74" r={g.shoulderR} /><circle cx={200 - g.shoulderX} cy="74" r={g.shoulderR} /></>)}
          {R('chest', <><ellipse cx={g.chest.cx[0]} cy={g.chest.cy} rx={g.chest.rx} ry={g.chest.ry} /><ellipse cx={g.chest.cx[1]} cy={g.chest.cy} rx={g.chest.rx} ry={g.chest.ry} /></>)}
          {R('biceps', <><ellipse cx={g.arm.cx[0]} cy="112" rx="7.5" ry="16" /><ellipse cx={g.arm.cx[1]} cy="112" rx="7.5" ry="16" /></>)}
          {R('forearms', <><ellipse cx={g.arm.forearmCx[0]} cy="166" rx="6" ry="21" /><ellipse cx={g.arm.forearmCx[1]} cy="166" rx="6" ry="21" /></>)}
          {R('abs', (
            <>
              <rect x={g.absX} y="114" width={g.absW} height="58" rx="10" />
              {(intensities.abs || 0) > 0 && (
                <>
                  <line x1="100" y1="120" x2="100" y2="166" className="stroke-white dark:stroke-surface-dark" strokeWidth="1.5" />
                  <line x1={g.absX + 2} y1="134" x2={g.absX + g.absW - 2} y2="134" className="stroke-white dark:stroke-surface-dark" strokeWidth="1.5" />
                  <line x1={g.absX + 2} y1="150" x2={g.absX + g.absW - 2} y2="150" className="stroke-white dark:stroke-surface-dark" strokeWidth="1.5" />
                </>
              )}
            </>
          ))}
          {R('legs', <><ellipse cx={g.thighCx[0]} cy="254" rx="12" ry={g.thighRy} /><ellipse cx={g.thighCx[1]} cy="254" rx="12" ry={g.thighRy} /></>)}
          {R('calves', <><ellipse cx="80" cy="350" rx="7" ry="27" /><ellipse cx="120" cy="350" rx="7" ry="27" /></>)}
        </>
      ) : (
        <>
          {R('shoulders', <><circle cx={g.shoulderX} cy="74" r={g.shoulderR} /><circle cx={200 - g.shoulderX} cy="74" r={g.shoulderR} /></>)}
          {R('back', <path d={g.back} />)}
          {R('triceps', <><ellipse cx={g.arm.cx[0]} cy="112" rx="7.5" ry="16" /><ellipse cx={g.arm.cx[1]} cy="112" rx="7.5" ry="16" /></>)}
          {R('forearms', <><ellipse cx={g.arm.forearmCx[0]} cy="166" rx="6" ry="21" /><ellipse cx={g.arm.forearmCx[1]} cy="166" rx="6" ry="21" /></>)}
          {R('glutes', <><ellipse cx="87" cy="208" rx={g.gluteRx} ry={g.gluteRy} /><ellipse cx="113" cy="208" rx={g.gluteRx} ry={g.gluteRy} /></>)}
          {R('legs', <><ellipse cx={g.thighCx[0]} cy="268" rx="12" ry="40" /><ellipse cx={g.thighCx[1]} cy="268" rx="12" ry="40" /></>)}
          {R('calves', <><ellipse cx="80" cy="350" rx="7.5" ry="29" /><ellipse cx="120" cy="350" rx="7.5" ry="29" /></>)}
        </>
      )}
    </svg>
  );
}
