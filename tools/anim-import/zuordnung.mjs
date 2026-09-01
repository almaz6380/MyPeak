// Welche Datei aus dem Vital-Animations-Gratispaket gehoert zu welcher
// FullRep-Uebung.
//
// ⚠ HANDTABELLE, keine Stichwort-Automatik. Ein Automat hat beim Versuch
// davor „barbell back squat" auf „Barbell Curl" abgebildet und „leg press
// machine" auf „Chest Press Machine" — Wortueberlappung ist kein Mass fuer
// Gleichheit. Jede Zeile hier ist von Hand geprueft.
//
// Links die ID aus `free-pack-50gymworkouts.json`, rechts unser Ordnername
// aus `src/data/exerciseDemos.js`.
//
// Was NICHT drinsteht, hat bewusst keine Entsprechung — lieber eine Luecke
// (dann bleibt das alte Foto stehen) als eine falsche Animation.

export const zuordnung = {
  // ————— Brust —————
  '0051': 'Butterfly',                                  // pec deck machine fly
  '0052': 'Svend_Press',                                // svend press chest

  // ————— Beine —————
  '0054': 'Barbell_Squat',                              // barbell back squat
  '0056': 'Front_Barbell_Squat',                        // barbell front squat
  '0059': 'Dumbbell_Rear_Lunge',                        // barbell reverse lunges
  '0060': 'Romanian_Deadlift',                          // barbell romanian deadlift
  '0063': 'Split_Squat_with_Dumbbells',                 // dumbbell bulgarian split squat
  '0064': 'Goblet_Squat',                               // dumbbell goblet squat
  '0068': 'Hack_Squat',                                 // hack squat machine
  '0069': 'Thigh_Abductor',                             // hip abduction machine
  '0073': 'Leg_Extensions',                             // leg extension machine
  '0074': 'Leg_Press',                                  // leg press machine
  '0075': 'Lying_Leg_Curls',                            // lying leg curl machine
  '0079': 'Seated_Leg_Curl',                            // seated leg curl machine
  '0081': 'Barbell_Step_Ups',                           // step-ups (weighted)
  '0084': 'Stiff-Legged_Barbell_Deadlift',              // stiff-legged deadlift machine

  // ————— Gesaess —————
  '0057': 'Barbell_Hip_Thrust',                         // barbell hip thrust
  '0061': 'One-Legged_Cable_Kickback',                  // cable leg kickback

  // ————— Schultern —————
  '0087': 'Arnold_Dumbbell_Press',                      // arnold press dumbbell
  '0088': 'Standing_Military_Press',                    // barbell overhead press standing
  '0089': 'Upright_Barbell_Row',                        // barbell upright row
  '0090': 'Dumbbell_Shoulder_Press',                    // dumbbell overhead standard
  '0092': 'Front_Dumbbell_Raise',                       // front raise (dumbbell)
  '0093': 'Front_Plate_Raise',                          // front raise (weighted plate)
  '0095': 'Cable_Seated_Lateral_Raise',                 // cable cross lateral raise
  '0096': 'Side_Lateral_Raise',                         // lateral raises (dumbbell)
  '0098': 'Smith_Machine_Overhead_Shoulder_Press',      // military press (seated - smith)
  '0099': 'Reverse_Flyes',                              // rear delt fly (reverse pec deck)
  '0100': 'Cable_Rear_Delt_Fly',                        // rear delt cable fly

  // ————— Trizeps —————
  '0085': 'Triceps_Pushdown_-_Rope_Attachment',         // triceps pushdown (cable - rope)

  // ————— Ausdauer / Ganzkoerper —————
  '0066': 'Freehand_Jump_Squat',                        // dumbbell jump squat
  '0067': 'Elliptical_Trainer',                         // elliptical hiit machine
  '0072': 'One-Arm_Kettlebell_Swings',                  // kettlebell swing
  '0076': 'Battling_Ropes',                             // rope wave
  '0077': 'Rowing_Stationary',                          // rowing machine
  '0078': 'Running_Treadmill',                          // run on treadmill
};

// Uebungen OHNE Fotoordner. Zwei davon gibt es bei uns laengst, sie zeigten
// bisher nur nichts an — die Animation ist dort reiner Gewinn. Die uebrigen
// sind neu angelegt (siehe src/data/exercises.js).
export const direkt = {
  '0062': 'cycling',                // Ergometer — Uebung existierte, ohne Bild
  '0097': 'machine-lateral-raise',  // Seitheben Maschine — dito
  '0053': 'air-bike',               // NEU
  '0083': 'stepmill',               // NEU (0082 ist dieselbe Uebung, anderer Blickwinkel)
  '0086': 'treadmill-walk',         // NEU
  '0065': 'hip-hinge',              // NEU
};

// Uebungen, die sich einen Fotoordner mit einer animierten Uebung teilen, die
// Animation aber NICHT bekommen duerfen: Dort zeigt sie ein anderes Geraet
// oder eine andere Ausfuehrung.
//
// ⚠ Diese Liste ist noetig, weil mehrere Uebungs-IDs auf denselben Fotoordner
// zeigen. Ohne sie bekaeme „einbeinige Beinpresse" die beidbeinige Animation.
// Bei blossem Unterschied in der Last (Step-Ups mit/ohne Gewicht) bleibt sie
// drin — die Bewegung ist dieselbe.
export const ausnahmen = new Set([
  'machine-hip-thrust',    // Animation zeigt Langhantel, nicht die Maschine
  'single-leg-press',      // Animation zeigt BEIDE Beine
  'leg-press-wide',        // weiter Stand ist der Kern der Uebung, Animation zeigt Standard
  'rear-delt-fly-machine', // Animation zeigt Kabelzug, nicht die Maschine
]);

// Bewusst OHNE Entsprechung — hier zur Nachvollziehbarkeit, damit niemand
// spaeter denkt, sie seien vergessen worden:
//
//   0055 barbell bulgarian split  — 0063 (Kurzhantel) passt besser zu unserer Uebung
//   0058 barbell march            — haben wir nicht
//   0070 kettlebell hold march    — haben wir nicht
//   0071 kettlebell lift up       — haben wir nicht
//   0080 seated overhead press    — Maschine; unsere Varianten sind Lang-/Kurzhantel
//   0082 stepmill machine v1      — dieselbe Uebung wie 0083, anderer Blickwinkel
//   0091 dumbbell upright row     — unsere Varianten sind Langhantel und Kabel
//   0094 kettlebell overhead press— unsere Varianten sind Lang-/Kurzhantel
