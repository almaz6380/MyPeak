import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Loader2 } from 'lucide-react';
import { useAuth } from './context/AuthContext';
import { ActiveWorkoutProvider } from './context/ActiveWorkoutContext';
import BottomNav from './components/BottomNav';
import TrainingPage from './pages/TrainingPage';
import NutritionPage from './pages/NutritionPage';
import LibraryPage from './pages/LibraryPage';
import ProfilePage from './pages/ProfilePage';
import AuthPage from './pages/auth/AuthPage';
import UpdatePasswordPage from './pages/auth/UpdatePasswordPage';
import OnboardingPage from './pages/onboarding/OnboardingPage';

export default function App() {
  const { user, profile, loading } = useAuth();
  const { t } = useTranslation();
  const [showSplash, setShowSplash] = useState(true);
  const [splashFading, setSplashFading] = useState(false);

  useEffect(() => {
    const fadeTimer = setTimeout(() => setSplashFading(true), 800);
    const hideTimer = setTimeout(() => setShowSplash(false), 1200);
    return () => { clearTimeout(fadeTimer); clearTimeout(hideTimer); };
  }, []);

  if (showSplash) {
    return (
      <div className={`min-h-screen bg-[#0a0a0a] flex items-center justify-center transition-opacity duration-400 ${splashFading ? 'opacity-0' : 'opacity-100'}`}>
        <img src="/mypeak-icon-v2.svg" alt="MyPeak" className="w-40 h-40" />
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-surface-dark flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-primary-500 animate-spin" />
      </div>
    );
  }

  return (
    <Routes>
      <Route path="/auth/update-password" element={<UpdatePasswordPage />} />
      <Route
        path="*"
        element={
          !user ? (
            <AuthPage />
          ) : !profile?.onboarding_completed ? (
            <OnboardingPage />
          ) : (
            <AppShell />
          )
        }
      />
    </Routes>
  );
}

function AppShell() {
  const { isGuestMode } = useAuth();
  const { t } = useTranslation();

  return (
    <ActiveWorkoutProvider>
      {isGuestMode && (
        <div className="bg-amber-50 dark:bg-amber-900/20 border-b border-amber-200 dark:border-amber-800 px-4 py-2 text-center">
          <p className="text-xs text-amber-700 dark:text-amber-400">
            {t('auth.guestBanner')}
          </p>
        </div>
      )}
      <main className="min-h-screen max-w-lg mx-auto pb-20">
        <Routes>
          <Route path="/" element={<TrainingPage />} />
          <Route path="/nutrition" element={<NutritionPage />} />
          <Route path="/library" element={<LibraryPage />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Routes>
      </main>
      <BottomNav />
    </ActiveWorkoutProvider>
  );
}
