export const muscleGroups = [
  'chest', 'back', 'shoulders', 'biceps', 'triceps',
  'legs', 'glutes', 'abs', 'calves', 'forearms',
];

const exercises = [
  // Chest
  { id: 'bench-press', muscleGroup: 'chest', equipment: 'barbell', nameKey: 'exercises.benchPress', descKey: 'exercises.benchPressDesc' },
  { id: 'incline-bench-press', muscleGroup: 'chest', equipment: 'barbell', nameKey: 'exercises.inclineBenchPress', descKey: 'exercises.inclineBenchPressDesc' },
  { id: 'dumbbell-flyes', muscleGroup: 'chest', equipment: 'dumbbell', nameKey: 'exercises.dumbbellFlyes', descKey: 'exercises.dumbbellFlyesDesc' },
  { id: 'cable-crossover', muscleGroup: 'chest', equipment: 'cable', nameKey: 'exercises.cableCrossover', descKey: 'exercises.cableCrossoverDesc' },
  { id: 'chest-dips', muscleGroup: 'chest', equipment: 'bodyweight', nameKey: 'exercises.chestDips', descKey: 'exercises.chestDipsDesc' },
  { id: 'chest-press-machine', muscleGroup: 'chest', equipment: 'machine', nameKey: 'exercises.chestPressMachine', descKey: 'exercises.chestPressMachineDesc' },

  // Back
  { id: 'deadlift', muscleGroup: 'back', equipment: 'barbell', nameKey: 'exercises.deadlift', descKey: 'exercises.deadliftDesc' },
  { id: 'pull-ups', muscleGroup: 'back', equipment: 'bodyweight', nameKey: 'exercises.pullUps', descKey: 'exercises.pullUpsDesc' },
  { id: 'barbell-row', muscleGroup: 'back', equipment: 'barbell', nameKey: 'exercises.barbellRow', descKey: 'exercises.barbellRowDesc' },
  { id: 'lat-pulldown', muscleGroup: 'back', equipment: 'cable', nameKey: 'exercises.latPulldown', descKey: 'exercises.latPulldownDesc' },
  { id: 'seated-cable-row', muscleGroup: 'back', equipment: 'cable', nameKey: 'exercises.seatedCableRow', descKey: 'exercises.seatedCableRowDesc' },
  { id: 'dumbbell-row', muscleGroup: 'back', equipment: 'dumbbell', nameKey: 'exercises.dumbbellRow', descKey: 'exercises.dumbbellRowDesc' },

  // Shoulders
  { id: 'overhead-press', muscleGroup: 'shoulders', equipment: 'barbell', nameKey: 'exercises.overheadPress', descKey: 'exercises.overheadPressDesc' },
  { id: 'lateral-raise', muscleGroup: 'shoulders', equipment: 'dumbbell', nameKey: 'exercises.lateralRaise', descKey: 'exercises.lateralRaiseDesc' },
  { id: 'face-pull', muscleGroup: 'shoulders', equipment: 'cable', nameKey: 'exercises.facePull', descKey: 'exercises.facePullDesc' },
  { id: 'front-raise', muscleGroup: 'shoulders', equipment: 'dumbbell', nameKey: 'exercises.frontRaise', descKey: 'exercises.frontRaiseDesc' },
  { id: 'reverse-flyes', muscleGroup: 'shoulders', equipment: 'dumbbell', nameKey: 'exercises.reverseFlyes', descKey: 'exercises.reverseFlyesDesc' },

  // Biceps
  { id: 'barbell-curl', muscleGroup: 'biceps', equipment: 'barbell', nameKey: 'exercises.barbellCurl', descKey: 'exercises.barbellCurlDesc' },
  { id: 'dumbbell-curl', muscleGroup: 'biceps', equipment: 'dumbbell', nameKey: 'exercises.dumbbellCurl', descKey: 'exercises.dumbbellCurlDesc' },
  { id: 'hammer-curl', muscleGroup: 'biceps', equipment: 'dumbbell', nameKey: 'exercises.hammerCurl', descKey: 'exercises.hammerCurlDesc' },
  { id: 'preacher-curl', muscleGroup: 'biceps', equipment: 'machine', nameKey: 'exercises.preacherCurl', descKey: 'exercises.preacherCurlDesc' },

  // Triceps
  { id: 'tricep-pushdown', muscleGroup: 'triceps', equipment: 'cable', nameKey: 'exercises.tricepPushdown', descKey: 'exercises.tricepPushdownDesc' },
  { id: 'skull-crushers', muscleGroup: 'triceps', equipment: 'barbell', nameKey: 'exercises.skullCrushers', descKey: 'exercises.skullCrushersDesc' },
  { id: 'overhead-tricep-extension', muscleGroup: 'triceps', equipment: 'dumbbell', nameKey: 'exercises.overheadTricepExtension', descKey: 'exercises.overheadTricepExtensionDesc' },
  { id: 'tricep-dips', muscleGroup: 'triceps', equipment: 'bodyweight', nameKey: 'exercises.tricepDips', descKey: 'exercises.tricepDipsDesc' },

  // Legs
  { id: 'squat', muscleGroup: 'legs', equipment: 'barbell', nameKey: 'exercises.squat', descKey: 'exercises.squatDesc' },
  { id: 'leg-press', muscleGroup: 'legs', equipment: 'machine', nameKey: 'exercises.legPress', descKey: 'exercises.legPressDesc' },
  { id: 'leg-extension', muscleGroup: 'legs', equipment: 'machine', nameKey: 'exercises.legExtension', descKey: 'exercises.legExtensionDesc' },
  { id: 'leg-curl', muscleGroup: 'legs', equipment: 'machine', nameKey: 'exercises.legCurl', descKey: 'exercises.legCurlDesc' },
  { id: 'lunges', muscleGroup: 'legs', equipment: 'dumbbell', nameKey: 'exercises.lunges', descKey: 'exercises.lungesDesc' },
  { id: 'romanian-deadlift', muscleGroup: 'legs', equipment: 'barbell', nameKey: 'exercises.romanianDeadlift', descKey: 'exercises.romanianDeadliftDesc' },

  // Glutes
  { id: 'hip-thrust', muscleGroup: 'glutes', equipment: 'barbell', nameKey: 'exercises.hipThrust', descKey: 'exercises.hipThrustDesc' },
  { id: 'cable-kickback', muscleGroup: 'glutes', equipment: 'cable', nameKey: 'exercises.cableKickback', descKey: 'exercises.cableKickbackDesc' },
  { id: 'glute-bridge', muscleGroup: 'glutes', equipment: 'bodyweight', nameKey: 'exercises.gluteBridge', descKey: 'exercises.gluteBridgeDesc' },

  // Abs
  { id: 'crunches', muscleGroup: 'abs', equipment: 'bodyweight', nameKey: 'exercises.crunches', descKey: 'exercises.crunchesDesc' },
  { id: 'hanging-leg-raise', muscleGroup: 'abs', equipment: 'bodyweight', nameKey: 'exercises.hangingLegRaise', descKey: 'exercises.hangingLegRaiseDesc' },
  { id: 'cable-crunch', muscleGroup: 'abs', equipment: 'cable', nameKey: 'exercises.cableCrunch', descKey: 'exercises.cableCrunchDesc' },
  { id: 'plank', muscleGroup: 'abs', equipment: 'bodyweight', nameKey: 'exercises.plank', descKey: 'exercises.plankDesc' },

  // Calves
  { id: 'calf-raise-standing', muscleGroup: 'calves', equipment: 'machine', nameKey: 'exercises.calfRaiseStanding', descKey: 'exercises.calfRaiseStandingDesc' },
  { id: 'calf-raise-seated', muscleGroup: 'calves', equipment: 'machine', nameKey: 'exercises.calfRaiseSeated', descKey: 'exercises.calfRaiseSeatedDesc' },

  // Forearms
  { id: 'wrist-curl', muscleGroup: 'forearms', equipment: 'dumbbell', nameKey: 'exercises.wristCurl', descKey: 'exercises.wristCurlDesc' },
  { id: 'reverse-wrist-curl', muscleGroup: 'forearms', equipment: 'dumbbell', nameKey: 'exercises.reverseWristCurl', descKey: 'exercises.reverseWristCurlDesc' },
];

export default exercises;

export function getExercisesByMuscle(muscleGroup) {
  return exercises.filter((e) => e.muscleGroup === muscleGroup);
}

export function getExerciseById(id) {
  return exercises.find((e) => e.id === id);
}
