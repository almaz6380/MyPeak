import { describe, it, expect } from 'vitest';
import handler from '../../api/health.js';
import { makeReq, makeRes, installFetch, setEnv, ENV_FULL, jsonResponse } from '../helpers/apiHarness.js';

// /api/health ist bewusst OHNE Anmeldung erreichbar: der tägliche Vercel-Cron
// ruft ihn auf, damit Supabase das Projekt im Free-Tier nicht nach 7 Tagen
// Inaktivität pausiert. Gast und eingeloggter Nutzer sehen hier dasselbe.
const dbRoute = (status) => ({
  match: (url) => url.includes('/rest/v1/community_products'),
  respond: () => jsonResponse([{ id: 1 }], status),
});

describe('/api/health', () => {
  it('meldet 500, wenn die Supabase-Konfiguration fehlt', async () => {
    setEnv({ ...ENV_FULL, SUPABASE_URL: undefined, VITE_SUPABASE_URL: undefined });
    const res = makeRes();
    await handler(makeReq({ method: 'GET' }), res);
    expect(res.statusCode).toBe(500);
    expect(res.body).toEqual({ ok: false, error: 'not configured' });
  });

  it('meldet ok, wenn die Datenbank antwortet', async () => {
    setEnv(ENV_FULL);
    installFetch([dbRoute(200)]);
    const res = makeRes();
    await handler(makeReq({ method: 'GET' }), res);
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({ ok: true, db: 200 });
  });

  it('verwendet den anon-Key, nicht die Service-Role', async () => {
    // Der Endpunkt ist offen im Netz. Käme hier die Service-Role zum Einsatz,
    // liefe ein unauthentifizierter Aufruf mit vollen Rechten gegen die DB.
    setEnv(ENV_FULL);
    const fetchMock = installFetch([dbRoute(200)]);
    await handler(makeReq({ method: 'GET' }), makeRes());
    const headers = fetchMock.calls[0].init.headers;
    expect(headers.apikey).toBe('anon-key');
    expect(headers.Authorization).toBe('Bearer anon-key');
    expect(JSON.stringify(headers)).not.toContain('service-key');
  });

  it('meldet 502, wenn die Datenbank einen Fehler liefert', async () => {
    setEnv(ENV_FULL);
    installFetch([dbRoute(503)]);
    const res = makeRes();
    await handler(makeReq({ method: 'GET' }), res);
    expect(res.statusCode).toBe(502);
    expect(res.body).toEqual({ ok: false, db: 503 });
  });

  it('meldet 502 statt zu werfen, wenn das Netz ausfällt', async () => {
    setEnv(ENV_FULL);
    installFetch([{ match: () => true, respond: () => { throw new Error('ECONNREFUSED'); } }]);
    const res = makeRes();
    await handler(makeReq({ method: 'GET' }), res);
    expect(res.statusCode).toBe(502);
    expect(res.body).toEqual({ ok: false, error: 'db unreachable' });
  });
});
