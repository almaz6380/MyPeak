// Reine Rechenfunktionen für die Statistikseite (Premium). Kein React, kein
// Speicher — damit sie ohne Browser testbar sind (tests/lib/statistik.test.js).
import { toLocalDateString } from './dateUtils.js';

const toKg = (v, unit) => (unit === 'lbs' ? v * 0.453592 : v);

// Montag der Woche, in der `datum` liegt (lokal, 12:00 gegen Zeitumstellungen).
export function wochenStart(datum) {
  const d = new Date(datum.getFullYear(), datum.getMonth(), datum.getDate(), 12);
  const tag = (d.getDay() + 6) % 7; // Mo = 0
  d.setDate(d.getDate() - tag);
  return d;
}

function verschoben(datum, tage) {
  const d = new Date(datum);
  d.setDate(d.getDate() + tage);
  return d;
}

export function workoutVolumenKg(workout) {
  let summe = 0;
  for (const ex of workout?.exercises || []) {
    for (const s of ex.sets || []) {
      summe += toKg((Number(s.weight) || 0) * (Number(s.reps) || 0), ex.unit);
    }
  }
  return summe;
}

// Trainings und Volumen je Woche, älteste zuerst, inkl. der laufenden Woche.
export function wochenUebersicht(workouts, heute = new Date(), wochen = 8) {
  const start = verschoben(wochenStart(heute), -7 * (wochen - 1));
  const liste = Array.from({ length: wochen }, (_, i) => ({
    start: toLocalDateString(verschoben(start, 7 * i)),
    trainings: 0,
    volumenKg: 0,
    minuten: 0,
  }));
  for (const w of workouts || []) {
    if (!w?.date) continue;
    const d = new Date(w.date + 'T12:00:00');
    const index = Math.floor((wochenStart(d) - start) / (7 * 86400000) + 0.5);
    if (index < 0 || index >= wochen) continue;
    liste[index].trainings += 1;
    liste[index].volumenKg += workoutVolumenKg(w);
    liste[index].minuten += Math.round((Number(w.duration) || 0) / 60);
  }
  for (const w of liste) w.volumenKg = Math.round(w.volumenKg);
  return liste;
}

// Übungen nach Sätzen im Zeitraum, mit bestem Satzgewicht (kg).
export function topUebungen(workouts, abDatum, anzahl = 5) {
  const je = {};
  for (const w of workouts || []) {
    if (!w?.date || w.date < abDatum) continue;
    for (const ex of w.exercises || []) {
      if (!ex?.exerciseId || !ex.sets?.length) continue;
      const e = (je[ex.exerciseId] ||= { exerciseId: ex.exerciseId, nameKey: ex.nameKey, saetze: 0, volumenKg: 0, bestKg: 0 });
      e.saetze += ex.sets.length;
      for (const s of ex.sets) {
        const kg = toKg(Number(s.weight) || 0, ex.unit);
        e.volumenKg += kg * (Number(s.reps) || 0);
        if (kg > e.bestKg) e.bestKg = kg;
      }
    }
  }
  return Object.values(je)
    .map((e) => ({ ...e, volumenKg: Math.round(e.volumenKg), bestKg: Math.round(e.bestKg * 10) / 10 }))
    .sort((a, b) => b.saetze - a.saetze || b.volumenKg - a.volumenKg)
    .slice(0, anzahl);
}

