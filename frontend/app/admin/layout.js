'use client';

import { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Eye, Activity, Users, Settings, LogOut, Moon, Sun, ArrowLeft } from 'lucide-react';

export default function AdminLayout({ children }) {
  const router = useRouter();
  const pathname = usePathname();
  const [isAdmin, setIsAdmin] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('adminToken');
      setIsAdmin(token === 'admin-token-123');
      setDarkMode(localStorage.getItem('darkMode') === 'true');
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    setIsAdmin(false);
    router.push('/admin');
  };

  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    if (typeof window !== 'undefined') {
      localStorage.setItem('darkMode', newMode.toString());
      if (newMode) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    }
  };

  const isActive = (path) => pathname === path;

  // Show admin nav only if logged in and not on main admin login page
  const showNav = isAdmin && pathname !== '/admin';

  return (
    <>
      {showNav && (
        <nav 
          data-testid="admin-nav"
          className="border-b bg-gradient-to-r from-blue-900 to-cyan-900 sticky top-0 z-50 shadow-lg"
        >
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              {/* Logo & Back */}
              <div className="flex items-center gap-4">
                <Link href="/" className="text-slate-300 hover:text-white transition-colors">
                  <ArrowLeft className="w-5 h-5" />
                </Link>
                <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                  Admin
                </span>
              </div>

              {/* Navigation Links */}
              <div className="flex space-x-2">
                <Link
                  href="/admin"
                  data-testid="admin-nav-dashboard"
                  className={`text-sm font-medium transition-all duration-300 flex items-center space-x-2 px-4 py-2 rounded-lg ${
                    isActive('/admin') 
                      ? 'bg-blue-600 text-white font-semibold shadow-lg' 
                      : 'text-slate-300 hover:bg-blue-800 hover:text-white'
                  }`}
                >
                  <Eye className="w-4 h-4" />
                  <span>Dashboard</span>
                </Link>

                <Link
                  href="/admin/analytics"
                  data-testid="admin-nav-analytics"
                  className={`text-sm font-medium transition-all duration-300 flex items-center space-x-2 px-4 py-2 rounded-lg ${
                    isActive('/admin/analytics') 
                      ? 'bg-blue-600 text-white font-semibold shadow-lg' 
                      : 'text-slate-300 hover:bg-blue-800 hover:text-white'
                  }`}
                >
                  <Activity className="w-4 h-4" />
                  <span>Analytics</span>
                </Link>

                <Link
                  href="/admin/users"
                  data-testid="admin-nav-users"
                  className={`text-sm font-medium transition-all duration-300 flex items-center space-x-2 px-4 py-2 rounded-lg ${
                    isActive('/admin/users') 
                      ? 'bg-blue-600 text-white font-semibold shadow-lg' 
                      : 'text-slate-300 hover:bg-blue-800 hover:text-white'
                  }`}
                >
                  <Users className="w-4 h-4" />
                  <span>Users</span>
                </Link>

                <Link
                  href="/admin/settings"
                  data-testid="admin-nav-settings"
                  className={`text-sm font-medium transition-all duration-300 flex items-center space-x-2 px-4 py-2 rounded-lg ${
                    isActive('/admin/settings') 
                      ? 'bg-blue-600 text-white font-semibold shadow-lg' 
                      : 'text-slate-300 hover:bg-blue-800 hover:text-white'
                  }`}
                >
                  <Settings className="w-4 h-4" />
                  <span>Settings</span>
                </Link>
              </div>

              {/* Right Side */}
              <div className="flex items-center space-x-2">
                <Button 
                  onClick={toggleDarkMode} 
                  variant="ghost" 
                  size="icon"
                  data-testid="admin-dark-mode"
                  className="text-slate-300 hover:bg-blue-800 hover:text-white transition-all duration-300 rounded-full"
                >
                  {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                </Button>
                <Button 
                  onClick={handleLogout} 
                  variant="ghost" 
                  size="icon"
                  data-testid="admin-logout-nav"
                  className="text-slate-300 hover:bg-blue-800 hover:text-white transition-all duration-300 rounded-full"
                >
                  <LogOut className="w-5 h-5" />
                </Button>
              </div>
            </div>
          </div>
        </nav>
      )}
      {children}
    </>
  );
}
