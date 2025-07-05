// nextjs/src/app/login/page.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (res.ok) {
        router.push('/dashboard'); // Redirect to the dashboard or the desired page
      } else {
        const { error } = await res.json();
        setError(error);
      }
    } catch (err) {
      setError('An error occurred while logging in. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-900 to-indigo-800">
      <div className="relative w-full max-w-md">
        <div className="absolute inset-0 bg-cover bg-center z-0" style={{ backgroundImage: "url('/winter-landscape.jpg')" }} />
        <div className="relative bg-white bg-opacity-30 backdrop-filter backdrop-blur-lg rounded-3xl shadow-xl p-8 z-10">
          <h2 className="text-3xl font-bold text-white text-center mb-6">Login</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="sr-only">Email</label>
              <input
                id="email"
                type="email"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white bg-opacity-90 text-black"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">Password</label>
              <input
                id="password"
                type="password"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white bg-opacity-90 text-black"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-white">
                  Remember Me
                </label>
              </div>
              <div className="text-sm">
                <a href="#" className="font-medium text-white hover:text-indigo-100">
                  Forget Password
                </a>
              </div>
            </div>
            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Log in
              </button>
            </div>
          </form>
          {error && <p className="mt-4 text-center text-sm text-red-600">{error}</p>}
          <p className="mt-4 text-center text-sm text-white">
            Don't have an account?{' '}
            <Link href="/signup" className="font-medium text-indigo-200 hover:text-indigo-100">
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
