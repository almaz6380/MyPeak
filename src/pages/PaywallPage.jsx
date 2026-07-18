import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Capacitor } from '@capacitor/core';
import { X, Check, Crown, Sparkles } from 'lucide-react';
import { purchasePremium, restorePurchases, getPremiumPriceString, TRIAL_DAYS } from '../data/subscriptionStorage';
import { useAuth } from '../context/AuthContext';
import Toast from '../components/Toast';

// Bezahlter Kauf ist PRO PLATTFORM freischaltbar — erst „true", wenn der jeweilige
// Store/Provider wirklich live eingerichtet ist:
//   ios     -> Apple In-App-Purchase (StoreKit)            [noch nicht eingerichtet]
//   android -> Google Play Billing                          [noch nicht eingerichtet]
//   web     -> RevenueCat Web Billing (Stripe)   [nur Sandbox -> geparkt bis Live]
// Solange „false", zeigen wir nur die kostenlose Testphase (Trial braucht keine
// Zahlung) — kein Kauf-Button, kein Restore, kein Preis. So läuft niemand in einen
// Sandbox-Checkout, und iOS verletzt nicht Apples IAP-Pflicht (3.1.1).
const PURCHASE_ENABLED = { ios: false, android: false, web: false };
const canPurchase = PURCHASE_ENABLED[Capacitor.getPlatform()] ?? false;

// ── Preis-Konfiguration (Fallback-Anzeige) ────────────────────────
// Sobald ein RevenueCat-Offering geladen ist, wird der echte, lokalisierte
// Store-Preis angezeigt; diese Konstante ist nur der Fallback davor.
const PRICE = { amount: '3,99', currency: '€', period: 'Monat', periodEN: 'month' };

