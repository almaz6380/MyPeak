// Prüft die drei Sprachdateien und fährt die App danach in jeder Sprache an.
//
//   node scripts/pruefe-sprachen.mjs           # nur die Dateien (kein Browser)
//   node scripts/pruefe-sprachen.mjs --browser # zusätzlich echte Anzeige
//
// Warum überhaupt: Ein fehlender Schlüssel fällt beim Bauen NICHT auf.
// i18next liefert dann den Fallback (Deutsch) oder den nackten Schlüssel —
// beides sieht im Build wie ein Erfolg aus und erst am Gerät wie ein Fehler.
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const WURZEL = join(dirname(fileURLToPath(import.meta.url)), '..');
const SPRACHEN = ['de', 'en', 'es', 'fr', 'pt', 'ar'];

const flach = (o, p = '') => Object.entries(o).flatMap(([k, v]) =>
  (v && typeof v === 'object' ? flach(v, `${p}${k}.`) : [[p + k, v]]));

const tabellen = Object.fromEntries(SPRACHEN.map((s) =>
  [s, new Map(flach(JSON.parse(readFileSync(join(WURZEL, `src/i18n/locales/${s}.json`), 'utf8'))))]));

const zeilen = (s) => (String(s).match(/\n/g) || []).length;
const platzhalter = (s) => [...String(s).matchAll(/\{\{(\w+)\}\}/g)].map((m) => m[1]).sort().join(',');

let fehler = 0;
const meckern = (...t) => { fehler += 1; console.error('  ✗', ...t); };

console.log('Sprachdateien:');
for (const s of SPRACHEN) {
  // „noch englisch" ist der ehrliche Fortschrittsbalken: Gleiche Schlüsselzahl
  // heißt nur, dass die Datei vollständig ist — nicht, dass sie übersetzt ist.
  // Eine aus en.json kopierte Datei besteht jede andere Prüfung hier.
  const roh = s === 'en' ? 0 : [...tabellen[s]].filter(([k, v]) =>
    typeof v === 'string' && v === tabellen.en.get(k) && v !== tabellen.de.get(k)).length;
  console.log(`  ${s}: ${tabellen[s].size} Schlüssel`
    + (roh ? `  ·  ${roh} noch wörtlich Englisch` : ''));
}

for (const s of SPRACHEN.filter((x) => x !== 'de')) {
  for (const k of tabellen.de.keys()) if (!tabellen[s].has(k)) meckern(`${s}: Schlüssel fehlt — ${k}`);
  for (const k of tabellen[s].keys()) if (!tabellen.de.has(k)) meckern(`${s}: Schlüssel zu viel — ${k}`);
  for (const [k, v] of tabellen[s]) {
    if (typeof v === 'string' && !v.trim()) meckern(`${s}: leerer Text — ${k}`);
    const d = tabellen.de.get(k);
    if (typeof d === 'string' && typeof v === 'string' && platzhalter(d) !== platzhalter(v)) {
      meckern(`${s}: Platzhalter weichen ab — ${k} (de: ${platzhalter(d)}, ${s}: ${platzhalter(v)})`);
    }
    // Absätze zählen. Ein Text mit zwei Absätzen, von dem nur der erste
    // übersetzt wurde, sieht fertig aus — der zweite fehlt lautlos. Genau so
    // ist der Forschungsstand-Hinweis bei den Peptiden einmal untergegangen.
    // Nur prüfen, was schon übersetzt ist: Ein aus en.json kopierter Text
    // hat naturgemäß die englische Absatzzahl.
    if (typeof d === 'string' && typeof v === 'string' && v !== tabellen.en.get(k)
        && zeilen(d) !== zeilen(v)) {
      meckern(`${s}: Absätze weichen ab — ${k} (de: ${zeilen(d) + 1}, ${s}: ${zeilen(v) + 1})`);
    }
  }
}

// Schlüssel, die im Code benutzt, aber nirgends definiert sind. Nur die
// wörtlichen t('…')-Aufrufe — dynamische (t(variable)) lassen sich statisch
// nicht prüfen und werden übersprungen.
import { readdirSync, statSync } from 'fs';
const dateien = [];
(function sammeln(ordner) {
  for (const n of readdirSync(ordner)) {
    const p = join(ordner, n);
    if (statSync(p).isDirectory()) sammeln(p);
    else if (/\.(js|jsx)$/.test(n)) dateien.push(p);
  }
})(join(WURZEL, 'src'));

