-- Supplements: optionale Nährwerte je Einnahme (22.10.2026).
--
-- Ein Proteinshake hat 120 kcal und 24 g Protein, eine Vitamin-D-Kapsel
-- nichts. Wer Werte einträgt, bekommt sie beim Abhaken als Ernährungseintrag
-- in die Tagessumme (source 'supplement', source_id 'supp:<id>:<slot>').
-- NULL heißt „nicht angegeben", nicht 0.

ALTER TABLE public.supplements
  ADD COLUMN IF NOT EXISTS calories numeric,
  ADD COLUMN IF NOT EXISTS protein numeric,
  ADD COLUMN IF NOT EXISTS carbs numeric,
  ADD COLUMN IF NOT EXISTS fat numeric,
  ADD COLUMN IF NOT EXISTS fiber numeric;

ALTER TABLE public.nutrition_entries
  DROP CONSTRAINT IF EXISTS nutrition_entries_source_check;

ALTER TABLE public.nutrition_entries
  ADD CONSTRAINT nutrition_entries_source_check
  CHECK (source IN (
    'manual', 'openfoodfacts', 'custom_meal', 'local_db',
    'ai_photo', 'community', 'recipe', 'label_scan', 'ai_plan',
    'supplement'
  ));
