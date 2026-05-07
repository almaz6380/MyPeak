-- ============================================================
-- MyPeak Supabase Schema
-- Dieses SQL im Supabase Dashboard unter SQL Editor ausfuehren
-- ============================================================

-- 1. Profiles (Onboarding-Daten)
CREATE TABLE profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  name text,
  gender text,
  age integer,
  weight_kg numeric,
  height_cm numeric,
  goal text CHECK (goal IN ('muscle_gain', 'maintenance', 'weight_loss')),
  activity_level text CHECK (activity_level IN ('sedentary', 'moderate', 'very_active')),
  experience text CHECK (experience IN ('beginner', 'intermediate', 'pro')),
  onboarding_completed boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own profile"
  ON profiles FOR SELECT
  USING (id = auth.uid());

CREATE POLICY "Users can update their own profile"
  ON profiles FOR UPDATE
  USING (id = auth.uid())
  WITH CHECK (id = auth.uid());

CREATE POLICY "Users can insert their own profile"
  ON profiles FOR INSERT
  WITH CHECK (id = auth.uid());

-- 2. User Settings
CREATE TABLE user_settings (
  user_id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  weight_unit text DEFAULT 'kg' CHECK (weight_unit IN ('kg', 'lbs')),
  language text DEFAULT 'de' CHECK (language IN ('de', 'en')),
  dark_mode boolean DEFAULT false,
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE user_settings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage their own settings"
  ON user_settings FOR ALL
  USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());

-- 3. Workouts (JSONB fuer exercises — pragmatisch fuer Personal-Fitness-App)
CREATE TABLE workouts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  date timestamptz NOT NULL,
  duration integer NOT NULL DEFAULT 0,
  exercises jsonb NOT NULL DEFAULT '[]'::jsonb,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE workouts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage their own workouts"
  ON workouts FOR ALL
  USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());

CREATE INDEX idx_workouts_user_id ON workouts(user_id);
CREATE INDEX idx_workouts_date ON workouts(user_id, date DESC);

-- 4. Custom Plans
CREATE TABLE custom_plans (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  name text NOT NULL,
  days jsonb NOT NULL DEFAULT '[]'::jsonb,
  deleted_at timestamptz,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE custom_plans ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage their own plans"
  ON custom_plans FOR ALL
  USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());

CREATE INDEX idx_custom_plans_user_id ON custom_plans(user_id);

-- 5. Custom Exercises
CREATE TABLE custom_exercises (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  exercise_id text NOT NULL,
  name text NOT NULL,
  muscle_group text,
  equipment text,
  created_at timestamptz DEFAULT now(),
  UNIQUE(user_id, exercise_id)
);

ALTER TABLE custom_exercises ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage their own exercises"
  ON custom_exercises FOR ALL
  USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());

-- 6. Trigger: Automatisch Profile + Settings bei neuer Registrierung anlegen
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO profiles (id) VALUES (NEW.id);
  INSERT INTO user_settings (user_id) VALUES (NEW.id);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();
