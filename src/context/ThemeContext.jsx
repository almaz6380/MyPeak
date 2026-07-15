import { createContext, useContext, useEffect, useState } from 'react';
import { saveSetting } from '../data/settingsStorage';

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [darkMode, setDarkMode] = useState(() => {
    // Light ist Standard (seit 12.07.2026). Gespeicherter Dark Mode zählt nur,
    // wenn er AKTIV gewählt wurde (themeChosen) — der alte Code persistierte
    // den Default bei jedem Besuch, daher ist der Key allein nicht aussagekräftig.
    const saved = localStorage.getItem('darkMode');
    const chosen = localStorage.getItem('themeChosen') === 'true';
    if (saved !== null && chosen) return JSON.parse(saved);
    return false;
  });

  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
    document.documentElement.classList.toggle('dark', darkMode);
  }, [darkMode]);

  const toggleDarkMode = (userId) => {
    setDarkMode((prev) => {
      const next = !prev;
      localStorage.setItem('themeChosen', 'true');
      if (userId) saveSetting(userId, 'darkMode', next);
      return next;
    });
  };

  // Wird u. a. vom Settings-Sync (Cloud) aufgerufen — auch das ist eine aktive Wahl
  const setDarkModeValue = (value) => {
    localStorage.setItem('themeChosen', 'true');
    setDarkMode(value);
  };

  // Cloud-Einstellung (anderes Gerät) übernehmen, sobald loadSettings sie meldet.
  useEffect(() => {
    const onCloudDarkMode = (e) => setDarkModeValue(!!e.detail);
    window.addEventListener('mypeak:darkmode', onCloudDarkMode);
    return () => window.removeEventListener('mypeak:darkmode', onCloudDarkMode);
  }, []);

  return (
    <ThemeContext.Provider value={{ darkMode, toggleDarkMode, setDarkModeValue }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);
