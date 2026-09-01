// Prueft public/get.html auf echten Geraeteprofilen, statt sie „sieht gut aus" zu nennen.
//
// Warum ein Skript und kein Blick: Die Seite verhaelt sich je nach User-Agent und
// Sprache anders (welcher Store-Knopf oben steht, welche Sprache greift). Genau
// das laesst sich von Hand nicht zuverlaessig durchspielen — und es ist die
// Stelle, an der ein Bio-Link falsch abbiegt.
//
// Voraussetzung: `python3 -m http.server 5178` im Ordner `public/`.
import { chromium } from 'playwright';
import { mkdirSync } from 'fs';

const URL_BASIS = process.env.BASIS ?? 'http://127.0.0.1:5178/get.html';
const OUT = process.env.SHOTS ?? new URL('../out/bio/', import.meta.url).pathname;
mkdirSync(OUT, { recursive: true });

const IPHONE = 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.5 Mobile/15E148 Safari/604.1';
const ANDROID = 'Mozilla/5.0 (Linux; Android 14; Pixel 8) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Mobile Safari/537.36';

// ⚠ Die Hoehen sind die SICHTBAREN, nicht die Geraetehoehen. Ein iPhone 14/15
// ist 844 px hoch, davon nimmt Safari oben die Adressleiste und unten die
// Werkzeugleiste — es bleiben rund 660. Gegen 844 zu pruefen hiesse, einen
// Knopf fuer sichtbar zu halten, den auf dem Geraet niemand sieht. Und im
// In-App-Browser von Instagram ist es noch weniger.
const faelle = [
  { name: 'iphone-de', ua: IPHONE, locale: 'de-AT', vp: { width: 390, height: 660 }, erwartetOben: 'App Store' },
  { name: 'android-de', ua: ANDROID, locale: 'de-DE', vp: { width: 412, height: 730 }, erwartetOben: 'Google Play' },
  { name: 'iphone-en', ua: IPHONE, locale: 'en-US', vp: { width: 390, height: 660 }, erwartetOben: 'App Store' },
  { name: 'klein-de', ua: IPHONE, locale: 'de-AT', vp: { width: 375, height: 560 }, erwartetOben: 'App Store' },
  { name: 'rechner-de', ua: undefined, locale: 'de-AT', vp: { width: 1100, height: 900 }, erwartetOben: 'App Store' },
];

const b = await chromium.launch({ executablePath: process.env.CHROMIUM_PFAD ?? '/opt/pw-browsers/chromium' });
let fehler = 0;

for (const f of faelle) {
  const ctx = await b.newContext({
    userAgent: f.ua, locale: f.locale, viewport: f.vp, deviceScaleFactor: 2,
    // iPadOS-Erkennung haengt an maxTouchPoints; fuer die Faelle hier reicht der UA.
    isMobile: f.name !== 'rechner-de', hasTouch: f.name !== 'rechner-de',
  });
  const p = await ctx.newPage();
  const seitenfehler = [];
  p.on('pageerror', (e) => seitenfehler.push(e.message));
  const fehlend = [];
  p.on('response', (r) => { if (r.status() >= 400) fehlend.push(`${r.status()} ${r.url()}`); });

  await p.goto(URL_BASIS, { waitUntil: 'networkidle' });
  await p.waitForTimeout(300);
  await p.screenshot({ path: `${OUT}${f.name}.png`, fullPage: true });
  // Zusaetzlich der Ausschnitt OHNE Scrollen. Auf einer Download-Seite muss der
  // Store-Knopf da hineinpassen — sonst tippt ihn niemand.
  await p.screenshot({ path: `${OUT}${f.name}-falz.png` });

  const mass = await p.evaluate(() => {
    const knopf = document.querySelector('#knoepfe a');
    const kopf = document.querySelector('.kopf');
    return {
      knopfUnten: knopf ? Math.round(knopf.getBoundingClientRect().bottom) : null,
      kopfOben: kopf ? Math.round(kopf.getBoundingClientRect().top) : null,
      schirm: window.innerHeight,
    };
  });

  const knoepfe = await p.$$eval('#knoepfe a', (as) =>
    as.map((a) => ({ text: a.textContent.trim(), href: a.getAttribute('href'), betont: a.classList.contains('primary') })));
  const sprache = await p.getAttribute('html', 'lang');

  const probleme = [];
  if (knoepfe.length !== 2) probleme.push(`${knoepfe.length} Knoepfe statt 2`);
  if (!knoepfe[0]?.text.includes(f.erwartetOben)) probleme.push(`oben steht „${knoepfe[0]?.text}", erwartet ${f.erwartetOben}`);
  if (!knoepfe[0]?.betont) probleme.push('der obere Knopf ist nicht hervorgehoben');
  // ⚠ Die fremde App „MyPeak — Gym Workout Tracker" liegt unter 6758337601.
  const apple = knoepfe.find((k) => k.href.includes('apps.apple.com'));
  if (!apple?.href.includes('id6788461300')) probleme.push(`falsche App-Store-ID: ${apple?.href}`);
  if (!knoepfe.some((k) => k.href.includes('id=at.gallab.mypeak'))) probleme.push('falscher Play-Paketname');
  // ⚠ Ein zentrierter Flex-Container schneidet oben ab, wenn der Inhalt hoeher
  // ist als der Schirm — und das laesst sich nicht wegscrollen. Genau so waren
  // Icon und Name einmal verschwunden. Negativer Wert = abgeschnitten.
  if (mass.kopfOben !== null && mass.kopfOben < 0) probleme.push(`Kopf ${-mass.kopfOben} px ueber dem Rand abgeschnitten`);
  if (mass.knopfUnten !== null && mass.knopfUnten > mass.schirm) {
    probleme.push(`erster Store-Knopf endet bei ${mass.knopfUnten} px, Schirm ist ${mass.schirm} px — unter der Falz`);
  }
  const erwarteteSprache = f.locale.startsWith('de') ? 'de' : 'en';
  if (sprache !== erwarteteSprache) probleme.push(`lang="${sprache}", erwartet "${erwarteteSprache}"`);
  if (seitenfehler.length) probleme.push(`Seitenfehler: ${seitenfehler.join(' | ')}`);
  if (fehlend.length) probleme.push(`nicht geladen: ${fehlend.join(' | ')}`);
  // Die Seite darf NICHT mehr wegspringen (frueher location.replace in den Store).
  if (!p.url().endsWith('/get.html')) probleme.push(`weitergeleitet nach ${p.url()}`);

  if (probleme.length) { fehler++; console.log(`✗ ${f.name}\n    ${probleme.join('\n    ')}`); }
  else console.log(`✓ ${f.name} — ${knoepfe.map((k) => k.text).join(' / ')}, lang=${sprache}`);

  await ctx.close();
}

await b.close();
console.log(fehler ? `\n${fehler} Fall/Faelle fehlerhaft.` : '\nAlle Faelle in Ordnung.');
process.exit(fehler ? 1 : 0);
