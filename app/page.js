'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { LogIn } from 'lucide-react';

// Import Data
import { 
  DUMMY_ROLES, 
  DUMMY_REVIEWS, 
  DUMMY_CONTACTS, 
  DUMMY_ANALYTICS, 
  DUMMY_ABOUT, 
  DUMMY_SETTINGS,
  SKILLS,
  WORK_EXPERIENCE,
  DOMAINS
} from './data/dummyData';

// Import Components - Shared
import PublicNav from './components/shared/PublicNav';
import AdminNav from './components/shared/AdminNav';
import Footer from './components/shared/Footer';

// Import Components - User Side
import Home from './components/user/Home';
import About from './components/user/About';
import Contact from './components/user/Contact';
import Reviews from './components/user/Reviews';

// Import Components - Admin Side
import Visits from './components/admin/Visits';
import Analysis from './components/admin/Analysis';
import Messages from './components/admin/Messages';
import Roles from './components/admin/Roles';
import Settings from './components/admin/Settings';
import Manage from './components/admin/Manage';

export default function App() {
  // ==================== STATE ====================
  const [currentPage, setCurrentPage] = useState('home');
  const [reviews] = useState(DUMMY_REVIEWS);
  const [filteredReviews, setFilteredReviews] = useState([]);
  const [aboutContent] = useState(DUMMY_ABOUT);
  const [isAdmin, setIsAdmin] = useState(false);
  const [showAdminLogin, setShowAdminLogin] = useState(false);
  const [loginForm, setLoginForm] = useState({ username: '', password: '' });
  const [analytics] = useState(DUMMY_ANALYTICS);
  const [darkMode, setDarkMode] = useState(false);
  const [typedText, setTypedText] = useState('');
  const [contacts] = useState(DUMMY_CONTACTS);
  const [contactForm, setContactForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [roles] = useState(DUMMY_ROLES);
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const [settings, setSettings] = useState(DUMMY_SETTINGS);

  // Skills, Work Experience, and Domains for About page
  const skills = SKILLS.map(s => ({
    ...s,
    icon: s.icon // Will be resolved in About component
  }));
  const workExperience = WORK_EXPERIENCE;
  const domains = DOMAINS;

  // ==================== EFFECTS ====================
  
  // Typing animation effect
  useEffect(() => {
    if (roles.length === 0) return;
    const currentRole = roles[currentRoleIndex];
    if (!currentRole) return;
    let charIndex = 0;
    let isDeleting = false;
    
    const typeInterval = setInterval(() => {
      if (!isDeleting && charIndex <= currentRole.title.length) {
        setTypedText(currentRole.title.substring(0, charIndex));
        charIndex++;
      } else if (charIndex > currentRole.title.length && !isDeleting) {
        setTimeout(() => {
          isDeleting = true;
        }, 2000);
      } else if (isDeleting && charIndex > 0) {
        charIndex--;
        setTypedText(currentRole.title.substring(0, charIndex));
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        setCurrentRoleIndex((prev) => (prev + 1) % roles.length);
        clearInterval(typeInterval);
      }
    }, isDeleting ? 50 : 100);

    return () => clearInterval(typeInterval);
  }, [currentRoleIndex, roles]);

  // Initialize - check for saved admin token and dark mode
  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (token === 'admin-token-123') {
      setIsAdmin(true);
    }
    const savedDarkMode = localStorage.getItem('darkMode') === 'true';
    setDarkMode(savedDarkMode);
  }, []);

  // Dark mode effect
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('darkMode', darkMode.toString());
  }, [darkMode]);

  // Filter reviews based on current page
  useEffect(() => {
    if (currentPage === 'home') {
      setFilteredReviews(reviews.slice(0, 6));
    } else if (currentPage === 'blogs') {
      setFilteredReviews(reviews.filter(r => r.type === 'blog'));
    } else if (currentPage === 'movies') {
      setFilteredReviews(reviews.filter(r => r.type === 'movie'));
    } else if (currentPage === 'books') {
      setFilteredReviews(reviews.filter(r => r.type === 'book'));
    } else if (currentPage === 'products') {
      setFilteredReviews(reviews.filter(r => r.type === 'product'));
    }
  }, [currentPage, reviews]);

  // ==================== HANDLERS ====================

  // Hardcoded login - username: admin, password: admin
  const handleLogin = (e) => {
    e.preventDefault();
    if (loginForm.username === 'admin' && loginForm.password === 'admin') {
      localStorage.setItem('adminToken', 'admin-token-123');
      setIsAdmin(true);
      setShowAdminLogin(false);
      setCurrentPage('visits');
      window.scrollTo(0, 0);
    } else {
      alert('Invalid credentials! Use username: admin, password: admin');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    setIsAdmin(false);
    setCurrentPage('home');
  };

  const handleContactSubmit = (e) => {
    e.preventDefault();
    alert('Message sent successfully! (Demo - no backend)');
    setContactForm({ name: '', email: '', subject: '', message: '' });
  };

  const changePage = (page) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  // ==================== RENDER ====================
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      
      {/* Navigation */}
      {isAdmin ? (
        <AdminNav 
          currentPage={currentPage}
          changePage={changePage}
          darkMode={darkMode}
          toggleDarkMode={toggleDarkMode}
          handleLogout={handleLogout}
        />
      ) : (
        <PublicNav 
          currentPage={currentPage}
          changePage={changePage}
          settings={settings}
          darkMode={darkMode}
          toggleDarkMode={toggleDarkMode}
        />
      )}

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        
        {/* ========== USER PAGES ========== */}
        
        {/* Home Page */}
        {currentPage === 'home' && !isAdmin && (
          <Home 
            typedText={typedText}
            filteredReviews={filteredReviews}
            changePage={changePage}
          />
        )}

        {/* Reviews Pages (Blogs, Movies, Books, Products) */}
        {['blogs', 'movies', 'books', 'products'].includes(currentPage) && !isAdmin && (
          <Reviews 
            currentPage={currentPage}
            filteredReviews={filteredReviews}
          />
        )}

        {/* About Page */}
        {currentPage === 'about' && !isAdmin && (
          <About 
            aboutContent={aboutContent}
            skills={skills}
            workExperience={workExperience}
            domains={domains}
          />
        )}

        {/* Contact Page */}
        {currentPage === 'contact' && !isAdmin && (
          <Contact 
            contactForm={contactForm}
            setContactForm={setContactForm}
            handleContactSubmit={handleContactSubmit}
          />
        )}

        {/* ========== ADMIN PAGES ========== */}

        {/* Visits Page */}
        {currentPage === 'visits' && isAdmin && (
          <Visits analytics={analytics} />
        )}

        {/* Analysis Page */}
        {currentPage === 'analysis' && isAdmin && (
          <Analysis 
            reviews={reviews}
            contacts={contacts}
            roles={roles}
          />
        )}

        {/* Messages Page */}
        {currentPage === 'contacts' && isAdmin && (
          <Messages contacts={contacts} />
        )}

        {/* Roles Page */}
        {currentPage === 'roles' && isAdmin && (
          <Roles roles={roles} />
        )}

        {/* Settings Page */}
        {currentPage === 'settings' && isAdmin && (
          <Settings 
            settings={settings}
            setSettings={setSettings}
          />
        )}

        {/* Manage Pages */}
        {currentPage.startsWith('manage-') && isAdmin && (
          <Manage 
            currentPage={currentPage}
            reviews={reviews}
          />
        )}

      </main>

      {/* Footer */}
      <Footer 
        changePage={changePage}
        setShowAdminLogin={setShowAdminLogin}
      />

      {/* Admin Login Dialog */}
      <Dialog open={showAdminLogin} onOpenChange={setShowAdminLogin}>
        <DialogContent className="bg-white dark:bg-slate-800 border-2 border-blue-200 dark:border-slate-700">
          <DialogHeader>
            <DialogTitle className="text-2xl text-slate-800 dark:text-slate-100">Admin Login</DialogTitle>
            <DialogDescription className="text-slate-600 dark:text-slate-400">
              Enter your credentials to access the admin panel.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username" className="text-slate-700 dark:text-slate-300">Username</Label>
              <Input 
                id="username" 
                value={loginForm.username} 
                onChange={(e) => setLoginForm({...loginForm, username: e.target.value})} 
                placeholder="admin" 
                required 
                className="border-blue-200 dark:border-slate-600 focus:border-blue-500 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="text-slate-700 dark:text-slate-300">Password</Label>
              <Input 
                id="password" 
                type="password" 
                value={loginForm.password} 
                onChange={(e) => setLoginForm({...loginForm, password: e.target.value})} 
                placeholder="••••••••" 
                required 
                className="border-blue-200 dark:border-slate-600 focus:border-blue-500 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100"
              />
            </div>
            <Button 
              type="submit" 
              className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <LogIn className="w-4 h-4 mr-2" />
              Login
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
