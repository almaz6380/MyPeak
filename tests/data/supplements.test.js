import { describe, it, expect, vi, beforeEach } from 'vitest';
import { installBrowserStubs, readLocal } from '../helpers/browserStubs.js';

const { supabase } = await vi.hoisted(async () => {
  const { makeSupabaseMock } = await import('../helpers/supabaseMock.js');
  return { supabase: makeSupabaseMock() };
});
vi.mock('../../src/lib/supabase', () => ({ supabase }));

const {
  getSupplements, saveSupplement, updateSupplement, deleteSupplement,
  getSupplementLogs, logSupplementTaken, unlogSupplementTaken,
  getTodayScheduledSupplements, getSupplementProgress,
} = await import('../../src/data/supplementStorage.js');

const GAST = 'guest';
const KONTO = '11111111-1111-4111-8111-111111111111';
const KEY = 'supplements_list';
// 2026-08-28 ist ein Freitag.
const TAG = '2026-08-28';
const LOGS = `supplement_logs_${TAG}`;

const supp = (name, schedule = { fri: ['morning'] }) => ({
  name, brand: 'Marke', form: 'tablet', dosage_amount: 2, dosage_unit: 'Stück', schedule,
});

beforeEach(() => { installBrowserStubs(); supabase.__reset(); });

describe('Supplemente', () => {
  describe('Gastmodus', () => {
    it('legt ein Supplement rein lokal an', async () => {
      await saveSupplement(GAST, supp('Kreatin'));
      expect(readLocal(KEY)[0].name).toBe('Kreatin');
      expect(supabase.__calls).toHaveLength(0);
    });

    it('gibt zwei schnell angelegten Supplementen eigene Kennungen', async () => {
      // Sonst entfernt das Löschen des einen auch das andere.
      await saveSupplement(GAST, supp('Kreatin'));
      await saveSupplement(GAST, supp('Magnesium'));
      const ids = readLocal(KEY).map((s) => s.id);
      expect(new Set(ids).size).toBe(2);
    });

    it('löscht genau das gemeinte Supplement', async () => {
      await saveSupplement(GAST, supp('Kreatin'));
      await saveSupplement(GAST, supp('Magnesium'));
      const kreatin = readLocal(KEY).find((s) => s.name === 'Kreatin');
      supabase.__reset();

      await deleteSupplement(GAST, kreatin.id);
      expect((await getSupplements(GAST)).map((s) => s.name)).toEqual(['Magnesium']);
      expect(supabase.__calls).toHaveLength(0);
    });

    it('ändert ein Supplement lokal', async () => {
      await saveSupplement(GAST, supp('Kreatin'));
      const { id } = readLocal(KEY)[0];
      supabase.__reset();

      await updateSupplement(GAST, id, { dosage_amount: 5 });
      expect(readLocal(KEY)[0].dosage_amount).toBe(5);
      expect(supabase.__calls).toHaveLength(0);
    });

    it('hakt eine Einnahme ab und nimmt sie zurück', async () => {
      await saveSupplement(GAST, supp('Kreatin'));
      const { id } = readLocal(KEY)[0];
      supabase.__reset();

      await logSupplementTaken(GAST, id, TAG, 'morning');
      expect(await getSupplementLogs(GAST, TAG)).toHaveLength(1);

      await unlogSupplementTaken(GAST, id, TAG, 'morning');
      expect(await getSupplementLogs(GAST, TAG)).toHaveLength(0);
      expect(supabase.__calls).toHaveLength(0);
    });

    it('hakt dieselbe Einnahme nicht doppelt ab', async () => {
      await saveSupplement(GAST, supp('Kreatin'));
      const { id } = readLocal(KEY)[0];
      await logSupplementTaken(GAST, id, TAG, 'morning');
      await logSupplementTaken(GAST, id, TAG, 'morning');
      expect(readLocal(LOGS)).toHaveLength(1);
    });

    it('hält Einnahmen verschiedener Zeitpunkte auseinander', async () => {
      await saveSupplement(GAST, supp('Kreatin', { fri: ['morning', 'evening'] }));
      const { id } = readLocal(KEY)[0];
      await logSupplementTaken(GAST, id, TAG, 'morning');
      await logSupplementTaken(GAST, id, TAG, 'evening');
      expect(readLocal(LOGS)).toHaveLength(2);
      expect(new Set(readLocal(LOGS).map((l) => l.id)).size).toBe(2);
    });

    it('hält die Tage auseinander', async () => {
      await saveSupplement(GAST, supp('Kreatin'));
      const { id } = readLocal(KEY)[0];
      await logSupplementTaken(GAST, id, TAG, 'morning');
      expect(await getSupplementLogs(GAST, '2026-08-29')).toHaveLength(0);
    });
  });

  describe('eingeloggt', () => {
    it('legt das Supplement auch in Supabase an und übernimmt dessen Kennung', async () => {
      supabase.__respond({ data: { id: 'cloud-1', name: 'Kreatin' }, error: null });
      await saveSupplement(KONTO, supp('Kreatin'));
      expect(readLocal(KEY)[0].id).toBe('cloud-1');
      expect(supabase.__argsOf('supplements', 'insert')[0]).toMatchObject({
        user_id: KONTO, name: 'Kreatin',
      });
    });

    it('behält es lokal, wenn Supabase scheitert', async () => {
      supabase.__respond({ data: null, error: { message: 'offline' } });
      await saveSupplement(KONTO, supp('Kreatin'));
      expect(readLocal(KEY)).toHaveLength(1);
      expect(String(readLocal(KEY)[0].id)).toMatch(/^local_/);
    });

    it('schreibt die Einnahme mit Konfliktauflösung, damit sie nicht doppelt landet', async () => {
      supabase.__respond({ data: { id: 'log-1' }, error: null });
      await logSupplementTaken(KONTO, 'cloud-1', TAG, 'morning');

      const aufruf = supabase.__for('supplement_logs')[0];
      const upsert = aufruf.ops.find((o) => o.op === 'upsert');
      expect(upsert.args[0]).toMatchObject({ user_id: KONTO, supplement_id: 'cloud-1', date: TAG, time_slot: 'morning' });
      expect(upsert.args[1]).toMatchObject({ onConflict: 'user_id,supplement_id,date,time_slot' });
    });
  });

  describe('Tagesplan und Fortschritt', () => {
    it('zeigt nur die für diesen Wochentag geplanten Supplemente', async () => {
      const alle = [
        { id: '1', name: 'Kreatin', schedule: { fri: ['morning'] } },
        { id: '2', name: 'Nur montags', schedule: { mon: ['morning'] } },
      ];
      const heute = getTodayScheduledSupplements(alle, TAG); // Freitag
      expect(heute.map((s) => s.name)).toEqual(['Kreatin']);
    });

    it('zählt den Fortschritt über alle geplanten Zeitpunkte', async () => {
      const geplant = getTodayScheduledSupplements(
        [{ id: '1', name: 'Kreatin', schedule: { fri: ['morning', 'evening'] } }], TAG);
      const offen = getSupplementProgress(geplant, []);
      expect(offen.total).toBe(2);
      expect(offen.taken).toBe(0);

      const halb = getSupplementProgress(geplant, [{ supplement_id: '1', time_slot: 'morning' }]);
      expect(halb.taken).toBe(1);
    });

    it('kommt mit einem leeren Plan zurecht', () => {
      expect(getTodayScheduledSupplements([], TAG)).toEqual([]);
      const p = getSupplementProgress([], []);
      expect(p.total).toBe(0);
      expect(p.taken).toBe(0);
    });
  });
});

