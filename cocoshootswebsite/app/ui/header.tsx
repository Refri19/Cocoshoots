"use client";

import { useEffect, useRef, useState } from 'react';
import Menuicon from './menuicon';

export default function Header() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [open, setOpen] = useState(false);
  const [userOpen, setUserOpen] = useState(false);
  const [navDropdownOpen, setNavDropdownOpen] = useState(false);
  const [AboutusDropdownOpen, setAboutusDropdownOpen] = useState(false);
  const [MoreDropdownOpen, setMoreDropdownOpen] = useState(false);
  const mobileRef = useRef<HTMLDivElement | null>(null);
  const firstLinkRef = useRef<HTMLAnchorElement | null>(null);
  const userRef = useRef<HTMLDivElement | null>(null);
  const navDropdownRef = useRef<HTMLDivElement | null>(null);
  const AboutusDropdownRef = useRef<HTMLDivElement | null>(null);
  const MoreDropdownRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!open) return;

    const prevActive = document.activeElement as HTMLElement | null;
    const menu = mobileRef.current;
    const selectors = `a[href], area[href], input:not([disabled]):not([type=hidden]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), [tabindex]:not([tabindex="-1"])`;

    // collect focusable elements inside the menu
    const focusableElements: HTMLElement[] = menu
      ? Array.from(menu.querySelectorAll<HTMLElement>(selectors)).filter((el) => !!(el.offsetWidth || el.offsetHeight || el.getClientRects().length))
      : [];

    const first = focusableElements[0] ?? null;
    const last = focusableElements[focusableElements.length - 1] ?? null;

    // Prevent body scroll while mobile menu is open
    const previousBodyOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    // focus the first focusable element (or the first link) after render
    setTimeout(() => {
      (first || firstLinkRef.current)?.focus();
    }, 50);

    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        e.preventDefault();
        setOpen(false);
        return;
      }

      if (e.key !== 'Tab') return;

      // If there are no focusable elements, prevent tabbing out
      if (focusableElements.length === 0) {
        e.preventDefault();
        return;
      }

      // Loop focus when tabbing forward/backwards
      const active = document.activeElement as HTMLElement | null;
      if (!active) return;

      if (!e.shiftKey && active === last) {
        // tabbed forward from last -> go to first
        e.preventDefault();
        first?.focus();
      } else if (e.shiftKey && active === first) {
        // shift+tabbed backwards from first -> go to last
        e.preventDefault();
        last?.focus();
      }
    }

    document.addEventListener('keydown', onKey);

    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = previousBodyOverflow;
      // restore focus to the element that had it prior to opening
      try {
        prevActive?.focus?.();
      } catch {}
    };
  }, [open]);

  // close when clicking outside the mobile panel
  useEffect(() => {
    function onDocClick(e: MouseEvent) {
      if (!open) return;
      if (!mobileRef.current) return;
      if (e.target instanceof Node && !mobileRef.current.contains(e.target)) setOpen(false);
    }

    document.addEventListener('mousedown', onDocClick);
    return () => document.removeEventListener('mousedown', onDocClick);
  }, [open]);

  // Close the user menu when clicking outside or pressing Escape
  useEffect(() => {
    if (!userOpen) return;

    function onDocClick(e: MouseEvent) {
      if (!userRef.current) return;
      if (e.target instanceof Node && !userRef.current.contains(e.target)) setUserOpen(false);
    }

    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') setUserOpen(false);
    }

    document.addEventListener('mousedown', onDocClick);
    document.addEventListener('keydown', onKey);

    return () => {
      document.removeEventListener('mousedown', onDocClick);
      document.removeEventListener('keydown', onKey);
    };
  }, [userOpen]);

  // Close the nav dropdown when clicking outside or pressing Escape
  useEffect(() => {
    if (!navDropdownOpen) return;

    function onDocClick(e: MouseEvent) {
      if (!navDropdownRef.current) return;
      if (e.target instanceof Node && !navDropdownRef.current.contains(e.target)) setNavDropdownOpen(false);
    }

    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') setNavDropdownOpen(false);
    }

    document.addEventListener('mousedown', onDocClick);
    document.addEventListener('keydown', onKey);

    return () => {
      document.removeEventListener('mousedown', onDocClick);
      document.removeEventListener('keydown', onKey);
    };
  }, [navDropdownOpen]);

  // Close the About us dropdown when clicking outside or pressing Escape
  useEffect(() => {
    if (!AboutusDropdownOpen) return;

    function onDocClick(e: MouseEvent) {
      if (!AboutusDropdownRef.current) return;
      if (e.target instanceof Node && !AboutusDropdownRef.current.contains(e.target)) setAboutusDropdownOpen(false);
    }

    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') setAboutusDropdownOpen(false);
    }

    document.addEventListener('mousedown', onDocClick);
    document.addEventListener('keydown', onKey);

    return () => {
      document.removeEventListener('mousedown', onDocClick);
      document.removeEventListener('keydown', onKey);
    };
  }, [AboutusDropdownOpen]);

  // Close the More dropdown when clicking outside or pressing Escape
  useEffect(() => {
    if (!MoreDropdownOpen) return;

    function onDocClick(e: MouseEvent) {
      if (!MoreDropdownRef.current) return;
      if (e.target instanceof Node && !MoreDropdownRef.current.contains(e.target)) setMoreDropdownOpen(false);
    }

    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') setMoreDropdownOpen(false);
    }

    document.addEventListener('mousedown', onDocClick);
    document.addEventListener('keydown', onKey);

    return () => {
      document.removeEventListener('mousedown', onDocClick);
      document.removeEventListener('keydown', onKey);
    };
  }, [MoreDropdownOpen]);


  return (
    <header className="w-full bg-[#fef6e9] text-[#253939] sticky top-0 z-40">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between gap-6">
        <div className="flex items-center gap-4">
        </div>

        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-[#253939] ml-auto">
          {/* Support the Studio dropdown */}
          <div ref={navDropdownRef} className="relative">
            <button
              onClick={() => setNavDropdownOpen((s) => !s)}
              aria-haspopup="true"
              aria-expanded={navDropdownOpen}
              aria-label={navDropdownOpen ? 'Close Support the Studio menu' : 'Open Support the Studio menu'}
              className="focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 rounded px-2 py-1"
            >
              Support the Studio
            </button>

            {/* Support the Studio submenu - visible on click */}
            {navDropdownOpen && (
              <div
                role="menu"
                aria-label="Support the Studio submenu"
                className="absolute left-0 mt-2 w-48 rounded-lg bg-white border border-gray-200 p-2 shadow-lg z-50"
              >

                <a role="menuitem" href="#" className="block px-3 py-2 rounded-md text-sm text-black hover:bg-gray-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400">Give us Feeback</a>
                <a role="menuitem" href="#" className="block px-3 py-2 rounded-md text-sm text-black hover:bg-gray-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400">Leave a tip</a>
                <a role="menuitem" href="#" className="block px-3 py-2 rounded-md text-sm text-black hover:bg-gray-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400">FAQ</a>
              </div>
            )}
          </div>

          {/* About us dropdown */}
          <div ref={AboutusDropdownRef} className="relative">
            <button
              onClick={() => setAboutusDropdownOpen((s) => !s)}
              aria-haspopup="true"
              aria-expanded={AboutusDropdownOpen}
              aria-label={AboutusDropdownOpen ? 'Close Aboutus menu' : 'Open Aboutus menu'}
              className="focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 rounded px-2 py-1"
            >
              About us
            </button>

            {AboutusDropdownOpen && (
              <div
                role="menu"
                aria-label="Aboutus submenu"
                className="absolute left-0 mt-2 w-48 rounded-lg bg-white border border-gray-200 p-2 shadow-lg z-50"
              >
                <a role="menuitem" href="#" className="block px-3 py-2 rounded-md text-sm text-black hover:bg-gray-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400">Our story</a>
                <a role="menuitem" href="#" className="block px-3 py-2 rounded-md text-sm text-black hover:bg-gray-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400">Meet the team</a>
              </div>
            )}
          </div>

          {/* More dropdown */}
          <div ref={MoreDropdownRef} className="relative">
            <button
              onClick={() => setMoreDropdownOpen((s) => !s)}
              aria-haspopup="true"
              aria-expanded={MoreDropdownOpen}
              aria-label={MoreDropdownOpen ? 'Close More menu' : 'Open More menu'}
              className="focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 rounded px-2 py-1"
            >
              More
            </button>

            {MoreDropdownOpen && (
              <div
                role="menu"
                aria-label="More submenu"
                className="absolute left-0 mt-2 w-48 rounded-lg bg-white border border-gray-200 p-2 shadow-lg z-50"
              >
                <a role="menuitem" href="#" className="block px-3 py-2 rounded-md text-sm text-black hover:bg-gray-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400">Blog</a>
                <a role="menuitem" href="#" className="block px-3 py-2 rounded-md text-sm text-black hover:bg-gray-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400">Post a photo</a>
              </div>
            )}
          </div>
        </nav>

        <div className="flex items-center gap-4 ml-auto">
          {/* Mobile menu + search toggle */}
          <div className="sm:hidden flex items-center gap-2">
            
            <button
              aria-label={open ? 'Close menu' : 'Open menu'}
              aria-expanded={open}
              aria-controls="mobile-menu"
              onClick={() => setOpen((s) => !s)}
              className="p-2 rounded-md hover:bg-white/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400"
            >
              <Menuicon />
            </button>
              
          </div>
           
          <div className="relative flex items-center gap-3">

            {/* User dropdown */}
              <div ref={userRef} className="relative" id="user-menu-container">
                <button
                  onClick={() => setUserOpen((s) => !s)}
                  aria-haspopup="true"
                  aria-expanded={userOpen}
                  aria-label={userOpen ? 'Close user menu' : 'Open user menu'}
                  className="w-9 h-9 rounded-full bg-slate-700/80 flex items-center justify-center text-xs focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400"
                >
                  JS
                </button>
                {/* Dropdown menu - desktop only */}
                {userOpen && (
                  <div
                    role="menu"
                    aria-label="User menu"
                    className="absolute right-0 mt-2 w-44 rounded-lg bg-white border border-gray-200 p-2 shadow-lg z-50"
                  >
                    <a role="menuitem" href="#" className="block px-3 py-2 rounded-md text-sm text-black hover:bg-gray-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400">Profile</a>
                    <a role="menuitem" href="#" className="block px-3 py-2 rounded-md text-sm text-black hover:bg-gray-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400">Settings</a>
                    <a role="menuitem" href="#" className="block px-3 py-2 rounded-md text-sm text-black hover:bg-gray-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400">Sign out</a>
                  </div>
                )}
              </div>
          </div>
        </div>

        {/* Mobile menu overlay */}
        {open && (
          <div className="md:hidden fixed inset-0 z-50 flex items-start justify-center">

            <div className="absolute inset-0 bg-black/50 transition-opacity" aria-hidden="true" />

              <div
              id="mobile-menu"
              role="dialog"
              aria-modal="true"
              aria-label="Mobile navigation menu"
              ref={mobileRef}
              className="relative mt-20 w-[92%] rounded-xl bg-white border border-gray-200 p-6 shadow-xl max-w-md mx-auto z-10 text-black"
            >
              
              <nav className="flex flex-col gap-4">
                <a href="#" className="px-2 py-2 rounded-md text-black hover:bg-gray-100">Give us Feedback</a>
                <a href="#" className="px-2 py-2 rounded-md text-black hover:bg-gray-100">Leave a tip</a>
                <a href="#" className="px-2 py-2 rounded-md text-black hover:bg-gray-100">FAQ</a>
                <a href="#" className="px-2 py-2 rounded-md text-black hover:bg-gray-100">Our story</a>
                <a href="#" className="px-2 py-2 rounded-md text-black hover:bg-gray-100">Meet the team</a>
                <a href="#" className="px-2 py-2 rounded-md text-black hover:bg-gray-100">Blog</a>
                <a href="#" className="px-2 py-2 rounded-md text-black hover:bg-gray-100">Post a Photo</a>


              </nav>

              <div className="mt-6 flex items-center gap-3">
                <div className="flex items-center bg-gray-100 rounded-md px-3 py-1 text-sm text-black w-full">
                  <input aria-label="Search" placeholder="Search..." className="bg-transparent outline-none placeholder:text-gray-400 text-sm w-full" />
                </div>
              </div>

              <div className="mt-6 flex items-center justify-between gap-3">
                <div className="w-9 h-9 rounded-full bg-slate-700/80 flex items-center justify-center text-xs">JS</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
