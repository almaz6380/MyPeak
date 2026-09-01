import { Capacitor } from '@capacitor/core';
import { InAppReview } from '@capacitor-community/in-app-review';
import { getWorkouts } from '../data/workoutStorage';

// Bewertungs-Anfrage (nur nativ; Browser = No-Op). Muster wie bei Swaply
// (swaply/src/ui/review.ts) — dort steht auch das Warum ausfuehrlich:
// Bewertungen sind fuer eine kleine App der staerkste Hebel in der
// Store-Suche, und FullRep hatte bis 1.3.1 GAR KEINE Anfrage, also auch
// keinen Zufluss. Der Dialog erscheint IN der App, das System drosselt
// selbst (iOS max. 3x/Jahr), und ob er erschien, ist nicht messbar —
// deshalb ist der Zeitpunkt alles.
//
// Zeitpunkt hier: direkt nach dem ABGESCHLOSSENEN Workout, auf der
// Zusammenfassung mit XP und PRs — da ist gerade jemand nachweislich
// zufrieden. Fruehestens ab dem 5. Workout: Nach dem ersten hat man noch
// kein Urteil, und wer fuenfmal wiederkam, mag die App.

const MIN_WORKOUTS = 5;
const MIN_TAGE_ABSTAND = 90; // das OS drosselt zusaetzlich haerter

const merkKey = (userId) => `fullrep.review.zuletzt.${userId}`;

export async function maybeAskForReview(userId) {
  if (!Capacitor.isNativePlatform()) return;
  if (!userId || userId === 'guest') return;
  try {
    const zuletzt = localStorage.getItem(merkKey(userId));
    if (zuletzt) {
      const diff = Date.now() - new Date(zuletzt).getTime();
      // Kaputtes Altdatum (NaN) blockiert nicht dauerhaft — dann fragen.
      if (!Number.isNaN(diff) && diff < MIN_TAGE_ABSTAND * 86400000) return;
    }
    const workouts = await getWorkouts(userId);
    if ((workouts?.length ?? 0) < MIN_WORKOUTS) return;

    // Merker VOR der Anfrage setzen (Regel aus dem Anigosha-Interstitial):
    // beendet das System die App waehrend des Dialogs, fragten wir sonst beim
    // naechsten Workout gleich wieder.
    localStorage.setItem(merkKey(userId), new Date().toISOString());
    await InAppReview.requestReview();
  } catch (e) {
    // Sichtbar im Log statt still — ohne `npx cap sync` fehlte das Feature
    // sonst spurlos (gleiche Falle wie bei Swaply dokumentiert).
    console.warn('[review] Bewertungsdialog konnte nicht angefragt werden:', e);
  }
}
