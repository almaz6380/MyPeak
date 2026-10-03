# CLAUDE.md — Fitness All-in-One App

## Projektübersicht

Eine Fitness- und Ernährungs-App, die Training-Tracking und Ernährungs-Tracking in einer einzigen, übersichtlichen App vereint. Die App soll trotz vieler Features einfach zu bedienen und nicht überfüllt sein.

**App-Name:** FullRep (bis 30.07.2026: MyPeak — siehe „Umbenennung" unten)
**Live-URL:** https://fullrep.vercel.app (seit 29.08.2026; `my-peak.vercel.app`
leitet mit 307 dorthin weiter — bewusst behalten, solange irgendwo alte Links stehen)
**Git-Repository:** https://github.com/almaz6380/MyPeak (Repo-Name unverändert)
**Zielplattform:** Web-App → PWA → später App Store (iOS + Android)
**Sprachen:** Deutsch, Englisch, Spanisch — **vollständig**, Oberfläche wie
Inhaltsbibliotheken (siehe 4b und 4c)
**Geschäftsmodell:** Freemium mit 7 Tagen kostenloser Testphase
**Zielgruppe:** Fitnessstudio-Besucher (Geräte + freie Gewichte), Anfänger bis Fortgeschrittene

---

## Aktueller Stand

### Store-Seiten in sechs Sprachen + Screenshots mit Aussage (03.10.2026) — AUSGEROLLT als 1.5.3

