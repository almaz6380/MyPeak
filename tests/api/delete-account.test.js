import { describe, it, expect } from 'vitest';
import handler from '../../api/delete-account.js';
import {
  makeReq, makeRes, installFetch, setEnv, ENV_FULL, jsonResponse, textResponse,
  authRoute, USER_ID,
} from '../helpers/apiHarness.js';

// /api/delete-account löscht ein Konto unwiderruflich (DSGVO + App-Store-Pflicht).
// Der wichtigste Test ist deshalb nicht der Erfolgsfall, sondern: NIEMAND ohne
// gültiges eigenes Token darf den Löschbefehl auslösen.
const adminDelete = (status = 200) => ({
  match: (url) => url.includes('/auth/v1/admin/users/'),
  respond: () => (status === 200 ? jsonResponse({}, 200) : textResponse('nope', status)),
});

const deleteCalls = (fetchMock) => fetchMock.to('/auth/v1/admin/users/');

describe('/api/delete-account', () => {
  it('lehnt GET ab', async () => {
    setEnv(ENV_FULL);
    const res = makeRes();
    await handler(makeReq({ method: 'GET' }), res);
    expect(res.statusCode).toBe(405);
  });

  it('meldet 500, wenn die Service-Role fehlt', async () => {
    setEnv({ ...ENV_FULL, SUPABASE_SERVICE_ROLE_KEY: undefined });
    const res = makeRes();
    await handler(makeReq({ headers: { authorization: 'Bearer t' } }), res);
    expect(res.statusCode).toBe(500);
  });

  describe('Gastmodus (kein Token)', () => {
    it('weist ohne Authorization-Header ab und rührt Supabase nicht an', async () => {
      setEnv(ENV_FULL);
      const fetchMock = installFetch([]);
      const res = makeRes();
      await handler(makeReq({}), res);
      expect(res.statusCode).toBe(401);
      expect(res.body).toEqual({ error: 'Missing token' });
      expect(fetchMock.calls).toHaveLength(0);
    });

    it('weist einen leeren Bearer-Wert ab', async () => {
      setEnv(ENV_FULL);
      const fetchMock = installFetch([]);
      const res = makeRes();
      await handler(makeReq({ headers: { authorization: 'Bearer ' } }), res);
      expect(res.statusCode).toBe(401);
      expect(fetchMock.calls).toHaveLength(0);
    });
  });

  describe('eingeloggt', () => {
    it('löscht bei ungültigem Token NICHTS', async () => {
      setEnv(ENV_FULL);
      const fetchMock = installFetch([authRoute({ ok: false }), adminDelete()]);
      const res = makeRes();
      await handler(makeReq({ headers: { authorization: 'Bearer abgelaufen' } }), res);
      expect(res.statusCode).toBe(401);
      expect(deleteCalls(fetchMock)).toHaveLength(0);
    });

    it('löscht nichts, wenn das Token zwar 200 liefert, aber keine id enthält', async () => {
      setEnv(ENV_FULL);
      const fetchMock = installFetch([authRoute({ user: {} }), adminDelete()]);
      const res = makeRes();
      await handler(makeReq({ headers: { authorization: 'Bearer komisch' } }), res);
      expect(res.statusCode).toBe(401);
      expect(deleteCalls(fetchMock)).toHaveLength(0);
    });

    it('löscht genau das Konto aus dem Token — nicht eines aus dem Body', async () => {
      // Schutz gegen den naheliegenden Fehler, die zu löschende id aus der
      // Anfrage zu übernehmen: dann könnte jeder Eingeloggte fremde Konten löschen.
      setEnv(ENV_FULL);
      const fremd = 'ffffffff-ffff-4fff-8fff-ffffffffffff';
      const fetchMock = installFetch([authRoute(), adminDelete()]);
      const res = makeRes();
      await handler(makeReq({ headers: { authorization: 'Bearer gut' }, body: { user_id: fremd } }), res);

      expect(res.statusCode).toBe(200);
      expect(res.body).toEqual({ success: true });
      const calls = deleteCalls(fetchMock);
      expect(calls).toHaveLength(1);
      expect(calls[0].url).toContain(USER_ID);
      expect(calls[0].url).not.toContain(fremd);
      expect(calls[0].init.method).toBe('DELETE');
    });

    it('meldet 502, wenn Supabase das Löschen verweigert', async () => {
      setEnv(ENV_FULL);
      installFetch([authRoute(), adminDelete(500)]);
      const res = makeRes();
      await handler(makeReq({ headers: { authorization: 'Bearer gut' } }), res);
      expect(res.statusCode).toBe(502);
      expect(res.body).toEqual({ error: 'Deletion failed' });
    });

    it('meldet 503 statt zu werfen, wenn die Token-Prüfung am Netz scheitert', async () => {
      setEnv(ENV_FULL);
      installFetch([authRoute({ throws: true }), adminDelete()]);
      const res = makeRes();
      await handler(makeReq({ headers: { authorization: 'Bearer gut' } }), res);
      expect(res.statusCode).toBe(503);
    });
  });
});
