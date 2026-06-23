'use client';

import { usePathname, useRouter } from 'next/navigation';
import { Suspense, useEffect } from 'react';
import PublicNav from '@/components/shared/PublicNav';
import Footer from '@/components/shared/Footer';
import NavigationProgress from '@/components/shared/NavigationProgress';
import ChatbotWidget from '@/components/shared/ChatbotWidget';
import { ThemeProvider, useTheme } from '@/components/theme/ThemeProvider';
import { useSiteSettings } from '@/hooks/useSiteSettings';

function InnerShell({ children, isAdminRoute }) {
  const { darkMode } = useTheme();
  const { settings } = useSiteSettings();
  const pathname = usePathname();
  const router = useRouter();

  // Scroll to top on every route change / refresh
  useEffect(() => {
    if (typeof window !== 'undefined') {
      if ('scrollRestoration' in window.history) {
        window.history.scrollRestoration = 'manual';
      }
      window.scrollTo(0, 0);
    }
  }, [pathname]);

  const changePage = (page) => {
    const map = {
      home: '/',
      about: '/about',
      blogs: '/blogs',
      movies: '/movies',
      books: '/books',
      products: '/products',
      contact: '/contact',
      reviews: '/reviews',
    };
    router.push(map[page] || `/${page}`);
  };

  if (isAdminRoute) {
    return <>{children}</>;
  }

  const chatbotEnabled = settings?.features?.chatbot !== false;

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        darkMode
          ? 'bg-slate-950 text-white'
          : 'bg-gradient-to-br from-slate-50 via-purple-50/30 to-cyan-50/30 text-slate-900'
      }`}
    >
      <PublicNav />
      {children}
      <Footer changePage={changePage} />
      {chatbotEnabled && <ChatbotWidget />}
    </div>
  );
}

export default function PublicShell({ children }) {
  const pathname = usePathname();
  const isAdminRoute = pathname?.startsWith('/admin');

  return (
    <ThemeProvider>
      <Suspense fallback={null}>
        <NavigationProgress />
      </Suspense>
      <InnerShell isAdminRoute={isAdminRoute}>{children}</InnerShell>
    </ThemeProvider>
  );
}
