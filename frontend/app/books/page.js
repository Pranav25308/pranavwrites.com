'use client';

import { useEffect, useState } from 'react';
import BooksReviews from '@/app/components/user/Reviews/Books';
import { DUMMY_REVIEWS } from '@/app/reviews/data';

export default function BooksPage() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setDarkMode(localStorage.getItem('darkMode') === 'true');
    }
  }, []);

  const filteredReviews = DUMMY_REVIEWS.filter((r) => r.type === 'book');

  return (
    <BooksReviews
      filteredReviews={filteredReviews}
      darkMode={darkMode}
    />
  );
}


