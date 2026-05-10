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

-- 6. Nutrition Entries (einzelne Lebensmittel-Eintraege pro Tag/Mahlzeit)
CREATE TABLE nutrition_entries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  date date NOT NULL,
  meal_slot text NOT NULL DEFAULT 'snack' CHECK (meal_slot IN ('breakfast', 'lunch', 'dinner', 'snack')),
  food_name text NOT NULL,
  brand text,
  serving_size numeric NOT NULL DEFAULT 100,
  serving_unit text NOT NULL DEFAULT 'g' CHECK (serving_unit IN ('g', 'ml', 'piece', 'portion')),
  calories numeric NOT NULL DEFAULT 0,
  protein numeric NOT NULL DEFAULT 0,
  carbs numeric NOT NULL DEFAULT 0,
  fat numeric NOT NULL DEFAULT 0,
  fiber numeric DEFAULT 0,
  sugar numeric DEFAULT 0,
  source text DEFAULT 'manual' CHECK (source IN ('manual', 'openfoodfacts', 'custom_meal', 'local_db')),
  source_id text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE nutrition_entries ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage their own nutrition entries"
  ON nutrition_entries FOR ALL
  USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());

CREATE INDEX idx_nutrition_entries_user_date ON nutrition_entries(user_id, date DESC);

-- 7. Custom Meals (gespeicherte Mahlzeit-Vorlagen)
CREATE TABLE custom_meals (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  name text NOT NULL,
  items jsonb NOT NULL DEFAULT '[]'::jsonb,
  total_calories numeric NOT NULL DEFAULT 0,
  total_protein numeric NOT NULL DEFAULT 0,
  total_carbs numeric NOT NULL DEFAULT 0,
  total_fat numeric NOT NULL DEFAULT 0,
  deleted_at timestamptz,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE custom_meals ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage their own custom meals"
  ON custom_meals FOR ALL
  USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());

CREATE INDEX idx_custom_meals_user ON custom_meals(user_id);

-- 8. Nutrition Goals (taegliche Kalorien-/Makro-Ziele, 1 Zeile pro User)
CREATE TABLE nutrition_goals (
  user_id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  calories numeric NOT NULL DEFAULT 2000,
  protein numeric NOT NULL DEFAULT 150,
  carbs numeric NOT NULL DEFAULT 250,
  fat numeric NOT NULL DEFAULT 70,
  tdee numeric,
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE nutrition_goals ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage their own nutrition goals"
  ON nutrition_goals FOR ALL
  USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());

-- 9. Water Entries (Fluessigkeits-Tracking pro Tag)
CREATE TABLE water_entries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  date date NOT NULL,
  amount_ml integer NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE water_entries ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage their own water entries"
  ON water_entries FOR ALL
  USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());

CREATE INDEX idx_water_entries_user_date ON water_entries(user_id, date DESC);

-- 10. Friend Codes (einzigartiger MyPeak-Code pro User)
CREATE TABLE friend_codes (
  user_id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  code text UNIQUE NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE friend_codes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read friend codes" ON friend_codes FOR SELECT USING (true);
CREATE POLICY "Users can insert their own code" ON friend_codes FOR INSERT WITH CHECK (user_id = auth.uid());

-- 11. Friendships (Freundschaftsverbindungen)
CREATE TABLE friendships (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  sender_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  receiver_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  status text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'accepted', 'declined')),
  created_at timestamptz DEFAULT now(),
  UNIQUE(sender_id, receiver_id)
);

ALTER TABLE friendships ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can see their own friendships" ON friendships FOR SELECT
  USING (sender_id = auth.uid() OR receiver_id = auth.uid());
CREATE POLICY "Users can send friend requests" ON friendships FOR INSERT
  WITH CHECK (sender_id = auth.uid());
CREATE POLICY "Users can update friendships they received" ON friendships FOR UPDATE
  USING (receiver_id = auth.uid());
CREATE POLICY "Users can delete their own friendships" ON friendships FOR DELETE
  USING (sender_id = auth.uid() OR receiver_id = auth.uid());

CREATE INDEX idx_friendships_sender ON friendships(sender_id);
CREATE INDEX idx_friendships_receiver ON friendships(receiver_id);

-- 12. Challenges (Herausforderungen zwischen Freunden)
CREATE TABLE challenges (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  challenger_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  opponent_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  exercise_ids jsonb NOT NULL DEFAULT '[]'::jsonb,
  criteria text NOT NULL DEFAULT 'volume' CHECK (criteria IN ('volume', 'rounds')),
  start_date date NOT NULL,
  end_date date NOT NULL,
  status text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'active', 'completed', 'declined')),
  challenger_score numeric DEFAULT 0,
  opponent_score numeric DEFAULT 0,
  winner_id uuid REFERENCES auth.users(id),
  xp_reward integer DEFAULT 50,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE challenges ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can see their own challenges" ON challenges FOR SELECT
  USING (challenger_id = auth.uid() OR opponent_id = auth.uid());
