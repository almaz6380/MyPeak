import { useEffect, useState } from 'react';
import { appSprache } from '../../../lib/sprache';

// Übersetzungen der Rechtstexte, nachgeladen statt fest eingebunden.
//
// **Warum dynamisch?** `LegalPage` ist NICHT lazy geladen (die Routen liegen
// vor dem Anmelde-Gate, Apple und Google rufen die Datenschutz-URL ohne Konto
// auf). Wären die vier Sprachen fest importiert, lägen ~35 kB Rechtstext in
// jedem Start der App — auch für die deutschen Nutzer, die sie nie öffnen.
//
// **Warum trotzdem ohne Ladezustand?** Bis das Paket da ist, zeigt die Seite
// Deutsch bzw. Englisch aus `legalContent.js`. Eine Rechtsseite darf nie leer
// sein: Scheitert der Nachladevorgang, steht dort ein gültiger Text statt
// eines Spinners, der nie verschwindet.
const PAKETE = {
  es: () => import('./es.js'),
  fr: () => import('./fr.js'),
  pt: () => import('./pt.js'),
  ar: () => import('./ar.js'),
};

const zwischenspeicher = new Map();

function laden(sprache) {
  const lader = PAKETE[sprache];
  if (!lader) return Promise.resolve(null);
  if (!zwischenspeicher.has(sprache)) {
    zwischenspeicher.set(sprache, lader().then((m) => m.default).catch(() => null));
  }
  return zwischenspeicher.get(sprache);
}

// Gibt das Paket der aktuellen Sprache zurück — oder `null`, solange es lädt
// bzw. wenn die Sprache keines hat. Der Schlüssel wandert im State mit, damit
// beim Sprachwechsel kein synchrones `setState(null)` nötig ist.
export function useRechtstexte(sprache) {
  const s = appSprache(sprache);
  const [geladen, setGeladen] = useState(null);

  useEffect(() => {
    if (!PAKETE[s]) return undefined;
    let lebt = true;
    laden(s).then((paket) => { if (lebt) setGeladen({ sprache: s, paket }); });
    return () => { lebt = false; };
  }, [s]);

  return geladen?.sprache === s ? geladen.paket : null;
}

export default useRechtstexte;
