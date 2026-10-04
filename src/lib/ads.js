import { Capacitor } from '@capacitor/core';

// ===========================================================================
//  AdMob-Anbindung für FullRep (Interstitial-Vollbildanzeigen)
// ===========================================================================
//  Solange USE_TEST_ADS = true laufen Google-Test-Anzeigen. Das ist während
//  der Entwicklung Pflicht — echte Anzeigen selbst anzuklicken wäre ein
//  Policy-Verstoß und kann das AdMob-Konto sperren.
//
//  Vor dem Launch-Build:
//   1. In AdMob eine App „FullRep" anlegen (iOS + Android) → App-IDs
//      in Info.plist (GADApplicationIdentifier) und AndroidManifest eintragen.
//   2. Interstitial-Anzeigenblöcke erstellen → IDs unten in PROD eintragen.
//   3. USE_TEST_ADS = false setzen.
// ===========================================================================

const USE_TEST_ADS = false;

const TEST = {
  ios: { interstitial: 'ca-app-pub-3940256099942544/4411468910' },
  android: { interstitial: 'ca-app-pub-3940256099942544/1033173712' },
};

// Platzhalter — vor Launch durch echte FullRep-Anzeigenblöcke ersetzen
// (Konto pub-8860791993288062).
// Echte FullRep-Anzeigenblöcke (Konto pub-8860791993288062).
const PROD = {
  ios: { interstitial: 'ca-app-pub-8860791993288062/5028931559' },
  android: { interstitial: 'ca-app-pub-8860791993288062/7984478947' },
};

function ids() {
  const platform = Capacitor.getPlatform() === 'ios' ? 'ios' : 'android';
  return (USE_TEST_ADS ? TEST : PROD)[platform];
}

const isNative = Capacitor.isNativePlatform();

let AdMob = null;
let ready = false;

// ---------------------------------------------------------------------------
//  DSGVO-Einwilligung (Google UMP). iOS-Tracking (ATT) fragt der AppDelegate.
//  Die Einwilligungs-Nachricht selbst wird in AdMob konfiguriert
//  (Datenschutz & Mitteilungen → DSGVO). Ohne veröffentlichte Nachricht
//  meldet UMP NOT_REQUIRED und es erscheint kein Dialog.
// ---------------------------------------------------------------------------
async function runConsentFlow() {
  try {
    const info = await AdMob.requestConsentInfo();

    if (info.isConsentFormAvailable && info.status === 'REQUIRED') {
      await AdMob.showConsentForm();
    }
  } catch (e) {
    console.warn('Consent-Flow fehlgeschlagen:', e);
  }
}

/**
 * Wartet auf die Antwort zum iOS-Tracking-Dialog (ATT) — fragt aber selbst NICHT.
 *
 * Gefragt wird nativ im AppDelegate (`frageNachTracking`, ab Build 10). Von
 * hier aus ging es nicht: Capacitor führt Plugin-Aufrufe auf einer
 * Hintergrund-Warteschlange aus, und `ATTrackingManager` zeigt dort nichts an;
 * dazu lief der Aufruf 1,5 s nach dem Start, oft bevor die App aktiv war.
 * Beides ließ den Status still auf notDetermined — ohne IDFA, also ohne
 * Personalisierung, für jede Anzeige. Die Begründung steht im AppDelegate.
 *
 * Gewartet wird, weil Google die ATT-Antwort VOR dem Start des Anzeigen-SDK
 * verlangt. Nach spätestens sechs Sekunden geht es ohnehin weiter — ein
 * hängender Dialog darf die Werbung nicht dauerhaft blockieren.
 */
async function warteAufTrackingAntwort() {
  if (Capacitor.getPlatform() !== 'ios') return;
  for (let versuch = 0; versuch < 20; versuch += 1) {
    try {
      const { status } = await AdMob.trackingAuthorizationStatus();
      if (status !== 'notDetermined') return;
    } catch (e) {
      console.warn('ATT-Status nicht lesbar:', e);
      return;
    }
    await new Promise((r) => setTimeout(r, 300));
  }
  console.warn('ATT blieb unbeantwortet — Werbung startet ohne Personalisierung.');
}

