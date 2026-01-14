// app/register/page.tsx
'use client';

import { useState, FormEvent } from 'react';
import { registerUser } from '@/app/api/Register/actions'; // Import the server action

export default function Register() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const [isLoading, setIsLoading] = useState(false);
    // Added specific state for error messages to show exact server feedback
    const [errorMessage, setErrorMessage] = useState('');
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

    const passwordMismatch = password && confirmPassword && password !== confirmPassword;

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (password !== confirmPassword) return;

        setIsLoading(true);
        setStatus('loading');
        setErrorMessage(''); // Clear previous errors

        try {
            // DIRECT CALL TO SERVER ACTION
            // No fetch, no headers, no JSON.stringify
            const result = await registerUser({
                name,
                email,
                password
            });

            if (result.success) {
                setStatus('success');
                // Clear form
                setName('');
                setEmail('');
                setPassword('');
                setConfirmPassword('');
            } else {
                setStatus('error');
                setErrorMessage(result.error || 'Registration failed');
            }
        } catch (error) {
            console.error('Registration failed:', error);
            setStatus('error');
            setErrorMessage('Something went wrong. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex min-h-screen flex-col bg-transparent items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
            <div className="w-full max-w-md space-y-8 bg-white p-10 shadow-xl rounded-xl">
                <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900">Register Page</h1>
                <p className="mt-2 text-sm text-gray-600">
                    Creating a new account.
                </p>
                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">
                            Preferred Name:
                        </label>
                        <div className="mt-2">
                            <input
                                id="name"
                                name="name"
                                type="text"
                                autoComplete="name"
                                required
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="block w-full rounded-md border-0 py-2 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#D2532B] sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>

                    <div>
                        <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
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
                        <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                            Password:
                        </label>
                        <div className="mt-2">
                            <input
                                id="password"
                                name="password"
                                type="password"
                                autoComplete="new-password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="block w-full rounded-md border-0 py-2 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#D2532B] sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>

                    <div>
                        <label htmlFor="confirmPassword" className="block text-sm font-medium leading-6 text-gray-900">
                            Confirm Password:
                        </label>
                        <div className="mt-2">
                            <input
                                id="confirmPassword"
                                name="confirmPassword"
                                type="password"
                                autoComplete="new-password"
                                required
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                className="block w-full rounded-md border-0 py-2 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#D2532B] sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full bg-[#253939] text-[#fef6e9] font-bold py-4 px-6 rounded-2xl hover:bg-[#D2532B] active:scale-95 transition-all duration-300 flex items-center justify-center gap-3 text-lg shadow-lg disabled:opacity-50"
                    >
                        {isLoading ? 'Registering...' : 'Register'}
                    </button>

                    {/* Feedback Messages */}
                    {status === 'success' && (
                        <p className="text-green-500 text-center font-medium">Registration successful!</p>
                    )}

                    {/* Display specific error message from server if available */}
                    {status === 'error' && (
                        <p className="text-red-500 text-center font-medium">
                            {errorMessage || "Registration failed. Please try again."}
                        </p>
                    )}

                    {passwordMismatch && (
                        <p className="text-red-500 text-center font-medium">Passwords do not match.</p>
                    )}
                </form>
            </div>
        </div>
    );
}