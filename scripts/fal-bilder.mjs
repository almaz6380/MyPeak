// Bildmaterial fuer die Social-Posts erzeugen — ueber fal.ai.
//
//   FAL_KEY=… node scripts/fal-bilder.mjs --was probe --los
//   FAL_KEY=… node scripts/fal-bilder.mjs --was voll --modell dev --anzahl 12 --los
//
// ⚠ OHNE `--los` passiert nichts. Der Lauf kostet echtes Geld, und ein
// versehentlicher Aufruf beim Herumprobieren waere genau die Art Fehler, die
// man erst auf der Abrechnung sieht. Ohne die Fahne rechnet das Skript nur die
// Kosten aus und hoert auf.
//
// --- Warum es diese Datei gibt ----------------------------------------------
//
// Die Uebungsfotos aus public/exercise-demos/ gehen nicht in Werbung: Ihre
// Rechtekette ist nicht belegt (der ganze Befund steht in
// store-assets/social/fotos/HERKUNFT.md). Bilder, die hier entstehen, gehoeren
// Josef — es gibt keinen Dritten, der eines Tages die Frage stellt.
//
// --- Der Preis, und die Falle darin -----------------------------------------
//
// fal.ai rechnet je Megapixel und RUNDET AUF: „Images are billed by rounding
// up to the nearest megapixel."
//
//   flux/dev      $0,025 je MP
//   flux/schnell  $0,003 je MP
//
// Ein Bild im Postformat 1080x1350 hat 1,46 MP und kostet damit das DOPPELTE
// eines Bildes knapp unter 1 MP. Deshalb 832x1152 (0,96 MP): Die Bilder liegen
// abgedunkelt hinter Text, die 1,3-fache Vergroesserung auf 1080x1350 sieht
// niemand. Wer die Groesse hier anfasst, verdoppelt still die Rechnung.

