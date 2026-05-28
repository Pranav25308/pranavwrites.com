'use client';

import { useEffect, useState } from 'react';
import { getSkills } from '@/lib/skills-store';

/**
 * Hook returning the latest persisted skills list.
 * Re-reads from localStorage when the admin page dispatches 'skills:updated',
 * and listens for cross-tab `storage` events too.
 */
export function useSkills() {
  const [skills, setSkills] = useState(() => getSkills());

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const refresh = () => setSkills(getSkills());

    // initial read on mount (covers SSR/hydration where window was undefined)
    refresh();

    window.addEventListener('skills:updated', refresh);
    window.addEventListener('storage', refresh);
    return () => {
      window.removeEventListener('skills:updated', refresh);
      window.removeEventListener('storage', refresh);
    };
  }, []);

  return skills;
}
