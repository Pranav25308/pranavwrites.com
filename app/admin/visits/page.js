'use client';

import Visits from '@/components/admin/Visits';
import { DUMMY_ANALYTICS } from '@/app/admin/data';

export default function AdminVisitsPage() {
  return <Visits analytics={DUMMY_ANALYTICS} />;
}
