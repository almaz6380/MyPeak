// Großes, dezentes Symbol in der Kartenecke (rein dekorativ).
// Die Karte selbst braucht `relative overflow-hidden`.
export default function CardMotif({ icon: Icon, size = 'w-20 h-20', className = '' }) {
  return (
    <Icon
      aria-hidden="true"
      className={`absolute -right-3 -bottom-4 ${size} opacity-[0.06] dark:opacity-[0.08] pointer-events-none rotate-12 ${className}`}
    />
  );
}
