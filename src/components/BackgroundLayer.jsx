import { useLocation } from 'react-router-dom';
import { MountainMotif, BookMotif, ProfileMotif } from './backgrounds/motifs';

// Dezenter Hintergrund-Layer pro Bereich. Liegt als fixed-Layer HINTER dem
// Content (-z-10) und AUSSERHALB von PullToRefresh (dessen Transform würde
// position:fixed brechen). Karten sind opak → Lesbarkeit bleibt gesichert.
// Mix pro Bereich (User-Entscheidung 12.07.2026): Foto wo es trägt
// (Training/Ernährung), ruhige Line-Art für Home/Bibliothek/Profil.
const BACKGROUNDS = {
  '/': { motif: MountainMotif },
  '/training': { photo: '/bg-photos/training.jpg' },
  '/nutrition': { photo: '/bg-photos/nutrition.jpg' },
  '/library': { motif: BookMotif },
  '/profile': { motif: ProfileMotif },
  '/cycle': { motif: MountainMotif },
};

export default function BackgroundLayer() {
  const { pathname } = useLocation();
  const bg = BACKGROUNDS[pathname] || BACKGROUNDS['/'];

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
      {bg.photo ? (
        <div className="max-w-lg mx-auto relative h-full opacity-[0.15] dark:opacity-[0.13]">
          <img
            src={bg.photo}
            alt=""
            className="absolute top-0 w-full h-1/2 object-cover object-top"
            // Graustufen + leichte Gold-Tönung, damit die Fotos zur Marke passen
            style={{ filter: 'grayscale(1) sepia(0.3)' }}
          />
        </div>
      ) : (
        <div className="max-w-lg mx-auto relative h-full text-slate-500 dark:text-primary-300 opacity-[0.06] dark:opacity-[0.05]">
          <bg.motif className="absolute -top-4 right-[-12%] w-[125%]" />
        </div>
      )}
    </div>
  );
}
