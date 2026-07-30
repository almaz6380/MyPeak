-- ============================================================
-- FullRep: Fehlende Tabellen (Juli 2026)
--
-- Der Code referenziert 7 Tabellen, die in der Produktions-DB
-- nie angelegt wurden (schema.sql wurde nicht vollständig
-- ausgeführt). Diese Migration legt sie an — idempotent
-- (IF NOT EXISTS / DROP POLICY IF EXISTS), nur einfache
-- Single-Statements (keine DO-Blöcke).
--
-- Tabellen: supplements, supplement_logs, cycle_settings,
--           cycle_logs, weight_entries, active_diet,
--           weekly_schedules
-- ============================================================

-- ── 1. Supplements ─────────────────────────────────────────────
-- Quelle: src/data/supplementStorage.js (insert/update Z.58-134)
CREATE TABLE IF NOT EXISTS supplements (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  name text NOT NULL,
  brand text,
  form text NOT NULL DEFAULT 'tablet',
  dosage_amount numeric NOT NULL DEFAULT 1,
  dosage_unit text NOT NULL DEFAULT 'Stück',
  notes text DEFAULT '',
  barcode text,
  schedule jsonb NOT NULL DEFAULT '{}',
  created_at timestamptz DEFAULT now(),
  deleted_at timestamptz
);

ALTER TABLE supplements ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can read own supplements" ON supplements;
CREATE POLICY "Users can read own supplements"
  ON supplements FOR SELECT
  USING (user_id = auth.uid());

DROP POLICY IF EXISTS "Users can insert own supplements" ON supplements;
CREATE POLICY "Users can insert own supplements"
  ON supplements FOR INSERT
  WITH CHECK (user_id = auth.uid());

DROP POLICY IF EXISTS "Users can update own supplements" ON supplements;
CREATE POLICY "Users can update own supplements"
  ON supplements FOR UPDATE
  USING (user_id = auth.uid()) WITH CHECK (user_id = auth.uid());

DROP POLICY IF EXISTS "Users can delete own supplements" ON supplements;
CREATE POLICY "Users can delete own supplements"
  ON supplements FOR DELETE
  USING (user_id = auth.uid());

-- ── 2. Supplement Logs (Einnahme-Bestätigungen) ────────────────
-- Quelle: src/data/supplementStorage.js Z.202-251
-- onConflict 'user_id,supplement_id,date,time_slot' → UNIQUE
CREATE TABLE IF NOT EXISTS supplement_logs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  supplement_id uuid NOT NULL REFERENCES supplements(id) ON DELETE CASCADE,
  date date NOT NULL DEFAULT CURRENT_DATE,
  time_slot text NOT NULL,
  taken_at timestamptz DEFAULT now(),
  UNIQUE (user_id, supplement_id, date, time_slot)
);

ALTER TABLE supplement_logs ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can read own supplement logs" ON supplement_logs;
CREATE POLICY "Users can read own supplement logs"
  ON supplement_logs FOR SELECT
  USING (user_id = auth.uid());

DROP POLICY IF EXISTS "Users can insert own supplement logs" ON supplement_logs;
CREATE POLICY "Users can insert own supplement logs"
  ON supplement_logs FOR INSERT
  WITH CHECK (user_id = auth.uid());

DROP POLICY IF EXISTS "Users can update own supplement logs" ON supplement_logs;
CREATE POLICY "Users can update own supplement logs"
  ON supplement_logs FOR UPDATE
  USING (user_id = auth.uid()) WITH CHECK (user_id = auth.uid());

DROP POLICY IF EXISTS "Users can delete own supplement logs" ON supplement_logs;
CREATE POLICY "Users can delete own supplement logs"
  ON supplement_logs FOR DELETE
  USING (user_id = auth.uid());

-- ── 3. Cycle Settings (Zyklustracking) ─────────────────────────
-- Quelle: src/data/cycleStorage.js Z.35-57
-- onConflict 'user_id' → user_id als PRIMARY KEY (1 Zeile pro User)
CREATE TABLE IF NOT EXISTS cycle_settings (
  user_id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  cycle_length integer NOT NULL DEFAULT 28,
  period_length integer NOT NULL DEFAULT 5,
  last_period_start date NOT NULL,
  tracking_enabled boolean DEFAULT true,
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE cycle_settings ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can read own cycle settings" ON cycle_settings;
CREATE POLICY "Users can read own cycle settings"
  ON cycle_settings FOR SELECT
  USING (user_id = auth.uid());

DROP POLICY IF EXISTS "Users can insert own cycle settings" ON cycle_settings;
CREATE POLICY "Users can insert own cycle settings"
  ON cycle_settings FOR INSERT
  WITH CHECK (user_id = auth.uid());

DROP POLICY IF EXISTS "Users can update own cycle settings" ON cycle_settings;
CREATE POLICY "Users can update own cycle settings"
  ON cycle_settings FOR UPDATE
  USING (user_id = auth.uid()) WITH CHECK (user_id = auth.uid());

DROP POLICY IF EXISTS "Users can delete own cycle settings" ON cycle_settings;
CREATE POLICY "Users can delete own cycle settings"
  ON cycle_settings FOR DELETE
  USING (user_id = auth.uid());

-- ── 4. Cycle Logs (Symptom-Tagebuch) ───────────────────────────
-- Quelle: src/data/cycleStorage.js Z.87-112
-- onConflict 'user_id,date' → UNIQUE
CREATE TABLE IF NOT EXISTS cycle_logs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  date date NOT NULL,
  mood text,
  energy text,
  pain text,
  sleep text,
  bloating boolean DEFAULT false,
  headache boolean DEFAULT false,
  cravings boolean DEFAULT false,
  notes text DEFAULT '',
  UNIQUE (user_id, date)
);

