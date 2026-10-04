// Keep-Alive + Health-Check: Der tägliche Cron-Workflow (.github/workflows/cron.yml) ruft diesen
// Endpunkt auf. Die Mini-Abfrage zählt bei Supabase als Aktivität und verhindert,
// dass der Free-Tier das Projekt nach 7 Tagen Inaktivität pausiert.
export default async function handler(req, res) {
  const supabaseUrl = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL;
  const anonKey = process.env.SUPABASE_ANON_KEY || process.env.VITE_SUPABASE_ANON_KEY;
  if (!supabaseUrl || !anonKey) {
    return res.status(500).json({ ok: false, error: 'not configured' });
  }

  try {
    const r = await fetch(`${supabaseUrl}/rest/v1/community_products?select=id&limit=1`, {
      headers: { apikey: anonKey, Authorization: `Bearer ${anonKey}` },
    });
    return res.status(r.ok ? 200 : 502).json({ ok: r.ok, db: r.status });
  } catch (err) {
    console.error('Health check failed:', err.message);
    return res.status(502).json({ ok: false, error: 'db unreachable' });
  }
}
