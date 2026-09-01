import { corsBehandeln } from './_cors.js';

// Löscht das Konto des eingeloggten Users inkl. aller Daten (DSGVO / App-Store-Pflicht).
// Benötigt in Vercel: SUPABASE_SERVICE_ROLE_KEY (Supabase Dashboard → Settings → API → service_role)
export default async function handler(req, res) {
  if (corsBehandeln(req, res)) return; // Preflight der nativen App
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const supabaseUrl = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!supabaseUrl || !serviceKey) {
    return res.status(500).json({ error: 'Server not configured' });
  }

  const token = (req.headers.authorization || '').replace(/^Bearer\s+/i, '');
  if (!token) {
    return res.status(401).json({ error: 'Missing token' });
  }

  // Token verifizieren: Nur der User selbst kann sein eigenes Konto löschen.
  // Netzwerkfehler werden abgefangen — ein Wurf aus dem Handler heraus käme
  // beim Client als undurchsichtiger Plattform-Fehler an, nicht als 503.
  let user;
  try {
    const userRes = await fetch(`${supabaseUrl}/auth/v1/user`, {
      headers: { apikey: serviceKey, Authorization: `Bearer ${token}` },
      signal: AbortSignal.timeout(8000),
    });
    if (!userRes.ok) {
      return res.status(401).json({ error: 'Invalid token' });
    }
    user = await userRes.json();
  } catch (err) {
    console.error('Account deletion: auth check failed:', err?.message);
    return res.status(503).json({ error: 'Auth check failed' });
  }
  if (!user?.id) {
    return res.status(401).json({ error: 'Invalid token' });
  }

  // Konto löschen — alle Datenzeilen fallen per ON DELETE CASCADE mit
  try {
    const delRes = await fetch(`${supabaseUrl}/auth/v1/admin/users/${user.id}`, {
      method: 'DELETE',
      headers: { apikey: serviceKey, Authorization: `Bearer ${serviceKey}` },
      signal: AbortSignal.timeout(10000),
    });
    if (!delRes.ok) {
      const detail = await delRes.text();
      console.error('Account deletion failed:', delRes.status, detail);
      return res.status(502).json({ error: 'Deletion failed' });
    }
  } catch (err) {
    console.error('Account deletion request failed:', err?.message);
    return res.status(502).json({ error: 'Deletion failed' });
  }

  return res.status(200).json({ success: true });
}
