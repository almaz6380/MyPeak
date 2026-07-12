// Dezente Line-Art-Hintergrundmotive pro Bereich.
// Färbung über currentColor → Dark/Light Mode automatisch über Tailwind-Klassen.
// Alle Motive: viewBox 0 0 400 300, Stroke ~2, keine Fills außer subtilen Flächen.

const strokeProps = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 2,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
};

// Home: Bergpanorama mit Gipfel-Zigzag (Anlehnung ans MyPeak-Logo)
export function MountainMotif(props) {
  return (
    <svg viewBox="0 0 400 300" aria-hidden="true" {...props}>
      <g {...strokeProps}>
        <path d="M-10 260 L80 130 L130 190 L200 70 L260 160 L320 90 L410 240" />
        <path d="M170 120 L200 70 L228 118" strokeWidth={3} />
        <path d="M60 260 L120 200 L170 250" opacity={0.6} />
        <path d="M240 250 L300 185 L360 245" opacity={0.6} />
        {/* Gipfel-Pfeil wie im Logo */}
        <path d="M300 60 L330 30 L345 45 L385 5" strokeWidth={3} />
        <path d="M365 5 L385 5 L385 25" strokeWidth={3} />
      </g>
    </svg>
  );
}

// Training: Langhantel + Hantelscheiben
export function GymMotif(props) {
  return (
    <svg viewBox="0 0 400 300" aria-hidden="true" {...props}>
      <g {...strokeProps}>
        {/* Langhantel diagonal */}
        <path d="M60 220 L340 100" strokeWidth={3} />
        <rect x="70" y="170" width="26" height="80" rx="8" transform="rotate(-23 83 210)" />
        <rect x="100" y="160" width="18" height="60" rx="7" transform="rotate(-23 109 190)" />
        <rect x="304" y="52" width="26" height="80" rx="8" transform="rotate(-23 317 92)" />
        <rect x="282" y="82" width="18" height="60" rx="7" transform="rotate(-23 291 112)" />
        {/* Kurzhantel klein unten rechts */}
        <path d="M280 250 L350 250" strokeWidth={3} opacity={0.6} />
        <rect x="272" y="236" width="12" height="28" rx="5" opacity={0.6} />
        <rect x="346" y="236" width="12" height="28" rx="5" opacity={0.6} />
      </g>
    </svg>
  );
}

// Ernährung: Teller mit Besteck + Apfel
export function FoodMotif(props) {
  return (
    <svg viewBox="0 0 400 300" aria-hidden="true" {...props}>
      <g {...strokeProps}>
        <circle cx="200" cy="160" r="95" />
        <circle cx="200" cy="160" r="62" opacity={0.6} />
        {/* Gabel links */}
        <path d="M60 90 L60 235" />
        <path d="M48 90 L48 130 M60 90 L60 130 M72 90 L72 130 M48 130 Q60 142 72 130" />
        {/* Messer rechts */}
        <path d="M340 90 Q352 130 340 165 L340 235" />
        {/* Apfel oben rechts */}
        <path d="M318 40 q-14 -4 -20 10 q-6 16 8 24 q10 6 18 0 q14 -8 8 -24 q-4 -12 -14 -10z" opacity={0.7} />
        <path d="M312 38 q2 -10 12 -12" opacity={0.7} />
      </g>
    </svg>
  );
}

// Bibliothek: aufgeschlagenes Buch
export function BookMotif(props) {
  return (
    <svg viewBox="0 0 400 300" aria-hidden="true" {...props}>
      <g {...strokeProps}>
        <path d="M200 70 C160 45 100 45 60 62 L60 230 C100 213 160 213 200 238 C240 213 300 213 340 230 L340 62 C300 45 240 45 200 70 Z" />
        <path d="M200 70 L200 238" />
        <path d="M85 95 C120 85 160 88 185 100 M85 130 C120 120 160 123 185 135 M85 165 C120 155 160 158 185 170" opacity={0.6} />
        <path d="M215 100 C240 88 280 85 315 95 M215 135 C240 123 280 120 315 130 M215 170 C240 158 280 155 315 165" opacity={0.6} />
      </g>
    </svg>
  );
}

// Profil: Silhouette mit Gipfel-Ambition
export function ProfileMotif(props) {
  return (
    <svg viewBox="0 0 400 300" aria-hidden="true" {...props}>
      <g {...strokeProps}>
        <circle cx="200" cy="95" r="42" />
        <path d="M120 260 C120 200 150 168 200 168 C250 168 280 200 280 260" />
        {/* Fortschritts-Zigzag daneben */}
        <path d="M305 200 L330 170 L345 185 L380 140" strokeWidth={3} opacity={0.7} />
        <path d="M362 140 L380 140 L380 158" strokeWidth={3} opacity={0.7} />
      </g>
    </svg>
  );
}
