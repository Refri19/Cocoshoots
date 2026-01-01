'use client';

import { stat } from 'fs';
import {useState, FormEvent} from 'react';

export default function Register() {
    const [prefname, setPrefname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

    const passwordMismatch = password && confirmPassword && password !== confirmPassword;
    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            // TODO: Add your registration logic here (e.g., call your API)
            console.log('Registering with:', { email, password });

            // Simulate network delay
            await new Promise(resolve => setTimeout(resolve, 1000));

        } catch (error) {
            console.error('Registration failed:', error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex min-h-screen flex-col bg-transparent items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
            <div className="w-full max-w-md space-y-8 bg-white p-10 shadow-xl rounded-xl">
            <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900">Register Page</h1>
                      <p className="mt-2 text-sm text-gray-600">
            Creating a new account.
          </p>
            <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div>
              <label 
                htmlFor="PreferredName" 
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Preferred Name:
              </label>
              <div className="mt-2">
                <input
                  id="PreferredName"
                  name="PreferredName"
                  type="PreferredName"
                  autoComplete="PreferredName"
                  required
                  value={prefname}
                  onChange={(e) => setPrefname(e.target.value)}
                  className="block w-full rounded-md border-0 py-2 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#D2532B] sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div>
              <label 
                htmlFor="email" 
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full rounded-md border-0 py-2 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#D2532B] sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div>
              <label 
                htmlFor="Password" 
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Password:
              </label>
              <div className="mt-2">
                <input
                  id="Password"
                  name="Password"
                  type="Password"
                  autoComplete="Password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full rounded-md border-0 py-2 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#D2532B] sm:text-sm sm:leading-6"
                />
              </div>
            </div>
                        <div>
              <label 
                htmlFor="Password" 
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Confirm Password:
              </label>
              <div className="mt-2">
                <input
                  id="ConfirmPassword"
                  name="ConfirmPassword"
                  type="ConfirmPassword"
                  autoComplete="ConfirmPassword"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="block w-full rounded-md border-0 py-2 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#D2532B] sm:text-sm sm:leading-6"
                />
              </div>
            </div>
                <button type="submit" disabled={isLoading}
                className="w-full bg-[#253939] text-[#fef6e9] font-bold py-4 px-6 rounded-2xl hover:bg-[#D2532B] active:scale-95 transition-all duration-300 flex items-center justify-center gap-3 text-lg shadow-lg">
                    {isLoading ? 'Registering...' : 'Register'}
                </button>
                {status === 'success' && <p className="text-green-500">Registration successful!</p>}
                {status === 'error' && <p className="text-red-500">Registration failed. Please try again.</p>}
                {passwordMismatch && <p className="text-red-500">Passwords do not match. Please try again.</p>}
            </form>
            </div>
        </div>
    );
}