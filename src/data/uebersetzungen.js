import { useEffect, useState } from 'react';
import { appSprache } from '../lib/sprache';

// Übersetzungen der Inhaltsbibliotheken (Peptide, Diäten, Wissensseiten,
// Rezepte, Programme).
//
// **Warum eigene Pakete statt `nameES` neben `nameDE`/`nameEN`?**
//
// 1. **Bundle.** `PeptidesPage` ist schon 489 kB. Spanisch direkt in
//    `peptidesData.js` verdoppelte den Brocken für ALLE — auch für die
//    deutschen Nutzer, die ihn nie brauchen. Als eigener dynamischer Import
//    landet er in einem separaten Chunk und wird nur geladen, wenn jemand
//    diese Sprache eingestellt hat.
// 2. **Risiko.** Die Datendateien bleiben unangetastet. Ein Fehler im
//    Sprachpaket kann DE/EN nicht kaputt machen.
// 3. **Nächste Sprache.** Ein Ordner mehr, ein Block mehr in `PAKETE`.
//    Sonst nichts — genau so kamen fr, pt und ar dazu.
//
// Fehlt ein Eintrag oder ein Feld, fällt es sauber auf DE/EN zurück — eine
// halb fertige Übersetzung zeigt also gemischt, nie leer.
// sprachweichen-ok: Die `lang === 'de' ? …DE : …EN`-Zeilen unten sind der
// RÜCKFALL, wenn das Sprachpaket den Eintrag nicht hat. In den Datendateien
// gibt es nur diese beiden Felder — eine dritte Sprache kann dort gar nicht
// stehen. Wer hier `appSprache()` einsetzt, gewinnt nichts und suggeriert eine
// Auswahl, die es nicht gibt. Die Übersetzung selbst kommt aus `paket`.
const BEREICHE = {
  peptides: 'peptide',
  diets: 'diaeten',
  training: 'training',
  nutrition: 'ernaehrung',
  supplements: 'supplemente',
  bloodwork: 'blutwerte',
  recipes: 'rezepte',
  programs: 'programme',
  foods: 'lebensmittel',
};

