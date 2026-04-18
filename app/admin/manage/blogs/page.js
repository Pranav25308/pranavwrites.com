'use client';

import Manage from '@/components/admin/Manage';
import { DUMMY_REVIEWS } from '@/app/reviews/data';

export default function ManageBlogsPage() {
  return <Manage currentPage="manage-blogs" reviews={DUMMY_REVIEWS} />;
}
