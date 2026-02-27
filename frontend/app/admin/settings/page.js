'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Settings from '@/app/components/admin/Settings';
import { DUMMY_SETTINGS } from '@/app/config/siteSettings';

export default function SettingsPage() {
  const router = useRouter();
  const [isAdmin, setIsAdmin] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [settings, setSettings] = useState(DUMMY_SETTINGS);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('adminToken');
      if (token !== 'admin-token-123') {
        router.push('/admin');
        return;
      }
      setIsAdmin(true);
      setDarkMode(localStorage.getItem('darkMode') === 'true');
    }
  }, [router]);

  if (!isAdmin) {
    return null;
  }

  return (
    <div 
      data-testid="settings-page"
      className={`min-h-screen transition-colors duration-300 ${
        darkMode 
          ? 'bg-slate-950 text-white' 
          : 'bg-gradient-to-br from-slate-50 via-purple-50/30 to-cyan-50/30 text-slate-900'
      }`}
    >
      <main className="container mx-auto px-4 py-8">
        <Settings settings={settings} setSettings={setSettings} />
      </main>
    </div>
  );
}
