// Prüft die Sprachpakete der Inhaltsbibliotheken gegen die Datendateien.
//
//   node scripts/pruefe-inhalte.mjs
//   node scripts/pruefe-inhalte.mjs --fehlend    # nur, was noch fehlt
//
// Warum ein eigenes Skript: Eine Übersetzung fällt bei Lücken still auf DE/EN
// zurück (so gewollt, siehe src/data/uebersetzungen.js) — der Build bleibt
// grün, und niemand merkt, dass die Hälfte fehlt. Das hier zählt nach.
//
// Geprüft wird:
//   · jede id aus der Datendatei kommt im Paket vor
//   · name, summary, quick und alle sections sind gefüllt
//   · die Anzahl der sections stimmt (sie werden über den Index zugeordnet!)
//   · quick hat dieselbe Form wie im Original (Array bzw. Objekt, gleiche Länge
//     bzw. gleiche Schlüssel)
//   · keine id im Paket, die es in den Daten nicht gibt (Tippfehler)
import { readdirSync } from 'fs';
import { fileURLToPath, pathToFileURL } from 'url';
import { dirname, join } from 'path';

const WURZEL = join(dirname(fileURLToPath(import.meta.url)), '..');
const NUR_FEHLEND = process.argv.includes('--fehlend');

// bereich → [Datendatei, Export mit den Einträgen, Export mit den Kategorien]
const BEREICHE = {
  peptides:    ['peptidesData', 'default', null, 'peptide'],
  diets:       ['dietsData', 'diets', 'dietCategories', 'diaeten'],
  training:    ['trainingKnowledge', 'trainingTopics', 'trainingCategories', 'training'],
  nutrition:   ['nutritionKnowledge', 'nutritionTopics', 'nutritionCategories', 'ernaehrung'],
  supplements: ['supplementsKnowledge', 'supplementsTopics', 'supplementsCategories', 'supplemente'],
  bloodwork:   ['bloodworkKnowledge', 'bloodworkTopics', 'bloodworkCategories', 'blutwerte'],
};

const laden = (pfad) => import(pathToFileURL(join(WURZEL, 'src/data', pfad)).href);

let fehler = 0;
const meckern = (...t) => { fehler += 1; console.error('    ✗', ...t); };
const gefuellt = (v) => typeof v === 'string' && v.trim().length > 0;

// Hat `quick` dieselbe Form wie das Original?
function quickPasst(original, uebersetzt) {
  if (Array.isArray(original)) {
    if (!Array.isArray(uebersetzt) || uebersetzt.length !== original.length) return false;
    return uebersetzt.every((q) => gefuellt(q?.label) && gefuellt(q?.text));
  }
  if (original && typeof original === 'object') {
    if (!uebersetzt || typeof uebersetzt !== 'object' || Array.isArray(uebersetzt)) return false;
    return Object.keys(original).every((k) => gefuellt(uebersetzt[k]));
  }
  return true;
}

let gesamtFertig = 0, gesamtOffen = 0;

