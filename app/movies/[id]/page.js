import ReviewDetail from '@/components/user/ReviewDetail';
import { DUMMY_REVIEWS } from '@/app/reviews/data';
import { notFound } from 'next/navigation';

export function generateStaticParams() {
  return DUMMY_REVIEWS.filter((r) => r.type === 'movie').map((r) => ({ id: r.id }));
}

export function generateMetadata({ params }) {
  const review = DUMMY_REVIEWS.find((r) => r.id === params.id && r.type === 'movie');
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

export default function MovieDetailPage({ params }) {
  const review = DUMMY_REVIEWS.find(
    (r) => r.id === params.id && r.type === 'movie'
  );
  if (!review) notFound();
  return <ReviewDetail review={review} />;
}
