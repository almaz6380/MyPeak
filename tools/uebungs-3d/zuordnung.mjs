// Welche Uebung wird nach welchem Bewegungsmuster animiert.
//
// ⚠ BEWUSST EINE AUSDRUECKLICHE TABELLE, keine Stichwort-Automatik. Genau
// daran ist der KI-Bilder-Versuch am 01.09.2026 gescheitert: Aus dem
// Ordnernamen „Air_Bike" wurde ein Spinning-Rad statt des Bicycle Crunch.
// Ordnernamen stammen aus einer fremden Datenbank und sagen nicht verlaesslich,
// was die Uebung ist — die Zuordnung gehoert von Hand geprueft.
//
// Der Zielmuskel kommt NICHT von hier, sondern aus `muscleGroup` in
// src/data/exercises.js: Er ist dort schon gepflegt und wird in der App
// angezeigt, also gaebe eine zweite Liste nur eine zweite Wahrheit.
//
// Fehlt ein Ordner hier, meldet render.mjs ihn und ueberspringt ihn — lieber
// eine Luecke als eine falsche Animation.

export const zuordnung = {
  // ————— Ausdauer —————
  Elliptical_Trainer: 'laufen',
  Running_Treadmill: 'laufen',
  Rowing_Stationary: 'rudern_geraet',
  Rope_Jumping: 'sprung',

  // ————— Ganzkoerper / Sprung —————
  Battling_Ropes: 'schwung',
  Freehand_Jump_Squat: 'sprung',
  Front_Box_Jump: 'sprung',
  Split_Jump: 'ausfallschritt',
  Star_Jump: 'hampelmann',
  'One-Arm_Kettlebell_Swings': 'schwung',

  // ————— Bauch —————
  Ab_Roller: 'ab_rad',
  Air_Bike: 'crunch',                    // Bicycle Crunch — KEIN Fahrrad!
  Crunches: 'crunch',
  Cable_Crunch: 'crunch',
  Dead_Bug: 'beinheben',
  Flat_Bench_Lying_Leg_Raise: 'beinheben',
  Hanging_Leg_Raise: 'beinheben_haengend',
  Plank: 'plank',
  Mountain_Climbers: 'bergsteiger',
  Russian_Twist: 'drehung_sitzend',
  Standing_Cable_Wood_Chop: 'holzhacker',

  // ————— Ruecken —————
  Barbell_Deadlift: 'kreuzheben',
  Deficit_Deadlift: 'kreuzheben',
  Rack_Pulls: 'kreuzheben',
  Snatch_Deadlift: 'kreuzheben',
  Sumo_Deadlift: 'kreuzheben',
  Good_Morning: 'kreuzheben',
  Romanian_Deadlift: 'kreuzheben',
  'Stiff-Legged_Barbell_Deadlift': 'kreuzheben',
  Pull_Through: 'kreuzheben',
  Bent_Over_Barbell_Row: 'rudern_vorgebeugt',
  'Lying_T-Bar_Row': 'rudern_vorgebeugt',
  'One-Arm_Dumbbell_Row': 'rudern_vorgebeugt',
  Seated_Cable_Rows: 'rudern_sitzend',
  'Seated_One-arm_Cable_Pulley_Rows': 'rudern_sitzend',
  Leverage_High_Row: 'rudern_sitzend',
  Inverted_Row: 'rudern_sitzend',
  'Close-Grip_Front_Lat_Pulldown': 'latzug',
  'Wide-Grip_Lat_Pulldown': 'latzug',
  Underhand_Cable_Pulldowns: 'latzug',
  'Straight-Arm_Pulldown': 'latzug',
  'Straight-Arm_Dumbbell_Pullover': 'latzug',
  Pullups: 'klimmzug',
  'Chin-Up': 'klimmzug',
  Hyperextensions_Back_Extensions: 'hyperextension',
  Reverse_Hyperextension: 'hyperextension',
  Glute_Ham_Raise: 'hyperextension',
  Natural_Glute_Ham_Raise: 'hyperextension',

  // ————— Bizeps —————
  Barbell_Curl: 'curl',
  Drag_Curl: 'curl',
  'EZ-Bar_Curl': 'curl',
  Reverse_Barbell_Curl: 'curl',
  Dumbbell_Bicep_Curl: 'curl_kurzhantel',
  Hammer_Curls: 'curl_kurzhantel',
  Cross_Body_Hammer_Curl: 'curl_kurzhantel',
  Zottman_Curl: 'curl_kurzhantel',
  Standing_Biceps_Cable_Curl: 'curl_kurzhantel',
  'Cable_Hammer_Curls_-_Rope_Attachment': 'curl_kurzhantel',
  Concentration_Curls: 'curl_sitzend',
  Incline_Dumbbell_Curl: 'curl_sitzend',
  One_Arm_Dumbbell_Preacher_Curl: 'curl_sitzend',
  Spider_Curl: 'curl_sitzend',
  Preacher_Curl: 'curl_sitzend',
  Cable_Preacher_Curl: 'curl_sitzend',
  Machine_Bicep_Curl: 'curl_sitzend',

  // ————— Trizeps —————
  Triceps_Pushdown: 'trizeps_druecken',
  'Triceps_Pushdown_-_Rope_Attachment': 'trizeps_druecken',
  'Triceps_Pushdown_-_V-Bar_Attachment': 'trizeps_druecken',
  Cable_One_Arm_Tricep_Extension: 'trizeps_druecken',
  Machine_Triceps_Extension: 'trizeps_druecken',
  Triceps_Overhead_Extension_with_Rope: 'trizeps_ueberkopf',
  Standing_Dumbbell_Triceps_Extension: 'trizeps_ueberkopf',
  'EZ-Bar_Skullcrusher': 'trizeps_liegend',
  JM_Press: 'trizeps_liegend',
  Lying_Triceps_Press: 'trizeps_liegend',
  Tate_Press: 'trizeps_liegend',
  Tricep_Dumbbell_Kickback: 'trizeps_kickback',
  'Close-Grip_Barbell_Bench_Press': 'bankdruecken',
  Bench_Dips: 'dips',
  'Dips_-_Triceps_Version': 'dips',
  Dip_Machine: 'dips',
  Body_Tricep_Press: 'liegestuetz',
  'Push-Ups_-_Close_Triceps_Position': 'liegestuetz',

  // ————— Schultern —————
  Standing_Military_Press: 'schulterdruecken',
  'Push_Press_-_Behind_the_Neck': 'schulterdruecken',
  Standing_Bradford_Press: 'schulterdruecken',
  Smith_Machine_Overhead_Shoulder_Press: 'schulterdruecken',
  Dumbbell_Shoulder_Press: 'schulterdruecken_kurzhantel',
  Arnold_Dumbbell_Press: 'schulterdruecken_kurzhantel',
  Side_Lateral_Raise: 'seitheben',
  Seated_Side_Lateral_Raise: 'seitheben',
  Cable_Seated_Lateral_Raise: 'seitheben',
  Front_Dumbbell_Raise: 'frontheben',
  Alternating_Deltoid_Raise: 'frontheben',
  Front_Cable_Raise: 'frontheben',
  Front_Plate_Raise: 'frontheben',
  Reverse_Flyes: 'reverse_fly',
  Cable_Rear_Delt_Fly: 'reverse_fly',
  Face_Pull: 'reverse_fly',
  Band_Pull_Apart: 'reverse_fly',
  Upright_Barbell_Row: 'aufrechtes_rudern',
  Upright_Cable_Row: 'aufrechtes_rudern',
  Barbell_Shrug: 'shrugs',
  Dumbbell_Shrug: 'shrugs',

  // ————— Brust —————
  'Barbell_Bench_Press_-_Medium_Grip': 'bankdruecken',
  Barbell_Guillotine_Bench_Press: 'bankdruecken',
  Decline_Barbell_Bench_Press: 'bankdruecken',
  Smith_Machine_Bench_Press: 'bankdruecken',
  Dumbbell_Bench_Press: 'bankdruecken_kurzhantel',
  Decline_Dumbbell_Bench_Press: 'bankdruecken_kurzhantel',
  'Barbell_Incline_Bench_Press_-_Medium_Grip': 'schraegbankdruecken',
  Incline_Dumbbell_Press: 'schraegbankdruecken',
  Smith_Machine_Incline_Bench_Press: 'schraegbankdruecken',
  Dumbbell_Flyes: 'fliegende',
  Incline_Dumbbell_Flyes: 'fliegende',
  Around_The_Worlds: 'fliegende',
  Cable_Crossover: 'kabelzug_brust',
  Low_Cable_Crossover: 'kabelzug_brust',
  'Single-Arm_Cable_Crossover': 'kabelzug_brust',
  Svend_Press: 'kabelzug_brust',
  Butterfly: 'kabelzug_brust',
  Leverage_Chest_Press: 'kabelzug_brust',
  Pushups: 'liegestuetz',
  'Push-Up_Wide': 'liegestuetz',
  'Incline_Push-Up': 'liegestuetz',
  'Decline_Push-Up': 'liegestuetz',
  'Dips_-_Chest_Version': 'dips',

  // ————— Beine —————
  Bodyweight_Squat: 'kniebeuge',
  Goblet_Squat: 'kniebeuge',
  Weighted_Sissy_Squat: 'kniebeuge',
  Kettlebell_Pistol_Squat: 'kniebeuge',
  Plie_Dumbbell_Squat: 'kniebeuge',
  Barbell_Squat: 'kniebeuge_langhantel',
  Front_Barbell_Squat: 'kniebeuge_langhantel',
  Smith_Machine_Squat: 'kniebeuge_langhantel',
  Dumbbell_Lunges: 'ausfallschritt',
  Dumbbell_Rear_Lunge: 'ausfallschritt',
  Bodyweight_Walking_Lunge: 'ausfallschritt',
  Split_Squat_with_Dumbbells: 'ausfallschritt',
  Barbell_Step_Ups: 'ausfallschritt',
  Leg_Press: 'beinpresse',
  Narrow_Stance_Leg_Press: 'beinpresse',
  Hack_Squat: 'beinpresse',
  Leg_Extensions: 'beinstrecker',
  Lying_Leg_Curls: 'beinbeuger',
  Seated_Leg_Curl: 'beinbeuger',
  Thigh_Abductor: 'abduktion',
  Thigh_Adductor: 'abduktion',

  // ————— Gesaess —————
  Barbell_Glute_Bridge: 'hueftheben',
  Barbell_Hip_Thrust: 'hueftheben',
  Glute_Kickback: 'kickback',
  'One-Legged_Cable_Kickback': 'kickback',

  // ————— Waden —————
  Standing_Calf_Raises: 'wadenheben',
  Seated_Calf_Raise: 'wadenheben',
  Donkey_Calf_Raises: 'wadenheben',
  Smith_Machine_Calf_Raise: 'wadenheben',
  'Dumbbell_Seated_One-Leg_Calf_Raise': 'wadenheben',

  // ————— Unterarme —————
  'Standing_Palms-Up_Barbell_Behind_The_Back_Wrist_Curl': 'handgelenk_curl',
  'Seated_Palms-Down_Barbell_Wrist_Curl': 'handgelenk_curl',
  Cable_Wrist_Curl: 'handgelenk_curl',
  Farmers_Walk: 'halten',
  Plate_Pinch: 'halten',
};
