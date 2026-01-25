'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { BookOpen, Film, Book, Package, User, LogIn, LogOut, Plus, Edit, Trash2, BarChart3, TrendingUp, Eye, Activity, Shield, Code, Laptop, Database, Cloud, Layers, Briefcase, Award, Sparkles, ChevronRight, Mail, Github, Linkedin, Twitter, Zap, Gamepad2, Server, Moon, Sun, Send, MessageSquare, Settings, Users } from 'lucide-react';

// ==================== DUMMY DATA ====================
const DUMMY_ROLES = [
  { id: '1', title: 'Software Developer', order: 1 },
  { id: '2', title: 'Full Stack Engineer', order: 2 },
  { id: '3', title: 'AI Enthusiast', order: 3 },
  { id: '4', title: 'Problem Solver', order: 4 },
];

const DUMMY_REVIEWS = [
  { id: '1', type: 'blog', title: 'Getting Started with React Hooks', image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400', description: 'A comprehensive guide to understanding and using React Hooks effectively in your projects.' },
  { id: '2', type: 'blog', title: 'Building Scalable APIs with Node.js', image: 'https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=400', description: 'Learn best practices for building robust and scalable REST APIs using Node.js and Express.' },
  { id: '3', type: 'movie', title: 'Inception', image: 'https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=400', description: 'A mind-bending thriller about dreams within dreams. Christopher Nolan at his finest.' },
  { id: '4', type: 'movie', title: 'The Matrix', image: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=400', description: 'A revolutionary sci-fi film that redefined the genre and visual effects in cinema.' },
  { id: '5', type: 'book', title: 'Clean Code', image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400', description: 'Robert C. Martin\'s guide to writing clean, maintainable, and professional code.' },
  { id: '6', type: 'book', title: 'The Pragmatic Programmer', image: 'https://images.unsplash.com/photo-1532012197267-da84d127e765?w=400', description: 'A timeless classic on software development practices and career advice.' },
  { id: '7', type: 'product', title: 'MacBook Pro M3', image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400', description: 'The ultimate laptop for developers with incredible performance and battery life.' },
  { id: '8', type: 'product', title: 'Mechanical Keyboard', image: 'https://images.unsplash.com/photo-1595225476474-87563907a212?w=400', description: 'A premium mechanical keyboard that enhances typing experience for developers.' },
];

const DUMMY_CONTACTS = [
  { id: '1', name: 'John Doe', email: 'john@example.com', subject: 'Project Inquiry', message: 'Hi, I would like to discuss a potential project collaboration.', createdAt: '2024-01-15' },
  { id: '2', name: 'Jane Smith', email: 'jane@example.com', subject: 'Job Opportunity', message: 'We have an exciting opportunity at our company that might interest you.', createdAt: '2024-01-14' },
  { id: '3', name: 'Bob Wilson', email: 'bob@example.com', subject: 'Technical Question', message: 'I had a question about your blog post on React Hooks.', createdAt: '2024-01-13' },
];

const DUMMY_ANALYTICS = {
  totalVisits: 1542,
  uniqueVisitors: 876,
  pageViews: {
    home: 654,
    about: 234,
    blogs: 312,
    movies: 156,
    books: 98,
    products: 88,
    contact: 145
  },
  topPages: [
    { page: 'Home', views: 654 },
    { page: 'Blogs', views: 312 },
    { page: 'About', views: 234 },
    { page: 'Movies', views: 156 },
    { page: 'Contact', views: 145 }
  ]
};

const DUMMY_ABOUT = `I'm a passionate Software Developer with expertise in building modern web applications and scalable backend systems. With a strong foundation in JavaScript, Python, and cloud technologies, I love turning complex problems into elegant solutions.

My journey in tech started with a curiosity about how things work, which led me to pursue a career in software development. Today, I specialize in full-stack development, working with technologies like React, Node.js, and various cloud platforms.

When I'm not coding, you can find me exploring new technologies, contributing to open-source projects, or sharing my knowledge through blog posts and technical articles.`;

const DUMMY_SETTINGS = {
  navbar: { about: true, blogs: true, movies: true, books: true, products: true }
};

// ==================== MAIN APP COMPONENT ====================
export default function App() {
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

  // Initialize
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

  // Hardcoded login - username: admin, password: admin
  const handleLogin = (e) => {
    e.preventDefault();
    if (loginForm.username === 'admin' && loginForm.password === 'admin') {
      localStorage.setItem('adminToken', 'admin-token-123');
      setIsAdmin(true);
      setShowAdminLogin(false);
      setCurrentPage('visits');
      // Scroll to top after login
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
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  // ==================== NAVIGATION COMPONENTS ====================
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
            <button onClick={() => changePage('home')} className={`text-sm font-medium transition-all duration-300 hover:text-blue-600 dark:hover:text-blue-400 hover:scale-105 ${currentPage === 'home' ? 'text-blue-600 dark:text-blue-400 font-semibold border-b-2 border-blue-600 dark:border-blue-400' : 'text-slate-700 dark:text-slate-300'}`}>Home</button>
            {settings.navbar.blogs && <button onClick={() => changePage('blogs')} className={`text-sm font-medium transition-all duration-300 hover:text-blue-600 dark:hover:text-blue-400 hover:scale-105 ${currentPage === 'blogs' ? 'text-blue-600 dark:text-blue-400 font-semibold border-b-2 border-blue-600 dark:border-blue-400' : 'text-slate-700 dark:text-slate-300'}`}>Blogs</button>}
            {(settings.navbar.movies || settings.navbar.books || settings.navbar.products) && (
              <div className="relative group">
                <button className="text-sm font-medium text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-300 hover:scale-105 py-2">Reviews</button>
                <div className="absolute invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-all duration-200 pt-1 left-1/2 -translate-x-1/2 z-50">
                  <div className="bg-white dark:bg-slate-800 border border-blue-200 dark:border-slate-700 rounded-lg shadow-xl p-2 space-y-1 min-w-[140px]">
                    {settings.navbar.movies && <button onClick={() => changePage('movies')} className="block w-full text-left px-4 py-2 text-sm hover:bg-blue-50 dark:hover:bg-slate-700 hover:text-blue-600 dark:hover:text-blue-400 rounded transition-all duration-200"><Film className="w-4 h-4 inline mr-2" />Movies</button>}
                    {settings.navbar.books && <button onClick={() => changePage('books')} className="block w-full text-left px-4 py-2 text-sm hover:bg-blue-50 dark:hover:bg-slate-700 hover:text-blue-600 dark:hover:text-blue-400 rounded transition-all duration-200"><Book className="w-4 h-4 inline mr-2" />Books</button>}
                    {settings.navbar.products && <button onClick={() => changePage('products')} className="block w-full text-left px-4 py-2 text-sm hover:bg-blue-50 dark:hover:bg-slate-700 hover:text-blue-600 dark:hover:text-blue-400 rounded transition-all duration-200"><Package className="w-4 h-4 inline mr-2" />Products</button>}
                  </div>
                </div>
              </div>
            )}
            {settings.navbar.about && <button onClick={() => changePage('about')} className={`text-sm font-medium transition-all duration-300 hover:text-blue-600 dark:hover:text-blue-400 hover:scale-105 ${currentPage === 'about' ? 'text-blue-600 dark:text-blue-400 font-semibold border-b-2 border-blue-600 dark:border-blue-400' : 'text-slate-700 dark:text-slate-300'}`}>About</button>}
            <button onClick={() => changePage('contact')} className={`text-sm font-medium transition-all duration-300 hover:text-blue-600 dark:hover:text-blue-400 hover:scale-105 ${currentPage === 'contact' ? 'text-blue-600 dark:text-blue-400 font-semibold border-b-2 border-blue-600 dark:border-blue-400' : 'text-slate-700 dark:text-slate-300'}`}>Contact</button>
          </div>
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

  const AdminNav = () => (
    <nav className="border-b bg-gradient-to-r from-blue-900 to-cyan-900 dark:from-slate-900 dark:to-slate-800 sticky top-0 z-50 shadow-lg transition-colors duration-300">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent cursor-pointer hover:scale-110 transition-all duration-300">
            P
          </div>
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
            <div className="relative group">
              <button className="text-sm font-medium text-slate-300 hover:bg-blue-800 hover:text-white transition-all duration-300 px-4 py-2 rounded-lg flex items-center space-x-2">
                <Edit className="w-4 h-4" />
                <span>Manage</span>
              </button>
              <div className="absolute invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-all duration-200 pt-1 z-50">
                <div className="bg-white dark:bg-slate-800 border border-blue-200 dark:border-slate-700 rounded-lg shadow-xl p-2 space-y-1 min-w-[140px]">
                  <button onClick={() => changePage('manage-blogs')} className="block w-full text-left px-4 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-blue-50 dark:hover:bg-slate-700 hover:text-blue-600 rounded transition-all duration-200">Blogs</button>
                  <button onClick={() => changePage('manage-movies')} className="block w-full text-left px-4 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-blue-50 dark:hover:bg-slate-700 hover:text-blue-600 rounded transition-all duration-200">Movies</button>
                  <button onClick={() => changePage('manage-books')} className="block w-full text-left px-4 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-blue-50 dark:hover:bg-slate-700 hover:text-blue-600 rounded transition-all duration-200">Books</button>
                  <button onClick={() => changePage('manage-products')} className="block w-full text-left px-4 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-blue-50 dark:hover:bg-slate-700 hover:text-blue-600 rounded transition-all duration-200">Products</button>
                </div>
              </div>
            </div>
          </div>
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

  // ==================== MAIN RENDER ====================
  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      darkMode 
        ? 'bg-slate-900' 
        : 'bg-gradient-to-br from-slate-50 via-blue-50 to-cyan-50'
    }`}>
      {isAdmin ? <AdminNav /> : <PublicNav />}

      <main className="container mx-auto px-4 py-8">
        {/* Home Page */}
        {currentPage === 'home' && !isAdmin && (
          <div className="min-h-screen">
            {/* Hero Section */}
            <div className="text-center py-20 relative overflow-hidden">
              <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-blue-400/10 dark:bg-blue-600/20 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-400/10 dark:bg-cyan-600/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
              </div>
              
              <div className="mb-6 animate-in fade-in-0 slide-in-from-bottom-4 duration-700">
                <div className="inline-block">
                  <h1 className="text-7xl font-bold flex items-center gap-4">
                    <span className="text-6xl animate-bounce">🙏</span>
                    <span className="bg-gradient-to-r from-blue-600 to-blue-800 dark:from-blue-400 dark:to-cyan-400 bg-clip-text text-transparent">Namaskar</span>
                  </h1>
                </div>
              </div>

              <p className="text-2xl font-semibold text-slate-600 dark:text-slate-300 mb-4 animate-in fade-in-0 slide-in-from-bottom-8 duration-1000">
                Welcome to my Digital World!
              </p>

              <div className="h-12 mb-8 flex items-center justify-center animate-in fade-in-0 slide-in-from-bottom-12 duration-1000">
                <p className="text-xl text-blue-600 dark:text-blue-400 font-medium">
                  I'm a <span className="font-bold">{typedText}</span>
                  <span className="inline-block w-0.5 h-6 bg-blue-600 dark:bg-blue-400 ml-1 animate-pulse"></span>
                </p>
              </div>

              <Button
                onClick={() => changePage('contact')}
                className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 animate-in fade-in-0 zoom-in-95 duration-1000 delay-200"
                size="lg"
              >
                <Mail className="w-5 h-5 mr-2" />
                Get In Touch
              </Button>
            </div>

            {/* Recent Reviews Section */}
            <div className="mt-16">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-4xl font-bold text-blue-800 dark:text-blue-400 animate-in fade-in-0 slide-in-from-left-4 duration-500">Recent Reviews</h2>
                <Button 
                  onClick={() => changePage('blogs')} 
                  variant="outline"
                  className="border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white dark:border-blue-400 dark:text-blue-400 dark:hover:bg-blue-400 dark:hover:text-slate-900 transition-all duration-300 hover:scale-105"
                >
                  View All <ChevronRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredReviews.map((review, index) => (
                  <Card 
                    key={review.id} 
                    className="group bg-white dark:bg-slate-800 border-2 border-blue-100 dark:border-slate-700 shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-105 hover:border-blue-300 dark:hover:border-blue-500 cursor-pointer animate-in fade-in-0 slide-in-from-bottom-4"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="aspect-video bg-gradient-to-br from-blue-100 to-cyan-100 dark:from-slate-700 dark:to-slate-600 rounded-t-lg overflow-hidden">
                      {review.image ? (
                        <img src={review.image} alt={review.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <BookOpen className="w-16 h-16 text-blue-300 dark:text-slate-500" />
                        </div>
                      )}
                    </div>
                    <CardHeader>
                      <CardTitle className="text-xl text-slate-800 dark:text-slate-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">{review.title}</CardTitle>
                      <CardDescription className="uppercase text-blue-600 dark:text-blue-400 font-semibold tracking-wide">{review.type}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-slate-600 dark:text-slate-400 line-clamp-2">{review.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Reviews Pages (Blogs, Movies, Books, Products) */}
        {['blogs', 'movies', 'books', 'products'].includes(currentPage) && !isAdmin && (
          <div className="min-h-screen">
            <h1 className="text-5xl font-bold mb-12 text-center text-blue-800 dark:text-blue-400 capitalize animate-in fade-in-0 zoom-in-95 duration-500">{currentPage}</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredReviews.map((review, index) => (
                <Card 
                  key={review.id} 
                  className="group bg-white dark:bg-slate-800 border-2 border-blue-100 dark:border-slate-700 shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-105 hover:border-blue-300 dark:hover:border-blue-500 cursor-pointer animate-in fade-in-0 slide-in-from-bottom-4"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="aspect-video bg-gradient-to-br from-blue-100 to-cyan-100 dark:from-slate-700 dark:to-slate-600 rounded-t-lg overflow-hidden">
                    {review.image ? (
                      <img src={review.image} alt={review.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <BookOpen className="w-16 h-16 text-blue-300 dark:text-slate-500" />
                      </div>
                    )}
                  </div>
                  <CardHeader>
                    <CardTitle className="text-xl text-slate-800 dark:text-slate-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">{review.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-slate-600 dark:text-slate-400">{review.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
            {filteredReviews.length === 0 && (
              <div className="text-center py-20">
                <div className="text-6xl mb-4 animate-bounce">📚</div>
                <p className="text-xl text-slate-600 dark:text-slate-400">No {currentPage} yet. Check back soon!</p>
              </div>
            )}
          </div>
        )}

        {/* About Page */}
        {currentPage === 'about' && !isAdmin && (
          <div className="min-h-screen max-w-6xl mx-auto">
            <h1 className="text-5xl font-bold mb-12 text-center text-blue-800 dark:text-blue-400 animate-in fade-in-0 zoom-in-95 duration-500">About Me</h1>
            
            <Card className="shadow-2xl dark:shadow-blue-900/50 border-2 border-blue-100 dark:border-slate-700 bg-white dark:bg-slate-800 mb-12 animate-in fade-in-0 slide-in-from-bottom-4 duration-700">
              <CardContent className="pt-8">
                <div className="prose prose-lg dark:prose-invert max-w-none">
                  {aboutContent.split('\n\n').map((paragraph, index) => (
                    <p key={index} className="text-slate-700 dark:text-slate-300 leading-relaxed mb-4">{paragraph}</p>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Skills Section */}
            <div className="mb-16 animate-in fade-in-0 slide-in-from-bottom-4 duration-700 delay-200">
              <h2 className="text-3xl font-bold mb-8 text-blue-800 dark:text-blue-400 flex items-center">
                <Sparkles className="w-8 h-8 mr-3" />
                Skills & Technologies
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {skills.map((skill, index) => (
                  <Card 
                    key={skill.name} 
                    className="group bg-white dark:bg-slate-800 border-2 border-blue-100 dark:border-slate-700 hover:border-blue-300 dark:hover:border-blue-500 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer animate-in fade-in-0 zoom-in-95"
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <CardContent className="pt-6 text-center">
                      <div className={`w-14 h-14 mx-auto mb-3 rounded-xl bg-gradient-to-br ${skill.color} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                        <skill.icon className="w-7 h-7 text-white" />
                      </div>
                      <p className="font-semibold text-slate-800 dark:text-slate-100">{skill.name}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Work Experience Section */}
            <div className="mb-16 animate-in fade-in-0 slide-in-from-bottom-4 duration-700 delay-300">
              <h2 className="text-3xl font-bold mb-8 text-blue-800 dark:text-blue-400 flex items-center">
                <Briefcase className="w-8 h-8 mr-3" />
                Work Experience
              </h2>
              <div className="space-y-6">
                {workExperience.map((job, index) => (
                  <Card 
                    key={index} 
                    className="bg-white dark:bg-slate-800 border-2 border-blue-100 dark:border-slate-700 hover:border-blue-300 dark:hover:border-blue-500 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-102 animate-in fade-in-0 slide-in-from-left-4"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <CardContent className="pt-6">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100">{job.position}</h3>
                          <p className="text-blue-600 dark:text-blue-400 font-semibold">{job.company}</p>
                          <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">{job.duration}</p>
                        </div>
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-600 to-cyan-600 flex items-center justify-center shadow-lg">
                          <Briefcase className="w-6 h-6 text-white" />
                        </div>
                      </div>
                      <p className="text-slate-600 dark:text-slate-400 mt-4">{job.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Domain Expertise Section */}
            <div className="animate-in fade-in-0 slide-in-from-bottom-4 duration-700 delay-400">
              <h2 className="text-3xl font-bold mb-8 text-blue-800 dark:text-blue-400 flex items-center">
                <Award className="w-8 h-8 mr-3" />
                Domain Expertise
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {domains.map((domain, index) => (
                  <Card 
                    key={domain.name} 
                    className="group bg-white dark:bg-slate-800 border-2 border-blue-100 dark:border-slate-700 hover:border-blue-300 dark:hover:border-blue-500 shadow-lg hover:shadow-xl transition-all duration-500 hover:scale-105 cursor-pointer animate-in fade-in-0 zoom-in-95"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <CardContent className="pt-8 text-center">
                      <div className={`w-20 h-20 mx-auto mb-4 rounded-2xl bg-gradient-to-br ${domain.gradient} flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform duration-300`}>
                        <domain.icon className="w-10 h-10 text-white" />
                      </div>
                      <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-2">{domain.name}</h3>
                      <p className="text-slate-600 dark:text-slate-400">{domain.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Contact Page */}
        {currentPage === 'contact' && !isAdmin && (
          <div className="min-h-screen max-w-2xl mx-auto">
            <h1 className="text-5xl font-bold mb-12 text-center text-blue-800 dark:text-blue-400 animate-in fade-in-0 zoom-in-95 duration-500">Get In Touch</h1>
            <Card className="shadow-2xl dark:shadow-blue-900/50 border-2 border-blue-100 dark:border-slate-700 bg-white dark:bg-slate-800 animate-in fade-in-0 slide-in-from-bottom-4 duration-700">
              <CardHeader>
                <CardTitle className="text-2xl text-slate-800 dark:text-slate-100">Send me a message</CardTitle>
                <CardDescription className="text-slate-600 dark:text-slate-400">I'd love to hear from you! Fill out the form below.</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleContactSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name" className="text-slate-700 dark:text-slate-300">Name</Label>
                      <Input 
                        id="name" 
                        value={contactForm.name} 
                        onChange={(e) => setContactForm({...contactForm, name: e.target.value})} 
                        placeholder="Your name" 
                        required 
                        className="border-blue-200 dark:border-slate-600 focus:border-blue-500 dark:focus:border-blue-400 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-slate-700 dark:text-slate-300">Email</Label>
                      <Input 
                        id="email" 
                        type="email" 
                        value={contactForm.email} 
                        onChange={(e) => setContactForm({...contactForm, email: e.target.value})} 
                        placeholder="your@email.com" 
                        required 
                        className="border-blue-200 dark:border-slate-600 focus:border-blue-500 dark:focus:border-blue-400 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="subject" className="text-slate-700 dark:text-slate-300">Subject</Label>
                    <Input 
                      id="subject" 
                      value={contactForm.subject} 
                      onChange={(e) => setContactForm({...contactForm, subject: e.target.value})} 
                      placeholder="What's this about?" 
                      required 
                      className="border-blue-200 dark:border-slate-600 focus:border-blue-500 dark:focus:border-blue-400 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="message" className="text-slate-700 dark:text-slate-300">Message</Label>
                    <Textarea 
                      id="message" 
                      value={contactForm.message} 
                      onChange={(e) => setContactForm({...contactForm, message: e.target.value})} 
                      placeholder="Your message..." 
                      rows={5} 
                      required 
                      className="border-blue-200 dark:border-slate-600 focus:border-blue-500 dark:focus:border-blue-400 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100"
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

        {/* Admin Pages */}
        {/* Visits Page */}
        {currentPage === 'visits' && isAdmin && (
          <div className="min-h-screen">
            <h1 className="text-5xl font-bold mb-12 text-center text-blue-800 dark:text-blue-400 animate-in fade-in-0 zoom-in-95 duration-500">Site Visits</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              <Card className="bg-gradient-to-br from-blue-600 to-cyan-600 text-white shadow-2xl animate-in fade-in-0 slide-in-from-bottom-4 duration-500">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-blue-100 text-sm">Total Visits</p>
                      <p className="text-4xl font-bold">{analytics.totalVisits}</p>
                    </div>
                    <Eye className="w-12 h-12 text-blue-200" />
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-gradient-to-br from-purple-600 to-pink-600 text-white shadow-2xl animate-in fade-in-0 slide-in-from-bottom-4 duration-500 delay-100">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-purple-100 text-sm">Unique Visitors</p>
                      <p className="text-4xl font-bold">{analytics.uniqueVisitors}</p>
                    </div>
                    <User className="w-12 h-12 text-purple-200" />
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-gradient-to-br from-orange-600 to-red-600 text-white shadow-2xl animate-in fade-in-0 slide-in-from-bottom-4 duration-500 delay-200">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-orange-100 text-sm">Top Page</p>
                      <p className="text-4xl font-bold">{analytics.topPages[0]?.page}</p>
                    </div>
                    <TrendingUp className="w-12 h-12 text-orange-200" />
                  </div>
                </CardContent>
              </Card>
            </div>
            <Card className="shadow-2xl dark:shadow-blue-900/50 border-2 border-blue-100 dark:border-slate-700 bg-white dark:bg-slate-800">
              <CardHeader>
                <CardTitle className="text-2xl text-slate-800 dark:text-slate-100">Page Views Breakdown</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {analytics.topPages.map((page, index) => (
                    <div key={page.page} className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-900 rounded-lg">
                      <span className="font-medium text-slate-800 dark:text-slate-100">{page.page}</span>
                      <span className="text-blue-600 dark:text-blue-400 font-bold">{page.views} views</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Analysis Page */}
        {currentPage === 'analysis' && isAdmin && (
          <div className="min-h-screen">
            <h1 className="text-5xl font-bold mb-12 text-center text-blue-800 dark:text-blue-400 animate-in fade-in-0 zoom-in-95 duration-500">Analytics</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card className="shadow-2xl dark:shadow-blue-900/50 border-2 border-blue-100 dark:border-slate-700 bg-white dark:bg-slate-800">
                <CardHeader>
                  <CardTitle className="flex items-center text-slate-800 dark:text-slate-100">
                    <BarChart3 className="w-6 h-6 mr-2 text-blue-600 dark:text-blue-400" />
                    Content Overview
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-3 bg-slate-50 dark:bg-slate-900 rounded-lg">
                      <span className="text-slate-700 dark:text-slate-300">Total Reviews</span>
                      <span className="font-bold text-blue-600 dark:text-blue-400">{reviews.length}</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-slate-50 dark:bg-slate-900 rounded-lg">
                      <span className="text-slate-700 dark:text-slate-300">Blogs</span>
                      <span className="font-bold text-blue-600 dark:text-blue-400">{reviews.filter(r => r.type === 'blog').length}</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-slate-50 dark:bg-slate-900 rounded-lg">
                      <span className="text-slate-700 dark:text-slate-300">Movies</span>
                      <span className="font-bold text-blue-600 dark:text-blue-400">{reviews.filter(r => r.type === 'movie').length}</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-slate-50 dark:bg-slate-900 rounded-lg">
                      <span className="text-slate-700 dark:text-slate-300">Books</span>
                      <span className="font-bold text-blue-600 dark:text-blue-400">{reviews.filter(r => r.type === 'book').length}</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-slate-50 dark:bg-slate-900 rounded-lg">
                      <span className="text-slate-700 dark:text-slate-300">Products</span>
                      <span className="font-bold text-blue-600 dark:text-blue-400">{reviews.filter(r => r.type === 'product').length}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="shadow-2xl dark:shadow-blue-900/50 border-2 border-blue-100 dark:border-slate-700 bg-white dark:bg-slate-800">
                <CardHeader>
                  <CardTitle className="flex items-center text-slate-800 dark:text-slate-100">
                    <MessageSquare className="w-6 h-6 mr-2 text-blue-600 dark:text-blue-400" />
                    Engagement
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-3 bg-slate-50 dark:bg-slate-900 rounded-lg">
                      <span className="text-slate-700 dark:text-slate-300">Total Messages</span>
                      <span className="font-bold text-blue-600 dark:text-blue-400">{contacts.length}</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-slate-50 dark:bg-slate-900 rounded-lg">
                      <span className="text-slate-700 dark:text-slate-300">Active Roles</span>
                      <span className="font-bold text-blue-600 dark:text-blue-400">{roles.length}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {/* Messages Page */}
        {currentPage === 'contacts' && isAdmin && (
          <div className="min-h-screen">
            <h1 className="text-5xl font-bold mb-12 text-center text-blue-800 dark:text-blue-400 animate-in fade-in-0 zoom-in-95 duration-500">Messages</h1>
            <div className="space-y-4">
              {contacts.map((contact, index) => (
                <Card 
                  key={contact.id} 
                  className="bg-white dark:bg-slate-800 border-2 border-blue-100 dark:border-slate-700 shadow-lg hover:shadow-xl transition-all duration-300 animate-in fade-in-0 slide-in-from-bottom-4"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <CardContent className="pt-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-4 mb-2">
                          <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100">{contact.name}</h3>
                          <span className="text-sm text-slate-500 dark:text-slate-400">{contact.email}</span>
                        </div>
                        <p className="text-blue-600 dark:text-blue-400 font-semibold mb-2">{contact.subject}</p>
                        <p className="text-slate-600 dark:text-slate-400">{contact.message}</p>
                        <p className="text-sm text-slate-400 dark:text-slate-500 mt-2">{contact.createdAt}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
              {contacts.length === 0 && (
                <div className="text-center py-20">
                  <div className="text-6xl mb-4 animate-bounce">📬</div>
                  <p className="text-xl text-slate-600 dark:text-slate-400">No messages yet.</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Roles Page */}
        {currentPage === 'roles' && isAdmin && (
          <div className="min-h-screen">
            <div className="flex justify-between items-center mb-12 animate-in fade-in-0 slide-in-from-top-4 duration-500">
              <h1 className="text-5xl font-bold text-blue-800 dark:text-blue-400">Manage Typing Roles</h1>
              <p className="text-slate-500 dark:text-slate-400">(Demo - changes not saved)</p>
            </div>
            <div className="space-y-4">
              {roles.map((role, index) => (
                <Card 
                  key={role.id} 
                  className="bg-white dark:bg-slate-800 border-2 border-blue-200 dark:border-slate-700 shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-102 animate-in fade-in-0 slide-in-from-bottom-4" 
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <span className="text-2xl font-bold text-slate-400 dark:text-slate-600">#{role.order}</span>
                        <span className="text-xl font-semibold text-slate-800 dark:text-slate-100">{role.title}</span>
                      </div>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm" className="bg-blue-600 hover:bg-blue-700 text-white border-0 shadow-lg">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button variant="destructive" size="sm" className="bg-red-600 hover:bg-red-700 border-0 shadow-lg">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
              {roles.length === 0 && (
                <div className="text-center py-20">
                  <div className="text-6xl mb-4 animate-bounce">⚙️</div>
                  <p className="text-xl text-slate-600 dark:text-slate-400">No roles yet.</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Settings Page */}
        {currentPage === 'settings' && isAdmin && (
          <div className="min-h-screen max-w-3xl mx-auto">
            <h1 className="text-5xl font-bold mb-12 text-center text-blue-800 dark:text-blue-400 animate-in fade-in-0 zoom-in-95 duration-500">Navigation Settings</h1>
            <Card className="shadow-2xl dark:shadow-blue-900/50 border-2 border-blue-100 dark:border-slate-700 bg-white dark:bg-slate-800 animate-in fade-in-0 slide-in-from-bottom-4 duration-700">
              <CardContent className="pt-6">
                <div className="space-y-6">
                  <p className="text-slate-600 dark:text-slate-400 mb-4">Toggle visibility of navigation menu items. (Demo - changes apply to current session only)</p>
                  <div className="space-y-4">
                    {Object.entries(settings.navbar).map(([key, value]) => (
                      <div key={key} className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-700 hover:border-blue-300 dark:hover:border-blue-500 transition-colors duration-300">
                        <Label htmlFor={key} className="text-lg font-medium text-slate-800 dark:text-slate-100 capitalize cursor-pointer">{key}</Label>
                        <input 
                          id={key} 
                          type="checkbox" 
                          checked={value} 
                          onChange={(e) => setSettings({
                            ...settings,
                            navbar: { ...settings.navbar, [key]: e.target.checked }
                          })}
                          className="w-6 h-6 text-blue-600 bg-slate-100 dark:bg-slate-800 border-slate-300 dark:border-slate-600 rounded focus:ring-blue-500 cursor-pointer" 
                        />
                      </div>
                    ))}
                  </div>
                  <Button 
                    onClick={() => alert('Settings applied to current session!')}
                    className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105" 
                    size="lg"
                  >
                    <Settings className="w-5 h-5 mr-2" />
                    Save Settings
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Manage Pages */}
        {currentPage.startsWith('manage-') && isAdmin && (
          <div className="min-h-screen">
            <div className="flex justify-between items-center mb-12 animate-in fade-in-0 slide-in-from-top-4 duration-500">
              <h1 className="text-5xl font-bold text-blue-800 dark:text-blue-400 capitalize">Manage {currentPage.replace('manage-', '')}</h1>
              <p className="text-slate-500 dark:text-slate-400">(Demo - changes not saved)</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {reviews.filter(r => r.type === currentPage.replace('manage-', '').slice(0, -1)).map((review, index) => (
                <Card 
                  key={review.id} 
                  className="bg-white dark:bg-slate-800 border-2 border-blue-200 dark:border-slate-700 shadow-xl hover:shadow-2xl hover:scale-102 transition-all duration-500 animate-in fade-in-0 slide-in-from-bottom-4" 
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="text-xl text-slate-800 dark:text-slate-100">{review.title}</CardTitle>
                        <CardDescription className="uppercase text-slate-600 dark:text-slate-400 mt-2">{review.type}</CardDescription>
                      </div>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm" className="bg-blue-600 hover:bg-blue-700 text-white border-0 shadow-lg">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button variant="destructive" size="sm" className="bg-red-600 hover:bg-red-700 border-0 shadow-lg">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-slate-600 dark:text-slate-400 line-clamp-2">{review.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
            {reviews.filter(r => r.type === currentPage.replace('manage-', '').slice(0, -1)).length === 0 && (
              <div className="text-center py-20">
                <div className="text-6xl mb-4 animate-bounce">📝</div>
                <p className="text-xl text-slate-600 dark:text-slate-400">No {currentPage.replace('manage-', '')} yet.</p>
              </div>
            )}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t bg-white dark:bg-slate-900 mt-16 transition-colors duration-300">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 dark:from-blue-400 dark:to-cyan-400 bg-clip-text text-transparent mb-4">P</div>
              <p className="text-slate-600 dark:text-slate-400">A personal portfolio showcasing my work, reviews, and thoughts.</p>
            </div>
            <div>
              <h4 className="font-semibold text-slate-800 dark:text-slate-100 mb-4">Quick Links</h4>
              <div className="space-y-2">
                <button onClick={() => changePage('home')} className="block text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Home</button>
                <button onClick={() => changePage('about')} className="block text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">About</button>
                <button onClick={() => changePage('contact')} className="block text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Contact</button>
              </div>
            </div>
            <div>
              <h4 className="font-semibold text-slate-800 dark:text-slate-100 mb-4">Connect</h4>
              <div className="flex space-x-4">
                <a href="#" className="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-300 hover:scale-125"><Github className="w-6 h-6" /></a>
                <a href="#" className="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-300 hover:scale-125"><Linkedin className="w-6 h-6" /></a>
                <a href="#" className="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-300 hover:scale-125"><Twitter className="w-6 h-6" /></a>
              </div>
            </div>
          </div>
          <div className="border-t border-slate-200 dark:border-slate-700 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-slate-500 dark:text-slate-400 text-sm">© 2024 Portfolio. All rights reserved.</p>
            <button 
              onClick={() => setShowAdminLogin(true)} 
              className="text-slate-400 dark:text-slate-500 text-sm hover:text-blue-600 dark:hover:text-blue-400 transition-colors mt-4 md:mt-0"
            >
              Admin
            </button>
          </div>
        </div>
      </footer>

      {/* Admin Login Dialog */}
      <Dialog open={showAdminLogin} onOpenChange={setShowAdminLogin}>
        <DialogContent className="bg-white dark:bg-slate-800 border-2 border-blue-200 dark:border-slate-700">
          <DialogHeader>
            <DialogTitle className="text-2xl text-slate-800 dark:text-slate-100">Admin Login</DialogTitle>
            <DialogDescription className="text-slate-600 dark:text-slate-400">Enter your credentials to access the admin panel.</DialogDescription>
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
            <Button type="submit" className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white shadow-lg hover:shadow-xl transition-all duration-300">
              <LogIn className="w-4 h-4 mr-2" />
              Login
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
