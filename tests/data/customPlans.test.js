import { describe, it, expect, vi, beforeEach } from 'vitest';
import { installBrowserStubs, readLocal, writeLocal } from '../helpers/browserStubs.js';

const { supabase } = await vi.hoisted(async () => {
  const { makeSupabaseMock } = await import('../helpers/supabaseMock.js');
  return { supabase: makeSupabaseMock() };
});
vi.mock('../../src/lib/supabase', () => ({ supabase }));

const {
  saveCustomPlan, updateCustomPlan, deleteCustomPlan, getCustomPlans,
  getCustomPlansByType, getPlanType,
  getDeletedCustomPlans, restoreCustomPlan, permanentDeleteCustomPlan,
} = await import('../../src/data/workoutStorage.js');

const GAST = 'guest';
const KONTO = '11111111-1111-4111-8111-111111111111';
const KEY = 'customPlans';

const plan = (name, days = [{ exerciseId: 'bench', sets: 3 }]) => ({ name, days });

beforeEach(() => { installBrowserStubs(); supabase.__reset(); });

describe('Trainingspläne', () => {
  describe('Gastmodus', () => {
    it('erstellt einen Plan rein lokal, mit local_-Kennung', async () => {
      // Die local_-Kennung ist keine Kosmetik: resync.js erkennt daran, was
      // beim späteren Registrieren hochzuladen ist.
      await saveCustomPlan(GAST, plan('Push'));
      const gespeichert = readLocal(KEY);
      expect(gespeichert).toHaveLength(1);
      expect(String(gespeichert[0].id)).toMatch(/^local_/);
      expect(gespeichert[0].name).toBe('Push');
      expect(supabase.__calls).toHaveLength(0);
    });

    it('ändert einen Plan lokal', async () => {
      await saveCustomPlan(GAST, plan('Push'));
      const id = readLocal(KEY)[0].id;
      supabase.__reset();

      await updateCustomPlan(GAST, id, plan('Push umbenannt', [{ exerciseId: 'row', sets: 4 }]));
      expect(readLocal(KEY)[0].name).toBe('Push umbenannt');
      expect(readLocal(KEY)[0].days[0].exerciseId).toBe('row');
      expect(supabase.__calls).toHaveLength(0);
    });

    it('löscht einen Plan lokal', async () => {
      await saveCustomPlan(GAST, plan('Push'));
      await saveCustomPlan(GAST, plan('Pull'));
      const id = readLocal(KEY).find((p) => p.name === 'Push').id;
      supabase.__reset();

      await deleteCustomPlan(GAST, id);
      expect(readLocal(KEY).map((p) => p.name)).toEqual(['Pull']);
      expect(supabase.__calls).toHaveLength(0);
    });

    it('liest die Pläne zurück', async () => {
      await saveCustomPlan(GAST, plan('Push'));
      supabase.__reset();
      expect((await getCustomPlans(GAST)).map((p) => p.name)).toEqual(['Push']);
      expect(supabase.__calls).toHaveLength(0);
    });

    it('liefert ohne Pläne eine leere Liste', async () => {
      expect(await getCustomPlans(GAST)).toEqual([]);
      expect(supabase.__calls).toHaveLength(0);
    });

    it('filtert nach Plantyp', async () => {
      await saveCustomPlan(GAST, { name: 'Kraft', days: [{ exerciseId: 'bench' }] });
      await saveCustomPlan(GAST, { name: 'Cardio', days: { type: 'cardio' } });
      supabase.__reset();
      expect((await getCustomPlansByType(GAST, 'cardio')).map((p) => p.name)).toEqual(['Cardio']);
      expect((await getCustomPlansByType(GAST, 'strength')).map((p) => p.name)).toEqual(['Kraft']);
      expect(supabase.__calls).toHaveLength(0);
    });

    it('verkraftet kaputten Inhalt im lokalen Speicher', async () => {
      localStorage.setItem(KEY, 'kein json');
      expect(await getCustomPlans(GAST)).toEqual([]);
    });

    // ── Papierkorb (DeletedPlans.jsx) ──
    // Ein Gast hat keinen Papierkorb: deleteCustomPlan entfernt seinen Plan
    // sofort und endgültig aus dem lokalen Speicher. Die drei Funktionen
    // dürfen deshalb gar nichts tun — erst recht nichts über das Netz.
    it('meldet einen leeren Papierkorb, ohne Supabase zu fragen', async () => {
      expect(await getDeletedCustomPlans(GAST)).toEqual([]);
      expect(supabase.__calls).toHaveLength(0);
    });

    it('wiederherstellen bleibt folgenlos, ohne Supabase zu rufen', async () => {
      await saveCustomPlan(GAST, plan('Push'));
      supabase.__reset();
      await expect(restoreCustomPlan(GAST, 'local_1')).resolves.toBeDefined();
      expect(supabase.__calls).toHaveLength(0);
    });

    it('endgültiges Löschen ruft Supabase nicht', async () => {
      await expect(permanentDeleteCustomPlan(GAST, 'local_1')).resolves.not.toThrow();
      expect(supabase.__calls).toHaveLength(0);
    });
  });

  describe('eingeloggt', () => {
    it('legt den Plan in Supabase an und übernimmt dessen id', async () => {
      supabase.__respond({ data: { id: 'cloud-1', name: 'Push' }, error: null });
      await saveCustomPlan(KONTO, plan('Push'));
      expect(readLocal(KEY)[0].id).toBe('cloud-1');
      expect(supabase.__argsOf('custom_plans', 'insert')[0]).toMatchObject({ user_id: KONTO, name: 'Push' });
    });

    it('fällt auf eine local_-Kennung zurück, wenn Supabase nichts liefert', async () => {
      // Offline angelegt: der Plan muss trotzdem in „Meine Pläne" auftauchen.
      supabase.__respond({ data: null, error: { message: 'offline' } });
      await saveCustomPlan(KONTO, plan('Push'));
      expect(String(readLocal(KEY)[0].id)).toMatch(/^local_/);
    });

    it('ändert lokal und in Supabase, eingegrenzt auf id und Nutzer', async () => {
      writeLocal(KEY, [{ id: 'cloud-1', name: 'Push', days: [] }]);
      await updateCustomPlan(KONTO, 'cloud-1', plan('Push neu'));

      expect(readLocal(KEY)[0].name).toBe('Push neu');
      const eq = supabase.__for('custom_plans')[0].ops.filter((o) => o.op === 'eq').map((o) => o.args);
      expect(eq).toContainEqual(['id', 'cloud-1']);
      expect(eq).toContainEqual(['user_id', KONTO]);
    });

    it('schickt eine Änderung an einem local_-Plan NICHT an Supabase', async () => {
      // Die Zeile existiert dort noch gar nicht — ein Update liefe ins Leere.
      writeLocal(KEY, [{ id: 'local_123', name: 'Push', days: [] }]);
      await updateCustomPlan(KONTO, 'local_123', plan('Push neu'));
      expect(readLocal(KEY)[0].name).toBe('Push neu');
      expect(supabase.__calls).toHaveLength(0);
    });

    it('löscht in Supabase weich, nicht hart', async () => {
      // Soft-Delete: nur so kann der Papierkorb den Plan zurückholen.
      writeLocal(KEY, [{ id: 'cloud-1', name: 'Push', days: [] }]);
      await deleteCustomPlan(KONTO, 'cloud-1');

      expect(readLocal(KEY)).toEqual([]);
      const ops = supabase.__for('custom_plans')[0].ops.map((o) => o.op);
      expect(ops).toContain('update');
      expect(ops).not.toContain('delete');
      expect(supabase.__argsOf('custom_plans', 'update')[0]).toHaveProperty('deleted_at');
    });

    it('löscht einen local_-Plan nur lokal', async () => {
      writeLocal(KEY, [{ id: 'local_9', name: 'Push', days: [] }]);
      await deleteCustomPlan(KONTO, 'local_9');
      expect(readLocal(KEY)).toEqual([]);
      expect(supabase.__calls).toHaveLength(0);
    });

    it('holt ohne lokalen Bestand aus Supabase, ohne gelöschte Pläne', async () => {
      supabase.__respond({ data: [{ id: 'c1', name: 'Push', days: [] }], error: null });
      const plaene = await getCustomPlans(KONTO);
      expect(plaene).toEqual([{ id: 'c1', name: 'Push', days: [] }]);
      const ops = supabase.__for('custom_plans')[0].ops;
      expect(ops.find((o) => o.op === 'is').args).toEqual(['deleted_at', null]);
    });

    it('bewahrt beim Hintergrund-Abgleich die noch nicht gesyncten Pläne', async () => {
      writeLocal(KEY, [{ id: 'local_1', name: 'Nur lokal', days: [] }]);
      supabase.__respond({ data: [{ id: 'c1', name: 'Cloud', days: [] }], error: null });

      await getCustomPlans(KONTO);
      await vi.waitFor(() => expect(readLocal(KEY)).toHaveLength(2));
      expect(readLocal(KEY).map((p) => p.name).sort()).toEqual(['Cloud', 'Nur lokal']);
    });

    it('liest den Papierkorb aus Supabase', async () => {
      supabase.__respond({ data: [{ id: 'c1', name: 'Gelöscht', days: [] }], error: null });
      expect(await getDeletedCustomPlans(KONTO)).toEqual([{ id: 'c1', name: 'Gelöscht', days: [] }]);
      const ops = supabase.__for('custom_plans')[0].ops;
      expect(ops.find((o) => o.op === 'not').args).toEqual(['deleted_at', 'is', null]);
    });

    it('stellt einen Plan wieder her, indem deleted_at geleert wird', async () => {
      supabase.__respond({ data: [], error: null });
      await restoreCustomPlan(KONTO, 'c1');
      expect(supabase.__argsOf('custom_plans', 'update')[0]).toEqual({ deleted_at: null });
    });

    it('löscht endgültig wirklich hart', async () => {
      await permanentDeleteCustomPlan(KONTO, 'c1');
      const ops = supabase.__for('custom_plans')[0].ops.map((o) => o.op);
      expect(ops).toContain('delete');
    });
  });

  // Die vorgefertigten Pläne liegen im Code, nicht in der Datenbank. „Löschen"
  // heißt hier: für dieses Gerät ausblenden. Das läuft ohne userId und damit
  // für Gast und Konto gleich — geprüft wird, dass es tatsächlich lokal bleibt.
  describe('Standardpläne aus- und einblenden', () => {
    it('blendet einen Standardplan aus und wieder ein', async () => {
      const { hideDefaultPlan, restoreDefaultPlan, getHiddenDefaultPlans } =
        await import('../../src/data/settingsStorage.js');

      hideDefaultPlan('ppl');
      expect(getHiddenDefaultPlans()).toEqual(['ppl']);
      restoreDefaultPlan('ppl');
      expect(getHiddenDefaultPlans()).toEqual([]);
      expect(supabase.__calls).toHaveLength(0);
    });

    it('blendet denselben Plan nicht doppelt aus', async () => {
      const { hideDefaultPlan, getHiddenDefaultPlans } =
        await import('../../src/data/settingsStorage.js');
      hideDefaultPlan('ppl');
      hideDefaultPlan('ppl');
      expect(getHiddenDefaultPlans()).toEqual(['ppl']);
    });

    it('nimmt einen endgültig gelöschten Plan aus der Ausgeblendet-Liste', async () => {
      // Sonst stünde er in beiden Listen und tauchte über „Wiederherstellen"
      // wieder auf, obwohl er endgültig weg sein soll.
      const { hideDefaultPlan, permanentDeleteDefaultPlan, getHiddenDefaultPlans,
        getPermanentDeletedDefaultPlans } = await import('../../src/data/settingsStorage.js');

      hideDefaultPlan('ppl');
      permanentDeleteDefaultPlan('ppl');
      expect(getHiddenDefaultPlans()).toEqual([]);
      expect(getPermanentDeletedDefaultPlans()).toEqual(['ppl']);
      expect(supabase.__calls).toHaveLength(0);
    });

    it('verkraftet kaputten Inhalt im lokalen Speicher', async () => {
      const { getHiddenDefaultPlans, getPermanentDeletedDefaultPlans } =
        await import('../../src/data/settingsStorage.js');
      localStorage.setItem('hiddenDefaultPlans', 'kaputt');
      localStorage.setItem('permanentDeletedDefaultPlans', 'kaputt');
      expect(getHiddenDefaultPlans()).toEqual([]);
      expect(getPermanentDeletedDefaultPlans()).toEqual([]);
    });
  });

  describe('getPlanType', () => {
    it('erkennt Kraftpläne an der Übungsliste', () => {
      expect(getPlanType({ days: [{ exerciseId: 'bench' }] })).toBe('strength');
    });
    it('liest den Typ aus dem days-Objekt', () => {
      expect(getPlanType({ days: { type: 'hiit' } })).toBe('hiit');
    });
    it('nimmt strength an, wenn nichts dasteht', () => {
      expect(getPlanType({})).toBe('strength');
      expect(getPlanType({ days: {} })).toBe('strength');
    });
  });
});
