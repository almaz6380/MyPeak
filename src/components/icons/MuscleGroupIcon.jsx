export default function MuscleGroupIcon({ group, size = 40, className = '' }) {
  const icons = {
    chest: ChestIcon,
    back: BackIcon,
    shoulders: ShouldersIcon,
    biceps: BicepsIcon,
    triceps: TricepsIcon,
    legs: LegsIcon,
    glutes: GlutesIcon,
    abs: AbsIcon,
    calves: CalvesIcon,
    forearms: ForearmsIcon,
    cardio: CardioIcon,
    hiit: HiitIcon,
    circuit: CircuitIcon,
    'martial-arts': MartialArtsIcon,
  };

  const Icon = icons[group];
  if (!Icon) return null;

  return <Icon size={size} className={className} />;
}

function ChestIcon({ size, className }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none" className={className}>
      <path d="M20 6c-5 0-9 2-11 5-1.5 2.5-2 5-2 8h26c0-3-.5-5.5-2-8-2-3-6-5-11-5z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M12 13c2-1 4-1.5 8-1.5s6 .5 8 1.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <ellipse cx="14.5" cy="15" rx="4" ry="3.5" fill="currentColor" opacity="0.2" />
      <ellipse cx="25.5" cy="15" rx="4" ry="3.5" fill="currentColor" opacity="0.2" />
      <path d="M7 19c0 4 1 7 3 10M33 19c0 4-1 7-3 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="20" y1="19" x2="20" y2="34" stroke="currentColor" strokeWidth="1" opacity="0.3" />
    </svg>
  );
}

function BackIcon({ size, className }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none" className={className}>
      <path d="M20 4c-2 0-3 1-3 2v2c0 1 1 2 3 2s3-1 3-2V6c0-1-1-2-3-2z" stroke="currentColor" strokeWidth="1.5" />
      <path d="M14 10c-3 1-5 3-6 6s-1 6 0 9M26 10c3 1 5 3 6 6s1 6 0 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M14 10h12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M12 16c2 1 5 2 8 2s6-1 8-2" stroke="currentColor" strokeWidth="1" opacity="0.4" />
      <path d="M13 14l-1 10c0 2 1 4 3 5l5 3 5-3c2-1 3-3 3-5l-1-10" fill="currentColor" opacity="0.15" />
      <rect x="18" y="12" width="4" height="14" rx="1" fill="currentColor" opacity="0.2" />
      <path d="M8 25l4 3v6M32 25l-4 3v6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ShouldersIcon({ size, className }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none" className={className}>
      <circle cx="20" cy="8" r="3" stroke="currentColor" strokeWidth="1.5" />
      <path d="M17 11c-3 0-6 1-8 3s-3 5-3 7M23 11c3 0 6 1 8 3s3 5 3 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <ellipse cx="10" cy="14" rx="3.5" ry="3" fill="currentColor" opacity="0.25" />
      <ellipse cx="30" cy="14" rx="3.5" ry="3" fill="currentColor" opacity="0.25" />
      <path d="M17 11h6" stroke="currentColor" strokeWidth="1.5" />
      <path d="M15 14v12M25 14v12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="20" y1="11" x2="20" y2="30" stroke="currentColor" strokeWidth="1" opacity="0.3" />
    </svg>
  );
}

function BicepsIcon({ size, className }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none" className={className}>
      <path d="M16 6c-2 0-4 1-4 3v4c0 3 1 6 3 8l2 2v10c0 2 1 3 3 3s3-1 3-3V23l2-2c2-2 3-5 3-8V9c0-2-2-3-4-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <ellipse cx="20" cy="14" rx="4" ry="5" fill="currentColor" opacity="0.25" />
      <path d="M16 13c1-2 3-3 4-3s3 1 4 3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      <line x1="20" y1="21" x2="20" y2="30" stroke="currentColor" strokeWidth="1" opacity="0.3" />
    </svg>
  );
}

function TricepsIcon({ size, className }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none" className={className}>
      <path d="M16 6c-2 0-4 1-4 3v4c0 3 1 6 3 8l2 2v10c0 2 1 3 3 3s3-1 3-3V23l2-2c2-2 3-5 3-8V9c0-2-2-3-4-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M22 10c1 2 2 5 2 7v4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.4" />
      <ellipse cx="22" cy="16" rx="2.5" ry="5" fill="currentColor" opacity="0.25" />
      <line x1="20" y1="21" x2="20" y2="30" stroke="currentColor" strokeWidth="1" opacity="0.3" />
    </svg>
  );
}

function LegsIcon({ size, className }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none" className={className}>
      <path d="M14 4h12v4c0 2-1 3-2 4l-1 2v8l-2 10h-2l-2-10v-8l-1-2c-1-1-2-2-2-4V4z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <rect x="14" y="4" width="12" height="3" rx="1" fill="currentColor" opacity="0.1" />
      <ellipse cx="17" cy="14" rx="3" ry="6" fill="currentColor" opacity="0.25" />
      <ellipse cx="23" cy="14" rx="3" ry="6" fill="currentColor" opacity="0.25" />
      <path d="M12 32h4l1-4M24 32h4l-1-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <line x1="20" y1="8" x2="20" y2="28" stroke="currentColor" strokeWidth="1" opacity="0.2" />
    </svg>
  );
}