const benutzt = new Set();
for (const d of dateien) {
  const src = readFileSync(d, 'utf8');
  for (const m of src.matchAll(/\bt\(\s*'([a-zA-Z0-9_.]+)'/g)) benutzt.add(m[1]);
  for (const m of src.matchAll(/\bt\(\s*`([a-zA-Z0-9_.]+)`/g)) benutzt.add(m[1]);
}
for (const k of benutzt) {
  if (k.startsWith('exercises.') || k.startsWith('__custom__')) continue;
  if (!tabellen.de.has(k)) meckern(`Schlüssel im Code, aber nicht in de.json — ${k}`);
}
console.log(`  ${benutzt.size} wörtliche t()-Schlüssel im Code geprüft.`);

// Beschriftungstabellen im Code (`{ de: '…', en: '…' }`). Sie stehen bewusst
// neben i18n — meist weil dieselbe Zeile auch eine Farbe oder ein Symbol trägt.
// Fehlt dort `es`, fällt es NICHT auf: `tabelle[lang]` liefert `undefined`, die
// Zeile bleibt leer oder zeigt die rohe Id. Genau das ist der Peptid-Seite
// passiert — dort standen „healing" und „gh" statt der Kategorienamen.
// ⚠ Der Block reicht über MEHRERE Zeilen. Eine frühere Fassung suchte `de:` und
// `en:` in derselben Zeile — damit blieb jede umgebrochene Tabelle unsichtbar.
// So ist der Arzt-Hinweis in `MedicalDisclaimer.jsx` durchgerutscht und stand
// auf Französisch englisch da (und das ist Pflichttext für Google Play).
// Zeilenweise abgrenzen statt bis zur nächsten `}`: Platzhalter wie `{{name}}`
// enthalten selbst Klammern und würden den Block zu früh abschneiden.
let tabellenGeprueft = 0;
for (const d of dateien) {
  const src = readFileSync(d, 'utf8');
  const zeilen = src.split('\n');
  for (let i = 0; i < zeilen.length; i += 1) {
    if (!/\bde:\s*'/.test(zeilen[i])) continue;
    const block = [zeilen[i]];
    for (let j = i + 1; j < zeilen.length && block.length <= 40; j += 1) {
      if (/^\s*[}\]]/.test(zeilen[j])) break; // Ende der Tabelle
      block.push(zeilen[j]);
    }
    const text = block.join('\n');
    if (!/\ben:\s*'/.test(text)) continue; // keine Sprachtabelle
    tabellenGeprueft += 1;
    const fehlt = SPRACHEN.filter((sp) => sp !== 'de' && sp !== 'en'
      && !new RegExp(`\\b${sp}:\\s*'`).test(text));
    if (fehlt.length) {
      meckern(`${fehlt.join('/')} fehlt in Beschriftungstabelle — ${d.slice(WURZEL.length + 1)}:${i + 1}`);
    }
  }
}
console.log(`  ${tabellenGeprueft} Beschriftungstabellen im Code geprüft.`);

// ── Sprachcode-Weichen im Code ───────────────────────────────────
//
// Die Tabellenprüfung oben findet fehlende SPALTEN. Sie findet nicht, was
// dreimal der teurere Fehler war: eine Zweiwegweiche auf dem Sprachcode selbst.
//
//   api/coach.js       outLang = lang === 'en' ? 'en' : 'de'
//                      → 'es' wurde zu 'de', der spanische Prompt war toter Code
//   CoachPage.jsx      ['de', 'es'].find(…) || 'en'
//                      → fr/pt/ar fielen still auf Englisch
//   KnowledgePage.jsx  lang === 'es' ? … : (lang === 'de' ? … : …)
//                      → englische Überschrift über französischer Liste
//
// Alle drei sahen richtig aus und liefen lange mit. Gemeinsames Merkmal: Der
// Sprachcode wird VERGLICHEN, statt durch `appSprache()` zu gehen und damit
// eine Tabelle zu indizieren.
//
// `lib/sprache.js` ist ausgenommen — dort gehört die Weiche hin. Alles andere
// muss sich rechtfertigen, auf zwei Wegen:
//
//   • Einzelne Zeile:  `// sprachweiche-ok` ans Zeilenende ODER in eine der
//                      drei Zeilen darüber. Die Zeilen sind hier oft lang;
//                      ein Marker am Ende wäre nicht mehr zu sehen, und eine
//                      Begründung passt ohnehin nur darüber.
//   • Ganze Datei:     `// sprachweichen-ok: <Begründung>` irgendwo in der
//                      Datei. Die Begründung ist PFLICHT — ohne Text hinter
//                      dem Doppelpunkt zählt die Ausnahme nicht.
//
// Die Dateiausnahme gibt es, weil `uebersetzungen.js` zwölf solche Zeilen hat
// und ihr ganzer Zweck der DE/EN-Rückfall ist. Zwölfmal derselbe Marker wäre
// Lärm, den niemand mehr liest — und ein Marker, den niemand liest, schützt
// nichts. Der Preis: Wer die Datei ausnimmt, muss einen Satz schreiben, warum.
const WEICHE = /\b(?:lang|language|sprache|locale|lng)\w*\s*===\s*'(?:de|en|es|fr|pt|ar)'|\[\s*'(?:de|en|es|fr|pt|ar)'\s*,\s*'(?:de|en|es|fr|pt|ar)'\s*\]/;
const WEICHE_OK = [/src[/\\]lib[/\\]sprache\.js$/];
let weichenGeprueft = 0;
for (const d of dateien) {
  if (WEICHE_OK.some((r) => r.test(d))) continue;
  const roh = readFileSync(d, 'utf8');
  // Dateiausnahme nur mit Begründung: `sprachweichen-ok:` gefolgt von Text.
  if (/sprachweichen-ok:\s*\S/.test(roh)) continue;
  const src = roh.split('\n');
  for (let i = 0; i < src.length; i += 1) {
    const z = src[i];
    const nackt = z.trimStart();
    if (nackt.startsWith('//') || nackt.startsWith('*')) continue;
    if (!WEICHE.test(z)) continue;
    weichenGeprueft += 1;
    // Marker in der Zeile selbst oder in einer der drei darüber.
    if (src.slice(Math.max(0, i - 3), i + 1).some((x) => /sprachweiche-ok/.test(x))) continue;
    meckern(`Zweiwegweiche auf dem Sprachcode — ${d.slice(WURZEL.length + 1)}:${i + 1}`
      + `\n      ${z.trim().slice(0, 110)}`
      + '\n      Über appSprache() + Tabelle lösen, oder mit // sprachweiche-ok kennzeichnen.');
  }
}
console.log(`  ${weichenGeprueft} Sprachcode-Weichen im Code geprüft.`);

if (!process.argv.includes('--browser')) {
  console.log(fehler ? `\n${fehler} Fehler.` : '\nAlles in Ordnung.');
  process.exit(fehler ? 1 : 0);
}

// ── Anzeigeprobe im echten Browser ──────────────────────────────────────────
// Sucht auf der Startseite nach rohen Schlüsseln („ui.something") — so sähe
// eine fehlende Übersetzung aus, wenn parseMissingKeyHandler greift.
const { chromium } = await import('playwright');
const browser = await chromium.launch({
  executablePath: process.env.CHROMIUM_PFAD || undefined,
  args: ['--no-sandbox'],
});
for (const s of SPRACHEN) {
  const kontext = await browser.newContext({ viewport: { width: 390, height: 844 } });
  const seite = await kontext.newPage();
  const konsole = [];
  seite.on('pageerror', (e) => konsole.push(String(e)));
  await seite.addInitScript((sp) => localStorage.setItem('language', sp), s);
  await seite.goto(process.env.URL || 'http://localhost:4173/', { waitUntil: 'networkidle' });
  const text = await seite.locator('body').innerText();
  const roh = [...text.matchAll(/\b(ui|common|training|nutrition|home|profile)\.[a-zA-Z0-9_]+/g)].map((m) => m[0]);
  if (roh.length) meckern(`${s}: rohe Schlüssel sichtbar — ${[...new Set(roh)].join(', ')}`);
  if (konsole.length) meckern(`${s}: Seitenfehler — ${konsole.join(' | ')}`);
  else console.log(`  ${s}: Startseite lädt ohne Fehler (${text.length} Zeichen Text).`);
  await kontext.close();
}
await browser.close();

console.log(fehler ? `\n${fehler} Fehler.` : '\nAlles in Ordnung.');
process.exit(fehler ? 1 : 0);
