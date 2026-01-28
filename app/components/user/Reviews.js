'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Brain, Film, Book, Package, FileText } from 'lucide-react';

// Icon mapping based on review type
const typeIcons = {
  blog: FileText,
  movie: Film,
  book: Book,
  product: Package
};

const typeColors = {
  blog: 'from-purple-600 to-pink-500',
  movie: 'from-cyan-600 to-blue-500',
  book: 'from-green-600 to-emerald-500',
  product: 'from-orange-600 to-red-500'
};

export default function Reviews({ 
  currentPage, 
  filteredReviews 
}) {
  const pageTitle = currentPage.charAt(0).toUpperCase() + currentPage.slice(1);
  const reviewType = currentPage.slice(0, -1); // blogs -> blog
  const IconComponent = typeIcons[reviewType] || Brain;
  const colorGradient = typeColors[reviewType] || 'from-purple-600 to-cyan-500';

  return (
    <div className="min-h-screen relative">
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-20 left-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-1/4 w-80 h-80 bg-cyan-600/10 rounded-full blur-3xl"></div>
      </div>

      {/* Page Header */}
      <div className="text-center mb-16 relative">
        <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r ${colorGradient} bg-opacity-10 border border-purple-500/20 text-white text-sm mb-6`}>
          <IconComponent className="w-4 h-4" />
          <span>{pageTitle}</span>
        </div>
        <h1 className="text-5xl font-bold text-white mb-4">
          My <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">{pageTitle}</span>
        </h1>
        <p className="text-slate-400 text-lg max-w-2xl mx-auto">
          {currentPage === 'blogs' && 'Thoughts, tutorials, and insights on software development'}
          {currentPage === 'movies' && 'Reviews of films that inspired and entertained me'}
          {currentPage === 'books' && 'Books that shaped my thinking and skills'}
          {currentPage === 'products' && 'Tech products and tools I recommend'}
        </p>
      </div>
      
      {/* Reviews Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative">
        {filteredReviews.map((review, index) => {
          const ReviewIcon = typeIcons[review.type] || Brain;
          const reviewColor = typeColors[review.type] || 'from-purple-600 to-cyan-500';
          
          return (
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
                    <ReviewIcon className="w-16 h-16 text-purple-500/30" />
                  </div>
                )}
                {/* Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent"></div>
                
                {/* Icon Badge */}
                <div className="absolute top-3 left-3">
                  <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${reviewColor} flex items-center justify-center shadow-lg`}>
                    <ReviewIcon className="w-5 h-5 text-white" />
                  </div>
                </div>
              </div>

              <CardHeader className="pb-2">
                <CardTitle className="text-lg text-white group-hover:text-purple-400 transition-colors duration-300 line-clamp-2">
                  {review.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-400 text-sm leading-relaxed">{review.description}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Empty State */}
      {filteredReviews.length === 0 && (
        <div className="text-center py-20 relative">
          <div className="w-24 h-24 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-purple-600/20 to-cyan-600/20 flex items-center justify-center border border-purple-500/20">
            <IconComponent className="w-12 h-12 text-purple-500/50" />
          </div>
          <h3 className="text-2xl font-bold text-white mb-2">No {pageTitle} Yet</h3>
          <p className="text-slate-400">
            Check back soon for new content!
          </p>
        </div>
      )}
    </div>
  );
}
