import ReviewDetail from '@/components/user/ReviewDetail';
import { DUMMY_REVIEWS } from '@/app/reviews/data';
import { notFound } from 'next/navigation';

export function generateStaticParams() {
  return DUMMY_REVIEWS.filter((r) => r.type === 'product').map((r) => ({ id: r.id }));
}

export default function ProductDetailPage({ params }) {
  const review = DUMMY_REVIEWS.find(
    (r) => r.id === params.id && r.type === 'product'
  );
  if (!review) notFound();
  return <ReviewDetail review={review} />;
}
