// MyPeak: Trial serverseitig starten — Vercel Serverless Function.
// Setzt einmalig die kostenlose 7-Tage-Testphase in `subscriptions`.
// Läuft über die Service-Role, weil der Client seit der Härtung
// (20260717100000_subscriptions_server_only.sql) nicht mehr in die
// Tabelle schreiben darf. Bezahltes Premium wird hier NIE gesetzt —
// das macht ausschließlich der RevenueCat-Webhook.
//
// Benötigte Env-Vars: SUPABASE_URL(+ANON), SUPABASE_SERVICE_ROLE_KEY.

const TRIAL_DAYS = 7;

async function sbFetch(supabaseUrl, serviceKey, path, init = {}) {
  return fetch(`${supabaseUrl}/rest/v1/${path}`, {
    ...init,
    headers: {
      apikey: serviceKey,
      Authorization: `Bearer ${serviceKey}`,
      'Content-Type': 'application/json',
      ...(init.headers || {}),
    },
  });
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const supabaseUrl = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL;
  const anonKey = process.env.SUPABASE_ANON_KEY || process.env.VITE_SUPABASE_ANON_KEY;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  // Fail-closed: ohne vollständige Konfiguration keine Schreibaktion.
  if (!supabaseUrl || !anonKey || !serviceKey) {
    console.error('start-trial: Supabase not fully configured');
    return res.status(503).json({ error: 'Service unavailable' });
  }

  // 1) Auth: gültiges Nutzer-Token nötig.
  const token = (req.headers.authorization || '').replace(/^Bearer\s+/i, '');
  if (!token) return res.status(401).json({ error: 'Login required' });

  let userId;
  try {
    const userRes = await fetch(`${supabaseUrl}/auth/v1/user`, {
      headers: { apikey: anonKey, Authorization: `Bearer ${token}` },
      signal: AbortSignal.timeout(8000),
    });
    if (!userRes.ok) return res.status(401).json({ error: 'Invalid token' });
    const user = await userRes.json();
    userId = user?.id;
  } catch {
    return res.status(503).json({ error: 'Auth check failed' });
  }
  if (!userId) return res.status(401).json({ error: 'Invalid token' });

  // 2) Bestehenden Status lesen — Trial ist einmalig.
  let existing;
  try {
    const r = await sbFetch(supabaseUrl, serviceKey, `subscriptions?user_id=eq.${userId}&select=*`);
    const rows = r.ok ? await r.json() : [];
    existing = rows[0] || null;
  } catch {
    return res.status(503).json({ error: 'Lookup failed' });
  }

  if (existing?.trial_started_at) {
    // Trial schon einmal genutzt → unverändert zurückgeben (kein Reset).
    return res.status(200).json({ subscription: existing, alreadyUsed: true });
  }

  // 3) Trial setzen (nur Trial-Felder, kein premium_until).
  const now = new Date();
  const ends = new Date(now.getTime() + TRIAL_DAYS * 86400000);
  const row = {
    user_id: userId,
    status: 'trial',
    trial_started_at: now.toISOString(),
    trial_ends_at: ends.toISOString(),
    provider: existing?.provider || 'none',
    updated_at: now.toISOString(),
  };

  try {
    const up = await sbFetch(supabaseUrl, serviceKey, 'subscriptions', {
      method: 'POST',
      headers: { Prefer: 'resolution=merge-duplicates,return=representation' },
      body: JSON.stringify(row),
    });
    if (!up.ok) {
      console.error('start-trial upsert failed:', up.status);
      return res.status(503).json({ error: 'Save failed' });
    }
    const saved = await up.json();
    return res.status(200).json({ subscription: Array.isArray(saved) ? saved[0] : saved });
  } catch (err) {
    console.error('start-trial error:', err?.message);
    return res.status(503).json({ error: 'Save failed' });
  }
}
