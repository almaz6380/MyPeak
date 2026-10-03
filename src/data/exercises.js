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
  { id: 'high-row', type: 'strength', muscleGroup: 'back', equipment: 'machine', nameKey: 'exercises.highRow', descKey: 'exercises.highRowDesc' },
  { id: 'm-torture-2-way-row', type: 'strength', muscleGroup: 'back', equipment: 'machine', nameKey: 'exercises.mTorture2WayRow', descKey: 'exercises.mTorture2WayRowDesc' },

  // Shoulders
  { id: 'overhead-press', type: 'strength', muscleGroup: 'shoulders', equipment: 'barbell', nameKey: 'exercises.overheadPress', descKey: 'exercises.overheadPressDesc' },
  { id: 'lateral-raise', type: 'strength', muscleGroup: 'shoulders', equipment: 'dumbbell', nameKey: 'exercises.lateralRaise', descKey: 'exercises.lateralRaiseDesc' },
  { id: 'face-pull', type: 'strength', muscleGroup: 'shoulders', equipment: 'cable', nameKey: 'exercises.facePull', descKey: 'exercises.facePullDesc' },
  { id: 'front-raise', type: 'strength', muscleGroup: 'shoulders', equipment: 'dumbbell', nameKey: 'exercises.frontRaise', descKey: 'exercises.frontRaiseDesc' },
  { id: 'reverse-flyes', type: 'strength', muscleGroup: 'shoulders', equipment: 'dumbbell', nameKey: 'exercises.reverseFlyes', descKey: 'exercises.reverseFlyesDesc' },
  { id: 'arnold-press', type: 'strength', muscleGroup: 'shoulders', equipment: 'dumbbell', nameKey: 'exercises.arnoldPress', descKey: 'exercises.arnoldPressDesc' },
  { id: 'dumbbell-lateral-raise-seated', type: 'strength', muscleGroup: 'shoulders', equipment: 'dumbbell', nameKey: 'exercises.dumbbellLateralRaiseSeated', descKey: 'exercises.dumbbellLateralRaiseSeatedDesc' },
  { id: 'cable-lateral-raise', type: 'strength', muscleGroup: 'shoulders', equipment: 'cable', nameKey: 'exercises.cableLateralRaise', descKey: 'exercises.cableLateralRaiseDesc' },
  { id: 'dumbbell-front-raise-alternating', type: 'strength', muscleGroup: 'shoulders', equipment: 'dumbbell', nameKey: 'exercises.dumbbellFrontRaiseAlternating', descKey: 'exercises.dumbbellFrontRaiseAlternatingDesc' },
  { id: 'barbell-front-raise', type: 'strength', muscleGroup: 'shoulders', equipment: 'barbell', nameKey: 'exercises.barbellFrontRaise', descKey: 'exercises.barbellFrontRaiseDesc' },
  { id: 'cable-front-raise', type: 'strength', muscleGroup: 'shoulders', equipment: 'cable', nameKey: 'exercises.cableFrontRaise', descKey: 'exercises.cableFrontRaiseDesc' },
  { id: 'rear-delt-fly-machine', type: 'strength', muscleGroup: 'shoulders', equipment: 'machine', nameKey: 'exercises.rearDeltFlyMachine', descKey: 'exercises.rearDeltFlyMachineDesc' },
  { id: 'rear-delt-cable-fly', type: 'strength', muscleGroup: 'shoulders', equipment: 'cable', nameKey: 'exercises.rearDeltCableFly', descKey: 'exercises.rearDeltCableFlyDesc' },
  { id: 'dumbbell-shoulder-press-seated', type: 'strength', muscleGroup: 'shoulders', equipment: 'dumbbell', nameKey: 'exercises.dumbbellShoulderPressSeated', descKey: 'exercises.dumbbellShoulderPressSeatedDesc' },
  { id: 'smith-machine-shoulder-press', type: 'strength', muscleGroup: 'shoulders', equipment: 'machine', nameKey: 'exercises.smithMachineShoulderPress', descKey: 'exercises.smithMachineShoulderPressDesc' },
  { id: 'behind-neck-press', type: 'strength', muscleGroup: 'shoulders', equipment: 'barbell', nameKey: 'exercises.behindNeckPress', descKey: 'exercises.behindNeckPressDesc' },
  { id: 'bradford-press', type: 'strength', muscleGroup: 'shoulders', equipment: 'barbell', nameKey: 'exercises.bradfordPress', descKey: 'exercises.bradfordPressDesc' },
  { id: 'landmine-lateral-raise', type: 'strength', muscleGroup: 'shoulders', equipment: 'barbell', nameKey: 'exercises.landmineLateralRaise', descKey: 'exercises.landmineLateralRaiseDesc' },
  { id: 'upright-row', type: 'strength', muscleGroup: 'shoulders', equipment: 'barbell', nameKey: 'exercises.uprightRow', descKey: 'exercises.uprightRowDesc' },
  { id: 'cable-upright-row', type: 'strength', muscleGroup: 'shoulders', equipment: 'cable', nameKey: 'exercises.cableUprightRow', descKey: 'exercises.cableUprightRowDesc' },
  { id: 'dumbbell-shrugs', type: 'strength', muscleGroup: 'shoulders', equipment: 'dumbbell', nameKey: 'exercises.dumbbellShrugs', descKey: 'exercises.dumbbellShrugsDesc' },
  { id: 'barbell-shrugs', type: 'strength', muscleGroup: 'shoulders', equipment: 'barbell', nameKey: 'exercises.barbellShrugs', descKey: 'exercises.barbellShrugsDesc' },
  { id: 'lu-raises', type: 'strength', muscleGroup: 'shoulders', equipment: 'dumbbell', nameKey: 'exercises.luRaises', descKey: 'exercises.luRaisesDesc' },
  { id: 'plate-front-raise', type: 'strength', muscleGroup: 'shoulders', equipment: 'bodyweight', nameKey: 'exercises.plateFrontRaise', descKey: 'exercises.plateFrontRaiseDesc' },
  { id: 'band-pull-apart', type: 'strength', muscleGroup: 'shoulders', equipment: 'bodyweight', nameKey: 'exercises.bandPullApart', descKey: 'exercises.bandPullApartDesc' },
  { id: 'machine-lateral-raise', type: 'strength', muscleGroup: 'shoulders', equipment: 'machine', nameKey: 'exercises.machineLateralRaise', descKey: 'exercises.machineLateralRaiseDesc' },
  { id: 'dumbbell-y-raise', type: 'strength', muscleGroup: 'shoulders', equipment: 'dumbbell', nameKey: 'exercises.dumbbellYRaise', descKey: 'exercises.dumbbellYRaiseDesc' },

  // Biceps
  { id: 'barbell-curl', type: 'strength', muscleGroup: 'biceps', equipment: 'barbell', nameKey: 'exercises.barbellCurl', descKey: 'exercises.barbellCurlDesc' },
  { id: 'dumbbell-curl', type: 'strength', muscleGroup: 'biceps', equipment: 'dumbbell', nameKey: 'exercises.dumbbellCurl', descKey: 'exercises.dumbbellCurlDesc' },
  { id: 'hammer-curl', type: 'strength', muscleGroup: 'biceps', equipment: 'dumbbell', nameKey: 'exercises.hammerCurl', descKey: 'exercises.hammerCurlDesc' },
  { id: 'preacher-curl', type: 'strength', muscleGroup: 'biceps', equipment: 'machine', nameKey: 'exercises.preacherCurl', descKey: 'exercises.preacherCurlDesc' },
  { id: 'incline-dumbbell-curl', type: 'strength', muscleGroup: 'biceps', equipment: 'dumbbell', nameKey: 'exercises.inclineDumbbellCurl', descKey: 'exercises.inclineDumbbellCurlDesc' },
  { id: 'concentration-curl', type: 'strength', muscleGroup: 'biceps', equipment: 'dumbbell', nameKey: 'exercises.concentrationCurl', descKey: 'exercises.concentrationCurlDesc' },
  { id: 'spider-curl', type: 'strength', muscleGroup: 'biceps', equipment: 'dumbbell', nameKey: 'exercises.spiderCurl', descKey: 'exercises.spiderCurlDesc' },
  { id: 'cable-curl', type: 'strength', muscleGroup: 'biceps', equipment: 'cable', nameKey: 'exercises.cableCurl', descKey: 'exercises.cableCurlDesc' },
  { id: 'cable-hammer-curl', type: 'strength', muscleGroup: 'biceps', equipment: 'cable', nameKey: 'exercises.cableHammerCurl', descKey: 'exercises.cableHammerCurlDesc' },
  { id: 'ez-bar-curl', type: 'strength', muscleGroup: 'biceps', equipment: 'barbell', nameKey: 'exercises.ezBarCurl', descKey: 'exercises.ezBarCurlDesc' },
  { id: 'reverse-curl', type: 'strength', muscleGroup: 'biceps', equipment: 'barbell', nameKey: 'exercises.reverseCurl', descKey: 'exercises.reverseCurlDesc' },
  { id: 'drag-curl', type: 'strength', muscleGroup: 'biceps', equipment: 'barbell', nameKey: 'exercises.dragCurl', descKey: 'exercises.dragCurlDesc' },
  { id: 'bayesian-curl', type: 'strength', muscleGroup: 'biceps', equipment: 'cable', nameKey: 'exercises.bayesianCurl', descKey: 'exercises.bayesianCurlDesc' },
  { id: 'machine-curl', type: 'strength', muscleGroup: 'biceps', equipment: 'machine', nameKey: 'exercises.machineCurl', descKey: 'exercises.machineCurlDesc' },
  { id: 'chin-up-biceps', type: 'strength', muscleGroup: 'biceps', equipment: 'bodyweight', nameKey: 'exercises.chinUpBiceps', descKey: 'exercises.chinUpBicepsDesc' },
  { id: 'zottman-curl', type: 'strength', muscleGroup: 'biceps', equipment: 'dumbbell', nameKey: 'exercises.zottmanCurl', descKey: 'exercises.zottmanCurlDesc' },
  { id: 'cross-body-hammer-curl', type: 'strength', muscleGroup: 'biceps', equipment: 'dumbbell', nameKey: 'exercises.crossBodyHammerCurl', descKey: 'exercises.crossBodyHammerCurlDesc' },
  { id: 'waiter-curl', type: 'strength', muscleGroup: 'biceps', equipment: 'dumbbell', nameKey: 'exercises.waiterCurl', descKey: 'exercises.waiterCurlDesc' },
  { id: '21s-curl', type: 'strength', muscleGroup: 'biceps', equipment: 'barbell', nameKey: 'exercises.twentyOnesCurl', descKey: 'exercises.twentyOnesCurlDesc' },
  { id: 'cable-preacher-curl', type: 'strength', muscleGroup: 'biceps', equipment: 'cable', nameKey: 'exercises.cablePreacherCurl', descKey: 'exercises.cablePreacherCurlDesc' },
  { id: 'scott-curl-dumbbell', type: 'strength', muscleGroup: 'biceps', equipment: 'dumbbell', nameKey: 'exercises.scottCurlDumbbell', descKey: 'exercises.scottCurlDumbbellDesc' },

  // Triceps
  { id: 'tricep-pushdown', type: 'strength', muscleGroup: 'triceps', equipment: 'cable', nameKey: 'exercises.tricepPushdown', descKey: 'exercises.tricepPushdownDesc' },
  { id: 'skull-crushers', type: 'strength', muscleGroup: 'triceps', equipment: 'barbell', nameKey: 'exercises.skullCrushers', descKey: 'exercises.skullCrushersDesc' },
  { id: 'overhead-tricep-extension', type: 'strength', muscleGroup: 'triceps', equipment: 'dumbbell', nameKey: 'exercises.overheadTricepExtension', descKey: 'exercises.overheadTricepExtensionDesc' },
  { id: 'tricep-dips', type: 'strength', muscleGroup: 'triceps', equipment: 'bodyweight', nameKey: 'exercises.tricepDips', descKey: 'exercises.tricepDipsDesc' },
  { id: 'close-grip-bench-press', type: 'strength', muscleGroup: 'triceps', equipment: 'barbell', nameKey: 'exercises.closeGripBenchPress', descKey: 'exercises.closeGripBenchPressDesc' },
  { id: 'tricep-kickback', type: 'strength', muscleGroup: 'triceps', equipment: 'dumbbell', nameKey: 'exercises.tricepKickback', descKey: 'exercises.tricepKickbackDesc' },
  { id: 'diamond-push-up-triceps', type: 'strength', muscleGroup: 'triceps', equipment: 'bodyweight', nameKey: 'exercises.diamondPushUpTriceps', descKey: 'exercises.diamondPushUpTricepsDesc' },
  { id: 'cable-overhead-extension', type: 'strength', muscleGroup: 'triceps', equipment: 'cable', nameKey: 'exercises.cableOverheadExtension', descKey: 'exercises.cableOverheadExtensionDesc' },
  { id: 'single-arm-pushdown', type: 'strength', muscleGroup: 'triceps', equipment: 'cable', nameKey: 'exercises.singleArmPushdown', descKey: 'exercises.singleArmPushdownDesc' },
  { id: 'rope-pushdown', type: 'strength', muscleGroup: 'triceps', equipment: 'cable', nameKey: 'exercises.ropePushdown', descKey: 'exercises.ropePushdownDesc' },
  { id: 'v-bar-pushdown', type: 'strength', muscleGroup: 'triceps', equipment: 'cable', nameKey: 'exercises.vBarPushdown', descKey: 'exercises.vBarPushdownDesc' },
  { id: 'jm-press', type: 'strength', muscleGroup: 'triceps', equipment: 'barbell', nameKey: 'exercises.jmPress', descKey: 'exercises.jmPressDesc' },
  { id: 'french-press', type: 'strength', muscleGroup: 'triceps', equipment: 'barbell', nameKey: 'exercises.frenchPress', descKey: 'exercises.frenchPressDesc' },
  { id: 'dumbbell-tricep-press', type: 'strength', muscleGroup: 'triceps', equipment: 'dumbbell', nameKey: 'exercises.dumbbellTricepPress', descKey: 'exercises.dumbbellTricepPressDesc' },
  { id: 'bench-dips', type: 'strength', muscleGroup: 'triceps', equipment: 'bodyweight', nameKey: 'exercises.benchDips', descKey: 'exercises.benchDipsDesc' },
  { id: 'machine-tricep-extension', type: 'strength', muscleGroup: 'triceps', equipment: 'machine', nameKey: 'exercises.machineTricepExtension', descKey: 'exercises.machineTricepExtensionDesc' },
  { id: 'tate-press', type: 'strength', muscleGroup: 'triceps', equipment: 'dumbbell', nameKey: 'exercises.tatePress', descKey: 'exercises.tatePressDesc' },
  { id: 'bodyweight-tricep-extension', type: 'strength', muscleGroup: 'triceps', equipment: 'bodyweight', nameKey: 'exercises.bodyweightTricepExtension', descKey: 'exercises.bodyweightTricepExtensionDesc' },
  { id: 'cable-tricep-kickback', type: 'strength', muscleGroup: 'triceps', equipment: 'cable', nameKey: 'exercises.cableTricepKickback', descKey: 'exercises.cableTricepKickbackDesc' },
  { id: 'ez-bar-skull-crusher', type: 'strength', muscleGroup: 'triceps', equipment: 'barbell', nameKey: 'exercises.ezBarSkullCrusher', descKey: 'exercises.ezBarSkullCrusherDesc' },
  { id: 'dip-machine', type: 'strength', muscleGroup: 'triceps', equipment: 'machine', nameKey: 'exercises.dipMachine', descKey: 'exercises.dipMachineDesc' },

  // Legs
  { id: 'squat', type: 'strength', muscleGroup: 'legs', equipment: 'barbell', nameKey: 'exercises.squat', descKey: 'exercises.squatDesc' },
  { id: 'leg-press', type: 'strength', muscleGroup: 'legs', equipment: 'machine', nameKey: 'exercises.legPress', descKey: 'exercises.legPressDesc' },
  { id: 'leg-extension', type: 'strength', muscleGroup: 'legs', equipment: 'machine', nameKey: 'exercises.legExtension', descKey: 'exercises.legExtensionDesc' },
  { id: 'leg-curl', type: 'strength', muscleGroup: 'legs', equipment: 'machine', nameKey: 'exercises.legCurl', descKey: 'exercises.legCurlDesc' },
  { id: 'lunges', type: 'strength', muscleGroup: 'legs', equipment: 'dumbbell', nameKey: 'exercises.lunges', descKey: 'exercises.lungesDesc' },
  { id: 'hip-hinge', type: 'strength', muscleGroup: 'legs', equipment: 'dumbbell', nameKey: 'exercises.hipHinge', descKey: 'exercises.hipHingeDesc' },
  { id: 'romanian-deadlift', type: 'strength', muscleGroup: 'legs', equipment: 'barbell', nameKey: 'exercises.romanianDeadlift', descKey: 'exercises.romanianDeadliftDesc' },
  { id: 'hack-squat', type: 'strength', muscleGroup: 'legs', equipment: 'machine', nameKey: 'exercises.hackSquat', descKey: 'exercises.hackSquatDesc' },
  { id: 'pendulum-squat', type: 'strength', muscleGroup: 'legs', equipment: 'machine', nameKey: 'exercises.pendulumSquat', descKey: 'exercises.pendulumSquatDesc' },
  { id: 'bulgarian-split-squat', type: 'strength', muscleGroup: 'legs', equipment: 'dumbbell', nameKey: 'exercises.bulgarianSplitSquat', descKey: 'exercises.bulgarianSplitSquatDesc' },
  { id: 'goblet-squat', type: 'strength', muscleGroup: 'legs', equipment: 'dumbbell', nameKey: 'exercises.gobletSquat', descKey: 'exercises.gobletSquatDesc' },
  { id: 'front-squat', type: 'strength', muscleGroup: 'legs', equipment: 'barbell', nameKey: 'exercises.frontSquat', descKey: 'exercises.frontSquatDesc' },
  { id: 'safety-bar-squat', type: 'strength', muscleGroup: 'legs', equipment: 'barbell', nameKey: 'exercises.safetyBarSquat', descKey: 'exercises.safetyBarSquatDesc' },
  { id: 'sissy-squat', type: 'strength', muscleGroup: 'legs', equipment: 'bodyweight', nameKey: 'exercises.sissySquat', descKey: 'exercises.sissySquatDesc' },
  { id: 'pistol-squat', type: 'strength', muscleGroup: 'legs', equipment: 'bodyweight', nameKey: 'exercises.pistolSquat', descKey: 'exercises.pistolSquatDesc' },
  { id: 'smith-machine-squat', type: 'strength', muscleGroup: 'legs', equipment: 'machine', nameKey: 'exercises.smithMachineSquat', descKey: 'exercises.smithMachineSquatDesc' },
  { id: 'leg-press-narrow', type: 'strength', muscleGroup: 'legs', equipment: 'machine', nameKey: 'exercises.legPressNarrow', descKey: 'exercises.legPressNarrowDesc' },
  { id: 'leg-press-wide', type: 'strength', muscleGroup: 'legs', equipment: 'machine', nameKey: 'exercises.legPressWide', descKey: 'exercises.legPressWideDesc' },
  { id: 'walking-lunges', type: 'strength', muscleGroup: 'legs', equipment: 'dumbbell', nameKey: 'exercises.walkingLunges', descKey: 'exercises.walkingLungesDesc' },
  { id: 'reverse-lunges', type: 'strength', muscleGroup: 'legs', equipment: 'dumbbell', nameKey: 'exercises.reverseLunges', descKey: 'exercises.reverseLungesDesc' },
  { id: 'step-up-weighted', type: 'strength', muscleGroup: 'legs', equipment: 'dumbbell', nameKey: 'exercises.stepUpWeighted', descKey: 'exercises.stepUpWeightedDesc' },
  { id: 'hip-adductor', type: 'strength', muscleGroup: 'legs', equipment: 'machine', nameKey: 'exercises.hipAdductor', descKey: 'exercises.hipAdductorDesc' },
  { id: 'hip-abductor', type: 'strength', muscleGroup: 'legs', equipment: 'machine', nameKey: 'exercises.hipAbductor', descKey: 'exercises.hipAbductorDesc' },
  { id: 'nordic-hamstring-curl', type: 'strength', muscleGroup: 'legs', equipment: 'bodyweight', nameKey: 'exercises.nordicHamstringCurl', descKey: 'exercises.nordicHamstringCurlDesc' },
  { id: 'glute-ham-raise', type: 'strength', muscleGroup: 'legs', equipment: 'bodyweight', nameKey: 'exercises.gluteHamRaise', descKey: 'exercises.gluteHamRaiseDesc' },
  { id: 'stiff-leg-deadlift', type: 'strength', muscleGroup: 'legs', equipment: 'barbell', nameKey: 'exercises.stiffLegDeadlift', descKey: 'exercises.stiffLegDeadliftDesc' },
  { id: 'belt-squat', type: 'strength', muscleGroup: 'legs', equipment: 'machine', nameKey: 'exercises.beltSquat', descKey: 'exercises.beltSquatDesc' },
  { id: 'seated-leg-curl', type: 'strength', muscleGroup: 'legs', equipment: 'machine', nameKey: 'exercises.seatedLegCurl', descKey: 'exercises.seatedLegCurlDesc' },
  { id: 'lying-leg-curl', type: 'strength', muscleGroup: 'legs', equipment: 'machine', nameKey: 'exercises.lyingLegCurl', descKey: 'exercises.lyingLegCurlDesc' },
  { id: 'single-leg-press', type: 'strength', muscleGroup: 'legs', equipment: 'machine', nameKey: 'exercises.singleLegPress', descKey: 'exercises.singleLegPressDesc' },

  // Glutes
  { id: 'hip-thrust', type: 'strength', muscleGroup: 'glutes', equipment: 'barbell', nameKey: 'exercises.hipThrust', descKey: 'exercises.hipThrustDesc' },
  { id: 'cable-kickback', type: 'strength', muscleGroup: 'glutes', equipment: 'cable', nameKey: 'exercises.cableKickback', descKey: 'exercises.cableKickbackDesc' },
  { id: 'glute-bridge', type: 'strength', muscleGroup: 'glutes', equipment: 'bodyweight', nameKey: 'exercises.gluteBridge', descKey: 'exercises.gluteBridgeDesc' },
  { id: 'barbell-glute-bridge', type: 'strength', muscleGroup: 'glutes', equipment: 'barbell', nameKey: 'exercises.barbellGluteBridge', descKey: 'exercises.barbellGluteBridgeDesc' },
  { id: 'sumo-squat', type: 'strength', muscleGroup: 'glutes', equipment: 'dumbbell', nameKey: 'exercises.sumoSquat', descKey: 'exercises.sumoSquatDesc' },
  { id: 'cable-pull-through', type: 'strength', muscleGroup: 'glutes', equipment: 'cable', nameKey: 'exercises.cablePullThrough', descKey: 'exercises.cablePullThroughDesc' },
  { id: 'machine-hip-thrust', type: 'strength', muscleGroup: 'glutes', equipment: 'machine', nameKey: 'exercises.machineHipThrust', descKey: 'exercises.machineHipThrustDesc' },
  { id: 'donkey-kick', type: 'strength', muscleGroup: 'glutes', equipment: 'bodyweight', nameKey: 'exercises.donkeyKick', descKey: 'exercises.donkeyKickDesc' },

  // Abs
  { id: 'crunches', type: 'strength', muscleGroup: 'abs', equipment: 'bodyweight', nameKey: 'exercises.crunches', descKey: 'exercises.crunchesDesc' },
  { id: 'hanging-leg-raise', type: 'strength', muscleGroup: 'abs', equipment: 'bodyweight', nameKey: 'exercises.hangingLegRaise', descKey: 'exercises.hangingLegRaiseDesc' },
  { id: 'cable-crunch', type: 'strength', muscleGroup: 'abs', equipment: 'cable', nameKey: 'exercises.cableCrunch', descKey: 'exercises.cableCrunchDesc' },
  { id: 'plank', type: 'strength', muscleGroup: 'abs', equipment: 'bodyweight', nameKey: 'exercises.plank', descKey: 'exercises.plankDesc' },
  { id: 'russian-twist', type: 'strength', muscleGroup: 'abs', equipment: 'bodyweight', nameKey: 'exercises.russianTwist', descKey: 'exercises.russianTwistDesc' },
  { id: 'ab-wheel-rollout', type: 'strength', muscleGroup: 'abs', equipment: 'bodyweight', nameKey: 'exercises.abWheelRollout', descKey: 'exercises.abWheelRolloutDesc' },
  { id: 'bicycle-crunch', type: 'strength', muscleGroup: 'abs', equipment: 'bodyweight', nameKey: 'exercises.bicycleCrunch', descKey: 'exercises.bicycleCrunchDesc' },
  { id: 'leg-raise-lying', type: 'strength', muscleGroup: 'abs', equipment: 'bodyweight', nameKey: 'exercises.legRaiseLying', descKey: 'exercises.legRaiseLyingDesc' },
  { id: 'woodchop-cable', type: 'strength', muscleGroup: 'abs', equipment: 'cable', nameKey: 'exercises.woodchopCable', descKey: 'exercises.woodchopCableDesc' },
  { id: 'dead-bug', type: 'strength', muscleGroup: 'abs', equipment: 'bodyweight', nameKey: 'exercises.deadBug', descKey: 'exercises.deadBugDesc' },

  // Calves
  { id: 'calf-raise-standing', type: 'strength', muscleGroup: 'calves', equipment: 'machine', nameKey: 'exercises.calfRaiseStanding', descKey: 'exercises.calfRaiseStandingDesc' },
  { id: 'calf-raise-seated', type: 'strength', muscleGroup: 'calves', equipment: 'machine', nameKey: 'exercises.calfRaiseSeated', descKey: 'exercises.calfRaiseSeatedDesc' },
  { id: 'smith-machine-calf-raise', type: 'strength', muscleGroup: 'calves', equipment: 'machine', nameKey: 'exercises.smithMachineCalfRaise', descKey: 'exercises.smithMachineCalfRaiseDesc' },
  { id: 'donkey-calf-raise', type: 'strength', muscleGroup: 'calves', equipment: 'machine', nameKey: 'exercises.donkeyCalfRaise', descKey: 'exercises.donkeyCalfRaiseDesc' },
  { id: 'single-leg-calf-raise', type: 'strength', muscleGroup: 'calves', equipment: 'bodyweight', nameKey: 'exercises.singleLegCalfRaise', descKey: 'exercises.singleLegCalfRaiseDesc' },

  // Forearms
  { id: 'wrist-curl', type: 'strength', muscleGroup: 'forearms', equipment: 'dumbbell', nameKey: 'exercises.wristCurl', descKey: 'exercises.wristCurlDesc' },
  { id: 'reverse-wrist-curl', type: 'strength', muscleGroup: 'forearms', equipment: 'dumbbell', nameKey: 'exercises.reverseWristCurl', descKey: 'exercises.reverseWristCurlDesc' },
  { id: 'farmers-walk', type: 'strength', muscleGroup: 'forearms', equipment: 'dumbbell', nameKey: 'exercises.farmersWalk', descKey: 'exercises.farmersWalkDesc' },
  { id: 'plate-pinch', type: 'strength', muscleGroup: 'forearms', equipment: 'bodyweight', nameKey: 'exercises.platePinch', descKey: 'exercises.platePinchDesc' },
  { id: 'behind-back-wrist-curl', type: 'strength', muscleGroup: 'forearms', equipment: 'barbell', nameKey: 'exercises.behindBackWristCurl', descKey: 'exercises.behindBackWristCurlDesc' },

  // === CARDIO ===
  { id: 'running', type: 'cardio', cardioType: 'running', nameKey: 'exercises.running', descKey: 'exercises.runningDesc' },
  { id: 'cycling', type: 'cardio', cardioType: 'cycling', nameKey: 'exercises.cycling', descKey: 'exercises.cyclingDesc' },
  { id: 'elliptical', type: 'cardio', cardioType: 'elliptical', nameKey: 'exercises.elliptical', descKey: 'exercises.ellipticalDesc' },
  { id: 'rowing-machine', type: 'cardio', cardioType: 'rowing', nameKey: 'exercises.rowingMachine', descKey: 'exercises.rowingMachineDesc' },
  { id: 'swimming', type: 'cardio', cardioType: 'swimming', nameKey: 'exercises.swimming', descKey: 'exercises.swimmingDesc' },
  // Ergaenzt 01.09.2026: Geraete, fuer die wir aus dem Vital-Animations-
  // Gratispaket eine Animation haben und die im Studio ueberall stehen.
  { id: 'air-bike', type: 'cardio', cardioType: 'cycling', nameKey: 'exercises.airBike', descKey: 'exercises.airBikeDesc' },
  { id: 'stepmill', type: 'cardio', cardioType: 'stepmill', nameKey: 'exercises.stepmill', descKey: 'exercises.stepmillDesc' },
  { id: 'treadmill-walk', type: 'cardio', cardioType: 'walking', nameKey: 'exercises.treadmillWalk', descKey: 'exercises.treadmillWalkDesc' },
  { id: 'jump-rope', type: 'cardio', cardioType: 'jumprope', nameKey: 'exercises.jumpRope', descKey: 'exercises.jumpRopeDesc' },

  // === HIIT ===
  { id: 'burpees', type: 'hiit', equipment: 'bodyweight', nameKey: 'exercises.burpees', descKey: 'exercises.burpeesDesc' },
  { id: 'mountain-climbers', type: 'hiit', equipment: 'bodyweight', nameKey: 'exercises.mountainClimbers', descKey: 'exercises.mountainClimbersDesc' },
  { id: 'jump-squats', type: 'hiit', equipment: 'bodyweight', nameKey: 'exercises.jumpSquats', descKey: 'exercises.jumpSquatsDesc' },
  { id: 'high-knees', type: 'hiit', equipment: 'bodyweight', nameKey: 'exercises.highKnees', descKey: 'exercises.highKneesDesc' },
  { id: 'box-jumps', type: 'hiit', equipment: 'bodyweight', nameKey: 'exercises.boxJumps', descKey: 'exercises.boxJumpsDesc' },
  { id: 'battle-ropes', type: 'hiit', equipment: 'bodyweight', nameKey: 'exercises.battleRopes', descKey: 'exercises.battleRopesDesc' },
  { id: 'kettlebell-swings', type: 'hiit', equipment: 'bodyweight', nameKey: 'exercises.kettlebellSwings', descKey: 'exercises.kettlebellSwingsDesc' },
  { id: 'jump-lunges', type: 'hiit', equipment: 'bodyweight', nameKey: 'exercises.jumpLunges', descKey: 'exercises.jumpLungesDesc' },
  { id: 'plank-jacks', type: 'hiit', equipment: 'bodyweight', nameKey: 'exercises.plankJacks', descKey: 'exercises.plankJacksDesc' },

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
  { id: 'jab-cross', type: 'martial-arts', martialArtsCategory: 'boxing', nameKey: 'exercises.jabCross', descKey: 'exercises.jabCrossDesc' },
  { id: 'hooks', type: 'martial-arts', martialArtsCategory: 'boxing', nameKey: 'exercises.hooks', descKey: 'exercises.hooksDesc' },
  { id: 'uppercuts', type: 'martial-arts', martialArtsCategory: 'boxing', nameKey: 'exercises.uppercuts', descKey: 'exercises.uppercutsDesc' },
  { id: 'footwork-drills', type: 'martial-arts', martialArtsCategory: 'boxing', nameKey: 'exercises.footworkDrills', descKey: 'exercises.footworkDrillsDesc' },

  // Kickboxing
  { id: 'kick-combos', type: 'martial-arts', martialArtsCategory: 'kickboxing', nameKey: 'exercises.kickCombos', descKey: 'exercises.kickCombosDesc' },
  { id: 'roundhouse-kick-drill', type: 'martial-arts', martialArtsCategory: 'kickboxing', nameKey: 'exercises.roundhouseKickDrill', descKey: 'exercises.roundhouseKickDrillDesc' },
  { id: 'thai-clinch', type: 'martial-arts', martialArtsCategory: 'kickboxing', nameKey: 'exercises.thaiClinch', descKey: 'exercises.thaiClinchDesc' },
  { id: 'low-kick-drill', type: 'martial-arts', martialArtsCategory: 'kickboxing', nameKey: 'exercises.lowKickDrill', descKey: 'exercises.lowKickDrillDesc' },
  { id: 'front-kick', type: 'martial-arts', martialArtsCategory: 'kickboxing', nameKey: 'exercises.frontKick', descKey: 'exercises.frontKickDesc' },
  { id: 'knee-strikes', type: 'martial-arts', martialArtsCategory: 'kickboxing', nameKey: 'exercises.kneeStrikes', descKey: 'exercises.kneeStrikesDesc' },

  // MMA
  { id: 'ground-and-pound', type: 'martial-arts', martialArtsCategory: 'mma', nameKey: 'exercises.groundAndPound', descKey: 'exercises.groundAndPoundDesc' },
  { id: 'takedown-drill', type: 'martial-arts', martialArtsCategory: 'mma', nameKey: 'exercises.takedownDrill', descKey: 'exercises.takedownDrillDesc' },
  { id: 'sprawl-drill', type: 'martial-arts', martialArtsCategory: 'mma', nameKey: 'exercises.sprawlDrill', descKey: 'exercises.sprawlDrillDesc' },
  { id: 'cage-work', type: 'martial-arts', martialArtsCategory: 'mma', nameKey: 'exercises.cageWork', descKey: 'exercises.cageWorkDesc' },
  { id: 'elbow-strikes', type: 'martial-arts', martialArtsCategory: 'mma', nameKey: 'exercises.elbowStrikes', descKey: 'exercises.elbowStrikesDesc' },

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

