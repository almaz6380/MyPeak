import { describe, it, expect, vi, beforeEach } from 'vitest';
import { installBrowserStubs, readLocal, writeLocal } from '../helpers/browserStubs.js';

const { supabase } = await vi.hoisted(async () => {
  const { makeSupabaseMock } = await import('../helpers/supabaseMock.js');
  return { supabase: makeSupabaseMock() };
});
vi.mock('../../src/lib/supabase', () => ({ supabase }));

const {
  saveWorkout, updateWorkout, deleteWorkout, getWorkouts,
  getExerciseHistory, getPersonalRecord,
  getExerciseNote, saveExerciseNote, getAllExerciseNotes,
} = await import('../../src/data/workoutStorage.js');

const GAST = 'guest';
const KONTO = '11111111-1111-4111-8111-111111111111';
const KEY = 'workouts';

const workout = (datum, gewicht = 100) => ({
  date: datum,
  duration: 3600,
  type: 'strength',
  exercises: [{ exerciseId: 'bench', sets: [{ weight: gewicht, reps: 8, completed: true }] }],
});

beforeEach(() => { installBrowserStubs(); supabase.__reset(); });

describe('Workouts', () => {
  describe('Gastmodus', () => {
    it('speichert ein Workout rein lokal', async () => {
      await saveWorkout(GAST, workout('2026-08-01'));
      expect(readLocal(KEY)).toHaveLength(1);
      expect(supabase.__calls).toHaveLength(0);
    });

    it('stellt das neueste Workout nach vorn', async () => {
      await saveWorkout(GAST, workout('2026-08-01', 100));
      await saveWorkout(GAST, workout('2026-08-02', 110));
      expect(readLocal(KEY)[0].date).toBe('2026-08-02');
    });

    it('gibt zwei schnell hintereinander gespeicherten Workouts eigene Kennungen', async () => {
      await saveWorkout(GAST, workout('2026-08-01'));
      await saveWorkout(GAST, workout('2026-08-02'));
      const ids = readLocal(KEY).map((w) => w.id);
      expect(new Set(ids).size).toBe(2);
    });

    it('bearbeitet ein gespeichertes Workout nachträglich', async () => {
      const { data } = await saveWorkout(GAST, workout('2026-08-01'));
      supabase.__reset();

      await updateWorkout(GAST, data.id, {
        duration: 1800,
        exercises: [{ exerciseId: 'bench', sets: [{ weight: 120, reps: 5, completed: true }] }],
      });
      expect(readLocal(KEY)[0].duration).toBe(1800);
      expect(readLocal(KEY)[0].exercises[0].sets[0].weight).toBe(120);
      expect(supabase.__calls).toHaveLength(0);
    });

    it('löscht genau das gemeinte Workout', async () => {
      const { data: erstes } = await saveWorkout(GAST, workout('2026-08-01'));
      await saveWorkout(GAST, workout('2026-08-02'));
      supabase.__reset();

      await deleteWorkout(GAST, erstes.id);
      expect(readLocal(KEY).map((w) => w.date)).toEqual(['2026-08-02']);
      expect(supabase.__calls).toHaveLength(0);
    });

    it('führt Verlauf und Rekord aus den lokalen Workouts', async () => {
      // Ohne diesen Pfad hätte ein Gast weder Verlauf noch PR-Erkennung.
      await saveWorkout(GAST, workout('2026-08-01', 100));
      await saveWorkout(GAST, workout('2026-08-02', 120));
      supabase.__reset();

      expect(await getExerciseHistory(GAST, 'bench')).toHaveLength(2);
      const rekord = await getPersonalRecord(GAST, 'bench');
      expect(rekord.maxWeight).toBe(120);
      expect(rekord.maxVolume).toBe(960); // 120 kg × 8 Wiederholungen
      expect(supabase.__calls).toHaveLength(0);
    });

    it('meldet ohne Workouts Nullwerte, statt zu stürzen', async () => {
      expect(await getPersonalRecord(GAST, 'bench')).toEqual({ maxWeight: 0, maxVolume: 0 });
      expect(await getExerciseHistory(GAST, 'bench')).toEqual([]);
    });

    it('rechnet Sätze in Pfund für den Rekord auf Kilogramm um', async () => {
      // Die Einheit ist pro Übung umschaltbar. Ohne Normalisierung wäre jeder
      // in lbs geloggte Satz automatisch ein neuer Rekord — 225 lbs sind aber
      // gut 102 kg, nicht 225.
      await saveWorkout(GAST, {
        date: '2026-08-01', duration: 3600, type: 'strength',
        exercises: [{ exerciseId: 'bench', unit: 'lbs', sets: [{ weight: 225, reps: 5, completed: true }] }],
      });
      const rekord = await getPersonalRecord(GAST, 'bench');
      expect(rekord.maxWeight).toBeCloseTo(102.06, 1);
      expect(rekord.maxWeight).toBeLessThan(225);
    });
  });

  describe('eingeloggt', () => {
    it('speichert lokal und in Supabase und übernimmt die Cloud-id', async () => {
      supabase.__respond({ data: { id: 'cloud-1' }, error: null });
      await saveWorkout(KONTO, workout('2026-08-01'));

      expect(readLocal(KEY)[0].id).toBe('cloud-1');
      expect(supabase.__argsOf('workouts', 'insert')[0]).toMatchObject({
        user_id: KONTO, date: '2026-08-01', type: 'strength',
      });
    });

    it('ersetzt die Kennung des richtigen Workouts, wenn zwei parallel laufen', async () => {
      // Früher wurde stumpf Index 0 überschrieben; bei zwei gleichzeitigen
      // Speichervorgängen bekam das falsche Workout die Cloud-Kennung.
      supabase.__respond({ data: { id: 'cloud-B' }, error: null });
      await saveWorkout(KONTO, workout('2026-08-01'));
      const ersteId = readLocal(KEY)[0].id;

      supabase.__respond({ data: { id: 'cloud-A' }, error: null });
      await saveWorkout(KONTO, workout('2026-08-02'));

      const ids = readLocal(KEY).map((w) => w.id);
      expect(new Set(ids).size).toBe(2);
      expect(ids).toContain(ersteId);
    });

    it('behält das Workout lokal, wenn Supabase scheitert', async () => {
      supabase.__respond(() => { throw new Error('offline'); });
      await saveWorkout(KONTO, workout('2026-08-01'));
      expect(readLocal(KEY)).toHaveLength(1);
      expect(String(readLocal(KEY)[0].id)).toMatch(/^local_/);
    });

    it('schickt Änderungen an local_-Workouts nicht an Supabase', async () => {
      writeLocal(KEY, [{ id: 'local_1_1', date: '2026-08-01', exercises: [], duration: 0 }]);
      await updateWorkout(KONTO, 'local_1_1', { exercises: [], duration: 900 });
      expect(readLocal(KEY)[0].duration).toBe(900);
      expect(supabase.__calls).toHaveLength(0);
    });

    it('grenzt Ändern und Löschen auf den eigenen Nutzer ein', async () => {
      writeLocal(KEY, [{ id: 'cloud-1', date: '2026-08-01', exercises: [], duration: 0 }]);
      await updateWorkout(KONTO, 'cloud-1', { exercises: [], duration: 900 });
      await deleteWorkout(KONTO, 'cloud-1');

      for (const aufruf of supabase.__for('workouts')) {
        const eq = aufruf.ops.filter((o) => o.op === 'eq').map((o) => o.args);
        expect(eq).toContainEqual(['user_id', KONTO]);
      }
    });

    it('bewahrt beim Hintergrund-Abgleich die ungesyncten Workouts', async () => {
      writeLocal(KEY, [{ id: 'local_1_1', date: '2026-08-03', exercises: [] }]);
      supabase.__respond({ data: [{ id: 'c1', date: '2026-08-01', exercises: [] }], error: null });

      await getWorkouts(KONTO);
      await vi.waitFor(() => expect(readLocal(KEY)).toHaveLength(2));
    });
  });
});