// Für die Einstellungen: Einwilligung nachträglich ändern (DSGVO-Pflicht).
export function canChangeAdConsent() {
  return isNative;
}

export async function changeAdConsent() {
  if (!ready) return;
  try {
    await AdMob.resetConsentInfo();
    const info = await AdMob.requestConsentInfo();
    if (info.isConsentFormAvailable) {
      await AdMob.showConsentForm();
    }
  } catch (e) {
    console.warn('Consent-Änderung fehlgeschlagen:', e);
  }
}

export async function initAds() {
  if (!isNative) return; // Im Browser: keine Ads.
  try {
    const mod = await import('@capacitor-community/admob');
    AdMob = mod.AdMob;

    await warteAufTrackingAntwort();
    await runConsentFlow();
    await AdMob.initialize({ initializeForTesting: USE_TEST_ADS });
    ready = true;
  } catch (e) {
    console.warn('AdMob-Init fehlgeschlagen:', e);
  }
}

// ---------------------------------------------------------------------------
//  Interstitial – sanfte Frequenz. Vier Bremsen, alle müssen passen:
//    1. nur jede 2. qualifizierende Aktion
//    2. mindestens 90 s seit der letzten Anzeige (bzw. seit werbungPausieren)
//    3. keine Anzeige in den ersten 60 s nach dem App-Start — wer die App
//       gerade öffnet, will etwas eintragen, nicht Werbung sehen
//    4. höchstens 3 Interstitials pro Sitzung (seit 1.5.4)
//  Die Regel steht als reine Funktion da, damit sie ohne AdMob testbar ist.
// ---------------------------------------------------------------------------
export const INTERSTITIAL_MIN_GAP_MS = 90_000;
export const INTERSTITIAL_START_SPERRE_MS = 60_000;
export const INTERSTITIAL_MAX_PRO_SITZUNG = 3;

// `aktion` ist der bereits hochgezählte Aktionszähler.
export function interstitialErlaubt({ jetzt, appStart, letzte, gezeigt, aktion }) {
  if (aktion % 2 !== 0) return false;
  if (gezeigt >= INTERSTITIAL_MAX_PRO_SITZUNG) return false;
  if (jetzt - appStart < INTERSTITIAL_START_SPERRE_MS) return false;
  if (jetzt - letzte < INTERSTITIAL_MIN_GAP_MS) return false;
  return true;
}

// Sitzung = Laufzeit des JS-Kontexts. Ein Kaltstart der App setzt beides zurück.
const appStart = Date.now();
let lastInterstitial = 0;
let actionCount = 0;
let shownThisSession = 0;

// Premium-Nutzer (Trial ODER bezahlt) sind werbefrei. Der SubscriptionContext
// hält diesen Schalter aktuell; ohne Premium bleibt es bei false (mit Werbung).
let premiumUser = false;
export function setAdsPremiumStatus(isPremium) {
  premiumUser = !!isPremium;
}

// Nach einer Bewertungsanfrage (lib/review.js) die Werbung fuer die normale
// Mindestpause aussetzen: Ein Interstitial direkt vor oder nach dem
// Bewertungsdialog verdirbt genau die Stimmung, um die es dabei geht.
export function werbungPausieren() {
  lastInterstitial = Date.now();
}

export async function maybeShowInterstitial() {
  if (!ready) return;
  if (premiumUser) return; // Premium = werbefrei
  actionCount += 1;
  const jetzt = Date.now();
  if (!interstitialErlaubt({
    jetzt, appStart, letzte: lastInterstitial, gezeigt: shownThisSession, aktion: actionCount,
  })) return;
  lastInterstitial = jetzt;
  shownThisSession += 1;
  try {
    await AdMob.prepareInterstitial({ adId: ids().interstitial, isTesting: USE_TEST_ADS });
    await AdMob.showInterstitial();
  } catch (e) {
    console.warn('Interstitial-Ad fehlgeschlagen:', e);
  }
}
