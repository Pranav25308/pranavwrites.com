'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Edit, Trash2 } from 'lucide-react';

export default function Roles({ roles }) {
  return (
    <div className="min-h-screen">
      <div className="flex justify-between items-center mb-12 animate-in fade-in-0 slide-in-from-top-4 duration-500">
        <h1 className="text-5xl font-bold text-blue-800 dark:text-blue-400">Manage Typing Roles</h1>
        <p className="text-slate-500 dark:text-slate-400">(Demo - changes not saved)</p>
      </div>

      <div className="space-y-4">
        {roles.map((role, index) => (
          <Card 
            key={role.id} 
            className="bg-white dark:bg-slate-800 border-2 border-blue-200 dark:border-slate-700 shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-102 animate-in fade-in-0 slide-in-from-bottom-4" 
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <span className="text-2xl font-bold text-slate-400 dark:text-slate-600">#{role.order}</span>
                  <span className="text-xl font-semibold text-slate-800 dark:text-slate-100">{role.title}</span>
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
            </CardContent>
          </Card>
        ))}

        {roles.length === 0 && (
          <div className="text-center py-20">
            <div className="text-6xl mb-4 animate-bounce">⚙️</div>
            <p className="text-xl text-slate-600 dark:text-slate-400">No roles yet.</p>
          </div>
        )}
      </div>
    </div>
  );
}
