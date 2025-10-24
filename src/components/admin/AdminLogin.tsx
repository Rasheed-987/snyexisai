'use client';

import React, { useState } from 'react';
import Button from '@/components/ui/Button'; // same button used in ContactForm

export default function AdminLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Simulate login logic (replace with actual external auth API if needed)
      if (username === 'admin' && password === 'password') {
        document.cookie = `authToken=mock-token; path=/; secure; SameSite=Strict`;
        window.location.href = '/admin/dashboard';
      } else {
        throw new Error('Invalid username or password');
      }
    } catch (err: any) {
      setError(err.message || 'Something went wrong');
    }
  };

  const inputClass =
    'w-full h-[60px] px-4 py-3 bg-[#F9F9F9] border border-gray-200 rounded-lg text-[#0F1C3D] font-chillax text-sm focus:outline-none focus:ring-2 focus:ring-[#F9F9F9] focus:border-transparent transition-all';
  const labelClass =
    'block text-sm font-normal text-[#0F1C3D] font-chillax mb-2';

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#F9F9F9]">
      <div className="w-full max-w-md bg-white shadow-md rounded-2xl p-8 space-y-6">
        <h2 className="text-3xl font-normal text-[#0F1C3D] font-chillax text-center">
          Admin Login
        </h2>

        {error && (
          <p className="text-red-500 text-sm text-center mt-2">{error}</p>
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
            className="w-full h-[62px] bg-[#327AED] text-white rounded-full font-chillax text-sm hover:opacity-90 transition-all"
          >
            Login
          </Button>
        </form>
      </div>
    </div>
  );
}
