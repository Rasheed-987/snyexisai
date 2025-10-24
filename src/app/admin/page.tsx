'use client'

export default function AdminHomePage() {
 
  if (typeof window !== 'undefined') {
    const cookies = document.cookie.split(';').map(c => c.trim());
    const authToken = cookies.find(c => c.startsWith('authToken='));
    if (authToken && authToken.split('=')[1] === 'mock-token') {
      window.location.href = '/admin/dashboard';
      return null;
    }
  }
  // Render nothing, let middleware handle unauthenticated redirect
  return null;
}