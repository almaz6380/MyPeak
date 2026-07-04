// Löscht das Konto des eingeloggten Users inkl. aller Daten (DSGVO / App-Store-Pflicht).
// Benötigt in Vercel: SUPABASE_SERVICE_ROLE_KEY (Supabase Dashboard → Settings → API → service_role)
export default async function handler(req, res) {
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

  // Token verifizieren: Nur der User selbst kann sein eigenes Konto löschen
  const userRes = await fetch(`${supabaseUrl}/auth/v1/user`, {
    headers: { apikey: serviceKey, Authorization: `Bearer ${token}` },
  });
  if (!userRes.ok) {
    return res.status(401).json({ error: 'Invalid token' });
  }
  const user = await userRes.json();
  if (!user?.id) {
    return res.status(401).json({ error: 'Invalid token' });
  }

  // Konto löschen — alle Datenzeilen fallen per ON DELETE CASCADE mit
  const delRes = await fetch(`${supabaseUrl}/auth/v1/admin/users/${user.id}`, {
    method: 'DELETE',
    headers: { apikey: serviceKey, Authorization: `Bearer ${serviceKey}` },
  });
  if (!delRes.ok) {
    const detail = await delRes.text();
    console.error('Account deletion failed:', delRes.status, detail);
    return res.status(502).json({ error: 'Deletion failed' });
  }

  return res.status(200).json({ success: true });
}
