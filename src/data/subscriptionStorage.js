import { supabase } from '../lib/supabase';
import { isGuest } from '../context/AuthContext';
import { API_BASIS } from './apiBasis';

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
      const res = await fetch(`${API_BASIS}/api/start-trial`, {
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
// Nach erfolgreichem Kauf/Restore: Premium SOFORT optimistisch freischalten
// (die UI soll nicht erst nach App-Neustart reagieren), dann den authoritativen
// Server-Wert nachpollen. Der RevenueCat-Webhook setzt premium_until 1–3 s
// später serverseitig — bis dahin überbrücken wir mit dem echten Ablaufdatum
// aus dem Kauf (expiresAt) bzw. einer Laufzeit-Schätzung.
function confirmPurchase(userId, planType, expiresAt) {
  const current = readCache(userId);
  const fallbackDays = planType === 'annual' ? 366 : 31;
  const until = expiresAt || new Date(Date.now() + fallbackDays * 86400000).toISOString();
  const optimistic = {
    ...current,
    user_id: userId,
    status: 'premium',
    premium_until: until,
    provider: 'revenuecat',
    updated_at: new Date().toISOString(),
  };
  writeCache(optimistic);
  window.dispatchEvent(new CustomEvent('mypeak:subscription', { detail: optimistic }));

  // Authoritativen Wert nachpollen (Webhook). Läuft im Hintergrund weiter.
  (async () => {
    if (isGuest(userId)) return;
    for (const delay of [1500, 3000, 5000, 8000]) {
      await new Promise((r) => setTimeout(r, delay));
      try {
        const { data, error } = await supabase
          .from('subscriptions').select('*').eq('user_id', userId).maybeSingle();
        if (!error && data?.premium_until && new Date(data.premium_until).getTime() > Date.now()) {
          writeCache(data);
          window.dispatchEvent(new CustomEvent('mypeak:subscription', { detail: data }));
          return; // serverseitig bestätigt
        }
      } catch { /* weiter versuchen */ }
    }
    // Webhook noch nicht durch: optimistischer Wert bleibt; nächster
    // getSubscription (App-Fokus/Neustart) holt den echten Wert nach.
  })();
}

export async function purchasePremium(userId, planType = 'monthly') {
  if (!userId || isGuest(userId)) {
    return { ok: false, reason: 'login_required' };
  }
  const rc = await import('../lib/revenuecat');
  if (!rc.isConfigured()) {
    return { ok: false, reason: 'provider_not_configured' };
  }
  const res = await rc.purchase(userId, planType);
  if (res.ok) {
    confirmPurchase(userId, planType, res.expiresAt); // optimistisch + Nachpolling
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
  if (res.ok && res.entitlementActive) {
    confirmPurchase(userId, 'monthly', res.expiresAt); // optimistisch + Nachpolling
  } else if (res.ok) {
    getSubscription(userId).catch(() => {}); // kein aktives Abo → nur Status auffrischen
  }
  return res;
}

// Lokalisierten Store-Preis eines Plans holen (oder null → UI nutzt die Konstante).
export async function getPremiumPriceString(userId, planType = 'monthly') {
  if (!userId || isGuest(userId)) return null;
  try {
    const rc = await import('../lib/revenuecat');
    if (!rc.isConfigured()) return null;
    return await rc.getPremiumPriceString(userId, planType);
  } catch {
    return null;
  }
}

// Beide lokalisierten Store-Preise (Monat + Jahr) in einem Abruf.
export async function getPremiumPrices(userId) {
  if (!userId || isGuest(userId)) return { monthly: null, annual: null };
  try {
    const rc = await import('../lib/revenuecat');
    if (!rc.isConfigured()) return { monthly: null, annual: null };
    return await rc.getPremiumPrices(userId);
  } catch {
    return { monthly: null, annual: null };
  }
}
