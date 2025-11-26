'use client';

import React, { useState } from 'react';
import Button from '@/components/ui/Button'; // same button used in ContactForm

export default function AdminLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await fetch('/api/admin/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', // Include cookies in the request
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();
      console.log('Login response:', data);
      console.log('Response headers:', response.headers);

      if (response.ok) {
        console.log('Login successful, redirecting...');
        // Force a reload to ensure middleware picks up the cookie
        window.location.replace('/admin/dashboard');
      } else {
        setError(data.message || 'Invalid username or password');
      }
    } catch (err: any) {
      setError(err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    'w-full h-[60px] 2xl:h-[80px] px-4 py-3 2xl:px-6 2xl:py-5 bg-background border border-gray-200 rounded-lg text-foreground font-chillax text-sm 2xl:text-xl focus:outline-none focus:ring-2 focus:ring-background focus:border-transparent transition-all';
  const labelClass =
    'block text-sm 2xl:text-xl font-normal text-foreground font-chillax mb-2 2xl:mb-3';

  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <div className="w-full max-w-md 2xl:max-w-2xl bg-white shadow-md rounded-2xl p-8 2xl:p-12 space-y-6 2xl:space-y-10">
        <h2 className="text-3xl 2xl:text-5xl font-normal text-foreground font-chillax text-center">
          Admin Login
        </h2>

        {error && (
          <p className="text-red-500 text-sm 2xl:text-lg text-center mt-2">{error}</p>
        )}

        <form onSubmit={handleLogin} className="space-y-6">
          {/* Username */}
          <div>
            <label htmlFor="username" className={labelClass}>
              Username*
            </label>
            <input
              id="username"
              name="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className={inputClass}
              placeholder="Enter your username"
              required
            />
          </div>

          {/* Password */}
          <div>
            <label htmlFor="password" className={labelClass}>
              Password*
            </label>
            <input
              id="password"
              name="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={inputClass}
              placeholder="Enter your password"
              required
            />
          </div>

          {/* Submit */}
          <Button
            type="submit"
            disabled={loading}
            className="w-full h-[62px] 2xl:h-[80px] bg-primary text-white rounded-full font-chillax text-sm 2xl:text-xl hover:opacity-90 transition-all disabled:opacity-50"
          >
            {loading ? 'Logging in...' : 'Login'}
          </Button>
        </form>
      </div>
    </div>
  );
}
