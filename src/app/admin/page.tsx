'use client'

export default function AdminHomePage() {
  if (typeof window !== 'undefined') {
    const isAuthenticated = localStorage.getItem('isAuthenticated');
    if (!isAuthenticated) {
      window.location.href = '/admin/login';
      return null;
    } else {
      window.location.href = '/admin/dashboard';
      return null;
    }
  }
  return null;
}