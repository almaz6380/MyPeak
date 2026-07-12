import { useEffect, useState } from 'react';
import { getDemoImages } from '../data/exerciseDemos';

// Übungs-Demo als Überblendung zwischen Start- und Endposition
// (Public-Domain-Fotos aus free-exercise-db, lokal in /exercise-demos/)
export default function ExerciseDemoImage({ exerciseId, alt = '' }) {
  const images = getDemoImages(exerciseId);
  const [frame, setFrame] = useState(0);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    setFrame(0);
    setFailed(false);
    const timer = setInterval(() => setFrame((f) => (f === 0 ? 1 : 0)), 1300);
    return () => clearInterval(timer);
  }, [exerciseId]);

  if (!images || failed) return null;

  return (
    <div className="relative w-full aspect-[4/3] bg-white rounded-2xl overflow-hidden border border-slate-100 dark:border-slate-700">
      {images.map((src, i) => (
        <img
          key={src}
          src={src}
          alt={alt}
          onError={() => setFailed(true)}
          className={`absolute inset-0 w-full h-full object-contain transition-opacity duration-700 ${frame === i ? 'opacity-100' : 'opacity-0'}`}
        />
      ))}
    </div>
  );
}
