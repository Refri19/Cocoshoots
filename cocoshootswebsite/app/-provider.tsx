'use client'; // Ensure this is at the top

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
export function sessionProvider({children}:{children:React.ReactNode})
{
  return(
    <SessionProvider>
      {children}
    </SessionProvider>
  );
}