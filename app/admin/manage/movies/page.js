'use client';

import Manage from '@/components/admin/Manage';
import { DUMMY_REVIEWS } from '@/app/reviews/data';

export default function ManageMoviesPage() {
  return <Manage currentPage="manage-movies" reviews={DUMMY_REVIEWS} />;
}
