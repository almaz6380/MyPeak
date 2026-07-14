// Freigestelltes Foto-Icon als großes, schwaches Wasserzeichen in der Kartenecke.
// Die Karte selbst braucht `relative overflow-hidden`.
export default function CardPhotoMotif({ src, className = '' }) {
  return (
    <img
      src={src}
      alt=""
      aria-hidden="true"
      className={`absolute -right-3 -bottom-4 w-24 h-24 object-contain opacity-[0.08] dark:opacity-[0.12] pointer-events-none ${className}`}
    />
  );
}
