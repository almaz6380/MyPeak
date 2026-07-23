// RevenueCat-Anbindung (Web + nativ über Capacitor).
//
// Ziel: EINE einfache API für die App (purchase/restore/Preis), die je nach
// Plattform das passende SDK lazy lädt. Ohne konfigurierten API-Key bleibt
// alles inaktiv (`not_configured`), damit die Live-App unverändert läuft,
// bis der Zahlungsanbieter eingerichtet ist.
//
// WICHTIG: app_user_id = Supabase-user_id → der Webhook (api/revenuecat-webhook.js)
// kann den Kauf dem richtigen Konto zuordnen. Die verbindliche Freischaltung
// von premium_until passiert serverseitig über diesen Webhook.

import { Capacitor } from '@capacitor/core';

export const PREMIUM_ENTITLEMENT = 'premium';

const WEB_KEY = import.meta.env.VITE_REVENUECAT_WEB_API_KEY || '';
const IOS_KEY = import.meta.env.VITE_REVENUECAT_IOS_KEY || '';
const ANDROID_KEY = import.meta.env.VITE_REVENUECAT_ANDROID_KEY || '';

function platform() {
  try {
    return Capacitor.getPlatform(); // 'web' | 'ios' | 'android'
  } catch {
    return 'web';
  }
}

function apiKeyForPlatform() {
  const p = platform();
  if (p === 'ios') return IOS_KEY;
  if (p === 'android') return ANDROID_KEY;
  return WEB_KEY;
}

export function isConfigured() {
  return !!apiKeyForPlatform();
}

let sdk = null;        // { kind: 'web'|'native', purchases }
let configuredFor = null;

// SDK lazy laden + konfigurieren + Nutzer identifizieren. Memoisiert pro User.
async function ensure(userId) {
  if (!isConfigured()) return { ok: false, reason: 'not_configured' };
  if (!userId) return { ok: false, reason: 'no_user' };
  if (sdk && configuredFor === userId) return { ok: true };

  const key = apiKeyForPlatform();
  try {
    if (platform() === 'web') {
      const { Purchases } = await import('@revenuecat/purchases-js');
      const purchases = Purchases.configure({ apiKey: key, appUserId: String(userId) });
      sdk = { kind: 'web', purchases };
    } else {
      const { Purchases } = await import('@revenuecat/purchases-capacitor');
      await Purchases.configure({ apiKey: key, appUserID: String(userId) });
      sdk = { kind: 'native', purchases: Purchases };
    }
    configuredFor = userId;
    return { ok: true };
  } catch (err) {
    console.error('RevenueCat configure failed:', err?.message);
    sdk = null;
    configuredFor = null;
    return { ok: false, reason: 'configure_failed' };
  }
}

async function currentOffering() {
  if (!sdk) return null;
  try {
    const offerings = await sdk.purchases.getOfferings();
    return offerings?.current || null;
  } catch (err) {
    console.error('RevenueCat getOfferings failed:', err?.message);
    return null;
  }
}

// Package für den gewünschten Plan auflösen. Jahr wird STRIKT per Typ/Identifier
// gematcht (kein Index-Fallback → sonst könnte bei zwei Packages das falsche
// greifen). Monat behält einen Fallback aufs erste Package, damit der bereits
// live laufende Monatsweg nicht regressiert, falls der Identifier mal fehlt.
function packageFor(offering, planType = 'monthly') {
  if (!offering?.availablePackages?.length) return null;
  if (planType === 'annual') {
    return (
      offering.availablePackages.find((p) => p.packageType === 'ANNUAL' || p.identifier === '$rc_annual') || null
    );
  }
  return (
    offering.availablePackages.find((p) => p.packageType === 'MONTHLY' || p.identifier === '$rc_monthly') ||
    offering.availablePackages[0]
  );
}

function priceStringFromPackage(pkg, kind) {
  if (!pkg) return null;
  try {
    if (kind === 'web') {
      // purchases-js: Preis am WebBilling-Produkt.
      return (
        pkg.webBillingProduct?.currentPrice?.formattedPrice ||
        pkg.rcBillingProduct?.currentPrice?.formattedPrice ||
        null
      );
    }
    // purchases-capacitor: Preis am StoreProduct.
    return pkg.product?.priceString || null;
  } catch {
    return null;
  }
}

