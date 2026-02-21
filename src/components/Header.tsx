'use client';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { User as SupabaseUser } from '@supabase/supabase-js';
import Link from 'next/link';
import { LogIn, Menu, ShoppingCart, User, X } from 'lucide-react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState<SupabaseUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      // console.log("current user : ",session?.user)
      setUser(session?.user ?? null);
      setLoading(false);
    };

    fetchSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
  };

  return (
    <header className="fixed top-0 w-full bg-white/95 backdrop-blur-sm border-b-2 border-gray-900 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          {/* Logo - Fixed Size */}
          <Link href="/" className="flex items-center gap-0">
            <div className="relative w-16 h-16">
              <img
                src="/favicon.ico"
                alt="logo"
                className="w-full h-full absolute top-1 object-contain"
              />
            </div>
            <div>
              <div className="text-3xl font-bold" style={{ fontFamily: 'var(--font-hand)' }}>Kithub</div>
              <div className="text-xs text-gray-600 -mt-1">Premium Store</div>
            </div>
          </Link>
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/" className="text-gray-900 hover:text-purple-600 font-medium transition-colors">
              Home
            </Link>
            <Link href="/products" className="text-gray-900 hover:text-purple-600 font-medium transition-colors">
              Products
            </Link>

            {/* Show Dashboard only if user is logged in */}
            {user && (
              <Link href="/dashboard" className="text-gray-900 hover:text-purple-600 font-medium transition-colors">
                Dashboard
              </Link>
            )}

            {/* Cart */}
            <Link href="/cart" className="relative">
              <ShoppingCart className="w-5 h-5 text-gray-900 hover:text-purple-600 transition-colors" />
              <span className="absolute -top-2 -right-2 w-5 h-5 bg-purple-300 text-xs border-2 border-gray-900 rounded-full flex items-center justify-center font-bold">
                3
              </span>
            </Link>

            {/* User/Auth Section */}
            {loading ? (
              <div className="w-10 h-10 rounded-full bg-gray-200 animate-pulse"></div>
            ) : user ? (
              <div className="flex items-center gap-4">
                {/* User Avatar */}
                <div className="relative group">
                  <button className="w-10 h-10 border-2 border-gray-900 rounded-full overflow-hidden bg-green-200">
                    {user.user_metadata?.avatar_url ? (
                      <img
                        src={user.user_metadata.avatar_url}
                        alt={user.user_metadata.full_name || 'User'}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <User className="w-5 h-5 mx-auto mt-2" />
                    )}
                  </button>

                  {/* Dropdown */}
                  <div className="absolute right-0 mt-2 w-48 bg-white border-2 border-gray-900 rounded-lg shadow-lg invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-all duration-200">
                    <div className="p-4 border-b border-gray-900">
                      <div className="font-semibold">{user.user_metadata?.full_name || user.email}</div>
                      <div className="text-sm text-gray-600 truncate">{user.email}</div>
                    </div>
                    <div className="p-2">
                      <Link
                        href="/dashboard"
                        className="block px-3 py-2 rounded hover:bg-gray-100 transition-colors"
                      >
                        Dashboard
                      </Link>
                      <Link
                        href="/purchases"
                        className="block px-3 py-2 rounded hover:bg-gray-100 transition-colors"
                      >
                        My Purchases
                      </Link>
                      <button
                        onClick={handleSignOut}
                        className="block w-full text-left px-3 py-2 rounded hover:bg-red-50 text-red-600 transition-colors"
                      >
                        Sign Out
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <Link href="/auth/login"
                className="flex items-center gap-2 px-4 py-2 border-2 border-gray-900 rounded-lg font-medium hover:bg-gray-100 transition-colors"
              >
                <LogIn className="w-4 h-4" />
                <span>Sign In</span>
              </Link>
            )}

            {/* Buy Button */}
            <Link
              href="/products"
              className="border-2 border-gray-900 bg-purple-300 text-black px-4 py-2 rounded-lg font-semibold hover:bg-purple-400 transition-colors"
            >
              Browse PSDs
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-4 md:hidden">
            {/* Cart - Mobile */}
            <Link href="/cart" className="relative">
              <ShoppingCart className="w-6 h-6" />
              <span className="absolute -top-2 -right-2 w-5 h-5 bg-pink-300 text-xs border-2 border-gray-900 rounded-full flex items-center justify-center font-bold">
                3
              </span>
            </Link>

            {/* Auth - Mobile */}
            {user ? (
              <Link href="/dashboard" className="w-10 h-10 border-2 border-gray-900 rounded-full overflow-hidden bg-green-200 flex items-center justify-center">
                {user.user_metadata?.avatar_url ? (
                  <img
                    src={user.user_metadata.avatar_url}
                    alt={user.user_metadata.full_name || 'User'}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <User className="w-5 h-5" />
                )}
              </Link>
            ) : (
              <Link
                href="/auth/login"
                className="w-10 h-10 border-2 border-gray-900 rounded-full flex items-center justify-center hover:bg-gray-100"
              >
                <LogIn className="w-5 h-5" />
              </Link>
            )}

            <button
              className="border-2 border-gray-900 rounded-lg p-2 hover:bg-gray-100"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden pb-4 border-t-2 border-gray-900">
            <div className="flex flex-col gap-2 pt-4">
              <Link
                href="/"
                className="px-4 py-3 rounded-lg hover:bg-gray-100 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                href="/products"
                className="px-4 py-3 rounded-lg hover:bg-gray-100 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Products
              </Link>

              {/* Show Dashboard only if user is logged in - Mobile */}
              {user && (
                <Link
                  href="/dashboard"
                  className="px-4 py-3 rounded-lg hover:bg-gray-100 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Dashboard
                </Link>
              )}

              {/* Mobile Auth Button */}
              {!user && (
                <Link
                  href="/auth/login"
                  onClick={() => setIsMenuOpen(false)}
                  className="px-4 py-3 border-2 border-gray-900 rounded-lg font-medium hover:bg-gray-100 transition-colors flex items-center gap-2"
                >
                  <LogIn className="w-4 h-4" />
                  Sign In
                </Link>
              )}

              <div className="pt-2">
                <Link
                  href="/products"
                  className="w-full px-4 py-3 border-2 border-gray-900 bg-gray-900 text-white rounded-lg font-semibold text-center hover:bg-gray-800 transition-colors block"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Browse PSDs
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}