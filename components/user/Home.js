'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Brain, Mail, ChevronRight, Sparkles, Zap, Binary } from 'lucide-react';
import { useTheme } from '@/components/theme/ThemeProvider';

export default function Home({
  typedText,
  filteredReviews,
  changePage,
}) {
  const router = useRouter();
  const { darkMode } = useTheme();
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="text-center py-24 relative overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {/* Gradient Orbs */}
          <div className={`absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-3xl animate-pulse ${
            darkMode ? 'bg-purple-600/20' : 'bg-purple-400/20'
          }`}></div>
          <div className={`absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full blur-3xl animate-pulse delay-1000 ${
            darkMode ? 'bg-cyan-600/20' : 'bg-cyan-400/20'
          }`}></div>
          <div className={`absolute top-1/2 left-1/2 w-64 h-64 rounded-full blur-3xl animate-pulse delay-500 ${
            darkMode ? 'bg-pink-600/10' : 'bg-pink-400/15'
          }`}></div>
          
          {/* Grid Pattern */}
          <div className={`absolute inset-0 ${
            darkMode 
              ? 'bg-[linear-gradient(rgba(139,92,246,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(139,92,246,0.03)_1px,transparent_1px)]' 
              : 'bg-[linear-gradient(rgba(139,92,246,0.07)_1px,transparent_1px),linear-gradient(90deg,rgba(139,92,246,0.07)_1px,transparent_1px)]'
          } bg-[size:60px_60px]`}></div>
          
          {/* Floating Icons */}
          <Brain className={`absolute top-20 left-20 w-8 h-8 animate-bounce ${darkMode ? 'text-purple-500/20' : 'text-purple-500/30'}`} style={{ animationDelay: '0s', animationDuration: '3s' }} />
          <Zap className={`absolute top-32 right-32 w-6 h-6 animate-bounce ${darkMode ? 'text-cyan-500/20' : 'text-cyan-500/30'}`} style={{ animationDelay: '0.5s', animationDuration: '2.5s' }} />
          <Binary className={`absolute bottom-32 left-32 w-7 h-7 animate-bounce ${darkMode ? 'text-pink-500/20' : 'text-pink-500/30'}`} style={{ animationDelay: '1s', animationDuration: '3.5s' }} />
          <Sparkles className={`absolute bottom-20 right-20 w-8 h-8 animate-bounce ${darkMode ? 'text-purple-500/20' : 'text-purple-500/30'}`} style={{ animationDelay: '1.5s', animationDuration: '2s' }} />
        </div>

        {/* Greeting */}
        <div className="mb-6 animate-in fade-in-0 slide-in-from-bottom-4 duration-700">
          <div className="inline-block">
            <h1 className="text-7xl font-bold flex items-center justify-center gap-4">
              <span className="text-6xl animate-bounce">🙏</span>
              <span className="bg-gradient-to-r from-purple-600 via-pink-500 to-cyan-500 bg-clip-text text-transparent">
                Namaskar
              </span>
            </h1>
          </div>
        </div>

        {/* Welcome Text */}
        <p className={`text-2xl font-medium mb-4 animate-in fade-in-0 slide-in-from-bottom-8 duration-1000 ${
          darkMode ? 'text-slate-300' : 'text-slate-600'
        }`}>
          Welcome to my <span className="text-purple-500">Digital Universe</span>
        </p>

        {/* Typing Animation */}
        <div className="h-14 mb-10 flex items-center justify-center animate-in fade-in-0 slide-in-from-bottom-12 duration-1000">
          <div className={`px-6 py-3 rounded-xl backdrop-blur-sm ${
            darkMode 
              ? 'bg-slate-800/50 border border-purple-500/20' 
              : 'bg-white/70 border border-purple-200 shadow-lg'
          }`}>
            <p className={`text-xl ${darkMode ? 'text-slate-300' : 'text-slate-700'}`}>
              I'm a <span className="font-bold bg-gradient-to-r from-purple-600 to-cyan-500 bg-clip-text text-transparent">{typedText}</span>
              <span className="inline-block w-0.5 h-6 bg-purple-500 ml-1 animate-pulse"></span>
            </p>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex items-center justify-center gap-4 animate-in fade-in-0 zoom-in-95 duration-1000 delay-200">
          <Button
            onClick={() => {
              changePage?.('contact');
              router.push('/contact');
            }}
            className="bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-500 hover:to-cyan-500 text-white shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 transition-all duration-300 hover:scale-105 px-8"
            size="lg"
          >
            <Mail className="w-5 h-5 mr-2" />
            Get In Touch
          </Button>
          <Button
            onClick={() => changePage('about')}
            variant="outline"
            className={`transition-all duration-300 hover:scale-105 px-8 ${
              darkMode 
                ? 'border-purple-500/30 text-purple-400 hover:bg-purple-500/10 hover:border-purple-500/50' 
                : 'border-purple-300 text-purple-600 hover:bg-purple-50 hover:border-purple-400'
            }`}
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
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-600 to-cyan-500 flex items-center justify-center shadow-lg shadow-purple-500/25">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <h2 className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-slate-800'}`}>
              Recent <span className="bg-gradient-to-r from-purple-600 to-cyan-500 bg-clip-text text-transparent">Reviews</span>
            </h2>
          </div>
          <Button 
            onClick={() => {
              changePage?.('blogs');
              router.push('/blogs');
            }} 
            variant="ghost"
            className={`transition-all duration-300 ${
              darkMode 
                ? 'text-purple-400 hover:text-purple-300 hover:bg-purple-500/10' 
                : 'text-purple-600 hover:text-purple-700 hover:bg-purple-50'
            }`}
          >
            View All <ChevronRight className="w-4 h-4 ml-1" />
          </Button>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredReviews.map((review, index) => (
            <Card 
              key={review.id} 
              className={`group backdrop-blur-sm border shadow-lg transition-all duration-500 hover:scale-[1.02] cursor-pointer overflow-hidden animate-in fade-in-0 slide-in-from-bottom-4 ${
                darkMode 
                  ? 'bg-slate-900/50 border-purple-500/10 hover:border-purple-500/30 hover:shadow-xl hover:shadow-purple-500/10' 
                  : 'bg-white/80 border-purple-100 hover:border-purple-300 hover:shadow-xl hover:shadow-purple-500/20'
              }`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Image */}
              <div className={`aspect-video overflow-hidden relative ${
                darkMode ? 'bg-gradient-to-br from-slate-800 to-slate-900' : 'bg-gradient-to-br from-purple-50 to-cyan-50'
              }`}>
                {review.image ? (
                  <img 
                    src={review.image} 
                    alt={review.title} 
                    className={`w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 ${
                      darkMode ? 'opacity-80 group-hover:opacity-100' : 'opacity-90 group-hover:opacity-100'
                    }`} 
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <Brain className={`w-16 h-16 ${darkMode ? 'text-purple-500/30' : 'text-purple-300'}`} />
                  </div>
                )}
                {/* Overlay Gradient */}
                <div className={`absolute inset-0 ${
                  darkMode 
                    ? 'bg-gradient-to-t from-slate-900 via-transparent to-transparent' 
                    : 'bg-gradient-to-t from-white/80 via-transparent to-transparent'
                }`}></div>
                
                {/* Type Badge */}
                <div className="absolute top-3 right-3">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium backdrop-blur-sm uppercase tracking-wider ${
                    darkMode 
                      ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30' 
                      : 'bg-purple-100 text-purple-700 border border-purple-200'
                  }`}>
                    {review.type}
                  </span>
                </div>
              </div>

              <CardHeader className="pb-2">
                <CardTitle className={`text-lg transition-colors duration-300 ${
                  darkMode 
                    ? 'text-white group-hover:text-purple-400' 
                    : 'text-slate-800 group-hover:text-purple-600'
                }`}>
                  {review.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className={`text-sm line-clamp-2 ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                  {review.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
