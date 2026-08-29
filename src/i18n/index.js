import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import de from './locales/de.json';
import en from './locales/en.json';

const savedLanguage = localStorage.getItem('language') || 'de';

i18n.use(initReactI18next).init({
  resources: {
    de: { translation: de },
    en: { translation: en },
  },
  lng: savedLanguage,
  fallbackLng: 'de',
  // Nur ein Namespace — ':' in dynamischen Strings (z. B. Custom-Übungsnamen)
  // darf nie als Namespace-Trenner interpretiert werden.
  nsSeparator: false,
  // Eigene Übungen tragen nameKey '__custom__<Name>'. Der Key existiert nie in
  // den Locales — statt ihn roh anzuzeigen, überall den Klarnamen liefern.
  parseMissingKeyHandler: (key) =>
    typeof key === 'string' && key.startsWith('__custom__') ? key.slice('__custom__'.length) : key,
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
