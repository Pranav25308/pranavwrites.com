'use client';

import BlogsReviews from '@/components/user/Reviews/Blogs';
import { DUMMY_REVIEWS } from '@/app/reviews/data';

export default function BlogsPage() {
  const filteredReviews = DUMMY_REVIEWS.filter((r) => r.type === 'blog');
  return <BlogsReviews filteredReviews={filteredReviews} />;
}
