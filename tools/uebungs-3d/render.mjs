// Treiber des 3D-Uebungsrenderers: baut die Seite, faehrt Frame fuer Frame
// durch, schiesst Screenshots und setzt sie mit ffmpeg zu einem loopbaren
// MP4 zusammen (plus Standbild als Poster).
//
//   node tools/uebungs-3d/render.mjs --alle           # alle 162 Uebungen
//   node tools/uebungs-3d/render.mjs --probe          # Querschnitt, 12 Stueck
//   node tools/uebungs-3d/render.mjs --muster kniebeuge --name Test
//   … --neu erzwingt Neurendern statt Ueberspringen
//
// Kostet nichts — alles laeuft lokal. Chromium kommt aus PLAYWRIGHT_BROWSERS_PATH
// (in der Cloud-Sitzung /opt/pw-browsers), three.js wird als eingebettetes
// CJS-Bundle in die Seite geschrieben: page.setContent()-Seiten haben keinen
// Origin, ein <script src> mit file:// laedt dort nicht.
import { readFileSync, readdirSync, mkdirSync, rmSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { execFileSync } from 'child_process';
import { chromium } from 'playwright';
import ffmpegPfad from 'ffmpeg-static';
import { muster as MUSTER } from './bewegungen.mjs';

const HIER = dirname(fileURLToPath(import.meta.url));
const WURZEL = join(HIER, '../..');
const QUELLE = join(WURZEL, 'public/exercise-demos');
const ZIEL = join(WURZEL, 'public/exercise-demos-3d');

const BREITE = 720;
const HOEHE = 720;
const FRAMES = 48;      // 2,0 s bei 24 fps
const FPS = 24;

const argv = process.argv.slice(2);
const wert = (flagge) => {
  const i = argv.indexOf(flagge);
  return i >= 0 ? argv[i + 1] : null;
};

const dreiJs = readFileSync(join(WURZEL, 'node_modules/three/build/three.cjs'), 'utf8');
const szeneJs = readFileSync(join(HIER, 'szene.js'), 'utf8');

// three.cjs ist ein in sich geschlossenes CommonJS-Bundle (keine require-
// Aufrufe, geprueft). Mit einer Mini-Huelle laeuft es in einem normalen
// <script> und legt THREE global ab.
const seite = `<!doctype html><html><head><meta charset="utf-8"><style>
  html,body{margin:0;padding:0;background:#0d1018;overflow:hidden}
  canvas{display:block;width:${BREITE}px;height:${HOEHE}px}
</style></head><body>
<canvas id="c" width="${BREITE}" height="${HOEHE}"></canvas>
<script>
  var module = { exports: {} }, exports = module.exports;
  ${dreiJs}
  var THREE = module.exports;
</script>
<script>
  ${szeneJs}
</script>
</body></html>`;

async function rendern(browser, eintrag) {
  const b = MUSTER[eintrag.muster];
  if (!b) throw new Error(`Muster "${eintrag.muster}" gibt es nicht`);

  const seitenObj = await browser.newPage({ viewport: { width: BREITE, height: HOEHE } });
  const fehler = [];
  seitenObj.on('pageerror', (e) => fehler.push(String(e)));
  seitenObj.on('console', (m) => { if (m.type() === 'error') fehler.push(m.text()); });
  await seitenObj.setContent(seite, { waitUntil: 'load' });

  const ok = await seitenObj.evaluate(
    (cfg) => window.aufbauen(cfg),
    { breite: BREITE, hoehe: HOEHE, frames: FRAMES, bewegung: b, muskel: eintrag.muskel },
  ).catch((e) => { fehler.push(String(e)); return false; });
  if (!ok) throw new Error(`Aufbau fehlgeschlagen: ${fehler.join(' | ') || 'unbekannt'}`);

  const roh = join(ZIEL, '.frames', eintrag.ordner);
  rmSync(roh, { recursive: true, force: true });
  mkdirSync(roh, { recursive: true });

  for (let n = 0; n < FRAMES; n++) {
    await seitenObj.evaluate((i) => window.setFrame(i), n);
    await seitenObj.locator('#c').screenshot({ path: join(roh, `f${String(n).padStart(3, '0')}.png`) });
  }
  if (fehler.length) throw new Error(`Fehler in der Seite: ${fehler.slice(0, 3).join(' | ')}`);
  await seitenObj.close();

  const ordner = join(ZIEL, eintrag.ordner);
  mkdirSync(ordner, { recursive: true });
  const mp4 = join(ordner, 'demo.mp4');
  // yuv420p + gerade Kantenlaengen: sonst spielt es auf iOS nicht ab.
  execFileSync(ffmpegPfad, [
    '-y', '-v', 'error', '-framerate', String(FPS), '-i', join(roh, 'f%03d.png'),
    '-c:v', 'libx264', '-pix_fmt', 'yuv420p', '-crf', '26', '-preset', 'slow',
    '-movflags', '+faststart', mp4,
  ]);
  execFileSync(ffmpegPfad, [
    '-y', '-v', 'error', '-i', join(roh, 'f000.png'), '-q:v', '4', join(ordner, 'poster.jpg'),
  ]);
  rmSync(roh, { recursive: true, force: true });
  return mp4;
}

// Alle Uebungen: Muster aus zuordnung.mjs, Zielmuskel aus exercises.js.
// Der Muskel wird bewusst NICHT ein zweites Mal gepflegt — er steht dort
// schon und wird in der App angezeigt.
async function alleAuftraege() {
  const { zuordnung } = await import('./zuordnung.mjs');
  const exercises = (await import('../../src/data/exercises.js')).default;
  const demos = (await import('../../src/data/exerciseDemos.js')).default;
  const ordnerZuMuskel = {};
  for (const [id, ordner] of Object.entries(demos)) {
    if (ordnerZuMuskel[ordner]) continue;
    const e = exercises.find((x) => x.id === id);
    if (e) ordnerZuMuskel[ordner] = e.muscleGroup || '';
  }
  const ordner = readdirSync(QUELLE, { withFileTypes: true })
    .filter((d) => d.isDirectory()).map((d) => d.name).sort();
  const fehlend = ordner.filter((o) => !zuordnung[o]);
  if (fehlend.length) console.log(`⚠ ohne Zuordnung, uebersprungen: ${fehlend.join(', ')}`);
  return ordner.filter((o) => zuordnung[o])
    .map((o) => ({ ordner: o, muster: zuordnung[o], muskel: ordnerZuMuskel[o] || '' }));
}

const PROBE_ORDNER = [
  'Barbell_Curl', 'Side_Lateral_Raise', 'Bodyweight_Squat', 'Bent_Over_Barbell_Row',
  'Barbell_Bench_Press_-_Medium_Grip', 'Pullups', 'Triceps_Pushdown', 'Leg_Press',
  'Plank', 'Standing_Calf_Raises', 'Pushups', 'Barbell_Deadlift',
];

const nurEins = wert('--muster');
const alle = argv.includes('--alle') ? await alleAuftraege()
  : argv.includes('--probe') ? (await alleAuftraege()).filter((a) => PROBE_ORDNER.includes(a.ordner))
    : nurEins ? [{ ordner: wert('--name') || nurEins, muster: nurEins, muskel: wert('--muskel') || 'chest' }]
      : [];

if (!alle.length) {
  console.error('Nichts zu tun. --alle, --probe oder --muster <name> [--muskel <gruppe>] [--name <ordner>]');
  process.exit(1);
}
// Bereits gerenderte ueberspringen, damit ein abgebrochener Lauf fortsetzbar
// ist — 162 Videos sind rund eine Stunde Rechenzeit. `--neu` rendert alles neu.
// ⚠ Hier NICHT dasselbe Array filtern und dann leeren: mit --neu zeigten beide
// Namen auf dieselbe Liste, das Leeren loeschte auch die Auswahl.
const auftraege = argv.includes('--neu') ? alle
  : alle.filter((a) => !existsSync(join(ZIEL, a.ordner, 'demo.mp4')));
if (auftraege.length < alle.length) {
  console.log(`${alle.length - auftraege.length} bereits vorhanden, ${auftraege.length} offen (--neu erzwingt alles).`);
}
if (!auftraege.length) { console.log('Alles schon gerendert.'); process.exit(0); }

mkdirSync(ZIEL, { recursive: true });
// ⚠ Playwrights npm-Paket erwartet eine bestimmte Chromium-Bauversion. In der
// Cloud-Sitzung liegt eine andere unter /opt/pw-browsers — dann bricht launch()
// ab mit „Executable doesn't exist" und dem Rat, 150 MB nachzuladen. Statt-
// dessen den vorhandenen Browser direkt benennen (CHROMIUM_PFAD ueberschreibt).
// WebGL laeuft ohne Grafikkarte ueber SwiftShader; ohne die drei Schalter
// bleibt das Bild schwarz.
const chromiumPfad = process.env.CHROMIUM_PFAD
  || (existsSync('/opt/pw-browsers/chromium-1194/chrome-linux/chrome')
    ? '/opt/pw-browsers/chromium-1194/chrome-linux/chrome' : undefined);
const browser = await chromium.launch({
  executablePath: chromiumPfad,
  args: ['--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader'],
});
let fehlgeschlagen = 0;
for (const a of auftraege) {
  process.stdout.write(`${a.ordner} (${a.muster}, ${a.muskel}) … `);
  try {
    const p = await rendern(browser, a);
    const kb = (readFileSync(p).length / 1024).toFixed(0);
    console.log(`ok (${kb} KB)`);
  } catch (e) {
    fehlgeschlagen += 1;
    console.log(`FEHLER: ${e.message}`);
  }
}
await browser.close();
if (existsSync(join(ZIEL, '.frames'))) rmSync(join(ZIEL, '.frames'), { recursive: true, force: true });
console.log(`\nFertig. ${auftraege.length - fehlgeschlagen}/${auftraege.length} gerendert → public/exercise-demos-3d/`);
process.exit(fehlgeschlagen ? 1 : 0);
