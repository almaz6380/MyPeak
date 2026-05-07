import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Dumbbell } from 'lucide-react';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import ResetPasswordForm from './ResetPasswordForm';

export default function AuthPage() {
  const { t } = useTranslation();
  const [view, setView] = useState('login');

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-surface-dark flex items-center justify-center p-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-primary-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Dumbbell className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
            {t('auth.welcomeTitle')}
          </h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1">
            {t('auth.welcomeSubtitle')}
          </p>
        </div>

        <div className="bg-white dark:bg-surface-dark-alt rounded-2xl shadow-sm p-6">
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
      </div>
    </div>
  );
}
