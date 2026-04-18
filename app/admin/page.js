'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminIndexPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/admin/visits');
  }, [router]);

  return (
    <div className="min-h-[40vh] flex items-center justify-center">
      <p className="text-slate-500 dark:text-slate-400">Redirecting...</p>
    </div>
  );
}
