// Spielt Übersetzungen in eine Sprachdatei ein, ohne sie neu zu schreiben.
//
//   echo '{"ui.save":"Enregistrer"}' | node scripts/uebersetzung-einspielen.mjs fr
//   node scripts/uebersetzung-einspielen.mjs fr < texte.json
//
// **Warum ein Werkzeug und nicht die Datei von Hand bearbeiten?** Eine
// Sprachdatei hat 1412 Schlüssel in 21 verschachtelten Abschnitten. Wer sie
// abschnittsweise übersetzt und jedes Mal neu schreibt, verschiebt beim
// kleinsten Vertipper die Struktur — und ein Schlüssel, der dabei verlorengeht,
// fällt beim Bauen nicht auf (i18next nimmt still den Fallback).
//
// Hier wird ausschließlich der Wert an einem vorhandenen Pfad ersetzt.
// Ein Pfad, den `de.json` nicht kennt, ist ein Tippfehler und bricht ab —
// sonst entstünde ein Schlüssel, den nie jemand liest.
import { readFileSync, writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const WURZEL = join(dirname(fileURLToPath(import.meta.url)), '..');
const sprache = process.argv[2];
if (!sprache) {
  console.error('Sprache fehlt. Aufruf: node scripts/uebersetzung-einspielen.mjs <de|en|es|fr|pt|ar>');
  process.exit(1);
}

const pfad = join(WURZEL, `src/i18n/locales/${sprache}.json`);
const ziel = JSON.parse(readFileSync(pfad, 'utf8'));
const quelle = JSON.parse(readFileSync(join(WURZEL, 'src/i18n/locales/de.json'), 'utf8'));

const eingabe = JSON.parse(readFileSync(0, 'utf8'));

function hat(objekt, pfadTeile) {
  let k = objekt;
  for (const teil of pfadTeile) {
    if (!k || typeof k !== 'object' || !(teil in k)) return false;
    k = k[teil];
  }
  return typeof k === 'string';
}

function setzen(objekt, pfadTeile, wert) {
  let k = objekt;
  for (const teil of pfadTeile.slice(0, -1)) k = k[teil];
  k[pfadTeile.at(-1)] = wert;
}

// Platzhalter müssen erhalten bleiben. `{{count}}` im Deutschen und keiner in
// der Übersetzung heißt: Die Zahl erscheint nie — und der Text sieht trotzdem
// fertig aus. Genau das findet später niemand mehr.
const platzhalter = (s) => [...String(s).matchAll(/\{\{(\w+)\}\}/g)].map((m) => m[1]).sort().join(',');

let gesetzt = 0;
const fehler = [];
for (const [schluessel, wert] of Object.entries(eingabe)) {
  const teile = schluessel.split('.');
  if (!hat(quelle, teile)) { fehler.push(`unbekannter Schlüssel: ${schluessel}`); continue; }
  if (typeof wert !== 'string' || !wert.trim()) { fehler.push(`leerer Text: ${schluessel}`); continue; }
  let k = quelle;
  for (const teil of teile) k = k[teil];
  if (platzhalter(k) !== platzhalter(wert)) {
    fehler.push(`Platzhalter weichen ab bei ${schluessel} (de: ${platzhalter(k) || '—'}, ${sprache}: ${platzhalter(wert) || '—'})`);
    continue;
  }
  // Mehrzeilige Texte: gleiche Zahl an Zeilenumbrüchen. Ein Schlüssel wie
  // `ui.peptidesArePrescriptionOnlyOrUnapp` trägt ZWEI Absätze — beim Auslesen
  // sieht man sie als zwei Zeilen und übersetzt versehentlich nur die erste.
  // Der zweite Absatz verschwindet dann lautlos, und der Text sieht vollständig
  // aus. Genau so ist hier der Forschungsstand-Absatz einmal untergegangen.
  if ((String(k).match(/\n/g) || []).length !== (String(wert).match(/\n/g) || []).length) {
    fehler.push(`Zeilen weichen ab bei ${schluessel} (de: ${(String(k).match(/\n/g) || []).length + 1}, ${sprache}: ${(String(wert).match(/\n/g) || []).length + 1}) — fehlt ein Absatz?`);
    continue;
  }
  setzen(ziel, teile, wert);
  gesetzt += 1;
}

if (fehler.length) {
  for (const f of fehler) console.error('  ✗', f);
  console.error(`\n${fehler.length} Fehler — nichts geschrieben.`);
  process.exit(1);
}

writeFileSync(pfad, `${JSON.stringify(ziel, null, 2)}\n`, 'utf8');
console.log(`${sprache}: ${gesetzt} Texte eingespielt.`);
