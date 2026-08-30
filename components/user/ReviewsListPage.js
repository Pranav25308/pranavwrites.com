'use client';

import { useEffect, useState } from 'react';
import Reviews from '@/components/user/Reviews';

export default function ReviewsListPage({ type, currentPage }) {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    fetch(`/api/reviews?type=${type}`)
      .then((res) => res.json())
      .then((data) => {
        if (active) setReviews(data.reviews || []);
      })
      .catch(() => {})
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, [type]);

  return <Reviews currentPage={currentPage} filteredReviews={reviews} loading={loading} />;
}
