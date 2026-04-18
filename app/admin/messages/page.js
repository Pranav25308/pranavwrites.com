'use client';

import Messages from '@/components/admin/Messages';
import { DUMMY_CONTACTS } from '@/app/admin/data';

export default function AdminMessagesPage() {
  return <Messages contacts={DUMMY_CONTACTS} />;
}
