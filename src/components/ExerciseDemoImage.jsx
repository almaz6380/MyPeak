import { useEffect, useState } from 'react';
import { getDemoImages, getDemoVideo } from '../data/exerciseDemos';

// Uebungs-Demo. Zuerst die selbst gerenderte 3D-Animation
// (tools/uebungs-3d/, Ordner /exercise-demos-3d/), sonst die alten Fotos als
// weiche Ueberblendung.
//
// Warum mit Rueckfall statt hartem Wechsel: Die Fotos sind seit dem Launch
// drin und funktionieren; faellt eine Animation aus — fehlende Datei, Codec,
// Autoplay verweigert — soll der Nutzer das alte Bild sehen und nicht eine
// leere Flaeche.
//
// ⚠ `muted` und `playsInline` sind Pflicht, nicht Kosmetik: Ohne beides
// verweigert iOS die automatische Wiedergabe und zeigt stattdessen den
// Vollbild-Player. `preload="none"` haelt die Uebungsliste leicht — bei 162
// Videos zieht der Browser sonst reihenweise Daten, die niemand ansieht.
// ⚠ ABGESCHALTET am 01.09.2026. Die erste Fassung der selbst gerenderten
// Animationen war nicht gut genug — Josefs Urteil: „die Bewegung ist falsch
// und die Figur sieht beschissen aus", und das trifft zu. Die Figur besteht
// aus Kapseln und Kugeln, die Bewegungen sind blind aus Gelenkwinkeln
// geraten. Bis das behoben ist, zeigt die App weiter die Fotos.
// Zum Wiedereinschalten: auf true setzen. Die Videos liegen weiter unter
// public/exercise-demos-3d/, der Renderer unter tools/uebungs-3d/.
const ANIMATION_AKTIV = false;

export default function ExerciseDemoImage({ exerciseId, alt = '' }) {
  const bilder = getDemoImages(exerciseId);
  const clip = ANIMATION_AKTIV ? getDemoVideo(exerciseId) : null;
  const [videoKaputt, setVideoKaputt] = useState(false);
  const [bilderKaputt, setBilderKaputt] = useState(false);

  useEffect(() => {
    setVideoKaputt(false);
    setBilderKaputt(false);
  }, [exerciseId]);

  if (clip && !videoKaputt) {
    return (
      <div className="relative w-full aspect-square bg-[#18223a] rounded-2xl overflow-hidden border border-slate-100 dark:border-slate-700">
        <video
          key={clip.video}
          src={clip.video}
          poster={clip.poster}
          autoPlay
          loop
          muted
          playsInline
          preload="none"
          aria-label={alt}
          onError={() => setVideoKaputt(true)}
          className="absolute inset-0 w-full h-full object-contain"
        />
      </div>
    );
  }

  if (!bilder || bilderKaputt) return null;

  return (
    <div className="relative w-full aspect-[4/3] bg-white rounded-2xl overflow-hidden border border-slate-100 dark:border-slate-700">
      <img
        src={bilder[0]}
        alt={alt}
        onError={() => setBilderKaputt(true)}
        className="absolute inset-0 w-full h-full object-contain"
      />
      <img
        src={bilder[1]}
        alt=""
        aria-hidden="true"
        onError={() => setBilderKaputt(true)}
        className="absolute inset-0 w-full h-full object-contain animate-demo-crossfade"
      />
    </div>
  );
}
