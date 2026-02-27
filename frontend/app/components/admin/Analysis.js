'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart3, MessageSquare } from 'lucide-react';

export default function Analysis({ reviews, contacts, roles }) {
  return (
    <div className="min-h-screen">
      <h1 className="text-5xl font-bold mb-12 text-center text-blue-800 dark:text-blue-400 animate-in fade-in-0 zoom-in-95 duration-500">
        Analytics
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Content Overview */}
        <Card className="shadow-2xl dark:shadow-blue-900/50 border-2 border-blue-100 dark:border-slate-700 bg-white dark:bg-slate-800">
          <CardHeader>
            <CardTitle className="flex items-center text-slate-800 dark:text-slate-100">
              <BarChart3 className="w-6 h-6 mr-2 text-blue-600 dark:text-blue-400" />
              Content Overview
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-3 bg-slate-50 dark:bg-slate-900 rounded-lg">
                <span className="text-slate-700 dark:text-slate-300">Total Reviews</span>
                <span className="font-bold text-blue-600 dark:text-blue-400">{reviews.length}</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-slate-50 dark:bg-slate-900 rounded-lg">
                <span className="text-slate-700 dark:text-slate-300">Blogs</span>
                <span className="font-bold text-blue-600 dark:text-blue-400">
                  {reviews.filter(r => r.type === 'blog').length}
                </span>
              </div>
              <div className="flex justify-between items-center p-3 bg-slate-50 dark:bg-slate-900 rounded-lg">
                <span className="text-slate-700 dark:text-slate-300">Movies</span>
                <span className="font-bold text-blue-600 dark:text-blue-400">
                  {reviews.filter(r => r.type === 'movie').length}
                </span>
              </div>
              <div className="flex justify-between items-center p-3 bg-slate-50 dark:bg-slate-900 rounded-lg">
                <span className="text-slate-700 dark:text-slate-300">Books</span>
                <span className="font-bold text-blue-600 dark:text-blue-400">
                  {reviews.filter(r => r.type === 'book').length}
                </span>
              </div>
              <div className="flex justify-between items-center p-3 bg-slate-50 dark:bg-slate-900 rounded-lg">
                <span className="text-slate-700 dark:text-slate-300">Products</span>
                <span className="font-bold text-blue-600 dark:text-blue-400">
                  {reviews.filter(r => r.type === 'product').length}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Engagement */}
        <Card className="shadow-2xl dark:shadow-blue-900/50 border-2 border-blue-100 dark:border-slate-700 bg-white dark:bg-slate-800">
          <CardHeader>
            <CardTitle className="flex items-center text-slate-800 dark:text-slate-100">
              <MessageSquare className="w-6 h-6 mr-2 text-blue-600 dark:text-blue-400" />
              Engagement
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-3 bg-slate-50 dark:bg-slate-900 rounded-lg">
                <span className="text-slate-700 dark:text-slate-300">Total Messages</span>
                <span className="font-bold text-blue-600 dark:text-blue-400">{contacts.length}</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-slate-50 dark:bg-slate-900 rounded-lg">
                <span className="text-slate-700 dark:text-slate-300">Active Roles</span>
                <span className="font-bold text-blue-600 dark:text-blue-400">{roles.length}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
