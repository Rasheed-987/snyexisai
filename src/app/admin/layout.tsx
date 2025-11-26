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

  useEffect(() => {
    getCurrentDate(setDate);
  }, []);

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
          <div className="w-full ml-10 2xl:ml-16 flex flex-col py-3 2xl:py-5">
            <h1 className="text-2xl 2xl:text-4xl font-medium text-foreground mb-1 2xl:mb-2">All {title}</h1>
            <p className="text-foreground text-sm 2xl:text-lg">Take a look at your progress for today {date}.</p>
          </div>
        )}
        {/* Page Content */}
        <main className="flex-1 overflow-y-auto">
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