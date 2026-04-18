'use client';

import ProductsReviews from '@/components/user/Reviews/Products';
import { DUMMY_REVIEWS } from '@/app/reviews/data';

export default function ProductsPage() {
  const filteredReviews = DUMMY_REVIEWS.filter((r) => r.type === 'product');
  return <ProductsReviews filteredReviews={filteredReviews} />;
}
