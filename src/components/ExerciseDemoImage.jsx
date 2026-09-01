import { useEffect, useState } from 'react';
import { getDemoImages } from '../data/exerciseDemos';
import animationen from '../data/exerciseAnimations';

// Übungs-Demo. Wo eine Animation vorliegt, läuft sie; sonst die alten Fotos
// als weiche Überblendung zwischen Start- und Endposition.
//
// Die Animationen stammen aus dem Gratis-Paket von Vital Animations. Lizenz
// und Herkunftsnachweis: store-assets/lizenzen/vital-animations/.
// Es sind 42 Übungen — vor allem Beine und Schultern; Rücken, Bizeps und
// Bauch bleiben bei den Fotos. Deshalb hier kein harter Wechsel, sondern eine
// Weiche pro Übung.
//
// Die Weiche geht über die ÜBUNGS-ID, nicht über den Fotoordner: Sechs der
// Übungen (Ergometer, Seitheben an der Maschine, Air Bike, Stepper, Gehen am
// Laufband, Hüftscharnier) haben gar kein Foto und wären sonst leer geblieben.
//
// ⚠ `muted` und `playsInline` sind Pflicht, nicht Kosmetik: Ohne beides
// verweigert iOS die automatische Wiedergabe und öffnet stattdessen den
// Vollbild-Player. `preload="metadata"` hält die Übungsliste leicht.
//
// ⚠ Die Videodateien dürfen laut Lizenz (§ 5) nicht als einzelne Dateien zum
// Download angeboten werden. Auslieferung durch die App ist ausdrücklich
// erlaubt — also nirgends direkt verlinken und keinen Download anbieten.
export default function ExerciseDemoImage({ exerciseId, alt = '' }) {
  const ordner = animationen[exerciseId];
  const bilder = getDemoImages(exerciseId);
  const [videoKaputt, setVideoKaputt] = useState(false);
  const [bilderKaputt, setBilderKaputt] = useState(false);

  useEffect(() => {
    setVideoKaputt(false);
    setBilderKaputt(false);
  }, [exerciseId]);

  if (ordner && !videoKaputt) {
    return (
      <div className="relative w-full aspect-square bg-white rounded-2xl overflow-hidden border border-slate-100 dark:border-slate-700">
        <video
          key={ordner}
          src={`/exercise-demos-anim/${ordner}/demo.mp4`}
          poster={`/exercise-demos-anim/${ordner}/poster.jpg`}
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          controlsList="nodownload"
          disablePictureInPicture
          onContextMenu={(e) => e.preventDefault()}
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
