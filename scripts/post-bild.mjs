#!/usr/bin/env node
// Bildposts fuer FullRep — 1080×1350 (Feed).
//
//   CHROMIUM_PFAD=/opt/pw-browsers/chromium node scripts/post-bild.mjs \
//       --format wissens-karte --seed 3 --lang de
//   … --format uebung-karte   --seed 7
//   … --format rezept-karte   --seed 2
//   … --format naehrstoff     --seed 5
//
// Muster: scripts/store-screenshots.mjs — Playwright, ohne Netz, ohne
// Zugangsdaten. Kostet nichts.
//
// ⚠ ZWEI REGELN:
//
// 1. Die Quelle steht SICHTBAR im Bild, nie eingeklappt. Apple hat die App am
//    29.07.2026 unter 1.4.1 abgelehnt, weil medizinische Inhalte ohne Belege
//    dastanden — und eine belegte Aussage ist ohnehin der Unterschied zu
//    jedem anderen Fitnesskanal.
// 2. Gezeigt werden nur Store-Badges fuer Plattformen, die es wirklich gibt.
//    Die Wahrheit steht in STORES unten, nie im Text.
//
// Der aerztliche Haftungshinweis steht hier bewusst NICHT MEHR (Josefs
// Entscheidung). Er ist eine Auflage fuer den STORE-EINTRAG — dort hat Google
// am 30.07.2026 nachgesehen —, nicht fuer Social-Media-Beitraege. In der App
// und im Play-Text bleibt er unveraendert.
//
// Keine Dosierungen, keine Diagnosen, keine Therapieempfehlungen — die
// Inhalte kommen unveraendert aus src/data/, wo genau das schon gilt.

import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import { chromium } from 'playwright';

import {
  WURZEL, uebungenMitFotos, uebungTexte, wissensthemen, quelleKurz, rezepteMitMakros,
  WASSERZEICHEN_CSS, WASSERZEICHEN_HTML, trainingsFoto, FOTO_BEREICHE,
} from './social-daten.mjs';

const arg = (n, s) => { const i = process.argv.indexOf(`--${n}`); return i === -1 ? s : process.argv[i + 1]; };
const FORMAT = arg('format', 'wissens-karte');
const LANG = arg('lang', 'de');
const SEED = Number(arg('seed', 1));
const NAME = arg('name', null);
const OUT = join(WURZEL, arg('out', 'out/social'));
// Hintergrundfoto. --ki sagt: darauf sind KI-erzeugte Menschen — dann traegt
// der Post das AI-Wasserzeichen. Ohne --ki bleibt es weg; ein echtes Foto
// faelschlich zu kennzeichnen waere genauso falsch wie ein KI-Bild nicht.
const HINTERGRUND = arg('hintergrund', null);
const KI_MENSCHEN = process.argv.includes('--ki');

const B = 1080, H = 1350;

// ⚠ Store-Verfuegbarkeit steht HIER, nicht im Text. Beide Plattformen sind
// seit 29.08.2026 live — steht eine spaeter wieder nicht bereit, wird hier
// umgeschaltet und der zugehoerige Badge verschwindet von selbst.
const STORES = { ios: true, android: true };

/** Badges statt Satz. Nur fuer Plattformen, die es wirklich gibt. */
function storeBadges() {
  const dateien = [];
  if (STORES.ios) dateien.push('appstore-en.png');
  if (STORES.android) dateien.push('googleplay-en.png');
  return dateien
    .map((f) => join(WURZEL, 'scripts', 'badges', f))
    .filter((f) => existsSync(f))
    .map((f) => `data:image/png;base64,${b64(f)}`);
}

