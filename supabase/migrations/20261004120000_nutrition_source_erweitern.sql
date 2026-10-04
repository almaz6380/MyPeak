-- nutrition_entries.source: erlaubte Werte an die App angleichen (04.10.2026).
--
-- Die CHECK-Regel aus schema.sql kannte nur manual, openfoodfacts,
-- custom_meal und local_db. Die App schreibt seit Langem auch ai_photo
-- (Mahlzeit-Foto), community (Community-Produkte) und recipe (Kochbuch) —
-- diese Einträge scheiterten beim Cloud-Insert, lagen nur im localStorage,
-- und AddFoodEntry meldete „Speichern fehlgeschlagen", obwohl lokal gespeichert
-- war. In der Datenbank gemessen: 0 Zeilen mit diesen Quellen.
--
-- Neu dazu: label_scan (Nährwerttabelle per Foto) und ai_plan (KI-Ernährungsplan).

ALTER TABLE public.nutrition_entries
  DROP CONSTRAINT IF EXISTS nutrition_entries_source_check;

ALTER TABLE public.nutrition_entries
  ADD CONSTRAINT nutrition_entries_source_check
  CHECK (source IN (
    'manual', 'openfoodfacts', 'custom_meal', 'local_db',
    'ai_photo', 'community', 'recipe', 'label_scan', 'ai_plan'
  ));
