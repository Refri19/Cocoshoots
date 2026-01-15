"use client";

import { useEffect, useRef, useState } from 'react';
import { useTheme } from 'next-themes';
import MenuBarIcon from './components/menuicon';
import Facebookicon from './components/facebook-icon';
// REMOVED: import { handleLogoutAction } from '@/app/actions';
// ADDED: signOut to the imports below
import { useSession, signIn, signOut } from 'next-auth/react';
import Link from "next/link";

/**
 * FIXED: Inline Menu Icon
 */
function InlineSwitch() {
  const { theme, setTheme } = useTheme();
  const isDarkMode = theme === 'dark';

  const handleToggle = () => {
    setTheme(isDarkMode ? 'light' : 'dark');
  };
  return (
      <button
          type="button"
          role="switch"
          aria-checked={isDarkMode}
          onClick={handleToggle}
          className={`${
              isDarkMode ? 'bg-[#D2532B]' : 'bg-slate-700'
          } relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-[#D2532B] focus:ring-offset-2`}
      >
        <span className="sr-only">Toggle dark mode</span>
        <span
            className={`${
                isDarkMode ? 'translate-x-5' : 'translate-x-0'
            } pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out`}
        />
      </button>
  );
}

export default function Header() {
  const { data: session } = useSession();
  const [open, setOpen] = useState(false);
  const [userOpen, setUserOpen] = useState(false);
  const [navDropdownOpen, setNavDropdownOpen] = useState(false);
  const [AboutusDropdownOpen, setAboutusDropdownOpen] = useState(false);
  const [MoreDropdownOpen, setMoreDropdownOpen] = useState(false);

  const mobileRef = useRef<HTMLDivElement | null>(null);
  const userRef = useRef<HTMLDivElement | null>(null);
  const navDropdownRef = useRef<HTMLDivElement | null>(null);
  const AboutusDropdownRef = useRef<HTMLDivElement | null>(null);
  const MoreDropdownRef = useRef<HTMLDivElement | null>(null);

  const navItemClass = `transition-all duration-200 active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D2532B] rounded-lg px-3 py-2 hover:bg-[#D2532B] hover:text-[#fef6e9] font-bold text-sm flex items-center gap-1`;
  const dropdownClass = "absolute left-0 mt-2 w-52 rounded-2xl bg-white border border-gray-100 p-2 shadow-2xl z-50 animate-in fade-in zoom-in-95 duration-200 origin-top-left";

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      const target = e.target as Node;
      if (userOpen && userRef.current && !userRef.current.contains(target)) setUserOpen(false);
      if (navDropdownOpen && navDropdownRef.current && !navDropdownRef.current.contains(target)) setNavDropdownOpen(false);
      if (AboutusDropdownOpen && AboutusDropdownRef.current && !AboutusDropdownRef.current.contains(target)) setAboutusDropdownOpen(false);
      if (MoreDropdownOpen && MoreDropdownRef.current && !MoreDropdownRef.current.contains(target)) setMoreDropdownOpen(false);
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [userOpen, navDropdownOpen, AboutusDropdownOpen, MoreDropdownOpen]);

  // NEW: Dedicated Logout Function
  const handleLogout = () => {
    // This removes the cookie and redirects the user to the homepage
    signOut({ callbackUrl: '/' });
  };

  return (
      <header className="w-full bg-[#fef6e9] text-[#253939] sticky top-0 z-50 border-b border-black/5 backdrop-blur-md bg-opacity-95">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

          <div className="flex items-center">
            <Link href="/" className="transition-all active:scale-95 duration-200 flex items-center">
              <img
                  src="cocoshoots-logo.png"
                  alt="Cocoshoots Logo"
                  className="h-12 w-auto max-w-45 object-contain"
              />
            </Link>
          </div>

          {/* DESKTOP NAV */}
          <nav className="hidden lg:flex items-center gap-2 ml-auto">
            {/* ... (Nav items unchanged) ... */}
            <div ref={navDropdownRef} className="relative">
              <button
                  onClick={() => setNavDropdownOpen(!navDropdownOpen)}
                  className={`${navItemClass} ${navDropdownOpen ? 'bg-[#D2532B] text-[#fef6e9]' : ''}`}
              >
                Studio Support <ChevronDownIcon />
              </button>
              {navDropdownOpen && (
                  <div className={dropdownClass}>
                    <DropdownLink href="/Feedback" label="Give Feedback" desc="Help us grow" />
                    <DropdownLink href="/Tip" label="Leave a Tip" desc="Support us" />
                    <DropdownLink href="/FAQ" label="Help Center" desc="Common questions" />
                  </div>
              )}
            </div>

            <div ref={AboutusDropdownRef} className="relative">
              <button
                  onClick={() => setAboutusDropdownOpen(!AboutusDropdownOpen)}
                  className={`${navItemClass} ${AboutusDropdownOpen ? 'bg-[#D2532B] text-[#fef6e9]' : ''}`}
              >
                About Us <ChevronDownIcon />
              </button>
              {AboutusDropdownOpen && (
                  <div className={dropdownClass}>
                    <DropdownLink href="/OurStory" label="Our Story" desc="How we started" />
                    <DropdownLink href="/Team" label="Meet the Team" desc="The faces behind" />
                  </div>
              )}
            </div>

            <div ref={MoreDropdownRef} className="relative">
              <button
                  onClick={() => setMoreDropdownOpen(!MoreDropdownOpen)}
                  className={`${navItemClass} ${MoreDropdownOpen ? 'bg-[#D2532B] text-[#fef6e9]' : ''}`}
              >
                Community <ChevronDownIcon />
              </button>
              {MoreDropdownOpen && (
                  <div className={dropdownClass}>
                    <DropdownLink href="/Blog" label="Studio Blog" desc="Latest updates" />
                    <DropdownLink href="/Share" label="Share our story" desc="Help us spread the word" />
                    <DropdownLink href="/Venue" label="Venues" desc="Schedule now for your event" />
                  </div>
              )}
            </div>
          </nav>

          {/* USER ACTIONS */}
          <div className="flex items-center gap-3">
            <button className="hidden sm:flex items-center gap-2 bg-[#253939] text-white px-5 py-2.5 rounded-xl text-sm font-black hover:bg-[#D2532B] transition-all active:scale-95 shadow-lg shadow-[#253939]/10">
              <Facebookicon />
              Post Photo
            </button>

            {/* USER PROFILE SECTION */}
            <div ref={userRef} className="relative">
              <button
                  onClick={() => setUserOpen(!userOpen)}
                  className="w-10 h-10 rounded-full bg-[#253939] text-[#fef6e9] flex items-center justify-center font-black text-xs shadow-lg hover:shadow-xl transition-all active:scale-90 border-2 border-white overflow-hidden"
              >
                {session?.user?.image ? (
                    <img
                        src={session.user.image}
                        alt={session.user.name || "User"}
                        className="w-full h-full object-cover"
                    />
                ) : (
                    session?.user?.name ? session.user.name.substring(0, 2).toUpperCase() : "JS"
                )}
              </button>

              {userOpen && (
                  <div className={`${dropdownClass} right-0 left-auto origin-top-right w-64`}>
                    <div className="px-4 py-3 border-b border-gray-50 mb-2">
                      <p className="text-sm font-black text-[#253939]">
                        {session?.user?.name || "Guest"}
                      </p>
                      {session?.user?.email && (
                          <p className="text-[10px] text-gray-400">{session.user.email}</p>
                      )}
                    </div>

                    <DropdownLink href="/Profile" label="Your Profile" desc="Edit your personal information" />

                    <div className="flex justify-between items-center px-4 py-3 bg-gray-50 rounded-xl my-2">
                      <div className="flex flex-col">
                        <span className="text-sm font-bold">Dark mode</span>
                        <span className="text-[10px] text-gray-400">Night visibility</span>
                      </div>
                      <InlineSwitch />
                    </div>

                    {!session ? (
                        <button
                            onClick={() => signIn()}
                            className="group flex flex-col w-full px-4 py-3 rounded-xl transition-all active:scale-95 mb-1 text-[#253939] hover:bg-[#D2532B] hover:text-white"
                        >
                          <span className="text-sm font-black text-left">Sign in</span>
                          <span className="text-[10px] text-gray-400 group-hover:text-white/70 text-left">Log in to your account</span>
                        </button>
                    ) : (
                        <button
                            onClick={handleLogout}
                            className="group flex flex-col w-full px-4 py-3 rounded-xl transition-all active:scale-95 mb-1 text-[#253939] hover:bg-[#D2532B] hover:text-white"
                        >
                          <span className="text-sm font-black text-left">Logout</span>
                          <span className="text-[10px] text-gray-400 group-hover:text-white/70 text-left">Sign out of your account</span>
                        </button>
                    )}
                  </div>
              )}
            </div>

            {/* MOBILE MENU TRIGGER (Always visible on mobile) */}
            <button
                onClick={() => setOpen(!open)}
                className="lg:hidden p-2.5 rounded-xl bg-gray-100 text-[#253939] hover:bg-gray-200 transition-all active:scale-90"
            >
              <MenuBarIcon />
            </button>
          </div>
        </div>

        {/* MOBILE MENU */}
        {open && (
            <div className="lg:hidden fixed inset-0 z-[60]">
              <div
                  className="absolute inset-0 bg-[#253939]/40 backdrop-blur-sm animate-in fade-in duration-300"
                  onClick={() => setOpen(false)}
              />
              <div
                  ref={mobileRef}
                  className="relative w-full bg-white rounded-b-4xl p-6 shadow-2xl animate-in slide-in-from-top-full duration-500 ease-out"
              >
                <div className="flex items-center justify-between mb-6">
                  <span className="text-xl font-black text-[#253939]">Navigation</span>
                  <button
                      onClick={() => setOpen(false)}
                      className="p-3 rounded-full bg-gray-100 hover:bg-gray-200 transition-all active:scale-90"
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="18" y1="6" x2="6" y2="18"></line>
                      <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                  </button>
                </div>
                <nav className="grid grid-cols-1 sm:grid-cols-2 gap-3 pb-4">
                  <MobileLink href="/Feedback" label="Studio Feedback" />
                  <MobileLink href="/Tip" label="Leave a Tip" />
                  <MobileLink href="/FAQ" label="Help Center" />
                  <MobileLink href="/OurStory" label="Our Story" />
                  <MobileLink href="/Team" label="Meet the Team" />
                  <MobileLink href="/Blog" label="Studio Blog" />
                  <div className="sm:col-span-2 h-px bg-gray-100 my-2" />
                  {/* UPDATED: Mobile Logout */}
                  <button
                      onClick={handleLogout}
                      className="w-full text-left px-5 py-4 rounded-2xl text-base font-black transition-all active:scale-95 text-red-500 bg-red-50 hover:bg-red-100"
                  >
                    Sign Out
                  </button>
                </nav>
              </div>
            </div>
        )}
      </header>
  );
}