// Die Lader stehen ausgeschrieben da, weil Vite die Pfade beim Bauen sehen
// muss. `import(`./${sprache}/${datei}.js`)` würde zwar laufen, zöge aber
// jede Sprache in JEDEN Chunk — genau das, was die Aufteilung vermeiden soll.
const PAKETE = {
  es: {
    peptides: () => import('./es/peptide.js'),
    diets: () => import('./es/diaeten.js'),
    training: () => import('./es/training.js'),
    nutrition: () => import('./es/ernaehrung.js'),
    supplements: () => import('./es/supplemente.js'),
    bloodwork: () => import('./es/blutwerte.js'),
    recipes: () => import('./es/rezepte.js'),
    programs: () => import('./es/programme.js'),
    foods: () => import('./es/lebensmittel.js'),
  },
  fr: {
    peptides: () => import('./fr/peptide.js'),
    diets: () => import('./fr/diaeten.js'),
    training: () => import('./fr/training.js'),
    nutrition: () => import('./fr/ernaehrung.js'),
    supplements: () => import('./fr/supplemente.js'),
    bloodwork: () => import('./fr/blutwerte.js'),
    recipes: () => import('./fr/rezepte.js'),
    programs: () => import('./fr/programme.js'),
    foods: () => import('./fr/lebensmittel.js'),
  },
  pt: {
    peptides: () => import('./pt/peptide.js'),
    diets: () => import('./pt/diaeten.js'),
    training: () => import('./pt/training.js'),
    nutrition: () => import('./pt/ernaehrung.js'),
    supplements: () => import('./pt/supplemente.js'),
    bloodwork: () => import('./pt/blutwerte.js'),
    recipes: () => import('./pt/rezepte.js'),
    programs: () => import('./pt/programme.js'),
    foods: () => import('./pt/lebensmittel.js'),
  },
  ar: {
    peptides: () => import('./ar/peptide.js'),
    diets: () => import('./ar/diaeten.js'),
    training: () => import('./ar/training.js'),
    nutrition: () => import('./ar/ernaehrung.js'),
    supplements: () => import('./ar/supplemente.js'),
    bloodwork: () => import('./ar/blutwerte.js'),
    recipes: () => import('./ar/rezepte.js'),
    programs: () => import('./ar/programme.js'),
    foods: () => import('./ar/lebensmittel.js'),
  },
  nl: {
    peptides: () => import('./nl/peptide.js'),
    diets: () => import('./nl/diaeten.js'),
    training: () => import('./nl/training.js'),
    nutrition: () => import('./nl/ernaehrung.js'),
    supplements: () => import('./nl/supplemente.js'),
    bloodwork: () => import('./nl/blutwerte.js'),
    recipes: () => import('./nl/rezepte.js'),
    programs: () => import('./nl/programme.js'),
    foods: () => import('./nl/lebensmittel.js'),
  },
  pl: {
    peptides: () => import('./pl/peptide.js'),
    diets: () => import('./pl/diaeten.js'),
    training: () => import('./pl/training.js'),
    nutrition: () => import('./pl/ernaehrung.js'),
    supplements: () => import('./pl/supplemente.js'),
    bloodwork: () => import('./pl/blutwerte.js'),
    recipes: () => import('./pl/rezepte.js'),
    programs: () => import('./pl/programme.js'),
    foods: () => import('./pl/lebensmittel.js'),
  },
  it: {
    peptides: () => import('./it/peptide.js'),
    diets: () => import('./it/diaeten.js'),
    training: () => import('./it/training.js'),
    nutrition: () => import('./it/ernaehrung.js'),
    supplements: () => import('./it/supplemente.js'),
    bloodwork: () => import('./it/blutwerte.js'),
    recipes: () => import('./it/rezepte.js'),
    programs: () => import('./it/programme.js'),
    foods: () => import('./it/lebensmittel.js'),
  },
  tr: {
    peptides: () => import('./tr/peptide.js'),
    diets: () => import('./tr/diaeten.js'),
    training: () => import('./tr/training.js'),
    nutrition: () => import('./tr/ernaehrung.js'),
    supplements: () => import('./tr/supplemente.js'),
    bloodwork: () => import('./tr/blutwerte.js'),
    recipes: () => import('./tr/rezepte.js'),
    programs: () => import('./tr/programme.js'),
    foods: () => import('./tr/lebensmittel.js'),
  },
  ja: {
    peptides: () => import('./ja/peptide.js'),
    diets: () => import('./ja/diaeten.js'),
    training: () => import('./ja/training.js'),
    nutrition: () => import('./ja/ernaehrung.js'),
    supplements: () => import('./ja/supplemente.js'),
    bloodwork: () => import('./ja/blutwerte.js'),
    recipes: () => import('./ja/rezepte.js'),
    programs: () => import('./ja/programme.js'),
    foods: () => import('./ja/lebensmittel.js'),
  },
  ko: {
    peptides: () => import('./ko/peptide.js'),
    diets: () => import('./ko/diaeten.js'),
    training: () => import('./ko/training.js'),
    nutrition: () => import('./ko/ernaehrung.js'),
    supplements: () => import('./ko/supplemente.js'),
    bloodwork: () => import('./ko/blutwerte.js'),
    recipes: () => import('./ko/rezepte.js'),
    programs: () => import('./ko/programme.js'),
    foods: () => import('./ko/lebensmittel.js'),
  },
  zh: {
    peptides: () => import('./zh/peptide.js'),
    diets: () => import('./zh/diaeten.js'),
    training: () => import('./zh/training.js'),
    nutrition: () => import('./zh/ernaehrung.js'),
    supplements: () => import('./zh/supplemente.js'),
    bloodwork: () => import('./zh/blutwerte.js'),
    recipes: () => import('./zh/rezepte.js'),
    programs: () => import('./zh/programme.js'),
    foods: () => import('./zh/lebensmittel.js'),
  },
};

export { BEREICHE };

// Bereits geladene Pakete — sonst lädt jeder Seitenwechsel neu.
const zwischenspeicher = new Map();

export function paketLaden(bereich, sprache) {
  const s = appSprache(sprache);
  const lader = PAKETE[s]?.[bereich];
  if (!lader) return Promise.resolve(null);
  const schluessel = `${s}:${bereich}`;
  if (!zwischenspeicher.has(schluessel)) {
    zwischenspeicher.set(schluessel, lader().then((m) => m.default).catch(() => null));
  }
  return zwischenspeicher.get(schluessel);
}

// Hook für die Seiten. Gibt `null` zurück, solange nichts geladen ist oder die
// Sprache keine Übersetzung hat — dann greift überall der DE/EN-Rückfall.
export function useUebersetzung(bereich, sprache) {
  const s = appSprache(sprache);
  const schluessel = `${s}:${bereich}`;
  // Der Schlüssel wandert mit im State. Ohne ihn müsste der Effekt beim
  // Sprachwechsel erst synchron `null` setzen — das ist ein Zusatz-Render und
  // wird von react-hooks/set-state-in-effect zu Recht angemeckert. So gilt ein
  // geladenes Paket einfach nur für seinen eigenen Schlüssel.
  const [geladen, setGeladen] = useState(null);

  useEffect(() => {
    if (!PAKETE[s]?.[bereich]) return undefined;
    let lebt = true;
    paketLaden(bereich, s).then((paket) => {
      if (lebt) setGeladen({ schluessel: `${s}:${bereich}`, paket });
    });
    return () => { lebt = false; };
  }, [bereich, s]);

  return geladen?.schluessel === schluessel ? geladen.paket : null;
}

