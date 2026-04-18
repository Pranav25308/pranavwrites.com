'use client';

import { createContext, useContext, useEffect, useState } from 'react';

const ThemeContext = createContext({
  darkMode: false,
  toggleDarkMode: () => {},
});

export function ThemeProvider({ children }) {
  const [darkMode, setDarkMode] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Read saved preference on first mount
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const saved = localStorage.getItem('darkMode') === 'true';
    setDarkMode(saved);
    setMounted(true);
  }, []);

  // Sync to <html> class + localStorage whenever it changes
  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    if (mounted) {
      localStorage.setItem('darkMode', String(darkMode));
    }
  }, [darkMode, mounted]);

  const toggleDarkMode = () => setDarkMode((d) => !d);

  return (
    <ThemeContext.Provider value={{ darkMode, toggleDarkMode }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
