-- ============================================================
-- FullRep: Workout-Typ persistieren (Juli 2026)
--
-- Cardio/HIIT/Circuit/Kampfsport-Workouts tragen ein Feld `type`
-- (z. B. 'cardio', 'hiit', 'circuit', 'martial-arts'). Die Spalte
-- fehlte in der `workouts`-Tabelle, daher ging `type` beim Cloud-Sync
-- verloren: Cardio-Rekorde (getCardioRecord filtert auf type==='cardio')
-- lieferten immer 0, und synchronisierte Cardio-Sessions wurden im
-- Verlauf faelschlich als Kraft-Workout angezeigt.
--
-- Idempotent (IF NOT EXISTS). Bestehende Zeilen ohne Typ = Kraft (NULL).
-- WICHTIG: Vor/mit dem naechsten Deploy einspielen — der Code schreibt
-- `type` in den Insert; ohne Spalte wuerde der Cloud-Insert fehlschlagen
-- (lokal bleibt das Workout dank localStorage-first erhalten).
-- ============================================================

ALTER TABLE workouts ADD COLUMN IF NOT EXISTS type text;
