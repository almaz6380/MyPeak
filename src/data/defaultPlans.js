// Shorthand for strength plan exercise entries
const e = (id, sets, reps) => ({ id, sets, reps });

// ── Strength Plans (moved from TrainingPlans.jsx) ────────────
export const defaultStrengthPlans = [
  {
    id: 'ppl',
    nameKey: 'plans.pushPullLegs',
    descKey: 'plans.pushPullLegsDesc',
    days: [
      { nameKey: 'plans.push', exercises: [e('bench-press',4,8), e('incline-bench-press',3,10), e('dumbbell-flyes',3,12), e('overhead-press',4,8), e('lateral-raise',3,15), e('tricep-pushdown',3,12), e('skull-crushers',3,10)] },
      { nameKey: 'plans.pull', exercises: [e('deadlift',4,6), e('barbell-row',4,8), e('lat-pulldown',3,10), e('seated-cable-row',3,12), e('face-pull',3,15), e('barbell-curl',3,10), e('hammer-curl',3,12)] },
      { nameKey: 'plans.legDay', exercises: [e('squat',4,8), e('leg-press',3,10), e('leg-extension',3,12), e('leg-curl',3,12), e('lunges',3,10), e('calf-raise-standing',4,15)] },
    ],
  },
  {
    id: 'ul',
    nameKey: 'plans.upperLower',
    descKey: 'plans.upperLowerDesc',
    days: [
      { nameKey: 'plans.upper', exercises: [e('bench-press',4,8), e('barbell-row',4,8), e('overhead-press',3,10), e('lat-pulldown',3,10), e('dumbbell-curl',3,12), e('tricep-pushdown',3,12)] },
      { nameKey: 'plans.lower', exercises: [e('squat',4,8), e('romanian-deadlift',3,10), e('leg-press',3,10), e('leg-curl',3,12), e('hip-thrust',3,10), e('calf-raise-standing',4,15)] },
    ],
  },
  {
    id: '5split',
    nameKey: 'plans.fiveDaySplit',
    descKey: 'plans.fiveDaySplitDesc',
    days: [
      { nameKey: 'plans.chestDay', exercises: [e('bench-press',4,8), e('incline-bench-press',4,10), e('dumbbell-flyes',3,12), e('cable-crossover',3,12), e('chest-dips',3,10)] },
      { nameKey: 'plans.backDay', exercises: [e('deadlift',4,6), e('pull-ups',4,8), e('barbell-row',4,8), e('lat-pulldown',3,10), e('seated-cable-row',3,12)] },
      { nameKey: 'plans.shoulderDay', exercises: [e('overhead-press',4,8), e('lateral-raise',4,15), e('face-pull',3,15), e('front-raise',3,12), e('reverse-flyes',3,15)] },
      { nameKey: 'plans.armDay', exercises: [e('barbell-curl',3,10), e('hammer-curl',3,12), e('preacher-curl',3,10), e('tricep-pushdown',3,12), e('skull-crushers',3,10), e('overhead-tricep-extension',3,12)] },
      { nameKey: 'plans.legDay', exercises: [e('squat',4,8), e('leg-press',3,10), e('leg-extension',3,12), e('leg-curl',3,12), e('lunges',3,10), e('calf-raise-standing',4,15), e('calf-raise-seated',4,15)] },
    ],
  },
];

// ── Cardio Plans ─────────────────────────────────────────────
export const defaultCardioPlans = [
  {
    id: 'couch-to-5k',
    nameKey: 'plans.couchTo5k',
    descKey: 'plans.couchTo5kDesc',
    type: 'cardio',
    sessions: [
      { nameKey: 'plans.easyRun', exerciseId: 'running', targetDuration: 1200 },
      { nameKey: 'plans.easyRun', exerciseId: 'running', targetDuration: 1500 },
      { nameKey: 'plans.longRun', exerciseId: 'running', targetDuration: 1800 },
    ],
  },
  {
    id: 'cycling-endurance',
    nameKey: 'plans.cyclingEndurance',
    descKey: 'plans.cyclingEnduranceDesc',
    type: 'cardio',
    sessions: [
      { nameKey: 'plans.steadyRide', exerciseId: 'cycling', targetDuration: 1800 },
      { nameKey: 'plans.steadyRide', exerciseId: 'cycling', targetDuration: 2700 },
    ],
  },
];

