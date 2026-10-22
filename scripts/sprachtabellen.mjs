// Eingebettete Beschriftungstabellen `{ de: '…', en: '…', …, ar: '…' }` um eine
// neue Sprache ergänzen, ohne 130 Stellen von Hand anzufassen.
//
//   node scripts/sprachtabellen.mjs export it > /tmp/it.json
//     → [{ id, datei, zeile, de, en }] für jede Tabelle, der `it` noch fehlt
//   (Übersetzer trägt je Eintrag `text` ein)
//   node scripts/sprachtabellen.mjs import it /tmp/it.json
//     → schreibt `it: '…'` direkt hinter die `ar:`-Angabe
//
// Gefunden wird genau das, was pruefe-sprachen.mjs als Tabelle zählt
// (gleiche Blockabgrenzung), damit beide dieselbe Menge sehen. Erwartet wird,
// dass jede Tabelle eine `ar:`-Angabe in einfachen Anführungszeichen hat — die
// Prüfung verlangt das ohnehin für alle Sprachen.
import { readFileSync, writeFileSync, readdirSync, statSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const WURZEL = join(dirname(fileURLToPath(import.meta.url)), '..');
const [, , befehl, sprache, datei] = process.argv;
if (!['export', 'import'].includes(befehl) || !/^[a-z]{2}$/.test(sprache || '')) {
  console.error('Aufruf: sprachtabellen.mjs export <code> | import <code> <datei.json>');
  process.exit(2);
}

// Dieselben Ordner wie pruefe-sprachen.mjs, ohne die Sprachpakete selbst
const AUSGENOMMEN = /\/(data\/(es|fr|pt|ar|it|nl|pl|tr|ja|ko|zh)|pages\/legal\/uebersetzungen|i18n\/locales)\//;
function alle(dir) {
  return readdirSync(dir).flatMap((n) => {
    const p = join(dir, n);
    if (statSync(p).isDirectory()) return alle(p);
    return /\.(js|jsx)$/.test(n) ? [p] : [];
  });
}
const dateien = [...alle(join(WURZEL, 'src')), ...alle(join(WURZEL, 'api'))]
  .filter((d) => !AUSGENOMMEN.test(d) && !d.endsWith('sprache.js'));

const WERT = (k) => new RegExp(`\\b${k}:\\s*'((?:[^'\\\\]|\\\\.)*)'`);

function tabellen(src) {
  const zeilen = src.split('\n');
  const gefunden = [];
  for (let i = 0; i < zeilen.length; i += 1) {
    if (!/\bde:\s*'/.test(zeilen[i])) continue;
    const block = [zeilen[i]];
    for (let j = i + 1; j < zeilen.length && block.length <= 40; j += 1) {
      if (/^\s*[}\]]/.test(zeilen[j])) break;
      block.push(zeilen[j]);
    }
    const text = block.join('\n');
    if (!WERT('en').test(text)) continue;
    const arIdx = block.findIndex((z) => WERT('ar').test(z));
    gefunden.push({
      start: i,
      arZeile: arIdx < 0 ? -1 : i + arIdx,
      de: text.match(WERT('de'))[1],
      en: text.match(WERT('en'))[1],
      hat: (k) => WERT(k).test(text),
    });
  }
  return gefunden;
}

if (befehl === 'export') {
  const liste = [];
  for (const d of dateien) {
    const rel = d.slice(WURZEL.length + 1);
    for (const t of tabellen(readFileSync(d, 'utf8'))) {
      if (t.hat(sprache)) continue;
      if (t.arZeile < 0) { console.error(`ohne ar: ${rel}:${t.start + 1}`); continue; }
      liste.push({ id: `${rel}:${t.arZeile + 1}`, de: t.de, en: t.en, text: '' });
    }
  }
  process.stdout.write(JSON.stringify(liste, null, 2) + '\n');
} else {
  const eintraege = JSON.parse(readFileSync(datei, 'utf8'));
  const jeDatei = new Map();
  for (const e of eintraege) {
    if (!e.text) { console.error(`leer: ${e.id}`); process.exitCode = 1; continue; }
    const [rel, zeile] = [e.id.slice(0, e.id.lastIndexOf(':')), Number(e.id.slice(e.id.lastIndexOf(':') + 1))];
    if (!jeDatei.has(rel)) jeDatei.set(rel, []);
    jeDatei.get(rel).push({ zeile, text: e.text });
  }
  const esc = (s) => s.replace(/\\/g, '\\\\').replace(/'/g, "\\'").replace(/\n/g, '\\n');
  for (const [rel, liste] of jeDatei) {
    const pfad = join(WURZEL, rel);
    const zeilen = readFileSync(pfad, 'utf8').split('\n');
    // Von unten nach oben, damit eingefügte Zeilen die Nummern darüber nicht verschieben
    for (const { zeile, text } of liste.sort((a, b) => b.zeile - a.zeile)) {
      const z = zeilen[zeile - 1];
      const m = z.match(WERT('ar'));
      if (!m) { console.error(`keine ar-Angabe mehr in ${rel}:${zeile}`); process.exitCode = 1; continue; }
      const nur = /^\s*ar:\s*'(?:[^'\\]|\\.)*',?\s*$/.test(z);
      if (nur) {
        const einzug = z.match(/^\s*/)[0];
        zeilen.splice(zeile, 0, `${einzug}${sprache}: '${esc(text)}',`);
        if (!z.trimEnd().endsWith(',')) zeilen[zeile - 1] = `${z.trimEnd()},`;
      } else {
        const ende = m.index + m[0].length;
        zeilen[zeile - 1] = `${z.slice(0, ende)}, ${sprache}: '${esc(text)}'${z.slice(ende)}`;
      }
    }
    writeFileSync(pfad, zeilen.join('\n'));
  }
  console.log(`${eintraege.length} Einträge für ${sprache} eingetragen.`);
}
