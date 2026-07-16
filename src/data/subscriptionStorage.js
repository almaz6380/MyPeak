import { supabase } from '../lib/supabase';
import { isGuest } from '../context/AuthContext';

// Abo-/Premium-Status pro Nutzer. localStorage-first (sofort verfügbar,
// offline & Gastmodus), Supabase als Cloud-Sync. Provider-agnostisch:
// die App leitet isPremium aus Trial + bezahltem Premium ab, egal woher.
//
// SICHERHEIT: Bezahltes Premium (premium_until/provider) muss in Produktion
// serverseitig gesetzt werden (Webhook von RevenueCat/Stripe mit Service-Role),
// nicht vom Client — sonst könnte ein Nutzer sich selbst Premium eintragen.
// Solange kein Zahlungsanbieter angebunden ist, schreibt der Client nur den
// (kostenlosen) Trial-Status.

const SUB_KEY = 'subscription';
export const TRIAL_DAYS = 7;

function defaultSub(userId) {
  return {
    user_id: userId,
    status: 'free',
    trial_started_at: null,
    trial_ends_at: null,
    premium_until: null,
    provider: 'none',
    updated_at: new Date().toISOString(),
  };
}

// Leitet ab, ob der Nutzer aktuell Premium-Zugriff hat (Trial ODER bezahlt).
export function computeAccess(sub) {
  if (!sub) return { isPremium: false, isTrial: false, trialDaysLeft: 0 };
  const now = Date.now();
  const trialEnds = sub.trial_ends_at ? new Date(sub.trial_ends_at).getTime() : 0;
  const premiumUntil = sub.premium_until ? new Date(sub.premium_until).getTime() : 0;
  const isTrial = trialEnds > now;
  const isPaid = premiumUntil > now;
  const trialDaysLeft = isTrial ? Math.ceil((trialEnds - now) / 86400000) : 0;
  return {
    isPremium: isTrial || isPaid,
    isTrial,
    isPaid,
    trialDaysLeft,
    hadTrial: !!sub.trial_started_at,
  };
}

function readCache(userId) {
  try {
    const cached = localStorage.getItem(SUB_KEY);
    if (cached) return JSON.parse(cached);
  } catch { /* ignore */ }
  return defaultSub(userId);
}

function writeCache(sub) {
  localStorage.setItem(SUB_KEY, JSON.stringify(sub));
}

// Aktuellen Abo-Status holen. localStorage sofort, Cloud im Hintergrund.
export async function getSubscription(userId) {
  const cached = readCache(userId);

  if (!isGuest(userId)) {
    supabase
      .from('subscriptions')
      .select('*')
      .eq('user_id', userId)
      .maybeSingle()
      .then(({ data, error }) => {
        if (!error && data) {
          writeCache(data);
          window.dispatchEvent(new CustomEvent('mypeak:subscription', { detail: data }));
        }
      })
      .catch(() => {});
  }

  return cached;
}

// Trial starten (einmalig). Nur wenn noch kein Trial lief.
export async function startTrial(userId) {
  const current = readCache(userId);
  if (current.trial_started_at) return current; // schon einmal genutzt

  const now = new Date();
  const ends = new Date(now.getTime() + TRIAL_DAYS * 86400000);
  const next = {
    ...current,
    user_id: userId,
    status: 'trial',
    trial_started_at: now.toISOString(),
    trial_ends_at: ends.toISOString(),
    updated_at: now.toISOString(),
  };
  writeCache(next);

  if (!isGuest(userId)) {
    try {
      await supabase.from('subscriptions').upsert({
        user_id: userId,
        status: next.status,
        trial_started_at: next.trial_started_at,
        trial_ends_at: next.trial_ends_at,
        premium_until: next.premium_until,
        provider: next.provider,
        updated_at: next.updated_at,
      }, { onConflict: 'user_id' });
    } catch (err) {
      console.error('Failed to save trial to Supabase:', err);
    }
  }

  return next;
}

// Platzhalter für den echten Kauf — wird später vom Zahlungsanbieter
// (RevenueCat/Stripe) überschrieben/verdrahtet. Gibt aktuell false zurück,
// damit die UI weiß, dass noch kein Anbieter angebunden ist.
export async function purchasePremium() {
  console.warn('purchasePremium(): kein Zahlungsanbieter angebunden.');
  return { ok: false, reason: 'provider_not_configured' };
}
