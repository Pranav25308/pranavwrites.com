'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpen } from 'lucide-react';

export default function Reviews({ 
  currentPage, 
  filteredReviews 
}) {
  const pageTitle = currentPage.charAt(0).toUpperCase() + currentPage.slice(1);

  return (
    <div className="min-h-screen">
      <h1 className="text-5xl font-bold mb-12 text-center text-blue-800 dark:text-blue-400 capitalize animate-in fade-in-0 zoom-in-95 duration-500">
        {pageTitle}
      </h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
            </CardHeader>
            <CardContent>
              <p className="text-slate-600 dark:text-slate-400">{review.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredReviews.length === 0 && (
        <div className="text-center py-20">
          <div className="text-6xl mb-4 animate-bounce">📚</div>
          <p className="text-xl text-slate-600 dark:text-slate-400">
            No {currentPage} yet. Check back soon!
          </p>
        </div>
      )}
    </div>
  );
}
