'use client';

import { Button } from '@/components/ui/button';
import { Eye, Activity, MessageSquare, Users, Settings, Edit, LogOut, Moon, Sun } from 'lucide-react';

export default function AdminNav({ 
  currentPage, 
  changePage, 
  darkMode, 
  toggleDarkMode,
  handleLogout 
}) {
  return (
    <nav className="border-b bg-gradient-to-r from-blue-900 to-cyan-900 dark:from-slate-900 dark:to-slate-800 sticky top-0 z-50 shadow-lg transition-colors duration-300">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent cursor-pointer hover:scale-110 transition-all duration-300">
            P
          </div>

          {/* Navigation Links */}
          <div className="flex space-x-6">
            <button
              onClick={() => changePage('visits')}
              className={`text-sm font-medium transition-all duration-300 flex items-center space-x-2 px-4 py-2 rounded-lg ${
                currentPage === 'visits' 
                  ? 'bg-blue-600 text-white font-semibold shadow-lg' 
                  : 'text-slate-300 hover:bg-blue-800 hover:text-white'
              }`}
            >
              <Eye className="w-4 h-4" />
              <span>Visits</span>
            </button>

            <button
              onClick={() => changePage('analysis')}
              className={`text-sm font-medium transition-all duration-300 flex items-center space-x-2 px-4 py-2 rounded-lg ${
                currentPage === 'analysis' 
                  ? 'bg-blue-600 text-white font-semibold shadow-lg' 
                  : 'text-slate-300 hover:bg-blue-800 hover:text-white'
              }`}
            >
              <Activity className="w-4 h-4" />
              <span>Analysis</span>
            </button>

            <button
              onClick={() => changePage('contacts')}
              className={`text-sm font-medium transition-all duration-300 flex items-center space-x-2 px-4 py-2 rounded-lg ${
                currentPage === 'contacts' 
                  ? 'bg-blue-600 text-white font-semibold shadow-lg' 
                  : 'text-slate-300 hover:bg-blue-800 hover:text-white'
              }`}
            >
              <MessageSquare className="w-4 h-4" />
              <span>Messages</span>
            </button>

            <button
              onClick={() => changePage('roles')}
              className={`text-sm font-medium transition-all duration-300 flex items-center space-x-2 px-4 py-2 rounded-lg ${
                currentPage === 'roles' 
                  ? 'bg-blue-600 text-white font-semibold shadow-lg' 
                  : 'text-slate-300 hover:bg-blue-800 hover:text-white'
              }`}
            >
              <Users className="w-4 h-4" />
              <span>Roles</span>
            </button>

            <button
              onClick={() => changePage('settings')}
              className={`text-sm font-medium transition-all duration-300 flex items-center space-x-2 px-4 py-2 rounded-lg ${
                currentPage === 'settings' 
                  ? 'bg-blue-600 text-white font-semibold shadow-lg' 
                  : 'text-slate-300 hover:bg-blue-800 hover:text-white'
              }`}
            >
              <Settings className="w-4 h-4" />
              <span>Settings</span>
            </button>

            {/* Manage Dropdown */}
            <div className="relative group">
              <button className="text-sm font-medium text-slate-300 hover:bg-blue-800 hover:text-white transition-all duration-300 px-4 py-2 rounded-lg flex items-center space-x-2">
                <Edit className="w-4 h-4" />
                <span>Manage</span>
              </button>
              <div className="absolute invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-all duration-200 pt-1 z-50">
                <div className="bg-white dark:bg-slate-800 border border-blue-200 dark:border-slate-700 rounded-lg shadow-xl p-2 space-y-1 min-w-[140px]">
                  <button 
                    onClick={() => changePage('manage-blogs')} 
                    className="block w-full text-left px-4 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-blue-50 dark:hover:bg-slate-700 hover:text-blue-600 rounded transition-all duration-200"
                  >
                    Blogs
                  </button>
                  <button 
                    onClick={() => changePage('manage-movies')} 
                    className="block w-full text-left px-4 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-blue-50 dark:hover:bg-slate-700 hover:text-blue-600 rounded transition-all duration-200"
                  >
                    Movies
                  </button>
                  <button 
                    onClick={() => changePage('manage-books')} 
                    className="block w-full text-left px-4 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-blue-50 dark:hover:bg-slate-700 hover:text-blue-600 rounded transition-all duration-200"
                  >
                    Books
                  </button>
                  <button 
                    onClick={() => changePage('manage-products')} 
                    className="block w-full text-left px-4 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-blue-50 dark:hover:bg-slate-700 hover:text-blue-600 rounded transition-all duration-200"
                  >
                    Products
                  </button>
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
            >
              {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </Button>
            <Button 
              onClick={handleLogout} 
              variant="ghost" 
              size="icon"
              className="text-slate-300 hover:bg-blue-800 hover:text-white transition-all duration-300 rounded-full"
            >
              <LogOut className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}
