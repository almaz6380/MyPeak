#!/usr/bin/env node
// Bildposts fuer FullRep — 1080×1350 (Feed).
//
//   CHROMIUM_PFAD=/opt/pw-browsers/chromium node scripts/post-bild.mjs \
//       --format wissens-karte --stil poster --seed 3 --lang de
//   … --format rezept-karte --stil zahl
//   … --hintergrund <foto.jpg>   eigenes Hintergrundfoto
//   … --ki                       KI-erzeugte Menschen im Bild
//
// Muster: scripts/store-screenshots.mjs — Playwright, ohne Netz, ohne
// Zugangsdaten. Kostet nichts.
//
// DREI STILE, EIN RAHMEN. Kopf, Fuss mit den Store-Badges, das KI-Wasserzeichen
// und die Foto-Logik sind bei allen dreien gleich; nur die Mitte unterscheidet
// sich. Sonst zerfaellt die Marke in drei Marken.
//
//   poster   Foto randlos, Text im unteren Drittel, Schlagzeile in Anton-
//            Versalien. Am lautesten im Feed.
//   premium  Ruhig und dunkel, Gold an genau einer Stelle. Fuer Wissen.
//   zahl     Eine grosse Zahl traegt das Bild. Greift nur, wo eine da IST —
//            sonst faellt der Stil auf `premium` zurueck, statt eine zu erfinden.
//
// ⚠ ZWEI REGELN:
//
// 1. Gezeigt werden nur Store-Badges fuer Plattformen, die es wirklich gibt.
//    Die Wahrheit steht in STORES unten, nie im Text.
// 2. KI-erzeugte MENSCHEN tragen unten rechts das AI-Wasserzeichen (--ki).
//    Echte Fotos NICHT — das waere genauso falsch wie ein ungekennzeichnetes
//    KI-Bild.
//
// Der aerztliche Haftungshinweis UND die Quellenangabe stehen hier bewusst
// nicht mehr (Josefs Entscheidungen vom 29.08.2026). Beide sind Auflagen fuer
// den STORE-EINTRAG — dort hat Google am 30.07. und Apple am 29.07.2026
// nachgesehen —, nicht fuer Social-Media-Beitraege. In der App
// (MedicalDisclaimer.jsx, References.jsx), im Play-Text und unter
// /legal/health bleiben sie UNVERAENDERT. Wer sie dort entfernt, holt beide
// Ablehnungen zurueck.
//
// Keine Dosierungen, keine Diagnosen, keine Therapieempfehlungen — die
// Inhalte kommen unveraendert aus src/data/, wo genau das schon gilt.

import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import { chromium } from 'playwright';

import {
  WURZEL, uebungenMitFotos, uebungTexte, wissensthemen, rezepteMitMakros,
  WASSERZEICHEN_CSS, WASSERZEICHEN_HTML, trainingsFoto, FOTO_BEREICHE,
} from './social-daten.mjs';

const arg = (n, s) => { const i = process.argv.indexOf(`--${n}`); return i === -1 ? s : process.argv[i + 1]; };
const FORMAT = arg('format', 'wissens-karte');
const STIL = arg('stil', 'premium');
const LANG = arg('lang', 'de');
const SEED = Number(arg('seed', 1));
const NAME = arg('name', null);
const OUT = join(WURZEL, arg('out', 'out/social'));
const HINTERGRUND = arg('hintergrund', null);
const KI_MENSCHEN = process.argv.includes('--ki');

const B = 1080, H = 1350;

if (!['poster', 'premium', 'zahl'].includes(STIL)) {
  console.error(`✗ unbekannter Stil: ${STIL}\n  Bekannt: poster, premium, zahl`);
  process.exit(1);
}

// ⚠ Store-Verfuegbarkeit steht HIER, nicht im Text. Beide Plattformen sind
// seit 29.08.2026 live — steht eine spaeter wieder nicht bereit, wird hier
// umgeschaltet und der zugehoerige Badge verschwindet von selbst.
const STORES = { ios: true, android: true };

