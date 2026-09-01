// Studienbasierte Post-Inhalte fuer FullRep.
//
// ⚠ HIER WIRD KEINE ZAHL ERFUNDEN. Jede Aussage und jeder Wert stammt woertlich
// aus src/data/. Eine erfundene Zahl faellt in einem Wissenskanal sofort auf und
// beschaedigt genau das Vertrauen, von dem er lebt.
//
// Die reichste Quelle ist die Studien-Bibliothek in peakPrograms.js: 21 Eintraege
// {name, year, findingDE, findingEN}, rund 14 davon mit expliziter Zahl, bereits
// als kurze zweisprachige Saetze formuliert. Sie ist ein facts.ts in allem ausser
// dem Namen — bisher nur in der Programm-Detailansicht sichtbar.
//
// ⚠ WARUM GEPARST STATT IMPORTIERT: peakPrograms.js liest `import.meta.env.DEV`
// (Vite). In reinem Node ist `import.meta.env` undefined, der Import bricht ab.
// Die App dafuer zu aendern waere der falsche Weg — sie ist nicht kaputt.
// Deshalb wird der Objektliteral-Block aus dem Dateitext geschnitten und
// ausgewertet. Dasselbe Muster nutzt mahjong-app/scripts/reel/formate.mjs fuer
// facts.ts, samt Anzahl-Pruefung als Reissleine.
//
// Geparst statt kopiert: So schlaegt jede Korrektur an der App auf die Posts
// durch. Kopierte Texte laufen auseinander.

import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { WURZEL, wissensthemen } from './social-daten.mjs';

// --- Studien-Bibliothek lesen -----------------------------------------------
function ladeStudien() {
  const roh = readFileSync(join(WURZEL, 'src/data/peakPrograms.js'), 'utf8');
  const start = roh.indexOf('const STUDY = {');
  if (start === -1) throw new Error('STUDY in peakPrograms.js nicht gefunden — Aufbau geaendert?');

  // Klammern zaehlen statt Regex: Die Funde enthalten Kommas, Klammern und
  // Anfuehrungszeichen; ein Muster daran zu binden waere die naechste Falle.
  const von = roh.indexOf('{', start);
  let tiefe = 0, bis = von;
  for (let i = von; i < roh.length; i++) {
    if (roh[i] === '{') tiefe++;
    else if (roh[i] === '}') { tiefe--; if (tiefe === 0) { bis = i + 1; break; } }
  }
  // eslint-disable-next-line no-new-func
  const studien = new Function(`return ${roh.slice(von, bis)}`)();
  const n = Object.keys(studien).length;
  if (n < 18) throw new Error(`nur ${n} Studien gelesen — Aufbau von peakPrograms.js geaendert?`);
  return studien;
}

export const STUDIEN = ladeStudien();

// --- Kuratierte Auswahl ------------------------------------------------------
// Es gibt KEINEN Weg, die Zahlen automatisch zu finden: 34 verschiedene
// `label`-Werte auf 48 quick-Eintraege, kein `Wie viel`, kein `Dosierung` als
// verlaessliche Rubrik. Deshalb einmal von Hand zugeordnet.
//
// `titel` ist die einzige Zeile, die hier GESCHRIEBEN wird — eine Ueberschrift,
// keine Tatsachenbehauptung. `aussage` und `wert` kommen aus der Quelle.
// `wert` MUSS woertlich in der Aussage vorkommen; geprueft wird das unten.

