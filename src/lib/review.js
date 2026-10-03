import { Capacitor } from '@capacitor/core';
import { InAppReview } from '@capacitor-community/in-app-review';
import { getWorkouts } from '../data/workoutStorage';
import { werbungPausieren } from './ads';

// Bewertungs-Anfrage (nur nativ; Browser = No-Op). Muster wie bei Swaply
// (swaply/src/ui/review.ts) — dort steht auch das Warum ausfuehrlich:
// Bewertungen sind fuer eine kleine App der staerkste Hebel in der
// Store-Suche. Der Dialog erscheint IN der App, das System drosselt selbst
// (iOS max. 3x/Jahr), und ob er erschien, ist nicht messbar — deshalb ist
// der Zeitpunkt alles.
//
// Zwei Ausloeser, beide in einem zufriedenen Moment:
// - nach einem ABGESCHLOSSENEN Training (jede Art), ab dem 2.
// - nach dem Speichern von Essen, sobald an 3 verschiedenen Tagen
//   etwas eingetragen ist
//
// ⚠ Bis 10/2026 galt: ab dem 5. KRAFTtraining, nie fuer Gaeste, nie nach
// Cardio/HIIT/Essen. Bei einer Handvoll Nutzern erschien der Dialog damit
// praktisch nie — und ohne Bewertungen findet die Store-Suche die App nicht.
// Gaeste zaehlen mit: Bewerten kann jeder, der die App installiert hat.

export const MIN_WORKOUTS = 2;
export const MIN_ESSENSTAGE = 3;
const MIN_TAGE_ABSTAND = 90; // das OS drosselt zusaetzlich haerter

const merkKey = (userId) => `fullrep.review.zuletzt.${userId}`;

function gesperrt(userId) {
  const zuletzt = localStorage.getItem(merkKey(userId));
  if (!zuletzt) return false;
  const diff = Date.now() - new Date(zuletzt).getTime();
  // Kaputtes Altdatum (NaN) blockiert nicht dauerhaft — dann fragen.
  return !Number.isNaN(diff) && diff < MIN_TAGE_ABSTAND * 86400000;
}

async function fragen(userId) {
  // Merker VOR der Anfrage setzen (Regel aus dem Anigosha-Interstitial):
  // beendet das System die App waehrend des Dialogs, fragten wir sonst beim
  // naechsten Mal gleich wieder.
  localStorage.setItem(merkKey(userId), new Date().toISOString());
  werbungPausieren();
  await InAppReview.requestReview();
  return true;
}

/** Nach einem abgeschlossenen Training. Gibt zurueck, ob gefragt wurde. */
export async function maybeAskForReview(userId) {
  if (!Capacitor.isNativePlatform()) return false;
  const id = userId || 'guest';
  try {
    if (gesperrt(id)) return false;
    const workouts = await getWorkouts(id);
    if ((workouts?.length ?? 0) < MIN_WORKOUTS) return false;
    return await fragen(id);
  } catch (e) {
    // Sichtbar im Log statt still — ohne `npx cap sync` fehlte das Feature
    // sonst spurlos (gleiche Falle wie bei Swaply dokumentiert).
    console.warn('[review] Bewertungsdialog konnte nicht angefragt werden:', e);
    return false;
  }
}

/** Tage mit mindestens einem Essenseintrag — liest nur localStorage. */
export function essensTage() {
  let n = 0;
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (!key?.startsWith('nutrition_entries_')) continue;
    try {
      const eintraege = JSON.parse(localStorage.getItem(key) || '[]');
      if (Array.isArray(eintraege) && eintraege.length > 0) n++;
    } catch { /* kaputter Eintrag zaehlt nicht */ }
  }
  return n;
}

/** Nach dem Speichern von Essen. Gibt zurueck, ob gefragt wurde. */
export async function maybeAskForReviewNachEssen(userId) {
  if (!Capacitor.isNativePlatform()) return false;
  const id = userId || 'guest';
  try {
    if (gesperrt(id)) return false;
    if (essensTage() < MIN_ESSENSTAGE) return false;
    return await fragen(id);
  } catch (e) {
    console.warn('[review] Bewertungsdialog konnte nicht angefragt werden:', e);
    return false;
  }
}
