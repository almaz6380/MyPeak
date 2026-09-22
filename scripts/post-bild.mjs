#!/usr/bin/env node
// Bildposts fuer FullRep — 1080×1350 (Feed).
//
//   CHROMIUM_PFAD=/opt/pw-browsers/chromium node scripts/post-bild.mjs \
//       --format wissens-karte --stil poster --seed 3 --lang de
//   … --format rezept-karte --stil zahl
//   … --hintergrund <foto.jpg>   eigenes Hintergrundfoto
//   … --ki                       KI-erzeugte Menschen im Bild
//
// Muster: scripts/store-screenshots.mjs — Playwright, ohne Netz, ohne
// Zugangsdaten. Kostet nichts.
//
// VIER STILE, EIN RAHMEN. Kopf, Fuss mit den Store-Badges, das KI-Wasserzeichen
// und die Foto-Logik sind bei allen gleich; nur die Mitte unterscheidet sich.
// Sonst zerfaellt die Marke in vier Marken.
//
//   mix      VORGABE. Der Dreiklang: wechselnder Aufhaenger, grosse
//            Ueberschrift, mittelgrosser Erklaertext — und darunter, wo es
//            einen gibt, der Studienwert. Fehlt der Wert, faellt der Block
//            weg statt leer dazustehen.
//   poster   Foto randlos, Text im unteren Drittel. Am lautesten im Feed.
//   premium  Ruhig und dunkel, Gold an genau einer Stelle.
//   zahl     Eine grosse Zahl traegt das Bild. Greift nur, wo eine da IST —
//            sonst faellt der Stil auf `premium` zurueck, statt eine zu erfinden.
//
// ⚠ ZWEI REGELN:
//
// 1. Gezeigt werden nur Store-Badges fuer Plattformen, die es wirklich gibt.
//    Die Wahrheit steht in STORES unten, nie im Text.
// 2. KI-erzeugte MENSCHEN tragen unten rechts das AI-Wasserzeichen (--ki).
//    Echte Fotos NICHT — das waere genauso falsch wie ein ungekennzeichnetes
//    KI-Bild.
//
// Der aerztliche Haftungshinweis UND die Quellenangabe stehen hier bewusst
// nicht mehr (Josefs Entscheidungen vom 29.08.2026). Beide sind Auflagen fuer
// den STORE-EINTRAG — dort hat Google am 30.07. und Apple am 29.07.2026
// nachgesehen —, nicht fuer Social-Media-Beitraege. In der App
// (MedicalDisclaimer.jsx, References.jsx), im Play-Text und unter
// /legal/health bleiben sie UNVERAENDERT. Wer sie dort entfernt, holt beide
// Ablehnungen zurueck.
//
// Keine Dosierungen, keine Diagnosen, keine Therapieempfehlungen — die
// Inhalte kommen unveraendert aus src/data/, wo genau das schon gilt.

import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import { chromium } from 'playwright';

import {
  WURZEL, uebungenMitFotos, uebungTexte, wissensthemen, rezepteMitMakros,
  peptidePosts, peptideGesamt, quelleKurz, WASSERZEICHEN_CSS, WASSERZEICHEN_HTML, trainingsFoto, FOTO_BEREICHE,
  bestandszahlen,
} from './social-daten.mjs';
import { studienPosts } from './studien.mjs';

const arg = (n, s) => { const i = process.argv.indexOf(`--${n}`); return i === -1 ? s : process.argv[i + 1]; };
const FORMAT = arg('format', 'wissens-karte');
const STIL = arg('stil', 'mix');
const LANG = arg('lang', 'de');
const SEED = Number(arg('seed', 1));
const NAME = arg('name', null);
const OUT = join(WURZEL, arg('out', 'out/social'));
const HINTERGRUND = arg('hintergrund', null);
// ⚠ `--wz` ist NICHT dasselbe wie `--hintergrund`. Ein Hintergrundfoto ist das
// Motiv der Karte und braucht den Schleier, damit die Schrift darauf liest. Ein
// Wasserzeichen ist eine Struktur: stark abgedunkelt, entfaerbt, nur die
// Silhouette bleibt. Deshalb zwei Wege und nicht ein Regler.
const WZ = arg('wz', null);
// ⚠ Querformat-Bilder ueberleben `cover` im Hochformat nicht immer: Die Karte
// ist 1080×1350, ein 1408×768-Bild wird dafuer auf 2475 Breite hochgezogen und
// zu 56 % horizontal weggeschnitten. Eine stehende Figur bleibt dabei stehen,
// eine LIEGENDE (Bankdruecken) verliert Kopf und Beine und ist als Uebung
// nicht mehr zu erkennen. `--wz-fit contain` legt das ganze Bild als Streifen
// in die Mitte; der Rand bleibt schwarz, was bei 17 % Deckkraft ohnehin die
// Kartenfarbe ist.
const WZ_FIT = arg('wz-fit', 'cover');
const WZ_POS = arg('wz-pos', 'center');
// ⚠ `--wz` setzt die KI-Kennzeichnung MIT. Die Wasserzeichenbilder sind
// ausnahmslos KI-erzeugte Menschen (fal.ai, siehe scripts/fal-bilder.mjs), und
// die Regel im Kopf dieser Datei kennt keine Ausnahme fuer „aber nur ganz
// leise". Sie an `--ki` zu haengen hiesse, sich darauf zu verlassen, dass
// jeder Aufrufer daran denkt — der Tageslauf ruft dieses Skript aus
// motoren.mjs auf, und dort denkt niemand.
// --- Die Randfigur (Josef, 21.09.2026) --------------------------------------
//
// „Ich will einen Prompt fuer eine Figur fuer FullRep (Fitnessmann) … Diese
// sollen immer so am Rand des Bildes sein." Anders als `--wz`, das als
// entfaerbte Silhouette HINTER der Karte liegt, steht die Figur freigestellt
// NEBEN dem Text. Anigosha und Swaply bekommen dasselbe System.
//
// ⚠ Der Pfad ist RELATIV ZUR REPO-WURZEL, wie bei `--wz` auch: Der Tageslauf
// ruft dieses Skript aus wellapps-social auf, ein Pfad relativ zum
// Arbeitsverzeichnis zeigte dort ins Leere.
// ⚠ DER DATEINAME WIRD AUFGELOEST, NICHT ROH BENUTZT — und ein Fehlgriff
// bricht ab, statt die Figur wegzulassen.
//
// Gemessen am 22.09.2026 am fertigen Beitrag: Der Tageslauf schickte
// `--figur trainer.png` (so steht es in apps.json, so machen es auch die
// Generatoren von Anigosha und Swaply), hier stand aber ein blosses
// `existsSync(FIGUR)` gegen das Arbeitsverzeichnis. Das war falsch, und
// zwar STILL: `hatFigur` wurde false, die Karte lief durch, das Protokoll
// blieb gruen — und in der Freigabe-App stand eine Rezeptkarte ohne Figur,
// waehrend Anigosha und Swaply ihre trugen.
//
// Ein absoluter Pfad geht weiterhin (so ruft man es von Hand auf); ein
// blosser Dateiname wird unter store-assets/social/figuren/ gesucht.
const FIGUR_ROH = arg('figur', null);
const FIGUR = FIGUR_ROH
  ? (FIGUR_ROH.includes('/') ? join(WURZEL, FIGUR_ROH)
    : join(WURZEL, 'store-assets', 'social', 'figuren', FIGUR_ROH))
  : null;
if (FIGUR && !existsSync(FIGUR)) {
  console.error(`✗ Figur nicht gefunden: ${FIGUR_ROH}`);
  console.error('  Erwartet unter store-assets/social/figuren/ (oder als Pfad');
  console.error('  relativ zur Repo-Wurzel).');
  process.exit(1);
}
const KI_MENSCHEN = process.argv.includes('--ki')
  || Boolean(arg('wz', null)) || Boolean(FIGUR);

const B = 1080, H = 1350;

if (!['mix', 'poster', 'premium', 'zahl'].includes(STIL)) {
  console.error(`✗ unbekannter Stil: ${STIL}\n  Bekannt: mix, poster, premium, zahl`);
  process.exit(1);
}

// ⚠ WARUM DIESE LISTE SEIT DEM 20.09.2026 EXISTIERT.
//
// `inhalt()` prueft das Format mit einer Kette von `if`s und hat am Ende einen
// Default-Zweig (die Wissenskarte). Ein unbekanntes Format landete dort still
// — es sah nicht wie ein Fehler aus, sondern wie ein anderer Inhalt, und der
// Lauf blieb gruen.
//
// Gefunden wurde es an `naehrstoff`: Der Winkel trug in
// wellapps-social/tools/social/ideen/fullrep.json das Format `wissen-karte`,
// das es hier nie gab. Der Filter auf den Ernaehrungsbereich (weiter unten in
// inhalt()) hat deshalb NIE gegriffen; statt eines Mikronaehrstoffs kam
// irgendeines der 24 Wissensthemen. Dasselbe traf drei weitere Winkel.
//
// Ein Abbruch ist der sichere Weg: lauf.mjs faengt ihn, zieht die Kopfzeile
// der Ausnahme heraus und schreibt sie in den Bericht. Lieber ein Post, der
// sichtbar fehlt, als einer, der unbemerkt etwas anderes zeigt.
const FORMATE = ['uebung-karte', 'studien-fakt', 'peptid-karte', 'rezept-karte',
  'naehrstoff', 'wissens-karte', 'app-schau'];
if (!FORMATE.includes(FORMAT)) {
  console.error(`✗ unbekanntes Format: ${FORMAT}\n  Bekannt: ${FORMATE.join(', ')}`);
  process.exit(1);
}

// ⚠ Store-Verfuegbarkeit steht HIER, nicht im Text. Beide Plattformen sind
// seit 29.08.2026 live — steht eine spaeter wieder nicht bereit, wird hier
// umgeschaltet und der zugehoerige Badge verschwindet von selbst.
const STORES = { ios: true, android: true };

