import { describe, it, expect, vi } from 'vitest';

// Bilder gibt es im Node-Prüfstand nicht — der Pfad genügt.
vi.mock('@capacitor/core', () => ({ Capacitor: { getPlatform: () => 'web' } }));

import { WELLAPPS, EIGENE_APP, istIOS, storeLink } from '../../src/lib/wellapps.js';
import { SPRACHEN } from '../../src/lib/sprache.js';
import { readFileSync } from 'fs';

describe('Mehr von WellApps', () => {
  it('zeigt sechs Apps, die eigene nicht', () => {
    expect(WELLAPPS.map((a) => a.id)).toEqual(
      ['mahjong', 'fixthemix', 'anigosha', 'swaply', 'weltgeschichte', 'watten']);
    expect(WELLAPPS.some((a) => a.id === EIGENE_APP)).toBe(false);
  });

  it('baut den Store-Link je Plattform', () => {
    const m = WELLAPPS[0];
    expect(storeLink(m, true)).toBe('https://apps.apple.com/app/id6787721454');
    expect(storeLink(m, false)).toBe('https://play.google.com/store/apps/details?id=com.mahjongroyale.app');
  });

  it('erkennt iOS nativ, im iPhone-Browser und auf dem iPad', () => {
    expect(istIOS('ios', {})).toBe(true);
    expect(istIOS('android', { userAgent: 'iPhone' })).toBe(false);
    expect(istIOS('web', { userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 18_0)' })).toBe(true);
    expect(istIOS('web', { userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X)', maxTouchPoints: 5 })).toBe(true);
    expect(istIOS('web', { userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X)', maxTouchPoints: 0 })).toBe(false);
    expect(istIOS('web', { userAgent: 'Mozilla/5.0 (Linux; Android 15)' })).toBe(false);
  });

  it('hat Überschrift und jede Kurzzeile in jeder Sprache', () => {
    for (const s of SPRACHEN) {
      const w = JSON.parse(readFileSync(`src/i18n/locales/${s}.json`, 'utf8')).wellapps;
      expect(w.title, s).toContain('WellApps');
      for (const a of WELLAPPS) {
        expect(w.tagline[a.id], `${s}/${a.id}`).toBeTruthy();
        if (a.nameKey) expect(w.worldHistory, s).toBeTruthy();
      }
    }
  });
});
