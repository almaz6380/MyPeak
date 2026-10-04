import { describe, it, expect } from 'vitest';
import {
  wochenStart, wochenUebersicht, topUebungen, ernaehrungsSchnitt, gewichtsTrend, workoutVolumenKg,
} from '../../src/lib/statistik.js';

const HEUTE = new Date(2026, 9, 4, 15); // Sonntag, 4. Oktober 2026

const bank = (date, kg, reps, unit = 'kg', duration = 3600) => ({
  date, duration,
  exercises: [{ exerciseId: 'bench-press', nameKey: 'exercises.benchPress', unit, sets: [{ weight: kg, reps }, { weight: kg, reps }] }],
});

describe('statistik', () => {
  it('Wochenstart ist Montag, auch für Sonntag', () => {
    expect(wochenStart(HEUTE).getDate()).toBe(28); // Mo, 28.09.
    expect(wochenStart(new Date(2026, 8, 28)).getDate()).toBe(28);
  });

  it('rechnet lbs in kg um', () => {
    expect(Math.round(workoutVolumenKg(bank('2026-10-01', 100, 10, 'lbs')))).toBe(907);
  });

  it('ordnet Trainings ihren Wochen zu, älteste zuerst', () => {
    const w = wochenUebersicht([
      bank('2026-10-04', 100, 10),
      bank('2026-09-28', 100, 5),
      bank('2026-09-27', 50, 10), // Vorwoche (Sonntag)
      bank('2026-01-01', 50, 10), // außerhalb
      { date: null },
    ], HEUTE, 4);
    expect(w.map((x) => x.start)).toEqual(['2026-09-07', '2026-09-14', '2026-09-21', '2026-09-28']);
    expect(w[3]).toMatchObject({ trainings: 2, volumenKg: 3000, minuten: 120 });
    expect(w[2]).toMatchObject({ trainings: 1, volumenKg: 1000 });
    expect(w[0].trainings).toBe(0);
  });

  it('sortiert Top-Übungen nach Sätzen und merkt das beste Gewicht', () => {
    const top = topUebungen([
      bank('2026-10-01', 80, 8),
      bank('2026-10-02', 90, 5),
      { date: '2026-10-02', exercises: [{ exerciseId: 'squat', sets: [{ weight: 120, reps: 5 }] }] },
      bank('2026-08-01', 200, 1), // vor dem Zeitraum
    ], '2026-09-05');
    expect(top[0]).toMatchObject({ exerciseId: 'bench-press', saetze: 4, bestKg: 90 });
    expect(top[1].exerciseId).toBe('squat');
  });

  it('Ernährungsschnitt zählt nur Tage mit Einträgen', () => {
    const r = ernaehrungsSchnitt({
      '2026-10-01': [{ calories: 1000, protein: 50 }, { calories: 1000, protein: 50 }],
      '2026-10-02': [{ calories: 2500, protein: 140 }],
      '2026-10-03': [],
    }, { calories: 2000 });
    expect(r.geloggteTage).toBe(2);
    expect(r.schnitt.calories).toBe(2250);
    expect(r.schnitt.protein).toBe(120);
    expect(r.imZiel).toBe(1);
    expect(ernaehrungsSchnitt({}).schnitt.calories).toBe(0);
  });

  it('Gewichtstrend je Woche, erst ab 7 Tagen Abstand', () => {
    const t = gewichtsTrend([
      { date: '2026-09-04', weight_kg: 82 },
      { date: '2026-10-02', weight_kg: 80 },
      { date: '2026-01-01', weight_kg: 90 },
    ], '2026-09-01');
    expect(t.aenderungKg).toBe(-2);
    expect(t.proWocheKg).toBe(-0.5);
    expect(gewichtsTrend([{ date: '2026-10-01', weight_kg: 80 }, { date: '2026-10-03', weight_kg: 79 }], '2026-09-01').proWocheKg).toBeNull();
    expect(gewichtsTrend([], '2026-09-01').aenderungKg).toBeNull();
  });
});
