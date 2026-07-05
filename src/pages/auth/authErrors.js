// Übersetzt Supabase-Auth-Fehler in verständliche, lokalisierte Meldungen.
// Vorher wurde jeder Login-Fehler pauschal als "Ungültige E-Mail oder Passwort"
// angezeigt — auch "E-Mail nicht bestätigt", was Nutzer dauerhaft aussperrte.

export function mapAuthError(error, t) {
  const msg = (error?.message || '').toLowerCase();
  const status = error?.status;

  if (msg.includes('email not confirmed')) {
    return { code: 'email_not_confirmed', text: t('auth.emailNotConfirmed') };
  }
  if (msg.includes('invalid login credentials')) {
    return { code: 'invalid_credentials', text: t('auth.loginError') };
  }
  if (status === 429 || msg.includes('rate limit') || msg.includes('too many')) {
    return { code: 'rate_limit', text: t('auth.tooManyRequests') };
  }
  if (msg.includes('already registered') || msg.includes('already been registered')) {
    return { code: 'email_exists', text: t('auth.emailAlreadyRegistered') };
  }
  if (msg.includes('weak') || (msg.includes('password') && msg.includes('at least'))) {
    return { code: 'weak_password', text: t('auth.weakPassword') };
  }
  if (msg.includes('different from the old')) {
    return { code: 'same_password', text: t('auth.samePassword') };
  }
  if (msg.includes('invalid email') || msg.includes('unable to validate email')) {
    return { code: 'invalid_email', text: t('auth.invalidEmail') };
  }
  if (msg.includes('fetch') || msg.includes('network') || error?.name === 'AuthRetryableFetchError') {
    return { code: 'network', text: t('auth.networkError') };
  }
  return { code: 'unknown', text: t('auth.genericError') };
}
