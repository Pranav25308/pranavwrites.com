'use client';

import { Github, Linkedin, Twitter } from 'lucide-react';

export default function Footer({ changePage, setShowAdminLogin }) {
  return (
    <footer className="border-t bg-white dark:bg-slate-900 mt-16 transition-colors duration-300">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <div className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 dark:from-blue-400 dark:to-cyan-400 bg-clip-text text-transparent mb-4">
              P
            </div>
            <p className="text-slate-600 dark:text-slate-400">
              A personal portfolio showcasing my work, reviews, and thoughts.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-slate-800 dark:text-slate-100 mb-4">Quick Links</h4>
            <div className="space-y-2">
              <button 
                onClick={() => changePage('home')} 
                className="block text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                Home
              </button>
              <button 
                onClick={() => changePage('about')} 
                className="block text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                About
              </button>
              <button 
                onClick={() => changePage('contact')} 
                className="block text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                Contact
              </button>
            </div>
          </div>

          {/* Social Links */}
          <div>
            <h4 className="font-semibold text-slate-800 dark:text-slate-100 mb-4">Connect</h4>
            <div className="flex space-x-4">
              <a 
                href="#" 
                className="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-300 hover:scale-125"
              >
                <Github className="w-6 h-6" />
              </a>
              <a 
                href="#" 
                className="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-300 hover:scale-125"
              >
                <Linkedin className="w-6 h-6" />
              </a>
              <a 
                href="#" 
                className="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-300 hover:scale-125"
              >
                <Twitter className="w-6 h-6" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-200 dark:border-slate-700 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-slate-500 dark:text-slate-400 text-sm">
            © 2024 Portfolio. All rights reserved.
          </p>
          <button 
            onClick={() => setShowAdminLogin(true)} 
            className="text-slate-400 dark:text-slate-500 text-sm hover:text-blue-600 dark:hover:text-blue-400 transition-colors mt-4 md:mt-0"
          >
            Admin
          </button>
        </div>
      </div>
    </footer>
  );
}
