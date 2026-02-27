'use client';

import { useEffect, useState } from 'react';
import ProductsReviews from '@/components/user/Reviews/Products';
import { DUMMY_REVIEWS } from '@/app/reviews/data';

export default function ProductsPage() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setDarkMode(localStorage.getItem('darkMode') === 'true');
    }
  }, []);

  const filteredReviews = DUMMY_REVIEWS.filter((r) => r.type === 'product');

  return (
    <ProductsReviews
      filteredReviews={filteredReviews}
      darkMode={darkMode}
    />
  );
}


