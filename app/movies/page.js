'use client';

import MoviesReviews from '@/components/user/Reviews/Movies';
import { DUMMY_REVIEWS } from '@/app/reviews/data';

export default function MoviesPage() {
  const filteredReviews = DUMMY_REVIEWS.filter((r) => r.type === 'movie');
  return <MoviesReviews filteredReviews={filteredReviews} />;
}
