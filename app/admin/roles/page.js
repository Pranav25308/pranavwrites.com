'use client';

import Roles from '@/components/admin/Roles';
import { DUMMY_ROLES } from '@/app/admin/data';

export default function AdminRolesPage() {
  return <Roles roles={DUMMY_ROLES} />;
}
