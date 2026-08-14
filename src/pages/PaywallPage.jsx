import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Capacitor } from '@capacitor/core';
import { X, Check, Crown, Sparkles } from 'lucide-react';
import { purchasePremium, restorePurchases, getPremiumPrices, TRIAL_DAYS } from '../data/subscriptionStorage';
import { isConfigured as revenueCatConfigured } from '../lib/revenuecat';
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
// iOS aktiviert seit der Ablehnung 29.07.2026 (Guideline 2.1(b)): Apple bricht die
// Pruefung ab, solange die App aufs Abo verweist, das IAP-Produkt aber nicht mit
// eingereicht wird. Das Produkt wird jetzt mitgeschickt — der Kauf muss also sichtbar sein.
//
// Android steht seit 14.08.2026 auf true. Das ist gefahrlos, weil canPurchase
// zusaetzlich verlangt, dass fuer die laufende Plattform wirklich ein
// RevenueCat-Schluessel im Binary steckt — siehe unten. Vorher war das eine reine
// Absichtserklaerung: stand die Flagge auf true und fehlte der Schluessel, sah der
// Nutzer Preise und einen Knopf, der in „bald verfuegbar" endete.
const PURCHASE_ENABLED = { ios: true, android: true, web: false };

// Zwei Bedingungen, nicht eine:
//   1. die Plattform ist freigeschaltet (Store-Produkt existiert, Vertrag steht)
//   2. der Schluessel dieser Plattform ist beim Bauen wirklich gesetzt
// Fehlt (2), zeigen wir gar keinen Kauf — nur die kostenlose Testphase. Damit kann
// ein vergessenes Secret keine Paywall mit totem Knopf mehr ausliefern.
// ⚠️ Umgekehrt heisst das: ein iOS-Build OHNE VITE_REVENUECAT_IOS_KEY haette keinen
// sichtbaren Kauf — und genau dafuer hat Apple 2.1(b) vergeben. Deshalb bricht
// ios-release.yml ab, wenn das Secret fehlt, statt still etwas anderes zu bauen.
const canPurchase = (PURCHASE_ENABLED[Capacitor.getPlatform()] ?? false)
  && revenueCatConfigured();

// ── Preis-Konfiguration (Fallback-Anzeige) ────────────────────────
// Sobald ein RevenueCat-Offering geladen ist, werden die echten, lokalisierten
// Store-Preise angezeigt; diese Konstanten sind nur der Fallback davor.
// ⚠️ Diese Zahlen MUESSEN den Preisen in App Store Connect entsprechen. Der
// Live-Preis ersetzt nur die grossen Betraege — perMonth und ANNUAL_SAVINGS
// stehen fest im Binary und lassen sich nur mit einem neuen Build aendern.
// Stand 14.08.2026, in ASC nachgesehen: Monat 4,99 € · Jahr 44,99 €
//   44,99 / 12       = 3,7491  -> 3,75 €/Monat (aufgerundet, nie abgerundet:
//                                 ein zu niedrig angezeigter Preis waere
//                                 irrefuehrend, ein zu hoher nicht)
//   12 x 4,99        = 59,88
//   59,88 - 44,99    = 14,89   -> 24,9 % gespart, also -25 %
// Die frueheren Werte (4,49 / 44,90 / 3,74 / 17 %) stammten aus einer
// Preisplanung, die so nie im Store stand.
const CURRENCY = '€';
const PRICES = {
  monthly: { amount: '4,99' },
  annual: { amount: '44,99', perMonth: '3,75' },
};
const ANNUAL_SAVINGS = '25'; // Prozent gespart ggue. 12x Monatspreis (genau 24,9)

