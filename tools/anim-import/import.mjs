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
import ffmpegPfad from 'ffmpeg-static';
import { zuordnung } from './zuordnung.mjs';

const HIER = dirname(fileURLToPath(import.meta.url));
const WURZEL = join(HIER, '../..');
const ZIEL = join(WURZEL, 'public/exercise-demos-anim');

const quelle = process.argv[2];
if (!quelle || !existsSync(quelle)) {
  console.error('Quellordner fehlt. Aufruf: node tools/anim-import/import.mjs <ordner>');
  process.exit(1);
}

// Datei je ID finden — mit oder ohne Upload-Praefix.
const dateien = {};
for (const n of readdirSync(quelle)) {
  const m = n.match(/(?:^|-)(\d{4})\.mp4$/i);
  if (m) dateien[m[1]] = join(quelle, n);
}

mkdirSync(ZIEL, { recursive: true });
let ok = 0, fehlend = [], gesamt = 0;

for (const [id, ordner] of Object.entries(zuordnung)) {
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

// Liste fuer die App: welche Uebungsordner haben eine Animation.
const ordnerListe = Object.values(zuordnung).filter((o) => existsSync(join(ZIEL, o, 'demo.mp4'))).sort();
writeFileSync(join(HIER, '../../src/data/exerciseAnimations.js'),
  `// AUTOMATISCH ERZEUGT von tools/anim-import/import.mjs — nicht von Hand aendern.\n`
  + `// Uebungsordner mit einer Animation aus dem Vital-Animations-Gratispaket.\n`
  + `// Alles andere zeigt weiter die Fotos.\n`
  + `const mitAnimation = new Set(${JSON.stringify(ordnerListe, null, 2)});\n\n`
  + `export default mitAnimation;\n`);

console.log(`\n${ok} uebernommen, ${(gesamt / 1024).toFixed(1)} MB gesamt.`);
if (fehlend.length) console.log(`Nicht gefunden: ${fehlend.join(', ')}`);
