'use client';

import { useEffect, useState, useCallback } from 'react';
import { DEFAULT_SETTINGS } from '@/app/config/siteSettings';

const EVENT_NAME = 'siteSettingsChange';

function merge(parsed) {
  return {
    navbar: { ...DEFAULT_SETTINGS.navbar, ...(parsed?.navbar || {}) },
    features: { ...DEFAULT_SETTINGS.features, ...(parsed?.features || {}) },
    ads: { ...DEFAULT_SETTINGS.ads, ...(parsed?.ads || {}) },
  };
}

export function useSiteSettings() {
  const [settings, setSettingsState] = useState(DEFAULT_SETTINGS);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    let active = true;
    fetch('/api/settings')
      .then((res) => res.json())
      .then((data) => {
        if (active && data?.settings) setSettingsState(merge(data.settings));
      })
      .catch(() => {})
      .finally(() => {
        if (active) setHydrated(true);
      });

    const handleChange = (e) => {
      if (e?.detail) setSettingsState(merge(e.detail));
    };
    window.addEventListener(EVENT_NAME, handleChange);
    return () => {
      active = false;
      window.removeEventListener(EVENT_NAME, handleChange);
    };
  }, []);

  const setSettings = useCallback((next) => {
    setSettingsState((prev) => {
      const value = merge(typeof next === 'function' ? next(prev) : next);
      queueMicrotask(() => {
        fetch('/api/settings', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(value),
        }).catch(() => {});
        window.dispatchEvent(new CustomEvent(EVENT_NAME, { detail: value }));
      });
      return value;
    });
  }, []);

  return { settings, setSettings, hydrated };
}
