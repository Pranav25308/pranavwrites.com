import ReviewDetail from '@/components/user/ReviewDetail';
import { DUMMY_REVIEWS } from '@/app/reviews/data';
import { notFound } from 'next/navigation';

export function generateStaticParams() {
  return DUMMY_REVIEWS.filter((r) => r.type === 'blog').map((r) => ({ id: r.id }));
}

export default function BlogDetailPage({ params }) {
  const review = DUMMY_REVIEWS.find(
    (r) => r.id === params.id && r.type === 'blog'
  );
  if (!review) notFound();
  return <ReviewDetail review={review} />;
}
