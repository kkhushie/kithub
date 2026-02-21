import Header from '../components/Header';
import Footer from '../components/Footer';
import { Providers } from './providers';
import './globals.css';

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="relative">
      {/* Grid Background with 5% opacity */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute inset-0 opacity-5 bg-[linear-gradient(to_right,#000_1px,transparent_1px),linear-gradient(to_bottom,#000_1px,transparent_1px)] [background-size:20px_20px]"></div>
      </div>

      <Providers>
        <Header />
        <main className="pt-24 relative z-10">
          {children}
        </main>
        <Footer />
      </Providers>
    </div>
  );
}