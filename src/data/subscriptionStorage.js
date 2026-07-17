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
// Für eingeloggte Nutzer serverseitig (api/start-trial.js, Service-Role) —
// der Client darf seit der RLS-Härtung nicht mehr direkt schreiben.
// Gäste bleiben rein lokal (kein Supabase).
export async function startTrial(userId) {
  const current = readCache(userId);
  if (current.trial_started_at) return current; // schon einmal genutzt

  const now = new Date();
  const ends = new Date(now.getTime() + TRIAL_DAYS * 86400000);
  const localNext = {
    ...current,
    user_id: userId,
    status: 'trial',
    trial_started_at: now.toISOString(),
    trial_ends_at: ends.toISOString(),
    updated_at: now.toISOString(),
  };

  // Gast: nur lokal.
  if (isGuest(userId)) {
    writeCache(localNext);
    return localNext;
  }

  // Eingeloggt: Trial vom Server setzen lassen, Ergebnis übernehmen.
  try {
    const { data: sessionData } = await supabase.auth.getSession();
    const token = sessionData?.session?.access_token;
    if (token) {
      const res = await fetch('/api/start-trial', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        const { subscription } = await res.json();
        if (subscription) {
          writeCache(subscription);
          return subscription;
        }
      }
    }
  } catch (err) {
    console.error('Failed to start trial on server:', err);
  }

  // Fallback (Server nicht erreichbar): lokal cachen, damit die UI nicht hängt.
  writeCache(localNext);
  return localNext;
}

// Echten Kauf über RevenueCat auslösen. Gäste können nicht kaufen (kein Konto,
// kein Server-Mapping). Ohne konfigurierten RC-Key gibt der Wrapper
// `not_configured` zurück → die Paywall zeigt „bald verfügbar".
// Die verbindliche Freischaltung (premium_until) kommt serverseitig über den
// RevenueCat-Webhook; nach Erfolg refreshen wir den Status aus Supabase.
export async function purchasePremium(userId) {
  if (!userId || isGuest(userId)) {
    return { ok: false, reason: 'login_required' };
  }
  const rc = await import('../lib/revenuecat');
  if (!rc.isConfigured()) {
    return { ok: false, reason: 'provider_not_configured' };
  }
  const res = await rc.purchase(userId);
  if (res.ok) {
    // Cloud-Status nachladen (Webhook hat premium_until gesetzt); der
    // Hintergrund-Refresh in getSubscription feuert das mypeak:subscription-Event.
    getSubscription(userId).catch(() => {});
  }
  return res;
}

// Frühere Käufe wiederherstellen (Gerätewechsel, Neuinstallation).
export async function restorePurchases(userId) {
  if (!userId || isGuest(userId)) {
    return { ok: false, reason: 'login_required' };
  }
  const rc = await import('../lib/revenuecat');
  if (!rc.isConfigured()) {
    return { ok: false, reason: 'provider_not_configured' };
  }
  const res = await rc.restore(userId);
  if (res.ok) getSubscription(userId).catch(() => {});
  return res;
}

// Lokalisierten Store-Preis holen (oder null → UI nutzt die Konstante).
export async function getPremiumPriceString(userId) {
  if (!userId || isGuest(userId)) return null;
  try {
    const rc = await import('../lib/revenuecat');
    if (!rc.isConfigured()) return null;
    return await rc.getPremiumPriceString(userId);
  } catch {
    return null;
  }
}
