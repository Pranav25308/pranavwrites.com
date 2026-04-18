'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Edit, Trash2 } from 'lucide-react';

export default function Manage({ currentPage, reviews }) {
  const type = currentPage.replace('manage-', '').slice(0, -1); // blogs -> blog
  const filteredReviews = reviews.filter(r => r.type === type);
  const pageTitle = currentPage.replace('manage-', '');

  return (
    <div className="min-h-screen">
      <div className="flex justify-between items-center mb-12 animate-in fade-in-0 slide-in-from-top-4 duration-500">
        <h1 className="text-5xl font-bold text-blue-800 dark:text-blue-400 capitalize">
          Manage {pageTitle}
        </h1>
        <p className="text-slate-500 dark:text-slate-400">(Demo - changes not saved)</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredReviews.map((review, index) => (
          <Card 
            key={review.id} 
            className="bg-white dark:bg-slate-800 border-2 border-blue-200 dark:border-slate-700 shadow-xl hover:shadow-2xl hover:scale-102 transition-all duration-500 animate-in fade-in-0 slide-in-from-bottom-4" 
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-xl text-slate-800 dark:text-slate-100">
                    {review.title}
                  </CardTitle>
                  <CardDescription className="uppercase text-slate-600 dark:text-slate-400 mt-2">
                    {review.type}
                  </CardDescription>
                </div>
                <div className="flex space-x-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="bg-blue-600 hover:bg-blue-700 text-white border-0 shadow-lg"
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button 
                    variant="destructive" 
                    size="sm" 
                    className="bg-red-600 hover:bg-red-700 border-0 shadow-lg"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-slate-600 dark:text-slate-400 line-clamp-2">{review.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredReviews.length === 0 && (
        <div className="text-center py-20">
          <div className="text-6xl mb-4 animate-bounce">📝</div>
          <p className="text-xl text-slate-600 dark:text-slate-400">
            No {pageTitle} yet.
          </p>
        </div>
      )}
    </div>
  );
}
