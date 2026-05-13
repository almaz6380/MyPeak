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
    migrateLocalDataToSupabase(userId);
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
    migrateLocalDataToSupabase(userId);
  }

  useEffect(() => {
    // Guest mode already handled in useState initializers
    if (localStorage.getItem('guestMode') === 'true') return;

    // Timeout: if Supabase doesn't respond in 3s, show login
    const timeout = setTimeout(() => setLoading(false), 3000);

    supabase.auth.getSession().then(({ data: { session: s } }) => {
      clearTimeout(timeout);
      setSession(s);
      const supaUser = s?.user ?? null;
      setUser(supaUser);

      if (supaUser) {
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

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setSession(session);
        const supaUser = session?.user ?? null;
        setUser(supaUser);
        if (supaUser) {
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
      localStorage.removeItem('cachedUser');
      localStorage.removeItem('cachedProfile');
      setUser(null);
      setSession(null);
      setProfile(null);
      return { error: null };
    }

    const { error } = await supabase.auth.signOut();
    if (!error) {
      localStorage.removeItem('cachedUser');
      localStorage.removeItem('cachedProfile');
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
