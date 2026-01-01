"use client";
  
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from './ui/header';
import React from "react"; 
import { Provider } from './theme-provider';
import { usePathname } from 'next/navigation';
import Footer from "./ui/footer";
import { SessionProvider } from "next-auth/react";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  
  const pathname = usePathname();
  const hideAppLayout = pathname === '/login' || pathname === '/Register' || pathname === '/forgot-password';

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} font-sans bg-white text-black dark:bg-black dark:text-white min-h-screen flex flex-col`}>
        
        {hideAppLayout ? (
          <main className="max-w-6xl mx-auto px-6 py-10 w-full flex-1">
            {children}
          </main>
        ) : (
          <SessionProvider>
          <Provider>
            <Header />
            <main className="max-w-6xl mx-auto px-6 py-10 w-full flex-1">
              {children}
            </main>
            <Footer />
          </Provider>
          </SessionProvider>

        )}
      </body>
    </html>
    
  );
}
