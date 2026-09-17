-- Ausdrückliche Einwilligung in die Verarbeitung von Gesundheitsdaten
-- (Art. 9 Abs. 2 lit. a DSGVO) mit Zeitstempel festhalten.
--
-- Bisher gab es im Onboarding nur EIN Häkchen „Ich akzeptiere AGB und
-- Datenschutzerklärung“. Eine gebündelte Vertragszustimmung ist keine
-- ausdrückliche Einwilligung — für Gewicht, Zyklusdaten, Symptomtagebuch und den
-- Health-Import fehlte damit die Rechtsgrundlage. Das Onboarding fragt jetzt in
-- einem eigenen Schritt und schreibt den Zeitpunkt hierher (Nachweispflicht,
-- Art. 7 Abs. 1). Bestandskonten bleiben NULL: Sie müssen die Einwilligung beim
-- nächsten App-Start nachholen (siehe AuthContext), nicht rückwirkend erhalten.
alter table public.profiles
  add column if not exists health_consent_at timestamptz;

comment on column public.profiles.health_consent_at is
  'Zeitpunkt der ausdrücklichen Art.-9-Einwilligung aus dem Onboarding. NULL = noch nicht erteilt (Bestandskonto vor 09/2026).';
