'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';
import PublicNav from '@/components/shared/PublicNav';
import Footer from '@/components/shared/Footer';

export default function PublicShell({ children }) {
  const pathname = usePathname();
  const router = useRouter();
  const isAdminRoute = pathname?.startsWith('/admin');

  // minimal navigation handler for Footer's changePage prop
  const changePage = (page) => {
    const map = {
      home: '/',
      about: '/about',
      blogs: '/blogs',
      movies: '/movies',
      books: '/books',
      products: '/products',
      contact: '/contact',
      reviews: '/reviews'
    };
    router.push(map[page] || `/${page}`);
  };

  const [showAdminLogin, setShowAdminLogin] = useState(false);

  if (isAdminRoute) {
    return <>{children}</>;
  }

  return (
    <>
      <PublicNav />
      {children}
      <Footer
        changePage={changePage}
        setShowAdminLogin={setShowAdminLogin}
        darkMode={false}
      />
    </>
  );
}
