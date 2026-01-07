'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

export default function InlineSwitch() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="h-7 w-12 rounded-full bg-slate-200 dark:bg-slate-800 animate-pulse" />;
  }

  const isDarkMode = theme === 'dark';

  return (
    <button
      type="button"
      role="switch"
      aria-checked={isDarkMode}
      onClick={() => setTheme(isDarkMode ? 'light' : 'dark')}
      className={`
        relative inline-flex h-7 w-12 shrink-0 cursor-pointer rounded-full border-2 border-transparent 
        transition-colors duration-500 ease-in-out focus:outline-none focus:ring-2 
        focus:ring-brand-orange focus:ring-offset-2 active:scale-95 transform
        ${isDarkMode ? 'bg-orange-600' : 'bg-slate-300'}
      `}
    >
      <span className="sr-only">Toggle dark mode</span>
      
      {/* Visual Icons for better UX */}
      <div className="absolute inset-0 flex items-center justify-between px-1 pointer-events-none">
        <span className={`text-[10px] transition-opacity duration-300 ${isDarkMode ? 'opacity-0' : 'opacity-100 text-slate-500'}`}>
          ☀️
        </span>
        <span className={`text-[10px] transition-opacity duration-300 ${isDarkMode ? 'opacity-100 text-white' : 'opacity-0'}`}>
          🌙
        </span>
      </div>

      {/* The Knob */}
      <span
        className={`
          pointer-events-none relative inline-block h-6 w-6 transform rounded-full bg-white shadow-lg 
          ring-0 transition-all duration-500 cubic-bezier(0.34, 1.56, 0.64, 1)
          ${isDarkMode ? 'translate-x-5 rotate-0' : 'translate-x-0 rotate-180'}
        `}
      >
        <span 
          className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${isDarkMode ? 'opacity-100' : 'opacity-0'}`}
        >
          <div className="w-1 h-1 bg-orange-200 rounded-full" />
        </span>
      </span>
    </button>
  );
}