function mulberry32(s) {
  return function () {
    s |= 0; s = (s + 0x6d2b79f5) | 0;
    let t = Math.imul(s ^ (s >>> 15), 1 | s);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const T = {
  de: { wissen: 'Wusstest du?', uebung: 'Übung', rezept: 'Rezept', peptid: 'Peptid',
        start: 'Start', ende: 'Ende', pro: 'pro Portion', fuss: 'FullRep · Training & Ernährung',
        // ⚠ Die App fuehrt den Bereich als „Peptide" (Bibliothek → Peptide),
        // nicht als „Peptide-Book". Ein Post darf nichts versprechen, das
        // unter diesem Namen nirgends steht — wer danach sucht, findet es
        // sonst nicht. Die Zahl kommt aus peptideGesamt(), nicht von Hand.
        peptidFuss: (n) => `Alle ${n} Peptide in der App-Bibliothek`,
        peptidZeile: (n) => `Die ganze Peptid-Bibliothek mit allen ${n} Einträgen, `
          + 'Wirkung, Nebenwirkungen und Quellen steht in der App.' },
  en: { wissen: 'Did you know?', uebung: 'Exercise', rezept: 'Recipe', peptid: 'Peptide',
        start: 'Start', ende: 'End', pro: 'per serving', fuss: 'FullRep · Workout & Nutrition',
        peptidFuss: (n) => `All ${n} peptides in the app library`,
        peptidZeile: (n) => `The full peptide library — all ${n} entries with effects, `
          + 'side effects and references — is in the app.' },
}[LANG];

// Wechselnde Aufhaenger. Ein Kanal, auf dem jeder Post mit demselben Wort
// anfaengt, wirkt nach zwei Wochen wie eine Vorlage.
//
// ⚠ VERLAENGERT AM 20.09.2026, auf Josefs Zuruf „nicht immer noch wusstest
// du". Es waren SECHS Eintraege, und sie waren brav: „Studien zeigen" und
// „Niemand sagt dir, dass" halten im Feed an, „Kurz erklaert" nicht.
//
// ⚠ UND EINE FALSCHE DIAGNOSE, DIE HIER STEHEN BLEIBT, damit sie niemand
// wiederholt. Drei von vier Probekarten trugen „Wusstest du"; ich hielt
// `SEED % laenge` fuer die Ursache und ersetzte es durch einen eigenen
// mulberry32. Die Gegenprobe ueber 200 Seeds hat das widerlegt: Modulo
// verteilte exakt gleichmaessig (10× je 20), der Hash dagegen zwischen 8 und
// 29. Modulo ueber fortlaufenden Zahlen IST die perfekte Gleichverteilung.
//
// Die drei Treffer kamen daher, dass ich die Seeds von Hand ausgesucht hatte
// (24, 6, 8, 12) — und 24, 6 und 12 sind alle durch 6 teilbar, bei sechs
// Eintraegen also dreimal Index 0. Ein Artefakt meiner Probe, kein Fehler im
// Code. Die echten Seeds kommen aus `saat(...) % 100000` und haben dieses
// Muster nicht.
//
// Geblieben ist deshalb nur, was wirklich half: mehr und bessere Eintraege.
const AUFHAENGER = {
  de: ['Studien zeigen', 'Niemand sagt dir, dass …', 'Was kaum jemand weiß',
       'Der häufigste Fehler', 'Mythos oder Wahrheit?', 'Die Zahl, die zählt',
       'Überraschend, aber belegt', 'Wusstest du …', 'Das ändert alles',
       'Was die Forschung sagt'],
  en: ['Research shows', 'Nobody tells you this', 'What almost nobody knows',
       'The most common mistake', 'Myth or truth?', 'The number that counts',
       'Surprising, but proven', 'Did you know …', 'This changes everything',
       'What the research says'],
}[LANG];

const esc = (s) => String(s ?? '').replace(/[&<>]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' }[c]));
const b64 = (p) => readFileSync(p).toString('base64');

/**
 * Die kleine Zeile ueber der Schlagzeile — fuer ALLE Stile an einer Stelle.
 *
 * ⚠ Sie stand frueher dreimal verstreut, und zwei der drei Fassungen nahmen
 * `o.marke`. Bei `studien-fakt` sind `marke` und `haken` aber DERSELBE String
 * (siehe inhalt(): beides `p.titel`) — `poster` und `premium` druckten die
 * Schlagzeile dadurch zweimal untereinander, einmal klein und einmal gross.
 * Nur `mix` entkam dem, weil es hier schon den rotierenden Aufhaenger nahm.
 *
 * Deshalb: EINE Quelle, und am Ende die stumpfe Gegenprobe. Faellt die Zeile
 * mit der Schlagzeile zusammen, entfaellt sie lieber ganz — eine leere Stelle
 * ist kein Fehler, eine Dopplung sieht nach einem aus.
 *
 * ⚠ Der wechselnde Aufhaenger gilt weiterhin NUR fuer Studien. Ueber einer
 * Uebungskarte stand sonst „Was die Forschung sagt" ueber einer reinen
 * Bewegungsbeschreibung — das behauptet eine Studienaussage, die es nicht
 * gibt. Uebung und Rezept tragen ihre eigene, sachliche Zeile.
 */
function augenbraueFuer(o, schlagzeile, kandidat = null) {
  const k = kandidat ?? (o.art === 'uebung' ? (o.marke ?? T.uebung)
    : o.art === 'rezept' ? T.rezept
    : o.art === 'wissen' ? (o.augenbraue || T.wissen)
    // Peptidkarten tragen ihre Gattung, nicht den rotierenden Aufhaenger:
    // „Mythos oder Wahrheit?" ueber einer Stoffbeschreibung kuendigt eine
    // Richtigstellung an, die auf der Karte gar nicht kommt.
    : o.art === 'peptid' ? T.peptid
    : AUFHAENGER[SEED % AUFHAENGER.length]);
  const gleich = (a, b) => String(a ?? '').trim().toLowerCase()
    === String(b ?? '').trim().toLowerCase();
  return gleich(k, schlagzeile) ? '' : k;
}

/**
 * Aus der Wirkungsliste eines Peptids einen Satz machen, den man vorlesen kann.
 *
 * ⚠ „Studien zeigen …" — die einzelne Studie wird NICHT genannt (Josef,
 * 20.09.2026). Dieselbe Regel gilt schon fuer `studien-fakt`: Der Name der
 * Arbeit steht nur im Kontrollteil des Beiblatts, falls in den Kommentaren
 * jemand nachfragt.
 *
 * Die Daten sind uneinheitlich: mal ganze Saetze („Beschleunigte Heilung von
 * Sehnen, Baendern, Muskeln und Gelenken."), mal eine Stichwortkette aus
 * sieben Gliedern. Sieben Stichwoerter auf einer Karte sind keine Aussage,
 * sondern ein Schlagwortfeld — deshalb wird gekuerzt.
 *
 * ⚠ Gekuerzt wird aber NUR bei echten Stichwortketten. Enthaelt ein Glied ein
 * „und", ist es das Ende einer Aufzaehlung („Muskeln und Gelenken") — dort
 * abzuschneiden ergaebe einen halben Satz. Die Probe kostet eine Zeile und
 * rettet genau den haeufigsten Fall.
 */
const STUDIEN_VORSPANN = { de: 'Studien zeigen: ', en: 'Research shows: ' }[LANG];
const UND = { de: ' und ', en: ' and ' }[LANG];

function studienSatz(wirkung, hoechstens = 3, max = 120) {
  const roh = String(wirkung ?? '').replace(/\s+/g, ' ').trim();
  if (!roh) return '';
  let kern = roh.split(/(?<=[.!?])\s+/)[0].replace(/[.;,\s]+$/, '');

  const teile = kern.split(/,\s*/);
  if (teile.length > hoechstens && !teile.some((t) => t.includes(UND))) {
    kern = teile.slice(0, hoechstens).join(', ');
  }
  if (kern.length > max) {
    kern = `${kern.slice(0, max - 1).replace(/[\s,;:–—-]+$/, '')}…`;
  }
  // ⚠ Die Grossschreibung bleibt, wie sie ist. „Studien zeigen:
  // kollagenproduktion" waere falsch (Substantiv), „beschleunigte Heilung"
  // waere richtig — welches von beidem vorliegt, kann hier niemand wissen.
  return `${STUDIEN_VORSPANN}${kern}${kern.endsWith('…') ? '' : '.'}`;
}

/**
 * Aus dem Studienwert die eine Zahl machen, die das Bild traegt.
 *
 * Die Werte sind uneinheitlich gewachsen:
 *
 *   „~27 % geringeres Gesamtsterblichkeitsrisiko"  → 27 % · geringeres …
 *   „2× pro Woche"                                 → 2× · pro Woche
 *   „28 %"                                         → 28 % · <Titel>
 *   „10+ Saetze pro Muskelgruppe und Woche"        → 10+ · Saetze pro …
 *
 * ⚠ Die Tilde und das „ca." fallen weg, die ZAHL nicht. „~27 %" gross zu
 * setzen saehe nach einem Tippfehler aus; der Vorbehalt steht ohnehin im
 * Erklaertext darunter, wo der Wert unveraendert erscheint.
 *
 * ⚠ Gibt es keine fuehrende Zahl, kommt null zurueck — und der Stil faellt
 * auf `premium` zurueck, statt eine zu erfinden. Zwei der 26 Eintraege haben
 * gar keinen Wert („Frequenz ist zweitrangig", „HIIT fuer die Ausdauer"),
 * und Spannen wie „1,6–2,2 g pro kg" sind bewusst KEINE grosse Zahl: Ein
 * Bereich in 250 px liest sich nicht.
 */
function studienZahl(wert, titel) {
  const roh = String(wert ?? '').replace(/\s+/g, ' ').trim()
    .replace(/^(?:ca\.|etwa|rund|~|≈)\s*/i, '');
  // ⚠ SPANNEN ZUERST AUSSCHLIESSEN, nicht per Lookahead im Muster.
  // Mit `(?![–-]\s*\d)` hinter der Zahl backtrackt die Regex: Bei
  // „1,6–2,2 g pro kg" scheitert der Lookahead nach „1,6", die Engine nimmt
  // dann „1" — und heraus kam die Zahl 1 mit dem Label „6–2,2 g pro kg".
  // Eine falsche Zahl, gross auf dem Bild. Eine eigene Probe vorweg kann
  // nicht backtracken.
  if (/\d\s*[–\-−]\s*\d/.test(roh)) return null;

  // ⚠ Symbole und Wort-Einheiten brauchen VERSCHIEDENE Grenzen.
  //   `%` und `×` sind keine Wortzeichen — ein `\b` dahinter schlaegt fehl,
  //     und „2× pro Woche" wurde zu „2" mit dem Label „× pro Woche".
  //   `min`, `g`, `h` brauchen das `\b` dagegen zwingend: Ohne es frass die
  //     Einheit den Wortanfang, und aus „4 Minuten Ganzkoerper-Intervalle"
  //     wurde „4 Min" ueber „uten Ganzkoerper-Intervalle".
  // Deshalb zwei Gruppen statt einer Alternativenliste.
  const t = /^(\d+(?:[.,]\d+)?)(\+)?\s*(?:(%|×|x)|(ml\/kg\/min|mg|kg|min|IE|g|h)\b)?/i
    .exec(roh);
  if (!t || !t[1]) return null;
  const einheit = (t[3] ?? t[4] ?? '').replace(/^x$/i, '×');
  const rest = roh.slice(t[0].length).replace(/^[\s.,;:–—-]+/, '').trim();
  return {
    wert: `${t[1]}${t[2] ?? ''}`,
    einheit,
    // Ohne Rest traegt der Titel das Label — sonst stuende unter einer
    // nackten „28" nichts, was sie erklaert.
    label: rest || titel,
    // Der Titel wandert unter die Zahl, wie der Peptidname. Faellt er mit dem
    // Label zusammen, entfaellt er: eine Dopplung sieht nach einem Fehler aus.
    titel: rest ? titel : null,
  };
}

/**
 * Naehrwerte — frueher NUR im Stil `premium`.
 *
 * ⚠ Der Tageslauf baut alles im Stil `mix` (motoren.mjs ruft ohne --stil auf),
 * also ging bis zum 18.09.2026 jedes Rezept OHNE Makros raus: Name, ein Satz
 * Prosa, sonst nichts. Bei einem Fitnessrezept ist die Eiweisszahl das
 * Interessanteste, das die Karte zu bieten hat. Sie stand berechnet in `o`
 * und wurde weggeworfen.
 */
/**
 * @param {object} o
 * @param {?string} ausser  Beschriftung, die weggelassen wird — fuer den Stil
 *   `zahl`, wo einer der Werte schon als grosse Zahl darueber steht.
 */
function makrosHtml(o, ausser = null) {
  if (!o.makros?.length) return '';
  const zeigen = ausser
    ? o.makros.filter(([, l]) => l.toLowerCase() !== String(ausser).toLowerCase())
    : o.makros;
  if (!zeigen.length) return '';
  return `<div class="makros makros-${zeigen.length}">${zeigen.map(([v, l]) =>
    `<div><b>${esc(v)}</b><span>${esc(l)}</span></div>`).join('')}</div>`;
}

// --- Die Folgefolien eines Rezepts ------------------------------------------
//
// Folie 1 ist das Plakat (Name, Beschreibung, Makros, Figur) — sie bleibt,
// wie sie war, und entscheidet im Feed, ob jemand weiterwischt. Folie 2 und 3
// liefern dann, was Folie 1 verspricht.
//
// ⚠ Zwei Folien, nicht eine. Zusammengelegt waeren es im Hoechstfall zwoelf
// Zutaten UND sechs Schritte zu je 146 Zeichen auf einer Karte — gemessen am
// 22.09. ueber alle 25 Rezepte. Das passt nur bei einer Schriftgroesse, bei
// der es auf dem Telefon niemand liest.
//
// ⚠ Die Nummern der Schritte stehen im Markup, nicht in <ol>. Ein <ol> zaehlt
// selbst, aber es laesst die Ziffer nicht gesondert gestalten — und die Ziffer
// ist hier das, was die Folie ordnet.
//
// ⚠ DIE STUFE WIRD GEMESSEN, NICHT GERATEN. Hier stand zuerst „ab neun
// Zutaten zwei Spalten, ab fuenf Schritten enger" — zwei Schwellen nach
// Augenmass. Sie sagen nichts ueber die LAENGE der Eintraege: vier sehr lange
// Schritte brauchen mehr Platz als sechs kurze. Und sie setzen auch dann eng,
// wenn Platz da waere: kleine Schrift ueber leerem Drittel.
//
// Der Aufrufer rendert deshalb Stufe 0, MISST den Ueberlauf und geht nur dann
// eine Stufe weiter. Dieselbe Regel wie bei den Bestandszahlen der App-Schau:
// jede Zahl gezaehlt, keine getippt.
//
// | Stufe | Zutaten | Zubereitung |
// |---|---|---|
// | 0 | eine Spalte, gross | grosse Schrift |
// | 1 | ZWEI Spalten, gleiche Groesse | (unveraendert) |
// | 2 | zwei Spalten, kleiner | kleinere Schrift |
//
// ⚠ Stufe 1 ist der Grund, warum es drei Stufen sind und nicht zwei. Zuerst
// sprang die Liste von „eine Spalte gross" direkt auf „zwei Spalten klein" —
// zwei Aenderungen auf einmal. Die Lasagne lief einspaltig um 46px ueber und
// landete dadurch bei einer Fassung, die ein Drittel der Karte leer liess.
// Eine Stufe aendert eine Sache.
function rezeptFolien(o, stufe = 0) {
  const t = LANG === 'de'
    ? { zutaten: 'Zutaten', zubereitung: 'Zubereitung',
        fuer: (n) => `für ${n} Portion${n === 1 ? '' : 'en'}`, min: (n) => `${n} Min` }
    : { zutaten: 'Ingredients', zubereitung: 'Method',
        fuer: (n) => `for ${n} serving${n === 1 ? '' : 's'}`, min: (n) => `${n} min` };

  const kopf = (rubrik, beiwerk) => `
      <div class="marke">${esc(rubrik)}</div>
      <h1 class="folienTitel">${esc(o.haken)}</h1>
      <div class="folienBeiwerk">${esc(beiwerk)}</div>`;

  // ⚠ Die Kalorien stehen auf JEDER Folie, nicht nur auf dem Plakat. Im
  // Karussell wischt man einzeln weiter, und die Zutatenfolie wird ohne sie
  // genauso zur Behauptung ohne Zahl wie die Karte, die Josef am 22.09.
  // geloescht hat.
  const kcal = o.makros?.find(([, l]) => l === 'kcal')?.[0];
  const beiwerk = (...teile) => [...teile, kcal ? `${kcal} kcal` : null]
    .filter(Boolean).join(' · ');

  return [
    {
      mitte: `${kopf(t.zutaten, beiwerk(t.fuer(o.portionen), t.min(o.zeit)))}
      <ul class="zutaten${stufe >= 1 ? ' zweiSpalten' : ''}${stufe >= 2 ? ' engZutaten' : ''}">
        ${o.zutaten.map((z) => `<li>${esc(z)}</li>`).join('')}
      </ul>`,
    },
    {
      mitte: `${kopf(t.zubereitung, beiwerk(t.min(o.zeit), t.fuer(o.portionen)))}
      <div class="schritte${stufe >= 2 ? ' engSchritte' : ''}">
        ${o.schritte.map((s, i) => `
        <div class="schritt"><b class="anton">${i + 1}</b><p>${esc(s)}</p></div>`).join('')}
      </div>`,
    },
  ];
}

// --- Inhalt waehlen ---------------------------------------------------------
function inhalt(format, w) {
  const zieh = (m) => m[Math.floor(w() * m.length)];

  if (format === 'uebung-karte') {
    const u = zieh(uebungenMitFotos());
    const t = uebungTexte(u, LANG);
    return {
      art: 'uebung', schluessel: u.id,
      marke: t.muskel, haken: t.name, text: t.beschreibung,
      fotos: u.fotos, zusatz: t.geraet,
    };
  }

  if (format === 'studien-fakt') {
    const alle = studienPosts();
    const p = zieh(alle);
    return {
      art: 'studie', schluessel: p.id,
      marke: p.titel[LANG] ?? p.titel.de,
      haken: p.titel[LANG] ?? p.titel.de,
      text: p.aussage[LANG] ?? p.aussage.de,
      studienwert: p.wert ? (p.wert[LANG] ?? p.wert.de) : null,
      // Der Studienname steht NICHT im Bild (Josefs Entscheidung), sondern nur
      // im Kontrollteil des Beiblatts — zur Hand, wenn in den Kommentaren
      // jemand nachfragt.
      studie: p.studie,
      // ⚠ Bis zum 20.09.2026 hatte `studien-fakt` den Stil `zahl` NICHT, mit
      // der Begruendung „studien-fakt liefert keine Zahl". Das stimmte nie:
      // `wert` ist bei 24 von 26 Eintraegen gefuellt, und es sind die
      // staerksten Zahlen der ganzen App — „~27 % geringeres
      // Gesamtsterblichkeitsrisiko", „28 %", „~50 % weniger
      // Trainingsvolumen". Sie standen bisher klein im Studienblock unter der
      // Karte, wo sie niemand zuerst sieht.
      zahl: studienZahl(p.wert ? (p.wert[LANG] ?? p.wert.de) : null,
        p.titel[LANG] ?? p.titel.de),
      autoFoto: FOTO_BEREICHE.has(p.bereich) || p.bereich === 'cardio'
        ? trainingsFoto(w) : null,
    };
  }

  if (format === 'peptid-karte') {
    const p = zieh(peptidePosts());
    return {
      art: 'peptid', schluessel: p.id,
      marke: p.name[LANG] ?? p.name.de,
      haken: studienSatz(p.wirkung[LANG] || p.wirkung.de),
      // ⚠ ZWEI Textbloecke, nicht einer (Josef am fertigen Post, 20.09.2026:
      // „Ganze Saetze und nicht nur Stichwoerter"). Die Karte zeigte bis
      // dahin nur die Wirkung, und die steht in den Daten als Stichwortkette.
      // `erklaerung` ist Fliesstext aus dem ersten Kapitel und sagt, was der
      // Stoff ueberhaupt IST — die Frage, die eine Wirkungsliste offen laesst.
      text: p.erklaerung[LANG] || p.erklaerung.de,
      // Der zweite Absatz auf der Karte. Inhaltsgleich mit `haken` — den
      // braucht die Bildunterschrift (unten) und die Frage-Probe, und beide
      // duerfen sich nicht darauf verlassen, welchen Stil das Bild gerade
      // traegt. Nur `zahl` wertet `nachsatz` aus.
      nachsatz: studienSatz(p.wirkung[LANG] || p.wirkung.de),
      // ⚠ Die Kettenlaenge steht NICHT als Zahl im Datensatz. Sie kommt aus
      // dem Wort, das die App selbst benutzt: „Pentadecapeptid" heisst 15.
      // Siehe kettenLaenge() in social-daten.mjs — Peptide ohne dieses Wort
      // fallen dort weg, statt hier eine Zahl zu bekommen.
      zahl: {
        wert: String(p.laenge), einheit: '',
        label: LANG === 'de' ? 'Aminosäuren' : 'amino acids',
        titel: p.name[LANG] ?? p.name.de,
      },
      // Nur fuers Beiblatt, nicht fuer das Bild — wie bei `studien-fakt`.
      quellen: p.quellen,
    };
  }

  if (format === 'rezept-karte') {
    const r = zieh(rezepteMitMakros());
    const n = r.nutrition;
    return {
      art: 'rezept', schluessel: r.id,
      marke: T.rezept, haken: LANG === 'de' ? r.nameDE : r.nameEN,
      text: LANG === 'de' ? r.descDE : r.descEN,
      // ⚠ DAS REZEPT SELBST. Bis zum 22.09.2026 endete dieser Block bei Name,
      // Beschreibung und Makros — die Karte nannte ein Gericht und hielt die
      // Anleitung zurueck, obwohl sie vollstaendig danebenlag.
      //
      // Josef am 22.09. vor der fertigen Karte: „was fuer lasagne?! entweder
      // du schreibst das exakte rezept oder du laesst es". Er hat recht: Ein
      // Beitrag, der einen Namen zeigt und nichts dahinter hat, ist eine
      // Ankuendigung ohne Ware — und auf einem Kanal, der von Vertrauen lebt,
      // kostet das mehr, als er einbringt.
      //
      // Gemessen am 22.09.: alle 25 Rezepte sind vollstaendig — 4 bis 12
      // Zutaten, 3 bis 6 Schritte, jedes mit Zeit und Portionen. Es gab also
      // nie einen Grund, sie wegzulassen.
      zutaten: LANG === 'de' ? r.ingredientsDE : r.ingredientsEN,
      schritte: LANG === 'de' ? r.stepsDE : r.stepsEN,
      zeit: r.prepTime,
      portionen: r.servings,
      makros: [
        [`${n.calories}`, 'kcal'], [`${n.protein} g`, LANG === 'de' ? 'Eiweiß' : 'protein'],
        [`${n.carbs} g`, LANG === 'de' ? 'Kohlenhydrate' : 'carbs'], [`${n.fat} g`, LANG === 'de' ? 'Fett' : 'fat'],
      ],
      // Fuer den Stil `zahl`: Eiweiss ist die Zahl, die bei einem Fitnessrezept
      // wirklich jemanden interessiert.
      zahl: { wert: String(n.protein), einheit: 'g',
              label: LANG === 'de' ? `Eiweiß ${T.pro}` : `protein ${T.pro}` },
    };
  }

  // ⚠ DIE EINZIGE KARTE, DIE DIE APP SELBST ZEIGT (Josef, 20.09.2026: „Es
  // sollen generell Posts sein, die zeigen, worum es in der App geht").
  // Jeder andere Winkel zeigt einen INHALT — eine Studie, ein Rezept, ein
  // Peptid. Wer den Kanal drei Wochen verfolgt, weiss danach, dass es um
  // Fitness geht, aber nicht, dass es eine App dazu gibt.
  //
  // Die Bilder sind die ECHTEN Store-Screenshots aus store-assets/ios/. Kein
  // Nachbau: Ein gezeichneter Screenshot waere eine Behauptung ueber die
  // Oberflaeche, und er veraltet still, sobald sich die App aendert. Diese
  // hier liegen im Store und sind damit genau das, was der Nutzer bekommt.
  //
  // ⚠ Sie enthalten KEINE Uebungsdemofotos — geprueft am 20.09.2026 an allen
  // sechs. Die duerfen seit dem 30.08. nicht in Werbung (Rechtekette nicht
  // belegt, siehe Kopf von social-daten.mjs); ein Screenshot, auf dem eines
  // zu sehen waere, faellt unter dieselbe Regel wie das Foto selbst.
  if (format === 'app-schau') {
    const z = bestandszahlen();
    // Drei Aufzuege, damit der Winkel bei Wiederholung nicht gleich aussieht.
    // Jeder nennt einen anderen Teil der App und zeigt die dazu passenden
    // Bildschirme — die Bilder folgen der Schlagzeile, nicht umgekehrt.
    const aufzuege = [
      {
        kurz: { de: ['Training und Ernährung.', 'Eine App.'],
                en: ['Training and nutrition.', 'One app.'] },
        text: { de: 'Kalorien, Makros, Gewicht und Trainingsplan an einem Ort — '
                  + 'ohne dass du zwischen drei Apps wechselst.',
                en: 'Calories, macros, weight and your training plan in one place — '
                  + 'no switching between three apps.' },
        bilder: ['01-dashboard.png', '02-ernaehrung.png', '04-training.png'],
        punkte: { de: [`${z.uebungen} Übungen`, `${z.rezepte} Rezepte`, `${z.programme} Programme`],
                  en: [`${z.uebungen} exercises`, `${z.rezepte} recipes`, `${z.programme} programs`] },
      },
      {
        kurz: { de: ['Nicht raten.', 'Nachlesen.'], en: ['Stop guessing.', 'Look it up.'] },
        text: { de: `Eine Bibliothek aus ${z.wissen} Wissensthemen und ${z.peptide} Peptiden — `
                  + 'jede Aussage mit der Studie dahinter, nicht mit einer Meinung.',
                en: `A library of ${z.wissen} knowledge topics and ${z.peptide} peptides — `
                  + 'every claim with the study behind it, not an opinion.' },
        bilder: ['06-uebungen.png', '01-dashboard.png', '03-kochbuch.png'],
        punkte: { de: [`${z.wissen} Themen`, `${z.peptide} Peptide`, 'mit Quellen'],
                  en: [`${z.wissen} topics`, `${z.peptide} peptides`, 'with sources'] },
      },
      // ⚠ Die drei HAUPTBEREICHE der App, so wie die Leiste unten sie fuehrt
      // (Josef, 20.09.2026). Das ist der Aufzug, der am direktesten
      // beantwortet, worum es geht — die anderen zeigen einen Ausschnitt.
      {
        kurz: { de: ['Drei Bereiche.', 'Eine App.'], en: ['Three sections.', 'One app.'] },
        text: { de: 'Training planen, Ernährung tracken, alles nachlesen — '
                  + 'was du brauchst, liegt hinter drei Knöpfen.',
                en: 'Plan your training, track your nutrition, look everything up — '
                  + 'what you need sits behind three buttons.' },
        bilder: ['04-training.png', '02-ernaehrung.png', '07-bibliothek.png'],
        punkte: { de: ['Training', 'Ernährung', 'Bibliothek'],
                  en: ['Training', 'Nutrition', 'Library'] },
      },
      {
        kurz: { de: [`${z.programme} Programme.`, 'Such dir eines aus.'],
                en: [`${z.programme} programs.`, 'Pick one.'] },
        text: { de: 'Vom Wiedereinstieg bis zur Wettkampfvorbereitung — jedes Programm '
                  + 'mit Wochenplan, Übungen und Sätzen.',
                en: 'From getting back in shape to contest prep — each program with a '
                  + 'weekly plan, exercises and sets.' },
        bilder: ['05-peak-programme.png', '04-training.png', '06-uebungen.png'],
        punkte: { de: [`${z.uebungen} Übungen`, `${z.programme} Programme`, 'ohne Abo'],
                  en: [`${z.uebungen} exercises`, `${z.programme} programs`, 'no subscription'] },
      },
    ];
    const a = zieh(aufzuege);
    // ⚠ ZWEI Ordner. Die sechs Store-Bilder liegen in store-assets/ios/ —
    // dort fehlt aber die BIBLIOTHEK, weil sie im Store-Eintrag nicht
    // vorkommt (die sechs zeigen Training, Ernaehrung und deren
    // Unterseiten). Was dort fehlt, nimmt scripts/social-schirme.mjs auf und
    // legt es nach store-assets/social/schirme/ — getrennt, damit ein Lauf
    // fuer Social nie die Bilder anfasst, die bei Apple und Google haengen.
    const schirmPfad = (datei) => {
      for (const o of [['store-assets', 'ios'], ['store-assets', 'social', 'schirme']]) {
        const p = join(WURZEL, ...o, datei);
        if (existsSync(p)) return p;
      }
      return null;
    };
    return {
      art: 'app', schluessel: a.bilder[0].replace(/\.png$/, ''),
      marke: T.fuss,
      kurz: a.kurz[LANG] ?? a.kurz.de,
      haken: (a.kurz[LANG] ?? a.kurz.de).join(' '),
      text: a.text[LANG] ?? a.text.de,
      punkte: a.punkte[LANG] ?? a.punkte.de,
      schirme: a.bilder.map(schirmPfad).filter(Boolean),
      autoFoto: trainingsFoto(w),
    };
  }

  // wissens-karte und naehrstoff teilen sich das Layout; naehrstoff zieht
  // ausschliesslich aus dem Ernaehrungsbereich.
  const themen = wissensthemen().filter(
    (t) => (format === 'naehrstoff' ? t.bereich === 'nutrition' : true),
  );
  const th = zieh(themen);
  const quick = (th.quick[LANG]?.length ? th.quick[LANG] : th.quick.de) ?? [];
  const q = zieh(quick.length ? quick : [{ label: '', text: th.zusammenfassung[LANG] }]);

  // Fuer den Stil `zahl`: eine Zahl im Text suchen, KEINE erfinden. Findet sich
  // keine, faellt der Stil weiter unten auf `premium` zurueck.
  const treffer = (q.text ?? '').match(/(\d+(?:[.,]\d+)?)\s*(%|g\/kg|g|kcal|mg|Wochen|weeks|Sätze|sets)?/);

  // Die AUSSAGE ist die Schlagzeile, nicht das Label. Mit „Funktion" gross und
  // dem Inhalt klein darunter las sich die Karte wie ein Inhaltsverzeichnis.
  return {
    art: 'wissen', schluessel: th.id,
    marke: th.titel[LANG] ?? th.titel.de,
    augenbraue: q.label || T.wissen,
    haken: q.text, text: null,
    zahl: treffer ? { wert: treffer[1], einheit: treffer[2] ?? '', label: q.label || th.titel[LANG] } : null,
    // Trainings- und Supplementthemen bekommen ein echtes Uebungsfoto in den
    // Hintergrund — sonst sieht der Kanal aus wie eine Folge schwarzer
    // Textkacheln. Ernaehrung und Blutwerte bleiben typografisch: dafuer gibt
    // es im Repo kein passendes Bild, und ein beliebiges waere schlechter
    // als keines.
    autoFoto: FOTO_BEREICHE.has(th.bereich) ? trainingsFoto(w) : null,
  };
}

// --- Bausteine, die alle Stile teilen ---------------------------------------
function badgesHtml() {
  const dateien = [];
  if (STORES.ios) dateien.push('appstore-en.png');
  if (STORES.android) dateien.push('googleplay-en.png');
  return dateien
    .map((f) => join(WURZEL, 'scripts', 'badges', f))
    .filter((f) => existsSync(f))
    .map((f) => `<img src="data:image/png;base64,${b64(f)}" alt="">`)
    .join('');
}

// Filmkorn als eingebettetes SVG. Ein echtes Rauschbild waere groesser und
// muesste gekachelt werden; feTurbulence rechnet der Browser selbst.
const KORN = Buffer.from(
  `<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200">
     <filter id="k"><feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="3"/>
     <feColorMatrix type="saturate" values="0"/></filter>
     <rect width="200" height="200" filter="url(#k)" opacity="0.5"/></svg>`,
).toString('base64');

// --- Die Karte --------------------------------------------------------------
/**
 * @param {object} o     Der Inhalt
 * @param {string} stil  Einer der vier Stile
 * @param {?object} folge  Nur fuer die FOLGEFOLIEN eines Karussells:
 *   `{ mitte }` ersetzt den Mittelteil. Alles andere — Kopf, Fuss, Ring,
 *   Korn, Schriften — bleibt gleich, damit die Folien wie ein Satz aussehen
 *   und nicht wie drei Karten.
 *
 *   ⚠ AUF DEN FOLGEFOLIEN STEHT KEINE FIGUR. Sie kostet 250 px rechte
 *   Polsterung (`body.mitFigur`), und genau die braucht eine Liste mit zwoelf
 *   Zutaten. Die Figur begruesst auf Folie 1, danach zaehlt der Inhalt.
 *
 *   ⚠ UND DAMIT AUCH KEIN KI-KENNZEICHEN. Das Kennzeichen gehoert an das
 *   Bild, das KI-erzeugte Menschen ZEIGT. Auf einer reinen Textfolie waere es
 *   eine Aussage ueber nichts — und ein Kennzeichen, das ueberall steht, sagt
 *   nirgends mehr etwas.
 */
function baueHtml(o, stil, folge = null) {
  const inter400 = b64(join(WURZEL, 'node_modules/@fontsource/inter/files/inter-latin-400-normal.woff2'));
  const inter700 = b64(join(WURZEL, 'node_modules/@fontsource/inter/files/inter-latin-700-normal.woff2'));
  const antonPfad = join(WURZEL, 'scripts', 'schriften', 'anton.woff2');
  const anton = existsSync(antonPfad) ? b64(antonPfad) : null;
  const logo = b64(join(WURZEL, 'public/favicon.svg'));
  // ⚠ Fuer den Hintergrund muss die Platte raus. favicon.svg traegt als erstes
  // ein deckendes #0a0a0a-Rechteck mit rx=100 — bei jeder Deckkraft ueber ~.08
  // zeichnet sich dessen Kante als dunkles Viereck quer ueber die Karte ab.
  // Ohne das Rechteck bleiben nur die goldenen Striche, und genau die sollen
  // sichtbar sein. Im Kopf bleibt das Logo MIT Platte — dort ist das gerundete
  // Quadrat das Icon.
  const logoRing = Buffer.from(
    readFileSync(join(WURZEL, 'public/favicon.svg'), 'utf8').replace(/<rect\b[^>]*\/>/, ''),
  ).toString('base64');

  const hgPfad = HINTERGRUND ?? o.autoFoto ?? (o.fotos?.[1] ?? null);
  // ⚠ Auf den Folgefolien bleibt der Untergrund leer — aus demselben Grund
  // wie bei der Figur. Ein Foto oder Wasserzeichen unter einer Liste aus
  // zwoelf Zutaten nimmt genau die Ruhe weg, von der sie lebt. Und weil damit
  // kein KI-Bild mehr auf der Folie liegt, faellt auch das Kennzeichen weg.
  const hatFoto = hgPfad && existsSync(hgPfad) && !folge;
  const hatWz = WZ && existsSync(WZ) && !folge;
  // Die Datei ist oben schon geprueft; fehlt sie, laeuft dieses Skript gar
  // nicht bis hierher. Ein zweites `existsSync` waere die Gelegenheit, den
  // Fall doch wieder still zu machen.
  const hatFigur = Boolean(FIGUR) && !folge;
  const kiMarke = KI_MENSCHEN && !folge
    ? (WASSERZEICHEN_HTML[LANG] ?? WASSERZEICHEN_HTML.de) : '';

  // --- Mitte je Stil --------------------------------------------------------
  let mitte = '';
  // Eine Folgefolie bringt ihren Mittelteil selbst mit und geht an der
  // Stilweiche vorbei. `--stil` beschreibt den Aufbau der ERSTEN Folie; auf
  // eine Zutatenliste angewandt waere er sinnlos (`zahl` verlangt eine grosse
  // Zahl, `poster` eine 104-px-Schlagzeile ueber der Liste).
  if (folge) mitte = folge.mitte;
  // ⚠ Die App-Schau hat KEINEN Stil und darf keinen haben. Die vier Stile sind
  // Varianten EINES Aufbaus (Aufhaenger, Schlagzeile, Text); diese Karte hat
  // einen anderen — drei Bildschirme tragen sie, und Text ist Beiwerk. Sie
  // durch die Stilweiche zu schicken hiesse, dass `--stil zahl` eine grosse
  // Zahl ohne Zahl verlangt und `poster` eine 104-px-Schlagzeile ueber die
  // Screenshots legt. Deshalb steht sie VOR der Weiche und ignoriert `stil`.
  else if (o.art === 'app') {
    mitte = `
      <div class="schau">
        <div class="schauKopf">
          <h1 class="anton schauZeile">${esc(o.kurz[0])}<br><i>${esc(o.kurz[1] ?? '')}</i></h1>
          <p class="text schauText">${esc(o.text)}</p>
        </div>
        <div class="schirme">${o.schirme.map((s, i) => `
          <img class="schirm s${i}" src="data:image/png;base64,${b64(s)}">`).join('')}</div>
        <div class="punkte">${o.punkte.map((p) => `<span>${esc(p)}</span>`).join('')}</div>
      </div>`;
  } else if (stil === 'mix') {
    // Der Dreiklang. Aufhaenger wechselt nach Seed, Ueberschrift skaliert nach
    // Laenge, der Studienblock faellt weg, wenn es keinen Wert gibt.
    const kurz = o.art === 'wissen' ? o.marke : o.haken;
    const auge = augenbraueFuer(o, kurz);
    const lang = o.art === 'wissen' ? o.haken : o.text;
    const wert = o.studienwert ?? null;
    const px = kurz.length > 26 ? 60 : kurz.length > 16 ? 74 : 96;
    mitte = `
      <div class="mixText">
        ${auge ? `<div class="augenbraue">${esc(auge)}</div>` : ''}
        <h1 class="anton" style="font-size:${px}px">${esc(kurz)}</h1>
        ${lang ? `<p class="text">${esc(lang)}</p>` : ''}
        ${makrosHtml(o)}
        ${wert ? `
        <div class="studie">
          <div class="kante"></div>
          <div class="studieLabel">${LANG === 'de' ? 'Laut Studien' : 'Research says'}</div>
          <div class="studieWert">${esc(wert)}</div>
        </div>` : ''}
      </div>`;
  } else if (stil === 'poster') {
    // ⚠ Ein Plakat traegt EIN kurzes Wort gross, nicht einen ganzen Satz.
    // Beim ersten Versuch stand die komplette Aussage in 104-px-Versalien und
    // verdeckte das halbe Foto. Deshalb: kurzer Name als Schlagzeile, die
    // Aussage darunter im Fliesstext.
    const kurz = o.art === 'wissen' ? o.marke : o.haken;
    const lang = o.art === 'wissen' ? o.haken : o.text;
    const auge = augenbraueFuer(o, kurz);
    // Schriftgroesse folgt der Laenge — sonst bricht ein langer Rezeptname um
    // und schiebt den Fuss aus dem Bild.
    const px = kurz.length > 26 ? 68 : kurz.length > 16 ? 86 : 116;
    mitte = `
      <div class="posterText">
        ${auge ? `<div class="augenbraue">${esc(auge)}</div>` : ''}
        <h1 class="anton" style="font-size:${px}px">${esc(kurz)}</h1>
        <div class="kante"></div>
        ${lang ? `<p class="text">${esc(lang)}</p>` : ''}
        ${makrosHtml(o)}
        ${o.studienwert ? `
        <div class="studie">
          <div class="kante"></div>
          <div class="studieLabel">${LANG === 'de' ? 'Laut Studien' : 'Research says'}</div>
          <div class="studieWert">${esc(o.studienwert)}</div>
        </div>` : ''}
      </div>`;
  } else if (stil === 'zahl') {
    // ⚠ Hier traegt die ZAHL das Bild, nicht `marke`. Die Zeile darunter
    // (`zahl.label`) ist das, wogegen die Augenbraue sich abgrenzen muss —
    // bei einer Wissenskarte ohne eigenes Label waeren sonst beide der
    // Themenname.
    const auge = augenbraueFuer(o, o.zahl.label, o.art === 'wissen' ? o.marke : null);
    const gleichWie = (a, b) => String(a ?? '').trim().toLowerCase()
      === String(b ?? '').trim().toLowerCase();
    // ⚠ ZWEI Absaetze, wo es zwei gibt (Josef am fertigen Post, 20.09.2026:
    // „Ganze Saetze und nicht nur Stichwoerter"). `text` sagt, was der Stoff
    // IST, `nachsatz` was Studien dazu zeigen. Nur Formate, die `nachsatz`
    // setzen, bekommen den zweiten Block — Rezept, Wissen und Studie bleiben
    // unveraendert bei einem.
    //
    // Der Fliesstext ist `text`, WO ES IHN GIBT — sonst `haken`.
    const absaetze = [o.text || o.haken, o.nachsatz]
      .map((s) => String(s ?? '').trim())
      .filter(Boolean)
      // ⚠ Gegen die Schlagzeile und das Label: Bei `studien-fakt` sind `marke`
      // und `haken` derselbe String (beides `p.titel`, siehe inhalt()), und
      // der steht schon gross als `zahlTitel` darueber. Ohne diese Probe stand
      // der Titel zweimal untereinander — einmal gross als Schlagzeile, einmal
      // klein als Erklaerung. Dieselbe Dopplung hat schon `poster` und
      // `premium` getroffen; der Kommentar bei augenbraueFuer() haelt sie fest.
      .filter((s) => !gleichWie(s, o.zahl.titel) && !gleichWie(s, o.zahl.label))
      // und gegeneinander
      .filter((s, i, alle) => alle.findIndex((x) => gleichWie(x, s)) === i);
    mitte = `
      <div class="zahlBlock">
        ${auge ? `<div class="augenbraue">${esc(auge)}</div>` : ''}
        <div class="grosseZahl"><b class="anton">${esc(o.zahl.wert)}</b><i>${esc(o.zahl.einheit)}</i></div>
        <div class="zahlLabel">${esc(o.zahl.label)}</div>
        ${o.zahl.titel ? `<h1 class="anton zahlTitel">${esc(o.zahl.titel)}</h1>` : ''}
        ${absaetze.map((s) => `<p class="text">${esc(s)}</p>`).join('')}
        ${
          // ⚠ DIE NAEHRWERTE FEHLTEN HIER GANZ (Josef, 22.09.2026, vor einem
          // veroeffentlichten Beitrag: „bei so einem post sollte … auch die
          // gesamtkalorien draufstehen … habe ihn deshalb wieder geloescht").
          //
          // Der Stil `zahl` zeigte nur die grosse Zahl und den Text. Bei einer
          // Rezeptkarte hiess das: Eiweiss gross, und sonst KEIN einziger
          // Naehrwert — keine Kalorien, keine Kohlenhydrate, kein Fett. Die
          // Werte standen berechnet in `o.makros` und wurden weggeworfen.
          // Genau derselbe Fehler wie bei „Wie viel Kreatin?" am 20.09. und
          // beim Rezepttext am 22.09.: Die Daten waren da, der Stil hatte
          // keinen Block dafuer.
          //
          // ⚠ Der Wert, der schon oben gross steht, faellt raus. Sonst stuende
          // „38 g Eiweiss" zweimal auf derselben Karte.
          o.art === 'rezept' ? makrosHtml(o, o.zahl.label.split(' ')[0]) : ''
        }
      </div>`;
  } else {
    // `o.fotos?.length`, nicht `o.fotos`: Das Array ist heute leer, und ein
    // leeres Array ist wahr — sonst stuende hier ein leerer Rahmen im Layout.
    const fotos = o.fotos?.length
      ? `<div class="fotos">${o.fotos.map((f, i) => `
          <figure><img src="data:image/jpeg;base64,${b64(f)}">
          <figcaption>${i === 0 ? T.start : T.ende}</figcaption></figure>`).join('')}</div>`
      : '';
    // ⚠ Die Pille traegt hier `marke`, nicht den Aufhaenger — das ist ihre
    // eigene Rolle. Sie muss sich aber gegen `haken` abgrenzen: bei einer
    // Studienkarte sind beide derselbe String, und die Pille wiederholte
    // wortgleich die Ueberschrift darunter.
    const pille = augenbraueFuer(o, o.haken, o.marke);
    mitte = `
      ${pille ? `<div class="marke">${esc(pille)}</div>` : ''}
      ${o.augenbraue ? `<div class="augenbraue">${esc(o.augenbraue)}</div>` : ''}
      <h1${o.art === 'wissen' ? ' class="aussage"' : ''}>${esc(o.haken)}</h1>
      ${fotos}
      ${o.text ? `<p class="text">${esc(o.text)}</p>` : ''}
      ${makrosHtml(o)}
      ${o.studienwert ? `
      <div class="studie">
        <div class="kante"></div>
        <div class="studieLabel">${LANG === 'de' ? 'Laut Studien' : 'Research says'}</div>
        <div class="studieWert">${esc(o.studienwert)}</div>
      </div>` : ''}`;
  }

  return `<!doctype html><meta charset="utf-8">
<body class="stil-${stil}${folge ? ' folge' : ''}${o.art === 'app' ? ' hatSchau' : ''}${KI_MENSCHEN && !folge ? ' mitKi' : ''}${hatFoto ? ' mitFoto' : ''}${hatWz ? ' mitWz' : ''}${hatFigur ? ' mitFigur' : ''}"><style>
@font-face{font-family:'Inter';font-weight:400;src:url(data:font/woff2;base64,${inter400}) format('woff2')}
@font-face{font-family:'Inter';font-weight:700;src:url(data:font/woff2;base64,${inter700}) format('woff2')}
${anton ? `@font-face{font-family:'Anton';font-weight:400;src:url(data:font/woff2;base64,${anton}) format('woff2')}` : ''}
*{margin:0;padding:0;box-sizing:border-box}
html,body{width:${B}px;height:${H}px;overflow:hidden}
body{font-family:'Inter',system-ui,sans-serif;color:#fef3c7;
  background:radial-gradient(120% 80% at 15% 0%,#1a1a1a 0%,#0a0a0a 62%);
  display:flex;flex-direction:column;padding:64px;position:relative}
/* Anton nur fuer Schlagzeilen und die grosse Zahl. Zwei laute Schriften
   nebeneinander ergeben Laerm, keine Wirkung — siehe schriften/README.md. */
.anton{font-family:${anton ? "'Anton'," : ''}'Inter',sans-serif;font-weight:400;
  text-transform:uppercase;letter-spacing:.005em}

/* Das echte App-Icon als grosses, sehr leises Markenzeichen im Hintergrund.
   Es wird NICHT nachgezeichnet — favicon.svg ist die einzige Quelle, und die
   Symbole darin sind 1:1 die Lucide-Pfade aus BottomNav.jsx. */
/* ⚠ Bis zum 20.09.2026 stand hier opacity:.07 — Josef: „das Logo ist nicht
   gross im Hintergrund". Es WAR da, nur unter der Wahrnehmungsschwelle: sieben
   Prozent Gold auf Schwarz sind auf einem Handybildschirm nichts. Seit die
   Uebungsfotos raus sind (30.08.2026), ist dieser Ring das einzige grafische
   Element der Karte — er muss tragen, nicht fluestern.
   Gemessen am gerenderten JPEG, nicht am CSS. */
.markenRing{position:absolute;width:1460px;height:1460px;right:-500px;top:-60px;
  opacity:.20;pointer-events:none}
/* Ueber einem Foto ist das Markenzeichen kein Zeichen, sondern ein Schmierer —
   die Symbole zeichnen sich als Umrisse ab und stoeren das Motiv. Dort bleibt
   es weg; der Kopf traegt die Marke ohnehin. */
body.mitFoto .markenRing{display:none}
.korn{position:absolute;inset:0;opacity:.16;mix-blend-mode:overlay;pointer-events:none;
  background-image:url(data:image/svg+xml;base64,${KORN});background-size:200px}

.hgFoto{position:absolute;inset:0;background-size:cover;background-position:center;
  filter:saturate(.86)}
.hgSchleier{position:absolute;inset:0}
/* Der Schleier arbeitet je Stil anders: premium dunkelt durchgehend ab,
   damit zentrierter Text ueberall liest; poster laesst das obere Drittel
   frei und wird erst unten dicht, wo der Text sitzt. */
.stil-premium .hgSchleier{background:linear-gradient(180deg,rgba(10,10,10,.80) 0%,
  rgba(10,10,10,.62) 38%,rgba(10,10,10,.86) 78%,rgba(10,10,10,.94) 100%)}
.stil-zahl .hgSchleier{background:linear-gradient(180deg,rgba(10,10,10,.86) 0%,
  rgba(10,10,10,.74) 45%,rgba(10,10,10,.92) 100%)}
.stil-mix .hgSchleier{background:linear-gradient(180deg,rgba(10,10,10,.46) 0%,
  rgba(10,10,10,.24) 22%,rgba(10,10,10,.80) 52%,rgba(10,10,10,.97) 80%)}
.stil-poster .hgSchleier{background:linear-gradient(180deg,rgba(10,10,10,.34) 0%,
  rgba(10,10,10,.10) 26%,rgba(10,10,10,.72) 58%,rgba(10,10,10,.96) 84%)}

${WASSERZEICHEN_CSS}

.kopf,.inhalt,.fuss{position:relative;z-index:2}
.kopf{display:flex;align-items:center;gap:18px}
.kopf img{width:88px;height:88px;border-radius:20px}
.kopf span{font-weight:700;letter-spacing:.3em;font-size:26px;color:#fbbf24}
.stil-poster .kopf img{width:72px;height:72px;border-radius:16px}
.stil-poster .kopf span{font-size:23px}

.inhalt{flex:1 1 0;min-height:0;display:flex;flex-direction:column;gap:24px}
.stil-premium .inhalt,.stil-zahl .inhalt{justify-content:center}
.stil-poster .inhalt{justify-content:flex-end;padding-bottom:26px}

.marke{align-self:flex-start;border:1px solid rgba(251,191,36,.42);border-radius:999px;
  padding:9px 22px;font-size:24px;font-weight:700;color:#fbbf24}
.augenbraue{font-size:24px;font-weight:700;letter-spacing:.2em;text-transform:uppercase;
  color:#fbbf24}
h1{font-size:58px;line-height:1.1;font-weight:700;letter-spacing:-.025em;color:#fff8e7}
h1.aussage{font-size:50px;line-height:1.22;letter-spacing:-.015em}
p.text{font-size:32px;line-height:1.38;color:#e7e5e4}

/* --- mix (Vorgabe) --- */
.stil-mix .inhalt{justify-content:flex-end;padding-bottom:20px}
.mixText{display:flex;flex-direction:column;gap:20px}
.stil-mix h1{line-height:.98;letter-spacing:0;color:#fff}
.stil-mix p.text{font-size:33px;line-height:1.36;color:#e7e5e4;max-width:94%}
.studie{display:flex;flex-direction:column;gap:9px;margin-top:6px}
.studieLabel{font-size:22px;font-weight:700;letter-spacing:.2em;text-transform:uppercase;
  color:#fbbf24}
.studieWert{font-size:44px;line-height:1.16;font-weight:700;color:#fff8e7;letter-spacing:-.015em}

/* --- poster --- */
.posterText{display:flex;flex-direction:column;gap:20px}
.stil-poster h1{font-size:104px;line-height:.94;letter-spacing:0;color:#fff}
.kante{width:132px;height:7px;background:#fbbf24;border-radius:4px;flex:0 0 auto}
.stil-poster p.text{font-size:29px;color:#d6d3d1;max-width:88%}

/* --- zahl --- */
.zahlBlock{display:flex;flex-direction:column;gap:16px;align-items:flex-start}
.grosseZahl{display:flex;align-items:baseline;gap:14px;color:#fbbf24}
.grosseZahl b{font-size:250px;line-height:.82;font-weight:400}
.grosseZahl i{font-style:normal;font-size:76px;font-weight:700}
.zahlLabel{font-size:38px;font-weight:700;color:#fff8e7;letter-spacing:-.01em}
/* Die Zahl traegt das Bild, der Name steht direkt darunter — „15 /
   Aminosäuren / BPC-157" liest sich als eine Zeile. Enger an das Label
   gerueckt als der Rest, damit die beiden zusammengehoeren. */
.zahlTitel{font-size:72px;line-height:1.02;color:#fff8e7;margin-top:10px}
.stil-zahl p.text{font-size:28px;color:#d6d3d1;margin-top:8px}

/* --- premium --- */
.fotos{display:grid;grid-template-columns:1fr 1fr;gap:20px;min-height:0}
.fotos figure{min-height:0;display:flex;flex-direction:column;gap:10px}
.fotos img{width:100%;height:340px;object-fit:cover;border-radius:20px;
  border:1px solid rgba(251,191,36,.22)}
.fotos figcaption{font-size:22px;font-weight:700;color:#fbbf24;letter-spacing:.16em;text-transform:uppercase}

/* --- app-schau: die App selbst ---
   Der Aufbau ist von oben nach unten gelesen: Schlagzeile, ein Satz dazu, die
   drei Bildschirme, darunter drei Zahlen. Die Bildschirme sind das Motiv —
   sie bekommen den meisten Platz und stehen gefaechert, damit man drei sieht
   und nicht einen mit zwei Raendern.
   ⚠ Die Karte ueberlappen die Bildschirme ABSICHTLICH nach unten aus dem
   Raster heraus (overflow:hidden am Rahmen): Ein Handy, das unten aus dem
   Bild laeuft, wirkt wie ein Ausschnitt aus etwas Groesserem. Vollstaendig
   hineingesetzt waeren sie briefmarkengross — 1320x2868 auf 1080x1350.
   (Keine Backticks in diesem Block — er steht in einem Template-Literal.) */
.schau{flex:1 1 0;min-height:0;display:flex;flex-direction:column;gap:22px}
.schauKopf{display:flex;flex-direction:column;gap:14px;flex:0 0 auto}
.schauZeile{font-size:76px;line-height:.96;color:#fff}
/* Die ZWEITE Zeile traegt die Farbe, nicht die ganze Schlagzeile. Eine
   komplett goldene Zeile auf dunklem Grund liest sich schlechter als weiss
   und nimmt dem Akzent jede Wirkung.
   ⚠ Es muss ein Element sein, kein Geschwisterselektor auf <br>: "br + *"
   greift nur, wenn nach dem Umbruch ein ELEMENT folgt — nackter Text waere
   kein Treffer, und die Regel liefe ins Leere, ohne dass es auffaellt. */
.schauZeile i{font-style:normal;color:#fbbf24}
/* 26 statt 28 px: Bei drei Zeilen schob der Satz die Handys so weit nach
   unten, dass von den aeusseren nur noch die Haelfte im Bild stand. Der Text
   ist hier Beiwerk — die Bildschirme sind das Argument. */
.schauText{font-size:26px;line-height:1.32;color:#d6d3d1;max-width:94%}
/* ⚠ Weicher Auslauf statt harter Kante. Ohne Maske endet das Ueberlaufen
   unten in einer rasiermesserglatten Linie quer durchs Bild, und die liest
   sich als Fehler, nicht als Ausschnitt. Am JPEG gemessen — im HTML sieht
   beides gleich aus. */
.schirme{flex:1 1 0;min-height:0;position:relative;overflow:hidden;
  display:flex;justify-content:center;align-items:flex-start;padding-top:8px;
  -webkit-mask-image:linear-gradient(180deg,#000 78%,transparent 99%);
  mask-image:linear-gradient(180deg,#000 78%,transparent 99%)}
.schirm{position:absolute;width:300px;border-radius:26px;
  border:1px solid rgba(255,255,255,.14);
  box-shadow:0 34px 70px rgba(0,0,0,.62),0 4px 14px rgba(0,0,0,.5);
  object-fit:cover;object-position:top}
/* Mitte vorn und gerade, die beiden aussen dahinter und leicht gekippt —
   dieselbe Staffelung wie in der Vorlage, aber gespiegelt gebaut, damit die
   mittlere Karte die Schlagzeile stuetzt statt sie zu verdecken. */
.schirm.s0{left:22px;top:44px;transform:rotate(-5deg);height:640px;opacity:.94}
.schirm.s1{top:4px;height:700px;z-index:3}
.schirm.s2{right:22px;top:44px;transform:rotate(5deg);height:640px;opacity:.94}
.punkte{flex:0 0 auto;display:flex;gap:12px}
.punkte span{flex:1 1 0;text-align:center;background:rgba(251,191,36,.10);
  border:1px solid rgba(251,191,36,.26);border-radius:16px;padding:14px 8px;
  font-size:25px;font-weight:700;color:#fbbf24}
/* Ueber den Screenshots muss der Hintergrund weg — sie sind hell und bringen
   ihre eigene Flaeche mit; ein Foto dahinter ergaebe Unruhe hinter Unruhe. */
body.hatSchau .hgSchleier{background:linear-gradient(180deg,rgba(10,10,10,.90) 0%,
  rgba(10,10,10,.82) 40%,rgba(10,10,10,.93) 100%)}
/* ⚠ Der Ring geht hier GANZ weg, nicht nur leiser. Er sitzt oben rechts und
   laeuft quer ueber die Handys — bei jeder Deckkraft ueber null zeichnen sich
   seine Symbole durch die hellen Screenshots. Auf den anderen Karten ist er
   das einzige grafische Element; hier sind es die drei Bildschirme, und zwei
   Motive uebereinander sind eines zu viel. */
body.hatSchau .markenRing{display:none}

/* --- Makros: in JEDEM Stil, nicht nur in premium ---
   Seit 18.09.2026 rendern auch mix und poster den Block (makrosHtml).
   Der Selektor war immer global, nur der Aufrufer fehlte.
   (Keine Backticks in diesem Block — er steht in einem Template-Literal.) */
.makros{display:grid;grid-template-columns:repeat(4,1fr);gap:14px}
.makros div{background:rgba(251,191,36,.09);border:1px solid rgba(251,191,36,.2);
  border-radius:18px;padding:20px 12px;text-align:center}
.makros b{display:block;font-size:38px;color:#fbbf24}
.makros span{font-size:20px;color:#d6d3d1}
/* Bleibt einer weg, weil er schon als grosse Zahl darueber steht, fuellen die
   drei anderen die Breite — statt drei Kacheln und einer Luecke. */
.makros-3{grid-template-columns:repeat(3,1fr)}
.stil-zahl .makros{margin-top:14px}

/* --- Rezept-Folgefolien: Zutaten und Zubereitung ---------------------------
   (Keine Backticks in diesem Block — er steht in einem Template-Literal.)

   Der Titel steht auf jeder Folie noch einmal, kleiner als auf Folie 1. Im
   Karussell wischt man einzeln weiter, und eine Folie ohne Titel ist eine
   Liste ohne Gericht.

   Die zwei eng-Klassen sind KEINE Feinabstimmung nach Augenmass, sondern die
   Antwort auf die gemessenen Hoechstwerte: 12 Zutaten und 6 Schritte. Wer
   die Schwellen verschiebt, misst vorher nach — der Ueberlaufwaechter beim
   Rendern bricht sonst ab, und das ist die gute Variante. */
.folienTitel{font-size:46px;line-height:1.08;font-weight:700;letter-spacing:-.02em;
  color:#fff8e7}
.folienBeiwerk{font-size:24px;font-weight:700;letter-spacing:.14em;
  text-transform:uppercase;color:#fbbf24;margin-top:-10px}

.zutaten{list-style:none;display:grid;gap:12px;margin-top:4px}
.zutaten li{background:rgba(251,191,36,.07);border:1px solid rgba(251,191,36,.18);
  border-radius:16px;padding:17px 24px;font-size:31px;line-height:1.2;color:#f5f5f4}
/* Stufe 1: zwei Spalten, SONST NICHTS. Die laengste gemessene Zutat hat 55
   Zeichen und passt bei dieser Groesse in eine halbe Breite. */
.zweiSpalten{grid-template-columns:1fr 1fr;gap:12px}
/* Stufe 2: erst jetzt wird es auch kleiner. */
.engZutaten li{padding:14px 18px;font-size:26px;border-radius:14px}

.schritte{display:flex;flex-direction:column;gap:20px;margin-top:4px}
.schritt{display:flex;gap:20px;align-items:flex-start}
.schritt b{flex:0 0 auto;width:52px;height:52px;border-radius:14px;
  background:rgba(251,191,36,.14);border:1px solid rgba(251,191,36,.3);
  color:#fbbf24;font-size:30px;display:flex;align-items:center;
  justify-content:center;line-height:1}
.schritt p{font-size:28px;line-height:1.32;color:#e7e5e4}
.engSchritte{gap:15px}
.engSchritte .schritt b{width:46px;height:46px;font-size:26px;border-radius:12px}
.engSchritte .schritt p{font-size:25px;line-height:1.3}

/* ⚠ Die Folgefolie erbt den Stil NICHT in der Ausrichtung. Der Stil mix
   schiebt den Inhalt an den unteren Rand (dort steht die Schlagzeile als
   Plakat) — unter einer Zutatenliste ergab das ein leeres oberes Drittel.
   Genau der Fehler, der auf den Swaply-Karten und auf Anigoshas
   Startbildschirm schon zweimal Zeit gekostet hat. Hier traegt der Inhalt die
   Folie, also steht er mittig und die Luft verteilt sich oben und unten.
   (Keine Backticks in diesem Block — er steht in einem Template-Literal.) */
body.folge .inhalt{justify-content:center;gap:20px}
/* Und der Markenring tritt zurueck: Bei .20 lief er als Kante mitten durch
   die Kacheln. Auf Folie 1 ist er Schmuck neben wenig Text, hier stoert er
   das Lesen. */
body.folge .markenRing{opacity:.07}

.fuss{display:flex;justify-content:space-between;align-items:center;gap:20px;
  font-size:23px;color:#78716c}
.badges{display:flex;gap:14px;align-items:center;flex:0 0 auto}
/* Badges nie verzerren — Apple und Google geben die Form vor. Feste Hoehe,
   Breite folgt dem 3:1-Verhaeltnis von selbst. */
.badges img{height:58px;width:auto;display:block}
/* Der Fuss ist sonst eine Signatur und darf grau bleiben. Auf der Peptidkarte
   steht dort eine Aufforderung — die muss man lesen koennen, sonst steht sie
   umsonst da. Heller und fett, aber nicht in Amber: Das Gold traegt auf dieser
   Karte schon die Zahl, und zwei goldene Stellen heben sich gegenseitig auf. */
.fussRuf{color:#d6d3d1;font-weight:700}
/* Traegt der Post ein KI-Wasserzeichen, rueckt der Fuss hoch — sonst stossen
   Store-Badge und Plaettchen in der Ecke aneinander. */
body.mitKi .fuss{margin-bottom:40px}

/* Das Trainingsbild als WASSERZEICHEN — nicht als Motiv.
   Entfaerbt, angehoben im Kontrast, stark abgedunkelt: Was uebrig bleibt, ist
   die Silhouette. Deshalb braucht es hier auch keinen Schleier; das Bild ist
   schon leiser als jeder Schleier es machen koennte. Und deshalb sind die
   Prompts andere als fuer --hintergrund: Bei dieser Deckkraft ueberlebt nur
   die Form, kein Hantelprofil und kein Detail im Gesicht. */
.wzFoto{position:absolute;inset:0;background-repeat:no-repeat;
  opacity:.17;filter:grayscale(1) contrast(1.45) brightness(1.15);pointer-events:none}
/* Ring UND Silhouette auf voller Staerke sind zwei Bilder uebereinander. Traegt
   die Karte ein Wasserzeichen, tritt der Ring zurueck und rahmt nur noch. */
body.mitWz .markenRing{opacity:.09}

/* --- Die Randfigur ---
   Freigestellt, klebt an der RECHTEN Kante, unten vom Kartenrand
   angeschnitten. Das PNG zeigt die ganze Figur; angeschnitten wird hier,
   damit sich der Anschnitt nachstellen laesst, ohne ein neues Bild zu
   erzeugen.

   ⚠ Das Bild MUSS beschnitten sein (freisteller.py macht das): Mit
   durchsichtigen Raendern passt die Figur nach Breite hinein und wird nur
   halb so hoch — eine kleine Gestalt in der Ecke statt einer Figur am Rand. */
.figurRand{position:absolute;right:0;bottom:0;z-index:2;
  width:300px;height:70%;
  background-size:contain;background-repeat:no-repeat;
  background-position:bottom center;pointer-events:none}
/* ⚠ OHNE DIESE ZEILEN STEHT DIE FIGUR IM TEXT UND AUF DEN STORE-ABZEICHEN.
   Das ist der eigentliche Eingriff, nicht das Einfuegen des Bildes. */
body.mitFigur .inhalt{padding-right:250px}
body.mitFigur .fuss{padding-right:250px}
/* Das AI-Plaettchen sitzt sonst rechts unten — also genau auf der Figur. */
body.mitFigur .kiMarke{right:auto;left:22px}
/* Der Fusstext brach mit dem schmaleren Platz auf zwei Zeilen um
   („FullRep · Training & / Ernaehrung") — am gerenderten JPEG gesehen. Eine
   Nummer kleiner, und er steht wieder in einer Zeile. */
body.mitFigur .fuss>span:first-child{font-size:20px;white-space:nowrap}
</style>
${hatWz ? `<div class="wzFoto" style="background-image:url(data:image/jpeg;base64,${b64(WZ)});background-size:${WZ_FIT};background-position:${WZ_POS}"></div>` : ''}
${hatFigur ? `<div class="figurRand" style="background-image:url(data:image/png;base64,${b64(FIGUR)})"></div>` : ''}
${hatFoto ? `<div class="hgFoto" style="background-image:url(data:image/jpeg;base64,${b64(hgPfad)})"></div>
<div class="hgSchleier"></div>` : ''}
<img class="markenRing" src="data:image/svg+xml;base64,${logoRing}" alt="">
<div class="korn"></div>
<div class="kopf"><img src="data:image/svg+xml;base64,${logo}"><span>FULLREP</span></div>
<div class="inhalt">${mitte}</div>
<div class="fuss"><span${o.art === 'peptid' ? ' class="fussRuf"' : ''}>${
  o.art === 'peptid' ? esc(T.peptidFuss(peptideGesamt())) : T.fuss
}</span><span class="badges">${badgesHtml()}</span></div>
${kiMarke}`;
}

// --- Lauf -------------------------------------------------------------------
const o = inhalt(FORMAT, mulberry32(SEED));

// `zahl` ohne Zahl gibt es nicht. Lieber ein anderer Stil als eine erfundene
// Zahl — die faellt sofort auf und beschaedigt genau das Vertrauen, von dem
// dieser Kanal lebt.
let stil = STIL;
// ⚠ Die App-Schau ignoriert `--stil` (siehe baueHtml). Damit Protokoll und
// Dateiname nicht `mix` behaupten, waehrend etwas anderes gerendert wird,
// heisst der Stil hier, was er ist. `schau` ist in der Stilpruefung oben
// BEWUSST nicht zugelassen — er ist kein Stil, den man waehlt.
if (o.art === 'app') stil = 'schau';
if (stil === 'zahl' && !o.zahl) {
  console.log('  (kein Zahlenwert im Inhalt — Stil faellt auf `premium` zurueck)');
  stil = 'premium';
}

// `premium` baut bei einer Uebungskarte ein Raster aus Start- und Endfoto.
// Seit die Demofotos nicht mehr in Werbung gehen (30.08.2026), ist das Raster
// leer — und die untere Bildhaelfte bliebe schlicht schwarz. `mix` setzt
// dieselben Angaben typografisch und fuellt die Flaeche.
if (stil === 'premium' && o.art === 'uebung' && !o.fotos?.length) {
  console.log('  (keine Fotos zur Uebung — Stil faellt auf `mix` zurueck)');
  stil = 'mix';
}

// ⚠ EINE QUELLE FUER BILD UND REEL (20.09.2026).
//
// Josef will jeden App-Schau-Post zusaetzlich als Reel. Der Reel-Generator
// liegt in wellapps-social (er baut fuer alle drei Marken) und braucht
// dieselben Texte, Bildschirme und Markenfarben.
//
// Sie DORT abzuschreiben waere die sichere Methode, sie auseinanderlaufen zu
// lassen: Wer hier eine Schlagzeile aendert, aendert sie im Reel nicht mit,
// und es faellt erst auf, wenn beide nebeneinander im Feed stehen. Genau
// dieser Fehler steckt in der Geschichte dieses Repos mehrfach — die
// Sprachweiche stand einmal viermal verstreut im Code.
//
// Deshalb gibt dieses Skript die Daten auf Anforderung als JSON heraus und
// rendert nichts. Der Reel-Generator ruft es als Kindprozess auf; damit ist
// diese Datei die einzige Quelle, ueber Repo-Grenzen hinweg.
if (process.argv.includes('--schau-json')) {
  if (o.art !== 'app') {
    console.error(`✗ --schau-json gibt es nur fuer --format app-schau (hier: ${FORMAT}).`);
    process.exit(1);
  }
  process.stdout.write(JSON.stringify({
    marke: 'FullRep',
    kurz: o.kurz, text: o.text, punkte: o.punkte,
    schirme: o.schirme,
    fuss: T.fuss,
    // Die Farben stehen im CSS dieser Datei; der Reel-Generator soll sie
    // nicht ein zweites Mal kennen.
    optik: {
      grund: '#0a0a0a',
      verlauf: 'radial-gradient(120% 80% at 15% 0%,#1a1a1a 0%,#0a0a0a 62%)',
      tinte: '#fff8e7', tinteLeise: '#d6d3d1', akzent: '#fbbf24',
      flaeche: 'rgba(251,191,36,.10)', flaecheRand: 'rgba(251,191,36,.26)',
      schrift: 'anton',
    },
    // Die Schriftdateien liegen je Repo woanders. Der Reel-Generator soll
    // sie nicht suchen muessen — sonst raet er, und das Reel rendert in
    // DejaVu, ohne dass irgendetwas fehlschlaegt.
    schriften: {
      schlagzeile: join(WURZEL, 'scripts', 'schriften', 'anton.woff2'),
      text: join(WURZEL, 'node_modules/@fontsource/inter/files/inter-latin-400-normal.woff2'),
      fett: join(WURZEL, 'node_modules/@fontsource/inter/files/inter-latin-700-normal.woff2'),
    },
    logo: join(WURZEL, 'public', 'favicon.svg'),
  }));
  process.exit(0);
}

mkdirSync(OUT, { recursive: true });
const basis = NAME ?? `fullrep-${FORMAT}-${stil}-${LANG}-s${SEED}`;
const ziel = join(OUT, `${basis}.jpg`);

const html = baueHtml(o, stil);

/**
 * ⚠ EINE FRAGE OHNE ANTWORT VERLAESST DIESES SKRIPT NICHT (20.09.2026).
 *
 * Josef hat im TikTok-Editor eine fertige Karte aufgemacht: „Wie viel
 * Kreatin?" gross, darunter drei Saetze darueber, WIE GUT Kreatin erforscht
 * ist — und nirgends, wie viel. Die Antwort („3–5 g Monohydrat taeglich")
 * stand die ganze Zeit in den Daten und wurde weggeworfen.
 *
 * Ursache: `poster` war der EINZIGE der vier Stile ohne Block fuer
 * `studienwert`. Fuenf der 26 Studienkarten haben einen Frage-Titel — „Wie
 * viele Saetze?", „Wie oft pro Woche?", „Wie viel Protein?", „Wie viel
 * Kreatin?", „Wie viel Koffein?" —, und bei jeder steht die Antwort NUR im
 * Wert. Traf eine davon auf `poster`, kam eine Karte heraus, die sich selbst
 * laecherlich macht.
 *
 * Der fehlende Block ist eine Zeile weiter oben behoben. Diese Probe steht
 * daneben, weil derselbe Fehler auf zehn anderen Wegen zurueckkommen kann:
 * ein neuer Stil, ein umbenanntes Feld, ein Datensatz mit Frage im Titel und
 * ohne Wert.
 *
 * ⚠ ABBRUCH, kein stiller Wechsel auf einen anderen Stil. Genau die Sorte
 * „faellt still zurueck" hat den Fehler ueberhaupt erst unsichtbar gemacht
 * (siehe die Formatpruefung weiter oben, gleicher Tag, gleiche Ursache).
 * lauf.mjs faengt den Abbruch und schreibt den Grund in den Bericht: Eine
 * fehlende Karte faellt auf, eine sinnlose nicht.
 */
if (String(o.haken ?? '').trim().endsWith('?') && o.studienwert) {
  if (!html.includes(esc(o.studienwert))) {
    console.error(`✗ „${o.haken}" ist eine Frage, und die Antwort steht nicht auf der Karte.`);
    console.error(`  Die Antwort waere: ${o.studienwert}`);
    console.error(`  Der Stil \`${stil}\` zeigt den Studienwert nicht — hier fehlt ein Block.`);
    process.exit(1);
  }
}

// --- Rendern ----------------------------------------------------------------
//
// Ein Rezept wird zum KARUSSELL: Plakat, Zutaten, Zubereitung. Erkannt wird
// das Karussell weiter unten in der Kette an den nummerierten Dateien
// (`<stamm>-1.jpg`, `-2.jpg`, …) — nicht an einem Feld im Ledger. Was auf der
// Platte liegt, ist die Wahrheit ueber das, was gerendert wurde.
//
// ⚠ DESHALB ENTSTEHT BEIM KARUSSELL KEIN `<stamm>.jpg` MEHR. Laegen beide da,
// zeigte die Merkliste eine Datei, die im Beitrag gar nicht vorkommt
// (posten.mjs nimmt beim Karussell die erste Folie), und das Aufraeumen
// uebersaehe sie.
const istKarussell = o.art === 'rezept';
const seiten = istKarussell
  ? [{ html, ziel: join(OUT, `${basis}-1.jpg`) },
     ...rezeptFolien(o).map((f, i) => ({
       html: baueHtml(o, stil, f),
       ziel: join(OUT, `${basis}-${i + 2}.jpg`),
       // Dieselbe Folie eine Stufe enger, falls die vorige ueberlaeuft.
       enger: (stufe) => baueHtml(o, stil, rezeptFolien(o, stufe)[i]),
     }))]
  : [{ html, ziel }];

const browser = await chromium.launch(
  process.env.CHROMIUM_PFAD ? { executablePath: process.env.CHROMIUM_PFAD } : {},
);
const seite = await browser.newPage({ viewport: { width: B, height: H }, deviceScaleFactor: 1 });
const erzeugt = [];
try {
  // ⚠ Gemessen wird `.inhalt`, NICHT der Body. Der Body hat feste Hoehe und
  // `overflow:hidden` — er meldet nie einen Ueberlauf, auch wenn die Liste
  // laengst unten heraushaengt. Genau deshalb faellt eine abgeschnittene
  // Folie im Protokoll nicht auf, sondern erst im veroeffentlichten
  // Karussell, wo sie niemand mehr korrigieren kann.
  const ueberlauf = () => seite.evaluate(() => {
    const el = document.querySelector('.inhalt');
    return el ? el.scrollHeight - el.clientHeight : 0;
  });
  const aufbauen = async (h) => {
    await seite.setContent(h, { waitUntil: 'load' });
    await seite.evaluate(() => document.fonts.ready);
    return ueberlauf();
  };

  for (const [i, s] of seiten.entries()) {
    let ueber = await aufbauen(s.html);
    // Passt es nicht, EINE Stufe weiter — und nach jeder Stufe neu messen.
    for (let stufe = 1; ueber > 0 && s.enger && stufe <= 2; stufe += 1) {
      console.log(`  (Folie ${i + 1}: ${ueber}px zu viel, Stufe ${stufe})`);
      ueber = await aufbauen(s.enger(stufe));
    }
    // ⚠ ABBRECHEN STATT ABSCHNEIDEN. Lieber ein roter Lauf mit Grund im
    // Bericht als eine halbe Zutat im Feed.
    if (ueber > 0) {
      await browser.close();
      console.error(`✗ Folie ${i + 1} laeuft um ${ueber}px ueber — auch auf der engsten Stufe.`);
      console.error(`  Rezept: ${o.schluessel} (${o.zutaten?.length} Zutaten, ${o.schritte?.length} Schritte)`);
      console.error('  Hier braucht es eine weitere Stufe im CSS, keine kleinere Schwelle.');
      process.exit(1);
    }

    await seite.screenshot({ path: s.ziel, type: 'jpeg', quality: 92 });
    erzeugt.push(s.ziel);
  }
} finally {
  await browser.close();
}

// ⚠ HOECHSTENS FUENF (Josef, 18.09.2026), und die Reihenfolge entscheidet,
// welche fuenf es sind: Marke zuerst, dann das Enge, dann das Breite.
// Gekuerzt wird zusaetzlich zentral in
// wellapps-social/tools/social/beschreibung.mjs — hier stehen sie trotzdem
// schon richtig, weil das Beiblatt zugleich die Kopiervorlage fuer einen
// Beitrag von Hand ist und dort niemand automatisch abschneidet.
const tags = {
  uebung: ['fullrep', 'krafttraining', 'muskelaufbau', 'training', 'fitness'],
  rezept: ['fullrep', 'highprotein', 'mealprep', 'rezept', 'ernaehrung'],
  wissen: ['fullrep', 'fitnesstips', 'gymtok', 'muskelaufbau', 'fitness'],
  studie: ['fullrep', 'evidenzbasiert', 'wissenschaft', 'muskelaufbau', 'fitness'],
  peptid: ['fullrep', 'peptide', 'regeneration', 'biohacking', 'fitness'],
}[o.art] ?? ['fullrep', 'fitness', 'training', 'gym'];

// ⚠ `o.fotos` ist seit dem 30.08.2026 ein LEERES Array, kein null — und ein
// leeres Array ist wahr. Ohne die Laengenpruefung stuende im Beiblatt „echtes
// Foto" ueber einer rein typografischen Karte.
const hatFoto = Boolean(HINTERGRUND ?? o.autoFoto ?? o.fotos?.length);

// ⚠ Das Rezept gehoert AUCH in die Caption, nicht nur auf die Folien.
// Gespeichert und weitergeschickt wird ein Beitrag ueber den Text; wer die
// Lasagne nachkochen will, hat die Bilder in dem Moment nicht mehr offen.
// Und wer den Ton aus hat oder nur ueberfliegt, liest hier, dass es wirklich
// ein Rezept ist und keine Ankuendigung.
const rezeptText = o.art === 'rezept' && o.zutaten?.length
  ? `\n\n${LANG === 'de' ? 'ZUTATEN' : 'INGREDIENTS'} (${
      LANG === 'de' ? `für ${o.portionen} Portionen` : `for ${o.portionen} servings`})\n`
    + o.zutaten.map((z) => `· ${z}`).join('\n')
    + `\n\n${LANG === 'de' ? 'ZUBEREITUNG' : 'METHOD'} (${o.zeit} ${LANG === 'de' ? 'Min' : 'min'})\n`
    + o.schritte.map((s, i) => `${i + 1}. ${s}`).join('\n')
  : '';

writeFileSync(join(OUT, `${basis}.txt`),
`# ${erzeugt.map((d) => d.split('/').pop()).join(', ')}

## Caption (kopieren)

${o.art === 'peptid'
  ? `${o.marke} — ${LANG === 'de'
      ? `ein Peptid aus ${o.zahl.wert} Aminosäuren.`
      : `a peptide of ${o.zahl.wert} amino acids.`}\n\n${o.haken}`
  : o.haken}${o.art === 'peptid' ? `\n\n${T.peptidZeile(peptideGesamt())}` : ''}${
  o.text ? `\n\n${o.text}` : ''}${
  o.studienwert ? `\n\n${LANG === 'de' ? 'Laut Studien' : 'Research says'}: ${o.studienwert}` : ''}${rezeptText}

## Hashtags

${tags.map((h) => `#${h}`).join(' ')}

## Beim Hochladen

- Der App-Link gehoert in die Beschreibung (Josef, 18.09.2026). Der
  Tageslauf haengt ihn selbst an; wer von Hand postet, nimmt die Landeseite
  aus apps.json (linkInBio), NICHT die rohe App-Store- oder Play-Adresse.
- Hoechstens fuenf Hashtags. Oben stehen genau fuenf, in der Reihenfolge,
  in der sie zaehlen.
- Im Bild stehen die Download-Badges fuer App Store und Google Play.

## Inhalt

- Medienherkunft: ${KI_MENSCHEN ? 'ki-menschen (Wasserzeichen gesetzt)'
  : hatFoto ? 'Foto aus store-assets/social/fotos (Herkunft siehe HERKUNFT.md)'
  : 'nur Typografie'}
- Stil: ${stil}${stil !== STIL ? ` (angefordert war ${STIL})` : ''}
- Format: ${FORMAT} (${o.art})
- Inhaltsschluessel: ${o.schluessel}
- Sprache: ${LANG}
${o.studie ? `
## Falls jemand nachfragt (NICHT posten)

Die Aussage stammt aus: ${o.studie.name}${o.studie.jahr ? ` ${o.studie.jahr}` : ''}.
Im Bild steht bewusst nur „Laut Studien" — die Angabe hier ist fuer den
Kommentarbereich gedacht, falls jemand nach der Quelle fragt.
` : ''}${o.quellen?.length ? `
## Falls jemand nachfragt (NICHT posten)

Im Bild steht nur „Studien zeigen" (Josef, 20.09.2026). Die Arbeiten dazu
stehen in der App unter dem Eintrag „${o.marke}":

${o.quellen.slice(0, 5).map((q) => `- ${quelleKurz(q)}`).join('\n')}
` : ''}`);

for (const d of erzeugt) console.log(`✓ ${d}`);
console.log(`  ${B}×${H} · ${stil} · ${o.art} · ${o.schluessel} · ${LANG}${
  erzeugt.length > 1 ? ` · Karussell mit ${erzeugt.length} Folien` : ''}`);
