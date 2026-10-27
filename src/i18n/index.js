import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import de from './locales/de.json';
import en from './locales/en.json';
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

// Nur Deutsch (fallbackLng) und Englisch (Rueckfall der Beschriftungstabellen)
// sind fest im Bündel. Jede weitere Sprache ist ein eigener Chunk, den nur
// laedt, wer sie eingestellt hat — bei 13 Sprachen à ~90 kB waeren es sonst
// ueber 1 MB Text in jedem App-Start. Eine neue `locales/<code>.json` findet
// der Glob von selbst; freigeschaltet wird sie erst ueber SPRACHEN.
//
// Portugiesisch ist pt-BR unter dem Code `pt` (Brasilien ist der weitaus
// groesste Markt, Portugal versteht pt-BR). Chinesisch ist `zh` =
// Vereinfacht; zh-TW/zh-Hant landen bewusst ebenfalls dort, solange es keine
// traditionelle Fassung gibt.
const NACHLADBAR = import.meta.glob(['./locales/*.json', '!./locales/de.json', '!./locales/en.json']);

export async function spracheLaden(code) {
  if (i18n.hasResourceBundle(code, 'translation')) return;
  const laden = NACHLADBAR[`./locales/${code}.json`];
  if (!laden) return;
  const modul = await laden();
  i18n.addResourceBundle(code, 'translation', modul.default ?? modul, true, true);
}

// Statt i18n.changeLanguage direkt: erst das Paket holen, dann umschalten —
// sonst zeigt die Oberflaeche kurz Deutsch (fallbackLng) statt der Wahl.
export async function spracheWechseln(code) {
  try {
    await spracheLaden(code);
  } catch (e) {
    console.warn('[i18n] Sprachpaket nicht ladbar:', code, e);
  }
  return i18n.changeLanguage(code);
}

const fest = savedLanguage === 'de' || savedLanguage === 'en';

i18n.use(initReactI18next).init({
  resources: {
    de: { translation: de },
    en: { translation: en },
  },
  // Bis das Paket der Startsprache da ist, Englisch statt Deutsch: ein
  // Japaner versteht eher Englisch. Meist sind es ohnehin nur Millisekunden,
  // main.jsx wartet darauf (spracheBereit).
  lng: fest ? savedLanguage : 'en',
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

// main.jsx rendert erst, wenn die Startsprache geladen ist — hoechstens
// 1,5 s, danach lieber englisch als gar nicht.
export const spracheBereit = fest
  ? Promise.resolve()
  : Promise.race([
    spracheWechseln(savedLanguage),
    new Promise((r) => setTimeout(r, 1500)),
  ]);

export default i18n;
