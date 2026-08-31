// Prüfstand für die Vercel-Serverless-Funktionen in api/.
//
// Die Handler sind gewöhnliche `(req, res)`-Funktionen und sprechen nach außen
// ausschließlich über das globale `fetch`. Beides lässt sich hier ersetzen,
// deshalb laufen die Tests ohne Netz, ohne Supabase und ohne Vercel.
import { vi, expect } from 'vitest';

// ── Request / Response ────────────────────────────────────────────
// Vercel reicht Header kleingeschrieben durch; die Handler lesen
// `req.headers.authorization`. Wir bilden das nach, damit ein Test mit
// 'Authorization' nicht versehentlich an der Groß-/Kleinschreibung vorbeiläuft.
export function makeReq({ method = 'POST', headers = {}, body } = {}) {
  const lower = {};
  for (const [key, value] of Object.entries(headers)) lower[key.toLowerCase()] = value;
  return { method, headers: lower, body };
}

export function makeRes() {
  const res = {
    statusCode: undefined,
    body: undefined,
    status(code) { res.statusCode = code; return res; },
    json(payload) { res.body = payload; return res; },
  };
  return res;
}

// ── fetch-Attrappe ────────────────────────────────────────────────
export function jsonResponse(body, status = 200) {
  return {
    ok: status >= 200 && status < 300,
    status,
    json: async () => body,
    text: async () => JSON.stringify(body),
  };
}

export function textResponse(text, status = 200) {
  return {
    ok: status >= 200 && status < 300,
    status,
    json: async () => JSON.parse(text),
    text: async () => text,
  };
}

// Baut ein `fetch`, das nur die ausdrücklich erlaubten Ziele bedient.
//
// Der Kern ist die letzte Zeile: ein NICHT eingeplanter Aufruf wirft. Damit
// fällt genau der teure Fehler auf, den man sonst erst auf der Rechnung sieht —
// ein Endpunkt, der Gemini oder Claude anruft, BEVOR er die Anmeldung geprüft
// hat. Ohne diesen Wurf liefe so ein Test grün durch.
export function routeFetch(routes) {
  const calls = [];
  const fetchMock = vi.fn(async (url, init = {}) => {
    const target = String(url);
    calls.push({ url: target, init, body: parseBody(init.body) });
    for (const route of routes) {
      if (route.match(target, init)) return route.respond(target, init);
    }
    throw new Error(`Nicht eingeplanter fetch-Aufruf im Test: ${init.method || 'GET'} ${target}`);
  });
  fetchMock.calls = calls;
  fetchMock.to = (fragment) => calls.filter((c) => c.url.includes(fragment));
  return fetchMock;
}

function parseBody(body) {
  if (typeof body !== 'string') return body;
  try { return JSON.parse(body); } catch { return body; }
}

export function installFetch(routes) {
  const fetchMock = routeFetch(routes);
  vi.stubGlobal('fetch', fetchMock);
  return fetchMock;
}

// ── Umgebung ──────────────────────────────────────────────────────
// `vi.stubEnv` wird durch `unstubEnvs` in der vitest-Konfiguration nach jedem
// Test zurückgesetzt. Ein `undefined`-Wert löscht die Variable — damit lassen
// sich die fail-closed-Pfade (fehlende Konfiguration) prüfen.
export function setEnv(vars) {
  for (const [key, value] of Object.entries(vars)) vi.stubEnv(key, value);
}

export const ENV_FULL = {
  SUPABASE_URL: 'https://projekt.supabase.co',
  VITE_SUPABASE_URL: undefined,
  SUPABASE_ANON_KEY: 'anon-key',
  VITE_SUPABASE_ANON_KEY: undefined,
  SUPABASE_SERVICE_ROLE_KEY: 'service-key',
  GEMINI_API_KEY: 'gemini-key',
  ANTHROPIC_API_KEY: undefined,
  REVENUECAT_WEBHOOK_SECRET: 'rc-secret',
  CRON_SECRET: 'cron-secret',
};

// ── Bausteine für die Supabase-Routen ─────────────────────────────
export const USER_ID = '0288280c-8ff4-4780-ab64-132bd63a65a2';

// Supabase `/auth/v1/user`: löst das Nutzer-Token auf.
export function authRoute({ ok = true, user = { id: USER_ID }, status = 200, throws = false } = {}) {
  return {
    match: (url) => url.includes('/auth/v1/user'),
    respond: () => {
      if (throws) throw new Error('network down');
      return jsonResponse(user, ok ? status : 401);
    },
  };
}

// PostgREST-Route auf eine Tabelle (Lesen wie Schreiben).
export function restRoute(table, respond) {
  return {
    match: (url) => url.includes(`/rest/v1/${table}`),
    respond,
  };
}

// ── Zeit ──────────────────────────────────────────────────────────
// Macht `setTimeout` sofortig. Die Wiederholungsschleife in analyze-meal
// wartet sonst real 2+4+8 Sekunden pro Test.
export function useInstantTimers() {
  vi.stubGlobal('setTimeout', (fn) => { fn(); return 0; });
}

// ── Zusicherung ───────────────────────────────────────────────────
// Kein Aufruf an einen kostenpflichtigen Modellanbieter.
export function expectNoModelCall(fetchMock) {
  const paid = fetchMock.calls.filter(
    (c) => c.url.includes('generativelanguage.googleapis.com') || c.url.includes('api.anthropic.com'),
  );
  expect(paid, `Es wurde ein KI-Anbieter aufgerufen: ${paid.map((c) => c.url).join(', ')}`).toHaveLength(0);
}
