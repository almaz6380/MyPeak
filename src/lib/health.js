import { Capacitor, registerPlugin } from '@capacitor/core';
import { Health } from 'capacitor-health';
import { saveWeightEntry, getWeightEntries } from '../data/weightStorage';
import { getExerciseById } from '../data/exercises';

// Apple Health / Google Health Connect, zwei getrennte Opt-ins im Profil.
//
// LESEN (capacitor-health): Schritte und aktive (verbrannte) Kalorien heute
// anzeigen und Gewicht aus Health in den FullRep-Gewichtsverlauf uebernehmen.
//
// SCHRITTE OHNE HEALTH (seit 1.6.2, eigenes Plugin „Schritte": Core Motion auf
// iOS, Schrittzaehler-Sensor auf Android): eigenes Opt-in im Profil. Gezeigt
// wird immer das Hoehere aus Health und Geraet.
//
// SCHREIBEN (seit 1.6.0, eigenes Plugin „HealthExport" im App-Projekt:
// ios/App/App/HealthExportPlugin.swift, android/…/HealthExportPlugin.kt):
// abgeschlossene Workouts als Trainingseinheit (Art, Start, Ende). capacitor-
// health 8.x hat keine Schreib-Methode (nur query*), deshalb das eigene Plugin
// statt eines Wechsels — das Lesen und die Play-Erklaerung bleiben unberuehrt.
//
// Der Schalter ist ein reines Opt-in: ohne gesetzte Flagge fragt nichts nach
// Berechtigungen und nichts wird gelesen. Browser: alles No-Op/false.

const FLAGGE = (userId) => `fullrep.health.verbunden.${userId}`;
const LETZTER_IMPORT = (userId) => `fullrep.health.gewichtImport.${userId}`;

export function healthVerfuegbar() {
  return Capacitor.isNativePlatform();
}

export function istVerbunden(userId) {
  return !!userId && localStorage.getItem(FLAGGE(userId)) === 'true';
}

// Verbindung einschalten: Verfuegbarkeit pruefen, Berechtigungen anfragen.
// Liefert { ok, grund } — `grund` ist ein i18n-tauglicher Kurzcode.
export async function verbinden(userId) {
  if (!healthVerfuegbar()) return { ok: false, grund: 'nur_nativ' };
  try {
    const { available } = await Health.isHealthAvailable();
    if (!available) {
      // Android ohne Health-Connect-App: in den Play Store fuehren.
      if (Capacitor.getPlatform() === 'android') {
        await Health.showHealthConnectInPlayStore().catch(() => {});
      }
      return { ok: false, grund: 'nicht_verfuegbar' };
    }
    // Nur anfragen, was auch gelesen wird. READ_ACTIVE_CALORIES stand hier bis
    // 1.5.0 mit, ohne dass es je abgefragt wurde — im Systemdialog erschien
    // damit eine Zeile, der nie eine Funktion gegenueberstand.
    await Health.requestHealthPermissions({
      permissions: ['READ_STEPS', 'READ_WEIGHT', 'READ_ACTIVE_CALORIES'],
    });
    // ⚠ iOS verraet NICHT, ob der Nutzer zugestimmt hat (HealthKit-Prinzip:
    // Abgelehnt sieht aus wie „keine Daten"). Die Flagge heisst deshalb
    // „verbunden", nicht „genehmigt".
    localStorage.setItem(FLAGGE(userId), 'true');
    return { ok: true };
  } catch (e) {
    console.warn('[health] Verbinden fehlgeschlagen:', e);
    return { ok: false, grund: 'fehler' };
  }
}

export function trennen(userId) {
  // Nur die App-seitige Flagge — die Systemberechtigung verwaltet das OS
  // (iOS: Einstellungen → Health; Android: Health-Connect-App).
  localStorage.removeItem(FLAGGE(userId));
}

// Summe heute (lokale Tagesgrenzen) aus Health. null = nicht verbunden/nicht lesbar.
async function heuteAusHealth(userId, dataType) {
  if (!istVerbunden(userId)) return null;
  try {
    const start = new Date(); start.setHours(0, 0, 0, 0);
    const res = await Health.queryAggregated({
      startDate: start.toISOString(),
      endDate: new Date().toISOString(),
      dataType,
      bucket: 'day',
    });
    const summe = (res?.aggregatedData || []).reduce((a, b) => a + (b?.value || 0), 0);
    return Math.round(summe);
  } catch (e) {
    console.warn(`[health] ${dataType} nicht lesbar:`, e);
    return null;
  }
}

// Schritte heute: das Hoehere aus Health und dem eigenen Schrittzaehler.
// null = keine Quelle (weder Health verbunden noch Schritte zaehlen erlaubt).
export async function schritteHeute(userId) {
  const [ausHealth, vomGeraet] = await Promise.all([
    heuteAusHealth(userId, 'steps'),
    schritteVomGeraet(),
  ]);
  if (ausHealth == null && vomGeraet == null) return null;
  return Math.max(ausHealth ?? 0, vomGeraet ?? 0);
}

// Aktive (verbrannte) Kalorien heute, nur aus Health.
export function verbrannteKcalHeute(userId) {
  return heuteAusHealth(userId, 'active-calories');
}

// ── Schritte selbst zaehlen (ohne Health) ───────────────────────

const Schritte = registerPlugin('Schritte');
const ZAEHLEN_FLAGGE = 'fullrep.schritte.zaehlen';

export function schritteZaehlenAktiv() {
  return localStorage.getItem(ZAEHLEN_FLAGGE) === 'true';
}

