'use client';

import React, { useState, useEffect } from 'react';
import Button from '@/components/ui/Button';

export default function AdminSettings() {
  const [currentUsername, setCurrentUsername] = useState('');
  const [username, setUsername] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Fetch current username on mount
    fetchCurrentUsername();
  }, []);

  const fetchCurrentUsername = async () => {
    try {
      const response = await fetch('/api/admin/settings');
      if (response.ok) {
        const data = await response.json();
        setCurrentUsername(data.username);
        setUsername(data.username);
      }
    } catch (error) {
      console.error('Failed to fetch current username:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    // Validation
    if (!username || username.trim() === '') {
      setError('Username is required');
      return;
    }

    // If password fields are filled, validate
    if (newPassword || currentPassword || confirmPassword) {
      if (!currentPassword) {
        setError('Current password is required to change password');
        return;
      }

      if (!newPassword) {
        setError('New password is required');
        return;
      }

      if (newPassword.length < 3) {
        setError('New password must be at least 3 characters long');
        return;
      }

      if (newPassword !== confirmPassword) {
        setError('New passwords do not match');
        return;
      }
    }

    setLoading(true);

    try {
      const response = await fetch('/api/admin/settings', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          currentPassword: newPassword ? currentPassword : undefined,
          newPassword: newPassword || undefined,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess('Settings updated successfully');
        setCurrentUsername(data.username);
        // Clear password fields
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
      } else {
        setError(data.message || 'Failed to update settings');
      }
    } catch (err: any) {
      setError(err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    'w-full h-[60px] px-4 py-3 bg-background border border-gray-200 rounded-lg text-foreground font-chillax text-sm focus:outline-none focus:ring-2 focus:ring-background focus:border-transparent transition-all';
  const labelClass =
    'block text-sm font-normal text-foreground font-chillax mb-2';

  return (
    <div className="flex items-center justify-center min-h-screen bg-background p-4">
      <div className="w-full max-w-md bg-white shadow-md rounded-2xl p-8 space-y-6">
        <h2 className="text-3xl font-normal text-foreground font-chillax text-center">
          Admin Settings
        </h2>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg">
            {error}
          </div>
        )}

        {success && (
          <div className="bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-lg">
            {success}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
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

          {/* Current Password (only if changing password) */}
          <div>
            <label htmlFor="currentPassword" className={labelClass}>
              Current Password
            </label>
            <input
              id="currentPassword"
              name="currentPassword"
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              className={inputClass}
              placeholder="Enter current password (only if changing password)"
            />
          </div>

          {/* New Password */}
          <div>
            <label htmlFor="newPassword" className={labelClass}>
              New Password
            </label>
            <input
              id="newPassword"
              name="newPassword"
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className={inputClass}
              placeholder="Enter new password (leave blank to keep current)"
            />
          </div>

          {/* Confirm Password */}
          <div>
            <label htmlFor="confirmPassword" className={labelClass}>
              Confirm New Password
            </label>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className={inputClass}
              placeholder="Confirm new password"
            />
          </div>

          {/* Submit */}
          <Button
            type="submit"
            disabled={loading}
            className="w-full h-[62px] bg-primary text-white rounded-full font-chillax text-sm hover:opacity-90 transition-all disabled:opacity-50"
          >
            {loading ? 'Updating...' : 'Update Settings'}
          </Button>
        </form>
      </div>
    </div>
  );
}
