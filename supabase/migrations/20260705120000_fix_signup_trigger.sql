-- Fix: Registrierung schlug mit "Database error saving new user" fehl.
-- Ursache: handle_new_user() nutzt unqualifizierte Tabellennamen, aber der
-- Auth-Dienst (Rolle supabase_auth_admin) läuft mit search_path=auth —
-- dadurch fand der Trigger die public-Tabellen nicht.
-- Lösung: search_path der Funktion fest auf public pinnen.
ALTER FUNCTION public.handle_new_user() SET search_path = public;
