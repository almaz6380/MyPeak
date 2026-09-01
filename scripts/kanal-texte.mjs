// Die Profiltexte fuer TikTok, Facebook und Instagram — an EINER Stelle.
//
// Warum eine eigene Datei: Der Werbespruch steht zweimal, im Bild und in der
// Beschreibung. Stehen sie an zwei Orten, laufen sie auseinander, sobald einer
// geaendert wird. Hier ist er einmal definiert; kanal-assets.mjs liest ihn.
//
// ⚠ ZEICHENGRENZEN SIND HART. Ein Text, der die Grenze reisst, wird von der
// Plattform ohne Vorwarnung abgeschnitten — meist mitten im wichtigsten Wort.
// Deshalb bricht `pruefeTexte()` beim Bauen ab, statt zu warnen. Dieselbe
// Bauart wie die Zahlen-Leitplanke in studien.mjs.
//
// Gezaehlt wird in Unicode-Zeichen (`[...s].length`), nicht in UTF-16-Einheiten:
// „💪".length ist 2, obwohl es EIN Zeichen ist. Die Plattformen zaehlen wie
// wir. Wo die Zaehlweise unklar ist, liegt der Text ohnehin deutlich darunter.
//
// KEINE PREISAUSSAGE in den Texten, solange „kostenlos" nicht gegen beide
// Stores geprueft ist — eine falsche Preisangabe im Profil ist aergerlicher
// als eine fehlende.
//
// KEIN Haftungshinweis (Josefs Entscheidung vom 29.08.2026). Die Texte bleiben
// trotzdem frei von Dosierungen, Diagnosen und Therapieempfehlungen — an
// dieser Linie hat Apple die App am 29.07.2026 schon einmal abgelehnt.

/** Die dokumentierten Obergrenzen der Plattformen. */
export const GRENZEN = {
  tiktok: 80,      // Bio
  instagram: 150,  // Bio
  facebook: 101,   // Kurz-Bio der Seite; der Infotext darunter ist frei
};

/** Der Werbespruch. Steht im Bild UND in den Beschreibungen. */
export const SPRUCH = {
  de: 'Training & Ernährung in einer App',
  en: 'Workout & nutrition in one app',
};

/**
 * Derselbe Spruch, aber mit von Hand gesetzten Zeilen — fuer die grosse
 * Instagram-Kachel.
 *
 * ⚠ Den Umbruch dem Browser zu ueberlassen ging schief: Er brach nach „IN"
 * um, sodass eine lange Zeile und ein kurzer Rest dastanden und die
 * Praeposition am Zeilenende haengenblieb. Bei EINER Schlagzeile, die man
 * einmal setzt und jahrelang stehen laesst, ist Handarbeit richtig.
 */
export const SPRUCH_ZEILEN = {
  de: ['Training &', 'Ernährung', 'in einer App'],
  en: ['Workout &', 'nutrition', 'in one app'],
};

/** Drei Schlagworte fuer die Bildleisten. Kurz genug fuer eine Zeile. */
export const DREIKLANG = {
  de: ['220+ Übungen', 'Makros & Barcode', 'Fortschritt in Zahlen'],
  en: ['220+ exercises', 'Macros & barcode', 'Progress in numbers'],
};

/**
 * Ein Wort je Instagram-Kachel, ueber der durchlaufenden Linie.
 *
 * Sie haben zwei Aufgaben zugleich: Sie fuellen den sonst leeren oberen Rand
 * und binden die drei Kacheln zusammen — nebeneinander gelesen ergeben sie
 * den Dreischritt, um den die App gebaut ist. Deshalb genau drei, und deshalb
 * je EIN Wort: was ueber die Fuge laeuft, wird unlesbar.
 */
export const LEISTE = {
  de: ['TRAINING', 'ERNÄHRUNG', 'FORTSCHRITT'],
  en: ['TRAINING', 'NUTRITION', 'PROGRESS'],
};

export const TEXTE = {
  de: {
    tiktok: 'Training & Ernährung in einer App 💪 Übungen, Makros, PRs – täglich Neues',
    instagram: [
      'Training & Ernährung in einer App.',
      '220+ Übungen · Barcode-Scanner · Makro-Ringe',
      'Fortschritt, der sichtbar wird 💪',
    ].join('\n'),
    facebook: 'Training und Ernährung in einer App: Übungen loggen, Makros tracken, Fortschritt sehen.',
    facebookLang: [
      'FullRep vereint Training und Ernährung an einem Ort — übersichtlich, schnell',
      'und ohne Überforderung. Egal ob Anfänger oder Fortgeschrittener.',
      '',
      '• Über 220 Übungen: Kraft, Cardio, HIIT, Zirkel und Kampfsport',
      '• Sätze, Wiederholungen und Gewicht loggen — mit Rest-Timer und',
      '  automatischer PR-Erkennung',
      '• 21 fertige Peak-Programme oder eigene Wochenpläne mit Kalender',
      '• Kalorien und Makros als Ringe, Barcode-Scanner, KI-Foto-Erkennung',
      '• Kochbuch, TDEE-Rechner, Wasser-Tracking, Supplement-Plan',
      '• Fortschritt als Diagramm, XP, Streaks und Challenges mit Freunden',
      '',
      'Deutsch und Englisch, hell und dunkel, kg oder lbs — und offline nutzbar.',
      'Für iOS und Android.',
    ].join('\n'),
  },
  en: {
    tiktok: 'Workout & nutrition in one app 💪 Exercises, macros, PRs – something new daily',
    instagram: [
      'Workout & nutrition in one app.',
      '220+ exercises · Barcode scanner · Macro rings',
      'Progress you can actually see 💪',
    ].join('\n'),
    facebook: 'Workout and nutrition in one app: log exercises, track macros, see your progress.',
    facebookLang: [
      'FullRep brings training and nutrition together in one place — clear, fast',
      'and without the overwhelm. Whether you are starting out or years in.',
      '',
      '• Over 220 exercises: strength, cardio, HIIT, circuits and martial arts',
      '• Log sets, reps and weight — with a rest timer and automatic PR detection',
      '• 21 ready-made Peak programmes or build your own weekly plan',
      '• Calories and macros as rings, barcode scanner, AI photo recognition',
      '• Recipe book, TDEE calculator, water tracking, supplement planner',
      '• Progress charts, XP, streaks and challenges with friends',
      '',
      'English and German, light and dark, kg or lbs — and it works offline.',
      'For iOS and Android.',
    ].join('\n'),
  },
};

/** Zeichen zaehlen, wie es ein Mensch tut: „💪" ist eines, nicht zwei. */
export const zeichen = (s) => [...String(s)].length;

/**
 * Bricht ab, wenn ein Text seine Grenze reisst. Wird beim Bauen aufgerufen —
 * ein zu langer Text darf gar nicht erst in eine Datei geraten.
 */
export function pruefeTexte() {
  const bericht = [];
  for (const [sprache, satz] of Object.entries(TEXTE)) {
    for (const [kanal, grenze] of Object.entries(GRENZEN)) {
      const n = zeichen(satz[kanal]);
      bericht.push({ sprache, kanal, n, grenze, ok: n <= grenze });
      if (n > grenze) {
        throw new Error(
          `Bio ${sprache}/${kanal} ist ${n} Zeichen lang, erlaubt sind ${grenze}. `
          + `Die Plattform schneidet sonst kommentarlos ab.\n  „${satz[kanal]}"`,
        );
      }
    }
  }
  return bericht;
}
