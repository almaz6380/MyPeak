import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import de from './locales/de.json';
import en from './locales/en.json';
import es from './locales/es.json';
import fr from './locales/fr.json';
import pt from './locales/pt.json';
import ar from './locales/ar.json';
import { CUSTOM_NAME_PREFIX } from '../data/exercises';
import { SPRACHEN } from '../lib/sprache';

// Startsprache: eine Wahl im Profil (localStorage) gewinnt, sonst die Sprache
// des Geräts, sonst Englisch. Bis 10/2026 startete jede neue Installation auf
// Deutsch — auch in Brasilien, obwohl es Portugiesisch gibt.
export function geraeteSprache() {
  const liste = typeof navigator === 'undefined'
    ? []
    : navigator.languages?.length ? navigator.languages : [navigator.language];
  for (const l of liste) {
    const code = (l ?? '').toLowerCase().slice(0, 2);
    if (SPRACHEN.includes(code)) return code;
  }
  return 'en';
}

function gespeicherteSprache() {
  try {
    const s = localStorage.getItem('language');
    return SPRACHEN.includes(s) ? s : null;
  } catch {
    return null;
  }
}

const savedLanguage = gespeicherteSprache() || geraeteSprache();

i18n.use(initReactI18next).init({
  resources: {
    de: { translation: de },
    en: { translation: en },
    // Spanisch seit 1.4.0, Franzoesisch/Portugiesisch/Arabisch seit 1.5.0.
    // Fehlt ein Schluessel, greift fallbackLng (de). Die Inhaltsbibliotheken
    // liegen als eigene Sprachpakete daneben, nicht hier — siehe
    // src/data/uebersetzungen.js.
    es: { translation: es },
    fr: { translation: fr },
    // Portugiesisch ist pt-BR unter dem Code `pt`: Brasilien ist der weitaus
    // groesste lusophone Markt, Portugal versteht pt-BR, ein zweiter Code
    // waere doppelte Pflege.
    pt: { translation: pt },
    ar: { translation: ar },
  },
  lng: savedLanguage,
  fallbackLng: 'de',
  // Nur ein Namespace — ':' in dynamischen Strings (z. B. Custom-Übungsnamen)
  // darf nie als Namespace-Trenner interpretiert werden.
  nsSeparator: false,
  interpolation: {
    escapeValue: false,
  },
  // Selbst erstellte Übungen haben keinen Übersetzungsschlüssel; sie tragen
  // ihren Namen im nameKey (siehe CUSTOM_NAME_PREFIX). Hier zentral wieder
  // abziehen — sonst stünde in Workout, Verlauf und Plänen „__custom__Name".
  parseMissingKeyHandler: (key) =>
    typeof key === 'string' && key.startsWith(CUSTOM_NAME_PREFIX)
      ? key.slice(CUSTOM_NAME_PREFIX.length)
      : key,
});

export default i18n;
