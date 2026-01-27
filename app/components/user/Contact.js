'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Send } from 'lucide-react';

export default function Contact({ 
  contactForm, 
  setContactForm, 
  handleContactSubmit 
}) {
  return (
    <div className="min-h-screen max-w-2xl mx-auto">
      <h1 className="text-5xl font-bold mb-12 text-center text-blue-800 dark:text-blue-400 animate-in fade-in-0 zoom-in-95 duration-500">
        Get In Touch
      </h1>
      
      <Card className="shadow-2xl dark:shadow-blue-900/50 border-2 border-blue-100 dark:border-slate-700 bg-white dark:bg-slate-800 animate-in fade-in-0 slide-in-from-bottom-4 duration-700">
        <CardHeader>
          <CardTitle className="text-2xl text-slate-800 dark:text-slate-100">Send me a message</CardTitle>
          <CardDescription className="text-slate-600 dark:text-slate-400">
            I'd love to hear from you! Fill out the form below.
          </CardDescription>
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
  );
}
