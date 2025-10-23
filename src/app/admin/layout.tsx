'use client'
import Sidebar from '@/components/admin/Sidebar'
import Header from '@/components/admin/Header'
import { TitleProvider, useTitle } from '@/hooks/titleContext'
import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import { getCurrentDate } from '@/utils/utils'

// Inner component that consumes the context
function AdminLayoutContent({ children }: { children: React.ReactNode }) {
  const [date, setDate] = useState('');
  const { title } = useTitle();
  const pathname = usePathname();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    getCurrentDate(setDate);
  }, []);
useEffect(() => {
  // Skip authentication check if we're on the login page
  if (pathname === '/admin/login') {
    setIsAuthenticated(true);
    return;
  }

  const checkAuth = async () => {
    try {
      const response = await fetch('/api/admin/auth-status', {
        method: 'GET',
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error('Not authenticated');
      }

      setIsAuthenticated(true);
    } catch (error) {
      setIsAuthenticated(false);
      window.location.href = '/admin/login';
    }
  };

  checkAuth();
}, [pathname]);

  // While checking auth, show a loading indicator
  if (isAuthenticated === null || isAuthenticated === false) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-20 w-20 border-b-2 border-gray-900 mx-auto"></div>
          <p className="mt-4 text-gray-600">Checking authentication...</p>
        </div>
      </div>
    );
  }

  // If we're on the login route, render the page children without admin chrome (full-screen)
  if (pathname === '/admin/login') {
    return (
      <main className="min-h-screen w-full">
        {children}
      </main>
    );
  }

  // For all other /admin* routes (including /admin), render sidebar/header + children
  return (
    <div className="h-screen flex bg-[#ECEFF3]">
      {/* Sidebar */}
      <Sidebar />
      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <Header />
        {/* Page Title and Date */}
        {pathname !== '/admin' && pathname !== '/admin/dashboard' && (
          <div className=' w-full ml-10 flex flex-col  py-3'>
            <h1 className="text-2xl font-medium text-[var(--foreground)] mb-1">All {title}</h1>
            <p className="text-gray-600 text-sm">Take a look at your progress for today {date}.</p>
          </div>
        )}
        {/* Page Content */}
        <main className="flex-1  overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}

// Main layout component with provider
export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <TitleProvider>
      <AdminLayoutContent>
        {children}
      </AdminLayoutContent>
    </TitleProvider>
  )
}