// Werbebremse (src/lib/ads.js): wann ein Interstitial erlaubt ist.
// Geprüft wird nur die reine Regel — AdMob selbst bleibt außen vor.
import { describe, it, expect, vi } from 'vitest';

vi.mock('@capacitor/core', () => ({
  Capacitor: { isNativePlatform: () => false, getPlatform: () => 'web' },
}));

const {
  interstitialErlaubt,
  INTERSTITIAL_MIN_GAP_MS,
  INTERSTITIAL_START_SPERRE_MS,
  INTERSTITIAL_MAX_PRO_SITZUNG,
} = await import('../../src/lib/ads.js');

const START = 1_000_000;
const basis = { appStart: START, letzte: 0, gezeigt: 0, aktion: 2 };

describe('interstitialErlaubt', () => {
  it('erlaubt die 2. Aktion nach Startsperre und ohne Vorgänger', () => {
    expect(interstitialErlaubt({ ...basis, jetzt: START + INTERSTITIAL_START_SPERRE_MS })).toBe(true);
  });

  it('nur jede zweite Aktion', () => {
    expect(interstitialErlaubt({ ...basis, aktion: 3, jetzt: START + 120_000 })).toBe(false);
  });

  it('keine Anzeige in den ersten 60 s nach dem Start', () => {
    expect(interstitialErlaubt({ ...basis, jetzt: START + INTERSTITIAL_START_SPERRE_MS - 1 })).toBe(false);
  });

  it('mindestens 90 s Abstand zur letzten Anzeige', () => {
    const letzte = START + 100_000;
    expect(interstitialErlaubt({ ...basis, letzte, jetzt: letzte + INTERSTITIAL_MIN_GAP_MS - 1 })).toBe(false);
    expect(interstitialErlaubt({ ...basis, letzte, jetzt: letzte + INTERSTITIAL_MIN_GAP_MS })).toBe(true);
  });

  it('höchstens 3 pro Sitzung', () => {
    const jetzt = START + 10 * 60_000;
    expect(interstitialErlaubt({ ...basis, gezeigt: INTERSTITIAL_MAX_PRO_SITZUNG - 1, jetzt })).toBe(true);
    expect(interstitialErlaubt({ ...basis, gezeigt: INTERSTITIAL_MAX_PRO_SITZUNG, jetzt })).toBe(false);
  });
});
