import Link from 'next/link';
import { Home, Search, Package } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-white to-gray-50 px-4">
      <div className="text-center max-w-2xl">
        {/* Error Code */}
        <div className="mb-8">
          <div className="text-9xl font-bold text-gray-900 font-hand">404</div>
          <div className="text-3xl font-semibold text-gray-700 mt-2">Page Not Found</div>
          <p className="text-gray-600 mt-4 max-w-md mx-auto">
            Oops! The PSD template or page you&apos;re looking for has been moved or doesn&apos;t exist.
          </p>
        </div>

        {/* Illustration/Icon */}
        <div className="my-12">
          <div className="relative mx-auto w-48 h-48">
            <div className="absolute inset-0 border-4 border-gray-900 rounded-3xl rotate-6"></div>
            <div className="absolute inset-4 border-4 border-purple-300 rounded-2xl -rotate-6"></div>
            <Package className="w-24 h-24 text-gray-900 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
          </div>
        </div>

        {/* Suggestions */}
        <div className="mb-10">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Try these instead:</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-xl mx-auto">
            <Link 
              href="/products" 
              className="border-2 border-gray-900 rounded-xl p-4 hover:bg-purple-50 transition-colors group"
            >
              <Package className="w-8 h-8 mx-auto mb-2 text-gray-900 group-hover:scale-110 transition-transform" />
              <div className="font-medium">Browse Products</div>
              <div className="text-sm text-gray-600">All PSD templates</div>
            </Link>
            <Link 
              href="/" 
              className="border-2 border-gray-900 rounded-xl p-4 hover:bg-purple-50 transition-colors group"
            >
              <Home className="w-8 h-8 mx-auto mb-2 text-gray-900 group-hover:scale-110 transition-transform" />
              <div className="font-medium">Go Home</div>
              <div className="text-sm text-gray-600">Back to homepage</div>
            </Link>
            <Link 
              href="/contact" 
              className="border-2 border-gray-900 rounded-xl p-4 hover:bg-purple-50 transition-colors group"
            >
              <Search className="w-8 h-8 mx-auto mb-2 text-gray-900 group-hover:scale-110 transition-transform" />
              <div className="font-medium">Contact Support</div>
              <div className="text-sm text-gray-600">Need help?</div>
            </Link>
          </div>
        </div>

        {/* Search Form */}
        <div className="mb-8">
          <form className="max-w-md mx-auto">
            <div className="relative">
              <input
                type="search"
                placeholder="Search for PSD templates..."
                className="w-full px-4 py-3 pl-12 border-2 border-gray-900 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
            </div>
          </form>
        </div>

        {/* Back Button */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 border-2 border-gray-900 bg-gray-900 text-white rounded-xl font-semibold hover:bg-gray-800 transition-colors"
        >
          <Home className="w-5 h-5" />
          Back to Kithub Home
        </Link>

        {/* Footer Note */}
        <p className="text-gray-500 text-sm mt-8">
          Think this is a mistake?{' '}
          <Link href="/contact" className="text-purple-600 hover:underline font-medium">
            Contact our support team
          </Link>
        </p>
      </div>
    </div>
  );
}