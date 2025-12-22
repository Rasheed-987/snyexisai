'use client'

import { usePathname } from 'next/navigation'
import dynamic from 'next/dynamic'
import { Navigation } from '@/components/layout/Navigation'
import StickyContact from '@/components/ui/StickyContact'

// Dynamic imports for heavy components
const Footer = dynamic(() => import('@/components/layout/Footer'), {
  loading: () => <div className="h-[400px] bg-background" />,
  ssr: true
})

const SmoothScroll = dynamic(() => import('@/components/ui/SmoothScroll'), {
  ssr: false,
  loading: () => <div />
})

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathUrl = usePathname()
  
  // Check if current route is an admin route
  const isAdmin = pathUrl?.startsWith('/admin')

  return (
    <div className="relative flex min-h-screen flex-col">
      {!isAdmin ? (
        <>
          <Navigation />
          <SmoothScroll>
            <main className="flex-1">{children}</main>
            <Footer />
          </SmoothScroll>
          <StickyContact />
        </>
      ) : (
        <main className="flex-1">{children}</main>
      )}
    </div>
  )
}