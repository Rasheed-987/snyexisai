'use client'
import './globals.css'
import { useState } from 'react'
import dynamic from 'next/dynamic'
import { Roboto, Inter } from 'next/font/google'
import localFont from 'next/font/local'

import { Navigation } from '@/components/layout/Navigation'
import { usePathname } from 'next/navigation'
import {ServicesProvider} from '@/context/ServicesContext';
import { CaseStudyProvider } from '@/context/CaseStudyContext';
import { ProjectProvider } from '@/context/ProjectContext';
import { CareerProvider } from '@/context/CareerContext';
import { QueryClient,QueryClientProvider } from '@tanstack/react-query';

// Optimize font loading with next/font
const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-roboto',
})

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

const chillax = localFont({
  src: [
    {
      path: '../../public/fonts/WEB/fonts/Chillax-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../public/fonts/WEB/fonts/Chillax-Medium.woff2',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../../public/fonts/WEB/fonts/Chillax-Bold.woff2',
      weight: '700',
      style: 'normal',
    },
  ],
  variable: '--font-chillax',
  display: 'swap',
})

const bandeins = localFont({
  src: '../../public/fonts/bandeins-strange-font-family-1762393731-0/Bandeins-Strange-Variable-VF.ttf',
  variable: '--font-bandeins',
  display: 'swap',
})

// Dynamic imports for heavy components - loads only when needed
const Footer = dynamic(() => import('@/components/layout/Footer'), {
  loading: () => <div className="h-[400px] bg-background" />,
  ssr: true
})

const SmoothScroll = dynamic(() => import('@/components/ui/SmoothScroll'), {
  ssr: false, // Client-side only animation
  loading: () => <div />
})





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
    <html lang="en" className={`${roboto.variable} ${inter.variable} ${chillax.variable} ${bandeins.variable}`}>
      <head>
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
                      <SmoothScroll>
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