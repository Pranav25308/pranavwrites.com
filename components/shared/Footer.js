'use client';

import { Github, Linkedin, Twitter, Cpu, Mail, MapPin } from 'lucide-react';
import { useRouter } from "next/navigation";
import { useTheme } from '@/components/theme/ThemeProvider';


export default function Footer({ changePage, setShowAdminLogin }) {
  const router = useRouter();
  const { darkMode } = useTheme();
  return (
    <footer className={`border-t mt-16 transition-colors duration-300 ${
      darkMode 
        ? 'border-purple-500/20 bg-slate-950' 
        : 'border-purple-200 bg-white'
    }`}>
      {/* Gradient Line */}
      <div className="h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent"></div>
      
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-600 to-cyan-500 flex items-center justify-center shadow-lg shadow-purple-500/25">
                <Cpu className="w-5 h-5 text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-cyan-500 bg-clip-text text-transparent">
                Portfolio
              </span>
            </div>
            <p className={`leading-relaxed mb-6 max-w-md ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
              A personal portfolio showcasing my work in software development, AI, and technology. 
              Building the future, one line of code at a time.
            </p>
            <div className="flex items-center gap-4">
              <a 
                href="#" 
                className={`w-10 h-10 rounded-lg border flex items-center justify-center transition-all duration-300 ${
                  darkMode 
                    ? 'bg-slate-800/50 border-purple-500/20 text-slate-400 hover:text-purple-400 hover:border-purple-500/50 hover:shadow-lg hover:shadow-purple-500/20' 
                    : 'bg-white border-purple-200 text-slate-500 hover:text-purple-600 hover:border-purple-400 hover:shadow-lg hover:shadow-purple-500/20'
                }`}
              >
                <Github className="w-5 h-5" />
              </a>
              <a 
                href="#" 
                className={`w-10 h-10 rounded-lg border flex items-center justify-center transition-all duration-300 ${
                  darkMode 
                    ? 'bg-slate-800/50 border-purple-500/20 text-slate-400 hover:text-cyan-400 hover:border-cyan-500/50 hover:shadow-lg hover:shadow-cyan-500/20' 
                    : 'bg-white border-purple-200 text-slate-500 hover:text-cyan-600 hover:border-cyan-400 hover:shadow-lg hover:shadow-cyan-500/20'
                }`}
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a 
                href="#" 
                className={`w-10 h-10 rounded-lg border flex items-center justify-center transition-all duration-300 ${
                  darkMode 
                    ? 'bg-slate-800/50 border-purple-500/20 text-slate-400 hover:text-pink-400 hover:border-pink-500/50 hover:shadow-lg hover:shadow-pink-500/20' 
                    : 'bg-white border-purple-200 text-slate-500 hover:text-pink-600 hover:border-pink-400 hover:shadow-lg hover:shadow-pink-500/20'
                }`}
              >
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className={`font-semibold mb-6 flex items-center gap-2 ${darkMode ? 'text-white' : 'text-slate-800'}`}>
              <span className="w-2 h-2 rounded-full bg-purple-500"></span>
              Quick Links
            </h4>
            <div className="space-y-3">
              <button 
                onClick={() => changePage('home')} 
                className={`block transition-colors duration-200 ${
                  darkMode 
                    ? 'text-slate-400 hover:text-purple-400' 
                    : 'text-slate-600 hover:text-purple-600'
                }`}
              >
                Home
              </button>
              <button 
                onClick={() => changePage('about')} 
                className={`block transition-colors duration-200 ${
                  darkMode 
                    ? 'text-slate-400 hover:text-purple-400' 
                    : 'text-slate-600 hover:text-purple-600'
                }`}
              >
                About
              </button>
              <button 
                onClick={() => changePage('blogs')} 
                className={`block transition-colors duration-200 ${
                  darkMode 
                    ? 'text-slate-400 hover:text-purple-400' 
                    : 'text-slate-600 hover:text-purple-600'
                }`}
              >
                Blogs
              </button>
              <button 
                onClick={() => changePage('contact')} 
                className={`block transition-colors duration-200 ${
                  darkMode 
                    ? 'text-slate-400 hover:text-purple-400' 
                    : 'text-slate-600 hover:text-purple-600'
                }`}
              >
                Contact
              </button>
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className={`font-semibold mb-6 flex items-center gap-2 ${darkMode ? 'text-white' : 'text-slate-800'}`}>
              <span className="w-2 h-2 rounded-full bg-cyan-500"></span>
              Get In Touch
            </h4>
            <div className="space-y-4">
              <div className={`flex items-center gap-3 ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                <Mail className="w-4 h-4 text-purple-500" />
                <span>hello@portfolio.dev</span>
              </div>
              <div className={`flex items-center gap-3 ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                <MapPin className="w-4 h-4 text-cyan-500" />
                <span>Pune, India</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className={`border-t mt-12 pt-8 flex flex-col md:flex-row justify-between items-center ${
          darkMode ? 'border-purple-500/10' : 'border-purple-100'
        }`}>
          <p className={`text-sm ${darkMode ? 'text-slate-500' : 'text-slate-500'}`}>
            © 2024 Portfolio. Crafted with 
            <span className="text-purple-500 mx-1">♥</span> 
            and lots of coffee.
          </p>
          <button 
            onClick={() => router.push("/admin/login")}
            className={`text-sm transition-colors mt-4 md:mt-0 ${
              darkMode 
                ? 'text-slate-600 hover:text-purple-400' 
                : 'text-slate-400 hover:text-purple-600'
            }`}
          >
            Admin Access
          </button>
        </div>
      </div>
    </footer>
  );
}
