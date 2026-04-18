'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import {
  Eye,
  Activity,
  MessageSquare,
  Users,
  Settings,
  Edit,
  LogOut,
  Moon,
  Sun
} from 'lucide-react';

const NAV_ITEMS = [
  { href: '/admin/visits', label: 'Visits', icon: Eye },
  { href: '/admin/analysis', label: 'Analysis', icon: Activity },
  { href: '/admin/messages', label: 'Messages', icon: MessageSquare },
  { href: '/admin/roles', label: 'Roles', icon: Users },
  { href: '/admin/settings', label: 'Settings', icon: Settings }
];

const MANAGE_ITEMS = [
  { href: '/admin/manage/blogs', label: 'Blogs' },
  { href: '/admin/manage/movies', label: 'Movies' },
  { href: '/admin/manage/books', label: 'Books' },
  { href: '/admin/manage/products', label: 'Products' }
];

export default function AdminNav({ darkMode, toggleDarkMode, handleLogout }) {
  const pathname = usePathname();
  const router = useRouter();

  const onLogout = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('adminToken');
    }
    if (handleLogout) handleLogout();
    router.push('/admin/login');
  };

  return (
    <nav className="border-b bg-gradient-to-r from-blue-900 to-cyan-900 dark:from-slate-900 dark:to-slate-800 sticky top-0 z-50 shadow-lg transition-colors duration-300">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link
            href="/admin"
            className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent cursor-pointer hover:scale-110 transition-all duration-300"
          >
            Pranav
          </Link>

          {/* Navigation Links */}
          <div className="flex space-x-2">
            {NAV_ITEMS.map(({ href, label, icon: Icon }) => {
              const active = pathname === href;
              return (
                <Link
                  key={href}
                  href={href}
                  className={`text-sm font-medium transition-all duration-300 flex items-center space-x-2 px-4 py-2 rounded-lg ${
                    active
                      ? 'bg-blue-600 text-white font-semibold shadow-lg'
                      : 'text-slate-300 hover:bg-blue-800 hover:text-white'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{label}</span>
                </Link>
              );
            })}

            {/* Manage Dropdown */}
            <div className="relative group">
              <button
                className={`text-sm font-medium transition-all duration-300 px-4 py-2 rounded-lg flex items-center space-x-2 ${
                  pathname.startsWith('/admin/manage')
                    ? 'bg-blue-600 text-white font-semibold shadow-lg'
                    : 'text-slate-300 hover:bg-blue-800 hover:text-white'
                }`}
              >
                <Edit className="w-4 h-4" />
                <span>Manage</span>
              </button>
              <div className="absolute right-0 invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-all duration-200 pt-1 z-50">
                <div className="bg-white dark:bg-slate-800 border border-blue-200 dark:border-slate-700 rounded-lg shadow-xl p-2 space-y-1 min-w-[160px]">
                  {MANAGE_ITEMS.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`block w-full text-left px-4 py-2 text-sm rounded transition-all duration-200 ${
                        pathname === item.href
                          ? 'bg-blue-50 dark:bg-slate-700 text-blue-600 dark:text-blue-400 font-semibold'
                          : 'text-slate-700 dark:text-slate-300 hover:bg-blue-50 dark:hover:bg-slate-700 hover:text-blue-600'
                      }`}
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Dark Mode & Logout */}
          <div className="flex items-center space-x-2">
            <Button
              onClick={toggleDarkMode}
              variant="ghost"
              size="icon"
              className="text-slate-300 hover:bg-blue-800 hover:text-white transition-all duration-300 rounded-full"
              aria-label="Toggle theme"
            >
              {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </Button>
            <Button
              onClick={onLogout}
              variant="ghost"
              size="icon"
              className="text-slate-300 hover:bg-blue-800 hover:text-white transition-all duration-300 rounded-full"
              aria-label="Logout"
            >
              <LogOut className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}