// Selbst erstellte Übungen haben keinen Übersetzungsschlüssel. Damit sie sich
// wie Katalog-Übungen anfassen lassen, tragen sie ihren Namen im nameKey mit
// diesem Präfix. Wer den Namen anzeigt, muss ihn hier wieder abziehen.
export const CUSTOM_NAME_PREFIX = '__custom__';
const CUSTOM_EXERCISES_STORAGE_KEY = 'custom_exercises';

// Eigene Übungen (localStorage 'custom_exercises') als Exercise-Objekte.
// Raw-String-Cache: getExerciseById läuft in Hot-Loops (useMuscleHeatmap,
// achievements) — nur bei geändertem localStorage-Inhalt neu parsen.
let _customRaw = null;
let _customParsed = [];

export function getCustomExercisesAsExercises() {
  try {
    const raw = localStorage.getItem(CUSTOM_EXERCISES_STORAGE_KEY);
    if (raw !== _customRaw) {
      _customRaw = raw;
      const list = raw ? JSON.parse(raw) : [];
      _customParsed = list.map((ce) => ({
        id: ce.exercise_id || ce.id,
        type: 'strength',
        muscleGroup: ce.muscle_group || 'chest',
        equipment: ce.equipment || 'bodyweight',
        nameKey: `${CUSTOM_NAME_PREFIX}${ce.name}`,
        descKey: '',
        _customName: ce.name,
        _isCustom: true,
      }));
    }
  } catch {
    _customParsed = [];
  }
  return _customParsed;
}

