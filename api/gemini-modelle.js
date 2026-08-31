// Diagnose: Welche Gemini-Modelle sieht UNSER Schluessel gerade?
//
// Entstanden am 31.08.2026, als Coach und Foto-Erkennung gleichzeitig
// ausfielen: Google hatte gemini-2.0-flash abgeschaltet (404), und der erste
// Ersatzname war wieder geraten statt gemessen — und wieder 404. Der
// Schluessel liegt nur in Vercel, von aussen kann niemand nachsehen. Dieser
// Endpunkt beantwortet die Frage in einer Sekunde, statt sie ueber
// Deploy-Versuche zu ertasten.
//
// Gibt NUR Modellnamen zurueck (oeffentliche Information), nie den Schluessel.
// Login-Pflicht wie bei analyze-meal: sonst waere er ein anonymer
// Lastpfad auf unser Google-Kontingent.
export default async function handler(req, res) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return res.status(500).json({ error: 'API key not configured' });

  const supabaseUrl = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL;
  const anonKey = process.env.SUPABASE_ANON_KEY || process.env.VITE_SUPABASE_ANON_KEY;
  if (!supabaseUrl || !anonKey) return res.status(503).json({ error: 'Service unavailable' });

  const token = (req.headers.authorization || '').replace(/^Bearer\s+/i, '');
  if (!token) return res.status(401).json({ error: 'Login required' });
  try {
    const userRes = await fetch(`${supabaseUrl}/auth/v1/user`, {
      headers: { apikey: anonKey, Authorization: `Bearer ${token}` },
      signal: AbortSignal.timeout(8000),
    });
    if (!userRes.ok) return res.status(401).json({ error: 'Invalid token' });
  } catch {
    return res.status(503).json({ error: 'Auth check failed' });
  }

  // Probe: ?probe=<modellname> schickt ein Mini-generateContent an genau dieses
  // Modell und reicht Googles Antwortstatus samt Fehlertext durch. Noetig
  // geworden, weil ListModels gemini-2.5-flash LISTETE, generateContent darauf
  // aber 404 meldete — welcher Teil da log, konnte nur Googles eigener
  // Fehlertext sagen.
  const probe = String(req.query?.probe || '').trim();
  if (probe) {
    if (!/^[a-z0-9.-]{3,60}$/.test(probe)) return res.status(400).json({ error: 'bad model name' });
    const ergebnisse = {};
    for (const version of ['v1beta', 'v1']) {
      try {
        const r = await fetch(
          `https://generativelanguage.googleapis.com/${version}/models/${probe}:generateContent?key=${apiKey}`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ contents: [{ parts: [{ text: 'Sag nur: ok' }] }], generationConfig: { maxOutputTokens: 5 } }),
            signal: AbortSignal.timeout(15000),
          }
        );
        const data = await r.json().catch(() => ({}));
        ergebnisse[version] = {
          status: r.status,
          fehler: data?.error?.message,
          text: data?.candidates?.[0]?.content?.parts?.[0]?.text,
        };
      } catch (err) {
        ergebnisse[version] = { status: 0, fehler: err?.message };
      }
    }
    return res.status(200).json({ probe, ergebnisse });
  }

  try {
    const r = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models?pageSize=100&key=${apiKey}`,
      { signal: AbortSignal.timeout(15000) }
    );
    const data = await r.json().catch(() => ({}));
    if (!r.ok) {
      // Fehlertext von Google durchreichen — er nennt den Grund (Key ungueltig,
      // API nicht aktiviert, ...), aber nie den Schluessel selbst.
      return res.status(502).json({ error: 'list_failed', status: r.status, detail: data?.error?.message });
    }
    const modelle = (data.models || [])
      .filter((m) => (m.supportedGenerationMethods || []).includes('generateContent'))
      .map((m) => m.name.replace(/^models\//, ''));
    return res.status(200).json({ modelle });
  } catch (err) {
    return res.status(502).json({ error: 'list_failed', detail: err?.message });
  }
}
