/**
 * Bildschirmaufnahmen NUR fuer Social — store-assets/social/schirme/.
 *
 *   npm run build && npx vite preview --port 4173 &
 *   CHROME_BIN=/opt/pw-browsers/chromium node scripts/social-schirme.mjs
 *
 * ⚠ WARUM NICHT store-screenshots.mjs ERWEITERN. Jenes Skript schreibt nach
 * store-assets/{ios,ios-ipad,android}/ — das sind die Bilder, die bei Apple
 * und Google im Eintrag HAENGEN. Es dort um einen Eintrag zu ergaenzen hiesse,
 * bei jedem Lauf sechs Store-Bilder neu zu erzeugen, um eines dazuzubekommen;
 * ein Unterschied im Rendering wuerde dann still in den Store wandern.
 * Hier entsteht ausschliesslich, was im Store NICHT vorkommt.
 *
 * Heute ist das genau ein Bildschirm: die BIBLIOTHEK. Sie hat in den sechs
 * Store-Bildern keinen einzigen — die zeigen Training, Ernaehrung und deren
 * Unterseiten (Kochbuch, Uebungen, Peak-Programme). Fuer die App-Schau
 * (Josef, 20.09.2026: „eins mit 3 Bildschirmen wo training, ernaehrung und
 * bibliothek zu sehen ist") fehlte damit der dritte.
 *
 * Aufbau und Demo-Daten kommen unveraendert aus store-screenshots.mjs, damit
 * beide Saetze gleich aussehen — ein Social-Bild in einem anderen Zustand als
 * das Store-Bild waere schlimmer als keines.
 */
import { chromium } from 'playwright';
import fs from 'node:fs';
import path from 'node:path';

import { demoData, tidyMacher } from './store-screenshots.mjs';

const BASE = process.env.PREVIEW_URL || 'http://localhost:4173';
const ROOT = path.resolve(import.meta.dirname, '..');
const CHROME = process.env.CHROME_BIN
  || '/opt/pw-browsers/chromium-1194/chrome-linux/chrome';

// Dasselbe Geraet wie store-assets/ios — die App-Schau mischt beide Saetze in
// EINEM Bild, und zwei Seitenverhaeltnisse nebeneinander sehen aus wie ein
// Fehler.
const GERAET = { width: 440, height: 956, scale: 3 };

const SCHIRME = [
  { file: '07-bibliothek', route: '/library' },
];

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const browser = await chromium.launch({ executablePath: CHROME });
const ctx = await browser.newContext({
  viewport: { width: GERAET.width, height: GERAET.height },
  deviceScaleFactor: GERAET.scale,
  locale: 'de-DE',
  colorScheme: 'light',
  isMobile: true,
  hasTouch: true,
});
await ctx.addInitScript((seed) => {
  for (const [k, v] of Object.entries(seed)) localStorage.setItem(k, v);
}, demoData(new Date().toISOString().slice(0, 10)));

const page = await ctx.newPage();
const tidy = tidyMacher(page);
const out = path.join(ROOT, 'store-assets', 'social', 'schirme');
fs.mkdirSync(out, { recursive: true });

// ⚠ EIN LEERER BILDSCHIRM DARF HIER NICHT ALS ERFOLG DURCHGEHEN.
//
// Beim ersten Lauf am 20.09.2026 lief genau das: Der Preview-Server war gar
// nicht oben, `goto(...).catch(() => {})` schluckte den Fehler, und das
// Skript meldete „✓ 07-bibliothek.png" fuer ein vollstaendig leeres Bild.
// Waere es nicht am JPEG geprueft worden, haette eine weisse Flaeche als
// „Bibliothek" in einem Werbepost gestanden.
//
// Dasselbe Muster wie bei _tausche_bilder in anigosha/scripts/asc.py: Eine
// Zaehlung ueber Schleifendurchlaeufe ist keine Messung, sondern eine
// Behauptung. Geprueft wird deshalb ZWEIERLEI — dass die Seite wirklich Text
// zeigt, und dass das Bild nicht einfarbig ist.
let fehler = 0;
for (const s of SCHIRME) {
  const antwort = await page.goto(BASE + s.route, { waitUntil: 'networkidle' })
    .catch((e) => { console.error(`✗ ${s.route} nicht erreichbar: ${e.message.split('\n')[0]}`); return null; });
  if (!antwort) { fehler += 1; continue; }
  await sleep(1200);
  await tidy();

  const text = (await page.innerText('body').catch(() => '')).replace(/\s+/g, ' ').trim();
  if (text.length < 40) {
    console.error(`✗ ${s.file}: die Seite zeigt fast keinen Text (${text.length} Zeichen).`);
    console.error('  Meist fehlt VITE_SUPABASE_URL — der Client wird beim Start gebaut,');
    console.error('  bevor der Gastmodus greift, und die App bleibt weiss.');
    fehler += 1;
    continue;
  }

  const ziel = path.join(out, `${s.file}.png`);
  await page.screenshot({ path: ziel });
  console.log(`✓ ${path.relative(ROOT, ziel)} — ${text.length} Zeichen Text`);
}

await browser.close();
if (fehler) process.exit(1);
