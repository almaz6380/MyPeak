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
- **Android-Abo aufgesetzt:** Play-Zahlungsprofil (Österreich, Organisation) verknüpft + N26-Bank hinterlegt („Bestätigung steht aus", normal). Abo `mypeak_premium_monthly`, Basis-Tarif `monthly` (auto-renew, 3,99 € — Österreich manuell auf 3,99 € gesetzt; ⚠️ prüfen, ob DE + übrige €-Länder auch 3,99 zeigen).
- **⚠️ Steuer/KU:** Josef ist **Kleinunternehmer (AT)**. EU-B2C: Apple/Google = deemed supplier, führen Endkunden-USt ab → KU ändert 3,99-€-Preis nicht. **TODO: Apple Small Business Program anmelden** (30%→15%, vor echten Verkäufen); Google-Abos eh 15 %.
- **NOCH OFFEN (nach den laufenden Store-Prüfungen, in einem Rutsch):** RevenueCat-Android (Google-Cloud-Service-Account + Play-API + `goog_`-Key), Play-Produkt ans Entitlement/Offering, `VITE_REVENUECAT_ANDROID_KEY`, `PURCHASE_ENABLED.*=true`, ASC-Abo-Review-Screenshot, **Weg-A-Build iOS+Android** (neuer Build ersetzt jeweils die laufende Einreichung → erst nach deren Freigabe), Sandbox-/Lizenz-Tester-Kauf testen.

### App-Store-Status (18.07.2026) — beide Stores mit Version 1.1 eingereicht (Weg B)
- **Weg B umgesetzt:** neuer Build aus aktuellem `main`, aber **Kauf-Button auf iOS ausgeblendet** (`PaywallPage.jsx`: `isIOSNative = Capacitor.getPlatform()==='ios'` → auf iOS kein Kauf/Restore/Preis, nur gratis 7-Tage-Trial). Umgeht Apples IAP-Pflicht (3.1.1), bis iOS-IAP eingerichtet ist. Web/Android unverändert. RevenueCat-Capacitor-Plugin per `cap sync` nativ registriert (Android `capacitor.*.gradle`, iOS `Package.swift`/`Package.resolved`).
- **Versionen:** Android `versionName 1.1 / versionCode 2`; iOS `MARKETING_VERSION 1.0 / Build 3` (Build 1 abgelehnt, Build 2 verworfen).
- **iOS EINGEREICHT:** Build 3 per altool zu ASC hochgeladen, Version 1.0 zugewiesen, neue Review-Submission → `WAITING_FOR_REVIEW`. Prüf-Notiz (appStoreReviewDetail) gegen 4.3(a) gesetzt + „no in-app purchases". Alte abgelehnte Submission storniert.
- **Android AUSGEROLLT:** `.aab` (versionCode 2) per Google-Play-API in Produktion `completed` → in Google-Prüfung. Service-Account `play-upload@wellbooked-501311` hat jetzt MyPeak-Rechte.
- **Light-Mode-Screenshots neu** (Playwright gegen lokale Dev-App, Review-Account, frische Demo-Daten): 6 Screens je iPhone 6,9″/iPad 12,9″/Android in `store-assets/`. **Android-Phone-Screenshots per Play-API hochgeladen (de-DE)**; iOS+iPad abgelegt fürs nächste Update (laufende Prüfung nicht anfassen).
- **⚠️ Noch offen (nach bestandener iOS-Prüfung): iOS-IAP / echtes bezahltes iOS-Premium (Weg A)** — ASC-Abo-Produkt + „Paid Apps"-Vertrag/Bankdaten (nur User), RevenueCat-iOS-Key, `VITE_REVENUECAT_IOS_KEY`, iOS-Kauf-Guard wieder entfernen, neuer Build. RevenueCat hängt noch an Stripe-Sandbox (keine echten Zahlungen).

### App-Store-Status (17.07.2026) — iOS abgelehnt, Antwort unbeantwortet
- **iOS 1.0 weiterhin „Abgelehnt" (4.3.0 Design: Spam).** Josefs Klarstellung vom 12.07. **hat Apple in 5 Tagen NICHT beantwortet** → Thread steht still, Warten bringt nichts.
- **Empfohlener Weg: neuer, verbesserter Build** — die App ist seit der Ablehnung massiv gewachsen (KI-Coach + eigene Wissens-DB, Freemium-Abo, Wissensbibliothek) → entkräftet „Spam" direkt.
- **⚠️ Neuer Build hat jetzt bezahltes Abo → Apple verlangt iOS In-App-Purchase** (nicht Web/Stripe). iOS-IAP ist noch NICHT eingerichtet. Zwei Wege besprochen: **(A)** iOS-IAP über RevenueCat (App-Store-Connect-Abo + RC-iOS-Key + `cap sync`) sauber einrichten, dann einreichen; **(B) empfohlen zuerst:** Kauf-Button auf iOS ausblenden, nur Trial, erst die Gratis-App durch 4.3(a) bringen, IAP/Premium im Update 1.1 nachliefern. Vor Upload: Versionsnummern hoch, **Light-Mode-Screenshots**, `npx cap sync`, Archive+Upload. Noch nicht begonnen.

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
- **Profil-Karte „MyPeak Premium"** (ProfilePage) zeigt Trial-Status bzw. öffnet die Paywall.
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
  `https://my-peak.vercel.app`) + `/app-ads.txt`. Ändert sich die Domain im Store, muss die Datei
  mitwandern, sonst ist sie wirkungslos.
- **Achtung, SPA-Falle:** `vercel.json` hat einen Catch-all `"/(.*)" → "/index.html"`, d. h. **jeder**
  unbekannte Pfad antwortet mit `200` und HTML statt mit `404`. Für app-ads.txt ist das entschärft,
  weil Vercel-`rewrites` erst greifen, wenn keine echte Datei passt — `public/` landet in der
  Deploy-Wurzel und schlägt den Catch-all (an `favicon.svg`/`icon-192.png` verifiziert). **Eine
  Änderung an `vercel.json` war deshalb NICHT nötig.** Beim Prüfen aber nicht auf den Statuscode
  hereinfallen: `200` allein beweist nichts, es zählt `Content-Type: text/plain` plus Inhalt.
- **Prüfen:** `curl -sD- https://my-peak.vercel.app/app-ads.txt | head -3` — muss `text/plain` und
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

**Auslösen in diesem Repo:** Noch **kein** Release-Workflow vorhanden. Vorlage:
`mahjong-app/.github/workflows/*` + `store/ci-setup.md`. Bis dahin laufen
iOS-Archiv und Play-Upload nur am Mac. Die Web-App deployt Vercel automatisch über
GitHub. Vor jedem Release-Build prüfen: `USE_TEST_ADS` in `src/lib/ads.js` und
`PURCHASE_ENABLED` in `PaywallPage.jsx`.
