import ReviewDetail from '@/components/user/ReviewDetail';
import { getReviewById } from '@/app/lib/reviews-server';
import { notFound } from 'next/navigation';

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }) {
  const review = await getReviewById(params.id, 'product');
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

export default async function ProductDetailPage({ params }) {
  const review = await getReviewById(params.id, 'product');
  if (!review) notFound();
  return <ReviewDetail review={review} />;
}
