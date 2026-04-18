'use client';

import Analysis from '@/components/admin/Analysis';
import { DUMMY_ROLES, DUMMY_CONTACTS } from '@/app/admin/data';
import { DUMMY_REVIEWS } from '@/app/reviews/data';

export default function AdminAnalysisPage() {
  return (
    <Analysis
      reviews={DUMMY_REVIEWS}
      contacts={DUMMY_CONTACTS}
      roles={DUMMY_ROLES}
    />
  );
}
