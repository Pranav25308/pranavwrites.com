'use client';

import { useEffect, useState } from 'react';
import { ThumbsUp, ThumbsDown } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { useTheme } from '@/components/theme/ThemeProvider';

export default function ReactionBar({ reviewId, initialLikes = 0, initialDislikes = 0 }) {
  const { darkMode } = useTheme();
  const [likes, setLikes] = useState(initialLikes);
  const [dislikes, setDislikes] = useState(initialDislikes);
  const [vote, setVote] = useState(null);
  const [animating, setAnimating] = useState(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const saved = window.localStorage.getItem(`reaction_${reviewId}`);
    if (saved === 'like' || saved === 'dislike') setVote(saved);
  }, [reviewId]);

  const react = async (action) => {
    const previous = vote;
    const next = previous === action ? null : action;

    // optimistic update
    setLikes((l) => l + (next === 'like' ? 1 : 0) - (previous === 'like' ? 1 : 0));
    setDislikes((d) => d + (next === 'dislike' ? 1 : 0) - (previous === 'dislike' ? 1 : 0));
    setVote(next);
    setAnimating(action);
    setTimeout(() => setAnimating(null), 400);

    if (typeof window !== 'undefined') {
      if (next) window.localStorage.setItem(`reaction_${reviewId}`, next);
      else window.localStorage.removeItem(`reaction_${reviewId}`);
    }

    try {
      const res = await fetch(`/api/reviews/${reviewId}/reaction`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: next || 'none', previous }),
      });
      const data = await res.json();
      if (res.ok) {
        setLikes(data.likes);
        setDislikes(data.dislikes);
      }
    } catch {}
  };

  const btnBase =
    'group flex items-center gap-2.5 px-6 py-3 rounded-full border font-semibold text-sm transition-all duration-300 hover:scale-105 active:scale-95';

  return (
    <Card
      className={`mt-10 border shadow-xl overflow-hidden ${
        darkMode ? 'bg-slate-900/50 border-purple-500/10' : 'bg-white/80 border-purple-100'
      }`}
      data-testid="reaction-bar"
    >
      <CardContent className="py-8 px-6 sm:px-10">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h3 className={`text-lg font-bold ${darkMode ? 'text-white' : 'text-slate-800'}`}>
              Was this helpful?
            </h3>
            <p className={`text-sm ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
              Let me know what you think of this post.
            </p>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => react('like')}
              data-testid="like-button"
              className={`${btnBase} ${animating === 'like' ? 'scale-110' : ''} ${
                vote === 'like'
                  ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white border-transparent shadow-lg shadow-emerald-500/30'
                  : darkMode
                  ? 'bg-slate-800/60 border-slate-700 text-slate-300 hover:border-emerald-500/50 hover:text-emerald-400'
                  : 'bg-white border-slate-200 text-slate-600 hover:border-emerald-400 hover:text-emerald-600'
              }`}
            >
              <ThumbsUp
                className={`w-4 h-4 transition-transform duration-300 ${
                  vote === 'like' ? 'fill-current' : 'group-hover:-rotate-12'
                }`}
              />
              <span data-testid="like-count">{likes}</span>
            </button>

            <button
              onClick={() => react('dislike')}
              data-testid="dislike-button"
              className={`${btnBase} ${animating === 'dislike' ? 'scale-110' : ''} ${
                vote === 'dislike'
                  ? 'bg-gradient-to-r from-rose-500 to-red-500 text-white border-transparent shadow-lg shadow-rose-500/30'
                  : darkMode
                  ? 'bg-slate-800/60 border-slate-700 text-slate-300 hover:border-rose-500/50 hover:text-rose-400'
                  : 'bg-white border-slate-200 text-slate-600 hover:border-rose-400 hover:text-rose-600'
              }`}
            >
              <ThumbsDown
                className={`w-4 h-4 transition-transform duration-300 ${
                  vote === 'dislike' ? 'fill-current' : 'group-hover:rotate-12'
                }`}
              />
              <span data-testid="dislike-count">{dislikes}</span>
            </button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
