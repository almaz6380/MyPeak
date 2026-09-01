import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import FullRepLogo from '../../components/FullRepLogo';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import StoreButtons from './StoreButtons';
import ResetPasswordForm from './ResetPasswordForm';

export default function AuthPage() {
  const { t } = useTranslation();
  const { signInAsGuest } = useAuth();
  const [view, setView] = useState('login');

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-surface-dark flex items-center justify-center p-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <FullRepLogo size={64} />
          </div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
            {t('auth.welcomeTitle')}
          </h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1">
            {t('auth.welcomeSubtitle')}
          </p>
        </div>

        <StoreButtons />

        <div className="bg-white dark:bg-surface-dark-alt rounded-2xl shadow-soft border border-slate-100 dark:border-slate-800/60 p-6">
          {view === 'login' && (
            <LoginForm
              onSwitchToRegister={() => setView('register')}
              onSwitchToReset={() => setView('reset')}
            />
          )}
          {view === 'register' && (
            <RegisterForm onSwitchToLogin={() => setView('login')} />
          )}
          {view === 'reset' && (
            <ResetPasswordForm onSwitchToLogin={() => setView('login')} />
          )}
        </div>

        {/* Guest mode button */}
        <button
          onClick={signInAsGuest}
          className="w-full mt-4 py-3 rounded-2xl border border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 text-sm font-medium hover:bg-white dark:hover:bg-surface-dark-alt transition-colors"
        >
          {t('auth.guestMode')}
        </button>

        {/* Legal links */}
        <div className="flex items-center justify-center gap-2 mt-6 text-xs text-slate-400 dark:text-slate-500">
          <Link to="/legal/imprint" className="hover:text-primary-400 transition-colors">{t('legal.imprint')}</Link>
          <span>·</span>
          <Link to="/legal/privacy" className="hover:text-primary-400 transition-colors">{t('legal.privacy')}</Link>
          <span>·</span>
          <Link to="/legal/terms" className="hover:text-primary-400 transition-colors">{t('legal.terms')}</Link>
        </div>
      </div>
    </div>
  );
}
