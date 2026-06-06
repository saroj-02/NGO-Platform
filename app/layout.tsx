import { Analytics } from '@vercel/analytics/next'
import type { Metadata } from 'next'
import { Inter, Plus_Jakarta_Sans, Geist_Mono } from 'next/font/google'
import './globals.css'

const inter = Inter({ variable: '--font-inter', subsets: ['latin'] })
const plusJakarta = Plus_Jakarta_Sans({
  variable: '--font-plus-jakarta',
  subsets: ['latin'],
})
const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'HopeBridge — Building Bridges of Hope Worldwide',
  description:
    'HopeBridge is a global nonprofit connecting compassionate donors and volunteers with communities in need. Fund clean water, education, food, and healthcare campaigns with full transparency.',
  generator: 'v0.app',
  keywords: [
    'nonprofit',
    'NGO',
    'charity',
    'donate',
    'volunteer',
    'clean water',
    'education',
  ],
  openGraph: {
    title: 'HopeBridge — Building Bridges of Hope Worldwide',
    description:
      'Connect with communities in need. Fund campaigns for clean water, education, food, and healthcare with full transparency.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${plusJakarta.variable} ${geistMono.variable} bg-background`}
    >
      <body className="font-sans antialiased">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
