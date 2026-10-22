-- Sprachwahl: 13 App-Sprachen zulassen (22.10.2026, Version 1.6.0).
--
-- Neu: it, nl, pl, tr, ja, ko, zh. Ohne diese Migration geht die Wahl einer
-- neuen Sprache still verloren — genau der Fehler vom 11.10. (saveSetting
-- schreibt ohne Fehlerprüfung, loadSettings setzt bei der nächsten Anmeldung
-- zurück). Muss in Prod sein, BEVOR 1.6.0 ausgeliefert wird.

ALTER TABLE public.user_settings DROP CONSTRAINT IF EXISTS user_settings_language_check;
ALTER TABLE public.user_settings
  ADD CONSTRAINT user_settings_language_check
  CHECK (language IS NULL OR language IN (
    'de', 'en', 'es', 'fr', 'pt', 'ar',
    'it', 'nl', 'pl', 'tr', 'ja', 'ko', 'zh'
  ));