import { writeFileSync, appendFileSync, mkdirSync, existsSync, readFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

import { rezepteMitMakros } from './social-daten.mjs';

const WURZEL = join(dirname(fileURLToPath(import.meta.url)), '..');

const arg = (n, s) => { const i = process.argv.indexOf(`--${n}`); return i === -1 ? s : process.argv[i + 1]; };
const WAS = arg('was', 'probe');
const LOS = process.argv.includes('--los');

// ⚠ Die Rezeptbilder liegen in einem EIGENEN Ordner. Sie sind etwas anderes
// als die Motive darueber: Die tragen einen Bereich (`training`,
// `supplements`) und sind austauschbar; ein Rezeptbild gehoert zu genau einem
// Rezept und wird ueber dessen `id` gefunden. In einen Topf geworfen faende
// niemand mehr das Bild zur Lasagne.
const ZIEL = WAS === 'rezepte'
  ? join(WURZEL, 'store-assets', 'social', 'fotos', 'rezepte')
  : join(WURZEL, 'store-assets', 'social', 'fotos');

// Knapp unter 1 MP — siehe Kopf. 832*1152 = 958.464 Pixel = 0,96 MP.
const BREITE = 832, HOEHE = 1152;
const MP = Math.ceil((BREITE * HOEHE) / 1_000_000);

const MODELLE = {
  dev: { pfad: 'fal-ai/flux/dev', proMP: 0.025, schritte: 28 },
  schnell: { pfad: 'fal-ai/flux/schnell', proMP: 0.003, schritte: 4 },
};

// --- Die Motive -------------------------------------------------------------
//
// Sie decken die beiden Bereiche ab, in denen ein Foto inhaltlich traegt
// (FOTO_BEREICHE in social-daten.mjs): `training` und `supplements`.
//
// Drei Vorgaben stecken in JEDEM Prompt, und zwar aus Gruenden:
//   „no text, no logos, no watermarks"  Ein erfundener Schriftzug im Bild ist
//        nicht nur haesslich, er kann fremde Marken nachahmen.
//   „dark upper third"                  Dort sitzt spaeter der Schleier mit
//        Kopfzeile und Logo. Ein helles oberes Drittel frisst die Schrift.
//   „amber rim light"                   Das Markenamber (#fbbf24). Ohne das
//        wirkt jedes Foto wie aus einer beliebigen Stockbibliothek.
const MOTIVE = [
  {
    id: 'hantel-schulterdruecken',
    bereich: 'training',
    prompt: 'athletic person performing a dumbbell shoulder press in a dark modern gym, '
      + 'dramatic low-key side lighting, amber rim light on the shoulders, deep shadows '
      + 'filling the upper third of the frame, cinematic, shallow depth of field, '
      + 'photorealistic, no text, no logos, no watermarks',
  },
  {
    id: 'langhantel-kniebeuge',
    bereich: 'training',
    prompt: 'athlete at the bottom of a barbell back squat in a dark gym, chalk dust in the air, '
      + 'amber rim light along the back, very dark upper third, low-key cinematic lighting, '
      + 'photorealistic, shallow depth of field, no text, no logos, no watermarks',
  },
  {
    id: 'cardio-lauf',
    bereich: 'training',
    prompt: 'runner mid-stride on a treadmill in a dark gym at night, motion blur in the legs, '
      + 'amber rim light, deep shadows across the upper third, cinematic low-key lighting, '
      + 'photorealistic, no text, no logos, no watermarks',
  },
  {
    id: 'protein-mahlzeit',
    bereich: 'supplements',
    prompt: 'overhead shot of a high-protein meal on a dark slate surface, grilled chicken, rice, '
      + 'broccoli and almonds, warm amber side light, deep shadows in the upper third, '
      + 'moody food photography, photorealistic, no text, no logos, no watermarks',
  },
];

// Fester Startwert. Derselbe Seed bei beiden Modellen ist die Bedingung
// dafuer, dass der Vergleich einer ist und nicht zwei zufaellige Bilder.
const SEED_BASIS = 4200;

// --- Auftrag zusammenstellen ------------------------------------------------
let auftrag;
if (WAS === 'probe') {
  // Vier Motive, jedes zweimal — einmal je Modell, gleicher Prompt, gleicher
  // Seed. Nur so laesst sich sagen, ob der Aufpreis fuer `dev` etwas bringt.
  auftrag = MOTIVE.flatMap((m, i) => ['dev', 'schnell'].map((k) => ({
    ...m, modell: k, seed: SEED_BASIS + i, datei: `probe-${m.id}-${k}.jpg`,
  })));
} else if (WAS === 'voll') {
  const k = arg('modell', 'dev');
  const n = Number(arg('anzahl', 12));
  if (!MODELLE[k]) { console.error(`✗ unbekanntes Modell: ${k}`); process.exit(1); }
  auftrag = Array.from({ length: n }, (_, i) => {
    const m = MOTIVE[i % MOTIVE.length];
    return { ...m, modell: k, seed: SEED_BASIS + 100 + i, datei: `${m.id}-${String(i + 1).padStart(2, '0')}.jpg` };
  });
} else if (WAS === 'rezepte') {
  // --- Ein Bild je Rezept ---------------------------------------------------
  //
  // Josef am 22.09.2026, nachdem er einen veroeffentlichten Beitrag wieder
  // geloescht hatte: „bei so einem post sollte ein bild von dem fertigen meal
  // im hintergrund sein".
  //
  // ⚠ Der Prompt wird AUS DEN DATEN gebaut, nicht getippt. 25 von Hand
  // geschriebene Prompts waeren 25 Gelegenheiten, ein Gericht zu beschreiben,
  // das nicht dem Rezept entspricht — und die Karte zeigt daneben die echten
  // Zutaten. Name und die ersten vier Zutaten kommen aus derselben Quelle wie
  // die Karte, also stimmen Bild und Text zwangslaeufig ueberein.
  //
  // ⚠ ENGLISCH, auch wenn die Karte deutsch ist: `ingredientsEN` steht
  // danebem, und flux versteht englische Prompts deutlich zuverlaessiger.
  //
  // ⚠ Die Mengenangaben fliegen raus („300g Hähnchenbrust" → „chicken
  // breast"). Eine Zahl im Prompt landet sonst als erfundener Schriftzug im
  // Bild — genau das, was „no text" verhindern soll.
  const k = arg('modell', 'dev');
  if (!MODELLE[k]) { console.error(`✗ unbekanntes Modell: ${k}`); process.exit(1); }
  const nur = Number(arg('anzahl', 0));
  const rezepte = rezepteMitMakros();
  auftrag = (nur > 0 ? rezepte.slice(0, nur) : rezepte).map((r, i) => {
    const zutaten = (r.ingredientsEN ?? []).slice(0, 4)
      .map((z) => z.replace(/^[\d.,/]+\s*\w*\s+/, '').replace(/\(.*?\)/g, '').trim())
      .filter(Boolean).join(', ');
    return {
      id: r.id,
      bereich: 'rezepte',
      // Dieselben drei Vorgaben wie oben, aus denselben Gruenden — dazu die
      // Aufsicht, weil ein Teller von schraeg oben erkennbar bleibt, auch wenn
      // spaeter der Schleier darueberliegt.
      prompt: `overhead food photography of ${r.nameEN.toLowerCase()}, `
        + `made with ${zutaten}, plated on a dark slate surface, `
        + 'warm amber side light, deep shadows filling the upper third of the frame, '
        + 'moody appetising restaurant food photography, photorealistic, '
        + 'no people, no hands, no text, no logos, no watermarks',
      modell: k,
      seed: SEED_BASIS + 300 + i,
      datei: `${r.id}.jpg`,
    };
  });
} else {
  console.error(`✗ unbekannt: --was ${WAS}\n  Bekannt: probe, voll, rezepte`);
  process.exit(1);
}

// ⚠ WAS SCHON DA IST, WIRD NICHT NOCH EINMAL BEZAHLT.
//
// Ohne das kostet jeder Wiederholungslauf den vollen Preis, und zwar
// unbemerkt: Die Datei wird ueberschrieben, das Bild sieht gleich aus, und
// auffallen wuerde es erst auf der Abrechnung. Genau die Sorte Fehler, vor der
// der Kopf dieser Datei bei der Bildgroesse warnt.
//
// `--neu` erzwingt das Ueberschreiben, wenn ein Motiv wirklich misslungen ist.
const NEU = process.argv.includes('--neu');
const schonDa = NEU ? [] : auftrag.filter((a) => existsSync(join(ZIEL, a.datei)));
if (schonDa.length) {
  auftrag = auftrag.filter((a) => !schonDa.some((s) => s.datei === a.datei));
  console.log(`${schonDa.length} Bild(er) liegen schon da und werden uebersprungen`);
  console.log(`  (mit --neu ueberschreiben, kostet dann wieder)\n`);
}
if (!auftrag.length) {
  console.log('Nichts zu tun — alle Bilder sind vorhanden.');
  process.exit(0);
}

const kosten = auftrag.reduce((s, a) => s + MODELLE[a.modell].proMP * MP, 0);

console.log(`fal.ai — ${auftrag.length} Bilder, ${BREITE}×${HOEHE} (${MP} MP je Bild)`);
for (const k of Object.keys(MODELLE)) {
  const n = auftrag.filter((a) => a.modell === k).length;
  if (n) console.log(`  ${n}× ${MODELLE[k].pfad.padEnd(22)} $${(n * MODELLE[k].proMP * MP).toFixed(3)}`);
}
console.log(`  ────────────────────────────────────────\n  zusammen               $${kosten.toFixed(2)}\n`);

if (!LOS) {
  console.log('Nichts gesendet. Zum wirklichen Erzeugen `--los` anhaengen.');
  process.exit(0);
}
if (!process.env.FAL_KEY) {
  console.error('✗ FAL_KEY fehlt. Er gehoert in die Umgebungsvariablen der\n'
    + '  Claude-Umgebung (claude.ai/code → Environment), NICHT ins Repo\n'
    + '  und nicht in den Chat.');
  process.exit(1);
}

mkdirSync(ZIEL, { recursive: true });

// --- Erzeugen ---------------------------------------------------------------
const zeilen = [];
for (const a of auftrag) {
  const m = MODELLE[a.modell];
  process.stdout.write(`  … ${a.datei.padEnd(42)}`);

  const antwort = await fetch(`https://fal.run/${m.pfad}`, {
    method: 'POST',
    headers: { Authorization: `Key ${process.env.FAL_KEY}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      prompt: a.prompt,
      image_size: { width: BREITE, height: HOEHE },
      num_inference_steps: m.schritte,
      num_images: 1,
      seed: a.seed,
      enable_safety_checker: true,
      output_format: 'jpeg',
    }),
  });

  if (!antwort.ok) {
    console.log('✗');
    console.error(`\n✗ fal.ai antwortete ${antwort.status}: ${(await antwort.text()).slice(0, 400)}`);
    console.error('  Abbruch — die bisher erzeugten Bilder liegen im Ordner.');
    break;
  }

  const daten = await antwort.json();
  const url = daten.images?.[0]?.url;
  if (!url) { console.log('✗ keine Bild-URL'); continue; }

  const bild = Buffer.from(await (await fetch(url)).arrayBuffer());
  writeFileSync(join(ZIEL, a.datei), bild);
  console.log(`✓ ${(bild.length / 1024).toFixed(0)} kB`);

  zeilen.push(`| \`${a.datei}\` | fal.ai | \`${m.pfad}\`, Seed ${a.seed} | ${new Date().toISOString().slice(0, 10)} `
    + `| $${(m.proMP * MP).toFixed(3)} | ${a.bereich === 'supplements' ? 'nein (Essen)' : '**ja**'} |`);
}

// --- Herkunft festhalten ----------------------------------------------------
// ⚠ Ohne Eintrag gilt ein Bild als ungeklaert und gehoert geloescht, nicht
// gepostet. Genau diese Nachlaessigkeit hat den Aerger mit der
// free-exercise-db verursacht.
if (zeilen.length) {
  const pfad = join(ZIEL, 'HERKUNFT.md');
  const alt = existsSync(pfad) ? readFileSync(pfad, 'utf8') : '';
  // Die Platzhalterzeile der leeren Tabelle faellt beim ersten Eintrag weg.
  const neu = alt.replace(/^\| — \| — \| — \| — \| — \| — \|\n?/m, '');
  writeFileSync(pfad, neu.trimEnd() + '\n' + zeilen.join('\n') + '\n');
  console.log(`\n✓ ${zeilen.length} Zeile(n) in HERKUNFT.md`);
}

console.log(`\n${zeilen.length} von ${auftrag.length} Bildern in ${ZIEL}`);
console.log(`Tatsaechliche Kosten: $${(zeilen.reduce((s, _, i) => s + MODELLE[auftrag[i].modell].proMP * MP, 0)).toFixed(2)}`);
