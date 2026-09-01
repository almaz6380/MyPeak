// Mengenangaben in einer Zutatenzeile auf eine andere Portionszahl umrechnen.
//
// Steht als eigenes Modul da, weil hier ein Fehler steckte, den man am
// Bildschirm leicht übersieht: Der alte Ausdruck kannte nur ganze und
// Dezimalzahlen. Bei „1/2 TL Knoblauchpulver" griff er auf die **2** hinter dem
// Schrägstrich — verdoppeln machte daraus „1/4 TL", also die Hälfte statt des
// Doppelten. Deshalb werden Brüche jetzt zuerst und als Ganzes behandelt, und
// der Ausdruck für einfache Zahlen darf nicht mehr mitten in einem Bruch
// zugreifen.
//
// Die Einheitenliste ist dreisprachig: EL/TL (de), tbsp/tsp (en),
// cda/cdta (es, cucharada/cucharadita). Ohne die spanischen Kürzel bliebe
// „1 cda de miel" beim Verdoppeln unverändert stehen.
const EINHEIT = 'g|ml|kg|l|EL|TL|Stk|Stück|tbsp|tsp|cups?|pcs?|cdas?|cdtas?|uds?';

// Ein einziger Ausdruck für beide Fälle, der Nenner ist optional. Zwei
// getrennte Durchläufe wären falsch: Der erste macht aus „1/2 TL" ein „1 TL",
// und der zweite fände darin wieder eine Menge und verdoppelte sie erneut.
// `\b` hinter der Einheit verhindert, dass „150 gramos" als „150 g" gelesen wird.
const MENGE = new RegExp(String.raw`(\d+(?:[.,]\d+)?)(?:\s*/\s*(\d+))?\s*(${EINHEIT})\b`, 'gi');

// Eine Nachkommastelle, aber ohne „,0" am Ende.
const runden = (n) => String(Math.round(n * 10) / 10);

export function skaliereMenge(text, faktor) {
  if (!text || faktor === 1) return text;
  return String(text).replace(MENGE, (treffer, zahl, nenner, einheit) => {
    const wert = parseFloat(String(zahl).replace(',', '.')) / (nenner ? Number(nenner) : 1);
    if (!Number.isFinite(wert)) return treffer;
    return `${runden(wert * faktor)} ${einheit}`;
  });
}

export default skaliereMenge;