// Durchschnitt über die Tage MIT Einträgen. Tage ohne Eintrag sind meist
// „nicht geloggt", nicht „nichts gegessen" — sie mitzuzählen drückte den
// Schnitt künstlich und zeigte jedem ein Defizit.
export function ernaehrungsSchnitt(proTag, ziele = {}) {
  const tage = Object.entries(proTag || {}).filter(([, e]) => Array.isArray(e) && e.length > 0);
  const n = tage.length;
  const summe = { calories: 0, protein: 0, carbs: 0, fat: 0 };
  for (const [, eintraege] of tage) {
    for (const e of eintraege) for (const k of Object.keys(summe)) summe[k] += Number(e[k]) || 0;
  }
  const schnitt = {};
  for (const k of Object.keys(summe)) schnitt[k] = n ? Math.round(summe[k] / n) : 0;
  // Tage im Zielkorridor: ±10 % der Kalorien.
  const ziel = Number(ziele.calories) || 0;
  const imZiel = ziel
    ? tage.filter(([, e]) => {
        const kcal = e.reduce((s, x) => s + (Number(x.calories) || 0), 0);
        return Math.abs(kcal - ziel) <= ziel * 0.1;
      }).length
    : 0;
  return { geloggteTage: n, schnitt, imZiel };
}

// Gewichtstrend: erster und letzter Wert im Zeitraum, Änderung je Woche.
export function gewichtsTrend(eintraege, abDatum) {
  const liste = (eintraege || [])
    .filter((e) => e?.date >= abDatum && Number(e.weight_kg ?? e.weight) > 0)
    .map((e) => ({ date: e.date, kg: Number(e.weight_kg ?? e.weight) }))
    .sort((a, b) => a.date.localeCompare(b.date));
  if (liste.length < 2) return { punkte: liste, aenderungKg: null, proWocheKg: null };
  const erst = liste[0];
  const letzt = liste[liste.length - 1];
  const tage = (new Date(letzt.date) - new Date(erst.date)) / 86400000;
  const aenderung = letzt.kg - erst.kg;
  return {
    punkte: liste,
    aenderungKg: Math.round(aenderung * 10) / 10,
    proWocheKg: tage >= 7 ? Math.round((aenderung / tage) * 7 * 100) / 100 : null,
  };
}

// Schritte je Tag aus mehreren Quellen (Health, Geräte-Zähler, eigenes
// Protokoll) zu EINER Liste verschmelzen: je Tag das Höchste, weil jede Quelle
// höchstens unterschätzt (Health ohne Uhr, Gerät erst ab Freigabe). Liefert
// genau `tage` Einträge bis einschließlich `heute`, fehlende Tage mit null.
export function schritteVerschmelzen(quellen, tage, heute = new Date()) {
  const schritte = new Map();
  const kcal = new Map();
  for (const quelle of quellen || []) {
    for (const e of quelle || []) {
      if (!e?.datum) continue;
      if (Number.isFinite(e.schritte)) schritte.set(e.datum, Math.max(schritte.get(e.datum) ?? 0, e.schritte));
      if (Number.isFinite(e.kcal)) kcal.set(e.datum, Math.max(kcal.get(e.datum) ?? 0, e.kcal));
    }
  }
  const mittag = new Date(heute.getFullYear(), heute.getMonth(), heute.getDate(), 12);
  const liste = [];
  for (let i = tage - 1; i >= 0; i -= 1) {
    const datum = toLocalDateString(verschoben(mittag, -i));
    liste.push({ datum, schritte: schritte.get(datum) ?? null, kcal: kcal.get(datum) ?? null });
  }
  return liste;
}

// Kennzahlen zum Schritte-Verlauf. Tage ohne Wert zählen nicht in den Schnitt —
// „nicht gemessen" ist etwas anderes als „nicht gegangen".
export function schrittAuswertung(verlauf, ziel) {
  const gemessen = (verlauf || []).filter((t) => Number.isFinite(t.schritte));
  const summe = gemessen.reduce((s, t) => s + t.schritte, 0);
  const bester = gemessen.reduce((b, t) => (!b || t.schritte > b.schritte ? t : b), null);
  const kcal = (verlauf || []).reduce((s, t) => s + (Number.isFinite(t.kcal) ? t.kcal : 0), 0);
  return {
    tageGemessen: gemessen.length,
    schnitt: gemessen.length ? Math.round(summe / gemessen.length) : 0,
    summe,
    bester,
    zielErreicht: ziel > 0 ? gemessen.filter((t) => t.schritte >= ziel).length : 0,
    kcalSumme: Math.round(kcal),
  };
}
