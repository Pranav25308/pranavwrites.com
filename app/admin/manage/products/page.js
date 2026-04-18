'use client';

import Manage from '@/components/admin/Manage';
import { DUMMY_REVIEWS } from '@/app/reviews/data';

export default function ManageProductsPage() {
  return <Manage currentPage="manage-products" reviews={DUMMY_REVIEWS} />;
}
