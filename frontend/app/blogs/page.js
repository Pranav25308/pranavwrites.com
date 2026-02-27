'use client';

import { useEffect, useState } from 'react';
import BlogsReviews from '@/app/components/user/Reviews/Blogs';
import { DUMMY_REVIEWS } from '@/app/reviews/data';

export default function BlogsPage() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setDarkMode(localStorage.getItem('darkMode') === 'true');
    }
  }, []);

  const filteredReviews = DUMMY_REVIEWS.filter((r) => r.type === 'blog');

  return (
    <BlogsReviews
      filteredReviews={filteredReviews}
      darkMode={darkMode}
    />
  );
}


