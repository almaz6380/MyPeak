import { describe, it, expect, vi, beforeEach } from 'vitest';
import { installBrowserStubs, readLocal } from '../helpers/browserStubs.js';

const { supabase } = await vi.hoisted(async () => {
  const { makeSupabaseMock } = await import('../helpers/supabaseMock.js');
  return { supabase: makeSupabaseMock() };
});
vi.mock('../../src/lib/supabase', () => ({ supabase }));

const { getWeightEntries, saveWeightEntry } =
  await import('../../src/data/weightStorage.js');

const GAST = 'guest';
const KONTO = '11111111-1111-4111-8111-111111111111';
const KEY = 'weight_entries';

beforeEach(() => { installBrowserStubs(); supabase.__reset(); });

describe('Gewichtsverlauf', () => {
  describe('Gastmodus', () => {
    it('trägt ein Gewicht rein lokal ein', async () => {
      await saveWeightEntry(GAST, '2026-08-28', 82.5);
      expect(readLocal(KEY)[0].weight_kg).toBe(82.5);
      expect(supabase.__calls).toHaveLength(0);
    });

    it('überschreibt denselben Tag, statt ihn zu doppeln', async () => {
      // Das Diagramm zeigt sonst zwei Punkte über demselben Datum.
      await saveWeightEntry(GAST, '2026-08-28', 82.5);
      await saveWeightEntry(GAST, '2026-08-28', 82.1);
      expect(readLocal(KEY)).toHaveLength(1);
      expect(readLocal(KEY)[0].weight_kg).toBe(82.1);
      expect(supabase.__calls).toHaveLength(0);
    });

    it('sortiert die Einträge aufsteigend nach Datum', async () => {
      // Fürs Diagramm: unsortierte Punkte ergäben eine Zickzacklinie.
      await saveWeightEntry(GAST, '2026-08-28', 82.5);
      await saveWeightEntry(GAST, '2026-08-01', 84.0);
      await saveWeightEntry(GAST, '2026-08-15', 83.2);
      expect(readLocal(KEY).map((e) => e.date))
        .toEqual(['2026-08-01', '2026-08-15', '2026-08-28']);
    });

    it('gibt Einträgen verschiedener Tage eigene Kennungen', async () => {
      await saveWeightEntry(GAST, '2026-08-27', 83.0);
      await saveWeightEntry(GAST, '2026-08-28', 82.5);
      const ids = readLocal(KEY).map((e) => e.id);
      expect(new Set(ids).size).toBe(2);
    });

    it('nimmt Nachkommastellen an', async () => {
      await saveWeightEntry(GAST, '2026-08-28', 82.35);
      expect(readLocal(KEY)[0].weight_kg).toBe(82.35);
    });

    it('liest den Verlauf zurück', async () => {
      await saveWeightEntry(GAST, '2026-08-28', 82.5);
      supabase.__reset();
      expect(await getWeightEntries(GAST)).toHaveLength(1);
      expect(supabase.__calls).toHaveLength(0);
    });

    it('liefert ohne Einträge eine leere Liste', async () => {
      expect(await getWeightEntries(GAST)).toEqual([]);
      expect(supabase.__calls).toHaveLength(0);
    });
  });

  describe('eingeloggt', () => {
    it('schreibt mit Konfliktauflösung auf Nutzer und Datum', async () => {
      // Ohne onConflict entstünde pro Speichern eine neue Zeile für denselben Tag.
      await saveWeightEntry(KONTO, '2026-08-28', 82.5);
      const upsert = supabase.__for('weight_entries')[0].ops.find((o) => o.op === 'upsert');
      expect(upsert.args[0]).toMatchObject({ user_id: KONTO, date: '2026-08-28', weight_kg: 82.5 });
      expect(upsert.args[1]).toMatchObject({ onConflict: 'user_id,date' });
    });

    it('behält den Eintrag lokal, wenn Supabase scheitert', async () => {
      supabase.__respond(() => { throw new Error('offline'); });
      await saveWeightEntry(KONTO, '2026-08-28', 82.5);
      expect(readLocal(KEY)).toHaveLength(1);
    });
  });
});