// ... (ChevronDownIcon, DropdownLink, and MobileLink functions remain unchanged)
function ChevronDownIcon() {
  return (
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="6 9 12 15 18 9"></polyline>
      </svg>
  );
}

function DropdownLink({ href, label, desc, variant = 'default' }: { href: string, label: string, desc?: string, variant?: 'default' | 'danger' }) {
  return (
      <a
          href={href}
          className={`group flex flex-col px-4 py-3 rounded-xl transition-all active:scale-95 mb-1 ${
              variant === 'danger'
                  ? 'text-red-500 hover:bg-red-50'
                  : 'text-[#253939] hover:bg-[#D2532B] hover:text-white'
          }`}
      >
        <span className="text-sm font-black">{label}</span>
        {desc && <span className={`text-[10px] ${variant === 'danger' ? 'text-red-300' : 'text-gray-400 group-hover:text-white/70'}`}>{desc}</span>}
      </a>
  );
}

function MobileLink({ href, label, variant = 'default' }: { href: string, label: string, variant?: 'default' | 'danger' }) {
  return (
      <a
          href={href}
          className={`block px-5 py-4 rounded-2xl text-base font-black transition-all active:scale-95 ${
              variant === 'danger'
                  ? 'text-red-500 bg-red-50'
                  : 'text-[#253939] bg-gray-50 hover:bg-gray-100'
          }`}
      >
        {label}
      </a>
  );
}