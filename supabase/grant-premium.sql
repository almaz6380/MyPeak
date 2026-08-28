-- ============================================================
-- FullRep: Premium von Hand freischalten (Promo)
--
-- Wofür: einzelne Nutzer (Freunde, Tester, Support-Fälle) bekommen
-- Premium ohne Kauf. Läuft NUR im Supabase SQL Editor oder über die
-- Service-Role — der Client darf `subscriptions` seit
-- 20260717100000_subscriptions_server_only.sql nicht mehr schreiben.
--
-- Was Premium tatsächlich auslöst, ist ALLEIN ein `premium_until` in
-- der Zukunft. Sowohl der Client (`computeAccess` in
-- src/data/subscriptionStorage.js) als auch der Server (api/coach.js)
-- prüfen genau dieses Feld. `status` ist nur beschreibend; wir setzen
-- es trotzdem korrekt, damit die Zeile nicht widersprüchlich aussieht.
--
-- `provider = 'promo'` ist der Marker für „nicht bezahlt". Er hält die
-- Zeile vom RevenueCat-Webhook unterscheidbar; der Webhook schreibt nur
-- bei echten Kauf-Events zu genau dieser user_id und fasst Promo-Zeilen
-- sonst nicht an.
-- ============================================================


-- ------------------------------------------------------------
-- SCHRITT 1 — nachsehen, WEN man vor sich hat. Immer zuerst.
-- Zeigt die zuletzt registrierten Konten samt aktuellem Abo-Stand.
-- ------------------------------------------------------------
SELECT
  u.id,
  u.email,
  u.created_at            AS registriert_am,
  u.email_confirmed_at    AS bestaetigt_am,
  p.name                  AS profilname,
  s.status,
  s.premium_until,
  s.provider
FROM auth.users u
LEFT JOIN profiles      p ON p.id      = u.id
LEFT JOIN subscriptions s ON s.user_id = u.id
ORDER BY u.created_at DESC
LIMIT 10;


-- ------------------------------------------------------------
-- SCHRITT 2 — freischalten.
-- Die beiden E-Mail-Adressen unten ersetzen, dann ausführen.
--
-- Unbegrenzt = premium_until auf 2099-01-01. Es gibt kein Feld für
-- „läuft nie ab"; ein weit entferntes Datum ist der übliche Weg und
-- bleibt jederzeit zurücknehmbar (siehe SCHRITT 4).
--
-- `RETURNING` gibt zurück, was wirklich geschrieben wurde: kommen
-- weniger als 2 Zeilen zurück, hat eine E-Mail nicht gepasst
-- (Tippfehler oder anderes Konto) — dann NICHT raten, sondern mit
-- SCHRITT 1 die Adresse nachsehen.
-- ------------------------------------------------------------
INSERT INTO subscriptions (user_id, status, premium_until, provider, updated_at)
SELECT
  u.id,
  'premium',
  TIMESTAMPTZ '2099-01-01 00:00:00+00',
  'promo',
  now()
FROM auth.users u
WHERE lower(u.email) IN (
  lower('freund1@example.com'),   -- <<< ERSETZEN
  lower('freund2@example.com')    -- <<< ERSETZEN
)
ON CONFLICT (user_id) DO UPDATE
SET status       = 'premium',
    premium_until = EXCLUDED.premium_until,
    provider      = 'promo',
    updated_at    = now()
RETURNING user_id, status, premium_until, provider;


-- ------------------------------------------------------------
-- SCHRITT 3 — gegenprüfen.
-- `aktiv` muss bei beiden true sein.
-- ------------------------------------------------------------
SELECT
  u.email,
  s.status,
  s.premium_until,
  s.provider,
  (s.premium_until > now()) AS aktiv
FROM subscriptions s
JOIN auth.users u ON u.id = s.user_id
WHERE s.provider = 'promo'
ORDER BY s.updated_at DESC;


-- ------------------------------------------------------------
-- SCHRITT 4 — wieder zurücknehmen (nur bei Bedarf).
-- Setzt die Zeile auf 'free' zurück, ohne einen evtl. bereits
-- genutzten Trial zu löschen (trial_started_at bleibt stehen,
-- sonst könnte die Testphase ein zweites Mal gestartet werden).
-- ------------------------------------------------------------
-- UPDATE subscriptions s
-- SET status = 'free', premium_until = NULL, provider = 'none', updated_at = now()
-- FROM auth.users u
-- WHERE u.id = s.user_id
--   AND s.provider = 'promo'
--   AND lower(u.email) = lower('freund1@example.com');