function mulberry32(s) {
  return function () {
    s |= 0; s = (s + 0x6d2b79f5) | 0;
    let t = Math.imul(s ^ (s >>> 15), 1 | s);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const T = {
  de: { wissen: 'Wusstest du?', uebung: 'Übung', rezept: 'Rezept', quelle: 'Quelle',
        start: 'Start', ende: 'Ende', pro: 'pro Portion', fuss: 'FullRep · Training & Ernährung' },
  en: { wissen: 'Did you know?', uebung: 'Exercise', rezept: 'Recipe', quelle: 'Source',
        start: 'Start', ende: 'End', pro: 'per serving', fuss: 'FullRep · Workout & Nutrition' },
}[LANG];

const esc = (s) => String(s ?? '').replace(/[&<>]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' }[c]));
const b64 = (p) => readFileSync(p).toString('base64');

// --- Inhalt waehlen ---------------------------------------------------------
function inhalt(format, w) {
  const zieh = (m) => m[Math.floor(w() * m.length)];

  if (format === 'uebung-karte') {
    const u = zieh(uebungenMitFotos());
    const t = uebungTexte(u, LANG);
    return {
      art: 'uebung', schluessel: u.id,
      marke: t.muskel, haken: t.name, text: t.beschreibung,
      fotos: u.fotos, zusatz: t.geraet,
      // Uebungsbeschreibungen sind Technik, keine Gesundheitsaussage —
      // der Hinweis waere hier Ballast und wird nicht erzwungen.
      quelle: null,
    };
  }

  if (format === 'rezept-karte') {
    const r = zieh(rezepteMitMakros());
    const n = r.nutrition;
    return {
      art: 'rezept', schluessel: r.id,
      marke: T.rezept, haken: LANG === 'de' ? r.nameDE : r.nameEN,
      text: LANG === 'de' ? r.descDE : r.descEN,
      makros: [
        [`${n.calories}`, 'kcal'], [`${n.protein} g`, LANG === 'de' ? 'Eiweiß' : 'protein'],
        [`${n.carbs} g`, LANG === 'de' ? 'Kohlenhydrate' : 'carbs'], [`${n.fat} g`, LANG === 'de' ? 'Fett' : 'fat'],
      ],
      quelle: null,
    };
  }

  // wissens-karte und naehrstoff teilen sich das Layout; naehrstoff zieht
  // ausschliesslich aus dem Ernaehrungsbereich.
  const themen = wissensthemen().filter(
    (t) => (format === 'naehrstoff' ? t.bereich === 'nutrition' : true),
  );
  const th = zieh(themen);
  const quick = (th.quick[LANG]?.length ? th.quick[LANG] : th.quick.de) ?? [];
  const q = zieh(quick.length ? quick : [{ label: '', text: th.zusammenfassung[LANG] }]);
  // Die AUSSAGE ist die Schlagzeile, nicht das Label. Mit „Funktion" gross und
  // dem Inhalt klein darunter las sich die Karte wie ein Inhaltsverzeichnis.
  return {
    art: 'wissen', schluessel: th.id,
    marke: th.titel[LANG] ?? th.titel.de,
    augenbraue: q.label || T.wissen,
    haken: q.text, text: null,
    quelle: quelleKurz(th.quellen[0]),
    // Trainingsthemen bekommen ein echtes Uebungsfoto in den Hintergrund —
    // sonst sieht der Kanal aus wie eine Folge schwarzer Textkacheln.
    // Ernaehrung, Supplemente und Blutwerte bleiben typografisch: dafuer
    // gibt es im Repo kein passendes Bild, und ein beliebiges waere schlechter
    // als keines.
    autoFoto: FOTO_BEREICHE.has(th.bereich) ? trainingsFoto(w) : null,
  };
}

// --- Karte ------------------------------------------------------------------
function baueHtml(o) {
  const font400 = b64(join(WURZEL, 'node_modules/@fontsource/inter/files/inter-latin-400-normal.woff2'));
  const font700 = b64(join(WURZEL, 'node_modules/@fontsource/inter/files/inter-latin-700-normal.woff2'));
  const logo = b64(join(WURZEL, 'public/favicon.svg'));

  const fotos = o.fotos
    ? `<div class="fotos">${o.fotos.map((f, i) => `
        <figure><img src="data:image/jpeg;base64,${b64(f)}">
        <figcaption>${i === 0 ? T.start : T.ende}</figcaption></figure>`).join('')}</div>`
    : '';

  const makros = o.makros
    ? `<div class="makros">${o.makros.map(([v, l]) =>
        `<div><b>${esc(v)}</b><span>${esc(l)}</span></div>`).join('')}</div>
       <div class="proPortion">${T.pro}</div>`
    : '';

  const quelle = o.quelle
    ? `<div class="quelle"><span>${T.quelle}</span>${esc(o.quelle)}</div>` : '';



  const hgPfad = HINTERGRUND ?? o.autoFoto ?? null;
  const hg = hgPfad && existsSync(hgPfad)
    ? `<div class="hgFoto" style="background-image:url(data:image/jpeg;base64,${b64(hgPfad)})"></div>
       <div class="hgSchleier"></div>`
    : '';
  const kiMarke = KI_MENSCHEN ? (WASSERZEICHEN_HTML[LANG] ?? WASSERZEICHEN_HTML.de) : '';

  return `<!doctype html><meta charset="utf-8"><body class="${KI_MENSCHEN ? 'mitKi' : ''}"><style>
@font-face{font-family:'Inter';font-weight:400;src:url(data:font/woff2;base64,${font400}) format('woff2')}
@font-face{font-family:'Inter';font-weight:700;src:url(data:font/woff2;base64,${font700}) format('woff2')}
*{margin:0;padding:0;box-sizing:border-box}
html,body{width:${B}px;height:${H}px;overflow:hidden}
body{font-family:'Inter',system-ui,sans-serif;color:#fef3c7;
  /* Dunkelmodus ist bei FullRep der Standard — Gold auf Fast-Schwarz. */
  background:radial-gradient(120% 80% at 15% 0%,#1a1a1a 0%,#0a0a0a 62%);
  display:flex;flex-direction:column;padding:64px;position:relative}
/* Foto ganz hinten, darueber ein Schleier — sonst ist der Text ueber einem
   hellen Bild nicht mehr lesbar. Der Verlauf ist unten dichter, weil dort
   Quelle und Badges stehen. */
.hgFoto{position:absolute;inset:0;background-size:cover;background-position:center;
  filter:saturate(.86)}
.hgSchleier{position:absolute;inset:0;
  background:linear-gradient(180deg,rgba(10,10,10,.80) 0%,rgba(10,10,10,.62) 38%,
    rgba(10,10,10,.86) 78%,rgba(10,10,10,.94) 100%)}
${WASSERZEICHEN_CSS}
.ring{position:absolute;width:760px;height:760px;border-radius:50%;
  border:1px solid rgba(251,191,36,.12);right:-260px;top:-200px}
.ring2{position:absolute;width:520px;height:520px;border-radius:50%;
  border:1px solid rgba(251,191,36,.08);left:-200px;bottom:-140px}
.kopf,.inhalt,.fuss{position:relative;z-index:2}
.kopf{display:flex;align-items:center;gap:16px}
.kopf img{width:50px;height:50px}
.kopf span{font-weight:700;letter-spacing:.3em;font-size:23px;color:#fbbf24}
.inhalt{flex:1 1 0;min-height:0;display:flex;flex-direction:column;justify-content:center;gap:24px}
.marke{align-self:flex-start;border:1px solid rgba(251,191,36,.42);border-radius:999px;
  padding:9px 22px;font-size:24px;font-weight:700;color:#fbbf24;letter-spacing:.02em}
h1{font-size:58px;line-height:1.1;font-weight:700;letter-spacing:-.02em;color:#fff8e7}
h1.aussage{font-size:50px;line-height:1.24;letter-spacing:-.01em}
.augenbraue{font-size:23px;font-weight:700;letter-spacing:.18em;text-transform:uppercase;color:#fbbf24;margin-bottom:-12px}
p.text{font-size:34px;line-height:1.38;color:#e7e5e4;font-weight:400}
.fotos{display:grid;grid-template-columns:1fr 1fr;gap:20px;min-height:0}
.fotos figure{min-height:0;display:flex;flex-direction:column;gap:10px}
.fotos img{width:100%;height:340px;object-fit:cover;border-radius:20px;
  border:1px solid rgba(251,191,36,.22)}
.fotos figcaption{font-size:22px;font-weight:700;color:#fbbf24;letter-spacing:.16em;text-transform:uppercase}
.makros{display:grid;grid-template-columns:repeat(4,1fr);gap:14px}
.makros div{background:rgba(251,191,36,.09);border:1px solid rgba(251,191,36,.2);
  border-radius:18px;padding:20px 12px;text-align:center}
.makros b{display:block;font-size:38px;color:#fbbf24}
.makros span{font-size:20px;color:#d6d3d1}
.proPortion{font-size:22px;color:#a8a29e;margin-top:-10px}
.quelle{font-size:23px;color:#a8a29e;line-height:1.4;border-left:3px solid rgba(251,191,36,.45);
  padding-left:18px}
.quelle span{display:block;font-size:19px;letter-spacing:.16em;text-transform:uppercase;color:#fbbf24;font-weight:700}
.hinweis{font-size:21px;line-height:1.4;color:#a8a29e}
.fuss{display:flex;justify-content:space-between;align-items:center;gap:20px;font-size:23px;color:#78716c}
/* Traegt der Post ein KI-Wasserzeichen, rueckt der Fuss hoch — sonst stossen
   Store-Badge und Plaettchen in der Ecke aneinander. */
body.mitKi .fuss{margin-bottom:40px}
/* Badges nie verzerren — Apple und Google geben die Form vor. Feste Hoehe,
   Breite folgt dem 3:1-Verhaeltnis von selbst. */
.badges{display:flex;gap:14px;align-items:center;flex:0 0 auto}
.badges img{height:58px;width:auto;display:block}
</style>
${hg}<div class="ring"></div><div class="ring2"></div>
<div class="kopf"><img src="data:image/svg+xml;base64,${logo}"><span>FULLREP</span></div>
<div class="inhalt">
  <div class="marke">${esc(o.marke)}</div>
  ${o.augenbraue ? `<div class="augenbraue">${esc(o.augenbraue)}</div>` : ''}
  <h1${o.art === 'wissen' ? ' class="aussage"' : ''}>${esc(o.haken)}</h1>
  ${fotos}
  ${o.text ? `<p class="text">${esc(o.text)}</p>` : ''}
  ${makros}
  ${quelle}
</div>
<div class="fuss"><span>${T.fuss}</span>
  <span class="badges">${storeBadges().map((b) =>
    `<img src="${b}" alt="">`).join('')}</span></div>
${kiMarke}`;
}

// --- Lauf -------------------------------------------------------------------
const o = inhalt(FORMAT, mulberry32(SEED));

// Selbstpruefung vor dem Rendern. Die Leitplanke im Orchestrator prueft das
// ebenfalls — ein Generator, der einen ungueltigen Post erzeugt, soll aber
// gar nicht erst eine Datei hinterlassen.
if (o.art === 'wissen' && !o.quelle) {
  console.error(`✗ Belegte Aussage ohne Quelle (${o.schluessel}). Apple 1.4.1.`);
  process.exit(1);
}

mkdirSync(OUT, { recursive: true });
const basis = NAME ?? `fullrep-${FORMAT}-${LANG}-s${SEED}`;
const ziel = join(OUT, `${basis}.jpg`);

const browser = await chromium.launch(
  process.env.CHROMIUM_PFAD ? { executablePath: process.env.CHROMIUM_PFAD } : {},
);
const seite = await browser.newPage({ viewport: { width: B, height: H }, deviceScaleFactor: 1 });
await seite.setContent(baueHtml(o), { waitUntil: 'load' });
await seite.evaluate(() => document.fonts.ready);
await seite.screenshot({ path: ziel, type: 'jpeg', quality: 92 });
await browser.close();

const tags = {
  uebung: ['fullrep', 'fitness', 'gym', 'training', 'uebung', 'muskelaufbau', 'krafttraining', 'workout'],
  rezept: ['fullrep', 'fitness', 'meal', 'protein', 'rezept', 'ernaehrung', 'mealprep', 'highprotein'],
  wissen: ['fullrep', 'fitness', 'wissen', 'training', 'studie', 'evidenzbasiert', 'gym', 'muskelaufbau'],
}[o.art];

writeFileSync(join(OUT, `${basis}.txt`),
`# ${basis}.jpg

## Caption (kopieren)

${o.haken}${o.text ? `\n\n${o.text}` : ''}${o.quelle ? `\n\n${T.quelle}: ${o.quelle}` : ''}

## Hashtags

${tags.map((h) => `#${h}`).join(' ')}

## Beim Hochladen

- Kein Store-Link in der Caption, nur „Link in der Bio".
- Im Bild stehen die Download-Badges fuer App Store und Google Play.

## Inhalt

- Medienherkunft: ${KI_MENSCHEN ? 'ki-menschen (Wasserzeichen gesetzt)'
  : (HINTERGRUND ?? o.autoFoto) ? 'echtes Foto (free-exercise-db, Public Domain)'
  : 'nur Typografie'}
- Format: ${FORMAT} (${o.art})
- Inhaltsschluessel: ${o.schluessel}
- Sprache: ${LANG}
${o.quelle ? `- Quelle: ${o.quelle}` : ''}
`);

console.log(`✓ ${ziel}`);
console.log(`  ${B}×${H} · ${o.art} · ${o.schluessel} · ${LANG}`);