// Präsentationale Paywall. Trial-Steuerung über Props (kein Zugriff auf den
// SubscriptionContext → kein Zirkelimport). Kauf/Restore laufen über den
// Storage (mit AuthContext-User; AuthContext ist unkritisch für Zirkelimport).
export default function PaywallPage({ reason, hadTrial, onStartTrial, onClose }) {
  const { i18n } = useTranslation();
  const lang = i18n.language?.startsWith('de') ? 'de' : 'en';
  const { user } = useAuth();
  const [busy, setBusy] = useState(false);
  const [toast, setToast] = useState(null);
  const [livePrices, setLivePrices] = useState({ monthly: null, annual: null });
  const [selectedPlan, setSelectedPlan] = useState('annual'); // Jahr = „bester Wert" vorausgewählt

  // Echte Store-Preise (Monat + Jahr) laden, wenn RevenueCat konfiguriert ist.
  useEffect(() => {
    let active = true;
    // Ohne Kaufmöglichkeit kein Preis nötig → RevenueCat-Abruf sparen.
    if (user?.id && canPurchase) {
      getPremiumPrices(user.id).then((p) => { if (active && p) setLivePrices(p); });
    }
    return () => { active = false; };
  }, [user?.id]);

  // Live-Store-Preis eines Plans, sonst Fallback-Konstante.
  const priceFor = (plan) => livePrices[plan] || `${CURRENCY}${PRICES[plan].amount}`;
  const periodLabel = (plan) => (plan === 'annual'
    ? (lang === 'de' ? 'Jahr' : 'year')
    : (lang === 'de' ? 'Monat' : 'month'));

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
      // Trial bereits genutzt → echter Kauf des gewählten Plans über RevenueCat.
      const res = await purchasePremium(user?.id, selectedPlan);
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
          <h1 className="text-2xl font-bold">FullRep Premium</h1>
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

        {/* Plan-Auswahl — nur wenn hier gekauft werden kann */}
        {canPurchase && (
        <div className="px-6 mt-5 space-y-2.5">
          {/* Jahr (bester Wert, vorausgewählt) */}
          <button
            type="button"
            onClick={() => setSelectedPlan('annual')}
            aria-pressed={selectedPlan === 'annual'}
            className={`relative w-full rounded-2xl border-2 p-4 text-left transition-colors ${
              selectedPlan === 'annual'
                ? 'border-primary-400 bg-primary-50/50 dark:bg-primary-900/10'
                : 'border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600'
            }`}
          >
            <span className="absolute -top-2.5 right-4 px-2 py-0.5 rounded-full bg-primary-500 text-white text-[10px] font-semibold uppercase tracking-wide">
              {lang === 'de' ? 'Bester Wert' : 'Best value'}
            </span>
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="font-semibold text-sm">{lang === 'de' ? 'Jährlich' : 'Yearly'}</p>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  {/* Frueher stand hier zusaetzlich „2 Monate gratis". Bei
                      4,99/44,99 waeren es 2,98 Monate — „3" waere knapp zu
                      viel, „2" deutlich zu wenig. Die Ersparnis steht ohnehin
                      als −{ANNUAL_SAVINGS} % daneben; eine zweite, nur
                      ungefaehr richtige Angabe braucht die Paywall nicht. */}
                  {CURRENCY}{PRICES.annual.perMonth} / {lang === 'de' ? 'Monat' : 'month'}
                </p>
              </div>
              <div className="text-right shrink-0">
                <p className="font-bold">{priceFor('annual')}</p>
                <p className="text-[11px] text-primary-600 dark:text-primary-400 font-semibold">
                  −{ANNUAL_SAVINGS}%
                </p>
              </div>
            </div>
          </button>

          {/* Monat */}
          <button
            type="button"
            onClick={() => setSelectedPlan('monthly')}
            aria-pressed={selectedPlan === 'monthly'}
            className={`w-full rounded-2xl border-2 p-4 text-left transition-colors ${
              selectedPlan === 'monthly'
                ? 'border-primary-400 bg-primary-50/50 dark:bg-primary-900/10'
                : 'border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600'
            }`}
          >
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="font-semibold text-sm">{lang === 'de' ? 'Monatlich' : 'Monthly'}</p>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  {lang === 'de' ? 'Flexibel, monatlich kündbar' : 'Flexible, cancel monthly'}
                </p>
              </div>
              <div className="text-right shrink-0">
                <p className="font-bold">{priceFor('monthly')}</p>
                <p className="text-[11px] text-slate-400">/ {lang === 'de' ? 'Monat' : 'month'}</p>
              </div>
            </div>
          </button>

          {!hadTrial && (
            <p className="text-xs text-primary-600 dark:text-primary-400 mt-1 flex items-center justify-center gap-1 text-center">
              <Sparkles className="w-3.5 h-3.5 shrink-0" />
              {lang === 'de'
                ? `${TRIAL_DAYS} Tage kostenlos, danach ${priceFor(selectedPlan)} / ${periodLabel(selectedPlan)}`
                : `${TRIAL_DAYS} days free, then ${priceFor(selectedPlan)} / ${periodLabel(selectedPlan)}`}
            </p>
          )}
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
