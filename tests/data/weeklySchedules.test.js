import { describe, it, expect, vi, beforeEach } from 'vitest';
import { installBrowserStubs, readLocal, writeLocal } from '../helpers/browserStubs.js';

const { supabase } = await vi.hoisted(async () => {
  const { makeSupabaseMock } = await import('../helpers/supabaseMock.js');
  return { supabase: makeSupabaseMock() };
});
vi.mock('../../src/lib/supabase', () => ({ supabase }));

const {
  saveWeeklySchedule, getWeeklySchedules, getActiveSchedule,
  deactivateAllSchedules, deleteWeeklySchedule, getScheduledDaysForMonth,
} = await import('../../src/data/workoutStorage.js');

const GAST = 'guest';
const KONTO = '11111111-1111-4111-8111-111111111111';
const KEY = 'weekly_schedules';

const wochenplan = (name) => ({
  name, sessions_per_week: 3,
  days: { mon: ['bench'], wed: ['squat'], fri: ['deadlift'] },
});

beforeEach(() => { installBrowserStubs(); supabase.__reset(); });

describe('Wochenpläne', () => {
  describe('Gastmodus', () => {
    it('legt einen Wochenplan an und aktiviert ihn', async () => {
      await saveWeeklySchedule(GAST, wochenplan('PPL'));
      const [gespeichert] = readLocal(KEY);
      expect(gespeichert.name).toBe('PPL');
      expect(gespeichert.is_active).toBe(true);
      expect(supabase.__calls).toHaveLength(0);
    });

    it('deaktiviert beim Anlegen alle vorherigen — es bleibt genau einer aktiv', async () => {
      // Der aktive Wochenplan färbt die Tage im Kreiskalender. Zwei aktive
      // Pläne gleichzeitig ergäben dort ein widersprüchliches Bild.
      await saveWeeklySchedule(GAST, wochenplan('Erster'));
      await saveWeeklySchedule(GAST, wochenplan('Zweiter'));

      const alle = readLocal(KEY);
      expect(alle).toHaveLength(2);
      expect(alle.filter((s) => s.is_active)).toHaveLength(1);
      expect(alle.find((s) => s.is_active).name).toBe('Zweiter');
      expect(supabase.__calls).toHaveLength(0);
    });

    it('gibt zwei kurz nacheinander angelegten Plänen verschiedene Kennungen', async () => {
      // Bei `local_${Date.now()}` bekamen beide dieselbe Kennung — Löschen
      // des einen entfernte dann auch den anderen.
      await saveWeeklySchedule(GAST, wochenplan('Erster'));
      await saveWeeklySchedule(GAST, wochenplan('Zweiter'));
      const ids = readLocal(KEY).map((s) => s.id);
      expect(new Set(ids).size).toBe(2);
    });

    it('liefert den aktiven Wochenplan', async () => {
      await saveWeeklySchedule(GAST, wochenplan('PPL'));
      supabase.__reset();
      expect((await getActiveSchedule(GAST)).name).toBe('PPL');
      expect(supabase.__calls).toHaveLength(0);
    });

    it('liefert null, wenn kein Wochenplan aktiv ist', async () => {
      expect(await getActiveSchedule(GAST)).toBeNull();
      expect(supabase.__calls).toHaveLength(0);
    });

    it('beendet ein Programm, ohne es zu löschen', async () => {
      // „Programm beenden" ist bewusst nicht destruktiv: der Plan bleibt
      // in „Meine Pläne" und kann wieder aktiviert werden.
      await saveWeeklySchedule(GAST, wochenplan('PPL'));
      supabase.__reset();
      await deactivateAllSchedules(GAST);

      expect(readLocal(KEY)).toHaveLength(1);
      expect(await getActiveSchedule(GAST)).toBeNull();
      expect(supabase.__calls).toHaveLength(0);
    });

    it('löscht einen Wochenplan wirklich', async () => {
      await saveWeeklySchedule(GAST, wochenplan('Erster'));
      await saveWeeklySchedule(GAST, wochenplan('Zweiter'));
      const id = readLocal(KEY).find((s) => s.name === 'Erster').id;
      supabase.__reset();

      await deleteWeeklySchedule(GAST, id);
      expect(readLocal(KEY).map((s) => s.name)).toEqual(['Zweiter']);
      expect(supabase.__calls).toHaveLength(0);
    });
  });

  describe('eingeloggt', () => {
    it('deaktiviert erst alle, legt dann den neuen an', async () => {
      // Reihenfolge zählt: andersherum würde der neue Plan sich selbst
      // wieder deaktivieren und der Kalender bliebe leer.
      supabase.__respond({ data: { id: 'cloud-1', name: 'PPL', is_active: true }, error: null });
      await saveWeeklySchedule(KONTO, wochenplan('PPL'));

      const aufrufe = supabase.__for('weekly_schedules');
      expect(aufrufe[0].ops.some((o) => o.op === 'update')).toBe(true);
      expect(aufrufe[1].ops.some((o) => o.op === 'insert')).toBe(true);
      expect(readLocal(KEY)[0].id).toBe('cloud-1');
    });

    it('behält die local_-Kennung, wenn Supabase nichts zurückgibt', async () => {
      supabase.__respond({ data: null, error: { message: 'offline' } });
      await saveWeeklySchedule(KONTO, wochenplan('PPL'));
      expect(String(readLocal(KEY)[0].id)).toMatch(/^local_/);
      expect(readLocal(KEY)[0].is_active).toBe(true);
    });

    it('löscht einen local_-Wochenplan nur lokal', async () => {
      writeLocal(KEY, [{ id: 'local_1_1', name: 'PPL' }]);
      await deleteWeeklySchedule(KONTO, 'local_1_1');
      expect(readLocal(KEY)).toEqual([]);
      expect(supabase.__calls).toHaveLength(0);
    });

    it('grenzt das Löschen in Supabase auf den eigenen Nutzer ein', async () => {
      writeLocal(KEY, [{ id: 'cloud-1', name: 'PPL' }]);
      await deleteWeeklySchedule(KONTO, 'cloud-1');

      const eq = supabase.__for('weekly_schedules')[0].ops.filter((o) => o.op === 'eq').map((o) => o.args);
      expect(eq).toContainEqual(['id', 'cloud-1']);
      expect(eq).toContainEqual(['user_id', KONTO]);
    });

    it('bewahrt beim Hintergrund-Abgleich die ungesyncten Wochenpläne', async () => {
      writeLocal(KEY, [{ id: 'local_1_1', name: 'Nur lokal' }]);
      supabase.__respond({ data: [{ id: 'c1', name: 'Cloud' }], error: null });

      await getWeeklySchedules(KONTO);
      await vi.waitFor(() => expect(readLocal(KEY)).toHaveLength(2));
    });
  });

  describe('getScheduledDaysForMonth', () => {
    it('markiert die Wochentage des Plans im Monat', () => {
      // August 2026: der 3. ist ein Montag.
      const tage = getScheduledDaysForMonth({ days: { mon: ['bench'] } }, 2026, 7);
      expect(tage.has(3)).toBe(true);
      expect(tage.has(10)).toBe(true);
      expect(tage.has(4)).toBe(false);
    });

    it('liefert eine leere Menge ohne Plan', () => {
      expect(getScheduledDaysForMonth(null, 2026, 7).size).toBe(0);
      expect(getScheduledDaysForMonth({}, 2026, 7).size).toBe(0);
    });
  });
});
