import { Capacitor } from '@capacitor/core';
import { Preferences } from '@capacitor/preferences';
import { getXP } from '../data/socialStorage';
import { getWorkouts } from '../data/workoutStorage';
import { getNutritionEntries, getNutritionGoals } from '../data/nutritionStorage';
import { schritteHeute, verbrannteKcalHeute } from './health';
import { todayLocal } from './dateUtils';

// Datenbruecke zum Homescreen-Widget.
//
// Das Problem: Die App lebt in der WebView, ihre Daten in localStorage —
// darauf kann ein natives Widget NICHT zugreifen. Die Bruecke schreibt deshalb
// einen kompakten Auszug in einen geteilten nativen Speicher, den beide Seiten
// lesen koennen:
//   Android: SharedPreferences-Datei `FullRepWidget` (im Plugin-Quelltext
//            verifiziert: getSharedPreferences(group, MODE_PRIVATE), Schluessel
//            unveraendert). Das Widget liest genau diese Datei.
//   iOS:     ⚠ @capacitor/preferences schreibt IMMER in UserDefaults.standard;
//            `group` ist dort nur ein SCHLUESSEL-PRAEFIX, KEINE Suite (im
//            Plugin-Quelltext verifiziert — die naheliegende Annahme
//            „group = App-Group-Suite" waere stumm ins Leere gelaufen).
//            Deshalb kopiert der AppDelegate den Wert beim Verlassen der App
//            von standard["FullRepWidget.widget.daten"] in die App-Group-Suite
//            group.at.gallab.mypeak — erst DIE kann die Widget-Extension lesen.
//
// Seit 1.6.1 zeigen die Widgets Makros (kcal + P/K/F gegen das Ziel) und
// Schritte statt Streak. Geschrieben wird bei App-Start, nach jedem Workout
// und bei jeder Aenderung auf der Ernaehrungsseite. `datum` sagt dem Widget,
// fuer welchen Tag die Zahlen gelten — nach Mitternacht zeigt es 0 statt der
// Werte von gestern. Schritte liest das iOS-Widget selbst aus Health; der
// Wert hier ist nur der Rueckfall, wenn das nicht geht (Geraet gesperrt). Die Aktualisierung der
// Widget-ANZEIGE stossen die nativen Seiten an (MainActivity.onPause bzw.
// WidgetKits Timeline-Refresh), nicht dieses Modul.
//
// Browser: komplett No-Op. Fehler: still — ein Widget darf nie die App stoeren.

const GROUP = 'FullRepWidget'; // beide Plattformen; iOS-App-Group macht der AppDelegate
export const WIDGET_KEY = 'widget.daten';

let konfiguriert = false;

function wochenstart() {
  // Montag 00:00 lokal — dieselbe Wochenlogik wie die Heimkachel.
  const d = new Date();
  const tag = (d.getDay() + 6) % 7;
  d.setDate(d.getDate() - tag);
  d.setHours(0, 0, 0, 0);
  return d;
}

export async function widgetDatenAktualisieren(userId) {
  if (!Capacitor.isNativePlatform() || !userId) return;
  try {
    if (!konfiguriert) {
      await Preferences.configure({ group: GROUP });
      konfiguriert = true;
    }
    const heute = todayLocal();
    const [xp, workouts, eintraege, ziele, schritte, kcalVerbrannt] = await Promise.all([
      getXP(userId), getWorkouts(userId),
      getNutritionEntries(userId, heute), getNutritionGoals(userId),
      schritteHeute(userId), verbrannteKcalHeute(userId),
    ]);
    const start = wochenstart();
    const woche = (workouts || []).filter((w) => w?.date && new Date(`${w.date}T12:00:00`) >= start).length;
    const summe = (feld) => Math.round((eintraege || []).reduce((a, e) => a + (Number(e?.[feld]) || 0), 0));
    const daten = {
      streak: xp?.streak_days || 0,
      level: xp?.level || 1,
      workoutsWoche: woche,
      datum: heute,
      kcal: summe('calories'),
      kcalZiel: Math.round(Number(ziele?.calories) || 0),
      protein: summe('protein'),
      proteinZiel: Math.round(Number(ziele?.protein) || 0),
      carbs: summe('carbs'),
      carbsZiel: Math.round(Number(ziele?.carbs) || 0),
      fat: summe('fat'),
      fatZiel: Math.round(Number(ziele?.fat) || 0),
      // null = weder Health noch Schrittzaehler; das Widget zeigt dann einen Hinweis statt 0
      schritte: schritte ?? null,
      // aktive Kalorien aus Health, null ohne Verbindung
      kcalVerbrannt: kcalVerbrannt ?? null,
      // fuer die Widget-Anzeige „Stand: …" und als Frische-Merkmal
      stand: new Date().toISOString(),
    };
    await Preferences.set({ key: WIDGET_KEY, value: JSON.stringify(daten) });
  } catch (e) {
    console.warn('[widget] Daten nicht geschrieben:', e);
  }
}
