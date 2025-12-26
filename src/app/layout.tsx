import './globals.css'
import { Roboto, Inter } from 'next/font/google'
import localFont from 'next/font/local'
import { ClientProviders } from './client-providers'
import ClientLayout from './client-layout'

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







export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${roboto.variable} ${inter.variable} ${chillax.variable} ${bandeins.variable}`}>
      <head>
        <link rel="icon" href="/icons/logo.png" />
        {/* Preload LCP image for faster rendering */}
        <link rel="preload" as="image" href="/images/Mask group.png" fetchPriority="high" />
      </head>
      <body className="min-h-screen bg-background font-sans antialiased">
        <ClientProviders>
          <ClientLayout>
            {children}
          </ClientLayout>
        </ClientProviders>
      </body>
    </html>
  )
}