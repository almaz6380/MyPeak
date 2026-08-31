import { describe, it, expect } from 'vitest';
import handler from '../../api/start-trial.js';
import {
  makeReq, makeRes, installFetch, setEnv, ENV_FULL, jsonResponse,
  authRoute, restRoute, USER_ID,
} from '../helpers/apiHarness.js';

// /api/start-trial setzt die kostenlose 7-Tage-Testphase. Es ist der einzige
// Schreibzugriff auf `subscriptions`, den ein Nutzer selbst auslösen kann —
// entsprechend eng ist der erlaubte Rahmen: nie Premium, nie ein zweites Mal.
const subs = (rows, { onWrite } = {}) =>
  restRoute('subscriptions', (url, init) => {
    if (init.method === 'POST') {
      onWrite?.(JSON.parse(init.body));
      return jsonResponse([JSON.parse(init.body)]);
    }
    return jsonResponse(rows);
  });

const writes = (fetchMock) => fetchMock.to('/rest/v1/subscriptions').filter((c) => c.init.method === 'POST');

describe('/api/start-trial', () => {
  it('lehnt GET ab', async () => {
    setEnv(ENV_FULL);
    const res = makeRes();
    await handler(makeReq({ method: 'GET' }), res);
    expect(res.statusCode).toBe(405);
  });

  it('meldet 503, wenn die Service-Role fehlt', async () => {
    // Fail-closed: ohne Service-Role liefe der Schreibzugriff sonst gegen RLS
    // und schlüge still fehl — der Nutzer sähe eine Testphase, die es nicht gibt.
    setEnv({ ...ENV_FULL, SUPABASE_SERVICE_ROLE_KEY: undefined });
    const res = makeRes();
    await handler(makeReq({ headers: { authorization: 'Bearer t' } }), res);
    expect(res.statusCode).toBe(503);
  });

  describe('Gastmodus (kein Token)', () => {
    it('weist ab, ohne Supabase anzufassen', async () => {
      setEnv(ENV_FULL);
      const fetchMock = installFetch([]);
      const res = makeRes();
      await handler(makeReq({}), res);
      expect(res.statusCode).toBe(401);
      expect(res.body).toEqual({ error: 'Login required' });
      expect(fetchMock.calls).toHaveLength(0);
    });
  });

  describe('eingeloggt', () => {
    it('schreibt bei ungültigem Token nichts', async () => {
      setEnv(ENV_FULL);
      const fetchMock = installFetch([authRoute({ ok: false }), subs([])]);
      const res = makeRes();
      await handler(makeReq({ headers: { authorization: 'Bearer alt' } }), res);
      expect(res.statusCode).toBe(401);
      expect(writes(fetchMock)).toHaveLength(0);
    });

    it('startet die Testphase über 7 Tage für das Token-Konto', async () => {
      setEnv(ENV_FULL);
      let geschrieben;
      const fetchMock = installFetch([authRoute(), subs([], { onWrite: (b) => { geschrieben = b; } })]);
      const res = makeRes();
      const vorher = Date.now();
      await handler(makeReq({ headers: { authorization: 'Bearer gut' } }), res);

      expect(res.statusCode).toBe(200);
      expect(writes(fetchMock)).toHaveLength(1);
      expect(geschrieben.user_id).toBe(USER_ID);
      expect(geschrieben.status).toBe('trial');

      const dauerTage = (new Date(geschrieben.trial_ends_at) - new Date(geschrieben.trial_started_at)) / 86400000;
      expect(dauerTage).toBeCloseTo(7, 5);
      expect(new Date(geschrieben.trial_ends_at).getTime()).toBeGreaterThan(vorher);
    });

    it('setzt NIEMALS bezahltes Premium', async () => {
      // Der Kern der Härtung von 20260717100000: bezahltes Premium kommt
      // ausschließlich aus dem RevenueCat-Webhook. Käme `premium_until` von
      // hier, könnte sich jeder Eingeloggte ein Abo verschaffen.
      setEnv(ENV_FULL);
      let geschrieben;
      installFetch([authRoute(), subs([], { onWrite: (b) => { geschrieben = b; } })]);
      await handler(makeReq({ headers: { authorization: 'Bearer gut' } }), makeRes());

      expect(geschrieben).not.toHaveProperty('premium_until');
      expect(geschrieben.status).not.toBe('premium');
      expect(geschrieben.provider).toBe('none');
    });

    it('startet die Testphase kein zweites Mal', async () => {
      setEnv(ENV_FULL);
      const bestehend = {
        user_id: USER_ID,
        status: 'free',
        trial_started_at: '2026-01-01T00:00:00.000Z',
        trial_ends_at: '2026-01-08T00:00:00.000Z',
      };
      const fetchMock = installFetch([authRoute(), subs([bestehend])]);
      const res = makeRes();
      await handler(makeReq({ headers: { authorization: 'Bearer gut' } }), res);

      expect(res.statusCode).toBe(200);
      expect(res.body.alreadyUsed).toBe(true);
      expect(res.body.subscription.trial_ends_at).toBe(bestehend.trial_ends_at);
      expect(writes(fetchMock)).toHaveLength(0);
    });

    it('behält den provider einer bestehenden Zeile bei', async () => {
      // Verhindert, dass ein Trial-Start die Herkunft eines bereits
      // freigeschalteten Kontos (z. B. 'promo') auf 'none' zurücksetzt.
      setEnv(ENV_FULL);
      let geschrieben;
      installFetch([
        authRoute(),
        subs([{ user_id: USER_ID, status: 'free', provider: 'promo', trial_started_at: null }],
          { onWrite: (b) => { geschrieben = b; } }),
      ]);
      await handler(makeReq({ headers: { authorization: 'Bearer gut' } }), makeRes());
      expect(geschrieben.provider).toBe('promo');
    });

    it('meldet 503, wenn das Schreiben scheitert', async () => {
      setEnv(ENV_FULL);
      installFetch([
        authRoute(),
        restRoute('subscriptions', (url, init) =>
          init.method === 'POST' ? jsonResponse({ message: 'nope' }, 500) : jsonResponse([])),
      ]);
      const res = makeRes();
      await handler(makeReq({ headers: { authorization: 'Bearer gut' } }), res);
      expect(res.statusCode).toBe(503);
    });

    it('meldet 503, wenn die Token-Prüfung am Netz scheitert', async () => {
      setEnv(ENV_FULL);
      installFetch([authRoute({ throws: true }), subs([])]);
      const res = makeRes();
      await handler(makeReq({ headers: { authorization: 'Bearer gut' } }), res);
      expect(res.statusCode).toBe(503);
    });
  });
});
