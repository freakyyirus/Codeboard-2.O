import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { Toaster } from "react-hot-toast";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: "CodeBoard - DSA + Projects + Contests + AI in ONE Dashboard",
  description:
    "Stop tab-switching. Aggregate LeetCode, Codeforces, GitHub, Devfolio instantly. AI-powered IDE included. Built for competitive programmers.",
  keywords: [
    "competitive programming",
    "DSA",
    "LeetCode",
    "Codeforces",
    "GitHub",
    "coding dashboard",
    "AI IDE",
    "hackathons",
  ],
  authors: [{ name: "CodeBoard Team" }],
  creator: "CodeBoard",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://codeboard.dev",
    siteName: "CodeBoard",
    title: "CodeBoard - DSA + Projects + Contests + AI in ONE Dashboard",
    description:
      "Stop tab-switching. Aggregate LeetCode, Codeforces, GitHub, Devfolio instantly. AI-powered IDE included.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "CodeBoard - Developer Dashboard",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "CodeBoard - DSA + Projects + Contests + AI in ONE Dashboard",
    description:
      "Stop tab-switching. Aggregate LeetCode, Codeforces, GitHub, Devfolio instantly.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
  manifest: "/manifest.json",
};

export const viewport: Viewport = {
  themeColor: "#020617",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      </head>
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} antialiased`}
      >
        {children}
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: "#0F172A",
              color: "#F1F5F9",
              border: "1px solid #1E293B",
              borderRadius: "6px",
              fontSize: "14px",
              fontFamily: "var(--font-inter), system-ui, sans-serif",
            },
            success: {
              style: {
                borderLeft: "3px solid #10B981",
              },
              iconTheme: {
                primary: "#10B981",
                secondary: "#020617",
              },
            },
            error: {
              style: {
                borderLeft: "3px solid #F43F5E",
              },
              iconTheme: {
                primary: "#F43F5E",
                secondary: "#020617",
              },
            },
          }}
        />
      </body>
    </html>
  );
}
