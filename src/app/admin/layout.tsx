'use client'
import Sidebar from '@/components/admin/Sidebar'
import Header from '@/components/admin/Header'
import { TitleProvider, useTitle } from '@/hooks/titleContext'
import { useEffect, useState } from 'react'


// Inner component that consumes the context
function AdminLayoutContent({ children }: { children: React.ReactNode }) {
  const [date, setDate] = useState('');
  const { title } = useTitle();

  useEffect(() => {
    const currentDate = new Date().toLocaleDateString();
    setDate(currentDate);
  }, []);



  return (
    <div className="h-screen flex bg-gray-50">
      {/* Sidebar */}
      <Sidebar />
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <Header />
        <div className='border-b border-gray-200 w-full flex flex-col px-6 py-3 bg-white'>
          <h1 className="text-2xl font-semibold text-[var(--foreground)] mb-1">All {title}</h1>
          <p className="text-gray-600 text-sm">Take a look your progress for today {date}.</p>
        </div>
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