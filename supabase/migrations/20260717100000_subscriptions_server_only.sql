-- ============================================================
-- MyPeak: subscriptions absichern für echtes bezahltes Premium (Juli 2026)
--
-- Vor Zahlungs-Go-Live: der Client darf seinen Abo-Status NICHT mehr
-- selbst schreiben (sonst könnte sich jeder premium_until setzen).
-- Ab jetzt gilt: Nutzer dürfen ihre Zeile nur noch LESEN. Alle Schreib-
-- zugriffe (Trial-Start UND bezahltes Premium) laufen ausschließlich
-- serverseitig über die Service-Role (umgeht RLS) — Trial via
-- api/start-trial.js, bezahltes Premium via api/revenuecat-webhook.js.
--
-- Idempotent. Vor dem Deploy der RevenueCat-Anbindung einspielen.
-- ============================================================

-- SELECT-Policy sicherstellen (falls die frühere Migration nicht lief).
ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can read own subscription" ON subscriptions;
CREATE POLICY "Users can read own subscription"
  ON subscriptions FOR SELECT
  USING (user_id = auth.uid());

-- Client-Schreibrechte entfernen: kein INSERT/UPDATE mehr vom Browser.
DROP POLICY IF EXISTS "Users can insert own subscription" ON subscriptions;
DROP POLICY IF EXISTS "Users can update own subscription" ON subscriptions;

-- Hinweis: Die Service-Role umgeht RLS vollständig; die Serverfunktionen
-- (start-trial, revenuecat-webhook) schreiben damit weiterhin ungehindert.
