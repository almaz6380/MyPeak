// Kanal-Ausstattung fuer FullRep: Profilbild, Titelbild, Kopfzeilen.
//
//   CHROMIUM_PFAD=/opt/pw-browsers/chromium node scripts/kanal-assets.mjs --was alle
//   node scripts/kanal-assets.mjs --was fb --sprache en
//   node scripts/kanal-assets.mjs --was alle --raster     (mit Beschnittrahmen)
//
// Muster: scripts/post-bild.mjs — Playwright, setContent(), alle Mittel als
// data:-URI. ⚠ Eine per setContent() gebaute Seite hat KEINEN Origin; file://
// laedt dort nicht. Schrift, Logo und Badges muessen eingebettet sein.
//
// --- Was es hier NICHT gibt, und warum -------------------------------------
//
// „Titelbild fuer TikTok und Instagram" existiert nicht. Beide Profile haben
// ausschliesslich ein rundes Avatar; ein Banner gibt es dort schlicht nicht.
// Statt einen Platzhalter fuer einen nicht vorhandenen Platz zu bauen, liefert
// diese Datei das, was dort tatsaechlich die Kopfzeile bildet:
//
//   Instagram  drei Rasterkacheln, die nebeneinander EIN Banner ergeben
//   TikTok     das Cover fuer den angepinnten Kanal-Trailer
//   Facebook   ein echtes Titelbild — als einzige der drei
//
// --- Beschnitt: der Grund fuer die Schutzzonen ------------------------------
//
// Facebook skaliert das Titelbild auf die Anzeigeflaeche und schneidet den
// Rest weg, auf dem Rechner anders als am Handy. Bei 1640x856 hochgeladen:
//
//   Desktop 820x312 (Verhaeltnis 2,628) → fuellt die Breite, es bleiben
//                    1640/2,628 = 624 px Hoehe. Oben und unten fallen je 116 px.
//   Mobil   640x360 (Verhaeltnis 1,778) → fuellt die Hoehe, es bleiben
//                    856*1,778 = 1522 px Breite. Links und rechts je 59 px.
//
// Der Schnittmengenbereich ist also 1522x624. Alles Wesentliche liegt in einer
// mittigen Zone von 1440x560 — mit Reserve, weil Facebook die Masse ueber die
// Jahre mehrfach still geaendert hat. `--raster` zeichnet beide Rahmen ein.
//
// TikTok legt ueber jedes Video-Cover seine eigene Oberflaeche: unten Caption
// und Name, rechts die Knopfleiste. Der Inhalt sitzt deshalb im oberen Drittel.

import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import { chromium } from 'playwright';

import { WURZEL } from './social-daten.mjs';
import {
  TEXTE, SPRUCH, SPRUCH_ZEILEN, DREIKLANG, LEISTE, GRENZEN, zeichen, pruefeTexte,
} from './kanal-texte.mjs';

const arg = (n, s) => { const i = process.argv.indexOf(`--${n}`); return i === -1 ? s : process.argv[i + 1]; };
const WAS = arg('was', 'alle');
const LANG = arg('sprache', 'de');
const RASTER = process.argv.includes('--raster');
const OUT = join(WURZEL, arg('out', 'store-assets/social'));

// Beide Stores sind seit 29.08.2026 live. Steht einer spaeter wieder nicht
// bereit, wird hier umgeschaltet und der Badge verschwindet von selbst —
// dieselbe Stelle wie in post-bild.mjs.
const STORES = { ios: true, android: true };

