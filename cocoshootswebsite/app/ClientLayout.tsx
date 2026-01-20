'use client';

import { usePathname } from 'next/navigation';
import Header from './ui/header';
import Footer from './ui/footer';
import { ThemeProvider } from "next-themes";
import { useSession } from 'next-auth/react';

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { status } = useSession();
  const authRoutes = ['/login', '/Register', '/forgot-password', '/admin'];
  const isAuthRoute = authRoutes.includes(pathname);
  const isLandingPage = pathname === '/' && status === 'unauthenticated';
  const hideAppLayout = isAuthRoute || isLandingPage;
  const containerClass = hideAppLayout
      ? "w-full flex-1"
      : "max-w-6xl mx-auto px-6 py-10 w-full flex-1";

  return (
      <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
      >
        {!hideAppLayout && <Header />}
        <main className={containerClass}>
          {children}
        </main>
        {!hideAppLayout && <Footer />}
      </ThemeProvider>
  );
}