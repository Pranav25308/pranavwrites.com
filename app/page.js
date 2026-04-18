'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { LogIn } from 'lucide-react';

// Import Data - page-wise modules
import { DUMMY_ROLES, DUMMY_CONTACTS, DUMMY_ANALYTICS } from '@/app/admin/data';
import { DUMMY_REVIEWS } from '@/app/reviews/data';
import { DUMMY_ABOUT, SKILLS, WORK_EXPERIENCE, DOMAINS } from '@/app/about/data';
import { DUMMY_SETTINGS } from '@/app/config/siteSettings';

// Import Components - Shared
// import PublicNav from '@/components/shared/PublicNav';
import AdminNav from '@/components/shared/AdminNav';
// import Footer from '@/components/shared/Footer';

// Import Components - User Side
import Home from '@/components/user/Home';
import About from '@/components/user/About';
import Contact from '@/components/user/Contact';
import Reviews from '@/components/user/Reviews';

// Import Components - Admin Side
import Visits from '@/components/admin/Visits';
import Analysis from '@/components/admin/Analysis';
import Messages from '@/components/admin/Messages';
import Roles from '@/components/admin/Roles';
import Settings from '@/components/admin/Settings';
import Manage from '@/components/admin/Manage';

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

  // #region agent log
  fetch('http://127.0.0.1:7242/ingest/93dacc2c-0e60-40d5-9ec1-7ba2dfaec91a', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      id: `log_${Date.now()}_appPage`,
      runId: 'initial',
      hypothesisId: 'H3',
      location: 'app/page.js:171',
      message: 'App page state snapshot before render',
      data: {
        isAdmin,
        currentPage,
        hasNavbarSettings: !!settings?.navbar,
        navbar: settings?.navbar ?? null
      },
      timestamp: Date.now()
    })
  }).catch(() => {});
  // #endregion

  // ==================== RENDER ====================
  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      darkMode 
        ? 'bg-slate-950 text-white' 
        : 'bg-gradient-to-br from-slate-50 via-purple-50/30 to-cyan-50/30 text-slate-900'
    }`}>
      
      {/* Navigation */}
      {/* {isAdmin ? (
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
      )} */}
      {isAdmin && (
        <AdminNav
          currentPage={currentPage}
          changePage={changePage}
          darkMode={darkMode}
          toggleDarkMode={toggleDarkMode}
          handleLogout={handleLogout}
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
            darkMode={darkMode}
          />
        )}

        {/* Reviews Pages (Blogs, Movies, Books, Products) */}
        {['blogs', 'movies', 'books', 'products'].includes(currentPage) && !isAdmin && (
          <Reviews 
            currentPage={currentPage}
            filteredReviews={filteredReviews}
            darkMode={darkMode}
          />
        )}

        {/* About Page */}
        {currentPage === 'about' && !isAdmin && (
          <About 
            aboutContent={aboutContent}
            skills={skills}
            workExperience={workExperience}
            domains={domains}
            darkMode={darkMode}
          />
        )}

        {/* Contact Page */}
        {currentPage === 'contact' && !isAdmin && (
          <Contact 
            contactForm={contactForm}
            setContactForm={setContactForm}
            handleContactSubmit={handleContactSubmit}
            darkMode={darkMode}
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
      {/* <Footer 
        changePage={changePage}
        setShowAdminLogin={setShowAdminLogin}
        darkMode={darkMode}
      /> */}

      {/* Admin Login Dialog */}
      <Dialog open={showAdminLogin} onOpenChange={setShowAdminLogin}>
        <DialogContent className="bg-slate-900/95 backdrop-blur-xl border border-purple-500/20 shadow-2xl shadow-purple-500/10">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-500"></div>
          <DialogHeader>
            <DialogTitle className="text-2xl text-white">Admin Access</DialogTitle>
            <DialogDescription className="text-slate-400">
              Enter your credentials to access the admin panel.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username" className="text-slate-300">Username</Label>
              <Input 
                id="username" 
                value={loginForm.username} 
                onChange={(e) => setLoginForm({...loginForm, username: e.target.value})} 
                placeholder="admin" 
                required 
                className="bg-slate-800/50 border-purple-500/20 focus:border-purple-500/50 text-white placeholder:text-slate-500"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="text-slate-300">Password</Label>
              <Input 
                id="password" 
                type="password" 
                value={loginForm.password} 
                onChange={(e) => setLoginForm({...loginForm, password: e.target.value})} 
                placeholder="••••••••" 
                required 
                className="bg-slate-800/50 border-purple-500/20 focus:border-purple-500/50 text-white placeholder:text-slate-500"
              />
            </div>
            <Button 
              type="submit" 
              className="w-full bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-500 hover:to-cyan-500 text-white shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 transition-all duration-300"
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
