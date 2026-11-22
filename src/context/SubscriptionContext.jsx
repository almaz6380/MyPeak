import { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { useAuth } from './AuthContext';
import { getSubscription, startTrial as startTrialStorage, computeAccess } from '../data/subscriptionStorage';
import { setAdsPremiumStatus, initAds, werbungDarfStarten } from '../lib/ads';
import PaywallPage from '../pages/PaywallPage';

const SubscriptionContext = createContext();

export function SubscriptionProvider({ children }) {
  const { user, profile } = useAuth();
  const [sub, setSub] = useState(null);
  // Für welchen Nutzer der Abo-Stand schon gelesen ist — vorher ist „kein
  // Premium“ nur „noch nicht bekannt“, und die Werbung darf nicht starten.
  const [subGeladenFuer, setSubGeladenFuer] = useState(null);
  const [paywallOpen, setPaywallOpen] = useState(false);
  const [paywallReason, setPaywallReason] = useState(null);

  // Abo-Status laden, sobald ein Nutzer da ist (auch Gast).
  useEffect(() => {
    if (!user?.id) { setSub(null); setSubGeladenFuer(null); return; }
    let active = true;
    getSubscription(user.id).then((s) => { if (active) { setSub(s); setSubGeladenFuer(user.id); } });
    return () => { active = false; };
  }, [user?.id]);

  // Cloud-Update (anderes Gerät / Hintergrund-Refresh) übernehmen.
  useEffect(() => {
    const onUpdate = (e) => setSub(e.detail);
    window.addEventListener('mypeak:subscription', onUpdate);
    return () => window.removeEventListener('mypeak:subscription', onUpdate);
  }, []);

  const access = computeAccess(sub);

  // Werbung an den Premium-Status koppeln: Premium (Trial ODER bezahlt) = werbefrei.
  useEffect(() => {
    setAdsPremiumStatus(access.isPremium);
  }, [access.isPremium]);

  // Werbung samt Einwilligungsdialog erst starten, wenn klar ist, dass sie
  // gebraucht wird: Onboarding fertig und kein Premium. Kurz verzögert, damit
  // der Dialog nicht in den Aufbau der Startseite fällt.
  const onboardingFertig = Boolean(profile?.onboarding_completed);
  const aboGeladen = Boolean(user?.id) && subGeladenFuer === user?.id;
  useEffect(() => {
    if (!werbungDarfStarten({
      nutzerDa: Boolean(user?.id), aboGeladen, premium: access.isPremium, onboardingFertig,
    })) return undefined;
    const uhr = setTimeout(() => { initAds(); }, 1500);
    return () => clearTimeout(uhr);
  }, [user?.id, aboGeladen, access.isPremium, onboardingFertig]);

  const startTrial = useCallback(async () => {
    if (!user?.id) return null;
    const next = await startTrialStorage(user.id);
    setSub(next);
    return next;
  }, [user?.id]);

  // Feature-Gate: gibt true zurück, wenn Premium vorhanden ist. Sonst wird
  // die Paywall geöffnet und false zurückgegeben. So lässt sich jede
  // Premium-Aktion mit `if (!requirePremium('feature')) return;` absichern.
  const requirePremium = useCallback((reason = null) => {
    if (access.isPremium) return true;
    setPaywallReason(reason);
    setPaywallOpen(true);
    return false;
  }, [access.isPremium]);

  const openPaywall = useCallback((reason = null) => {
    setPaywallReason(reason);
    setPaywallOpen(true);
  }, []);
  const closePaywall = useCallback(() => setPaywallOpen(false), []);

  const value = {
    subscription: sub,
    isPremium: access.isPremium,
    isTrial: access.isTrial,
    isPaid: access.isPaid,
    trialDaysLeft: access.trialDaysLeft,
    hadTrial: access.hadTrial,
    status: sub?.status || 'free',
    startTrial,
    requirePremium,
    openPaywall,
    closePaywall,
    paywallReason,
  };

  return (
    <SubscriptionContext.Provider value={value}>
      {children}
      {paywallOpen && (
        <PaywallPage
          reason={paywallReason}
          hadTrial={access.hadTrial}
          onStartTrial={async () => { await startTrial(); closePaywall(); }}
          onClose={closePaywall}
        />
      )}
    </SubscriptionContext.Provider>
  );
}

export function useSubscription() {
  return useContext(SubscriptionContext);
}
