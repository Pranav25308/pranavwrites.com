'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Eye, User, TrendingUp } from 'lucide-react';

export default function Visits({ analytics }) {
  return (
    <div className="min-h-screen">
      <h1 className="text-5xl font-bold mb-12 text-center text-blue-800 dark:text-blue-400 animate-in fade-in-0 zoom-in-95 duration-500">
        Site Visits
      </h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <Card className="bg-gradient-to-br from-blue-600 to-cyan-600 text-white shadow-2xl animate-in fade-in-0 slide-in-from-bottom-4 duration-500">
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

        <Card className="bg-gradient-to-br from-purple-600 to-pink-600 text-white shadow-2xl animate-in fade-in-0 slide-in-from-bottom-4 duration-500 delay-100">
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

        <Card className="bg-gradient-to-br from-orange-600 to-red-600 text-white shadow-2xl animate-in fade-in-0 slide-in-from-bottom-4 duration-500 delay-200">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-orange-100 text-sm">Top Page</p>
                <p className="text-4xl font-bold">{analytics.topPages[0]?.page}</p>
              </div>
              <TrendingUp className="w-12 h-12 text-orange-200" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Page Views Breakdown */}
      <Card className="shadow-2xl dark:shadow-blue-900/50 border-2 border-blue-100 dark:border-slate-700 bg-white dark:bg-slate-800">
        <CardHeader>
          <CardTitle className="text-2xl text-slate-800 dark:text-slate-100">Page Views Breakdown</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {analytics.topPages.map((page, index) => (
              <div 
                key={page.page} 
                className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-900 rounded-lg"
              >
                <span className="font-medium text-slate-800 dark:text-slate-100">{page.page}</span>
                <span className="text-blue-600 dark:text-blue-400 font-bold">{page.views} views</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