CREATE POLICY "Users can create challenges" ON challenges FOR INSERT
  WITH CHECK (challenger_id = auth.uid());
CREATE POLICY "Participants can update challenges" ON challenges FOR UPDATE
  USING (challenger_id = auth.uid() OR opponent_id = auth.uid());

CREATE INDEX idx_challenges_challenger ON challenges(challenger_id);
CREATE INDEX idx_challenges_opponent ON challenges(opponent_id);

-- 13. User XP (Erfahrungspunkte + Level)
CREATE TABLE user_xp (
  user_id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  total_xp integer NOT NULL DEFAULT 0,
  level integer NOT NULL DEFAULT 1,
  streak_days integer NOT NULL DEFAULT 0,
  last_workout_date date,
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE user_xp ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read XP" ON user_xp FOR SELECT USING (true);
CREATE POLICY "Users can manage their own XP" ON user_xp FOR ALL
  USING (user_id = auth.uid()) WITH CHECK (user_id = auth.uid());

-- 14. Community Products (von Usern hinzugefügte Produkte per Barcode)
CREATE TABLE community_products (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  barcode text UNIQUE NOT NULL,
  name text NOT NULL,
  brand text,
  calories numeric NOT NULL DEFAULT 0,
  protein numeric NOT NULL DEFAULT 0,
  carbs numeric NOT NULL DEFAULT 0,
  fat numeric NOT NULL DEFAULT 0,
  created_by uuid REFERENCES auth.users(id),
  confirmations integer DEFAULT 1,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE community_products ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can read community products" ON community_products FOR SELECT USING (true);
CREATE POLICY "Authenticated users can insert" ON community_products FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);
CREATE POLICY "Anyone can update confirmations" ON community_products FOR UPDATE USING (true);

CREATE INDEX idx_community_products_barcode ON community_products(barcode);

-- 15. Product Overrides (persoenliche Korrekturen pro User)
CREATE TABLE product_overrides (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  barcode text NOT NULL,
  calories numeric NOT NULL,
  protein numeric NOT NULL,
  carbs numeric NOT NULL,
  fat numeric NOT NULL,
  created_at timestamptz DEFAULT now(),
  UNIQUE(user_id, barcode)
);

ALTER TABLE product_overrides ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can manage their own overrides" ON product_overrides FOR ALL
  USING (user_id = auth.uid()) WITH CHECK (user_id = auth.uid());
CREATE POLICY "Anyone can read overrides for crowdsource" ON product_overrides FOR SELECT USING (true);

CREATE INDEX idx_product_overrides_barcode ON product_overrides(barcode);

-- 16. Exercise Notes (Notizen + Geräte-Einstellungen pro User/Übung)
CREATE TABLE exercise_notes (
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  exercise_id text NOT NULL,
  note text DEFAULT '',
  settings jsonb DEFAULT '[]'::jsonb,
  updated_at timestamptz DEFAULT now(),
  PRIMARY KEY (user_id, exercise_id)
);

ALTER TABLE exercise_notes ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can manage their own exercise notes" ON exercise_notes FOR ALL
  USING (user_id = auth.uid()) WITH CHECK (user_id = auth.uid());

-- 17. Trigger: Automatisch Profile + Settings + Nutrition Goals + XP bei neuer Registrierung anlegen
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO profiles (id) VALUES (NEW.id) ON CONFLICT DO NOTHING;
  INSERT INTO user_settings (user_id) VALUES (NEW.id) ON CONFLICT DO NOTHING;
  INSERT INTO nutrition_goals (user_id) VALUES (NEW.id) ON CONFLICT DO NOTHING;
  INSERT INTO user_xp (user_id) VALUES (NEW.id) ON CONFLICT DO NOTHING;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();

-- 17. Supplements
CREATE TABLE supplements (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  name text NOT NULL,
  brand text,
  form text NOT NULL DEFAULT 'capsule',
  dosage_amount numeric NOT NULL DEFAULT 1,
  dosage_unit text NOT NULL DEFAULT 'Stück',
  notes text DEFAULT '',
  barcode text,
  schedule jsonb NOT NULL DEFAULT '{}',
  created_at timestamptz DEFAULT now(),
  deleted_at timestamptz
);

ALTER TABLE supplements ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users manage own supplements" ON supplements
  FOR ALL USING (user_id = auth.uid()) WITH CHECK (user_id = auth.uid());

-- 18. Supplement Logs (Einnahme-Bestätigungen)
CREATE TABLE supplement_logs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  supplement_id uuid NOT NULL REFERENCES supplements(id) ON DELETE CASCADE,
  date date NOT NULL DEFAULT CURRENT_DATE,
  time_slot text NOT NULL,
  taken_at timestamptz DEFAULT now(),
  UNIQUE (user_id, supplement_id, date, time_slot)
);

ALTER TABLE supplement_logs ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users manage own supplement logs" ON supplement_logs
  FOR ALL USING (user_id = auth.uid()) WITH CHECK (user_id = auth.uid());
