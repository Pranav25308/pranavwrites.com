'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Brain, Mail, ChevronRight, Sparkles, Zap, Binary } from 'lucide-react';

export default function Home({ 
  typedText, 
  filteredReviews, 
  changePage 
}) {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="text-center py-24 relative overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {/* Gradient Orbs */}
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-cyan-600/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-pink-600/10 rounded-full blur-3xl animate-pulse delay-500"></div>
          
          {/* Grid Pattern */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(139,92,246,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(139,92,246,0.03)_1px,transparent_1px)] bg-[size:60px_60px]"></div>
          
          {/* Floating Icons */}
          <Brain className="absolute top-20 left-20 w-8 h-8 text-purple-500/20 animate-bounce" style={{ animationDelay: '0s', animationDuration: '3s' }} />
          <Zap className="absolute top-32 right-32 w-6 h-6 text-cyan-500/20 animate-bounce" style={{ animationDelay: '0.5s', animationDuration: '2.5s' }} />
          <Binary className="absolute bottom-32 left-32 w-7 h-7 text-pink-500/20 animate-bounce" style={{ animationDelay: '1s', animationDuration: '3.5s' }} />
          <Sparkles className="absolute bottom-20 right-20 w-8 h-8 text-purple-500/20 animate-bounce" style={{ animationDelay: '1.5s', animationDuration: '2s' }} />
        </div>
        
        {/* AI Badge */}
        <div className="mb-8 animate-in fade-in-0 slide-in-from-bottom-4 duration-700">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-sm">
            <Sparkles className="w-4 h-4" />
            <span>AI-Powered Developer</span>
          </div>
        </div>

        {/* Greeting */}
        <div className="mb-6 animate-in fade-in-0 slide-in-from-bottom-4 duration-700 delay-100">
          <div className="inline-block">
            <h1 className="text-7xl font-bold flex items-center justify-center gap-4">
              <span className="text-6xl animate-bounce">🙏</span>
              <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
                Namaskar
              </span>
            </h1>
          </div>
        </div>

        {/* Welcome Text */}
        <p className="text-2xl font-medium text-slate-300 mb-4 animate-in fade-in-0 slide-in-from-bottom-8 duration-1000">
          Welcome to my <span className="text-purple-400">Digital Universe</span>
        </p>

        {/* Typing Animation */}
        <div className="h-14 mb-10 flex items-center justify-center animate-in fade-in-0 slide-in-from-bottom-12 duration-1000">
          <div className="px-6 py-3 rounded-xl bg-slate-800/50 border border-purple-500/20 backdrop-blur-sm">
            <p className="text-xl text-slate-300">
              I'm a <span className="font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">{typedText}</span>
              <span className="inline-block w-0.5 h-6 bg-purple-500 ml-1 animate-pulse"></span>
            </p>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex items-center justify-center gap-4 animate-in fade-in-0 zoom-in-95 duration-1000 delay-200">
          <Button
            onClick={() => changePage('contact')}
            className="bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-500 hover:to-cyan-500 text-white shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 transition-all duration-300 hover:scale-105 px-8"
            size="lg"
          >
            <Mail className="w-5 h-5 mr-2" />
            Get In Touch
          </Button>
          <Button
            onClick={() => changePage('about')}
            variant="outline"
            className="border-purple-500/30 text-purple-400 hover:bg-purple-500/10 hover:border-purple-500/50 transition-all duration-300 hover:scale-105 px-8"
            size="lg"
          >
            Learn More
          </Button>
        </div>
      </div>

      {/* Recent Reviews Section */}
      <div className="mt-16 relative">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-600 to-cyan-500 flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-white">
              Recent <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">Reviews</span>
            </h2>
          </div>
          <Button 
            onClick={() => changePage('blogs')} 
            variant="ghost"
            className="text-purple-400 hover:text-purple-300 hover:bg-purple-500/10 transition-all duration-300"
          >
            View All <ChevronRight className="w-4 h-4 ml-1" />
          </Button>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredReviews.map((review, index) => (
            <Card 
              key={review.id} 
              className="group bg-slate-900/50 backdrop-blur-sm border border-purple-500/10 hover:border-purple-500/30 shadow-lg hover:shadow-xl hover:shadow-purple-500/10 transition-all duration-500 hover:scale-[1.02] cursor-pointer overflow-hidden animate-in fade-in-0 slide-in-from-bottom-4"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Image */}
              <div className="aspect-video bg-gradient-to-br from-slate-800 to-slate-900 overflow-hidden relative">
                {review.image ? (
                  <img 
                    src={review.image} 
                    alt={review.title} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 opacity-80 group-hover:opacity-100" 
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <Brain className="w-16 h-16 text-purple-500/30" />
                  </div>
                )}
                {/* Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent"></div>
                
                {/* Type Badge */}
                <div className="absolute top-3 right-3">
                  <span className="px-3 py-1 rounded-full text-xs font-medium bg-purple-500/20 text-purple-300 border border-purple-500/30 backdrop-blur-sm uppercase tracking-wider">
                    {review.type}
                  </span>
                </div>
              </div>

              <CardHeader className="pb-2">
                <CardTitle className="text-lg text-white group-hover:text-purple-400 transition-colors duration-300">
                  {review.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-400 text-sm line-clamp-2">{review.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
