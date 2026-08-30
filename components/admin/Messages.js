'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Trash2, MailOpen, Mail, Loader2 } from 'lucide-react';

export default function Messages() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/messages')
      .then((res) => res.json())
      .then((data) => setMessages(data.messages || []))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const toggleRead = async (msg) => {
    const read = !msg.read;
    setMessages((prev) => prev.map((m) => (m.id === msg.id ? { ...m, read } : m)));
    fetch(`/api/messages/${msg.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ read }),
    }).catch(() => {});
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this message permanently?')) return;
    const res = await fetch(`/api/messages/${id}`, { method: 'DELETE' }).catch(() => null);
    if (res?.ok) setMessages((prev) => prev.filter((m) => m.id !== id));
  };

  const formatDate = (iso) => {
    try {
      return new Date(iso).toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' });
    } catch {
      return iso;
    }
  };

  return (
    <div className="min-h-screen">
      <h1 className="text-5xl font-bold mb-12 text-center text-blue-800 dark:text-blue-400 animate-in fade-in-0 zoom-in-95 duration-500">
        Messages
      </h1>

      {loading ? (
        <div className="flex justify-center py-20" data-testid="messages-loading">
          <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
        </div>
      ) : (
        <div className="space-y-4">
          {messages.map((msg, index) => (
            <Card
              key={msg.id}
              data-testid={`message-card-${msg.id}`}
              className={`bg-white dark:bg-slate-800 border-2 shadow-lg hover:shadow-xl transition-all duration-300 animate-in fade-in-0 slide-in-from-bottom-4 ${
                msg.read
                  ? 'border-slate-200 dark:border-slate-700 opacity-80'
                  : 'border-blue-300 dark:border-blue-600'
              }`}
              style={{ animationDelay: `${index * 80}ms` }}
            >
              <CardContent className="pt-6">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center flex-wrap gap-x-4 gap-y-1 mb-2">
                      <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100">{msg.name}</h3>
                      <span className="text-sm text-slate-500 dark:text-slate-400">{msg.email}</span>
                      {!msg.read && (
                        <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300">
                          New
                        </span>
                      )}
                    </div>
                    <p className="text-blue-600 dark:text-blue-400 font-semibold mb-2">{msg.subject}</p>
                    <p className="text-slate-600 dark:text-slate-400">{msg.message}</p>
                    <p className="text-sm text-slate-400 dark:text-slate-500 mt-2">{formatDate(msg.createdAt)}</p>
                  </div>
                  <div className="flex flex-col gap-2 shrink-0">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => toggleRead(msg)}
                      data-testid={`toggle-read-${msg.id}`}
                      title={msg.read ? 'Mark as unread' : 'Mark as read'}
                    >
                      {msg.read ? <Mail className="w-4 h-4" /> : <MailOpen className="w-4 h-4" />}
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDelete(msg.id)}
                      data-testid={`delete-message-${msg.id}`}
                      className="bg-red-600 hover:bg-red-700 border-0"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}

          {messages.length === 0 && (
            <div className="text-center py-20" data-testid="messages-empty-state">
              <p className="text-xl text-slate-600 dark:text-slate-400">No messages yet. Real contact form submissions will appear here.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
