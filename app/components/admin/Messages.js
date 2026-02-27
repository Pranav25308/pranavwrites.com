'use client';

import { Card, CardContent } from '@/components/ui/card';

export default function Messages({ contacts }) {
  return (
    <div className="min-h-screen">
      <h1 className="text-5xl font-bold mb-12 text-center text-blue-800 dark:text-blue-400 animate-in fade-in-0 zoom-in-95 duration-500">
        Messages
      </h1>

      <div className="space-y-4">
        {contacts.map((contact, index) => (
          <Card 
            key={contact.id} 
            className="bg-white dark:bg-slate-800 border-2 border-blue-100 dark:border-slate-700 shadow-lg hover:shadow-xl transition-all duration-300 animate-in fade-in-0 slide-in-from-bottom-4"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <CardContent className="pt-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-4 mb-2">
                    <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100">{contact.name}</h3>
                    <span className="text-sm text-slate-500 dark:text-slate-400">{contact.email}</span>
                  </div>
                  <p className="text-blue-600 dark:text-blue-400 font-semibold mb-2">{contact.subject}</p>
                  <p className="text-slate-600 dark:text-slate-400">{contact.message}</p>
                  <p className="text-sm text-slate-400 dark:text-slate-500 mt-2">{contact.createdAt}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}

        {contacts.length === 0 && (
          <div className="text-center py-20">
            <div className="text-6xl mb-4 animate-bounce">📬</div>
            <p className="text-xl text-slate-600 dark:text-slate-400">No messages yet.</p>
          </div>
        )}
      </div>
    </div>
  );
}
