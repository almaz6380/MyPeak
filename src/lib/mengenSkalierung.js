// Mengenangaben in einer Zutatenzeile auf eine andere Portionszahl umrechnen.
//
// Steht als eigenes Modul da, weil hier ein Fehler steckte, den man am
// Bildschirm leicht übersieht: Der alte Ausdruck kannte nur ganze und
// Dezimalzahlen. Bei „1/2 TL Knoblauchpulver" griff er auf die **2** hinter dem
// Schrägstrich — verdoppeln machte daraus „1/4 TL", also die Hälfte statt des
// Doppelten. Deshalb werden Brüche jetzt als Ganzes behandelt.
//
// Die Einheitenliste ist sechssprachig. Fehlt ein Kürzel, passiert etwas
// Unauffälliges und trotzdem Falsches: Beim Verdoppeln wachsen die Gramm, die
// Löffel bleiben stehen — das Rezept stimmt dann nicht mehr in sich.
//
//   de  EL, TL, Stk, Stück
//   en  tbsp, tsp, cup, pcs
//   es  cda, cdta (cucharada/cucharadita), ud
//   fr  c. à s., c. à c. (cuillère à soupe/café)
//   pt  col. sopa, col. chá
//   ar  م.ك, م.ص (ملعقة كبيرة/صغيرة)
//
// Die Kürzel mit Punkten und Leerzeichen sind der Grund für `\s*` mitten in den
// Mustern: „c.à.s.", „c. à s." und „c. a s." sollen alle greifen.
const EINHEITEN = [
  'g', 'ml', 'kg', 'l',
  'EL', 'TL', 'Stk', 'Stück',
  'tbsp', 'tsp', 'cups?', 'pcs?',
  'cdas?', 'cdtas?', 'uds?',
  String.raw`c\.?\s*à\s*s\.?`, String.raw`c\.?\s*à\s*c\.?`,
  String.raw`col\.?\s*sopa`, String.raw`col\.?\s*chá`,
  String.raw`م\.\s*ك`, String.raw`م\.\s*ص`,
].join('|');

// Ein einziger Ausdruck für ganze Zahlen und Brüche, der Nenner ist optional.
// Zwei getrennte Durchläufe wären falsch: Der erste macht aus „1/2 TL" ein
// „1 TL", und der zweite fände darin wieder eine Menge und verdoppelte erneut.
//
// `(?![\p{L}\p{N}])` statt `\b`: Es verhindert weiterhin, dass „150 gramos" als
// „150 g" gelesen wird — aber anders als `\b` funktioniert es auch hinter einem
// Punkt („c. à s.") und hinter arabischen Buchstaben, wo `\b` gar nicht greift.
const MENGE = new RegExp(
  String.raw`(\d+(?:[.,]\d+)?)(?:\s*/\s*(\d+))?\s*(${EINHEITEN})(?![\p{L}\p{N}])`,
  'giu',
);

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
