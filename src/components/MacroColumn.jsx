// Eine Makro-Säule; vier davon stehen unter dem Kalorienring.
//
// **Die Farbe ist die Kennung.** Protein ist blau, Kohlenhydrate grün, Fett
// rosé, Ballaststoffe violett — auf der Startseite wie auf der
// Ernährungsseite. Deshalb kommt die Farbe als fertiges Klassenpaar herein
// (`punkt`, `balken`) und wird NICHT hier zusammengebaut: Tailwind entfernt
// Klassen, die es im Quelltext nicht wörtlich findet, und
// `bg-${farbe}-500` stünde am Ende nicht im CSS.
//
// **RTL:** Die Säule braucht keine logischen Eigenschaften — sie ist ein
// zentrierter Stapel. Der Balken läuft über `w-full` und die Füllung über
// eine Breite in Prozent; auf Arabisch spiegelt der Browser das mit, weil der
// Container `dir="rtl"` erbt.
export default function MacroColumn({ label, value, goal, punkt, balken }) {
  const prozent = goal > 0 ? Math.min(100, Math.max(0, (value / goal) * 100)) : 0;
  return (
    <div className="flex-1">
      <div className="flex items-center gap-1.5 mb-1">
        <span className={`w-[7px] h-[7px] rounded-full shrink-0 ${punkt}`} />
        <span className="text-[11px] font-semibold text-slate-600 dark:text-slate-400 truncate">
          {label}
        </span>
      </div>
      <p className="text-[15px] font-bold text-slate-900 dark:text-white leading-none tabular-nums">
        {Math.round(value)}
        <span className="text-[11px] font-medium text-slate-400">/{Math.round(goal)}g</span>
      </p>
      <div className="h-1 mt-1.5 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
        <div
          className={`h-full rounded-full transition-[width] duration-500 ${balken}`}
          style={{ width: `${prozent}%` }}
        />
      </div>
    </div>
  );
}

// Die vier Makros an EINER Stelle. Wer eine Farbe ändert, ändert sie damit
// überall — genau das war vorher nicht der Fall: `MacroPill` (Startseite) und
// `MacroRing` (Ernährung) trugen dieselben Töne doppelt im Code.
export const MAKROS = {
  protein: { punkt: 'bg-blue-500 dark:bg-blue-400', balken: 'bg-blue-500 dark:bg-blue-400' },
  carbs: { punkt: 'bg-emerald-500 dark:bg-emerald-400', balken: 'bg-emerald-500 dark:bg-emerald-400' },
  fat: { punkt: 'bg-rose-500 dark:bg-rose-400', balken: 'bg-rose-500 dark:bg-rose-400' },
  fiber: { punkt: 'bg-violet-500 dark:bg-violet-400', balken: 'bg-violet-500 dark:bg-violet-400' },
};
