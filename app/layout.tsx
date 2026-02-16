import type { Metadata } from 'next'
import { ClerkProvider } from '@clerk/nextjs'
import { dark } from '@clerk/themes'
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';
import './globals.css'
import { Toaster } from 'react-hot-toast'

export const metadata: Metadata = {
  title: {
    default: "CodeBoard — Developer Dashboard",
    template: "%s | CodeBoard",
  },
  description: "Aggregate LeetCode, Codeforces, and GitHub stats. Track streaks, analyze weaknesses, and level up — all without switching tabs.",
  keywords: ["developer dashboard", "competitive programming", "leetcode", "codeforces", "github", "coding stats", "codeboard"],
  robots: { index: true, follow: true },
  openGraph: {
    title: "CodeBoard — Developer Dashboard",
    description: "One dashboard for all your competitive programming platforms.",
    url: "https://codeboard.dev",
    siteName: "CodeBoard",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "CodeBoard — Developer Dashboard",
    description: "One dashboard for all your competitive programming platforms.",
  },
  icons: { icon: "/favicon.ico" },
  other: { "theme-color": "#000000" },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider
      appearance={{
        baseTheme: dark,
        variables: { colorPrimary: '#0070f3' }
      }}
    >
      <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable}`}>
        <head>
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
          <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=JetBrains+Mono:wght@400;500;600&display=swap" rel="stylesheet" />
        </head>
        <body className="bg-black text-white overflow-x-hidden antialiased">
          {children}
          <Toaster position="bottom-right" toastOptions={{
            style: {
              background: '#1a1a1a',
              color: '#fff',
              borderRadius: '12px',
              fontSize: '14px',
              border: '1px solid rgba(255,255,255,0.1)'
            }
          }} />
        </body>
      </html>
    </ClerkProvider>
  )
}
