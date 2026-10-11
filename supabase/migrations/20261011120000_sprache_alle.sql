-- Sprachwahl: alle sechs App-Sprachen zulassen, „noch nicht gewählt" = NULL.
--
-- Der Check stammte aus der Zeit mit zwei Sprachen. Seit 1.4.0/1.5.0 kann die
-- App es/fr/pt/ar — saveSetting() schrieb diese Wahl aber still ins Leere
-- (Update ohne Fehlerprüfung, Check verletzt), und loadSettings() setzte die
-- App bei der nächsten Anmeldung auf den alten Wert zurück.
--
-- Der Vorgabewert 'de' fällt weg: Ein neues Konto hat keine Sprache gewählt,
-- und dann soll die Gerätesprache gelten, nicht Deutsch. Bestehende Zeilen
-- bleiben unverändert.

ALTER TABLE public.user_settings DROP CONSTRAINT IF EXISTS user_settings_language_check;
ALTER TABLE public.user_settings
  ADD CONSTRAINT user_settings_language_check
  CHECK (language IS NULL OR language IN ('de', 'en', 'es', 'fr', 'pt', 'ar'));
ALTER TABLE public.user_settings ALTER COLUMN language DROP NOT NULL;
ALTER TABLE public.user_settings ALTER COLUMN language SET DEFAULT NULL;
