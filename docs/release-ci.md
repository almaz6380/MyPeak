# Release ohne Mac: GitHub Actions einrichten

Einmalige Einrichtung (~15 Minuten, dafür braucht es den Mac ein letztes Mal).
Danach baut, signiert und veröffentlicht GitHub die App auf Knopfdruck — aus jeder
Claude-Sitzung, aus dem Browser, vom Handy.

Die Workflows liegen in `.github/workflows/android-release.yml` und
`ios-release.yml`. Sie starten **nur von Hand** (`workflow_dispatch`), nie
automatisch bei einem Push.

## Wo die Secrets hinkommen

GitHub → Repo `almaz6380/MyPeak` → **Settings → Secrets and variables → Actions →
New repository secret**. Namen exakt so schreiben:

### Android (5 Secrets)

| Name | Wert |
|---|---|
| `ANDROID_KEYSTORE_BASE64` | `android/upload-keystore.jks` als Base64 |
| `ANDROID_KEYSTORE_PASSWORD` | `storePassword` aus `android/keystore.properties` |
| `ANDROID_KEY_ALIAS` | `keyAlias` aus derselben Datei |
| `ANDROID_KEY_PASSWORD` | `keyPassword` aus derselben Datei |
| `PLAY_SERVICE_ACCOUNT_JSON` | **Inhalt** des Dienstkonto-Keys (`play-upload@wellbooked-501311`, hat für MyPeak bereits Rechte) |

### iOS (4 Secrets + 2 Klartext)

| Name | Wert |
|---|---|
| `IOS_CERT_P12_BASE64` | Distributions-Zertifikat + privater Schlüssel als `.p12`, Base64 |
| `IOS_CERT_PASSWORD` | das beim Export vergebene Passwort |
| `IOS_PROVISIONING_PROFILE_BASE64` | Profil „MyPeak AppStore" (`.mobileprovision`), Base64 — Profilname bei Apple unverändert, hängt an der Bundle-ID `at.gallab.mypeak`, nicht am Markennamen |
| `ASC_KEY_P8_BASE64` | `~/.appstoreconnect/private_keys/AuthKey_VGHCB8Z8Q2.p8`, Base64 |
| `ASC_KEY_ID` | `VGHCB8Z8Q2` |
| `ASC_ISSUER_ID` | `0d4e473b-2807-4c66-9857-6b0eb78e62ce` |

### Build-Zeit-Variablen (Vite backt sie ins Bundle)

| Name | Wert |
|---|---|
| `VITE_SUPABASE_URL` | wie in der lokalen `.env` |
| `VITE_SUPABASE_ANON_KEY` | wie in der lokalen `.env` (öffentlicher Anon-Key) |
| `VITE_REVENUECAT_IOS_KEY` | RevenueCat-iOS-SDK-Key (`appl_…`) |
| `VITE_REVENUECAT_ANDROID_KEY` | RevenueCat-Android-SDK-Key (`goog_…`), sobald eingerichtet |

Fehlt eine dieser Variablen, baut die App trotzdem — der jeweilige Teil ist dann
nur inaktiv (RevenueCat zeigt „bald verfügbar"). Der **Service-Role-Key gehört
NICHT hierher**, der lebt ausschließlich in Vercel.

## Werte am Mac erzeugen

```bash
base64 -i android/upload-keystore.jks | pbcopy
cat android/keystore.properties
base64 -i ~/Desktop/dist.p12 | pbcopy
base64 -i ~/Library/MobileDevice/Provisioning\ Profiles/<profil>.mobileprovision | pbcopy
base64 -i ~/.appstoreconnect/private_keys/AuthKey_VGHCB8Z8Q2.p8 | pbcopy
```

## Eingebaute Bremse

Beide Workflows brechen ab, wenn in `src/lib/ads.js` nicht `const USE_TEST_ADS = false`
steht — sonst liefe im Store eine Version mit Google-Test-Anzeigen.

## Vor jedem Release

- Android: `versionCode` in `android/app/build.gradle` erhöhen (aktuell 13)
- iOS: `CURRENT_PROJECT_VERSION` im pbxproj erhöhen (2 Stellen)
- `PURCHASE_ENABLED` in `src/pages/PaywallPage.jsx` prüfen — steht der Kauf für die
  jeweilige Plattform auf `false`, sieht der Store nur die Gratis-Testphase.

## Erster Lauf

Upload-Schalter **aus**stellen. Läuft der Build durch und liegt das Artefakt bereit,
stimmt die Signierung — dann noch einmal mit Upload starten.
