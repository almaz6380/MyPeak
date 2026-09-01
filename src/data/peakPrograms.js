/**
 * Peak-Programme v2 — evidenzbasierte Trainingsprogramme.
 *
 * Datenmodell:
 * - Basiswoche in `days` (mon…sun, null = Ruhetag). Tages-Shapes:
 *   strength:     { label, type, exercises: [{id, sets, reps}] }
 *   cardio:       { label, type, sessionId, exerciseId, intensity?, segments, targetDuration }
 *   hiit/martial: { label, type, sessionId?, rounds, workTime, restTime, exercises: [ids], focusDE/EN? }
 * - Cardio-Segmente: { phase:'warmup'|'steady'|'cooldown', duration, rpe? }
 *                    { phase:'interval', work, rest, repeats, workRpe?, restRpe? }
 *   targetDuration = Summe aller Segmente (Legacy-Fallback + Listenanzeige).
 * - Wochen-Progression: `weeks[i]` = Overrides für Woche i+1, keyed nach sessionId.
 *   Overrides sind NICHT kumulativ — jede Woche, die von der Basiswoche abweicht,
 *   braucht ihren vollen Override (Helper unten erzeugen das kompakt).
 *   Authoring-Regel: Wochentage ändern sich NIE über Wochen, nur Session-Inhalte.
 * - Metadaten: whyDE/EN (was + warum), studies[{name, year, findingDE/EN}],
 *   progressionDE/EN (menschenlesbare Regel).
 */

export const peakCategories = [
  { id: 'strength', nameDE: 'Krafttraining', nameEN: 'Strength Training' },
  { id: 'cardio', nameDE: 'Cardio', nameEN: 'Cardio' },
  { id: 'hiit', nameDE: 'HIIT', nameEN: 'HIIT' },
  { id: 'martial_arts', nameDE: 'Kampfsport', nameEN: 'Martial Arts' },
];

// ── Studien-Bibliothek (mehrfach verwendet) ──
const STUDY = {
  tabata1996: { name: 'Tabata et al.', year: 1996, findingDE: '6 Wochen à 4 Minuten (8×20 s/10 s) steigerten die VO₂max um ~7 ml/kg/min und die anaerobe Kapazität um 28 % — moderates Dauertraining verbesserte nur die aerobe Kapazität.', findingEN: '6 weeks of 4-minute sessions (8×20s/10s) increased VO₂max by ~7 ml/kg/min and anaerobic capacity by 28% — moderate steady-state training only improved aerobic capacity.' },
  helgerud2007: { name: 'Helgerud et al.', year: 2007, findingDE: '4×4-Minuten-Intervalle bei 90–95 % der maximalen Herzfrequenz steigerten die VO₂max signifikant stärker als moderates Dauertraining mit gleicher Gesamtarbeit.', findingEN: '4×4-minute intervals at 90–95% of max heart rate increased VO₂max significantly more than moderate continuous training with equal total work.' },
  gunnarsson2012: { name: 'Gunnarsson & Bangsbo', year: 2012, findingDE: 'Läufer verbesserten mit dem 10-20-30-Konzept trotz ~50 % weniger Trainingsvolumen ihre VO₂max (~4 %) sowie ihre 1500-m- und 5-km-Zeiten.', findingEN: 'Runners using the 10-20-30 concept improved VO₂max (~4%) plus 1500 m and 5 km times despite ~50% less training volume.' },
  gibala2006: { name: 'Gibala et al.', year: 2006, findingDE: '6 Sprint-Intervall-Einheiten in 2 Wochen (~2,5 h Training) erzielten ähnliche muskuläre Ausdauer-Anpassungen wie ~10,5 h klassisches Ausdauertraining.', findingEN: '6 sprint-interval sessions across 2 weeks (~2.5 h of training) produced similar muscular endurance adaptations as ~10.5 h of traditional endurance training.' },
  little2010: { name: 'Little et al.', year: 2010, findingDE: '8–12×60-Sekunden-Intervalle mit 75 s Pause steigerten die mitochondriale Kapazität der Muskulatur deutlich — bei nur ~20–25 Minuten pro Einheit.', findingEN: '8–12×60-second intervals with 75 s rest markedly increased muscle mitochondrial capacity — in only ~20–25 minutes per session.' },
  seiler2010: { name: 'Seiler', year: 2010, findingDE: 'Spitzen-Ausdauerathleten absolvieren ~80 % ihres Trainingsvolumens niedrig-intensiv (Zone 1–2) — dieses polarisierte Modell liefert die besten langfristigen Anpassungen.', findingEN: 'Elite endurance athletes perform ~80% of their training volume at low intensity (zones 1–2) — this polarized model produces the best long-term adaptations.' },
  stoeggl2014: { name: 'Stöggl & Sperlich', year: 2014, findingDE: 'Polarisiertes Training (viel locker + wenig sehr hart) steigerte VO₂max und Leistung bei trainierten Ausdauersportlern stärker als Schwellen- oder reines HIT-Training.', findingEN: 'Polarized training (mostly easy + a little very hard) improved VO₂max and performance in trained endurance athletes more than threshold or HIT-only models.' },
  pedisic2020: { name: 'Pedisic et al.', year: 2020, findingDE: 'Meta-Analyse: Läufer haben ein ~27 % geringeres Gesamtsterblichkeitsrisiko — bereits geringe Laufumfänge (1×/Woche) zeigen diesen Effekt.', findingEN: 'Meta-analysis: runners have ~27% lower all-cause mortality risk — even small running volumes (once weekly) show this effect.' },
  lee2014: { name: 'Lee et al.', year: 2014, findingDE: 'Bereits 5–10 Minuten langsames Laufen pro Tag waren mit deutlich geringerer Gesamt- und Herz-Kreislauf-Sterblichkeit assoziiert.', findingEN: 'Even 5–10 minutes of slow running per day was associated with markedly reduced all-cause and cardiovascular mortality.' },
  esteve2007: { name: 'Esteve-Lanao et al.', year: 2007, findingDE: 'Läufer, die ~80 % ihres Volumens niedrig-intensiv trainierten, verbesserten ihre Wettkampfzeit stärker als eine Gruppe mit mehr Training im mittleren Intensitätsbereich.', findingEN: 'Runners doing ~80% of volume at low intensity improved race performance more than a group training more at moderate intensity.' },
  billat1999: { name: 'Billat et al.', year: 1999, findingDE: 'Intervalle an der Geschwindigkeit der VO₂max (vVO₂max) verbesserten bei trainierten Läufern Laufökonomie und Tempo messbar.', findingEN: 'Intervals at the velocity of VO₂max (vVO₂max) measurably improved running economy and speed in trained runners.' },
  schoenfeld2017: { name: 'Schoenfeld, Ogborn & Krieger', year: 2017, findingDE: 'Dosis-Wirkungs-Meta-Analyse: 10+ Sätze pro Muskelgruppe und Woche führen zu signifikant mehr Muskelwachstum als weniger Sätze.', findingEN: 'Dose-response meta-analysis: 10+ sets per muscle group per week produce significantly more muscle growth than fewer sets.' },
  schoenfeld2016: { name: 'Schoenfeld, Ogborn & Krieger', year: 2016, findingDE: 'Meta-Analyse: Jede Muskelgruppe 2× pro Woche zu trainieren führt zu mehr Hypertrophie als 1× pro Woche.', findingEN: 'Meta-analysis: training each muscle group twice per week produces more hypertrophy than once per week.' },
  schoenfeld2019: { name: 'Schoenfeld, Grgic & Krieger', year: 2019, findingDE: 'Bei gleichem Wochenvolumen ist die Trainingsfrequenz zweitrangig — entscheidend ist das Gesamtvolumen pro Muskelgruppe.', findingEN: 'With weekly volume equated, training frequency is secondary — total volume per muscle group is what matters.' },
  helms2016: { name: 'Helms et al.', year: 2016, findingDE: 'Die RIR-Skala („Reps in Reserve") ist ein valides Werkzeug, um Anstrengung im Krafttraining zu steuern — die meisten Sätze mit 1–3 RIR beenden.', findingEN: 'The RIR scale (reps in reserve) is a valid tool for regulating effort in resistance training — finish most sets with 1–3 reps in reserve.' },
  weston2014: { name: 'Weston et al.', year: 2014, findingDE: 'Meta-Analyse: HIIT steigerte die kardiorespiratorische Fitness fast doppelt so stark wie moderates Dauertraining.', findingEN: 'Meta-analysis: HIIT improved cardiorespiratory fitness nearly twice as much as moderate continuous training.' },
  milanovic2015: { name: 'Milanović et al.', year: 2015, findingDE: 'Meta-Analyse: HIIT verbessert die VO₂max bei gesunden Erwachsenen stärker als klassisches Ausdauertraining.', findingEN: 'Meta-analysis: HIIT improves VO₂max in healthy adults more than traditional endurance training.' },
  mcrae2012: { name: 'McRae et al.', year: 2012, findingDE: '4×/Woche nur 4 Minuten Ganzkörper-Intervalle steigerten Ausdauer UND Kraftausdauer vergleichbar mit 30 Minuten Dauertraining.', findingEN: '4×/week of just 4 minutes of whole-body intervals improved endurance AND muscular endurance comparably to 30 minutes of steady-state training.' },
  chaabene2015: { name: 'Chaabène et al.', year: 2015, findingDE: 'Review: Amateurboxen fordert gleichzeitig hohe aerobe und anaerobe Kapazität — Elite-Boxer erreichen VO₂max-Werte um 60 ml/kg/min.', findingEN: 'Review: amateur boxing demands high aerobic and anaerobic capacity simultaneously — elite boxers reach VO₂max values around 60 ml/kg/min.' },
  ouergui2014: { name: 'Ouergui et al.', year: 2014, findingDE: 'Kickbox-Runden treiben die Herzfrequenz nahe ans Maximum — Rundentraining wirkt physiologisch wie hochintensives Intervalltraining.', findingEN: 'Kickboxing rounds push heart rate close to maximum — round-based training physiologically works like high-intensity interval training.' },
  james2016: { name: 'James et al.', year: 2016, findingDE: 'Review: MMA verlangt kombinierte Kraft-, Schnelligkeits- und Ausdauerleistung — rundenbasiertes, vielseitiges Konditionstraining wird empfohlen.', findingEN: 'Review: MMA demands combined strength, speed and endurance — round-based, varied conditioning is recommended.' },
};

// ── Helper: Cardio-Sessions kompakt bauen ──
const sum = (segments) => segments.reduce((t, s) => t + (s.phase === 'interval' ? s.repeats * s.work + Math.max(0, s.repeats - 1) * (s.rest || 0) : s.duration), 0);
const cardioSession = (extra, segments) => ({ type: 'cardio', segments, targetDuration: sum(segments), ...extra });

