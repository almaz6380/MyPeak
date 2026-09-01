// Beschriftungen der Trainingstage aus `peakPrograms.js` („Push", „Oberkörper",
// „Boxen: Kombis" …).
//
// **Warum hier und nicht in der Datendatei?** Diese `label`-Felder gibt es dort
// nur EINMAL, auf Deutsch — anders als bei allen anderen Texten fehlt ein
// `labelEN`. Englische Nutzer sahen deshalb bisher „Oberkörper" und
// „Schwachstellen" mitten in einer englischen Oberfläche. Statt 78 Stellen in
// der Datendatei zu verdoppeln, steht die Übersetzung hier als flache Tabelle;
// der deutsche Text ist zugleich der Schlüssel.
//
// Gelesen wird über `beschriftung()`. Fehlt ein Eintrag, bleibt die deutsche
// Beschriftung stehen — dasselbe Verhalten wie bisher, nur eben als Rückfall
// statt als Regel.
import { beschriftung } from '../lib/sprache.js';

const TAGE = {
  // Krafttraining
  Push: { de: 'Push', en: 'Push', es: 'Empuje' },
  Pull: { de: 'Pull', en: 'Pull', es: 'Tirón' },
  Legs: { de: 'Legs', en: 'Legs', es: 'Pierna' },
  'Oberkörper': { de: 'Oberkörper', en: 'Upper Body', es: 'Tren superior' },
  'Unterkörper': { de: 'Unterkörper', en: 'Lower Body', es: 'Tren inferior' },
  Brust: { de: 'Brust', en: 'Chest', es: 'Pecho' },
  'Rücken': { de: 'Rücken', en: 'Back', es: 'Espalda' },
  Schultern: { de: 'Schultern', en: 'Shoulders', es: 'Hombros' },
  Arme: { de: 'Arme', en: 'Arms', es: 'Brazos' },
  Beine: { de: 'Beine', en: 'Legs', es: 'Piernas' },
  'Ganzkörper A': { de: 'Ganzkörper A', en: 'Full Body A', es: 'Cuerpo completo A' },
  'Ganzkörper B': { de: 'Ganzkörper B', en: 'Full Body B', es: 'Cuerpo completo B' },
  'Ganzkörper C': { de: 'Ganzkörper C', en: 'Full Body C', es: 'Cuerpo completo C' },
  'Push + Quads': { de: 'Push + Quads', en: 'Push + Quads', es: 'Empuje + cuádriceps' },
  'Pull + Hamstrings': { de: 'Pull + Hamstrings', en: 'Pull + Hamstrings', es: 'Tirón + isquiotibiales' },
  'Schultern + Arme': { de: 'Schultern + Arme', en: 'Shoulders + Arms', es: 'Hombros + brazos' },
  Schwachstellen: { de: 'Schwachstellen', en: 'Weak Points', es: 'Puntos débiles' },

  // Cardio
  'Lauf + Gehpausen': { de: 'Lauf + Gehpausen', en: 'Run + Walk Breaks', es: 'Carrera + pausas caminando' },
  '4×4 Intervalle': { de: '4×4 Intervalle', en: '4×4 Intervals', es: 'Intervalos 4×4' },
  '10-20-30': { de: '10-20-30', en: '10-20-30', es: '10-20-30' },
  'Zone 2': { de: 'Zone 2', en: 'Zone 2', es: 'Zona 2' },
  'Langer Lauf': { de: 'Langer Lauf', en: 'Long Run', es: 'Carrera larga' },
  Intervalle: { de: 'Intervalle', en: 'Intervals', es: 'Intervalos' },
  Tempolauf: { de: 'Tempolauf', en: 'Tempo Run', es: 'Carrera a ritmo' },
  'Lockerer Lauf': { de: 'Lockerer Lauf', en: 'Easy Run', es: 'Carrera suave' },

  // HIIT
  Tabata: { de: 'Tabata', en: 'Tabata', es: 'Tabata' },
  'SIT 60/75': { de: 'SIT 60/75', en: 'SIT 60/75', es: 'SIT 60/75' },
  'HIIT 30/30': { de: 'HIIT 30/30', en: 'HIIT 30/30', es: 'HIIT 30/30' },
  'HIIT Power': { de: 'HIIT Power', en: 'HIIT Power', es: 'HIIT potencia' },
  'HIIT Core': { de: 'HIIT Core', en: 'HIIT Core', es: 'HIIT core' },
  'HIIT Legs': { de: 'HIIT Legs', en: 'HIIT Legs', es: 'HIIT piernas' },
  'HIIT Full': { de: 'HIIT Full', en: 'HIIT Full Body', es: 'HIIT cuerpo completo' },
  'EMOM Upper': { de: 'EMOM Upper', en: 'EMOM Upper', es: 'EMOM tren superior' },
  'EMOM Lower': { de: 'EMOM Lower', en: 'EMOM Lower', es: 'EMOM tren inferior' },
  'EMOM Full': { de: 'EMOM Full', en: 'EMOM Full Body', es: 'EMOM cuerpo completo' },
  'EMOM Core': { de: 'EMOM Core', en: 'EMOM Core', es: 'EMOM core' },

  // Kampfsport
  'Boxen: Technik': { de: 'Boxen: Technik', en: 'Boxing: Technique', es: 'Boxeo: técnica' },
  'Boxen: Kombis': { de: 'Boxen: Kombis', en: 'Boxing: Combos', es: 'Boxeo: combinaciones' },
  'Boxen: Kondition': { de: 'Boxen: Kondition', en: 'Boxing: Conditioning', es: 'Boxeo: acondicionamiento' },
  'Kickboxen: Technik': { de: 'Kickboxen: Technik', en: 'Kickboxing: Technique', es: 'Kickboxing: técnica' },
  'Kickboxen: Kombis': { de: 'Kickboxen: Kombis', en: 'Kickboxing: Combos', es: 'Kickboxing: combinaciones' },
  Kondition: { de: 'Kondition', en: 'Conditioning', es: 'Acondicionamiento' },
  'Sparring-Drill': { de: 'Sparring-Drill', en: 'Sparring Drill', es: 'Ejercicio de sparring' },
  Striking: { de: 'Striking', en: 'Striking', es: 'Golpeo' },
  Kicks: { de: 'Kicks', en: 'Kicks', es: 'Patadas' },
  Conditioning: { de: 'Conditioning', en: 'Conditioning', es: 'Acondicionamiento' },
  'Full MMA': { de: 'Full MMA', en: 'Full MMA', es: 'MMA completo' },
  Technik: { de: 'Technik', en: 'Technique', es: 'Técnica' },
  'Heavy Bag': { de: 'Heavy Bag', en: 'Heavy Bag', es: 'Saco pesado' },
  'Sparring-Simulation': { de: 'Sparring-Simulation', en: 'Sparring Simulation', es: 'Simulación de sparring' },
  'Boxing Fit': { de: 'Boxing Fit', en: 'Boxing Fit', es: 'Boxing Fit' },
  'Kick Fit': { de: 'Kick Fit', en: 'Kick Fit', es: 'Kick Fit' },
  'Combat Mix': { de: 'Combat Mix', en: 'Combat Mix', es: 'Combat Mix' },
};

export function tagesBeschriftung(label, sprache) {
  if (!label) return '';
  return beschriftung(TAGE[label], sprache) || label;
}

export default TAGE;
