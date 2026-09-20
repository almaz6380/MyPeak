// Datenschicht fuer die Social-Posts: loest auf, was in der App verstreut liegt.
//
// Warum es diese Datei gibt: Uebungsnamen sind i18n-SCHLUESSEL, keine Texte
// (`nameKey: 'exercises.benchPress'`). Wer sie direkt ins Bild schreibt, hat
// „exercises.benchPress" im Post stehen. Und die Demofotos haengen an einer
// zweiten Zuordnung (exerciseDemos.js → free-exercise-db-Ordner). Beides an
// einem Ort aufzuloesen ist billiger, als es in jedem Generator zu wiederholen.
//
// ⚠ ZU DEN FOTOS UNTER public/exercise-demos/ — HIER STAND EINE FALSCHE ZUSAGE.
//
// Frueher stand an dieser Stelle: „stammen aus der free-exercise-db und sind
// PUBLIC DOMAIN — fuer Social Media unbedenklich. Steht so im Kopf von
// src/data/exerciseDemos.js." Der zweite Satz stimmt, der erste ist damit nicht
// belegt: exerciseDemos.js ist unsere EIGENE Notiz. Sie als Beleg zu nehmen ist
// ein Zirkelschluss.
//
// Nachgeprueft am 30.08.2026:
//   yuhonas/free-exercise-db  LICENSE.md = Unlicense, kein Wort zur Herkunft
//                             der FOTOS.
//   wrkout/exercises.json     (die Quelle davor) ebenfalls Unlicense, nennt
//                             ebenfalls keinen Fotografen und keine Quelle.
//   Die Dateien selbst        480x320, progressives JPEG, EXIF OHNE
//                             Copyright-Feld — der Fussabdruck eines Scrapes.
//   Issue #2 „License of Images?" und Issue #12 stellen genau diese Frage.
//                             Beide sind seit Jahren unbeantwortet.
//
// Die Unlicense ist die Erklaerung eines WEITERVERTEILERS, keine dokumentierte
// Rechtekette — sie uebertraegt keine Rechte, die der Erklaerende nie hatte.
//
// In der App bleiben die Fotos (seit dem Launch drin, bestehendes Risiko).
// In WERBUNG gehen sie nicht: Social Media ist kommerzielle Bewerbung mit
// Bilderkennung auf der Gegenseite. Deshalb ist FOTO_BEREICHE leer — siehe
// dort. uebungenMitFotos() bleibt bestehen, weil es die Uebungsauswahl traegt;
// nur die Fotos daraus landen nicht mehr im Post.

