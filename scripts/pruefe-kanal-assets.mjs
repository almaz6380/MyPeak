// Prueft die Kanalbilder so, wie die Plattformen sie zeigen — nicht so, wie
// sie auf der Platte liegen.
//
//   node scripts/pruefe-kanal-assets.mjs
//
// Warum es das braucht: Jeder der drei Kanaele schneidet oder verkleinert das
// Hochgeladene, und zwar unterschiedlich. Ein Titelbild, das in voller Groesse
// gut aussieht, kann am Handy den halben Schriftzug verlieren; ein Avatar, das
// in 1080 px prima liest, kann bei 110 px ein grauer Fleck sein. Beides sieht
// man erst, wenn man es nachstellt.
//
// Erzeugt nach store-assets/social/nachweis/ (gitignoriert waere falsch — die
// Bilder sind der Beleg und gehoeren mit ins Repo):
//   avatar-176.png        wie Facebook es am Rechner zeigt, rund beschnitten
//   avatar-110.png        wie Instagram es am Handy zeigt
//   fb-desktop.png        820x312 aus dem Titelbild geschnitten
//   fb-mobil.png          640x360 aus dem Titelbild geschnitten
//   ig-raster.png         die drei Kacheln nebeneinander, mit echter Fuge

import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const WURZEL = join(dirname(fileURLToPath(import.meta.url)), '..');
const QUELLE = join(WURZEL, 'store-assets', 'social');
const LANG = process.argv.includes('--sprache')
  ? process.argv[process.argv.indexOf('--sprache') + 1] : 'de';
// ⚠ Je Sprache ein eigener Ordner. Ohne das ueberschreibt der EN-Lauf die
// deutschen Belege, und man vergleicht am Ende zwei Mal dasselbe.
const ZIEL = join(QUELLE, 'nachweis', LANG);

mkdirSync(ZIEL, { recursive: true });

const pfad = (n) => join(QUELLE, n);
const fehlt = [];
const fordere = (n) => { if (!existsSync(pfad(n))) fehlt.push(n); return pfad(n); };

const AVATAR = fordere('avatar-1080.png');
const FB = fordere(`fb-titelbild-${LANG}.png`);
const IG = [1, 2, 3].map((n) => fordere(`ig-grid-${n}-${LANG}.png`));
const TIKTOK = fordere(`tiktok-cover-${LANG}.png`);

if (fehlt.length) {
  console.error(`✗ Es fehlen Dateien:\n${fehlt.map((f) => `    ${f}`).join('\n')}`);
  console.error(`\n  Erst erzeugen:\n    node scripts/kanal-assets.mjs --was alle --sprache ${LANG}`);
  process.exit(1);
}

// --- 1 · Die Masse muessen exakt stimmen ------------------------------------
// Eine Plattform, die ein falsches Mass bekommt, skaliert und schneidet
// zusaetzlich — dann greift keine der Schutzzonen mehr.
const SOLL = [
  [AVATAR, 1080, 1080], [FB, 1640, 856],
  ...IG.map((f) => [f, 1080, 1350]), [TIKTOK, 1080, 1920],
];

let alleMasseOk = true;
console.log('Masse');
for (const [datei, b, h] of SOLL) {
  const m = await sharp(datei).metadata();
  const ok = m.width === b && m.height === h;
  if (!ok) alleMasseOk = false;
  console.log(`  ${ok ? '✓' : '✗'} ${datei.split('/').pop().padEnd(24)} ${m.width}×${m.height}`
    + (ok ? '' : `  ERWARTET ${b}×${h}`));
}

// --- 2 · Avatar in den Groessen, in denen es wirklich erscheint --------------
// Rund beschnitten, denn alle drei Kanaele zeigen es als Kreis.
const kreis = (d) => Buffer.from(
  `<svg width="${d}" height="${d}"><circle cx="${d / 2}" cy="${d / 2}" r="${d / 2}" fill="#fff"/></svg>`,
);

