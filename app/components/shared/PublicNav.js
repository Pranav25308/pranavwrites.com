'use client';

import { Button } from '@/components/ui/button';
import { Film, Book, Package, Moon, Sun } from 'lucide-react';

export default function PublicNav({ 
  currentPage, 
  changePage, 
  settings, 
  darkMode, 
  toggleDarkMode 
}) {
  return (
    <nav className="border-b bg-white dark:bg-slate-900 sticky top-0 z-50 shadow-md transition-colors duration-300">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div 
            className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 dark:from-blue-400 dark:to-cyan-400 bg-clip-text text-transparent cursor-pointer hover:scale-110 transition-all duration-300" 
            onClick={() => changePage('home')}
          >
            P
          </div>

          {/* Navigation Links */}
          <div className="flex space-x-8">
            <button 
              onClick={() => changePage('home')} 
              className={`text-sm font-medium transition-all duration-300 hover:text-blue-600 dark:hover:text-blue-400 hover:scale-105 ${
                currentPage === 'home' 
                  ? 'text-blue-600 dark:text-blue-400 font-semibold border-b-2 border-blue-600 dark:border-blue-400' 
                  : 'text-slate-700 dark:text-slate-300'
              }`}
            >
              Home
            </button>

            {settings.navbar.blogs && (
              <button 
                onClick={() => changePage('blogs')} 
                className={`text-sm font-medium transition-all duration-300 hover:text-blue-600 dark:hover:text-blue-400 hover:scale-105 ${
                  currentPage === 'blogs' 
                    ? 'text-blue-600 dark:text-blue-400 font-semibold border-b-2 border-blue-600 dark:border-blue-400' 
                    : 'text-slate-700 dark:text-slate-300'
                }`}
              >
                Blogs
              </button>
            )}

            {/* Reviews Dropdown */}
            {(settings.navbar.movies || settings.navbar.books || settings.navbar.products) && (
              <div className="relative group">
                <button className="text-sm font-medium text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-300 hover:scale-105 py-2">
                  Reviews
                </button>
                <div className="absolute invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-all duration-200 pt-1 left-1/2 -translate-x-1/2 z-50">
                  <div className="bg-white dark:bg-slate-800 border border-blue-200 dark:border-slate-700 rounded-lg shadow-xl p-2 space-y-1 min-w-[140px]">
                    {settings.navbar.movies && (
                      <button 
                        onClick={() => changePage('movies')} 
                        className="block w-full text-left px-4 py-2 text-sm hover:bg-blue-50 dark:hover:bg-slate-700 hover:text-blue-600 dark:hover:text-blue-400 rounded transition-all duration-200"
                      >
                        <Film className="w-4 h-4 inline mr-2" />Movies
                      </button>
                    )}
                    {settings.navbar.books && (
                      <button 
                        onClick={() => changePage('books')} 
                        className="block w-full text-left px-4 py-2 text-sm hover:bg-blue-50 dark:hover:bg-slate-700 hover:text-blue-600 dark:hover:text-blue-400 rounded transition-all duration-200"
                      >
                        <Book className="w-4 h-4 inline mr-2" />Books
                      </button>
                    )}
                    {settings.navbar.products && (
                      <button 
                        onClick={() => changePage('products')} 
                        className="block w-full text-left px-4 py-2 text-sm hover:bg-blue-50 dark:hover:bg-slate-700 hover:text-blue-600 dark:hover:text-blue-400 rounded transition-all duration-200"
                      >
                        <Package className="w-4 h-4 inline mr-2" />Products
                      </button>
                    )}
                  </div>
                </div>
              </div>
            )}

            {settings.navbar.about && (
              <button 
                onClick={() => changePage('about')} 
                className={`text-sm font-medium transition-all duration-300 hover:text-blue-600 dark:hover:text-blue-400 hover:scale-105 ${
                  currentPage === 'about' 
                    ? 'text-blue-600 dark:text-blue-400 font-semibold border-b-2 border-blue-600 dark:border-blue-400' 
                    : 'text-slate-700 dark:text-slate-300'
                }`}
              >
                About
              </button>
            )}

            <button 
              onClick={() => changePage('contact')} 
              className={`text-sm font-medium transition-all duration-300 hover:text-blue-600 dark:hover:text-blue-400 hover:scale-105 ${
                currentPage === 'contact' 
                  ? 'text-blue-600 dark:text-blue-400 font-semibold border-b-2 border-blue-600 dark:border-blue-400' 
                  : 'text-slate-700 dark:text-slate-300'
              }`}
            >
              Contact
            </button>
          </div>

          {/* Dark Mode Toggle */}
          <Button 
            onClick={toggleDarkMode} 
            variant="ghost" 
            size="icon"
            className="text-slate-700 dark:text-slate-300 hover:bg-blue-50 dark:hover:bg-slate-800 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-300 rounded-full"
          >
            {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </Button>
        </div>
      </div>
    </nav>
  );
}
