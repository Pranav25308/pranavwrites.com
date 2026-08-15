'use client';

import { useEffect, useRef } from 'react';
import { Megaphone } from 'lucide-react';
import { useTheme } from '@/components/theme/ThemeProvider';
import { DUMMY_SETTINGS } from '@/app/config/siteSettings';

let scriptLoaded = false;

function loadAdsenseScript(clientId) {
  if (scriptLoaded || typeof document === 'undefined') return;
  const s = document.createElement('script');
  s.async = true;
  s.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${clientId}`;
  s.crossOrigin = 'anonymous';
  document.head.appendChild(s);
  scriptLoaded = true;
}

export default function AdSlot({ slot = '', format = 'auto', className = '' }) {
  const { darkMode } = useTheme();
  const insRef = useRef(null);
  const clientId = DUMMY_SETTINGS.ads?.adsenseClientId || '';

  useEffect(() => {
    if (!clientId || !insRef.current) return;
    loadAdsenseScript(clientId);
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch {}
  }, [clientId]);

  if (!clientId) {
    return (
      <div
        data-testid="ad-slot-placeholder"
        className={`w-full rounded-xl border border-dashed flex flex-col items-center justify-center py-8 my-8 transition-colors duration-300 ${
          darkMode
            ? 'border-purple-500/20 bg-slate-900/30 text-slate-600'
            : 'border-purple-200 bg-purple-50/40 text-slate-400'
        } ${className}`}
      >
        <Megaphone className="w-5 h-5 mb-2 opacity-60" />
        <span className="text-xs uppercase tracking-widest">Advertisement</span>
      </div>
    );
  }

  return (
    <div data-testid="ad-slot" className={`w-full my-8 ${className}`}>
      <ins
        ref={insRef}
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client={clientId}
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive="true"
      />
    </div>
  );
}
