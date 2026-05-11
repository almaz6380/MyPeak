import { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { loadSettings } from '../data/settingsStorage';
import { migrateLocalDataToSupabase } from '../data/workoutStorage';

const AuthContext = createContext();
const GUEST_ID = 'guest';

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
  const [session, setSession] = useState(null);
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  async function fetchProfile(userId) {
    // Try to load cached profile first for instant display
    const cachedProfile = localStorage.getItem('cachedProfile');
    if (cachedProfile) {
      const parsed = JSON.parse(cachedProfile);
      if (parsed?.id === userId) setProfile(parsed);
    }

    // Then fetch fresh from Supabase (non-blocking if cache existed)
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
    } catch {
      // Offline or Supabase down — cached profile is fine
    }

    // Background tasks — don't block app startup
    loadSettings(userId).catch(() => {});
    migrateLocalDataToSupabase(userId);

    return;
  }

  useEffect(() => {
    // Check for guest session first (instant)
    const guestSession = localStorage.getItem('guestMode');
    if (guestSession === 'true') {
      setUser({ id: GUEST_ID, email: 'guest@local' });
      setProfile(GUEST_PROFILE);
      setLoading(false);
      return;
    }

    // Timeout: if Supabase doesn't respond in 3s, show login
    const timeout = setTimeout(() => {
      if (loading) setLoading(false);
    }, 3000);

    supabase.auth.getSession().then(({ data: { session } }) => {
      clearTimeout(timeout);
      setSession(session);
      setUser(session?.user ?? null);
      if (session?.user) {
        fetchProfile(session.user.id).finally(() => setLoading(false));
      } else {
        setLoading(false);
      }
    }).catch(() => {
      clearTimeout(timeout);
      setLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        if (session?.user) {
          await fetchProfile(session.user.id);
        } else {
          setProfile(null);
        }
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  function signInAsGuest() {
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
    // Clear guest mode
    if (isGuest(user?.id)) {
      localStorage.removeItem('guestMode');
      setUser(null);
      setSession(null);
      setProfile(null);
      return { error: null };
    }

    const { error } = await supabase.auth.signOut();
    if (!error) {
      setUser(null);
      setSession(null);
      setProfile(null);
    }
    return { error };
  }

  async function resetPassword(email) {
    const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/auth/update-password`,
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
      await fetchProfile(currentSession.user.id);
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
