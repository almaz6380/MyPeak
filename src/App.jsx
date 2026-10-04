import { useState, useEffect, useCallback } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Loader2 } from 'lucide-react';
import { useAuth } from './context/AuthContext';
import { ActiveWorkoutProvider } from './context/ActiveWorkoutContext';
import { CameraProvider } from './context/CameraContext';
import SplashScreen from './components/SplashScreen';
import BottomNav from './components/BottomNav';
import BackgroundLayer from './components/BackgroundLayer';
import PullToRefresh from './components/PullToRefresh';
import { useRefreshKey } from './components/pullToRefreshContext';
import HomePage from './pages/HomePage';
import TrainingPage from './pages/TrainingPage';
import NutritionPage from './pages/NutritionPage';
import LibraryPage from './pages/LibraryPage';
import ProfilePage from './pages/ProfilePage';
import CycleDetailPage from './pages/CycleDetailPage';
import ProgressPhotosPage from './pages/progress/ProgressPhotosPage';
import CoachPage from './pages/CoachPage';
import MealPlanPage from './pages/nutrition/MealPlanPage';
import StatsPage from './pages/StatsPage';
import AuthPage from './pages/auth/AuthPage';
import UpdatePasswordPage from './pages/auth/UpdatePasswordPage';
import OnboardingPage from './pages/onboarding/OnboardingPage';
import HealthConsentGate from './components/HealthConsentGate';
import LegalPage from './pages/legal/LegalPage';
import { useTextrichtung } from './hooks/useTextrichtung';

export default function App() {
  const { user, profile, loading, isGuestMode } = useAuth();
  const { t } = useTranslation();
  // Setzt lang/dir am <html>. Steht bewusst hier oben und nicht in `AppShell`:
  // Dort griffe es erst NACH dem Login, Splash, Anmeldung und Onboarding
  // blieben also links-nach-rechts. Und bewusst vor den frühen `return`s —
  // ein Hook nach einem `return` läuft in genau den Fällen nicht.
  useTextrichtung();
  // Skip splash for returning users — show instantly
  const [showSplash, setShowSplash] = useState(() => {
    if (localStorage.getItem('splashSeen')) return false;
    return true;
  });
  const handleSplashFinished = useCallback(() => {
    localStorage.setItem('splashSeen', 'true');
    setShowSplash(false);
  }, []);

  if (showSplash) {
    return <SplashScreen onFinished={handleSplashFinished} />;
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f6f4f0] dark:bg-[#0a0a0a] flex flex-col items-center justify-center gap-4">
        <img src="/fullrep-icon-v2.svg" alt="FullRep" className="w-28 h-28 opacity-50" />
        <Loader2 className="w-6 h-6 text-primary-400 animate-spin" />
      </div>
    );
  }

  return (
    <Routes>
      <Route path="/auth/update-password" element={<UpdatePasswordPage />} />
      <Route path="/legal/imprint" element={<LegalPage doc="imprint" />} />
      <Route path="/legal/privacy" element={<LegalPage doc="privacy" />} />
      <Route path="/legal/terms" element={<LegalPage doc="terms" />} />
      <Route path="/legal/health" element={<LegalPage doc="health" />} />
      <Route path="/coach" element={user ? <CoachPage /> : <AuthPage />} />
      <Route path="/meal-plan" element={user ? <MealPlanPage /> : <AuthPage />} />
      <Route path="/stats" element={user ? <StatsPage /> : <AuthPage />} />
      <Route
        path="*"
        element={
          !user ? (
            <AuthPage />
          ) : !profile?.onboarding_completed ? (
            <OnboardingPage />
          ) : !isGuestMode && !profile?.health_consent_at ? (
            // Bestandskonto ohne ausdrückliche Art.-9-Einwilligung: erst nachholen.
            <HealthConsentGate />
          ) : (
            <AppShell />
          )
        }
      />
    </Routes>
  );
}

function NotFound() {
  const { t } = useTranslation();
  return (
    <div className="flex flex-col items-center justify-center gap-4 pt-40 px-6 text-center">
      <p className="text-5xl font-bold text-primary-400">404</p>
      <p className="text-slate-500 dark:text-slate-400">{t('common.pageNotFound')}</p>
      <Link to="/" className="px-6 py-3 bg-primary-500 hover:bg-primary-600 text-white font-semibold rounded-2xl transition-colors">
        {t('common.backHome')}
      </Link>
    </div>
  );
}

// Der Refresh-Key hängt am Routen-Baum: Pull-to-Refresh erhöht ihn, die
// aktuelle Seite montiert neu und lädt ihre Daten — ohne WebView-Reload.
function AppRoutes() {
  const refreshKey = useRefreshKey();

  return (
    <Routes key={refreshKey}>
      <Route path="/" element={<HomePage />} />
      <Route path="/training" element={<TrainingPage />} />
      <Route path="/nutrition" element={<NutritionPage />} />
      <Route path="/library" element={<LibraryPage />} />
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="/cycle" element={<CycleDetailPage onBack={() => window.history.back()} />} />
      <Route path="/progress" element={<ProgressPhotosPage />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

function AppShell() {
  const { isGuestMode, refreshProfile } = useAuth();
  const { t } = useTranslation();

  return (
    <CameraProvider>
    <ActiveWorkoutProvider>
      {isGuestMode && (
        <div
          className="bg-amber-50 dark:bg-amber-900/20 border-b border-amber-200 dark:border-amber-800 px-4 py-2 text-center"
          style={{ paddingTop: 'calc(0.5rem + var(--safe-area-inset-top, env(safe-area-inset-top, 0px)))' }}
        >
          <p className="text-xs text-amber-700 dark:text-amber-400">
            {t('auth.guestBanner')}
          </p>
        </div>
      )}
      <BackgroundLayer />
      <PullToRefresh onRefresh={refreshProfile}>
        <main
          className="min-h-screen max-w-lg mx-auto"
          style={{ paddingBottom: 'calc(5rem + var(--safe-area-inset-bottom, env(safe-area-inset-bottom, 0px)))' }}
        >
          <AppRoutes />
        </main>
      </PullToRefresh>
      <BottomNav />
    </ActiveWorkoutProvider>
    </CameraProvider>
  );
}
