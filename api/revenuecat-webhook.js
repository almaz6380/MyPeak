// FullRep: RevenueCat-Webhook — Vercel Serverless Function.
// Die EINZIGE Stelle, die bezahltes Premium setzt. RevenueCat schickt bei
// Kauf/Verlängerung/Ablauf ein Event; wir verifizieren das gemeinsame
// Secret, mappen app_user_id → Supabase-user_id und schreiben premium_until
// per Service-Role (umgeht RLS). Der Client kann sich Premium nie selbst geben.
//
// RevenueCat-Setup: Dashboard → Integrations → Webhooks → URL
//   https://<domain>/api/revenuecat-webhook  + Authorization-Header = REVENUECAT_WEBHOOK_SECRET
// app_user_id MUSS die Supabase-user_id sein (Client ruft Purchases.logIn(userId)).
//
// Benötigte Env-Vars: SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, REVENUECAT_WEBHOOK_SECRET.

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

// Events, die (potenziell) aktiven Zugang bedeuten. Der tatsächliche Zugang
// hängt zusätzlich an der Ablaufzeit (expiration_at_ms).
const ACTIVE_EVENTS = new Set([
  'INITIAL_PURCHASE',
  'RENEWAL',
  'PRODUCT_CHANGE',
  'UNCANCELLATION',
  'NON_RENEWING_PURCHASE',
  'SUBSCRIPTION_EXTENDED',
  'CANCELLATION', // Auto-Renew aus, Zugang bleibt aber bis expiration
]);

// Events, die den Zugang sofort beenden.
const REVOKE_EVENTS = new Set([
  'EXPIRATION',
  'REFUND',
  'SUBSCRIPTION_PAUSED',
]);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const supabaseUrl = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const secret = process.env.REVENUECAT_WEBHOOK_SECRET;

  // Fail-closed: ohne Konfiguration nichts tun.
  if (!supabaseUrl || !serviceKey || !secret) {
    console.error('revenuecat-webhook: not fully configured');
    return res.status(503).json({ error: 'Service unavailable' });
  }

  // 1) Secret verifizieren (RevenueCat sendet den konfigurierten Authorization-Header).
  const auth = (req.headers.authorization || '').replace(/^Bearer\s+/i, '');
  if (auth !== secret) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  // 2) Event lesen.
  const event = req.body?.event;
  if (!event || !event.type) {
    return res.status(400).json({ error: 'No event' });
  }

  const userId = event.app_user_id;
  // Anonyme RC-IDs können wir keinem Konto zuordnen → still bestätigen (kein Retry).
  if (!userId || String(userId).startsWith('$RCAnonymousID:')) {
    return res.status(200).json({ ignored: 'no mappable user' });
  }
  // Nur echte UUIDs zulassen (Supabase-user_id).
  if (!/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(String(userId))) {
    return res.status(200).json({ ignored: 'user_id not a uuid' });
  }

  const now = Date.now();
  const expMs = Number(event.expiration_at_ms) || 0;

  // 3) Zielzustand ableiten.
  let premiumUntil;
  let status;
  if (REVOKE_EVENTS.has(event.type)) {
    premiumUntil = null;
    status = 'free';
  } else if (ACTIVE_EVENTS.has(event.type)) {
    if (expMs > now) {
      premiumUntil = new Date(expMs).toISOString();
      status = 'premium';
    } else {
      premiumUntil = null; // abgelaufen
      status = 'free';
    }
  } else {
    // Unbekannter/irrelevanter Event-Typ (z. B. TEST, TRANSFER) → nur bestätigen.
    return res.status(200).json({ ignored: event.type });
  }

  // 4) Schreiben (Service-Role, RLS wird umgangen). Nur Premium-Felder anfassen —
  //    Trial-Felder bleiben durch Nichtnennung im Upsert unberührt.
  try {
    const up = await sbFetch(supabaseUrl, serviceKey, 'subscriptions', {
      method: 'POST',
      headers: { Prefer: 'resolution=merge-duplicates' },
      body: JSON.stringify({
        user_id: userId,
        status,
        premium_until: premiumUntil,
        provider: 'revenuecat',
        updated_at: new Date().toISOString(),
      }),
    });
    if (!up.ok) {
      const txt = await up.text().catch(() => '');
      console.error('revenuecat-webhook upsert failed:', up.status, txt);
      return res.status(500).json({ error: 'Persist failed' }); // RC wiederholt
    }
  } catch (err) {
    console.error('revenuecat-webhook error:', err?.message);
    return res.status(500).json({ error: 'Persist failed' });
  }

  return res.status(200).json({ ok: true, status });
}
