
import Link from 'next/link';
import { Facebook, Twitter, Instagram, Mail, Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-card border-t-2 border-foreground py-12 px-4 sm:px-6 lg:px-8 mt-20">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div>
                <div className="text-2xl font-bold font-hand">Kithub</div>
                <div className="text-xs text-muted-foreground -mt-1">by Creator</div>
              </div>
            </div>
            <p className="text-muted-foreground text-sm mb-6">
              Handcrafted PSD templates for creative minds.
              Download, edit, and create amazing designs.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 doodle-border rounded-lg flex items-center justify-center hover:bg-muted transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 doodle-border rounded-lg flex items-center justify-center hover:bg-muted transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 doodle-border rounded-lg flex items-center justify-center hover:bg-muted transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-4">Products</h4>
            <ul className="space-y-3">
              <li><Link href="/products?category=YouTube" className="text-muted-foreground hover:text-foreground transition-colors">
                YouTube Templates
              </Link></li>
              <li><Link href="/products?category=Instagram" className="text-muted-foreground hover:text-foreground transition-colors">
                Instagram Templates
              </Link></li>
              <li><Link href="/products?category=Posters" className="text-muted-foreground hover:text-foreground transition-colors">
                Poster Designs
              </Link></li>
              <li><Link href="/products?category=UI+Kits" className="text-muted-foreground hover:text-foreground transition-colors">
                UI Kits
              </Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-4">Company</h4>
            <ul className="space-y-3">
              <li><Link href="/about" className="text-muted-foreground hover:text-foreground transition-colors">
                About Us
              </Link></li>
              <li><Link href="/contact" className="text-muted-foreground hover:text-foreground transition-colors">
                Contact
              </Link></li>
              <li><Link href="/refund-policy" className="text-muted-foreground hover:text-foreground transition-colors">
                Refund Policy
              </Link></li>
              <li><Link href="/terms" className="text-muted-foreground hover:text-foreground transition-colors">
                Terms of Service
              </Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-4">Support</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-muted-foreground">
                <Mail className="w-4 h-4" />
                support@kithub.com
              </li>
              <li className="text-sm text-muted-foreground mt-4">
                Response within 24 hours
              </li>
              <li className="text-sm text-muted-foreground">
                7-day refund guarantee
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t-2 border-foreground mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-muted-foreground text-sm mb-4 md:mb-0">
              © {new Date().getFullYear()} Retro PSD. Made with <Heart className="w-4 h-4 inline text-accent-coral" /> in India.
            </p>
            <div className="flex items-center gap-6">
              <span className="text-sm text-muted-foreground">Secure payments via</span>
              <div className="px-3 py-1 bg-accent-mint/30 rounded-lg doodle-border">
                <span className="font-medium">Razorpay</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}