// Präsentationale Paywall. Trial-Steuerung über Props (kein Zugriff auf den
// SubscriptionContext → kein Zirkelimport). Kauf/Restore laufen über den
// Storage (mit AuthContext-User; AuthContext ist unkritisch für Zirkelimport).
export default function PaywallPage({ reason, hadTrial, onStartTrial, onClose }) {
  const { i18n } = useTranslation();
  const lang = i18n.language?.startsWith('de') ? 'de' : 'en';
  const { user } = useAuth();
  const [busy, setBusy] = useState(false);
  const [toast, setToast] = useState(null);
  const [livePrice, setLivePrice] = useState(null);

  // Echten Store-Preis laden, wenn RevenueCat konfiguriert ist.
  useEffect(() => {
    let active = true;
    // Ohne Kaufmöglichkeit kein Preis nötig → RevenueCat-Abruf sparen.
    if (user?.id && canPurchase) {
      getPremiumPriceString(user.id).then((p) => { if (active && p) setLivePrice(p); });
    }
    return () => { active = false; };
  }, [user?.id]);

  const priceDisplay = livePrice || `${PRICE.currency}${PRICE.amount}`;

  const benefits = lang === 'de'
    ? [
        'KI-Coach für Training & Ernährung',
        'Blutwerte-Einordnung mit Empfehlungen',
        'Nährwerttabelle per Foto einscannen',
        'Personalisierter KI-Ernährungsplan',
        'Detaillierte Analysen & Statistiken',
        'Werbefrei',
      ]
    : [
        'AI coach for training & nutrition',
        'Blood work interpretation with guidance',
        'Scan nutrition labels by photo',
        'Personalised AI nutrition plan',
        'Detailed analytics & statistics',
        'Ad-free',
      ];

  const handlePrimary = async () => {
    setBusy(true);
    try {
      if (!hadTrial) {
        await onStartTrial();
        return;
      }
      // Trial bereits genutzt → echter Kauf über RevenueCat.
      const res = await purchasePremium(user?.id);
      if (res.ok) {
        setToast({
          type: 'success',
          message: lang === 'de' ? 'Premium ist aktiviert. Viel Erfolg!' : 'Premium is active. Enjoy!',
        });
        setTimeout(() => onClose(), 1200);
        return;
      }
      if (res.reason === 'cancelled') return; // Nutzer hat abgebrochen → still
      const msg = (() => {
        if (res.reason === 'login_required') {
          return lang === 'de' ? 'Bitte melde dich an, um Premium zu kaufen.' : 'Please sign in to buy Premium.';
        }
        if (res.reason === 'provider_not_configured') {
          return lang === 'de'
            ? 'Käufe sind bald verfügbar. Wir richten den Bezahlvorgang gerade ein.'
            : 'Purchases are coming soon. We are setting up checkout.';
        }
        return lang === 'de'
          ? 'Der Kauf hat nicht geklappt. Bitte später erneut versuchen.'
          : 'The purchase did not go through. Please try again later.';
      })();
      setToast({ type: 'error', message: msg });
    } finally {
      setBusy(false);
    }
  };

  const handleRestore = async () => {
    setBusy(true);
    try {
      const res = await restorePurchases(user?.id);
      if (res.ok && res.entitlementActive) {
        setToast({ type: 'success', message: lang === 'de' ? 'Käufe wiederhergestellt.' : 'Purchases restored.' });
        setTimeout(() => onClose(), 1200);
      } else if (res.ok) {
        setToast({ type: 'error', message: lang === 'de' ? 'Keine aktiven Käufe gefunden.' : 'No active purchases found.' });
      } else if (res.reason !== 'provider_not_configured') {
        setToast({ type: 'error', message: lang === 'de' ? 'Wiederherstellen fehlgeschlagen.' : 'Restore failed.' });
      }
    } finally {
      setBusy(false);
    }
  };

  const primaryLabel = hadTrial
    ? (lang === 'de' ? 'Premium freischalten' : 'Unlock Premium')
    : (lang === 'de' ? `${TRIAL_DAYS} Tage kostenlos testen` : `Start ${TRIAL_DAYS}-day free trial`);

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4">
      <div className="w-full sm:max-w-md bg-white dark:bg-surface-dark-alt rounded-t-3xl sm:rounded-3xl shadow-2xl max-h-[92vh] overflow-y-auto">
        {/* Header */}
        <div className="relative p-6 pb-4 text-center">
          <button
            onClick={onClose}
            aria-label={lang === 'de' ? 'Schließen' : 'Close'}
            className="absolute top-4 right-4 p-2 rounded-xl text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="w-16 h-16 mx-auto mb-3 rounded-2xl bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center shadow-lg">
            <Crown className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold">MyPeak Premium</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            {reason
              ? (lang === 'de' ? 'Diese Funktion ist Teil von Premium.' : 'This feature is part of Premium.')
              : (lang === 'de' ? 'Hol das Maximum aus deinem Training.' : 'Get the most out of your training.')}
          </p>
        </div>

        {/* Benefits */}
        <div className="px-6 space-y-2.5">
          {benefits.map((b, i) => (
            <div key={i} className="flex items-center gap-3">
              <span className="w-6 h-6 rounded-full bg-primary-50 dark:bg-primary-900/30 flex items-center justify-center flex-shrink-0">
                <Check className="w-4 h-4 text-primary-500 dark:text-primary-400" />
              </span>
              <span className="text-sm text-slate-700 dark:text-slate-200">{b}</span>
            </div>
          ))}
        </div>

        {/* Preis — nur wenn hier gekauft werden kann */}
        {canPurchase && (
        <div className="px-6 mt-5">
          <div className="rounded-2xl border-2 border-primary-400 bg-primary-50/50 dark:bg-primary-900/10 p-4 text-center">
            <p className="text-2xl font-bold">
              {priceDisplay}
              <span className="text-sm font-normal text-slate-500 dark:text-slate-400">
                {' '}/ {lang === 'de' ? PRICE.period : PRICE.periodEN}
              </span>
            </p>
            {!hadTrial && (
              <p className="text-xs text-primary-600 dark:text-primary-400 mt-1 flex items-center justify-center gap-1">
                <Sparkles className="w-3.5 h-3.5" />
                {lang === 'de'
                  ? `${TRIAL_DAYS} Tage kostenlos, danach ${priceDisplay}/${PRICE.period}`
                  : `${TRIAL_DAYS} days free, then ${priceDisplay}/${PRICE.periodEN}`}
              </p>
            )}
          </div>
        </div>
        )}

        {/* CTA */}
        <div className="p-6 pt-4">
          {(!hadTrial || canPurchase) ? (
            <button
              onClick={handlePrimary}
              disabled={busy}
              className="w-full py-3.5 rounded-2xl bg-primary-500 hover:bg-primary-600 disabled:opacity-60 text-white font-semibold text-base shadow-lg transition-colors"
            >
              {busy ? '…' : primaryLabel}
            </button>
          ) : (
            // Trial bereits genutzt + kein Kauf auf dieser Plattform → nur Hinweis.
            <p className="text-sm text-slate-600 dark:text-slate-300 text-center">
              {lang === 'de'
                ? 'Diese Funktion ist Teil von Premium. Der Kauf ist in dieser App-Version noch nicht verfügbar.'
                : 'This feature is part of Premium. Purchasing is not yet available in this version of the app.'}
            </p>
          )}
          {hadTrial && canPurchase && (
            <button
              onClick={handleRestore}
              disabled={busy}
              className="w-full mt-3 py-2 text-xs font-medium text-slate-500 dark:text-slate-400 hover:text-primary-500 disabled:opacity-60 transition-colors"
            >
              {lang === 'de' ? 'Käufe wiederherstellen' : 'Restore purchases'}
            </button>
          )}
          {(!hadTrial || canPurchase) && (
            <p className="text-[11px] text-slate-400 dark:text-slate-500 text-center mt-3 leading-relaxed">
              {lang === 'de'
                ? 'Jederzeit kündbar. Die Testphase kann in den Konto-Einstellungen beendet werden.'
                : 'Cancel anytime. The trial can be ended in your account settings.'}
            </p>
          )}
        </div>
      </div>

      {toast && <Toast message={toast.message} variant={toast.type} onDismiss={() => setToast(null)} />}
    </div>
  );
}
