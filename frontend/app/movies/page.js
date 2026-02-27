'use client';

import { useEffect, useState } from 'react';
import MoviesReviews from '@/app/components/user/Reviews/Movies';
import { DUMMY_REVIEWS } from '@/app/reviews/data';

export default function MoviesPage() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setDarkMode(localStorage.getItem('darkMode') === 'true');
    }
  }, []);

  const filteredReviews = DUMMY_REVIEWS.filter((r) => r.type === 'movie');

  return (
    <MoviesReviews
      filteredReviews={filteredReviews}
      darkMode={darkMode}
    />
  );
}


