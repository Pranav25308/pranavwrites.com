'use client';

import { Button } from '@/components/ui/button';
import { Film, Book, Package, Moon, Sun, Cpu } from 'lucide-react';

export default function PublicNav({ 
  currentPage, 
  changePage, 
  settings, 
  darkMode, 
  toggleDarkMode 
}) {
  return (
    <nav className="border-b border-purple-500/20 bg-slate-950/95 backdrop-blur-xl sticky top-0 z-50 shadow-lg shadow-purple-500/5">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div 
            className="flex items-center gap-2 cursor-pointer group" 
            onClick={() => changePage('home')}
          >
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-600 to-cyan-500 flex items-center justify-center shadow-lg shadow-purple-500/25 group-hover:shadow-purple-500/50 transition-all duration-300 group-hover:scale-110">
              <Cpu className="w-5 h-5 text-white" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
              Portfolio
            </span>
          </div>

          {/* Navigation Links */}
          <div className="flex space-x-1">
            <button 
              onClick={() => changePage('home')} 
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                currentPage === 'home' 
                  ? 'bg-purple-600/20 text-purple-400 shadow-inner shadow-purple-500/20' 
                  : 'text-slate-400 hover:text-purple-400 hover:bg-purple-600/10'
              }`}
            >
              Home
            </button>

            {settings.navbar.blogs && (
              <button 
                onClick={() => changePage('blogs')} 
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                  currentPage === 'blogs' 
                    ? 'bg-purple-600/20 text-purple-400 shadow-inner shadow-purple-500/20' 
                    : 'text-slate-400 hover:text-purple-400 hover:bg-purple-600/10'
                }`}
              >
                Blogs
              </button>
            )}

            {/* Reviews Dropdown */}
            {(settings.navbar.movies || settings.navbar.books || settings.navbar.products) && (
              <div className="relative group">
                <button className="px-4 py-2 rounded-lg text-sm font-medium text-slate-400 hover:text-purple-400 hover:bg-purple-600/10 transition-all duration-300">
                  Reviews
                </button>
                <div className="absolute invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-all duration-200 pt-2 left-1/2 -translate-x-1/2 z-50">
                  <div className="bg-slate-900/95 backdrop-blur-xl border border-purple-500/20 rounded-xl shadow-2xl shadow-purple-500/10 p-2 space-y-1 min-w-[160px]">
                    {settings.navbar.movies && (
                      <button 
                        onClick={() => changePage('movies')} 
                        className="flex items-center w-full text-left px-4 py-2.5 text-sm text-slate-400 hover:text-purple-400 hover:bg-purple-600/10 rounded-lg transition-all duration-200"
                      >
                        <Film className="w-4 h-4 mr-3 text-purple-500" />Movies
                      </button>
                    )}
                    {settings.navbar.books && (
                      <button 
                        onClick={() => changePage('books')} 
                        className="flex items-center w-full text-left px-4 py-2.5 text-sm text-slate-400 hover:text-purple-400 hover:bg-purple-600/10 rounded-lg transition-all duration-200"
                      >
                        <Book className="w-4 h-4 mr-3 text-cyan-500" />Books
                      </button>
                    )}
                    {settings.navbar.products && (
                      <button 
                        onClick={() => changePage('products')} 
                        className="flex items-center w-full text-left px-4 py-2.5 text-sm text-slate-400 hover:text-purple-400 hover:bg-purple-600/10 rounded-lg transition-all duration-200"
                      >
                        <Package className="w-4 h-4 mr-3 text-pink-500" />Products
                      </button>
                    )}
                  </div>
                </div>
              </div>
            )}

            {settings.navbar.about && (
              <button 
                onClick={() => changePage('about')} 
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                  currentPage === 'about' 
                    ? 'bg-purple-600/20 text-purple-400 shadow-inner shadow-purple-500/20' 
                    : 'text-slate-400 hover:text-purple-400 hover:bg-purple-600/10'
                }`}
              >
                About
              </button>
            )}

            <button 
              onClick={() => changePage('contact')} 
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                currentPage === 'contact' 
                  ? 'bg-purple-600/20 text-purple-400 shadow-inner shadow-purple-500/20' 
                  : 'text-slate-400 hover:text-purple-400 hover:bg-purple-600/10'
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
            className="text-slate-400 hover:text-purple-400 hover:bg-purple-600/10 rounded-lg transition-all duration-300"
          >
            {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </Button>
        </div>
      </div>
    </nav>
  );
}
