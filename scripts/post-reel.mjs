#!/usr/bin/env node
// Kurzvideos fuer FullRep — 1080×1920, 30 fps.
//
//   CHROMIUM_PFAD=/opt/pw-browsers/chromium node scripts/post-reel.mjs \
//       --format uebung-loop --seed 7 --lang de
//   … --format wissen-reel --seed 3
//
// Kostet nichts. Kein fal.ai, kein Fremdmaterial.
//
// `uebung-loop` baut aus den zwei Demofotos (Start/Ende) eine ruhige
// Wiederholung — hin, zurueck, hin. Genau das, was ein Uebungsvideo leisten
// muss, und die 177 brauchbaren Uebungen ergeben 177 Posts ohne Wiederholung.
//
// ⚠ Aufbau uebernommen aus anigosha/tools/reels: KEINE CSS-Animation, KEIN
// setTimeout. Jeder Frame ist reine Funktion von window.setFrame(n) — sonst
// verrutschen Frames und nichts ist reproduzierbar. Die Seite wird per
// setContent() geladen und hat keinen Origin, also muessen Schrift, Logo und
// Fotos als data:-URI eingebettet sein.
//
// ⚠ Playwrights mitgelieferter ffmpeg kann kein MP4 (nur VP8/WebM), deshalb
// ffmpeg-static.
//
// ⚠ Videos gehen STUMM raus. Ton legt Josef selbst darueber — so ist es auch
// bei WELLbooked! geregelt, und ein Fremdsound waere kommerziell ohnehin
// nicht lizenziert.
//
// Store-Regel wie ueberall: Der Abspann nennt nur, was in STORES steht.
// iOS ist Stand 15.08.2026 nicht freigegeben.

import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { spawn } from 'node:child_process';
import { createRequire } from 'node:module';
import { join } from 'node:path';
import { chromium } from 'playwright';

import {
  WURZEL, HINWEIS, uebungenMitFotos, uebungTexte, wissensthemen, quelleKurz,
} from './social-daten.mjs';

const require = createRequire(import.meta.url);
const FFMPEG = require('ffmpeg-static');

const arg = (n, s) => { const i = process.argv.indexOf(`--${n}`); return i === -1 ? s : process.argv[i + 1]; };
const FORMAT = arg('format', 'uebung-loop');
const LANG = arg('lang', 'de');
const SEED = Number(arg('seed', 1));
const NAME = arg('name', null);
const OUT = join(WURZEL, arg('out', 'out/social'));

const B = 1080, H = 1920, FPS = 30;
const STORES = { ios: false, android: true };

const storeSatz = (lang) => (lang === 'de'
  ? (STORES.ios && STORES.android ? 'Gratis im App Store und bei Google Play'
    : STORES.android ? 'Gratis bei Google Play' : 'Im Browser nutzen')
  : (STORES.ios && STORES.android ? 'Free on the App Store and Google Play'
    : STORES.android ? 'Free on Google Play' : 'Use it in your browser'));

