import ReviewDetail from '@/components/user/ReviewDetail';
import { getReviewById } from '@/app/lib/reviews-server';
import { notFound } from 'next/navigation';

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }) {
  const review = await getReviewById(params.id, 'movie');
  if (!review) return { title: 'Review Not Found' };
  return {
    title: `${review.title} | Pranav Writes`,
    description: review.description,
    alternates: { canonical: `/movies/${review.id}` },
    openGraph: {
      title: `${review.title} | Pranav Writes`,
      description: review.description,
      url: `/movies/${review.id}`,
      images: review.image ? [{ url: review.image }] : undefined,
      type: 'article',
    },
  };
}

export default async function MovieDetailPage({ params }) {
  const review = await getReviewById(params.id, 'movie');
  if (!review) notFound();
  return <ReviewDetail review={review} />;
}