function entitlementActive(customerInfo) {
  try {
    return !!customerInfo?.entitlements?.active?.[PREMIUM_ENTITLEMENT];
  } catch {
    return false;
  }
}

// Ablaufzeitpunkt des Premium-Entitlements als ISO-String (oder null).
// Erlaubt der App, nach dem Kauf sofort mit dem ECHTEN Ablauf optimistisch
// freizuschalten, bevor der Webhook premium_until serverseitig setzt.
function entitlementExpiry(customerInfo) {
  try {
    const ent = customerInfo?.entitlements?.active?.[PREMIUM_ENTITLEMENT];
    const exp = ent?.expirationDate ?? ent?.expiresDate ?? null;
    if (!exp) return null;
    if (typeof exp === 'number') return new Date(exp).toISOString();
    if (exp instanceof Date) return exp.toISOString();
    return new Date(exp).toISOString(); // ISO-String
  } catch {
    return null;
  }
}

// Öffentlich: lokalisierter Store-Preis eines Plans (oder null → UI nimmt die Konstante).
export async function getPremiumPriceString(userId, planType = 'monthly') {
  const ready = await ensure(userId);
  if (!ready.ok) return null;
  const offering = await currentOffering();
  const pkg = packageFor(offering, planType);
  return priceStringFromPackage(pkg, sdk?.kind);
}

// Öffentlich: beide lokalisierten Store-Preise auf einmal (ein Offering-Abruf).
export async function getPremiumPrices(userId) {
  const ready = await ensure(userId);
  if (!ready.ok) return { monthly: null, annual: null };
  const offering = await currentOffering();
  return {
    monthly: priceStringFromPackage(packageFor(offering, 'monthly'), sdk?.kind),
    annual: priceStringFromPackage(packageFor(offering, 'annual'), sdk?.kind),
  };
}

// Öffentlich: Premium kaufen (planType 'monthly' | 'annual'). Gibt Zugang
// optimistisch zurück; die verbindliche Freischaltung kommt über den Webhook.
export async function purchase(userId, planType = 'monthly') {
  const ready = await ensure(userId);
  if (!ready.ok) return { ok: false, reason: ready.reason };

  const offering = await currentOffering();
  const pkg = packageFor(offering, planType);
  if (!pkg) return { ok: false, reason: 'no_offering' };

  try {
    if (sdk.kind === 'web') {
      const result = await sdk.purchases.purchase({ rcPackage: pkg });
      return { ok: true, entitlementActive: entitlementActive(result?.customerInfo), expiresAt: entitlementExpiry(result?.customerInfo) };
    }
    const result = await sdk.purchases.purchasePackage({ aPackage: pkg });
    return { ok: true, entitlementActive: entitlementActive(result?.customerInfo), expiresAt: entitlementExpiry(result?.customerInfo) };
  } catch (err) {
    // Abbruch durch den Nutzer sauber melden.
    const cancelled = err?.userCancelled || err?.code === 'PurchaseCancelledError' || /cancel/i.test(err?.message || '');
    return { ok: false, reason: cancelled ? 'cancelled' : 'purchase_failed' };
  }
}

// Öffentlich: frühere Käufe wiederherstellen.
export async function restore(userId) {
  const ready = await ensure(userId);
  if (!ready.ok) return { ok: false, reason: ready.reason };
  try {
    let customerInfo;
    if (sdk.kind === 'web') {
      customerInfo = await sdk.purchases.getCustomerInfo();
    } else {
      const r = await sdk.purchases.restorePurchases();
      customerInfo = r?.customerInfo;
    }
    return { ok: true, entitlementActive: entitlementActive(customerInfo), expiresAt: entitlementExpiry(customerInfo) };
  } catch (err) {
    console.error('RevenueCat restore failed:', err?.message);
    return { ok: false, reason: 'restore_failed' };
  }
}
