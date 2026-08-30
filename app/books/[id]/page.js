import ReviewDetail from '@/components/user/ReviewDetail';
import { getReviewById } from '@/app/lib/reviews-server';
import { notFound } from 'next/navigation';

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }) {
  const review = await getReviewById(params.id, 'book');
  if (!review) return { title: 'Review Not Found' };
  return {
    title: `${review.title} | Pranav Writes`,
    description: review.description,
    alternates: { canonical: `/books/${review.id}` },
    openGraph: {
      title: `${review.title} | Pranav Writes`,
      description: review.description,
      url: `/books/${review.id}`,
      images: review.image ? [{ url: review.image }] : undefined,
      type: 'article',
    },
  };
}

export default async function BookDetailPage({ params }) {
  const review = await getReviewById(params.id, 'book');
  if (!review) notFound();
  return <ReviewDetail review={review} />;
}
