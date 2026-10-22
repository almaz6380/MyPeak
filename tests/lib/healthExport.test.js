import { describe, it, expect, vi, beforeEach } from 'vitest';
import { installBrowserStubs } from '../helpers/browserStubs.js';

const saveWorkout = vi.fn(async () => ({ saved: true }));
vi.mock('@capacitor/core', () => ({
  Capacitor: { isNativePlatform: () => true, getPlatform: () => 'ios' },
  registerPlugin: () => ({ saveWorkout, requestAuthorization: async () => ({ granted: true }) }),
}));
vi.mock('capacitor-health', () => ({ Health: {} }));
vi.mock('../../src/lib/supabase', () => ({ supabase: {} }));

const { workoutExportieren, workoutAktivitaet, exportEinschalten, exportAktiv } = await import('../../src/lib/health.js');

const U = 'guest';
beforeEach(() => { installBrowserStubs(); saveWorkout.mockClear(); });

describe('Workout-Export nach Health', () => {
  it('schreibt nichts ohne Opt-in', async () => {
    expect(await workoutExportieren(U, { type: 'cardio', duration: 600000, exercises: [] })).toBe(false);
    expect(saveWorkout).not.toHaveBeenCalled();
  });

  it('rechnet den Start aus Ende minus Dauer und gibt die Cardio-Art mit', async () => {
    await exportEinschalten(U);
    expect(exportAktiv(U)).toBe(true);
    const ende = new Date('2026-10-22T10:30:00.000Z');
    await workoutExportieren(U, { type: 'cardio', duration: 30 * 60000, exercises: [{ exerciseId: 'running' }] }, { ende });
    expect(saveWorkout).toHaveBeenCalledWith(expect.objectContaining({
      type: 'cardio', activity: 'running',
      start: '2026-10-22T10:00:00.000Z', end: '2026-10-22T10:30:00.000Z',
    }));
  });

  it('nimmt bei Kraft den echten Start', async () => {
    await exportEinschalten(U);
    const start = Date.parse('2026-10-22T09:00:00.000Z');
    await workoutExportieren(U, { type: 'strength', duration: 1, exercises: [] }, { start, ende: new Date('2026-10-22T10:00:00.000Z') });
    expect(saveWorkout.mock.calls[0][0]).toMatchObject({ type: 'strength', start: '2026-10-22T09:00:00.000Z' });
  });

  it('lässt Trainings unter einer Minute weg', async () => {
    await exportEinschalten(U);
    await workoutExportieren(U, { type: 'hiit', duration: 30000, exercises: [] });
    expect(saveWorkout).not.toHaveBeenCalled();
  });

  it('wirft nie, auch wenn das Plugin scheitert', async () => {
    await exportEinschalten(U);
    saveWorkout.mockRejectedValueOnce(new Error('kaputt'));
    await expect(workoutExportieren(U, { type: 'cardio', duration: 600000, exercises: [] })).resolves.toBe(false);
  });

  it('liest die Kampfsportart aus der Übungsliste', () => {
    expect(workoutAktivitaet({ exercises: [{ exerciseId: 'martial-arts-session', exerciseList: ['shadow-boxing'] }] })).toBe('boxing');
  });
});