function mulberry32(s) {
  return function () {
    s |= 0; s = (s + 0x6d2b79f5) | 0;
    let t = Math.imul(s ^ (s >>> 15), 1 | s);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const T = {
  de: { quelle: 'Quelle', wiederholung: 'Wiederholung', fuss: 'FullRep · Training & Ernährung' },
  en: { quelle: 'Source', wiederholung: 'Repetition', fuss: 'FullRep · Workout & Nutrition' },
}[LANG];

const esc = (s) => String(s ?? '').replace(/[&<>]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' }[c]));
const b64 = (p) => readFileSync(p).toString('base64');

// --- Inhalt -----------------------------------------------------------------
const w = mulberry32(SEED);
const zieh = (m) => m[Math.floor(w() * m.length)];

let daten;
if (FORMAT === 'uebung-loop') {
  const u = zieh(uebungenMitFotos());
  const t = uebungTexte(u, LANG);
  daten = {
    art: 'uebung', schluessel: u.id, titel: t.name, unter: `${t.muskel} · ${t.geraet}`,
    beschreibung: t.beschreibung,
    fotos: u.fotos.map((f) => `data:image/jpeg;base64,${b64(f)}`),
    hinweis: null, quelle: null,
  };
} else {
  const th = zieh(wissensthemen());
  const quick = (th.quick[LANG]?.length ? th.quick[LANG] : th.quick.de) ?? [];
  const q = zieh(quick.length ? quick : [{ label: '', text: th.zusammenfassung[LANG] }]);
  daten = {
    art: 'wissen', schluessel: th.id, titel: th.titel[LANG] ?? th.titel.de,
    unter: q.label, beschreibung: q.text, fotos: null,
    hinweis: HINWEIS[LANG] ?? HINWEIS.de, quelle: quelleKurz(th.quellen[0]),
  };
}

if (daten.art === 'wissen' && !daten.quelle) {
  console.error(`✗ Belegte Aussage ohne Quelle (${daten.schluessel}). Apple 1.4.1.`);
  process.exit(1);
}

// Uebungs-Loop: 4 Durchlaeufe à 1,6 s plus 1,2 s Auftakt und 2,4 s Abspann.
const AUFTAKT = Math.round(1.2 * FPS);
const ZYKLUS = Math.round(1.6 * FPS);
const ZYKLEN = daten.art === 'uebung' ? 5 : 0;
const ABSPANN = Math.round(2.4 * FPS);
const GESAMT = daten.art === 'uebung'
  ? AUFTAKT + ZYKLEN * ZYKLUS + ABSPANN
  : Math.round(9 * FPS);

// --- Seite ------------------------------------------------------------------
function baueHtml() {
  const font400 = b64(join(WURZEL, 'node_modules/@fontsource/inter/files/inter-latin-400-normal.woff2'));
  const font700 = b64(join(WURZEL, 'node_modules/@fontsource/inter/files/inter-latin-700-normal.woff2'));
  const logo = b64(join(WURZEL, 'public/favicon.svg'));
  const zustand = JSON.stringify({
    ...daten, AUFTAKT, ZYKLUS, ZYKLEN, ABSPANN, GESAMT, storeSatz: storeSatz(LANG), T,
  }).replace(/</g, '\\u003c');

  return `<!doctype html><meta charset="utf-8"><style>
@font-face{font-family:'Inter';font-weight:400;src:url(data:font/woff2;base64,${font400}) format('woff2')}
@font-face{font-family:'Inter';font-weight:700;src:url(data:font/woff2;base64,${font700}) format('woff2')}
*{margin:0;padding:0;box-sizing:border-box}
html,body{width:${B}px;height:${H}px;overflow:hidden}
body{font-family:'Inter',system-ui,sans-serif;color:#fef3c7;
  background:radial-gradient(120% 70% at 20% 0%,#1a1a1a 0%,#0a0a0a 60%);
  display:flex;flex-direction:column;padding:70px 64px;position:relative}
.ring{position:absolute;width:900px;height:900px;border-radius:50%;
  border:1px solid rgba(251,191,36,.1);right:-320px;top:-240px}
.kopf{display:flex;align-items:center;gap:16px;z-index:3;position:relative}
.kopf img{width:54px;height:54px}
.kopf span{font-weight:700;letter-spacing:.3em;font-size:25px;color:#fbbf24}
.mitte{flex:1 1 0;min-height:0;display:flex;flex-direction:column;justify-content:center;
  gap:30px;position:relative;z-index:2}
.titel{font-size:66px;line-height:1.08;font-weight:700;letter-spacing:-.02em;color:#fff8e7}
.unter{font-size:28px;font-weight:700;letter-spacing:.16em;text-transform:uppercase;color:#fbbf24}
.buehne{position:relative;width:100%;height:820px;border-radius:28px;overflow:hidden;
  border:1px solid rgba(251,191,36,.22);background:#141414}
.buehne img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover}
.text{font-size:34px;line-height:1.36;color:#e7e5e4}
.quelle{font-size:24px;color:#a8a29e;border-left:3px solid rgba(251,191,36,.45);padding-left:18px}
.quelle b{display:block;font-size:20px;letter-spacing:.16em;text-transform:uppercase;color:#fbbf24}
.hinweis{font-size:22px;color:#a8a29e;line-height:1.4}
.fuss{display:flex;justify-content:space-between;align-items:baseline;font-size:25px;
  color:#78716c;position:relative;z-index:3}
.fuss .store{color:#fbbf24;font-weight:700}
.balken{position:absolute;left:0;top:0;height:6px;background:#fbbf24;z-index:5}
</style>
<div class="balken" id="balken"></div>
<div class="ring"></div>
<div class="kopf"><img src="data:image/svg+xml;base64,${logo}"><span>FULLREP</span></div>
<div class="mitte" id="mitte"></div>
<div class="fuss"><span>${esc(T.fuss)}</span><span class="store">${esc(storeSatz(LANG))}</span></div>
<script>
const Z = ${zustand};
const el = document.getElementById('mitte');
const esc = (s) => String(s ?? '').replace(/[&<>]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;'}[c]));

// Aufbau EINMAL — setFrame aendert nur noch Zahlen, nie die Struktur.
el.innerHTML = Z.fotos
  ? '<div class="unter">' + esc(Z.unter) + '</div>'
    + '<div class="titel">' + esc(Z.titel) + '</div>'
    + '<div class="buehne"><img id="f0" src="' + Z.fotos[0] + '"><img id="f1" src="' + Z.fotos[1] + '"></div>'
    + '<div class="text">' + esc(Z.beschreibung) + '</div>'
  : '<div class="unter">' + esc(Z.unter) + '</div>'
    + '<div class="titel">' + esc(Z.beschreibung) + '</div>'
    + '<div class="quelle"><b>' + esc(Z.T.quelle) + '</b>' + esc(Z.quelle) + '</div>'
    + '<div class="hinweis">' + esc(Z.hinweis) + '</div>';

const f0 = document.getElementById('f0');
const f1 = document.getElementById('f1');
const balken = document.getElementById('balken');
const mitte = document.getElementById('mitte');
const glatt = (t) => t * t * (3 - 2 * t);   // weiche Ein-/Ausblende ohne CSS

window.setFrame = (n) => {
  balken.style.width = (100 * n / Z.GESAMT) + '%';

  // Auftakt: der ganze Block blendet auf.
  const auf = Math.min(1, n / (Z.AUFTAKT || 1));
  mitte.style.opacity = glatt(auf);
  mitte.style.transform = 'translateY(' + ((1 - glatt(auf)) * 24).toFixed(2) + 'px)';

  if (!f1) return;
  // Nach dem Auftakt laeuft die Wiederholung: Endposition blendet ein und
  // wieder aus. Rein aus dem Frame-Index gerechnet, damit jeder Lauf gleich
  // aussieht.
  const seit = n - Z.AUFTAKT;
  if (seit < 0) { f1.style.opacity = 0; return; }
  const p = (seit % Z.ZYKLUS) / Z.ZYKLUS;
  const anteil = p < 0.5 ? glatt(p / 0.5) : glatt((1 - p) / 0.5);
  f1.style.opacity = anteil.toFixed(3);
};

window.setFrame(0);
document.fonts.ready.then(() => { window.__bereit = true; });
</script>`;
}

// --- Rendern ----------------------------------------------------------------
mkdirSync(OUT, { recursive: true });
const basis = NAME ?? `fullrep-${FORMAT}-${LANG}-s${SEED}`;
const ziel = join(OUT, `${basis}.mp4`);

const ff = spawn(FFMPEG, [
  '-y', '-f', 'image2pipe', '-framerate', String(FPS), '-i', '-',
  '-c:v', 'libx264', '-profile:v', 'high', '-preset', 'medium', '-crf', '20',
  '-pix_fmt', 'yuv420p', '-r', String(FPS),
  '-vf', 'scale=trunc(iw/2)*2:trunc(ih/2)*2', '-movflags', '+faststart', '-an', ziel,
], { stdio: ['pipe', 'ignore', 'pipe'] });
let ffFehler = '';
ff.stderr.on('data', (d) => { ffFehler += d.toString(); });
ff.stdin.on('error', () => {});
const fertig = new Promise((res, rej) => ff.on('close', (c) =>
  c === 0 ? res() : rej(new Error(`ffmpeg ${c}\n${ffFehler.slice(-600)}`))));

const browser = await chromium.launch(
  process.env.CHROMIUM_PFAD ? { executablePath: process.env.CHROMIUM_PFAD } : {},
);
const seite = await browser.newPage({ viewport: { width: B, height: H }, deviceScaleFactor: 1 });
await seite.setContent(baueHtml(), { waitUntil: 'load' });
await seite.waitForFunction('window.__bereit === true', null, { timeout: 15000 });

process.stdout.write(`  ${GESAMT} Frames …`);
for (let n = 0; n < GESAMT; n++) {
  await seite.evaluate((i) => window.setFrame(i), n);
  const bild = await seite.screenshot({ type: 'jpeg', quality: 94 });
  if (!ff.stdin.write(bild)) await new Promise((r) => ff.stdin.once('drain', r));
}
ff.stdin.end();
await browser.close();
await fertig;

writeFileSync(join(OUT, `${basis}.txt`),
`# ${basis}.mp4

## Caption (kopieren)

${daten.titel}${daten.beschreibung ? `\n\n${daten.beschreibung}` : ''}${
  daten.quelle ? `\n\n${T.quelle}: ${daten.quelle}` : ''}${
  daten.hinweis ? `\n\n${daten.hinweis}` : ''}

## Hashtags

${(daten.art === 'uebung'
  ? ['fullrep', 'fitness', 'gym', 'uebung', 'training', 'muskelaufbau', 'krafttraining', 'workout']
  : ['fullrep', 'fitness', 'wissen', 'evidenzbasiert', 'training', 'studie', 'gym', 'ernaehrung'])
  .map((h) => `#${h}`).join(' ')}

## Beim Hochladen

- Das Video ist STUMM. Ton legst du selbst darueber.
- Kein Store-Link in der Caption, nur „Link in der Bio".
- ⚠ iOS ist noch nicht freigegeben: nirgends den App Store nennen.
  Im Video steht „${storeSatz(LANG)}".
${daten.hinweis ? '- Haftungshinweis steht im Video UND in der Caption. Nicht kuerzen.\n' : ''}
## Inhalt

- Format: ${FORMAT} (${daten.art})
- Inhaltsschluessel: ${daten.schluessel}
- Laenge ${(GESAMT / FPS).toFixed(1)} s, Sprache ${LANG}
${daten.quelle ? `- Quelle: ${daten.quelle}` : ''}
`);

console.log(`\n✓ ${ziel}`);
console.log(`  ${B}×${H} · ${(GESAMT / FPS).toFixed(1)} s · ${daten.art} · ${daten.schluessel}`);
