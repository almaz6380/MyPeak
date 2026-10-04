import { describe, it, expect, vi, afterEach } from 'vitest';
import { readdirSync } from 'node:fs';
import { join } from 'node:path';
import { onRequest, ENDPUNKTE } from '../../functions/api/[[pfad]].js';

// Cloudflare Pages ruft die api/-Handler ueber functions/api/[[pfad]].js auf
// (seit dem Umzug von Vercel, 04.10.2026). Hier wird die Bruecke geprueft,
// nicht die Fachlogik — die steht in tests/api/.

const ENV = {
  SUPABASE_URL: 'https://beispiel.supabase.co',
  SUPABASE_ANON_KEY: 'anon-attrappe',
  SUPABASE_SERVICE_ROLE_KEY: 'service-attrappe',
  CRON_SECRET: 'cron-attrappe',
  REVENUECAT_WEBHOOK_SECRET: 'rc-attrappe',
};

const gesetzt = Object.keys(ENV);
afterEach(() => {
  for (const k of gesetzt) delete process.env[k];
});

function aufruf(pfad, { method = 'GET', headers = {}, body } = {}) {
  const request = new Request(`https://fullrep.pages.dev/api/${pfad}`, { method, headers, body });
  return onRequest({ request, env: ENV, params: { pfad: pfad.split('/') } });
}

describe('Cloudflare-Bruecke fuer api/', () => {
  it('kennt jeden Endpunkt aus api/ — und nur die', () => {
    const dateien = readdirSync(join(process.cwd(), 'api'))
      .filter((f) => f.endsWith('.js') && !f.startsWith('_'))
      .map((f) => f.replace(/\.js$/, ''))
      .sort();
    expect(Object.keys(ENDPUNKTE).sort()).toEqual(dateien);
  });

  it('reicht env als process.env durch und liefert JSON', async () => {
    const fetchMock = vi.fn(async () => new Response('[]', { status: 200 }));
    vi.stubGlobal('fetch', fetchMock);
    const antwort = await aufruf('health');
    expect(antwort.status).toBe(200);
    expect(antwort.headers.get('content-type')).toContain('application/json');
    expect(await antwort.json()).toEqual({ ok: true, db: 200 });
    expect(String(fetchMock.mock.calls[0][0])).toContain('https://beispiel.supabase.co/rest/v1/');
  });

  it('beantwortet den Preflight der iOS-App mit 204 und CORS-Kopf', async () => {
    const antwort = await aufruf('coach', {
      method: 'OPTIONS',
      headers: { Origin: 'capacitor://localhost' },
    });
    expect(antwort.status).toBe(204);
    expect(antwort.headers.get('access-control-allow-origin')).toBe('capacitor://localhost');
    expect(await antwort.text()).toBe('');
  });

  it('liest Authorization-Kopf und JSON-Body wie Vercel', async () => {
    vi.stubGlobal('fetch', vi.fn(async () => { throw new Error('kein Netz im Test'); }));
    const ohne = await aufruf('backup', { method: 'POST' });
    expect(ohne.status).toBe(401);
    // Webhook: richtiges Secret im Kopf, Ereignis im JSON-Body. Kommt der Body
    // nicht als Objekt an, antwortet der Handler 400 „No event".
    const webhook = await aufruf('revenuecat-webhook', {
      method: 'POST',
      headers: { 'content-type': 'application/json', authorization: 'Bearer rc-attrappe' },
      body: JSON.stringify({ event: { type: 'TEST', app_user_id: '$RCAnonymousID:abc' } }),
    });
    expect(webhook.status).toBe(200);
    expect(await webhook.json()).toEqual({ ignored: 'no mappable user' });
  });

  it('weist kaputtes JSON mit 400 ab', async () => {
    const antwort = await aufruf('coach', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: '{kaputt',
    });
    expect(antwort.status).toBe(400);
  });

  it('veroeffentlicht keine Hilfsdateien und keine unbekannten Pfade', async () => {
    for (const pfad of ['_cors', '_coachKnowledge', 'gibtsnicht', 'toString', 'coach/extra']) {
      expect((await aufruf(pfad)).status, pfad).toBe(404);
    }
  });
});
