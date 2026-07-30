-- ============================================================
-- FullRep: Abo / Premium (Juli 2026)
--
-- Speichert den Abo-Status pro Nutzer (eine Zeile). Provider-agnostisch:
-- 'provider' hält fest, woher das Abo kommt (revenuecat/stripe/promo),
-- die App-Logik selbst ist davon unabhängig. Trial + bezahltes Premium
-- werden getrennt gehalten, damit der Client isPremium sauber ableiten kann.
--
-- Idempotent. Vor/mit dem Deploy des Abo-Features einspielen.
-- ============================================================

CREATE TABLE IF NOT EXISTS subscriptions (
  user_id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  status text NOT NULL DEFAULT 'free',        -- 'free' | 'trial' | 'premium'
  trial_started_at timestamptz,
  trial_ends_at timestamptz,
  premium_until timestamptz,                  -- Ende des bezahlten Abos (null = keins)
  provider text NOT NULL DEFAULT 'none',      -- 'none' | 'revenuecat' | 'stripe' | 'promo'
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can read own subscription" ON subscriptions;
CREATE POLICY "Users can read own subscription"
  ON subscriptions FOR SELECT
  USING (user_id = auth.uid());

DROP POLICY IF EXISTS "Users can insert own subscription" ON subscriptions;
CREATE POLICY "Users can insert own subscription"
  ON subscriptions FOR INSERT
  WITH CHECK (user_id = auth.uid());

DROP POLICY IF EXISTS "Users can update own subscription" ON subscriptions;
CREATE POLICY "Users can update own subscription"
  ON subscriptions FOR UPDATE
  USING (user_id = auth.uid()) WITH CHECK (user_id = auth.uid());
