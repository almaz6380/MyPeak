# CLAUDE.md — Fitness All-in-One App

## Projektübersicht

Eine Fitness- und Ernährungs-App, die Training-Tracking und Ernährungs-Tracking in einer einzigen, übersichtlichen App vereint. Die App soll trotz vieler Features einfach zu bedienen und nicht überfüllt sein.

**App-Name:** MyPeak
**Live-URL:** https://my-peak.vercel.app
**Git-Repository:** https://github.com/almaz6380/MyPeak
**Zielplattform:** Web-App → PWA → später App Store (iOS + Android)
**Sprachen:** Mehrsprachig (Deutsch + Englisch)
**Geschäftsmodell:** Freemium mit 7 Tagen kostenloser Testphase
**Zielgruppe:** Fitnessstudio-Besucher (Geräte + freie Gewichte), Anfänger bis Fortgeschrittene

---

## Aktueller Stand

### Store-Launch + Werbung (07.07.2026) — EINGEREICHT
- **Android:** signiertes `.aab` (versionCode 1 / 1.0) bei Google Play in Prüfung. Upload-Keystore in `android/upload-keystore.jks` + `keystore.properties` (gitignored! Backup in ~/AppSigningKeys/mypeak + OneDrive). Build: `JAVA_HOME=<Android-Studio-jbr> ./gradlew bundleRelease`.
- **iOS:** IPA bei App Store Connect eingereicht (App-ID 6788461300, Bundle at.gallab.mypeak). Manuelle Distributions-Signierung im pbxproj (Team JU8STVD4SJ, Profil „MyPeak AppStore"). Build: `xcodebuild ... archive` + `-exportArchive` (ExportOptions auf ~/Desktop/mypeak-ios-export/), Upload via `altool` (ASC-Key VGHCB8Z8Q2). Metadaten per ASC-API gesetzt.
- **Werbung (AdMob, `src/lib/ads.js`):** Interstitials (jede 2. qualifizierende Aktion, ≥90s Abstand) nach Workout-Speichern + Mahlzeit-Hinzufügen, mit DSGVO-Einwilligung (UMP, nativ in @capacitor-community/admob@8). `USE_TEST_ADS`-Flag: `false`=echte Anzeigen (Launch). Echte IDs (Konto pub-8860791993288062): Android App `~3613953701`/Interstitial `/7984478947`, iOS App `~8812263899`/Interstitial `/5028931559`. **NIE eigene Live-Anzeigen anklicken** (Kontosperre). Nur nativ — Web zeigt keine Ads.
- **Store-Assets:** `store-assets/` (Screenshots iOS+Android, iPad, Feature-Grafik, App-Icon, `store-texte.md`). Review-Demo-Account: appreview@wellbooked.at / MyPeak-Review#2026.
- **Offen nach Launch:** AdMob-App↔Store verknüpfen; iOS-Update 1.1 (Englisch) liegt auf Branch i18n-en.

### Launch-Fixes (Juli 2026, Branch launch-fixes) — FERTIG
- [x] Rechtsseiten Impressum/Datenschutz/AGB (`/legal/*`, `src/pages/legal/`) — PLATZHALTER in legalContent.js (Name/Adresse) noch ausfüllen!
- [x] Konto-Löschung (api/delete-account.js + Profil) — braucht `SUPABASE_SERVICE_ROLE_KEY` in Vercel
- [x] RLS-Sicherheitsmigration `supabase/migration-2026-07-security.sql` — muss im Supabase SQL Editor ausgeführt werden!
- [x] Gemini-Endpoint mit Login-Pflicht (Gäste bekommen Hinweis)
- [x] Zeitzonen-Fix: lokales Datum überall (src/lib/dateUtils.js)
- [x] Gast→Konto-Migration komplett neu (src/data/resync.js): alle Datentypen, keine Duplikate, Auto-Retry bei online
- [x] Logout löscht Nutzerdaten-Keys (Gast-Daten bleiben für Registrierung)
- [x] ErrorBoundary + 404-Route, verständliche Auth-Fehler + Resend-Bestätigung
- [x] Inter selbst gehostet (@fontsource, DSGVO), Meta/OG-Tags, robots.txt, .env.example
- [x] Code-Splitting: Peptide/Diäten/Kochbuch lazy → Hauptbundle 2.031→1.311 KB

### Phase 1: Fundament — FERTIG
- [x] Projektstruktur aufgesetzt (React + Vite + Tailwind CSS)
- [x] Bottom-Navigation (5 Tabs: Training, Ernährung, HOME-FAB, Bibliothek, Profil)
- [x] Home-Dashboard als zentrale Startseite mit Kalorien, Makros (P/C/F/Ballaststoffe), Wasser, Supplements, Training, Streak
- [x] Datumsnavigation auf Home: Pfeile links/rechts + Kalender-Modal, alle Daten tagesbezogen
- [x] Profil-Avatar oben rechts → navigiert zu /profile, Logo zentriert, Begrüßung mit Tageszeit + Name
- [x] Gewichtsverlauf-Diagramm: SVG-Liniengraph, ein-/ausblendbar (Zustand in localStorage), Plus-Button zum Eintragen
- [x] Gewichtsdiagramm: Zeiträume 7T/14T/1M/3M/6M/1J/Alle + eigener Datumsbereich (Von-Bis-Picker)
- [x] Gewichtsdiagramm: Standard ausgeklappt, Profil-Gewicht als Startwert
- [x] Zyklustracking: 4 Phasen mit Training-/Ernährungs-Empfehlungen, Symptom-Tagebuch, Home-Widget (nur female)
- [x] Zyklustracking: Setup-Karte auf Home wenn noch nicht eingerichtet (🌸 "Zyklus einrichten")
- [x] Home-Button als goldener Kreis-FAB mit MyPeak-Pfeil, ragt über Nav hinaus
- [x] Pull-to-Refresh: MyPeak-Logo zeichnet sich neu beim Aktualisieren
- [x] Mehrsprachigkeit (DE/EN) mit i18next eingerichtet
- [x] Basis-Design mit Farbschema, Typografie, Dark/Light Mode
- [x] Einheiten umschaltbar (kg/lbs) im Profil
- [x] Per-Exercise kg/lbs Toggle: Während des Workouts kann pro Übung zwischen kg und lbs gewechselt werden (tappbarer Badge neben "Gewicht"), ohne die globale Einstellung zu ändern. Einheit wird pro Übung im Workout gespeichert und in History korrekt angezeigt. PR-Erkennung normalisiert auf kg.

### Phase 1.5: Auth & Onboarding — FERTIG
- [x] Supabase als Backend (Auth + Datenbank)
- [x] Registrierung und Login mit E-Mail/Passwort
- [x] Passwort-Zurücksetzen-Flow
- [x] Onboarding-Flow mit 8 Seiten (Name+Geburtsdatum, Geschlecht, Größe-Slider, Gewicht-Slider, Ziel, Aktivitätslevel, Erfahrung, Nutzungsbedingungen)
- [x] Smooth fade-in Animationen, Fortschrittsbalken, große Karten, goldener Slider-Thumb
- [x] Onboarding-Daten werden in Supabase `profiles`-Tabelle gespeichert
- [x] Automatische Weiterleitung zur Haupt-App nach Onboarding
- [x] Trigger erstellt automatisch Profile + Settings bei neuer Registrierung
- [x] Profil mit allen Daten änderbar (Gewicht, Größe, Ziel etc.)
- [x] Gastmodus: "Als Gast testen" auf Login-Seite, komplette App ohne Registrierung
- [x] Gast-Daten nur in localStorage (kein Supabase), isGuest()-Check in allen Storage-Funktionen
- [x] Dezenter Banner: "Du bist im Gastmodus — registriere dich, um deine Daten dauerhaft zu speichern."

### Phase 2: Training-Tracking — FERTIG
- [x] Übungsbibliothek mit Beschreibungen, Muskelgruppe, Equipment
- [x] Krafttraining: Sätze/Wiederholungen/Gewicht loggen mit Echtzeit-Timer
- [x] Cardio/HIIT/Zirkeltraining/Kampfsport mit Timer-System
- [x] Vorgefertigte Trainingspläne für alle Trainingsbereiche
- [x] Eigene Trainingspläne erstellen, speichern und löschen
- [x] Workout starten: Auswahl zwischen Trainingsplan oder freiem Workout
- [x] Workout beenden (speichert) vs. Workout verwerfen (löscht) — klar getrennte Aktionen
- [x] Fix: Workout beenden blockiert nicht mehr (saveWorkout fire-and-forget, kein await auf Supabase)
- [x] Fix: Plan speichern enthält alle Übungen inkl. während des Trainings hinzugefügter
- [x] Während des Workouts jederzeit Übungen hinzufügen/entfernen (ohne State-Verlust)
- [x] PR-Erkennung (Neuer persönlicher Rekord)
- [x] Workout-Verlauf mit aufklappbaren Details (alle Sätze pro Übung)
- [x] Workout-Vergleichsfunktion (wird später überarbeitet)
- [x] Muskelgruppen-Filter und Suchfunktion in der Übungsbibliothek
- [x] Workout-Persistenz: überlebt Tab-Wechsel + App-Schließen (ActiveWorkoutContext + localStorage)
- [x] Automatisches Resume beim App-Start mit "Workout fortsetzen" Banner
- [x] Abgeschlossene Workouts nachträglich bearbeiten (Sets/Reps/Gewicht ändern, Sätze hinzufügen/entfernen)
- [x] Dezimale Wiederholungen möglich (z.B. 7.5 Reps)
- [x] Workout-Typ-Auswahl vertikal redesigned (horizontale Karten mit Icon + Pfeil)
- [x] Kampfsport-Icon: Custom Boxhandschuhe SVG
- [x] Weißer Bildschirm behoben (localStorage-Validierung + Safety-Checks)
- [x] 5 neue Kampfsportarten: Judo, BJJ, Taekwondo, Wrestling (je 4 Übungen)
- [x] Eigene Übungen erstellen (Name, Muskelgruppe, Equipment → Supabase custom_exercises)
- [x] Freunde-System: MyPeak-Code (MP-NAME-XXXX), per Code hinzufügen, Anfragen annehmen/ablehnen
- [x] Leaderboard: Wöchentlich rotierende Kategorie (Volumen/Streak/Trainings), nur Freunde
- [x] Challenges: Freund herausfordern, Volumen oder Runden, Zeitraum wählbar, Live-Score
- [x] XP-System: Workout +10 XP, Challenge gewinnen +50 XP, 7-Tage-Streak +25 XP, Level-Anzeige im Profil
- [x] Social-Karten auf Training-Startseite (Ranking, Challenges, Freunde)
- [x] Level-System: Titel (Rookie/Warrior/Champion/Legend/GOAT), progressive XP, Level-Up Animation
- [x] Übungsbibliothek erweitert: 117 Kraftübungen (Brust, Rücken, Schultern, Bizeps, Trizeps, Beine, Glutes, Abs, Calves, Forearms), hierarchische Navigation (Bereich→Filter)
- [x] Equipment-Filter (Langhantel/Kurzhantel/Kabelzug/Maschine/Körpergewicht) in der Bibliothek
- [x] Karate entfernt, Seilspringen bei Cardio hinzugefügt
- [x] Übungsnotizen + Geräte-Einstellungen pro Übung (Supabase exercise_notes)
- [x] Foto-Upload pro Übung (IndexedDB lokal, komprimiert)
- [x] Notiz-Vorschau als farbige Tags unter dem Übungsnamen im Workout
- [x] Kreiskalender (DiamondCalendar): Swipbare Kreise oben, Bogen-Effekt, Schwarz/Blau/Gold, Pulse-Feedback
- [x] Kreiskalender: Tage laufen über Monatsgrenzen hinweg, Monatsname passt sich automatisch an
- [x] Kreiskalender: Kalender-Picker für exakte Tagesauswahl
- [x] Wochenplan-System: Einheiten/Woche wählen → Tage verteilen → Split-Typ oder Übungen zuweisen
- [x] Supabase: weekly_schedules Tabelle, aktiver Plan bestimmt blaue Kreise im Kalender
- [x] Training-Tabs: "Meine Pläne" (eigene Wochenpläne) + "Peak-Programme" (vorgefertigte)
- [x] 21 Peak-Programme: 6 Kraft (PPL, OK/UK, 5er-Split, Ganzkörper, Push/Pull, Bro-Split), 5 Cardio, 5 HIIT, 5 Kampfsport
- [x] Peak-Programme anpassbar: Tage tauschen (Ruhetage verschieben), Übungen entfernen, Zurücksetzen
- [x] Level-Badges + "Empfohlen" basierend auf Onboarding-Ziel/Erfahrung
- [x] Programm starten → wird als Wochenplan gespeichert → Kreiskalender zeigt blaue Tage
- [x] Meine Pläne: Übersicht gespeicherter Wochenpläne + Freies Training Button + Plan erstellen
- [x] Verlauf als eigene Karte unter den QuickActions, über Social
- [x] Eigene Übungen löschen: Papierkorb-Button + Bestätigungsdialog, goldenes "Eigene" Badge bei Custom Exercises
- [x] Fix: Eigene Übungen erstellen funktioniert jetzt auch im Gastmodus und während aktivem Workout (user?.id Fallback + try/catch)
- [x] ~~BUG: Plan-Detailansicht~~ — GEFIXT. Klick auf Plan öffnet Detailansicht, Übungen hinzufügen/entfernen, Workout startet erst bei Button.
- [x] Performance: Alle Storage-Funktionen auf localStorage-first (kein Supabase-Blocking mehr, Session-Timeout 3s)
- [x] Performance: Sofortiger App-Start — Auth + Profil synchron aus localStorage, kein Loading-Spinner für Returning Users
- [x] Performance: SplashScreen nur beim allerersten Besuch, danach übersprungen
- [x] Performance: Globales 8s Timeout auf Supabase-Client, AbortController-Timeouts auf Open Food Facts (8s), Gemini API (15s)
- [x] Fix: BarcodeScanner gibt Kamera beim Schließen frei (CameraContext.releaseCamera), Timeouts auf API-Calls
- [x] Fix: CommunityProducts mit try/catch abgesichert (kein Scan-Flow-Crash mehr)
- [x] ~~BUG: Mahlzeit-Foto KI~~ — GEFIXT. Bildkompression, Timeout-Handling, Gemini 429 Rate-Limit Retry, bessere Fehlermeldungen.
- [x] Fix: Auth guestSkip + localStorage-Merge bei Login
- [x] Fix: Rest-Timer Position unter Notch + Set-Completion UX
- [x] Fix: Training bugs (Rest-Timer, Set-Abhaken, Workout-History)

### Phase 3: Ernährungs-Tracking — FERTIG
- [x] Lebensmittel-Suche (150 lokale Lebensmittel + Open Food Facts API)
- [x] Mahlzeiten manuell eingeben (Name, Marke, Portion, Makros)
- [x] Eigene Meals erstellen, speichern, bearbeiten und löschen (Soft-Delete)
- [x] Tägliche Kalorien- und Makro-Übersicht mit SVG-Ringen (kcal, Protein, Carbs, Fat)
- [x] TDEE-Rechner (Mifflin-St Jeor Formel, vorbefüllt mit Profildaten)
- [x] Makro-Ziele manuell editierbar (nicht nur über TDEE)
- [x] kcal-Ziel Auto/Manuell-Modus: Auto berechnet kcal aus Makros (P×4+C×4+F×9), Manuell erlaubt freie Eingabe
- [x] Barcode-Scanner per Kamera (Quagga2 + Open Food Facts API + Community Products + CameraContext)
- [x] Barcode-Scan: Produktbild von Open Food Facts + Makros als Fullscreen-Ergebnis nach Scan
- [x] Produktfotos: Eigenes Foto aufnehmen wenn kein Bild in der Datenbank (IndexedDB, komprimiert)
- [x] Lebensmittel-Bilder: Open Food Facts Produktbilder in Suche + Kategorie-Emojis als Fallback
- [x] Community Products: Unbekannte Produkte selbst hinzufügen → steht allen Usern zur Verfügung
- [x] Crowdsource-Korrekturen: 3+ ähnliche User-Korrekturen → Community-Eintrag wird automatisch aktualisiert
- [x] 4 Mahlzeit-Slots (Frühstück, Mittagessen, Abendessen, Snacks)
- [x] Lebensmittel hinzufügen: Tabs (Lebensmittel | Letzte) + Multi-Auswahl + alle auf einmal speichern
- [x] Letzte Lebensmittel: Schnellauswahl-Tab mit allen zuvor gegessenen Foods, ein Tap zum Hinzufügen
- [x] Custom Calendar für Datumsauswahl (kein nativer Browser-Picker)
- [x] Farbcodierte Makro-Badges bei jedem Eintrag (P/C/F als Pills)
- [x] PortionPicker mit Live-Makro-Berechnung und +/- Buttons
- [x] Wasser-Tracking: eigener Bereich mit Fortschrittsbalken, +250ml/+500ml Quick-Buttons, eigene Menge
- [x] Wasserziel editierbar im Goal-Editor (Default 3L)
- [x] Supabase-Tabellen: nutrition_entries, custom_meals, nutrition_goals, water_entries
- [x] Vollständige DE/EN Übersetzungen (~80 Keys)
- [x] Kochbuch: 25 Rezepte (5 pro Mahlzeit), 2 Filter-Ebenen (Mahlzeit + Ernährungsform)
- [x] Portionsrechner (skaliert Zutaten + Nährwerte), Favoriten, Suche
- [x] "Gegessen"-Button → Mahlzeit wählen → ins Tagestracking übernehmen
- [x] KI-Foto-Erkennung: Mahlzeit fotografieren → Gemini Vision analysiert → kcal + Makros pro Lebensmittel
- [x] Öl-Level-Auswahl (wenig/normal/viel) zur Fett-/Kalorien-Anpassung
- [x] Vercel Serverless Function (api/analyze-meal.js) als Proxy für Gemini 2.0 Flash (kostenlos)
- [x] Confidence-Badges (Sicher/Geschätzt/Unsicher) pro erkanntem Lebensmittel
- [x] Ergebnis-Items landen im Multi-Select-Queue (kombinierbar mit Suche/Barcode)

### PWA-Setup — FERTIG
- [x] manifest.json mit App-Name, Icons, standalone display
- [x] Service Worker (network-first strategy)
- [x] PWA-Icons (192px + 512px)
- [x] apple-touch-icon + apple-mobile-web-app-status-bar-style
- [x] App auf Homescreen installierbar
- [x] CameraContext: Kamera-Berechtigung einmal pro Session cached (kein erneuter Prompt beim 2. Scan)

### Phase 3.2: Supplement-Tracking — FERTIG
- [x] Supplements manuell anlegen (Name, Marke, Form, Dosierung, Notizen)
- [x] Formen: Tablette, Pulver, Flüssig
- [x] Voller 7-Tage-Wochenplan (pro Supplement individuelle Tage wählbar)
- [x] 5 Einnahmezeiten: Morgens, Mittags, Pre-Workout, Post-Workout, Abends
- [x] Tagesansicht gruppiert nach Einnahmezeit mit Checkboxen zum Abhaken
- [x] Fortschrittsbalken (X/Y eingenommen)
- [x] In-App Banner "Noch X Supplements offen"
- [x] Supplement-Karte in der Ernährungs-Tagesansicht
- [x] Supabase: supplements + supplement_logs Tabellen mit RLS
- [x] localStorage-first Pattern (offline + Gastmodus)
- [x] i18n komplett (DE + EN)
- [ ] Optionale Nährwerte pro Supplement (Kalorien, Protein etc.) — nur anzeigen, nicht pflicht
- [x] Form "Kapsel" entfernt

### Phase 3.3: Zyklustracking (weibliche User) — FERTIG
- [x] 4 Zyklusphasen (Menstruation, Follikelphase, Ovulation, Lutealphase) mit Farbcodierung
- [x] Phasenspezifische Training- und Ernährungs-Empfehlungen
- [x] Symptom-Tagebuch: Stimmung (5 Emojis), Energie, Schmerzen, Schlaf, Symptom-Toggles, Notizen
- [x] Ersteinrichtung mit Slider (Zykluslänge 21-35, Periodenlänge 3-7)
- [x] Home-Widget zeigt aktuelle Phase + Tag (nur bei gender=female)
- [x] Supabase: cycle_settings + cycle_logs Tabellen
- [x] localStorage-first Pattern + Gastmodus

### Phase 3.4: Gewichtsverlauf — FERTIG
- [x] Gewichtsverlauf als SVG-Liniengraph auf dem Home-Dashboard
- [x] Plus-Button zum Eintragen (kg, Dezimalzahlen)
- [x] Ein-/ausblendbar (Tap auf Header)
- [x] Gold-Linie mit Gradient-Füllung, letzte 30 Einträge
- [x] Supabase: weight_entries Tabelle

### Phase 4.1: Diäten-Bibliothek — FERTIG
- [x] 8 Diätformen als ausführliche E-Books (je 7 Kapitel, DE+EN, mit wissenschaftlichen Studien)
- [x] Diätformen: Kaloriendefizit, Reverse Dieting, Body Recomp, IF 16:8, High Protein, Carb Cycling, Diet Break, Mini Cut
- [x] Kategorie-Filter (Fettabbau, Rekomposition, Mahlzeiten-Timing, Fortgeschritten)
- [x] "Diät starten" → berechnet Kalorien/Makros basierend auf Profil-TDEE → setzt Ernährungsziele automatisch
- [x] Bestätigungs-Dialog mit berechneten Werten vor Aktivierung
- [x] Aktive Diät markiert in der Liste, Diät beenden möglich
- [x] Phasen-Tracking für progressive Diäten (Reverse Dieting, Carb Cycling)
- [x] Supabase: active_diet Tabelle
- [x] dietStorage.js: CRUD + Ziel-Berechnung + Phasen-Tracking

### Phase 3.5–6: Noch offen (siehe Bauplan unten)

---

## Technischer Stack

- **Framework:** React 18 + Vite
- **Styling:** Tailwind CSS (Mobile-first)
- **i18n:** react-i18next (DE + EN)
- **Backend:** Supabase (Auth + PostgreSQL-Datenbank)
- **Hosting:** Vercel (automatisches Deployment über GitHub)
- **Datenspeicherung:** Supabase (Cloud) + localStorage (Cache/Fallback)
- **Barcode-Scanner:** Quagga2 (Open Source, optimiert für 1D-Barcodes)
- **Lebensmittel-API:** Open Food Facts (kostenlos, keine API-Keys)
- **PWA:** manifest.json + Service Worker (installierbar auf Homescreen)
- **Icons:** Lucide React
- **KI-Foto-Erkennung:** Google Gemini 2.0 Flash (kostenlos, Vision API via Vercel Serverless Function)
- **Schrift:** Inter (Google Fonts)

### Dateistruktur (Kernkomponenten)
```
src/
├── pages/
│   ├── HomePage.jsx              # Dashboard mit Kalorien, Makros, Wasser, Supplements, Training, Gewicht, Zyklus
│   ├── CycleDetailPage.jsx      # Zyklustracking Detail-Seite mit Tagebuch + Empfehlungen
│   ├── TrainingPage.jsx          # Training-Hub + Workout-Start-Auswahl
│   ├── ProfilePage.jsx           # Profil mit Dark Mode, Sprache, Einheiten
│   ├── auth/
│   │   ├── AuthPage.jsx          # Login/Registrierung
│   │   └── UpdatePasswordPage.jsx # Passwort ändern
│   ├── onboarding/
│   │   └── OnboardingPage.jsx    # 7-Schritte-Onboarding
│   └── training/
│       ├── ActiveWorkout.jsx     # Aktives Workout (Sets loggen, Timer, Beenden/Verwerfen)
│       ├── ExerciseLibrary.jsx   # Übungsbibliothek mit Filter + Suche
│       ├── TrainingPlans.jsx     # Vorgefertigte + eigene Pläne
│       ├── WorkoutHistory.jsx    # Verlauf mit Details + Vergleich + Edit-Modal
│       ├── WeeklyPlanBuilder.jsx # 3-Schritte Wochenplan-Erstellung
│       ├── PeakPrograms.jsx     # Peak-Programme Übersicht + Detail + Anpassung
│       └── MyPlans.jsx          # Meine Pläne Übersicht + Freies Training
│       ├── FriendsList.jsx       # Freundesliste + Anfragen
│       ├── Leaderboard.jsx       # Wöchentliches Ranking
│       ├── ChallengesList.jsx    # Challenges verwalten
│       └── ExerciseNoteModal.jsx # Notizen + Settings + Foto pro Übung
│   └── nutrition/
│       ├── DailyOverview.jsx     # Tagesansicht mit Makro-Ringen + Mahlzeit-Slots
│       ├── AddFoodEntry.jsx      # Food-Eingabe-Flow (Suche, Scanner, Foto-KI, Manuell)
│       ├── MealPhotoCapture.jsx  # Kamera-UI für Mahlzeit-Foto + Öl-Auswahl
│       ├── MealAnalysisResult.jsx # KI-Ergebnis-Screen mit Makros + Confidence-Badges
│       ├── FoodSearch.jsx        # Suche lokal + Open Food Facts API
│       ├── PortionPicker.jsx     # Portionsgröße mit Live-Makro-Berechnung
│       ├── BarcodeScanner.jsx    # Kamera-basierter Barcode-Scanner
│       ├── MacroRing.jsx         # SVG-Kreisdiagramm für Makros
│       ├── TDEECalculator.jsx    # TDEE-Rechner (Mifflin-St Jeor)
│       ├── CustomMealsList.jsx   # Gespeicherte Mahlzeiten verwalten
│       ├── CustomMealBuilder.jsx # Mahlzeit aus mehreren Foods zusammenstellen
│       ├── Cookbook.jsx           # Kochbuch mit Filtern + Suche
│       └── RecipeDetail.jsx      # Einzelrezept mit Portionsrechner + Gegessen-Button
├── context/
│   ├── AuthContext.jsx           # Auth-State, Login/Logout, Profil, Gastmodus
│   ├── ThemeContext.jsx          # Dark/Light Mode (Dark = Standard)
│   ├── ActiveWorkoutContext.jsx  # Aktives Workout State + localStorage Persistence
│   └── CameraContext.jsx         # Kamera-Berechtigung Session-Cache
├── data/
│   ├── exercises.js              # 90+ Kraftübungen + Cardio/HIIT/Kampfsport
│   ├── workoutStorage.js         # Supabase CRUD für Workouts + Notes + Migration
│   ├── exercisePhotos.js         # IndexedDB CRUD für Übungs- + Produktfotos (lokal)
│   ├── mealPhotoAnalysis.js     # KI-Foto-Analyse: Gemini API Call, Öl-Anpassung, Konvertierung
│   ├── settingsStorage.js        # Supabase CRUD für User-Settings
│   ├── nutritionStorage.js       # Supabase CRUD für Nutrition (Entries, Meals, Goals)
│   ├── foodDatabase.js           # 150 lokale Lebensmittel + Open Food Facts API
│   ├── socialStorage.js          # Freunde, Challenges, XP, Leaderboard
│   ├── supplementStorage.js      # Supplements CRUD + Einnahme-Logs
│   ├── cycleStorage.js           # Zyklustracking: Settings, Logs, Phasenberechnung
│   ├── weightStorage.js          # Gewichtsverlauf CRUD
│   ├── dietsData.js              # 8 Diätformen × 7 Kapitel (DE+EN, mit Studien)
│   ├── dietStorage.js            # Active Diet CRUD + Ziel-Berechnung + Phasen-Tracking
│   ├── peakPrograms.js           # 21 vorgefertigte Peak-Programme (4 Kategorien)
│   └── recipesData.js            # 25 Rezepte mit Nährwerten (DE + EN)
├── lib/
│   └── supabase.js               # Supabase Client (URL + Anon Key aus .env)
├── i18n/
│   └── locales/
│       ├── de.json               # Deutsche Übersetzungen
│       └── en.json               # Englische Übersetzungen
├── context/
│   ├── AuthContext.jsx           # Auth-State, Login/Logout, Profil-Verwaltung
│   ├── ThemeContext.jsx          # Dark/Light Mode
│   └── ActiveWorkoutContext.jsx  # Aktives Workout State + localStorage Persistence
├── components/
│   └── OilLevelPicker.jsx       # Öl-Level-Auswahl (wenig/normal/viel) für Foto-KI
└── supabase/
    └── schema.sql                # Komplettes DB-Schema (Tabellen, RLS, Trigger)
api/
└── analyze-meal.js              # Vercel Serverless Function → Gemini Vision API Proxy
```

### Supabase-Tabellen
- **profiles** — Onboarding-Daten (gender, age, weight_kg, height_cm, goal, activity_level, experience, onboarding_completed)
- **user_settings** — Sprache, Dark Mode, Gewichtseinheit
- **workouts** — Workout-Verlauf (exercises als JSONB)
- **custom_plans** — Eigene Trainingspläne (days als JSONB)
- **custom_exercises** — Eigene Übungen
- **nutrition_entries** — Lebensmittel-Einträge pro Tag/Mahlzeit (date, meal_slot, food_name, serving_size, calories, protein, carbs, fat, source)
- **custom_meals** — Gespeicherte Mahlzeit-Vorlagen (name, items als JSONB, Gesamtmakros, Soft-Delete)
- **nutrition_goals** — Tägliche Kalorien-/Makro-/Wasser-Ziele pro User (1 Zeile, Upsert)
- **friend_codes** — Einzigartiger MyPeak-Code pro User (MP-NAME-XXXX)
- **friendships** — Freundschaftsverbindungen (sender_id, receiver_id, status: pending/accepted/declined)
- **challenges** — Herausforderungen (exercise_ids, criteria: volume/rounds, Zeitraum, Scores, winner_id)
- **user_xp** — Erfahrungspunkte, Level, Streak pro User
- **water_entries** — Flüssigkeitseinträge pro Tag (date, amount_ml)
- **community_products** — Von Usern hinzugefügte Barcode-Produkte (barcode, name, nutrition, confirmations)
- **product_overrides** — Persönliche Nährwert-Korrekturen pro User/Barcode
- **exercise_notes** — Notizen + Geräte-Einstellungen pro User/Übung (note, settings als JSONB)
- **supplements** — Supplement-Einträge (name, brand, form, dosage, schedule als JSONB, Soft-Delete)
- **supplement_logs** — Einnahme-Bestätigungen pro Supplement/Tag/Zeitslot (UNIQUE constraint)
- **active_diet** — Aktive Diätform pro User (diet_id, started_at, config als JSONB)
- **weekly_schedules** — Wochenpläne (name, sessions_per_week, days als JSONB, is_active)
- **cycle_settings** — Zyklustracking-Einstellungen (cycle_length, period_length, last_period_start)
- **cycle_logs** — Symptom-Tagebuch pro Tag (mood, energy, pain, sleep, bloating, headache, cravings)
- **weight_entries** — Gewichtsverlauf pro Tag (date, weight_kg, UNIQUE user+date)

---

## Feature-Übersicht

### 1. Training-Tracking

- **Übungsbibliothek:** Vorgefertigte Übungen mit Beschreibungen (anfängerfreundlich)
- **KI-Videos:** Idealerweise KI-generierte Videoanleitungen für jede Übung
- **Gewichte loggen:** Sätze, Wiederholungen, Gewicht (kg oder Pfund wählbar)
- **Progress-Anzeige:** Automatische Erkennung und Anzeige, wenn der User sich verbessert hat (z.B. "Neuer PR!" oder "+2,5 kg seit letztem Mal")
- **Vorgefertigte Trainingspläne:** Push/Pull/Beine, Oberkörper/Unterkörper, 5er-Split usw.
- **Eigene Übungen erstellen:** Für exotische Übungen, die nicht in der Bibliothek sind
- **Notizen & Bilder pro Übung:** Für Geräte-Einstellungen (z.B. "Neigung 5, Höhe 7 beim Kabelturm")
- **Bewertungssystem:** Effektivitäts-Rating für jede Übung, damit User wissen, wie gut eine Übung ist

### 2. Ernährung

- **Barcode-Scanner:** Mahlzeiten per Barcode scannen (Premium-Feature)
- **Eigene Meals erstellen:** Individuelle Mahlzeiten zusammenstellen und speichern
- **Kalorien & Makros tracken:** Tägliche Übersicht über Kalorien, Protein, Kohlenhydrate, Fett
- **Kalorienverbrauch berechnen:** TDEE-Rechner basierend auf Aktivitätslevel, Gewicht, Größe etc.
- **Personalisierter Ernährungsplan:** KI-generierter Plan, der zur Lebensweise des Users passt (Premium-Feature)
- **Kochbuch:** Eventuell eine Rezeptsammlung passend zu den Ernährungszielen

### 3. Wissensbibliothek

Mehrere Blöcke mit ausführlichen Erklärungen:

- **Training:** Trainingsprinzipien, Muskelgruppen, Techniken
- **Ernährung:** Grundlagen, Makros, Mikronährstoffe, Diätformen
- **Supplements & Peptide:** Erklärungen, Wirkungsweisen, Dosierungen
  - Produktempfehlungen mit Affiliate-Links (als "Werbung"/"Empfehlung" gekennzeichnet)
  - Affiliate-Netzwerk: z.B. Amazon PartnerNet oder Fitness-spezifische Netzwerke
- **Blutwerte:** Wichtigste Blutwerte erklärt (Testosteron, Vitamin D, Eisen, Cholesterin etc.)
  - Was sind Normalwerte?
  - Woran können schlechte Werte liegen?
  - Wie kann man die Werte verbessern?

### 4. Integrationen

- **Apple Health:** Schritte, Kalorienverbrauch importieren
- **Fitnesstracker:** Verbindung mit Fitness-Wearables
- **Barcode-Datenbank:** API für Lebensmittel-Barcodes (z.B. Open Food Facts — kostenlos)

---

## Bauplan — Phasen

### Phase 1: Fundament — FERTIG
- [x] Projektstruktur aufsetzen (React + Tailwind)
- [x] Navigation / App-Layout (Bottom-Navigation mit: Training, Ernährung, HOME-FAB, Bibliothek, Profil)
- [x] Mehrsprachigkeit (DE/EN) einrichten
- [x] Basis-Design festlegen (Farbschema, Typografie, Dark/Light Mode)

### Phase 1.5: Auth & Onboarding — FERTIG
- [x] Supabase-Anbindung (Auth + Datenbank)
- [x] Registrierung + Login (E-Mail/Passwort)
- [x] Passwort-Zurücksetzen
- [x] Onboarding-Flow (7 Schritte → Profil in Supabase speichern)
- [x] DB-Schema mit RLS-Policies und Auto-Trigger

### Phase 2: Training-Tracking (Kernfeature) — FERTIG
- [x] Übungsbibliothek mit Beschreibungen
- [x] Krafttraining: Sätze/Wiederholungen/Gewicht loggen mit Timer
- [x] Cardio/HIIT/Zirkeltraining/Kampfsport mit Timer-System
- [x] Workout starten: Plan wählen oder freies Workout mit eigener Übungsauswahl
- [x] Trainingshistorie mit aufklappbaren Details + Vergleichsfunktion
- [x] Progress-Erkennung und PR-Anzeige
- [x] Vorgefertigte Trainingspläne für alle Trainingsbereiche
- [x] Eigene Trainingspläne erstellen, speichern, löschen
- [x] Workout-Persistenz (ActiveWorkoutContext + localStorage)
- [x] Abgeschlossene Workouts nachträglich bearbeiten
- [x] Dezimale Wiederholungen (7.5 Reps)
- [ ] Eigene Übungen erstellen (UI vorhanden, Speicherlogik im Storage bereit)
- [ ] Notizen und Bilder pro Übung
- [ ] YouTube-Videos bei Übungen einbetten (Ausführung zeigen)
- [ ] Vergleichssystem Design überarbeiten

### Phase 3: Ernährungs-Tracking — FERTIG
- [x] Lebensmittel-Suche (150 lokale Foods + Open Food Facts API)
- [x] Mahlzeiten manuell eingeben
- [x] Eigene Meals erstellen und speichern
- [x] Tägliche Kalorien- und Makro-Übersicht (SVG-Ringe)
- [x] TDEE-/Kalorienverbrauch-Rechner (Mifflin-St Jeor)
- [x] Makro-Ziele manuell editierbar + kcal Auto-Berechnung aus Makros
- [x] Barcode-Scanner per Kamera (Quagga2 + Open Food Facts)
- [x] Custom Calendar für Datumsauswahl
- [x] Zuletzt verwendete Lebensmittel
- [x] Farbcodierte Makro-Badges (P/C/F Pills)
- [x] Wasser-Tracking mit Fortschrittsbalken + Quick-Add Buttons
- [x] KI-Mahlzeit-Foto-Erkennung (Gemini Vision, kostenlos)
- [ ] Foto von Nährwerttabelle per KI auslesen (Premium)
- [ ] Fehlende Barcode-Produkte an Open Food Facts übermitteln
- [ ] KI-Ernährungsplan (Premium)

### Phase 3.5: KI-Coach — OFFEN (nur Premium)
- [ ] KI-Coach mit gestuftem Modell-Einsatz (Haiku für einfache Fragen, besseres Modell für komplexe)
- [ ] Blutwerte-Einordnung mit Arzt-Hinweis
- [ ] Abo-Modell mit 7 Tagen kostenloser Testphase

### Phase 4: Wissensbibliothek — IN ARBEIT
- [x] Peptide-Bibliothek: 20 Peptide in 5 Kategorien (Heilung, GH, Fettabbau, Anti-Aging, Kognition)
- [x] Kurzfassung pro Peptid (Wirkung, Nebenwirkungen — keine Dosierungen)
- [x] Ausführliche E-Books: 20 Peptide × 7 Kapitel = 140 Sections (DE+EN, mit Studien, ohne Dosierungen)
- [ ] Block: Training-Wissen
- [ ] Block: Ernährungs-Wissen
- [ ] Block: Supplemente
- [ ] Block: Blutwerte (Erklärungen, Normalwerte, Verbesserungstipps)

### Phase 5: Integrationen & Polish — OFFEN
- [ ] Apple Health Anbindung
- [ ] Fitnesstracker-Anbindung

### Phase 6: App Store Ready — OFFEN
- [ ] PWA-Fähigkeit einbauen
- [ ] Performance-Optimierung
- [ ] Mit Capacitor oder React Native für iOS/Android verpacken
- [ ] App Store Submission vorbereiten

---

## Offene Verbesserungen & nächste Schritte

### Phase 2 Erweiterungen
- [ ] YouTube-Videos bei Übungen einbetten
- [ ] Individuelle Notizen pro Übung (z.B. Geräte-Einstellungen, persönliche Tipps)
- [ ] Vergleichssystem Design überarbeiten

### Backend/Infrastruktur
- [ ] Bestätigungs-E-Mail anpassen (eigenes Design) — erfordert Custom SMTP in Supabase

### Empfohlene nächste Schritte
1. **Phase 3 Erweiterungen:** Foto-KI für Nährwerttabellen, KI-Ernährungsplan
2. **Phase 3.5 starten:** KI-Coach (Premium-Feature mit gestuftem Modell-Einsatz)
3. **Abo-Modell:** Freemium mit 7 Tagen kostenloser Testphase
4. **Phase 4 starten:** Wissensbibliothek mit Inhalten füllen

---

## Premium vs. Kostenlos (Vorschlag)

**Kostenlos:**
- Training-Tracking (komplett)
- Basis-Ernährungs-Tracking (manuell eingeben)
- Übungsbibliothek mit Beschreibungen
- Vorgefertigte Trainingspläne
- Wissensbibliothek
- Progress-Tracking

**Premium (monatliches Abo, 7 Tage kostenlose Testphase):**
- KI-Coach (Haiku für einfache Fragen, besseres Modell für komplexe)
- Blutwerte-Einordnung (mit Arzt-Hinweis)
- Foto von Nährwerttabelle per KI auslesen
- KI-Ernährungsplan
- Detaillierte Analysen und Statistiken

---

## Design-Richtlinien

- **Oberstes Prinzip:** Nicht überfüllt, einfach zu bedienen trotz vieler Features
- **Logo:** Goldener Zigzag-Chart-Pfeil auf schwarzem Hintergrund mit "MyPeak FITNESS" Text. Zentriert oben in allen Tab-Headern (pt-12 für Notch) + Favicon + PWA-Icon. Komponente: `src/components/MyPeakLogo.jsx`
- **Farbpalette Dark Mode (Standard):** Hintergrund #0a0a0a / #1a1a1a (Karten), Akzentfarbe Gold #fbbf24, Texte Cremeweiß #fef3c7, sekundäre Texte gedämpftes Gold
- **Farbpalette Light Mode:** Hintergrund #ffffff / #f5f5f5, Akzentfarbe dunkleres Gold #b45309, Texte Schwarz/Dunkelgrau
- **Primary-Farben:** Gold-Palette (primary-400: #fbbf24, primary-500: #f59e0b, primary-600: #d97706)
- **Stil:** Modern, clean — Gold als Primärfarbe, abgerundete Karten, weiche Schatten
- **Navigation:** Bottom-Navigation mit 5 Tabs (Training, Ernährung, HOME-FAB, Bibliothek, Profil), Home-Button als goldener Kreis-FAB mit MyPeak-Pfeil
- **Responsiv:** Mobile-first, muss auf dem Handy perfekt funktionieren
- **Dark Mode:** Standard beim ersten Öffnen, umschaltbar im Profil

---

## Hinweise für Claude Code

- Immer Mobile-first entwickeln (die App wird primär am Handy genutzt)
- Saubere Komponentenstruktur — jedes Feature als eigene Komponente
- Von Anfang an Mehrsprachigkeit einbauen (i18n)
- Alle Texte auf Deutsch UND Englisch anlegen
- Daten in Supabase speichern, localStorage nur als Cache/Fallback
- Affiliate-Links müssen als Werbung gekennzeichnet sein
- Einheiten (kg/Pfund, kcal/kJ) müssen umschaltbar sein
- Übersetzungen: Korrekte Umlaute verwenden (ä, ö, ü), NICHT ae, oe, ue
- Supabase-Tabellen: workouts, custom_plans, custom_exercises, profiles, user_settings, nutrition_entries, custom_meals, nutrition_goals
- Umgebungsvariablen: VITE_SUPABASE_URL, VITE_SUPABASE_ANON_KEY (in .env)
