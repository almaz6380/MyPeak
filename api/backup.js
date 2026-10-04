// Tägliches Datenbank-Backup (GitHub-Workflow cron.yml, bis 10/2026 Vercel-Cron).
// Exportiert alle Tabellen als JSON in den privaten Storage-Bucket "backups"
// und löscht Backups, die älter als RETENTION_DAYS sind.
// Kein Ersatz für echte Point-in-Time-Backups (Supabase Pro), aber im Free-Tier
// die Absicherung gegen Datenverlust/versehentliches Löschen.
// Benötigt: SUPABASE_SERVICE_ROLE_KEY + CRON_SECRET in Cloudflare Pages, CRON_SECRET
// zusätzlich als GitHub-Secret für cron.yml.

const TABLES = [
  'profiles', 'user_settings', 'workouts', 'custom_plans', 'custom_exercises',
  'nutrition_entries', 'custom_meals', 'nutrition_goals', 'water_entries',
  'friend_codes', 'friendships', 'challenges', 'user_xp',
  'community_products', 'product_overrides', 'exercise_notes',
  'supplements', 'supplement_logs', 'active_diet', 'weekly_schedules',
  'cycle_settings', 'cycle_logs', 'weight_entries',
];

const RETENTION_DAYS = 14;
const PAGE_SIZE = 1000;

export default async function handler(req, res) {
  // Nur der Cron-Workflow (bzw. wer das Secret kennt) darf das Backup auslösen
  const auth = req.headers.authorization || '';
  if (!process.env.CRON_SECRET || auth !== `Bearer ${process.env.CRON_SECRET}`) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const supabaseUrl = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!supabaseUrl || !serviceKey) {
    return res.status(500).json({ error: 'Server not configured' });
  }
  const headers = { apikey: serviceKey, Authorization: `Bearer ${serviceKey}` };

  try {
    // 1. Alle Tabellen seitenweise auslesen
    const dump = { created_at: new Date().toISOString(), tables: {} };
    let totalRows = 0;
    for (const table of TABLES) {
      const rows = [];
      for (let from = 0; ; from += PAGE_SIZE) {
        const r = await fetch(`${supabaseUrl}/rest/v1/${table}?select=*`, {
          headers: { ...headers, Range: `${from}-${from + PAGE_SIZE - 1}` },
        });
        if (!r.ok) {
          // Tabelle fehlt o.ä. — überspringen, aber im Dump vermerken
          dump.tables[table] = { error: `HTTP ${r.status}` };
          break;
        }
        const page = await r.json();
        rows.push(...page);
        if (page.length < PAGE_SIZE) {
          dump.tables[table] = rows;
          totalRows += rows.length;
          break;
        }
      }
    }

    // 2. In den Storage-Bucket hochladen (ein Backup pro Tag, Re-Runs überschreiben)
    const date = new Date().toISOString().slice(0, 10);
    const upload = await fetch(`${supabaseUrl}/storage/v1/object/backups/backup-${date}.json`, {
      method: 'POST',
      headers: { ...headers, 'Content-Type': 'application/json', 'x-upsert': 'true' },
      body: JSON.stringify(dump),
    });
    if (!upload.ok) {
      const detail = await upload.text();
      console.error('Backup-Upload fehlgeschlagen:', upload.status, detail);
      return res.status(502).json({ error: 'Upload failed' });
    }

    // 3. Alte Backups aufräumen
    const listRes = await fetch(`${supabaseUrl}/storage/v1/object/list/backups`, {
      method: 'POST',
      headers: { ...headers, 'Content-Type': 'application/json' },
      body: JSON.stringify({ prefix: '', limit: 100 }),
    });
    let pruned = 0;
    if (listRes.ok) {
      const objects = await listRes.json();
      const cutoff = Date.now() - RETENTION_DAYS * 24 * 60 * 60 * 1000;
      const old = objects
        .filter((o) => o.name.startsWith('backup-') && new Date(o.name.slice(7, 17)).getTime() < cutoff)
        .map((o) => o.name);
      if (old.length) {
        const del = await fetch(`${supabaseUrl}/storage/v1/object/backups`, {
          method: 'DELETE',
          headers: { ...headers, 'Content-Type': 'application/json' },
          body: JSON.stringify({ prefixes: old }),
        });
        if (del.ok) pruned = old.length;
      }
    }

    return res.status(200).json({ ok: true, rows: totalRows, file: `backup-${date}.json`, pruned });
  } catch (err) {
    console.error('Backup fehlgeschlagen:', err.message);
    return res.status(500).json({ error: 'Backup failed' });
  }
}
