'use client';

import { useEffect, useState, useCallback } from 'react';
import { DUMMY_SETTINGS } from '@/app/config/siteSettings';

const STORAGE_KEY = 'siteSettings';
const EVENT_NAME = 'siteSettingsChange';

function readFromStorage() {
  if (typeof window === 'undefined') return DUMMY_SETTINGS;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return DUMMY_SETTINGS;
    const parsed = JSON.parse(raw);
    // shallow-merge to keep defaults for any missing keys
    return {
      ...DUMMY_SETTINGS,
      ...parsed,
      navbar: { ...DUMMY_SETTINGS.navbar, ...(parsed.navbar || {}) },
      features: { ...DUMMY_SETTINGS.features, ...(parsed.features || {}) },
    };
  } catch {
    return DUMMY_SETTINGS;
  }
}

export function useSiteSettings() {
  const [settings, setSettingsState] = useState(DUMMY_SETTINGS);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setSettingsState(readFromStorage());
    setHydrated(true);

    const handleChange = (e) => {
      if (e?.detail) {
        setSettingsState(e.detail);
      } else {
        setSettingsState(readFromStorage());
      }
    };
    const handleStorage = (e) => {
      if (e.key === STORAGE_KEY) setSettingsState(readFromStorage());
    };

    window.addEventListener(EVENT_NAME, handleChange);
    window.addEventListener('storage', handleStorage);
    return () => {
      window.removeEventListener(EVENT_NAME, handleChange);
      window.removeEventListener('storage', handleStorage);
    };
  }, []);

  const setSettings = useCallback((next) => {
    const value = typeof next === 'function' ? next(readFromStorage()) : next;
    setSettingsState(value);
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(value));
      window.dispatchEvent(new CustomEvent(EVENT_NAME, { detail: value }));
    }
  }, []);

  return { settings, setSettings, hydrated };
}
