'use client';

import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  ArrowLeft,
  Brain,
  Film,
  Book,
  Package,
  FileText,
  Calendar,
  Tag,
} from 'lucide-react';
import { useTheme } from '@/components/theme/ThemeProvider';
import AdSlot from '@/components/shared/AdSlot';

const typeIcons = {
  blog: FileText,
  movie: Film,
  book: Book,
  product: Package,
};

const typeColors = {
  blog: 'from-purple-600 to-pink-500',
  movie: 'from-cyan-600 to-blue-500',
  book: 'from-green-600 to-emerald-500',
  product: 'from-orange-600 to-red-500',
};

const TYPE_LABEL = {
  blog: 'Blog',
  movie: 'Movie',
  book: 'Book',
  product: 'Product',
};

const TYPE_BACK_PATH = {
  blog: '/blogs',
  movie: '/movies',
  book: '/books',
  product: '/products',
};

export default function ReviewDetail({ review }) {
  const { darkMode } = useTheme();

  if (!review) {
    notFound();
    return null;
  }

  const Icon = typeIcons[review.type] || Brain;
  const color = typeColors[review.type] || 'from-purple-600 to-cyan-500';
  const label = TYPE_LABEL[review.type] || 'Review';
  const backPath = TYPE_BACK_PATH[review.type] || '/reviews';

  // build a longer body if not provided
  const body =
    review.content ||
    [
      review.description,
      `This is one of the ${label.toLowerCase()} entries that left a strong impression. The notes below capture the key takeaways and why it stands out.`,
      'More detailed thoughts and analysis will be added here over time. For now, enjoy the high-level summary above and feel free to reach out if you would like to discuss it.',
    ].join('\n\n');

  return (
    <div className="min-h-screen max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-16">
      {/* Back link */}
      <div className="mb-6">
        <Link href={backPath}>
          <Button
            variant="ghost"
            className={`gap-2 ${
              darkMode
                ? 'text-slate-400 hover:text-purple-400 hover:bg-purple-500/10'
                : 'text-slate-600 hover:text-purple-600 hover:bg-purple-50'
            }`}
          >
            <ArrowLeft className="w-4 h-4" />
            Back to {label}s
          </Button>
        </Link>
      </div>

      {/* Hero card with image + title overlay */}
      <Card
        className={`overflow-hidden border shadow-2xl mb-10 ${
          darkMode
            ? 'bg-slate-900/50 border-purple-500/10'
            : 'bg-white/80 border-purple-100'
        }`}
      >
        <div
          className={`aspect-[16/7] relative overflow-hidden ${
            darkMode
              ? 'bg-gradient-to-br from-slate-800 to-slate-900'
              : 'bg-gradient-to-br from-purple-50 to-cyan-50'
          }`}
        >
          {review.image ? (
            <img
              src={review.image}
              alt={review.title}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <Icon
                className={`w-24 h-24 ${
                  darkMode ? 'text-purple-500/30' : 'text-purple-300'
                }`}
              />
            </div>
          )}

          {/* gradient overlay */}
          <div
            className={`absolute inset-0 ${
              darkMode
                ? 'bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent'
                : 'bg-gradient-to-t from-white via-white/40 to-transparent'
            }`}
          />

          {/* type chip top-left */}
          <div className="absolute top-4 left-4 flex items-center gap-2">
            <div
              className={`w-10 h-10 rounded-lg bg-gradient-to-br ${color} flex items-center justify-center shadow-lg`}
            >
              <Icon className="w-5 h-5 text-white" />
            </div>
            <span
              className={`px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider backdrop-blur-sm ${
                darkMode
                  ? 'bg-purple-500/20 text-purple-200 border border-purple-500/30'
                  : 'bg-purple-100 text-purple-700 border border-purple-200'
              }`}
            >
              {label}
            </span>
          </div>

          {/* title at bottom */}
          <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
            <h1
              className={`text-3xl sm:text-4xl font-bold ${
                darkMode ? 'text-white' : 'text-slate-900'
              }`}
            >
              {review.title}
            </h1>
          </div>
        </div>
      </Card>

      {/* Meta row */}
      <div className="flex flex-wrap items-center gap-3 mb-8">
        <span
          className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm ${
            darkMode
              ? 'bg-slate-800/60 text-slate-300 border border-slate-700'
              : 'bg-white text-slate-700 border border-slate-200'
          }`}
        >
          <Tag className="w-3.5 h-3.5" /> {label}
        </span>
        {review.date && (
          <span
            className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm ${
              darkMode
                ? 'bg-slate-800/60 text-slate-300 border border-slate-700'
                : 'bg-white text-slate-700 border border-slate-200'
            }`}
          >
            <Calendar className="w-3.5 h-3.5" /> {review.date}
          </span>
        )}
      </div>

      {/* Body */}
      <Card
        className={`border shadow-xl ${
          darkMode
            ? 'bg-slate-900/50 border-purple-500/10'
            : 'bg-white/80 border-purple-100'
        }`}
      >
        <CardContent className="pt-8 pb-8 px-6 sm:px-10">
          <div className="space-y-5">
            {body.split('\n\n').map((para, i) => (
              <p
                key={i}
                className={`leading-relaxed text-base ${
                  darkMode ? 'text-slate-300' : 'text-slate-700'
                }`}
              >
                {para}
              </p>
            ))}
          </div>
        </CardContent>
      </Card>

      <AdSlot />
    </div>
  );
}
