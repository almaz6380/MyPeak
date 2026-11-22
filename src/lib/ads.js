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
  // Premium-Nutzer haben das SDK nie gestartet — wer die Einwilligung ändern
  // will, startet es damit selbst.
  await initAds();
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

// Startet das Anzeigen-SDK samt Einwilligungsdialog — höchstens einmal.
//
// Aufgerufen wird das NICHT mehr pauschal beim App-Start (bis 1.6.3: 1,5 s
// nach dem Start, auch mitten im Onboarding und für Premium-Nutzer), sondern
// vom SubscriptionContext, sobald feststeht: Onboarding fertig UND kein
// Premium. Wer zahlt oder noch seine Daten eingibt, sieht keinen
// Werbe-Einwilligungsdialog.
let initLauf = null;
export function initAds() {
  if (!isNative) return Promise.resolve(); // Im Browser: keine Ads.
  initLauf ??= (async () => {
    try {
      const mod = await import('@capacitor-community/admob');
      AdMob = mod.AdMob;

      await warteAufTrackingAntwort();
      await runConsentFlow();
      await AdMob.initialize({ initializeForTesting: USE_TEST_ADS });
      ready = true;
      ladeVor();
    } catch (e) {
      console.warn('AdMob-Init fehlgeschlagen:', e);
    }
  })();
  return initLauf;
}

// Wann die Werbung überhaupt starten darf — reine Funktion, damit testbar.
export function werbungDarfStarten({ nutzerDa, aboGeladen, premium, onboardingFertig }) {
  return Boolean(nutzerDa && aboGeladen && !premium && onboardingFertig);
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
  // Premium abgelaufen und das SDK läuft schon: eine Anzeige bereitlegen.
  if (!premiumUser && ready && !geladen) ladeVor();
}

// Nach einer Bewertungsanfrage (lib/review.js) die Werbung fuer die normale
// Mindestpause aussetzen: Ein Interstitial direkt vor oder nach dem
// Bewertungsdialog verdirbt genau die Stimmung, um die es dabei geht.
export function werbungPausieren() {
  lastInterstitial = Date.now();
}

// ---------------------------------------------------------------------------
//  Vorladen. Bis 1.6.3 wurde die Anzeige erst im Moment des Auslösens geladen:
//  Der Aufrufer wechselte derweil den Bildschirm, und das Vollbild platzte
//  Sekunden später in die nächste Ansicht. Jetzt liegt immer eine geladene
//  Anzeige bereit; ist keine da (keine Füllung, kein Netz), entfällt die
//  Einblendung — und sie zählt dann auch NICHT gegen Abstand und Sitzungsdeckel.
// ---------------------------------------------------------------------------
let geladen = null; // Promise<boolean> des laufenden/letzten Vorladens
const LADE_GEDULD_MS = 1200;

function ladeVor() {
  if (!ready || premiumUser) return;
  geladen = AdMob.prepareInterstitial({ adId: ids().interstitial, isTesting: USE_TEST_ADS })
    .then(() => true)
    .catch((e) => {
      console.warn('Interstitial nicht geladen:', e);
      return false;
    });
}

// Gibt zurück, ob wirklich eine Anzeige gezeigt wurde.
export async function maybeShowInterstitial() {
  if (!ready) return false;
  if (premiumUser) return false; // Premium = werbefrei
  actionCount += 1;
  const jetzt = Date.now();
  if (!interstitialErlaubt({
    jetzt, appStart, letzte: lastInterstitial, gezeigt: shownThisSession, aktion: actionCount,
  })) return false;
  const laden = geladen;
  if (!laden) { ladeVor(); return false; }
  try {
    const da = await Promise.race([
      laden,
      new Promise((r) => setTimeout(() => r('spaet'), LADE_GEDULD_MS)),
    ]);
    // Lädt noch: diesmal ohne Anzeige weiter, das Laden läuft für die nächste
    // Gelegenheit fertig. Fehlgeschlagen: neu versuchen.
    if (da === 'spaet') return false;
    if (!da) { ladeVor(); return false; }
    geladen = null;
    await AdMob.showInterstitial();
    lastInterstitial = Date.now();
    shownThisSession += 1;
    ladeVor(); // gleich die nächste bereitlegen
    return true;
  } catch (e) {
    console.warn('Interstitial-Ad fehlgeschlagen:', e);
    geladen = null;
    ladeVor();
    return false;
  }
}
