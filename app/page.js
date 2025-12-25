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
import { BookOpen, Film, Book, Package, User, LogIn, LogOut, Plus, Edit, Trash2, BarChart3, TrendingUp, Eye, Activity, Shield, Code, Laptop, Database, Cloud, Layers } from 'lucide-react';

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

  // Sample skills data
  const [skills] = useState([
    { name: 'JavaScript', level: 90, icon: Code },
    { name: 'React', level: 85, icon: Layers },
    { name: 'Node.js', level: 80, icon: Database },
    { name: 'Python', level: 75, icon: Code },
    { name: 'MongoDB', level: 70, icon: Database },
    { name: 'Next.js', level: 85, icon: Laptop },
    { name: 'AWS', level: 65, icon: Cloud },
    { name: 'TypeScript', level: 80, icon: Code }
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

  // Get background class based on page
  const getBackgroundClass = () => {
    if (isAdmin) {
      return 'bg-admin-pattern';
    }
    return 'bg-public-pattern';
  };

  // Public Navigation
  const PublicNav = () => (
    <nav className="border-b bg-white/80 backdrop-blur-lg supports-[backdrop-filter]:bg-white/60 sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div 
            className="text-3xl font-bold text-slate-800 cursor-pointer hover:text-blue-600 transition-all duration-300 hover:scale-110" 
            onClick={() => changePage('home')}
          >
            P
          </div>
          <div className="flex space-x-8">
            <button
              onClick={() => changePage('home')}
              className={`text-sm font-medium transition-all duration-300 hover:text-blue-600 hover:scale-105 ${
                currentPage === 'home' ? 'text-blue-600 font-semibold' : 'text-slate-600'
              }`}
            >
              Home
            </button>
            <div className="relative group">
              <button className="text-sm font-medium text-slate-600 hover:text-blue-600 transition-all duration-300 hover:scale-105">
                Reviews
              </button>
              <div className="absolute hidden group-hover:block pt-2 animate-in fade-in-0 zoom-in-95 left-1/2 -translate-x-1/2">
                <div className="bg-white border border-slate-200 rounded-lg shadow-xl p-2 space-y-1 min-w-[140px]">
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
                currentPage === 'about' ? 'text-blue-600 font-semibold' : 'text-slate-600'
              }`}
            >
              About
            </button>
          </div>
          <div>
            <Button 
              onClick={() => setShowAdminLogin(true)} 
              variant="ghost" 
              size="icon"
              className="hover:bg-blue-50 hover:text-blue-600 transition-all duration-300 rounded-full"
            >
              <Shield className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );

  // Admin Navigation
  const AdminNav = () => (
    <nav className="border-b bg-slate-900 sticky top-0 z-50 shadow-lg">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="text-3xl font-bold text-white cursor-pointer hover:text-blue-400 transition-all duration-300 hover:scale-110">
            P
          </div>
          <div className="flex space-x-6">
            <button
              onClick={() => changePage('visits')}
              className={`text-sm font-medium transition-all duration-300 flex items-center space-x-2 px-4 py-2 rounded-lg ${
                currentPage === 'visits' 
                  ? 'bg-blue-600 text-white font-semibold shadow-lg' 
                  : 'text-slate-300 hover:bg-slate-800 hover:text-white'
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
                  : 'text-slate-300 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <Activity className="w-4 h-4" />
              <span>Analysis</span>
            </button>
            <div className="relative group">
              <button className="text-sm font-medium text-slate-300 hover:bg-slate-800 hover:text-white transition-all duration-300 px-4 py-2 rounded-lg flex items-center space-x-2">
                <Edit className="w-4 h-4" />
                <span>Manage</span>
              </button>
              <div className="absolute hidden group-hover:block pt-2 animate-in fade-in-0 zoom-in-95">
                <div className="bg-slate-800 border border-slate-700 rounded-lg shadow-xl p-2 space-y-1 min-w-[140px]">
                  <button
                    onClick={() => changePage('manage-blogs')}
                    className="block w-full text-left px-4 py-2 text-sm text-slate-300 hover:bg-slate-700 hover:text-white rounded transition-all duration-200"
                  >
                    Blogs
                  </button>
                  <button
                    onClick={() => changePage('manage-movies')}
                    className="block w-full text-left px-4 py-2 text-sm text-slate-300 hover:bg-slate-700 hover:text-white rounded transition-all duration-200"
                  >
                    Movies
                  </button>
                  <button
                    onClick={() => changePage('manage-books')}
                    className="block w-full text-left px-4 py-2 text-sm text-slate-300 hover:bg-slate-700 hover:text-white rounded transition-all duration-200"
                  >
                    Books
                  </button>
                  <button
                    onClick={() => changePage('manage-products')}
                    className="block w-full text-left px-4 py-2 text-sm text-slate-300 hover:bg-slate-700 hover:text-white rounded transition-all duration-200"
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
              className="text-slate-300 hover:bg-slate-800 hover:text-white transition-all duration-300 rounded-full"
            >
              <LogOut className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );

  return (
    <div className={`min-h-screen ${getBackgroundClass()}`}>
      {/* Navigation */}
      {isAdmin ? <AdminNav /> : <PublicNav />}

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {currentPage === 'home' && (
          <div>
            {/* Hero Section */}
            <div className="text-center py-20 mb-16 relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-cyan-400/20 blur-3xl -z-10 rounded-full"></div>
              <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-br from-blue-600 to-cyan-600 text-white text-5xl font-bold mb-6 shadow-2xl hover:scale-110 transition-transform duration-500">
                P
              </div>
              <h1 className="text-6xl font-bold mb-4 text-slate-800 animate-in fade-in-0 slide-in-from-bottom-4 duration-700">
                Welcome to My Portfolio
              </h1>
              <p className="text-xl text-slate-600 max-w-2xl mx-auto mb-8 animate-in fade-in-0 slide-in-from-bottom-8 duration-1000">
                Explore my thoughts and reviews on blogs, movies, books, and products.
              </p>
              
              {/* About Me Preview Card */}
              <div className="max-w-3xl mx-auto mt-12 animate-in fade-in-0 slide-in-from-bottom-12 duration-1000">
                <Card className="bg-white/90 backdrop-blur-sm border border-slate-200 shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-500">
                  <CardHeader>
                    <div className="flex items-center justify-center space-x-3 mb-4">
                      <User className="w-6 h-6 text-blue-600" />
                      <CardTitle className="text-3xl text-slate-800">
                        About Me
                      </CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-lg text-slate-600 leading-relaxed">
                      {aboutContent || 'Welcome! I share my passion through detailed reviews and insights. Customize this section from the admin panel to tell your unique story.'}
                    </p>
                    <Button 
                      onClick={() => changePage('about')} 
                      className="mt-6 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                    >
                      Learn More About Me
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Recent Reviews */}
            <div>
              <h2 className="text-4xl font-bold mb-8 text-center text-slate-800">
                Recent Reviews
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredReviews.map((review, index) => (
                  <Card 
                    key={review.id} 
                    className="overflow-hidden hover:shadow-2xl transition-all duration-500 hover:scale-105 hover:-translate-y-2 border border-slate-200 bg-white/90 backdrop-blur-sm animate-in fade-in-0 slide-in-from-bottom-4"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    {review.image && (
                      <div className="relative overflow-hidden group">
                        <img
                          src={review.image}
                          alt={review.title}
                          className="w-full h-52 object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      </div>
                    )}
                    <CardHeader>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-bold text-white bg-gradient-to-r from-blue-600 to-cyan-600 px-3 py-1 rounded-full uppercase shadow-md">
                          {review.type}
                        </span>
                      </div>
                      <CardTitle className="hover:text-blue-600 transition-colors duration-300 text-slate-800">{review.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-slate-600 line-clamp-3">{review.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
              {filteredReviews.length === 0 && (
                <div className="text-center py-20">
                  <div className="text-6xl mb-4">📝</div>
                  <p className="text-xl text-slate-600">No reviews yet. Start creating amazing content!</p>
                </div>
              )}
            </div>
          </div>
        )}

        {(currentPage === 'blogs' || currentPage === 'movies' || currentPage === 'books' || currentPage === 'products') && (
          <div>
            <h1 className="text-5xl font-bold mb-12 capitalize text-center text-slate-800">
              {currentPage}
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredReviews.map((review, index) => (
                <Card 
                  key={review.id} 
                  className="overflow-hidden hover:shadow-2xl transition-all duration-500 hover:scale-105 hover:-translate-y-2 border border-slate-200 bg-white/90 backdrop-blur-sm animate-in fade-in-0 zoom-in-95"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  {review.image && (
                    <div className="relative overflow-hidden group">
                      <img
                        src={review.image}
                        alt={review.title}
                        className="w-full h-52 object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>
                  )}
                  <CardHeader>
                    <CardTitle className="hover:text-blue-600 transition-colors duration-300 text-slate-800">{review.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-slate-600">{review.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
            {filteredReviews.length === 0 && (
              <div className="text-center py-20">
                <div className="text-6xl mb-4">🔍</div>
                <p className="text-xl text-slate-600">No {currentPage} yet.</p>
              </div>
            )}
          </div>
        )}

        {currentPage === 'about' && (
          <div className="max-w-5xl mx-auto">
            <h1 className="text-5xl font-bold mb-12 text-center text-slate-800">
              About Me
            </h1>
            
            {/* About Content */}
            <Card className="shadow-xl border border-slate-200 hover:shadow-2xl transition-all duration-500 bg-white/90 backdrop-blur-sm mb-12">
              <CardContent className="pt-6">
                {isAdmin && aboutEditMode ? (
                  <div className="space-y-4">
                    <Textarea
                      value={aboutEditContent}
                      onChange={(e) => setAboutEditContent(e.target.value)}
                      rows={10}
                      className="w-full border-slate-300 focus:border-blue-500 transition-colors duration-300"
                    />
                    <div className="flex space-x-2">
                      <Button 
                        onClick={handleSaveAbout}
                        className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white shadow-lg hover:shadow-xl transition-all duration-300"
                      >
                        Save
                      </Button>
                      <Button onClick={() => setAboutEditMode(false)} variant="outline" className="hover:bg-blue-50 hover:border-blue-600">
                        Cancel
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div>
                    <p className="text-lg text-slate-700 whitespace-pre-wrap leading-relaxed">{aboutContent}</p>
                    {isAdmin && (
                      <Button
                        onClick={() => {
                          setAboutEditContent(aboutContent);
                          setAboutEditMode(true);
                        }}
                        className="mt-6 bg-slate-800 hover:bg-slate-900 text-white shadow-lg hover:shadow-xl transition-all duration-300"
                      >
                        <Edit className="w-4 h-4 mr-2" />
                        Edit
                      </Button>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Skills Section */}
            <div className="mb-12">
              <h2 className="text-3xl font-bold mb-8 text-slate-800 text-center">Technical Skills</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {skills.map((skill, index) => {
                  const Icon = skill.icon;
                  return (
                    <Card 
                      key={skill.name} 
                      className="bg-white/90 backdrop-blur-sm border border-slate-200 hover:shadow-xl transition-all duration-500 hover:scale-105 animate-in fade-in-0 slide-in-from-left-4"
                      style={{ animationDelay: `${index * 50}ms` }}
                    >
                      <CardContent className="pt-6">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center space-x-3">
                            <div className="p-2 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg">
                              <Icon className="w-5 h-5 text-white" />
                            </div>
                            <span className="font-semibold text-slate-800">{skill.name}</span>
                          </div>
                          <span className="text-sm font-bold text-blue-600">{skill.level}%</span>
                        </div>
                        <div className="w-full bg-slate-200 rounded-full h-2.5 overflow-hidden">
                          <div 
                            className="bg-gradient-to-r from-blue-600 to-cyan-600 h-2.5 rounded-full transition-all duration-1000 ease-out hover:from-blue-700 hover:to-cyan-700"
                            style={{ 
                              width: `${skill.level}%`,
                              animation: 'slideIn 1s ease-out'
                            }}
                          ></div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* Admin Pages */}
        {currentPage === 'visits' && isAdmin && (
          <div className="min-h-screen">
            <h1 className="text-5xl font-bold mb-12 text-white drop-shadow-lg">Visits Overview</h1>
            {analytics && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <Card className="bg-gradient-to-br from-blue-600 to-blue-700 text-white border-0 shadow-2xl hover:shadow-3xl hover:scale-105 transition-all duration-500 hover:-translate-y-2">
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
                <Card className="bg-gradient-to-br from-cyan-600 to-cyan-700 text-white border-0 shadow-2xl hover:shadow-3xl hover:scale-105 transition-all duration-500 hover:-translate-y-2">
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
                <Card className="bg-gradient-to-br from-teal-600 to-teal-700 text-white border-0 shadow-2xl hover:shadow-3xl hover:scale-105 transition-all duration-500 hover:-translate-y-2">
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
                <Card className="bg-gradient-to-br from-indigo-600 to-indigo-700 text-white border-0 shadow-2xl hover:shadow-3xl hover:scale-105 transition-all duration-500 hover:-translate-y-2">
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
                <Card className="bg-gradient-to-br from-violet-600 to-violet-700 text-white border-0 shadow-2xl hover:shadow-3xl hover:scale-105 transition-all duration-500 hover:-translate-y-2">
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
                <Card className="bg-gradient-to-br from-purple-600 to-purple-700 text-white border-0 shadow-2xl hover:shadow-3xl hover:scale-105 transition-all duration-500 hover:-translate-y-2">
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
            <h1 className="text-5xl font-bold mb-12 text-white drop-shadow-lg">Detailed Analysis</h1>
            {analytics && (
              <div className="space-y-8">
                <Card className="bg-slate-800 text-white border-0 shadow-2xl hover:shadow-3xl transition-all duration-500">
                  <CardHeader>
                    <CardTitle className="text-2xl flex items-center space-x-3">
                      <BarChart3 className="w-8 h-8" />
                      <span>Overall Statistics</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-6">
                      <div>
                        <p className="text-slate-400 mb-2">Total Views</p>
                        <p className="text-5xl font-bold">{analytics.totalViews || 0}</p>
                      </div>
                      <div>
                        <p className="text-slate-400 mb-2">Total Reviews</p>
                        <p className="text-5xl font-bold">{reviews.length}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <Card className="bg-white/10 backdrop-blur-md text-white border-slate-700 shadow-xl hover:shadow-2xl hover:bg-white/20 transition-all duration-500">
                    <CardHeader>
                      <CardTitle>Page Performance</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {Object.entries(analytics.pageViews || {}).map(([page, views]) => (
                          <div key={page} className="flex justify-between items-center">
                            <span className="capitalize font-medium">{page}</span>
                            <span className="text-2xl font-bold">{views}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-white/10 backdrop-blur-md text-white border-slate-700 shadow-xl hover:shadow-2xl hover:bg-white/20 transition-all duration-500">
                    <CardHeader>
                      <CardTitle>Content Breakdown</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex justify-between items-center">
                          <span className="font-medium">Blogs</span>
                          <span className="text-2xl font-bold">{reviews.filter(r => r.type === 'blog').length}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="font-medium">Movies</span>
                          <span className="text-2xl font-bold">{reviews.filter(r => r.type === 'movie').length}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="font-medium">Books</span>
                          <span className="text-2xl font-bold">{reviews.filter(r => r.type === 'book').length}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="font-medium">Products</span>
                          <span className="text-2xl font-bold">{reviews.filter(r => r.type === 'product').length}</span>
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
            <div className="flex justify-between items-center mb-12">
              <h1 className="text-5xl font-bold text-white drop-shadow-lg capitalize">
                Manage {currentPage.replace('manage-', '')}
              </h1>
              <Button
                onClick={() => {
                  setEditingReview(null);
                  const type = currentPage.replace('manage-', '').slice(0, -1);
                  setReviewForm({ type: type === 'movie' ? 'movie' : type === 'book' ? 'book' : type === 'product' ? 'product' : 'blog', title: '', image: '', description: '' });
                  setShowReviewModal(true);
                }}
                className="bg-white text-slate-900 hover:bg-slate-100 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add New
              </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {reviews
                .filter(r => r.type === currentPage.replace('manage-', '').slice(0, -1))
                .map((review) => (
                  <Card key={review.id} className="bg-white/10 backdrop-blur-md text-white border-slate-700 shadow-xl hover:shadow-2xl hover:scale-102 transition-all duration-500 hover:bg-white/20">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div>
                          <CardTitle className="text-xl">{review.title}</CardTitle>
                          <CardDescription className="uppercase text-slate-400 mt-2">{review.type}</CardDescription>
                        </div>
                        <div className="flex space-x-2">
                          <Button
                            onClick={() => handleEditReview(review)}
                            variant="outline"
                            size="sm"
                            className="bg-blue-600 hover:bg-blue-700 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300"
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button
                            onClick={() => handleDeleteReview(review.id)}
                            variant="destructive"
                            size="sm"
                            className="bg-red-600 hover:bg-red-700 border-0 shadow-lg hover:shadow-xl transition-all duration-300"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-slate-300 line-clamp-2">{review.description}</p>
                    </CardContent>
                  </Card>
                ))}
            </div>
            {reviews.filter(r => r.type === currentPage.replace('manage-', '').slice(0, -1)).length === 0 && (
              <div className="text-center py-20">
                <div className="text-6xl mb-4 text-white/50">📝</div>
                <p className="text-xl text-white/70">No {currentPage.replace('manage-', '')} yet. Start creating!</p>
              </div>
            )}
          </div>
        )}
      </main>

      {/* Footer */}
      {!isAdmin && (
        <footer className="border-t bg-white/80 backdrop-blur-sm mt-16">
          <div className="container mx-auto px-4 py-8">
            <div className="flex items-center justify-between">
              <p className="text-sm text-slate-600">
                © 2025 Portfolio. All rights reserved.
              </p>
              <button
                onClick={() => setShowAdminLogin(true)}
                className="text-sm text-slate-600 hover:text-blue-600 transition-colors duration-300 hover:scale-105"
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
            <DialogTitle className="text-2xl text-slate-800">Admin Login</DialogTitle>
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
                className="border-slate-300 focus:border-blue-500 transition-colors duration-300"
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
                className="border-slate-300 focus:border-blue-500 transition-colors duration-300"
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
            <DialogTitle className="text-2xl text-slate-800">
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
                <SelectTrigger className="border-slate-300 focus:border-blue-500">
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
                className="border-slate-300 focus:border-blue-500"
              />
            </div>
            <div>
              <Label htmlFor="image">Image URL</Label>
              <Input
                id="image"
                value={reviewForm.image}
                onChange={(e) => setReviewForm({ ...reviewForm, image: e.target.value })}
                placeholder="https://example.com/image.jpg"
                className="border-slate-300 focus:border-blue-500"
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
                className="border-slate-300 focus:border-blue-500"
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

      <style jsx global>{`
        @keyframes slideIn {
          from {
            width: 0%;
          }
          to {
            width: var(--final-width);
          }
        }

        /* Public Pages Background - Light Geometric Pattern */
        .bg-public-pattern {
          background-color: #f8fafc;
          background-image: 
            radial-gradient(circle at 20% 50%, rgba(59, 130, 246, 0.08) 0%, transparent 50%),
            radial-gradient(circle at 80% 80%, rgba(6, 182, 212, 0.08) 0%, transparent 50%),
            radial-gradient(circle at 40% 20%, rgba(14, 165, 233, 0.05) 0%, transparent 50%),
            repeating-linear-gradient(45deg, transparent, transparent 60px, rgba(148, 163, 184, 0.03) 60px, rgba(148, 163, 184, 0.03) 61px);
          background-attachment: fixed;
        }

        /* Admin Pages Background - Dark Tech Pattern */
        .bg-admin-pattern {
          background-color: #0f172a;
          background-image: 
            radial-gradient(circle at 10% 20%, rgba(59, 130, 246, 0.15) 0%, transparent 50%),
            radial-gradient(circle at 90% 80%, rgba(6, 182, 212, 0.12) 0%, transparent 50%),
            radial-gradient(circle at 50% 50%, rgba(14, 165, 233, 0.08) 0%, transparent 50%),
            repeating-linear-gradient(90deg, rgba(148, 163, 184, 0.05) 0px, transparent 1px, transparent 80px, rgba(148, 163, 184, 0.05) 81px),
            repeating-linear-gradient(0deg, rgba(148, 163, 184, 0.05) 0px, transparent 1px, transparent 80px, rgba(148, 163, 184, 0.05) 81px);
          background-attachment: fixed;
        }
      `}</style>
    </div>
  );
}
