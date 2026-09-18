import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Check, Loader2 } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../context/AuthContext';

// Nachholen der Art.-9-Einwilligung für Konten, die vor dem 17.09.2026 durch
// das Onboarding gegangen sind. Damals gab es nur die Sammelzustimmung zu AGB
// und Datenschutzerklärung — für Gewicht, Zyklusdaten und den Health-Import
// ist das keine ausdrückliche Einwilligung (Art. 9 Abs. 2 lit. a DSGVO).
//
// Der Dialog blockiert die App mit Absicht: Ohne Einwilligung dürfen wir die
// vorhandenen Gesundheitsdaten nicht weiterverarbeiten. Wer nicht einwilligen
// will, kann das Konto löschen lassen; der Hinweis dazu steht im Dialog.
// Gäste sehen ihn nie — ihre Daten liegen nur auf dem Gerät, wir verarbeiten
// dort nichts.
export default function HealthConsentGate() {
  const { t } = useTranslation();
  const { user, refreshProfile } = useAuth();
  const [checked, setChecked] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  async function accept() {
    if (!checked || !user?.id) return;
    setSaving(true);
    setError('');
    try {
      const { error: updateError } = await supabase
        .from('profiles')
        .update({ health_consent_at: new Date().toISOString() })
        .eq('id', user.id);
      if (updateError) throw updateError;
      await refreshProfile();
    } catch (err) {
      setError(`${t('onboarding.saveError')} (${err.message})`);
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 p-4">
      <div className="w-full max-w-md rounded-3xl bg-white dark:bg-surface-dark-alt p-6 shadow-xl">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
          {t('consentGate.title')}
        </h2>
        <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
          {t('onboarding.healthConsentText')}
        </p>

        <button
          type="button"
          onClick={() => setChecked((v) => !v)}
          className={`w-full p-4 rounded-2xl border-2 transition-all flex items-center gap-3 text-start ${
            checked
              ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
              : 'border-slate-200 dark:border-slate-700'
          }`}
        >
          <span className={`w-6 h-6 shrink-0 rounded-lg border-2 flex items-center justify-center ${
            checked ? 'border-primary-500 bg-primary-500' : 'border-slate-300 dark:border-slate-600'
          }`}>
            {checked && <Check className="w-4 h-4 text-white" />}
          </span>
          <span className="text-sm font-medium text-slate-800 dark:text-slate-200">
            {t('onboarding.healthConsentAccept')}
          </span>
        </button>

        {error && <p className="mt-3 text-sm text-red-600">{error}</p>}

        <button
          type="button"
          disabled={!checked || saving}
          onClick={accept}
          className="mt-4 w-full py-3 rounded-2xl bg-primary-500 hover:bg-primary-600 disabled:opacity-50 text-white font-semibold flex items-center justify-center gap-2"
        >
          {saving && <Loader2 className="w-4 h-4 animate-spin" />}
          {t('onboarding.next')}
        </button>

        <p className="mt-4 text-xs text-slate-500 dark:text-slate-400">
          {t('consentGate.deleteHint')}{' '}
          <a href="/legal/privacy" target="_blank" rel="noopener" className="underline">
            {t('legal.privacy')}
          </a>
        </p>
      </div>
    </div>
  );
}
