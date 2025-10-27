'use client'

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminHomePage() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to dashboard if authenticated
    // Middleware will handle redirecting to login if not authenticated
    router.push('/admin/dashboard');
  }, [router]);

  return null;
}