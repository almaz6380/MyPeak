import { describe, it, expect, vi, beforeEach } from 'vitest';
import { installBrowserStubs, readLocal, writeLocal } from '../helpers/browserStubs.js';

const { supabase } = await vi.hoisted(async () => {
  const { makeSupabaseMock } = await import('../helpers/supabaseMock.js');
  return { supabase: makeSupabaseMock() };
});
vi.mock('../../src/lib/supabase', () => ({ supabase }));

const { getXP, addXP, updateStreak, XP_VALUES, GUEST_XP_KEY } = await import('../../src/data/socialStorage.js');
const { syncLocalDataToCloud } = await import('../../src/data/resync.js');
const { todayLocal } = await import('../../src/lib/dateUtils.js');

const GAST = 'guest';
const KONTO = '11111111-1111-4111-8111-111111111111';

beforeEach(() => { installBrowserStubs(); supabase.__reset(); });

describe('XP und Streak', () => {
  describe('Gastmodus', () => {
    it('startet bei Level 1 ohne Streak', async () => {
      expect(await getXP(GAST)).toMatchObject({ total_xp: 0, level: 1, streak_days: 0 });
    });

    it('zählt den Streak nach einem Workout hoch und vergibt XP', async () => {
      const res = await updateStreak(GAST);
      expect(res.streak).toBe(1);
      expect(res.xpGained).toBe(XP_VALUES.WORKOUT_COMPLETED);
      const xp = await getXP(GAST);
      expect(xp.streak_days).toBe(1);
      expect(xp.total_xp).toBe(XP_VALUES.WORKOUT_COMPLETED);
      expect(xp.last_workout_date).toBe(todayLocal());
    });

    it('zählt denselben Tag nur einmal', async () => {
      await updateStreak(GAST);
      expect(await updateStreak(GAST)).toBeNull();
      expect((await getXP(GAST)).total_xp).toBe(XP_VALUES.WORKOUT_COMPLETED);
    });

    it('behält XP über einen Neustart (liegt in localStorage)', async () => {
      await addXP(GAST, 120);
      expect(readLocal(GUEST_XP_KEY).total_xp).toBe(120);
      expect((await getXP(GAST)).total_xp).toBe(120);
    });

    it('spricht Supabase nie an', async () => {
      await updateStreak(GAST);
      await addXP(GAST, 50);
      await getXP(GAST);
      expect(supabase.__calls).toHaveLength(0);
    });

    it('schreibt nicht in den Konto-Cache', async () => {
      await addXP(GAST, 50);
      expect(readLocal('user_xp')).toBeNull();
    });
  });

  describe('Übernahme bei Registrierung', () => {
    it('legt die Gast-XP im Konto an und löscht den Gast-Schlüssel', async () => {
      writeLocal(GUEST_XP_KEY, { total_xp: 300, level: 2, streak_days: 3, last_workout_date: '2026-10-20' });
      supabase.__respond((rec) => (rec.ops.some((o) => o.op === 'maybeSingle') ? { data: null, error: null } : { data: [], error: null }));

      await syncLocalDataToCloud(KONTO);

      const [zeile] = supabase.__argsOf('user_xp', 'upsert');
      expect(zeile).toMatchObject({ user_id: KONTO, total_xp: 300, streak_days: 3, last_workout_date: '2026-10-20' });
      expect(readLocal(GUEST_XP_KEY)).toBeNull();
      expect(readLocal('user_xp').total_xp).toBe(300);
    });

    it('nimmt das Maximum der XP und den Streak des jüngeren Trainingstags', async () => {
      writeLocal(GUEST_XP_KEY, { total_xp: 100, streak_days: 1, last_workout_date: '2026-10-01' });
      supabase.__respond((rec) => (rec.ops.some((o) => o.op === 'maybeSingle')
        ? { data: { user_id: KONTO, total_xp: 900, streak_days: 5, last_workout_date: '2026-10-21' }, error: null }
        : { data: [], error: null }));

      await syncLocalDataToCloud(KONTO);

      const [zeile] = supabase.__argsOf('user_xp', 'upsert');
      expect(zeile).toMatchObject({ total_xp: 900, streak_days: 5, last_workout_date: '2026-10-21' });
    });

    it('lässt den Gast-Schlüssel stehen, wenn das Lesen scheitert', async () => {
      writeLocal(GUEST_XP_KEY, { total_xp: 100 });
      supabase.__respond({ data: null, error: { message: 'offline' } });
      await syncLocalDataToCloud(KONTO);
      expect(readLocal(GUEST_XP_KEY)).not.toBeNull();
    });
  });
});
