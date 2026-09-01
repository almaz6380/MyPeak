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
// ⚠ GELD: Jeder Lauf kostet echtes fal.ai-Guthaben. Ohne --los wird NICHTS
// gesendet, nur gerechnet. Der Preis je Bild haengt am Modell:
//   fal-ai/flux/dev      $0.025/MP  (Probe von FullRep-Social: beste Qualitaet)
//   fal-ai/flux/schnell  $0.003/MP  (patzt bei Anatomie — s. HERKUNFT.md)
// Bildgroesse 832x1152 = 0.96 MP → zaehlt als 1 MP (fal rundet AUF).
//
//   node scripts/uebungs-illustrationen.mjs                  # nur Plan + Kosten
//   node scripts/uebungs-illustrationen.mjs --probe --los    # 3 Uebungen echt
//   node scripts/uebungs-illustrationen.mjs --los            # alle fehlenden
//
// Ergebnis landet in public/exercise-demos-neu/ (NICHT direkt im Live-Ordner:
// erst von Auge pruefen — Logos! —, dann bewusst umziehen). Jede Datei wird in
// HERKUNFT-Zeilen in public/exercise-demos-neu/HERKUNFT.md protokolliert,
// dieselbe Pflicht wie bei den Social-Fotos.
import { readdirSync, mkdirSync, writeFileSync, appendFileSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const WURZEL = join(dirname(fileURLToPath(import.meta.url)), '..');
const QUELLE = join(WURZEL, 'public/exercise-demos');
const ZIEL = join(WURZEL, 'public/exercise-demos-neu');

const MODELL = 'fal-ai/flux/dev';
const PREIS_JE_BILD = 0.025; // 832x1152 < 1 MP, fal rundet auf 1 MP auf
const GROESSE = { width: 832, height: 1152 };

const los = process.argv.includes('--los');
const probe = process.argv.includes('--probe');

const uebungen = readdirSync(QUELLE, { withFileTypes: true })
  .filter((d) => d.isDirectory())
  .map((d) => d.name);

const auswahl = probe ? uebungen.slice(0, 3) : uebungen;
const posen = ['starting position, beginning of the movement', 'end position, peak contraction of the movement'];

// Aus dem Ordnernamen wird der Prompt-Baustein: "Barbell_Bench_Press" →
// "barbell bench press". Das reicht — die Namen SIND die Uebungsnamen.
const alsText = (ordner) => ordner.replaceAll('_', ' ').toLowerCase();

const offen = [];
for (const u of auswahl) {
  for (let i = 0; i < posen.length; i++) {
    const ziel = join(ZIEL, u, `${i}.jpg`);
    if (!existsSync(ziel)) offen.push({ u, i, ziel });
  }
}

const kosten = offen.length * PREIS_JE_BILD;
console.log(`${auswahl.length} Uebungen, ${offen.length} fehlende Bilder, Modell ${MODELL}`);
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

const prompt = (uebung, pose) =>
  `clean vector-style fitness illustration of a person performing ${uebung}, ${pose}, ` +
  `flat design with subtle shading, dark charcoal background #0a0a0a, amber accent color #fbbf24, ` +
  `simple gym equipment, correct exercise form and anatomy, full body visible, centered composition, ` +
  `no text, no logos, no watermarks, no brand marks on clothing or equipment`;

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
for (const { u, i, ziel } of offen) {
  n += 1;
  process.stdout.write(`[${n}/${offen.length}] ${u}/${i}.jpg … `);
  try {
    const res = await fetch(`https://fal.run/${MODELL}`, {
      method: 'POST',
      headers: { Authorization: `Key ${KEY}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        prompt: prompt(alsText(u), posen[i]),
        image_size: GROESSE,
        num_images: 1,
        seed: 7000 + n, // reproduzierbar; neuer Seed = neues Bild bei Ausschuss
      }),
      signal: AbortSignal.timeout(120000),
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}: ${(await res.text()).slice(0, 200)}`);
    const data = await res.json();
    const url = data?.images?.[0]?.url;
    if (!url) throw new Error('keine Bild-URL in der Antwort');
    const bild = Buffer.from(await (await fetch(url)).arrayBuffer());
    mkdirSync(join(ZIEL, u), { recursive: true });
    writeFileSync(ziel, bild);
    appendFileSync(protokoll, `| ${u}/${i}.jpg | ${MODELL}, Seed ${7000 + n} | ${new Date().toISOString().slice(0, 10)} | $${PREIS_JE_BILD} |\n`);
    console.log(`ok (${(bild.length / 1024).toFixed(0)} KB)`);
  } catch (e) {
    console.log(`FEHLER: ${e.message}`);
  }
}
console.log(`\nFertig. Ausgaben: ~$${(n * PREIS_JE_BILD).toFixed(2)}. Bilder liegen in public/exercise-demos-neu/ — von Auge pruefen, dann umziehen.`);