// Couch to 5K: Woche → Segmente (5' Gehen warm, Lauf/Geh-Intervalle bzw. Dauerlauf, 5' Gehen kalt)
const c25kWeek = (main) => [{ phase: 'warmup', duration: 300, rpe: 2 }, ...main, { phase: 'cooldown', duration: 300, rpe: 2 }];
const C25K_WEEKS = [
  c25kWeek([{ phase: 'interval', work: 60, rest: 90, repeats: 8, workRpe: 6, restRpe: 2 }]),
  c25kWeek([{ phase: 'interval', work: 90, rest: 120, repeats: 6, workRpe: 6, restRpe: 2 }]),
  c25kWeek([{ phase: 'interval', work: 180, rest: 180, repeats: 4, workRpe: 6, restRpe: 2 }]),
  c25kWeek([{ phase: 'interval', work: 300, rest: 150, repeats: 3, workRpe: 6, restRpe: 2 }]),
  c25kWeek([{ phase: 'interval', work: 480, rest: 300, repeats: 2, workRpe: 6, restRpe: 2 }]),
  c25kWeek([{ phase: 'interval', work: 600, rest: 180, repeats: 2, workRpe: 6, restRpe: 2 }]),
  c25kWeek([{ phase: 'steady', duration: 1500, rpe: 6 }]),
  c25kWeek([{ phase: 'steady', duration: 1680, rpe: 6 }]),
  c25kWeek([{ phase: 'steady', duration: 1800, rpe: 6 }]),
];

// Norwegian 4×4: N Intervalle à 4', aktive Pause
const nor44 = (repeats, rest) => cardioSession(
  { intensity: { rpe: 9, hrZone: 5 } },
  [
    { phase: 'warmup', duration: 600, rpe: 3 },
    { phase: 'interval', work: 240, rest, repeats, workRpe: 9, restRpe: 3 },
    { phase: 'cooldown', duration: 300, rpe: 2 },
  ],
);

// 10-20-30: N Blöcke à 5×(30 s locker · 20 s zügig · 10 s Sprint), 2' Traben dazwischen
const tenTwentyThirty = (blocks) => {
  const segments = [{ phase: 'warmup', duration: 480, rpe: 3 }];
  for (let b = 0; b < blocks; b++) {
    if (b > 0) segments.push({ phase: 'steady', duration: 120, rpe: 2 });
    segments.push({ phase: 'interval', work: 10, rest: 50, repeats: 5, workRpe: 9, restRpe: 4 });
  }
  segments.push({ phase: 'cooldown', duration: 300, rpe: 2 });
  return cardioSession({ intensity: { rpe: 9 } }, segments);
};

// Zone 2: lockere Dauereinheit mit kurzem Warm-up/Cool-down
const zone2 = (mainSecs) => cardioSession(
  { intensity: { rpe: 4, hrZone: 2 } },
  [
    { phase: 'warmup', duration: 300, rpe: 2 },
    { phase: 'steady', duration: mainSecs, rpe: 4 },
    { phase: 'cooldown', duration: 180, rpe: 2 },
  ],
);

// 10K-Bausteine
const run10kIntervals = (repeats) => cardioSession(
  { intensity: { rpe: 9, hrZone: 5 } },
  [
    { phase: 'warmup', duration: 600, rpe: 3 },
    { phase: 'interval', work: 180, rest: 120, repeats, workRpe: 9, restRpe: 3 },
    { phase: 'cooldown', duration: 300, rpe: 2 },
  ],
);
const run10kTempo = (tempoSecs) => cardioSession(
  { intensity: { rpe: 7, hrZone: 4 } },
  [
    { phase: 'warmup', duration: 600, rpe: 3 },
    { phase: 'steady', duration: tempoSecs, rpe: 7 },
    { phase: 'cooldown', duration: 300, rpe: 2 },
  ],
);
const run10kLong = (mainSecs) => cardioSession(
  { intensity: { rpe: 4, hrZone: 2 } },
  [
    { phase: 'warmup', duration: 300, rpe: 2 },
    { phase: 'steady', duration: mainSecs, rpe: 4 },
    { phase: 'cooldown', duration: 180, rpe: 2 },
  ],
);