for (const [bereich, [datei, exp, katExp, paketDatei]] of Object.entries(BEREICHE)) {
  const daten = await laden(`${datei}.js`);
  const eintraege = daten[exp];
  const kategorien = katExp ? daten[katExp] : [];
  const paket = (await laden(`es/${paketDatei}.js`)).default || {};

  const fehlend = [];
  let fertig = 0;

  for (const e of eintraege) {
    const u = paket[e.id];
    if (!u) { fehlend.push(e.id); continue; }
    let ok = true;
    if (!gefuellt(u.name)) { meckern(`${bereich}/${e.id}: name fehlt`); ok = false; }
    if (gefuellt(e.summaryDE) && !gefuellt(u.summary)) { meckern(`${bereich}/${e.id}: summary fehlt`); ok = false; }
    if (e.quickDE && !quickPasst(e.quickDE, u.quick)) { meckern(`${bereich}/${e.id}: quick fehlt oder hat eine andere Form`); ok = false; }
    const soll = (e.sections || []).length;
    const ist = (u.sections || []).length;
    if (soll !== ist) { meckern(`${bereich}/${e.id}: ${ist} Abschnitte statt ${soll}`); ok = false; }
    else for (let i = 0; i < soll; i += 1) {
      if (!gefuellt(u.sections[i]?.title) || !gefuellt(u.sections[i]?.content)) {
        meckern(`${bereich}/${e.id}: Abschnitt ${i + 1} leer`); ok = false; break;
      }
    }
    if (ok) fertig += 1;
  }

  // Kategorien
  const katFehlend = kategorien.filter((c) => !gefuellt(paket.kategorien?.[c.id])).map((c) => c.id);

  // Tippfehler in den ids
  const bekannt = new Set([...eintraege.map((e) => e.id), 'kategorien']);
  for (const k of Object.keys(paket)) if (!bekannt.has(k)) meckern(`${bereich}: unbekannte id „${k}" im Paket`);

  gesamtFertig += fertig;
  gesamtOffen += fehlend.length;

  const stand = `${fertig}/${eintraege.length}`;
  const zeile = `  ${bereich.padEnd(12)} ${stand.padStart(6)} Einträge`
    + (kategorien.length ? `  ·  Kategorien ${kategorien.length - katFehlend.length}/${kategorien.length}` : '');
  if (NUR_FEHLEND && !fehlend.length && !katFehlend.length) continue;
  console.log(zeile);
  if (fehlend.length) console.log(`      offen: ${fehlend.join(', ')}`);
  if (katFehlend.length) console.log(`      Kategorien offen: ${katFehlend.join(', ')}`);
}

// ── Rezepte ──
// Andere Form als die Wissensbereiche: name, desc und zwei Listen. Die Listen
// werden zwar nicht nach Index gemischt, aber eine abweichende Länge heißt
// immer, dass beim Übersetzen eine Zeile verlorenging oder doppelt steht.
{
  const rezepte = (await laden('recipesData.js')).default;
  const paket = (await laden('es/rezepte.js')).default || {};
  const fehlend = [];
  let fertig = 0;
  for (const r of rezepte) {
    const u = paket[r.id];
    if (!u) { fehlend.push(r.id); continue; }
    let ok = true;
    for (const [feld, soll] of [['name', r.nameDE], ['desc', r.descDE]]) {
      if (gefuellt(soll) && !gefuellt(u[feld])) { meckern(`recipes/${r.id}: ${feld} fehlt`); ok = false; }
    }
    for (const [feld, quelle] of [['ingredients', r.ingredientsDE], ['steps', r.stepsDE]]) {
      const liste = u[feld];
      if (!Array.isArray(liste) || liste.length !== (quelle || []).length) {
        meckern(`recipes/${r.id}: ${feld} — ${liste?.length ?? 0} statt ${(quelle || []).length} Zeilen`);
        ok = false;
      } else if (!liste.every(gefuellt)) {
        meckern(`recipes/${r.id}: ${feld} enthält leere Zeilen`); ok = false;
      }
    }
    if (ok) fertig += 1;
  }
  const bekannt = new Set(rezepte.map((r) => r.id));
  for (const k of Object.keys(paket)) if (!bekannt.has(k)) meckern(`recipes: unbekannte id „${k}" im Paket`);
  gesamtFertig += fertig;
  gesamtOffen += fehlend.length;
  if (!NUR_FEHLEND || fehlend.length) {
    console.log(`  ${'recipes'.padEnd(12)} ${`${fertig}/${rezepte.length}`.padStart(6)} Einträge`);
    if (fehlend.length) console.log(`      offen: ${fehlend.join(', ')}`);
  }
}

console.log(`\n${gesamtFertig} Einträge übersetzt, ${gesamtOffen} offen.`);
if (fehler) console.error(`${fehler} Fehler in bereits übersetzten Einträgen.`);
process.exit(fehler ? 1 : 0);
