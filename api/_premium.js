// Gemeinsame Pruefung fuer die Premium-Endpunkte (scan-label, meal-plan).
//
// Dieselbe Kette wie in coach.js — Konfiguration, Token, Abo — als eine
// Funktion, damit die neuen Endpunkte sie nicht ein drittes und viertes Mal
// abschreiben. coach.js selbst bleibt unangetastet: seine Tests haengen an
// genau dieser Reihenfolge, und es gibt keinen Grund, sie jetzt zu bewegen.
//
// Reihenfolge ist Absicht: ERST Anmeldung und Abo, DANN das Modell. Ein
// Modellaufruf vor der Pruefung kostet Geld fuer jemanden, der nicht zahlt.

export async function sbFetch(supabaseUrl, serviceKey, path, init = {}) {
  return fetch(`${supabaseUrl}/rest/v1/${path}`, {
    ...init,
    headers: {
      apikey: serviceKey,
      Authorization: `Bearer ${serviceKey}`,
      'Content-Type': 'application/json',
      ...(init.headers || {}),
    },
    signal: init.signal || AbortSignal.timeout(8000),
  });
}

// Liefert entweder { fehler: { status, body } } oder
// { userId, plan: 'premium' | 'trial', supabaseUrl, serviceKey }.
export async function premiumPruefen(req) {
  const supabaseUrl = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL;
  const anonKey = process.env.SUPABASE_ANON_KEY || process.env.VITE_SUPABASE_ANON_KEY;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  // Fail-closed: ohne Konfiguration keine (kostenpflichtige) Nutzung.
  if (!supabaseUrl || !anonKey || !serviceKey) {
    return { fehler: { status: 503, body: { error: 'Service unavailable' } } };
  }

  const token = (req.headers?.authorization || '').replace(/^Bearer\s+/i, '');
  if (!token) return { fehler: { status: 401, body: { error: 'Login required' } } };

  let userId;
  try {
    const userRes = await fetch(`${supabaseUrl}/auth/v1/user`, {
      headers: { apikey: anonKey, Authorization: `Bearer ${token}` },
      signal: AbortSignal.timeout(8000),
    });
    if (!userRes.ok) return { fehler: { status: 401, body: { error: 'Invalid token' } } };
    userId = (await userRes.json())?.id;
  } catch {
    return { fehler: { status: 503, body: { error: 'Auth check failed' } } };
  }
  if (!userId) return { fehler: { status: 401, body: { error: 'Invalid token' } } };

  try {
    const subRes = await sbFetch(supabaseUrl, serviceKey,
      `subscriptions?user_id=eq.${userId}&select=trial_ends_at,premium_until`);
    const rows = subRes.ok ? await subRes.json() : [];
    const sub = rows[0] || {};
    const jetzt = Date.now();
    if (sub.premium_until && new Date(sub.premium_until).getTime() > jetzt) {
      return { userId, plan: 'premium', supabaseUrl, serviceKey };
    }
    if (sub.trial_ends_at && new Date(sub.trial_ends_at).getTime() > jetzt) {
      return { userId, plan: 'trial', supabaseUrl, serviceKey };
    }
    return { fehler: { status: 403, body: { error: 'premium_required' } } };
  } catch {
    return { fehler: { status: 503, body: { error: 'Subscription check failed' } } };
  }
}

// ── Tageskontingent in coach_usage ────────────────────────────────
// Der Ernaehrungsplan zaehlt wie eine Coach-Frage. Eine eigene Tabelle haette
// eine Migration gebraucht; so teilen sich beide das Kontingent, und niemand
// kann ueber den Plan-Endpunkt mehr Modellaufrufe ausloesen als ueber den Coach.
export const TRIAL_LIMIT = 5;
export const PREMIUM_LIMIT = 30;

export function heuteUTC() {
  return new Date().toISOString().slice(0, 10);
}

export async function kontingentLesen({ supabaseUrl, serviceKey, userId }) {
  const uRes = await sbFetch(supabaseUrl, serviceKey,
    `coach_usage?user_id=eq.${userId}&date=eq.${heuteUTC()}&select=count`);
  const rows = uRes.ok ? await uRes.json() : [];
  return rows[0]?.count || 0;
}

export async function kontingentHochzaehlen({ supabaseUrl, serviceKey, userId }, bisher) {
  try {
    await sbFetch(supabaseUrl, serviceKey, 'coach_usage', {
      method: 'POST',
      headers: { Prefer: 'resolution=merge-duplicates' },
      body: JSON.stringify({ user_id: userId, date: heuteUTC(), count: bisher + 1, updated_at: new Date().toISOString() }),
    });
  } catch (err) {
    console.error('Kontingent nicht hochgezaehlt (nicht fatal):', err?.message);
  }
}

// ── Gemini mit JSON-Antwort ───────────────────────────────────────
// ⚠ Modellname NIE raten — mit /api/gemini-modelle?probe=<name> nachmessen.
// Gleicher Name wie in coach.js und analyze-meal.js.
export const GEMINI_MODELL = 'gemini-3.6-flash';

export async function geminiJson(apiKey, { system, parts, maxTokens = 2048, timeoutMs = 25000 }) {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODELL}:generateContent?key=${apiKey}`;
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      ...(system ? { system_instruction: { parts: [{ text: system }] } } : {}),
      contents: [{ role: 'user', parts }],
      generationConfig: { temperature: 0.3, maxOutputTokens: maxTokens, responseMimeType: 'application/json' },
    }),
    signal: AbortSignal.timeout(timeoutMs),
  });
  if (!res.ok) throw new Error('gemini_' + res.status);
  const data = await res.json();
  const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!text) throw new Error('gemini_empty');
  // Manche Modelle legen trotz responseMimeType einen ```json-Zaun drum.
  const sauber = text.trim().replace(/^```(?:json)?\s*/i, '').replace(/```\s*$/, '');
  return JSON.parse(sauber);
}

// Sprachnamen fuer Prompts: Der Code allein ('pt') laesst das Modell raten.
export const SPRACHNAME = {
  de: 'German (Deutsch)',
  en: 'English',
  es: 'Spanish (español)',
  fr: 'French (français)',
  pt: 'Brazilian Portuguese (português do Brasil)',
  ar: 'Arabic (العربية)',
  nl: 'Dutch (Nederlands)',
  pl: 'Polish (polski)',
};

export function zahl(wert, max = 100000) {
  const n = Number(wert);
  if (!Number.isFinite(n) || n < 0) return 0;
  return Math.min(n, max);
}
