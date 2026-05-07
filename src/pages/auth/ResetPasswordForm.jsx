import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Mail, Loader2, CheckCircle, ArrowLeft } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export default function ResetPasswordForm({ onSwitchToLogin }) {
  const { t } = useTranslation();
  const { resetPassword } = useAuth();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    await resetPassword(email);
    setSent(true);
    setLoading(false);
  }

  if (sent) {
    return (
      <div className="text-center space-y-4 py-4">
        <CheckCircle className="w-16 h-16 text-green-500 mx-auto" />
        <p className="text-slate-700 dark:text-slate-300 text-lg font-medium">
          {t('auth.resetLinkSent')}
        </p>
        <button
          onClick={onSwitchToLogin}
          className="text-primary-600 dark:text-primary-400 font-medium hover:underline"
        >
          {t('auth.login')}
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <button
        type="button"
        onClick={onSwitchToLogin}
        className="flex items-center gap-1 text-sm text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 mb-2"
      >
        <ArrowLeft className="w-4 h-4" />
        {t('common.back')}
      </button>

      <p className="text-sm text-slate-600 dark:text-slate-400">
        {t('auth.resetPassword')}
      </p>

      <div className="relative">
        <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={t('auth.email')}
          required
          className="w-full pl-11 pr-4 py-3.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full py-3.5 bg-primary-600 hover:bg-primary-700 disabled:opacity-50 text-white font-semibold rounded-2xl transition-colors flex items-center justify-center gap-2"
      >
        {loading && <Loader2 className="w-5 h-5 animate-spin" />}
        {t('auth.sendResetLink')}
      </button>
    </form>
  );
}
