import { Capacitor } from '@capacitor/core';

// ===========================================================================
//  AdMob-Anbindung für MyPeak (Interstitial-Vollbildanzeigen)
// ===========================================================================
//  Solange USE_TEST_ADS = true laufen Google-Test-Anzeigen. Das ist während
//  der Entwicklung Pflicht — echte Anzeigen selbst anzuklicken wäre ein
//  Policy-Verstoß und kann das AdMob-Konto sperren.
//
//  Vor dem Launch-Build:
//   1. In AdMob eine App „MyPeak" anlegen (iOS + Android) → App-IDs
//      in Info.plist (GADApplicationIdentifier) und AndroidManifest eintragen.
//   2. Interstitial-Anzeigenblöcke erstellen → IDs unten in PROD eintragen.
//   3. USE_TEST_ADS = false setzen.
// ===========================================================================

const USE_TEST_ADS = false;

const TEST = {
  ios: { interstitial: 'ca-app-pub-3940256099942544/4411468910' },
  android: { interstitial: 'ca-app-pub-3940256099942544/1033173712' },
};

// Platzhalter — vor Launch durch echte MyPeak-Anzeigenblöcke ersetzen
// (Konto pub-8860791993288062).
// Echte MyPeak-Anzeigenblöcke (Konto pub-8860791993288062).
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
//  DSGVO-Einwilligung (Google UMP) + iOS App-Tracking-Transparency.
//  Die Einwilligungs-Nachricht selbst wird in AdMob konfiguriert
//  (Datenschutz & Mitteilungen → DSGVO). Ohne veröffentlichte Nachricht
//  meldet UMP NOT_REQUIRED und es erscheint kein Dialog.
// ---------------------------------------------------------------------------
async function runConsentFlow() {
  try {
    const info = await AdMob.requestConsentInfo();

    if (Capacitor.getPlatform() === 'ios') {
      try {
        const tracking = await AdMob.trackingAuthorizationStatus();
        if (tracking.status === 'notDetermined') {
          await AdMob.requestTrackingAuthorization();
        }
      } catch (e) {
        console.warn('ATT-Abfrage fehlgeschlagen:', e);
      }
    }

    if (info.isConsentFormAvailable && info.status === 'REQUIRED') {
      await AdMob.showConsentForm();
    }
  } catch (e) {
    console.warn('Consent-Flow fehlgeschlagen:', e);
  }
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

    await runConsentFlow();
    await AdMob.initialize({ initializeForTesting: USE_TEST_ADS });
    ready = true;
  } catch (e) {
    console.warn('AdMob-Init fehlgeschlagen:', e);
  }
}

// ---------------------------------------------------------------------------
//  Interstitial – sanfte Frequenz: mindestens 90s Abstand, und nicht bei
//  jeder Aktion (jede 2. qualifizierende Aktion). So bleibt die App nutzbar.
// ---------------------------------------------------------------------------
const INTERSTITIAL_MIN_GAP_MS = 90_000;
let lastInterstitial = 0;
let actionCount = 0;

export async function maybeShowInterstitial() {
  if (!ready) return;
  actionCount += 1;
  if (actionCount % 2 !== 0) return; // nur jede 2. Aktion
  if (Date.now() - lastInterstitial < INTERSTITIAL_MIN_GAP_MS) return;
  lastInterstitial = Date.now();
  try {
    await AdMob.prepareInterstitial({ adId: ids().interstitial, isTesting: USE_TEST_ADS });
    await AdMob.showInterstitial();
  } catch (e) {
    console.warn('Interstitial-Ad fehlgeschlagen:', e);
  }
}
