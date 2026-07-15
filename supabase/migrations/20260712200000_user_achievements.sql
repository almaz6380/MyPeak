-- Erfolge/Abzeichen: eine Zeile pro User, Badges + Zähler als JSONB
-- (Single-Statement-SQL — der CLI-Splitter verträgt kein plpgsql mit IF-Blöcken)

CREATE TABLE IF NOT EXISTS user_achievements (
  user_id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  achievements jsonb NOT NULL DEFAULT '{}'::jsonb,
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE user_achievements ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "users select own achievements" ON user_achievements;
CREATE POLICY "users select own achievements" ON user_achievements FOR SELECT USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "users insert own achievements" ON user_achievements;
CREATE POLICY "users insert own achievements" ON user_achievements FOR INSERT WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "users update own achievements" ON user_achievements;
CREATE POLICY "users update own achievements" ON user_achievements FOR UPDATE USING (auth.uid() = user_id);
