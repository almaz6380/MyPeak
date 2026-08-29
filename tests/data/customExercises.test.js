import { describe, it, expect, vi, beforeEach } from 'vitest';
import { installBrowserStubs, readLocal, writeLocal } from '../helpers/browserStubs.js';

const { supabase } = await vi.hoisted(async () => {
  const { makeSupabaseMock } = await import('../helpers/supabaseMock.js');
  return { supabase: makeSupabaseMock() };
});
vi.mock('../../src/lib/supabase', () => ({ supabase }));

const {
  saveCustomExercise, deleteCustomExercise, getCustomExercises,
} = await import('../../src/data/workoutStorage.js');

const GAST = 'guest';
const KONTO = '11111111-1111-4111-8111-111111111111';
const KEY = 'custom_exercises';

const uebung = (id, name) => ({ exercise_id: id, name, muscle: 'chest', equipment: 'barbell' });

beforeEach(() => { installBrowserStubs(); supabase.__reset(); });

describe('Eigene Übungen', () => {
  describe('Gastmodus', () => {
    // Die Zusage an den Gast lautet: „Deine Daten bleiben auf dem Gerät."
    // Jeder Supabase-Aufruf hier wäre ein Bruch dieser Zusage — und im
    // Offline-Fall zusätzlich eine Wartezeit von bis zu 8 Sekunden.
    it('legt eine Übung an, ohne Supabase zu berühren', async () => {
      await saveCustomExercise(GAST, uebung('bank', 'Bankdrücken'));
      expect(readLocal(KEY)).toEqual([uebung('bank', 'Bankdrücken')]);
      expect(supabase.__calls).toHaveLength(0);
    });

    it('legt mehrere Übungen nacheinander an', async () => {
      await saveCustomExercise(GAST, uebung('a', 'Erste'));
      await saveCustomExercise(GAST, uebung('b', 'Zweite'));
      expect(readLocal(KEY).map((e) => e.name)).toEqual(['Erste', 'Zweite']);
      expect(supabase.__calls).toHaveLength(0);
    });

    it('liest die eigenen Übungen zurück', async () => {
      await saveCustomExercise(GAST, uebung('bank', 'Bankdrücken'));
      expect(await getCustomExercises(GAST)).toEqual([uebung('bank', 'Bankdrücken')]);
      expect(supabase.__calls).toHaveLength(0);
    });

    it('liefert ohne angelegte Übungen eine leere Liste statt eines Fehlers', async () => {
      expect(await getCustomExercises(GAST)).toEqual([]);
      expect(supabase.__calls).toHaveLength(0);
    });

    it('löscht eine Übung und lässt die übrigen stehen', async () => {
      await saveCustomExercise(GAST, uebung('a', 'Erste'));
      await saveCustomExercise(GAST, uebung('b', 'Zweite'));
      await deleteCustomExercise(GAST, 'a');
      expect(readLocal(KEY).map((e) => e.exercise_id)).toEqual(['b']);
      expect(supabase.__calls).toHaveLength(0);
    });

    it('verkraftet das Löschen einer unbekannten Übung', async () => {
      await saveCustomExercise(GAST, uebung('a', 'Erste'));
      await expect(deleteCustomExercise(GAST, 'gibtsnicht')).resolves.not.toThrow();
      expect(readLocal(KEY)).toHaveLength(1);
    });

    it('erkennt Übungen auch, wenn sie nur `id` statt `exercise_id` tragen', async () => {
      // Aus der Zeit vor exercise_id liegen im Speicher beide Formen.
      writeLocal(KEY, [{ id: 'alt', name: 'Altbestand' }]);
      await deleteCustomExercise(GAST, 'alt');
      expect(readLocal(KEY)).toEqual([]);
    });

    it('überlebt kaputten Inhalt im lokalen Speicher', async () => {
      localStorage.setItem(KEY, '{nicht json');
      expect(await getCustomExercises(GAST)).toEqual([]);
    });
  });

  describe('eingeloggt', () => {
    it('legt lokal an UND schickt die Übung an Supabase', async () => {
      await saveCustomExercise(KONTO, uebung('bank', 'Bankdrücken'));
      expect(readLocal(KEY)).toHaveLength(1);
      expect(supabase.__tables()).toEqual(['custom_exercises']);
      expect(supabase.__argsOf('custom_exercises', 'insert')[0]).toMatchObject({
        user_id: KONTO, exercise_id: 'bank', name: 'Bankdrücken',
      });
    });

    it('behält die Übung lokal, wenn Supabase nicht erreichbar ist', async () => {
      // localStorage-first: offline angelegte Übungen dürfen nicht verlorengehen,
      // resync.js lädt sie später hoch.
      supabase.__respond(() => { throw new Error('offline'); });
      await expect(saveCustomExercise(KONTO, uebung('bank', 'Bankdrücken'))).resolves.toBeTruthy();
      expect(readLocal(KEY)).toHaveLength(1);
    });

    it('löscht in Supabase eingegrenzt auf den eigenen Nutzer', async () => {
      await saveCustomExercise(KONTO, uebung('a', 'Erste'));
      supabase.__reset();
      await deleteCustomExercise(KONTO, 'a');

      const aufruf = supabase.__for('custom_exercises')[0];
      const eq = aufruf.ops.filter((o) => o.op === 'eq').map((o) => o.args);
      expect(aufruf.ops.some((o) => o.op === 'delete')).toBe(true);
      expect(eq).toContainEqual(['user_id', KONTO]);
      expect(eq).toContainEqual(['exercise_id', 'a']);
    });

    it('holt ohne lokalen Bestand aus Supabase und legt den Cache an', async () => {
      const ausDerCloud = [{ exercise_id: 'cloud', name: 'Aus der Cloud', user_id: KONTO }];
      supabase.__respond({ data: ausDerCloud, error: null });
      expect(await getCustomExercises(KONTO)).toEqual(ausDerCloud);
      expect(readLocal(KEY)).toEqual(ausDerCloud);
    });

    it('bewahrt beim Hintergrund-Abgleich die noch nicht gesyncten Übungen', async () => {
      // Der Kern des Bugfixes vom 15.07.: der Refresh überschrieb den Cache
      // stumpf mit den Cloud-Daten und warf lokal angelegte Übungen weg,
      // bevor resync sie hochladen konnte.
      writeLocal(KEY, [uebung('lokal', 'Nur lokal')]); // ohne user_id = ungesynct
      supabase.__respond({ data: [{ exercise_id: 'cloud', name: 'Cloud', user_id: KONTO }], error: null });

      await getCustomExercises(KONTO);
      await vi.waitFor(() => expect(readLocal(KEY)).toHaveLength(2));
      expect(readLocal(KEY).map((e) => e.exercise_id).sort()).toEqual(['cloud', 'lokal']);
    });

    it('lässt den Cache unangetastet, wenn der Abgleich fehlschlägt', async () => {
      writeLocal(KEY, [uebung('lokal', 'Nur lokal')]);
      supabase.__respond({ data: null, error: { message: 'weg' } });
      expect(await getCustomExercises(KONTO)).toHaveLength(1);
      await new Promise((r) => setTimeout(r, 5));
      expect(readLocal(KEY)).toHaveLength(1);
    });
  });
});
