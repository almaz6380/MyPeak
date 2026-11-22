-- ============================================================
-- FullRep: Tageskontingent fuer die Mahlzeit-Foto-Analyse (11/2026)
--
-- Zaehlt pro Nutzer und Tag die Foto-Analysen (api/analyze-meal.js):
-- gratis 3 am Tag, Premium/Testphase 30. Geschrieben wird AUSSCHLIESSLICH
-- serverseitig (Service-Role), Nutzer duerfen nur ihren Stand lesen.
-- Gleiche Bauart wie coach_usage.
--
-- Idempotent. Der Endpunkt laeuft auch OHNE diese Tabelle (fail-open) —
-- gedeckelt wird aber erst, wenn sie da ist.
-- ============================================================

CREATE TABLE IF NOT EXISTS photo_usage (
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  date date NOT NULL DEFAULT CURRENT_DATE,
  count integer NOT NULL DEFAULT 0,
  updated_at timestamptz DEFAULT now(),
  PRIMARY KEY (user_id, date)
);

ALTER TABLE photo_usage ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can read own photo usage" ON photo_usage;
CREATE POLICY "Users can read own photo usage"
  ON photo_usage FOR SELECT
  USING (user_id = auth.uid());
