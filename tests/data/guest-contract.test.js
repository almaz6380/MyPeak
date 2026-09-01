import { describe, it, expect, vi, beforeEach } from 'vitest';
import { installBrowserStubs } from '../helpers/browserStubs.js';

const { supabase } = await vi.hoisted(async () => {
  const { makeSupabaseMock } = await import('../helpers/supabaseMock.js');
  return { supabase: makeSupabaseMock() };
});
vi.mock('../../src/lib/supabase', () => ({ supabase }));

// Übergreifende Zusage an den Gast: „Deine Daten bleiben auf dem Gerät."
//
// Die Tests je Bereich prüfen die wichtigen Funktionen einzeln. Dieser hier
// ruft jede nutzerbezogene Funktion der Storage-Module mit userId 'guest' auf
// und prüft nur eines: dass dabei nichts nach außen geht — weder über den
// Supabase-Client noch über fetch. So fällt eine künftige Funktion ohne
// isGuest-Weiche auf, auch wenn niemand an einen eigenen Test dafür denkt.
const MODULE = [
  'workoutStorage', 'nutritionStorage', 'settingsStorage', 'socialStorage',
  'supplementStorage', 'cycleStorage', 'weightStorage', 'dietStorage',
  'achievementStorage', 'subscriptionStorage',
];

// Ganze Module, die absichtlich nach außen sprechen — mit Begründung, damit
// die Liste nicht stillschweigend wächst.
const MODUL_AUSNAHMEN = {
  coachStorage: 'Serveraufruf gewollt; api/coach.js weist Gäste ohne Token ab',
  communityProducts: 'geteilter Produktkatalog, nicht an ein Konto gebunden',
  resync: 'läuft ausschließlich beim Wechsel Gast → Konto',
};

// Einzelne Funktionen, die trotz passender Signatur nach außen dürfen.
const FUNKTION_AUSNAHMEN = {
  purchasePremium: 'Kauf-Ablauf, geht absichtlich zum Zahlungsanbieter',
  restorePurchases: 'Kauf-Ablauf',
  getPremiumPriceString: 'Kauf-Ablauf',
};

