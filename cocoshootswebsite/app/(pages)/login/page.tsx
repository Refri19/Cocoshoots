'use client';

import { useState, FormEvent } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  // Separate loading states so we know which button was clicked
  const [isLoading, setIsLoading] = useState(false);
  const [isFBLoading, setIsFBLoading] = useState(false);
  
  const router = useRouter();

  // 1. Shared Login Logic (Simulation)
  const handleLoginSuccess = async () => {
    try {
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Set cookie
      document.cookie = "session=true; path=/; max-age=86400"; 
      
      // Redirect
      router.push('/');
      router.refresh();
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  // 2. Handle Standard Email Login
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    await handleLoginSuccess();
    setIsLoading(false);
  };

  // 3. Handle Facebook Login
  const handleFacebookLogin = async () => {
    setIsFBLoading(true);
    // NOTE: In a real app, this is where you call: signIn('facebook')
    await signIn("facebook", { callbackUrl: '/' });
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-transparent px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8 bg-white p-10 shadow-xl rounded-xl">
        <div className="text-center">
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-gray-900">Welcome</h2>
          <p className="mt-2 text-sm text-gray-600">Please sign in to your account</p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-5">
            <div>
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">Email address</label>
              <div className="mt-2">
                <input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full rounded-md border-0 py-2 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-[#D2532B] sm:text-sm"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between flex-wrap gap-2">
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">Password</label>
                <div className="text-sm flex flex-row">
                  <Link href="/forgot-password" size-sm="true" className="font-semibold text-[#253939] hover:text-[#D2532B]">Forgot password?</Link>
                  <p className="mx-2"> / </p>
                  <Link href="/Register" className="font-semibold text-[#253939] hover:text-[#D2532B]">First time?</Link>
                </div>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full rounded-md border-0 py-2 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-[#D2532B] sm:text-sm"
                />
              </div>
            </div>
          </div>

          <div className="space-y-4">
            {/* STANDARD SIGN IN BUTTON */}
            <button
              type="submit"
              disabled={isLoading || isFBLoading}
              className="w-full bg-[#253939] text-[#fef6e9] font-bold py-4 px-6 rounded-2xl hover:bg-[#D2532B] active:scale-95 transition-all duration-300 flex items-center justify-center gap-3 text-lg shadow-lg disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Signing in...' : 'Sign in'}
            </button>

            {/* DIVIDER */}
            <div className="relative flex py-2 items-center">
                <div className="flex-grow border-t border-gray-200"></div>
                <span className="flex-shrink-0 mx-4 text-gray-400 text-xs uppercase font-bold">Or continue with</span>
                <div className="flex-grow border-t border-gray-200"></div>
            </div>

            {/* FACEBOOK SIGN UP BUTTON */}
            <button
              type="button"
              onClick={handleFacebookLogin}
              disabled={isLoading || isFBLoading}
              className="w-full bg-[#1877F2] text-white font-bold py-4 px-6 rounded-2xl hover:bg-[#166fe5] active:scale-95 transition-all duration-300 flex items-center justify-center gap-3 text-lg shadow-lg disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isFBLoading ? (
                'Connecting...'
              ) : (
                <>
                  {/* Inline Facebook SVG Logo */}
                  <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                  Facebook
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}