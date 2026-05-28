'use client';

import { useEffect, useRef, useState } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

/**
 * Top loading bar that gives instant feedback on every navigation.
 *
 * Behavior:
 *  - When the user clicks any internal <a>/<Link> that points to a different
 *    pathname, we immediately show a thin animated bar at the top of the
 *    viewport.
 *  - When the new route finishes mounting (pathname / searchParams change),
 *    we briefly run the bar to 100% and fade it out.
 */
export default function NavigationProgress() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [active, setActive] = useState(false);
  const [progress, setProgress] = useState(0);
  const timersRef = useRef([]);

  // Clear all pending timers
  const clearTimers = () => {
    timersRef.current.forEach((id) => clearTimeout(id));
    timersRef.current = [];
  };

  const start = () => {
    clearTimers();
    setActive(true);
    setProgress(15);
    // ramp up over time so the bar looks alive
    [
      [120, 35],
      [320, 55],
      [620, 72],
      [1100, 85],
    ].forEach(([t, v]) => {
      const id = setTimeout(() => setProgress(v), t);
      timersRef.current.push(id);
    });
  };

  const finish = () => {
    clearTimers();
    setProgress(100);
    const id1 = setTimeout(() => {
      setActive(false);
      // reset after fade-out so next nav starts fresh
      const id2 = setTimeout(() => setProgress(0), 250);
      timersRef.current.push(id2);
    }, 220);
    timersRef.current.push(id1);
  };

  // Listen for clicks on internal links and start the bar instantly.
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleClick = (e) => {
      // ignore modified clicks (open in new tab etc.)
      if (
        e.defaultPrevented ||
        e.button !== 0 ||
        e.metaKey ||
        e.ctrlKey ||
        e.shiftKey ||
        e.altKey
      ) {
        return;
      }
      const anchor = e.target?.closest?.('a');
      if (!anchor) return;
      const href = anchor.getAttribute('href');
      if (!href) return;
      // skip external, hash, mailto, tel, downloads, and target=_blank
      if (
        anchor.target === '_blank' ||
        anchor.hasAttribute('download') ||
        href.startsWith('http') ||
        href.startsWith('mailto:') ||
        href.startsWith('tel:') ||
        href.startsWith('#')
      ) {
        return;
      }
      // same path? don't trigger
      try {
        const next = new URL(anchor.href, window.location.href);
        if (
          next.pathname === window.location.pathname &&
          next.search === window.location.search
        ) {
          return;
        }
      } catch {
        /* ignore */
      }
      start();
    };

    document.addEventListener('click', handleClick, { capture: true });
    return () => {
      document.removeEventListener('click', handleClick, { capture: true });
      clearTimers();
    };
  }, []);

  // When the URL changes (route mounted), finish the bar.
  useEffect(() => {
    if (active) {
      finish();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname, searchParams]);

  return (
    <div
      aria-hidden
      className={`fixed top-0 left-0 right-0 z-[100] pointer-events-none transition-opacity duration-200 ${
        active ? 'opacity-100' : 'opacity-0'
      }`}
    >
      <div
        className="h-[3px] bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-500 shadow-[0_0_10px_rgba(168,85,247,0.6)] transition-[width] duration-200 ease-out"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}
