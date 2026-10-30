import { describe, it, expect } from 'vitest';
import { schritteVerschmelzen, schrittAuswertung } from '../../src/lib/statistik.js';

const HEUTE = new Date(2026, 9, 30, 21); // 30. Oktober 2026, abends

describe('Schritte-Verlauf', () => {
  it('liefert genau n Tage bis heute, Lücken als null', () => {
    const v = schritteVerschmelzen([[{ datum: '2026-10-30', schritte: 4213 }]], 7, HEUTE);
    expect(v).toHaveLength(7);
    expect(v[0].datum).toBe('2026-10-24');
    expect(v[6]).toEqual({ datum: '2026-10-30', schritte: 4213, kcal: null });
    expect(v[3].schritte).toBeNull();
  });

  it('nimmt je Tag das Höchste aus allen Quellen', () => {
    const health = [{ datum: '2026-10-29', schritte: 8000, kcal: 310 }];
    const geraet = [{ datum: '2026-10-29', schritte: 9100 }, { datum: '2026-10-30', schritte: 100 }];
    const protokoll = [{ datum: '2026-10-30', schritte: 4213 }];
    const v = schritteVerschmelzen([health, geraet, protokoll], 2, HEUTE);
    expect(v).toEqual([
      { datum: '2026-10-29', schritte: 9100, kcal: 310 },
      { datum: '2026-10-30', schritte: 4213, kcal: null },
    ]);
  });

  it('ignoriert Tage außerhalb des Zeitraums und kaputte Einträge', () => {
    const v = schritteVerschmelzen([[{ datum: '2026-01-01', schritte: 5 }, null, { schritte: 3 }], null], 1, HEUTE);
    expect(v).toEqual([{ datum: '2026-10-30', schritte: null, kcal: null }]);
  });

  it('wertet aus: Schnitt nur über gemessene Tage, Ziel, bester Tag', () => {
    const a = schrittAuswertung([
      { datum: 'a', schritte: 12000, kcal: 400 },
      { datum: 'b', schritte: null, kcal: null },
      { datum: 'c', schritte: 6000, kcal: 200.4 },
    ], 10000);
    expect(a).toEqual({
      tageGemessen: 2, schnitt: 9000, summe: 18000,
      bester: { datum: 'a', schritte: 12000, kcal: 400 },
      zielErreicht: 1, kcalSumme: 600,
    });
  });

  it('leerer Verlauf ergibt Nullen', () => {
    expect(schrittAuswertung([], 10000)).toMatchObject({ tageGemessen: 0, schnitt: 0, bester: null, zielErreicht: 0 });
  });
});