describe('Übungsnotizen', () => {
  describe('Gastmodus', () => {
    it('speichert Notiz und Geräte-Einstellungen lokal', async () => {
      await saveExerciseNote(GAST, 'bench', 'Neigung 5', [{ label: 'Sitz', value: '7' }]);
      const notiz = await getExerciseNote(GAST, 'bench');
      expect(notiz.note).toBe('Neigung 5');
      expect(notiz.settings[0].value).toBe('7');
      expect(supabase.__calls).toHaveLength(0);
    });

    it('liefert für eine Übung ohne Notiz eine leere Vorlage', async () => {
      const notiz = await getExerciseNote(GAST, 'unbekannt');
      expect(notiz).toEqual({ note: '', settings: [] });
      expect(supabase.__calls).toHaveLength(0);
    });

    it('überschreibt eine bestehende Notiz statt sie zu doppeln', async () => {
      await saveExerciseNote(GAST, 'bench', 'Erst', []);
      await saveExerciseNote(GAST, 'bench', 'Dann', []);
      expect((await getExerciseNote(GAST, 'bench')).note).toBe('Dann');
      expect(Object.keys(await getAllExerciseNotes(GAST))).toEqual(['bench']);
    });

    it('liefert alle Notizen als Zuordnung Übung → Notiz', async () => {
      await saveExerciseNote(GAST, 'bench', 'A', []);
      await saveExerciseNote(GAST, 'squat', 'B', []);
      supabase.__reset();

      const alle = await getAllExerciseNotes(GAST);
      expect(alle.bench.note).toBe('A');
      expect(alle.squat.note).toBe('B');
      expect(supabase.__calls).toHaveLength(0);
    });
  });

  describe('eingeloggt', () => {
    it('legt die Notiz auch in Supabase ab', async () => {
      await saveExerciseNote(KONTO, 'bench', 'Neigung 5', []);
      expect(supabase.__argsOf('exercise_notes', 'upsert')[0]).toMatchObject({
        user_id: KONTO, exercise_id: 'bench', note: 'Neigung 5',
      });
    });

    it('bevorzugt beim Lesen die Cloud-Fassung', async () => {
      await saveExerciseNote(KONTO, 'bench', 'Lokal veraltet', []);
      supabase.__respond({ data: { exercise_id: 'bench', note: 'Aus der Cloud', settings: [] }, error: null });
      expect((await getExerciseNote(KONTO, 'bench')).note).toBe('Aus der Cloud');
    });

    it('zeigt keine Notizen eines anderen Kontos auf demselben Gerät', async () => {
      // Der Cache ist nach `${userId}_${exerciseId}` geschlüsselt. Ohne diese
      // Trennung sähe der nächste Nutzer die Notizen des vorigen.
      await saveExerciseNote(GAST, 'bench', 'Notiz des Gastes', []);
      supabase.__respond({ data: [], error: null });
      expect(await getAllExerciseNotes(KONTO)).toEqual({});
    });
  });
});
