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
      <head>
        {/* Preconnect hints for faster resource loading */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* Google Fonts - combined for fewer requests */}
        <link 
          href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&family=Inter:wght@400;500;600;700&display=swap" 
          rel="stylesheet"
        />
        
        {/* Preload critical WOFF2 fonts */}
        <link rel="preload" as="font" href="/fonts/WEB/fonts/Chillax-Regular.woff2" type="font/woff2" crossOrigin="anonymous" />
        <link rel="preload" as="font" href="/fonts/WEB/fonts/Chillax-Medium.woff2" type="font/woff2" crossOrigin="anonymous" />
        
        {/* Preload LCP image for faster rendering */}
        <link rel="preload" as="image" href="/images/Mask group.png" fetchPriority="high" />
      </head>
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