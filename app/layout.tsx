import type { Metadata } from 'next';
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

export const metadata: Metadata = {
  title: 'KarkunAI - Worker Intelligence Engine',
  description: 'An Agentic AI service orchestrator for Pakistan\'s informal economy workforce (Karkuns).',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${outfit.variable}`}>
      <body suppressHydrationWarning className="font-inter antialiased">{children}</body>
    </html>
  );
}
