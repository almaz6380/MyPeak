// Datenschicht fuer die Social-Posts: loest auf, was in der App verstreut liegt.
//
// Warum es diese Datei gibt: Uebungsnamen sind i18n-SCHLUESSEL, keine Texte
// (`nameKey: 'exercises.benchPress'`). Wer sie direkt ins Bild schreibt, hat
// „exercises.benchPress" im Post stehen. Und die Demofotos haengen an einer
// zweiten Zuordnung (exerciseDemos.js → free-exercise-db-Ordner). Beides an
// einem Ort aufzuloesen ist billiger, als es in jedem Generator zu wiederholen.
//
// Die Fotos unter public/exercise-demos/ stammen aus der free-exercise-db
// (github.com/yuhonas/free-exercise-db) und sind PUBLIC DOMAIN — fuer Social
// Media unbedenklich. Steht so im Kopf von src/data/exerciseDemos.js.

import { readFileSync, existsSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

import exercises from '../src/data/exercises.js';
import exerciseDemos from '../src/data/exerciseDemos.js';
import rezepte from '../src/data/recipesData.js';
import trainingTopics from '../src/data/trainingKnowledge.js';
import nutritionTopics from '../src/data/nutritionKnowledge.js';
import supplementsTopics from '../src/data/supplementsKnowledge.js';
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
export const WASSERZEICHEN_CSS = `
.kiMarke{position:absolute;right:22px;bottom:16px;z-index:9;
  display:flex;align-items:center;gap:7px;
  padding:7px 13px;border-radius:9px;
  background:rgba(10,10,10,.62);border:1px solid rgba(255,255,255,.28);
  backdrop-filter:blur(6px)}
.kiMarke b{font-size:21px;font-weight:700;letter-spacing:.1em;color:#fff;line-height:1}
.kiMarke span{font-size:15px;color:rgba(255,255,255,.72);line-height:1}`;

export const WASSERZEICHEN_HTML = {
  de: '<div class="kiMarke"><b>AI</b><span>KI-Bild</span></div>',
  en: '<div class="kiMarke"><b>AI</b><span>AI image</span></div>',
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

/** Nur Uebungen, zu denen wirklich zwei Fotos auf der Platte liegen. */
export function uebungenMitFotos() {
  return exercises
    .filter((u) => exerciseDemos[u.id] && !FALSCHE_ZUORDNUNG.has(u.id))
    .map((u) => {
      const ordner = exerciseDemos[u.id];
      const fotos = [0, 1].map((n) => join(WURZEL, 'public', 'exercise-demos', ordner, `${n}.jpg`));
      return { ...u, ordner, fotos };
    })
    .filter((u) => u.fotos.every((f) => existsSync(f)));
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
 * Ein Uebungsfoto als Hintergrund — echte Athleten, Public Domain, gratis.
 *
 * ⚠ Nur fuer TRAININGS-Inhalte. Ein Kniebeugenfoto hinter einem Rezept oder
 * einem Blutwert waere beliebige Dekoration; das faellt auf und wirkt billig.
 * Fuer Ernaehrung und Blutwerte gibt es im Repo (noch) kein passendes
 * Bildmaterial — diese Karten bleiben deshalb typografisch, bis welches da ist.
 */
export function trainingsFoto(wuerfel) {
  const u = uebungenMitFotos().filter((x) => x.type === 'strength' || x.type === 'hiit');
  if (!u.length) return null;
  const gewaehlt = u[Math.floor(wuerfel() * u.length)];
  // Das zweite Foto ist die Endposition — dort ist die Bewegung sichtbar,
  // das gibt das bessere Standbild.
  return gewaehlt.fotos[1] ?? gewaehlt.fotos[0];
}

/**
 * Bereiche, in denen ein Trainingsfoto inhaltlich passt.
 *
 * `training` und `supplements` drehen sich beide um Leistung im Gym — dort
 * traegt das Bild den Inhalt. `nutrition` und `bloodwork` nicht: Ein
 * Kniebeugenfoto hinter einem Blutwert oder einem Rezept ist Dekoration, und
 * das faellt auf. Die beiden bleiben typografisch, bis passendes Bildmaterial
 * da ist.
 */
export const FOTO_BEREICHE = new Set(['training', 'supplements']);

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
