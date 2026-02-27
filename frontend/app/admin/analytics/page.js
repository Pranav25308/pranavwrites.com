'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Visits from '@/app/components/admin/Visits';
import Analysis from '@/app/components/admin/Analysis';
import { DUMMY_ANALYTICS, DUMMY_CONTACTS, DUMMY_ROLES } from '@/app/admin/data';
import { DUMMY_REVIEWS } from '@/app/reviews/data';

export default function AnalyticsPage() {
  const router = useRouter();
  const [isAdmin, setIsAdmin] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('adminToken');
      if (token !== 'admin-token-123') {
        router.push('/admin');
        return;
      }
      setIsAdmin(true);
      setDarkMode(localStorage.getItem('darkMode') === 'true');
    }
  }, [router]);

  if (!isAdmin) {
    return null;
  }

  return (
    <div 
      data-testid="analytics-page"
      className={`min-h-screen transition-colors duration-300 ${
        darkMode 
          ? 'bg-slate-950 text-white' 
          : 'bg-gradient-to-br from-slate-50 via-purple-50/30 to-cyan-50/30 text-slate-900'
      }`}
    >
      <main className="container mx-auto px-4 py-8">
        <Visits analytics={DUMMY_ANALYTICS} />
        <div className="mt-12">
          <Analysis 
            reviews={DUMMY_REVIEWS} 
            contacts={DUMMY_CONTACTS} 
            roles={DUMMY_ROLES} 
          />
        </div>
      </main>
    </div>
  );
}
