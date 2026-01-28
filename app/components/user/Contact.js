'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Send, MessageSquare, Zap } from 'lucide-react';

export default function Contact({ 
  contactForm, 
  setContactForm, 
  handleContactSubmit 
}) {
  return (
    <div className="min-h-screen max-w-2xl mx-auto relative">
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-20 right-0 w-72 h-72 bg-purple-600/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-0 w-64 h-64 bg-cyan-600/10 rounded-full blur-3xl"></div>
      </div>

      {/* Page Header */}
      <div className="text-center mb-12 relative">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-sm mb-6">
          <MessageSquare className="w-4 h-4" />
          <span>Get In Touch</span>
        </div>
        <h1 className="text-5xl font-bold text-white mb-4">
          Let's <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">Connect</span>
        </h1>
        <p className="text-slate-400 text-lg">
          Have a project in mind? Let's create something amazing together.
        </p>
      </div>
      
      <Card className="bg-slate-900/50 backdrop-blur-sm border border-purple-500/10 shadow-2xl overflow-hidden relative">
        {/* Top Gradient Line */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-500"></div>
        
        <CardHeader className="pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-600 to-cyan-500 flex items-center justify-center">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <div>
              <CardTitle className="text-xl text-white">Send a Message</CardTitle>
              <CardDescription className="text-slate-400">
                I'll get back to you as soon as possible.
              </CardDescription>
            </div>
          </div>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleContactSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-slate-300">Name</Label>
                <Input 
                  id="name" 
                  value={contactForm.name} 
                  onChange={(e) => setContactForm({...contactForm, name: e.target.value})} 
                  placeholder="Your name" 
                  required 
                  className="bg-slate-800/50 border-purple-500/20 focus:border-purple-500/50 text-white placeholder:text-slate-500 focus:ring-purple-500/20"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email" className="text-slate-300">Email</Label>
                <Input 
                  id="email" 
                  type="email" 
                  value={contactForm.email} 
                  onChange={(e) => setContactForm({...contactForm, email: e.target.value})} 
                  placeholder="your@email.com" 
                  required 
                  className="bg-slate-800/50 border-purple-500/20 focus:border-purple-500/50 text-white placeholder:text-slate-500 focus:ring-purple-500/20"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="subject" className="text-slate-300">Subject</Label>
              <Input 
                id="subject" 
                value={contactForm.subject} 
                onChange={(e) => setContactForm({...contactForm, subject: e.target.value})} 
                placeholder="What's this about?" 
                required 
                className="bg-slate-800/50 border-purple-500/20 focus:border-purple-500/50 text-white placeholder:text-slate-500 focus:ring-purple-500/20"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="message" className="text-slate-300">Message</Label>
              <Textarea 
                id="message" 
                value={contactForm.message} 
                onChange={(e) => setContactForm({...contactForm, message: e.target.value})} 
                placeholder="Tell me about your project..." 
                rows={5} 
                required 
                className="bg-slate-800/50 border-purple-500/20 focus:border-purple-500/50 text-white placeholder:text-slate-500 focus:ring-purple-500/20 resize-none"
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
        <p className="text-slate-500 text-sm">
          Or reach out directly at{' '}
          <a href="mailto:hello@portfolio.dev" className="text-purple-400 hover:text-purple-300 transition-colors">
            hello@portfolio.dev
          </a>
        </p>
      </div>
    </div>
  );
}
