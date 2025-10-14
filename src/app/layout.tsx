'use client'
import './globals.css'

import { Navigation } from '@/components/layout/Navigation'
import Footer from '@/components/layout/Footer'
import { usePathname } from 'next/navigation'




export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathUrl = usePathname()
  
  // Check if current route is an admin route
  const isAdmin = pathUrl?.startsWith('/admin')

  return (
    <html lang="en" >
      <body className="min-h-screen bg-background font-sans antialiased">
        <div className="relative flex min-h-screen flex-col">
          {!isAdmin ? (
            <>
              <Navigation />
              <main className="flex-1">{children}</main>
              <Footer />
            </>
          ) : (
            <main className="flex-1">{children}</main>
          )}
        </div>
      </body>
    </html>
  )
}