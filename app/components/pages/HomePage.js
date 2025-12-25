'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Mail } from 'lucide-react';

export default function HomePage({ typedText, filteredReviews, changePage }) {
  return (
    <div>
      {/* Hero Section */}
      <div className="text-center py-20 mb-16 relative overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 overflow-hidden -z-10">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-400/10 dark:bg-blue-600/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-400/10 dark:bg-cyan-600/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>
        
        {/* Namaskar Greeting */}
        <div className="mb-6 animate-in fade-in-0 slide-in-from-bottom-4 duration-700">
          <div className="inline-block">
            <h1 className="text-7xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 dark:from-blue-400 dark:to-cyan-400 bg-clip-text text-transparent flex items-center gap-4 justify-center">
              <span className="text-6xl animate-bounce">🙏</span>
              <span>Namaskar</span>
            </h1>
          </div>
        </div>

        {/* Welcome Text */}
        <p className=\"text-2xl font-semibold text-slate-600 dark:text-slate-300 mb-4 animate-in fade-in-0 slide-in-from-bottom-8 duration-1000\">
          Welcome to my Digital World!
        </p>

        {/* Typing Animation */}
        <div className=\"h-12 mb-8 flex items-center justify-center animate-in fade-in-0 slide-in-from-bottom-12 duration-1000\">
          <p className=\"text-xl text-blue-600 dark:text-blue-400 font-medium\">
            I'm a <span className=\"font-bold\">{typedText}</span>
            <span className=\"inline-block w-0.5 h-6 bg-blue-600 dark:bg-blue-400 ml-1 animate-pulse\"></span>
          </p>
        </div>

        {/* CTA Button */}
        <Button
          onClick={() => changePage('contact')}
          className=\"bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 animate-in fade-in-0 zoom-in-95 duration-1000 delay-200\"
          size=\"lg\"
        >
          <Mail className=\"w-5 h-5 mr-2\" />
          Get In Touch
        </Button>
      </div>

      {/* Recent Reviews */}
      <div>
        <h2 className=\"text-4xl font-bold mb-8 text-center text-blue-800 dark:text-blue-400 animate-in fade-in-0 slide-in-from-bottom-4 duration-700\">
          Recent Reviews
        </h2>
        <div className=\"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8\">
          {filteredReviews.map((review, index) => (
            <Card 
              key={review.id} 
              className=\"overflow-hidden hover:shadow-2xl dark:hover:shadow-blue-900/50 transition-all duration-500 hover:scale-105 hover:-translate-y-2 border-2 border-blue-100 dark:border-slate-700 bg-white dark:bg-slate-800 animate-in fade-in-0 slide-in-from-bottom-4 group cursor-pointer\"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {review.image && (
                <div className=\"relative overflow-hidden\">
                  <img
                    src={review.image}
                    alt={review.title}
                    className=\"w-full h-52 object-cover transition-all duration-700 group-hover:scale-110 group-hover:rotate-2\"
                  />
                  <div className=\"absolute inset-0 bg-gradient-to-t from-blue-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300\"></div>
                </div>
              )}
              <CardHeader>
                <div className=\"flex items-center justify-between mb-2\">
                  <span className=\"text-xs font-bold text-white bg-gradient-to-r from-blue-600 to-cyan-600 px-3 py-1 rounded-full uppercase shadow-md group-hover:scale-110 transition-transform duration-300\">
                    {review.type}
                  </span>
                </div>
                <CardTitle className=\"group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300 text-slate-800 dark:text-slate-100\">{review.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className=\"text-slate-600 dark:text-slate-400 line-clamp-3\">{review.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
        {filteredReviews.length === 0 && (
          <div className=\"text-center py-20\">
            <div className=\"text-6xl mb-4 animate-bounce\">📝</div>
            <p className=\"text-xl text-slate-600 dark:text-slate-400\">No reviews yet. Start creating amazing content!</p>
          </div>
        )}
      </div>
    </div>
  );
}
