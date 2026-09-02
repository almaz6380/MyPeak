import { Capacitor } from '@capacitor/core';
import { Health } from 'capacitor-health';
import { saveWeightEntry, getWeightEntries } from '../data/weightStorage';

// Apple Health / Google Health Connect — LESEND, als Opt-in im Profil.
//
// Umfang V1 (bewusst): Schritte heute anzeigen und Gewicht aus Health in den
// FullRep-Gewichtsverlauf uebernehmen. NICHT enthalten: Workouts nach Health
// SCHREIBEN — das Plugin capacitor-health 8.x hat schlicht keine
// Schreib-Methode (in dist/esm/definitions.d.ts nachgelesen: nur query*;
// die WRITE_WORKOUTS-Permission ist eine Altlast ohne API). Wer den Export
// will, braucht ein eigenes Plugin — als Ausbaustufe in CLAUDE.md notiert.
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
      permissions: ['READ_STEPS', 'READ_WEIGHT'],
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

// Schritte heute (lokale Tagesgrenzen). null = nicht verbunden/nicht lesbar.
export async function schritteHeute(userId) {
  if (!istVerbunden(userId)) return null;
  try {
    const start = new Date(); start.setHours(0, 0, 0, 0);
    const res = await Health.queryAggregated({
      startDate: start.toISOString(),
      endDate: new Date().toISOString(),
      dataType: 'steps',
      bucket: 'day',
    });
    const summe = (res?.aggregatedData || []).reduce((a, b) => a + (b?.value || 0), 0);
    return Math.round(summe);
  } catch (e) {
    console.warn('[health] Schritte nicht lesbar:', e);
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
