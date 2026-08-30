import ReviewDetail from '@/components/user/ReviewDetail';
import { getReviewById } from '@/app/lib/reviews-server';
import { notFound } from 'next/navigation';

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }) {
  const review = await getReviewById(params.id, 'blog');
  if (!review) return { title: 'Blog Not Found' };
  return {
    title: `${review.title} | Pranav Writes`,
    description: review.description,
    alternates: { canonical: `/blogs/${review.id}` },
    openGraph: {
      title: `${review.title} | Pranav Writes`,
      description: review.description,
      url: `/blogs/${review.id}`,
      images: review.image ? [{ url: review.image }] : undefined,
      type: 'article',
    },
  };
}

export default async function BlogDetailPage({ params }) {
  const review = await getReviewById(params.id, 'blog');
  if (!review) notFound();
  return <ReviewDetail review={review} />;
}