describe('Supplement-Nährwerte', () => {
  const EINTRAEGE = `nutrition_entries_${TAG}`;
  const shake = () => ({ ...supp('Proteinshake'), calories: '120', protein: '24,5', carbs: '', fat: 2 });

  it('speichert Nährwerte bereinigt (Komma, leer = null)', async () => {
    const { data } = await saveSupplement(GAST, shake());
    expect(data).toMatchObject({ calories: 120, protein: 24.5, carbs: null, fat: 2, fiber: null });
  });

  it('trägt beim Abhaken einen Ernährungseintrag ein und beim Abwählen wieder aus', async () => {
    const { data } = await saveSupplement(GAST, shake());
    await logSupplementTaken(GAST, data.id, TAG, 'morning');
    const [eintrag] = readLocal(EINTRAEGE);
    expect(eintrag).toMatchObject({
      food_name: 'Proteinshake', calories: 120, protein: 24.5, meal_slot: 'snack',
      source: 'supplement', source_id: `supp:${data.id}:morning`,
    });

    await unlogSupplementTaken(GAST, data.id, TAG, 'morning');
    expect(readLocal(EINTRAEGE)).toEqual([]);
    expect(supabase.__calls).toHaveLength(0);
  });

  it('zählt einen Doppeltipp nicht doppelt', async () => {
    const { data } = await saveSupplement(GAST, shake());
    await logSupplementTaken(GAST, data.id, TAG, 'morning');
    await logSupplementTaken(GAST, data.id, TAG, 'morning');
    expect(readLocal(EINTRAEGE)).toHaveLength(1);
  });

  it('trägt je Einnahmezeit getrennt ein', async () => {
    const { data } = await saveSupplement(GAST, shake());
    await logSupplementTaken(GAST, data.id, TAG, 'morning');
    await logSupplementTaken(GAST, data.id, TAG, 'evening');
    await unlogSupplementTaken(GAST, data.id, TAG, 'morning');
    expect(readLocal(EINTRAEGE).map((e) => e.source_id)).toEqual([`supp:${data.id}:evening`]);
  });

  it('legt ohne Nährwerte keinen Eintrag an', async () => {
    const { data } = await saveSupplement(GAST, supp('Vitamin D'));
    await logSupplementTaken(GAST, data.id, TAG, 'morning');
    expect(readLocal(EINTRAEGE)).toBeNull();
  });
});
