import i18n from '../i18n';

// Datums- und Wochentagsformate für alle Sprachen an EINER Stelle.
//
// Vorher stand `lang === 'de' ? 'de-DE' : 'en-US'` an fünf Stellen und die
// Wochentagskürzel als de/en-Array an sechs weiteren. Spanisch sah damit
// zwangsläufig englische Datumsangaben — und jede neue Sprache hätte elf
// Stellen gebraucht. Genau derselbe Fehler, den Anigosha mit `appSprache()`
// schon einmal zentral behoben hat.
// `ar-…-u-nu-latn` erzwingt westliche Ziffern. Ohne das liefert Intl für
// Arabisch die arabisch-indischen Ziffern (٠١٢٣) — in einer Fitness-App stünden
// dann „٧٥ kg" und „١٢ Wdh." nebeneinander, was auch arabische Nutzer als
// Bruch lesen. Wochentags- und Monatsnamen bleiben arabisch, nur die Zahlen
// nicht. Ägyptisch als Basis, weil das der verbreitetste Standard-Locale ist.
const LOCALES = {
  de: 'de-DE',
  en: 'en-US',
  es: 'es-ES',
  fr: 'fr-FR',
  pt: 'pt-BR',
  ar: 'ar-EG-u-nu-latn',
};

// BCP-47-Locale zur aktuellen Oberflächensprache.
export function datumsLocale(sprache = i18n.language) {
  const kurz = Object.keys(LOCALES).find((l) => sprache?.startsWith(l)) || 'en';
  return LOCALES[kurz];
}

// Wochentage, Montag zuerst — aus Intl, nicht aus einer Handliste.
// Der 5. Januar 2026 ist ein Montag; sieben Tage ab dort ergeben die Woche.
function wochentage(sprache, breite) {
  const locale = datumsLocale(sprache);
  return Array.from({ length: 7 }, (_, i) => {
    const d = new Date(Date.UTC(2026, 0, 5 + i));
    const s = d.toLocaleDateString(locale, { weekday: breite, timeZone: 'UTC' });
    // Spanisch und Englisch hängen je nach Umgebung einen Punkt an („lun.").
    return s.replace(/\.$/, '');
  });
}

export const wochentagKuerzel = (sprache = i18n.language) => wochentage(sprache, 'short');