import { readFileSync, readdirSync, existsSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

import exercises from '../src/data/exercises.js';
import exerciseDemos from '../src/data/exerciseDemos.js';
import rezepte from '../src/data/recipesData.js';
import trainingTopics from '../src/data/trainingKnowledge.js';
import nutritionTopics from '../src/data/nutritionKnowledge.js';
import supplementsTopics from '../src/data/supplementsKnowledge.js';
import peptide from '../src/data/peptidesData.js';
import bloodworkTopics from '../src/data/bloodworkKnowledge.js';

const HIER = dirname(fileURLToPath(import.meta.url));
export const WURZEL = join(HIER, '..');

const I18N = {
  de: JSON.parse(readFileSync(join(WURZEL, 'src/i18n/locales/de.json'), 'utf8')),
  en: JSON.parse(readFileSync(join(WURZEL, 'src/i18n/locales/en.json'), 'utf8')),
};

/** 'exercises.benchPress' → 'Bankdrücken'. Gibt null statt des Schluessels zurueck. */
export function text(schluessel, sprache = 'de') {
  if (!schluessel) return null;
  const wert = schluessel.split('.').reduce((o, k) => (o == null ? o : o[k]), I18N[sprache]);
  return typeof wert === 'string' ? wert : null;
}

// --- Kein Haftungshinweis in Social-Media-Beitraegen -------------------------
// Hier stand bis zum 29.08.2026 der Satz „Kein Ersatz fuer aerztlichen Rat …".
// Er ist ABSICHTLICH entfernt (Josefs Entscheidung), nicht vergessen.
//
// Der Hinweis ist eine Auflage fuer den STORE-EINTRAG: Google hat die App am
// 30.07.2026 abgelehnt, weil er in der de-DE-Beschreibung fehlte, und die
// Pruefung sucht dort nach den drei Woertern Rat, Diagnose und Behandlung.
// Ein Instagram- oder TikTok-Beitrag ist kein Store-Listing.
//
// ⚠ In der App (MedicalDisclaimer.jsx), im Play-Text
// (store-assets/play-listing.de-DE.json) und unter /legal/health bleibt er
// unveraendert. Wer ihn DORT entfernt, holt die Ablehnung zurueck.
//
// Die Quellenangabe bleibt dagegen Pflicht — siehe quelleKurz() weiter unten.

// --- KI-Wasserzeichen -------------------------------------------------------
// Wo KI-erzeugte MENSCHEN im Bild sind, traegt der Post unten rechts ein
// kleines „AI". Josefs Regel vom 29.08.2026, und sie ist gut begruendet:
//
//   · Meta und TikTok verlangen die Kennzeichnung realistischer KI-Inhalte
//     ohnehin. Wer sie selbst setzt, bestimmt, wie sie aussieht — sonst
//     klebt die Plattform ihr eigenes Label darueber.
//   · Der EU AI Act (Art. 50) verlangt ab 2026 Transparenz bei
//     KI-erzeugten Bild-, Ton- und Videoinhalten.
//   · Und es kostet nichts an Wirkung: Wer Trainingswissen mit Belegen
//     ausspielt, gewinnt durch Ehrlichkeit, nicht durch Verschleierung.
//
// ⚠ Es gilt fuer KI-erzeugte MENSCHEN. Echte Fotos brauchen es nicht — die
// 177 Uebungsfotos stammen aus der free-exercise-db und zeigen echte
// Personen. Ein Wasserzeichen darauf waere schlicht falsch.
//
// Das dunkle, halbdurchsichtige Plaettchen liegt bewusst NICHT auf weissem
// Grund: Es muss sowohl ueber einem hellen Foto als auch auf dem dunklen
// Kartenhintergrund lesbar bleiben.
//
// ⚠ NUR „AI", ohne die Zeile „KI-Bild" daneben (Josef, 20.09.2026). Das ist
// KEIN Versehen und wird nicht „wiederhergestellt": Es ist dieselbe Form, die
// Meta und TikTok verwenden, bleibt damit eine Kennzeichnung im Sinne von
// Art. 50, und ein Zweitwort neben dem Kuerzel erklaert niemandem etwas, den
// „AI" nicht schon erreicht hat.
export const WASSERZEICHEN_CSS = `
.kiMarke{position:absolute;right:22px;bottom:16px;z-index:9;
  display:flex;align-items:center;
  padding:7px 13px;border-radius:9px;
  background:rgba(10,10,10,.62);border:1px solid rgba(255,255,255,.28);
  backdrop-filter:blur(6px)}
/* Das negative margin nimmt den Sperrabstand HINTER dem letzten Buchstaben
   wieder weg. Ohne das steht „AI" im Plaettchen sichtbar links — bei zwei
   Buchstaben faellt auf, was neben einem zweiten Wort nie auffiel. */
.kiMarke b{font-size:21px;font-weight:700;letter-spacing:.1em;margin-right:-.1em;
  color:#fff;line-height:1}`;

// ⚠ Beide Sprachen sagen dasselbe — das bleiben trotzdem ZWEI Eintraege. Die
// Form `{de, en}` ist der Vertrag mit post-bild.mjs, und eine Sprache mit
// eigenem Kuerzel (im Spanischen etwa „IA") haette sonst keinen Platz.
export const WASSERZEICHEN_HTML = {
  de: '<div class="kiMarke"><b>AI</b></div>',
  en: '<div class="kiMarke"><b>AI</b></div>',
};

// --- Uebungen ---------------------------------------------------------------
// ⚠ Zwei Uebungen tragen in src/data/exerciseDemos.js eine Zuordnung, die dem
// eigenen `equipment`-Feld widerspricht: `step-up-weighted` ist als
// `dumbbell` gefuehrt, zeigt aber Fotos aus `Barbell_Step_Ups`; dasselbe bei
// `reverse-wrist-curl`. Im Post stuende dann „mit Kurzhanteln" ueber einem
// Bild mit Langhantel — das kostet Glaubwuerdigkeit.
//
// Das ist ein Fehler IN DER APP, nicht in diesem Werkzeug: Nutzer sehen
// dieselbe Abweichung in der Uebungsansicht. Er gehoert dort behoben (Ordner
// tauschen oder equipment korrigieren). Bis dahin werden die beiden hier
// uebersprungen, statt sie stillschweigend zu posten.
const FALSCHE_ZUORDNUNG = new Set(['step-up-weighted', 'reverse-wrist-curl']);

/**
 * Die Uebungen, die sich fuer einen Post eignen.
 *
 * Die Demo-Zuordnung dient hier nur noch als QUALITAETSFILTER: Wer ein
 * Demo-Foto hat, ist eine gaengige, gut beschriebene Uebung — genau die will
 * man posten. Die BILDPFADE gibt die Funktion bewusst NICHT mehr heraus
 * (`fotos: []`), weil ihre Rechtekette nicht belegt ist; siehe Dateikopf.
 *
 * Der Name bleibt, damit die vier Aufrufstellen in post-bild.mjs und
 * post-reel.mjs unveraendert weiterlaufen. Die Karten werden dadurch
 * typografisch statt bebildert — sie fallen nicht aus.
 */
export function uebungenMitFotos() {
  return exercises
    .filter((u) => exerciseDemos[u.id] && !FALSCHE_ZUORDNUNG.has(u.id))
    .filter((u) => [0, 1].every((n) => existsSync(
      join(WURZEL, 'public', 'exercise-demos', exerciseDemos[u.id], `${n}.jpg`),
    )))
    .map((u) => ({ ...u, ordner: exerciseDemos[u.id], fotos: [] }));
}

export function uebungTexte(u, sprache = 'de') {
  return {
    name: text(u.nameKey, sprache) ?? u.id,
    beschreibung: text(u.descKey, sprache) ?? '',
    muskel: text(`muscleGroups.${u.muscleGroup}`, sprache) ?? u.muscleGroup,
    geraet: text(`equipment.${u.equipment}`, sprache) ?? u.equipment,
  };
}

/**
 * Ein Foto als Hintergrund — aus `store-assets/social/fotos/`, NICHT aus
 * `public/exercise-demos/`.
 *
 * Der Ordner ist heute leer, deshalb gibt die Funktion null zurueck und die
 * Karten laufen typografisch. Das ist Absicht: Lieber kein Foto als eines,
 * dessen Rechtekette niemand belegen kann (Begruendung im Dateikopf).
 *
 * Wer ihn fuellt, legt daneben ein HERKUNFT.md an — je Datei Modell, Prompt,
 * Datum, Kosten. Zeigt ein Bild KI-erzeugte MENSCHEN, muss der Generator mit
 * `--ki` laufen; die Leitplanke `ki-wasserzeichen` in
 * anigosha/tools/social/vorflug.mjs verwirft den Post sonst.
 *
 * ⚠ Nur fuer TRAININGS-Inhalte. Ein Kniebeugenfoto hinter einem Rezept oder
 * einem Blutwert waere beliebige Dekoration; das faellt auf und wirkt billig.
 */
export const SOCIAL_FOTOS = join(WURZEL, 'store-assets', 'social', 'fotos');

export function trainingsFoto(wuerfel) {
  if (!existsSync(SOCIAL_FOTOS)) return null;
  const u = readdirSync(SOCIAL_FOTOS)
    .filter((f) => /\.(jpe?g|png|webp)$/i.test(f))
    .sort()
    .map((f) => ({ fotos: [join(SOCIAL_FOTOS, f)] }));
  if (!u.length) return null;
  return u[Math.floor(wuerfel() * u.length)].fotos[0];
}

/**
 * Bereiche, in denen ein Foto inhaltlich passt.
 *
 * ⚠ HEUTE LEER, und das ist kein Versehen. Solange in
 * `store-assets/social/fotos/` nichts liegt, dessen Rechtekette wir belegen
 * koennen, laufen ALLE Karten typografisch (Stile `mix`, `poster`, `zahl`) —
 * genau wie bei Anigosha. Es faellt dadurch kein Post aus, es fehlt nur das
 * Foto. Begruendung im Dateikopf.
 *
 * Sobald belegtes Material da ist, kommen `training` und `supplements` zurueck:
 * Beide drehen sich um Leistung im Gym, dort traegt das Bild den Inhalt.
 * `nutrition` und `bloodwork` bleiben draussen — ein Kniebeugenfoto hinter
 * einem Blutwert ist Dekoration, und das faellt auf.
 */
export const FOTO_BEREICHE = new Set([]);

// --- Wissen -----------------------------------------------------------------
// quickDE/quickEN sind Arrays aus {label, text} — fertige Zitatkarten.
// `references` sind {authors, year, title, source, url}; die Quelle MUSS
// sichtbar ins Bild, Apple hat die App am 29.07.2026 unter 1.4.1 abgelehnt,
// weil medizinische Inhalte ohne Belege dastanden.
const WISSEN_QUELLEN = [
  ['training', trainingTopics],
  ['nutrition', nutritionTopics],
  ['supplements', supplementsTopics],
  ['bloodwork', bloodworkTopics],
];

export function wissensthemen() {
  const raus = [];
  for (const [bereich, themen] of WISSEN_QUELLEN) {
    for (const t of themen ?? []) {
      const quick = { de: t.quickDE ?? [], en: t.quickEN ?? [] };
      if (!quick.de.length && !quick.en.length) continue;
      raus.push({
        bereich,
        id: t.id ?? t.key ?? `${bereich}-${raus.length}`,
        titel: { de: t.nameDE ?? t.titleDE ?? t.id, en: t.nameEN ?? t.titleEN ?? t.id },
        zusammenfassung: { de: t.summaryDE ?? '', en: t.summaryEN ?? '' },
        quick,
        quellen: t.references ?? [],
      });
    }
  }
  return raus;
}

/**
 * Kurzform einer Quelle fuers Bild: „Kreider et al. 2017 · JISSN".
 *
 * ⚠ „et al." wird NICHT selbst angehaengt. Das Feld `authors` traegt es
 * bereits, wo es hingehoert. Selbst gebaut wurde daraus „American College of
 * Sports Medicine et al." — eine Organisation hat keine Mitautoren.
 */
export function quelleKurz(q) {
  if (!q) return null;
  let autor = (q.authors ?? '').trim().replace(/[,.]$/, '');
  // Personen tragen Initialen („Kreider, R.B. et al." oder „Schoenfeld, B.J.,
  // Ogborn, D. & Krieger, J.W") — auf den ersten Nachnamen kuerzen.
  // Organisationen haben kein Initialen-Muster und bleiben ganz.
  if (/,\s*[A-Z]\./.test(autor)) {
    const nachname = autor.split(',')[0].trim();
    const mehrere = /&|et al\.?|,[^,]*,/.test(autor);
    autor = mehrere ? `${nachname} et al.` : nachname;
  }
  const journal = (q.source ?? '').split(/[0-9;:]/)[0].trim().replace(/[,.]$/, '');
  return [autor, q.year, journal].filter(Boolean).join(' · ');
}

// --- Rezepte ----------------------------------------------------------------
export function rezepteMitMakros() {
  return (rezepte ?? []).filter((r) => r.nutrition?.protein != null);
}

export { rezepte, exercises };

// --- Peptide ----------------------------------------------------------------
//
// ⚠ WARUM ES DIESE FUNKTION GIBT: `peptidesData.js` liegt seit jeher in der
// App (20 Eintraege, BPC-157 bis Semax), und der Bildgenerator hat sie nie
// angefasst — er zog nur aus den vier WISSEN_QUELLEN. Josef hat am 20.09.2026
// genau danach gefragt („BPC ist ein Peptid aus so und so vielen
// Aminosaeuren"), und die Antwort lag die ganze Zeit im Repo.
//
// ⚠ DIE ZAHL WIRD NICHT ERFUNDEN, sondern aus dem Wort gelesen, das die App
// selbst benutzt: „Pentadecapeptid" heisst 15, „Tripeptid" heisst 3. Neun der
// zwanzig Eintraege nennen ihre Kettenlaenge so. Die uebrigen elf bekommen
// keine Zahlenkarte — lieber ein Peptid weniger als eine Zahl, die niemand
// belegen kann. Dieselbe Regel wie bei `studien.mjs`, wo jeder Wert woertlich
// im Quelltext vorkommen muss.
const KETTE = {
  mono: 1, di: 2, tri: 3, tetra: 4, penta: 5, hexa: 6, hepta: 7,
  octa: 8, nona: 9, deca: 10, undeca: 11, dodeca: 12, trideca: 13,
  tetradeca: 14, pentadeca: 15, hexadeca: 16,
};

// ⚠ ZWEI FALLEN AUF EINMAL, beide am 20.09.2026 gemessen:
//
// 1. `tri` ist ein Praefix von `trideca`. Wer kurz vor lang prueft, macht aus
//    Melanotan I (Tridecapeptid) ein Tripeptid. Deshalb steht die Alternative
//    im Muster absteigend nach Laenge.
// 2. Ein Text kann ZWEI Laengen nennen, und nur die erste gehoert zum Stoff:
//    „Selank ist ein Heptapeptid, abgeleitet von Tuftsin (Tetrapeptid)".
//    Deshalb zaehlt der erste Treffer im TEXTFLUSS — nicht der erste in einer
//    Wortliste, denn dort entschiede die Sortierung statt des Satzes.
const KETTE_MUSTER = new RegExp(
  `(${Object.keys(KETTE).sort((a, b) => b.length - a.length).join('|')})peptid`,
  'i',
);

/** Kettenlaenge aus einem Text, oder null. */
export function kettenLaenge(text) {
  const t = KETTE_MUSTER.exec(String(text ?? '').toLowerCase());
  return t ? KETTE[t[1]] : null;
}

/**
 * Peptide, die eine belegte Kettenlaenge tragen.
 *
 * ⚠ Gelesen wird aus `summaryDE` und, falls die Zusammenfassung schweigt, aus
 * dem ERSTEN Kapitel („Was ist X?") — dem Absatz, der den Stoff definiert.
 * Nicht aus der ganzen Datei: Spaetere Kapitel nennen Laengen ANDERER Stoffe
 * (Selank ist ein Heptapeptid und stammt von Tuftsin, einem Tetrapeptid).
 * Mit `summaryDE` allein waeren es nur drei Peptide gewesen.
 */
/**
 * ⚠ Nicht jedes Peptid aus der App gehoert auf einen oeffentlichen Kanal.
 *
 * Die App ist ein Nachschlagewerk: Dort steht alles, sachlich und mit Quellen.
 * Ein TikTok-Beitrag ist Werbung — und Werbung fuer eine nicht zugelassene
 * Spritze zum Braeunen oder zur Libidosteigerung ist etwas anderes als ein
 * Lexikoneintrag darueber. Die drei Melanocortin-Peptide bleiben deshalb in
 * der App, aber nicht in den Posts.
 *
 * Das ist eine VORSICHTSENTSCHEIDUNG von Claude, keine Vorgabe von Josef.
 * Wer sie aufheben will, leert diese Menge.
 */
const NICHT_SOZIAL = new Set(['pt141', 'melanotan1', 'melanotan2']);

/**
 * Wie viele Peptide die App-Bibliothek fuehrt — ALLE, auch die, die nicht in
 * einen Post duerfen, und die ohne belegte Kettenlaenge. Der Hinweis auf der
 * Karte wirbt fuer die Bibliothek, nicht fuer die Auswahl daraus.
 *
 * ⚠ Gezaehlt, nicht getippt. „es wird keine Zahl erfunden" gilt auch fuer eine
 * Zahl, die heute stimmt: Kommt ein Peptid dazu, zaehlt die Karte es mit,
 * ohne dass jemand daran denken muss.
 */
export function peptideGesamt() {
  return peptide.length;
}

export function peptidePosts() {
  return peptide
    .filter((p) => !NICHT_SOZIAL.has(p.id))
    .map((p) => ({
      p,
      laenge: kettenLaenge(p.summaryDE)
        ?? kettenLaenge(p.sections?.[0]?.contentDE),
    }))
    .filter(({ laenge }) => laenge !== null)
    .map(({ p, laenge }) => ({
      id: p.id,
      bereich: p.category,
      name: { de: p.nameDE, en: p.nameEN },
      zusammenfassung: { de: p.summaryDE ?? '', en: p.summaryEN ?? '' },
      laenge,
      wirkung: { de: p.quickDE?.wirkung ?? '', en: p.quickEN?.wirkung ?? '' },
      nebenwirkungen: { de: p.quickDE?.nebenwirkungen ?? '', en: p.quickEN?.nebenwirkungen ?? '' },
      quellen: p.references ?? [],
    }));
}
