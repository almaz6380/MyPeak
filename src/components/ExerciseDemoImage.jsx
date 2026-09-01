import { useEffect, useState } from 'react';
import { getDemoImages } from '../data/exerciseDemos';

// Übungs-Demo als weiche Überblendung zwischen Start- und Endposition.
// Rhythmus: Position halten → überblenden → halten → zurück (CSS-Keyframes,
// kein JS-Timer — flüssig und akkuschonend).
//
// ⚠ Am 01.09.2026 wurde versucht, hier echte 3D-Animationen zu zeigen. Zwei
// Anläufe, beide von Josef verworfen. Die Suche nach einer freien Quelle war
// danach ebenso ergebnislos — Einzelheiten in tools/uebungs-3d/README.md.
// Wer es erneut versucht: dort steht, was schon geprüft ist.
export default function ExerciseDemoImage({ exerciseId, alt = '' }) {
  const images = getDemoImages(exerciseId);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    setFailed(false);
  }, [exerciseId]);

  if (!images || failed) return null;

  return (
    <div className="relative w-full aspect-[4/3] bg-white rounded-2xl overflow-hidden border border-slate-100 dark:border-slate-700">
      <img
        src={images[0]}
        alt={alt}
        onError={() => setFailed(true)}
        className="absolute inset-0 w-full h-full object-contain"
      />
      <img
        src={images[1]}
        alt=""
        aria-hidden="true"
        onError={() => setFailed(true)}
        className="absolute inset-0 w-full h-full object-contain animate-demo-crossfade"
      />
    </div>
  );
}
