import type { Metadata } from "next";
import { Bodoni_Moda, Lato } from "next/font/google"; // Ultra-premium editorial fonts
import "./globals.css";

const lato = Lato({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["300", "400", "700"],
});

const bodoni = Bodoni_Moda({
  subsets: ["latin"],
  variable: "--font-serif",
  weight: ["400", "500", "600", "700", "800"], // High contrast weights
});

export const metadata: Metadata = {
  metadataBase: new URL('https://maisondelish.vercel.app'),
  title: {
    default: "Maison Delish | Culinary Excellence",
    template: "%s | Maison Delish"
  },
  description: "Experience the finest cuisine in a modern atmosphere. Reserve your table today.",
  icons: {
    icon: '/icon.png',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://maisondelish.vercel.app',
    siteName: 'Maison Delish',
    title: 'Maison Delish',
    description: 'Experience the finest cuisine in a modern atmosphere.',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=2070',
        width: 1200,
        height: 630,
        alt: 'Maison Delish Dining',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Maison Delish | Culinary Excellence',
    description: 'Experience the finest cuisine in a modern atmosphere.',
    images: ['https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=2070'],
  },
};

// Imports removed

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        suppressHydrationWarning
        className={`${lato.variable} ${bodoni.variable} antialiased font-sans bg-background text-foreground flex flex-col min-h-screen`}
      >
        {children}
      </body>
    </html>
  );
}
