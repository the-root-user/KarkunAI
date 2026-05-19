import type { Metadata, Viewport } from 'next';
import { Outfit, Inter } from 'next/font/google';
import './globals.css'; // Global styles

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-outfit',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

export const viewport: Viewport = {
  themeColor: '#127a7c', // Primary color in HSL(175 56% 46%) approx
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export const metadata: Metadata = {
  title: 'KarkunAI - Worker Intelligence Engine',
  description: 'An Agentic AI service orchestrator for Pakistan\'s informal economy workforce (Karkuns).',
  manifest: '/manifest.json', // Placeholder if you add PWA
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'KarkunAI',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${outfit.variable}`}>
      <body suppressHydrationWarning className="font-inter antialiased">{children}</body>
    </html>
  );
}
