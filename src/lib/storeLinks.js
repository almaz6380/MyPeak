// Die beiden Store-Adressen der App.
//
// ⚠ Dieselben Werte stehen ein zweites Mal in `public/get.html`. Das ist Absicht
// und keine vergessene Aufraeumarbeit: get.html ist eine statische Datei, die
// ohne Bundler ausgeliefert wird und deshalb nichts aus `src/` importieren kann.
// Aendert sich eine Adresse, gehoert BEIDES angefasst.
//
// ⚠ 6788461300 ist UNSERE ID. Es gibt eine fremde App „MyPeak — Gym Workout
// Tracker" unter 6758337601 im selben Markt — die beiden nicht verwechseln,
// sonst schickt der eigene Knopf die Nutzer zur Konkurrenz.
export const APP_STORE_URL = 'https://apps.apple.com/app/id6788461300';
export const PLAY_STORE_URL = 'https://play.google.com/store/apps/details?id=at.gallab.mypeak';
