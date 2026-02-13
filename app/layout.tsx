import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';
import './globals.css'
import { Toaster } from 'react-hot-toast'

export const metadata: Metadata = {
  title: "CodeBoard 2.0 | The Premium Coding Platform",
  description: "Master algorithms, track your streak, and complete daily challenges on the world's most beautiful coding platform. Built for serious developers.",
  openGraph: {
    title: "CodeBoard 2.0",
    description: "The premium destination for competitive programming.",
    url: "https://codeboard.dev",
    siteName: "CodeBoard",
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <body className="font-sans antialiased text-white bg-black selection:bg-cyan-500/30">
        {children}
        <Toaster position="bottom-right" toastOptions={{
          style: {
            background: '#333',
            color: '#fff',
            borderRadius: '6px',
            fontSize: '14px'
          }
        }} />
      </body>
    </html>
  )
}