ALTER TABLE cycle_logs ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can read own cycle logs" ON cycle_logs;
CREATE POLICY "Users can read own cycle logs"
  ON cycle_logs FOR SELECT
  USING (user_id = auth.uid());

DROP POLICY IF EXISTS "Users can insert own cycle logs" ON cycle_logs;
CREATE POLICY "Users can insert own cycle logs"
  ON cycle_logs FOR INSERT
  WITH CHECK (user_id = auth.uid());

DROP POLICY IF EXISTS "Users can update own cycle logs" ON cycle_logs;
CREATE POLICY "Users can update own cycle logs"
  ON cycle_logs FOR UPDATE
  USING (user_id = auth.uid()) WITH CHECK (user_id = auth.uid());

DROP POLICY IF EXISTS "Users can delete own cycle logs" ON cycle_logs;
CREATE POLICY "Users can delete own cycle logs"
  ON cycle_logs FOR DELETE
  USING (user_id = auth.uid());

-- ── 5. Weight Entries (Gewichtsverlauf) ────────────────────────
-- Quelle: src/data/weightStorage.js Z.56-81
-- onConflict 'user_id,date' → UNIQUE
CREATE TABLE IF NOT EXISTS weight_entries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  date date NOT NULL,
  weight_kg numeric NOT NULL,
  created_at timestamptz DEFAULT now(),
  UNIQUE (user_id, date)
);

ALTER TABLE weight_entries ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can read own weight entries" ON weight_entries;
CREATE POLICY "Users can read own weight entries"
  ON weight_entries FOR SELECT
  USING (user_id = auth.uid());

DROP POLICY IF EXISTS "Users can insert own weight entries" ON weight_entries;
CREATE POLICY "Users can insert own weight entries"
  ON weight_entries FOR INSERT
  WITH CHECK (user_id = auth.uid());

DROP POLICY IF EXISTS "Users can update own weight entries" ON weight_entries;
CREATE POLICY "Users can update own weight entries"
  ON weight_entries FOR UPDATE
  USING (user_id = auth.uid()) WITH CHECK (user_id = auth.uid());

DROP POLICY IF EXISTS "Users can delete own weight entries" ON weight_entries;
CREATE POLICY "Users can delete own weight entries"
  ON weight_entries FOR DELETE
  USING (user_id = auth.uid());

-- ── 6. Active Diet (aktive Diätform) ───────────────────────────
-- Quelle: src/data/dietStorage.js Z.36-73
-- onConflict 'user_id' → user_id als PRIMARY KEY (1 Zeile pro User)
CREATE TABLE IF NOT EXISTS active_diet (
  user_id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  diet_id text NOT NULL,
  started_at date NOT NULL DEFAULT CURRENT_DATE,
  config jsonb DEFAULT '{}',
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE active_diet ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can read own active diet" ON active_diet;
CREATE POLICY "Users can read own active diet"
  ON active_diet FOR SELECT
  USING (user_id = auth.uid());

DROP POLICY IF EXISTS "Users can insert own active diet" ON active_diet;
CREATE POLICY "Users can insert own active diet"
  ON active_diet FOR INSERT
  WITH CHECK (user_id = auth.uid());

DROP POLICY IF EXISTS "Users can update own active diet" ON active_diet;
CREATE POLICY "Users can update own active diet"
  ON active_diet FOR UPDATE
  USING (user_id = auth.uid()) WITH CHECK (user_id = auth.uid());

DROP POLICY IF EXISTS "Users can delete own active diet" ON active_diet;
CREATE POLICY "Users can delete own active diet"
  ON active_diet FOR DELETE
  USING (user_id = auth.uid());

-- ── 7. Weekly Schedules (Wochenplan-System) ────────────────────
-- Quelle: src/data/workoutStorage.js Z.560-601
CREATE TABLE IF NOT EXISTS weekly_schedules (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  name text NOT NULL,
  sessions_per_week integer NOT NULL DEFAULT 3,
  days jsonb NOT NULL DEFAULT '{}',
  is_active boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE weekly_schedules ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can read own weekly schedules" ON weekly_schedules;
CREATE POLICY "Users can read own weekly schedules"
  ON weekly_schedules FOR SELECT
  USING (user_id = auth.uid());

DROP POLICY IF EXISTS "Users can insert own weekly schedules" ON weekly_schedules;
CREATE POLICY "Users can insert own weekly schedules"
  ON weekly_schedules FOR INSERT
  WITH CHECK (user_id = auth.uid());

DROP POLICY IF EXISTS "Users can update own weekly schedules" ON weekly_schedules;
CREATE POLICY "Users can update own weekly schedules"
  ON weekly_schedules FOR UPDATE
  USING (user_id = auth.uid()) WITH CHECK (user_id = auth.uid());

DROP POLICY IF EXISTS "Users can delete own weekly schedules" ON weekly_schedules;
CREATE POLICY "Users can delete own weekly schedules"
  ON weekly_schedules FOR DELETE
  USING (user_id = auth.uid());
