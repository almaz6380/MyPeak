import { createContext, useContext, useEffect, useState } from 'react';
import { saveSetting } from '../data/settingsStorage';

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('darkMode');
    if (saved !== null) return JSON.parse(saved);
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
    document.documentElement.classList.toggle('dark', darkMode);
  }, [darkMode]);

  const toggleDarkMode = (userId) => {
    setDarkMode((prev) => {
      const next = !prev;
      if (userId) saveSetting(userId, 'darkMode', next);
      return next;
    });
  };

  const setDarkModeValue = (value) => {
    setDarkMode(value);
  };

  return (
    <ThemeContext.Provider value={{ darkMode, toggleDarkMode, setDarkModeValue }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);
