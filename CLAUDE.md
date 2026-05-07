# CLAUDE.md — Fitness All-in-One App

## Projektübersicht

Eine Fitness- und Ernährungs-App, die Training-Tracking und Ernährungs-Tracking in einer einzigen, übersichtlichen App vereint. Die App soll trotz vieler Features einfach zu bedienen und nicht überfüllt sein.

**App-Name:** MyPeak
**Zielplattform:** Web-App → PWA → später App Store (iOS + Android)
**Sprachen:** Mehrsprachig (Deutsch + Englisch)
**Geschäftsmodell:** Kostenlos mit Premium-Features (Freemium)
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

### Phase 2: Training-Tracking — FERTIG
- [x] Übungsbibliothek mit 34 Übungen (Beschreibungen, Muskelgruppe, Equipment)
- [x] Workout starten: Auswahl zwischen Trainingsplan oder freiem Workout
- [x] Vorgefertigte Trainingspläne (Push/Pull/Legs, Upper/Lower, 5er-Split) mit voreingestellten Sätzen/Wdh
- [x] Eigene Trainingspläne erstellen, speichern und löschen
- [x] Sätze/Wiederholungen/Gewicht loggen mit Echtzeit-Timer
- [x] Workout beenden (speichert) vs. Workout verwerfen (löscht) — klar getrennte Aktionen
- [x] Leeres Workout nach Beenden optional als neuen Plan speichern
- [x] Während des Workouts jederzeit Übungen hinzufügen/entfernen
- [x] PR-Erkennung (Neuer persönlicher Rekord)
- [x] Workout-Verlauf mit aufklappbaren Details (alle Sätze pro Übung)
- [x] Workout-Vergleichsfunktion (2 Workouts nebeneinander, Fortschritt pro Übung mit +/- kg)
- [x] Muskelgruppen-Filter und Suchfunktion in der Übungsbibliothek

### Phase 3–6: Noch offen (siehe Bauplan unten)

---

## Technischer Stack

- **Framework:** React 18 + Vite
- **Styling:** Tailwind CSS (Mobile-first)
- **i18n:** react-i18next (DE + EN)
- **Backend:** Supabase (Auth + PostgreSQL-Datenbank)
- **Datenspeicherung:** Supabase (Cloud) + localStorage (Cache/Fallback)
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
│       └── WorkoutHistory.jsx    # Verlauf mit Details + Vergleichsfunktion
├── data/
│   ├── exercises.js              # 34 Übungen mit Muskelgruppe + Equipment
│   ├── workoutStorage.js         # Supabase CRUD für Workouts + Migration von localStorage
│   └── settingsStorage.js        # Supabase CRUD für User-Settings
├── lib/
│   └── supabase.js               # Supabase Client (URL + Anon Key aus .env)
├── i18n/
│   └── locales/
│       ├── de.json               # Deutsche Übersetzungen
│       └── en.json               # Englische Übersetzungen
├── context/
│   ├── AuthContext.jsx           # Auth-State, Login/Logout, Profil-Verwaltung
│   └── ThemeContext.jsx          # Dark/Light Mode
└── supabase/
    └── schema.sql                # Komplettes DB-Schema (Tabellen, RLS, Trigger)
```

### Supabase-Tabellen
- **profiles** — Onboarding-Daten (gender, age, weight_kg, height_cm, goal, activity_level, experience, onboarding_completed)
- **user_settings** — Sprache, Dark Mode, Gewichtseinheit
- **workouts** — Workout-Verlauf (exercises als JSONB)
- **custom_plans** — Eigene Trainingspläne (days als JSONB)
- **custom_exercises** — Eigene Übungen

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
- [x] Workout starten: Plan wählen oder freies Workout mit eigener Übungsauswahl
- [x] Trainingshistorie mit aufklappbaren Details + Vergleichsfunktion
- [x] Progress-Erkennung und PR-Anzeige
- [x] Vorgefertigte Trainingspläne mit voreingestellten Sätzen/Wdh
- [x] Eigene Trainingspläne erstellen, speichern, löschen
- [ ] Eigene Übungen erstellen (UI vorhanden, Speicherlogik im Storage bereit)
- [ ] Notizen und Bilder pro Übung
- [ ] Bewertungssystem für Übungen

### Phase 3: Ernährungs-Tracking — OFFEN
- [ ] Mahlzeiten manuell eingeben
- [ ] Eigene Meals erstellen und speichern
- [ ] Tägliche Kalorien- und Makro-Übersicht
- [ ] TDEE-/Kalorienverbrauch-Rechner
- [ ] Barcode-Scanner (Premium)
- [ ] KI-Ernährungsplan (Premium)
- [ ] Kochbuch / Rezeptsammlung

### Phase 4: Wissensbibliothek — OFFEN
- [ ] Block: Training-Wissen
- [ ] Block: Ernährungs-Wissen
- [ ] Block: Supplements & Peptide (mit Affiliate-Links)
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

## Bekannte Bugs & offene Verbesserungen

### UI/UX-Fixes
- [ ] "Leeres Workout" umbenennen in "Freies Workout" (überall in der App + Übersetzungen)
- [ ] Vorgefertigte Trainingspläne dürfen NICHT löschbar sein (nur eigene Pläne löschbar)
- [ ] Abgeschlossene Trainings im Verlauf löschbar machen (mit Bestätigungsdialog)
- [ ] Gewicht im Onboarding soll Dezimalzahlen erlauben (z.B. 75,5 kg)

### Neue Features (Phase 2 Erweiterungen)
- [ ] Cardio/HIIT/Zirkeltraining als Trainingsarten hinzufügen
- [ ] Bilder/Illustrationen bei Übungen in der Bibliothek hinzufügen
- [ ] YouTube-Videos bei Übungen einbetten (Ausführung zeigen)
- [ ] Individuelle Notizen pro Übung (z.B. Geräte-Einstellungen, persönliche Tipps)

### Backend/Infrastruktur
- [ ] Bestätigungs-E-Mail anpassen (eigenes Design) — erfordert Custom SMTP in Supabase

### Empfohlene nächste Schritte
1. **Bugs fixen:** UI/UX-Fixes aus der Liste oben
2. **Phase 2 erweitern:** Cardio, Bilder, Videos, Notizen
3. **Phase 3 starten:** Ernährungs-Tracking (Mahlzeiten eingeben, Makro-Übersicht mit Tageszielen)
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

**Premium (monatliches Abo):**
- Barcode-Scanner
- KI-Ernährungsplan
- KI-Übungsvideos
- Detaillierte Analysen und Statistiken
- Kochbuch / Rezeptsammlung

---

## Design-Richtlinien

- **Oberstes Prinzip:** Nicht überfüllt, einfach zu bedienen trotz vieler Features
- **Stil:** Modern, clean — Indigo als Primärfarbe, abgerundete Karten, weiche Schatten
- **Navigation:** Bottom-Navigation mit 4 Hauptbereichen (Training, Ernährung, Bibliothek, Profil)
- **Responsiv:** Mobile-first, muss auf dem Handy perfekt funktionieren
- **Dark Mode:** Vollständig unterstützt, umschaltbar im Profil

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
- Supabase-Tabellen: workouts, custom_plans, custom_exercises, profiles, user_settings
- Umgebungsvariablen: VITE_SUPABASE_URL, VITE_SUPABASE_ANON_KEY (in .env)
