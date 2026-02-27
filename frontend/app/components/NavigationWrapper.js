'use client';

import { usePathname } from 'next/navigation';
import PublicNav from "./components/shared/PublicNav";
import Footer from "./components/shared/Footer";

export default function NavigationWrapper({ children }) {
  const pathname = usePathname();
  const isAdminRoute = pathname?.startsWith('/admin');

  // Don't show public nav and footer on admin routes
  if (isAdminRoute) {
    return <>{children}</>;
  }

  return (
    <>
      <PublicNav />
      {children}
      <Footer />
    </>
  );
}