**Ausgerollt am 03.10., je am Protokoll geprüft (PR #57 gemergt):**

| | Stand |
|---|---|
| Play-Texte | en-US, es-ES, fr-FR, pt-BR, ar **neu angelegt** und committet (de-DE unverändert) |
| Play-Screenshots | alle 6 Sprachen, je 6 gerahmte Bilder |
| Android | **vc22 (1.5.3) auf `production`, an alle** (`android-release` 37152484197) |
| iOS | Build 12 hochgeladen (`ios-release` 37152009966, **GitHub-Rechner**, weil der Mac offline war) → Version 1.5.3 angelegt → 7 Lokalisierungen (en-US, en-GB, es-ES, es-MX, fr-FR, pt-BR, ar-SA) mit Texten und `whatsNew` → 84 Screenshots → Build 12 `VALID`, zugewiesen → **eingereicht**, Einreichung `e34b1183-4118-4398-bf7c-dc96a02ee002`, `WAITING_FOR_REVIEW`. Beide Abos `APPROVED` |

**Vorstellungsgrafik je Sprache (03.10., Nachtrag):** Bis dahin zeigte Play auf
jeder Sprachseite die deutsche Grafik („Training & Ernährung in einer App"), weil Play
die Grafik der Standardsprache nimmt, wenn eine Sprache keine eigene hat.
`render-store-graphics.py` rendert sie jetzt sechssprachig nach
`store-assets/<lang>/android/feature-graphic.png` (de im alten Pfad). Arabisch ist
gespiegelt: Text rechts, Zeichen links. `play-listing.yml` nimmt sie im Modus
`grafiken` je `lang`.

**Nach der Freigabe prüfen:** iTunes-Lookup `?id=6788461300&country=us`,
`languageCodesISO2A` muss `EN` enthalten.

Anlass: Josef fragte, warum niemand die App herunterlädt. Die Länder waren nie das Problem
(iOS 175, Play 173 Regionen). Das Problem war die **Store-Seite**: Im App Store gab es
nur **de-DE**, bei Play war sicher nur de-DE live. Wer in den USA oder in Brasilien
sucht, fand FullRep nicht, weil Keywords je Locale indexiert werden. Wer die App doch
fand, sah eine deutsche Seite. Dazu kamen nackte App-Screenshots ohne Überschrift, im
Design vom Juli, mit leeren Zuständen („Supplements 0/0“, leere Heatmap) und
„mm/dd/yyyy“ auf der deutschen Startseite.

- **`store-assets/play-listing.en-US.json`** neu (Text aus `store-texte.md`).
  iOS-Felder für Englisch stehen in `store-texte.md` §2b.
- **`asc.py --lokalisieren [locales]`** (Workflow-Modus `lokalisieren`) legt die
  iOS-Store-Seite für en-US, en-GB, es-ES, es-MX, fr-FR, pt-BR und ar-SA an oder
  aktualisiert sie. Name und Untertitel hängen am appInfo, Beschreibung, Keywords und
  Werbetext an der Version. **Jede Beschreibung trägt einen Abo-Block mit EULA-Link in
  ihrer Sprache (3.1.2)**, ohne Eurobetrag, weil der außerhalb der Eurozone nicht stimmt.
  ⚠ Braucht eine **offene Version**, also für eine reine Metadaten-Änderung trotzdem
  eine neue Version samt Build.
- **Screenshots:** `store-screenshots.mjs` schreibt nur noch Rohbilder nach
  `store-assets/roh/<lang>/` (gitignored). **`store-rahmen.mjs`** baut daraus die
  Store-Bilder mit Überschrift: de in die alten Pfade, andere Sprachen nach
  `store-assets/<lang>/{ios,ios-ipad,android}`. `asc.py --screenshots` und
  `play-listing.yml` (mode `screenshots`, `lang`) nehmen den passenden Ordner.
  Auf dem iPad zeigt der Rahmen nur die App-Spalte (`max-w-lg`), weil das ganze Bild
  leer und winzig wirkte.
- **Demo-Daten waren in der Form falsch** und deshalb leer: Supplements brauchen
  `schedule: { mon: ['morning'], … }`, Workouts `exerciseId`/`nameKey`/`unit` (nicht
  `id`/`name`). Dazu kommt jetzt ein aktives PPL-Programm für die Heute-Karte.
- **„mm/dd/yyyy“ behoben:** Der Zeitraum im Gewichtsdiagramm nutzt den eigenen
  `CalendarModal` statt `<input type="date">`, dessen Platzhalter der Systemsprache
  folgt. Die Knöpfe „7T/14T/1J“ waren fest deutsch und sind jetzt `home.range*` ×6.
- `exercises.js`: `import.meta.env?.DEV`, sonst bricht jedes Node-Skript, das
  `getExerciseById` aufruft.

**Bewertungsanfrage früher (1.5.3, `src/lib/review.js`):** Bisher kam sie frühestens
nach dem 5. **Kraft**training, nie für Gäste und nie nach Cardio, HIIT oder Essen. Bei
einer Handvoll Nutzern erschien sie also praktisch nie. Jetzt:
- ab dem **2. Training jeder Art**
- ab **3 Tagen mit Essenseinträgen** (`maybeAskForReviewNachEssen`, liest nur
  localStorage)
- Gäste eingeschlossen
- 90-Tage-Sperre gemeinsam für beide Auslöser

Fragt die App, setzt `werbungPausieren()` (`ads.js`) die Interstitial-Mindestpause.
Nach dem Essen kommt deshalb **entweder** Bewertung **oder** Werbung. 12 Tests in
`tests/lib/review.test.js`.

**Play legt neue Sprachen jetzt an:** `play-upload.py --listing` sendet bei 404 auf die
Sprache PUT statt PATCH. Vorher brach es bei jeder Sprache außer de-DE ab.
**Reihenfolge: erst `texte`, dann `screenshots`**, sonst gibt es die Sprache noch nicht.

**`whatsNew` je Sprache:** Apple verlangt „Neu in dieser Version“ bei einem Update für
**jede** Lokalisierung. `--lokalisieren` setzt ihn aus `WHATS_NEW_SPRACHEN` mit.

**Zwei Fallen beim Ausrollen am 03.10., beide gemessen:**
- **Play kennt nur EINEN offenen Edit.** Ein neuer Edit verwirft den älteren
  („This Edit has been deleted“). Vier parallele Trockenläufe ließen deshalb den ersten
  scheitern. **`play-listing.yml` immer nacheinander starten**, auch bei Trockenläufen.
- **Apple legt die Versions-Lokalisierung selbst an**, sobald eine
  `appInfoLocalization` angelegt wird. `--lokalisieren` hatte die Liste vorher gelesen
  und bekam deshalb „already exists“. Das ist behoben: Die Liste wird jetzt nach dem
  Anlegen gelesen. Der Befehl bleibt idempotent, ein zweiter Lauf aktualisiert nur.

**Nebenbefunde, nicht behoben:**
- `getXP` gibt Gästen immer Streak 0 und Level 1 zurück. Wer im Gastmodus testet,
  sieht das Motivationssystem also nie.
- Die App ist auf dem iPad eine schmale Spalte.
- Die Überschrift „Social“ auf der TrainingPage ist nicht übersetzt.

### DSGVO-Nachzug: Art.-9-Einwilligung, ehrliche Datenschutzerklärung (17.09.2026)

Anlass war ein Datenfluss-Inventar über alle Repos. In FullRep waren drei
Dinge nicht in Ordnung, alle auf `claude/apps-question-yisd4b` behoben:

1. **Die Datenschutzerklärung widersprach dem Code.** Sie sagte „kein Tracking
   zu Werbezwecken, keine Werbe-Cookies" — während `ads.js` seit dem Launch
   echte AdMob-Interstitials mit UMP und ATT ausliefert. AdMob, RevenueCat,
   Sentry und **Anthropic** (KI-Coach!) kamen gar nicht vor; Google stand nur
   für die Fotoanalyse, nicht für den Coach, der laut eigenem Prompt Blutwerte
   einordnet. Alle sechs Sprachfassungen (DE/EN in `legalContent.js`,
   ES/FR/PT/AR in `uebersetzungen/`) neu geschrieben: Abschnitte 2, 3, 4, 6
   und die Verbraucherstreitbeilegung (ODR-Plattform seit 20.07.2025
   eingestellt, Link raus). Neu drin: die 14-Tage-Backups aus `api/backup.js`
   — „unverzüglich gelöscht" stimmte für bis zu 14 Tage nicht.
2. **Die Art.-9-Einwilligung existierte nicht.** Das Onboarding hatte EIN
   Häkchen „Ich akzeptiere AGB und Datenschutzerklärung"; die DSE behauptete,
   die Gesundheits-Einwilligung werde „im Onboarding erteilt". Eine gebündelte
   Vertragszustimmung ist keine ausdrückliche Einwilligung. Jetzt: zweites,
   getrenntes Häkchen (`ConsentToggle` in `OnboardingPage`), beide Pflicht,
   Zeitstempel in **`profiles.health_consent_at`** (Migration
   `20260917100000_health_consent.sql`). Der Onboarding-Satz „nicht an Dritte
   weitergegeben" war falsch und ist ersetzt.
3. **Bestandskonten holen die Einwilligung nach.** `HealthConsentGate`
   (App.jsx, vor `AppShell`) blockiert eingeloggte Konten mit
   `health_consent_at = NULL`, bis sie einwilligen — Gäste nie, deren Daten
   liegen nur auf dem Gerät. Wer nicht will, bekommt den Weg zur Löschung
   genannt. Das ist bewusst hart: Ohne Einwilligung dürfen wir die vorhandenen
   Gesundheitsdaten nicht weiterverarbeiten.

Neue i18n-Schlüssel ×6: `onboarding.healthConsentHeading/-Text/-Accept`,
`consentGate.title/deleteHint`; `privacyText1` umformuliert. `pruefe-sprachen`
grün, 317 Tests, Build grün, Lint ohne neue Meldungen.

**Ausgerollt am 17.09.2026:** Migration in der Cloud-Datenbank eingespielt
(Spalte `profiles.health_consent_at` nachgezählt), danach nach `main` gemergt.
Weg: **Supabase-Management-API** (`POST /v1/projects/jntzqlrakmsyzyqckwgn/
database/query`, Token `SUPABASE_ACCESS_ALMAZ` aus der Claude-Umgebung), erst
als `begin … rollback`, dann echt. ⚠ Damit ist die Notiz weiter unten
(„Der Management-API-Weg ist aus der Claude-Umgebung zu, 403 error 1010")
**überholt** — am 17.09. antwortete `api.supabase.com` mit 200. Nebenbefund:
Das Projekt liegt in **eu-north-1 (Stockholm)**; die Datenschutzerklärung nennt
keine Region, passt also.

Alle **9 bestehenden Konten** (inklusive `appreview@wellbooked.at`) haben
`health_consent_at = NULL` und sehen beim nächsten Öffnen das Gate — ein Häkchen,
ein Knopf. Für Apples Prüfkonto ist das bewusst NICHT vorab gesetzt: Eine
Einwilligung, die niemand erteilt hat, gehört nicht in die Tabelle.

**Offen bei Josef, nicht im Code lösbar:** (a) AVVs ablegen — Supabase, Vercel,
Google (Gemini UND AdMob), Anthropic, RevenueCat, Sentry; (b) **Gemini-API-Stufe
prüfen:** Bei der kostenlosen Stufe nutzt Google Eingaben zur
Produktverbesserung — für Blutwerte im Coach ist das nicht tragbar, es braucht
den bezahlten Pfad mit DPA oder Anthropic mit Zero-Data-Retention; (c) ob
`VITE_SENTRY_DSN` in Vercel gesetzt ist — die DSE sagt „sofern eingeschaltet";
(d) ~~Apple Privacy Labels und Play-Datensicherheit gegen die neue DSE abgleichen~~
✅ **27.09.2026 erledigt, beide von Josef von Hand** (per API nicht erreichbar):
- **Apple App-Datenschutz** veröffentlicht, samt „Sonstige Benutzerinhalte“ für die
  Coach-Nachrichten. Zuerst war dort versehentlich „Audio-Daten“ angehakt; das ist korrigiert.
- **Play-Datensicherheit** gespeichert:
  - Erhoben **und geteilt** werden ungefährer Standort, App-Interaktionen und
    Geräte-IDs (AdMob, Zweck Werbung).
  - Nur erhoben werden Kaufverlauf und „Andere von Nutzern erstellte Inhalte“
    (Coach: sitzungsspezifisch, optional, App-Funktionen). Gemini und Anthropic
    sind Dienstleister, das zählt bei Google nicht als Teilen.
  - Lösch-URL: `https://fullrep.vercel.app/legal/privacy`.

  ⚠ Die Play-Vorschau zeigt die Coach-Inhalte trotz Status „Abgeschlossen“ nicht an.
  Vermutlich blendet Google sitzungsspezifisch verarbeitete Daten aus. Richtig ist
  „sitzungsspezifisch = Ja“ trotzdem: Laut DSE liegt der Verlauf nur auf dem Gerät.

  Die Datenschutz-URL im Play-Eintrag (App-Inhalte → Datenschutzerklärung) zeigte
  bis zum 27.09. auf die Alt-Domain `my-peak.vercel.app`. Seitdem steht dort
  `https://fullrep.vercel.app/legal/privacy`, von Josef von Hand umgestellt.

### 1.5.2 (iOS Build 11 / Android vc21) — falsche Übungsclips raus (27.09.2026)

**Anlass:** Josef sah am 26.09. ein FullRep-Reel „Schulterdrücken sitzend (KH)" mit
STEHENDER Puppe. Die Animation hängt am Fotoordner (`tools/anim-import/`), und die
sitzende Übung teilt sich `Dumbbell_Shoulder_Press` mit dem stehenden Clip 0090. Alle
42 Clips wurden danach am Kontaktblatt geprüft; sieben passten in Ausführung oder Gerät
nicht und stehen jetzt in `ausnahmen` (`29418e9`). Neu: `import.mjs --nur-karte`
schreibt `exerciseAnimations.js` ohne Quellvideos neu. **Regel: Ausführung UND Gerät
müssen passen** — „bloßer Unterschied in der Last" gilt nicht mehr.

**Ausgeliefert am 27.09., alles auf Josefs Mac (`laeufer: mac`), per Protokoll gemessen:**

| | Stand |
|---|---|
| iOS | Build 11 hochgeladen (`ios-release` 36306077586) → Version 1.5.2 angelegt, What's New de-DE → Build 11 VALID, zugewiesen → **eingereicht**, Einreichung `2472b037-06db-4be1-a1f0-5ae1a33f63c4`, `WAITING_FOR_REVIEW`. Beide Abos `APPROVED` |
| Android | **vc21 (1.5.2) auf `production`, an alle** (`android-release` 36306630722), Edit committet |

Mit drin, weil seit 06.09. auf `main`: die ausdrückliche Einwilligung für
Gesundheitsdaten (`df638d6`) und der Kreatin-Abschnitt zum Gehirn. Punkt (d) oben ist
weiterhin offen.

### iOS-Werbung: ATT nativ + volle SKAdNetwork-Liste (06.09.2026, 1.5.1 / Build 10)

**Eingereicht 06.09., 15:56 UTC** — Einreichung `ee64a99b-…`, `WAITING_FOR_REVIEW`,
Build 10 `VALID` und zugewiesen, beide Abos `APPROVED` (fahren nicht mit). Ablauf komplett
über Workflows: `ios-release.yml` #13 (`nur_kompilieren`, grün) → #14 (Upload, 4:45 min) →
`asc.yml` `version-anlegen` → `build` → `einreichen`. Version 1.5.1, `WHATS_NEW` in `asc.py` auf den Werbe-Fix umgeschrieben
(der alte Text beschrieb 1.5.0). Android bleibt auf vc20: die Änderung ist rein iOS.

Anlass war Josefs Frage nach den eCPM-Unterschieden zwischen den vier Apps.
Befund am AdMob-Konto: Es gibt keine Anomalie, es gibt Apps ohne Nutzer
(Swaply iOS: 2 Impressionen in 7 Tagen) und eine App mit ein paar Nutzern,
deren Android-Spieler Rewarded-Videos schauen (Mahjong Android 21 € eCPM bei
30 Impressionen). **Unter 1.000 Impressionen den eCPM nicht deuten** — die
Zahl schwankt mit jedem einzelnen Klick um 30 %.

Zwei Dinge waren trotzdem strukturell falsch und sind seit Build 10 behoben:

1. **Der ATT-Dialog kam wahrscheinlich nie.** `ads.js` rief
   `AdMob.requestTrackingAuthorization()` 1,5 s nach dem Start über die
   Capacitor-Brücke. Das Plugin ruft `ATTrackingManager` auf Capacitors
   Hintergrund-Warteschlange auf, und die App war zu dem Zeitpunkt oft noch
   nicht `.active` — iOS antwortet dann still mit notDetermined. Apple hat
   exakt dieses Muster bei Anigosha am 12.08. beanstandet. Ohne ATT keine
   IDFA, also jede iOS-Anzeige nicht-personalisiert (halber eCPM).
   Jetzt: `frageNachTracking()` im `AppDelegate` bei `applicationDidBecomeActive`
   (Hauptthread, aktive App, Vorlage Anigosha `b534db5`); `ads.js` wartet nur
   noch bis 6 s auf die Antwort, bevor UMP und SDK-Start folgen.
2. **Nur eine SKAdNetwork-ID in der Info.plist** (Googles eigene). Bieter,
   deren ID fehlt, können auf der App nichts attribuieren und bieten nicht.
   Jetzt 59 Einträge: Googles aktuelle Liste (developers.google.com/admob/ios/
   ios14, 50 IDs) plus die neun älteren aus Swaply. **Bei jedem Plugin-Update
   gegen Googles Liste abgleichen** — sie wächst.

Erwartung ehrlich: Das hebt den iOS-Interstitial von ~3,7 € Richtung 6 bis
8 € eCPM. Bei 17 Impressionen pro Woche sind das Cents. Der Hebel ist die
Nutzerzahl, nicht der Preis.

Prüfbar am Gerät: Einstellungen → Datenschutz → Tracking muss
FullRep listen, sobald der Dialog einmal erschienen ist.

### ✅ Eigene Wochenpläne: Rest erledigt + Doppelarbeit zusammengeführt (01.09.2026)

Fortsetzung des Abschnitts vom 30.08. (weiter unten). Josefs Bruder war im
**Gastmodus** an denselben Stellen gescheitert; PR **#55** hat den Rest erledigt.

⚠️ **Die teuerste Lehre dieses Tages: zwei Sitzungen haben dieselben Bugs parallel
gefixt.** Ein Branch arbeitete an `WeeklyPlanBuilder`/`MyPlans`, während `main` genau
dasselbe anging — beide bauten unabhängig einen Übungs-Picker, ein
`updateWeeklySchedule` und ein Aktivieren-ohne-Duplikat, nur unter **verschiedenen
Namen**. Ergebnis: ein Merge-Konflikt über **acht Dateien**, der von Hand aufgelöst
werden musste. **Regel daraus: vor einem größeren Fix erst `git fetch` und nachsehen,
ob `main` das Thema schon anfasst** — ein Blick kostet Sekunden, die Doppelarbeit kostete
einen halben Tag.

**Namen sind jetzt eindeutig:** `activateWeeklySchedule` und `updateWeeklySchedule`
(aus `main`, die Tests in `tests/data/weeklySchedules.test.js` hängen daran).
Ein `setActiveSchedule` gibt es **nicht** — wer den Namen im Kopf hat, sucht falsch.

**Was PR #55 beisteuerte und in `main` gefehlt hat:**

1. **`getExerciseById` löst eigene Übungen auf** (`exercises.js`, localStorage-Lesung
   mit Raw-String-Cache, weil `useMuscleHeatmap`/`achievements` in Schleifen darüber
   laufen). `main` löste das nur im Aufrufer `handleStartPlan` — damit fielen eigene
   Übungen bei **jedem anderen** Aufrufer weiter stillschweigend raus.
2. **Absturz-Fix im `WorkoutStartChooser`** (`TrainingPage.jsx`): Er rendert alle
   eigenen Pläne mit `plan.days.map()`, aber HIIT/Cardio/Zirkel-Pläne speichern `days`
   als **Objekt** → `TypeError` → die **ErrorBoundary ersetzte die ganze App**.
   Erreichbar im Gastmodus: HIIT-Plan speichern, dann „Training starten → Kraft →
   Vom Plan". Jetzt lädt die Auswahl nur noch Kraftpläne (`getCustomPlansByType`)
   plus `Array.isArray`-Absicherung.
3. **`syncWeeklySchedules` in `resync.js`** — Gast-Wochenpläne wurden nie hochgeladen
   und waren nach der Registrierung + Abmeldung **endgültig weg** (`clearLocalUserData`).
   ⚠️ Reihenfolge beachten: Bringt ein lokaler Plan `is_active` mit, werden **zuerst**
   die Cloud-Pläne des Kontos deaktiviert — sonst stehen nach dem Merge zwei aktive
   Zeilen da und `getActiveSchedule` wird nichtdeterministisch.
4. **Sätze/Wdh. je Übung einstellbar** (Stepper, Standard 3×10) statt fest verdrahteter
   3×10, und **Split-Typ und Übungen am selben Tag kombinierbar** — vorher überschrieben
   sich die beiden gegenseitig.
5. **Ersetzen-Dialog** beim Speichern eines neuen Plans, wenn schon ein Programm aktiv
   ist („Ersetzen & aktivieren" / „Nur speichern", über `saveWeeklySchedule(…, { activate })`).
6. **i18n statt Ternaries:** neue Schlüssel `planBuilder.*` und `training.split_*`,
   gepflegt in **allen drei** Sprachen — auch `es.json`. Ohne den spanischen Teil hätten
   es-Nutzer über `fallbackLng: 'de'` **deutsche** Texte gesehen. Split-Labels liegen als
   `splitId` in der Datenbank und werden erst zur Renderzeit übersetzt; Alt-Pläne fallen
   auf das gespeicherte `label` zurück.
7. Kleinkram: `nsSeparator: false` (Übungsnamen mit Doppelpunkt), „Heute starten"-Knopf
   in „Meine Pläne", reine Split-Tage öffnen die Trainingsauswahl statt tot zu sein,
   Gast-Sicherheit `user?.id || 'guest'`.

**Bewusste Verhaltensänderung:** Ein **editierter** Plan aktiviert sich nicht mehr
selbst — das war vorher eine Nebenwirkung des delete+reinsert, kein gewolltes Verhalten.

**Geprüft:** 262 Tests grün, Build grün, zwei Playwright-Läufe im Gastmodus (32 Checks:
Plan anlegen mit Katalog- und eigener Übung, Start über die Heute-Karte, Editieren ohne
Duplikat) plus 6 Regressionschecks, dass `main`s Einzelpläne und die spanische Oberfläche
den Merge überstanden haben.

⚠️ **Die CI läuft wieder.** `.github/workflows/tests.yml` greift bei `push` **und**
`pull_request` und lief auf PR #55 grün durch — der Abschnitt „GitHub Actions führt keine
Jobs mehr aus" weiter unten ist damit **überholt** (Kontingent wieder frei).

### ⚠️ iOS 1.5.0: erst abgelehnt (3.1.2), dann neu eingereicht — 03.09.2026

Die Einreichung `7b72598f` vom 02.09. wurde **automatisch abgelehnt**, wenige
Minuten nach dem Absenden. Wortlaut aus dem Resolution Center:

> „The submission offers auto-renewable subscriptions but does not include a
> **functional link to the Terms of Use (EULA)** in the app metadata that
> appears on the app's App Store product page."

**Merksatz: Ein Abo ohne EULA-Link in der BESCHREIBUNG wird automatisch
abgelehnt** — nicht von einem Prüfer, sondern von einer Vorprüfung, die in
Minuten antwortet. Der Link in der App genügt nicht; er muss auf der
Produktseite stehen.

Kein Code- und kein Binary-Problem: **Build 9 blieb zugewiesen.**

⚠️ **Nebenbefund, der eigentliche Skandal:** Die Beschreibung in ASC stand noch
auf dem Stand vor der Umbenennung — „**MyPeak** vereint Training und Ernährung",
„Über 220 Übungen", Support- und Marketing-URL auf `my-peak.vercel.app`. Der
Play-Text wurde am 30.07. umgestellt, der iOS-Text **nie**. Zwei Kopien
desselben Textes, eine gepflegt, eine vergessen.

Neu deshalb **`--beschreibung`** (Workflow-Modus `beschreibung`): setzt
`description`, `supportUrl` und `marketingUrl` der offenen Version für de-DE.
Der Fließtext kommt aus **`store-assets/play-listing.de-DE.json`** — derselben
Datei, die `play-upload.py` für Google liest. **Eine Quelle, zwei Stores.**
Angehängt wird ein Abo-Block mit Preis, Laufzeit, Verlängerungsregel und den
Links auf `/legal/terms` und `/legal/privacy` (2941 von 4000 Zeichen).

⚠️ **Die abgelehnte Einreichung hält die Version besetzt.** `--einreichen` brach
mit `UNRESOLVED_ISSUES` ab; erst `--aufraeumen` (zieht sie zurück, `CANCELING`),
dann geht es wieder. Dasselbe Muster wie am 31.07. — es ist kein fehlendes Feld.

**Neu eingereicht:** `296b5960-9c41-433b-b698-6fd6f4dc4e76`,
`WAITING_FOR_REVIEW`, 03.09.2026, 08:14 UTC.

⚠️ **Noch offen:** Die englische Fassung gibt es in ASC nicht (nur `de-DE`), und
`play-listing.en-US.json` fehlt weiterhin. Die vier weiteren Sprachen haben
Store-Texte, aber keine ASC-Lokalisierung.

### ✅ iOS 1.5.0 eingereicht — 02.09.2026, 19:17 UTC

Einreichung **`7b72598f-5641-43dd-8960-104056318f3a`**, Zustand
`WAITING_FOR_REVIEW`, Build 9 zugewiesen, Auslieferung nach Freigabe
(`AFTER_APPROVAL`). Beide Abos stehen auf **APPROVED** und mussten deshalb
nicht mitgereicht werden — 2.1(b) kann sich hier nicht wiederholen.

⚠️ **Der Blocker war nicht das, wonach es aussah.** `--warum` brach mit
„Keine offene Version gefunden" ab: 1.0 stand auf `READY_FOR_SALE`, und für
1.5.0 gab es in ASC **gar keinen Versionseintrag**. Der hochgeladene Build
allein legt keine Version an. Alle schreibenden Befehle des Skripts holen
sich aber zuerst die offene Version — ohne sie ging weder Zuweisen noch
Einreichen.

Neu deshalb **`--version-anlegen`** (Workflow-Modus `version-anlegen`,
Eingabe `version_nr`): POST auf `appStoreVersions` mit
`releaseType AFTER_APPROVAL` plus „Neu in dieser Version" (`whatsNew`) für
de-DE. Läuft ins Leere, wenn schon eine offene Version existiert, statt eine
zweite anzulegen. **Merksatz: Ein Build in ASC ist noch keine Version.**

Die **Prüfnotiz ist auf 1.5.0 umgeschrieben**. Die alte sprach von der
Ablehnung vom 14.08. und davon, die Abos seien „jetzt Teil dieser
Einreichung" — beides falsch für diese Version, und der Prüfer hätte nach
etwas gesucht, das es nicht gibt. Die neue erklärt vor allem, warum
`NSHealthUpdateUsageDescription` im Binary steht, obwohl nichts nach Health
geschrieben wird.

Am Endpunkt gemessen, nicht gemeldet: Build 9 `VALID`,
`usesNonExemptEncryption: False`, Alterseinstufung gesetzt, nur
`promotionalText` leer (optional).

⚠️ **Android bleibt offen** — der Upload scheitert weiter am
Health-Formular, siehe unten. Das ist Josefs Schritt in der Play Console.

### Version 1.5.0 (iOS Build 9 / Android vc18) — sechs Sprachen + neues Design (02.09.2026)

Zwei Arbeitsstränge in einer Version: **fr/pt/ar als vierte bis sechste Sprache**
(Oberfläche, Inhaltsbibliotheken, KI-Endpunkte, Store-Texte) und das **neue
Design** aus Josefs Übergabe (ProgressRing, MacroColumn, dunkle „Heute"-Karte,
einheitliche Kartenhülle).

**Stand des Ausrollens (03.09., 13:30):**

| | App Store | Google Play |
|---|---|---|
| Build | 1.5.0 (9) hochgeladen **und der Version zugewiesen** (`asc.yml`, Modus `build`) | **vc20 (erster R8-Build)** — im internen Test UND in Produktion eingereicht (03.09. ~16:15). vc18/vc19 liegen noch im internen Test; vc18 traegt die neun Plugin-Berechtigungen — nicht befoerdern |
| Zustand | **FREIGEGEBEN** — Apple hat `296b5960` (1.5.0, Build 9) am 03.09. genehmigt. Die alte Einreichung `7b72598f` vom 02.09. steht auf „Entfernt": von uns per `--aufraeumen` zurueckgezogen, weil ihre 3.1.2-Ablehnung die Version blockierte — das ist gewollt und folgenlos | **Produktionsrelease vc20 (voller Rollout) in Googles Pruefung.** Gesundheitserklaerung ist DURCH: Formular zeigt genau READ_STEPS + READ_WEIGHT, beide begruendet (1/1, 1/1). vc19 wurde durch vc20 ersetzt, nicht abgebrochen — die Erklaerung blieb dabei erhalten |
| Offen | nichts — im Store | nichts von Josefs Seite. Nach Freigabe live fuer alle. **Geraetetest fuer R8 steht aus** (Anzeige, Kauf, Health, Widget, Benachrichtigung) — bei null Android-Nutzern bewusst parallel zur Pruefung statt davor |

Der Produktionsentwurf liess sich speichern, sobald die Erklaerung
**eingereicht** war, nicht erst nach ihrer Genehmigung — beide laufen als eine
Einreichung durch die Pruefung.

**Zwei Hinweise aus dem Play-Release-Dashboard, beide NICHT blockierend:**

- **Code-Verschleierung: R8 ist seit 03.09. EINGESCHALTET** (`minifyEnabled`
  + `shrinkResources` in `android/app/build.gradle`, Keep-Regeln mit
  Begruendung in `android/app/proguard-rules.pro`). Google verlangte >= 25 %,
  wir lagen bei 2 %, Frist Februar 2027. Capacitor liefert seine Keep-Regeln
  als consumerProguardFiles selbst mit; keines der sechs Plugins bringt
  eigene, keines braucht sie. Der Workflow legt `mapping.txt` als Artefakt ab
  (90 Tage) — ohne sie sind Stacktraces aus der Play Console unlesbar.
  ⚠ **Der NAECHSTE Android-Build (vc20) ist der erste mit R8. R8-Fehler
  zeigen sich nicht beim Bauen, sondern am Geraet.** Ihn zuerst in den
  internen Test und durchklicken: Anzeige laden, Kaufdialog oeffnen, Health
  verbinden, Widget aktualisieren, Benachrichtigung ausloesen. Erst dann
  Produktion. Kippt etwas, ist die erste Massnahme eine Keep-Regel fuer das
  betroffene Paket, nicht das Abschalten von R8.
- **Randlose Anzeige (Edge-to-Edge, Android 15+):** „veraltete APIs oder
  Parameter". Empfehlung, kein Fehler. Am Geraet pruefen, ob Inhalte unter der
  Statusleiste kleben; ggf. `WindowCompat.setDecorFitsSystemWindows` bzw. die
  Capacitor-Einstellung dazu.

**minSdk 26 ist entschieden (Josef, 03.09.): Android hat derzeit keine
Nutzer.** Die 1.048 Telefonmodelle ohne Update betreffen also niemanden,
Health bleibt auf Android drin, kein gestaffelter Rollout noetig. Die Frage
ist damit geschlossen — nicht bei jedem Release neu aufmachen.

⚠ **Die Ablehnung 3.1.2 hatte nichts mit diesem Sprach-/Design-Paket zu tun** —
sie betraf die Abo-Angaben in der Store-Beschreibung. Behoben am 03.09., siehe
den Abschnitt „iOS 1.5.0: erst abgelehnt (3.1.2), dann neu eingereicht".

⚠ **Zum Wiedereinreichen zwei Wege, und sie sind nicht gleichwertig.** In der
Oberflaeche heisst der Knopf **„Pruefung aktualisieren"** und sitzt oben rechts
auf der VERSIONSSEITE; auf der Uebermittlungsseite bleibt „Erneut zur
App-Pruefung uebermitteln" grau, solange das Element auf *Abgelehnt* steht.

Ueber die API ging es am 03.09. anders: `--einreichen` brach mit
`UNRESOLVED_ISSUES` ab, weil die abgelehnte Einreichung die Version besetzt
haelt. Erst `--aufraeumen` (zieht sie zurueck, `CANCELING`), dann `--einreichen`.
**Das Zurueckziehen war hier gefahrlos, weil beide Abos auf `APPROVED` stehen
und deshalb gar nicht mitfahren** — nachgemessen im Lauf, beide danach
unveraendert `APPROVED`. Anders sieht es aus, solange ein Abo noch
`READY_TO_SUBMIT` ist und mit der Version mitgeht: dann zieht ein Abbruch es
mit zurueck, und per API laesst es sich nicht wieder anhaengen.

Der Store-Text „Neues in dieser Version" ist fuer 1.5.0 **bereits gefuellt**
(sechs Sprachen, neue Startseite, Apple Health) — nicht erneut eintragen.

### ⚠ Health hat drei Hürden, und alle drei kommen erst beim Ausliefern

1.5.0 ist der **erste Store-Build mit der Health-Anbindung**: Der letzte
erfolgreiche Android-Lauf (vc17, 01.09.) liegt vor dem Commit, der
`capacitor-health` hinzugefügt hat, und iOS lief seither nur im Modus
`nur_kompilieren`. Alle drei Fehler mussten deshalb jetzt kommen — keiner
hängt am Sprach- oder Designpaket, und keiner ist im Web-Build sichtbar.

**1. Android, Manifest-Merger (nach 2 min Gradle).**
`androidx.health.connect:connect-client:1.2.0-alpha01` — fest gepinnt in
`capacitor-health` 8.2.0 — verlangt minSdk 26, das Projekt stand auf 24.
`android/variables.gradle` jetzt auf **26**. Der Preis: Android 7.0/7.1
(API 24/25) bekommen keine Updates mehr und bleiben auf vc17. Vertretbar,
weil Health Connect dort ohnehin nicht läuft (setzt API 28 voraus).
`tools:overrideLibrary` hätte den Bau durchgelassen und dafür auf genau
diesen Geräten einen Absturz zur Laufzeit eingebaut.

**2. iOS, Fehler 90683 (nach 4 min macOS, mit fertigem signiertem Archiv).**
`NSHealthUpdateUsageDescription` fehlte — obwohl FullRep **nichts** nach
Apple Health schreibt. Apple prüft nicht, was die App tut, sondern was das
Binary verlinkt; `capacitor-health` bindet die HealthKit-Schreib-API mit ein.
Apples Wortlaut: *„While your app might not use these APIs, a purpose string
is still required."* Ergänzt, mit einem Text der die Wahrheit sagt; der
Dialog erscheint nie, weil die Berechtigung nie angefordert wird.

**3. Google Play, 403 beim Upload — NUR VON HAND ZU LÖSEN.**
```
"code": 403,
"message": "You must let us know whether your app includes any health features.",
"status": "PERMISSION_DENIED"
```
Sobald eine App Health-Connect-Berechtigungen deklariert, verlangt Google die
**Health-Apps-Erklärung**: Play Console → *App-Inhalte* → *Gesundheits-Apps*.
Das ist eine rechtliche Erklärung über die eigene App — die API nimmt sie
nicht entgegen, sie lehnt den Upload stattdessen ab.

**Aufgelöst am 03.09. — es war ein Henne-Ei-Problem, und die API kann es
nicht knacken:**

Das Formular hat **zwei Gesichter**. Solange KEIN Bundle mit
Health-Berechtigungen in irgendeinem Track liegt, zeigt es nur zwei Schritte
(Kategorien → „Regionale Anforderungen", leer) und meldet sich danach als
„Abgeschlossen". Sobald ein Bundle im Track liegt, erscheint **Schritt 2
„Berechtigungen für Gesundheitsdaten"** — mit Begründungspflicht je
Berechtigung. Erst DER zählt für Google.

Die API kommt da nie hin: Sie lädt hoch, setzt den Track und scheitert am
Abschluss (403 „You must let us know whether your app includes any health
features"), und weil der Edit verworfen wird, liegt danach **kein** Bundle im
Track — also erscheint Schritt 2 nicht — also bleibt die Erklärung
unvollständig — also scheitert der nächste Lauf. Vier Läufe, 25 Minuten,
nichts bewegt. **Alle drei Abschluss-Aufrufe probiert:**

| Aufruf | Antwort |
|---|---|
| `:validate` | 403 — Health-Erklärung fehlt |
| `:commit` | 403 — Health-Erklärung fehlt |
| `:commit?changesNotSentForReview=true` | 400 — *„Changes are sent for review automatically. The query parameter must not be set."* |

Der letzte Punkt gilt dauerhaft: Für `at.gallab.mypeak` reicht Google jede
Änderung automatisch zur Prüfung ein, der Parameter ist verboten. Der
Notausgang „speichern ohne einzureichen" existiert für diese App nicht.

**Der Weg, der funktioniert hat (einmalig, danach läuft die Automatik):**

1. AAB aus dem Workflow-Artefakt holen (`FullRep-<version>-vc<n>`, die Datei
   darin heißt seit 03.09. gleich, 30 Tage haltbar)
2. In der Console von Hand in den **internen Test** laden — das geht OHNE
   Erklärung durch, nur Produktion und Offener Test sind gesperrt
3. Jetzt zeigt das Formular Schritt 2. Ausfüllen, Speichern → geht in Googles
   Prüfung (Stunden bis Tage, nicht Minuten)
4. Nach Genehmigung: Produktionsrelease speichern; ab dann nimmt auch die API
   wieder an

⚠ **Beim Handupload die richtige Datei erwischen.** Gradle nennt jedes
Bundle `app-release.aab`; ein altes aus den Downloads ergibt „Versionscode 1
wurde bereits verwendet" — die Meldung nennt die Nummer der FALSCHEN Datei,
nicht das Problem. Deshalb trägt die Datei im Artefakt jetzt die Version im
Namen.

⚠⚠ **`capacitor-health` schleust ELF Health-Berechtigungen ins Manifest**
(sein eigenes `AndroidManifest.xml` deklariert sie, der Merger nimmt sie
mit). Im Formular standen dadurch **10 begründungspflichtige Einträge statt
2**. Neun davon liest die App nie; sie zu begründen hieße, Anwendungsfälle zu
erfinden — Ablehnungsgrund. Unser Manifest wirft sie jetzt mit
`tools:node="remove"` wieder heraus; **vc18 hatte sie noch drin, vc19 nicht
mehr.** Wer eine davon braucht: Remove-Zeile löschen, oben deklarieren, in
`health.js` abfragen, im Formular begründen UND Datenschutztext ergänzen.

Begründungstexte, die eingereicht wurden (Schritte / Gewicht, beide nur
lesend, Opt-in im Profil, keine Weitergabe): siehe Sitzung 03.09.; Kern ist
„Anzeige der eigenen Werte in der App", Anwendungsfall Fitness und Wellness.

**Konsequenz für künftige Releases mit NEUER sensibler Berechtigung:** Den
ersten Build von Hand in den internen Test laden, Formular ausfüllen,
Genehmigung abwarten — dann erst die Automatik. Bei einem 403 dieser Art
nicht neu starten.

Was offen blieb: ob die **Datensicherheit**-Erklärung (gleicher Menüpunkt)
die Gesundheitsdaten zusätzlich führen muss. Der Produktionsentwurf
verlangte am 03.09. nur die Gesundheits-Erklärung; zeigt sich bei der
Veröffentlichung noch ein Fehler, ist das der nächste Kandidat.

**Merksatz: Eine neue Berechtigung ist nie nur Code.** Beide Stores wollen
zusätzlich eine Erklärung, und beide sagen das erst beim Hochladen — nach dem
vollständigen Bau. Wer eine sensible Schnittstelle einbaut, prüft die
Store-Formulare in derselben Sitzung, nicht beim nächsten Release.

**Der Fehlertyp, der die Sitzung geprägt hat: die Zweiwegweiche.**
`lang === 'de' ? deutsch : englisch` — aus jeder Sprache außer Deutsch wird
Englisch, aus jeder außer Englisch Deutsch. Vier Fundstellen, jede unsichtbar
im Build und unsichtbar in jedem Test, der nur de und en fährt:

| Wo | Was der Nutzer gesehen hätte |
|---|---|
| `api/coach.js` | Der spanische Coach-Prompt war seit 1.4.0 **toter Code** — `outLang = lang === 'en' ? 'en' : 'de'` machte aus 'es' ein 'de' |
| `CoachPage.jsx` | Handliste `['de','es']` — fr/pt/ar fielen auf Englisch |
| `KnowledgePage.jsx` | Titel und der „Alle"-Chip zweisprachig durchgereicht |
| `BarcodeScanner.jsx` | Open Food Facts liefert `product_name_fr`, gelesen wurde es nie |

Alle vier behoben — und wichtiger: **`pruefe-sprachen.mjs` findet sie jetzt
selbst.** Ein Muster erkennt `lang === '<code>'` und Zweierlisten; wer eine
Weiche wirklich braucht, schreibt `// sprachweiche-ok` darüber (Zeile oder bis
drei darüber) oder `// sprachweichen-ok: <Grund>` an den Dateikopf. Ohne Grund
kein Freibrief.

**Arabisch hat sechs Mehrzahlformen, nicht zwei.** `exerciseCount_one` +
`_other` sah vollständig aus, bestand jede Schlüsselzählung — und zeigte bei
drei Übungen den nackten Schlüssel, weil i18next `_few` sucht. Die Prüfung
löst Mehrzahl jetzt gegen i18next selbst auf (0, 1, 2, 3, 11, 100 × jede
Sprache), statt Suffixe zu zählen. Zusätzliche Formen gelten dabei nicht mehr
als „Schlüssel zu viel"; ar.json hat deshalb 1478 statt 1474 Schlüssel.

**Zwei Designentscheidungen an EINER Stelle statt an hunderten:**
`html.dark { --shadow-soft: none }` schaltet den Schatten für alle 132
Fundstellen ab und für jede künftige mit; `.karte` in `@layer components`
ersetzt eine sechsteilige Klassenkette, die an über 100 Stellen von Hand
abgetippt war (mit drei Radien und zwei Rändern, weil abgetippt).

**⚠ Der Merge, vor dem die Übergabe gewarnt hat, ist eingetreten.** `main`
hatte parallel die eigenen Wochenpläne repariert — dieselben vier Dateien im
Trainingsbereich, 18 Konflikte allein im `WeeklyPlanBuilder`. Aufgelöst mit
beiden Seiten: mains Funktionen, dieser Zweig die Sprachschlüssel und
logischen Abstände. Beim `WeeklyPlanBuilder` war es richtig, mains Fassung
KOMPLETT zu nehmen und die vier RTL-Klassen neu zu setzen, statt 18 Hunks
einzeln aufzulösen — main hatte die Datei ohnehin schon auf `t()` umgestellt,
mein Zweig hatte dort nur mechanische Ersetzungen.

**⚠ `a2a07ee` hat 41 Schlüssel nur nach de.json und en.json geschrieben**
(planBuilder.*, training.split_*). Josef zog es für es nach, fr/pt/ar blieben
offen — auf Französisch hätte im Planbauer `planBuilder.chooseDays` gestanden,
nicht einmal deutscher Text. Genau der Fehlertyp dieser Version, aus der
anderen Richtung. **Merksatz: Wer einen Schlüssel anlegt, legt ihn sechsmal an.**

### Version 1.4.0 (iOS Build 8 / Android vc17) — Widget, Health, Spanisch (01.09.2026)

Josefs Auftrag: „alle offenen punkte + Widget", autonom umgesetzt. Alles auf
`main`, Builds noch nicht in den Stores (Validierungsbuild lief zuerst).

**1. Homescreen-Widget (iOS + Android)** — zeigt Streak, Level, Workouts diese
Woche (ab Montag 00:00 lokal). Architektur:

- `src/lib/widgetDaten.js` schreibt `{streak, level, workoutsWoche, stand}` per
  `@capacitor/preferences` (`group: 'FullRepWidget'`, Key `widget.daten`);
  aufgerufen im HomePage-Effect und im finally-Block des Workout-Abschlusses.
- ⚠ **`group` heisst auf iOS und Android NICHT dasselbe** (beide Plugin-Quellen
  gelesen): Android = Name der SharedPreferences-DATEI (das Widget liest
  `getSharedPreferences("FullRepWidget")` direkt). iOS = nur ein Key-PRÄFIX in
  `UserDefaults.standard` — eine App-Group-Suite erreicht das Plugin NIE.
  Deshalb spiegelt `AppDelegate.widgetDatenSpiegeln()` den Wert bei
  `applicationWillResignActive` nach `UserDefaults(suiteName:
  "group.at.gallab.mypeak")` und stösst `WidgetCenter.reloadAllTimelines()` an.
  Ohne diesen Spiegel bliebe das iOS-Widget still leer — kein Fehler, nirgends.
- Android: `FullRepWidget.java` + Layout/Drawable/Info-XML, Receiver im
  Manifest, `MainActivity.onPause()` stösst die Aktualisierung an.
- iOS: WidgetKit-Extension `ios/App/FullRepWidget/` (SwiftUI, systemMedium),
  Target von Hand ins pbxproj operiert (mit npm-Paket `xcode` gegengeparst).
  ⚠ CFBundleVersion/ShortVersion der Extension MÜSSEN denen der App gleichen
  (sonst ITMS-90473) — beide kommen aus den Build-Settings, Versions-Bumps
  ändern im pbxproj daher **vier** Stellen (2 Targets × Debug/Release).
- **Josefs einmaliger Portal-Schritt (per API NICHT möglich, im Web belegt):**
  App Group `group.at.gallab.mypeak` im Developer-Portal anlegen und BEIDEN
  Bundle-IDs (`at.gallab.mypeak` + `at.gallab.mypeak.widget`) zuweisen. Ohne
  das scheitert der Release-Build an den Entitlements — gemessen am 01.09.
  (Lauf #9): „Provisioning profile … doesn't support the group.at.gallab.mypeak
  App Group", für App UND Widget. Der Profil-Abruf selbst lief durch (Widget-
  Bundle-ID angelegt, Capabilities gesetzt).
- **Der Code kompiliert nachweislich:** `ios-release.yml` hat seit 01.09. den
  Modus `nur_kompilieren` (baut mit `CODE_SIGNING_ALLOWED=NO`, überspringt
  Zertifikate/Profile/Export) — Lauf #10 grün, Widget-Extension inklusive.
  Damit ist die pbxproj-Handoperation validiert; nach Josefs Portal-Schritt
  fehlt nur noch der echte Lauf.

**2. Provisioning-Profile werden jetzt zur Bauzeit von der ASC-API geholt**
(`scripts/ios-profile.py`, Schritt im `ios-release.yml`): legt die
Widget-Bundle-ID an, schaltet Capabilities (HEALTHKIT, APP_GROUPS) ein und
erzeugt/erneuert beide Profile. Grund: Jede Capability-Änderung INVALIDIERT
bestehende Profile — ein statisches Profil-Secret wäre bei jedem solchen
Schritt tot gewesen. Das alte Profil-Secret wird nicht mehr gelesen.

**3. Apple Health / Health Connect — bewusst NUR LESEND** (`src/lib/health.js`,
Schalter im Profil, Schritte auf der HomePage, Gewichts-Import mit
Vorrang eigener Einträge). `capacitor-health` 8.2.0 hat schlicht **keine
Schreib-API** (definitions.d.ts geprüft: nur query*; die WRITE_WORKOUTS-
Permission ist ein Überbleibsel). Workout-Export wäre ein Pluginwechsel — V2.
Datenschutzerklärung DE+EN um Health-Absatz ergänzt.

**4. Spanisch (es) als dritte Sprache** — `es.json` vollständig inkl. aller
488 Übungsnamen (vier parallele Subagents, Schlüsselgleichheit mit de.json
skriptgeprüft), eigener spanischer Coach-System-Prompt in `api/coach.js`,
Sprachwechsler de→en→es. **Auch `analyze-meal` spricht Spanisch**
(`name_es`/`meal_description_es` zusätzlich zu de/en; die Client-Weichen fallen
auf Englisch zurück, wenn ein Feld fehlt, damit alte App-Versionen unberührt
bleiben).

⚠ **Der spanische Coach-Prompt war toter Code — behoben am 01.09.2026, siehe 4f.**
Er stand im Repo, aber kein Aufruf hat ihn je erreicht.

**4b. Die fest verdrahteten de/en-Weichen sind raus (01.09.2026).** Nach dem
ersten Durchgang war `es.json` zwar vollständig, die Oberfläche aber trotzdem
zur Hälfte englisch: **306 Ternaries der Form `lang === 'de' ? 'Heute' : 'Today'`
in 31 Dateien** standen direkt im JSX und kannten nur zwei Sprachen. Sie sind
jetzt 244 `ui.*`-Schlüssel in allen drei Sprachdateien.

| Was | Vorher | Jetzt |
|---|---|---|
| Oberflächentexte | 306 Ternaries im JSX | `t('ui.…')`, 1412 Schlüssel je Sprache |
| Datumsformat | `lang === 'de' ? 'de-DE' : 'en-US'` an 5 Stellen | `datumsLocale()` in `src/lib/datumsformat.js` |
| Wochentage/Monate | 6 Handlisten de/en | aus `Intl`, alle Sprachen |
| Beschriftungstabellen | `{ de, en }` in 9 Komponenten | `{ de, en, es }` + `beschriftung()` |
| Sprachweiche | `i18n.language?.startsWith('de') ? 'de' : 'en'` (15×) | `appSprache()` in `src/lib/sprache.js` |

**Die Fallen, die dabei zugeschnappt sind:**

- **`startsWith('de') ? 'de' : 'en'` ist eine Zweiwegweiche.** Sie sieht harmlos
  aus und macht Spanisch stillschweigend zu Englisch. Genau derselbe Fehler wie
  bei Anigosha, dort mit `appSprache()` behoben — hier jetzt auch. **Jede neue
  Sprache braucht ab sofort nur noch eine Zeile in `src/lib/sprache.js`.**
- **Ein fehlender Schlüssel fällt beim Bauen NICHT auf.** i18next liefert dann
  den Fallback (Deutsch) oder den nackten Schlüssel; der Build bleibt grün.
  Deshalb `node scripts/pruefe-sprachen.mjs` — es vergleicht die drei
  Schlüsselmengen, prüft die Platzhalter je Text und findet Schlüssel, die im
  Code stehen, aber in keiner Sprachdatei. Genau so ist
  `ui.youCurrentlyHaveActiveschedulename` aufgefallen, der beim Umbau von Hand
  ersetzt und dabei vergessen worden war. Mit `--browser` fährt es die App
  zusätzlich in allen drei Sprachen an und sucht nach rohen Schlüsseln.
- **Nicht jeder de/en-Ternary ist Text.** `lang === 'de' ? 'nameDE' : 'nameEN'`
  wählt ein *Datenfeld*, `? 'de' : 'en'` einen *Sprachcode*. Wer die mit
  umschreibt, bricht die Inhaltsbibliotheken; der Umbau hat sie ausdrücklich
  ausgenommen. Die Datenfeld-Weichen sind inzwischen einzeln durch die Leser aus
  `uebersetzungen.js` ersetzt (siehe 4c) — von Hand, nicht per Skript.
- **`describeSegments()` und `formatDisplayDate()` sind keine Komponenten** —
  dort geht kein `useTranslation`. Sie übersetzen jetzt über die importierte
  i18n-Instanz (`i18nInstanz.t(…)`).
- **Der `lang`-Parameter von `describeSegments` ist weggefallen.** Er kannte nur
  de/en; wer ihn noch übergibt, dem schadet es nicht — er wird ignoriert.
- **Nachgeprüft im echten Browser:** Gastmodus, alle vier Reiter, Spanisch —
  keine rohen Schlüssel, keine deutschen Reste, keine Seitenfehler.

**4d. Rechtstexte in allen sechs Sprachen (01.09.2026).** Auf Josefs
ausdrückliche Anweisung — ich hatte davon abgeraten, er hat entschieden.

Impressum, Datenschutz, AGB und Gesundheitshinweis liegen jetzt auch auf ES,
FR, PT und AR (`src/pages/legal/uebersetzungen/`). Drei Dinge daran sind
Absicht und dürfen nicht „aufgeräumt" werden:

- **Jedes übersetzte Dokument beginnt mit „Vorrang der deutschen Fassung".**
  Das ist der Grund, warum man Rechtstexte überhaupt übersetzen darf: Man
  übersetzt, damit der Nutzer versteht — nicht, damit eine zweite Fassung mit
  eigener Geltung entsteht. Ohne diesen Absatz stünden vier weitere
  rechtsverbindliche Texte im Raum, die niemand geprüft hat.
- **Name, Anschrift und die österreichischen Fundstellen (§ 5 ECG, GISA,
  GewO, § 6 UStG) bleiben deutsch.** Eigennamen und Gesetzeszitate übersetzt
  man nicht; „Bezirkshauptmannschaft Kitzbühel" auf Arabisch fände niemand
  wieder.
- **Nachgeladen, nicht fest eingebunden.** `LegalPage` ist NICHT lazy (die
  Routen liegen vor dem Anmelde-Gate, Apple und Google rufen die
  Datenschutz-URL ohne Konto auf). Fest importiert lägen ~35 kB Rechtstext in
  jedem App-Start. Solange das Paket lädt — und wenn es scheitert — zeigt die
  Seite Deutsch bzw. Englisch. **Eine Rechtsseite darf nie leer sein**, und ein
  Spinner, der nie verschwindet, ist schlimmer als ein Text in der falschen
  Sprache.

Die Notrufnummern sind je Sprache angepasst (PT nennt 192 für Brasilien, AR
nennt 997/998 neben der 112) — eine falsche Notrufnummer ist der einzige
Fehler in diesen Texten, der jemanden unmittelbar gefährden kann.

⚠ **Das ersetzt keine anwaltliche Prüfung.** Die deutschen Originale sind laut
Notiz vom Launch selbst Entwürfe. Was hier steht, ist eine sorgfältige
Übersetzung von Entwürfen — nicht mehr.

**4c. Die Inhaltsbibliotheken sind übersetzt (01.09.2026).** Josef hat den
früheren Vorbehalt („kein Vergessen, sondern eine Entscheidung") ausdrücklich
überstimmt: *„peptide etc (alles!!!!) auf spanisch übersetzen"*. Die rund
480.000 Zeichen sind damit erledigt — **222 Einträge, 0 offen**
(`node scripts/pruefe-inhalte.mjs`).

| Bereich | Einträge | Paket |
|---|---|---|
| Peptide | 20 | `src/data/es/peptide.js` |
| Diäten | 8 + 4 Kategorien | `es/diaeten.js` |
| Training / Ernährung / Supplements / Blutwerte | je 6 + Kategorien | `es/training.js` u. a. |
| Rezepte | 25 | `es/rezepte.js` |
| Peak-Programme | 21 + 21 Studienbefunde | `es/programme.js` |
| Lebensmittel | 124 + 17 Kategorien | `es/lebensmittel.js` |
| Tagesbeschriftungen | 53 | `src/data/tagesbeschriftung.js` (DE/EN/ES) |

**Warum eigene Sprachpakete statt `nameES` neben `nameDE`?** Drei Gründe, alle
drei stehen auch im Kopf von `src/data/uebersetzungen.js`:

1. **Bundle.** `PeptidesPage` ist schon 489 kB. Spanisch direkt in
   `peptidesData.js` hätte den Brocken für ALLE verdoppelt, auch für die
   deutschen Nutzer. Als dynamischer Import ist es ein eigener Chunk
   (`peptide-*.js`, 248 kB) und wird nur bei eingestelltem Spanisch geladen.
2. **Risiko.** Die Datendateien bleiben unangetastet; ein Fehler im Sprachpaket
   kann DE/EN nicht kaputt machen.
3. **Nächste Sprache.** Ein Ordner mehr unter `es/`, ein Eintrag mehr in
   `PAKETE`. Sonst nichts.

Fehlt ein Eintrag oder ein Feld, fällt es sauber auf DE/EN zurück — eine halb
fertige Übersetzung zeigt gemischt, nie leer. Genau deshalb braucht es
`pruefe-inhalte.mjs`: Es zählt nach, was der Build nie meldet.

**Die Fallen, die dabei zugeschnappt sind:**

- **`sections` werden über den INDEX zugeordnet.** Wer beim Übersetzen einen
  Abschnitt zusammenzieht oder umsortiert, vertauscht Überschrift und Inhalt.
  `melanotan2` hat deshalb eine ungewöhnliche Reihenfolge behalten
  (Nebenwirkungen VOR Anwendungsgebieten) — sie ist im Original so.
- **`quick` hat je Bereich eine andere Form**: Array aus `{label, text}` bei den
  Wissensseiten, Objekt `{wirkung, nebenwirkungen}` bei Peptiden, `{methode,
  fuer_wen}` bei Diäten. Die deutschen Schlüsselnamen bleiben — sie sind
  Feldnamen, kein Text. Das Prüfskript vergleicht die Form.
- **Die Kategorie-Chips der Peptid-Seite zeigten die rohen Ids** („healing",
  „gh"): `categoryNames` war eine reine de/en-Tabelle, und zwei der drei
  Lesestellen hatten nicht einmal einen Rückfall. **`pruefe-sprachen.mjs` sucht
  seither Beschriftungstabellen im Code, denen `es` fehlt** (aktuell 124
  geprüft).
- **Die `label`-Felder der Trainingstage gibt es nur EINMAL, auf Deutsch.**
  Englische Nutzer sahen „Oberkörper", „Rücken" und „Schwachstellen" mitten in
  einer englischen Oberfläche — seit Jahren. Sie stehen jetzt dreisprachig in
  `src/data/tagesbeschriftung.js`, mit dem deutschen Text als Schlüssel.
- **Die Suche muss gegen den ÜBERSETZTEN Namen laufen**, sonst findet ein
  spanischer Nutzer „Pechuga de pollo" nur unter „Hähnchenbrust". Betrifft
  Kochbuch und Lebensmittelsuche.
- **`foodDatabase.js` darf React nicht importieren.** Der erste Anlauf holte
  sich `lebensmittelName()` aus `uebersetzungen.js` — damit hing React an einer
  Datendatei, und die Prüfskripte konnten sie nicht mehr per node laden. Der
  Zugriff steht dort jetzt ausgeschrieben.
- **`import.meta.env.DEV` gibt es außerhalb von Vite nicht.** In
  `peakPrograms.js` steht deshalb `import.meta.env?.DEV`; ohne den
  Fragezeichen-Punkt bricht schon der Import ab, sobald ein Skript die Datei
  direkt lädt.
- **Mengenskalierung, nebenbei gefunden und behoben:** Bei „1/2 TL
  Knoblauchpulver" griff der alte Ausdruck auf die 2 hinter dem Schrägstrich —
  Verdoppeln machte daraus „1/4 TL", also die Hälfte statt des Doppelten. Galt
  auch für Deutsch und Englisch. Liegt jetzt als `src/lib/mengenSkalierung.js`
  mit acht Tests da; die Einheitenliste kennt zusätzlich cda/cdta (spanisch).

Der Arzt-Hinweis (`MedicalDisclaimer`) war schon vorher dreisprachig und bleibt
es. Die gesundheitsnahen Texte (Peptide, Blutwerte, Diäten) sind mit derselben
Vorsicht übersetzt wie sie geschrieben wurden — Dosierungen stehen nirgends,
der Verweis auf ärztlichen Rat überall.

**4e. Dasselbe für FR, PT und AR — sechs Sprachen komplett (01.09.2026).**
Nach demselben Muster wie Spanisch, mit denselben Prüfungen: `pruefe-inhalte.mjs`
meldet **je Sprache 222 Einträge, 0 offen — zusammen 888**.

Neue Ordner `src/data/fr/`, `src/data/pt/`, `src/data/ar/`, je acht Dateien,
je ein Eintrag mehr in `PAKETE`. Sonst nichts — genau der Aufwand, den Punkt 3
oben versprochen hat.

**Portugiesisch ist pt-BR** unter dem Code `pt`, dieselbe Begründung wie bei
Anigosha: Brasilien ist der weitaus größte Markt, Portugal versteht pt-BR, ein
zweiter Code wäre doppelte Pflege.

**Zwei Lücken, die dieser Durchgang aufgedeckt hat — beide älter als er:**

- **`MedicalDisclaimer` kannte nur de/en/es.** Der von Google Play verlangte
  Arzt-Hinweis erschien französischen, portugiesischen und arabischen Nutzern
  auf ENGLISCH. Steht jetzt in beiden Tabellen (`medical`, `general`)
  sechssprachig.
- **`cycleStorage.getPhaseRecommendations` kannte nur de/en** und las obendrein
  den ROHEN Sprachcode. `HomePage` reicht `i18n.language` ungefiltert durch —
  ein Nutzer mit `pt-BR` lief also ins Leere. Jetzt sechssprachig und über
  `beschriftung()`, das den Code normalisiert und sauber auf Englisch
  zurückfällt.

**Warum beide unsichtbar waren, ist die eigentliche Lehre:** `pruefe-sprachen.mjs`
suchte `de:` und `en:` in DERSELBEN Zeile (`[^\n]*` hört am Zeilenende auf).
Jede umgebrochene Beschriftungstabelle — und das sind die langen, also gerade
die mit ganzen Sätzen — war für die Prüfung unsichtbar. Der Scanner arbeitet
jetzt zeilenweise über Blöcke und findet **134 statt 122** Tabellen. Die Blöcke
enden bewusst an der ersten Zeile, die mit `}` oder `]` beginnt, und nicht an
der nächsten Klammer irgendwo im Text: Platzhalter wie `{{name}}` bringen
eigene Klammern mit und hätten den Block zu früh abgeschnitten.

**Merksatz:** Ein Prüfskript, das nichts meldet, ist erst dann eine gute
Nachricht, wenn man weiß, wonach es sucht. Hier hat es lange nichts gemeldet,
weil es die Hälfte gar nicht angesehen hat.

**Nachgeprüft im echten Browser** (Gastmodus, ohne Supabase): Peptid-Liste und
ein vollständiger Eintrag in FR, PT und AR — keine Seitenfehler, keine rohen
Schlüssel, `dir="rtl"` nur bei Arabisch, und die farbigen Wirkungs-Kästen dort
korrekt gespiegelt. Der Build wirft weiterhin **vier getrennte
`peptide-*.js`-Chunks** aus (240–316 kB): Ein französischer Nutzer lädt das
arabische Paket nicht.

**4f. Die beiden KI-Endpunkte sprechen alle sechs Sprachen (01.09.2026) — und
der spanische Coach-Prompt war seit 1.4.0 tot.**

Beim Ergänzen von fr/pt/ar ist aufgefallen, dass der spanische System-Prompt in
`api/coach.js` **nie erreicht wurde**. Die Kette:

```
CoachPage:  lang = ['de','es'].find(…) || 'en'      → 'es' geht raus
coach.js:   outLang = lang === 'en' ? 'en' : 'de'   → 'es' wird zu 'de'
            systemPrompt('de', …)                    → if (lang === 'es') feuert nie
```

Ein spanischer Nutzer hat also **deutsche Coach-Antworten** bekommen, während im
Repo ein fertiger spanischer Prompt lag. Der Fehler ist eine Zeile
(`? 'en' : 'de'`), aber er ist ein Muster: „alles außer X wird Deutsch" hält
genau eine Sprache aus.

**Was jetzt anders ist:**

- `api/_sprache.js` — eine `apiSprache()` für beide Endpunkte, Rückfall
  **Englisch** wie im Client, Regionalcodes (`pt-BR`) inklusive.
- `coach.js`: die Prompts liegen als **Tabelle** `PROMPTS[lang]`, ein Eintrag je
  Sprache. Keine Ternary-Kette mehr, in der ein Zweig unerreichbar sein kann.
- `analyze-meal.js`: der Prompt wird aus `MAHLZEIT[lang]` **gebaut**, das
  JSON-Gerüst berechnet. Vorher stand es dreimal abgetippt im Code — und in der
  englischen Fassung war `"meal_description_de": "Short description in German"`
  stehengeblieben, eine Feldbeschreibung statt eines Beispiels.
- Die Sprachen werden im Prompt als `de (Deutsch), en (English), fr (français)`
  genannt. Der **Code** stellt den Bezug zum Feld `name_de` her; ohne ihn muss
  das Modell raten, welcher Name in welches Feld gehört.
- `itemName()` und die Beschreibungswahl in `MealAnalysisResult` gehen über
  `appSprache()` statt über Handlisten.

⚠ **Bewusste Verhaltensänderung:** Ohne `lang` antwortet der Coach jetzt
**englisch**, nicht mehr deutsch. In der Praxis schickt jede App-Version eine
Sprache mit; der alte deutsche Catch-all war genau die Falle, die den es-Prompt
begraben hat. Der Test dazu ist umgeschrieben, nicht gelöscht.

**Was NICHT übersetzt wurde, mit Absicht:** die Coach-Wissensbasis
(`_coachKnowledge.js`, 39 Einträge) bleibt DE/EN. Sie besteht aus
Studienzusammenfassungen **mit Quellenangaben**, und eine maschinell übersetzte
Quelle ist schlechter als eine englische. Der Prompt sagt dem Modell deshalb
ausdrücklich, dass die Wissensbasis englisch sein darf und trotzdem in der
Nutzersprache zu antworten ist — ohne diesen Satz antwortet es gern in der
Sprache der Quelle.

**Zwei neue Prüfungen** (`tests/api/sprache.test.js`,
`tests/data/mahlzeitFoto.test.js`, zusammen +46 Tests):

- Die Sprachliste in `api/` und die in `src/lib/sprache.js` werden gegeneinander
  gehalten — sie sind bewusst doppelt (keine `api/`-Datei darf aus `src/`
  importieren, sonst hängt die Serverless-Funktion am React-Bündel), und der
  Test ist der Preis dafür.
- Beide Prompt-Tabellen werden **im Quelltext** darauf geprüft, dass jede
  Sprache aus der Liste vorkommt. Das ist die eigentliche Lehre aus dem toten
  es-Prompt: Er stand da, sah richtig aus, und niemand hat gemerkt, dass ihn
  kein Aufruf erreicht.

Der Test hat beim ersten Lauf gleich etwas gefangen: `mahlzeitPrompt('kl-KL')`
baute ein Feld `name_kl-KL` ins JSON, weil die Funktion sich auf den Aufrufer
verlassen hat. Sie normalisiert jetzt selbst.

**4g. Store-Texte in ES, FR, PT und AR (01.09.2026).**

Je Sprache eine `store-assets/play-listing.<locale>.json` (`es-ES`, `fr-FR`,
`pt-BR`, `ar`) — dieselbe Fassung für beide Stores. Die iOS-Felder (Name,
Untertitel, Keywords, Werbetext) stehen in `store-texte.md`, Abschnitt 2b.

**Die langen Beschreibungen stehen bewusst NUR im JSON**, nicht zusätzlich in
der Markdown-Datei: ~2400 Zeichen doppelt gepflegt sind nach dem ersten
Nachtrag zwei verschiedene Fassungen. Das JSON ist zugleich das, was
`play-listing.yml` hochlädt (Eingabe `lang` wählt die Datei) — also die
Wahrheit, keine Kopie.

**Zwei Sachfehler, die dabei aufgefallen sind** — beide standen seit Monaten in
der deutschen und englischen Fassung:

- **„Dunkler und heller Modus, Deutsch und Englisch"** — die App kann sechs
  Sprachen. Stand so im Play Store.
- **„Über 220 Übungen"** — es sind 248. Nicht falsch, aber unnötig bescheiden;
  jetzt „über 240" in allen sechs Fassungen.

**Neu: `node scripts/pruefe-store-texte.mjs`.** Prüft beide Quellen gegen die
Zeichengrenzen (Play: 30/80/4000, iOS: 30/30/100/170) und meldet ab 95 % der
Grenze eine Warnung. Zwei Dinge, die es richtig macht:

- **Es zählt Unicode-Zeichen, nicht Bytes.** Beide Stores zählen so. Nach Bytes
  wäre jedes arabische Feld rechnerisch dreimal zu lang und die Prüfung
  unbrauchbar.
- **Es prüft auch Inhalt**, nicht nur Länge: Der Gesundheitshinweis (Verweis auf
  ärztlichen Rat) muss in JEDER Fassung stehen — Google Play verlangt ihn für
  Gesundheits-Apps, und er stand schon einmal nur auf Deutsch. Genau darüber ist
  auch die veraltete Sprachzeile aufgefallen.

⚠ **Play weist zu lange Felder ab, statt sie zu kürzen** — am Ende eines Laufs,
der bis dahin Minuten gebraucht hat. Deshalb das Skript VOR dem Workflow.

**Zur Wortwahl:** Die Keywords sind keine Übersetzung der deutschen Liste,
sondern je Sprache neu gewählt. Ein Wort, nach dem in dieser Sprache niemand
sucht, ist verschenkter Platz — im Portugiesischen heißt das Fitnessstudio
„academia", eine wörtliche Übersetzung von „Gym" hätte den Suchbegriff
verfehlt. Der Ton ist überall informell (`tu`/`tú`/`você`), passend zur
Oberfläche; das ist geprüft, nicht geraten (die UI-Dateien nutzen 70×`tu` in
FR, 38×`tú` in ES, 0×`vous`).

⚠ **Noch offen:** Screenshots gibt es nur auf Deutsch (je sechs Bilder pro
Store), und ein `play-listing.en-US.json` fehlt — der englische Volltext liegt
bisher nur in `store-texte.md`.

**4h. Fehlerdurchgang nach dem Sprachpaket (01.09.2026).** Josefs Auftrag:
„alle Fehler die du findest beheben". Fünf davon waren echt.

**1. `npm run lint` war nicht mehr aussagekräftig — 1332 statt 124 Probleme.**
`eslint.config.js` ignorierte `dist`, aber nicht die beiden Kopien desselben
Bündels, die `npx cap sync` nach `ios/App/App/public/` und
`android/app/src/main/assets/public/` legt. Beide sind gitignored, also auf
einem frischen Klon nicht da — der Zähler sprang je nachdem, ob jemand vorher
gebaut hatte. Damit war die Regel „es dürfen keine neuen dazukommen"
unprüfbar. Jetzt alle drei ignoriert.

**2. `KnowledgePage` zeigte fr/pt/ar den ENGLISCHEN Seitentitel** über einer
vollständig übersetzten Liste. Der Titel kam als drei Props `titleDE`,
`titleEN`, `titleES` herein und wurde mit
`lang === 'es' ? … : (lang === 'de' ? … : …)` gewählt. Jetzt ein
i18n-Schlüssel (`library.<bereich>Knowledge`).

**3. Derselbe Fehler beim „Alle"-Chip** — er trug seine Namen als Datenfelder
(`nameDE`/`nameEN`/`nameES`), während alle übrigen Chips aus dem Sprachpaket
kommen. Auf Französisch stand „All" zwischen lauter französischen Kategorien.

**4. Open Food Facts wurde immer auf Deutsch oder Englisch gefragt.**
`searchOpenFoodFacts` setzte `lc = language === 'de' ? 'de' : 'en'`, und der
Barcode-Scanner las nur `product_name_de`/`_en`. Ein französischer Nutzer, der
ein französisches Produkt scannt, bekam den Standardnamen, obwohl OFF
`product_name_fr` führt. Beide Stellen nehmen jetzt die eingestellte Sprache;
`nameDE`/`nameEN` bleiben als Netz, weil gespeicherte Einträge sie tragen.

**5. `foodDatabase.js` brach das Prüfskript**, sobald es `appSprache`
importierte — ohne `.js`-Endung. Vite löst das auf, node nicht. Die Datei wird
von beiden geladen; das steht jetzt als Regel in ihrem Kopf.

⚠ **Was ich NICHT angefasst habe:** die 123 verbleibenden Lint-Meldungen. Die
ernsten Kandidaten (`react-hooks/purity`, `immutability`) habe ich einzeln
angesehen — es sind hoistete Funktionsdeklarationen, die zur Laufzeit korrekt
sind. Und `foodDatabase.js:190` sieht aus wie Fehler 4, ist aber keiner: Die
gespeicherten Sprachcodes sind immer sauber (Kette über `ProfilePage` und
`user_settings` geprüft), der DE/EN-Zweig ist dort nur der Rückfall.

**Der Prüfer kann diese Fehlerklasse jetzt selbst finden.** `pruefe-sprachen.mjs`
sucht seit diesem Durchgang **Zweiwegweichen auf dem Sprachcode** — genau das
Muster hinter dem toten es-Prompt, der CoachPage-Handliste und den beiden
KnowledgePage-Fehlern. Alle vier sahen richtig aus und liefen lange mit.

Erlaubt bleiben zwei Ausnahmen, beide mit Kosten:
- `// sprachweiche-ok` an der Zeile oder in einer der drei darüber.
- `// sprachweichen-ok: <Begründung>` für eine ganze Datei — die Begründung
  ist Pflicht, ohne Text hinter dem Doppelpunkt zählt sie nicht. Es gibt sie,
  weil `uebersetzungen.js` zwölf solche Zeilen hat und ihr ganzer Zweck der
  DE/EN-Rückfall ist. Zwölfmal derselbe Marker wäre Lärm, den niemand liest —
  und ein Marker, den niemand liest, schützt nichts.

**4i. Neues Design umgesetzt (01.09.2026).** Josefs Übergabe aus einer
anderen Sitzung, Abschnitte 03 bis 08.

⚠ **Abweichung von Abschnitt 01, bewusst:** Die Übergabe verlangt „erst den
Sprach-Branch nach main mergen, dann das Design". Gebaut ist es stattdessen
**auf** dem Sprach-Branch. Der Zweck der Regel ist, dass nicht zwei Stränge
dieselben Klassenketten parallel neu schreiben — auf dem Branch aufzusetzen ist
genauso sequenziell und ergibt genauso EINEN Gesamtbuild. Der Merge nach `main`
deployt Vercel produktiv und ist Josefs Entscheidung, nicht meine.

**Zwei neue Bauteile** (`src/components/`):

- `ProgressRing` — SVG, nicht `conic-gradient`: Der Ring hat runde Enden, und
  mit `conic-gradient` bekommt man harte Kanten und einen Übergang bei 100 %,
  der wie ein Fehler aussieht.
  ⚠ **Bogen und Zahl sind zwei Dinge.** Der Bogen zeigt den Fortschritt
  (gegessen von Ziel), die Zahl in der Mitte, was noch geht. Der erste Entwurf
  hatte beides an einem Wert — dann war der Ring morgens voll und abends leer
  und las sich wie ein Countdown, den man verliert. Im Screenshot aufgefallen.
- `MacroColumn` + `MAKROS` — die vier Makrofarben an EINER Stelle. Vorher
  trugen `MacroPill` und `MacroRing` dieselben Töne doppelt. Die Farben kommen
  als fertige Klassenpaare herein: Tailwind entfernt Klassen, die es nicht
  wörtlich im Quelltext findet, `bg-${farbe}-500` stünde am Ende nicht im CSS.

**Kein `FillTile`** — von Josef abgewählt, Wasser und Supplemente bleiben wie
sie waren. Nicht „doch noch" einbauen.

**Zwei Regeln, die am Token statt an den Karten gelöst sind:**

- **Schatten im Dunkelmodus aus.** `shadow-soft` steht 132-mal im Code, keine
  Stelle hatte eine `dark:`-Entsprechung. Statt 132 Klassen nachzuziehen (und
  132 Gelegenheiten zu schaffen, eine zu vergessen) setzt `html.dark` das Token
  `--shadow-soft` auf `none`.
- **Kartenhülle als `.karte`** in `index.css`, in `@layer components` — sonst
  gewinnt sie gegen ein `rounded-3xl` auf demselben Element.
  ⚠ **Nicht blind über `rounded-2xl` ersetzen:** Die Klasse steht 261-mal im
  Code, die meisten davon sind Knöpfe, Eingabefelder und Modale. Der Ersatz
  greift nur, wenn alle vier Bestandteile in derselben `className` stehen.

**Drei RTL-Fallen, die nur am Gerät auffallen:**

- **`dir="ltr"` an Zahl-plus-Einheit.** Für den Bidi-Algorithmus sind „75" und
  „kg" zwei Läufe — auf Arabisch stand „kg 75". Nachgemessen: jetzt „75 kg".
- **Das Play-Dreieck ist ein SVG mit `rtl:-scale-x-100`.** Ein Abspielknopf
  zeigt in Leserichtung und muss mitspiegeln.
- **`CardPhotoMotif` lag auf `-right-3`.** Das Wasserzeichen blieb als
  Einziges rechts unten kleben, während die Karte spiegelte. Jetzt `-end-3`.
  Neu ist dort auch `klein` (68 px) für Karten unter halber Breite — bei 96 px
  übernimmt das Wasserzeichen die Fläche, statt sie zu grundieren.

**Zwei hartkodierte Strings nebenbei gefunden:** „Bald" in der Bibliothek und
dreimal „Auto" auf der Ernährungsseite. „Auto" ist auf Arabisch nicht „Auto".
Beide haben jetzt Schlüssel.

**Nicht angefasst, mit Absicht:** die vier Makro-Ringe der Ernährungsseite (06
sagt ausdrücklich, dass über die Beschriftung dort noch nicht entschieden ist),
die `MuscleBodyMap`, die Datumsnavigation, das Zyklus-Widget und alles unter
`src/data/` bis auf das Lesen der Wochenplanung.

**Geprüft:** Playwright im Gastmodus, 15 Seitenaufrufe — alle fünf Tabs je hell,
dunkel und auf Arabisch, keine Seitenfehler und keine rohen i18n-Schlüssel.
Dazu Vitest 317, Build, `pruefe-sprachen` ohne Befund, Lint 123 (keine neuen).

⚠ **Von Hand nachzufassen bleibt** (kann kein Skript): Datum vor/zurück,
Gewicht eintragen, „Heute" starten.

**5. Übungs-Demos: eigene 3D-Animationen statt Fotos** (`tools/uebungs-3d/`).

Josefs Vorgabe nach einem Instagram-Video von `fitonomy.coach`: „erstelle es
selbst kostenlos". Der Renderer zeichnet eine Anatomiefigur mit Gerät, lässt
den arbeitenden Muskel rot leuchten und fährt die Kamera mit — Three.js in
headless Chromium, Frames per ffmpeg zu loopbaren MP4s (720×720, 2 s, ~65 KB).
Alle 162 Übungen, ~50 Minuten Rechenzeit, Kosten null.

Das löst **zwei** Dinge auf einmal: die nicht belegbare Rechtekette der alten
Fotos UND die fehlende Bewegung.

- **Muster statt Einzelanimationen:** ~50 Bewegungsfamilien in
  `bewegungen.mjs`, Zuordnung aller 162 Übungen in `zuordnung.mjs`. Eine
  Verbesserung am Muster `curl` verbessert alle 16 Curl-Varianten.
- ⚠ **Die Zuordnung ist eine HANDTABELLE, keine Stichwort-Automatik.**
  Ordnernamen aus der fremden Datenbank lügen: `Air_Bike` ist der Bicycle
  Crunch, kein Fahrrad.
- `ExerciseDemoImage` zeigt das MP4 und fällt auf die alten Fotos zurück —
  **die Fotos bleiben deshalb im Repo**, bis jede Animation geprüft ist.
- Sämtliche Fallen aus sechs Renderdurchgängen stehen in
  `tools/uebungs-3d/README.md`. Die drei teuersten: Kapsellänge muss dem
  Gelenkabstand entsprechen (sonst fehlen Schienbeine); `wurzelRot.x` negativ
  = Rückenlage, positiv = Bauchlage (verwechselt lag die Figur beim
  Liegestütz auf dem Rücken und ruderte); das dunkle Band am Horizont war
  weder Farbe noch Schattenkamera, sondern der Übergang Boden↔Himmel —
  behoben durch einen reinen Schattenfänger ohne sichtbaren Boden.

**Verworfen: der KI-Bild-Weg.** `scripts/uebungs-illustrationen.mjs` erzeugte
über fal.ai Illustrationen; die Probe (6 Bilder, $0,15) zeigte, dass
Text-zu-Bild weder eine Bewegung noch zwei zusammengehörige Posen derselben
Person kann. Befund in `public/exercise-demos-neu/HERKUNFT.md`, Skript bleibt
für anderes Bildmaterial liegen.

**Ebenfalls geprüft und bewusst nicht gekauft** (01.09.2026): fertige
3D-Bibliotheken mit App-Lizenz — MoveKit (220 Übungen $199, 412 für $299,
anatomische Puppe, Stil am nächsten am Referenzvideo) und Gym Animations
(ab $199, 800+ Übungen, graue Figur mit rot leuchtendem Muskel). Beide
erlauben App-Bundling ausdrücklich. Falls der eigene Renderer je an Grenzen
stößt, ist das der Ausweg.

**6. Ausserdem in 1.4.0 (Commits ff9df6d/88247b4):** Rest-Timer überlebt den
Sperrbildschirm (Wanduhr `endsAt` statt Tick-Zählung + LocalNotification),
erste Bewertungs-Anfrage nach Swaply-Muster (nativ, ≥5 Workouts, 90-Tage-
Abstand), Coach-Verlauf in localStorage je Nutzer (max. 60), Android-Workflow
mit `track`-Input (production|internal).

### ✅ Eigene Trainingspläne repariert + zusammengeführt (30.08.2026)
Josefs Bruder scheiterte im **Gastmodus** daran, einen eigenen Plan zu erstellen.
Zwei Ursachen, beide im Code belegt:

**1. Der „Übungen"-Knopf im Wochenplan-Builder war tot.** `WeeklyPlanBuilder`
rief `onSelectExercises(day, cb)` auf, aber `TrainingPage` hat den Prop **nie
übergeben** — `if (onSelectExercises)` schluckte den Klick lautlos. Weil der
Speichern-Knopf gesperrt bleibt, bis jeder Tag konfiguriert ist, war der Weg
„Tagen echte Übungen zuweisen" eine **Sackgasse**: der Plan ließ sich gar nicht
speichern.

**2. Hinzugefügte Übungen wurden nie gespeichert.** Der Übungskatalog war ein
*View-Wechsel derselben Seite* — die Detailansicht wurde dabei abgebaut, das
`changed`-Flag fiel auf `false`, und danach erschien weder der Speichern-Knopf
noch speicherte der Workout-Start. ⚠️ **Lehre: In `TrainingPage` ist alles ein
`view`-State ohne eigene Routen.** Wer dorthin wechselt, verliert den State der
verlassenen Komponente. Untersichten wie den Katalog deshalb als **Overlay im
selben Komponentenbaum** rendern, nicht über `setView`.

Weitere behobene Fehler:
- **Eigene Übungen fielen aus dem Workout.** `handleStartPlan` filterte über
  `getExerciseById`, das nur den statischen Katalog kennt → `return null` →
  `.filter(Boolean)` entfernte sie kommentarlos.
- **Eigene Übungen erschienen als rohe ID.** Neu `getExerciseDisplayName` in
  `exercises.js`; das `__custom__`-Präfix wird zentral im
  **`parseMissingKeyHandler`** der i18n-Konfiguration abgezogen — eine Stelle
  statt 51 Anzeigestellen in 17 Dateien.
- **Datenverlust beim Bearbeiten:** der Builder machte `delete` + `insert`.
  Schlug das Speichern fehl, war der Plan weg. Neu `updateWeeklySchedule`.
- **„Aktivieren" erzeugte ein Duplikat**, weil es über `saveWeeklySchedule` lief
  — das macht **immer INSERT**, es gab keinen Update-Pfad. Neu
  `activateWeeklySchedule`.
- **Übungstage waren nie startbar:** gespeichert wurde `type: 'exercises'`, aber
  `startTodaySession` erkennt nur `'strength'`. Jetzt `'strength'`; der alte Wert
  wird beim Lesen weiter akzeptiert.
- Sätze/Wdh. gingen verloren (Reduktion auf IDs) → werden mitgespeichert und sind
  in der Detailansicht einstellbar.
- Stumme `.catch(() => {})` → `try/catch/finally` mit Toast; ohne `finally` blieb
  der Knopf dauerhaft auf „…". Löschen fragt nach.

**Zusammenführung:** Es gab **zwei Orte**, die beide „Plan" hießen und beide einen
Erstellen-Knopf hatten — `weekly_schedules` („Meine Pläne") und `custom_plans`
(„Trainingspläne"). Jetzt ist **„Meine Pläne" der einzige Ort für eigene Pläne**
(getrennte Abschnitte „Wochenpläne" / „Einzelne Trainingspläne"), der „+"-Knopf
fragt vorher, was entstehen soll, und **„Trainingspläne" ist die reine
Vorlagen-Ansicht**. Umgesetzt über die Props `templatesOnly` / `initialView` an
`TrainingPlans` plus Export der vorhandenen `PlanCard` — die Start-Logik der fünf
Plantypen wurde **nicht** dupliziert. ⚠️ **Keine Datenmigration:** beide Tabellen
bleiben bestehen, nur die Oberfläche führt sie zusammen. Bestehende Pläne laufen
unverändert weiter.

**Verifiziert im Gastmodus** gegen die gebaute App (Playwright gegen
`vite preview`): Plan anlegen → Übungen aus dem Katalog → eigene Übung erstellen →
speichern → neu laden → Plan und Übungen erhalten, eigene Übung namentlich im
Workout. Aktivieren erzeugt kein Duplikat mehr. Lint 129 → 125 Probleme, keine
neuen; Build grün.

⚠️ **Für lokale Tests braucht es eine `.env`** mit `VITE_SUPABASE_URL` und
`VITE_SUPABASE_ANON_KEY` — sonst bricht die App beim Start mit
„supabaseUrl is required" ab und zeigt eine **weiße Seite**. Im Gastmodus genügen
Platzhalterwerte, es geht kein Netzaufruf raus.
### ✅ iOS ist LIVE — freigegeben am 28.08.2026, 08:55 UTC
Version **1.0 ist im App Store veröffentlicht**. Damit ist 2.1(b) endgültig
ausgestanden: die Einreichung vom 14.08. mit Build 6 **samt beider Abos** ist
durchgegangen. Gemessen über die öffentliche iTunes-Lookup-API (AT und DE),
nicht über ASC.

**Der öffentliche Link ist bereits sauber** — Apple bildet ihn aus dem
App-Namen, deshalb steht dort FullRep statt MyPeak:
`https://apps.apple.com/at/app/fullrep-training-ernährung/id6788461300`
Zum Teilen besser die kurze, namensunabhängige Form:
**`https://apps.apple.com/app/id6788461300`**

⚠️ **Der Play-Link enthält dauerhaft `mypeak`** und das lässt sich nicht ändern:
`https://play.google.com/store/apps/details?id=at.gallab.mypeak` — der
`id=`-Parameter **ist** die Paket-ID, und Google kennt keinen zweiten Adressweg
zu einer App. Nicht daran herumbasteln; eine neue Paket-ID hieße neue App ohne
Update-Pfad. Auf der Store-Seite selbst steht durchgehend FullRep (geprüft).

**Was jetzt zuerst zu beobachten ist:** Premium ist auf iOS erstmals mit echtem
Geld kaufbar. Beim **ersten echten Kauf** nachsehen, ob der RevenueCat-Webhook
`premium_until` setzt — dieselbe Kette wurde nur im Sandbox verifiziert. Ebenso
offen: die AdMob-iOS-App mit dem Store-Eintrag verknüpfen (für Android am 29.07.
erledigt, für iOS stand es unter „offen nach Launch").

⚠️ **Die drei Neuregistrierungen vom 28.08., 09:05–09:06** kamen zehn Minuten
nach der Freigabe — das waren die ersten Nutzer aus dem App Store.


### Endpunkt-Tests (28.08.2026) — `npm test`
122 Tests über **alle sieben** Funktionen in `api/`, je einmal für **Gast**
(ohne Token) und **eingeloggt**. Vitest, `environment: 'node'`, Prüfstand in
`tests/helpers/apiHarness.js`. Läuft in unter einer Sekunde, **ohne Netz, ohne
Supabase, ohne Secrets** — global `fetch` ist ersetzt, alle Env-Vars sind
Attrappen. CI: `.github/workflows/tests.yml` bei jedem Push.

**Der Kniff im Prüfstand:** der `fetch`-Ersatz **wirft** bei jedem nicht
eingeplanten Aufruf. Damit fällt auf, wenn ein Endpunkt Gemini oder Claude ruft,
*bevor* er Anmeldung, Premium oder Kontingent geprüft hat — der Fehler, den man
sonst erst auf der Rechnung sieht. `expectNoModelCall()` sichert das zusätzlich
an jedem Abweis-Pfad zu.

`tests/api/endpoint-contract.test.js` liest `api/` selbst aus: ein **neuer**
Endpunkt wird automatisch mitgeprüft (gibt ohne Anmeldung nichts heraus, wirft
nicht bei Netzausfall) und die Liste der erwarteten Dateien bricht absichtlich,
sobald einer dazukommt. `health.js` steht als einziges auf der Öffentlich-Liste.

### ⚠️ GitHub Actions führt keine Jobs mehr aus (28.08.2026)
`tests.yml` schlägt fehl — **nicht wegen der Tests**. Gemessen an drei Läufen
(zwei per Push, einer von Hand): Abbruch nach 4 Sekunden, **0 ms abgerechnete
Rechenzeit**, kein Protokoll (HTTP 404). Der Job wird gar nicht erst auf einen
Runner gelegt. Ein Fehler im Workflow oder in den Tests würde Rechenzeit
verbrauchen und ein Protokoll hinterlassen.

Der Handstart schließt den Push-Auslöser als Ursache aus. Alle 28 früheren
Läufe des Repos waren `workflow_dispatch` und liefen zuletzt am **15.08.**
erfolgreich — dazwischen ist die Ausführung kontoweit weggefallen.

**Wahrscheinlichste Ursache, nicht belegt:** Actions-Minuten oder ein
Ausgabenlimit erschöpft. Das Repo ist privat, und die macOS-Läufe
(`iOS Release`) zählen **zehnfach**. Nachsehen unter
**github.com/settings/billing** → „Actions". Über die API ist die Abrechnung
nicht einsehbar. **Bis das geklärt ist: `npm test` vor jedem Push lokal laufen
lassen** — die CI fängt derzeit nichts ab.

**Stand 31.08. abends: bestätigt und weiter zu.** Josef selbst: „mein
githubkontingent voll". Auch die beiden Release-Läufe für 1.3.1 (iOS Build 7,
Android vc16 → interner Track) starben nach 5 s ohne Protokoll — wie schon
der Versuch vom 30.08. (gleiche Versionen, andere Sitzung). **Wiedervorlage:**
Sobald das Kontingent frei ist (Limit anheben oder neuer Abrechnungszeitraum,
vermutlich 01.09.), beide Workflows auf `main` neu anstoßen: `ios-release.yml`
(upload=true) und `android-release.yml` (upload=true, **track=internal**,
notes gesetzt). Versionsnummern sind schon committet, nichts weiter nötig.
Stirbt es wieder in Sekunden ohne Log: NICHT erneut starten — es ist
weiterhin das Kontingent, und jeder Fehlstart verwirrt nur die Lauf-Historie.

⚠️ **`npm run lint` über das ganze Projekt ist rot** — 106 Fehler, 24 Warnungen,
alle vorbestehend in `src/` (ungenutzte Importe, `react-hooks`-Regeln). Die CI
lintet deshalb nur `api/` + `tests/`. Wird der Altbestand aufgeräumt, kann im
Workflow wieder `npm run lint` stehen.

**Zwei echte Bugs, die beim Schreiben der Tests aufgefallen sind:**
1. `analyze-meal.js` meldete einen **Netzausfall als „429 Rate-Limit"**, wenn ein
   früherer Versuch ein echtes 429 war: `last429` wurde nur zurückgesetzt, wenn
   der `fetch` *antwortete*, nicht wenn er warf. Der Nutzer wartete auf ein
   Kontingent, das nie das Problem war. Jetzt wird die Flagge zu Beginn **jedes**
   Versuchs zurückgesetzt.
2. `delete-account.js` fing **Netzwerkfehler gar nicht ab** — als einziger
   Endpunkt. Ein Aussetzer bei Supabase warf aus dem Handler heraus und kam als
   undurchsichtiger Plattform-Fehler an. Jetzt try/catch (503 bzw. 502) plus
   `AbortSignal.timeout`, wie überall sonst.

### Gastmodus-Tests der Storage-Schicht (28.08.2026)
89 weitere Tests über `src/data/` — Übungen, Trainingspläne, Wochenpläne,
Workouts, Übungsnotizen und Standardpläne, **je einmal als Gast und als
eingeloggtes Konto**. Zusammen mit den Endpunkt-Tests: **211 Tests, `npm test`,
unter 2 Sekunden.**

Prüfstand: `tests/helpers/browserStubs.js` (localStorage-Attrappe, kein jsdom
nötig) + `tests/helpers/supabaseMock.js` (thenable Query-Builder, der jeden
`from(...)`-Aufruf mitschreibt). Damit lautet die Gast-Zusicherung schlicht
`expect(supabase.__calls).toHaveLength(0)`.

`tests/data/guest-contract.test.js` ruft **jede** Funktion der zehn
Storage-Module mit `userId = 'guest'` auf und prüft, dass weder Supabase noch
`fetch` angesprochen wird. Er wertet nur Funktionen, deren erster Parameter
`userId` heißt (sonst wäre `'guest'` z. B. bei `lookupFriendCode(code)` ein
Freundescode); die übersprungenen stehen als **sortierte Liste im Test** — kommt
eine dazu, bricht er und zwingt zur Entscheidung.

**Drei echte Bugs, die dabei aufgefallen sind:**
1. **`local_${Date.now()}` kollidiert.** Zwei Einträge in derselben
   Millisekunde bekamen **dieselbe Kennung** — Löschen des einen entfernte
   beide, Ändern traf den falschen. Neu: **`src/data/localId.js`** mit
   Sitzungszähler, inzwischen an **allen 11 Stellen** eingesetzt
   (workoutStorage 3×, nutritionStorage 4×, supplementStorage 2×,
   weightStorage, SupplementsOverview). Siehe „Der schlimmste Fall" unten.
2. **Papierkorb ohne Gast-Weiche.** `getDeletedCustomPlans`, `restoreCustomPlan`
   und `permanentDeleteCustomPlan` riefen Supabase auch im Gastmodus (mit
   `userId = 'guest'`). `DeletedPlans.jsx` reicht `user.id` ungeprüft durch →
   ein Gast wartete beim Öffnen des Papierkorbs bis zu 8 s auf eine Abfrage,
   die nie etwas finden kann. Jetzt `isGuest`-Weiche wie überall sonst.
3. **`deleteWeeklySchedule` löschte allein über die `id`**, ohne `user_id`.
   Dank RLS nicht ausnutzbar, aber die einzige Ausnahme in der Datei —
   angeglichen.

**Der schlimmste Fall der Kennungs-Kollision — im Gastmodus erreichbar:**
`AddFoodEntry.handleSaveAll` speichert die Mehrfachauswahl in einer Schleife
(`AddFoodEntry.jsx:55`). Als Gast läuft die **ohne Netz**, also mehrere
Durchläufe in derselben Millisekunde → alle Einträge bekamen dieselbe Kennung.
Wer danach **einen** Eintrag löschte, verlor **alle**. Im Test nachgestellt
(`tests/data/nutrition.test.js`), vor dem Fix rot.

### Fachlogik-Tests Ernährung, Supplemente, Gewicht (28.08.2026)
49 weitere Tests, damit die `localId()`-Umstellung nicht blind erfolgt:
Ernährungseinträge inkl. Mehrfachauswahl und Nachholliste für fehlgeschlagene
Cloud-Löschungen, eigene Mahlzeiten, Ziele (auch ein bewusstes Ziel **0**),
Wasser-Tracking (Summe wird nach dem Abziehen neu berechnet), Supplement-Plan
und Einnahme-Haken, Gewichtsverlauf (ein Eintrag pro Tag, aufsteigend sortiert).
**Gesamt: 260 Tests, `npm test`, gut 2 Sekunden.**

⚠️ **Was weiterhin NICHT abgedeckt ist:** `cycleStorage`, `dietStorage` und
`socialStorage` haben **nur** den übergreifenden Gast-Vertrag, keine eigenen
Tests für ihre Fachlogik. Ebenso ungetestet: die React-Komponenten und
`resync.js` (Gast → Konto).

⚠️ **Die CI läuft nicht** — siehe eigenen Abschnitt unten.


### Vier Konten dauerhaft auf Premium gesetzt (28.08.2026)
Drei Neuregistrierungen vom 28.08. plus Josefs eigenes Konto wurden von Hand
freigeschaltet: `status = 'premium'`, `premium_until = 2099-01-01`,
**`provider = 'promo'`**. Der Apple-Prüfaccount `appreview@wellbooked.at` blieb
bewusst außen vor. Gemacht im Supabase SQL Editor, am Ergebnis gegengeprüft
(4 Zeilen, Datum gesetzt).

⚠️ **`provider = 'promo'` heißt: nie bezahlt.** Wer Umsätze zählt oder Käufe
sucht, muss diese vier Zeilen ausschließen — sonst tauchen sie als Kunden auf,
für die nie Geld geflossen ist.

Der Weg dafür liegt jetzt als **`supabase/grant-premium.sql`** im Repo
(nachsehen → freischalten → gegenprüfen → zurücknehmen). Die Datei führt
absichtlich **Platzhalter statt echter Adressen** — Nutzer-E-Mails gehören nicht
in die Versionsgeschichte.

⚠️ **Der Management-API-Weg ist aus der Claude-Umgebung zu:** `api.supabase.com`
antwortet auch ohne Token mit `403, error code: 1010` (Cloudflare blockt nach
Signatur). Die Tokens `SUPABASE_ACCESS_ALMAZ` / `_ANIGOSHA` in der Umgebung sind
damit für Datenbankarbeit wertlos — **solche Änderungen laufen über den SQL
Editor**, nicht über ein Skript. Nicht erneut daran hängenbleiben.

⚠️ **Am Handy frisst die iOS-Autokorrektur SQL.** Beim Einfügen wurde aus
`holztechnikum.at` still ein `holztechnikum.-at`; die Abfrage wäre
durchgelaufen und hätte nur 3 statt 4 Zeilen geschrieben. Deshalb gehört an
jedes schreibende Statement ein **`RETURNING`** — die Zeilenzahl ist die
einzige Kontrolle, die auffällt.


### ✅ RevenueCat-Android fertig (15.08.2026) — AAB 15/1.3.0 gebaut, Upload offen
In der RevenueCat-Konsole war das meiste längst da; nachgesehen statt neu gebaut:
Play-App verbunden („Valid credentials", „Connected to Google", Topic-ID
`projects/wellbooked-501311/topics/Play-Store…`), beide Produkte
`mypeak_premium_monthly:monthly` und `:annual` **Published** mit je 1 Entitlement,
im Default-Offering als `$rc_monthly` bzw. `$rc_annual` — dort liegen Apple- **und**
Android-Produkt nebeneinander. Gefehlt hat nur der SDK-Key.

- `VITE_REVENUECAT_ANDROID_KEY` (`goog_…`) als Repo-Secret gesetzt (15.08.).
- `PURCHASE_ENABLED.android = true`.
- **`canPurchase` verlangt jetzt zwei Dinge:** Plattform-Flagge **und** einen
  RevenueCat-Schlüssel im Binary (`isConfigured()`). Damit kann kein Build mehr eine
  Paywall mit Preisen und totem Knopf ausliefern — der alte Grund, warum Android auf
  `false` stehen musste, ist strukturell weg.
- ⚠️ **Kehrseite:** ein Build ohne Schlüssel hätte gar keinen sichtbaren Kauf — genau
  der Zustand, für den Apple 2.1(b) vergeben hat. Deshalb brechen `ios-release.yml`
  und `android-release.yml` jetzt ab, wenn die Flagge einer Plattform `true` ist, ihr
  Secret aber leer.
- AAB `versionCode 15` / `versionName 1.3.0` gebaut und signiert
  (`android-release.yml` #7, Upload bewusst aus, liegt als Artefakt).

**Ausgeliefert 15.08., 14:36 UTC:** AAB 20,7 MB als `versionCode 15` hochgeladen,
Produktions-Track an alle Nutzer, validiert und committet. Damit ist Premium auf
Android zum ersten Mal wirklich kaufbar. ⚠️ **Ein Android-Kauf wurde nie getestet** —
beim ersten echten Kauf zusehen, ob der Webhook `premium_until` setzt.

**Abo-Anzeigename** in Play auf `FullRep Premium` gezogen (per API, am Endpunkt
bestätigt).

✅ **Preise am 15.08. in der Console auf 4,99 / 44,99 gesetzt** (173 von 173 Regionen,
am Endpunkt gegengeprüft). Damit rechnen Play, App Store und die Paywall dieselben
Zahlen. ⚠️ Zwischendurch standen dort kurz 5,99 / 54,99 — beim Setzen also darauf achten,
ob Play das Feld brutto oder netto meint, und danach mit `mode = abos` nachzählen.

⚠️ **Über die API gehen die Preise NICHT.**
Zwei Anläufe, zwei Absagen, beide lehrreich:
1. `Regions Version must be specified.` — `regionsVersion` ist bei **jedem**
   schreibenden Aufruf am Abo Pflicht, nicht nur bei Preisen (auch beim reinen Titel).
2. `Invalid currency for region code BG … Expected BGN but got EUR.` — der PATCH
   validiert die **komplette** Regionstabelle mit. Bulgarien hat einen EUR-Preis
   gespeichert, Googles Katalog `2022/02` erwartet dort BGN. Eine Altlast, die den
   Aufruf blockiert, obwohl sie gar nicht angefasst wird.
**Folge: Preise nur in der Play Console ändern** — sie rechnet die übrigen Währungen
automatisch um, die API müsste 173 Beträge selbst hinschreiben.

### Play-Abos: gemessener Stand 14.08.2026 (`play-listing.yml` → `abos`)
```
mypeak_premium_monthly        Listing de-DE: 'MyPeak Premium'   ⚠ alter Name
  Tarif monthly  auto-renew P1M  ACTIVE   4,49 EUR (AT)   173 von 173 Regionen
  Tarif annual   auto-renew P1Y  ACTIVE  44,90 EUR (AT)   173 von 173 Regionen
```

⚠️ **Play ist anders gebaut als der App Store — das ist für RevenueCat entscheidend.**
Play hat **ein Produkt mit zwei Basis-Tarifen**, Apple hat **zwei getrennte Produkte**.
In RevenueCat heißen die Play-Produkte deshalb `mypeak_premium_monthly:monthly` und
`mypeak_premium_monthly:annual` (Produkt-ID **plus** Basis-Tarif-ID). Beide ans
`premium`-Entitlement und ins Default-Offering als Monthly- bzw. Annual-Package.

⚠️ **Drei Abweichungen zum App Store, Stand 14.08.:**
1. **Preis:** Play 4,49 / 44,90 — Apple und die Paywall 4,99 / 44,99. Die Paywall zeigt
   zwar den Live-Store-Preis, aber `perMonth` und `ANNUAL_SAVINGS` stehen fest im Binary
   und rechnen mit 4,99/44,99. Auf Android stimmten sie damit nicht.
2. **Anzeigename** im Play-Listing ist noch `MyPeak Premium`, in ASC längst
   `FullRep Premium`.
3. Die Tarif-IDs heißen `monthly`/`annual` — sie tauchen im RevenueCat-Produktnamen auf.

**Gegenprobe jederzeit:** `play-listing.yml` mit `mode = abos` (liest nur). Es zeigt
Betrag **und** „Regionen mit Preis: n von m" — ein Tarif mit Preis in nur einer Region
oder ohne `ACTIVE` ist nicht kaufbar.

### iOS-Ablehnung 14.08.2026 — 2.1(b) erneut, weil die Abos NICHT mitgingen
Apple hat Build **1.0 (4)** abgelehnt (Prüfgerät iPad Air 11″ (M3), 15:32).
**1.4.1 ist weg** — die Quellenangaben haben getragen. Übrig bleibt allein:

> **Guideline 2.1(b) – Performance – App Completeness.** „We are unable to complete the
> review of the app because one or more of the In-App Purchase products have not been
> submitted for review. Specifically, the app includes references to Premium subscription
> but the associated In-App Purchase products have not been submitted for review."
> Nächste Schritte laut Apple: **die IAP-Produkte einreichen UND einen neuen Build
> hochladen.**

⚠️ **Das ist keine Überraschung, sondern die angekündigte Folge von `--trotzdem`.** Am
31.07. ging Version 1.0/Build 4 bewusst ohne die Abos raus (beide `MISSING_METADATA`),
und im CLAUDE.md stand schon damals: „2.1(b) kann sich dadurch wiederholen." Genau das
ist passiert. **Lehre: die harte Sperre in `einreichen()` hat recht — `--trotzdem` ist
kein Abkürzer, sondern kauft eine Ablehnung samt zwei Wochen Wartezeit.**

Erschwerend: die Prüfnotiz für Build 4 behauptete „The auto-renewable subscriptions are
submitted together with this version". Der Prüfer hat danach gesucht und nichts gefunden.
**Nie in die Prüfnotiz schreiben, was man erst noch vorhat.**

### ✅ Version 1.0 / Build 6 samt beider Abos eingereicht — 14.08.2026, 15:38 UTC
Einreichung **`8ae50391-e042-4e1c-aae8-e65a55917e60`**, Zustand `WAITING_FOR_REVIEW`,
**vier Elemente, alle `READY_FOR_REVIEW`**: `mypeak_premium_monthly`,
`mypeak_premium_annual`, die Abo-Gruppe und die App-Version 1.0 mit Build 6.
Am Endpunkt nachgezählt, nicht bloß gemeldet. Damit ist erfüllt, woran 2.1(b) zweimal
gescheitert ist: die IAP-Produkte fahren **mit** der Version.

⚠️ **Beim nächsten Mal nicht wieder in diese Reihenfolge geraten:** erst die Preise
vollständig setzen, dann bauen, dann sammeln, dann übermitteln. Am 14.08. ging um 17:16
eine komplette Einreichung mit Build 5 raus, dessen Paywall noch die falschen Preise trug,
und musste zurückgezogen werden — das kostete den zweiten Durchlauf. **Vor dem Sammeln
prüfen, ob der zugewiesene Build der ist, den man meint.**

⚠️ **Nach einem Zurückziehen zeigt ASC an allen Elementen „Vom Entwickler abgelehnt" und
graue Knöpfe.** Das ist die Altmarkierung der zurückgezogenen Einreichung, kein aktueller
Zustand — die API meldete parallel `READY_TO_SUBMIT` bzw. `PREPARE_FOR_SUBMISSION`. Hilft:
harter Reload und **mit der App-Version beginnen**; sie eröffnet den neuen Entwurf, an dem
die Abos andocken.

**Der Weg dorthin, Schritt für Schritt:**

| # | Schritt | Wo | Stand |
|---|---|---|---|
| 1 | `--aufraeumen`: Einreichung `41324499…` (31.07.) zurückgezogen | asc.yml | ✅ |
| 2 | Abopreise gesetzt → beide Abos **`READY_TO_SUBMIT`** | ASC-Oberfläche | ✅ |
| 3 | Paywall-Preise an den Store angeglichen, Build 6 gebaut + zugewiesen | `ios-release.yml` #5 | ✅ `VALID` |
| 4 | Prüfnotiz (2133 Zeichen, mit 4,99/44,99) | asc.yml | ✅ |
| 5 | Je **Zur Prüfung hinzufügen**: beide Abos, **Abo-Gruppe**, **App-Version** | **ASC-Oberfläche** | ✅ |
| 6 | **Zur Prüfung übermitteln** | **ASC-Oberfläche** | ✅ |

**⚠️ Der eigentliche Blocker war der Abopreis — und zwar wirklich, nicht nur laut Meldung.**
Die Oberfläche sagte an beiden Abos rot: „Kann nicht zur Prüfung hinzugefügt werden ·
**Füge einen Abopreis hinzu**". In der Preistabelle hatte **nur Österreich** einen Betrag,
die übrigen **174 Länder standen auf „–"**.

⚠️ **Und die API hat das zweimal falsch gemeldet.** Erst zählte `--warum` nur die Einträge
(„Preise hinterlegt: 1"), dann löste die Korrektur vom 14.08. den Betrag auf und meldete
„Preis: 4.49 (DEU)" — mit vollständig unverdächtigen Rohattributen
(`planType=UPFRONT, preserved=false, startDate=null`). **Beides war falsch.**
Lehre, endgültig: **`subscriptions/{id}/prices` taugt nicht als Nachweis, dass ein Abopreis
gesetzt ist.** Wer das prüfen will, sieht in der Oberfläche nach, ob die Preistabelle für
alle Verkaufsgebiete Beträge zeigt — oder gar nicht. `--warum` schreibt die Rohattribute
inzwischen mit, aber nur zur Diagnose, nicht als Freigabe.

**Wo der Preis gesetzt wird** (zwei Sackgassen liegen davor):
Abo öffnen → Abschnitt **„Abo-Preise"** → rechts **„Alle Preise und Währungen"** →
Land + Preis wählen → sichern. **Nicht** das blaue **„+"** neben „Abo-Preise" — das bietet
nur Einführungsangebote, Angebotscodes und Aktionsangebote. Die Seite wirft dabei
gelegentlich „Es ist ein Fehler aufgetreten. Versuche es später erneut."; dann neu laden
und wiederholen, sie speichert sonst stillschweigend nichts.

**⚠️ Eine Einreichung braucht VIER Elemente, nicht zwei:**
beide Abos **plus die Abo-Gruppe** („Dein Abo mit automatischer Verlängerung muss mit seiner
Abo-Gruppe übermittelt werden") **plus die App-Version**. Jedes wird einzeln über
**„Zur Prüfung hinzufügen"** gesammelt; erst dann wird **„Zur Prüfung übermitteln"** aktiv.
**Die API kann keines der drei IAP-Elemente anhängen** — das bleibt Handarbeit.

**Zwischenstand 17:16 (Ortszeit): einmal übermittelt und wieder zurückgezogen.**
Einreichung `44f5d426-93b0-40cb-bb77-d36e441756b1` ging mit allen vier Elementen raus —
aber mit **Build 5**, dessen Paywall noch die alten Preise trug. Josef hat sie
zurückgezogen (Version steht seither auf `DEVELOPER_REJECTED`, die Build-Zuweisung holt
sie da wieder heraus). **Die Abos blieben dabei `READY_TO_SUBMIT`** — ein Zurückziehen
beschädigt die Preisarbeit nicht.

**Preise: die App rechnete mit Zahlen, die nie im Store standen.**
In ASC stehen **4,99 €/Monat** und **44,99 €/Jahr**, in `PaywallPage.jsx` standen
4,49 / 44,90. Der Live-Preis von RevenueCat ersetzt nur die großen Beträge —
**`perMonth`, `ANNUAL_SAVINGS` und „2 Monate gratis" stehen fest im Binary** und waren
damit schlicht falsch. Korrigiert auf 4,99 / 44,99 / 3,75 / **−25 %** (genau 24,9 %);
die Angabe „2 Monate gratis" ist entfernt, weil es real 2,98 Monate sind — „3" wäre knapp
zu viel, „2" deutlich zu wenig. ⚠️ **Wer den Preis in ASC ändert, muss diese Konstanten
mitziehen und neu bauen.**

**Code-Seite vorbereitet (14.08.):**
- `CURRENT_PROJECT_VERSION` 4 → 5 → **6** im pbxproj (Apple verlangt ausdrücklich ein neues
  Binary; `ios-release.yml` liest die Nummer von dort).
- Die Build-Nummer stand in `asc.yml` **fest auf 4** und in `--alles` ebenfalls. Beides
  hätte still den abgelehnten Build wieder zugewiesen, ohne zu scheitern. Jetzt Eingabe
  `build_nr` im Workflow, `--alles` verlangt `--build`.
- `--warum` zeigt bei Preisen jetzt **Betrag + Land statt der Anzahl** (der Messfehler vom
  31.07., der Stunden gekostet hat — ein Eintrag ohne auflösbaren Preispunkt ist kein Preis
  und wird als `Preis: FEHLT` gemeldet).
- Prüfnotiz neu: nennt beide Produkt-IDs samt Preis, den Klickweg zur Paywall und den Grund
  für die `mypeak`-Präfixe. Der Satz „die Abos sind Teil dieser Einreichung" darf erst
  gesetzt werden, wenn sie es tatsächlich sind.

### iOS-Ablehnung 29.07.2026 behoben — Quellenangaben + IAP (30.07.2026)
**Gute Nachricht zuerst: 4.3(a) „Spam" taucht in dieser Ablehnung NICHT mehr auf.** Apple hat
Build 1.0 (3) inhaltlich geprüft (Prüfgerät iPad Air 11"). Zwei Punkte blieben:

**1.4.1 Safety – Physical Harm:** medizinische Inhalte ohne Quellenangaben. Apple verlangt
Belege „such as links to those sources", für Nutzer „easy to find".
→ **Behoben.** Neue Komponente `src/components/References.jsx` — dauerhaft sichtbare
Quellenliste (nicht eingeklappt), Links öffnen extern. Eingebunden in alle drei Reader:
`KnowledgePage` (deckt Training/Ernährung/Supplemente/Blutwerte ab), `PeptidesPage`,
`DietsPage`. Datenmodell je Thema: `references: [{ authors, year, title, source, url? }]`.

**Abdeckung: 52/52 Themen, 82 Quellen, davon 67 verlinkt** (Training 6, Ernährung 6,
Supplemente 6, Blutwerte 6, Peptide 20, Diäten 8) — **kein Thema ohne Quellenblock.**
Nur anerkannte Domains (PubMed, PMC, NEJM, Oxford Academic, NIH ODS, WHO, ADA, ETA,
Endocrine Society, Wiley, Taylor & Francis, Nature) — maschinell gegengeprüft.
⚠️ Hier stand vorher „76/76 Themen, 120 Quellen, 97 verlinkt". Am Code nachgezählt
(31.07.) stimmt das nicht; 76 entsteht, wenn man die Wissensthemen je Sprache doppelt
zählt (24×2+20+8). An der Lückenlosigkeit ändert das nichts — beim Zitieren aber die
gemessenen Zahlen nehmen, nicht die alten.

⚠️ **Grundregel, unbedingt beibehalten: keine DOI, kein Link, keine Quelle wird erfunden.**
PubMed/doi.org/Crossref sind vom Proxy blockiert, verifiziert wurde je Quelle einzeln per
Websuche. 23 im Text genannte Werke ohne verifizierbaren stabilen Link stehen bibliografisch
vollständig, aber **ohne** `url` — das ist Absicht, nicht Lücke. Ein toter Link in einer
Gesundheits-App ist schlimmer als keiner.
Für Peptide gilt zusätzlich: **niemals Peptid-Shops als Beleg verlinken** — die dominieren
die allgemeine Websuche. Domain-beschränkte Suche auf `pubmed.ncbi.nlm.nih.gov` nutzen.

Weitere Stellen: TDEE-Rechner zitiert jetzt sichtbar Mifflin-St Jeor (1990) direkt am
Ergebnis. Peptide-Disclaimer um einen Evidenz-Hinweis ergänzt (nur wenige Substanzen sind
zugelassene Arzneimittel, sonst überwiegend Tier-/Laborstudien). `api/coach.js` weist den
Coach bereits an, Quellen zu nennen und niemals welche zu erfinden.

**2.1(b) Performance – App Completeness:** App verweist aufs Abo, IAP-Produkt wurde nie zur
Prüfung eingereicht → Apple bricht ab.
→ Code-Seite behoben: `PURCHASE_ENABLED.ios = true` in `PaywallPage.jsx`.
⚠️ **`android` bleibt `false`**, bis RevenueCat-Android eingerichtet ist. Ohne
`VITE_REVENUECAT_ANDROID_KEY` meldet `isConfigured()` false → der Kauf endet in „bald
verfügbar", der Nutzer sähe also Preise mit totem Knopf. Erst mit `goog_`-Key und dem
Play-Produkt am Entitlement einschalten.

### iOS-Stand 31.07.2026 — Build 4 oben, Metadaten gesetzt, Einreichung hakt an den Abos
Die iOS-Secrets sind alle gesetzt (Josef am 31.07.), `ios-release.yml` lief durch,
**Build 4 liegt in ASC und ist `VALID`**. Alles Weitere läuft über **`scripts/asc.py`** und
den Workflow **`.github/workflows/asc.yml`** (Linux — die ASC-API braucht keinen Mac).

**Erledigt, je am echten Endpunkt bestätigt:**

| | |
|---|---|
| Anzeigename | `MyPeak: Fitness & Ernährung` → `FullRep: Training & Ernährung` |
| Build 4 | der Version 1.0 zugewiesen → Zustand `REJECTED` → `PREPARE_FOR_SUBMISSION` |
| Screenshots | je 6 alte gelöscht, 6 iPhone (`APP_IPHONE_67`) + 6 iPad (`APP_IPAD_PRO_3GEN_129`) neu |
| Abo-Screenshots | beide Abos, `assetDeliveryState = COMPLETE` |
| Prüfnotiz | `appStoreReviewDetail.notes`, 1520 Zeichen, benennt **beide** Ablehnungsgründe mit Klickweg |

⚠️ **Nur `de-DE` existiert in ASC.** Es gibt keine `en-US`-Lokalisierung, deshalb bleibt
`FullRep: Workout & Nutrition` ungenutzt. Anlegen hieße englische Beschreibung, Keywords und
eigene Screenshots — eigene Aufgabe, keine Nebensache.

Ebenfalls gesetzt: Abo-Anzeigenamen `MyPeak Premium` → **`FullRep Premium`** (alle vier
Lokalisierungen). Der interne `name` („MyPeak Premium Jahr") ist die Referenzbezeichnung —
nur intern sichtbar, deshalb belassen.

**⚠️ DER EINE OFFENE PUNKT — beide Abos bleiben `MISSING_METADATA`:**
`--warum` meldet **alles** als vorhanden, was die API offenlegt:

| Geprüft | Ergebnis |
|---|---|
| Lokalisierungen DE + EN | Name + Beschreibung vorhanden |
| Preis / Verkaufsgebiete | ⚠️ **Fehlmessung** — siehe unten / 175 Länder |
| Review-Screenshot | `assetDeliveryState = COMPLETE` |
| Alterseinstufung | gesetzt (am `appInfo`) |
| Exportbestimmungen | `usesNonExemptEncryption = False` |
| Inhaberrechte | `DOES_NOT_USE_THIRD_PARTY_CONTENT` |
| Rohattribute | vollständig, `reviewNote: null` (optional) |

**Welches Feld ASC vermisst, gibt die API nicht her — das zeigt nur die Oberfläche.**
In ASC → Abos → `mypeak_premium_monthly` steht der Grund im gelben Hinweis. **Am 31.07.
war es der fehlende Abopreis beim Jahresabo** — die Zeile „Preis" in der Tabelle oben war
eine Fehlmessung meinerseits, siehe „Eigener Fehler" weiter unten.

⚠️ **`--einreichen` ist deshalb gesperrt**, solange ein Abo nicht `READY_TO_SUBMIT` ist
(`--trotzdem` überbrückt). Ginge die Version allein durch, wäre das exakt der Zustand, für
den Apple 2.1(b) vergeben hat.

### Version 1.0 / Build 4 eingereicht — 31.07.2026 → am 14.08. abgelehnt (2.1(b))
**Ausgang steht oben.** Der Abschnitt bleibt, weil er zeigt, wie es dazu kam.

Auf Josefs ausdrückliche Anweisung mit `--trotzdem` abgesendet, obwohl beide Abos noch auf
`MISSING_METADATA` stehen. ⚠️ **Die Abos sind also NICHT mitgegangen** — 2.1(b) kann sich
dadurch wiederholen. Zum Heilen: `--aufraeumen`, dann in ASC je Abo den blauen Knopf
**„Zur Prüfung hinzufügen"** drücken, dann `--einreichen`.

**Was Apple beim ersten Anlauf blockierte, war ein fehlender Preis.** Das Jahresabo
`mypeak_premium_annual` hatte **keinen Abopreis** — ASC meldet dazu in der Oberfläche
„Kann nicht zur Prüfung hinzugefügt werden · Füge einen Abopreis hinzu", über die API aber
nur `MISSING_METADATA`. Am 31.07. nachgetragen: **44,90 €** (Deutschland), passend zu
`PaywallPage.jsx` (`PRICES.annual` = 44,90 · 3,74 €/Monat). Monatlich steht auf 4,49 €.

⚠️ **Eigener Fehler, der Stunden gekostet hat:** `--warum` zählte `subscriptions/{id}/prices`
und meldete „Preise hinterlegt: 1" — auch für das Abo **ohne** Preis. Die Beziehung liefert
offenbar auch Einträge, die kein gültiger Preis sind. **Anzahl ≠ vorhanden.** Wer das prüft,
muss den Inhalt ansehen (Territorium + Betrag), nicht die Länge der Liste.

**Der Ablauf für IAP hat sich bei Apple geändert** (Stand 31.07.): Auf der Versionsseite gibt
es **kein `+`** mehr zum Anhängen. Stattdessen sammelt man: je Abo **„Zur Prüfung hinzufügen"**,
dann auf der Version **„Zur Prüfung hinzufügen"** — alles landet in **einer** `reviewSubmission`
und geht gemeinsam raus. Das erste Abo einer App geht zwingend mit einer App-Version mit.

**Der eigentliche Blocker war eine Altlast, kein fehlendes Feld.** Zwei Stunden Suche gingen
daran vorbei, deshalb ausführlich:

Die Einreichung `4ffb285d-eb99-4e9d-a74d-d6edcac4a1a9` vom **18.07.** stand auf
`UNRESOLVED_ISSUES` (Element `REJECTED`) und hielt Version 1.0 besetzt. Apple meldet dazu
nur `appStoreVersions with id '887964240' is not in valid state` — **ohne** zu sagen, dass
eine alte Einreichung schuld ist. Sichtbar wurde es erst über die ASC-Oberfläche
(„Ungelöste Probleme"), nicht über die API.

⚠️ **Fehlerquelle zum Merken:** `--einreichen` filterte serverseitig auf
`filter[state]=READY_FOR_REVIEW,WAITING_FOR_REVIEW,IN_REVIEW`. `UNRESOLVED_ISSUES` war
nicht dabei → die blockierende Einreichung blieb unsichtbar, und es entstand eine zweite,
leere daneben. **Ein Zustandsfilter verschweigt, wonach man nicht fragt.** Jetzt wird ohne
Filter geholt und im Code aussortiert (`--einreichungen` zeigt alle, `--aufraeumen` zieht
blockierende mit `canceled: true` zurück; `CANCELING` → `COMPLETE` dauert ein bis zwei
Minuten).

**Drei Dinge, die die API nachweislich NICHT kann** (am 31.07. gemessen, nicht vermutet):
1. **Abos an eine Einreichung hängen** — `subscription` ist keine Beziehung an
   `reviewSubmissionItems`; Apple antwortet „unknown relationship". Abos fahren mit der
   Version mit, sobald sie `READY_TO_SUBMIT` sind.
2. **Das Resolution Center** — kein öffentlicher Endpunkt. Die geschriebene Antwort auf
   Apples Ablehnung bleibt Handarbeit. Die Prüfnotiz erreicht denselben Prüfer anders.
3. **Eine `en-US`-Lokalisierung sinnvoll füllen** — technisch anlegbar, inhaltlich nicht.

**Zwei Fallen, die je einen Fehlversuch gekostet haben:**
- Bei `reviewSubmissionItems` heißt die **Beziehung im Singular** (`appStoreVersion`), der
  **Typ im Plural** (`appStoreVersions`). Beides gleich zu benennen quittiert Apple mit
  „unknown relationship" — dieselbe Meldung wie bei einer gar nicht existierenden Beziehung,
  was in die falsche Richtung führt.
- Die **Alterseinstufung hängt am `appInfo`, nicht am `appStoreVersion`**. Wer nur an der
  Version nachsieht, meldet „fehlt", obwohl sie gesetzt ist. `--warum` fragt beide Orte ab.

### Play-Richtlinienverstoß „Gesundheitsbezogene Inhalte" (30.07.2026) — CODE FERTIG, Rollout OFFEN
Google hat am 30.07. durchgesetzt: „Ihre App erinnert Nutzer offenbar nicht daran, einen Arzt
aufzusuchen, wenn sie medizinischen Rat, eine **Diagnose** oder eine **Behandlung** benötigen."
Fundort laut Google: die **vollständige Beschreibung (de-DE)**. Vorherige Version bleibt live.
Entscheidung: **beheben, kein Einspruch** — der Befund traf zu.

⚠️ **Der Kernsatz muss alle drei Fälle nennen — Rat, Diagnose, Behandlung.** Danach sucht die
Prüfung. Beim Kürzen also aufpassen: das ist juristischer Text, keine UI-Kopie.

**Neu `src/components/MedicalDisclaimer.jsx`** (Muster wie `References.jsx`, `lang`-Prop statt
i18n-Keys — der Wortlaut soll sich nicht nebenbei mitändern). Varianten `medical` (Standard) /
`general`, optionaler `extra`-Absatz, dazu `medicalDisclaimerText()` für Stellen ohne Kasten.
Er löst die **zwei divergierenden Kopien** in `KnowledgePage` und `PeptidesPage` ab.

Eingebaut, wo bisher **gar nichts** stand: `library/DietsPage` (Liste **und** direkt über dem
Bestätigen von „Diät starten"), `CycleDetailPage` (über den Empfehlungen),
`nutrition/SupplementsOverview` (über dem Einnahmeplan). `CoachPage` nutzt jetzt
`medicalDisclaimerText()` — die 10-px-Fußzeile unter dem Eingabefeld bleibt, die Box wäre dort
zu schwer.

**Dauerhaft auffindbar: `/legal/health`** (`legalDocs.health`, DE+EN, 6 Abschnitte inkl.
Notfall-Hinweis und „KI-Coach ist kein Arzt"), im Profil als **erste** Zeile über Impressum —
in den AGB vergraben (dort Punkt 4) zählt es für Google nicht.

Store-Beschreibung um „WICHTIGER GESUNDHEITSHINWEIS" ergänzt: `play-listing.de-DE.json`
(2326/4000 Zeichen) und spiegelbildlich DE+EN in `store-texte.md`, damit die iOS-Beschreibung
nicht auseinanderläuft — Apples 1.4.1 zielt auf dasselbe.

**Version für die Auslieferung: `versionCode 14` / `versionName 1.2.0`.** Achtung: 13/1.1.8 war
zugleich die live ausgelieferte Fassung — die **erste** AAB mit dem gesamten FullRep-Umbau
(Name, Logo, Quellenangaben) ist also erst diese hier.

⚠️ **Solange die Richtlinienprüfung läuft, nimmt die Play-API keine automatisch eingereichte
Änderung mehr an** — `400 INVALID_ARGUMENT`, „Changes cannot be sent for review
automatically". Und zwar schon bei **`:validate`**, nicht erst bei `:commit`. Am 30.07. ging
derselbe Aufruf noch durch; das ist eine Folge der Beanstandung, kein Skriptfehler. Weil der
Abschluss die letzte Stufe der Edit-Transaktion ist, verfällt sonst **alles** Vorherige —
beim AAB also Minuten an Upload, und der nächste Versuch bräuchte einen neuen `versionCode`.
`commit_edit()` in `play-upload.py` fängt das ab und wiederholt validate+commit mit
`changesNotSentForReview=true`. Die Änderung ist dann gespeichert, liegt aber als **Entwurf
in der Console** und muss dort von Hand zur Prüfung geschickt werden — die Ausgabe sagt das
ausdrücklich, statt „sichtbar" zu melden. Alle drei Wege (Screenshots, Texte, AAB) laufen
darüber.

**✅ ERLEDIGT (31.07.2026, von Josef in der Play Console abgeschlossen — „Google ist bereits
durch").** Damit sind Store-Text, AAB 14, Store-Symbol und Vorstellungsgrafik draußen und
die Beanstandung ist abgearbeitet. Die vorbereitete Support-Antwort in
`store-assets/play-richtlinie-antwort.md` wird nicht mehr gebraucht.
Nicht selbst nachgeprüft — hier steht, was gemeldet wurde.

### Store-Screenshots neu + Play-Upload automatisiert (30.07.2026)
**18 neue Screenshots** (6 Motive × iPhone 6,9″ / iPad 12,9″ / Android) in `store-assets/`.
Erzeugt von **`scripts/store-screenshots.mjs`** (Playwright + Chromium aus `/opt/pw-browsers`)
gegen `npx vite preview`. Läuft im **Gastmodus** — der macht keinen Netzaufruf, deshalb braucht
das Skript weder Supabase-Zugang noch den Review-Account; die Demo-Daten kommen per
`addInitScript` in localStorage. Zwei Gastmodus-Artefakte (Hinweisbanner, Platzhaltername
„Gast") werden vor dem Auslösen weggeräumt — beides existiert im angemeldeten Betrieb nicht.

**Android ist damit komplett umgestellt** (de-DE, 30.07.):
- **19:09 UTC — Screenshots:** alte Bilder gelöscht, sechs neue in Dateinamen-Reihenfolge
  hochgeladen, Edit committet.
- **19:22 UTC — Texte:** Titel `MyPeak: Fitness & Ernährung` → **`FullRep: Training &
  Ernährung`**, Volltext MyPeak → FullRep. Die Kurzbeschreibung stand schon richtig.
  Google prüft eine Titeländerung nach; im Store schlägt sie mit Verzögerung durch.

**Der Upload läuft auf GitHubs Rechnern, nicht hier** — das Dienstkonto-JSON liegt als Secret
`PLAY_SERVICE_ACCOUNT_JSON` und verlässt die Secrets nie.
- `scripts/play-upload.py --screenshots store-assets/android --lang de-DE [--dry-run]`
  (eine Edit-Transaktion: `edits.insert` → `images.deleteall` → je Bild `images.upload` →
  `:validate` → `:commit`)
- `scripts/play-upload.py --listing store-assets/play-listing.de-DE.json [--dry-run]`
  setzt **Titel/Kurz-/Volltext** (PATCH, also bleibt stehen, was nicht in der Datei steht).
  Die Texte liegen als versionierte JSON-Datei im Repo statt in Workflow-Eingaben —
  so steht im Diff, was im Store landet. Längen (30/80/4000) prüft das Skript vorab.
- Workflow **`.github/workflows/play-listing.yml`**, nur `workflow_dispatch`, Eingabe
  `mode` = `screenshots` | `texte`, `dry_run` standardmäßig **true**. Ein Live-Listing
  ändert man absichtlich, nicht als Nebenwirkung — immer erst trocken laufen lassen.
- **`.github/workflows/release-preflight.yml`** meldet in Sekunden, welche Release-Secrets
  gesetzt sind bzw. fehlen (nur „gesetzt"/„FEHLT", nie Werte). Vor jedem iOS-Lauf sinnvoll:
  ein macOS-Lauf kostet sonst 20 Minuten bis zum Scheitern.

⚠️ **Abhängigkeit zum Merken:** Das Dienstkonto `play-upload@wellbooked-501311` liegt im
GCP-Projekt **`wellbooked-501311`** (dem WELLbooked-Projekt, nicht FullRep). Für Play ist das
egal — der Zugriff hängt an der Play-Console-Freigabe, nicht am Projektnamen. Aber wird dieses
Projekt aufgeräumt oder der Service-Account dort gelöscht, stirbt damit auch der
FullRep-Upload **und** `android-release.yml`.

### Umbenennung MyPeak → FullRep (30.07.2026) — CODE FERTIG, Stores/Domain OFFEN
**Warum:** Markenkollision. **Aima Interactive S.L.** (Spanien) betreibt eine Fitness-App namens
**MyPeak** ([Play](https://play.google.com/store/apps/details?id=com.mypeak.app) /
[App Store id6758337601](https://apps.apple.com/gb/app/mypeak-gym-workout-tracker/id6758337601),
[mypeakapp.com](https://mypeakapp.com)) — Workout-Tracker mit KI-Coach, also Zeichen- **und**
Dienstleistungsidentität im selben Markt. Deren App-Store-ID (`6758337601`) liegt unter unserer
(`6788461300`), die Priorität liegt also sehr wahrscheinlich bei ihnen. **Verdacht:** Das war
möglicherweise der echte Auslöser der Apple-Ablehnung 4.3(a) „Spam" — die Antwort vom 12.07.
blieb unbeantwortet, weil sie am Thema vorbeiging.

**Namenssuche:** ~30 Kandidaten geprüft (Store-, Firmen- und Websuche). Alle „…Peak"-Varianten
kollidierten (PeakX → [peakx.fitness](https://www.peakx.fitness); BodyPeak → drei bestehende Apps,
eine featuregleich; HighPeak → deutsche Outdoor-Marke + geografische Angabe, nicht eintragbar).
**FullRep** kam ohne Blocker durch: Gym-Sprache („volle Wiederholung"), suggestiv statt
beschreibend, damit schützbar. Nachbarn zur Kenntnis: [fullreps.co.uk](https://fullreps.co.uk)
(UK-Gym-Bekleidung, Klasse 25) und FullReps Training Center (Baseball, Pennsylvania).

**Store-Namen:** DE `FullRep: Training & Ernährung` · EN `FullRep: Workout & Nutrition`
(je ≤30 Zeichen). Untertitel: `Workout-Tracker & KI-Coach` / `Workout Tracker & AI Coach`.

**Bewusst NICHT umbenannt** (Umbenennen würde Nutzerdaten zerstören oder ist technisch unmöglich):
| Bleibt | Grund |
|---|---|
| `at.gallab.mypeak` | Bundle-ID/`applicationId`. Nach Play-Veröffentlichung unveränderlich — sonst neue App ohne Update-Pfad. Unsichtbar. |
| `mypeak_premium_monthly` | Produkt-IDs bei Apple/Google nach Anlage unveränderlich. Unsichtbar. |
| `mypeak_photos` (IndexedDB) | Enthält die Fortschrittsfotos der Nutzer. |
| `mypeak:darkmode`, `mypeak:subscription` | Interne Event-Namen. |
| localStorage-Keys | Sonst Datenverlust bei bestehenden Nutzern. |
| RevenueCat-Projekt, AdMob „MyPeak GDPR", iOS-Profil „MyPeak AppStore", GitHub-Repo | Fremdsystem-Namen, hängen an der Bundle-ID, nicht am Markennamen. |

**Freundescode:** Präfix `MP-` → **`FR-`**. Bestehende `MP-`-Codes funktionieren weiter
(Lookup ist exakt), nur neue Codes bekommen `FR-`.

**Neues Logo (30.07.2026):** Schwarzes Icon, durchgehender goldener Kreisrahmen **ohne Füllung**,
darin drei gleich große Felder (Y-förmige Trennlinien). Je Feld ein Symbol: **Hantel oben, Buch
rechts, Apfel links** — alles in Gold `#fbbf24`. Die Symbole sind **1:1 die Lucide-Pfade**, die
`src/components/BottomNav.jsx` importiert (`Dumbbell`, `BookOpen`, `Apple`, lucide-react v1.14.0).
⚠️ **Nicht nachzeichnen oder ersetzen** — bei einem lucide-Update die Pfade erneut aus
`node_modules/lucide-react/dist/esm/icons/*.mjs` übernehmen, in `public/favicon.svg` **und** in
`FullRepLogo.jsx`. Der alte Zigzag-Pfeil ist weg.

**Icon-Pipeline:** Einzige Quelle ist `public/favicon.svg`, Renderer ist **`scripts/render-icons.py`**
(Headless-Chromium + Pillow). Erzeugt 47 Dateien: 2 Web-Icons, 18 Android-Icons (6 Dichten ×
launcher/round/foreground), 1 iOS-Icon (1024, **ohne Alpha** — Apple lehnt Alpha ab), 26
Splash-Screens. Logo-Wechsel = `favicon.svg` tauschen + `python3 scripts/render-icons.py`.
`ic_launcher_background.png` bleibt unberührt. (Nebenbei gefixt: die Splashes hatten weiße Ecken
um das Icon.)

**In-App-Logo:** `FullRepLogo.jsx` exportiert zusätzlich `LogoParts` (Speichen + Symbole), das der
`SplashScreen` mitbenutzt. Pull-to-Refresh animiert über `.ptr-circle-animate` (Kreis zeichnen,
`stroke-dasharray: 1106` = Umfang bei r=176) und `.ptr-parts-animate` (Rest einblenden); der Splash
nutzt `.splash-circle` / `.splash-parts`. Die alten Klassen `ptr-line-animate`, `ptr-arrow-animate`,
`splash-line`, `splash-arrow` samt `draw-line`/`draw-arrow`-Keyframes sind entfernt.

**⚠️ NOCH OFFEN:**
1. ~~Logo-Redesign~~ — **erledigt**, siehe „Neues Logo" oben.
2. **Register-Check FullRep** — EUIPO/DPMA/Patentamt AT, Klassen 9, 25, 41, 44; Domain `.app`/`.com`.
3. **Domain-Umzug** — danach `my-peak.vercel.app` → neue Domain, dazu Supabase-Redirect-URLs (Login-Bestätigung, Passwort-Reset), RevenueCat-Webhook-URL, OG-Tags, Store-URLs.
4. **Store-Anzeigename**: Play **erledigt** (30.07. per API); App Store Connect offen.
   Bundle-IDs bleiben in beiden Fällen.
5. ~~Store-Screenshots~~ — Android **erledigt** (live in de-DE); iOS/iPad liegen fertig in
   `store-assets/`, gehen mit dem nächsten Build hoch. Siehe eigenen Abschnitt oben.

### Zahlungsanbieter (RevenueCat) + Freemium/Werbung + Coach-Ausbau (17.07.2026) — CODE LIVE, Live-Zahlung OFFEN
- **RevenueCat angebunden (PR #13, in `main`, deployt):** echtes bezahltes Premium **3,99 €/Monat**, Web sofort (RevenueCat Web Billing/Stripe), iOS/Android später über dieselbe Schicht.
  - **Sicherheit zuerst:** Migration `20260717100000_subscriptions_server_only.sql` entzieht dem Client INSERT/UPDATE auf `subscriptions` (nur noch SELECT). Abo-Status wird **ausschließlich serverseitig** gesetzt: Trial via `api/start-trial.js`, bezahltes Premium via `api/revenuecat-webhook.js` (Secret-Verifikation, Event→`premium_until`, Service-Role). **Migration in Prod eingespielt (17.07.).**
  - **Client:** `src/lib/revenuecat.js` (plattformabh. lazy: `@revenuecat/purchases-js` Web / `@revenuecat/purchases-capacitor` nativ; ohne Key inaktiv → „bald verfügbar"). `subscriptionStorage.purchasePremium/restorePurchases/getPremiumPriceString`. PaywallPage: 3,99 €, Live-Store-Preis, Restore-Link. `app_user_id = Supabase-user_id`.
  - **Playbook:** `docs/revenuecat-setup.md`. **Vercel-Env gesetzt (17.07.):** `REVENUECAT_WEBHOOK_SECRET`, `VITE_REVENUECAT_WEB_API_KEY` (aktuell **Sandbox-Key** `rcb_sb_…`). Optional später `VITE_REVENUECAT_IOS_KEY`/`VITE_REVENUECAT_ANDROID_KEY`.
  - **RevenueCat-Konto eingerichtet:** Entitlement `premium`, Produkt `mypeak_premium_montly` (3,99 €, auto-renew monthly) am `premium` + im Default-Offering (Monthly-Package). Webhook „MyPeak Supabase" → `/api/revenuecat-webhook`, Environment „Both".
  - **✅ End-to-end im SANDBOX verifiziert** (17.07.): Checkout → Stripe-Testkarte → „Payment complete" → Webhook setzte `premium_until` → Premium aktiv. Die ganze Kette funktioniert.
  - **⚠️ OFFEN — Live-Schaltung:** RevenueCat Billing ist mit einem **Stripe-SANDBOX**-Konto verbunden (nicht dem Live-Konto) → nur Sandbox-Key, **keine echten Zahlungen**. Das Live-Stripe-Konto (`my-peak.vercel.app`) ist aktiv, aber RevenueCat bietet keinen einfachen In-Place-Wechsel. **Weg zum Go-Live:** RevenueCat-Billing-App löschen → neu anlegen und dabei das **Live-Stripe-Konto** verbinden (im Live-Kontext) → Produkt/Entitlement/Offering neu → Produktions-`rcb_`-Key holen → in Vercel als `VITE_REVENUECAT_WEB_API_KEY` eintauschen + redeploy. Solange App voll funktionsfähig, nur ohne echte Zahlung.
- **Freemium fertig — Premium = werbefrei (PR #14):** Gratis-Version behält AdMob-Interstitials (nach Workout-Speichern & Mahlzeit, nur nativ, mit Einwilligung). `ads.js` `setAdsPremiumStatus()` + Early-Return in `maybeShowInterstitial()`, gekoppelt an `access.isPremium` im SubscriptionContext → Premium (Trial ODER bezahlt) sieht keine Werbung.
- **Coach-Wissensbasis stark ausgebaut (PRs #11/#12):** `api/_coachKnowledge.js` jetzt **39 Einträge** — 21 Supplemente, 17 Blutwert-Marker (grobe Einordnung + Arzt-Verweis), 1 Kombinationen-Block; Retrieval injiziert die passenden 2–3 in den Prompt (kein Live-Web). Monats-Refresh-Playbook `docs/coach-knowledge-refresh.md`. **Cron-Routine konnte NICHT angelegt werden** (MCP-Freigabe scheiterte wiederholt) → **manueller Fallback:** auf Zuruf „aktualisiere die Coach-Wissensbasis" macht Claude den Studien-Lauf + PR.
- **Migrationen in Prod eingespielt (17.07.):** `subscriptions`, `coach_usage`, `subscriptions_server_only`. (Frühere: `workout_type`, `user_achievements` bereits davor.)

### Monetarisierung / Premium-Setup (19.07.2026) — Aufsetzen, Builds folgen später
- **Web-Kauf geparkt (live, Commit b380b1e):** `PaywallPage.jsx` → `PURCHASE_ENABLED = { ios:false, android:false, web:false }`, `canPurchase = PURCHASE_ENABLED[Capacitor.getPlatform()]`. Aktuell zeigt die Paywall ÜBERALL nur die Gratis-Testphase (kein Kauf/Preis/Restore) — Web-Billing hing nur an Stripe-Sandbox, so läuft niemand in einen Sandbox-Checkout. Je Store mit `PURCHASE_ENABLED.<platform>=true` freischaltbar. **iOS/Android-Käufe laufen über Apple IAP bzw. Google Play Billing — NICHT Stripe** (das ist nur der Web-Weg).
- **AdMob-DSGVO veröffentlicht:** eigene UMP-Einwilligungsnachricht „MyPeak GDPR" für iOS+Android (Consent + Optionen-verwalten, Datenschutz-URL /legal/privacy). Offen: AdMob-App↔Store verknüpfen nach Launch.
- **iOS-Abo fertig aufgesetzt:** ASC-Abo `mypeak_premium_monthly` (3,99 €/Monat, alle Territorien, DE/EN) per API angelegt (Status Missing-Metadata, fehlt nur Review-Screenshot → kommt mit dem Build). **RevenueCat iOS komplett:** App verbunden (In-App-Purchase-Key gültig), Produkt → `premium`-Entitlement → Monthly-Package. iOS-SDK-Key als `VITE_REVENUECAT_IOS_KEY` in lokaler `.env` (gitignored; nativer Build liest .env). Apple „Paid Apps"-Vertrag + N26-Bank aktiv.
- **Android-Abo aufgesetzt:** Play-Zahlungsprofil (Österreich, Organisation) verknüpft + N26-Bank hinterlegt („Bestätigung steht aus", normal). ⚠️ Hier stand „3,99 €" — **überholt**, am 14.08. per `--abos` am Endpunkt gemessen (siehe unten).
- **⚠️ Steuer/KU:** Josef ist **Kleinunternehmer (AT)**. EU-B2C: Apple/Google = deemed supplier, führen Endkunden-USt ab → KU ändert 3,99-€-Preis nicht. **TODO: Apple Small Business Program anmelden** (30%→15%, vor echten Verkäufen); Google-Abos eh 15 %.
- **NOCH OFFEN (nach den laufenden Store-Prüfungen, in einem Rutsch):** RevenueCat-Android (Google-Cloud-Service-Account + Play-API + `goog_`-Key), Play-Produkt ans Entitlement/Offering, `VITE_REVENUECAT_ANDROID_KEY`, `PURCHASE_ENABLED.*=true`, ASC-Abo-Review-Screenshot, **Weg-A-Build iOS+Android** (neuer Build ersetzt jeweils die laufende Einreichung → erst nach deren Freigabe), Sandbox-/Lizenz-Tester-Kauf testen.

### App-Store-Status (18.07.2026) — beide Stores mit Version 1.1 eingereicht (Weg B)
- **Weg B umgesetzt:** neuer Build aus aktuellem `main`, aber **Kauf-Button auf iOS ausgeblendet** (`PaywallPage.jsx`: `isIOSNative = Capacitor.getPlatform()==='ios'` → auf iOS kein Kauf/Restore/Preis, nur gratis 7-Tage-Trial). Umgeht Apples IAP-Pflicht (3.1.1), bis iOS-IAP eingerichtet ist. Web/Android unverändert. RevenueCat-Capacitor-Plugin per `cap sync` nativ registriert (Android `capacitor.*.gradle`, iOS `Package.swift`/`Package.resolved`).
- **Versionen:** Android `versionName 1.1 / versionCode 2`; iOS `MARKETING_VERSION 1.0 / Build 3` (Build 1 abgelehnt, Build 2 verworfen).
- **iOS EINGEREICHT:** Build 3 per altool zu ASC hochgeladen, Version 1.0 zugewiesen, neue Review-Submission → `WAITING_FOR_REVIEW`. Prüf-Notiz (appStoreReviewDetail) gegen 4.3(a) gesetzt + „no in-app purchases". Alte abgelehnte Submission storniert.
- **Android AUSGEROLLT:** `.aab` (versionCode 2) per Google-Play-API in Produktion `completed` → in Google-Prüfung. Service-Account `play-upload@wellbooked-501311` hat jetzt FullRep-Rechte.
- **Light-Mode-Screenshots neu** (Playwright gegen lokale Dev-App, Review-Account, frische Demo-Daten): 6 Screens je iPhone 6,9″/iPad 12,9″/Android in `store-assets/`. **Android-Phone-Screenshots per Play-API hochgeladen (de-DE)**; iOS+iPad abgelegt fürs nächste Update (laufende Prüfung nicht anfassen).
- **⚠️ Noch offen (nach bestandener iOS-Prüfung): iOS-IAP / echtes bezahltes iOS-Premium (Weg A)** — ASC-Abo-Produkt + „Paid Apps"-Vertrag/Bankdaten (nur User), RevenueCat-iOS-Key, `VITE_REVENUECAT_IOS_KEY`, iOS-Kauf-Guard wieder entfernen, neuer Build. RevenueCat hängt noch an Stripe-Sandbox (keine echten Zahlungen).

### App-Store-Status (17.07.2026) — iOS abgelehnt, Antwort unbeantwortet
- **iOS 1.0 weiterhin „Abgelehnt" (4.3.0 Design: Spam).** Josefs Klarstellung vom 12.07. **hat Apple in 5 Tagen NICHT beantwortet** → Thread steht still, Warten bringt nichts.
- **Empfohlener Weg: neuer, verbesserter Build** — die App ist seit der Ablehnung massiv gewachsen (KI-Coach + eigene Wissens-DB, Freemium-Abo, Wissensbibliothek) → entkräftet „Spam" direkt.
- **⚠️ Neuer Build hat jetzt bezahltes Abo → Apple verlangt iOS In-App-Purchase** (nicht Web/Stripe). iOS-IAP ist noch NICHT eingerichtet. Zwei Wege besprochen: **(A)** iOS-IAP über RevenueCat (App-Store-Connect-Abo + RC-iOS-Key + `cap sync`) sauber einrichten, dann einreichen; **(B) empfohlen zuerst:** Kauf-Button auf iOS ausblenden, nur Trial, erst die Gratis-App durch 4.3(a) bringen, IAP/Premium im Update 1.1 nachliefern. Vor Upload: Versionsnummern hoch, **Light-Mode-Screenshots**, `npx cap sync`, Archive+Upload. Noch nicht begonnen.

### KI-Coach + Foto-Erkennung: Doppelausfall behoben (31.08.2026)

Josefs Meldung „der Coach beantwortet keine Fragen" hatte ZWEI Ursachen
übereinander — beide behoben, beide gegen die Live-API gemessen:

1. **Google hat `gemini-2.0-flash` abgeschaltet (404).** Damit waren Coach
   UND Essens-Foto-Erkennung gleichzeitig tot; ohne `ANTHROPIC_API_KEY` als
   Rückfall blieb nur „nicht erreichbar". ⚠ Der naheliegende Ersatz
   `gemini-2.5-flash` stand zwar in ListModels, generateContent darauf
   meldete aber „no longer available to new users … use gemini-3.6-flash".
   **Modellnamen nie raten:** `/api/gemini-modelle` (login-geschützt) listet
   die Modelle des echten Schlüssels; `?probe=<name>` schickt ein Mini-
   generateContent, `?probe=<name>&art=coach` die exakte Coach-Anfrageform.
   Erst nach Probe-200 wird ein Name eingetragen. Beide Endpunkte
   (`coach.js`, `analyze-meal.js`) müssen denselben Namen tragen.
2. **Die NATIVE App hat `/api` nie erreicht.** Alle Client-Aufrufe waren
   relativ (`fetch('/api/…')`) — im Browser trifft das dieselbe Domain, in
   der App ist die Herkunft `capacitor://localhost`, dort gibt es kein
   `/api`. Betroffen: Coach, Foto-Erkennung, Testphase-Start und die
   Apple-PFLICHT-Funktion Konto-Löschung. **Regel fürs ganze Repo:**
   `/api`-Aufrufe laufen über `API_BASIS` (`src/data/apiBasis.js` — nativ
   absolut, Web relativ), und jeder `api/`-Handler beginnt mit
   `corsBehandeln()` (`api/_cors.js`, nur die App-Herkünfte, nicht `*`).
   Ohne CORS bricht der OPTIONS-Preflight mit 405 ab, obwohl curl geht.
   Der Client-Teil erreicht die Geräte erst mit Build ≥ 1.3.1.

Dazu: Coach-Verlauf liegt jetzt pro Nutzer in localStorage (letzte 60,
Initializer statt Effect, Papierkorb im Kopf) — vorher war er beim Verlassen
der Seite weg. Bewusst NICHT in Supabase: Gesundheitsdaten, kein Sync nötig,
kein neuer Datenschutz-Absatz. `coach.js` hat jetzt wie `analyze-meal.js`
`maxDuration: 30` (Vercel-Standard sind 10 s).

⚠ **Testkonten:** `appreview@wellbooked.at` hat KEIN Premium (bewusst, s. o.)
— es taugt zum Prüfen von Auth/Gate (403 ist dort korrekt), nicht für den
Coach-Volltest. Sein unverbrauchter Trial gehört Apple: nie `start-trial`
damit auslösen. Für Diagnose wurde `coach-diagnose-claude@wellbooked.at`
angelegt (unbestätigt, kann im Supabase-Dashboard gelöscht werden).

### KI-Coach (Premium-Feature) — IN ARBEIT (16.07.2026, Branch claude/github-connection-check-v5zzpl)
- **Chat-Coach für Training/Ernährung/Supplemente + grobe Blutwerte-Einordnung** (mit Arzt-Verweis, keine Diagnose/Therapie), hinter Premium-Gate (`requirePremium('ki_coach')`). Läuft ab Tag 1 mit **Gemini 2.0 Flash** (schon konfiguriert, kostenlos); ist `ANTHROPIC_API_KEY` gesetzt, werden **Claude gestuft** eingesetzt (Haiku einfach / Sonnet komplex, Länge-Heuristik) mit Gemini als Fallback — ohne Code-Änderung.
- **`api/coach.js` (Vercel):** fail-closed Auth (Token→user), **Premium/Trial-Check** (liest `subscriptions` per Service-Role), **serverseitiges Tageskontingent** (`coach_usage`, Trial 5/Tag, Premium 30/Tag), Themen-System-Prompt (Training/Ernährung/Supplemente + grobe Blutwerte-Einordnung; keine Diagnosen/Therapien/Dosierungen, Blutwerte immer mit Arzt-Verweis), Verlauf auf 12 Nachrichten gekappt, AbortSignal-Timeouts. Zähler wird NUR serverseitig (Service-Role) hochgezählt.
- **`src/pages/CoachPage.jsx`:** Chat-UI (eigene Route `/coach`, ohne Bottom-Nav), Rest-Kontingent-Anzeige, gesperrter Zustand mit Paywall-CTA für Nicht-Premium, Fehler-/Limit-Handling. `src/data/coachStorage.js`: `askCoach()` + `getCoachUsageToday()`. Einstieg: goldene „KI-Coach"-Karte in LibraryPage (gegated).
- **⚠️ Neue Migration NOCH NICHT in Prod:** `20260716140000_coach_usage.sql`. **Braucht in Vercel:** `SUPABASE_SERVICE_ROLE_KEY` (Kontingent/Sub-Check), `GEMINI_API_KEY` (vorhanden); optional `ANTHROPIC_API_KEY` für Claude-Stufen. Setzt außerdem die `subscriptions`-Tabelle voraus (Abo-Migration).
- **OFFEN:** Zahlungsanbieter noch nicht angebunden → bezahltes Premium wird noch nicht gesetzt; aktuell ist der Coach nur im **Trial** (kostenlos, 7 Tage) tatsächlich nutzbar. Limits/Preise sind Konstanten (leicht anpassbar).

### Abo/Premium-Fundament (provider-agnostisch) — IN ARBEIT (16.07.2026, Branch claude/github-connection-check-v5zzpl)
- **Provider-unabhängige Basis gebaut, noch KEIN Zahlungsanbieter angebunden.** Ziel: erst das Gerüst, RevenueCat/Stripe später einstecken.
- **`src/context/SubscriptionContext.jsx`:** `useSubscription()` liefert `isPremium`, `isTrial`, `trialDaysLeft`, `hadTrial`, `startTrial()`, `requirePremium(reason)` (öffnet Paywall + gibt false zurück, wenn kein Premium → Feature-Gate), `openPaywall()`. Rendert die Paywall global. Gemountet in main.jsx **innerhalb** von AuthProvider.
- **`src/data/subscriptionStorage.js`:** localStorage-first + Supabase, Gast-tauglich. `computeAccess(sub)` leitet isPremium aus Trial (7 Tage) ODER bezahltem Premium ab. `startTrial()` (einmalig), `purchasePremium()` = **Platzhalter** (gibt `provider_not_configured` zurück). `TRIAL_DAYS=7`.
- **`src/pages/PaywallPage.jsx`:** präsentationale Paywall (Props-gesteuert, kein Zirkelimport), Gold-Design, DE/EN, Benefit-Liste, Preis-Karte (`PRICE`-Konstante = Platzhalter 4,99 €/Monat), CTA „7 Tage kostenlos testen" (Trial) bzw. „Premium freischalten" (→ Platzhalter-Toast).
- **Profil-Karte „FullRep Premium"** (ProfilePage) zeigt Trial-Status bzw. öffnet die Paywall.
- **⚠️ Neue Migration NOCH NICHT in Prod:** `20260716120000_subscriptions.sql` (`subscriptions`-Tabelle + RLS). **SICHERHEIT:** Bezahltes Premium muss später serverseitig gesetzt werden (Webhook mit Service-Role); der aktuelle Client schreibt nur den kostenlosen Trial-Status. Update-RLS vor echtem Zahlungs-Go-Live entsprechend härten.
- **OFFENE ENTSCHEIDUNGEN (User):** (1) Zahlungsanbieter — Empfehlung **RevenueCat** (iOS IAP + Google Play Billing + Web, Capacitor-Plugin); Apple/Google verbieten Stripe für digitale Abos in-app. (2) Was JETZT gaten — Vorschlag: bestehende KI-Mahlzeit-Foto-Erkennung. Noch NICHTS tatsächlich gesperrt (nur Gerüst + Paywall).

### Wissensbibliothek KOMPLETT: alle 4 Blöcke live (15.07.2026, Branch claude/github-connection-check-v5zzpl)
- **Generischer Reader `src/pages/library/KnowledgePage.jsx`:** datengetriebener E-Book-Reader (Liste → Kurzfassung mit Summary+Quick-Facts → aufklappbare Kapitel), wiederverwendbar für alle Blöcke. Props: `data`, `titleDE/EN`, `categories`, `disclaimer` ('general'|'medical'|null). Quick-Facts flexibel als Array `{label,text}`. Gleiches Muster wie PeptidesPage, aber ohne Aktion.
- **Alle 4 Wissensblöcke fertig (DE+EN, mit Studien), je 6 Themen, zusammen 110 Kapitel, strukturvalidiert:**
  - **Training** (`trainingKnowledge.js`, `disclaimer=general`): Progressive Überlastung, Volumen & Frequenz, Wie Muskeln wachsen, Regeneration & Übertraining, Technik & ROM, Periodisierung.
  - **Ernährung** (`nutritionKnowledge.js`, `general`): Energiebilanz, Protein, Kohlenhydrate, Fette, Mikronährstoffe, Mahlzeiten-Timing.
  - **Supplemente** (`supplementsKnowledge.js`, `medical`): Kreatin, Proteinpulver, Koffein, Omega-3, Vitamin D, Magnesium.
  - **Blutwerte** (`bloodworkKnowledge.js`, `medical`): Testosteron, Vitamin D (25-OH), Eisen & Ferritin, Cholesterin, Blutzucker/HbA1c, Schilddrüse (TSH).
- **Verdrahtung:** je ein dünner Wrapper (`{Training,Nutrition,Supplements,Bloodwork}KnowledgePage.jsx`) lazy in LibraryPage; alle als `ready`-Karten. Je eigener Bundle-Chunk (~50–60 KB, nur bei Öffnen geladen). i18n-Keys existierten bereits.
- **Damit ist Phase 4 (Wissensbibliothek) inhaltlich abgeschlossen** — Peptide + Diäten waren schon fertig, jetzt auch die 4 Kern-Blöcke.

### Bug-Fix-Runde (15.07.2026, Branch claude/github-connection-check-v5zzpl)
Systematischer Bug-Hunt (Lint + 4 parallele Code-Audits über Storage, Training, Ernährung/KI, Auth). **17 echte Bugs gefixt**, jeder im Code verifiziert. Kein Feature-Umbau.
- **Crash-Bugs (Lint):** `i18n` außerhalb Scope in `WorkoutHistory` (EditWorkoutModal) + `DailyOverview` (GoalEditorModal) → Crash beim Bearbeiten; `PlanDetail` rief Hooks nach früher Rückgabe → Rules-of-Hooks.
- **Training:** PR-Erkennung war faktisch **tot** (saveWorkout schrieb synchron VOR dem PR-Check → eigener Satz war schon der Rekord) — Rekorde jetzt vor dem Speichern lesen. XP-Verlust durch parallele read-modify-write auf `total_xp` → Vergaben seriell. **Cardio/HIIT/Circuit/Kampfsport zählen jetzt für Streak & XP** (neuer Helfer `awardWorkoutCompletion` in socialStorage) — vorher gab NUR Kraft XP/Streak. WakeLock wird nach Tab-Wechsel neu angefordert (visibilitychange in `timerEffects.js`).
- **Privacy/DSGVO:** Fortschritts-/Körperfotos (IndexedDB) wurden beim Logout/Konto-Wechsel NIE gelöscht → fremde Fotos für den nächsten Nutzer. Neu `clearAllLocalPhotos()` (exercisePhotos.js), aufgerufen bei Logout (AuthContext) + Konto-Löschung (ProfilePage).
- **Auth:** Auth-Listener wurde im Gastmodus nie registriert → nach Gast→Konto-Login hing die UI ohne Reload. Listener jetzt immer aktiv (im Gastmodus gegen Überschreiben geschützt).
- **Sync/Daten:** `getCustomExercises`-Refresh verwarf ungesyncte lokale Übungen → jetzt localOnly-Merge. `removeWaterAmount` desyncte total/entries → total wird neu aus entries berechnet. `fiber`-Ziel fehlte im nutrition_goals-Upsert. Cross-Device **Dark Mode** wurde nie angewendet (`setDarkModeValue` tot) → loadSettings feuert `mypeak:darkmode`-Event, ThemeContext hört zu. DST-Kante bei Streak-„gestern" (fixe 24h → tagesmittige Berechnung).
- **KI-Endpoint (`api/analyze-meal.js`):** Auth war **fail-open** bei fehlender Config → jetzt fail-closed (503). Server-Timeouts (AbortSignal) auf Auth- + Gemini-Fetch. Netzwerkfehler wird nicht mehr fälschlich als „429 Rate-Limit" gemeldet (503 `ai_unavailable`).
- **⚠️ Zwei NEUE Migrationen NOCH NICHT in Prod:** `20260712200000_user_achievements.sql` (bereits offen) **und neu** `20260715120000_workout_type.sql` (`type`-Spalte in `workouts`). Letztere **vor/mit dem Deploy einspielen** — der Code schreibt `type` in den Insert; ohne Spalte scheitert der Cloud-Insert (lokal bleibt das Workout dank localStorage-first erhalten). Cardio-Historie/PRs waren ohne die Spalte nach Sync kaputt.
- **Bewusst offen gelassen:** OFF-0-kcal-Filter (Entfernen brächte Suchrauschen), Portion-Label „60 Stück" (UX-Entscheidung), redundanter Kamera-Stream im Scanner (ohne Gerätetest zu riskant).

### Foto-Icons in allen Tabs + Kalender + Pull-to-Refresh (14.07.2026, abends) — LIVE
- **Foto-Icons überall:** 9 weitere freigestellte Motive in `public/bg-photos/` (`plan`, `history`, `cardio`, `hiit`, `circuit`, `martial`, `peptide`, `photos`, `profile`) — Training (Pläne, Verlauf, Kraft, Cardio, HIIT, Zirkel, Kampfsport), Bibliothek (Diäten=weight, Peptide), Profil (Nutzer-Karte, Fortschrittsfotos), Ernährung (Makros=flame, Wasser=drop, Supplements=supplement). `CardPhotoMotif` liegt jetzt in `src/components/`; **`CardMotif` (Lucide) ist gelöscht**. Freistell-Skript: Flood-Fill vom Rand; Modus `key` für Motive mit Loch (Pfeilring), Modus `multi` für mehrteilige (Profil: Kopf + Bogen); danach Kleinteil-Filter gegen das Gemini-Wasserzeichen. **Beide Ebenen sind Foto** — Eck-Wasserzeichen *und* kleines Symbol am Label (letzteres sitzt weiter im farbigen Kästchen). Ausnahmen bewusst flach: das „+" beim freien Workout (Aktion, kein Thema) und die 3 Social-Kacheln (kein Motiv vorhanden). `BoxingGlovesIcon`-SVG entfernt (durch Foto ersetzt).
- **Icon-Größe erledigt (15.07.2026):** alle 14 Karten-Icons in `public/bg-photos/*-icon.png` von zusammen ~3,3 MB auf ~183 KB verkleinert (max 256 px = 3×-Retina der w-24-Anzeige, 256-Farben-Palette-Quantisierung mit Alpha, Pillow). Sichtbar identisch. Skalier-Snippet ad hoc, nicht als Skript abgelegt.
- **Social-Kacheln erledigt (15.07.2026):** Ranking/Challenges/Freunde auf TrainingPage nutzen jetzt freigestellte Gemini-Foto-Motive (`public/bg-photos/{rank,challenge,friends}-icon.png`) statt Lucide (Medal/Swords/Users, aus dem Import entfernt) — kleines Label-Icon + faintes Eck-Wasserzeichen via `CardPhotoMotif`. `QuickAction` hat dafür einen optionalen `motif`-Prop + `relative` bekommen. Freistellen: Sättigungs-Flood-Fill vom Rand (entfernt grauen Hintergrund, Bodenschatten UND Gemini-Wasserzeichen in einem) + Kleinteil-Filter, auf 256 px skaliert, Palette-quantisiert (je 11–20 KB).
- **`user_achievements`-Migration (20260712200000) ist jetzt idempotent** (DROP POLICY IF EXISTS vor jedem CREATE) — gefahrlos per `supabase db push --linked` ODER Copy-Paste im Supabase SQL Editor. **Noch NICHT in Prod eingespielt.**
- **DiamondCalendar flüssig:** folgt beim Wischen kontinuierlich dem Finger (Größe/Position/Deckkraft werden für gebrochene Abstände interpoliert, Snap beim Loslassen, Pfeile/Taps gleiten). Läuft rein über `transform`/`opacity`; vertikales Wischen bleibt Scrollen (`touchAction: pan-y` + Achsen-Lock), damit Pull-to-Refresh über dem Kalender funktioniert.
- **Pull-to-Refresh ohne weißen Blitz:** kein `window.location.reload()` mehr — stattdessen `refreshKey` (`src/components/pullToRefreshContext.js`), an dem der Routen-Baum hängt (`AppRoutes` in App.jsx) + `refreshProfile()`; dazu ein Zieh-Indikator. **Achtung CSS-Falle:** Die Grundfarbe sitzt auf `html`, `body` MUSS transparent bleiben — ein eigener body-Hintergrund unterbindet die Weitergabe ans Canvas und verdeckt den `BackgroundLayer` (fixed, `-z-10`), die Hintergrundmotive verschwinden dann (Bug war live, gefixt).

### Home-Foto-Icons + Peak-Programme-Überarbeitung (14.07.2026) — LIVE (mobile Session)
- **Home-Karten-Icons:** 5 freigestellte Foto-Motive (Gemini-generiert, Wasserzeichen/Hintergrund entfernt, transparente PNGs in `public/bg-photos/{flame,drop,supplement,training,weight}-icon.png`) ersetzen die Lucide-Label-Icons auf HomePage — je Karte klein am Label **und** groß+schwach als Eck-Wasserzeichen. `CardMotif` (flaches Lucide-Symbol) → **`CardPhotoMotif`** (Foto). Freistellen erfolgte per Pillow/NumPy (Flood-Fill vom Rand für metallische Motive wie Hantel/Waage, sonst Sättigungs-Keying). Betrifft `src/pages/HomePage.jsx`. (Alte `water-card.jpg`/`calories-card.png` entfernt.)
- **Peak-Programme „Starten" gefixt:** Der Button funktionierte, gab aber KEIN Feedback (routete stumm auf Home zurück). Neu: generischer **`src/components/Toast.jsx`** (Erfolg/Fehler, Vorbild AchievementToast), `user?.id`-Gast-Guard + `.catch` in `PeakPrograms.jsx`, Erfolgs-Toast auf TrainingPage.
- **Peak-Programme Datenmodell v2** (`src/data/peakPrograms.js`): Cardio-Tage haben jetzt **`segments`** (`warmup`/`interval`/`steady`/`cooldown` mit Zeiten/RPE) statt nur `targetDuration`; Wochen-Progression via **`weeks[]`** (Sparse-Overrides pro `sessionId`, Basiswoche = `days`); Metadaten `whyDE/EN`, `studies[]`, `progressionDE/EN`, `intensity{rpe,hrZone}`. **Dev-Validator** prüft beim Import alle Übungs-IDs, Segment-Summen und weeks-Konsistenz.
- **Wochen-Auflösung zur Lesezeit:** NEU **`src/data/programResolver.js`** (`resolveScheduledDay`/`getCurrentWeek`). Aktivierung schreibt `days._meta = {programId, startedAt, durationWeeks}` ins JSONB — **keine Migration** (alle Konsumenten indizieren `days` über DAY_KEYS). **Achtung:** vor dem 14.07. gespeicherte `weekly_schedules` haben kein `_meta` → laufen als statischer Plan ohne Wochen-Progression (Passthrough, kein Bruch).
- **Strukturierter Cardio-Runner:** NEU **`ActiveStructuredCardio.jsx`** + **`src/hooks/useSegmentTimer.js`**; Beep/Vibration/WakeLock aus `useIntervalTimer` in **`src/hooks/timerEffects.js`** extrahiert (geteilt). Speichert im ActiveCardio-Record-Shape (History/Streak/Achievements unberührt). **„Heute"-Karte** auf TrainingPage (unter dem Kalender) löst die heutige Session auf (inkl. „Woche n/m") und startet sie typgerecht (strength/hiit/martial/cardio).
- **Programm-Verwaltung:** **„Programm beenden"** (nicht-destruktiv, `deactivateAllSchedules` in workoutStorage — Plan bleibt in „Meine Pläne"); **Ersetzen-Bestätigung** beim Start, wenn schon ein Programm aktiv ist (kein stilles Überschreiben). „Heute"-Karte zeigt auch Ruhetage.
- **21 Programme evidenzbasiert neu** (DE+EN, je „Warum dieser Plan?" + Studien + Progressions-Regel): Cardio komplett neu (Couch-to-5K 9 Wo, Norwegisches 4×4, 10-20-30, Zone-2, 10K mit Taper), HIIT mit Runden-Progression (Tabata, Gibala 60/75, 30/30, 40/15, EMOM), Kraft + Kampfsport angereichert. Zone-2 „Dauerbelastung" → „Lockeres Tempo" + Sprechtempo-Hinweis, Aktivität (Laufen/Radfahren) sichtbar.
- **Bundle:** `PeakPrograms` jetzt lazy geladen (Cookbook-Muster) → Programmdaten (~60 KB) raus aus dem Hauptbundle. `WeeklyPlanBuilder` zählt Trainingstage über DAY_KEYS (ignoriert `_meta`).

### App-Review-Status (12.07.2026) — überholt durch „App-Store-Status (17.07.2026)" oben
- **iOS 1.0 ABGELEHNT** (09.07.2026): Guideline 4.3(a) „Design – Spam" (ähnliches Binary/Konzept wie andere Entwickler — vermutlich Capacitor-Gerüst-Ähnlichkeit mit den anderen Apps des Kontos). **Antwort an App Review gesendet (12.07.2026)** — **Update 17.07.: Apple hat in 5 Tagen nicht geantwortet; Plan = neuer Build (siehe oben), nicht weiter warten.** KEIN Code-Problem.
- Android: weiterhin in Google-Prüfung.

### Verbesserungs-Runde (12.07.2026, Branch improvements-juli)
- **Bug-Fixes:** XP/Streak-System verdrahtet (Workout-Ende vergibt jetzt XP + Streak via `updateStreak`, Level-Up-Animation eingebunden — war vorher komplett tot); verschachtelte Buttons auf HomePage/Cookbook/PeakPrograms; Logout synct lokale Daten vor dem Löschen; `deleteNutritionEntry` mit Guest-Guard + Pending-Delete-Nachholliste; Ziel 0 wird nicht mehr zu Default überschrieben (parseFloat); Dashboard-Race-Guard; Scanner unterscheidet Berechtigung-verweigert/keine-Kamera; Sprach-Erkennung überall auf `i18n.language` umgestellt (statt `t('common.back')==='Zurück'`).
- **peakPrograms.js bereinigt:** 28 kaputte Übungs-IDs auf echte exercises.js-IDs gemappt, 9 neue Übungen ergänzt (jump-lunges, plank-jacks, jab-cross, hooks, uppercuts, footwork-drills, front-kick, knee-strikes, elbow-strikes); `getExerciseById` warnt im Dev-Mode bei unbekannter ID. Achtung: bereits gespeicherte weekly_schedules behalten alte ID-Kopien.
- **Hintergrundmotive:** dezente SVG-Line-Art pro Tab (`src/components/BackgroundLayer.jsx` + `backgrounds/motifs.jsx`), gemountet in AppShell VOR PullToRefresh (dessen Transform würde position:fixed brechen). Berg/Hantel/Teller/Buch/Silhouette, Opacity ~5%, Maske läuft nach unten aus.
- **Übungs-Demos:** 179 Übungen mit Foto-Demos aus free-exercise-db (Public Domain, github.com/yuhonas/free-exercise-db). Mapping in `src/data/exerciseDemos.js` (kuratiert!), Bilder in `public/exercise-demos/<dbId>/{0,1}.jpg` (480px, 8,6 MB, offline). `ExerciseDemoImage` = Crossfade Start-/Endposition; Einstiege: Tap in Übungsbibliothek → `ExerciseDetailSheet` (+ „Demo"-Badge), PlayCircle-Button im ActiveWorkout → `ExerciseDemoModal`. Übungen ohne Mapping zeigen kein Badge (Fallback). Ein 3D-Ansatz (three.js) wurde erprobt und VERWORFEN — nicht wieder einführen.

### Differenzierungs-Paket (12.07.2026, abends) — Etappen 0–3 LIVE
- **Hintergrund-Mix:** Fotos (Pexels, goldgetönt/grayscale) für Training + Ernährung, Line-Art für Home/Bibliothek/Profil (`BackgroundLayer.jsx`, `public/bg-photos/`).
- **Muskel-Heatmap** (TrainingPage): `MuscleBodyMap.jsx` = stilisierte Körper-Silhouette Front+Back, **geschlechtsabhängig** (Profil-gender male/female), 10 einfärbbare Regionen, 5 Gold-Stufen nach Sätzen/Woche (0/1–4/5–9/10–14/15+); `useMuscleHeatmap.js` aggregiert ISO-Woche (Sätze + Volumen kg via toKg, Cardio ausgenommen); Tap auf Muskel → Übungs-Details.
- **Erfolge & Abzeichen:** 23 Badges in 8 Familien (`src/data/achievements.js`, checkAchievements-Engine mit Backfill, idempotent), `user_achievements`-Tabelle (JSONB+RLS, **Migration 20260712200000 — muss noch mit `supabase db push --linked` in Prod!**), localStorage-first (`achievementStorage.js`), Unlock-Toast + Galerie im Profil mit Fortschrittsbalken. **NEW_PR-XP (100) wird jetzt vergeben** + 50 XP je Unlock. Checks: Workout-Ende (ActiveWorkout), Gewichts-Save (HomePage), Nutrition-Save (AddFoodEntry).
- **Fortschritts-Fotos** (`/progress`, Einstieg im Profil): IndexedDB v3 Store `progress_photos` (nur lokal, Privacy-Hinweis in UI), Aufnahme + Timeline (Datum + Gewichts-Snapshot), 2 Fotos antippen → Vorher/Nachher mit Delta-Badge.
- **Etappe 4 OFFEN:** Apple Health / Health Connect (nativ) — wartet auf 4.3(a)-Klärung. Plugin-Kandidat: capacitor-health-extended (Flomentum, Cap 8); iOS braucht Entitlements + NEUES Provisioning-Profil (HealthKit-Capability in App-ID), Android Health-Connect-Permissions. Plan in ~/.claude/plans/bevor-du-das-machst-warm-planet.md.
- **Light Mode = Standard** (12.07.2026): `themeChosen`-Flag in ThemeContext — nur aktive Wahl zählt (alter Code persistierte den Default bei jedem Besuch, darkMode-Key allein sagt nichts); Flag in KEEP_ON_SIGNOUT. theme-color/manifest/capacitor.config → #f6f4f0, iOS-Statusbar `default`. **Vor Store-Update 1.1: Screenshots im Light Mode neu aufnehmen** (aktuelle Store-Assets sind dark).
- **Build-Strategie 4.3(a):** KEIN neuer iOS-Build, solange der Einspruch läuft (ersetzt sonst die Einreichung + schneidet den Review-Thread ab). Nach Apples Antwort: bei Ablehnung verbesserte Version einreichen (Verweis auf distinct content: Heatmap, Achievements, Demos, Fotos), bei Freigabe 1.1 als Update. Vor 1.1: Light-Screenshots, `npx cap sync`, Versionsnummern hochzählen.

### Store-Launch + Werbung (07.07.2026) — EINGEREICHT
- **Android:** signiertes `.aab` (versionCode 1 / 1.0) bei Google Play in Prüfung. Upload-Keystore in `android/upload-keystore.jks` + `keystore.properties` (gitignored! Backup in ~/AppSigningKeys/mypeak + OneDrive). Build: `JAVA_HOME=<Android-Studio-jbr> ./gradlew bundleRelease`.
- **iOS:** IPA bei App Store Connect eingereicht (App-ID 6788461300, Bundle at.gallab.mypeak). Manuelle Distributions-Signierung im pbxproj (Team JU8STVD4SJ, Profil „MyPeak AppStore"). Build: `xcodebuild ... archive` + `-exportArchive` (ExportOptions auf ~/Desktop/mypeak-ios-export/), Upload via `altool` (ASC-Key VGHCB8Z8Q2). Metadaten per ASC-API gesetzt.
- **Werbung (AdMob, `src/lib/ads.js`):** Interstitials (jede 2. qualifizierende Aktion, ≥90s Abstand) nach Workout-Speichern + Mahlzeit-Hinzufügen, mit DSGVO-Einwilligung (UMP, nativ in @capacitor-community/admob@8). `USE_TEST_ADS`-Flag: `false`=echte Anzeigen (Launch). Echte IDs (Konto pub-8860791993288062): Android App `~3613953701`/Interstitial `/7984478947`, iOS App `~8812263899`/Interstitial `/5028931559`. **NIE eigene Live-Anzeigen anklicken** (Kontosperre). Nur nativ — Web zeigt keine Ads.
- **Store-Assets:** `store-assets/` (Screenshots iOS+Android, iPad, Feature-Grafik, App-Icon, `store-texte.md`). Review-Demo-Account: appreview@wellbooked.at / MyPeak-Review#2026.
- **Offen nach Launch:** ~~AdMob-App↔Store verknüpfen~~ (am 29.07.2026 erledigt, siehe unten);
  iOS-Update 1.1 (Englisch) liegt auf Branch i18n-en.

### AdMob: Store-Verknüpfung + app-ads.txt (29.07.2026) — ERLEDIGT
- **Android-App in AdMob war nie mit dem Play-Eintrag verknüpft** („Details zum App-Shop" leer,
  Genehmigungsstatus „Überprüfung nötig"). Verknüpft über AdMob → App-Einstellungen → Details
  zum App-Shop → Hinzufügen, Suche mit der vollständigen **URL**
  `https://play.google.com/store/apps/details?id=at.gallab.mypeak` (die nackte Paket- oder
  App-ID findet die Suche NICHT). Am 30.07. stand der Status auf „Bestätigt / ✓ Überprüft".
- **Die Verknüpfung erklärt die null Impressionen NICHT** (frühere Fassung dieser Notiz behauptete
  das — falsch). Gegenbeweis: Mahjong Royale Android war ebenfalls unverknüpft und lieferte
  trotzdem aus (176 Impressionen in 7 Tagen). Die Verknüpfung braucht es für die
  **app-ads.txt-Zuordnung**, nicht für die Auslieferung. Wahrscheinlichere Gründe für MyPeaks
  Null, in dieser Reihenfolge zu prüfen: (a) zu wenige Nutzer lösen den Interstitial überhaupt
  aus — er kommt nur bei jeder 2. qualifizierenden Aktion mit ≥90 s Abstand und nur **nativ**;
  (b) die im Play Store veröffentlichte Fassung ist älter als der AdMob-Einbau; (c) AdMob-Genehmigung
  stand noch aus. Erst wenn Impressionen auflaufen, lohnt weitere Fehlersuche.
- **`public/app-ads.txt`** ergänzt: `google.com, pub-8860791993288062, DIRECT, f08c47fec0942fa0`.
  Ohne sie kaufen Werbetreibende, die nur bei autorisierten Verkäufern einkaufen, unser Inventar
  nicht — sichtbar nur an niedrigerem eCPM, nie als Fehlermeldung. Die Publisher-ID gilt
  **kontoweit**, dieselbe Zeile liegt bei Mahjong Royale und Swaply.
- **Wo Google sie sucht:** an der Website aus dem Play-Eintrag (`contactWebsite`, aktuell
  `https://fullrep.vercel.app`) + `/app-ads.txt`. Ändert sich die Domain im Store, muss die Datei
  mitwandern, sonst ist sie wirkungslos.
- **Achtung, SPA-Falle:** `vercel.json` hat einen Catch-all `"/(.*)" → "/index.html"`, d. h. **jeder**
  unbekannte Pfad antwortet mit `200` und HTML statt mit `404`. Für app-ads.txt ist das entschärft,
  weil Vercel-`rewrites` erst greifen, wenn keine echte Datei passt — `public/` landet in der
  Deploy-Wurzel und schlägt den Catch-all (an `favicon.svg`/`icon-192.png` verifiziert). **Eine
  Änderung an `vercel.json` war deshalb NICHT nötig.** Beim Prüfen aber nicht auf den Statuscode
  hereinfallen: `200` allein beweist nichts, es zählt `Content-Type: text/plain` plus Inhalt.
- **Prüfen:** `curl -sD- https://fullrep.vercel.app/app-ads.txt | head -3` — muss `text/plain` und
  die Zeile zeigen. Googles Bestätigung in AdMob läuft als täglicher Crawl, nicht sofort; die
  Meldung „konnte nicht bestätigt werden" direkt nach dem Verknüpfen ist normal.

### Launch-Fixes (Juli 2026, Branch launch-fixes) — FERTIG
- [x] Rechtsseiten Impressum/Datenschutz/AGB (`/legal/*`, `src/pages/legal/`) — Betreiberdaten in `legalContent.js` eingetragen (Josef Gallab, Oberhofenweg 21b, 6380 St. Johann in Tirol; kontakt@wellbooked.at).
- [x] Konto-Löschung (api/delete-account.js + Profil) — braucht `SUPABASE_SERVICE_ROLE_KEY` in Vercel
- [x] RLS-Sicherheitsmigration `supabase/migrations/20260704230000_security_fixes.sql` — muss im Supabase SQL Editor / `supabase db push --linked` ausgeführt werden!
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
- [x] Home-Button als goldener Kreis-FAB mit FullRep-Pfeil, ragt über Nav hinaus
- [x] Pull-to-Refresh: FullRep-Logo zeichnet sich neu beim Aktualisieren
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
- [x] Freunde-System: FullRep-Code (FR-NAME-XXXX), per Code hinzufügen, Anfragen annehmen/ablehnen
- [x] Leaderboard: Wöchentlich rotierende Kategorie (Volumen/Streak/Trainings), nur Freunde
- [x] Challenges: Freund herausfordern, Volumen oder Runden, Zeitraum wählbar, Live-Score
- [x] XP-System: Workout +50 XP, Challenge gewinnen +150 XP, Streak-Boni 7/14/30 Tage (+100/200/500 XP), Level-Anzeige im Profil; vergeben beim Workout-Beenden (updateStreak in ActiveWorkout), Level-Up-Animation eingebunden
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
- **Besucherzählung:** Vercel Web Analytics — **nur Web**, `src/analytics.js` (siehe unten)
- **Datenspeicherung:** Supabase (Cloud) + localStorage (Cache/Fallback)
- **Barcode-Scanner:** Quagga2 (Open Source, optimiert für 1D-Barcodes)
- **Lebensmittel-API:** Open Food Facts (kostenlos, keine API-Keys)
- **PWA:** manifest.json + Service Worker (installierbar auf Homescreen)
- **Icons:** Lucide React
- **KI-Foto-Erkennung:** Google Gemini 2.0 Flash (kostenlos, Vision API via Vercel Serverless Function)
- **Schrift:** Inter (Google Fonts)

### Besucherzählung: Vercel Web Analytics (20.09.2026)

Josef hat einen Screenshot des Vercel-Dashboards geschickt: Für `fullrep.vercel.app`
stand dort weiterhin **„Get Started"** — gezählt wurde also nie etwas. Mahjong Royale
und Anigosha hatten es längst, FullRep und Swaply nicht.

`src/analytics.js` ist die Fassung von Mahjong, samt **zwei Sperren**:

| Sperre | wozu |
|---|---|
| `Capacitor.isNativePlatform()` | Capacitor kopiert das Web-Bundle unverändert in die Store-Apps. Ohne diese Zeile sendeten iOS und Android Aufrufe an Vercel — eine neue Datenweitergabe, die dann in **beiden** Store-Datenschutzangaben stehen müsste |
| `localhost`/`127.0.0.1` | `/_vercel/insights/` gibt es nur auf einem Vercel-Deployment. Lokal wäre es eine 404-Flut in der Konsole |

**Alle drei Zweige gemessen** (Chromium gegen `vite preview`, nicht behauptet):

```
localhost              → 0 Aufrufe an /_vercel/insights
192.0.2.2 (echter Host) → 1 Aufruf  — inject() läuft an
nachgestellte iOS-WebView → Plattform „ios", 0 Aufrufe
```

⚠ **Die iOS-WebView nachzustellen ging erst im zweiten Anlauf**, und der erste Versuch
sah aus wie ein Befund: `window.Capacitor` zu setzen bringt nichts — das legt
`@capacitor/core` beim Start selbst an und überschreibt es. Die Erkennung sitzt in
`getPlatformId()` und sieht nach `window.androidBridge` bzw.
`window.webkit.messageHandlers.bridge`. Mit dem falschen Stub meldete die Probe
„Plattform web, 1 Aufruf" — also scheinbar eine kaputte Sperre. **Eine misslungene
Nachstellung ist kein Befund.**

⚠ **`initAnalytics()` steht VOR `createRoot(...).render(...)`.** Gemessen: Wirft der
Supabase-Client beim Start (fehlende Umgebungsvariablen → `supabaseUrl is required`),
bleibt die Seite weiß. Stand der Aufruf hinter `render()`, wurde der Besuch nicht
einmal gezählt — ausgerechnet die kaputten Ladevorgänge fehlten in der Statistik.

⚠ **Sichtbar wird es erst, wenn im Vercel-Projekt unter Analytics der Schalter
umgelegt ist.** Vorher liefert `/_vercel/insights/` einen 404 und es wird schlicht
nichts gezählt — genau der Zustand auf dem Screenshot.

**Die Datenschutzerklärung ist mitgezogen** (`src/pages/legal/legalContent.js` +
`uebersetzungen/{es,fr,pt,ar}.js`): Vercel heißt jetzt „Hosting und Besucherzählung",
der Absatz nennt die erhobenen Felder, „ohne Cookies und ohne geräteübergreifende
Kennung", Art. 6 Abs. 1 lit. f und den Satz, dass die Zählung in den Apps **nicht**
stattfindet. `updated` steht im **privacy**-Block auf dem 20.09.2026 — Impressum, AGB
und Gesundheitshinweis behalten den 17.09., weil sich dort nichts geändert hat.
Geprüft am **gerenderten** `/legal/privacy`, nicht am Quelltext.

⚠ **Swaply hat dieselbe Lücke** (kein `@vercel/analytics`, Capacitor-App). Dort ist
nichts geändert.

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
│       ├── ActiveStructuredCardio.jsx # Strukturierte Cardio-Session (Segment-Timer: Warmup/Intervall/Cooldown)
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
│   ├── peakPrograms.js           # 21 evidenzbasierte Peak-Programme (v2: Cardio-Segmente + weeks-Progression + Studien)
│   ├── programResolver.js        # Löst Wochen-Progression aktiver Programme zur Lesezeit auf (_meta im schedule)
│   └── recipesData.js            # 25 Rezepte mit Nährwerten (DE + EN)
├── hooks/
│   ├── useIntervalTimer.js       # HIIT/Circuit/Kampfsport-Timer (Runden/Arbeit/Pause)
│   ├── useSegmentTimer.js        # Cardio-Segment-Timer (Warmup/Intervall/Steady/Cooldown)
│   └── timerEffects.js           # Geteilt: Beeps (WebAudio) + Vibration + WakeLock
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
│   ├── Toast.jsx                # Generischer Erfolgs-/Fehler-Toast (fixed bottom, Auto-Dismiss)
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
- **friend_codes** — Einzigartiger FullRep-Code pro User (FR-NAME-XXXX)
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
- **Logo:** Goldener Kreisrahmen ohne Füllung auf schwarzem Grund, dreigeteilt; Hantel oben, Buch rechts, Apfel links (Lucide-Symbole aus der Bottom-Nav, 1:1). Zentriert oben in allen Tab-Headern (pt-12 für Notch) + Favicon + PWA-Icon. Komponente: `src/components/FullRepLogo.jsx`, Quelle `public/favicon.svg`
- **Farbpalette Dark Mode (Standard):** Hintergrund #0a0a0a / #1a1a1a (Karten), Akzentfarbe Gold #fbbf24, Texte Cremeweiß #fef3c7, sekundäre Texte gedämpftes Gold
- **Farbpalette Light Mode:** Hintergrund #ffffff / #f5f5f5, Akzentfarbe dunkleres Gold #b45309, Texte Schwarz/Dunkelgrau
- **Primary-Farben:** Gold-Palette (primary-400: #fbbf24, primary-500: #f59e0b, primary-600: #d97706)
- **Stil:** Modern, clean — Gold als Primärfarbe, abgerundete Karten, weiche Schatten
- **Navigation:** Bottom-Navigation mit 5 Tabs (Training, Ernährung, HOME-FAB, Bibliothek, Profil), Home-Button als goldener Kreis-FAB mit FullRep-Pfeil
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

---

## Handy-Betrieb: Builds, Deploys und fal.ai auf Zuruf

Josef arbeitet meist vom Handy. Für **alle** Sitzungen dieses Repos gilt darum eine
Dauer-Freigabe. Sie sagt nur, *dass* Claude das darf — sie ersetzt nie das „ja" zum
einzelnen Lauf.

**Grundsätzlich erlaubt:**
- die App bauen, signieren und in die Stores hochladen — auf GitHubs Rechnern, ohne Mac
- Deploys auslösen
- fal.ai für Bildmaterial nutzen (Store-Screenshots, Icons, Grafiken)

**Bedingung, ausnahmslos:** Jeder einzelne Lauf braucht vorher ein ausdrückliches
„ja" von Josef im Chat. Davor in drei Zeilen zusammenfassen: *was* passiert, *welche
Versionsnummer*, *wohin* es geht (Store / Produktion / nur Artefakt zum Ansehen) —
bei fal.ai zusätzlich Modell, Anzahl Bilder und ungefähre Kosten. Geht etwas schief:
melden und stehen bleiben, nicht auf eigene Faust nachbessern und noch einmal
hochladen. Ergebnisse (Bilder, Build-Artefakte, Logs) mit `SendUserFile` direkt im
Chat zeigen — auf dem Handy gibt es keinen Dateimanager.

**Schlüssel gehören weder ins Repo noch in den Chat:**

| Zweck | Ort |
|---|---|
| Signierung + Store-Upload | GitHub → Repo → Settings → Secrets and variables → Actions |
| `FAL_KEY` | Umgebungsvariable der Claude-Umgebung (claude.ai/code → Environment) |
| Vercel / Supabase | Vercel-Env bzw. lokale `.env` (gitignored) |

Ein Schlüssel, der im Chat steht, steht dauerhaft im Sitzungsprotokoll → gilt als
verbrannt und muss ersetzt werden. Fehlt einer: sagen **welcher** und **wo er
hingehört**, statt zu raten oder einen Umweg zu bauen.

**fal.ai läuft in der Sitzung** (Josef braucht dafür kein Terminal):
`curl -s https://fal.run/<modell> -H "Authorization: Key $FAL_KEY" -H 'Content-Type: application/json' -d '{"prompt":"…"}'`
→ Bild herunterladen, ins Repo legen, committen, im Chat zeigen. Ohne gesetzten
`FAL_KEY` ist der Weg zu: dann sagen, dass die Variable in der Umgebung fehlt.

**Auslösen in diesem Repo:** `Android Release` und `iOS Release` liegen unter
`.github/workflows/`, Secret-Namen in `docs/release-ci.md`. **Beide am 4.8.2026 grün
getestet** (Bau + Signierung, Upload abgeschaltet); Android lief schon am 31.7.
erfolgreich. Start per `workflow_dispatch`. Vorher `versionCode` in
`android/app/build.gradle` und `CURRENT_PROJECT_VERSION` im pbxproj erhöhen. Vor jedem
Release-Build prüfen: `USE_TEST_ADS` in `src/lib/ads.js` und `PURCHASE_ENABLED` in
`PaywallPage.jsx`.

⚠ **Falle beim iOS-Export** (4.8.26 zweimal reingelaufen): Bei manueller
Signierung braucht `ExportOptions.plist` die Zuordnung **Bundle-ID → Profilname**.
Fehlt sie, läuft der Bau vollständig durch und erst der Export bricht ab —
`exportArchive "App.app" requires a provisioning profile`. Das liest sich wie ein
fehlendes Profil, obwohl das Profil längst installiert ist. Der Workflow zieht beides
jetzt zur Laufzeit aus dem Profil selbst (`security cms -D` + `plutil -extract`),
damit es auch nach einer Profilerneuerung bei Apple stimmt.
