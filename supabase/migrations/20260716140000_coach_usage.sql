-- ============================================================
-- FullRep: KI-Coach-Kontingent (Juli 2026)
--
-- Zählt pro Nutzer und Tag die Coach-Anfragen, um das API-Budget
-- zu deckeln und Premium-Stufen zu staffeln (z. B. Trial 5/Tag,
-- Premium 30/Tag). Der Zähler wird AUSSCHLIESSLICH serverseitig
-- (Vercel-Funktion mit Service-Role) geschrieben — kein Client darf
-- ihn manipulieren. Nutzer dürfen nur ihren eigenen Stand LESEN (UI).
--
-- Idempotent. Vor dem Deploy des KI-Coaches einspielen.
-- ============================================================

CREATE TABLE IF NOT EXISTS coach_usage (
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  date date NOT NULL DEFAULT CURRENT_DATE,
  count integer NOT NULL DEFAULT 0,
  updated_at timestamptz DEFAULT now(),
  PRIMARY KEY (user_id, date)
);

ALTER TABLE coach_usage ENABLE ROW LEVEL SECURITY;

-- Nur Lesen des eigenen Zählers (für die UI-Anzeige „noch X Fragen heute").
-- Bewusst KEINE INSERT/UPDATE-Policy: Schreiben läuft über die Service-Role
-- (umgeht RLS), damit das Kontingent nicht clientseitig umgangen werden kann.
DROP POLICY IF EXISTS "Users can read own coach usage" ON coach_usage;
CREATE POLICY "Users can read own coach usage"
  ON coach_usage FOR SELECT
  USING (user_id = auth.uid());