function mulberry32(s) {
  return function () {
    s |= 0; s = (s + 0x6d2b79f5) | 0;
    let t = Math.imul(s ^ (s >>> 15), 1 | s);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const T = {
  de: { wissen: 'Wusstest du?', uebung: 'Übung', rezept: 'Rezept',
        start: 'Start', ende: 'Ende', pro: 'pro Portion', fuss: 'FullRep · Training & Ernährung' },
  en: { wissen: 'Did you know?', uebung: 'Exercise', rezept: 'Recipe',
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
      // Fuer den Stil `zahl`: Eiweiss ist die Zahl, die bei einem Fitnessrezept
      // wirklich jemanden interessiert.
      zahl: { wert: String(n.protein), einheit: 'g',
              label: LANG === 'de' ? `Eiweiß ${T.pro}` : `protein ${T.pro}` },
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

  // Fuer den Stil `zahl`: eine Zahl im Text suchen, KEINE erfinden. Findet sich
  // keine, faellt der Stil weiter unten auf `premium` zurueck.
  const treffer = (q.text ?? '').match(/(\d+(?:[.,]\d+)?)\s*(%|g\/kg|g|kcal|mg|Wochen|weeks|Sätze|sets)?/);

  // Die AUSSAGE ist die Schlagzeile, nicht das Label. Mit „Funktion" gross und
  // dem Inhalt klein darunter las sich die Karte wie ein Inhaltsverzeichnis.
  return {
    art: 'wissen', schluessel: th.id,
    marke: th.titel[LANG] ?? th.titel.de,
    augenbraue: q.label || T.wissen,
    haken: q.text, text: null,
    zahl: treffer ? { wert: treffer[1], einheit: treffer[2] ?? '', label: q.label || th.titel[LANG] } : null,
    // Trainings- und Supplementthemen bekommen ein echtes Uebungsfoto in den
    // Hintergrund — sonst sieht der Kanal aus wie eine Folge schwarzer
    // Textkacheln. Ernaehrung und Blutwerte bleiben typografisch: dafuer gibt
    // es im Repo kein passendes Bild, und ein beliebiges waere schlechter
    // als keines.
    autoFoto: FOTO_BEREICHE.has(th.bereich) ? trainingsFoto(w) : null,
  };
}

// --- Bausteine, die alle Stile teilen ---------------------------------------
function badgesHtml() {
  const dateien = [];
  if (STORES.ios) dateien.push('appstore-en.png');
  if (STORES.android) dateien.push('googleplay-en.png');
  return dateien
    .map((f) => join(WURZEL, 'scripts', 'badges', f))
    .filter((f) => existsSync(f))
    .map((f) => `<img src="data:image/png;base64,${b64(f)}" alt="">`)
    .join('');
}

// Filmkorn als eingebettetes SVG. Ein echtes Rauschbild waere groesser und
// muesste gekachelt werden; feTurbulence rechnet der Browser selbst.
const KORN = Buffer.from(
  `<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200">
     <filter id="k"><feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="3"/>
     <feColorMatrix type="saturate" values="0"/></filter>
     <rect width="200" height="200" filter="url(#k)" opacity="0.5"/></svg>`,
).toString('base64');

// --- Die Karte --------------------------------------------------------------
function baueHtml(o, stil) {
  const inter400 = b64(join(WURZEL, 'node_modules/@fontsource/inter/files/inter-latin-400-normal.woff2'));
  const inter700 = b64(join(WURZEL, 'node_modules/@fontsource/inter/files/inter-latin-700-normal.woff2'));
  const antonPfad = join(WURZEL, 'scripts', 'schriften', 'anton.woff2');
  const anton = existsSync(antonPfad) ? b64(antonPfad) : null;
  const logo = b64(join(WURZEL, 'public/favicon.svg'));

  const hgPfad = HINTERGRUND ?? o.autoFoto ?? (o.fotos?.[1] ?? null);
  const hatFoto = hgPfad && existsSync(hgPfad);
  const kiMarke = KI_MENSCHEN ? (WASSERZEICHEN_HTML[LANG] ?? WASSERZEICHEN_HTML.de) : '';

  // --- Mitte je Stil --------------------------------------------------------
  let mitte = '';
  if (stil === 'poster') {
    // ⚠ Ein Plakat traegt EIN kurzes Wort gross, nicht einen ganzen Satz.
    // Beim ersten Versuch stand die komplette Aussage in 104-px-Versalien und
    // verdeckte das halbe Foto. Deshalb: kurzer Name als Schlagzeile, die
    // Aussage darunter im Fliesstext.
    const kurz = o.art === 'wissen' ? o.marke : o.haken;
    const lang = o.art === 'wissen' ? o.haken : o.text;
    const auge = o.art === 'wissen' ? (o.augenbraue ?? '') : o.marke;
    // Schriftgroesse folgt der Laenge — sonst bricht ein langer Rezeptname um
    // und schiebt den Fuss aus dem Bild.
    const px = kurz.length > 26 ? 68 : kurz.length > 16 ? 86 : 116;
    mitte = `
      <div class="posterText">
        ${auge ? `<div class="augenbraue">${esc(auge)}</div>` : ''}
        <h1 class="anton" style="font-size:${px}px">${esc(kurz)}</h1>
        <div class="kante"></div>
        ${lang ? `<p class="text">${esc(lang)}</p>` : ''}
      </div>`;
  } else if (stil === 'zahl') {
    mitte = `
      <div class="zahlBlock">
        <div class="augenbraue">${esc(o.marke)}</div>
        <div class="grosseZahl"><b class="anton">${esc(o.zahl.wert)}</b><i>${esc(o.zahl.einheit)}</i></div>
        <div class="zahlLabel">${esc(o.zahl.label)}</div>
        ${o.haken ? `<p class="text">${esc(o.haken)}</p>` : ''}
      </div>`;
  } else {
    const fotos = o.fotos
      ? `<div class="fotos">${o.fotos.map((f, i) => `
          <figure><img src="data:image/jpeg;base64,${b64(f)}">
          <figcaption>${i === 0 ? T.start : T.ende}</figcaption></figure>`).join('')}</div>`
      : '';
    const makros = o.makros
      ? `<div class="makros">${o.makros.map(([v, l]) =>
          `<div><b>${esc(v)}</b><span>${esc(l)}</span></div>`).join('')}</div>`
      : '';
    mitte = `
      <div class="marke">${esc(o.marke)}</div>
      ${o.augenbraue ? `<div class="augenbraue">${esc(o.augenbraue)}</div>` : ''}
      <h1${o.art === 'wissen' ? ' class="aussage"' : ''}>${esc(o.haken)}</h1>
      ${fotos}
      ${o.text ? `<p class="text">${esc(o.text)}</p>` : ''}
      ${makros}`;
  }

  return `<!doctype html><meta charset="utf-8">
<body class="stil-${stil}${KI_MENSCHEN ? ' mitKi' : ''}${hatFoto ? ' mitFoto' : ''}"><style>
@font-face{font-family:'Inter';font-weight:400;src:url(data:font/woff2;base64,${inter400}) format('woff2')}
@font-face{font-family:'Inter';font-weight:700;src:url(data:font/woff2;base64,${inter700}) format('woff2')}
${anton ? `@font-face{font-family:'Anton';font-weight:400;src:url(data:font/woff2;base64,${anton}) format('woff2')}` : ''}
*{margin:0;padding:0;box-sizing:border-box}
html,body{width:${B}px;height:${H}px;overflow:hidden}
body{font-family:'Inter',system-ui,sans-serif;color:#fef3c7;
  background:radial-gradient(120% 80% at 15% 0%,#1a1a1a 0%,#0a0a0a 62%);
  display:flex;flex-direction:column;padding:64px;position:relative}
/* Anton nur fuer Schlagzeilen und die grosse Zahl. Zwei laute Schriften
   nebeneinander ergeben Laerm, keine Wirkung — siehe schriften/README.md. */
.anton{font-family:${anton ? "'Anton'," : ''}'Inter',sans-serif;font-weight:400;
  text-transform:uppercase;letter-spacing:.005em}

/* Das echte App-Icon als grosses, sehr leises Markenzeichen im Hintergrund.
   Es wird NICHT nachgezeichnet — favicon.svg ist die einzige Quelle, und die
   Symbole darin sind 1:1 die Lucide-Pfade aus BottomNav.jsx. */
.markenRing{position:absolute;width:1180px;height:1180px;right:-380px;top:-260px;
  opacity:.07;pointer-events:none}
/* Ueber einem Foto ist das Markenzeichen kein Zeichen, sondern ein Schmierer —
   die Symbole zeichnen sich als Umrisse ab und stoeren das Motiv. Dort bleibt
   es weg; der Kopf traegt die Marke ohnehin. */
body.mitFoto .markenRing{display:none}
.korn{position:absolute;inset:0;opacity:.16;mix-blend-mode:overlay;pointer-events:none;
  background-image:url(data:image/svg+xml;base64,${KORN});background-size:200px}

.hgFoto{position:absolute;inset:0;background-size:cover;background-position:center;
  filter:saturate(.86)}
.hgSchleier{position:absolute;inset:0}
/* Der Schleier arbeitet je Stil anders: premium dunkelt durchgehend ab,
   damit zentrierter Text ueberall liest; poster laesst das obere Drittel
   frei und wird erst unten dicht, wo der Text sitzt. */
.stil-premium .hgSchleier{background:linear-gradient(180deg,rgba(10,10,10,.80) 0%,
  rgba(10,10,10,.62) 38%,rgba(10,10,10,.86) 78%,rgba(10,10,10,.94) 100%)}
.stil-zahl .hgSchleier{background:linear-gradient(180deg,rgba(10,10,10,.86) 0%,
  rgba(10,10,10,.74) 45%,rgba(10,10,10,.92) 100%)}
.stil-poster .hgSchleier{background:linear-gradient(180deg,rgba(10,10,10,.34) 0%,
  rgba(10,10,10,.10) 26%,rgba(10,10,10,.72) 58%,rgba(10,10,10,.96) 84%)}

${WASSERZEICHEN_CSS}

.kopf,.inhalt,.fuss{position:relative;z-index:2}
.kopf{display:flex;align-items:center;gap:18px}
.kopf img{width:88px;height:88px;border-radius:20px}
.kopf span{font-weight:700;letter-spacing:.3em;font-size:26px;color:#fbbf24}
.stil-poster .kopf img{width:72px;height:72px;border-radius:16px}
.stil-poster .kopf span{font-size:23px}

.inhalt{flex:1 1 0;min-height:0;display:flex;flex-direction:column;gap:24px}
.stil-premium .inhalt,.stil-zahl .inhalt{justify-content:center}
.stil-poster .inhalt{justify-content:flex-end;padding-bottom:26px}

.marke{align-self:flex-start;border:1px solid rgba(251,191,36,.42);border-radius:999px;
  padding:9px 22px;font-size:24px;font-weight:700;color:#fbbf24}
.augenbraue{font-size:24px;font-weight:700;letter-spacing:.2em;text-transform:uppercase;
  color:#fbbf24}
h1{font-size:58px;line-height:1.1;font-weight:700;letter-spacing:-.025em;color:#fff8e7}
h1.aussage{font-size:50px;line-height:1.22;letter-spacing:-.015em}
p.text{font-size:32px;line-height:1.38;color:#e7e5e4}

/* --- poster --- */
.posterText{display:flex;flex-direction:column;gap:20px}
.stil-poster h1{font-size:104px;line-height:.94;letter-spacing:0;color:#fff}
.kante{width:132px;height:7px;background:#fbbf24;border-radius:4px;flex:0 0 auto}
.stil-poster p.text{font-size:29px;color:#d6d3d1;max-width:88%}

/* --- zahl --- */
.zahlBlock{display:flex;flex-direction:column;gap:16px;align-items:flex-start}
.grosseZahl{display:flex;align-items:baseline;gap:14px;color:#fbbf24}
.grosseZahl b{font-size:250px;line-height:.82;font-weight:400}
.grosseZahl i{font-style:normal;font-size:76px;font-weight:700}
.zahlLabel{font-size:38px;font-weight:700;color:#fff8e7;letter-spacing:-.01em}
.stil-zahl p.text{font-size:28px;color:#d6d3d1;margin-top:8px}

/* --- premium --- */
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

.fuss{display:flex;justify-content:space-between;align-items:center;gap:20px;
  font-size:23px;color:#78716c}
.badges{display:flex;gap:14px;align-items:center;flex:0 0 auto}
/* Badges nie verzerren — Apple und Google geben die Form vor. Feste Hoehe,
   Breite folgt dem 3:1-Verhaeltnis von selbst. */
.badges img{height:58px;width:auto;display:block}
/* Traegt der Post ein KI-Wasserzeichen, rueckt der Fuss hoch — sonst stossen
   Store-Badge und Plaettchen in der Ecke aneinander. */
body.mitKi .fuss{margin-bottom:40px}
</style>
${hatFoto ? `<div class="hgFoto" style="background-image:url(data:image/jpeg;base64,${b64(hgPfad)})"></div>
<div class="hgSchleier"></div>` : ''}
<img class="markenRing" src="data:image/svg+xml;base64,${logo}" alt="">
<div class="korn"></div>
<div class="kopf"><img src="data:image/svg+xml;base64,${logo}"><span>FULLREP</span></div>
<div class="inhalt">${mitte}</div>
<div class="fuss"><span>${T.fuss}</span><span class="badges">${badgesHtml()}</span></div>
${kiMarke}`;
}

// --- Lauf -------------------------------------------------------------------
const o = inhalt(FORMAT, mulberry32(SEED));

// `zahl` ohne Zahl gibt es nicht. Lieber ein anderer Stil als eine erfundene
// Zahl — die faellt sofort auf und beschaedigt genau das Vertrauen, von dem
// dieser Kanal lebt.
let stil = STIL;
if (stil === 'zahl' && !o.zahl) {
  console.log('  (kein Zahlenwert im Inhalt — Stil faellt auf `premium` zurueck)');
  stil = 'premium';
}

mkdirSync(OUT, { recursive: true });
const basis = NAME ?? `fullrep-${FORMAT}-${stil}-${LANG}-s${SEED}`;
const ziel = join(OUT, `${basis}.jpg`);

const browser = await chromium.launch(
  process.env.CHROMIUM_PFAD ? { executablePath: process.env.CHROMIUM_PFAD } : {},
);
const seite = await browser.newPage({ viewport: { width: B, height: H }, deviceScaleFactor: 1 });
await seite.setContent(baueHtml(o, stil), { waitUntil: 'load' });
await seite.evaluate(() => document.fonts.ready);
await seite.screenshot({ path: ziel, type: 'jpeg', quality: 92 });
await browser.close();

const tags = {
  uebung: ['fullrep', 'fitness', 'gym', 'training', 'uebung', 'muskelaufbau', 'krafttraining', 'workout'],
  rezept: ['fullrep', 'fitness', 'meal', 'protein', 'rezept', 'ernaehrung', 'mealprep', 'highprotein'],
  wissen: ['fullrep', 'fitness', 'wissen', 'training', 'gym', 'muskelaufbau', 'gymtok', 'fitnesstips'],
}[o.art];

const hatFoto = Boolean(HINTERGRUND ?? o.autoFoto ?? o.fotos);

writeFileSync(join(OUT, `${basis}.txt`),
`# ${basis}.jpg

## Caption (kopieren)

${o.haken}${o.text ? `\n\n${o.text}` : ''}

## Hashtags

${tags.map((h) => `#${h}`).join(' ')}

## Beim Hochladen

- Kein Store-Link in der Caption, nur „Link in der Bio".
- Im Bild stehen die Download-Badges fuer App Store und Google Play.

## Inhalt

- Medienherkunft: ${KI_MENSCHEN ? 'ki-menschen (Wasserzeichen gesetzt)'
  : hatFoto ? 'echtes Foto (free-exercise-db, Public Domain)' : 'nur Typografie'}
- Stil: ${stil}${stil !== STIL ? ` (angefordert war ${STIL})` : ''}
- Format: ${FORMAT} (${o.art})
- Inhaltsschluessel: ${o.schluessel}
- Sprache: ${LANG}
`);

console.log(`✓ ${ziel}`);
console.log(`  ${B}×${H} · ${stil} · ${o.art} · ${o.schluessel} · ${LANG}`);