for (const d of [176, 110]) {
  await sharp(AVATAR).resize(d, d)
    .composite([{ input: kreis(d), blend: 'dest-in' }])
    .png().toFile(join(ZIEL, `avatar-${d}.png`));
}
console.log('\nAvatar  ✓ avatar-176.png (Facebook Rechner)  ✓ avatar-110.png (Instagram Handy)');

// --- 3 · Facebooks zwei Beschnitte nachstellen ------------------------------
// Facebook skaliert auf die Anzeigeflaeche und schneidet mittig weg. Wer das
// nicht nachstellt, merkt erst nach dem Hochladen, dass unten ein Wort fehlt.
const fbCrops = [
  ['fb-desktop.png', 820, 312],
  ['fb-mobil.png', 640, 360],
];
for (const [name, b, h] of fbCrops) {
  await sharp(FB).resize(b, h, { fit: 'cover', position: 'centre' })
    .png().toFile(join(ZIEL, name));
}
console.log('Facebook  ✓ fb-desktop.png (820×312)  ✓ fb-mobil.png (640×360)');

// --- 4 · Das Instagram-Raster mit echter Fuge -------------------------------
// ⚠ Die Fuge ist der Grund fuer die Probe: Laeuft ein Buchstabe darueber,
// ist er im Profil zerschnitten. Nur die Amber-Linie darf durchlaufen.
const FUGE = 8;
const kachelB = 1080, kachelH = 1350;
const rasterB = kachelB * 3 + FUGE * 2;

await sharp({
  create: { width: rasterB, height: kachelH, channels: 3, background: '#000' },
})
  .composite(IG.map((f, i) => ({ input: f, left: i * (kachelB + FUGE), top: 0 })))
  .png().toFile(join(ZIEL, 'ig-raster.png'));
console.log(`Instagram  ✓ ig-raster.png (${rasterB}×${kachelH}, Fuge ${FUGE} px)`);

// --- 5 · TikToks Ueberdeckung ----------------------------------------------
// TikTok legt unten Name, Caption und Ton darueber, rechts die Knopfleiste.
// Die Probe schwaerzt genau diese Zonen: Was danach fehlt, fehlt auch im Feed.
const tB = 1080, tH = 1920;
const UNTEN = Math.round(tH * 0.30), RECHTS = 170;
await sharp(TIKTOK).composite([
  {
    input: Buffer.from(`<svg width="${tB}" height="${UNTEN}">
      <rect width="${tB}" height="${UNTEN}" fill="rgba(255,0,0,.55)"/></svg>`),
    left: 0, top: tH - UNTEN,
  },
  {
    input: Buffer.from(`<svg width="${RECHTS}" height="${tH}">
      <rect width="${RECHTS}" height="${tH}" fill="rgba(255,0,0,.55)"/></svg>`),
    left: tB - RECHTS, top: 0,
  },
]).png().toFile(join(ZIEL, 'tiktok-ueberdeckt.png'));
console.log('TikTok  ✓ tiktok-ueberdeckt.png (rot = TikToks eigene Oberflaeche)');

// --- 6 · Zeichenzahlen der Bios --------------------------------------------
const { pruefeTexte } = await import('./kanal-texte.mjs');
console.log('\nBios');
let alleTexteOk = true;
for (const b of pruefeTexte()) {
  if (!b.ok) alleTexteOk = false;
  console.log(`  ${b.ok ? '✓' : '✗'} ${b.sprache}/${b.kanal.padEnd(10)} ${String(b.n).padStart(3)} / ${b.grenze}`);
}

console.log(`\n${alleMasseOk && alleTexteOk ? '✓ alles in Ordnung' : '✗ es gibt Abweichungen'}`);
console.log(`Belege in ${ZIEL}`);
process.exit(alleMasseOk && alleTexteOk ? 0 : 1);
