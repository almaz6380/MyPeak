// Die eine Stelle, die den Browser-/Nutzer-Sprachcode auf unsere drei Codes
// abbildet.
//
// Vorher stand in jeder Seite `i18n.language?.startsWith('de') ? 'de' : 'en'`.
// Das ist eine Zweiwegweiche: Spanisch fiel dort auf Englisch, und zwar
// stillschweigend — die Oberfläche war übersetzt, die Beschriftungstabellen in
// den Komponenten nicht. Anigosha hat denselben Fehler mit `appSprache()`
// zentral behoben; hier dasselbe Muster.
//
// Datenfelder mit nur zwei Sprachen (nameDE/nameEN in den Inhaltsbibliotheken)
// bleiben davon unberührt: Dort ist `lang === 'de' ? x.nameDE : x.nameEN`
// weiterhin richtig, Spanisch sieht dann Englisch.
const SPRACHEN = ['de', 'en', 'es'];

export function appSprache(sprache) {
  return SPRACHEN.find((l) => sprache?.startsWith(l)) || 'en';
}

// Beschriftung aus einer Tabelle { de, en, es } holen, mit Englisch als Netz.
export function beschriftung(eintrag, sprache) {
  if (!eintrag) return '';
  return eintrag[appSprache(sprache)] ?? eintrag.en ?? eintrag.de ?? '';
}
