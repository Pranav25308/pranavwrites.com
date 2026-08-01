import ReviewDetail from '@/components/user/ReviewDetail';
import { DUMMY_REVIEWS } from '@/app/reviews/data';
import { notFound } from 'next/navigation';

export function generateStaticParams() {
  return DUMMY_REVIEWS.filter((r) => r.type === 'product').map((r) => ({ id: r.id }));
}

export function generateMetadata({ params }) {
  const review = DUMMY_REVIEWS.find((r) => r.id === params.id && r.type === 'product');
  if (!review) return { title: 'Review Not Found' };
  return {
    title: `${review.title} | Pranav Writes`,
    description: review.description,
    alternates: { canonical: `/products/${review.id}` },
    openGraph: {
      title: `${review.title} | Pranav Writes`,
      description: review.description,
      url: `/products/${review.id}`,
      images: review.image ? [{ url: review.image }] : undefined,
      type: 'article',
    },
  };
}

export default function ProductDetailPage({ params }) {
  const review = DUMMY_REVIEWS.find(
    (r) => r.id === params.id && r.type === 'product'
  );
  if (!review) notFound();
  return <ReviewDetail review={review} />;
}
