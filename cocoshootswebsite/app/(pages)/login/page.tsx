'use client';

import { useState, FormEvent } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // 1. Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // 2. SET THE COOKIE
      // In production, your API should set an 'HttpOnly' cookie.
      // For this demo, we set it via JS so the middleware sees it.
      document.cookie = "session=true; path=/; max-age=86400"; 
      
      // 3. Redirect to home
      router.push('/');
      router.refresh(); // Refresh to update middleware state
      
    } catch (error) {
      console.error('Login failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
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

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-[#253939] text-[#fef6e9] font-bold py-4 px-6 rounded-2xl hover:bg-[#D2532B] active:scale-95 transition-all duration-300 flex items-center justify-center gap-3 text-lg shadow-lg"
          >
            {isLoading ? 'Signing in...' : 'Sign in'}
          </button>
        </form>
      </div>
    </div>
  );
}