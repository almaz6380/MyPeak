// Die eine Stelle, die den Browser-/Nutzer-Sprachcode auf unsere Codes abbildet.
//
// Vorher stand in jeder Seite `i18n.language?.startsWith('de') ? 'de' : 'en'`.
// Das ist eine Zweiwegweiche: Spanisch fiel dort auf Englisch, und zwar
// stillschweigend — die Oberfläche war übersetzt, die Beschriftungstabellen in
// den Komponenten nicht. Anigosha hat denselben Fehler mit `appSprache()`
// zentral behoben; hier dasselbe Muster.
//
// **Reihenfolge ist Absicht.** `find(startsWith)` nimmt den ersten Treffer.
// Solange kein Code Präfix eines anderen ist, spielt sie keine Rolle — käme
// einmal ein `pt-BR` neben `pt` dazu, müsste der spezifischere zuerst stehen.
export const SPRACHEN = ['de', 'en', 'es', 'fr', 'pt', 'ar', 'nl', 'pl', 'it', 'tr', 'ja', 'ko'];

// Sprachen, die von rechts nach links laufen. Steuert `dir` am <html> und damit
// auch die `rtl:`-Varianten von Tailwind.
const RTL = new Set(['ar']);

// Eigenbezeichnungen für die Sprachauswahl. Eine Sprache wird IMMER in sich
// selbst benannt — „Deutsch", nicht „German"; wer sie sucht, kennt nur diesen
// Namen.
export const SPRACHNAMEN = {
  de: 'Deutsch',
  en: 'English',
  es: 'Español',
  fr: 'Français',
  pt: 'Português',
  ar: 'العربية',
  nl: 'Nederlands',
  pl: 'Polski',
  it: 'Italiano',
  tr: 'Türkçe',
  ja: '日本語',
  ko: '한국어',
};

export function appSprache(sprache) {
  return SPRACHEN.find((l) => sprache?.startsWith(l)) || 'en';
}

export function istRtl(sprache) {
  return RTL.has(appSprache(sprache));
}

export function textrichtung(sprache) {
  return istRtl(sprache) ? 'rtl' : 'ltr';
}

// Beschriftung aus einer Tabelle { de, en, es, … } holen, mit Englisch als Netz.
// Fehlt die aktuelle Sprache, steht dort Englisch statt einer leeren Zeile.
export function beschriftung(eintrag, sprache) {
  if (!eintrag) return '';
  return eintrag[appSprache(sprache)] ?? eintrag.en ?? eintrag.de ?? '';
}
