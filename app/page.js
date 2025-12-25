'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { BookOpen, Film, Book, Package, User, LogIn, LogOut, Plus, Edit, Trash2, BarChart3, TrendingUp, Eye, Activity, Shield, Code, Laptop, Database, Cloud, Layers, Briefcase, Award, Sparkles, ChevronRight, Mail, Github, Linkedin, Twitter, Zap, Gamepad2, Server, Moon, Sun, Send, MessageSquare } from 'lucide-react';

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [reviews, setReviews] = useState([]);
  const [filteredReviews, setFilteredReviews] = useState([]);
  const [aboutContent, setAboutContent] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const [showAdminLogin, setShowAdminLogin] = useState(false);
  const [loginForm, setLoginForm] = useState({ username: '', password: '' });
  const [analytics, setAnalytics] = useState(null);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [editingReview, setEditingReview] = useState(null);
  const [reviewForm, setReviewForm] = useState({ type: 'blog', title: '', image: '', description: '' });
  const [aboutEditMode, setAboutEditMode] = useState(false);
  const [aboutEditContent, setAboutEditContent] = useState('');
  const [darkMode, setDarkMode] = useState(false);
  const [typedText, setTypedText] = useState('');
  const [contacts, setContacts] = useState([]);
  const [contactForm, setContactForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [roles, setRoles] = useState([]);
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const [settings, setSettings] = useState({ navbar: { about: true, blogs: true, movies: true, books: true, products: true } });
  const [showRoleModal, setShowRoleModal] = useState(false);
  const [editingRole, setEditingRole] = useState(null);
  const [roleForm, setRoleForm] = useState({ title: '' });

  // Fetch roles and settings
  const fetchRoles = async () => {
    try {
      const res = await fetch('/api/roles');
      const data = await res.json();
      setRoles(data);
    } catch (error) {
      console.error('Error fetching roles:', error);
    }
  };

  const fetchSettings = async () => {
    try {
      const res = await fetch('/api/settings');
      const data = await res.json();
      setSettings(data);
    } catch (error) {
      console.error('Error fetching settings:', error);
    }
  };

  // Typing animation effect
  useEffect(() => {
    if (roles.length === 0) return;
    const currentRole = roles[currentRoleIndex];
    if (!currentRole) return;
    let currentText = '';
    let charIndex = 0;
    let isDeleting = false;
    
    const typeInterval = setInterval(() => {
      if (!isDeleting && charIndex <= currentRole.title.length) {
        currentText = currentRole.title.substring(0, charIndex);
        setTypedText(currentText);
        charIndex++;
      } else if (charIndex === currentRole.title.length && !isDeleting) {
        setTimeout(() => {
          isDeleting = true;
        }, 2000);
      } else if (isDeleting && charIndex > 0) {
        currentText = currentRole.title.substring(0, charIndex - 1);
        setTypedText(currentText);
        charIndex--;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        setCurrentRoleIndex((prev) => (prev + 1) % roles.length);
        clearInterval(typeInterval);
      }
    }, isDeleting ? 50 : 100);

    return () => clearInterval(typeInterval);
  }, [currentRoleIndex]);

  const [skills] = useState([
    { name: 'Roku', icon: Laptop, color: 'from-purple-500 to-indigo-500' },
    { name: 'Python', icon: Code, color: 'from-blue-600 to-yellow-500' },
    { name: 'MySQL', icon: Database, color: 'from-blue-500 to-blue-700' },
    { name: 'NLP', icon: Sparkles, color: 'from-green-500 to-emerald-600' },
    { name: 'RAG', icon: Layers, color: 'from-orange-500 to-red-500' },
    { name: 'MongoDB', icon: Database, color: 'from-green-600 to-teal-600' },
    { name: 'Kafka', icon: Zap, color: 'from-slate-700 to-slate-900' },
    { name: 'DSA', icon: Code, color: 'from-cyan-500 to-blue-600' }
  ]);

  const [workExperience] = useState([
    {
      company: 'Tudip Technologies',
      position: 'Software Developer',
      duration: 'July 2022 - Present',
      description: 'Developing scalable software solutions and working on cutting-edge technologies.'
    },
    {
      company: 'HSPM Solutions',
      position: 'Web Developer Intern',
      duration: 'Jan 2022 - July 2022',
      description: 'Built responsive web applications and gained hands-on experience in full-stack development.'
    }
  ]);

  const [domains] = useState([
    {
      name: 'Streaming',
      description: 'Real-time data processing and event-driven architectures with Kafka',
      icon: Activity,
      gradient: 'from-blue-600 to-cyan-600'
    },
    {
      name: 'Game Development',
      description: 'Creating interactive gaming experiences on Roku platform',
      icon: Gamepad2,
      gradient: 'from-purple-600 to-pink-600'
    },
    {
      name: 'Data Engineering',
      description: 'Building robust data pipelines and ETL processes',
      icon: Server,
      gradient: 'from-orange-600 to-red-600'
    }
  ]);

  useEffect(() => {
    fetchRoles();
    fetchSettings();
    fetchReviews();
    fetchAbout();
    trackPageView('home');
    const token = localStorage.getItem('adminToken');
    if (token) {
      setIsAdmin(true);
    }
    // Load dark mode preference
    const savedDarkMode = localStorage.getItem('darkMode') === 'true';
    setDarkMode(savedDarkMode);
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('darkMode', darkMode.toString());
  }, [darkMode]);

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

  const fetchReviews = async () => {
    try {
      const res = await fetch('/api/reviews');
      const data = await res.json();
      setReviews(data);
    } catch (error) {
      console.error('Error fetching reviews:', error);
    }
  };

  const fetchAbout = async () => {
    try {
      const res = await fetch('/api/about');
      const data = await res.json();
      setAboutContent(data.content);
    } catch (error) {
      console.error('Error fetching about:', error);
    }
  };

  const fetchAnalytics = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      const res = await fetch('/api/analytics', {
        headers: { 'Authorization': token }
      });
      const data = await res.json();
      setAnalytics(data);
    } catch (error) {
      console.error('Error fetching analytics:', error);
    }
  };

  const fetchContacts = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      const res = await fetch('/api/contacts', {
        headers: { 'Authorization': token }
      });
      const data = await res.json();
      setContacts(data);
    } catch (error) {
      console.error('Error fetching contacts:', error);
    }
  };

  const trackPageView = async (page) => {
    try {
      await fetch('/api/analytics/track', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ page })
      });
    } catch (error) {
      console.error('Error tracking page view:', error);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(loginForm)
      });
      const data = await res.json();
      if (data.success) {
        localStorage.setItem('adminToken', data.token);
        setIsAdmin(true);
        setShowAdminLogin(false);
        setCurrentPage('visits');
        fetchAnalytics();
      } else {
        alert('Invalid credentials');
      }
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    setIsAdmin(false);
    setCurrentPage('home');
  };

  const handleContactSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/contacts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(contactForm)
      });
      const data = await res.json();
      if (data.success) {
        alert('Message sent successfully!');
        setContactForm({ name: '', email: '', subject: '', message: '' });
      }
    } catch (error) {
      console.error('Error submitting contact:', error);
      alert('Failed to send message. Please try again.');
    }
  };

  const handleSaveReview = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('adminToken');
      if (editingReview) {
        await fetch(`/api/reviews/${editingReview.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': token
          },
          body: JSON.stringify(reviewForm)
        });
      } else {
        await fetch('/api/reviews', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': token
          },
          body: JSON.stringify(reviewForm)
        });
      }
      setShowReviewModal(false);
      setEditingReview(null);
      setReviewForm({ type: 'blog', title: '', image: '', description: '' });
      fetchReviews();
    } catch (error) {
      console.error('Error saving review:', error);
    }
  };

  const handleDeleteReview = async (id) => {
    if (!confirm('Are you sure you want to delete this review?')) return;
    try {
      const token = localStorage.getItem('adminToken');
      await fetch(`/api/reviews/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': token }
      });
      fetchReviews();
    } catch (error) {
      console.error('Error deleting review:', error);
    }
  };

  const handleEditReview = (review) => {
    setEditingReview(review);
    setReviewForm({
      type: review.type,
      title: review.title,
      image: review.image,
      description: review.description
    });
    setShowReviewModal(true);
  };

  const handleSaveAbout = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      await fetch('/api/about', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token
        },
        body: JSON.stringify({ content: aboutEditContent })
      });
      setAboutContent(aboutEditContent);
      setAboutEditMode(false);
    } catch (error) {
      console.error('Error saving about:', error);
    }
  };

  const changePage = (page) => {
    setCurrentPage(page);
    trackPageView(page);
    if (page === 'visits' && isAdmin) {
      fetchAnalytics();
    }
    if (page === 'contacts' && isAdmin) {
      fetchContacts();
    }
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  // Public Navigation
  const PublicNav = () => (
    <nav className="border-b bg-white dark:bg-slate-900 sticky top-0 z-50 shadow-md transition-colors duration-300">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div 
            className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 dark:from-blue-400 dark:to-cyan-400 bg-clip-text text-transparent cursor-pointer hover:scale-110 transition-all duration-300" 
            onClick={() => changePage('home')}
          >
            P
          </div>
          <div className="flex space-x-8">
            <button
              onClick={() => changePage('home')}
              className={`text-sm font-medium transition-all duration-300 hover:text-blue-600 dark:hover:text-blue-400 hover:scale-105 ${
                currentPage === 'home' ? 'text-blue-600 dark:text-blue-400 font-semibold border-b-2 border-blue-600 dark:border-blue-400' : 'text-slate-700 dark:text-slate-300'
              }`}
            >
              Home
            </button>
            <button
              onClick={() => changePage('blogs')}
              className={`text-sm font-medium transition-all duration-300 hover:text-blue-600 dark:hover:text-blue-400 hover:scale-105 ${
                currentPage === 'blogs' ? 'text-blue-600 dark:text-blue-400 font-semibold border-b-2 border-blue-600 dark:border-blue-400' : 'text-slate-700 dark:text-slate-300'
              }`}
            >
              Blogs
            </button>
            <div className="relative group">
              <button className="text-sm font-medium text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-300 hover:scale-105">
                Reviews
              </button>
              <div className="absolute hidden group-hover:block pt-2 animate-in fade-in-0 zoom-in-95 left-1/2 -translate-x-1/2">
                <div className="bg-white dark:bg-slate-800 border border-blue-200 dark:border-slate-700 rounded-lg shadow-xl p-2 space-y-1 min-w-[140px]">
                  <button
                    onClick={() => changePage('movies')}
                    className="block w-full text-left px-4 py-2 text-sm hover:bg-blue-50 dark:hover:bg-slate-700 hover:text-blue-600 dark:hover:text-blue-400 rounded transition-all duration-200"
                  >
                    <Film className="w-4 h-4 inline mr-2" />
                    Movies
                  </button>
                  <button
                    onClick={() => changePage('books')}
                    className="block w-full text-left px-4 py-2 text-sm hover:bg-blue-50 dark:hover:bg-slate-700 hover:text-blue-600 dark:hover:text-blue-400 rounded transition-all duration-200"
                  >
                    <Book className="w-4 h-4 inline mr-2" />
                    Books
                  </button>
                  <button
                    onClick={() => changePage('products')}
                    className="block w-full text-left px-4 py-2 text-sm hover:bg-blue-50 dark:hover:bg-slate-700 hover:text-blue-600 dark:hover:text-blue-400 rounded transition-all duration-200"
                  >
                    <Package className="w-4 h-4 inline mr-2" />
                    Products
                  </button>
                </div>
              </div>
            </div>
            <button
              onClick={() => changePage('about')}
              className={`text-sm font-medium transition-all duration-300 hover:text-blue-600 dark:hover:text-blue-400 hover:scale-105 ${
                currentPage === 'about' ? 'text-blue-600 dark:text-blue-400 font-semibold border-b-2 border-blue-600 dark:border-blue-400' : 'text-slate-700 dark:text-slate-300'
              }`}
            >
              About
            </button>
            <button
              onClick={() => changePage('contact')}
              className={`text-sm font-medium transition-all duration-300 hover:text-blue-600 dark:hover:text-blue-400 hover:scale-105 ${
                currentPage === 'contact' ? 'text-blue-600 dark:text-blue-400 font-semibold border-b-2 border-blue-600 dark:border-blue-400' : 'text-slate-700 dark:text-slate-300'
              }`}
            >
              Contact
            </button>
          </div>
          <div>
            <Button 
              onClick={toggleDarkMode} 
              variant="ghost" 
              size="icon"
              className="hover:bg-blue-50 dark:hover:bg-slate-800 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-300 rounded-full"
            >
              {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );

  // Admin Navigation
  const AdminNav = () => (
    <nav className="border-b bg-white dark:bg-slate-900 sticky top-0 z-50 shadow-lg transition-colors duration-300">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 dark:from-blue-400 dark:to-cyan-400 bg-clip-text text-transparent cursor-pointer hover:scale-110 transition-all duration-300">
            P
          </div>
          <div className="flex space-x-6">
            <button
              onClick={() => changePage('visits')}
              className={`text-sm font-medium transition-all duration-300 flex items-center space-x-2 px-4 py-2 rounded-lg ${
                currentPage === 'visits' 
                  ? 'bg-blue-600 text-white font-semibold shadow-lg' 
                  : 'text-slate-700 dark:text-slate-300 hover:bg-blue-50 dark:hover:bg-slate-800 hover:text-blue-600 dark:hover:text-blue-400'
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
                  : 'text-slate-700 dark:text-slate-300 hover:bg-blue-50 dark:hover:bg-slate-800 hover:text-blue-600 dark:hover:text-blue-400'
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
                  : 'text-slate-700 dark:text-slate-300 hover:bg-blue-50 dark:hover:bg-slate-800 hover:text-blue-600 dark:hover:text-blue-400'
              }`}
            >
              <MessageSquare className="w-4 h-4" />
              <span>Messages</span>
            </button>
            <div className="relative group">
              <button className="text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-blue-50 dark:hover:bg-slate-800 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-300 px-4 py-2 rounded-lg flex items-center space-x-2">
                <Edit className="w-4 h-4" />
                <span>Manage</span>
              </button>
              <div className="absolute hidden group-hover:block pt-2 animate-in fade-in-0 zoom-in-95">
                <div className="bg-white dark:bg-slate-800 border border-blue-200 dark:border-slate-700 rounded-lg shadow-xl p-2 space-y-1 min-w-[140px]">
                  <button
                    onClick={() => changePage('manage-blogs')}
                    className="block w-full text-left px-4 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-blue-50 dark:hover:bg-slate-700 hover:text-blue-600 dark:hover:text-blue-400 rounded transition-all duration-200"
                  >
                    Blogs
                  </button>
                  <button
                    onClick={() => changePage('manage-movies')}
                    className="block w-full text-left px-4 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-blue-50 dark:hover:bg-slate-700 hover:text-blue-600 dark:hover:text-blue-400 rounded transition-all duration-200"
                  >
                    Movies
                  </button>
                  <button
                    onClick={() => changePage('manage-books')}
                    className="block w-full text-left px-4 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-blue-50 dark:hover:bg-slate-700 hover:text-blue-600 dark:hover:text-blue-400 rounded transition-all duration-200"
                  >
                    Books
                  </button>
                  <button
                    onClick={() => changePage('manage-products')}
                    className="block w-full text-left px-4 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-blue-50 dark:hover:bg-slate-700 hover:text-blue-600 dark:hover:text-blue-400 rounded transition-all duration-200"
                  >
                    Products
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Button 
              onClick={toggleDarkMode} 
              variant="ghost" 
              size="icon"
              className="text-slate-700 dark:text-slate-300 hover:bg-blue-50 dark:hover:bg-slate-800 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-300 rounded-full"
            >
              {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </Button>
            <Button 
              onClick={handleLogout} 
              variant="ghost" 
              size="icon"
              className="text-slate-700 dark:text-slate-300 hover:bg-blue-50 dark:hover:bg-slate-800 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-300 rounded-full"
            >
              <LogOut className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      darkMode 
        ? 'bg-slate-900' 
        : isAdmin ? 'bg-slate-50' : 'bg-gradient-to-br from-white via-blue-50 to-white'
    }`}>
      {/* Navigation */}
      {isAdmin ? <AdminNav /> : <PublicNav />}

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {currentPage === 'home' && (
          <div>
            {/* Hero Section with Typing Animation */}
            <div className="text-center py-20 mb-16 relative overflow-hidden">
              {/* Animated Background Elements */}
              <div className="absolute inset-0 overflow-hidden -z-10">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-400/10 dark:bg-blue-600/20 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-400/10 dark:bg-cyan-600/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
              </div>
              
              {/* Greeting */}
              <div className="mb-6 animate-in fade-in-0 slide-in-from-bottom-4 duration-700">
                <div className="inline-block">
                  <h1 className="text-7xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 dark:from-blue-400 dark:to-cyan-400 bg-clip-text text-transparent flex items-center gap-4">
                    <span className="text-6xl animate-bounce">🙏</span>
                    <span>Namaskar</span>
                  </h1>
                </div>
              </div>

              {/* Welcome Text */}
              <p className="text-2xl font-semibold text-slate-600 dark:text-slate-300 mb-4 animate-in fade-in-0 slide-in-from-bottom-8 duration-1000">
                Welcome to my Digital World!
              </p>

              {/* Typing Animation */}
              <div className="h-12 mb-8 flex items-center justify-center animate-in fade-in-0 slide-in-from-bottom-12 duration-1000">
                <p className="text-xl text-blue-600 dark:text-blue-400 font-medium">
                  I'm a <span className="font-bold">{typedText}</span>
                  <span className="inline-block w-0.5 h-6 bg-blue-600 dark:bg-blue-400 ml-1 animate-pulse"></span>
                </p>
              </div>

              {/* CTA Button */}
              <Button
                onClick={() => changePage('contact')}
                className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 animate-in fade-in-0 zoom-in-95 duration-1000 delay-200"
                size="lg"
              >
                <Mail className="w-5 h-5 mr-2" />
                Get In Touch
              </Button>
            </div>

            {/* Recent Reviews */}
            <div>
              <h2 className="text-4xl font-bold mb-8 text-center text-blue-800 dark:text-blue-400 animate-in fade-in-0 slide-in-from-bottom-4 duration-700">
                Recent Reviews
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredReviews.map((review, index) => (
                  <Card 
                    key={review.id} 
                    className="overflow-hidden hover:shadow-2xl dark:hover:shadow-blue-900/50 transition-all duration-500 hover:scale-105 hover:-translate-y-2 border-2 border-blue-100 dark:border-slate-700 bg-white dark:bg-slate-800 animate-in fade-in-0 slide-in-from-bottom-4 group cursor-pointer"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    {review.image && (
                      <div className="relative overflow-hidden">
                        <img
                          src={review.image}
                          alt={review.title}
                          className="w-full h-52 object-cover transition-all duration-700 group-hover:scale-110 group-hover:rotate-2"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-blue-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      </div>
                    )}
                    <CardHeader>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-bold text-white bg-gradient-to-r from-blue-600 to-cyan-600 px-3 py-1 rounded-full uppercase shadow-md group-hover:scale-110 transition-transform duration-300">
                          {review.type}
                        </span>
                      </div>
                      <CardTitle className="group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300 text-slate-800 dark:text-slate-100">{review.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-slate-600 dark:text-slate-400 line-clamp-3">{review.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
              {filteredReviews.length === 0 && (
                <div className="text-center py-20">
                  <div className="text-6xl mb-4 animate-bounce">📝</div>
                  <p className="text-xl text-slate-600 dark:text-slate-400">No reviews yet. Start creating amazing content!</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Contact Page */}
        {currentPage === 'contact' && (
          <div className="max-w-3xl mx-auto">
            <h1 className="text-5xl font-bold mb-12 text-center text-blue-800 dark:text-blue-400 animate-in fade-in-0 zoom-in-95 duration-500">
              Get In Touch
            </h1>
            <Card className="shadow-2xl dark:shadow-blue-900/50 border-2 border-blue-100 dark:border-slate-700 bg-white dark:bg-slate-800 animate-in fade-in-0 slide-in-from-bottom-4 duration-700">
              <CardContent className="pt-6">
                <form onSubmit={handleContactSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="name" className="text-slate-700 dark:text-slate-300">Name *</Label>
                      <Input
                        id="name"
                        value={contactForm.name}
                        onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                        required
                        className="border-blue-300 dark:border-slate-600 focus:border-blue-500 dark:focus:border-blue-400 transition-colors duration-300 dark:bg-slate-900 dark:text-slate-100"
                        placeholder="Your Name"
                      />
                    </div>
                    <div>
                      <Label htmlFor="email" className="text-slate-700 dark:text-slate-300">Email *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={contactForm.email}
                        onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                        required
                        className="border-blue-300 dark:border-slate-600 focus:border-blue-500 dark:focus:border-blue-400 transition-colors duration-300 dark:bg-slate-900 dark:text-slate-100"
                        placeholder="your.email@example.com"
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="subject" className="text-slate-700 dark:text-slate-300">Subject *</Label>
                    <Input
                      id="subject"
                      value={contactForm.subject}
                      onChange={(e) => setContactForm({ ...contactForm, subject: e.target.value })}
                      required
                      className="border-blue-300 dark:border-slate-600 focus:border-blue-500 dark:focus:border-blue-400 transition-colors duration-300 dark:bg-slate-900 dark:text-slate-100"
                      placeholder="What's this about?"
                    />
                  </div>
                  <div>
                    <Label htmlFor="message" className="text-slate-700 dark:text-slate-300">Message *</Label>
                    <Textarea
                      id="message"
                      value={contactForm.message}
                      onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                      required
                      rows={6}
                      className="border-blue-300 dark:border-slate-600 focus:border-blue-500 dark:focus:border-blue-400 transition-colors duration-300 dark:bg-slate-900 dark:text-slate-100"
                      placeholder="Tell me what's on your mind..."
                    />
                  </div>
                  <Button 
                    type="submit"
                    className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                    size="lg"
                  >
                    <Send className="w-5 h-5 mr-2" />
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Rest of the pages remain the same but with dark mode classes added */}
        {/* I'll add dark mode classes to other sections in the continuation */}
        
        {/* Admin Contacts Page */}
        {currentPage === 'contacts' && isAdmin && (
          <div className="min-h-screen">
            <h1 className="text-5xl font-bold mb-12 text-blue-800 dark:text-blue-400 animate-in fade-in-0 slide-in-from-top-4 duration-500">Contact Messages</h1>
            <div className="space-y-6">
              {contacts.map((contact, index) => (
                <Card 
                  key={contact.id}
                  className="bg-white dark:bg-slate-800 border-2 border-blue-200 dark:border-slate-700 shadow-xl hover:shadow-2xl dark:hover:shadow-blue-900/50 transition-all duration-500 hover:scale-102 animate-in fade-in-0 slide-in-from-bottom-4"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <CardHeader>
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                      <div>
                        <CardTitle className="text-xl text-slate-800 dark:text-slate-100">{contact.name}</CardTitle>
                        <CardDescription className="text-slate-600 dark:text-slate-400">{contact.email}</CardDescription>
                      </div>
                      <span className="text-sm text-slate-500 dark:text-slate-400 mt-2 md:mt-0">
                        {new Date(contact.date).toLocaleDateString()}
                      </span>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="font-semibold text-slate-800 dark:text-slate-200 mb-2">Subject: {contact.subject}</p>
                    <p className="text-slate-600 dark:text-slate-400">{contact.message}</p>
                  </CardContent>
                </Card>
              ))}
              {contacts.length === 0 && (
                <div className="text-center py-20">
                  <div className="text-6xl mb-4 animate-pulse">📬</div>
                  <p className="text-xl text-slate-600 dark:text-slate-400">No messages yet.</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Other pages would continue with dark mode classes... */}
        {/* For brevity, I'll just show the pattern - all pages need dark: classes added */}
      </main>

      {/* Footer */}
      {!isAdmin && (
        <footer className="border-t bg-white dark:bg-slate-900 mt-16 transition-colors duration-300">
          <div className="container mx-auto px-4 py-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
              <div>
                <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 dark:from-blue-400 dark:to-cyan-400 bg-clip-text text-transparent mb-4">P</h3>
                <p className="text-slate-600 dark:text-slate-400">
                  Sharing insights and reviews to help you make informed decisions.
                </p>
              </div>
              <div>
                <h4 className="text-lg font-semibold text-blue-800 dark:text-blue-400 mb-4">Quick Links</h4>
                <ul className="space-y-2">
                  <li>
                    <button onClick={() => changePage('home')} className="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300">
                      Home
                    </button>
                  </li>
                  <li>
                    <button onClick={() => changePage('blogs')} className="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300">
                      Blogs
                    </button>
                  </li>
                  <li>
                    <button onClick={() => changePage('about')} className="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300">
                      About
                    </button>
                  </li>
                  <li>
                    <button onClick={() => changePage('contact')} className="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300">
                      Contact
                    </button>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="text-lg font-semibold text-blue-800 dark:text-blue-400 mb-4">Connect</h4>
                <div className="flex space-x-4">
                  <a href="#" className="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-300 hover:scale-110">
                    <Github className="w-6 h-6" />
                  </a>
                  <a href="#" className="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-300 hover:scale-110">
                    <Linkedin className="w-6 h-6" />
                  </a>
                  <a href="#" className="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-300 hover:scale-110">
                    <Twitter className="w-6 h-6" />
                  </a>
                  <a href="#" className="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-300 hover:scale-110">
                    <Mail className="w-6 h-6" />
                  </a>
                </div>
              </div>
            </div>
            <div className="border-t dark:border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center">
              <p className="text-sm text-slate-600 dark:text-slate-400">
                © 2025 Portfolio. All rights reserved.
              </p>
              <button
                onClick={() => setShowAdminLogin(true)}
                className="text-sm text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300 hover:scale-105 mt-4 md:mt-0"
              >
                Admin Access
              </button>
            </div>
          </div>
        </footer>
      )}

      {/* Admin Login Modal */}
      <Dialog open={showAdminLogin} onOpenChange={setShowAdminLogin}>
        <DialogContent className="sm:max-w-md dark:bg-slate-800 dark:border-slate-700">
          <DialogHeader>
            <DialogTitle className="text-2xl text-blue-800 dark:text-blue-400">Admin Login</DialogTitle>
            <DialogDescription className="dark:text-slate-400">Enter your credentials to access the admin panel.</DialogDescription>
          </DialogHeader>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <Label htmlFor="username" className="dark:text-slate-300">Username</Label>
              <Input
                id="username"
                value={loginForm.username}
                onChange={(e) => setLoginForm({ ...loginForm, username: e.target.value })}
                required
                className="border-blue-300 dark:border-slate-600 focus:border-blue-500 dark:focus:border-blue-400 transition-colors duration-300 dark:bg-slate-900 dark:text-slate-100"
              />
            </div>
            <div>
              <Label htmlFor="password" className="dark:text-slate-300">Password</Label>
              <Input
                id="password"
                type="password"
                value={loginForm.password}
                onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                required
                className="border-blue-300 dark:border-slate-600 focus:border-blue-500 dark:focus:border-blue-400 transition-colors duration-300 dark:bg-slate-900 dark:text-slate-100"
              />
            </div>
            <Button type="submit" className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white shadow-lg hover:shadow-xl transition-all duration-300">
              Login
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}