// ── HIIT Plans ───────────────────────────────────────────────
export const defaultHiitPlans = [
  {
    id: 'tabata-classic',
    nameKey: 'plans.tabata',
    descKey: 'plans.tabataDesc',
    type: 'hiit',
    rounds: 8,
    workTime: 20,
    restTime: 10,
    exercises: ['burpees', 'mountain-climbers', 'jump-squats', 'high-knees'],
  },
  {
    id: 'hiit-30-30',
    nameKey: 'plans.hiit3030',
    descKey: 'plans.hiit3030Desc',
    type: 'hiit',
    rounds: 10,
    workTime: 30,
    restTime: 30,
    exercises: ['burpees', 'kettlebell-swings', 'box-jumps', 'battle-ropes'],
  },
];

// ── Circuit Plans ────────────────────────────────────────────
export const defaultCircuitPlans = [
  {
    id: 'full-body-circuit',
    nameKey: 'plans.fullBodyCircuit',
    descKey: 'plans.fullBodyCircuitDesc',
    type: 'circuit',
    rounds: 3,
    workTime: 40,
    restTime: 20,
    exercises: ['push-ups', 'bodyweight-squats', 'burpees', 'plank', 'lunges', 'jumping-jacks'],
  },
  {
    id: 'core-circuit',
    nameKey: 'plans.coreCircuit',
    descKey: 'plans.coreCircuitDesc',
    type: 'circuit',
    rounds: 4,
    workTime: 30,
    restTime: 15,
    exercises: ['crunches', 'plank', 'hanging-leg-raise', 'mountain-climbers'],
  },
];

// ── Martial Arts Plans ───────────────────────────────────────
export const defaultMartialArtsPlans = [
  {
    id: 'boxing-basics',
    nameKey: 'plans.boxingBasics',
    descKey: 'plans.boxingBasicsDesc',
    type: 'martial-arts',
    rounds: 6,
    workTime: 180,
    restTime: 60,
    exercises: ['shadow-boxing', 'heavy-bag-rounds', 'pad-work', 'speed-bag', 'slip-and-roll', 'shadow-boxing'],
  },
  {
    id: 'kickboxing-workout',
    nameKey: 'plans.kickboxingWorkout',
    descKey: 'plans.kickboxingWorkoutDesc',
    type: 'martial-arts',
    rounds: 5,
    workTime: 180,
    restTime: 60,
    exercises: ['shadow-boxing', 'kick-combos', 'roundhouse-kick-drill', 'thai-clinch', 'low-kick-drill'],
  },
  {
    id: 'mma-conditioning',
    nameKey: 'plans.mmaConditioning',
    descKey: 'plans.mmaConditioningDesc',
    type: 'martial-arts',
    rounds: 5,
    workTime: 300,
    restTime: 60,
    exercises: ['shadow-boxing', 'takedown-drill', 'ground-and-pound', 'sprawl-drill', 'cage-work'],
  },
  {
    id: 'karate-training',
    nameKey: 'plans.karateTraining',
    descKey: 'plans.karateTrainingDesc',
    type: 'martial-arts',
    rounds: 4,
    workTime: 240,
    restTime: 60,
    exercises: ['kihon-basics', 'kata-practice', 'kumite-sparring', 'makiwara-training'],
  },
];

// ── Helpers ──────────────────────────────────────────────────

const allDefaultPlansByType = {
  strength: defaultStrengthPlans,
  cardio: defaultCardioPlans,
  hiit: defaultHiitPlans,
  circuit: defaultCircuitPlans,
  'martial-arts': defaultMartialArtsPlans,
};

export function getDefaultPlansByType(type) {
  return allDefaultPlansByType[type] || [];
}

// Flat list of all defaults (for DeletedPlans)
export const allDefaultPlans = [
  ...defaultStrengthPlans,
  ...defaultCardioPlans,
  ...defaultHiitPlans,
  ...defaultCircuitPlans,
  ...defaultMartialArtsPlans,
];
