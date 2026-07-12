import { useLocation } from 'react-router-dom';
import { MountainMotif, GymMotif, FoodMotif, BookMotif, ProfileMotif } from './backgrounds/motifs';

// Dezenter Hintergrund-Layer pro Bereich. Liegt als fixed-Layer HINTER dem
// Content (-z-10) und AUSSERHALB von PullToRefresh (dessen Transform würde
// position:fixed brechen). Karten sind opak → Lesbarkeit bleibt gesichert.
const MOTIFS = {
  '/': MountainMotif,
  '/training': GymMotif,
  '/nutrition': FoodMotif,
  '/library': BookMotif,
  '/profile': ProfileMotif,
  '/cycle': MountainMotif,
};

export default function BackgroundLayer() {
  const { pathname } = useLocation();
  const Motif = MOTIFS[pathname] || MountainMotif;

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 -z-10 pointer-events-none overflow-hidden"
      style={{
        // Motiv läuft nach unten aus — Content-Bereich bleibt ruhig
        maskImage: 'linear-gradient(to bottom, black 0%, transparent 65%)',
        WebkitMaskImage: 'linear-gradient(to bottom, black 0%, transparent 65%)',
      }}
    >
      <div className="max-w-lg mx-auto relative h-full text-slate-500 dark:text-primary-300 opacity-[0.06] dark:opacity-[0.05]">
        <Motif className="absolute -top-4 right-[-12%] w-[125%]" />
      </div>
    </div>
  );
}
