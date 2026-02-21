import type { Metadata } from 'next';
import { Inter, Gochi_Hand, Comic_Neue } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
});

const gochiHand = Gochi_Hand({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-hand',
});

const comicNeue = Comic_Neue({
  weight: '700', // Bold weight for logo
  subsets: ['latin'],
  variable: '--font-comic',
});

export const metadata: Metadata = {
  title: 'Kithub - Premium Store',
  description: 'Handcrafted PSD templates with doodle style',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${gochiHand.variable} ${comicNeue.variable}`}>
      <body className="min-h-screen bg-white text-black">
        {children}
      </body>
    </html>
  );
}