// Verkleinert einen Store-Screenshot fuer die Bio-Seite (public/get.html).
//
// Warum nicht das Original einbinden: store-assets/ios/01-dashboard.png ist
// 1320x2868 und 318 KB. Auf einer Seite, die im mobilen Netz aus einer
// Instagram-Bio heraus geladen wird, ist das die Ladezeit, die ueber den
// Download entscheidet. 560 px Breite reicht fuer die Darstellung mit
// deviceScaleFactor 2; WebP spart nochmal rund zwei Drittel.
//
// Aufruf: node scripts/bio-screenshot.mjs
import sharp from 'sharp';
import { mkdirSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const WURZEL = join(dirname(fileURLToPath(import.meta.url)), '..');
const QUELLE = join(WURZEL, 'store-assets/ios/01-dashboard.png');
const ZIEL_ORDNER = join(WURZEL, 'public/bilder');
mkdirSync(ZIEL_ORDNER, { recursive: true });

// Unten wird abgeschnitten: Der Screenshot zeigt am Fuss ein halb angeschnittenes
// Gewichts-Diagramm und die Tab-Leiste. Angeschnittene Inhalte lesen sich auf
// einer Werbeseite wie ein Darstellungsfehler — lieber sauber bei 4:5 kappen.
const bild = sharp(QUELLE);
const { width, height } = await bild.metadata();
const hoeheBeschnitten = Math.round(width * 2.0); // 1:2, endet ueber dem Diagramm

const ziel = join(ZIEL_ORDNER, 'dashboard.webp');
const info = await sharp(QUELLE)
  .extract({ left: 0, top: 0, width, height: Math.min(hoeheBeschnitten, height) })
  .resize({ width: 560 })
  .webp({ quality: 82 })
  .toFile(ziel);

console.log(`${ziel}`);
console.log(`  ${info.width}x${info.height}, ${(info.size / 1024).toFixed(0)} KB (Original: ${width}x${height})`);
