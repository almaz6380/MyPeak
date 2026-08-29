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
// ⚠ DREI REGELN, DIE AUS STORE-ABLEHNUNGEN STAMMEN:
//
// 1. Jede Gesundheitsaussage traegt den Hinweis mit ALLEN DREI Woertern
//    Rat, Diagnose, Behandlung. Googles Pruefung sucht danach — daran ist die
//    App am 30.07.2026 gescheitert. Der Satz steht in social-daten.mjs und
//    wird hier nie umformuliert.
// 2. Die Quelle steht SICHTBAR im Bild, nie eingeklappt. Apple hat die App am
//    29.07.2026 unter 1.4.1 abgelehnt, weil medizinische Inhalte ohne Belege
//    dastanden.
// 3. Der CTA nennt NUR Google Play, solange iOS nicht freigegeben ist. Der
//    Wert kommt aus STORES unten, nicht aus dem Satz.
//
// Keine Dosierungen, keine Diagnosen, keine Therapieempfehlungen — die
// Inhalte kommen unveraendert aus src/data/, wo genau das schon gilt.

import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';
import { chromium } from 'playwright';

import {
  WURZEL, HINWEIS, hinweisVollstaendig, uebungenMitFotos, uebungTexte,
  wissensthemen, quelleKurz, rezepteMitMakros,
} from './social-daten.mjs';

const arg = (n, s) => { const i = process.argv.indexOf(`--${n}`); return i === -1 ? s : process.argv[i + 1]; };
const FORMAT = arg('format', 'wissens-karte');
const LANG = arg('lang', 'de');
const SEED = Number(arg('seed', 1));
const NAME = arg('name', null);
const OUT = join(WURZEL, arg('out', 'out/social'));

const B = 1080, H = 1350;

// ⚠ Store-Verfuegbarkeit steht HIER, nicht im Text. iOS wartet Stand 15.08.2026
// noch auf die Freigabe; bis dahin darf kein Post den App Store nennen.
const STORES = { ios: false, android: true };
const storeSatz = (lang) => {
  const { ios, android } = STORES;
  if (lang === 'de') {
    if (ios && android) return 'Gratis im App Store und bei Google Play';
    return android ? 'Gratis bei Google Play' : 'Im Browser nutzen';
  }
  if (ios && android) return 'Free on the App Store and Google Play';
  return android ? 'Free on Google Play' : 'Use it in your browser';
};

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
      hinweisNoetig: false, quelle: null,
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
      hinweisNoetig: false, quelle: null,
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
    hinweisNoetig: true, quelle: quelleKurz(th.quellen[0]),
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

  const hinweis = o.hinweisNoetig
    ? `<div class="hinweis">${esc(HINWEIS[LANG] ?? HINWEIS.de)}</div>` : '';

  return `<!doctype html><meta charset="utf-8"><style>
@font-face{font-family:'Inter';font-weight:400;src:url(data:font/woff2;base64,${font400}) format('woff2')}
@font-face{font-family:'Inter';font-weight:700;src:url(data:font/woff2;base64,${font700}) format('woff2')}
*{margin:0;padding:0;box-sizing:border-box}
html,body{width:${B}px;height:${H}px;overflow:hidden}
body{font-family:'Inter',system-ui,sans-serif;color:#fef3c7;
  /* Dunkelmodus ist bei FullRep der Standard — Gold auf Fast-Schwarz. */
  background:radial-gradient(120% 80% at 15% 0%,#1a1a1a 0%,#0a0a0a 62%);
  display:flex;flex-direction:column;padding:64px;position:relative}
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
.fuss{display:flex;justify-content:space-between;align-items:baseline;font-size:23px;color:#78716c}
.fuss .store{color:#fbbf24;font-weight:700}
</style>
<div class="ring"></div><div class="ring2"></div>
<div class="kopf"><img src="data:image/svg+xml;base64,${logo}"><span>FULLREP</span></div>
<div class="inhalt">
  <div class="marke">${esc(o.marke)}</div>
  ${o.augenbraue ? `<div class="augenbraue">${esc(o.augenbraue)}</div>` : ''}
  <h1${o.art === 'wissen' ? ' class="aussage"' : ''}>${esc(o.haken)}</h1>
  ${fotos}
  ${o.text ? `<p class="text">${esc(o.text)}</p>` : ''}
  ${makros}
  ${quelle}
  ${hinweis}
</div>
<div class="fuss"><span>${T.fuss}</span><span class="store">${esc(storeSatz(LANG))}</span></div>`;
}

// --- Lauf -------------------------------------------------------------------
const o = inhalt(FORMAT, mulberry32(SEED));

// Selbstpruefung vor dem Rendern. Die Leitplanke im Orchestrator prueft das
// ebenfalls — ein Generator, der einen ungueltigen Post erzeugt, soll aber
// gar nicht erst eine Datei hinterlassen.
if (o.hinweisNoetig && !hinweisVollstaendig(HINWEIS[LANG] ?? HINWEIS.de, LANG)) {
  console.error('✗ Haftungshinweis unvollstaendig.');
  process.exit(1);
}
if (o.hinweisNoetig && !o.quelle) {
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

${o.haken}${o.text ? `\n\n${o.text}` : ''}${o.quelle ? `\n\n${T.quelle}: ${o.quelle}` : ''}${
  o.hinweisNoetig ? `\n\n${HINWEIS[LANG] ?? HINWEIS.de}` : ''}

## Hashtags

${tags.map((h) => `#${h}`).join(' ')}

## Beim Hochladen

- Kein Store-Link in der Caption, nur „Link in der Bio".
- ⚠ iOS ist noch nicht freigegeben: nirgends den App Store nennen.
  Im Bild steht „${storeSatz(LANG)}".
${o.hinweisNoetig ? '- Der Haftungshinweis steht im Bild UND in der Caption. Nicht kuerzen —\n'
  + '  Googles Pruefung sucht nach Rat, Diagnose und Behandlung.\n' : ''}
## Inhalt

- Format: ${FORMAT} (${o.art})
- Inhaltsschluessel: ${o.schluessel}
- Sprache: ${LANG}
${o.quelle ? `- Quelle: ${o.quelle}` : ''}
`);

console.log(`✓ ${ziel}`);
console.log(`  ${B}×${H} · ${o.art} · ${o.schluessel} · ${LANG}`);