export const peakPrograms = [
  // ═══════════════════ STRENGTH (6) ═══════════════════
  // Progression über doppelte Progression (siehe progressionDE/EN) — die
  // Wochenstruktur bleibt konstant, die Last steigt satzweise.

  {
    id: 'ppl_6x',
    category: 'strength',
    nameDE: 'Push / Pull / Legs',
    nameEN: 'Push / Pull / Legs',
    descDE: 'Der klassische 6er-Split für maximalen Muskelaufbau. Jede Muskelgruppe wird 2x pro Woche trainiert.',
    descEN: 'The classic 6-day split for maximum muscle growth. Each muscle group is trained twice per week.',
    whyDE: 'PPL kombiniert die zwei stärksten Hebel für Muskelaufbau: hohes Wochenvolumen (16–20 Sätze pro Muskelgruppe) und eine Trainingsfrequenz von 2x pro Woche. Die Aufteilung nach Bewegungsmustern (Drücken/Ziehen/Beine) lässt jede Muskelgruppe vollständig regenerieren, während du trotzdem fast täglich trainierst.',
    whyEN: 'PPL combines the two strongest levers for muscle growth: high weekly volume (16–20 sets per muscle group) and a training frequency of twice per week. Splitting by movement pattern (push/pull/legs) lets each muscle group fully recover while you still train almost daily.',
    studies: [STUDY.schoenfeld2017, STUDY.schoenfeld2016, STUDY.helms2016],
    progressionDE: 'Doppelte Progression: Halte Sätze und Wiederholungsbereich, arbeite dich in den Wiederholungen nach oben. Schaffst du die obere Grenze in allen Sätzen sauber, erhöhe das Gewicht um 2,5 kg und beginne wieder unten. Beende die meisten Sätze mit 1–3 Wiederholungen Reserve (RIR).',
    progressionEN: 'Double progression: keep sets and rep range, work your reps upward. Once you hit the top of the range on all sets with clean form, add 2.5 kg and restart at the bottom. Finish most sets with 1–3 reps in reserve (RIR).',
    level: 'intermediate',
    duration_weeks: 8,
    sessions_per_week: 6,
    goal: 'muscle_gain',
    days: {
      mon: { label: 'Push', type: 'strength', exercises: [{ id: 'bench-press', sets: 4, reps: 8 }, { id: 'incline-dumbbell-press', sets: 3, reps: 10 }, { id: 'cable-crossover', sets: 3, reps: 12 }, { id: 'overhead-press', sets: 4, reps: 8 }, { id: 'lateral-raise', sets: 3, reps: 15 }, { id: 'tricep-pushdown', sets: 3, reps: 12 }] },
      tue: { label: 'Pull', type: 'strength', exercises: [{ id: 'deadlift', sets: 4, reps: 6 }, { id: 'barbell-row', sets: 4, reps: 8 }, { id: 'lat-pulldown', sets: 3, reps: 10 }, { id: 'seated-cable-row', sets: 3, reps: 12 }, { id: 'face-pull', sets: 3, reps: 15 }, { id: 'barbell-curl', sets: 3, reps: 10 }] },
      wed: { label: 'Legs', type: 'strength', exercises: [{ id: 'squat', sets: 4, reps: 8 }, { id: 'leg-press', sets: 3, reps: 10 }, { id: 'romanian-deadlift', sets: 3, reps: 10 }, { id: 'leg-curl', sets: 3, reps: 12 }, { id: 'leg-extension', sets: 3, reps: 12 }, { id: 'calf-raise-standing', sets: 4, reps: 15 }] },
      thu: { label: 'Push', type: 'strength', exercises: [{ id: 'incline-dumbbell-press', sets: 4, reps: 8 }, { id: 'bench-press', sets: 3, reps: 10 }, { id: 'chest-dips', sets: 3, reps: 10 }, { id: 'overhead-press', sets: 3, reps: 10 }, { id: 'lateral-raise', sets: 4, reps: 12 }, { id: 'skull-crushers', sets: 3, reps: 10 }] },
      fri: { label: 'Pull', type: 'strength', exercises: [{ id: 'pull-ups', sets: 4, reps: 8 }, { id: 'barbell-row', sets: 3, reps: 10 }, { id: 'lat-pulldown', sets: 3, reps: 12 }, { id: 'face-pull', sets: 3, reps: 15 }, { id: 'hammer-curl', sets: 3, reps: 10 }, { id: 'incline-dumbbell-curl', sets: 3, reps: 12 }] },
      sat: { label: 'Legs', type: 'strength', exercises: [{ id: 'squat', sets: 4, reps: 6 }, { id: 'lunges', sets: 3, reps: 10 }, { id: 'leg-press', sets: 3, reps: 12 }, { id: 'leg-curl', sets: 3, reps: 12 }, { id: 'calf-raise-standing', sets: 4, reps: 15 }, { id: 'leg-raise-lying', sets: 3, reps: 15 }] },
      sun: null,
    },
  },
  {
    id: 'upper_lower_4x',
    category: 'strength',
    nameDE: 'Oberkörper / Unterkörper',
    nameEN: 'Upper / Lower Split',
    descDE: 'Effektiver 4er-Split für Anfänger und Fortgeschrittene. Jede Muskelgruppe wird 2x pro Woche trainiert.',
    descEN: 'Effective 4-day split for beginners and intermediates. Each muscle group is trained twice per week.',
    whyDE: 'Der Oberkörper/Unterkörper-Split ist der beste Kompromiss aus Zeitaufwand und Wirkung: 4 Einheiten pro Woche reichen für die Frequenz von 2x pro Muskelgruppe, die in Meta-Analysen mehr Wachstum liefert als 1x. Grundübungen zuerst, gezielte Isolationsübungen danach.',
    whyEN: 'The upper/lower split is the best trade-off between time and results: 4 sessions per week deliver the twice-weekly frequency per muscle group that meta-analyses show grows more muscle than once weekly. Compounds first, targeted isolation after.',
    studies: [STUDY.schoenfeld2016, STUDY.schoenfeld2017],
    progressionDE: 'Doppelte Progression: erst Wiederholungen im Zielbereich steigern, dann +2,5 kg. Grundübungen (Kniebeuge, Bankdrücken, Kreuzheben) mit 2 RIR beenden, Isolationsübungen bis 1 RIR. Nach 6–8 Wochen eine leichte Woche einschieben.',
    progressionEN: 'Double progression: first increase reps within the target range, then add 2.5 kg. Finish compounds (squat, bench, deadlift) at 2 RIR, isolation work at 1 RIR. Insert a light week after 6–8 weeks.',
    level: 'beginner',
    duration_weeks: 8,
    sessions_per_week: 4,
    goal: 'muscle_gain',
    days: {
      mon: { label: 'Oberkörper', type: 'strength', exercises: [{ id: 'bench-press', sets: 4, reps: 8 }, { id: 'barbell-row', sets: 4, reps: 8 }, { id: 'overhead-press', sets: 3, reps: 10 }, { id: 'lat-pulldown', sets: 3, reps: 10 }, { id: 'lateral-raise', sets: 3, reps: 12 }, { id: 'barbell-curl', sets: 2, reps: 12 }, { id: 'tricep-pushdown', sets: 2, reps: 12 }] },
      tue: { label: 'Unterkörper', type: 'strength', exercises: [{ id: 'squat', sets: 4, reps: 8 }, { id: 'romanian-deadlift', sets: 3, reps: 10 }, { id: 'leg-press', sets: 3, reps: 10 }, { id: 'leg-curl', sets: 3, reps: 12 }, { id: 'calf-raise-standing', sets: 4, reps: 15 }, { id: 'plank', sets: 3, reps: 60 }] },
      wed: null,
      thu: { label: 'Oberkörper', type: 'strength', exercises: [{ id: 'incline-dumbbell-press', sets: 4, reps: 10 }, { id: 'seated-cable-row', sets: 4, reps: 10 }, { id: 'overhead-press', sets: 3, reps: 10 }, { id: 'pull-ups', sets: 3, reps: 8 }, { id: 'face-pull', sets: 3, reps: 15 }, { id: 'hammer-curl', sets: 2, reps: 12 }, { id: 'overhead-tricep-extension', sets: 2, reps: 12 }] },
      fri: { label: 'Unterkörper', type: 'strength', exercises: [{ id: 'deadlift', sets: 4, reps: 6 }, { id: 'lunges', sets: 3, reps: 10 }, { id: 'leg-extension', sets: 3, reps: 12 }, { id: 'leg-curl', sets: 3, reps: 12 }, { id: 'calf-raise-standing', sets: 4, reps: 15 }, { id: 'russian-twist', sets: 3, reps: 20 }] },
      sat: null,
      sun: null,
    },
  },
  {
    id: 'split_5x',
    category: 'strength',
    nameDE: '5er-Split',
    nameEN: '5-Day Split',
    descDE: 'Fortgeschrittener 5er-Split mit hohem Volumen pro Muskelgruppe. Für erfahrene Athleten.',
    descEN: 'Advanced 5-day split with high volume per muscle group. For experienced athletes.',
    whyDE: 'Für Fortgeschrittene, die mehr Volumen brauchen: Der 5er-Split erlaubt 15–20+ Sätze pro Muskelgruppe mit voller Konzentration auf einen Bereich pro Einheit. Die Dosis-Wirkungs-Forschung zeigt: Wer schon länger trainiert, wächst mit mehr wöchentlichen Sätzen weiter.',
    whyEN: 'For advanced lifters who need more volume: the 5-day split allows 15–20+ sets per muscle group with full focus on one area per session. Dose-response research shows experienced lifters keep growing with more weekly sets.',
    studies: [STUDY.schoenfeld2017, STUDY.schoenfeld2019],
    progressionDE: 'Doppelte Progression pro Übung. Zusätzlich alle 3–4 Wochen einen Satz bei der ersten Übung des Tages ergänzen, solange die Regeneration mitspielt. Woche 10 als Deload fahren (Gewichte −30 %, Sätze halbieren).',
    progressionEN: 'Double progression per exercise. Additionally add one set to the first exercise of the day every 3–4 weeks as long as recovery allows. Run week 10 as a deload (weights −30%, halve the sets).',
    level: 'advanced',
    duration_weeks: 10,
    sessions_per_week: 5,
    goal: 'muscle_gain',
    days: {
      mon: { label: 'Brust', type: 'strength', exercises: [{ id: 'bench-press', sets: 4, reps: 8 }, { id: 'incline-dumbbell-press', sets: 4, reps: 10 }, { id: 'cable-crossover', sets: 3, reps: 12 }, { id: 'chest-dips', sets: 3, reps: 10 }, { id: 'push-ups', sets: 3, reps: 15 }] },
      tue: { label: 'Rücken', type: 'strength', exercises: [{ id: 'deadlift', sets: 4, reps: 6 }, { id: 'pull-ups', sets: 4, reps: 8 }, { id: 'barbell-row', sets: 4, reps: 8 }, { id: 'lat-pulldown', sets: 3, reps: 10 }, { id: 'seated-cable-row', sets: 3, reps: 12 }] },
      wed: { label: 'Schultern', type: 'strength', exercises: [{ id: 'overhead-press', sets: 4, reps: 8 }, { id: 'lateral-raise', sets: 4, reps: 12 }, { id: 'face-pull', sets: 3, reps: 15 }, { id: 'front-raise', sets: 3, reps: 12 }] },
      thu: { label: 'Arme', type: 'strength', exercises: [{ id: 'barbell-curl', sets: 4, reps: 10 }, { id: 'skull-crushers', sets: 4, reps: 10 }, { id: 'hammer-curl', sets: 3, reps: 12 }, { id: 'tricep-pushdown', sets: 3, reps: 12 }, { id: 'incline-dumbbell-curl', sets: 3, reps: 12 }, { id: 'overhead-tricep-extension', sets: 3, reps: 12 }] },
      fri: { label: 'Beine', type: 'strength', exercises: [{ id: 'squat', sets: 4, reps: 8 }, { id: 'leg-press', sets: 4, reps: 10 }, { id: 'romanian-deadlift', sets: 3, reps: 10 }, { id: 'leg-extension', sets: 3, reps: 12 }, { id: 'leg-curl', sets: 3, reps: 12 }, { id: 'calf-raise-standing', sets: 4, reps: 15 }] },
      sat: null,
      sun: null,
    },
  },
  {
    id: 'fullbody_3x',
    category: 'strength',
    nameDE: 'Ganzkörper 3x',
    nameEN: 'Full Body 3x',
    descDE: 'Perfekt für Anfänger: 3 Ganzkörper-Trainings pro Woche mit den wichtigsten Grundübungen.',
    descEN: 'Perfect for beginners: 3 full-body workouts per week with the most important compound exercises.',
    whyDE: 'Für Einsteiger ist Ganzkörpertraining 3x pro Woche das effizienteste Modell: jede Muskelgruppe wird 3x pro Woche gereizt, die Grundübungen werden durch häufiges Üben schnell besser, und drei Einheiten passen in jeden Alltag. Anfänger wachsen bereits mit moderatem Volumen zuverlässig.',
    whyEN: 'For beginners, full-body training 3x per week is the most efficient model: every muscle group is stimulated 3x weekly, the big lifts improve fast through frequent practice, and three sessions fit any schedule. Beginners grow reliably even on moderate volume.',
    studies: [STUDY.schoenfeld2016, STUDY.helms2016],
    progressionDE: 'Lineare Progression: Erhöhe das Gewicht jede Einheit um 2,5 kg (Unterkörper) bzw. 1,25–2,5 kg (Oberkörper), solange alle Wiederholungen sauber gelingen. Scheitert eine Übung 2x in Folge, reduziere ihr Gewicht um 10 % und arbeite dich wieder hoch.',
    progressionEN: 'Linear progression: add 2.5 kg (lower body) or 1.25–2.5 kg (upper body) each session as long as all reps are clean. If an exercise stalls twice in a row, drop its weight by 10% and work back up.',
    level: 'beginner',
    duration_weeks: 6,
    sessions_per_week: 3,
    goal: 'muscle_gain',
    days: {
      mon: { label: 'Ganzkörper A', type: 'strength', exercises: [{ id: 'squat', sets: 3, reps: 8 }, { id: 'bench-press', sets: 3, reps: 8 }, { id: 'barbell-row', sets: 3, reps: 8 }, { id: 'overhead-press', sets: 3, reps: 10 }, { id: 'barbell-curl', sets: 2, reps: 12 }, { id: 'plank', sets: 3, reps: 45 }] },
      tue: null,
      wed: { label: 'Ganzkörper B', type: 'strength', exercises: [{ id: 'deadlift', sets: 3, reps: 6 }, { id: 'incline-dumbbell-press', sets: 3, reps: 10 }, { id: 'lat-pulldown', sets: 3, reps: 10 }, { id: 'lunges', sets: 3, reps: 10 }, { id: 'lateral-raise', sets: 3, reps: 12 }, { id: 'tricep-pushdown', sets: 2, reps: 12 }] },
      thu: null,
      fri: { label: 'Ganzkörper C', type: 'strength', exercises: [{ id: 'squat', sets: 3, reps: 10 }, { id: 'pull-ups', sets: 3, reps: 8 }, { id: 'bench-press', sets: 3, reps: 10 }, { id: 'seated-cable-row', sets: 3, reps: 10 }, { id: 'leg-curl', sets: 3, reps: 12 }, { id: 'calf-raise-standing', sets: 3, reps: 15 }] },
      sat: null,
      sun: null,
    },
  },
  {
    id: 'push_pull_4x',
    category: 'strength',
    nameDE: 'Push / Pull 4x',
    nameEN: 'Push / Pull 4x',
    descDE: '4 Trainings pro Woche aufgeteilt in Drück- und Zugbewegungen. Beine werden integriert.',
    descEN: '4 sessions per week split into push and pull movements. Legs are integrated into both.',
    whyDE: 'Push/Pull mit integrierten Beinen ist die zeiteffiziente Alternative zum 6-Tage-PPL: gleiche 2x-Frequenz pro Muskelgruppe, aber nur 4 Gym-Tage. Quadrizeps wandert zu Push (Kniebeuge = Drücken), hintere Kette zu Pull (Kreuzheben = Ziehen) — biomechanisch sauber gruppiert.',
    whyEN: 'Push/pull with integrated legs is the time-efficient alternative to 6-day PPL: the same 2x frequency per muscle group in only 4 gym days. Quads go with push (squat = press), posterior chain with pull (deadlift = pull) — biomechanically clean grouping.',
    studies: [STUDY.schoenfeld2016, STUDY.schoenfeld2017],
    progressionDE: 'Doppelte Progression: Wiederholungen im Zielbereich steigern, dann +2,5 kg. Kreuzheben und Kniebeuge konservativ steigern (erst wenn alle Sätze mit 2 RIR gelingen). Nach Woche 8 eine Deload-Woche, bevor du den Zyklus wiederholst.',
    progressionEN: 'Double progression: increase reps within the range, then add 2.5 kg. Progress deadlift and squat conservatively (only when all sets succeed at 2 RIR). After week 8, take a deload week before repeating the cycle.',
    level: 'intermediate',
    duration_weeks: 8,
    sessions_per_week: 4,
    goal: 'muscle_gain',
    days: {
      mon: { label: 'Push + Quads', type: 'strength', exercises: [{ id: 'squat', sets: 4, reps: 8 }, { id: 'bench-press', sets: 4, reps: 8 }, { id: 'overhead-press', sets: 3, reps: 10 }, { id: 'incline-dumbbell-press', sets: 3, reps: 10 }, { id: 'lateral-raise', sets: 3, reps: 12 }, { id: 'tricep-pushdown', sets: 3, reps: 12 }] },
      tue: { label: 'Pull + Hamstrings', type: 'strength', exercises: [{ id: 'romanian-deadlift', sets: 4, reps: 8 }, { id: 'pull-ups', sets: 4, reps: 8 }, { id: 'barbell-row', sets: 3, reps: 10 }, { id: 'lat-pulldown', sets: 3, reps: 10 }, { id: 'face-pull', sets: 3, reps: 15 }, { id: 'barbell-curl', sets: 3, reps: 10 }] },
      wed: null,
      thu: { label: 'Push + Quads', type: 'strength', exercises: [{ id: 'leg-press', sets: 4, reps: 10 }, { id: 'incline-dumbbell-press', sets: 4, reps: 10 }, { id: 'overhead-press', sets: 3, reps: 10 }, { id: 'cable-crossover', sets: 3, reps: 12 }, { id: 'leg-extension', sets: 3, reps: 12 }, { id: 'skull-crushers', sets: 3, reps: 10 }] },
      fri: { label: 'Pull + Hamstrings', type: 'strength', exercises: [{ id: 'deadlift', sets: 4, reps: 6 }, { id: 'seated-cable-row', sets: 4, reps: 10 }, { id: 'lat-pulldown', sets: 3, reps: 10 }, { id: 'leg-curl', sets: 3, reps: 12 }, { id: 'hammer-curl', sets: 3, reps: 10 }, { id: 'calf-raise-standing', sets: 4, reps: 15 }] },
      sat: null,
      sun: null,
    },
  },
  {
    id: 'bro_split_5x',
    category: 'strength',
    nameDE: 'Bro-Split',
    nameEN: 'Bro Split',
    descDE: 'Klassischer Bodybuilding-Split: jede Muskelgruppe bekommt ihren eigenen Tag mit hohem Volumen.',
    descEN: 'Classic bodybuilding split: each muscle group gets its own day with high volume.',
    whyDE: 'Der klassische Bodybuilding-Ansatz: eine Muskelgruppe pro Tag, dafür mit vollem Fokus und hohem Volumen in einer Einheit. Die neuere Forschung zeigt: Bei gleichem Wochenvolumen ist die Verteilung zweitrangig — wer den Pump und Fokus einzelner Muskeltage liebt, baut damit genauso auf.',
    whyEN: 'The classic bodybuilding approach: one muscle group per day, trained with full focus and high volume in a single session. Recent research shows that with weekly volume equated, distribution is secondary — if you love the pump and focus of dedicated muscle days, you will grow just as well.',
    studies: [STUDY.schoenfeld2019, STUDY.schoenfeld2017],
    progressionDE: 'Doppelte Progression pro Übung, die meisten Sätze bis 1–2 RIR. Weil jede Muskelgruppe nur 1x pro Woche drankommt, zählt jede Einheit: Notiere deine Gewichte konsequent und schlage jede Woche mindestens eine Wiederholung mehr an.',
    progressionEN: 'Double progression per exercise, most sets to 1–2 RIR. Because each muscle group is hit only once a week, every session counts: log your weights consistently and beat at least one rep each week.',
    level: 'intermediate',
    duration_weeks: 10,
    sessions_per_week: 5,
    goal: 'muscle_gain',
    days: {
      mon: { label: 'Brust', type: 'strength', exercises: [{ id: 'bench-press', sets: 4, reps: 8 }, { id: 'incline-dumbbell-press', sets: 4, reps: 10 }, { id: 'cable-crossover', sets: 3, reps: 12 }, { id: 'chest-dips', sets: 3, reps: 10 }] },
      tue: { label: 'Rücken', type: 'strength', exercises: [{ id: 'deadlift', sets: 4, reps: 6 }, { id: 'pull-ups', sets: 4, reps: 8 }, { id: 'barbell-row', sets: 3, reps: 10 }, { id: 'seated-cable-row', sets: 3, reps: 12 }] },
      wed: { label: 'Schultern + Arme', type: 'strength', exercises: [{ id: 'overhead-press', sets: 4, reps: 8 }, { id: 'lateral-raise', sets: 4, reps: 12 }, { id: 'barbell-curl', sets: 3, reps: 10 }, { id: 'skull-crushers', sets: 3, reps: 10 }, { id: 'hammer-curl', sets: 3, reps: 12 }, { id: 'tricep-pushdown', sets: 3, reps: 12 }] },
      thu: null,
      fri: { label: 'Beine', type: 'strength', exercises: [{ id: 'squat', sets: 4, reps: 8 }, { id: 'leg-press', sets: 3, reps: 10 }, { id: 'romanian-deadlift', sets: 3, reps: 10 }, { id: 'leg-extension', sets: 3, reps: 12 }, { id: 'leg-curl', sets: 3, reps: 12 }, { id: 'calf-raise-standing', sets: 4, reps: 15 }] },
      sat: { label: 'Schwachstellen', type: 'strength', exercises: [{ id: 'incline-dumbbell-press', sets: 3, reps: 10 }, { id: 'lat-pulldown', sets: 3, reps: 10 }, { id: 'face-pull', sets: 3, reps: 15 }, { id: 'lunges', sets: 3, reps: 10 }, { id: 'plank', sets: 3, reps: 60 }] },
      sun: null,
    },
  },

  // ═══════════════════ CARDIO (5) ═══════════════════

  {
    id: 'couch_to_5k',
    category: 'cardio',
    nameDE: 'Couch to 5K',
    nameEN: 'Couch to 5K',
    descDE: 'In 9 Wochen von null zum 5-Kilometer-Lauf — mit Geh-/Laufintervallen, die jede Woche länger werden.',
    descEN: 'From zero to a 5K run in 9 weeks — with walk/run intervals that get longer every week.',
    whyDE: 'Das weltweit bewährte Einsteiger-Konzept: Kurze Laufabschnitte mit Gehpausen dazwischen lassen Sehnen, Gelenke und Herz-Kreislauf-System mitwachsen, statt sie zu überfordern. Die Progression ist bewusst sanft — genau das macht das Programm so gut durchhaltbar. Schon kleine Laufumfänge senken das Sterblichkeitsrisiko messbar.',
    whyEN: 'The globally proven beginner concept: short running segments with walking breaks let tendons, joints and the cardiovascular system adapt instead of being overwhelmed. The progression is deliberately gentle — which is exactly why people stick with it. Even small running volumes measurably lower mortality risk.',
    studies: [STUDY.pedisic2020, STUDY.lee2014],
    progressionDE: 'Jede Woche werden die Laufabschnitte länger und die Gehpausen kürzer — von 8×1 Minute Laufen (Woche 1) bis 30 Minuten am Stück (Woche 9). Laufe die Laufabschnitte bewusst langsam (Sprechtempo, RPE 5–6). Wiederhole eine Woche, wenn sie sich zu schwer anfühlt.',
    progressionEN: 'Each week the running segments get longer and the walking breaks shorter — from 8×1 minute of running (week 1) to 30 minutes non-stop (week 9). Run the running segments deliberately slowly (conversational pace, RPE 5–6). Repeat a week if it feels too hard.',
    level: 'beginner',
    duration_weeks: 9,
    sessions_per_week: 3,
    goal: 'weight_loss',
    days: {
      mon: { label: 'Lauf + Gehpausen', sessionId: 'run', exerciseId: 'running', ...cardioSession({ intensity: { rpe: 6, hrZone: 3 } }, C25K_WEEKS[0]) },
      tue: null,
      wed: { label: 'Lauf + Gehpausen', sessionId: 'run', exerciseId: 'running', ...cardioSession({ intensity: { rpe: 6, hrZone: 3 } }, C25K_WEEKS[0]) },
      thu: null,
      fri: { label: 'Lauf + Gehpausen', sessionId: 'run', exerciseId: 'running', ...cardioSession({ intensity: { rpe: 6, hrZone: 3 } }, C25K_WEEKS[0]) },
      sat: null,
      sun: null,
    },
    weeks: C25K_WEEKS.map((segs, i) => (i === 0 ? {} : { run: { segments: segs, targetDuration: sum(segs), label: i >= 6 ? 'Dauerlauf' : 'Lauf + Gehpausen' } })),
  },
  {
    id: 'norwegian_4x4',
    category: 'cardio',
    nameDE: 'Norwegisches 4×4',
    nameEN: 'Norwegian 4×4',
    descDE: 'Das VO₂max-Protokoll aus der Forschung: 4 Intervalle à 4 Minuten bei 90–95 % der maximalen Herzfrequenz.',
    descEN: 'The VO₂max protocol from research: 4 intervals of 4 minutes at 90–95% of maximum heart rate.',
    whyDE: 'Kaum ein Protokoll ist besser belegt: 4-Minuten-Intervalle nahe der maximalen Herzfrequenz sind der stärkste bekannte Reiz für die VO₂max — den besten Einzel-Marker für Ausdauerleistung und Langlebigkeit. Die 3-minütigen aktiven Pausen halten die Qualität der Intervalle hoch. Funktioniert beim Laufen, Radfahren und Rudern.',
    whyEN: 'Few protocols are better documented: 4-minute intervals near maximum heart rate are the strongest known stimulus for VO₂max — the best single marker of endurance performance and longevity. The 3-minute active recoveries keep interval quality high. Works for running, cycling and rowing.',
    studies: [STUDY.helgerud2007, STUDY.milanovic2015],
    progressionDE: 'Wochen 1–2: 3 Intervalle zum Eingewöhnen. Ab Woche 3: das volle 4×4. Wochen 7–8: aktive Pause auf 2:30 verkürzt. Intensität: Die letzten 2 Minuten jedes Intervalls sollen sich nach RPE 9 anfühlen — Sprechen ist dann unmöglich.',
    progressionEN: 'Weeks 1–2: 3 intervals to adapt. From week 3: the full 4×4. Weeks 7–8: active recovery shortened to 2:30. Intensity: the last 2 minutes of each interval should feel like RPE 9 — talking should be impossible.',
    level: 'intermediate',
    duration_weeks: 8,
    sessions_per_week: 3,
    goal: 'maintenance',
    days: {
      mon: { label: '4×4 Intervalle', sessionId: 'v', exerciseId: 'running', ...nor44(3, 180) },
      tue: null,
      wed: { label: '4×4 Intervalle', sessionId: 'v', exerciseId: 'running', ...nor44(3, 180) },
      thu: null,
      fri: { label: '4×4 Intervalle', sessionId: 'v', exerciseId: 'running', ...nor44(3, 180) },
      sat: null,
      sun: null,
    },
    weeks: [
      {}, {},
      { v: nor44(4, 180) }, { v: nor44(4, 180) }, { v: nor44(4, 180) }, { v: nor44(4, 180) },
      { v: nor44(4, 150) }, { v: nor44(4, 150) },
    ],
  },
  {
    id: 'interval_10_20_30',
    category: 'cardio',
    nameDE: '10-20-30 Intervalle',
    nameEN: '10-20-30 Intervals',
    descDE: 'Das dänische Konzept: 30 s locker, 20 s zügig, 10 s Sprint — schneller werden mit halbem Trainingsumfang.',
    descEN: 'The Danish concept: 30 s easy, 20 s brisk, 10 s sprint — get faster with half the training volume.',
    whyDE: 'An der Universität Kopenhagen entwickelt: Läufer wurden schneller und fitter, obwohl sie ihr Trainingsvolumen halbierten. Die nur 10 Sekunden langen Sprints setzen einen maximalen Reiz, bleiben aber so kurz, dass sich die Belastung gut verteilt. Ideal, wenn du wenig Zeit hast, aber schneller werden willst.',
    whyEN: 'Developed at the University of Copenhagen: runners got faster and fitter despite halving their training volume. The 10-second sprints deliver a maximal stimulus yet stay so short that the load is easy to absorb. Ideal if you have little time but want to get faster.',
    studies: [STUDY.gunnarsson2012],
    progressionDE: 'Ein Block = 5×(30 s locker · 20 s zügig · 10 s Sprint). Wochen 1–2: 2 Blöcke, Wochen 3–4: 3 Blöcke, Wochen 5–6: 4 Blöcke — mit 2 Minuten Traben zwischen den Blöcken. Die 10-Sekunden-Sprints sind fast maximal (RPE 9), der Rest bewusst locker.',
    progressionEN: 'One block = 5×(30 s easy · 20 s brisk · 10 s sprint). Weeks 1–2: 2 blocks, weeks 3–4: 3 blocks, weeks 5–6: 4 blocks — with 2 minutes of jogging between blocks. The 10-second sprints are near-maximal (RPE 9), the rest deliberately easy.',
    level: 'intermediate',
    duration_weeks: 6,
    sessions_per_week: 3,
    goal: 'maintenance',
    days: {
      tue: { label: '10-20-30', sessionId: 'b', exerciseId: 'running', ...tenTwentyThirty(2) },
      mon: null,
      wed: null,
      thu: { label: '10-20-30', sessionId: 'b', exerciseId: 'running', ...tenTwentyThirty(2) },
      fri: null,
      sat: { label: '10-20-30', sessionId: 'b', exerciseId: 'running', ...tenTwentyThirty(2) },
      sun: null,
    },
    weeks: [
      {}, {},
      { b: tenTwentyThirty(3) }, { b: tenTwentyThirty(3) },
      { b: tenTwentyThirty(4) }, { b: tenTwentyThirty(4) },
    ],
  },
  {
    id: 'zone2_base',
    category: 'cardio',
    nameDE: 'Zone-2 Grundlagen',
    nameEN: 'Zone 2 Base Builder',
    descDE: 'Die Ausdauer-Basis der Profis: lockere Dauereinheiten in Pulszone 2, die von Woche zu Woche länger werden.',
    descEN: 'The endurance base of the pros: easy steady sessions in heart-rate zone 2 that get longer week by week.',
    whyDE: 'Spitzen-Ausdauerathleten trainieren ~80 % ihres Volumens genau hier: locker genug, um sich nebenbei unterhalten zu können. Zone 2 baut Mitochondrien und Fettstoffwechsel auf — das Fundament, auf dem jedes harte Training erst wirkt. Der häufigste Fehler von Hobbysportlern ist, diese Einheiten zu schnell zu laufen.',
    whyEN: 'Elite endurance athletes do ~80% of their volume exactly here: easy enough to hold a conversation. Zone 2 builds mitochondria and fat metabolism — the foundation that makes every hard session work. The most common recreational mistake is running these sessions too fast.',
    studies: [STUDY.seiler2010, STUDY.stoeggl2014, STUDY.esteve2007],
    progressionDE: 'Die kurzen Einheiten wachsen alle 2 Wochen um 5 Minuten (25→40 min), der lange Lauf jede Woche um 5 Minuten mit Entlastungswochen (35→60 min). Tempo-Kontrolle: Du musst dich in ganzen Sätzen unterhalten können (RPE 3–4, Zone 2). Wenn nicht — langsamer.',
    progressionEN: 'The short sessions grow by 5 minutes every 2 weeks (25→40 min), the long run by 5 minutes weekly with recovery weeks (35→60 min). Pace check: you must be able to talk in full sentences (RPE 3–4, zone 2). If not — slow down.',
    level: 'beginner',
    duration_weeks: 8,
    sessions_per_week: 3,
    goal: 'maintenance',
    days: {
      mon: null,
      tue: { label: 'Zone 2', sessionId: 'a', exerciseId: 'running', ...zone2(1500) },
      wed: null,
      thu: { label: 'Zone 2', sessionId: 'c', exerciseId: 'cycling', ...zone2(1500) },
      fri: null,
      sat: { label: 'Langer Lauf', sessionId: 'l', exerciseId: 'running', ...zone2(2100) },
      sun: null,
    },
    weeks: [
      {},
      { l: zone2(2400) },
      { a: zone2(1800), c: zone2(1800), l: zone2(2700) },
      { a: zone2(1800), c: zone2(1800), l: zone2(2100) },
      { a: zone2(2100), c: zone2(2100), l: zone2(3000) },
      { a: zone2(2100), c: zone2(2100), l: zone2(3300) },
      { a: zone2(2400), c: zone2(2400), l: zone2(2700) },
      { a: zone2(2400), c: zone2(2400), l: zone2(3600) },
    ],
  },
  {
    id: '10k_training',
    category: 'cardio',
    nameDE: '10K Training',
    nameEN: '10K Training',
    descDE: 'Strukturierte 10-km-Vorbereitung in 10 Wochen: Intervalle, Tempolauf, lockerer Lauf und langer Lauf.',
    descEN: 'Structured 10K preparation in 10 weeks: intervals, tempo run, easy run and long run.',
    whyDE: 'Der Klassiker der Laufplanung nach dem 80/20-Prinzip: Zwei harte Einheiten pro Woche (VO₂max-Intervalle + Tempolauf) liefern den Leistungsreiz, zwei lockere Einheiten bauen die Ausdauerbasis. Der lange Lauf wächst progressiv mit Entlastungswochen, die letzten zwei Wochen wird tapert — du stehst frisch an der Startlinie.',
    whyEN: 'The classic of run planning built on the 80/20 principle: two hard sessions per week (VO₂max intervals + tempo run) provide the performance stimulus, two easy sessions build the endurance base. The long run grows progressively with recovery weeks, and the final two weeks taper — you arrive at the start line fresh.',
    studies: [STUDY.esteve2007, STUDY.billat1999, STUDY.seiler2010],
    progressionDE: 'Intervalle: 4→6×3 Minuten (RPE 9). Tempolauf: 15→25 Minuten „komfortabel hart" (RPE 7). Langer Lauf: 40→70 Minuten locker mit Entlastung in Woche 4 und 7. Wochen 9–10: Taper — Umfang runter, Frische rauf. Der lockere Donnerstagslauf bleibt immer locker.',
    progressionEN: 'Intervals: 4→6×3 minutes (RPE 9). Tempo run: 15→25 minutes "comfortably hard" (RPE 7). Long run: 40→70 minutes easy with recovery in weeks 4 and 7. Weeks 9–10: taper — volume down, freshness up. The easy Thursday run always stays easy.',
    level: 'intermediate',
    duration_weeks: 10,
    sessions_per_week: 4,
    goal: 'maintenance',
    days: {
      mon: { label: 'Intervalle', sessionId: 'i', exerciseId: 'running', ...run10kIntervals(4) },
      tue: null,
      wed: { label: 'Tempolauf', sessionId: 't', exerciseId: 'running', ...run10kTempo(900) },
      thu: { label: 'Lockerer Lauf', sessionId: 'e', exerciseId: 'running', ...cardioSession({ intensity: { rpe: 3, hrZone: 2 } }, [{ phase: 'steady', duration: 1800, rpe: 3 }]) },
      fri: null,
      sat: { label: 'Langer Lauf', sessionId: 'l', exerciseId: 'running', ...run10kLong(2400) },
      sun: null,
    },
    weeks: [
      {},
      { l: run10kLong(2700) },
      { i: run10kIntervals(5), t: run10kTempo(1200), l: run10kLong(3000) },
      { i: run10kIntervals(5), t: run10kTempo(1200), l: run10kLong(2400) },
      { i: run10kIntervals(5), t: run10kTempo(1200), l: run10kLong(3300) },
      { i: run10kIntervals(6), t: run10kTempo(1500), l: run10kLong(3600) },
      { i: run10kIntervals(6), t: run10kTempo(1500), l: run10kLong(3000) },
      { i: run10kIntervals(6), t: run10kTempo(1500), l: run10kLong(3900) },
      { i: run10kIntervals(4), t: run10kTempo(900), l: run10kLong(3000) },
      { i: run10kIntervals(3), t: run10kTempo(600), l: run10kLong(2400) },
    ],
  },

  // ═══════════════════ HIIT (5) ═══════════════════

  {
    id: 'tabata_classic',
    category: 'hiit',
    nameDE: 'Tabata Classic',
    nameEN: 'Tabata Classic',
    descDE: 'Das originale Tabata-Protokoll: 20 Sekunden Vollgas, 10 Sekunden Pause — mit steigender Rundenzahl.',
    descEN: 'The original Tabata protocol: 20 seconds all-out, 10 seconds rest — with increasing rounds.',
    whyDE: 'Das berühmteste HIIT-Protokoll der Welt, 1996 an japanischen Eisschnellläufern erforscht: 8 Runden à 20/10 verbesserten aerobe UND anaerobe Kapazität gleichzeitig — etwas, das moderates Dauertraining nicht schafft. Entscheidend ist die Intensität: „Vollgas" heißt wirklich Vollgas.',
    whyEN: 'The most famous HIIT protocol in the world, researched on Japanese speed skaters in 1996: 8 rounds of 20/10 improved aerobic AND anaerobic capacity simultaneously — something moderate steady-state training cannot do. Intensity is everything: "all-out" really means all-out.',
    studies: [STUDY.tabata1996, STUDY.weston2014],
    progressionDE: 'Wochen 1–2: 8 Runden (1 Tabata-Block, 4 Minuten). Wochen 3–4: 12 Runden. Wochen 5–6: 16 Runden (2 Blöcke). Jede Arbeitsphase bei RPE 9–10 — wenn du die letzten Runden nicht mehr sauber schaffst, bleib eine Woche länger auf der aktuellen Stufe.',
    progressionEN: 'Weeks 1–2: 8 rounds (1 Tabata block, 4 minutes). Weeks 3–4: 12 rounds. Weeks 5–6: 16 rounds (2 blocks). Every work phase at RPE 9–10 — if you can no longer complete the final rounds cleanly, stay on the current level one more week.',
    level: 'intermediate',
    duration_weeks: 6,
    sessions_per_week: 3,
    goal: 'weight_loss',
    days: {
      mon: { label: 'Tabata', type: 'hiit', sessionId: 'tab', rounds: 8, workTime: 20, restTime: 10, exercises: ['burpees', 'mountain-climbers', 'jump-squats', 'push-ups'] },
      tue: null,
      wed: { label: 'Tabata', type: 'hiit', sessionId: 'tab', rounds: 8, workTime: 20, restTime: 10, exercises: ['high-knees', 'plank-jacks', 'jump-squats', 'bicycle-crunch'] },
      thu: null,
      fri: { label: 'Tabata', type: 'hiit', sessionId: 'tab', rounds: 8, workTime: 20, restTime: 10, exercises: ['burpees', 'lunges', 'push-ups', 'mountain-climbers'] },
      sat: null,
      sun: null,
    },
    weeks: [
      {}, {},
      { tab: { rounds: 12 } }, { tab: { rounds: 12 } },
      { tab: { rounds: 16 } }, { tab: { rounds: 16 } },
    ],
  },
  {
    id: 'gibala_sit',
    category: 'hiit',
    nameDE: 'Gibala-Protokoll 60/75',
    nameEN: 'Gibala Protocol 60/75',
    descDE: 'Das „praktische SIT" aus der Forschung: 8–12 Intervalle à 60 Sekunden hart, 75 Sekunden Pause.',
    descEN: 'The "practical SIT" from research: 8–12 intervals of 60 seconds hard, 75 seconds rest.',
    whyDE: 'Martin Gibalas Arbeitsgruppe zeigte, dass wenige Minuten intensiver Intervalle ähnliche Zell-Anpassungen auslösen wie das Vielfache an klassischem Ausdauertraining. Die 60/75-Variante ist die alltagstaugliche Version: hart, aber ohne Maximalsprints — dadurch sicher und für Ganzkörper-Übungen geeignet.',
    whyEN: 'Martin Gibala’s research group showed that a few minutes of intense intervals trigger similar cellular adaptations as many times the amount of traditional endurance training. The 60/75 variant is the everyday version: hard, but without maximal sprints — making it safe and suitable for full-body exercises.',
    studies: [STUDY.gibala2006, STUDY.little2010],
    progressionDE: 'Wochen 1–2: 8 Intervalle. Wochen 3–4: 10 Intervalle. Wochen 5–6: 12 Intervalle. Arbeitsphasen bei RPE 8–9 („sehr hart, aber 60 Sekunden durchhaltbar"), Pausen aktiv locker bewegen statt stillstehen.',
    progressionEN: 'Weeks 1–2: 8 intervals. Weeks 3–4: 10 intervals. Weeks 5–6: 12 intervals. Work phases at RPE 8–9 ("very hard but sustainable for 60 seconds"), keep moving lightly during rests instead of standing still.',
    level: 'intermediate',
    duration_weeks: 6,
    sessions_per_week: 3,
    goal: 'weight_loss',
    days: {
      mon: { label: 'SIT 60/75', type: 'hiit', sessionId: 'sit', rounds: 8, workTime: 60, restTime: 75, exercises: ['burpees', 'high-knees', 'jump-squats', 'mountain-climbers'] },
      tue: null,
      wed: { label: 'SIT 60/75', type: 'hiit', sessionId: 'sit', rounds: 8, workTime: 60, restTime: 75, exercises: ['jumping-jacks', 'jump-lunges', 'plank-jacks', 'high-knees'] },
      thu: null,
      fri: { label: 'SIT 60/75', type: 'hiit', sessionId: 'sit', rounds: 8, workTime: 60, restTime: 75, exercises: ['burpees', 'jump-squats', 'mountain-climbers', 'jumping-jacks'] },
      sat: null,
      sun: null,
    },
    weeks: [
      {}, {},
      { sit: { rounds: 10 } }, { sit: { rounds: 10 } },
      { sit: { rounds: 12 } }, { sit: { rounds: 12 } },
    ],
  },
  {
    id: 'hiit_beginner',
    category: 'hiit',
    nameDE: 'HIIT Einsteiger 30/30',
    nameEN: 'HIIT Beginner 30/30',
    descDE: 'Sanfter Einstieg ins Intervalltraining: 30 Sekunden Arbeit, 30 Sekunden Pause — von 6 auf 10 Runden.',
    descEN: 'Gentle introduction to interval training: 30 seconds work, 30 seconds rest — from 6 up to 10 rounds.',
    whyDE: 'Das 1:1-Verhältnis aus Arbeit und Pause ist der ideale HIIT-Einstieg: intensiv genug für die nachgewiesenen Fitness-Effekte, aber mit genug Erholung, um die Technik sauber zu halten. HIIT verbessert die Fitness laut Meta-Analysen fast doppelt so stark wie moderates Dauertraining — bei einem Bruchteil der Zeit.',
    whyEN: 'The 1:1 work-to-rest ratio is the ideal HIIT entry point: intense enough for the proven fitness effects, but with enough recovery to keep technique clean. According to meta-analyses HIIT improves fitness nearly twice as much as moderate steady-state training — in a fraction of the time.',
    studies: [STUDY.weston2014, STUDY.milanovic2015],
    progressionDE: 'Wochen 1–2: 6 Runden. Wochen 3–4: 8 Runden. Wochen 5–6: 10 Runden. Arbeitsphasen bei RPE 7–8 — du solltest am Ende jeder Pause wieder bereit sein. Qualität vor Tempo: saubere Wiederholungen zählen mehr als viele.',
    progressionEN: 'Weeks 1–2: 6 rounds. Weeks 3–4: 8 rounds. Weeks 5–6: 10 rounds. Work phases at RPE 7–8 — you should feel ready again by the end of each rest. Quality over speed: clean reps count more than many.',
    level: 'beginner',
    duration_weeks: 6,
    sessions_per_week: 3,
    goal: 'weight_loss',
    days: {
      mon: { label: 'HIIT 30/30', type: 'hiit', sessionId: 'h', rounds: 6, workTime: 30, restTime: 30, exercises: ['jumping-jacks', 'bodyweight-squats', 'push-ups', 'high-knees'] },
      tue: null,
      wed: { label: 'HIIT 30/30', type: 'hiit', sessionId: 'h', rounds: 6, workTime: 30, restTime: 30, exercises: ['lunges', 'plank', 'mountain-climbers', 'jump-squats'] },
      thu: null,
      fri: { label: 'HIIT 30/30', type: 'hiit', sessionId: 'h', rounds: 6, workTime: 30, restTime: 30, exercises: ['burpees', 'bicycle-crunch', 'push-ups', 'jumping-jacks'] },
      sat: null,
      sun: null,
    },
    weeks: [
      {}, {},
      { h: { rounds: 8 } }, { h: { rounds: 8 } },
      { h: { rounds: 10 } }, { h: { rounds: 10 } },
    ],
  },
  {
    id: 'hiit_advanced',
    category: 'hiit',
    nameDE: 'HIIT Advanced 40/15',
    nameEN: 'HIIT Advanced 40/15',
    descDE: 'Intensives HIIT für Fortgeschrittene: 40 Sekunden Arbeit, nur 15 Sekunden Pause, bis zu 12 Runden.',
    descEN: 'Intense HIIT for advanced athletes: 40 seconds work, only 15 seconds rest, up to 12 rounds.',
    whyDE: 'Das kurze Pausenverhältnis (fast 3:1) hält die Herzfrequenz durchgehend hoch — dadurch trainierst du die Fähigkeit, unter Ermüdung weiter Leistung zu bringen. Vier thematische Einheiten pro Woche (Power, Core, Beine, Ganzkörper) verteilen die Belastung über verschiedene Muskelgruppen.',
    whyEN: 'The short rest ratio (nearly 3:1) keeps heart rate elevated throughout — training your ability to keep producing power under fatigue. Four themed sessions per week (power, core, legs, full body) spread the load across different muscle groups.',
    studies: [STUDY.milanovic2015, STUDY.weston2014],
    progressionDE: 'Wochen 1–2: 8 Runden. Wochen 3–6: 10 Runden. Wochen 7–8: 12 Runden. Arbeitsphasen bei RPE 8–9. Wenn die Form bricht, beende die Runde früher — Verletzungsfreiheit schlägt Rundenzahl.',
    progressionEN: 'Weeks 1–2: 8 rounds. Weeks 3–6: 10 rounds. Weeks 7–8: 12 rounds. Work phases at RPE 8–9. If form breaks down, end the round early — staying injury-free beats round count.',
    level: 'advanced',
    duration_weeks: 8,
    sessions_per_week: 4,
    goal: 'weight_loss',
    days: {
      mon: { label: 'HIIT Power', type: 'hiit', sessionId: 'h', rounds: 8, workTime: 40, restTime: 15, exercises: ['burpees', 'box-jumps', 'push-ups', 'mountain-climbers', 'jump-squats'] },
      tue: null,
      wed: { label: 'HIIT Core', type: 'hiit', sessionId: 'h', rounds: 8, workTime: 40, restTime: 15, exercises: ['plank-jacks', 'bicycle-crunch', 'leg-raise-lying', 'russian-twist', 'mountain-climbers'] },
      thu: { label: 'HIIT Legs', type: 'hiit', sessionId: 'h', rounds: 8, workTime: 40, restTime: 15, exercises: ['jump-squats', 'lunges', 'high-knees', 'jump-lunges', 'wall-sit'] },
      fri: null,
      sat: { label: 'HIIT Full', type: 'hiit', sessionId: 'h', rounds: 8, workTime: 40, restTime: 15, exercises: ['burpees', 'push-ups', 'jump-squats', 'mountain-climbers', 'plank'] },
      sun: null,
    },
    weeks: [
      {}, {},
      { h: { rounds: 10 } }, { h: { rounds: 10 } }, { h: { rounds: 10 } }, { h: { rounds: 10 } },
      { h: { rounds: 12 } }, { h: { rounds: 12 } },
    ],
  },
  {
    id: 'emom_challenge',
    category: 'hiit',
    nameDE: 'EMOM Challenge',
    nameEN: 'EMOM Challenge',
    descDE: 'Every Minute On the Minute: Jede Minute startet eine neue Übung — die Pause ist, was von der Minute übrig bleibt.',
    descEN: 'Every Minute On the Minute: a new exercise starts each minute — your rest is whatever remains of the minute.',
    whyDE: 'EMOM ist eingebautes Pacing: Wer schneller arbeitet, verdient sich mehr Pause — das hält die Dichte hoch und lehrt gleichmäßiges Tempo. Ganzkörper-Intervalle dieser Art verbessern Ausdauer und Kraftausdauer gleichzeitig, wie Studien zu minimalistischen Ganzkörper-Protokollen zeigen.',
    whyEN: 'EMOM has pacing built in: work faster and you earn more rest — keeping density high and teaching even pacing. Whole-body intervals of this kind improve endurance and muscular endurance simultaneously, as studies on minimalist whole-body protocols show.',
    studies: [STUDY.mcrae2012, STUDY.milanovic2015],
    progressionDE: 'Wochen 1–2: Basis-Runden (10–15 je nach Tag). Wochen 3–4: +2 Runden. Wochen 5–6: +2 weitere Runden. Wähle die Wiederholungszahl pro Minute so, dass ~15–20 Sekunden Pause übrig bleiben — bleibt keine Pause mehr, reduziere die Wiederholungen.',
    progressionEN: 'Weeks 1–2: base rounds (10–15 depending on the day). Weeks 3–4: +2 rounds. Weeks 5–6: +2 more rounds. Pick a rep count per minute that leaves ~15–20 seconds of rest — if no rest remains, reduce the reps.',
    level: 'advanced',
    duration_weeks: 6,
    sessions_per_week: 4,
    goal: 'weight_loss',
    days: {
      mon: { label: 'EMOM Upper', type: 'hiit', sessionId: 'up', rounds: 12, workTime: 40, restTime: 20, exercises: ['push-ups', 'pull-ups', 'tricep-dips', 'plank'] },
      tue: { label: 'EMOM Lower', type: 'hiit', sessionId: 'lo', rounds: 12, workTime: 40, restTime: 20, exercises: ['jump-squats', 'lunges', 'calf-raise-standing', 'wall-sit'] },
      wed: null,
      thu: null,
      fri: { label: 'EMOM Full', type: 'hiit', sessionId: 'fu', rounds: 15, workTime: 40, restTime: 20, exercises: ['burpees', 'push-ups', 'jump-squats', 'mountain-climbers', 'plank'] },
      sat: { label: 'EMOM Core', type: 'hiit', sessionId: 'co', rounds: 10, workTime: 40, restTime: 20, exercises: ['plank', 'bicycle-crunch', 'leg-raise-lying', 'russian-twist'] },
      sun: null,
    },
    weeks: [
      {}, {},
      { up: { rounds: 14 }, lo: { rounds: 14 }, fu: { rounds: 17 }, co: { rounds: 12 } },
      { up: { rounds: 14 }, lo: { rounds: 14 }, fu: { rounds: 17 }, co: { rounds: 12 } },
      { up: { rounds: 16 }, lo: { rounds: 16 }, fu: { rounds: 19 }, co: { rounds: 14 } },
      { up: { rounds: 16 }, lo: { rounds: 16 }, fu: { rounds: 19 }, co: { rounds: 14 } },
    ],
  },

  // ═══════════════════ MARTIAL ARTS (5) ═══════════════════

  {
    id: 'boxing_basics',
    category: 'martial_arts',
    nameDE: 'Boxen Grundlagen',
    nameEN: 'Boxing Basics',
    descDE: 'Lerne die Grundlagen des Boxens: Jab, Cross, Haken, Beinarbeit — in klassischen 3-Minuten-Runden.',
    descEN: 'Learn the basics of boxing: jab, cross, hooks, footwork — in classic 3-minute rounds.',
    whyDE: 'Boxtraining in 3-Minuten-Runden ist verstecktes HIIT: Die Herzfrequenz pendelt zwischen intensiver Arbeit und kurzer Pause, während du gleichzeitig Koordination und Technik lernst. Jede Einheit hat einen Schwerpunkt — so baust du Woche für Woche ein sauberes Fundament auf.',
    whyEN: 'Boxing training in 3-minute rounds is HIIT in disguise: heart rate cycles between intense work and short rest while you learn coordination and technique at the same time. Every session has a focus — building a clean foundation week by week.',
    studies: [STUDY.chaabene2015, STUDY.ouergui2014],
    progressionDE: 'Wochen 1–2: 6 Runden (Freitag 8). Wochen 3–4: +1 Runde pro Einheit. Wochen 5–6: +1 weitere Runde. Erst Technik, dann Tempo: Schlag-Kombinationen langsam sauber, dann schneller. Die letzte Runde jeder Einheit darf „Kondition pur" sein.',
    progressionEN: 'Weeks 1–2: 6 rounds (Friday 8). Weeks 3–4: +1 round per session. Weeks 5–6: +1 more round. Technique first, then speed: drill combinations slowly and cleanly, then faster. The final round of each session can be pure conditioning.',
    level: 'beginner',
    duration_weeks: 6,
    sessions_per_week: 3,
    goal: 'weight_loss',
    days: {
      mon: { label: 'Boxen: Technik', type: 'martial_arts', sessionId: 'a', rounds: 6, workTime: 180, restTime: 60, exercises: ['shadow-boxing', 'jab-cross', 'hooks', 'footwork-drills'], focusDE: 'Grundschläge & Stand', focusEN: 'Basic punches & stance' },
      tue: null,
      wed: { label: 'Boxen: Kombis', type: 'martial_arts', sessionId: 'b', rounds: 6, workTime: 180, restTime: 60, exercises: ['jab-cross', 'uppercuts', 'heavy-bag-rounds', 'jump-rope'], focusDE: 'Kombinationen & Schlagkraft', focusEN: 'Combinations & punching power' },
      thu: null,
      fri: { label: 'Boxen: Kondition', type: 'martial_arts', sessionId: 'c', rounds: 8, workTime: 180, restTime: 60, exercises: ['shadow-boxing', 'heavy-bag-rounds', 'speed-bag', 'footwork-drills'], focusDE: 'Runden-Ausdauer', focusEN: 'Round endurance' },
      sat: null,
      sun: null,
    },
    weeks: [
      {}, {},
      { a: { rounds: 7 }, b: { rounds: 7 }, c: { rounds: 9 } },
      { a: { rounds: 7 }, b: { rounds: 7 }, c: { rounds: 9 } },
      { a: { rounds: 8 }, b: { rounds: 8 }, c: { rounds: 10 } },
      { a: { rounds: 8 }, b: { rounds: 8 }, c: { rounds: 10 } },
    ],
  },
  {
    id: 'kickboxing_conditioning',
    category: 'martial_arts',
    nameDE: 'Kickboxen Kondition',
    nameEN: 'Kickboxing Conditioning',
    descDE: 'Kickbox-Training mit Fokus auf Kondition und Technik: Tritte, Schläge und Kombinationen in Runden.',
    descEN: 'Kickboxing training focused on conditioning and technique: kicks, punches and combos in rounds.',
    whyDE: 'Kickboxen kombiniert Ober- und Unterkörper wie kaum ein anderer Sport: Tritte fordern Beine, Hüfte und Rumpf, Schläge Schultern und Arme. Studien zeigen, dass Kickbox-Runden die Herzfrequenz nahe ans Maximum treiben — du bekommst HIIT-Effekte und Beweglichkeit in einem.',
    whyEN: 'Kickboxing combines upper and lower body like almost no other sport: kicks demand legs, hips and core, punches shoulders and arms. Studies show kickboxing rounds push heart rate near maximum — you get HIIT effects and mobility in one.',
    studies: [STUDY.ouergui2014, STUDY.milanovic2015],
    progressionDE: 'Woche 4: +1 Runde in jeder Einheit. Woche 7: nochmals +1 Runde. Techniktage vor Konditionstagen: Lerne neue Tritte langsam an der Luft, bevor du sie unter Ermüdung ausführst. Beweglichkeit der Hüfte täglich kurz dehnen.',
    progressionEN: 'Week 4: +1 round in every session. Week 7: +1 more round. Technique days before conditioning days: learn new kicks slowly in the air before performing them under fatigue. Stretch hip mobility briefly every day.',
    level: 'intermediate',
    duration_weeks: 8,
    sessions_per_week: 4,
    goal: 'weight_loss',
    days: {
      mon: { label: 'Kickboxen: Technik', type: 'martial_arts', sessionId: 'a', rounds: 8, workTime: 180, restTime: 60, exercises: ['jab-cross', 'front-kick', 'roundhouse-kick-drill', 'shadow-boxing'], focusDE: 'Tritt-Technik', focusEN: 'Kick technique' },
      tue: { label: 'Kondition', type: 'martial_arts', sessionId: 'b', rounds: 6, workTime: 120, restTime: 30, exercises: ['jump-rope', 'burpees', 'high-knees', 'shadow-boxing'], focusDE: 'Explosivität & Ausdauer', focusEN: 'Explosiveness & endurance' },
      wed: null,
      thu: { label: 'Kickboxen: Kombis', type: 'martial_arts', sessionId: 'c', rounds: 8, workTime: 180, restTime: 60, exercises: ['hooks', 'knee-strikes', 'roundhouse-kick-drill', 'heavy-bag-rounds'], focusDE: 'Schlag-Tritt-Kombinationen', focusEN: 'Punch-kick combinations' },
      fri: null,
      sat: { label: 'Sparring-Drill', type: 'martial_arts', sessionId: 'd', rounds: 10, workTime: 180, restTime: 60, exercises: ['shadow-boxing', 'jab-cross', 'front-kick', 'footwork-drills'], focusDE: 'Kampf-Simulation', focusEN: 'Fight simulation' },
      sun: null,
    },
    weeks: [
      {}, {}, {},
      { a: { rounds: 9 }, b: { rounds: 7 }, c: { rounds: 9 }, d: { rounds: 11 } },
      { a: { rounds: 9 }, b: { rounds: 7 }, c: { rounds: 9 }, d: { rounds: 11 } },
      { a: { rounds: 9 }, b: { rounds: 7 }, c: { rounds: 9 }, d: { rounds: 11 } },
      { a: { rounds: 10 }, b: { rounds: 8 }, c: { rounds: 10 }, d: { rounds: 12 } },
      { a: { rounds: 10 }, b: { rounds: 8 }, c: { rounds: 10 }, d: { rounds: 12 } },
    ],
  },
  {
    id: 'mma_fundamentals',
    category: 'martial_arts',
    nameDE: 'MMA Grundlagen',
    nameEN: 'MMA Fundamentals',
    descDE: 'Mixed-Martial-Arts-Einstieg: Striking, Tritte und kampfspezifische Kondition in einer Woche vereint.',
    descEN: 'Mixed martial arts entry: striking, kicks and fight-specific conditioning combined in one week.',
    whyDE: 'MMA ist der vielseitigste Kampfsport: Schlagen, Treten und Bodenkampf fordern Kraft, Schnelligkeit und Ausdauer gleichzeitig. Die Sportwissenschaft empfiehlt genau das, was dieses Programm abbildet — rundenbasiertes Training mit wechselnden Schwerpunkten plus einen dedizierten Konditionstag mit Sprawls und Seilspringen.',
    whyEN: 'MMA is the most versatile combat sport: striking, kicking and grappling demand strength, speed and endurance simultaneously. Sports science recommends exactly what this program delivers — round-based training with rotating focuses plus a dedicated conditioning day with sprawls and rope work.',
    studies: [STUDY.james2016, STUDY.chaabene2015],
    progressionDE: 'Woche 4: Striking 8→9 Runden, Kondition 5→6 Runden. Woche 7: Kicks 6→7 Runden. Der lange Samstag (5-Minuten-Runden wie im echten MMA) bleibt konstant — dort zählt Qualität unter Ermüdung, nicht mehr Volumen.',
    progressionEN: 'Week 4: striking 8→9 rounds, conditioning 5→6 rounds. Week 7: kicks 6→7 rounds. The long Saturday (5-minute rounds like real MMA) stays constant — there it is about quality under fatigue, not more volume.',
    level: 'intermediate',
    duration_weeks: 8,
    sessions_per_week: 4,
    goal: 'maintenance',
    days: {
      mon: { label: 'Striking', type: 'martial_arts', sessionId: 'st', rounds: 8, workTime: 180, restTime: 60, exercises: ['jab-cross', 'hooks', 'uppercuts', 'elbow-strikes'], focusDE: 'Schlagtechnik', focusEN: 'Striking technique' },
      tue: { label: 'Kicks', type: 'martial_arts', sessionId: 'ki', rounds: 6, workTime: 180, restTime: 60, exercises: ['front-kick', 'roundhouse-kick-drill', 'knee-strikes', 'footwork-drills'], focusDE: 'Tritte & Knie', focusEN: 'Kicks & knees' },
      wed: null,
      thu: { label: 'Conditioning', type: 'martial_arts', sessionId: 'co', rounds: 5, workTime: 120, restTime: 30, exercises: ['burpees', 'sprawl-drill', 'jump-rope', 'shadow-boxing'], focusDE: 'Kampf-Kondition', focusEN: 'Fight conditioning' },
      fri: null,
      sat: { label: 'Full MMA', type: 'martial_arts', sessionId: 'fu', rounds: 10, workTime: 300, restTime: 60, exercises: ['shadow-boxing', 'heavy-bag-rounds', 'knee-strikes', 'footwork-drills'], focusDE: '5-Minuten-Runden wie im Kampf', focusEN: '5-minute rounds like a real fight' },
      sun: null,
    },
    weeks: [
      {}, {}, {},
      { st: { rounds: 9 }, co: { rounds: 6 } },
      { st: { rounds: 9 }, co: { rounds: 6 } },
      { st: { rounds: 9 }, co: { rounds: 6 } },
      { st: { rounds: 9 }, ki: { rounds: 7 }, co: { rounds: 6 } },
      { st: { rounds: 9 }, ki: { rounds: 7 }, co: { rounds: 6 } },
    ],
  },
  {
    id: 'boxing_advanced',
    category: 'martial_arts',
    nameDE: 'Boxen Fortgeschritten',
    nameEN: 'Boxing Advanced',
    descDE: 'Fortgeschrittenes Boxtraining: höheres Volumen, längere Einheiten, komplexe Kombinationen.',
    descEN: 'Advanced boxing training: higher volume, longer sessions, complex combinations.',
    whyDE: 'Auf fortgeschrittenem Niveau entscheidet die Arbeitskapazität: Elite-Boxer bringen VO₂max-Werte um 60 ml/kg/min mit — aufgebaut durch genau diese Struktur aus Technik-, Sandsack- und Konditionsrunden. Die Sparring-Simulation am Samstag bündelt alles unter kampfnaher Ermüdung.',
    whyEN: 'At the advanced level work capacity decides: elite boxers carry VO₂max values around 60 ml/kg/min — built through exactly this structure of technique, heavy-bag and conditioning rounds. The Saturday sparring simulation brings it all together under fight-like fatigue.',
    studies: [STUDY.chaabene2015, STUDY.helgerud2007],
    progressionDE: 'Woche 4: Technik & Sandsack +1 Runde. Woche 7: nochmals +1 Runde, Kondition 8→10 Runden. Wochen 9–10: Volumen halten, Intensität der Kombinationen steigern (schneller, härter, weniger Pause zwischen Kombos).',
    progressionEN: 'Week 4: technique & heavy bag +1 round. Week 7: +1 more round, conditioning 8→10 rounds. Weeks 9–10: hold volume, increase combination intensity (faster, harder, less pause between combos).',
    level: 'advanced',
    duration_weeks: 10,
    sessions_per_week: 4,
    goal: 'maintenance',
    days: {
      mon: { label: 'Technik', type: 'martial_arts', sessionId: 'te', rounds: 10, workTime: 180, restTime: 60, exercises: ['shadow-boxing', 'jab-cross', 'hooks', 'uppercuts'], focusDE: 'Komplexe Kombinationen', focusEN: 'Complex combinations' },
      tue: { label: 'Heavy Bag', type: 'martial_arts', sessionId: 'hb', rounds: 10, workTime: 180, restTime: 60, exercises: ['heavy-bag-rounds', 'speed-bag', 'jab-cross', 'hooks'], focusDE: 'Schlagkraft & Rhythmus', focusEN: 'Power & rhythm' },
      wed: null,
      thu: null,
      fri: { label: 'Kondition', type: 'martial_arts', sessionId: 'ko', rounds: 8, workTime: 120, restTime: 30, exercises: ['jump-rope', 'burpees', 'shadow-boxing', 'footwork-drills'], focusDE: 'Arbeitskapazität', focusEN: 'Work capacity' },
      sat: { label: 'Sparring-Simulation', type: 'martial_arts', sessionId: 'sp', rounds: 12, workTime: 180, restTime: 60, exercises: ['shadow-boxing', 'heavy-bag-rounds', 'jab-cross', 'uppercuts', 'footwork-drills'], focusDE: 'Alles unter Ermüdung', focusEN: 'Everything under fatigue' },
      sun: null,
    },
    weeks: [
      {}, {}, {},
      { te: { rounds: 11 }, hb: { rounds: 11 } },
      { te: { rounds: 11 }, hb: { rounds: 11 } },
      { te: { rounds: 11 }, hb: { rounds: 11 } },
      { te: { rounds: 12 }, hb: { rounds: 12 }, ko: { rounds: 10 } },
      { te: { rounds: 12 }, hb: { rounds: 12 }, ko: { rounds: 10 } },
      { te: { rounds: 12 }, hb: { rounds: 12 }, ko: { rounds: 10 } },
      { te: { rounds: 12 }, hb: { rounds: 12 }, ko: { rounds: 10 } },
    ],
  },
  {
    id: 'combat_fitness',
    category: 'martial_arts',
    nameDE: 'Combat Fitness',
    nameEN: 'Combat Fitness',
    descDE: 'Kampfsport-inspiriertes Fitnesstraining ohne Vorkenntnisse: Box- und Kick-Elemente als Ganzkörper-Workout.',
    descEN: 'Combat-inspired fitness training with no prerequisites: boxing and kicking elements as a full-body workout.',
    whyDE: 'Der Einstieg für alle, die Kampfsport-Fitness ohne Wettkampfambition wollen: Schattenboxen, Tritte und Bodyweight-Übungen in kurzen 2-Minuten-Runden. Rundentraining wirkt physiologisch wie Intervalltraining — mit dem Motivations-Bonus, dabei echte Techniken zu lernen.',
    whyEN: 'The entry point for anyone wanting combat fitness without competitive ambition: shadow boxing, kicks and bodyweight exercises in short 2-minute rounds. Round training physiologically works like interval training — with the motivational bonus of learning real techniques.',
    studies: [STUDY.ouergui2014, STUDY.weston2014],
    progressionDE: 'Woche 3: 1 Runde mehr pro Einheit. Woche 5: Runden von 2:00 auf 2:30 verlängert. Halte die Pausen diszipliniert bei 60 Sekunden — der Fitness-Effekt kommt aus dem Verhältnis von Arbeit zu Pause.',
    progressionEN: 'Week 3: 1 more round per session. Week 5: rounds extended from 2:00 to 2:30. Keep rests disciplined at 60 seconds — the fitness effect comes from the work-to-rest ratio.',
    level: 'beginner',
    duration_weeks: 6,
    sessions_per_week: 3,
    goal: 'weight_loss',
    days: {
      mon: { label: 'Boxing Fit', type: 'martial_arts', sessionId: 'a', rounds: 5, workTime: 120, restTime: 60, exercises: ['shadow-boxing', 'jab-cross', 'jump-rope', 'push-ups'], focusDE: 'Schläge & Oberkörper', focusEN: 'Punches & upper body' },
      tue: null,
      wed: { label: 'Kick Fit', type: 'martial_arts', sessionId: 'b', rounds: 5, workTime: 120, restTime: 60, exercises: ['front-kick', 'roundhouse-kick-drill', 'jump-squats', 'high-knees'], focusDE: 'Tritte & Beine', focusEN: 'Kicks & legs' },
      thu: null,
      fri: null,
      sat: { label: 'Combat Mix', type: 'martial_arts', sessionId: 'c', rounds: 6, workTime: 120, restTime: 60, exercises: ['shadow-boxing', 'knee-strikes', 'burpees', 'footwork-drills'], focusDE: 'Alles kombiniert', focusEN: 'Everything combined' },
      sun: null,
    },
    weeks: [
      {}, {},
      { a: { rounds: 6 }, b: { rounds: 6 }, c: { rounds: 7 } },
      { a: { rounds: 6 }, b: { rounds: 6 }, c: { rounds: 7 } },
      { a: { rounds: 6, workTime: 150 }, b: { rounds: 6, workTime: 150 }, c: { rounds: 7, workTime: 150 } },
      { a: { rounds: 6, workTime: 150 }, b: { rounds: 6, workTime: 150 }, c: { rounds: 7, workTime: 150 } },
    ],
  },
];

