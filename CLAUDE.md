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

### Phase 1: Fundament — FERTIG
- [x] Projektstruktur aufgesetzt (React + Vite + Tailwind CSS)
- [x] Bottom-Navigation (Training, Ernährung, Bibliothek, Profil)
- [x] Mehrsprachigkeit (DE/EN) mit i18next eingerichtet
- [x] Basis-Design mit Farbschema, Typografie, Dark/Light Mode
- [x] Einheiten umschaltbar (kg/lbs) im Profil

### Phase 1.5: Auth & Onboarding — FERTIG
- [x] Supabase als Backend (Auth + Datenbank)
- [x] Registrierung und Login mit E-Mail/Passwort
- [x] Passwort-Zurücksetzen-Flow
- [x] Onboarding-Flow mit 7 Schritten (Geschlecht, Alter, Gewicht, Größe, Ziel, Aktivitätslevel, Trainingserfahrung)
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
- [x] Übungsbibliothek erweitert: 90 Kraftübungen (48 neue Brust+Rücken), hierarchische Navigation (Bereich→Filter)
- [x] Equipment-Filter (Langhantel/Kurzhantel/Kabelzug/Maschine/Körpergewicht) in der Bibliothek
- [x] Karate entfernt, Seilspringen bei Cardio hinzugefügt
- [x] Übungsnotizen + Geräte-Einstellungen pro Übung (Supabase exercise_notes)
- [x] Foto-Upload pro Übung (IndexedDB lokal, komprimiert)
- [x] Notiz-Vorschau als farbige Tags unter dem Übungsnamen im Workout

### Phase 3: Ernährungs-Tracking — FERTIG
- [x] Lebensmittel-Suche (150 lokale Lebensmittel + Open Food Facts API)
- [x] Mahlzeiten manuell eingeben (Name, Marke, Portion, Makros)
- [x] Eigene Meals erstellen, speichern, bearbeiten und löschen (Soft-Delete)
- [x] Tägliche Kalorien- und Makro-Übersicht mit SVG-Ringen (kcal, Protein, Carbs, Fat)
- [x] TDEE-Rechner (Mifflin-St Jeor Formel, vorbefüllt mit Profildaten)
- [x] Makro-Ziele manuell editierbar (nicht nur über TDEE)
- [x] Barcode-Scanner per Kamera (Quagga2 + Open Food Facts API + Community Products + CameraContext)
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

### PWA-Setup — FERTIG
- [x] manifest.json mit App-Name, Icons, standalone display
- [x] Service Worker (network-first strategy)
- [x] PWA-Icons (192px + 512px)
- [x] apple-touch-icon + apple-mobile-web-app-status-bar-style
- [x] App auf Homescreen installierbar
- [x] CameraContext: Kamera-Berechtigung einmal pro Session cached (kein erneuter Prompt beim 2. Scan)

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
- **Schrift:** Inter (Google Fonts)

### Dateistruktur (Kernkomponenten)
```
src/
├── pages/
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
│       └── WorkoutHistory.jsx    # Verlauf mit Details + Vergleich + Edit-Modal
│       ├── FriendsList.jsx       # Freundesliste + Anfragen
│       ├── Leaderboard.jsx       # Wöchentliches Ranking
│       ├── ChallengesList.jsx    # Challenges verwalten
│       └── ExerciseNoteModal.jsx # Notizen + Settings + Foto pro Übung
│   └── nutrition/
│       ├── DailyOverview.jsx     # Tagesansicht mit Makro-Ringen + Mahlzeit-Slots
│       ├── AddFoodEntry.jsx      # Food-Eingabe-Flow (Suche, Scanner, Manuell)
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
│   ├── exercisePhotos.js         # IndexedDB CRUD für Übungsfotos (lokal)
│   ├── settingsStorage.js        # Supabase CRUD für User-Settings
│   ├── nutritionStorage.js       # Supabase CRUD für Nutrition (Entries, Meals, Goals)
│   ├── foodDatabase.js           # 150 lokale Lebensmittel + Open Food Facts API
│   ├── socialStorage.js          # Freunde, Challenges, XP, Leaderboard
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
└── supabase/
    └── schema.sql                # Komplettes DB-Schema (Tabellen, RLS, Trigger)
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
- [x] Navigation / App-Layout (Bottom-Navigation mit: Training, Ernährung, Bibliothek, Profil)
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
- [x] Makro-Ziele manuell editierbar
- [x] Barcode-Scanner per Kamera (Quagga2 + Open Food Facts)
- [x] Custom Calendar für Datumsauswahl
- [x] Zuletzt verwendete Lebensmittel
- [x] Farbcodierte Makro-Badges (P/C/F Pills)
- [x] Wasser-Tracking mit Fortschrittsbalken + Quick-Add Buttons
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
- **Navigation:** Bottom-Navigation mit 4 Hauptbereichen (Training, Ernährung, Bibliothek, Profil), aktiver Tab in Gold
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