const esc = (s) => String(s ?? '').replace(/[&<>]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' }[c]));
const b64 = (p) => readFileSync(p).toString('base64');

// --- Das Logo ---------------------------------------------------------------
// favicon.svg ist die EINZIGE Quelle des Zeichens; es wird nie nachgezeichnet.
// Fuer Flaechen, die selbst schon einen Grund haben (Avatar, Titelbild), muss
// aber der eingebaute schwarze Kasten mit der abgerundeten Ecke weg — sonst
// steht im runden Avatar ein Quadrat mit sichtbaren Ecken.
const LOGO_ROH = readFileSync(join(WURZEL, 'public/favicon.svg'), 'utf8');
const LOGO_MIT_GRUND = Buffer.from(LOGO_ROH).toString('base64');
const LOGO_FREI = Buffer.from(
  LOGO_ROH.replace(/<rect[^>]*rx="100"[^>]*\/>/, ''),
).toString('base64');

const bild = (daten, klasse = '') =>
  `<img class="${klasse}" src="data:image/svg+xml;base64,${daten}" alt="">`;

function badgesHtml(hoehe = 62) {
  const dateien = [];
  if (STORES.ios) dateien.push('appstore-en.png');
  if (STORES.android) dateien.push('googleplay-en.png');
  return dateien
    .map((f) => join(WURZEL, 'scripts', 'badges', f))
    .filter((f) => existsSync(f))
    .map((f) => `<img style="height:${hoehe}px;width:auto;display:block" src="data:image/png;base64,${b64(f)}" alt="">`)
    .join('');
}

// Filmkorn wie in post-bild.mjs — feTurbulence statt eines Rauschbildes.
const KORN = Buffer.from(
  `<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200">
     <filter id="k"><feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="3"/>
     <feColorMatrix type="saturate" values="0"/></filter>
     <rect width="200" height="200" filter="url(#k)" opacity="0.5"/></svg>`,
).toString('base64');

function kopf(breite, hoehe) {
  const inter400 = b64(join(WURZEL, 'node_modules/@fontsource/inter/files/inter-latin-400-normal.woff2'));
  const inter700 = b64(join(WURZEL, 'node_modules/@fontsource/inter/files/inter-latin-700-normal.woff2'));
  const antonPfad = join(WURZEL, 'scripts', 'schriften', 'anton.woff2');
  const anton = existsSync(antonPfad) ? b64(antonPfad) : null;

  return `<!doctype html><meta charset="utf-8"><style>
@font-face{font-family:'Inter';font-weight:400;src:url(data:font/woff2;base64,${inter400}) format('woff2')}
@font-face{font-family:'Inter';font-weight:700;src:url(data:font/woff2;base64,${inter700}) format('woff2')}
${anton ? `@font-face{font-family:'Anton';font-weight:400;src:url(data:font/woff2;base64,${anton}) format('woff2')}` : ''}
*{margin:0;padding:0;box-sizing:border-box}
html,body{width:${breite}px;height:${hoehe}px;overflow:hidden}
body{font-family:'Inter',system-ui,sans-serif;color:#fff8e7;position:relative;
  background:radial-gradient(120% 90% at 14% 0%,#1c1c1c 0%,#0a0a0a 64%)}
.anton{font-family:${anton ? "'Anton'," : ''}'Inter',sans-serif;font-weight:400;
  text-transform:uppercase;letter-spacing:.005em}
.korn{position:absolute;inset:0;opacity:.16;mix-blend-mode:overlay;pointer-events:none;
  background-image:url(data:image/svg+xml;base64,${KORN});background-size:200px;z-index:5}
.ring{position:absolute;opacity:.07;pointer-events:none;z-index:1}
.z{position:relative;z-index:3}
.amber{color:#fbbf24}
/* Die Beschnittrahmen aus --raster. Sie sind ein Pruefwerkzeug und duerfen
   NIE in einer hochgeladenen Datei landen — deshalb traegt der Dateiname
   dann „-raster". */
.rahmen{position:absolute;z-index:9;border:3px dashed rgba(255,90,90,.9);
  display:flex;align-items:flex-start;justify-content:flex-end}
.rahmen b{background:rgba(255,90,90,.9);color:#fff;font-size:20px;padding:4px 10px}
</style>`;
}

const rahmen = (b, h, ganzB, ganzH, name) => (RASTER ? `
<div class="rahmen" style="width:${b}px;height:${h}px;left:${(ganzB - b) / 2}px;top:${(ganzH - h) / 2}px">
  <b>${name}</b></div>` : '');

// --- Die vier Flaechen ------------------------------------------------------

/**
 * Avatar, 1080x1080 — fuer alle drei Kanaele dasselbe.
 *
 * ⚠ KEIN Text im Bild. Facebook zeigt das Profilbild auf dem Rechner mit
 * 176 px, Instagram am Handy mit rund 110 px, TikTok aehnlich. Ein Schriftzug
 * ist dort ein grauer Fleck. Es traegt nur das Zeichen.
 *
 * Alle drei beschneiden zum KREIS. Das Zeichen bleibt deshalb deutlich
 * innerhalb des einbeschriebenen Kreises.
 *
 * ⚠ Die Prozentzahl ist NICHT frei gewaehlt. Die Zeichnung in favicon.svg
 * fuellt ihre eigene 512er-Flaeche nur zu 68,75 % (der Kreis laeuft von 80 bis
 * 432). Ein Kasten von 64 % der Bildbreite ergibt daraus ein Zeichen von nur
 * 44 % — im ersten Versuch sah das Avatar aus wie ein verlorener Punkt. Bei
 * 0,90 traegt das Zeichen rund 62 % der Flaeche, und das liest auch bei 110 px.
 */
function avatar() {
  const B = 1080;
  return `${kopf(B, B)}
<body>
${bild(LOGO_FREI, 'zeichen')}
<div class="korn"></div>
<style>
.zeichen{position:absolute;width:${Math.round(B * 0.90)}px;height:${Math.round(B * 0.90)}px;
  left:50%;top:50%;transform:translate(-50%,-50%);z-index:3}
/* Ein sehr leiser Amber-Schimmer aus der oberen linken Ecke, damit die
   Flaeche im Feed nicht als schwarzes Loch wirkt. */
body::after{content:'';position:absolute;inset:0;z-index:2;
  background:radial-gradient(60% 60% at 26% 18%,rgba(251,191,36,.16),transparent 70%)}
${RASTER ? `
.kreis{position:absolute;inset:0;border-radius:50%;border:3px dashed rgba(255,90,90,.9);z-index:9}
` : ''}
</style>
${RASTER ? '<div class="kreis"></div>' : ''}`;
}

/** Facebook-Titelbild, 1640x856. Schutzzone 1440x560 mittig. */
function fbTitel() {
  const B = 1640, H = 856;
  return `${kopf(B, H)}
<body>
${bild(LOGO_MIT_GRUND, 'ring')}
<div class="korn"></div>
<div class="mitte z">
  <div class="links">
    ${bild(LOGO_MIT_GRUND, 'mark')}
    <div>
      <div class="anton wort">FullRep</div>
      <div class="spruch">${esc(SPRUCH[LANG])}</div>
    </div>
  </div>
  <div class="rechts">
    <div class="drei">${DREIKLANG[LANG].map((d) => `<span>${esc(d)}</span>`).join('')}</div>
    <div class="badges">${badgesHtml(60)}</div>
  </div>
</div>
<style>
/* ⚠ Das Markenzeichen im Hintergrund muss GANZ im Bild liegen. Im ersten
   Versuch ragte es oben rechts hinaus; ein angeschnittener Kreis liest nicht
   als leises Zeichen, sondern als versehentlich stehengebliebene Form.
   Deshalb mittig auf der rechten Haelfte, mit Abstand zu allen Kanten. */
.ring{width:660px;height:660px;right:96px;top:98px;border-radius:150px;opacity:.06}
.mitte{position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);
  width:1440px;display:flex;flex-direction:column;gap:52px}
.links{display:flex;align-items:center;gap:38px}
.mark{width:170px;height:170px;border-radius:38px;flex:0 0 auto}
.wort{font-size:118px;line-height:.9;color:#fff}
.spruch{font-size:40px;color:#fbbf24;font-weight:700;margin-top:16px;letter-spacing:-.01em}
.rechts{display:flex;align-items:center;justify-content:space-between;gap:40px}
.drei{display:flex;gap:16px;flex-wrap:wrap}
.drei span{border:1px solid rgba(251,191,36,.42);border-radius:999px;padding:12px 26px;
  font-size:27px;font-weight:700;color:#fbbf24;white-space:nowrap}
.badges{display:flex;gap:16px;align-items:center;flex:0 0 auto}
</style>
${rahmen(1640, 624, B, H, 'Desktop 820×312')}
${rahmen(1522, 856, B, H, 'Mobil 640×360')}
${rahmen(1440, 560, B, H, 'Schutzzone')}`;
}

/**
 * Instagram-Kopfzeile: drei Kacheln zu je 1080x1350, die nebeneinander EIN
 * Banner ergeben.
 *
 * ⚠ Beim Hochladen umgekehrt vorgehen: Instagram sortiert das Raster
 * neuestes-zuerst von links. Wer 1, 2, 3 in dieser Reihenfolge postet, sieht
 * im Profil 3, 2, 1. Also Kachel 3 zuerst hochladen, dann 2, dann 1.
 *
 * ⚠ Kein Wort darf ueber die Fuge laufen. Zwischen den Kacheln liegt im
 * Raster ein schmaler Spalt, und jede Kachel ist ausserdem einzeln
 * anklickbar — ein halber Buchstabe ist dann ein Fehler, kein Effekt. Was
 * durchlaeuft, ist nur die Amber-Linie: eine Linie darf geteilt werden.
 */
function igKachel(n) {
  const B = 1080, H = 1350;
  const inhalt = [
    // 1 — die Marke
    `${bild(LOGO_MIT_GRUND, 'mark')}
     <div class="anton wort">FullRep</div>`,
    // 2 — der Spruch, mit von Hand gesetzten Zeilen
    `<div class="anton spruchGross">${SPRUCH_ZEILEN[LANG].map(esc).join('<br>')}</div>`,
    // 3 — Beweis und Weg in den Store
    `<div class="drei">${DREIKLANG[LANG].map((d) => `<span>${esc(d)}</span>`).join('')}</div>
     <div class="badges">${badgesHtml(64)}</div>`,
  ][n - 1];

  return `${kopf(B, H)}
<body>
${n === 2 ? bild(LOGO_MIT_GRUND, 'ring') : ''}
<div class="korn"></div>
<div class="z augenbraue">${esc(LEISTE[LANG][n - 1])}</div>
<div class="linie"></div>
<div class="z inhalt">${inhalt}</div>
<style>
.ring{width:760px;height:760px;left:50%;margin-left:-380px;bottom:-150px;border-radius:170px;opacity:.05}
/* Die zwei Dinge, die aus drei Bildern EINE Leiste machen: das Wort ueber der
   Linie und die Linie selbst. Beide sitzen in allen drei Kacheln auf exakt
   derselben Hoehe — das ist die Ausrichtung, die man im Raster sieht.
   ⚠ Nur die LINIE laeuft ueber die Fuge. Buchstaben nie: zwischen den Kacheln
   liegt ein Spalt, und jede ist einzeln anklickbar. */
.augenbraue{position:absolute;left:88px;top:150px;font-size:38px;font-weight:700;
  letter-spacing:.22em;color:#fbbf24}
.linie{position:absolute;left:0;right:0;top:236px;height:6px;background:#fbbf24;
  opacity:.9;z-index:2}
/* Der Inhalt steht mittig im Feld UNTER der Linie, nicht mittig in der Kachel.
   Sonst haengt er in der oberen Haelfte und darunter klafft ein Loch — so sah
   der erste Versuch aus. */
.inhalt{position:absolute;left:0;right:0;top:242px;bottom:0;padding:0 88px 96px;
  display:flex;flex-direction:column;justify-content:center;align-items:flex-start;gap:44px}
.mark{width:250px;height:250px;border-radius:56px}
.wort{font-size:128px;line-height:.9;color:#fff}
.spruchGross{font-size:92px;line-height:1.04;color:#fbbf24}
.drei{display:flex;flex-direction:column;gap:22px;align-items:flex-start}
.drei span{border:1px solid rgba(251,191,36,.42);border-radius:999px;padding:16px 34px;
  font-size:36px;font-weight:700;color:#fbbf24}
.badges{display:flex;flex-direction:column;gap:20px}
</style>`;
}

/**
 * TikTok-Cover, 1080x1920 — fuer den angepinnten Kanal-Trailer.
 *
 * ⚠ TikTok legt seine eigene Oberflaeche darueber: unten Name, Caption und
 * Ton, rechts die Knopfleiste. Der Inhalt sitzt deshalb im oberen Drittel;
 * die unteren rund 40 % und der rechte Rand bleiben frei.
 */
function tiktokCover() {
  const B = 1080, H = 1920;
  return `${kopf(B, H)}
<body>
${bild(LOGO_MIT_GRUND, 'ring')}
<div class="korn"></div>
<div class="z inhalt">
  ${bild(LOGO_MIT_GRUND, 'mark')}
  <div class="anton wort">FullRep</div>
  <div class="kante"></div>
  <div class="spruch">${esc(SPRUCH[LANG])}</div>
  <div class="drei">${DREIKLANG[LANG].map((d) => `<span>${esc(d)}</span>`).join('')}</div>
</div>
<style>
/* Der Ring fuellt die untere Haelfte, die TikTok ohnehin ueberdeckt — dort
   stoert er nie und die Flaeche wirkt nicht leer. Er bleibt ganz im Bild. */
.ring{width:820px;height:820px;left:50%;margin-left:-410px;bottom:120px;
  border-radius:180px;opacity:.055}
.inhalt{position:absolute;left:0;top:290px;width:860px;padding:0 78px;
  display:flex;flex-direction:column;align-items:flex-start;gap:34px}
.mark{width:180px;height:180px;border-radius:42px}
.wort{font-size:126px;line-height:.9;color:#fff}
.kante{width:150px;height:8px;background:#fbbf24;border-radius:4px}
.spruch{font-size:52px;line-height:1.18;color:#fbbf24;font-weight:700;letter-spacing:-.01em}
.drei{display:flex;flex-direction:column;gap:18px;margin-top:12px}
.drei span{border:1px solid rgba(251,191,36,.42);border-radius:999px;padding:14px 30px;
  font-size:33px;font-weight:700;color:#fbbf24;align-self:flex-start}
</style>
${RASTER ? `
<div class="rahmen" style="left:0;top:1150px;width:${B}px;height:${H - 1150}px">
  <b>TikTok legt hier seine Oberflaeche drueber</b></div>
<div class="rahmen" style="right:0;top:0;width:170px;height:${H}px"><b>Knöpfe</b></div>` : ''}`;
}

// --- Lauf -------------------------------------------------------------------

// Erst die Texte, dann die Bilder: Reisst eine Bio ihre Grenze, soll der Lauf
// abbrechen, BEVOR er zehn Minuten lang Bilder rendert.
const bericht = pruefeTexte();

const AUFTRAEGE = {
  avatar: [{ name: 'avatar-1080', html: avatar, b: 1080, h: 1080, sprachneutral: true }],
  fb: [{ name: 'fb-titelbild', html: fbTitel, b: 1640, h: 856 }],
  ig: [1, 2, 3].map((n) => ({ name: `ig-grid-${n}`, html: () => igKachel(n), b: 1080, h: 1350 })),
  tiktok: [{ name: 'tiktok-cover', html: tiktokCover, b: 1080, h: 1920 }],
};

const gewaehlt = WAS === 'alle'
  ? Object.values(AUFTRAEGE).flat()
  : (AUFTRAEGE[WAS] ?? null);

if (!gewaehlt) {
  console.error(`✗ unbekannt: --was ${WAS}\n  Bekannt: avatar, fb, ig, tiktok, alle`);
  process.exit(1);
}

mkdirSync(OUT, { recursive: true });

const browser = await chromium.launch(
  process.env.CHROMIUM_PFAD ? { executablePath: process.env.CHROMIUM_PFAD } : {},
);

const gebaut = [];
for (const a of gewaehlt) {
  // Das Avatar traegt keinen Text, also gibt es davon keine zweite Sprache.
  const endung = a.sprachneutral ? '' : `-${LANG}`;
  const datei = `${a.name}${endung}${RASTER ? '-raster' : ''}.png`;
  const ziel = join(OUT, datei);

  const seite = await browser.newPage({ viewport: { width: a.b, height: a.h }, deviceScaleFactor: 1 });
  await seite.setContent(a.html(), { waitUntil: 'load' });
  await seite.evaluate(() => document.fonts.ready);
  // PNG, nicht JPEG: Profil- und Titelbilder sind Flaechen mit harten Kanten.
  // JPEG setzt genau dort Artefakte an die Buchstaben.
  await seite.screenshot({ path: ziel, type: 'png' });
  await seite.close();

  gebaut.push({ datei, b: a.b, h: a.h });
  console.log(`  ✓ ${datei.padEnd(30)} ${a.b}×${a.h}`);
}

await browser.close();

// --- Die Beschreibungen als Datei ------------------------------------------
if (!RASTER) {
  const zeile = (k) => `${TEXTE[LANG][k]}`;
  const zaehler = (k) => `${zeichen(TEXTE[LANG][k])} von ${GRENZEN[k]} Zeichen`;

  writeFileSync(join(OUT, `bios-${LANG}.md`), `# FullRep — Profiltexte (${LANG.toUpperCase()})

Erzeugt von \`scripts/kanal-assets.mjs\`. Zeichenzahlen sind maschinell geprueft;
ein zu langer Text laesst den Lauf abbrechen, statt auf der Plattform
abgeschnitten zu werden.

## TikTok

Bio (${zaehler('tiktok')})

    ${zeile('tiktok')}

Profilbild: \`avatar-1080.png\`
Titelbild: **gibt es bei TikTok nicht.** Stattdessen \`tiktok-cover-${LANG}.png\`
als Cover fuer den angepinnten Kanal-Trailer.

## Instagram

Bio (${zaehler('instagram')})

${TEXTE[LANG].instagram.split('\n').map((z) => `    ${z}`).join('\n')}

Profilbild: \`avatar-1080.png\`
Titelbild: **gibt es bei Instagram nicht.** Stattdessen die drei Kacheln
\`ig-grid-1..3-${LANG}.png\`, die im Raster nebeneinander eine Kopfzeile ergeben.

⚠ **Reihenfolge beim Hochladen: 3, dann 2, dann 1.** Instagram sortiert das
Raster neuestes-zuerst von links — wer 1, 2, 3 postet, sieht im Profil 3, 2, 1.

## Facebook

Kurz-Bio (${zaehler('facebook')})

    ${zeile('facebook')}

Infotext (Seite → Info → Weitere Infos)

${TEXTE[LANG].facebookLang.split('\n').map((z) => `    ${z}`).join('\n')}

Profilbild: \`avatar-1080.png\`
Titelbild: \`fb-titelbild-${LANG}.png\` (1640×856)

⚠ Facebook beschneidet das Titelbild am Rechner anders als am Handy. Alles
Wesentliche liegt in einer mittigen Zone von 1440×560. Mit
\`--raster\` laesst sich das nachpruefen.

## Was bewusst NICHT drinsteht

- **Kein Preis.** „Kostenlos" steht erst drin, wenn es gegen beide Stores
  geprueft ist — eine falsche Preisangabe im Profil ist aergerlicher als eine
  fehlende.
- **Kein Haftungshinweis** (Entscheidung vom 29.08.2026). Er bleibt
  unveraendert in der App, im Play-Eintrag und unter \`/legal/health\`. Die
  Texte hier sind trotzdem frei von Dosierungen, Diagnosen und
  Therapieempfehlungen.
`);
  console.log(`  ✓ bios-${LANG}.md`);
}

console.log(`\n${gebaut.length} Datei(en) in ${OUT}`);
console.log(bericht.map((b) => `  ${b.ok ? '✓' : '✗'} Bio ${b.sprache}/${b.kanal}: ${b.n}/${b.grenze}`).join('\n'));