// Liest den ersten Parameternamen aus der Funktionsquelle. Nur Funktionen, die
// wirklich mit `userId` beginnen, lassen sich sinnvoll mit 'guest' aufrufen —
// bei `lookupFriendCode(code)` wäre 'guest' schlicht ein Freundescode und ein
// Supabase-Aufruf völlig richtig.
function ersterParameter(fn) {
  const quelle = Function.prototype.toString.call(fn);
  const klammer = quelle.slice(quelle.indexOf('(') + 1, quelle.indexOf(')'));
  return klammer.split(',')[0].trim().replace(/[={].*$/s, '').trim();
}

// Füllargumente: wir wollen nicht die Fachlogik treffen, sondern nur sehen, ob
// eine Funktion trotz Gastmodus nach außen greift. Was damit nicht zurechtkommt,
// wirft — auch das beweist, dass es nie bis zum Netz kam.
const FUELL = ['x', 'y', {}, 1];

beforeEach(() => { installBrowserStubs(); supabase.__reset(); });

describe('Gast-Zusage: nichts verlässt das Gerät', () => {
  for (const name of MODULE) {
    it(`${name} ruft für einen Gast weder Supabase noch fetch`, async () => {
      const mod = await import(`../../src/data/${name}.js`);
      const fetchMock = vi.fn(() => { throw new Error('Netzaufruf im Gastmodus'); });
      vi.stubGlobal('fetch', fetchMock);

      const geprueft = [];
      for (const [fnName, fn] of Object.entries(mod)) {
        if (typeof fn !== 'function') continue;
        if (fnName in FUNKTION_AUSNAHMEN) continue;
        if (ersterParameter(fn) !== 'userId') continue;

        geprueft.push(fnName);
        supabase.__reset();
        fetchMock.mockClear();
        try {
          await fn('guest', ...FUELL.slice(0, Math.max(0, fn.length - 1)));
        } catch {
          // Unpassende Füllargumente sind in Ordnung — geprüft wird der Ausgang.
        }
        expect(
          supabase.__tables(),
          `${name}.${fnName}() hat als Gast auf Supabase zugegriffen`,
        ).toEqual([]);
        expect(
          fetchMock.mock.calls.length,
          `${name}.${fnName}() hat als Gast einen Netzaufruf gemacht`,
        ).toBe(0);
      }

      expect(geprueft.length, `In ${name} wurde keine nutzerbezogene Funktion geprüft`)
        .toBeGreaterThan(0);
    });
  }

  it('legt offen, welche Funktionen der Automat nicht beurteilen kann', async () => {
    // Diese Funktionen beginnen nicht mit `userId` und werden oben übersprungen.
    // Die Liste steht hier, damit ein neuer Zugang nicht unbemerkt hinzukommt:
    // schlägt der Test fehl, ist zu entscheiden, ob die neue Funktion für
    // Gäste erreichbar ist — und sie gehört dann in einen eigenen Test.
    //
    // Für die heutigen gilt: alle gehören zum Freunde-/Challenge-System, und
    // dessen drei Bildschirme sind für Gäste gesperrt (FriendsList.jsx:65,
    // ChallengesList.jsx:32, Leaderboard.jsx:25).
    const uebersprungen = [];
    for (const name of MODULE) {
      const mod = await import(`../../src/data/${name}.js`);
      for (const [fnName, fn] of Object.entries(mod)) {
        if (typeof fn === 'function' && ersterParameter(fn) !== 'userId') {
          uebersprungen.push(`${name}.${fnName}`);
        }
      }
    }

    // Die Liste zerfällt in drei Gruppen, alle unbedenklich:
    //  1. reine Rechenhelfer (getCyclePhase, calculateDietGoals, getLevelTitle …)
    //     — kein Speicher, kein Netz;
    //  2. settingsStorage.*DefaultPlan* — Standardpläne aus-/einblenden, reine
    //     localStorage-Sache, gerätebezogen statt kontobezogen (eigene Tests
    //     dafür stehen in customPlans.test.js);
    //  3. socialStorage.* mit einer Fremd-Kennung als erstem Argument — deren
    //     drei Bildschirme sind für Gäste ohnehin gesperrt (FriendsList.jsx:65,
    //     ChallengesList.jsx:32, Leaderboard.jsx:25).
    expect(uebersprungen.sort()).toEqual([
      'cycleStorage.getCyclePhase',
      'cycleStorage.getPhaseRecommendations',
      'dietStorage.calculateDietGoals',
      'dietStorage.getCurrentPhase',
      'settingsStorage.getHiddenDefaultPlans',
      'settingsStorage.getPermanentDeletedDefaultPlans',
      'settingsStorage.hideDefaultPlan',
      'settingsStorage.permanentDeleteDefaultPlan',
      'settingsStorage.restoreDefaultPlan',
      'settingsStorage.saveHiddenDefaultPlans',
      'socialStorage.calculateLevel',
      'socialStorage.completeChallenge',
      'socialStorage.generateFriendCode',
      'socialStorage.getLeaderboardCategory',
      'socialStorage.getLevelTitle',
      'socialStorage.hasGoldenFrame',
      'socialStorage.lookupFriendCode',
      'socialStorage.removeFriend',
      'socialStorage.respondToChallenge',
      'socialStorage.respondToFriendRequest',
      'socialStorage.updateChallengeScore',
      'socialStorage.xpForLevel',
      'subscriptionStorage.computeAccess',
      'supplementStorage.getSupplementProgress',
      'supplementStorage.getTodayScheduledSupplements',
      'workoutStorage.getPlanType',
      'workoutStorage.getScheduledDaysForMonth',
    ]);
  });

  it('nennt jede Ausnahme mit Begründung', () => {
    for (const [name, grund] of Object.entries({ ...MODUL_AUSNAHMEN, ...FUNKTION_AUSNAHMEN })) {
      expect(grund, `Ausnahme ${name} ohne Begründung`).toBeTruthy();
    }
  });
});
