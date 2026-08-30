'use client';

import { useEffect, useState, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Edit, Trash2, Plus, X, Save, ThumbsUp, ThumbsDown, Loader2 } from 'lucide-react';

const EMPTY_FORM = { title: '', description: '', image: '', content: '', date: '' };

export default function Manage({ type, title }) {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/reviews?type=${type}`);
      const data = await res.json();
      setReviews(data.reviews || []);
    } catch {
      setReviews([]);
    } finally {
      setLoading(false);
    }
  }, [type]);

  useEffect(() => {
    load();
  }, [load]);

  const openAdd = () => {
    setForm(EMPTY_FORM);
    setEditingId(null);
    setError('');
    setShowForm(true);
  };

  const openEdit = (review) => {
    setForm({
      title: review.title || '',
      description: review.description || '',
      image: review.image || '',
      content: review.content || '',
      date: review.date || '',
    });
    setEditingId(review.id);
    setError('');
    setShowForm(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!form.title.trim() || !form.description.trim()) {
      setError('Title and description are required.');
      return;
    }
    setSaving(true);
    setError('');
    try {
      const url = editingId ? `/api/reviews/${editingId}` : '/api/reviews';
      const method = editingId ? 'PUT' : 'POST';
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, type }),
      });
      if (!res.ok) {
        const data = await res.json();
        setError(data.error || 'Failed to save.');
        return;
      }
      setShowForm(false);
      await load();
    } catch {
      setError('Failed to save. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this entry permanently?')) return;
    try {
      const res = await fetch(`/api/reviews/${id}`, { method: 'DELETE' });
      if (res.ok) setReviews((prev) => prev.filter((r) => r.id !== id));
    } catch {}
  };

  return (
    <div className="min-h-screen">
      <div className="flex justify-between items-center mb-12 animate-in fade-in-0 slide-in-from-top-4 duration-500">
        <h1 className="text-5xl font-bold text-blue-800 dark:text-blue-400 capitalize">
          Manage {title}
        </h1>
        <Button
          onClick={openAdd}
          data-testid="add-review-button"
          className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white shadow-lg"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add {title.slice(0, -1)}
        </Button>
      </div>

      {/* Add / Edit form */}
      {showForm && (
        <Card className="mb-10 bg-white dark:bg-slate-800 border-2 border-blue-200 dark:border-slate-700 shadow-2xl" data-testid="review-form-card">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-2xl text-slate-800 dark:text-slate-100">
                {editingId ? 'Edit' : 'Add New'} {title.slice(0, -1)}
              </CardTitle>
              <Button variant="ghost" size="icon" onClick={() => setShowForm(false)} data-testid="close-form-button">
                <X className="w-5 h-5" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSave} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Title *</Label>
                  <Input
                    id="title"
                    value={form.title}
                    onChange={(e) => setForm({ ...form, title: e.target.value })}
                    placeholder="Enter title"
                    data-testid="review-title-input"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="date">Date (optional)</Label>
                  <Input
                    id="date"
                    value={form.date}
                    onChange={(e) => setForm({ ...form, date: e.target.value })}
                    placeholder="e.g. June 2026"
                    data-testid="review-date-input"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="image">Image URL (optional)</Label>
                <Input
                  id="image"
                  value={form.image}
                  onChange={(e) => setForm({ ...form, image: e.target.value })}
                  placeholder="https://..."
                  data-testid="review-image-input"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Short Description *</Label>
                <Textarea
                  id="description"
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  placeholder="One or two lines shown on the listing card"
                  rows={2}
                  data-testid="review-description-input"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="content">Full Content (optional)</Label>
                <Textarea
                  id="content"
                  value={form.content}
                  onChange={(e) => setForm({ ...form, content: e.target.value })}
                  placeholder="Full article / review body. Separate paragraphs with a blank line."
                  rows={6}
                  data-testid="review-content-input"
                />
              </div>

              {error && <p className="text-sm text-red-500" data-testid="review-form-error">{error}</p>}

              <Button
                type="submit"
                disabled={saving}
                data-testid="save-review-button"
                className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white shadow-lg"
              >
                {saving ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Save className="w-4 h-4 mr-2" />}
                {saving ? 'Saving...' : editingId ? 'Update' : 'Create'}
              </Button>
            </form>
          </CardContent>
        </Card>
      )}

      {/* List */}
      {loading ? (
        <div className="flex justify-center py-20" data-testid="manage-loading">
          <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {reviews.map((review, index) => (
            <Card
              key={review.id}
              data-testid={`manage-review-card-${review.id}`}
              className="bg-white dark:bg-slate-800 border-2 border-blue-200 dark:border-slate-700 shadow-xl hover:shadow-2xl transition-all duration-500 animate-in fade-in-0 slide-in-from-bottom-4"
              style={{ animationDelay: `${index * 80}ms` }}
            >
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="min-w-0 pr-2">
                    <CardTitle className="text-xl text-slate-800 dark:text-slate-100 truncate">
                      {review.title}
                    </CardTitle>
                    <CardDescription className="uppercase text-slate-600 dark:text-slate-400 mt-2 flex items-center gap-3">
                      <span>{review.type}</span>
                      {review.type === 'blog' && (
                        <span className="flex items-center gap-3 normal-case">
                          <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400">
                            <ThumbsUp className="w-3.5 h-3.5" /> {review.likes || 0}
                          </span>
                          <span className="flex items-center gap-1 text-rose-600 dark:text-rose-400">
                            <ThumbsDown className="w-3.5 h-3.5" /> {review.dislikes || 0}
                          </span>
                        </span>
                      )}
                    </CardDescription>
                  </div>
                  <div className="flex space-x-2 shrink-0">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => openEdit(review)}
                      data-testid={`edit-review-${review.id}`}
                      className="bg-blue-600 hover:bg-blue-700 text-white border-0 shadow-lg"
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDelete(review.id)}
                      data-testid={`delete-review-${review.id}`}
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
      )}

      {!loading && reviews.length === 0 && !showForm && (
        <div className="text-center py-20" data-testid="manage-empty-state">
          <p className="text-xl text-slate-600 dark:text-slate-400">
            No {title.toLowerCase()} yet. Click "Add {title.slice(0, -1)}" to create your first one.
          </p>
        </div>
      )}
    </div>
  );
}
