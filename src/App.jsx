import { useState, useEffect, useCallback } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Loader2 } from 'lucide-react';
import { useAuth } from './context/AuthContext';
import { ActiveWorkoutProvider } from './context/ActiveWorkoutContext';
import SplashScreen from './components/SplashScreen';
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
  const handleSplashFinished = useCallback(() => setShowSplash(false), []);

  if (showSplash) {
    return <SplashScreen onFinished={handleSplashFinished} />;
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
