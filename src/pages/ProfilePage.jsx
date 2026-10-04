import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { appSprache, beschriftung, SPRACHEN, SPRACHNAMEN } from '../lib/sprache';
import { Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import { saveSetting } from '../data/settingsStorage';
import FullRepLogo from '../components/FullRepLogo';
import CardPhotoMotif from '../components/CardPhotoMotif';
import { supabase } from '../lib/supabase';
import { Moon, Sun, Globe, Weight, LogOut, ChevronRight, Pencil, X, Check, Loader2, Copy, QrCode, Trophy, FileText, Trash2, ShieldCheck, Crown, HeartPulse, BarChart3 } from 'lucide-react';
import { useSubscription } from '../context/SubscriptionContext';
import { getOrCreateFriendCode, getXP, getLevelTitle, calculateLevel, hasGoldenFrame } from '../data/socialStorage';
import AchievementGallery from '../components/progress/AchievementGallery';
import { canChangeAdConsent, changeAdConsent } from '../lib/ads';
import { clearAllLocalPhotos } from '../data/exercisePhotos';
import { API_BASIS } from '../data/apiBasis';
import { Capacitor } from '@capacitor/core';
import { healthVerfuegbar, istVerbunden, verbinden, trennen, gewichtImportieren } from '../lib/health';

// Sichtbare Build-Kennung — muss bei jedem neuen Store-Build mitgezogen werden (siehe android/app/build.gradle)
const APP_VERSION = '1.5.4 (13)';

export default function ProfilePage() {
  const { t, i18n } = useTranslation();
  const { darkMode, toggleDarkMode } = useTheme();
  const { user, profile, signOut, refreshProfile, isGuestMode } = useAuth();
  const { isPremium, isTrial, trialDaysLeft, openPaywall } = useSubscription();
  const [weightUnit, setWeightUnit] = useState(() => localStorage.getItem('weightUnit') || 'kg');
  const [showSignOutConfirm, setShowSignOutConfirm] = useState(false);
  const [editField, setEditField] = useState(null); // which field is being edited
  const [editValue, setEditValue] = useState(null);
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState(null);
  const [friendCode, setFriendCode] = useState(null);
  const [copied, setCopied] = useState(false);
  const [xpData, setXpData] = useState({ total_xp: 0, level: 1, streak_days: 0 });

  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState(null);
  const [deletePassword, setDeletePassword] = useState('');
  const [healthOn, setHealthOn] = useState(() => istVerbunden(user?.id));
  const [showWithdrawConsent, setShowWithdrawConsent] = useState(false);
  const [withdrawing, setWithdrawing] = useState(false);
  const [withdrawError, setWithdrawError] = useState(null);

  useEffect(() => {
    setHealthOn(istVerbunden(user?.id));
  }, [user?.id]);

  useEffect(() => {
    if (user && !isGuestMode) {
      getOrCreateFriendCode(user.id, profile?.name).then((code) => code && setFriendCode(code));
      getXP(user.id).then(setXpData);
    }
  }, [user, isGuestMode, profile?.name]);

  // Auswahl statt Durchtippen. Bis zu drei Sprachen war ein Knopf, der
  // reihum schaltet, vertretbar; bei sechs müsste man fünfmal tippen, um von
  // Deutsch nach Arabisch zu kommen — und käme man einmal zu weit, nochmal
  // fünfmal. Die Liste zeigt jede Sprache in sich selbst („Français", nicht
  // „Französisch"): Wer sie sucht, kennt nur diesen Namen.
  const [spracheOffen, setSpracheOffen] = useState(false);

  const spracheWaehlen = (neueSprache) => {
    setSpracheOffen(false);
    i18n.changeLanguage(neueSprache);
    localStorage.setItem('language', neueSprache);
    if (user) saveSetting(user.id, 'language', neueSprache);
  };

  const toggleWeightUnit = () => {
    const newUnit = weightUnit === 'kg' ? 'lbs' : 'kg';
    setWeightUnit(newUnit);
    localStorage.setItem('weightUnit', newUnit);
    if (user) saveSetting(user.id, 'weightUnit', newUnit);
  };

  const handleSignOut = async () => {
    await signOut();
  };

  const handleDeleteAccount = async () => {
    setDeleting(true);
    setDeleteError(null);
    // Passwort-Bestätigung: verhindert Löschung durch Dritte am entsperrten Gerät
    const { error: pwError } = await supabase.auth.signInWithPassword({
      email: user.email,
      password: deletePassword,
    });
    if (pwError) {
      setDeleteError(t('auth.wrongPassword'));
      setDeleting(false);
      return;
    }
    try {
      const { data: { session } } = await supabase.auth.getSession();
      const token = session?.access_token;
      if (!token) throw new Error('no session');
      const res = await fetch(`${API_BASIS}/api/delete-account`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error('delete failed');
      // Alle lokalen Daten entfernen, damit nichts vom Konto zurückbleibt —
      // inkl. der IndexedDB-Fotos (Fortschritts-/Körperfotos, on-device DSGVO).
      await clearAllLocalPhotos().catch(() => {});
      localStorage.clear();
      await supabase.auth.signOut().catch(() => {});
      window.location.href = '/';
    } catch {
      setDeleteError(t('auth.deleteAccountError'));
      setDeleting(false);
    }
  };

  // Widerruf der Art.-9-Einwilligung (Art. 7 Abs. 3 DSGVO: so einfach wie die
  // Erteilung). Setzt health_consent_at zurück auf NULL — danach greift das
  // HealthConsentGate in App.jsx wieder und blockiert die App, bis erneut
  // eingewilligt oder das Konto gelöscht wird. Die Health-Verbindung wird
  // gleich mit getrennt, damit kein Import mehr läuft.
  const handleWithdrawConsent = async () => {
    if (!user?.id || isGuestMode) return;
    setWithdrawing(true);
    setWithdrawError(null);
    try {
      const { error } = await supabase
        .from('profiles')
        .update({ health_consent_at: null })
        .eq('id', user.id);
      if (error) throw error;
      if (healthOn) {
        trennen(user.id);
        setHealthOn(false);
      }
      setShowWithdrawConsent(false);
      await refreshProfile();
    } catch {
      setWithdrawError(t('consentGate.withdrawError'));
    } finally {
      setWithdrawing(false);
    }
  };

  const openEdit = (field, currentValue) => {
    setEditField(field);
    setEditValue(currentValue ?? '');
  };

  const closeEdit = () => {
    setEditField(null);
    setEditValue(null);
    setSaving(false);
    setSaveError(null);
  };

  const saveEdit = async () => {
    if (!user || editField === null) return;
    setSaving(true);
    setSaveError(null);
    const { error } = await supabase
      .from('profiles')
      .update({ [editField]: editValue, updated_at: new Date().toISOString() })
      .eq('id', user.id);
    if (error) {
      setSaveError(error.message);
      setSaving(false);
      return;
    }
    await refreshProfile();
    closeEdit();
  };

  // Display helpers
  const genderLabel = (val) => {
    const map = { male: t('onboarding.male'), female: t('onboarding.female'), diverse: t('onboarding.diverse') };
    return map[val] || '—';
  };

  const goalLabel = (val) => {
    const map = { muscle_gain: t('onboarding.muscleGain'), maintenance: t('onboarding.maintenance'), weight_loss: t('onboarding.weightLoss') };
    return map[val] || '—';
  };

  const activityLabel = (val) => {
    const map = { sedentary: t('onboarding.sedentary'), moderate: t('onboarding.moderate'), very_active: t('onboarding.veryActive') };
    return map[val] || '—';
  };

  const experienceLabel = (val) => {
    const map = { beginner: t('onboarding.beginner'), intermediate: t('onboarding.intermediate'), pro: t('onboarding.pro') };
    return map[val] || '—';
  };

  return (
    <div className="p-4 pt-16 pb-24">
      <div className="flex flex-col items-center pt-12 mb-6">
        <FullRepLogo size={36} />
        <h1 className="text-2xl font-bold mt-2">{t('profile.title')}</h1>
      </div>

      {/* User header */}
      {profile?.name && (
        <div className="relative overflow-hidden flex items-center gap-4 mb-6 p-4 karte">
          <CardPhotoMotif src="/bg-photos/profile-icon.png" />
          <div className="w-12 h-12 rounded-full bg-primary-100 dark:bg-primary-900/20 flex items-center justify-center">
            <img src="/bg-photos/profile-icon.png" alt="" aria-hidden="true" className="h-7 w-auto object-contain" />
          </div>
          <div>
            <p className="text-lg font-semibold text-slate-900 dark:text-white">{profile.name}</p>
            <p className="text-sm text-slate-500 dark:text-slate-400">{user?.email}</p>
          </div>
        </div>
      )}

      {/* FullRep Code + XP */}
      {!isGuestMode && (() => {
        const levelInfo = calculateLevel(xpData.total_xp || 0);
        const title = getLevelTitle(levelInfo.level);
        const golden = hasGoldenFrame(levelInfo.level);
        const lang = appSprache(i18n.language);
        return (
        <div className={`karte p-4 mb-4 ${golden ? 'ring-2 ring-primary-400 shadow-primary-400/20 shadow-lg' : ''}`}>
          {/* Level + Title */}
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <span className="text-lg">{title.emoji}</span>
              <div>
                <span className="text-sm font-bold text-primary-400">Level {levelInfo.level}</span>
                <span className="text-xs text-slate-400 dark:text-slate-500 ms-2">{beschriftung(title, lang)}</span>
              </div>
            </div>
            <span className="text-xs text-slate-400 dark:text-slate-500">{xpData.streak_days || 0} 🔥</span>
          </div>
          {/* XP Progress */}
          <div className="flex items-center gap-2 mb-1">
            <div className="flex-1 h-2.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
              <div className="h-full bg-primary-400 rounded-full transition-all" style={{ width: `${Math.round(levelInfo.progress * 100)}%` }} />
            </div>
            <span className="text-[10px] text-slate-400 font-mono">{levelInfo.xpInCurrentLevel}/{levelInfo.xpToNextLevel}</span>
          </div>
          <p className="text-[10px] text-slate-400 dark:text-slate-500">{xpData.total_xp || 0} XP {t('ui.total')}</p>
          {/* Friend Code */}
          {friendCode && (
            <div>
              <p className="text-xs text-slate-400 dark:text-slate-500 mb-1">{t('ui.myFullrepCode')}</p>
              <div className="flex items-center gap-2">
                <code className="flex-1 bg-slate-50 dark:bg-slate-800 rounded-xl px-4 py-2.5 text-center font-mono text-sm font-bold tracking-wider text-primary-400">
                  {friendCode}
                </code>
                <button
                  onClick={() => { navigator.clipboard.writeText(friendCode); setCopied(true); setTimeout(() => setCopied(false), 2000); }}
                  className={`p-2.5 rounded-xl transition-colors ${copied ? 'bg-green-100 dark:bg-green-900/30 text-green-500' : 'bg-slate-100 dark:bg-slate-800 text-slate-400 hover:text-primary-400'}`}
                >
                  {copied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
                </button>
              </div>
            </div>
          )}
        </div>
        );
      })()}

      {/* FullRep Premium */}
      <button
        onClick={() => { if (!isPremium) openPaywall(); }}
        className={`relative overflow-hidden w-full rounded-2xl shadow-soft p-4 mb-4 flex items-center justify-between border ${
          isPremium
            ? 'bg-gradient-to-br from-primary-400/15 to-primary-600/10 border-primary-300 dark:border-primary-700'
            : 'bg-white dark:bg-surface-dark-alt border-slate-100 dark:border-slate-800/60'
        }`}
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center flex-shrink-0">
            <Crown className="w-5 h-5 text-white" />
          </div>
          <div className="text-start">
            <p className="text-sm font-semibold text-slate-700 dark:text-slate-200">FullRep Premium</p>
            <p className="text-[11px] text-slate-400">
              {isPremium
                ? (isTrial
                    ? (t('ui.trialActiveTrialdaysleftDaysLeft', { trialDaysLeft }))
                    : (t('ui.premiumActive')))
                : (t('ui.unlockAiCoachMore'))}
            </p>
          </div>
        </div>
        {isPremium
          ? <span className="text-[11px] font-semibold text-primary-500 dark:text-primary-400">✓</span>
          : <ChevronRight className="w-5 h-5 text-slate-300" />}
      </button>

      {/* Statistiken (Premium) */}
      <Link
        to="/stats"
        className="relative overflow-hidden w-full karte p-4 mb-4 flex items-center justify-between"
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-primary-50 dark:bg-primary-900/20 flex items-center justify-center">
            <BarChart3 className="w-5 h-5 text-primary-500" />
          </div>
          <div className="text-start">
            <p className="text-sm font-semibold text-slate-700 dark:text-slate-200 flex items-center gap-1.5">
              {t('premium.statsTitle')}
              {!isPremium && <Crown className="w-3.5 h-3.5 text-primary-500" />}
            </p>
            <p className="text-[11px] text-slate-400">{t('premium.statsSubtitle')}</p>
          </div>
        </div>
        <ChevronRight className="w-5 h-5 text-slate-300 rtl:-scale-x-100" />
      </Link>

      {/* Erfolge & Abzeichen */}
      <AchievementGallery userId={user?.id} />

      {/* Mein Fortschritt (Fotos) */}
      <Link
        to="/progress"
        className="relative overflow-hidden w-full karte p-4 mb-4 flex items-center justify-between"
      >
        <CardPhotoMotif src="/bg-photos/photos-icon.png" />
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-primary-50 dark:bg-primary-900/20 flex items-center justify-center">
            <img src="/bg-photos/photos-icon.png" alt="" aria-hidden="true" className="h-6 w-auto object-contain" />
          </div>
          <div className="text-start">
            <p className="text-sm font-semibold text-slate-700 dark:text-slate-200">{t('progressPhotos.title')}</p>
            <p className="text-[11px] text-slate-400">{t('progressPhotos.subtitle')}</p>
          </div>
        </div>
        <ChevronRight className="w-5 h-5 text-slate-300" />
      </Link>

      {/* Personal Data */}
      {profile && (
        <div className="karte overflow-hidden mb-4">
          <h2 className="text-sm font-medium text-slate-500 dark:text-slate-400 px-4 pt-4 pb-2">
            {t('profile.personalData')}
          </h2>

          <ProfileDataRow
            label={t('onboarding.name').replace('?', '')}
            value={profile.name || '—'}
            onClick={() => openEdit('name', profile.name)}
          />
          <ProfileDataRow
            label={t('onboarding.gender')}
            value={genderLabel(profile.gender)}
            onClick={() => openEdit('gender', profile.gender)}
          />
          <ProfileDataRow
            label={t('onboarding.age')}
            value={profile.age ? `${profile.age} ${t('onboarding.years')}` : '—'}
            onClick={() => openEdit('age', profile.age)}
          />
          <ProfileDataRow
            label={t('onboarding.weight')}
            value={profile.weight_kg ? `${profile.weight_kg} kg` : '—'}
            onClick={() => openEdit('weight_kg', profile.weight_kg)}
          />
          <ProfileDataRow
            label={t('onboarding.height')}
            value={profile.height_cm ? `${profile.height_cm} ${t('onboarding.heightCm')}` : '—'}
            onClick={() => openEdit('height_cm', profile.height_cm)}
          />
          <ProfileDataRow
            label={t('onboarding.goal').replace('?', '')}
            value={goalLabel(profile.goal)}
            onClick={() => openEdit('goal', profile.goal)}
          />
          <ProfileDataRow
            label={t('onboarding.activityLevel')}
            value={activityLabel(profile.activity_level)}
            onClick={() => openEdit('activity_level', profile.activity_level)}
          />
          <ProfileDataRow
            label={t('onboarding.experience')}
            value={experienceLabel(profile.experience)}
            onClick={() => openEdit('experience', profile.experience)}
            last
          />
        </div>
      )}

      {/* App Settings */}
      <div className="karte overflow-hidden mb-4">
        <h2 className="text-sm font-medium text-slate-500 dark:text-slate-400 px-4 pt-4 pb-2">
          {t('profile.settings')}
        </h2>

        <SettingRow
          icon={darkMode ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
          label={t('profile.darkMode')}
          action={
            <button
              onClick={() => toggleDarkMode(user?.id)}
              className={`relative w-12 h-7 rounded-full transition-colors ${darkMode ? 'bg-primary-500' : 'bg-slate-300'}`}
            >
              <span className={`absolute top-0.5 start-0.5 w-6 h-6 bg-white rounded-full shadow transition-transform ${darkMode ? 'translate-x-5 rtl:-translate-x-5' : ''}`} />
            </button>
          }
        />

        <SettingRow
          icon={<Globe className="w-5 h-5" />}
          label={t('profile.language')}
          action={
            <button
              onClick={() => setSpracheOffen(true)}
              className="px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-700 text-sm font-medium"
            >
              {SPRACHNAMEN[appSprache(i18n.language)]}
            </button>
          }
        />

        <SettingRow
          icon={<Weight className="w-5 h-5" />}
          label={t('profile.units')}
          action={
            <button
              onClick={toggleWeightUnit}
              className="px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-700 text-sm font-medium"
            >
              {weightUnit === 'kg' ? t('profile.kg') : t('profile.lbs')}
            </button>
          }
          last={!healthVerfuegbar()}
        />

        {/* Apple Health / Health Connect — Opt-in, nur nativ sichtbar.
            Markennamen bleiben unuebersetzt. Beim Einschalten laeuft sofort
            ein Gewichts-Import, damit der Effekt sichtbar ist. */}
        {healthVerfuegbar() && (
          <SettingRow
            icon={<HeartPulse className="w-5 h-5" />}
            label={Capacitor.getPlatform() === 'ios' ? 'Apple Health' : 'Health Connect'}
            action={
              <button
                onClick={async () => {
                  if (healthOn) {
                    trennen(user?.id);
                    setHealthOn(false);
                    return;
                  }
                  const res = await verbinden(user?.id);
                  if (res.ok) {
                    setHealthOn(true);
                    gewichtImportieren(user?.id);
                  }
                }}
                className={`relative w-12 h-7 rounded-full transition-colors ${healthOn ? 'bg-primary-500' : 'bg-slate-300'}`}
              >
                <span className={`absolute top-0.5 start-0.5 w-6 h-6 bg-white rounded-full shadow transition-transform ${healthOn ? 'translate-x-5 rtl:-translate-x-5' : ''}`} />
              </button>
            }
            last
          />
        )}
      </div>

      {/* Legal */}
      <div className="karte overflow-hidden mb-4">
        <h2 className="text-sm font-medium text-slate-500 dark:text-slate-400 px-4 pt-4 pb-2">
          {t('legal.title')}
        </h2>
        {/* Gesundheitshinweis zuerst — er muss leicht auffindbar sein, nicht
            hinter Impressum und AGB (Play-Richtlinie zu Gesundheitsinhalten). */}
        <LegalRow to="/legal/health" label={t('legal.health')} />
        <LegalRow to="/legal/imprint" label={t('legal.imprint')} />
        <LegalRow to="/legal/privacy" label={t('legal.privacy')} />
        <LegalRow to="/legal/terms" label={t('legal.terms')} last={!canChangeAdConsent()} />
        {canChangeAdConsent() && (
          <button
            onClick={() => changeAdConsent()}
            className="w-full flex items-center justify-between px-4 py-3.5 hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors text-start"
          >
            <span className="flex items-center gap-3">
              <ShieldCheck className="w-5 h-5 text-slate-400" />
              <span className="text-slate-700 dark:text-slate-200">
                {t('ui.changeAdConsent')}
              </span>
            </span>
            <ChevronRight className="w-5 h-5 text-slate-300" />
          </button>
        )}
      </div>

      {/* Sign Out */}
      <button
        onClick={() => setShowSignOutConfirm(true)}
        className="karte w-full flex items-center justify-center gap-2 py-3.5 text-red-500 hover:text-red-600 font-medium transition-colors"
      >
        <LogOut className="w-5 h-5" />
        {t('auth.signOut')}
      </button>

      {/* Einwilligung in Gesundheitsdaten widerrufen */}
      {!isGuestMode && profile?.health_consent_at && (
        <button
          onClick={() => setShowWithdrawConsent(true)}
          className="w-full flex items-center justify-center gap-2 py-3.5 mt-3 text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 text-sm font-medium rounded-2xl border border-slate-200 dark:border-slate-700 transition-colors"
        >
          <HeartPulse className="w-4 h-4" />
          {t('consentGate.withdraw')}
        </button>
      )}

      {/* Delete Account */}
      {!isGuestMode && (
        <button
          onClick={() => setShowDeleteConfirm(true)}
          className="w-full flex items-center justify-center gap-2 py-3.5 mt-3 text-red-500/70 hover:text-red-600 text-sm font-medium rounded-2xl border border-red-200 dark:border-red-900/40 transition-colors"
        >
          <Trash2 className="w-4 h-4" />
          {t('auth.deleteAccount')}
        </button>
      )}

      {/* App-Version — zur eindeutigen Build-Identifikation */}
      <p className="text-center text-xs text-slate-400 dark:text-slate-600 mt-4">
        FullRep {APP_VERSION}
      </p>

      {/* Widerruf bestätigen */}
      {showWithdrawConsent && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-surface-dark-alt rounded-2xl p-6 w-full max-w-sm shadow-xl">
            <p className="text-center font-semibold mb-2">{t('consentGate.withdrawTitle')}</p>
            <p className="text-sm text-slate-500 dark:text-slate-400 text-center mb-4">
              {t('consentGate.withdrawText')}
            </p>
            {withdrawError && (
              <p className="text-sm text-red-500 text-center mb-3">{withdrawError}</p>
            )}
            <div className="flex gap-3">
              <button
                onClick={() => { setShowWithdrawConsent(false); setWithdrawError(null); }}
                disabled={withdrawing}
                className="flex-1 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 font-medium text-sm hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
              >
                {t('common.cancel')}
              </button>
              <button
                onClick={handleWithdrawConsent}
                disabled={withdrawing}
                className="flex-1 py-2.5 rounded-xl bg-red-500 hover:bg-red-600 disabled:opacity-60 text-white font-medium text-sm transition-colors flex items-center justify-center gap-2"
              >
                {withdrawing ? <Loader2 className="w-4 h-4 animate-spin" /> : t('consentGate.withdrawConfirm')}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Account Confirmation */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-surface-dark-alt rounded-2xl p-6 w-full max-w-sm shadow-xl">
            <p className="text-center font-semibold mb-2">{t('auth.deleteAccount')}?</p>
            <p className="text-sm text-slate-500 dark:text-slate-400 text-center mb-4">
              {t('auth.deleteAccountWarning')}
            </p>
            <input
              type="password"
              value={deletePassword}
              onChange={(e) => setDeletePassword(e.target.value)}
              placeholder={t('auth.deleteAccountPasswordPrompt')}
              autoComplete="current-password"
              className="w-full px-4 py-2.5 mb-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-transparent text-sm focus:outline-none focus:ring-2 focus:ring-red-400"
            />
            {deleteError && (
              <p className="text-sm text-red-500 text-center mb-3">{deleteError}</p>
            )}
            <div className="flex gap-3">
              <button
                onClick={() => { setShowDeleteConfirm(false); setDeleteError(null); setDeletePassword(''); }}
                disabled={deleting}
                className="flex-1 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 font-medium text-sm hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
              >
                {t('common.cancel')}
              </button>
              <button
                onClick={handleDeleteAccount}
                disabled={deleting || !deletePassword}
                className="flex-1 py-2.5 rounded-xl bg-red-500 hover:bg-red-600 disabled:opacity-60 text-white font-medium text-sm transition-colors flex items-center justify-center gap-2"
              >
                {deleting ? <Loader2 className="w-4 h-4 animate-spin" /> : t('auth.deleteAccountConfirm')}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Sign Out Confirmation */}
      {showSignOutConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-surface-dark-alt rounded-2xl p-6 w-full max-w-sm shadow-xl">
            <p className="text-center font-semibold mb-4">{t('auth.signOut')}?</p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowSignOutConfirm(false)}
                className="flex-1 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 font-medium text-sm hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
              >
                {t('common.cancel')}
              </button>
              <button
                onClick={handleSignOut}
                className="flex-1 py-2.5 rounded-xl bg-red-500 hover:bg-red-600 text-white font-medium text-sm transition-colors"
              >
                {t('auth.signOut')}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {editField && (
        <EditModal
          field={editField}
          value={editValue}
          onChange={setEditValue}
          onSave={saveEdit}
          onClose={closeEdit}
          saving={saving}
          error={saveError}
          t={t}
        />
      )}

      {spracheOffen && (
        <SprachAuswahl
          aktuell={appSprache(i18n.language)}
          onWaehlen={spracheWaehlen}
          onClose={() => setSpracheOffen(false)}
          titel={t('profile.language')}
        />
      )}
    </div>
  );
}

function LegalRow({ to, label, last = false }) {
  return (
    <Link
      to={to}
      className={`w-full flex items-center justify-between px-4 py-3.5 text-start hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors ${last ? '' : 'border-b border-slate-100 dark:border-slate-700'}`}
    >
      <div className="flex items-center gap-3 text-slate-700 dark:text-slate-200">
        <FileText className="w-5 h-5 text-primary-500" />
        <span className="text-sm font-medium">{label}</span>
      </div>
      <ChevronRight className="w-4 h-4 text-slate-400" />
    </Link>
  );
}

function ProfileDataRow({ label, value, onClick, last = false }) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center justify-between px-4 py-3.5 text-start hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors ${last ? '' : 'border-b border-slate-100 dark:border-slate-700'}`}
    >
      <span className="text-sm font-medium text-slate-700 dark:text-slate-200">{label}</span>
      <div className="flex items-center gap-2">
        <span className="text-sm text-slate-500 dark:text-slate-400">{value}</span>
        <Pencil className="w-3.5 h-3.5 text-slate-400" />
      </div>
    </button>
  );
}

function SprachAuswahl({ aktuell, onWaehlen, onClose, titel }) {
  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
      onClick={onClose}
      role="presentation"
    >
      <div
        className="bg-white dark:bg-surface-dark-alt rounded-2xl w-full max-w-xs overflow-hidden shadow-xl"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label={titel}
      >
        <p className="px-4 py-3 text-sm font-semibold border-b border-slate-100 dark:border-slate-700">
          {titel}
        </p>
        {SPRACHEN.map((code, i) => (
          <button
            key={code}
            onClick={() => onWaehlen(code)}
            // `dir` je Zeile: Sonst zieht die Textrichtung der Oberfläche den
            // arabischen Namen in einer deutschen Liste an den rechten Rand
            // und umgekehrt. Jede Zeile ist ein eigener Sprachraum.
            dir={code === 'ar' ? 'rtl' : 'ltr'}
            className={`w-full flex items-center justify-between px-4 py-3 text-start hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors ${
              i === SPRACHEN.length - 1 ? '' : 'border-b border-slate-100 dark:border-slate-700'
            } ${code === aktuell ? 'text-primary-600 dark:text-primary-400 font-semibold' : 'text-slate-700 dark:text-slate-200'}`}
          >
            <span className="text-sm">{SPRACHNAMEN[code]}</span>
            {code === aktuell && <Check className="w-4 h-4" />}
          </button>
        ))}
      </div>
    </div>
  );
}

function SettingRow({ icon, label, action, last = false }) {
  return (
    <div className={`flex items-center justify-between px-4 py-3.5 ${last ? '' : 'border-b border-slate-100 dark:border-slate-700'}`}>
      <div className="flex items-center gap-3 text-slate-700 dark:text-slate-200">
        <span className="text-primary-500">{icon}</span>
        <span className="font-medium">{label}</span>
      </div>
      {action}
    </div>
  );
}

function EditModal({ field, value, onChange, onSave, onClose, saving, error, t }) {
  const fieldConfig = {
    name: { type: 'text', title: t('profile.editName'), placeholder: t('onboarding.namePlaceholder') },
    gender: {
      type: 'selection',
      title: t('profile.editGender'),
      options: [
        { value: 'male', label: t('onboarding.male') },
        { value: 'female', label: t('onboarding.female') },
        { value: 'diverse', label: t('onboarding.diverse') },
      ],
    },
    age: { type: 'number', title: t('profile.editAge'), min: 14, max: 100, step: 1, unit: t('onboarding.years') },
    weight_kg: { type: 'number', title: t('profile.editWeight'), min: 30, max: 300, step: 0.5, unit: 'kg', decimal: true },
    height_cm: { type: 'number', title: t('profile.editHeight'), min: 120, max: 230, step: 1, unit: t('onboarding.heightCm') },
    goal: {
      type: 'selection',
      title: t('profile.editGoal'),
      options: [
        { value: 'muscle_gain', label: t('onboarding.muscleGain') },
        { value: 'maintenance', label: t('onboarding.maintenance') },
        { value: 'weight_loss', label: t('onboarding.weightLoss') },
      ],
    },
    activity_level: {
      type: 'selection',
      title: t('profile.editActivity'),
      options: [
        { value: 'sedentary', label: t('onboarding.sedentary'), desc: t('onboarding.sedentaryDesc') },
        { value: 'moderate', label: t('onboarding.moderate'), desc: t('onboarding.moderateDesc') },
        { value: 'very_active', label: t('onboarding.veryActive'), desc: t('onboarding.veryActiveDesc') },
      ],
    },
    experience: {
      type: 'selection',
      title: t('profile.editExperience'),
      options: [
        { value: 'beginner', label: t('onboarding.beginner'), desc: t('onboarding.beginnerDesc') },
        { value: 'intermediate', label: t('onboarding.intermediate'), desc: t('onboarding.intermediateDesc') },
        { value: 'pro', label: t('onboarding.pro'), desc: t('onboarding.proDesc') },
      ],
    },
  };

  const config = fieldConfig[field];
  if (!config) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-surface-dark-alt rounded-2xl w-full max-w-sm shadow-xl max-h-[80vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 pt-6 pb-4 shrink-0">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">{config.title}</h3>
          <button onClick={onClose} className="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="px-6 overflow-y-auto flex-1 min-h-0">
          {config.type === 'text' && (
            <input
              type="text"
              value={value || ''}
              onChange={(e) => onChange(e.target.value)}
              placeholder={config.placeholder}
              autoFocus
              className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-lg focus:outline-none focus:ring-2 focus:ring-primary-400"
            />
          )}

          {config.type === 'number' && (
            <div className="flex items-center justify-center gap-4 py-4">
              <button
                onClick={() => {
                  const next = Math.max(config.min, parseFloat(((value || config.min) - config.step).toFixed(1)));
                  onChange(next);
                }}
                className="w-12 h-12 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-2xl font-bold flex items-center justify-center hover:bg-slate-200 dark:hover:bg-slate-700"
              >
                -
              </button>
              <div className="text-center">
                <input
                  type="number"
                  step={config.step}
                  value={config.decimal ? parseFloat(value || config.min).toFixed(1) : (value || config.min)}
                  onChange={(e) => {
                    const v = config.decimal ? parseFloat(e.target.value) : parseInt(e.target.value);
                    if (!isNaN(v)) onChange(Math.min(config.max, Math.max(config.min, v)));
                  }}
                  className="w-24 text-center text-4xl font-bold bg-transparent text-slate-900 dark:text-white focus:outline-none"
                />
                <p className="text-slate-500 dark:text-slate-400 text-sm">{config.unit}</p>
              </div>
              <button
                onClick={() => {
                  const next = Math.min(config.max, parseFloat(((value || config.min) + config.step).toFixed(1)));
                  onChange(next);
                }}
                className="w-12 h-12 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-2xl font-bold flex items-center justify-center hover:bg-slate-200 dark:hover:bg-slate-700"
              >
                +
              </button>
            </div>
          )}

          {config.type === 'selection' && (
            <div className="flex flex-col gap-2">
              {config.options.map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => onChange(opt.value)}
                  className={`w-full p-3 rounded-xl border-2 text-start transition-all ${
                    value === opt.value
                      ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
                      : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-surface-dark hover:border-slate-300 dark:hover:border-slate-600'
                  }`}
                >
                  <p className={`font-semibold ${value === opt.value ? 'text-primary-500 dark:text-primary-400' : 'text-slate-900 dark:text-white'}`}>
                    {opt.label}
                  </p>
                  {opt.desc && (
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{opt.desc}</p>
                  )}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Save button — always visible */}
        <div className="px-6 pt-4 pb-6 shrink-0">
          <button
            onClick={onSave}
            disabled={saving || (config.type === 'text' && !(value || '').trim())}
            className="w-full py-3.5 bg-primary-500 hover:bg-primary-600 disabled:opacity-50 text-white font-semibold rounded-2xl flex items-center justify-center gap-2 transition-colors"
          >
            {saving ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <>
                <Check className="w-5 h-5" />
                {t('common.save')}
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
