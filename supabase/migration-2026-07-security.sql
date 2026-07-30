-- ============================================================
-- FullRep Sicherheits-Migration (Juli 2026)
-- Im Supabase Dashboard unter SQL Editor ausführen (einmalig).
--
-- Behebt:
-- 1. Profile aller Nutzer waren öffentlich lesbar (Gesundheitsdaten!)
-- 2. XP aller Nutzer war öffentlich lesbar
-- 3. Ernährungs-Korrekturen (product_overrides) waren öffentlich lesbar
-- 4. Jeder konnte Community-Produkte beliebig überschreiben
-- 5. Leaderboard konnte Freunde-Workouts nie lesen (war stumm kaputt)
-- 6. Konto-Löschung schlug fehl, wenn der User Community-Produkte
--    erstellt oder Challenges gewonnen hatte (fehlende FK-Regeln)
-- ============================================================

-- ── Hilfsfunktion: Sind zwei User befreundet? ─────────────────
CREATE OR REPLACE FUNCTION public.is_friend(other_user uuid)
RETURNS boolean LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT EXISTS (
    SELECT 1 FROM friendships f
    WHERE f.status = 'accepted'
      AND ((f.sender_id = auth.uid() AND f.receiver_id = other_user)
        OR (f.receiver_id = auth.uid() AND f.sender_id = other_user))
  );
$$;
REVOKE ALL ON FUNCTION public.is_friend(uuid) FROM public, anon;
GRANT EXECUTE ON FUNCTION public.is_friend(uuid) TO authenticated;

-- ── 1. Profile: nur noch das eigene Profil lesbar ─────────────
DROP POLICY IF EXISTS "Users can view their own profile" ON profiles;
CREATE POLICY "Users can view their own profile"
  ON profiles FOR SELECT
  USING (id = auth.uid());

-- Für Freundesliste/Anfragen/Challenges: nur id + name über eine View
-- (View läuft mit Owner-Rechten und gibt NUR Name von Freunden/Anfragen frei)
CREATE OR REPLACE VIEW public.friend_profiles AS
SELECT p.id, p.name
FROM profiles p
WHERE p.id = auth.uid()
   OR EXISTS (
     SELECT 1 FROM friendships f
     WHERE f.status IN ('pending', 'accepted')
       AND ((f.sender_id = auth.uid() AND f.receiver_id = p.id)
         OR (f.receiver_id = auth.uid() AND f.sender_id = p.id))
   );
REVOKE ALL ON public.friend_profiles FROM public, anon;
GRANT SELECT ON public.friend_profiles TO authenticated;

-- ── 2. XP: nur eigene + Freunde (fürs Leaderboard) ────────────
DROP POLICY IF EXISTS "Anyone can read XP" ON user_xp;
CREATE POLICY "Users and friends can read XP"
  ON user_xp FOR SELECT
  USING (user_id = auth.uid() OR public.is_friend(user_id));

-- ── 3. Workouts: Freunde dürfen lesen (Leaderboard-Fix) ───────
DROP POLICY IF EXISTS "Friends can read workouts" ON workouts;
CREATE POLICY "Friends can read workouts"
  ON workouts FOR SELECT
  USING (public.is_friend(user_id));

-- ── 4. Overrides: öffentliches Lesen entfernen ────────────────
DROP POLICY IF EXISTS "Anyone can read overrides for crowdsource" ON product_overrides;

-- ── 5. Community-Produkte: freies Überschreiben entfernen ─────
DROP POLICY IF EXISTS "Anyone can update confirmations" ON community_products;

-- Bestätigungen zählen: nur +1, nichts anderes änderbar
CREATE OR REPLACE FUNCTION public.increment_confirmations(barcode_input text)
RETURNS void LANGUAGE sql SECURITY DEFINER SET search_path = public AS $$
  UPDATE community_products
  SET confirmations = COALESCE(confirmations, 0) + 1
  WHERE barcode = barcode_input;
$$;
REVOKE ALL ON FUNCTION public.increment_confirmations(text) FROM public, anon;
GRANT EXECUTE ON FUNCTION public.increment_confirmations(text) TO authenticated;

-- Crowdsource-Korrektur: läuft komplett serverseitig mit fester Logik
-- (3+ ähnliche Korrekturen → Durchschnitt übernehmen; eine einzige Anweisung)
CREATE OR REPLACE FUNCTION public.apply_crowdsource_correction(barcode_input text)
RETURNS void LANGUAGE sql SECURITY DEFINER SET search_path = public AS $fn$
  WITH stats AS (
    SELECT count(*) AS cnt,
           round(avg(calories)) AS avg_cal,
           round(avg(protein)::numeric, 1) AS avg_p,
           round(avg(carbs)::numeric, 1) AS avg_c,
           round(avg(fat)::numeric, 1) AS avg_f
    FROM product_overrides WHERE barcode = barcode_input
  ),
  sim AS (
    SELECT bool_and(s.avg_cal = 0 OR abs(o.calories - s.avg_cal) / s.avg_cal < 0.15) AS ok
    FROM product_overrides o, stats s
    WHERE o.barcode = barcode_input
  )
  UPDATE community_products cp
  SET calories = s.avg_cal, protein = s.avg_p, carbs = s.avg_c, fat = s.avg_f, confirmations = s.cnt
  FROM stats s, sim si
  WHERE cp.barcode = barcode_input
    AND s.cnt >= 3
    AND COALESCE(si.ok, false)
$fn$;
REVOKE ALL ON FUNCTION public.apply_crowdsource_correction(text) FROM public, anon;
GRANT EXECUTE ON FUNCTION public.apply_crowdsource_correction(text) TO authenticated;

-- ── 6a. Fehlende Spalten (App schreibt sie bereits, Insert schlug still fehl) ──
ALTER TABLE nutrition_goals ADD COLUMN IF NOT EXISTS water_ml integer DEFAULT 3000;
ALTER TABLE nutrition_goals ADD COLUMN IF NOT EXISTS fiber numeric DEFAULT 30;

-- ── 6. FK-Regeln, damit Konto-Löschung nie blockiert ──────────
ALTER TABLE community_products
  DROP CONSTRAINT IF EXISTS community_products_created_by_fkey,
  ADD CONSTRAINT community_products_created_by_fkey
    FOREIGN KEY (created_by) REFERENCES auth.users(id) ON DELETE SET NULL;

ALTER TABLE challenges
  DROP CONSTRAINT IF EXISTS challenges_winner_id_fkey,
  ADD CONSTRAINT challenges_winner_id_fkey
    FOREIGN KEY (winner_id) REFERENCES auth.users(id) ON DELETE SET NULL;