const AUS_STUDIEN = [
  { id: 'schoenfeld2016', bereich: 'training',
    titel: { de: '2× schlägt 1×', en: 'Twice beats once' },
    wert: { de: '2× pro Woche', en: 'twice per week' } },

  { id: 'schoenfeld2017', bereich: 'training',
    titel: { de: 'Volumen entscheidet', en: 'Volume decides' },
    wert: { de: '10+ Sätze pro Muskelgruppe und Woche', en: '10+ sets per muscle group per week' } },

  { id: 'helms2016', bereich: 'training',
    titel: { de: 'Nicht bis zum Versagen', en: 'Stop short of failure' },
    wert: { de: '1–3 RIR', en: '1–3 reps in reserve' } },

  { id: 'schoenfeld2019', bereich: 'training',
    titel: { de: 'Frequenz ist zweitrangig', en: 'Frequency is secondary' },
    wert: null },

  { id: 'tabata1996', bereich: 'cardio',
    titel: { de: '4 Minuten', en: 'Four minutes' },
    wert: { de: '28 %', en: '28%' } },

  { id: 'gibala2006', bereich: 'cardio',
    titel: { de: '2,5 statt 10,5 Stunden', en: '2.5 instead of 10.5 hours' },
    wert: { de: '~2,5 h Training', en: '~2.5 h of training' } },

  { id: 'helgerud2007', bereich: 'cardio',
    titel: { de: '4×4 Minuten', en: '4×4 minutes' },
    wert: { de: '90–95 % der maximalen Herzfrequenz', en: '90–95% of max heart rate' } },

  { id: 'seiler2010', bereich: 'cardio',
    titel: { de: 'Langsamer trainieren', en: 'Train slower' },
    wert: { de: '~80 % ihres Trainingsvolumens', en: '~80% of their training volume' } },

  { id: 'pedisic2020', bereich: 'cardio',
    titel: { de: 'Einmal die Woche reicht', en: 'Once a week is enough' },
    wert: { de: '~27 % geringeres Gesamtsterblichkeitsrisiko', en: '~27% lower all-cause mortality risk' } },

  { id: 'lee2014', bereich: 'cardio',
    titel: { de: '5 Minuten am Tag', en: 'Five minutes a day' },
    wert: { de: '5–10 Minuten langsames Laufen pro Tag', en: '5–10 minutes of slow running per day' } },

  { id: 'weston2014', bereich: 'cardio',
    titel: { de: 'HIIT wirkt doppelt', en: 'HIIT works twice as well' },
    wert: { de: 'fast doppelt so stark', en: 'nearly twice as much' } },

  { id: 'little2010', bereich: 'cardio',
    titel: { de: '20 Minuten genügen', en: 'Twenty minutes is enough' },
    wert: { de: '~20–25 Minuten pro Einheit', en: '~20–25 minutes per session' } },

  { id: 'mcrae2012', bereich: 'cardio',
    titel: { de: '4 Minuten, viermal', en: 'Four minutes, four times' },
    wert: { de: '4 Minuten Ganzkörper-Intervalle', en: '4 minutes of whole-body intervals' } },

  { id: 'gunnarsson2012', bereich: 'cardio',
    titel: { de: 'Weniger, aber schneller', en: 'Less, but faster' },
    wert: { de: '~50 % weniger Trainingsvolumen', en: '~50% less training volume' } },

  { id: 'milanovic2015', bereich: 'cardio',
    titel: { de: 'HIIT für die Ausdauer', en: 'HIIT for endurance' },
    wert: null },

  { id: 'chaabene2015', bereich: 'kampfsport',
    titel: { de: 'Boxen fordert alles', en: 'Boxing demands everything' },
    wert: { de: '60 ml/kg/min', en: '60 ml/kg/min' } },
];

// Richtwerte aus den quick-Eintraegen. `label` ist der Schluessel INNERHALB des
// Themas; der Text kommt zur Laufzeit aus social-daten.mjs.
const AUS_WISSEN = [
  { thema: 'volume_frequency', label: 'Richtwert Volumen', bereich: 'training',
    titel: { de: 'Wie viele Sätze?', en: 'How many sets?' } },
  { thema: 'volume_frequency', label: 'Richtwert Frequenz', bereich: 'training',
    titel: { de: 'Wie oft pro Woche?', en: 'How often per week?' } },
  { thema: 'protein', label: 'Zielmenge', bereich: 'nutrition',
    titel: { de: 'Wie viel Protein?', en: 'How much protein?' } },
  { thema: 'fats', label: 'Mindestmenge', bereich: 'nutrition',
    titel: { de: 'Fett nicht streichen', en: 'Do not cut fat' } },
  { thema: 'creatine', label: 'Dosierung', bereich: 'supplements',
    titel: { de: 'Wie viel Kreatin?', en: 'How much creatine?' } },
  { thema: 'caffeine', label: 'Dosierung', bereich: 'supplements',
    titel: { de: 'Wie viel Koffein?', en: 'How much caffeine?' } },
  { thema: 'omega3', label: 'Quelle & Dosis', bereich: 'supplements',
    titel: { de: 'Omega-3 im Alltag', en: 'Omega-3 day to day' } },
  { thema: 'vitamin_d', label: 'Praxis', bereich: 'supplements',
    titel: { de: 'Vitamin D im Winter', en: 'Vitamin D in winter' } },
  { thema: 'recovery_overtraining', label: 'Wichtigste Hebel', bereich: 'training',
    titel: { de: 'Schlaf ist Training', en: 'Sleep is training' } },
  { thema: 'hypertrophy_basics', label: 'Voraussetzungen', bereich: 'training',
    titel: { de: 'Ohne das kein Wachstum', en: 'No growth without this' } },
];

