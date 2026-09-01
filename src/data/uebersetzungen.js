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
//    Spanisch eingestellt hat.
// 2. **Risiko.** Die Datendateien bleiben unangetastet. Ein Fehler im
//    Sprachpaket kann DE/EN nicht kaputt machen.
// 3. **Nächste Sprache.** Ein Ordner mehr unter `es/`, ein Eintrag mehr in
//    `PAKETE`. Sonst nichts.
//
// Fehlt ein Eintrag oder ein Feld, fällt es sauber auf DE/EN zurück — eine
// halb fertige Übersetzung zeigt also gemischt, nie leer.
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
  },
};

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

// Kategorienamen — flache { id: 'Nombre' }-Tabelle unter dem Schlüssel
// `kategorien` im jeweiligen Sprachpaket.
export function kategorieName(kategorie, lang, paket) {
  if (!kategorie) return '';
  return paket?.kategorien?.[kategorie.id]
    ?? (lang === 'de' ? kategorie.nameDE : kategorie.nameEN);
}
