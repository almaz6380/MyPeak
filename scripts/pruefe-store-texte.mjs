#!/usr/bin/env node
// Prüft die Store-Texte gegen die Zeichengrenzen der beiden Stores.
//
// Warum ein eigenes Skript: Apple und Google schneiden zu lange Felder nicht
// ab, sie WEISEN DEN UPLOAD AB — und zwar erst am Ende eines Laufs, der bis
// dahin Minuten gebraucht hat. Ein zu langer Untertitel ist damit teurer als
// er aussieht.
//
// ⚠ Gezählt werden UNICODE-ZEICHEN, nicht Bytes. Beide Stores zählen so; ein
// arabisches Zeichen ist im UTF-8-Byte-Sinn zwei bis drei Bytes, zählt aber
// als eines. `[...text].length` statt `text.length`, damit auch Emoji und
// zusammengesetzte Zeichen einzeln zählen.
//
//   node scripts/pruefe-store-texte.mjs
import { readFileSync, readdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const WURZEL = join(dirname(fileURLToPath(import.meta.url)), '..');
const ASSETS = join(WURZEL, 'store-assets');

// Google Play. Die iOS-Felder (Name 30, Untertitel 30, Keywords 100,
// Werbetext 170) stehen in store-texte.md und werden unten geprüft.
const PLAY_GRENZEN = {
  title: 30,
  shortDescription: 80,
  fullDescription: 4000,
};

const IOS_GRENZEN = {
  Name: 30,
  Untertitel: 30,
  Keywords: 100,
  Werbetext: 170,
};

let fehler = 0;
const meckern = (text) => { console.error(`  ✗ ${text}`); fehler += 1; };
const zeichen = (text) => [...String(text)].length;

function pruefeLaenge(wo, feld, text, grenze) {
  const n = zeichen(text);
  const anzeige = `${wo} · ${feld}: ${n}/${grenze}`;
  if (n > grenze) meckern(`${anzeige} — ${n - grenze} Zeichen zu lang`);
  else if (n > grenze * 0.95) console.log(`  ⚠ ${anzeige} (knapp)`);
  else console.log(`  ✓ ${anzeige}`);
}

console.log('Google Play (play-listing.*.json)\n');
const listings = readdirSync(ASSETS).filter((d) => /^play-listing\..+\.json$/.test(d)).sort();
if (!listings.length) meckern('keine play-listing.*.json gefunden');

for (const datei of listings) {
  const locale = datei.replace(/^play-listing\.|\.json$/g, '');
  let daten;
  try {
    daten = JSON.parse(readFileSync(join(ASSETS, datei), 'utf8'));
  } catch (err) {
    meckern(`${datei} ist kein gültiges JSON — ${err.message}`);
    continue;
  }
  for (const [feld, grenze] of Object.entries(PLAY_GRENZEN)) {
    if (!daten[feld]) { meckern(`${locale} · ${feld} fehlt`); continue; }
    pruefeLaenge(locale, feld, daten[feld], grenze);
  }

  // Inhaltliche Proben. Der Gesundheitshinweis ist keine Zier: Google Play
  // verlangt ihn für Gesundheits-Apps, und er stand schon einmal nur in der
  // deutschen Fassung.
  const voll = String(daten.fullDescription || '');
  if (!/FullRep/.test(voll)) meckern(`${locale} · der App-Name kommt in der Beschreibung nicht vor`);
  // „Arzt“ in sechs Sprachen — der Hinweis muss in JEDER Fassung stehen.
  if (!/(ärztlich|Arzt|doctor|médico|médecin|طبيب|الطبي)/i.test(voll)) {
    meckern(`${locale} · der Gesundheitshinweis fehlt (kein Verweis auf ärztlichen Rat)`);
  }
  if (/\bDeutsch und Englisch\b|\bEnglish and German\b/.test(voll)) {
    meckern(`${locale} · nennt noch „Deutsch und Englisch“ — die App kann sechs Sprachen`);
  }
}

console.log('\nApp Store (store-texte.md)\n');
const md = readFileSync(join(ASSETS, 'store-texte.md'), 'utf8');

// Die iOS-Felder stehen als „### <Feld> (max. N …)“ gefolgt von einem
// ```-Block. Der Parser liest genau dieses Muster; ändert sich die Struktur,
// findet er nichts mehr und meldet es, statt still durchzulaufen.
const bloecke = [...md.matchAll(/^###\s+(.+?)\s*\((?:max\.\s*)?(\d+)\s*Zeichen[^)]*\)\s*\n+```\n([\s\S]*?)\n```/gm)];
if (!bloecke.length) meckern('keine Feld-Blöcke in store-texte.md gefunden — Aufbau geändert?');

// Der Abschnitt, in dem ein Block steht, bestimmt die Sprache: „## 3. Spanisch“.
function abschnittVon(index) {
  const davor = md.slice(0, index);
  const treffer = [...davor.matchAll(/^##\s+(.+)$/gm)];
  return treffer.length ? treffer[treffer.length - 1][1].trim() : '(Anfang)';
}

for (const b of bloecke) {
  const [, feld, grenzeRoh, inhalt] = b;
  const grenze = Number(grenzeRoh);
  const name = feld.split('/')[0].trim();
  // Nur die Felder mit bekannter Grenze gegenprüfen; die Grenze aus der
  // Überschrift muss dazu passen, sonst ist die Überschrift falsch.
  if (IOS_GRENZEN[name] && IOS_GRENZEN[name] !== grenze) {
    meckern(`${abschnittVon(b.index)} · ${name}: Überschrift sagt ${grenze}, richtig sind ${IOS_GRENZEN[name]}`);
  }
  pruefeLaenge(abschnittVon(b.index), feld, inhalt.trim(), grenze);
}

console.log('');
if (fehler) {
  console.error(`${fehler} Problem${fehler === 1 ? '' : 'e'}.`);
  process.exit(1);
}
console.log('Alles in Ordnung.');
