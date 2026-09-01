// Prüft die drei Sprachdateien und fährt die App danach in jeder Sprache an.
//
//   node scripts/pruefe-sprachen.mjs           # nur die Dateien (kein Browser)
//   node scripts/pruefe-sprachen.mjs --browser # zusätzlich echte Anzeige
//
// Warum überhaupt: Ein fehlender Schlüssel fällt beim Bauen NICHT auf.
// i18next liefert dann den Fallback (Deutsch) oder den nackten Schlüssel —
// beides sieht im Build wie ein Erfolg aus und erst am Gerät wie ein Fehler.
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const WURZEL = join(dirname(fileURLToPath(import.meta.url)), '..');
const SPRACHEN = ['de', 'en', 'es'];

const flach = (o, p = '') => Object.entries(o).flatMap(([k, v]) =>
  (v && typeof v === 'object' ? flach(v, `${p}${k}.`) : [[p + k, v]]));

const tabellen = Object.fromEntries(SPRACHEN.map((s) =>
  [s, new Map(flach(JSON.parse(readFileSync(join(WURZEL, `src/i18n/locales/${s}.json`), 'utf8'))))]));

const platzhalter = (s) => [...String(s).matchAll(/\{\{(\w+)\}\}/g)].map((m) => m[1]).sort().join(',');

let fehler = 0;
const meckern = (...t) => { fehler += 1; console.error('  ✗', ...t); };

console.log('Sprachdateien:');
for (const s of SPRACHEN) console.log(`  ${s}: ${tabellen[s].size} Schlüssel`);

for (const s of SPRACHEN.filter((x) => x !== 'de')) {
  for (const k of tabellen.de.keys()) if (!tabellen[s].has(k)) meckern(`${s}: Schlüssel fehlt — ${k}`);
  for (const k of tabellen[s].keys()) if (!tabellen.de.has(k)) meckern(`${s}: Schlüssel zu viel — ${k}`);
  for (const [k, v] of tabellen[s]) {
    if (typeof v === 'string' && !v.trim()) meckern(`${s}: leerer Text — ${k}`);
    const d = tabellen.de.get(k);
    if (typeof d === 'string' && typeof v === 'string' && platzhalter(d) !== platzhalter(v)) {
      meckern(`${s}: Platzhalter weichen ab — ${k} (de: ${platzhalter(d)}, ${s}: ${platzhalter(v)})`);
    }
  }
}

// Schlüssel, die im Code benutzt, aber nirgends definiert sind. Nur die
// wörtlichen t('…')-Aufrufe — dynamische (t(variable)) lassen sich statisch
// nicht prüfen und werden übersprungen.
import { readdirSync, statSync } from 'fs';
const dateien = [];
(function sammeln(ordner) {
  for (const n of readdirSync(ordner)) {
    const p = join(ordner, n);
    if (statSync(p).isDirectory()) sammeln(p);
    else if (/\.(js|jsx)$/.test(n)) dateien.push(p);
  }
})(join(WURZEL, 'src'));

const benutzt = new Set();
for (const d of dateien) {
  const src = readFileSync(d, 'utf8');
  for (const m of src.matchAll(/\bt\(\s*'([a-zA-Z0-9_.]+)'/g)) benutzt.add(m[1]);
  for (const m of src.matchAll(/\bt\(\s*`([a-zA-Z0-9_.]+)`/g)) benutzt.add(m[1]);
}
for (const k of benutzt) {
  if (k.startsWith('exercises.') || k.startsWith('__custom__')) continue;
  if (!tabellen.de.has(k)) meckern(`Schlüssel im Code, aber nicht in de.json — ${k}`);
}
console.log(`  ${benutzt.size} wörtliche t()-Schlüssel im Code geprüft.`);

if (!process.argv.includes('--browser')) {
  console.log(fehler ? `\n${fehler} Fehler.` : '\nAlles in Ordnung.');
  process.exit(fehler ? 1 : 0);
}

// ── Anzeigeprobe im echten Browser ──────────────────────────────────────────
// Sucht auf der Startseite nach rohen Schlüsseln („ui.something") — so sähe
// eine fehlende Übersetzung aus, wenn parseMissingKeyHandler greift.
const { chromium } = await import('playwright');
const browser = await chromium.launch({
  executablePath: process.env.CHROMIUM_PFAD || undefined,
  args: ['--no-sandbox'],
});
for (const s of SPRACHEN) {
  const kontext = await browser.newContext({ viewport: { width: 390, height: 844 } });
  const seite = await kontext.newPage();
  const konsole = [];
  seite.on('pageerror', (e) => konsole.push(String(e)));
  await seite.addInitScript((sp) => localStorage.setItem('language', sp), s);
  await seite.goto(process.env.URL || 'http://localhost:4173/', { waitUntil: 'networkidle' });
  const text = await seite.locator('body').innerText();
  const roh = [...text.matchAll(/\b(ui|common|training|nutrition|home|profile)\.[a-zA-Z0-9_]+/g)].map((m) => m[0]);
  if (roh.length) meckern(`${s}: rohe Schlüssel sichtbar — ${[...new Set(roh)].join(', ')}`);
  if (konsole.length) meckern(`${s}: Seitenfehler — ${konsole.join(' | ')}`);
  else console.log(`  ${s}: Startseite lädt ohne Fehler (${text.length} Zeichen Text).`);
  await kontext.close();
}
await browser.close();

console.log(fehler ? `\n${fehler} Fehler.` : '\nAlles in Ordnung.');
process.exit(fehler ? 1 : 0);
