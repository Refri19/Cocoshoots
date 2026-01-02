'use client';

import { usePathname } from 'next/navigation';
import Header from './ui/header'; // Check your import path
import Footer from './ui/footer'; // Check your import path
import { ThemeProvider } from "next-themes"; // Or import from your -provider.tsx

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  
  // Define routes where Header/Footer should be hidden
  const hideAppLayout = ['/login', '/Register', '/forgot-password'].includes(pathname);

  return (
    <ThemeProvider 
      attribute="class" 
      defaultTheme="system" 
      enableSystem 
      disableTransitionOnChange
    >
      {/* Conditionally render Header */}
      {!hideAppLayout && <Header />}

      <main className="max-w-6xl mx-auto px-6 py-10 w-full flex-1">
        {children}
      </main>

      {/* Conditionally render Footer */}
      {!hideAppLayout && <Footer />}
    </ThemeProvider>
  );
}