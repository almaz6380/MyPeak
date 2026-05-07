export const muscleGroups = [
  'chest', 'back', 'shoulders', 'biceps', 'triceps',
  'legs', 'glutes', 'abs', 'calves', 'forearms',
];

export const trainingTypes = ['strength', 'cardio', 'hiit', 'circuit', 'martial-arts'];

export const martialArtsCategories = ['boxing', 'kickboxing', 'mma', 'karate'];

const exercises = [
  // === STRENGTH ===

  // Chest
  { id: 'bench-press', type: 'strength', muscleGroup: 'chest', equipment: 'barbell', nameKey: 'exercises.benchPress', descKey: 'exercises.benchPressDesc' },
  { id: 'incline-bench-press', type: 'strength', muscleGroup: 'chest', equipment: 'barbell', nameKey: 'exercises.inclineBenchPress', descKey: 'exercises.inclineBenchPressDesc' },
  { id: 'dumbbell-flyes', type: 'strength', muscleGroup: 'chest', equipment: 'dumbbell', nameKey: 'exercises.dumbbellFlyes', descKey: 'exercises.dumbbellFlyesDesc' },
  { id: 'cable-crossover', type: 'strength', muscleGroup: 'chest', equipment: 'cable', nameKey: 'exercises.cableCrossover', descKey: 'exercises.cableCrossoverDesc' },
  { id: 'chest-dips', type: 'strength', muscleGroup: 'chest', equipment: 'bodyweight', nameKey: 'exercises.chestDips', descKey: 'exercises.chestDipsDesc' },
  { id: 'chest-press-machine', type: 'strength', muscleGroup: 'chest', equipment: 'machine', nameKey: 'exercises.chestPressMachine', descKey: 'exercises.chestPressMachineDesc' },

  // Back
  { id: 'deadlift', type: 'strength', muscleGroup: 'back', equipment: 'barbell', nameKey: 'exercises.deadlift', descKey: 'exercises.deadliftDesc' },
  { id: 'pull-ups', type: 'strength', muscleGroup: 'back', equipment: 'bodyweight', nameKey: 'exercises.pullUps', descKey: 'exercises.pullUpsDesc' },
  { id: 'barbell-row', type: 'strength', muscleGroup: 'back', equipment: 'barbell', nameKey: 'exercises.barbellRow', descKey: 'exercises.barbellRowDesc' },
  { id: 'lat-pulldown', type: 'strength', muscleGroup: 'back', equipment: 'cable', nameKey: 'exercises.latPulldown', descKey: 'exercises.latPulldownDesc' },
  { id: 'seated-cable-row', type: 'strength', muscleGroup: 'back', equipment: 'cable', nameKey: 'exercises.seatedCableRow', descKey: 'exercises.seatedCableRowDesc' },
  { id: 'dumbbell-row', type: 'strength', muscleGroup: 'back', equipment: 'dumbbell', nameKey: 'exercises.dumbbellRow', descKey: 'exercises.dumbbellRowDesc' },

  // Shoulders
  { id: 'overhead-press', type: 'strength', muscleGroup: 'shoulders', equipment: 'barbell', nameKey: 'exercises.overheadPress', descKey: 'exercises.overheadPressDesc' },
  { id: 'lateral-raise', type: 'strength', muscleGroup: 'shoulders', equipment: 'dumbbell', nameKey: 'exercises.lateralRaise', descKey: 'exercises.lateralRaiseDesc' },
  { id: 'face-pull', type: 'strength', muscleGroup: 'shoulders', equipment: 'cable', nameKey: 'exercises.facePull', descKey: 'exercises.facePullDesc' },
  { id: 'front-raise', type: 'strength', muscleGroup: 'shoulders', equipment: 'dumbbell', nameKey: 'exercises.frontRaise', descKey: 'exercises.frontRaiseDesc' },
  { id: 'reverse-flyes', type: 'strength', muscleGroup: 'shoulders', equipment: 'dumbbell', nameKey: 'exercises.reverseFlyes', descKey: 'exercises.reverseFlyesDesc' },

  // Biceps
  { id: 'barbell-curl', type: 'strength', muscleGroup: 'biceps', equipment: 'barbell', nameKey: 'exercises.barbellCurl', descKey: 'exercises.barbellCurlDesc' },
  { id: 'dumbbell-curl', type: 'strength', muscleGroup: 'biceps', equipment: 'dumbbell', nameKey: 'exercises.dumbbellCurl', descKey: 'exercises.dumbbellCurlDesc' },
  { id: 'hammer-curl', type: 'strength', muscleGroup: 'biceps', equipment: 'dumbbell', nameKey: 'exercises.hammerCurl', descKey: 'exercises.hammerCurlDesc' },
  { id: 'preacher-curl', type: 'strength', muscleGroup: 'biceps', equipment: 'machine', nameKey: 'exercises.preacherCurl', descKey: 'exercises.preacherCurlDesc' },

  // Triceps
  { id: 'tricep-pushdown', type: 'strength', muscleGroup: 'triceps', equipment: 'cable', nameKey: 'exercises.tricepPushdown', descKey: 'exercises.tricepPushdownDesc' },
  { id: 'skull-crushers', type: 'strength', muscleGroup: 'triceps', equipment: 'barbell', nameKey: 'exercises.skullCrushers', descKey: 'exercises.skullCrushersDesc' },
  { id: 'overhead-tricep-extension', type: 'strength', muscleGroup: 'triceps', equipment: 'dumbbell', nameKey: 'exercises.overheadTricepExtension', descKey: 'exercises.overheadTricepExtensionDesc' },
  { id: 'tricep-dips', type: 'strength', muscleGroup: 'triceps', equipment: 'bodyweight', nameKey: 'exercises.tricepDips', descKey: 'exercises.tricepDipsDesc' },

  // Legs
  { id: 'squat', type: 'strength', muscleGroup: 'legs', equipment: 'barbell', nameKey: 'exercises.squat', descKey: 'exercises.squatDesc' },
  { id: 'leg-press', type: 'strength', muscleGroup: 'legs', equipment: 'machine', nameKey: 'exercises.legPress', descKey: 'exercises.legPressDesc' },
  { id: 'leg-extension', type: 'strength', muscleGroup: 'legs', equipment: 'machine', nameKey: 'exercises.legExtension', descKey: 'exercises.legExtensionDesc' },
  { id: 'leg-curl', type: 'strength', muscleGroup: 'legs', equipment: 'machine', nameKey: 'exercises.legCurl', descKey: 'exercises.legCurlDesc' },
  { id: 'lunges', type: 'strength', muscleGroup: 'legs', equipment: 'dumbbell', nameKey: 'exercises.lunges', descKey: 'exercises.lungesDesc' },
  { id: 'romanian-deadlift', type: 'strength', muscleGroup: 'legs', equipment: 'barbell', nameKey: 'exercises.romanianDeadlift', descKey: 'exercises.romanianDeadliftDesc' },

  // Glutes
  { id: 'hip-thrust', type: 'strength', muscleGroup: 'glutes', equipment: 'barbell', nameKey: 'exercises.hipThrust', descKey: 'exercises.hipThrustDesc' },
  { id: 'cable-kickback', type: 'strength', muscleGroup: 'glutes', equipment: 'cable', nameKey: 'exercises.cableKickback', descKey: 'exercises.cableKickbackDesc' },
  { id: 'glute-bridge', type: 'strength', muscleGroup: 'glutes', equipment: 'bodyweight', nameKey: 'exercises.gluteBridge', descKey: 'exercises.gluteBridgeDesc' },

  // Abs
  { id: 'crunches', type: 'strength', muscleGroup: 'abs', equipment: 'bodyweight', nameKey: 'exercises.crunches', descKey: 'exercises.crunchesDesc' },
  { id: 'hanging-leg-raise', type: 'strength', muscleGroup: 'abs', equipment: 'bodyweight', nameKey: 'exercises.hangingLegRaise', descKey: 'exercises.hangingLegRaiseDesc' },
  { id: 'cable-crunch', type: 'strength', muscleGroup: 'abs', equipment: 'cable', nameKey: 'exercises.cableCrunch', descKey: 'exercises.cableCrunchDesc' },
  { id: 'plank', type: 'strength', muscleGroup: 'abs', equipment: 'bodyweight', nameKey: 'exercises.plank', descKey: 'exercises.plankDesc' },

  // Calves
  { id: 'calf-raise-standing', type: 'strength', muscleGroup: 'calves', equipment: 'machine', nameKey: 'exercises.calfRaiseStanding', descKey: 'exercises.calfRaiseStandingDesc' },
  { id: 'calf-raise-seated', type: 'strength', muscleGroup: 'calves', equipment: 'machine', nameKey: 'exercises.calfRaiseSeated', descKey: 'exercises.calfRaiseSeatedDesc' },

  // Forearms
  { id: 'wrist-curl', type: 'strength', muscleGroup: 'forearms', equipment: 'dumbbell', nameKey: 'exercises.wristCurl', descKey: 'exercises.wristCurlDesc' },
  { id: 'reverse-wrist-curl', type: 'strength', muscleGroup: 'forearms', equipment: 'dumbbell', nameKey: 'exercises.reverseWristCurl', descKey: 'exercises.reverseWristCurlDesc' },

  // === CARDIO ===
  { id: 'running', type: 'cardio', cardioType: 'running', nameKey: 'exercises.running', descKey: 'exercises.runningDesc' },
  { id: 'cycling', type: 'cardio', cardioType: 'cycling', nameKey: 'exercises.cycling', descKey: 'exercises.cyclingDesc' },
  { id: 'elliptical', type: 'cardio', cardioType: 'elliptical', nameKey: 'exercises.elliptical', descKey: 'exercises.ellipticalDesc' },
  { id: 'rowing-machine', type: 'cardio', cardioType: 'rowing', nameKey: 'exercises.rowingMachine', descKey: 'exercises.rowingMachineDesc' },
  { id: 'swimming', type: 'cardio', cardioType: 'swimming', nameKey: 'exercises.swimming', descKey: 'exercises.swimmingDesc' },

  // === HIIT ===
  { id: 'burpees', type: 'hiit', equipment: 'bodyweight', nameKey: 'exercises.burpees', descKey: 'exercises.burpeesDesc' },
  { id: 'mountain-climbers', type: 'hiit', equipment: 'bodyweight', nameKey: 'exercises.mountainClimbers', descKey: 'exercises.mountainClimbersDesc' },
  { id: 'jump-squats', type: 'hiit', equipment: 'bodyweight', nameKey: 'exercises.jumpSquats', descKey: 'exercises.jumpSquatsDesc' },
  { id: 'high-knees', type: 'hiit', equipment: 'bodyweight', nameKey: 'exercises.highKnees', descKey: 'exercises.highKneesDesc' },
  { id: 'box-jumps', type: 'hiit', equipment: 'bodyweight', nameKey: 'exercises.boxJumps', descKey: 'exercises.boxJumpsDesc' },
  { id: 'battle-ropes', type: 'hiit', equipment: 'bodyweight', nameKey: 'exercises.battleRopes', descKey: 'exercises.battleRopesDesc' },
  { id: 'kettlebell-swings', type: 'hiit', equipment: 'bodyweight', nameKey: 'exercises.kettlebellSwings', descKey: 'exercises.kettlebellSwingsDesc' },

  // === CIRCUIT ===
  { id: 'push-ups', type: 'circuit', equipment: 'bodyweight', nameKey: 'exercises.pushUps', descKey: 'exercises.pushUpsDesc' },
  { id: 'jumping-jacks', type: 'circuit', equipment: 'bodyweight', nameKey: 'exercises.jumpingJacks', descKey: 'exercises.jumpingJacksDesc' },
  { id: 'wall-sit', type: 'circuit', equipment: 'bodyweight', nameKey: 'exercises.wallSit', descKey: 'exercises.wallSitDesc' },
  { id: 'step-ups', type: 'circuit', equipment: 'bodyweight', nameKey: 'exercises.stepUps', descKey: 'exercises.stepUpsDesc' },
  { id: 'bodyweight-squats', type: 'circuit', equipment: 'bodyweight', nameKey: 'exercises.bodyweightSquats', descKey: 'exercises.bodyweightSquatsDesc' },

  // === MARTIAL ARTS ===
  // Boxing
  { id: 'shadow-boxing', type: 'martial-arts', martialArtsCategory: 'boxing', nameKey: 'exercises.shadowBoxing', descKey: 'exercises.shadowBoxingDesc' },
  { id: 'heavy-bag-rounds', type: 'martial-arts', martialArtsCategory: 'boxing', nameKey: 'exercises.heavyBagRounds', descKey: 'exercises.heavyBagRoundsDesc' },
  { id: 'pad-work', type: 'martial-arts', martialArtsCategory: 'boxing', nameKey: 'exercises.padWork', descKey: 'exercises.padWorkDesc' },
  { id: 'speed-bag', type: 'martial-arts', martialArtsCategory: 'boxing', nameKey: 'exercises.speedBag', descKey: 'exercises.speedBagDesc' },
  { id: 'slip-and-roll', type: 'martial-arts', martialArtsCategory: 'boxing', nameKey: 'exercises.slipAndRoll', descKey: 'exercises.slipAndRollDesc' },

  // Kickboxing
  { id: 'kick-combos', type: 'martial-arts', martialArtsCategory: 'kickboxing', nameKey: 'exercises.kickCombos', descKey: 'exercises.kickCombosDesc' },
  { id: 'roundhouse-kick-drill', type: 'martial-arts', martialArtsCategory: 'kickboxing', nameKey: 'exercises.roundhouseKickDrill', descKey: 'exercises.roundhouseKickDrillDesc' },
  { id: 'thai-clinch', type: 'martial-arts', martialArtsCategory: 'kickboxing', nameKey: 'exercises.thaiClinch', descKey: 'exercises.thaiClinchDesc' },
  { id: 'low-kick-drill', type: 'martial-arts', martialArtsCategory: 'kickboxing', nameKey: 'exercises.lowKickDrill', descKey: 'exercises.lowKickDrillDesc' },

  // MMA
  { id: 'ground-and-pound', type: 'martial-arts', martialArtsCategory: 'mma', nameKey: 'exercises.groundAndPound', descKey: 'exercises.groundAndPoundDesc' },
  { id: 'takedown-drill', type: 'martial-arts', martialArtsCategory: 'mma', nameKey: 'exercises.takedownDrill', descKey: 'exercises.takedownDrillDesc' },
  { id: 'sprawl-drill', type: 'martial-arts', martialArtsCategory: 'mma', nameKey: 'exercises.sprawlDrill', descKey: 'exercises.sprawlDrillDesc' },
  { id: 'cage-work', type: 'martial-arts', martialArtsCategory: 'mma', nameKey: 'exercises.cageWork', descKey: 'exercises.cageWorkDesc' },

  // Karate
  { id: 'kata-practice', type: 'martial-arts', martialArtsCategory: 'karate', nameKey: 'exercises.kataPractice', descKey: 'exercises.kataPracticeDesc' },
  { id: 'kihon-basics', type: 'martial-arts', martialArtsCategory: 'karate', nameKey: 'exercises.kihonBasics', descKey: 'exercises.kihonBasicsDesc' },
  { id: 'kumite-sparring', type: 'martial-arts', martialArtsCategory: 'karate', nameKey: 'exercises.kumiteSparring', descKey: 'exercises.kumiteSparringDesc' },
  { id: 'makiwara-training', type: 'martial-arts', martialArtsCategory: 'karate', nameKey: 'exercises.makiwaraTraining', descKey: 'exercises.makiwaraTrainingDesc' },
];

export default exercises;

export function getExercisesByMuscle(muscleGroup) {
  return exercises.filter((e) => e.muscleGroup === muscleGroup);
}

export function getExercisesByType(type) {
  return exercises.filter((e) => (e.type || 'strength') === type);
}

export function getExerciseById(id) {
  return exercises.find((e) => e.id === id);
}
