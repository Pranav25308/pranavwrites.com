'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { LogIn } from 'lucide-react';

export default function AdminLoginPage() {
  const router = useRouter();
  const [form, setForm] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);


  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: form.username, password: form.password }),
      });
      const data = await response.json();

      if (!response.ok || !data.success) {
        setError(data.error || 'Invalid credentials');
        setLoading(false);
        return;
      }

      localStorage.setItem('adminToken', data.token);
      router.push('/admin/visits');
    } catch {
      setError('Unable to sign in. Please try again.');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <Card className="w-full max-w-md bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl border-2 border-purple-200 dark:border-purple-500/20 shadow-2xl">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-500 rounded-t-lg" />
        <CardHeader>
          <CardTitle className="text-3xl bg-gradient-to-r from-purple-600 to-cyan-600 bg-clip-text text-transparent">
            Admin Access
          </CardTitle>
          <CardDescription>
            Enter your credentials to access the admin panel.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                value={form.username}
                onChange={(e) => setForm({ ...form, username: e.target.value })}
                placeholder="Username"
                required
                autoFocus
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                placeholder="••••••••"
                required
              />
            </div>

            {error && (
              <p className="text-sm text-red-500">{error}</p>
            )}

            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-500 hover:to-cyan-500 text-white shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 transition-all duration-300"
            >
              <LogIn className="w-4 h-4 mr-2" />
              {loading ? 'Signing in...' : 'Login'}
            </Button>

          </form>
        </CardContent>
      </Card>
    </div>
  );
}
