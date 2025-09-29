import './globals.css'
import { Inter } from 'next/font/google'
import { Metadata } from 'next'
import { Navigation } from '@/components/layout/Navigation'
import Footer from '@/components/layout/Footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: {
    default: 'Snyexisai',
    template: '%s | Snyexisai',
  },
  description: 'Modern Next.js application with component-based architecture',
  keywords: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS'],
  authors: [{ name: 'Snyexisai Team' }],
  creator: 'Snyexisai',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://snyexisai.example.com',
    title: 'Snyexisai',
    description: 'Modern Next.js application with component-based architecture',
    siteName: 'Snyexisai',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Snyexisai',
    description: 'Modern Next.js application with component-based architecture',
    creator: '@snyexisai',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={inter.className}>
      <body className="min-h-screen bg-background font-sans antialiased">
        <div className="relative flex min-h-screen flex-col">
          <Navigation />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  )
}