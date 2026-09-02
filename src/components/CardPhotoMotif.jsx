// Freigestelltes Foto-Icon als großes, schwaches Wasserzeichen in der Kartenecke.
// Die Karte selbst braucht `relative overflow-hidden`.
//
// ⚠ `-end-3` statt `-right-3`: Auf Arabisch spiegelt die ganze Karte, und ein
// Wasserzeichen, das als Einziges rechts unten kleben bleibt, sieht nicht nach
// Absicht aus, sondern nach einem vergessenen Element.
//
// `klein` für Karten unter etwa halber Breite (Wasser, Supplemente,
// Listenzeilen): Bei 96 px übernimmt das Wasserzeichen dort die Fläche, statt
// sie zu grundieren — es soll im Augenwinkel liegen, nicht im Blick.
export default function CardPhotoMotif({ src, className = '', klein = false }) {
  return (
    <img
      src={src}
      alt=""
      aria-hidden="true"
      className={`absolute -end-3 -bottom-4 ${klein ? 'w-[68px] h-[68px]' : 'w-24 h-24'} object-contain opacity-[0.08] dark:opacity-[0.12] pointer-events-none ${className}`}
    />
  );
}