function GlutesIcon({ size, className }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none" className={className}>
      <path d="M12 8h16v4c0 3-1 6-3 8l-1 2v10h-8V22l-1-2c-2-2-3-5-3-8V8z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <ellipse cx="15.5" cy="14" rx="4" ry="4.5" fill="currentColor" opacity="0.25" />
      <ellipse cx="24.5" cy="14" rx="4" ry="4.5" fill="currentColor" opacity="0.25" />
      <line x1="20" y1="10" x2="20" y2="22" stroke="currentColor" strokeWidth="1" opacity="0.3" />
      <path d="M14 32v-4M26 32v-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function AbsIcon({ size, className }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none" className={className}>
      <path d="M13 6c-2 1-3 3-3 5v14c0 3 2 6 5 8l5 3 5-3c3-2 5-5 5-8V11c0-2-1-4-3-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M17 11h6" stroke="currentColor" strokeWidth="1" opacity="0.3" />
      <rect x="15" y="13" width="4" height="4" rx="1" fill="currentColor" opacity="0.2" />
      <rect x="21" y="13" width="4" height="4" rx="1" fill="currentColor" opacity="0.2" />
      <rect x="15" y="19" width="4" height="4" rx="1" fill="currentColor" opacity="0.2" />
      <rect x="21" y="19" width="4" height="4" rx="1" fill="currentColor" opacity="0.2" />
      <rect x="16" y="25" width="3.5" height="3.5" rx="1" fill="currentColor" opacity="0.15" />
      <rect x="21" y="25" width="3.5" height="3.5" rx="1" fill="currentColor" opacity="0.15" />
      <line x1="20" y1="11" x2="20" y2="30" stroke="currentColor" strokeWidth="1" opacity="0.3" />
    </svg>
  );
}

function CalvesIcon({ size, className }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none" className={className}>
      <path d="M15 4v8c0 3 1 6 2 8l1 4v8c0 2 0 3-1 4h-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M25 4v8c0 3-1 6-2 8l-1 4v8c0 2 0 3 1 4h3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <ellipse cx="16" cy="16" rx="2.5" ry="5" fill="currentColor" opacity="0.25" />
      <ellipse cx="24" cy="16" rx="2.5" ry="5" fill="currentColor" opacity="0.25" />
    </svg>
  );
}

function ForearmsIcon({ size, className }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none" className={className}>
      <path d="M14 4c-1 0-2 1-2 3v10c0 4 1 7 3 9l3 3v5c0 1 .5 2 2 2s2-1 2-2v-5l3-3c2-2 3-5 3-9V7c0-2-1-3-2-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <ellipse cx="20" cy="20" rx="3.5" ry="6" fill="currentColor" opacity="0.25" />
      <path d="M16 14h8" stroke="currentColor" strokeWidth="1" opacity="0.3" />
      <path d="M17 18c1 1 2 2 3 2s2-1 3-2" stroke="currentColor" strokeWidth="1" opacity="0.4" />
    </svg>
  );
}

function CardioIcon({ size, className }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none" className={className}>
      <circle cx="20" cy="8" r="3" stroke="currentColor" strokeWidth="1.5" />
      <path d="M15 14l-4 8h5l-2 10 12-14h-6l3-6h-8z" fill="currentColor" opacity="0.15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M24 30l4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M12 30l-2-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function HiitIcon({ size, className }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none" className={className}>
      <path d="M22 4l-8 16h8l-8 16" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M22 4l-8 16h8l-8 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.3" fill="currentColor" />
    </svg>
  );
}

function CircuitIcon({ size, className }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none" className={className}>
      <circle cx="20" cy="20" r="12" stroke="currentColor" strokeWidth="1.5" strokeDasharray="4 3" />
      <circle cx="20" cy="20" r="5" fill="currentColor" opacity="0.15" stroke="currentColor" strokeWidth="1.5" />
      <path d="M20 8v-2M20 34v-2M8 20H6M34 20h-2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M28 12l2-2M10 30l2-2M28 28l2 2M10 10l2 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M32 18l2-2M32 22l2 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function MartialArtsIcon({ size, className }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none" className={className}>
      <path d="M12 18c0-4 2-7 5-8 2-1 4-1 6 0 3 1 5 4 5 8v4c0 3-2 5-4 6l-2 1v5h-8v-5l-2-1c-2-1-4-3-4-6v-4z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M14 18c0-2 1-4 3-5M17 22h6" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" opacity="0.4" />
      <ellipse cx="20" cy="19" rx="5" ry="4" fill="currentColor" opacity="0.15" />
      <path d="M16 14l-3-4M24 14l3-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />
      <path d="M20 10V6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />
    </svg>
  );
}
