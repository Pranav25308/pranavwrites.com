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
import { BookOpen, Film, Book, Package, User, LogIn, LogOut, Plus, Edit, Trash2, BarChart3 } from 'lucide-react';

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
        setCurrentPage('admin');
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
    if (page === 'admin' && isAdmin) {
      fetchAnalytics();
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-8">
              <div className="text-3xl font-bold text-primary cursor-pointer" onClick={() => changePage('home')}>
                P
              </div>
              <div className="hidden md:flex space-x-6">
                <button
                  onClick={() => changePage('home')}
                  className={`text-sm font-medium transition-colors hover:text-primary ${
                    currentPage === 'home' ? 'text-primary' : 'text-muted-foreground'
                  }`}
                >
                  Home
                </button>
                <div className="relative group">
                  <button className="text-sm font-medium text-muted-foreground hover:text-primary">
                    Reviews
                  </button>
                  <div className="absolute hidden group-hover:block pt-2">
                    <div className="bg-card border rounded-lg shadow-lg p-2 space-y-1">
                      <button
                        onClick={() => changePage('blogs')}
                        className="block w-full text-left px-4 py-2 text-sm hover:bg-accent rounded"
                      >
                        Blogs
                      </button>
                      <button
                        onClick={() => changePage('movies')}
                        className="block w-full text-left px-4 py-2 text-sm hover:bg-accent rounded"
                      >
                        Movies
                      </button>
                      <button
                        onClick={() => changePage('books')}
                        className="block w-full text-left px-4 py-2 text-sm hover:bg-accent rounded"
                      >
                        Books
                      </button>
                      <button
                        onClick={() => changePage('products')}
                        className="block w-full text-left px-4 py-2 text-sm hover:bg-accent rounded"
                      >
                        Products
                      </button>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => changePage('about')}
                  className={`text-sm font-medium transition-colors hover:text-primary ${
                    currentPage === 'about' ? 'text-primary' : 'text-muted-foreground'
                  }`}
                >
                  About
                </button>
              </div>
            </div>
            <div>
              {isAdmin ? (
                <div className="flex items-center space-x-4">
                  <Button onClick={() => changePage('admin')} variant="outline" size="sm">
                    <BarChart3 className="w-4 h-4 mr-2" />
                    Dashboard
                  </Button>
                  <Button onClick={handleLogout} variant="outline" size="sm">
                    <LogOut className="w-4 h-4 mr-2" />
                    Logout
                  </Button>
                </div>
              ) : (
                <Button onClick={() => setShowAdminLogin(true)} variant="outline" size="sm">
                  <LogIn className="w-4 h-4 mr-2" />
                  Admin
                </Button>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {currentPage === 'home' && (
          <div>
            {/* Hero Section */}
            <div className="text-center py-16 mb-12">
              <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-primary text-primary-foreground text-4xl font-bold mb-6">
                P
              </div>
              <h1 className="text-5xl font-bold mb-4">Welcome to My Portfolio</h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Explore my thoughts and reviews on blogs, movies, books, and products.
              </p>
            </div>

            {/* Recent Reviews */}
            <div>
              <h2 className="text-3xl font-bold mb-6">Recent Reviews</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredReviews.map((review) => (
                  <Card key={review.id} className="hover:shadow-lg transition-shadow">
                    {review.image && (
                      <img
                        src={review.image}
                        alt={review.title}
                        className="w-full h-48 object-cover rounded-t-lg"
                      />
                    )}
                    <CardHeader>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-medium text-muted-foreground uppercase">
                          {review.type}
                        </span>
                      </div>
                      <CardTitle>{review.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground line-clamp-3">{review.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
              {filteredReviews.length === 0 && (
                <p className="text-center text-muted-foreground py-12">No reviews yet.</p>
              )}
            </div>
          </div>
        )}

        {(currentPage === 'blogs' || currentPage === 'movies' || currentPage === 'books' || currentPage === 'products') && (
          <div>
            <h1 className="text-4xl font-bold mb-8 capitalize">{currentPage}</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredReviews.map((review) => (
                <Card key={review.id} className="hover:shadow-lg transition-shadow">
                  {review.image && (
                    <img
                      src={review.image}
                      alt={review.title}
                      className="w-full h-48 object-cover rounded-t-lg"
                    />
                  )}
                  <CardHeader>
                    <CardTitle>{review.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{review.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
            {filteredReviews.length === 0 && (
              <p className="text-center text-muted-foreground py-12">No {currentPage} yet.</p>
            )}
          </div>
        )}

        {currentPage === 'about' && (
          <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl font-bold mb-8">About Me</h1>
            <Card>
              <CardContent className="pt-6">
                {isAdmin && aboutEditMode ? (
                  <div className="space-y-4">
                    <Textarea
                      value={aboutEditContent}
                      onChange={(e) => setAboutEditContent(e.target.value)}
                      rows={10}
                      className="w-full"
                    />
                    <div className="flex space-x-2">
                      <Button onClick={handleSaveAbout}>Save</Button>
                      <Button onClick={() => setAboutEditMode(false)} variant="outline">
                        Cancel
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div>
                    <p className="text-lg whitespace-pre-wrap">{aboutContent}</p>
                    {isAdmin && (
                      <Button
                        onClick={() => {
                          setAboutEditContent(aboutContent);
                          setAboutEditMode(true);
                        }}
                        className="mt-4"
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

        {currentPage === 'admin' && isAdmin && (
          <div>
            <h1 className="text-4xl font-bold mb-8">Admin Dashboard</h1>
            <Tabs defaultValue="analytics">
              <TabsList>
                <TabsTrigger value="analytics">Analytics</TabsTrigger>
                <TabsTrigger value="reviews">Manage Reviews</TabsTrigger>
              </TabsList>

              <TabsContent value="analytics">
                {analytics && (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <Card>
                      <CardHeader>
                        <CardTitle>Total Views</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-4xl font-bold">{analytics.totalViews || 0}</p>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardHeader>
                        <CardTitle>Home Page</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-4xl font-bold">{analytics.pageViews?.home || 0}</p>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardHeader>
                        <CardTitle>Blogs</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-4xl font-bold">{analytics.pageViews?.blogs || 0}</p>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardHeader>
                        <CardTitle>Movies</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-4xl font-bold">{analytics.pageViews?.movies || 0}</p>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardHeader>
                        <CardTitle>Books</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-4xl font-bold">{analytics.pageViews?.books || 0}</p>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardHeader>
                        <CardTitle>Products</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-4xl font-bold">{analytics.pageViews?.products || 0}</p>
                      </CardContent>
                    </Card>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="reviews">
                <div className="mb-4">
                  <Button
                    onClick={() => {
                      setEditingReview(null);
                      setReviewForm({ type: 'blog', title: '', image: '', description: '' });
                      setShowReviewModal(true);
                    }}
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add Review
                  </Button>
                </div>
                <div className="space-y-4">
                  {reviews.map((review) => (
                    <Card key={review.id}>
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <div>
                            <CardTitle>{review.title}</CardTitle>
                            <CardDescription className="uppercase">{review.type}</CardDescription>
                          </div>
                          <div className="flex space-x-2">
                            <Button
                              onClick={() => handleEditReview(review)}
                              variant="outline"
                              size="sm"
                            >
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button
                              onClick={() => handleDeleteReview(review.id)}
                              variant="destructive"
                              size="sm"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-muted-foreground line-clamp-2">{review.description}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t bg-card mt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              © 2025 Portfolio. All rights reserved.
            </p>
            {!isAdmin && (
              <button
                onClick={() => setShowAdminLogin(true)}
                className="text-sm text-muted-foreground hover:text-primary"
              >
                Admin Access
              </button>
            )}
          </div>
        </div>
      </footer>

      {/* Admin Login Modal */}
      <Dialog open={showAdminLogin} onOpenChange={setShowAdminLogin}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Admin Login</DialogTitle>
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
              />
            </div>
            <Button type="submit" className="w-full">
              Login
            </Button>
          </form>
        </DialogContent>
      </Dialog>

      {/* Review Modal */}
      <Dialog open={showReviewModal} onOpenChange={setShowReviewModal}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>{editingReview ? 'Edit Review' : 'Add Review'}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSaveReview} className="space-y-4">
            <div>
              <Label htmlFor="type">Type</Label>
              <Select
                value={reviewForm.type}
                onValueChange={(value) => setReviewForm({ ...reviewForm, type: value })}
              >
                <SelectTrigger>
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
              />
            </div>
            <div>
              <Label htmlFor="image">Image URL</Label>
              <Input
                id="image"
                value={reviewForm.image}
                onChange={(e) => setReviewForm({ ...reviewForm, image: e.target.value })}
                placeholder="https://example.com/image.jpg"
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
              />
            </div>
            <div className="flex space-x-2">
              <Button type="submit">Save</Button>
              <Button
                type="button"
                onClick={() => {
                  setShowReviewModal(false);
                  setEditingReview(null);
                }}
                variant="outline"
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