// Fragt die Bewegungs-Berechtigung an. Der Schalter bleibt aus, wenn das
// System ablehnt oder das Geraet keinen Schrittzaehler hat.
export async function schritteZaehlenEinschalten() {
  if (!healthVerfuegbar()) return { ok: false, grund: 'nur_nativ' };
  try {
    const { status } = await Schritte.erlauben();
    if (status !== 'erlaubt') return { ok: false, grund: status === 'nicht_verfuegbar' ? 'nicht_verfuegbar' : 'abgelehnt' };
    localStorage.setItem(ZAEHLEN_FLAGGE, 'true');
    return { ok: true };
  } catch (e) {
    console.warn('[schritte] Freigabe fehlgeschlagen:', e);
    return { ok: false, grund: 'fehler' };
  }
}

// Nur die App-Flagge; die Systemberechtigung verwaltet das OS.
export function schritteZaehlenAusschalten() {
  localStorage.removeItem(ZAEHLEN_FLAGGE);
}

async function schritteVomGeraet() {
  if (!healthVerfuegbar() || !schritteZaehlenAktiv()) return null;
  try {
    const { status, schritte } = await Schritte.heute();
    return status === 'erlaubt' && Number.isFinite(schritte) ? schritte : null;
  } catch {
    return null;
  }
}

// Gewicht aus Health in den FullRep-Verlauf uebernehmen (letzte 90 Tage,
// je Tag hoechstens ein Eintrag; vorhandene FullRep-Eintraege desselben Tags
// haben Vorrang — was du in der App eingibst, ueberschreibt Health nie).
export async function gewichtImportieren(userId) {
  if (!istVerbunden(userId)) return 0;
  try {
    const seit = new Date(Date.now() - 90 * 86400000);
    const ab = localStorage.getItem(LETZTER_IMPORT(userId));
    const start = ab && new Date(ab) > seit ? new Date(ab) : seit;
    const res = await Health.queryRecords({
      startDate: start.toISOString(),
      endDate: new Date().toISOString(),
      dataType: 'weight',
    });
    const eigene = new Set((await getWeightEntries(userId, 400) || []).map((w) => w.date));
    let uebernommen = 0;
    const jeTag = new Map();
    for (const r of res?.records || []) {
      const kg = r?.value;
      const datum = String(r?.startDate || '').slice(0, 10);
      if (!datum || !(kg > 20) || !(kg < 400)) continue; // Unsinn aussortieren
      jeTag.set(datum, kg); // letzter Wert des Tages gewinnt
    }
    for (const [datum, kg] of jeTag) {
      if (eigene.has(datum)) continue;
      await saveWeightEntry(userId, datum, Math.round(kg * 10) / 10);
      uebernommen += 1;
    }
    localStorage.setItem(LETZTER_IMPORT(userId), new Date().toISOString());
    return uebernommen;
  } catch (e) {
    console.warn('[health] Gewichts-Import fehlgeschlagen:', e);
    return 0;
  }
}

// ── Workouts nach Health schreiben ──────────────────────────────

const HealthExport = registerPlugin('HealthExport');
const EXPORT_FLAGGE = (userId) => `fullrep.health.export.${userId}`;

export function exportAktiv(userId) {
  return !!userId && localStorage.getItem(EXPORT_FLAGGE(userId)) === 'true';
}

// Schreibrecht anfragen. Anders als beim Lesen meldet das System hier zurueck,
// ob erlaubt wurde — der Schalter bleibt aus, wenn nicht.
export async function exportEinschalten(userId) {
  if (!healthVerfuegbar()) return { ok: false, grund: 'nur_nativ' };
  try {
    const { granted } = await HealthExport.requestAuthorization();
    if (!granted) return { ok: false, grund: 'abgelehnt' };
    localStorage.setItem(EXPORT_FLAGGE(userId), 'true');
    return { ok: true };
  } catch (e) {
    console.warn('[health] Export-Freigabe fehlgeschlagen:', e);
    return { ok: false, grund: 'fehler' };
  }
}

export function exportAusschalten(userId) {
  localStorage.removeItem(EXPORT_FLAGGE(userId));
}

// Feinere Art fuer Health: cardioType (running, cycling …) bzw.
// martialArtsCategory (boxing …) aus dem Uebungskatalog. HIIT und Kampfsport
// speichern eine Sitzung mit exerciseList, dort zaehlt die erste Uebung.
export function workoutAktivitaet(workout) {
  const ex = workout?.exercises?.[0];
  if (!ex) return null;
  const katalog = getExerciseById(ex.exerciseId) || getExerciseById(ex.exerciseList?.[0]);
  return katalog?.cardioType || katalog?.martialArtsCategory || null;
}

// Nach dem Speichern aufrufen. Wirft nie: Health ist eine Zugabe, das
// Training ist in FullRep schon gespeichert. `start` fehlt bei allen Typen
// ausser Kraft — dann gilt Ende minus Dauer.
export async function workoutExportieren(userId, workout, { start, ende = new Date() } = {}) {
  if (!healthVerfuegbar() || !exportAktiv(userId) || !workout) return false;
  try {
    const bis = new Date(ende);
    const von = start ? new Date(start) : new Date(bis.getTime() - (workout.duration || 0));
    if (!(bis - von >= 60000)) return false; // unter einer Minute: kein Training fuer Health
    const { saved } = await HealthExport.saveWorkout({
      id: `fullrep-${von.getTime()}`,
      type: workout.type || 'strength',
      activity: workoutAktivitaet(workout),
      start: von.toISOString(),
      end: bis.toISOString(),
      title: 'FullRep',
    });
    return !!saved;
  } catch (e) {
    console.warn('[health] Workout-Export fehlgeschlagen:', e);
    return false;
  }
}