// ── Dev-Validator: Content-Fehler sofort in der Konsole melden ──
// (Lehre aus dem Vorfall mit 28 kaputten Übungs-IDs.)
// `?.` statt `.`: Ausserhalb von Vite (Pruefskripte in `scripts/`, die diese
// Datei direkt per node importieren) gibt es `import.meta.env` gar nicht — ohne
// den Fragezeichen-Punkt bricht schon der Import ab.
if (import.meta.env?.DEV) {
  import('./exercises').then(({ getExerciseById }) => {
    const DAY_KEYS = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];
    peakPrograms.forEach((p) => {
      const sessionIds = new Set();
      DAY_KEYS.forEach((k) => {
        const day = p.days[k];
        if (!day) return;
        if (day.sessionId) sessionIds.add(day.sessionId);
        const ids = day.type === 'strength'
          ? (day.exercises || []).map((e) => e.id)
          : Array.isArray(day.exercises) ? day.exercises : (day.exerciseId ? [day.exerciseId] : []);
        ids.forEach((id) => {
          if (!getExerciseById(id)) console.warn(`[peakPrograms] ${p.id}/${k}: unbekannte Übungs-ID "${id}"`);
        });
        if (day.type === 'cardio') {
          if (!Array.isArray(day.segments) || day.segments.length === 0) {
            console.warn(`[peakPrograms] ${p.id}/${k}: Cardio-Tag ohne segments`);
          } else if (sum(day.segments) !== day.targetDuration) {
            console.warn(`[peakPrograms] ${p.id}/${k}: targetDuration ${day.targetDuration} ≠ Segment-Summe ${sum(day.segments)}`);
          }
        }
      });
      if (p.weeks) {
        if (p.weeks.length !== p.duration_weeks) {
          console.warn(`[peakPrograms] ${p.id}: weeks-Länge ${p.weeks.length} ≠ duration_weeks ${p.duration_weeks}`);
        }
        p.weeks.forEach((week, i) => {
          Object.keys(week || {}).forEach((sid) => {
            if (!sessionIds.has(sid)) console.warn(`[peakPrograms] ${p.id}: weeks[${i}] referenziert unbekannte sessionId "${sid}"`);
          });
        });
      }
    });
  });
}
