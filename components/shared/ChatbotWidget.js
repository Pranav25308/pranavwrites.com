'use client';

import { useEffect, useState } from 'react';
import { MessageCircle, X, Sparkles } from 'lucide-react';
import { useTheme } from '@/components/theme/ThemeProvider';

export default function ChatbotWidget() {
  const { darkMode } = useTheme();
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Mount flag avoids hydration mismatch for theme-dependent classes
  useEffect(() => {
    setMounted(true);
  }, []);

  // Close on ESC
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  if (!mounted) return null;

  return (
    <div
      className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3"
      data-testid="chatbot-widget"
    >
      {/* Chat panel */}
      <div
        data-testid="chatbot-panel"
        aria-hidden={!open}
        className={[
          'origin-bottom-right w-[20rem] sm:w-[22rem] rounded-2xl shadow-2xl border overflow-hidden',
          'transform transition-all duration-300 ease-out',
          open
            ? 'opacity-100 scale-100 translate-y-0 pointer-events-auto'
            : 'opacity-0 scale-90 translate-y-3 pointer-events-none',
          darkMode
            ? 'bg-slate-900 border-slate-700 text-slate-100 shadow-blue-900/40'
            : 'bg-white border-slate-200 text-slate-800',
        ].join(' ')}
      >
        {/* Header */}
        <div
          className={[
            'flex items-center justify-between px-4 py-3',
            darkMode
              ? 'bg-gradient-to-r from-blue-900 via-indigo-900 to-cyan-900'
              : 'bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-600',
          ].join(' ')}
        >
          <div className="flex items-center gap-2 text-white">
            <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur flex items-center justify-center">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <p className="text-sm font-semibold leading-tight">Pranav's AI</p>
              <p className="text-[11px] text-white/80 leading-tight">
                Personal assistant
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Close chatbot"
            data-testid="chatbot-close-btn"
            className="p-1.5 rounded-full text-white/90 hover:text-white hover:bg-white/15 transition-colors duration-200"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Body */}
        <div className="px-4 py-5 space-y-4">
          <div
            className={[
              'rounded-2xl rounded-tl-sm px-4 py-3 text-sm leading-relaxed',
              darkMode
                ? 'bg-slate-800 text-slate-100'
                : 'bg-slate-100 text-slate-700',
            ].join(' ')}
          >
            <span className="font-medium">Hi there! 👋</span>
            <p className="mt-1">
              My personalised AI chatbot is under development. Please visit
              later to know more about me.
            </p>
          </div>

          <div
            className={[
              'text-[11px] text-center pt-1',
              darkMode ? 'text-slate-500' : 'text-slate-400',
            ].join(' ')}
          >
            <Sparkles className="inline w-3 h-3 mr-1" />
            Coming soon
          </div>
        </div>
      </div>

      {/* Floating launcher button */}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? 'Close chat' : 'Open chat'}
        aria-expanded={open}
        data-testid="chatbot-toggle-btn"
        className={[
          'relative w-14 h-14 rounded-full shadow-xl flex items-center justify-center',
          'transition-all duration-300 ease-out hover:scale-110 active:scale-95',
          'focus:outline-none focus:ring-4',
          darkMode
            ? 'bg-gradient-to-br from-blue-500 to-cyan-500 text-white focus:ring-blue-500/40 shadow-blue-900/50'
            : 'bg-gradient-to-br from-blue-600 to-cyan-600 text-white focus:ring-blue-400/40',
        ].join(' ')}
      >
        {/* Pulse ring when closed */}
        {!open && (
          <span
            className={[
              'absolute inset-0 rounded-full animate-ping opacity-30',
              darkMode ? 'bg-cyan-400' : 'bg-blue-500',
            ].join(' ')}
            aria-hidden="true"
          />
        )}

        <span className="relative inline-block w-6 h-6">
          <MessageCircle
            className={[
              'w-6 h-6 absolute inset-0 transition-all duration-300',
              open ? 'opacity-0 rotate-90 scale-50' : 'opacity-100 rotate-0 scale-100',
            ].join(' ')}
          />
          <X
            className={[
              'w-6 h-6 absolute inset-0 transition-all duration-300',
              open ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 -rotate-90 scale-50',
            ].join(' ')}
          />
        </span>
      </button>
    </div>
  );
}
