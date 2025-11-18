'use client'
import './globals.css'
import { useState } from 'react'

import { Navigation } from '@/components/layout/Navigation'
import Footer from '@/components/layout/Footer'
import { usePathname } from 'next/navigation'
import {ServicesProvider} from '@/context/ServicesContext';
import { CaseStudyProvider } from '@/context/CaseStudyContext';
import { ProjectProvider } from '@/context/ProjectContext';
import { CareerProvider } from '@/context/CareerContext';
import SmoothScroll from '@/components/ui/SmoothScroll';
import { QueryClient,QueryClientProvider } from '@tanstack/react-query';





export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathUrl = usePathname()
  const [queryClient] = useState(() => new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000, // 1 minute
        refetchOnWindowFocus: false,
      },
    },
  }))

  // Check if current route is an admin route
  const isAdmin = pathUrl?.startsWith('/admin')

  return (
    <html lang="en" >
      <body className="min-h-screen bg-background font-sans antialiased">
        <div className="relative flex min-h-screen flex-col">
        <QueryClientProvider client={queryClient}>
          <CareerProvider>
            <ProjectProvider>
              <CaseStudyProvider>
                <ServicesProvider>        
                  {!isAdmin ? (
                    <>
                      <Navigation />
                      <SmoothScroll smoothness={0.08}>
                        <main className="flex-1">{children}</main>
                        <Footer />
                      </SmoothScroll>
                    </>
                  ) : (
                    <main className="flex-1">{children}</main>
                  )}
                </ServicesProvider>
              </CaseStudyProvider>
            </ProjectProvider>
          </CareerProvider>
        </QueryClientProvider>
        </div>
      </body>
    </html>
  )
}