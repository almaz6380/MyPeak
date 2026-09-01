import { Capacitor } from '@capacitor/core';
import { LocalNotifications } from '@capacitor/local-notifications';
import i18n from '../i18n';

// Signal fuers Pausenende des Rest-Timers — als LOKALE Benachrichtigung.
//
// Warum: Im Gym liegt das Handy waehrend der Pause gesperrt auf der Bank. In
// der WebView friert setInterval dann ein, und navigator.vibrate existiert in
// iOS-WKWebView gar nicht — das Pausenende war am iPhone schlicht stumm, bei
// gesperrtem Schirm auf beiden Plattformen. Hevy/Strong loesen das genauso:
// Die Benachrichtigung feuert vom System zur geplanten Zeit, egal was die
// WebView gerade tut.
//
// Eine FESTE ID: Jede neue Pause ersetzt die vorige (auch der +30s-Knopf
// startet den Timer neu und verschiebt damit die Meldung), und es kann nie
// ein Stapel vergessener Pausen-Meldungen auflaufen.
const PAUSEN_ID = 90210;

// Im Browser alles No-Op — dort gibt es den Sperrbildschirm-Fall nicht und
// der Web-Permission-Dialog waere nur Laerm.
const nativ = Capacitor.isNativePlatform();

async function erlaubt() {
  const { display } = await LocalNotifications.checkPermissions();
  if (display === 'granted') return true;
  // Erst beim ERSTEN Timer fragen, nicht beim App-Start: Da versteht man,
  // wofuer die Erlaubnis gut ist. (Android 13+ zeigt hier den Systemdialog.)
  if (display === 'prompt' || display === 'prompt-with-rationale') {
    const res = await LocalNotifications.requestPermissions();
    return res.display === 'granted';
  }
  return false;
}

// Plant die Pausenende-Meldung. Abgelehnt oder fehlgeschlagen ⇒ still weiter:
// der Timer in der App laeuft unabhaengig davon.
export async function pausenSignalPlanen(sekunden) {
  if (!nativ || !(sekunden > 0)) return;
  try {
    if (!(await erlaubt())) return;
    await LocalNotifications.schedule({
      notifications: [{
        id: PAUSEN_ID,
        title: i18n.t('training.restOverTitle'),
        body: i18n.t('training.restOverBody'),
        schedule: { at: new Date(Date.now() + sekunden * 1000), allowWhileIdle: true },
      }],
    });
  } catch (e) {
    console.warn('[rest] Pausen-Benachrichtigung nicht geplant:', e);
  }
}

// Nimmt die geplante Meldung zurueck (Timer abgebrochen, Workout beendet,
// oder Pausenende bereits im Vordergrund erlebt).
export async function pausenSignalAbbrechen() {
  if (!nativ) return;
  try {
    await LocalNotifications.cancel({ notifications: [{ id: PAUSEN_ID }] });
  } catch {
    // still: eine nicht mehr existierende Meldung zu canceln ist kein Fehler
  }
}
