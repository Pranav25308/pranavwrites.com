'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Eye, User, TrendingUp, Loader2 } from 'lucide-react';

const PAGE_LABELS = {
  '/': 'Home',
  '/about': 'About',
  '/blogs': 'Blogs',
  '/movies': 'Movies',
  '/books': 'Books',
  '/products': 'Products',
  '/projects': 'Projects',
  '/contact': 'Contact',
  '/privacy': 'Privacy',
};

function labelFor(page) {
  if (PAGE_LABELS[page]) return PAGE_LABELS[page];
  return page;
}

export default function Visits() {
  const [analytics, setAnalytics] = useState(null);

  useEffect(() => {
    fetch('/api/visits')
      .then((res) => res.json())
      .then(setAnalytics)
      .catch(() => setAnalytics({ totalVisits: 0, uniqueVisitors: 0, topPages: [] }));
  }, []);

  if (!analytics) {
    return (
      <div className="min-h-screen flex justify-center pt-32" data-testid="visits-loading">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    );
  }

  const topPage = analytics.topPages[0];

  return (
    <div className="min-h-screen">
      <h1 className="text-5xl font-bold mb-12 text-center text-blue-800 dark:text-blue-400 animate-in fade-in-0 zoom-in-95 duration-500">
        Site Visits
      </h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <Card className="bg-gradient-to-br from-blue-600 to-cyan-600 text-white shadow-2xl animate-in fade-in-0 slide-in-from-bottom-4 duration-500" data-testid="total-visits-card">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100 text-sm">Total Visits</p>
                <p className="text-4xl font-bold">{analytics.totalVisits}</p>
              </div>
              <Eye className="w-12 h-12 text-blue-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-600 to-pink-600 text-white shadow-2xl animate-in fade-in-0 slide-in-from-bottom-4 duration-500 delay-100" data-testid="unique-visitors-card">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-100 text-sm">Unique Visitors</p>
                <p className="text-4xl font-bold">{analytics.uniqueVisitors}</p>
              </div>
              <User className="w-12 h-12 text-purple-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-600 to-red-600 text-white shadow-2xl animate-in fade-in-0 slide-in-from-bottom-4 duration-500 delay-200" data-testid="top-page-card">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-orange-100 text-sm">Top Page</p>
                <p className="text-4xl font-bold">{topPage ? labelFor(topPage.page) : '—'}</p>
              </div>
              <TrendingUp className="w-12 h-12 text-orange-200" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Page Views Breakdown */}
      <Card className="shadow-2xl dark:shadow-blue-900/50 border-2 border-blue-100 dark:border-slate-700 bg-white dark:bg-slate-800" data-testid="page-views-card">
        <CardHeader>
          <CardTitle className="text-2xl text-slate-800 dark:text-slate-100">Page Views Breakdown</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {analytics.topPages.map((page) => (
              <div
                key={page.page}
                className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-900 rounded-lg"
              >
                <span className="font-medium text-slate-800 dark:text-slate-100">{labelFor(page.page)}</span>
                <span className="text-blue-600 dark:text-blue-400 font-bold">{page.views} views</span>
              </div>
            ))}
            {analytics.topPages.length === 0 && (
              <p className="text-center py-8 text-slate-500 dark:text-slate-400">
                No visits recorded yet. Visits are tracked in real time as people browse the site.
              </p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
