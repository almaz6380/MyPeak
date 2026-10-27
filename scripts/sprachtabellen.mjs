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
  // Zugeordnet wird über den INHALT (de + en), die Zeile ist nur ein Hinweis:
  // Seit dem Export kann eine andere Sprache Zeilen eingefügt haben, und eine
  // feste Zeilennummer träfe dann die falsche Tabelle.
  const eintraege = JSON.parse(readFileSync(datei, 'utf8'));
  const esc = (s) => s.replace(/\\/g, '\\\\').replace(/'/g, "\\'").replace(/\n/g, '\\n');
  let eingetragen = 0;
  for (const e of eintraege) {
    if (!e.text) { console.error(`leer: ${e.id}`); process.exitCode = 1; continue; }
    const rel = e.id.slice(0, e.id.lastIndexOf(':'));
    const hinweis = Number(e.id.slice(e.id.lastIndexOf(':') + 1));
    const pfad = join(WURZEL, rel);
    const src = readFileSync(pfad, 'utf8');
    const kandidaten = tabellen(src).filter((t) => t.de === e.de && t.en === e.en && !t.hat(sprache) && t.arZeile >= 0);
    if (!kandidaten.length) {
      // Schon eingetragen (zweiter Lauf) ist kein Fehler, alles andere schon
      const schon = tabellen(src).some((t) => t.de === e.de && t.en === e.en && t.hat(sprache));
      if (!schon) { console.error(`nicht gefunden: ${e.id} (${e.en.slice(0, 40)})`); process.exitCode = 1; }
      continue;
    }
    kandidaten.sort((a, b) => Math.abs(a.arZeile + 1 - hinweis) - Math.abs(b.arZeile + 1 - hinweis));
    const zeilen = src.split('\n');
    const zeile = kandidaten[0].arZeile; // 0-basiert
    const z = zeilen[zeile];
    const m = z.match(WERT('ar'));
    if (/^\s*ar:\s*'(?:[^'\\]|\\.)*',?\s*$/.test(z)) {
      const einzug = z.match(/^\s*/)[0];
      // Andere Sprachen stehen evtl. schon in eigenen Zeilen nach ar — dahinter einreihen
      let nach = zeile + 1;
      while (nach < zeilen.length && /^\s*[a-z]{2}:\s*'/.test(zeilen[nach])) nach += 1;
      if (!zeilen[nach - 1].trimEnd().endsWith(',')) zeilen[nach - 1] = `${zeilen[nach - 1].trimEnd()},`;
      zeilen.splice(nach, 0, `${einzug}${sprache}: '${esc(e.text)}',`);
    } else {
      // Einzeilige Tabelle: hinter die letzte Sprachangabe nach ar setzen
      let ende = m.index + m[0].length;
      const rest = z.slice(ende);
      const weitere = rest.match(/^(?:,\s*[a-z]{2}:\s*'(?:[^'\\]|\\.)*')+/);
      if (weitere) ende += weitere[0].length;
      zeilen[zeile] = `${z.slice(0, ende)}, ${sprache}: '${esc(e.text)}'${z.slice(ende)}`;
    }
    writeFileSync(pfad, zeilen.join('\n'));
    eingetragen += 1;
  }
  console.log(`${eingetragen} Einträge für ${sprache} eingetragen.`);
}
