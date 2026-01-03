'use client';

import { ThemeProvider } from "next-themes";
import { SessionProvider } from "next-auth/react";

export function themeProvider({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider 
      attribute="class" 
      defaultTheme="system" 
      enableSystem 
      disableTransitionOnChange
    >
      {children}
    </ThemeProvider>

  );
}
export function AuthProvider({ children, session }: any) {
  return <SessionProvider session={session}>{children}</SessionProvider>;
}