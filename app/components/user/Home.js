'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpen, Mail, ChevronRight } from 'lucide-react';

export default function Home({ 
  typedText, 
  filteredReviews, 
  changePage 
}) {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="text-center py-20 relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-blue-400/10 dark:bg-blue-600/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-400/10 dark:bg-cyan-600/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>
        
        {/* Greeting */}
        <div className="mb-6 animate-in fade-in-0 slide-in-from-bottom-4 duration-700">
          <div className="inline-block">
            <h1 className="text-7xl font-bold flex items-center gap-4">
              <span className="text-6xl animate-bounce">🙏</span>
              <span className="bg-gradient-to-r from-blue-600 to-blue-800 dark:from-blue-400 dark:to-cyan-400 bg-clip-text text-transparent">Namaskar</span>
            </h1>
          </div>
        </div>

        {/* Welcome Text */}
        <p className="text-2xl font-semibold text-slate-600 dark:text-slate-300 mb-4 animate-in fade-in-0 slide-in-from-bottom-8 duration-1000">
          Welcome to my Digital World!
        </p>

        {/* Typing Animation */}
        <div className="h-12 mb-8 flex items-center justify-center animate-in fade-in-0 slide-in-from-bottom-12 duration-1000">
          <p className="text-xl text-blue-600 dark:text-blue-400 font-medium">
            I'm a <span className="font-bold">{typedText}</span>
            <span className="inline-block w-0.5 h-6 bg-blue-600 dark:bg-blue-400 ml-1 animate-pulse"></span>
          </p>
        </div>

        {/* CTA Button */}
        <Button
          onClick={() => changePage('contact')}
          className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 animate-in fade-in-0 zoom-in-95 duration-1000 delay-200"
          size="lg"
        >
          <Mail className="w-5 h-5 mr-2" />
          Get In Touch
        </Button>
      </div>

      {/* Recent Reviews Section */}
      <div className="mt-16">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-4xl font-bold text-blue-800 dark:text-blue-400 animate-in fade-in-0 slide-in-from-left-4 duration-500">
            Recent Reviews
          </h2>
          <Button 
            onClick={() => changePage('blogs')} 
            variant="outline"
            className="border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white dark:border-blue-400 dark:text-blue-400 dark:hover:bg-blue-400 dark:hover:text-slate-900 transition-all duration-300 hover:scale-105"
          >
            View All <ChevronRight className="w-4 h-4 ml-2" />
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredReviews.map((review, index) => (
            <Card 
              key={review.id} 
              className="group bg-white dark:bg-slate-800 border-2 border-blue-100 dark:border-slate-700 shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-105 hover:border-blue-300 dark:hover:border-blue-500 cursor-pointer animate-in fade-in-0 slide-in-from-bottom-4"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="aspect-video bg-gradient-to-br from-blue-100 to-cyan-100 dark:from-slate-700 dark:to-slate-600 rounded-t-lg overflow-hidden">
                {review.image ? (
                  <img 
                    src={review.image} 
                    alt={review.title} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <BookOpen className="w-16 h-16 text-blue-300 dark:text-slate-500" />
                  </div>
                )}
              </div>
              <CardHeader>
                <CardTitle className="text-xl text-slate-800 dark:text-slate-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                  {review.title}
                </CardTitle>
                <CardDescription className="uppercase text-blue-600 dark:text-blue-400 font-semibold tracking-wide">
                  {review.type}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600 dark:text-slate-400 line-clamp-2">{review.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
