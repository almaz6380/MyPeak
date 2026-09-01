import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Mail, Lock, Loader2 } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { supabase } from '../../lib/supabase';
import { mapAuthError } from './authErrors';

export default function LoginForm({ onSwitchToRegister, onSwitchToReset }) {
  const { t } = useTranslation();
  const { signIn } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [errorCode, setErrorCode] = useState(null);
  const [resent, setResent] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setErrorCode(null);
    setResent(false);
    setLoading(true);

    const { error } = await signIn(email, password);
    if (error) {
      const mapped = mapAuthError(error, t);
      setError(mapped.text);
      setErrorCode(mapped.code);
    }
    setLoading(false);
  }

  async function handleResendConfirmation() {
    try {
      await supabase.auth.resend({ type: 'signup', email });
      setResent(true);
    } catch {
      setResent(true); // keine E-Mail-Enumeration: immer Erfolg anzeigen
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 text-sm rounded-xl p-3 text-center">
          {error}
          {errorCode === 'email_not_confirmed' && (
            resent ? (
              <p className="mt-2 text-green-600 dark:text-green-400 font-medium">{t('auth.confirmationResent')}</p>
            ) : (
              <button
                type="button"
                onClick={handleResendConfirmation}
                className="block w-full mt-2 font-medium underline"
              >
                {t('auth.resendConfirmation')}
              </button>
            )
          )}
        </div>
      )}

      <div className="relative">
        <Mail className="absolute start-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={t('auth.email')}
          required
          className="w-full ps-11 pe-4 py-3.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-transparent"
        />
      </div>

      <div className="relative">
        <Lock className="absolute start-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder={t('auth.password')}
          required
          className="w-full ps-11 pe-4 py-3.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-transparent"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full py-3.5 bg-primary-500 hover:bg-primary-600 disabled:opacity-50 text-white font-semibold rounded-2xl transition-colors flex items-center justify-center gap-2"
      >
        {loading && <Loader2 className="w-5 h-5 animate-spin" />}
        {t('auth.login')}
      </button>

      <button
        type="button"
        onClick={onSwitchToReset}
        className="w-full text-sm text-primary-500 dark:text-primary-400 hover:underline"
      >
        {t('auth.forgotPassword')}
      </button>

      <p className="text-center text-sm text-slate-500 dark:text-slate-400">
        {t('auth.noAccount')}{' '}
        <button
          type="button"
          onClick={onSwitchToRegister}
          className="text-primary-500 dark:text-primary-400 font-medium hover:underline"
        >
          {t('auth.register')}
        </button>
      </p>
    </form>
  );
}
