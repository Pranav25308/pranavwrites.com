'use client';

import { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import AdminNav from '@/components/shared/AdminNav';
import { useTheme } from '@/components/theme/ThemeProvider';

export default function AdminLayout({ children }) {
  const pathname = usePathname();
  const router = useRouter();
  const { darkMode, toggleDarkMode } = useTheme();
  const [isAuthed, setIsAuthed] = useState(false);
  const [checked, setChecked] = useState(false);

  const isLoginRoute = pathname === '/admin/login';

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const token = localStorage.getItem('adminToken');
    if (!token) {
      setIsAuthed(false);
      if (!isLoginRoute) {
        router.replace('/admin/login');
        return;
      }
      setChecked(true);
      return;
    }

    let active = true;
    fetch('/api/auth/verify', {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        if (!active) return;
        if (data.valid) {
          setIsAuthed(true);
          if (isLoginRoute) {
            router.replace('/admin/visits');
            return;
          }
        } else {
          localStorage.removeItem('adminToken');
          setIsAuthed(false);
          if (!isLoginRoute) {
            router.replace('/admin/login');
            return;
          }
        }
        setChecked(true);
      })
      .catch(() => {
        if (!active) return;
        setIsAuthed(false);
        if (!isLoginRoute) {
          router.replace('/admin/login');
          return;
        }
        setChecked(true);
      });

    return () => {
      active = false;
    };
  }, [pathname, isLoginRoute, router]);

  const handleLogout = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('adminToken');
    }
    setIsAuthed(false);
  };

  if (!checked) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950">
        <div className="flex flex-col items-center gap-4">
          <div className="relative">
            <div className="w-14 h-14 rounded-full border-4 border-purple-200 dark:border-slate-700" />
            <div className="absolute inset-0 w-14 h-14 rounded-full border-4 border-transparent border-t-purple-600 border-r-cyan-500 animate-spin" />
          </div>
          <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">
            Verifying access...
          </p>
        </div>
      </div>
    );
  }

  if (isLoginRoute) {
    return (
      <div
        className={`min-h-screen transition-colors duration-300 ${
          darkMode
            ? 'bg-slate-950 text-white'
            : 'bg-gradient-to-br from-slate-50 via-purple-50/30 to-cyan-50/30 text-slate-900'
        }`}
      >
        {children}
      </div>
    );
  }

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        darkMode
          ? 'bg-slate-950 text-white'
          : 'bg-gradient-to-br from-slate-50 via-purple-50/30 to-cyan-50/30 text-slate-900'
      }`}
    >
      <AdminNav
        darkMode={darkMode}
        toggleDarkMode={toggleDarkMode}
        handleLogout={handleLogout}
      />
      <main className="container mx-auto px-4 py-8">{children}</main>
    </div>
  );
}
