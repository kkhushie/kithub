import type { Metadata } from 'next';
import { Inter, Gochi_Hand, Comic_Neue } from 'next/font/google';
import './globals.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Providers } from './providers';

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
        <div className="relative">
          {/* Grid Background with 10% opacity */}
          <div className="fixed inset-0 pointer-events-none overflow-hidden">
            {/* Option 1: Simple Dot Grid */}
            <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:16px_16px]"></div>
            
            {/* Option 2: Line Grid (uncomment to use) */}
            {/* <div className="absolute inset-0 opacity-5 bg-[linear-gradient(to_right,#000_1px,transparent_1px),linear-gradient(to_bottom,#000_1px,transparent_1px)] [background-size:20px_20px]"></div> */}
            
            {/* Option 3: Isometric Grid (uncomment to use) */}
            {/* <div className="absolute inset-0 opacity-10" style={{
              backgroundImage: `
                linear-gradient(30deg, #000 12%, transparent 12.5%, transparent 87%, #000 87.5%, #000),
                linear-gradient(150deg, #000 12%, transparent 12.5%, transparent 87%, #000 87.5%, #000),
                linear-gradient(30deg, #000 12%, transparent 12.5%, transparent 87%, #000 87.5%, #000),
                linear-gradient(150deg, #000 12%, transparent 12.5%, transparent 87%, #000 87.5%, #000),
                linear-gradient(60deg, #000 25%, transparent 25.5%, transparent 75%, #000 75%, #000),
                linear-gradient(60deg, #000 25%, transparent 25.5%, transparent 75%, #000 75%, #000)
              `,
              backgroundSize: '40px 70px',
              backgroundPosition: '0 0, 0 0, 20px 35px, 20px 35px, 0 0, 20px 35px'
            }}></div> */}
          </div>
          
          <Providers>
            <Header />
            <main className="pt-24 relative z-10">
              {children}
            </main>
            <Footer />
          </Providers>
        </div>
      </body>
    </html>
  );
}