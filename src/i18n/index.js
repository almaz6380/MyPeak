import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import de from './locales/de.json';
import en from './locales/en.json';
import es from './locales/es.json';
import { CUSTOM_NAME_PREFIX } from '../data/exercises';

const savedLanguage = localStorage.getItem('language') || 'de';

i18n.use(initReactI18next).init({
  resources: {
    de: { translation: de },
    en: { translation: en },
    // Spanisch seit 1.4.0. Fehlt ein Schluessel, greift fallbackLng (de).
    // Die Inhaltsbibliotheken liegen als eigene Sprachpakete daneben, nicht
    // hier — siehe src/data/uebersetzungen.js.
    es: { translation: es },
  },
  lng: savedLanguage,
  fallbackLng: 'de',
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
