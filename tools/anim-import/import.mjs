// Uebernimmt die Animationen aus dem Vital-Animations-Gratispaket in die App.
//
//   node tools/anim-import/import.mjs <quellordner>
//
// Der Quellordner enthaelt die MP4s des Pakets, benannt nach ihrer ID
// (`0051.mp4`) oder mit vorangestelltem Praefix (`abc123-0051.mp4`) — so
// kommen sie aus dem Chat-Upload.
//
// Was passiert:
//  1. Nur Dateien uebernehmen, die in zuordnung.mjs eine FullRep-Uebung haben.
//  2. Auf App-Groesse bringen: 480x480, 24 fps, CRF 30. Aus 1080p und bis zu
//     6,7 MB werden so rund 90 KB — bei 36 Uebungen gut 3 MB statt 150 MB.
//     Die Lizenz erlaubt das ausdruecklich („crop, resize, compress,
//     transcode … for technical compatibility or presentation purposes").
//  3. Erstes Bild als Poster ablegen, damit die Kachel sofort etwas zeigt.
//  4. Ergebnis nach public/exercise-demos-anim/<Ordner>/.
//
// ⚠ Die Videos duerfen laut Lizenz NICHT als einzelne Dateien zum Download
// angeboten werden. Auslieferung durch die App ist erlaubt — also nirgends
// direkt verlinken, keine Verzeichnisauflistung, kein Download-Knopf.
import { readdirSync, mkdirSync, existsSync, writeFileSync, statSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { execFileSync } from 'child_process';
import { zuordnung, direkt, ausnahmen } from './zuordnung.mjs';

const HIER = dirname(fileURLToPath(import.meta.url));
const WURZEL = join(HIER, '../..');
const ZIEL = join(WURZEL, 'public/exercise-demos-anim');

// `--nur-karte` (26.09.2026): nur src/data/exerciseAnimations.js aus den schon
// vorhandenen Ordnern neu schreiben — ohne Quellvideos, ohne Umkodieren. Die
// Quell-MP4s liegen nicht im Repo; eine geaenderte `ausnahmen`-Liste waere
// sonst nicht einzuspielen.
const NUR_KARTE = process.argv.includes('--nur-karte');
// Erst hier laden: Der Karten-Modus braucht kein ffmpeg, und `ffmpeg-static`
// ist keine feste Abhaengigkeit der App.
const ffmpegPfad = NUR_KARTE ? null : (await import('ffmpeg-static')).default;
const quelle = NUR_KARTE ? null : process.argv[2];
if (!NUR_KARTE && (!quelle || !existsSync(quelle))) {
  console.error('Quellordner fehlt. Aufruf: node tools/anim-import/import.mjs <ordner>');
  console.error('Nur die Zuordnung neu schreiben: node tools/anim-import/import.mjs --nur-karte');
  process.exit(1);
}

// Datei je ID finden — mit oder ohne Upload-Praefix.
const dateien = {};
for (const n of quelle ? readdirSync(quelle) : []) {
  const m = n.match(/(?:^|-)(\d{4})\.mp4$/i);
  if (m) dateien[m[1]] = join(quelle, n);
}

mkdirSync(ZIEL, { recursive: true });
let ok = 0, fehlend = [], gesamt = 0;

const auftraege = NUR_KARTE ? [] : [
  ...Object.entries(zuordnung),
  ...Object.entries(direkt), // Ordnername = Uebungs-ID
];
for (const [id, ordner] of auftraege) {
  const quellDatei = dateien[id];
  if (!quellDatei) { fehlend.push(id); continue; }
  const ausgabe = join(ZIEL, ordner);
  mkdirSync(ausgabe, { recursive: true });
  const mp4 = join(ausgabe, 'demo.mp4');
  execFileSync(ffmpegPfad, [
    '-y', '-v', 'error', '-i', quellDatei,
    '-vf', 'scale=480:480,fps=24',
    '-c:v', 'libx264', '-pix_fmt', 'yuv420p', '-crf', '30', '-preset', 'slow',
    '-movflags', '+faststart', '-an', mp4,
  ]);
  execFileSync(ffmpegPfad, [
    '-y', '-v', 'error', '-i', quellDatei, '-vf', 'scale=480:480',
    '-frames:v', '1', '-q:v', '5', join(ausgabe, 'poster.jpg'),
  ]);
  const kb = statSync(mp4).size / 1024;
  gesamt += kb;
  ok += 1;
  console.log(`  ${id} → ${ordner.padEnd(40)} ${kb.toFixed(0)} KB`);
}

// Zuordnung fuer die App: UEBUNGS-ID → Animationsordner.
// Ueber die Uebungs-ID statt ueber den Fotoordner, weil Uebungen ohne Foto
// (Ergometer, Seitheben Maschine, die vier neuen) sonst leer ausgingen.
const demos = (await import('../../src/data/exerciseDemos.js')).default;
const karte = {};
for (const [id, ordner] of Object.entries(zuordnung)) {
  if (!existsSync(join(ZIEL, ordner, 'demo.mp4'))) continue;
  // Mehrere Uebungen koennen sich einen Fotoordner teilen — alle bekommen die
  // Animation.
  for (const [uebungsId, o] of Object.entries(demos)) {
    if (o === ordner && !ausnahmen.has(uebungsId)) karte[uebungsId] = ordner;
  }
}
for (const [id, uebungsId] of Object.entries(direkt)) {
  if (existsSync(join(ZIEL, uebungsId, 'demo.mp4'))) karte[uebungsId] = uebungsId;
}
const sortiert = Object.fromEntries(Object.entries(karte).sort(([a], [b]) => a.localeCompare(b)));
writeFileSync(join(HIER, '../../src/data/exerciseAnimations.js'),
  `// AUTOMATISCH ERZEUGT von tools/anim-import/import.mjs — nicht von Hand aendern.\n`
  + `// Uebungs-ID → Ordner unter public/exercise-demos-anim/.\n`
  + `// Quelle: Gratis-Paket von Vital Animations, Lizenz siehe\n`
  + `// store-assets/lizenzen/vital-animations/. Alles ohne Eintrag zeigt die Fotos.\n`
  + `const animationen = ${JSON.stringify(sortiert, null, 2)};\n\n`
  + `export default animationen;\n`);

console.log(`\n${ok} uebernommen, ${(gesamt / 1024).toFixed(1)} MB gesamt.`);
if (fehlend.length) console.log(`Nicht gefunden: ${fehlend.join(', ')}`);
