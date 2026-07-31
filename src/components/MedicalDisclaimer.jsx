import { AlertTriangle } from 'lucide-react';

// Arzt-Hinweis fuer alle gesundheitsbezogenen Bereiche.
//
// Google Play hat am 30.07.2026 die Richtlinie zu gesundheitsbezogenen Inhalten
// durchgesetzt: die App erinnere Nutzer nicht daran, "einen Arzt aufzusuchen, wenn
// sie medizinischen Rat, eine Diagnose oder eine Behandlung benoetigen". Der Satz
// unten nennt deshalb alle drei Faelle ausdruecklich — Rat, Diagnose, Behandlung.
// Beim Kuerzen also aufpassen: das ist juristischer Text, keine UI-Kopie.
//
// Sprachwahl wie in References.jsx ueber ein `lang`-Prop statt ueber i18n-Keys —
// der Wortlaut soll sich nicht nebenbei mitaendern lassen.
//
//   type   'medical' (Standard) | 'general' — general fuer Trainings-/Ernaehrungswissen
//   extra  optionaler Zusatzabsatz, z. B. der Evidenz-Hinweis bei den Peptiden

const TEXTS = {
  medical: {
    de: 'FullRep ersetzt keine ärztliche Beratung. Wende dich bei gesundheitlichen Fragen, für eine Diagnose oder eine Behandlung immer an eine Ärztin oder einen Arzt.',
    en: 'FullRep does not replace medical advice. For any health concern, diagnosis or treatment, always consult a doctor.',
  },
  general: {
    de: 'Diese Informationen dienen zu Bildungszwecken. Trainings- und Ernährungsempfehlungen sind allgemein gehalten und ersetzen keine individuelle oder ärztliche Beratung. Wende dich bei gesundheitlichen Fragen, für eine Diagnose oder eine Behandlung an eine Ärztin oder einen Arzt.',
    en: 'This information is for educational purposes. Training and nutrition recommendations are general and do not replace individual or medical advice. For any health concern, diagnosis or treatment, consult a doctor.',
  },
};

// Nur der Wortlaut, ohne Kasten. Fuer Stellen, an denen die auffaellige Box die
// Oberflaeche stoeren wuerde — etwa die Fusszeile unter dem Coach-Eingabefeld.
// Der Satz bleibt damit trotzdem an einer einzigen Stelle gepflegt.
export function medicalDisclaimerText(lang, type = 'medical') {
  const key = String(lang || '').startsWith('de') ? 'de' : 'en';
  return (TEXTS[type] || TEXTS.medical)[key];
}

export default function MedicalDisclaimer({ lang, type = 'medical', extra, className = '' }) {
  const text = medicalDisclaimerText(lang, type);

  return (
    <div className={`bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-2xl p-4 flex gap-3 ${className}`}>
      <AlertTriangle className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
      <p className="text-xs text-amber-700 dark:text-amber-400 leading-relaxed whitespace-pre-line">
        {extra ? `${text}\n\n${extra}` : text}
      </p>
    </div>
  );
}
