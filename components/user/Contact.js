'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Send, MessageSquare, Zap } from 'lucide-react';
import { useTheme } from '@/components/theme/ThemeProvider';

export default function Contact({
  contactForm,
  setContactForm,
  handleContactSubmit,
}) {
  const { darkMode } = useTheme();
  return (
    <div className="min-h-screen max-w-2xl mx-auto relative pt-8">

      <Card className={`backdrop-blur-sm border shadow-2xl overflow-hidden relative ${
        darkMode 
          ? 'bg-slate-900/50 border-purple-500/10' 
          : 'bg-white/80 border-purple-100'
      }`}>
        {/* Top Gradient Line */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-500"></div>
        
        <CardHeader className="pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-600 to-cyan-500 flex items-center justify-center shadow-lg shadow-purple-500/25">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <div>
              <CardTitle className={`text-xl ${darkMode ? 'text-white' : 'text-slate-800'}`}>Send a Message</CardTitle>
              <CardDescription className={darkMode ? 'text-slate-400' : 'text-slate-600'}>
                I'll get back to you as soon as possible.
              </CardDescription>
            </div>
          </div>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleContactSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name" className={darkMode ? 'text-slate-300' : 'text-slate-700'}>Name</Label>
                <Input 
                  id="name" 
                  value={contactForm.name} 
                  onChange={(e) => setContactForm({...contactForm, name: e.target.value})} 
                  placeholder="Your name" 
                  required 
                  className={`${
                    darkMode 
                      ? 'bg-slate-800/50 border-purple-500/20 focus:border-purple-500/50 text-white placeholder:text-slate-500' 
                      : 'bg-white border-purple-200 focus:border-purple-400 text-slate-800 placeholder:text-slate-400'
                  } focus:ring-purple-500/20`}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email" className={darkMode ? 'text-slate-300' : 'text-slate-700'}>Email</Label>
                <Input 
                  id="email" 
                  type="email" 
                  value={contactForm.email} 
                  onChange={(e) => setContactForm({...contactForm, email: e.target.value})} 
                  placeholder="your@email.com" 
                  required 
                  className={`${
                    darkMode 
                      ? 'bg-slate-800/50 border-purple-500/20 focus:border-purple-500/50 text-white placeholder:text-slate-500' 
                      : 'bg-white border-purple-200 focus:border-purple-400 text-slate-800 placeholder:text-slate-400'
                  } focus:ring-purple-500/20`}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="subject" className={darkMode ? 'text-slate-300' : 'text-slate-700'}>Subject</Label>
              <Input 
                id="subject" 
                value={contactForm.subject} 
                onChange={(e) => setContactForm({...contactForm, subject: e.target.value})} 
                placeholder="What's this about?" 
                required 
                className={`${
                  darkMode 
                    ? 'bg-slate-800/50 border-purple-500/20 focus:border-purple-500/50 text-white placeholder:text-slate-500' 
                    : 'bg-white border-purple-200 focus:border-purple-400 text-slate-800 placeholder:text-slate-400'
                } focus:ring-purple-500/20`}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="message" className={darkMode ? 'text-slate-300' : 'text-slate-700'}>Message</Label>
              <Textarea 
                id="message" 
                value={contactForm.message} 
                onChange={(e) => setContactForm({...contactForm, message: e.target.value})} 
                placeholder="Tell me about your project..." 
                rows={5} 
                required 
                className={`resize-none ${
                  darkMode 
                    ? 'bg-slate-800/50 border-purple-500/20 focus:border-purple-500/50 text-white placeholder:text-slate-500' 
                    : 'bg-white border-purple-200 focus:border-purple-400 text-slate-800 placeholder:text-slate-400'
                } focus:ring-purple-500/20`}
              />
            </div>
            <Button 
              type="submit" 
              className="w-full bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-500 hover:to-cyan-500 text-white shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 transition-all duration-300 hover:scale-[1.02]"
              size="lg"
            >
              <Send className="w-5 h-5 mr-2" />
              Send Message
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Additional Contact Info */}
      <div className="mt-12 text-center">
        <p className={`text-sm ${darkMode ? 'text-slate-500' : 'text-slate-500'}`}>
          Or reach out directly at{' '}
          <a href="mailto:hello@portfolio.dev" className="text-purple-500 hover:text-purple-400 transition-colors">
            hello@portfolio.dev
          </a>
        </p>
      </div>
    </div>
  );
}