export function getExerciseById(id) {
  const found = exercises.find((e) => e.id === id)
    || getCustomExercisesAsExercises().find((e) => e.id === id);
  if (!found && import.meta.env?.DEV) {
    console.warn(`[exercises] Unbekannte Übungs-ID: "${id}"`);
  }
  return found;
}

function stripCustomPrefix(nameKey, t) {
  return nameKey.startsWith(CUSTOM_NAME_PREFIX)
    ? nameKey.slice(CUSTOM_NAME_PREFIX.length)
    : t(nameKey);
}

// Anzeigename einer Übung — kennt den Katalog UND selbst erstellte Übungen.
// Ohne das zeigten Pläne bei eigenen Übungen die rohe technische ID.
// `exercise` darf eine ID oder ein Übungsobjekt sein.
export function getExerciseDisplayName(exercise, customExercises, t) {
  const isObject = typeof exercise === 'object' && exercise !== null;
  const id = isObject ? exercise.id : exercise;

  const custom = (customExercises || []).find((ce) => (ce.exercise_id || ce.id) === id);
  if (custom?.name) return custom.name;

  if (isObject) {
    if (exercise._customName) return exercise._customName;
    if (exercise.name) return exercise.name;
  }

  const fromCatalog = exercises.find((e) => e.id === id);
  if (fromCatalog?.nameKey) return stripCustomPrefix(fromCatalog.nameKey, t);

  if (isObject && exercise.nameKey) return stripCustomPrefix(exercise.nameKey, t);

  return String(id ?? '');
}