// --- Zusammenbauen und pruefen ----------------------------------------------
function ausStudie(e) {
  const s = STUDIEN[e.id];
  if (!s) throw new Error(`Studie ${e.id} gibt es in peakPrograms.js nicht (mehr)`);
  return {
    id: e.id, bereich: e.bereich, quelle: `peakPrograms.js STUDY.${e.id}`,
    titel: e.titel,
    aussage: { de: s.findingDE, en: s.findingEN },
    wert: e.wert,
    studie: { name: s.name, jahr: s.year },
  };
}

function ausWissen(e, themen) {
  const th = themen.find((t) => t.id === e.thema);
  if (!th) return null;
  const hol = (sp) => (th.quick[sp] ?? []).find((q) => q.label === e.label)?.text;
  const de = hol('de');
  if (!de) return null;
  // ⚠ Erklaertext und Wert duerfen NICHT derselbe Satz sein. Im ersten Entwurf
  // stand der Richtwert zweimal wortgleich untereinander auf der Karte — einmal
  // als Erklaerung, einmal als „Laut Studien". Deshalb:
  //   Erklaertext = die Zusammenfassung des Themas (Kontext, ohne die Zahl)
  //   Wert        = der Richtwert selbst (die Zahl)
  return {
    id: `${e.thema}:${e.label}`, bereich: e.bereich,
    quelle: `${e.thema}: Zusammenfassung + quickDE[${e.label}]`,
    titel: e.titel,
    aussage: { de: th.zusammenfassung.de, en: th.zusammenfassung.en || th.zusammenfassung.de },
    wert: { de, en: hol('en') ?? de },
    wertQuelle: { de, en: hol('en') ?? de },
    // Nicht jede Quelle traegt ein Jahr (NIH-Merkblaetter etwa). Dann bleibt
    // das Feld leer, statt „undefined" in den Kontrollteil zu schreiben.
    studie: th.quellen?.[0]
      ? { name: (th.quellen[0].authors ?? '').split(',')[0].trim(),
          jahr: th.quellen[0].year ?? null }
      : null,
  };
}

export function studienPosts() {
  const themen = wissensthemen();
  const alle = [
    ...AUS_STUDIEN.map(ausStudie),
    ...AUS_WISSEN.map((e) => ausWissen(e, themen)).filter(Boolean),
  ];

  // ⚠ Die Reissleine: Ein `wert`, der nicht woertlich in der Aussage steht, ist
  // eine erfundene Zahl. Lieber ein Absturz beim Bauen als eine falsche Zahl
  // im Feed.
  for (const p of alle) {
    if (!p.wert) continue;
    // Gegen welchen Text geprueft wird: bei Studienfunden gegen die Aussage
    // (der Wert ist ein Ausschnitt daraus), bei Richtwerten gegen den
    // quick-Eintrag, aus dem er stammt.
    const gegen = p.wertQuelle ?? p.aussage;
    for (const sp of ['de', 'en']) {
      if (p.wert[sp] && gegen[sp] && !gegen[sp].includes(p.wert[sp])) {
        throw new Error(
          `Wert steht nicht woertlich in seiner Quelle (${p.id}, ${sp}):\n`
          + `  Wert:   "${p.wert[sp]}"\n  Quelle: "${gegen[sp]}"`,
        );
      }
    }
  }
  return alle;
}
