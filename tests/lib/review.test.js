// Bewertungsanfrage (src/lib/review.js): wann der System-Dialog angefragt wird.
// Die nativen Plugins sind Attrappen — geprueft wird nur die Entscheidung.
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { installBrowserStubs } from '../helpers/browserStubs.js';

const nativ = vi.hoisted(() => ({ wert: true }));
const requestReview = vi.hoisted(() => vi.fn(async () => {}));
const getWorkouts = vi.hoisted(() => vi.fn(async () => []));
const werbungPausieren = vi.hoisted(() => vi.fn());

vi.mock('@capacitor/core', () => ({ Capacitor: { isNativePlatform: () => nativ.wert } }));
vi.mock('@capacitor-community/in-app-review', () => ({ InAppReview: { requestReview } }));
vi.mock('../../src/data/workoutStorage', () => ({ getWorkouts }));
vi.mock('../../src/lib/ads', () => ({ werbungPausieren }));

const { maybeAskForReview, maybeAskForReviewNachEssen, essensTage } =
  await import('../../src/lib/review.js');

const workouts = (n) => Array.from({ length: n }, (_, i) => ({ id: `w${i}` }));
const essen = (tage) => Object.fromEntries(
  tage.map((d) => [`nutrition_entries_${d}`, JSON.stringify([{ id: d, calories: 100 }])]));

beforeEach(() => {
  installBrowserStubs();
  nativ.wert = true;
  requestReview.mockClear();
  werbungPausieren.mockClear();
  getWorkouts.mockReset();
});

describe('Bewertungsanfrage nach Training', () => {
  it('fragt im Browser nie', async () => {
    nativ.wert = false;
    getWorkouts.mockResolvedValue(workouts(10));
    expect(await maybeAskForReview('u1')).toBe(false);
    expect(requestReview).not.toHaveBeenCalled();
  });

  it('fragt nach dem 1. Training noch nicht', async () => {
    getWorkouts.mockResolvedValue(workouts(1));
    expect(await maybeAskForReview('u1')).toBe(false);
    expect(requestReview).not.toHaveBeenCalled();
  });

  it('fragt ab dem 2. Training und pausiert dabei die Werbung', async () => {
    getWorkouts.mockResolvedValue(workouts(2));
    expect(await maybeAskForReview('u1')).toBe(true);
    expect(requestReview).toHaveBeenCalledTimes(1);
    expect(werbungPausieren).toHaveBeenCalledTimes(1);
  });

  it('fragt auch Gäste', async () => {
    getWorkouts.mockResolvedValue(workouts(2));
    expect(await maybeAskForReview('guest')).toBe(true);
    expect(getWorkouts).toHaveBeenCalledWith('guest');
  });

  it('fragt innerhalb von 90 Tagen kein zweites Mal', async () => {
    getWorkouts.mockResolvedValue(workouts(5));
    await maybeAskForReview('u1');
    expect(await maybeAskForReview('u1')).toBe(false);
    expect(requestReview).toHaveBeenCalledTimes(1);
  });

  it('fragt nach 90 Tagen wieder', async () => {
    getWorkouts.mockResolvedValue(workouts(5));
    localStorage.setItem('fullrep.review.zuletzt.u1',
      new Date(Date.now() - 91 * 86400000).toISOString());
    expect(await maybeAskForReview('u1')).toBe(true);
  });

  it('ein kaputtes Merkdatum sperrt nicht dauerhaft', async () => {
    getWorkouts.mockResolvedValue(workouts(5));
    localStorage.setItem('fullrep.review.zuletzt.u1', 'kaputt');
    expect(await maybeAskForReview('u1')).toBe(true);
  });

  it('ein Fehler des Plugins bricht nichts', async () => {
    getWorkouts.mockResolvedValue(workouts(5));
    requestReview.mockRejectedValueOnce(new Error('nicht synchronisiert'));
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});
    expect(await maybeAskForReview('u1')).toBe(false);
    expect(warn).toHaveBeenCalled();
  });
});

describe('Bewertungsanfrage nach Essen', () => {
  it('zählt nur Tage mit mindestens einem Eintrag', () => {
    installBrowserStubs({
      ...essen(['2026-10-01', '2026-10-02']),
      'nutrition_entries_2026-10-03': '[]',
      'nutrition_entries_kaputt': '{nicht json',
      workouts: '[]',
    });
    expect(essensTage()).toBe(2);
  });

  it('fragt bei 2 Tagen noch nicht', async () => {
    installBrowserStubs(essen(['2026-10-01', '2026-10-02']));
    expect(await maybeAskForReviewNachEssen('u1')).toBe(false);
    expect(requestReview).not.toHaveBeenCalled();
  });

  it('fragt ab 3 Tagen', async () => {
    installBrowserStubs(essen(['2026-10-01', '2026-10-02', '2026-10-03']));
    expect(await maybeAskForReviewNachEssen('u1')).toBe(true);
    expect(requestReview).toHaveBeenCalledTimes(1);
  });

  it('teilt die 90-Tage-Sperre mit dem Training', async () => {
    installBrowserStubs(essen(['2026-10-01', '2026-10-02', '2026-10-03']));
    getWorkouts.mockResolvedValue(workouts(2));
    await maybeAskForReview('u1');
    expect(await maybeAskForReviewNachEssen('u1')).toBe(false);
    expect(requestReview).toHaveBeenCalledTimes(1);
  });
});
