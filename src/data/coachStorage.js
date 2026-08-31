import { supabase } from '../lib/supabase';
import { API_BASIS } from './apiBasis';

// Fragt den KI-Coach über die Serverless-Funktion. Auth-Token wird
// mitgeschickt; Kontingent + Themen-Grenzen setzt der Server durch.
export async function askCoach(messages, lang) {
  const { data: { session } } = await supabase.auth.getSession();
  const token = session?.access_token;
  if (!token) return { error: 'login_required' };

  try {
    const res = await fetch(`${API_BASIS}/api/coach`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify({ messages, lang }),
      signal: AbortSignal.timeout(28000),
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) return { error: data.error || 'error', remaining: data.remaining };
    return { reply: data.reply, remaining: data.remaining };
  } catch {
    return { error: 'network' };
  }
}

// Heutigen Verbrauch lesen (nur eigener Zähler, per RLS). Für die UI-Anzeige.
export async function getCoachUsageToday(userId) {
  if (!userId || userId === 'guest') return 0;
  try {
    const today = new Date().toISOString().slice(0, 10);
    const { data } = await supabase
      .from('coach_usage')
      .select('count')
      .eq('user_id', userId)
      .eq('date', today)
      .maybeSingle();
    return data?.count || 0;
  } catch {
    return 0;
  }
}
