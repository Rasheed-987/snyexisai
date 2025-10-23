'use client'
import './globals.css'

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Navigation } from '@/components/layout/Navigation'
import Footer from '@/components/layout/Footer'
import { usePathname } from 'next/navigation'
import {ServicesProvider} from '@/context/ServicesContext';
import { CaseStudyProvider } from '@/context/CaseStudyContext';




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
        <CaseStudyProvider>
 <ServicesProvider>        
          {!isAdmin ? (
            <>
              <Navigation />
              <main className="flex-1">{children}</main>
              <Footer />
            </>
          ) : (
           
              <main className="flex-1">{children}</main>
            )}
            </ServicesProvider>
            </CaseStudyProvider>
            </div>
      </body>
    </html>
  )
}