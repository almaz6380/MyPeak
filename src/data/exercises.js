export const muscleGroups = [
  'chest', 'back', 'shoulders', 'biceps', 'triceps',
  'legs', 'glutes', 'abs', 'calves', 'forearms',
];

export const trainingTypes = ['strength', 'cardio', 'hiit', 'circuit', 'martial-arts'];

export const martialArtsCategories = ['boxing', 'kickboxing', 'mma'];

const exercises = [
  // === STRENGTH ===

  // Chest
  { id: 'bench-press', type: 'strength', muscleGroup: 'chest', equipment: 'barbell', nameKey: 'exercises.benchPress', descKey: 'exercises.benchPressDesc' },
  { id: 'incline-bench-press', type: 'strength', muscleGroup: 'chest', equipment: 'barbell', nameKey: 'exercises.inclineBenchPress', descKey: 'exercises.inclineBenchPressDesc' },
  { id: 'dumbbell-flyes', type: 'strength', muscleGroup: 'chest', equipment: 'dumbbell', nameKey: 'exercises.dumbbellFlyes', descKey: 'exercises.dumbbellFlyesDesc' },
  { id: 'cable-crossover', type: 'strength', muscleGroup: 'chest', equipment: 'cable', nameKey: 'exercises.cableCrossover', descKey: 'exercises.cableCrossoverDesc' },
  { id: 'chest-dips', type: 'strength', muscleGroup: 'chest', equipment: 'bodyweight', nameKey: 'exercises.chestDips', descKey: 'exercises.chestDipsDesc' },
  { id: 'chest-press-machine', type: 'strength', muscleGroup: 'chest', equipment: 'machine', nameKey: 'exercises.chestPressMachine', descKey: 'exercises.chestPressMachineDesc' },
  { id: 'decline-bench-press', type: 'strength', muscleGroup: 'chest', equipment: 'barbell', nameKey: 'exercises.declineBenchPress', descKey: 'exercises.declineBenchPressDesc' },
  { id: 'incline-dumbbell-press', type: 'strength', muscleGroup: 'chest', equipment: 'dumbbell', nameKey: 'exercises.inclineDumbbellPress', descKey: 'exercises.inclineDumbbellPressDesc' },
  { id: 'flat-dumbbell-press', type: 'strength', muscleGroup: 'chest', equipment: 'dumbbell', nameKey: 'exercises.flatDumbbellPress', descKey: 'exercises.flatDumbbellPressDesc' },
  { id: 'decline-dumbbell-press', type: 'strength', muscleGroup: 'chest', equipment: 'dumbbell', nameKey: 'exercises.declineDumbbellPress', descKey: 'exercises.declineDumbbellPressDesc' },
  { id: 'incline-dumbbell-flyes', type: 'strength', muscleGroup: 'chest', equipment: 'dumbbell', nameKey: 'exercises.inclineDumbbellFlyes', descKey: 'exercises.inclineDumbbellFlyesDesc' },
  { id: 'cable-flyes-low', type: 'strength', muscleGroup: 'chest', equipment: 'cable', nameKey: 'exercises.cableFlyesLow', descKey: 'exercises.cableFlyesLowDesc' },
  { id: 'cable-flyes-high', type: 'strength', muscleGroup: 'chest', equipment: 'cable', nameKey: 'exercises.cableFlyesHigh', descKey: 'exercises.cableFlyesHighDesc' },
  { id: 'pec-deck', type: 'strength', muscleGroup: 'chest', equipment: 'machine', nameKey: 'exercises.pecDeck', descKey: 'exercises.pecDeckDesc' },
  { id: 'smith-machine-bench', type: 'strength', muscleGroup: 'chest', equipment: 'machine', nameKey: 'exercises.smithMachineBench', descKey: 'exercises.smithMachineBenchDesc' },
  { id: 'smith-machine-incline', type: 'strength', muscleGroup: 'chest', equipment: 'machine', nameKey: 'exercises.smithMachineIncline', descKey: 'exercises.smithMachineInclineDesc' },
  { id: 'landmine-press', type: 'strength', muscleGroup: 'chest', equipment: 'barbell', nameKey: 'exercises.landminePress', descKey: 'exercises.landminePressDesc' },
  { id: 'push-up-wide', type: 'strength', muscleGroup: 'chest', equipment: 'bodyweight', nameKey: 'exercises.pushUpWide', descKey: 'exercises.pushUpWideDesc' },
  { id: 'push-up-diamond', type: 'strength', muscleGroup: 'chest', equipment: 'bodyweight', nameKey: 'exercises.pushUpDiamond', descKey: 'exercises.pushUpDiamondDesc' },
  { id: 'push-up-decline', type: 'strength', muscleGroup: 'chest', equipment: 'bodyweight', nameKey: 'exercises.pushUpDecline', descKey: 'exercises.pushUpDeclineDesc' },
  { id: 'push-up-incline', type: 'strength', muscleGroup: 'chest', equipment: 'bodyweight', nameKey: 'exercises.pushUpIncline', descKey: 'exercises.pushUpInclineDesc' },
  { id: 'svend-press', type: 'strength', muscleGroup: 'chest', equipment: 'dumbbell', nameKey: 'exercises.svendPress', descKey: 'exercises.svendPressDesc' },
  { id: 'chest-squeeze-press', type: 'strength', muscleGroup: 'chest', equipment: 'dumbbell', nameKey: 'exercises.chestSqueezePress', descKey: 'exercises.chestSqueezePressDesc' },
  { id: 'single-arm-cable-press', type: 'strength', muscleGroup: 'chest', equipment: 'cable', nameKey: 'exercises.singleArmCablePress', descKey: 'exercises.singleArmCablePressDesc' },
  { id: 'around-the-world', type: 'strength', muscleGroup: 'chest', equipment: 'dumbbell', nameKey: 'exercises.aroundTheWorld', descKey: 'exercises.aroundTheWorldDesc' },
  { id: 'plate-press', type: 'strength', muscleGroup: 'chest', equipment: 'bodyweight', nameKey: 'exercises.platePress', descKey: 'exercises.platePressDesc' },
  { id: 'guillotine-press', type: 'strength', muscleGroup: 'chest', equipment: 'barbell', nameKey: 'exercises.guillotinePress', descKey: 'exercises.guillotinePressDesc' },
  { id: 'hex-press', type: 'strength', muscleGroup: 'chest', equipment: 'dumbbell', nameKey: 'exercises.hexPress', descKey: 'exercises.hexPressDesc' },
  { id: 'machine-chest-fly', type: 'strength', muscleGroup: 'chest', equipment: 'machine', nameKey: 'exercises.machineChestFly', descKey: 'exercises.machineChestFlyDesc' },
  { id: 'resistance-band-chest-press', type: 'strength', muscleGroup: 'chest', equipment: 'bodyweight', nameKey: 'exercises.resistanceBandChestPress', descKey: 'exercises.resistanceBandChestPressDesc' },

  // Back
  { id: 'deadlift', type: 'strength', muscleGroup: 'back', equipment: 'barbell', nameKey: 'exercises.deadlift', descKey: 'exercises.deadliftDesc' },
  { id: 'pull-ups', type: 'strength', muscleGroup: 'back', equipment: 'bodyweight', nameKey: 'exercises.pullUps', descKey: 'exercises.pullUpsDesc' },
  { id: 'barbell-row', type: 'strength', muscleGroup: 'back', equipment: 'barbell', nameKey: 'exercises.barbellRow', descKey: 'exercises.barbellRowDesc' },
  { id: 'lat-pulldown', type: 'strength', muscleGroup: 'back', equipment: 'cable', nameKey: 'exercises.latPulldown', descKey: 'exercises.latPulldownDesc' },
  { id: 'seated-cable-row', type: 'strength', muscleGroup: 'back', equipment: 'cable', nameKey: 'exercises.seatedCableRow', descKey: 'exercises.seatedCableRowDesc' },
  { id: 'dumbbell-row', type: 'strength', muscleGroup: 'back', equipment: 'dumbbell', nameKey: 'exercises.dumbbellRow', descKey: 'exercises.dumbbellRowDesc' },
  { id: 't-bar-row', type: 'strength', muscleGroup: 'back', equipment: 'barbell', nameKey: 'exercises.tBarRow', descKey: 'exercises.tBarRowDesc' },
  { id: 'pendlay-row', type: 'strength', muscleGroup: 'back', equipment: 'barbell', nameKey: 'exercises.pendlayRow', descKey: 'exercises.pendlayRowDesc' },
  { id: 'meadows-row', type: 'strength', muscleGroup: 'back', equipment: 'barbell', nameKey: 'exercises.meadowsRow', descKey: 'exercises.meadowsRowDesc' },
  { id: 'chest-supported-row', type: 'strength', muscleGroup: 'back', equipment: 'dumbbell', nameKey: 'exercises.chestSupportedRow', descKey: 'exercises.chestSupportedRowDesc' },
  { id: 'single-arm-cable-row', type: 'strength', muscleGroup: 'back', equipment: 'cable', nameKey: 'exercises.singleArmCableRow', descKey: 'exercises.singleArmCableRowDesc' },
  { id: 'wide-grip-pulldown', type: 'strength', muscleGroup: 'back', equipment: 'cable', nameKey: 'exercises.wideGripPulldown', descKey: 'exercises.wideGripPulldownDesc' },
  { id: 'close-grip-pulldown', type: 'strength', muscleGroup: 'back', equipment: 'cable', nameKey: 'exercises.closeGripPulldown', descKey: 'exercises.closeGripPulldownDesc' },
  { id: 'reverse-grip-pulldown', type: 'strength', muscleGroup: 'back', equipment: 'cable', nameKey: 'exercises.reverseGripPulldown', descKey: 'exercises.reverseGripPulldownDesc' },
  { id: 'straight-arm-pulldown', type: 'strength', muscleGroup: 'back', equipment: 'cable', nameKey: 'exercises.straightArmPulldown', descKey: 'exercises.straightArmPulldownDesc' },
  { id: 'cable-pullover', type: 'strength', muscleGroup: 'back', equipment: 'cable', nameKey: 'exercises.cablePullover', descKey: 'exercises.cablePulloverDesc' },
  { id: 'machine-row', type: 'strength', muscleGroup: 'back', equipment: 'machine', nameKey: 'exercises.machineRow', descKey: 'exercises.machineRowDesc' },
  { id: 'smith-machine-row', type: 'strength', muscleGroup: 'back', equipment: 'machine', nameKey: 'exercises.smithMachineRow', descKey: 'exercises.smithMachineRowDesc' },
  { id: 'rack-pull', type: 'strength', muscleGroup: 'back', equipment: 'barbell', nameKey: 'exercises.rackPull', descKey: 'exercises.rackPullDesc' },
  { id: 'good-morning', type: 'strength', muscleGroup: 'back', equipment: 'barbell', nameKey: 'exercises.goodMorning', descKey: 'exercises.goodMorningDesc' },
  { id: 'hyperextension', type: 'strength', muscleGroup: 'back', equipment: 'bodyweight', nameKey: 'exercises.hyperextension', descKey: 'exercises.hyperextensionDesc' },
  { id: 'reverse-hyperextension', type: 'strength', muscleGroup: 'back', equipment: 'bodyweight', nameKey: 'exercises.reverseHyperextension', descKey: 'exercises.reverseHyperextensionDesc' },
  { id: 'chin-ups', type: 'strength', muscleGroup: 'back', equipment: 'bodyweight', nameKey: 'exercises.chinUps', descKey: 'exercises.chinUpsDesc' },
  { id: 'inverted-row', type: 'strength', muscleGroup: 'back', equipment: 'bodyweight', nameKey: 'exercises.invertedRow', descKey: 'exercises.invertedRowDesc' },
  { id: 'seal-row', type: 'strength', muscleGroup: 'back', equipment: 'dumbbell', nameKey: 'exercises.sealRow', descKey: 'exercises.sealRowDesc' },
  { id: 'kroc-row', type: 'strength', muscleGroup: 'back', equipment: 'dumbbell', nameKey: 'exercises.krocRow', descKey: 'exercises.krocRowDesc' },
  { id: 'helms-row', type: 'strength', muscleGroup: 'back', equipment: 'dumbbell', nameKey: 'exercises.helmsRow', descKey: 'exercises.helmsRowDesc' },
  { id: 'snatch-grip-deadlift', type: 'strength', muscleGroup: 'back', equipment: 'barbell', nameKey: 'exercises.snatchGripDeadlift', descKey: 'exercises.snatchGripDeadliftDesc' },
  { id: 'deficit-deadlift', type: 'strength', muscleGroup: 'back', equipment: 'barbell', nameKey: 'exercises.deficitDeadlift', descKey: 'exercises.deficitDeadliftDesc' },
  { id: 'sumo-deadlift', type: 'strength', muscleGroup: 'back', equipment: 'barbell', nameKey: 'exercises.sumoDeadlift', descKey: 'exercises.sumoDeadliftDesc' },

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

  // Judo
  { id: 'uchikomi-drill', type: 'martial-arts', martialArtsCategory: 'judo', nameKey: 'exercises.uchikomiDrill', descKey: 'exercises.uchikomiDrillDesc' },
  { id: 'nagekomi', type: 'martial-arts', martialArtsCategory: 'judo', nameKey: 'exercises.nagekomi', descKey: 'exercises.nagekomiDesc' },
  { id: 'newaza-drill', type: 'martial-arts', martialArtsCategory: 'judo', nameKey: 'exercises.newazaDrill', descKey: 'exercises.newazaDrillDesc' },
  { id: 'randori', type: 'martial-arts', martialArtsCategory: 'judo', nameKey: 'exercises.randori', descKey: 'exercises.randoriDesc' },

  // BJJ (Brazilian Jiu-Jitsu)
  { id: 'guard-passing', type: 'martial-arts', martialArtsCategory: 'bjj', nameKey: 'exercises.guardPassing', descKey: 'exercises.guardPassingDesc' },
  { id: 'sweep-drill', type: 'martial-arts', martialArtsCategory: 'bjj', nameKey: 'exercises.sweepDrill', descKey: 'exercises.sweepDrillDesc' },
  { id: 'submission-flow', type: 'martial-arts', martialArtsCategory: 'bjj', nameKey: 'exercises.submissionFlow', descKey: 'exercises.submissionFlowDesc' },
  { id: 'bjj-rolling', type: 'martial-arts', martialArtsCategory: 'bjj', nameKey: 'exercises.bjjRolling', descKey: 'exercises.bjjRollingDesc' },

  // Taekwondo
  { id: 'poomsae', type: 'martial-arts', martialArtsCategory: 'taekwondo', nameKey: 'exercises.poomsae', descKey: 'exercises.poomsaeDesc' },
  { id: 'turning-kick-drill', type: 'martial-arts', martialArtsCategory: 'taekwondo', nameKey: 'exercises.turningKickDrill', descKey: 'exercises.turningKickDrillDesc' },
  { id: 'sparring-tkd', type: 'martial-arts', martialArtsCategory: 'taekwondo', nameKey: 'exercises.sparringTkd', descKey: 'exercises.sparringTkdDesc' },
  { id: 'board-breaking', type: 'martial-arts', martialArtsCategory: 'taekwondo', nameKey: 'exercises.boardBreaking', descKey: 'exercises.boardBreakingDesc' },

  // Wrestling
  { id: 'single-leg-drill', type: 'martial-arts', martialArtsCategory: 'wrestling', nameKey: 'exercises.singleLegDrill', descKey: 'exercises.singleLegDrillDesc' },
  { id: 'double-leg-drill', type: 'martial-arts', martialArtsCategory: 'wrestling', nameKey: 'exercises.doubleLegDrill', descKey: 'exercises.doubleLegDrillDesc' },
  { id: 'wrestling-conditioning', type: 'martial-arts', martialArtsCategory: 'wrestling', nameKey: 'exercises.wrestlingConditioning', descKey: 'exercises.wrestlingConditioningDesc' },
  { id: 'mat-returns', type: 'martial-arts', martialArtsCategory: 'wrestling', nameKey: 'exercises.matReturns', descKey: 'exercises.matReturnsDesc' },
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
