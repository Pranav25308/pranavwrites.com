'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { LogIn, Shield } from 'lucide-react';

export default function AdminPage() {
  const router = useRouter();
  const [loginForm, setLoginForm] = useState({ username: '', password: '' });
  const [isAdmin, setIsAdmin] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('adminToken');
      if (token === 'admin-token-123') {
        setIsAdmin(true);
      }
      setDarkMode(localStorage.getItem('darkMode') === 'true');
    }
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    if (loginForm.username === 'admin' && loginForm.password === 'admin') {
      localStorage.setItem('adminToken', 'admin-token-123');
      setIsAdmin(true);
    } else {
      alert('Invalid credentials! Use username: admin, password: admin');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    setIsAdmin(false);
  };

  if (isAdmin) {
    return (
      <div 
        data-testid="admin-dashboard"
        className={`min-h-screen transition-colors duration-300 ${
          darkMode 
            ? 'bg-slate-950 text-white' 
            : 'bg-gradient-to-br from-slate-50 via-purple-50/30 to-cyan-50/30 text-slate-900'
        }`}
      >
        <main className="container mx-auto px-4 py-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">
              <span className="bg-gradient-to-r from-purple-600 to-cyan-500 bg-clip-text text-transparent">
                Admin Dashboard
              </span>
            </h1>
            <p className={darkMode ? 'text-slate-400' : 'text-slate-600'}>
              Welcome to the admin panel
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <Card 
              className={`cursor-pointer transition-all duration-300 hover:scale-105 ${
                darkMode 
                  ? 'bg-slate-900/50 border-purple-500/20 hover:border-purple-500/40' 
                  : 'bg-white/80 border-purple-200 hover:border-purple-400'
              }`}
              onClick={() => router.push('/admin/analytics')}
            >
              <CardHeader>
                <CardTitle className={darkMode ? 'text-white' : 'text-slate-800'}>Analytics</CardTitle>
                <CardDescription>View site statistics</CardDescription>
              </CardHeader>
            </Card>

            <Card 
              className={`cursor-pointer transition-all duration-300 hover:scale-105 ${
                darkMode 
                  ? 'bg-slate-900/50 border-purple-500/20 hover:border-purple-500/40' 
                  : 'bg-white/80 border-purple-200 hover:border-purple-400'
              }`}
              onClick={() => router.push('/admin/users')}
            >
              <CardHeader>
                <CardTitle className={darkMode ? 'text-white' : 'text-slate-800'}>Users</CardTitle>
                <CardDescription>Manage user roles</CardDescription>
              </CardHeader>
            </Card>

            <Card 
              className={`cursor-pointer transition-all duration-300 hover:scale-105 ${
                darkMode 
                  ? 'bg-slate-900/50 border-purple-500/20 hover:border-purple-500/40' 
                  : 'bg-white/80 border-purple-200 hover:border-purple-400'
              }`}
              onClick={() => router.push('/admin/settings')}
            >
              <CardHeader>
                <CardTitle className={darkMode ? 'text-white' : 'text-slate-800'}>Settings</CardTitle>
                <CardDescription>Configure site settings</CardDescription>
              </CardHeader>
            </Card>
          </div>

          <div className="text-center mt-12">
            <Button 
              onClick={handleLogout}
              data-testid="admin-logout"
              variant="outline"
              className={darkMode 
                ? 'border-red-500/30 text-red-400 hover:bg-red-500/10' 
                : 'border-red-300 text-red-600 hover:bg-red-50'
              }
            >
              Logout
            </Button>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div 
      data-testid="admin-login-page"
      className={`min-h-screen flex items-center justify-center transition-colors duration-300 ${
        darkMode 
          ? 'bg-slate-950 text-white' 
          : 'bg-gradient-to-br from-slate-50 via-purple-50/30 to-cyan-50/30 text-slate-900'
      }`}
    >
      <Card className={`w-full max-w-md ${
        darkMode 
          ? 'bg-slate-900/95 backdrop-blur-xl border-purple-500/20 shadow-2xl shadow-purple-500/10' 
          : 'bg-white/95 backdrop-blur-xl border-purple-200 shadow-2xl'
      }`}>
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-500 rounded-t-lg"></div>
        <CardHeader className="text-center">
          <div className="mx-auto w-16 h-16 rounded-full bg-gradient-to-br from-purple-600 to-cyan-500 flex items-center justify-center mb-4 shadow-lg shadow-purple-500/25">
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
                  ? 'bg-slate-800/50 border-purple-500/20 focus:border-purple-500/50 text-white placeholder:text-slate-500' 
                  : 'bg-white border-purple-200 focus:border-purple-400'
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
                  ? 'bg-slate-800/50 border-purple-500/20 focus:border-purple-500/50 text-white placeholder:text-slate-500' 
                  : 'bg-white border-purple-200 focus:border-purple-400'
                }
              />
            </div>
            <Button 
              type="submit"
              data-testid="admin-login-button"
              className="w-full bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-500 hover:to-cyan-500 text-white shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 transition-all duration-300"
            >
              <LogIn className="w-4 h-4 mr-2" />
              Login
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
