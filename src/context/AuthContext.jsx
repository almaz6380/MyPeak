import { Capacitor } from '@capacitor/core';
import { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { loadSettings } from '../data/settingsStorage';
import { syncLocalDataToCloud, registerOnlineSync } from '../data/resync';
import { clearAllLocalPhotos } from '../data/exercisePhotos';

// Geräte-Einstellungen, die beim Abmelden erhalten bleiben —
// alle anderen Keys sind Nutzerdaten und werden entfernt, damit der
// nächste Login auf diesem Gerät keine fremden Daten sieht.
const KEEP_ON_SIGNOUT = ['language', 'darkMode', 'themeChosen', 'splashSeen', 'weightUnit'];

function clearLocalUserData() {
  for (const key of Object.keys(localStorage)) {
    if (!KEEP_ON_SIGNOUT.includes(key)) localStorage.removeItem(key);
  }
  // Lokale Fotos (IndexedDB) mitlöschen — sonst sähe der nächste Nutzer auf
  // diesem Gerät die privaten Fortschritts-/Körperfotos des vorherigen.
  clearAllLocalPhotos().catch(() => {});
}

const AuthContext = createContext();
const GUEST_ID = 'guest';

// Schutz gegen Konto-Wechsel ohne sauberen Logout: Gehören die lokalen Daten
// einem ANDEREN echten Konto, werden sie vor Übernahme der neuen Session
// entfernt — sonst sieht das neue Konto den Cache des alten (und der
// Cloud-Sync würde dessen local_-Einträge ins falsche Konto hochladen).
// Gast-Daten bleiben absichtlich erhalten (gewollte Übernahme bei Registrierung).
function ensureLocalDataOwner(userId) {
  const owner = localStorage.getItem('localDataOwner');
  if (owner && owner !== userId && owner !== GUEST_ID) clearLocalUserData();
  localStorage.setItem('localDataOwner', userId);
}

const GUEST_PROFILE = {
  id: GUEST_ID,
  name: 'Gast',
  gender: 'male',
  age: 25,
  weight_kg: 75,
  height_cm: 175,
  goal: 'maintenance',
  activity_level: 'moderate',
  experience: 'beginner',
  onboarding_completed: true,
};

export function isGuest(userId) {
  return userId === GUEST_ID;
}

export function AuthProvider({ children }) {
  // Instant restore from localStorage — no loading spinner for returning users
  const [session, setSession] = useState(null);
  const [user, setUser] = useState(() => {
    // Guest mode — instant
    if (localStorage.getItem('guestMode') === 'true') {
      return { id: GUEST_ID, email: 'guest@local' };
    }
    // Cached user from previous session — instant
    try {
      const cached = localStorage.getItem('cachedUser');
      if (cached) return JSON.parse(cached);
    } catch {}
    return null;
  });
  const [profile, setProfile] = useState(() => {
    if (localStorage.getItem('guestMode') === 'true') return GUEST_PROFILE;
    try {
      const cached = localStorage.getItem('cachedProfile');
      if (cached) return JSON.parse(cached);
    } catch {}
    return null;
  });
  // Only show loading if we have NO cached data at all
  const [loading, setLoading] = useState(() => {
    if (localStorage.getItem('guestMode') === 'true') return false;
    if (localStorage.getItem('cachedUser') && localStorage.getItem('cachedProfile')) return false;
    return true;
  });

  function fetchProfileBackground(userId) {
    supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single()
      .then(({ data }) => {
        if (data) {
          setProfile(data);
          localStorage.setItem('cachedProfile', JSON.stringify(data));
        }
      })
      .catch(() => {});

    // Background tasks
    loadSettings(userId).catch(() => {});
    syncLocalDataToCloud(userId);
  }

  async function fetchProfileBlocking(userId) {
    try {
      const { data } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (data) {
        setProfile(data);
        localStorage.setItem('cachedProfile', JSON.stringify(data));
      }
    } catch {}

    loadSettings(userId).catch(() => {});
    syncLocalDataToCloud(userId);
  }

  useEffect(() => {
    // Fehlgeschlagene Cloud-Writes erneut versuchen, sobald wieder online
    registerOnlineSync();
  }, []);

  useEffect(() => {
    const isGuestMode = localStorage.getItem('guestMode') === 'true';

    // Initiale Session nur laden, wenn KEIN Gastmodus (Gast wird in useState gesetzt).
    if (!isGuestMode) {
      // Timeout: if Supabase doesn't respond in 3s, show login
      const timeout = setTimeout(() => setLoading(false), 3000);

      supabase.auth.getSession().then(({ data: { session: s } }) => {
        clearTimeout(timeout);
        setSession(s);
        const supaUser = s?.user ?? null;
        setUser(supaUser);

        if (supaUser) {
          ensureLocalDataOwner(supaUser.id);
          // Cache user for instant restore next time
          localStorage.setItem('cachedUser', JSON.stringify({ id: supaUser.id, email: supaUser.email }));

          if (profile) {
            // Already have cached profile — just refresh in background
            fetchProfileBackground(supaUser.id);
            setLoading(false);
          } else {
            // No cached profile — must wait
            fetchProfileBlocking(supaUser.id).finally(() => setLoading(false));
          }
        } else {
          // Not logged in — clear cached data
          localStorage.removeItem('cachedUser');
          localStorage.removeItem('cachedProfile');
          setProfile(null);
          setLoading(false);
        }
      }).catch(() => {
        clearTimeout(timeout);
        setLoading(false);
      });
    }

    // Auth-Listener IMMER registrieren — auch im Gastmodus. Sonst bleibt nach
    // einem Gast→Konto-Login (ohne App-Reload) die UI hängen, weil user/session
    // ausschließlich hierüber aktualisiert werden.
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        // Link aus der Passwort-Mail: Supabase fällt auf die site_url (Startseite)
        // zurück, wenn die redirectTo-Adresse nicht in der Erlaubnisliste steht —
        // genau das passiert bei Anfragen aus der App (capacitor://localhost). Dann
        // stünde der Nutzer eingeloggt auf der Startseite, ohne Formular für das
        // neue Passwort. Deshalb hier selbst auf die richtige Seite wechseln.
        if (event === 'PASSWORD_RECOVERY' && window.location.pathname !== '/auth/update-password') {
          window.location.replace('/auth/update-password');
          return;
        }
        const supaUser = session?.user ?? null;
        // Im Gastmodus ohne echte Session nichts überschreiben (Gast bleibt Gast).
        if (!supaUser && localStorage.getItem('guestMode') === 'true') return;
        setSession(session);
        setUser(supaUser);
        if (supaUser) {
          localStorage.removeItem('guestMode'); // Gast→Konto: Gastflag entfernen
          ensureLocalDataOwner(supaUser.id);
          localStorage.setItem('cachedUser', JSON.stringify({ id: supaUser.id, email: supaUser.email }));
          fetchProfileBackground(supaUser.id);
        } else {
          localStorage.removeItem('cachedUser');
          localStorage.removeItem('cachedProfile');
          setProfile(null);
        }
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  function signInAsGuest() {
    localStorage.setItem('localDataOwner', GUEST_ID);
    localStorage.setItem('guestMode', 'true');
    setUser({ id: GUEST_ID, email: 'guest@local' });
    setProfile(GUEST_PROFILE);
  }

  async function signUp(email, password) {
    const { data, error } = await supabase.auth.signUp({ email, password });
    return { data, error };
  }

  async function signIn(email, password) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    return { data, error };
  }

  async function signOut() {
    // Clear guest mode — Gast-Daten BLEIBEN lokal erhalten, damit sie bei
    // einer anschließenden Registrierung ins neue Konto übernommen werden
    if (isGuest(user?.id)) {
      localStorage.removeItem('guestMode');
      localStorage.removeItem('cachedUser');
      localStorage.removeItem('cachedProfile');
      setUser(null);
      setSession(null);
      setProfile(null);
      return { error: null };
    }

    // Nicht-synchronisierte local_-Einträge vor dem Löschen hochladen (best effort),
    // sonst gehen offline erstellte Daten beim Logout unwiderruflich verloren
    try {
      await syncLocalDataToCloud(user.id);
    } catch (err) {
      console.error('Sync before signout failed:', err);
    }

    const { error } = await supabase.auth.signOut();
    if (!error) {
      // Alle Nutzerdaten vom Gerät entfernen (nur Geräte-Einstellungen bleiben),
      // damit der nächste Login keine Daten des vorherigen Kontos sieht
      clearLocalUserData();
      setUser(null);
      setSession(null);
      setProfile(null);
    }
    return { error };
  }

  async function resetPassword(email) {
    const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
      // In der App ist origin capacitor://localhost bzw. https://localhost — dorthin
      // kann ein Mail-Link nicht führen. Dann immer die Web-Fassung nehmen.
      redirectTo: `${Capacitor.isNativePlatform() ? 'https://fullrep.pages.dev' : window.location.origin}/auth/update-password`,
    });
    return { data, error };
  }

  async function updatePassword(newPassword) {
    const { data, error } = await supabase.auth.updateUser({
      password: newPassword,
    });
    return { data, error };
  }

  async function refreshProfile() {
    if (isGuest(user?.id)) {
      setProfile(GUEST_PROFILE);
      return;
    }
    const { data: { session: currentSession } } = await supabase.auth.getSession();
    if (currentSession?.user) {
      await fetchProfileBlocking(currentSession.user.id);
    }
  }

  const value = {
    session,
    user,
    profile,
    loading,
    isGuestMode: isGuest(user?.id),
    signUp,
    signIn,
    signInAsGuest,
    signOut,
    resetPassword,
    updatePassword,
    refreshProfile,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
