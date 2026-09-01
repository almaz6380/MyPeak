// Ersetzt die Uebungsfotos unklarer Herkunft durch selbst erzeugte
// ILLUSTRATIONEN (fal.ai) — je Uebung zwei Bilder (Start-/Endposition), im
// selben Ordnerschema wie public/exercise-demos/<Ordner>/{0,1}.jpg.
//
// Warum Illustrationen statt Fotorealismus:
// 1. Die alten Fotos fliegen raus, WEIL ihre Rechtekette fehlt
//    (store-assets/social/fotos/HERKUNFT.md). Selbst erzeugt = geklaert.
// 2. Fotorealistische KI-MENSCHEN braechten die Kennzeichnungsfrage in die
//    App (EU AI Act Art. 50); ein erkennbarer Illustrationsstil nicht.
// 3. Ein einheitlicher Stil wirkt gewollt — 162 zusammengesammelte Fotos
//    wirkten es nie.
//
// Lehren aus der ERSTEN Probe (01.09.2026, 6 Bilder, alle 6 verworfen):
// 1. Der rohe Ordnername reicht NICHT als Prompt. "Air_Bike" ist bei uns der
//    Bicycle Crunch am Boden — flux malte ein Spinning-Rad; beim
//    "Alternating Deltoid Raise" erfand es eine Langhantel. Name, Geraet,
//    Muskelgruppe und Beschreibung kommen jetzt aus der Uebungsdatenbank.
// 2. Zwei unabhaengige Generierungen zeigen zwei verschiedene Personen —
//    als Start/Ende-Paar unbrauchbar. Bild 1 entsteht deshalb per
//    IMAGE-TO-IMAGE aus Bild 0 (gleiche Person, gleiches Geraet, andere
//    Phase der Bewegung).
//
// ⚠ GELD: Jeder Lauf kostet echtes fal.ai-Guthaben. Ohne --los wird NICHTS
// gesendet, nur gerechnet. Der Preis je Bild haengt am Modell:
//   fal-ai/flux/dev      $0.025/MP  (Probe von FullRep-Social: beste Qualitaet)
//   fal-ai/flux/schnell  $0.003/MP  (patzt bei Anatomie — s. HERKUNFT.md)
// Bildgroesse 832x1152 = 0.96 MP → zaehlt als 1 MP (fal rundet AUF).
// Image-to-Image kostet dasselbe je Megapixel.
//
//   node scripts/uebungs-illustrationen.mjs                  # nur Plan + Kosten
//   node scripts/uebungs-illustrationen.mjs --probe --los    # 3 Uebungen echt
//   node scripts/uebungs-illustrationen.mjs --los            # alle fehlenden
//
// Ergebnis landet in public/exercise-demos-neu/ (NICHT direkt im Live-Ordner:
// erst von Auge pruefen — Logos! —, dann bewusst umziehen). Jede Datei wird in
// HERKUNFT-Zeilen in public/exercise-demos-neu/HERKUNFT.md protokolliert,
// dieselbe Pflicht wie bei den Social-Fotos.
import { readdirSync, mkdirSync, writeFileSync, appendFileSync, existsSync, readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import exerciseDemos from '../src/data/exerciseDemos.js';
import exercises from '../src/data/exercises.js';

const WURZEL = join(dirname(fileURLToPath(import.meta.url)), '..');
const QUELLE = join(WURZEL, 'public/exercise-demos');
const ZIEL = join(WURZEL, 'public/exercise-demos-neu');

const MODELL = 'fal-ai/flux/dev';
const MODELL_I2I = 'fal-ai/flux/dev/image-to-image';
const PREIS_JE_BILD = 0.025; // 832x1152 < 1 MP, fal rundet auf 1 MP auf
const GROESSE = { width: 832, height: 1152 };

const los = process.argv.includes('--los');
const probe = process.argv.includes('--probe');

// Ordner -> Uebungsdaten. Erster Treffer genuegt; mehrere IDs teilen sich
// teils einen Ordner (cable-crossover und cable-flyes-high z. B.).
const enTexte = JSON.parse(readFileSync(join(WURZEL, 'src/i18n/locales/en.json'), 'utf8')).exercises;
const ordnerZuUebung = {};
for (const [id, ordner] of Object.entries(exerciseDemos)) {
  if (ordnerZuUebung[ordner]) continue;
  const ex = exercises.find((e) => e.id === id);
  if (!ex) continue;
  const schluessel = ex.nameKey.replace('exercises.', '');
  ordnerZuUebung[ordner] = {
    name: enTexte[schluessel] || id.replaceAll('-', ' '),
    beschreibung: enTexte[`${schluessel}Desc`] || '',
    geraet: ex.equipment,
    muskel: ex.muscleGroup,
  };
}

const alleOrdner = readdirSync(QUELLE, { withFileTypes: true })
  .filter((d) => d.isDirectory())
  .map((d) => d.name);
const ohneDaten = alleOrdner.filter((o) => !ordnerZuUebung[o]);
if (ohneDaten.length) {
  console.log(`⚠ ${ohneDaten.length} Ordner ohne Eintrag in der Uebungsdatenbank (werden uebersprungen):`);
  console.log('  ' + ohneDaten.join(', '));
}
const uebungen = alleOrdner.filter((o) => ordnerZuUebung[o]);

const auswahl = probe ? uebungen.slice(0, 3) : uebungen;

// Fehlt in einem Paar irgendetwas, wird das GANZE Paar neu erzeugt: Bild 1
// braucht Bild 0 als Vorlage, und ein altes Bild 0 neben einem neuen Bild 1
// koennte eine andere Person zeigen.
const offen = auswahl.filter((u) =>
  !existsSync(join(ZIEL, u, '0.jpg')) || !existsSync(join(ZIEL, u, '1.jpg')));

const kosten = offen.length * 2 * PREIS_JE_BILD;
console.log(`${auswahl.length} Uebungen, ${offen.length} offene Paare (${offen.length * 2} Bilder), Modelle ${MODELL} + i2i`);
console.log(`Kosten bei diesem Lauf: ~$${kosten.toFixed(2)}`);
if (!los) {
  console.log('\nTrockenlauf — nichts gesendet. Echt erzeugen: --los (Probe: --probe --los).');
  process.exit(0);
}

const KEY = process.env.FAL_KEY;
if (!KEY) {
  console.error('FAL_KEY fehlt (Umgebungsvariable der Claude-Umgebung).');
  process.exit(1);
}

const STIL =
  `clean flat vector-style fitness illustration, subtle shading, ` +
  `dark charcoal background, amber and orange accent colors, ` +
  `correct exercise form and anatomy, full body visible, centered composition, ` +
  `no text, no logos, no watermarks, no brand marks on clothing or equipment`;

// Bild 0: Text-zu-Bild mit allem, was die Datenbank ueber die Uebung weiss.
const promptStart = (u) => {
  const geraetText = u.geraet === 'bodyweight' ? 'no equipment, bodyweight only' : `using a ${u.geraet}`;
  return `${STIL}. A person performing the exercise "${u.name}" (${geraetText}, targets ${u.muskel}). ` +
    `How the exercise works: ${u.beschreibung} ` +
    `Show the STARTING position of the movement.`;
};

// Bild 1: Image-to-Image aus Bild 0 — gleiche Person, gleiches Geraet,
// nur die Phase der Bewegung aendert sich.
const promptEnde = (u) =>
  `${STIL}. The SAME person, same clothing, same equipment, same camera angle as in the input image, ` +
  `now at the END position (peak contraction) of the exercise "${u.name}". ` +
  `How the exercise works: ${u.beschreibung}`;

async function erzeugen(url, body) {
  const res = await fetch(url, {
    method: 'POST',
    headers: { Authorization: `Key ${KEY}`, 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
    signal: AbortSignal.timeout(180000),
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}: ${(await res.text()).slice(0, 200)}`);
  const data = await res.json();
  const bildUrl = data?.images?.[0]?.url;
  if (!bildUrl) throw new Error('keine Bild-URL in der Antwort');
  return bildUrl;
}

mkdirSync(ZIEL, { recursive: true });
const protokoll = join(ZIEL, 'HERKUNFT.md');
if (!existsSync(protokoll)) {
  writeFileSync(protokoll,
    '# Herkunft: selbst erzeugte Uebungs-Illustrationen\n\n' +
    '⚠ Vor dem Umzug in exercise-demos/ JEDES Bild von Auge pruefen: Logos,\n' +
    'Pseudo-Schrift, kaputte Anatomie. Verwerfen statt retuschieren.\n\n' +
    '| Datei | Modell | Datum | Kosten |\n|---|---|---|---|\n');
}

let n = 0;
let ausgegeben = 0;
for (const ordner of offen) {
  n += 1;
  const u = ordnerZuUebung[ordner];
  const seed = 7000 + n;
  process.stdout.write(`[${n}/${offen.length}] ${ordner} („${u.name}") … `);
  try {
    // Start-Bild
    const startUrl = await erzeugen(`https://fal.run/${MODELL}`, {
      prompt: promptStart(u),
      image_size: GROESSE,
      num_images: 1,
      seed, // reproduzierbar; neuer Seed = neues Bild bei Ausschuss
    });
    const startBild = Buffer.from(await (await fetch(startUrl)).arrayBuffer());
    ausgegeben += PREIS_JE_BILD;

    // End-Bild aus dem Start-Bild. strength 0.85: genug Freiheit fuer die
    // neue Koerperhaltung, aber Person/Stil/Geraet bleiben erhalten.
    const endeUrl = await erzeugen(`https://fal.run/${MODELL_I2I}`, {
      prompt: promptEnde(u),
      image_url: startUrl,
      strength: 0.85,
      num_images: 1,
      seed,
    });
    const endeBild = Buffer.from(await (await fetch(endeUrl)).arrayBuffer());
    ausgegeben += PREIS_JE_BILD;

    // Erst schreiben, wenn BEIDE da sind — sonst bliebe ein halbes Paar liegen.
    mkdirSync(join(ZIEL, ordner), { recursive: true });
    writeFileSync(join(ZIEL, ordner, '0.jpg'), startBild);
    writeFileSync(join(ZIEL, ordner, '1.jpg'), endeBild);
    const datum = new Date().toISOString().slice(0, 10);
    appendFileSync(protokoll,
      `| ${ordner}/0.jpg | ${MODELL}, Seed ${seed} | ${datum} | $${PREIS_JE_BILD} |\n` +
      `| ${ordner}/1.jpg | ${MODELL_I2I} aus 0.jpg, Seed ${seed} | ${datum} | $${PREIS_JE_BILD} |\n`);
    console.log(`ok (${(startBild.length / 1024).toFixed(0)} + ${(endeBild.length / 1024).toFixed(0)} KB)`);
  } catch (e) {
    console.log(`FEHLER: ${e.message}`);
  }
}
console.log(`\nFertig. Ausgaben: ~$${ausgegeben.toFixed(2)}. Bilder liegen in public/exercise-demos-neu/ — von Auge pruefen, dann umziehen.`);