// Einen Eintrag in der aktuellen Sprache lesen. `eintrag` ist die Zeile aus der
// Datendatei (nameDE/nameEN/…), `paket` das Ergebnis von `useUebersetzung`.
export function uebersetzt(eintrag, lang, paket) {
  if (!eintrag) return { sections: [] };
  const es = paket?.[eintrag.id];
  const w = (feld) => es?.[feld] ?? (lang === 'de' ? eintrag[`${feld}DE`] : eintrag[`${feld}EN`]);
  return {
    name: w('name'),
    summary: w('summary'),
    desc: w('desc'),
    quick: es?.quick ?? (lang === 'de' ? eintrag.quickDE : eintrag.quickEN),
    sections: (eintrag.sections || []).map((s, i) => ({
      title: es?.sections?.[i]?.title ?? (lang === 'de' ? s.titleDE : s.titleEN),
      content: es?.sections?.[i]?.content ?? (lang === 'de' ? s.contentDE : s.contentEN),
    })),
  };
}

// Rezepte haben eine andere Form als die Wissensbereiche: statt `sections`
// zwei Listen. Deshalb ein eigener Leser statt eines Sonderfalls oben.
export function uebersetztesRezept(rezept, lang, paket) {
  if (!rezept) return { ingredients: [], steps: [] };
  const es = paket?.[rezept.id];
  const w = (feld) => es?.[feld] ?? (lang === 'de' ? rezept[`${feld}DE`] : rezept[`${feld}EN`]);
  return {
    name: w('name') || '',
    desc: w('desc') || '',
    ingredients: es?.ingredients ?? (lang === 'de' ? rezept.ingredientsDE : rezept.ingredientsEN) ?? [],
    steps: es?.steps ?? (lang === 'de' ? rezept.stepsDE : rezept.stepsEN) ?? [],
  };
}

// Peak-Programme. Auch hier eine eigene Form: `why`, `progression` und ein
// Schwerpunkt je Trainingstag. Die Beschriftungen der Tage stehen NICHT im
// Sprachpaket, sondern in `src/data/tagesbeschriftung.js` — sie wiederholen
// sich über die Programme hinweg und fehlten bisher auch auf Englisch.
export function uebersetztesProgramm(programm, lang, paket) {
  if (!programm) return {};
  const es = paket?.[programm.id];
  const w = (feld, deFeld, enFeld) => es?.[feld] ?? (lang === 'de' ? programm[deFeld] : programm[enFeld]);
  return {
    name: w('name', 'nameDE', 'nameEN'),
    desc: w('desc', 'descDE', 'descEN'),
    why: w('why', 'whyDE', 'whyEN'),
    progression: w('progression', 'progressionDE', 'progressionEN'),
    // Schwerpunkt eines Tages, nachgeschlagen über den Wochentag-Schlüssel.
    fokus: (tag, tagesDaten) =>
      es?.fokus?.[tag] ?? (lang === 'de' ? tagesDaten?.focusDE : tagesDaten?.focusEN),
  };
}

// Studienbefunde. Verschlüsselt nach „Name|Jahr", weil dieselbe Studie in
// mehreren Programmen zitiert wird; Name und Jahr bleiben unübersetzt.
export function studienBefund(studie, lang, paket) {
  if (!studie) return '';
  return paket?.studien?.[`${studie.name}|${studie.year}`]
    ?? (lang === 'de' ? studie.findingDE : studie.findingEN);
}

// Lebensmittel. Flach: das Paket bildet direkt id → Name ab, es gibt keine
// weiteren Felder. `food` kann auch ein Treffer von Open Food Facts sein —
// der hat keine id aus unserer Datenbank und faellt darum sauber durch.
export function lebensmittelName(food, lang, paket) {
  if (!food) return '';
  return paket?.[food.id]
    ?? (lang === 'de'
      ? (food.nameDE || food.nameEN || food.food_name)
      : (food.nameEN || food.nameDE || food.food_name))
    ?? '';
}

// Kategorienamen — flache { id: 'Nombre' }-Tabelle unter dem Schlüssel
// `kategorien` im jeweiligen Sprachpaket.
export function kategorieName(kategorie, lang, paket) {
  if (!kategorie) return '';
  return paket?.kategorien?.[kategorie.id]
    ?? (lang === 'de' ? kategorie.nameDE : kategorie.nameEN);
}
