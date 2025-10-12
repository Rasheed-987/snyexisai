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

  // Show title section only on dashboard page
  const showTitleSection = pathname === '/admin/dashboard' || pathname === '/admin';

  return (
    <div className="h-screen flex bg-[#ECEFF3]">
      {/* Sidebar */}
      <Sidebar />
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <Header /> 
        
       
        {!showTitleSection && (
          <div className=' w-full ml-10 flex flex-col  py-3'>
            <h1 className="text-2xl font-medium text-[var(--foreground)] mb-1">All {title}</h1>
            <p className="text-gray-600 text-sm">Take a look your progress for today {date}.</p>
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