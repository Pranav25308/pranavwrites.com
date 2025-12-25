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
import { BookOpen, Film, Book, Package, User, LogIn, LogOut, Plus, Edit, Trash2, BarChart3, TrendingUp, Eye, Activity, Shield, Code, Laptop, Database, Cloud, Layers, Briefcase, Award, Sparkles, ChevronRight, Mail, Github, Linkedin, Twitter, Zap, Gamepad2, Server } from 'lucide-react';

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

  // Updated skills data
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

  // Updated Work Experience data
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

  // Updated Domain Expertise - reordered
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
    fetchReviews();
    fetchAbout();
    trackPageView('home');
    const token = localStorage.getItem('adminToken');
    if (token) {
      setIsAdmin(true);
    }
  }, []);

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
  };

  // Public Navigation - Blue and White Theme
  const PublicNav = () => (
    <nav className="border-b bg-white sticky top-0 z-50 shadow-md">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div 
            className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent cursor-pointer hover:scale-110 transition-all duration-300" 
            onClick={() => changePage('home')}
          >
            P
          </div>
          <div className="flex space-x-8">
            <button
              onClick={() => changePage('home')}
              className={`text-sm font-medium transition-all duration-300 hover:text-blue-600 hover:scale-105 ${
                currentPage === 'home' ? 'text-blue-600 font-semibold border-b-2 border-blue-600' : 'text-slate-700'
              }`}
            >
              Home
            </button>
            <div className="relative group">
              <button className="text-sm font-medium text-slate-700 hover:text-blue-600 transition-all duration-300 hover:scale-105">
                Reviews
              </button>
              <div className="absolute hidden group-hover:block pt-2 animate-in fade-in-0 zoom-in-95 left-1/2 -translate-x-1/2">
                <div className="bg-white border border-blue-200 rounded-lg shadow-xl p-2 space-y-1 min-w-[140px]">
                  <button
                    onClick={() => changePage('blogs')}
                    className="block w-full text-left px-4 py-2 text-sm hover:bg-blue-50 hover:text-blue-600 rounded transition-all duration-200"
                  >
                    <BookOpen className="w-4 h-4 inline mr-2" />
                    Blogs
                  </button>
                  <button
                    onClick={() => changePage('movies')}
                    className="block w-full text-left px-4 py-2 text-sm hover:bg-blue-50 hover:text-blue-600 rounded transition-all duration-200"
                  >
                    <Film className="w-4 h-4 inline mr-2" />
                    Movies
                  </button>
                  <button
                    onClick={() => changePage('books')}
                    className="block w-full text-left px-4 py-2 text-sm hover:bg-blue-50 hover:text-blue-600 rounded transition-all duration-200"
                  >
                    <Book className="w-4 h-4 inline mr-2" />
                    Books
                  </button>
                  <button
                    onClick={() => changePage('products')}
                    className="block w-full text-left px-4 py-2 text-sm hover:bg-blue-50 hover:text-blue-600 rounded transition-all duration-200"
                  >
                    <Package className="w-4 h-4 inline mr-2" />
                    Products
                  </button>
                </div>
              </div>
            </div>
            <button
              onClick={() => changePage('about')}
              className={`text-sm font-medium transition-all duration-300 hover:text-blue-600 hover:scale-105 ${
                currentPage === 'about' ? 'text-blue-600 font-semibold border-b-2 border-blue-600' : 'text-slate-700'
              }`}
            >
              About
            </button>
          </div>
          <div className="w-10">
            {/* Empty space - no icon */}
          </div>
        </div>
      </div>
    </nav>
  );

  // Admin Navigation - Light Theme
  const AdminNav = () => (
    <nav className="border-b bg-white sticky top-0 z-50 shadow-lg">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent cursor-pointer hover:scale-110 transition-all duration-300">
            P
          </div>
          <div className="flex space-x-6">
            <button
              onClick={() => changePage('visits')}
              className={`text-sm font-medium transition-all duration-300 flex items-center space-x-2 px-4 py-2 rounded-lg ${
                currentPage === 'visits' 
                  ? 'bg-blue-600 text-white font-semibold shadow-lg' 
                  : 'text-slate-700 hover:bg-blue-50 hover:text-blue-600'
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
                  : 'text-slate-700 hover:bg-blue-50 hover:text-blue-600'
              }`}
            >
              <Activity className="w-4 h-4" />
              <span>Analysis</span>
            </button>
            <div className="relative group">
              <button className="text-sm font-medium text-slate-700 hover:bg-blue-50 hover:text-blue-600 transition-all duration-300 px-4 py-2 rounded-lg flex items-center space-x-2">
                <Edit className="w-4 h-4" />
                <span>Manage</span>
              </button>
              <div className="absolute hidden group-hover:block pt-2 animate-in fade-in-0 zoom-in-95">
                <div className="bg-white border border-blue-200 rounded-lg shadow-xl p-2 space-y-1 min-w-[140px]">
                  <button
                    onClick={() => changePage('manage-blogs')}
                    className="block w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-blue-50 hover:text-blue-600 rounded transition-all duration-200"
                  >
                    Blogs
                  </button>
                  <button
                    onClick={() => changePage('manage-movies')}
                    className="block w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-blue-50 hover:text-blue-600 rounded transition-all duration-200"
                  >
                    Movies
                  </button>
                  <button
                    onClick={() => changePage('manage-books')}
                    className="block w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-blue-50 hover:text-blue-600 rounded transition-all duration-200"
                  >
                    Books
                  </button>
                  <button
                    onClick={() => changePage('manage-products')}
                    className="block w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-blue-50 hover:text-blue-600 rounded transition-all duration-200"
                  >
                    Products
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div>
            <Button 
              onClick={handleLogout} 
              variant="ghost" 
              size="icon"
              className="text-slate-700 hover:bg-blue-50 hover:text-blue-600 transition-all duration-300 rounded-full"
            >
              <LogOut className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );

  return (
    <div className={`min-h-screen ${isAdmin ? 'bg-slate-50' : 'bg-gradient-to-br from-white via-blue-50 to-white'}`}>
      {/* Navigation */}
      {isAdmin ? <AdminNav /> : <PublicNav />}

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {currentPage === 'home' && (
          <div>
            {/* Hero Section - Removed About Me Card */}
            <div className="text-center py-20 mb-16 relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400/10 to-cyan-400/10 blur-3xl -z-10 rounded-full"></div>
              
              {/* Namaskar with emoji */}
              <h1 className="text-7xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent animate-in fade-in-0 slide-in-from-bottom-4 duration-700 flex items-center justify-center gap-4">
                <span className="text-6xl animate-bounce">🙏</span>
                <span>Namaskar</span>
              </h1>
              <p className="text-xl text-slate-600 max-w-2xl mx-auto mb-8 animate-in fade-in-0 slide-in-from-bottom-8 duration-1000">
                Explore my thoughts and reviews on blogs, movies, books, and products.
              </p>
            </div>

            {/* Recent Reviews */}
            <div>
              <h2 className="text-4xl font-bold mb-8 text-center text-blue-800">
                Recent Reviews
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredReviews.map((review, index) => (
                  <Card 
                    key={review.id} 
                    className="overflow-hidden hover:shadow-2xl transition-all duration-500 hover:scale-105 hover:-translate-y-2 border-2 border-blue-100 bg-white animate-in fade-in-0 slide-in-from-bottom-4 group cursor-pointer"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    {review.image && (
                      <div className="relative overflow-hidden">
                        <img
                          src={review.image}
                          alt={review.title}
                          className="w-full h-52 object-cover transition-transform duration-700 group-hover:scale-110 group-hover:rotate-2"
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
                      <CardTitle className="group-hover:text-blue-600 transition-colors duration-300 text-slate-800">{review.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-slate-600 line-clamp-3">{review.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
              {filteredReviews.length === 0 && (
                <div className="text-center py-20">
                  <div className="text-6xl mb-4 animate-bounce">📝</div>
                  <p className="text-xl text-slate-600">No reviews yet. Start creating amazing content!</p>
                </div>
              )}
            </div>
          </div>
        )}

        {(currentPage === 'blogs' || currentPage === 'movies' || currentPage === 'books' || currentPage === 'products') && (
          <div>
            <h1 className="text-5xl font-bold mb-12 capitalize text-center text-blue-800 animate-in fade-in-0 zoom-in-95 duration-500">
              {currentPage}
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredReviews.map((review, index) => (
                <Card 
                  key={review.id} 
                  className="overflow-hidden hover:shadow-2xl transition-all duration-500 hover:scale-105 hover:-translate-y-2 border-2 border-blue-100 bg-white animate-in fade-in-0 zoom-in-95 group cursor-pointer"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  {review.image && (
                    <div className="relative overflow-hidden">
                      <img
                        src={review.image}
                        alt={review.title}
                        className="w-full h-52 object-cover transition-transform duration-700 group-hover:scale-110 group-hover:rotate-2"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-blue-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>
                  )}
                  <CardHeader>
                    <CardTitle className="group-hover:text-blue-600 transition-colors duration-300 text-slate-800">{review.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-slate-600">{review.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
            {filteredReviews.length === 0 && (
              <div className="text-center py-20">
                <div className="text-6xl mb-4 animate-pulse">🔍</div>
                <p className="text-xl text-slate-600">No {currentPage} yet.</p>
              </div>
            )}
          </div>
        )}

        {currentPage === 'about' && (
          <div className="max-w-5xl mx-auto">
            <h1 className="text-5xl font-bold mb-12 text-center text-blue-800 animate-in fade-in-0 zoom-in-95 duration-500">
              About Me
            </h1>

            {/* Domain Expertise Section */}
            <div className="mb-12 animate-in fade-in-0 slide-in-from-left-4 duration-700 delay-100">
              <h2 className="text-3xl font-bold mb-8 text-blue-800 text-center flex items-center justify-center gap-3">
                <Award className="w-8 h-8 text-blue-600" />
                Domain Expertise
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {domains.map((domain, index) => {
                  const Icon = domain.icon;
                  return (
                    <Card 
                      key={domain.name}
                      className="group hover:shadow-2xl transition-all duration-500 hover:scale-105 hover:-translate-y-2 border-2 border-blue-100 hover:border-blue-300 bg-white cursor-pointer animate-in fade-in-0 slide-in-from-bottom-4"
                      style={{ animationDelay: `${index * 150}ms` }}
                    >
                      <CardContent className="pt-6 text-center">
                        <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-br ${domain.gradient} mb-4 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500`}>
                          <Icon className="w-8 h-8 text-white" />
                        </div>
                        <h3 className="text-xl font-bold text-slate-800 mb-2 group-hover:text-blue-600 transition-colors duration-300">
                          {domain.name}
                        </h3>
                        <p className="text-slate-600 text-sm">
                          {domain.description}
                        </p>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>

            {/* Skills Section */}
            <div className="mb-12 animate-in fade-in-0 slide-in-from-right-4 duration-700 delay-200">
              <h2 className="text-3xl font-bold mb-8 text-blue-800 text-center">Technical Skills</h2>
              <div className="flex flex-wrap justify-center gap-4">
                {skills.map((skill, index) => {
                  const Icon = skill.icon;
                  return (
                    <div
                      key={skill.name}
                      className="group animate-in fade-in-0 zoom-in-95"
                      style={{ animationDelay: `${index * 80}ms` }}
                    >
                      <Card className="bg-white border-2 border-blue-100 hover:border-blue-300 hover:shadow-xl transition-all duration-500 hover:scale-110 hover:-translate-y-1 cursor-pointer">
                        <CardContent className="pt-6 pb-6 px-8">
                          <div className="flex items-center space-x-3">
                            <div className={`p-2 bg-gradient-to-br ${skill.color} rounded-lg group-hover:rotate-12 transition-transform duration-300`}>
                              <Icon className="w-5 h-5 text-white" />
                            </div>
                            <span className="font-semibold text-slate-800 group-hover:text-blue-600 transition-colors duration-300">
                              {skill.name}
                            </span>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Work Experience Section */}
            <div className="mb-12 animate-in fade-in-0 slide-in-from-left-4 duration-700 delay-300">
              <h2 className="text-3xl font-bold mb-8 text-blue-800 text-center flex items-center justify-center gap-3">
                <Briefcase className="w-8 h-8 text-blue-600" />
                Work Experience
              </h2>
              <div className="space-y-6">
                {workExperience.map((job, index) => (
                  <Card 
                    key={index}
                    className="bg-white border-l-4 border-blue-600 hover:shadow-xl transition-all duration-500 hover:scale-102 hover:border-cyan-600 group animate-in fade-in-0 slide-in-from-left-4"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <CardContent className="pt-6">
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-3">
                        <div>
                          <h3 className="text-xl font-bold text-slate-800 group-hover:text-blue-600 transition-colors duration-300">
                            {job.position}
                          </h3>
                          <p className="text-lg text-blue-600 font-semibold">{job.company}</p>
                        </div>
                        <span className="text-sm text-slate-500 font-medium mt-2 md:mt-0 bg-blue-50 px-3 py-1 rounded-full">
                          {job.duration}
                        </span>
                      </div>
                      <p className="text-slate-600">{job.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Admin Pages - Light Theme */}
        {currentPage === 'visits' && isAdmin && (
          <div className="min-h-screen">
            <h1 className="text-5xl font-bold mb-12 text-blue-800 animate-in fade-in-0 slide-in-from-top-4 duration-500">Visits Overview</h1>
            {analytics && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <Card className="bg-gradient-to-br from-blue-600 to-blue-700 text-white border-0 shadow-2xl hover:shadow-3xl hover:scale-105 transition-all duration-500 hover:-translate-y-2 animate-in fade-in-0 zoom-in-95">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Eye className="w-6 h-6" />
                      <span>Total Views</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-6xl font-bold">{analytics.totalViews || 0}</p>
                  </CardContent>
                </Card>
                <Card className="bg-gradient-to-br from-cyan-600 to-cyan-700 text-white border-0 shadow-2xl hover:shadow-3xl hover:scale-105 transition-all duration-500 hover:-translate-y-2 animate-in fade-in-0 zoom-in-95 delay-100">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <TrendingUp className="w-6 h-6" />
                      <span>Home Page</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-6xl font-bold">{analytics.pageViews?.home || 0}</p>
                  </CardContent>
                </Card>
                <Card className="bg-gradient-to-br from-teal-600 to-teal-700 text-white border-0 shadow-2xl hover:shadow-3xl hover:scale-105 transition-all duration-500 hover:-translate-y-2 animate-in fade-in-0 zoom-in-95 delay-200">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <BookOpen className="w-6 h-6" />
                      <span>Blogs</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-6xl font-bold">{analytics.pageViews?.blogs || 0}</p>
                  </CardContent>
                </Card>
                <Card className="bg-gradient-to-br from-indigo-600 to-indigo-700 text-white border-0 shadow-2xl hover:shadow-3xl hover:scale-105 transition-all duration-500 hover:-translate-y-2 animate-in fade-in-0 zoom-in-95 delay-300">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Film className="w-6 h-6" />
                      <span>Movies</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-6xl font-bold">{analytics.pageViews?.movies || 0}</p>
                  </CardContent>
                </Card>
                <Card className="bg-gradient-to-br from-violet-600 to-violet-700 text-white border-0 shadow-2xl hover:shadow-3xl hover:scale-105 transition-all duration-500 hover:-translate-y-2 animate-in fade-in-0 zoom-in-95 delay-400">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Book className="w-6 h-6" />
                      <span>Books</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-6xl font-bold">{analytics.pageViews?.books || 0}</p>
                  </CardContent>
                </Card>
                <Card className="bg-gradient-to-br from-purple-600 to-purple-700 text-white border-0 shadow-2xl hover:shadow-3xl hover:scale-105 transition-all duration-500 hover:-translate-y-2 animate-in fade-in-0 zoom-in-95 delay-500">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Package className="w-6 h-6" />
                      <span>Products</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-6xl font-bold">{analytics.pageViews?.products || 0}</p>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        )}

        {currentPage === 'analysis' && isAdmin && (
          <div className="min-h-screen">
            <h1 className="text-5xl font-bold mb-12 text-blue-800 animate-in fade-in-0 slide-in-from-top-4 duration-500">Detailed Analysis</h1>
            {analytics && (
              <div className="space-y-8">
                <Card className="bg-white border-2 border-blue-200 shadow-2xl hover:shadow-3xl transition-all duration-500 animate-in fade-in-0 zoom-in-95">
                  <CardHeader>
                    <CardTitle className="text-2xl flex items-center space-x-3 text-blue-800">
                      <BarChart3 className="w-8 h-8" />
                      <span>Overall Statistics</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-6">
                      <div>
                        <p className="text-slate-600 mb-2">Total Views</p>
                        <p className="text-5xl font-bold text-blue-600">{analytics.totalViews || 0}</p>
                      </div>
                      <div>
                        <p className="text-slate-600 mb-2">Total Reviews</p>
                        <p className="text-5xl font-bold text-blue-600">{reviews.length}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <Card className="bg-white border-2 border-blue-200 shadow-xl hover:shadow-2xl hover:border-blue-400 transition-all duration-500 animate-in fade-in-0 slide-in-from-left-4 delay-100">
                    <CardHeader>
                      <CardTitle className="text-blue-800">Page Performance</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {Object.entries(analytics.pageViews || {}).map(([page, views]) => (
                          <div key={page} className="flex justify-between items-center group">
                            <span className="capitalize font-medium text-slate-700 group-hover:text-blue-600 transition-colors duration-300">{page}</span>
                            <span className="text-2xl font-bold text-blue-600 group-hover:scale-110 transition-transform duration-300">{views}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-white border-2 border-blue-200 shadow-xl hover:shadow-2xl hover:border-blue-400 transition-all duration-500 animate-in fade-in-0 slide-in-from-right-4 delay-200">
                    <CardHeader>
                      <CardTitle className="text-blue-800">Content Breakdown</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex justify-between items-center group">
                          <span className="font-medium text-slate-700 group-hover:text-blue-600 transition-colors duration-300">Blogs</span>
                          <span className="text-2xl font-bold text-blue-600 group-hover:scale-110 transition-transform duration-300">{reviews.filter(r => r.type === 'blog').length}</span>
                        </div>
                        <div className="flex justify-between items-center group">
                          <span className="font-medium text-slate-700 group-hover:text-blue-600 transition-colors duration-300">Movies</span>
                          <span className="text-2xl font-bold text-blue-600 group-hover:scale-110 transition-transform duration-300">{reviews.filter(r => r.type === 'movie').length}</span>
                        </div>
                        <div className="flex justify-between items-center group">
                          <span className="font-medium text-slate-700 group-hover:text-blue-600 transition-colors duration-300">Books</span>
                          <span className="text-2xl font-bold text-blue-600 group-hover:scale-110 transition-transform duration-300">{reviews.filter(r => r.type === 'book').length}</span>
                        </div>
                        <div className="flex justify-between items-center group">
                          <span className="font-medium text-slate-700 group-hover:text-blue-600 transition-colors duration-300">Products</span>
                          <span className="text-2xl font-bold text-blue-600 group-hover:scale-110 transition-transform duration-300">{reviews.filter(r => r.type === 'product').length}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            )}
          </div>
        )}

        {(currentPage === 'manage-blogs' || currentPage === 'manage-movies' || currentPage === 'manage-books' || currentPage === 'manage-products') && isAdmin && (
          <div className="min-h-screen">
            <div className="flex justify-between items-center mb-12 animate-in fade-in-0 slide-in-from-top-4 duration-500">
              <h1 className="text-5xl font-bold text-blue-800 capitalize">
                Manage {currentPage.replace('manage-', '')}
              </h1>
              <Button
                onClick={() => {
                  setEditingReview(null);
                  const type = currentPage.replace('manage-', '').slice(0, -1);
                  setReviewForm({ type: type === 'movie' ? 'movie' : type === 'book' ? 'book' : type === 'product' ? 'product' : 'blog', title: '', image: '', description: '' });
                  setShowReviewModal(true);
                }}
                className="bg-blue-600 text-white hover:bg-blue-700 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add New
              </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {reviews
                .filter(r => r.type === currentPage.replace('manage-', '').slice(0, -1))
                .map((review, index) => (
                  <Card 
                    key={review.id} 
                    className="bg-white border-2 border-blue-200 shadow-xl hover:shadow-2xl hover:scale-102 transition-all duration-500 hover:border-blue-400 animate-in fade-in-0 slide-in-from-bottom-4"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div>
                          <CardTitle className="text-xl text-slate-800">{review.title}</CardTitle>
                          <CardDescription className="uppercase text-slate-600 mt-2">{review.type}</CardDescription>
                        </div>
                        <div className="flex space-x-2">
                          <Button
                            onClick={() => handleEditReview(review)}
                            variant="outline"
                            size="sm"
                            className="bg-blue-600 hover:bg-blue-700 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button
                            onClick={() => handleDeleteReview(review.id)}
                            variant="destructive"
                            size="sm"
                            className="bg-red-600 hover:bg-red-700 border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-slate-600 line-clamp-2">{review.description}</p>
                    </CardContent>
                  </Card>
                ))}
            </div>
            {reviews.filter(r => r.type === currentPage.replace('manage-', '').slice(0, -1)).length === 0 && (
              <div className="text-center py-20">
                <div className="text-6xl mb-4 animate-bounce">📝</div>
                <p className="text-xl text-slate-600">No {currentPage.replace('manage-', '')} yet. Start creating!</p>
              </div>
            )}
          </div>
        )}
      </main>

      {/* Footer for public pages */}
      {!isAdmin && (
        <footer className="border-t bg-white mt-16">
          <div className="container mx-auto px-4 py-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
              <div>
                <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent mb-4">P</h3>
                <p className="text-slate-600">
                  Sharing insights and reviews to help you make informed decisions.
                </p>
              </div>
              <div>
                <h4 className="text-lg font-semibold text-blue-800 mb-4">Quick Links</h4>
                <ul className="space-y-2">
                  <li>
                    <button onClick={() => changePage('home')} className="text-slate-600 hover:text-blue-600 transition-colors duration-300">
                      Home
                    </button>
                  </li>
                  <li>
                    <button onClick={() => changePage('blogs')} className="text-slate-600 hover:text-blue-600 transition-colors duration-300">
                      Blogs
                    </button>
                  </li>
                  <li>
                    <button onClick={() => changePage('about')} className="text-slate-600 hover:text-blue-600 transition-colors duration-300">
                      About
                    </button>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="text-lg font-semibold text-blue-800 mb-4">Connect</h4>
                <div className="flex space-x-4">
                  <a href="#" className="text-slate-600 hover:text-blue-600 transition-all duration-300 hover:scale-110">
                    <Github className="w-6 h-6" />
                  </a>
                  <a href="#" className="text-slate-600 hover:text-blue-600 transition-all duration-300 hover:scale-110">
                    <Linkedin className="w-6 h-6" />
                  </a>
                  <a href="#" className="text-slate-600 hover:text-blue-600 transition-all duration-300 hover:scale-110">
                    <Twitter className="w-6 h-6" />
                  </a>
                  <a href="#" className="text-slate-600 hover:text-blue-600 transition-all duration-300 hover:scale-110">
                    <Mail className="w-6 h-6" />
                  </a>
                </div>
              </div>
            </div>
            <div className="border-t pt-8 flex flex-col md:flex-row justify-between items-center">
              <p className="text-sm text-slate-600">
                © 2025 Portfolio. All rights reserved.
              </p>
              <button
                onClick={() => setShowAdminLogin(true)}
                className="text-sm text-slate-600 hover:text-blue-600 transition-colors duration-300 hover:scale-105 mt-4 md:mt-0"
              >
                Admin Access
              </button>
            </div>
          </div>
        </footer>
      )}

      {/* Admin Login Modal */}
      <Dialog open={showAdminLogin} onOpenChange={setShowAdminLogin}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-2xl text-blue-800">Admin Login</DialogTitle>
            <DialogDescription>Enter your credentials to access the admin panel.</DialogDescription>
          </DialogHeader>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                value={loginForm.username}
                onChange={(e) => setLoginForm({ ...loginForm, username: e.target.value })}
                required
                className="border-blue-300 focus:border-blue-500 transition-colors duration-300"
              />
            </div>
            <div>
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={loginForm.password}
                onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                required
                className="border-blue-300 focus:border-blue-500 transition-colors duration-300"
              />
            </div>
            <Button type="submit" className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white shadow-lg hover:shadow-xl transition-all duration-300">
              Login
            </Button>
          </form>
        </DialogContent>
      </Dialog>

      {/* Review Modal */}
      <Dialog open={showReviewModal} onOpenChange={setShowReviewModal}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-2xl text-blue-800">
              {editingReview ? 'Edit Review' : 'Add Review'}
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSaveReview} className="space-y-4">
            <div>
              <Label htmlFor="type">Type</Label>
              <Select
                value={reviewForm.type}
                onValueChange={(value) => setReviewForm({ ...reviewForm, type: value })}
              >
                <SelectTrigger className="border-blue-300 focus:border-blue-500">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="blog">Blog</SelectItem>
                  <SelectItem value="movie">Movie</SelectItem>
                  <SelectItem value="book">Book</SelectItem>
                  <SelectItem value="product">Product</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                value={reviewForm.title}
                onChange={(e) => setReviewForm({ ...reviewForm, title: e.target.value })}
                required
                className="border-blue-300 focus:border-blue-500"
              />
            </div>
            <div>
              <Label htmlFor="image">Image URL</Label>
              <Input
                id="image"
                value={reviewForm.image}
                onChange={(e) => setReviewForm({ ...reviewForm, image: e.target.value })}
                placeholder="https://example.com/image.jpg"
                className="border-blue-300 focus:border-blue-500"
              />
            </div>
            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={reviewForm.description}
                onChange={(e) => setReviewForm({ ...reviewForm, description: e.target.value })}
                rows={6}
                required
                className="border-blue-300 focus:border-blue-500"
              />
            </div>
            <div className="flex space-x-2">
              <Button 
                type="submit"
                className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Save
              </Button>
              <Button
                type="button"
                onClick={() => {
                  setShowReviewModal(false);
                  setEditingReview(null);
                }}
                variant="outline"
                className="hover:bg-blue-50 hover:border-blue-600"
              >
                Cancel
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
