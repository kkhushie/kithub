'use client';

import { useState } from 'react';
import { ArrowLeft, Shield, Check, Mail, Lock, Download, AlertCircle } from 'lucide-react';
import Link from 'next/link';

export default function LoginPage() {
  const [loading, setLoading] = useState(false);

  const handleLogin = () => {
    setLoading(true);
    // Simulate login process
    setTimeout(() => {
      alert('This is a demo login page. In a real app, Google OAuth would work here.');
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-8">
      <div className="max-w-md w-full">
        {/* Back Button */}
        <Link 
          href="/" 
          className="inline-flex items-center gap-2 text-gray-600 hover:text-black mb-8 group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Back to home
        </Link>
        
        {/* Login Card */}
        <div className="border-2 border-black rounded-xl p-8 bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 border-2 border-black rounded-full flex items-center justify-center mx-auto mb-4 bg-purple-300">
              <span className="text-3xl font-bold" style={{ fontFamily: 'var(--font-hand)' }}>
                P
              </span>
            </div>
            <h1 className="text-3xl font-bold mb-2" style={{ fontFamily: 'var(--font-hand)' }}>
              Sign In
            </h1>
            <p className="text-gray-600">
              Sign in to purchase and download PSD templates
            </p>
          </div>

          {/* Demo Notice */}
          {/* <div className="mb-6 p-4 bg-yellow-100 border-2 border-yellow-300 rounded-lg">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5 flex-shrink-0" />
              <div>
                <div className="font-medium text-yellow-800 mb-1">Demo Mode</div>
                <div className="text-sm text-yellow-700">
                  This is a static login page. In a real app, this would connect to Google OAuth.
                </div>
              </div>
            </div>
          </div> */}

          {/* Google Login Button */}
          <button
            onClick={handleLogin}
            disabled={loading}
            className={`w-full cursor-pointer py-4 px-4 border-2 border-black rounded-lg flex items-center justify-center gap-3 mb-6 transition-all hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-0.5 ${
              loading ? 'bg-gray-100 cursor-not-allowed' : 'bg-white hover:bg-gray-50'
            }`}
          >
            {loading ? (
              <>
                <div className="w-6 h-6 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
                <span className="font-medium">Signing in...</span>
              </>
            ) : (
              <>
                {/* Using SVG for Google G logo since lucide doesn't have it */}
                <svg className="w-6 h-6" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                <span className="font-medium">Continue with Google</span>
              </>
            )}
          </button>

          {/* Divider */}
          {/* <div className="flex items-center gap-4 mb-6">
            <div className="flex-1 h-px bg-black/20"></div>
            <span className="text-sm text-gray-600">or</span>
            <div className="flex-1 h-px bg-black/20"></div>
          </div> */}

          {/* Email Login Option */}
          {/* <div className="mb-6">
            <div className="flex items-center gap-2 mb-3">
              <Mail className="w-4 h-4 text-gray-600" />
              <span className="font-medium">Email login</span>
            </div>
            <div className="text-sm text-gray-600 mb-3">
              Enter your email to receive a magic link
            </div>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="you@example.com"
                className="flex-1 border-2 border-black rounded-lg px-4 py-2 focus:outline-none"
                disabled
              />
              <button className="px-4 py-2 border-2 border-black rounded-lg font-medium hover:bg-gray-100 transition-colors" disabled>
                <Lock className="w-4 h-4" />
              </button>
            </div>
          </div> */}

          {/* Why Sign In */}
          {/* <div className="mt-8 pt-8 border-t-2 border-black">
            <h3 className="font-bold mb-4 flex items-center gap-2">
              <Download className="w-4 h-4" />
              Why sign in?
            </h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-3">
                <div className="w-6 h-6 bg-green-200 rounded-full flex items-center justify-center border-2 border-black">
                  <Check className="w-3 h-3" />
                </div>
                <span>Access purchased files anytime</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-6 h-6 bg-blue-200 rounded-full flex items-center justify-center border-2 border-black">
                  <Check className="w-3 h-3" />
                </div>
                <span>Secure payment processing</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-6 h-6 bg-pink-200 rounded-full flex items-center justify-center border-2 border-black">
                  <Check className="w-3 h-3" />
                </div>
                <span>Get email receipts & updates</span>
              </li>
            </ul>
          </div> */}

          {/* Security Note */}
          <div className="mt-8 p-4 bg-green-50 border-2 border-green-200 rounded-lg">
            <div className="flex items-start gap-3">
              <Shield className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
              <div>
                <div className="font-medium mb-1">Secure Authentication</div>
                <div className="text-sm text-gray-600">
                  Google OAuth ensures your login is secure and private.
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Guest Option */}
        <div className="text-center mt-8">
          <p className="text-gray-600 mb-2">Just want to browse templates?</p>
          <Link 
            href="/products" 
            className="text-purple-600 font-medium hover:underline flex items-center justify-center gap-1"
          >
            Browse PSDs without signing in
            <ArrowLeft className="w-4 h-4 rotate-180" />
          </Link>
        </div>
      </div>
    </div>
  );
}