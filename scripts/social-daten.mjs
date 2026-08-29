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
