// Fortschrittsring mit Zahl in der Mitte — die Kalorienkarte der Startseite.
//
// **Warum SVG und nicht conic-gradient?** Der Ring hat runde Enden
// (`stroke-linecap="round"`). Mit `conic-gradient` bekommt man harte Kanten,
// und der Übergang bei 100 % sieht aus wie ein Fehler. Ausserdem lässt sich
// nur beim SVG die Spur getrennt einfärben, ohne eine zweite Ebene zu stapeln.
//
// **RTL:** Der Ring bleibt in JEDER Sprache gleich herum. Ein Fortschrittsring
// ist keine Leserichtung, sondern eine Uhr — auf Arabisch dreht auch die Uhr
// nicht rückwärts. Deshalb steht hier bewusst `rotate(-90)` fest und nicht
// spiegelverkehrt. Der Text darunter richtet sich über `text-center` selbst.
// **Bogen und Zahl sind absichtlich zwei Dinge.** Der Bogen zeigt den
// FORTSCHRITT (gegessen von Ziel) und füllt sich im Lauf des Tages; die Zahl in
// der Mitte zeigt, was NOCH GEHT. Beides in einen Wert zu legen wäre kürzer und
// falsch: Ein Ring, der morgens voll ist und abends leer, liest sich wie ein
// Countdown, den man verliert. Deshalb `zahl` getrennt von `value`/`goal`.
export default function ProgressRing({
  value = 0,
  goal = 0,
  zahl,
  label,
  size = 142,
  stroke = 15,
}) {
  const prozent = goal > 0 ? Math.min(100, Math.max(0, (value / goal) * 100)) : 0;
  // −1 hält den Ring innerhalb der viewBox; ohne das schneidet die runde Kappe
  // bei grossen `stroke`-Werten oben ab.
  const r = size / 2 - stroke / 2 - 1;
  const umfang = 2 * Math.PI * r;

  return (
    <div className="flex flex-col items-center">
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} aria-hidden="true">
          <g transform={`rotate(-90 ${size / 2} ${size / 2})`}>
            <circle
              cx={size / 2}
              cy={size / 2}
              r={r}
              fill="none"
              strokeWidth={stroke}
              className="stroke-slate-100 dark:stroke-slate-800"
            />
            <circle
              cx={size / 2}
              cy={size / 2}
              r={r}
              fill="none"
              strokeWidth={stroke}
              strokeLinecap="round"
              strokeDasharray={umfang}
              strokeDashoffset={umfang * (1 - prozent / 100)}
              className="stroke-primary-400 transition-[stroke-dashoffset] duration-500"
            />
          </g>
        </svg>
        {/* zahl={false}: nur der Ring, z. B. klein neben einer eigenen Zahl. */}
        {zahl !== false && (
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span
              className="font-extrabold leading-none text-slate-900 dark:text-white tabular-nums"
              style={{ fontSize: size >= 130 ? 38 : 30 }}
            >
              {Math.round(zahl ?? value)}
            </span>
            {label && (
              <span className="mt-1 text-[11px] font-semibold text-primary-700 dark:text-primary-400">
                {label}
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
