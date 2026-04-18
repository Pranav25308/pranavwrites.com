'use client';

import BooksReviews from '@/components/user/Reviews/Books';
import { DUMMY_REVIEWS } from '@/app/reviews/data';

export default function BooksPage() {
  const filteredReviews = DUMMY_REVIEWS.filter((r) => r.type === 'book');
  return <BooksReviews filteredReviews={filteredReviews} />;
}
