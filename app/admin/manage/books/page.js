'use client';

import Manage from '@/components/admin/Manage';
import { DUMMY_REVIEWS } from '@/app/reviews/data';

export default function ManageBooksPage() {
  return <Manage currentPage="manage-books" reviews={DUMMY_REVIEWS} />;
}
