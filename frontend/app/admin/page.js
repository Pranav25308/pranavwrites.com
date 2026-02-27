'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { LogIn, Shield, BarChart3, Users, Settings, MessageSquare } from 'lucide-react';

export default function AdminPage() {
  const router = useRouter();
  const [loginForm, setLoginForm] = useState({ username: '', password: '' });
  const [isAdmin, setIsAdmin] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('adminToken');
      if (token === 'admin-token-123') {
        setIsAdmin(true);
      }
      setDarkMode(localStorage.getItem('darkMode') === 'true');
      setIsLoading(false);
    }
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    if (loginForm.username === 'admin' && loginForm.password === 'admin') {
      localStorage.setItem('adminToken', 'admin-token-123');
      setIsAdmin(true);
      // Force re-render by reloading the page to update layout
      window.location.reload();
    } else {
      alert('Invalid credentials! Use username: admin, password: admin');
    }
  };

  // Show loading state
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  // Show dashboard if logged in
  if (isAdmin) {
    return (
      <div 
        data-testid="admin-dashboard"
        className={`min-h-screen transition-colors duration-300 ${
          darkMode 
            ? 'bg-slate-950 text-white' 
            : 'bg-gradient-to-br from-slate-50 via-blue-50/30 to-cyan-50/30 text-slate-900'
        }`}
      >
        <main className="container mx-auto px-4 py-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">
              <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
                Admin Dashboard
              </span>
            </h1>
            <p className={darkMode ? 'text-slate-400' : 'text-slate-600'}>
              Welcome back! Manage your portfolio from here.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            <Card 
              data-testid="dashboard-card-analytics"
              className={`cursor-pointer transition-all duration-300 hover:scale-105 ${
                darkMode 
                  ? 'bg-slate-900/50 border-blue-500/20 hover:border-blue-500/40' 
                  : 'bg-white/80 border-blue-200 hover:border-blue-400'
              }`}
              onClick={() => router.push('/admin/analytics')}
            >
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-600 to-cyan-500 flex items-center justify-center mb-3">
                  <BarChart3 className="w-6 h-6 text-white" />
                </div>
                <CardTitle className={darkMode ? 'text-white' : 'text-slate-800'}>Analytics</CardTitle>
                <CardDescription>View site statistics and visitor data</CardDescription>
              </CardHeader>
            </Card>

            <Card 
              data-testid="dashboard-card-users"
              className={`cursor-pointer transition-all duration-300 hover:scale-105 ${
                darkMode 
                  ? 'bg-slate-900/50 border-purple-500/20 hover:border-purple-500/40' 
                  : 'bg-white/80 border-purple-200 hover:border-purple-400'
              }`}
              onClick={() => router.push('/admin/users')}
            >
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-purple-600 to-pink-500 flex items-center justify-center mb-3">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <CardTitle className={darkMode ? 'text-white' : 'text-slate-800'}>Users & Roles</CardTitle>
                <CardDescription>Manage typing roles and user settings</CardDescription>
              </CardHeader>
            </Card>

            <Card 
              data-testid="dashboard-card-messages"
              className={`cursor-pointer transition-all duration-300 hover:scale-105 ${
                darkMode 
                  ? 'bg-slate-900/50 border-green-500/20 hover:border-green-500/40' 
                  : 'bg-white/80 border-green-200 hover:border-green-400'
              }`}
              onClick={() => router.push('/admin/analytics')}
            >
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-green-600 to-emerald-500 flex items-center justify-center mb-3">
                  <MessageSquare className="w-6 h-6 text-white" />
                </div>
                <CardTitle className={darkMode ? 'text-white' : 'text-slate-800'}>Messages</CardTitle>
                <CardDescription>View contact form submissions</CardDescription>
              </CardHeader>
            </Card>

            <Card 
              data-testid="dashboard-card-settings"
              className={`cursor-pointer transition-all duration-300 hover:scale-105 ${
                darkMode 
                  ? 'bg-slate-900/50 border-orange-500/20 hover:border-orange-500/40' 
                  : 'bg-white/80 border-orange-200 hover:border-orange-400'
              }`}
              onClick={() => router.push('/admin/settings')}
            >
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-orange-600 to-red-500 flex items-center justify-center mb-3">
                  <Settings className="w-6 h-6 text-white" />
                </div>
                <CardTitle className={darkMode ? 'text-white' : 'text-slate-800'}>Settings</CardTitle>
                <CardDescription>Configure navigation and site settings</CardDescription>
              </CardHeader>
            </Card>
          </div>

          {/* Quick Stats */}
          <div className="mt-12 max-w-6xl mx-auto">
            <h2 className={`text-2xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-slate-800'}`}>
              Quick Overview
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className={`${darkMode ? 'bg-slate-900/50 border-slate-700' : 'bg-white/80 border-slate-200'}`}>
                <CardContent className="pt-6">
                  <div className="text-center">
                    <p className={`text-4xl font-bold ${darkMode ? 'text-blue-400' : 'text-blue-600'}`}>1,542</p>
                    <p className={darkMode ? 'text-slate-400' : 'text-slate-600'}>Total Visits</p>
                  </div>
                </CardContent>
              </Card>
              <Card className={`${darkMode ? 'bg-slate-900/50 border-slate-700' : 'bg-white/80 border-slate-200'}`}>
                <CardContent className="pt-6">
                  <div className="text-center">
                    <p className={`text-4xl font-bold ${darkMode ? 'text-purple-400' : 'text-purple-600'}`}>876</p>
                    <p className={darkMode ? 'text-slate-400' : 'text-slate-600'}>Unique Visitors</p>
                  </div>
                </CardContent>
              </Card>
              <Card className={`${darkMode ? 'bg-slate-900/50 border-slate-700' : 'bg-white/80 border-slate-200'}`}>
                <CardContent className="pt-6">
                  <div className="text-center">
                    <p className={`text-4xl font-bold ${darkMode ? 'text-green-400' : 'text-green-600'}`}>3</p>
                    <p className={darkMode ? 'text-slate-400' : 'text-slate-600'}>New Messages</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    );
  }

  // Show login form if not logged in
  return (
    <div 
      data-testid="admin-login-page"
      className={`min-h-screen flex items-center justify-center transition-colors duration-300 ${
        darkMode 
          ? 'bg-slate-950 text-white' 
          : 'bg-gradient-to-br from-slate-50 via-blue-50/30 to-cyan-50/30 text-slate-900'
      }`}
    >
      <Card className={`w-full max-w-md relative overflow-hidden ${
        darkMode 
          ? 'bg-slate-900/95 backdrop-blur-xl border-blue-500/20 shadow-2xl shadow-blue-500/10' 
          : 'bg-white/95 backdrop-blur-xl border-blue-200 shadow-2xl'
      }`}>
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-cyan-500 to-blue-500"></div>
        <CardHeader className="text-center">
          <div className="mx-auto w-16 h-16 rounded-full bg-gradient-to-br from-blue-600 to-cyan-500 flex items-center justify-center mb-4 shadow-lg shadow-blue-500/25">
            <Shield className="w-8 h-8 text-white" />
          </div>
          <CardTitle className={`text-2xl ${darkMode ? 'text-white' : 'text-slate-800'}`}>
            Admin Access
          </CardTitle>
          <CardDescription className={darkMode ? 'text-slate-400' : 'text-slate-600'}>
            Enter your credentials to access the admin panel
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username" className={darkMode ? 'text-slate-300' : 'text-slate-700'}>
                Username
              </Label>
              <Input 
                id="username"
                data-testid="admin-username"
                value={loginForm.username} 
                onChange={(e) => setLoginForm({...loginForm, username: e.target.value})} 
                placeholder="admin" 
                required 
                className={darkMode 
                  ? 'bg-slate-800/50 border-blue-500/20 focus:border-blue-500/50 text-white placeholder:text-slate-500' 
                  : 'bg-white border-blue-200 focus:border-blue-400'
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className={darkMode ? 'text-slate-300' : 'text-slate-700'}>
                Password
              </Label>
              <Input 
                id="password"
                data-testid="admin-password"
                type="password" 
                value={loginForm.password} 
                onChange={(e) => setLoginForm({...loginForm, password: e.target.value})} 
                placeholder="••••••••" 
                required 
                className={darkMode 
                  ? 'bg-slate-800/50 border-blue-500/20 focus:border-blue-500/50 text-white placeholder:text-slate-500' 
                  : 'bg-white border-blue-200 focus:border-blue-400'
                }
              />
            </div>
            <Button 
              type="submit"
              data-testid="admin-login-button"
              className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 transition-all duration-300"
            >
              <LogIn className="w-4 h-4 mr-2" />
              Login
            </Button>
          </form>
          <p className={`text-xs text-center mt-4 ${darkMode ? 'text-slate-500' : 'text-slate-400'}`}>
            Demo credentials: admin / admin
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
