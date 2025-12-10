"use client";
  
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from './ui/header';
import React from "react"; 


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});



const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} font-sans bg-white text-black dark:bg-black dark:text-white min-h-screen flex flex-col`}>
        <Header />
        <main className="max-w-6xl mx-auto px-6 py-10 w-full flex-1">
          {children}
        </main>
      </body>
    </html>
  );
};

export default Layout;