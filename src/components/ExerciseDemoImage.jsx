import { useEffect, useState } from 'react';
import { getDemoImages } from '../data/exerciseDemos';

// Übungs-Demo als weiche Überblendung zwischen Start- und Endposition
// (Public-Domain-Fotos aus free-exercise-db, lokal in /exercise-demos/).
// Rhythmus: Position halten → überblenden → halten → zurück (CSS-Keyframes,
// kein JS-Timer — flüssig und akkuschonend).
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
