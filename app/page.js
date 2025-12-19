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
import { BookOpen, Film, Book, Package, User, LogIn, LogOut, Plus, Edit, Trash2, BarChart3, TrendingUp, Eye, Activity, Sparkles } from 'lucide-react';

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

  // Public Navigation
  const PublicNav = () => (
    <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center justify-center flex-1 space-x-8">
            <div 
              className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent cursor-pointer hover:scale-110 transition-transform duration-300" 
              onClick={() => changePage('home')}
            >
              P
            </div>
            <div className="flex space-x-6">
              <button
                onClick={() => changePage('home')}
                className={`text-sm font-medium transition-all duration-300 hover:text-purple-600 hover:scale-105 ${
                  currentPage === 'home' ? 'text-purple-600 font-semibold' : 'text-muted-foreground'
                }`}
              >
                Home
              </button>
              <div className="relative group">
                <button className="text-sm font-medium text-muted-foreground hover:text-purple-600 transition-all duration-300 hover:scale-105">
                  Reviews
                </button>
                <div className="absolute hidden group-hover:block pt-2 animate-in fade-in-0 zoom-in-95">
                  <div className="bg-card border rounded-lg shadow-xl p-2 space-y-1 min-w-[140px]">
                    <button
                      onClick={() => changePage('blogs')}
                      className="block w-full text-left px-4 py-2 text-sm hover:bg-purple-50 hover:text-purple-600 rounded transition-all duration-200"
                    >
                      <BookOpen className="w-4 h-4 inline mr-2" />
                      Blogs
                    </button>
                    <button
                      onClick={() => changePage('movies')}
                      className="block w-full text-left px-4 py-2 text-sm hover:bg-purple-50 hover:text-purple-600 rounded transition-all duration-200"
                    >
                      <Film className="w-4 h-4 inline mr-2" />
                      Movies
                    </button>
                    <button
                      onClick={() => changePage('books')}
                      className="block w-full text-left px-4 py-2 text-sm hover:bg-purple-50 hover:text-purple-600 rounded transition-all duration-200"
                    >
                      <Book className="w-4 h-4 inline mr-2" />
                      Books
                    </button>
                    <button
                      onClick={() => changePage('products')}
                      className="block w-full text-left px-4 py-2 text-sm hover:bg-purple-50 hover:text-purple-600 rounded transition-all duration-200"
                    >
                      <Package className="w-4 h-4 inline mr-2" />
                      Products
                    </button>
                  </div>
                </div>
              </div>
              <button
                onClick={() => changePage('about')}
                className={`text-sm font-medium transition-all duration-300 hover:text-purple-600 hover:scale-105 ${
                  currentPage === 'about' ? 'text-purple-600 font-semibold' : 'text-muted-foreground'
                }`}
              >
                About
              </button>
            </div>
          </div>
          <div>
            <Button onClick={() => setShowAdminLogin(true)} variant="outline" size="sm" className="hover:bg-purple-50 hover:text-purple-600 hover:border-purple-600 transition-all duration-300">
              <LogIn className="w-4 h-4 mr-2" />
              Admin
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );

  // Admin Navigation
  const AdminNav = () => (
    <nav className="border-b bg-gradient-to-r from-indigo-900 to-purple-900 sticky top-0 z-50 shadow-lg">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center justify-center flex-1 space-x-8">
            <div className="text-3xl font-bold text-white cursor-pointer hover:scale-110 transition-transform duration-300">
              P
            </div>
            <div className="flex space-x-6">
              <button
                onClick={() => changePage('visits')}
                className={`text-sm font-medium transition-all duration-300 flex items-center space-x-2 px-4 py-2 rounded-lg ${
                  currentPage === 'visits' 
                    ? 'bg-white/20 text-white font-semibold shadow-md' 
                    : 'text-white/80 hover:bg-white/10 hover:text-white'
                }`}
              >
                <Eye className="w-4 h-4" />
                <span>Visits</span>
              </button>
              <button
                onClick={() => changePage('analysis')}
                className={`text-sm font-medium transition-all duration-300 flex items-center space-x-2 px-4 py-2 rounded-lg ${
                  currentPage === 'analysis' 
                    ? 'bg-white/20 text-white font-semibold shadow-md' 
                    : 'text-white/80 hover:bg-white/10 hover:text-white'
                }`}
              >
                <Activity className="w-4 h-4" />
                <span>Analysis</span>
              </button>
              <div className="relative group">
                <button className="text-sm font-medium text-white/80 hover:bg-white/10 hover:text-white transition-all duration-300 px-4 py-2 rounded-lg flex items-center space-x-2">
                  <Edit className="w-4 h-4" />
                  <span>Manage</span>
                </button>
                <div className="absolute hidden group-hover:block pt-2 animate-in fade-in-0 zoom-in-95">
                  <div className="bg-indigo-800 border border-indigo-700 rounded-lg shadow-xl p-2 space-y-1 min-w-[140px]">
                    <button
                      onClick={() => changePage('manage-blogs')}
                      className="block w-full text-left px-4 py-2 text-sm text-white/90 hover:bg-white/10 rounded transition-all duration-200"
                    >
                      Blogs
                    </button>
                    <button
                      onClick={() => changePage('manage-movies')}
                      className="block w-full text-left px-4 py-2 text-sm text-white/90 hover:bg-white/10 rounded transition-all duration-200"
                    >
                      Movies
                    </button>
                    <button
                      onClick={() => changePage('manage-books')}
                      className="block w-full text-left px-4 py-2 text-sm text-white/90 hover:bg-white/10 rounded transition-all duration-200"
                    >
                      Books
                    </button>
                    <button
                      onClick={() => changePage('manage-products')}
                      className="block w-full text-left px-4 py-2 text-sm text-white/90 hover:bg-white/10 rounded transition-all duration-200"
                    >
                      Products
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div>
            <Button onClick={handleLogout} variant="outline" size="sm" className="border-white/30 text-white hover:bg-white/20 transition-all duration-300">
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-pink-50">
      {/* Navigation */}
      {isAdmin ? <AdminNav /> : <PublicNav />}

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {currentPage === 'home' && (
          <div>
            {/* Hero Section */}
            <div className="text-center py-16 mb-12 relative">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-300/20 to-pink-300/20 blur-3xl -z-10"></div>
              <div className="inline-flex items-center justify-center w-28 h-28 rounded-full bg-gradient-to-br from-purple-600 to-pink-600 text-white text-5xl font-bold mb-6 shadow-2xl hover:scale-110 transition-transform duration-300 animate-pulse">
                P
              </div>
              <h1 className="text-6xl font-bold mb-4 bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600 bg-clip-text text-transparent animate-in fade-in-0 slide-in-from-bottom-4 duration-700">
                Welcome to My Portfolio
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8 animate-in fade-in-0 slide-in-from-bottom-8 duration-1000">
                Explore my thoughts and reviews on blogs, movies, books, and products.
              </p>
              
              {/* About Me Preview Card */}
              <div className="max-w-3xl mx-auto mt-12 animate-in fade-in-0 slide-in-from-bottom-12 duration-1000">
                <Card className="bg-white/80 backdrop-blur-sm border-2 border-purple-100 shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-500 hover:border-purple-300">
                  <CardHeader>
                    <div className="flex items-center justify-center space-x-3 mb-4">
                      <Sparkles className="w-6 h-6 text-purple-600 animate-pulse" />
                      <CardTitle className="text-3xl bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                        About Me
                      </CardTitle>
                      <Sparkles className="w-6 h-6 text-pink-600 animate-pulse" />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-lg text-muted-foreground leading-relaxed">
                      {aboutContent || 'Welcome! I share my passion through detailed reviews and insights. Customize this section from the admin panel to tell your unique story.'}
                    </p>
                    <Button 
                      onClick={() => changePage('about')} 
                      className="mt-6 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                    >
                      Learn More About Me
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Recent Reviews */}
            <div>
              <h2 className="text-4xl font-bold mb-8 text-center bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Recent Reviews
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredReviews.map((review, index) => (
                  <Card 
                    key={review.id} 
                    className="overflow-hidden hover:shadow-2xl transition-all duration-500 hover:scale-105 hover:-translate-y-2 border-2 border-transparent hover:border-purple-300 bg-white/80 backdrop-blur-sm animate-in fade-in-0 slide-in-from-bottom-4"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    {review.image && (
                      <div className="relative overflow-hidden group">
                        <img
                          src={review.image}
                          alt={review.title}
                          className="w-full h-52 object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      </div>
                    )}
                    <CardHeader>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-bold text-white bg-gradient-to-r from-purple-600 to-pink-600 px-3 py-1 rounded-full uppercase shadow-md">
                          {review.type}
                        </span>
                      </div>
                      <CardTitle className="hover:text-purple-600 transition-colors duration-300">{review.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground line-clamp-3">{review.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
              {filteredReviews.length === 0 && (
                <div className="text-center py-20">
                  <div className="text-6xl mb-4">📝</div>
                  <p className="text-xl text-muted-foreground">No reviews yet. Start creating amazing content!</p>
                </div>
              )}
            </div>
          </div>
        )}

        {(currentPage === 'blogs' || currentPage === 'movies' || currentPage === 'books' || currentPage === 'products') && (
          <div>
            <h1 className="text-5xl font-bold mb-12 capitalize text-center bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              {currentPage}
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredReviews.map((review, index) => (
                <Card 
                  key={review.id} 
                  className="overflow-hidden hover:shadow-2xl transition-all duration-500 hover:scale-105 hover:-translate-y-2 border-2 border-transparent hover:border-purple-300 bg-white/80 backdrop-blur-sm animate-in fade-in-0 zoom-in-95"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  {review.image && (
                    <div className="relative overflow-hidden group">
                      <img
                        src={review.image}
                        alt={review.title}
                        className="w-full h-52 object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>
                  )}
                  <CardHeader>
                    <CardTitle className="hover:text-purple-600 transition-colors duration-300">{review.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{review.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
            {filteredReviews.length === 0 && (
              <div className="text-center py-20">
                <div className="text-6xl mb-4">🔍</div>
                <p className="text-xl text-muted-foreground">No {currentPage} yet.</p>
              </div>
            )}
          </div>
        )}

        {currentPage === 'about' && (
          <div className="max-w-3xl mx-auto">
            <h1 className="text-5xl font-bold mb-12 text-center bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              About Me
            </h1>
            <Card className="shadow-2xl border-2 border-purple-100 hover:shadow-3xl transition-all duration-500 bg-white/80 backdrop-blur-sm">
              <CardContent className="pt-6">
                {isAdmin && aboutEditMode ? (
                  <div className="space-y-4">
                    <Textarea
                      value={aboutEditContent}
                      onChange={(e) => setAboutEditContent(e.target.value)}
                      rows={10}
                      className="w-full border-purple-200 focus:border-purple-500 transition-colors duration-300"
                    />
                    <div className="flex space-x-2">
                      <Button 
                        onClick={handleSaveAbout}
                        className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white shadow-lg hover:shadow-xl transition-all duration-300"
                      >
                        Save
                      </Button>
                      <Button onClick={() => setAboutEditMode(false)} variant="outline" className="hover:bg-purple-50 hover:border-purple-600">
                        Cancel
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div>
                    <p className="text-lg whitespace-pre-wrap leading-relaxed">{aboutContent}</p>
                    {isAdmin && (
                      <Button
                        onClick={() => {
                          setAboutEditContent(aboutContent);
                          setAboutEditMode(true);
                        }}
                        className="mt-6 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-300"
                        variant="outline"
                      >
                        <Edit className="w-4 h-4 mr-2" />
                        Edit
                      </Button>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        )}

        {/* Admin Pages */}
        {currentPage === 'visits' && isAdmin && (
          <div className="min-h-screen">
            <h1 className="text-5xl font-bold mb-12 text-white drop-shadow-lg">Visits Overview</h1>
            {analytics && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <Card className="bg-gradient-to-br from-blue-500 to-blue-700 text-white border-0 shadow-2xl hover:shadow-3xl hover:scale-105 transition-all duration-500 hover:-translate-y-2">
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
                <Card className="bg-gradient-to-br from-purple-500 to-purple-700 text-white border-0 shadow-2xl hover:shadow-3xl hover:scale-105 transition-all duration-500 hover:-translate-y-2">
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
                <Card className="bg-gradient-to-br from-pink-500 to-pink-700 text-white border-0 shadow-2xl hover:shadow-3xl hover:scale-105 transition-all duration-500 hover:-translate-y-2">
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
                <Card className="bg-gradient-to-br from-orange-500 to-orange-700 text-white border-0 shadow-2xl hover:shadow-3xl hover:scale-105 transition-all duration-500 hover:-translate-y-2">
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
                <Card className="bg-gradient-to-br from-green-500 to-green-700 text-white border-0 shadow-2xl hover:shadow-3xl hover:scale-105 transition-all duration-500 hover:-translate-y-2">
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
                <Card className="bg-gradient-to-br from-indigo-500 to-indigo-700 text-white border-0 shadow-2xl hover:shadow-3xl hover:scale-105 transition-all duration-500 hover:-translate-y-2">
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
                <Card className="bg-gradient-to-br from-indigo-900 to-purple-900 text-white border-0 shadow-2xl hover:shadow-3xl transition-all duration-500">
                  <CardHeader>
                    <CardTitle className="text-2xl flex items-center space-x-3">
                      <BarChart3 className="w-8 h-8" />
                      <span>Overall Statistics</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-6">
                      <div>
                        <p className="text-white/70 mb-2">Total Views</p>
                        <p className="text-5xl font-bold">{analytics.totalViews || 0}</p>
                      </div>
                      <div>
                        <p className="text-white/70 mb-2">Total Reviews</p>
                        <p className="text-5xl font-bold">{reviews.length}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <Card className="bg-white/10 backdrop-blur-md text-white border-white/20 shadow-xl hover:shadow-2xl hover:bg-white/20 transition-all duration-500">
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

                  <Card className="bg-white/10 backdrop-blur-md text-white border-white/20 shadow-xl hover:shadow-2xl hover:bg-white/20 transition-all duration-500">
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
                  const type = currentPage.replace('manage-', '').slice(0, -1); // Remove 's' from end
                  setReviewForm({ type: type === 'movie' ? 'movie' : type === 'book' ? 'book' : type === 'product' ? 'product' : 'blog', title: '', image: '', description: '' });
                  setShowReviewModal(true);
                }}
                className="bg-white text-indigo-900 hover:bg-white/90 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add New
              </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {reviews
                .filter(r => r.type === currentPage.replace('manage-', '').slice(0, -1))
                .map((review) => (
                  <Card key={review.id} className="bg-white/10 backdrop-blur-md text-white border-white/20 shadow-xl hover:shadow-2xl hover:scale-102 transition-all duration-500 hover:bg-white/20">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div>
                          <CardTitle className="text-xl">{review.title}</CardTitle>
                          <CardDescription className="uppercase text-white/60 mt-2">{review.type}</CardDescription>
                        </div>
                        <div className="flex space-x-2">
                          <Button
                            onClick={() => handleEditReview(review)}
                            variant="outline"
                            size="sm"
                            className="bg-blue-500 hover:bg-blue-600 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300"
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button
                            onClick={() => handleDeleteReview(review.id)}
                            variant="destructive"
                            size="sm"
                            className="bg-red-500 hover:bg-red-600 border-0 shadow-lg hover:shadow-xl transition-all duration-300"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-white/80 line-clamp-2">{review.description}</p>
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
              <p className="text-sm text-muted-foreground">
                © 2025 Portfolio. All rights reserved.
              </p>
              <button
                onClick={() => setShowAdminLogin(true)}
                className="text-sm text-muted-foreground hover:text-purple-600 transition-colors duration-300 hover:scale-105"
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
            <DialogTitle className="text-2xl bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">Admin Login</DialogTitle>
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
                className="border-purple-200 focus:border-purple-500 transition-colors duration-300"
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
                className="border-purple-200 focus:border-purple-500 transition-colors duration-300"
              />
            </div>
            <Button type="submit" className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white shadow-lg hover:shadow-xl transition-all duration-300">
              Login
            </Button>
          </form>
        </DialogContent>
      </Dialog>

      {/* Review Modal */}
      <Dialog open={showReviewModal} onOpenChange={setShowReviewModal}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-2xl bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
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
                <SelectTrigger className="border-purple-200 focus:border-purple-500">
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
                className="border-purple-200 focus:border-purple-500"
              />
            </div>
            <div>
              <Label htmlFor="image">Image URL</Label>
              <Input
                id="image"
                value={reviewForm.image}
                onChange={(e) => setReviewForm({ ...reviewForm, image: e.target.value })}
                placeholder="https://example.com/image.jpg"
                className="border-purple-200 focus:border-purple-500"
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
                className="border-purple-200 focus:border-purple-500"
              />
            </div>
            <div className="flex space-x-2">
              <Button 
                type="submit"
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white shadow-lg hover:shadow-xl transition-all duration-300"
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
                className="hover:bg-purple-50 hover:border-purple-600"
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
