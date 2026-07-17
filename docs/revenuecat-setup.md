# RevenueCat einrichten — MyPeak Premium (3,99 €/Monat)

Der Code ist fertig verdrahtet. Damit echte Käufe funktionieren, brauchst du ein
RevenueCat-Konto, ein Produkt und ein paar Schlüssel. Bis das eingerichtet ist, läuft die App
normal weiter — die Paywall zeigt dann „Käufe sind bald verfügbar". Trial (7 Tage kostenlos)
funktioniert unabhängig davon.

**Reihenfolge:** 1) Supabase-Migration → 2) RevenueCat-Projekt & Produkt → 3) Web-Billing →
4) Keys & Webhook → 5) Vercel-Env → 6) Testkauf.

---

## 1. Supabase-Migration einspielen (Sicherheit)

Datei: `supabase/migrations/20260717100000_subscriptions_server_only.sql`.
Sie entzieht dem Browser das Schreibrecht auf `subscriptions` (sonst könnte sich jemand selbst
Premium eintragen). Im Supabase **SQL Editor** ausführen (idempotent). Danach setzt **nur** noch
der Server (Trial-Endpoint + RevenueCat-Webhook) den Abo-Status.

## 2. RevenueCat-Projekt & Produkt

1. Konto auf [revenuecat.com](https://www.revenuecat.com) anlegen, Projekt „MyPeak" erstellen.
2. **Entitlement** anlegen mit dem Identifier **`premium`** (genau so — der Code prüft darauf).
3. **Produkt** „Monatliches Premium" zu **3,99 €/Monat** anlegen. Wo, hängt von der Plattform ab:
   - **Web** (jetzt): über RevenueCat **Web Billing** (Schritt 3).
   - **iOS/Android** (später): Produkt in App Store Connect bzw. Google Play Console anlegen und in
     RevenueCat verknüpfen. Erst nötig, wenn die Apps live sind.
4. Das Produkt dem Entitlement `premium` zuordnen.
5. Ein **Offering** (z. B. „default") mit einem **Monats-Package** erstellen, das auf das Produkt zeigt.
   Der Code nimmt automatisch das Package vom Typ `MONTHLY` (sonst das erste im aktuellen Offering).

## 3. Web-Billing aktivieren (damit Web-Nutzer jetzt zahlen können)

1. In RevenueCat **Web Billing** aktivieren und wie beschrieben mit **Stripe** verbinden
   (RevenueCat wickelt Checkout & Abrechnung ab).
2. Das Web-Produkt zu **3,99 €/Monat** ins Offering hängen (siehe Schritt 2.5).

## 4. API-Keys & Webhook

**Keys** (RevenueCat → Project Settings → API Keys):
- **Web Billing Public Key** → wird `VITE_REVENUECAT_WEB_API_KEY`.
- (Später) **Apple/Google Public SDK Keys** → `VITE_REVENUECAT_IOS_KEY` / `VITE_REVENUECAT_ANDROID_KEY`.

**Webhook** (RevenueCat → Integrations → Webhooks):
- **URL:** `https://my-peak.vercel.app/api/revenuecat-webhook`
- **Authorization header:** einen langen Zufallswert eintragen — denselben als
  `REVENUECAT_WEBHOOK_SECRET` in Vercel setzen. Der Server lehnt jeden Aufruf ohne exakt diesen
  Wert mit 401 ab.

## 5. Vercel-Umgebungsvariablen

Unter Project → Settings → Environment Variables (Production **und** Preview):

| Variable | Wert | Zweck |
|---|---|---|
| `REVENUECAT_WEBHOOK_SECRET` | dein Zufallswert aus 4 | Webhook-Absicherung (Server) |
| `VITE_REVENUECAT_WEB_API_KEY` | Web Billing Public Key | Web-SDK (Client) |
| `VITE_REVENUECAT_IOS_KEY` | Apple Public Key | *später*, native iOS |
| `VITE_REVENUECAT_ANDROID_KEY` | Google Public Key | *später*, native Android |

`SUPABASE_SERVICE_ROLE_KEY` (bereits gesetzt) nutzt der Webhook, um `premium_until` zu schreiben.
Nach dem Setzen der `VITE_`-Variablen einmal **neu deployen** (sie werden zur Buildzeit eingebacken).

## 6. Testkauf (Web)

1. Auf my-peak.vercel.app einloggen, Trial ggf. schon verbraucht → Paywall zeigt „Premium freischalten".
2. Kauf mit einer Stripe-Testkarte (im Stripe-Testmodus) durchführen.
3. Erwartung: RevenueCat feuert `INITIAL_PURCHASE` → `/api/revenuecat-webhook` setzt `premium_until`
   → in der App wird `isPremium` true, der Coach ist ohne Trial nutzbar.
4. „Käufe wiederherstellen" auf der Paywall testet den Restore-Pfad.

---

## Wie es im Code zusammenhängt

- **Kauf/Restore/Preis:** `src/lib/revenuecat.js` (lädt je Plattform das richtige SDK; ohne Key inaktiv),
  aufgerufen über `src/data/subscriptionStorage.js` (`purchasePremium`, `restorePurchases`,
  `getPremiumPriceString`) aus `src/pages/PaywallPage.jsx`.
- **app_user_id = Supabase-user_id:** wird bei `configure`/`logIn` gesetzt, damit der Webhook den Kauf
  dem Konto zuordnet.
- **Freischaltung:** ausschließlich serverseitig in `api/revenuecat-webhook.js` (Service-Role) →
  `subscriptions.premium_until`. Der Client kann sich Premium nie selbst geben.
- **Trial:** serverseitig in `api/start-trial.js` (nur Trial-Felder, einmalig).

## iOS/Android später

Wenn die Apps live gehen: Store-Produkte anlegen + in RevenueCat verknüpfen, die nativen Public Keys
als `VITE_REVENUECAT_*_KEY` setzen, `npm install` ist bereits erfolgt (`@revenuecat/purchases-capacitor`),
dann `npx cap sync`. Der übrige Code (Entitlement `premium`, Webhook, Gating) bleibt unverändert.
