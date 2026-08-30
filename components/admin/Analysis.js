'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart3, MessageSquare, Loader2 } from 'lucide-react';
import { DUMMY_ROLES } from '@/app/admin/data';

export default function Analysis() {
  const [reviews, setReviews] = useState([]);
  const [messages, setMessages] = useState([]);
  const [visits, setVisits] = useState({ totalVisits: 0, uniqueVisitors: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch('/api/reviews').then((r) => r.json()).catch(() => ({ reviews: [] })),
      fetch('/api/messages').then((r) => r.json()).catch(() => ({ messages: [] })),
      fetch('/api/visits').then((r) => r.json()).catch(() => ({ totalVisits: 0, uniqueVisitors: 0 })),
    ])
      .then(([rev, msg, vis]) => {
        setReviews(rev.reviews || []);
        setMessages(msg.messages || []);
        setVisits(vis);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center pt-32" data-testid="analysis-loading">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    );
  }

  const countByType = (type) => reviews.filter((r) => r.type === type).length;
  const totalLikes = reviews.reduce((sum, r) => sum + (r.likes || 0), 0);
  const totalDislikes = reviews.reduce((sum, r) => sum + (r.dislikes || 0), 0);

  return (
    <div className="min-h-screen">
      <h1 className="text-5xl font-bold mb-12 text-center text-blue-800 dark:text-blue-400 animate-in fade-in-0 zoom-in-95 duration-500">
        Analytics
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Content Overview */}
        <Card className="shadow-2xl dark:shadow-blue-900/50 border-2 border-blue-100 dark:border-slate-700 bg-white dark:bg-slate-800" data-testid="content-overview-card">
          <CardHeader>
            <CardTitle className="flex items-center text-slate-800 dark:text-slate-100">
              <BarChart3 className="w-6 h-6 mr-2 text-blue-600 dark:text-blue-400" />
              Content Overview
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                ['Total Reviews', reviews.length],
                ['Blogs', countByType('blog')],
                ['Movies', countByType('movie')],
                ['Books', countByType('book')],
                ['Products', countByType('product')],
              ].map(([label, value]) => (
                <div key={label} className="flex justify-between items-center p-3 bg-slate-50 dark:bg-slate-900 rounded-lg">
                  <span className="text-slate-700 dark:text-slate-300">{label}</span>
                  <span className="font-bold text-blue-600 dark:text-blue-400">{value}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Engagement */}
        <Card className="shadow-2xl dark:shadow-blue-900/50 border-2 border-blue-100 dark:border-slate-700 bg-white dark:bg-slate-800" data-testid="engagement-card">
          <CardHeader>
            <CardTitle className="flex items-center text-slate-800 dark:text-slate-100">
              <MessageSquare className="w-6 h-6 mr-2 text-blue-600 dark:text-blue-400" />
              Engagement
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                ['Total Messages', messages.length],
                ['Unread Messages', messages.filter((m) => !m.read).length],
                ['Total Visits', visits.totalVisits],
                ['Unique Visitors', visits.uniqueVisitors],
                ['Blog Likes', totalLikes],
                ['Blog Dislikes', totalDislikes],
                ['Active Roles', DUMMY_ROLES.length],
              ].map(([label, value]) => (
                <div key={label} className="flex justify-between items-center p-3 bg-slate-50 dark:bg-slate-900 rounded-lg">
                  <span className="text-slate-700 dark:text-slate-300">{label}</span>
                  <span className="font-bold text-blue-600 dark:text-blue-400">{value}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
