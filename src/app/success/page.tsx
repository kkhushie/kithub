'use client';
import { Suspense } from 'react';
import { CheckCircle, Download, Home, ArrowRight } from 'lucide-react';
import Link from 'next/link';

// Move useSearchParams to a separate component
function SuccessContent() {
  const searchParams = useSearchParams();
  const productId = parseInt(searchParams.get('id') || '1');
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          // Auto start download
          handleDownload();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleDownload = () => {
    // Start download
    window.open('/download/psd-template.zip', '_blank');
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        {/* Success Icon */}
        <div className="w-20 h-20 bg-accent-mint rounded-full flex items-center justify-center mx-auto mb-6 doodle-border">
          <CheckCircle className="w-10 h-10 text-green-600" />
        </div>

        {/* Title */}
        <h1 className="text-4xl font-bold mb-4 font-hand">Payment Successful!</h1>
        
        {/* Message */}
        <p className="text-xl text-muted-foreground mb-8">
          Thank you for your purchase. Your PSD is ready to download.
        </p>

        {/* Auto Download */}
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent-yellow rounded-full mb-4 doodle-border">
            <Download className="w-4 h-4" />
            <span className="font-medium">Download starting in {countdown}s</span>
          </div>
          
          <button
            onClick={handleDownload}
            className="btn-primary flex items-center justify-center gap-2 mx-auto"
          >
            <Download className="w-5 h-5" />
            Download Now
          </button>
        </div>

        {/* Next Steps */}
        <div className="card p-6 mb-8">
          <h3 className="font-bold mb-4">What's next?</h3>
          <div className="space-y-3 text-left">
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 bg-accent-coral rounded-full flex items-center justify-center">
                <span className="font-bold text-sm">1</span>
              </div>
              <span>Check your email for receipt</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 bg-accent-mint rounded-full flex items-center justify-center">
                <span className="font-bold text-sm">2</span>
              </div>
              <span>Open the PSD in Photoshop/Photopea</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 bg-accent-yellow rounded-full flex items-center justify-center">
                <span className="font-bold text-sm">3</span>
              </div>
              <span>Edit text and images as needed</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/" className="btn-secondary flex items-center justify-center gap-2">
            <Home className="w-5 h-5" />
            Back to Home
          </Link>
          <Link href="/products" className="btn-primary flex items-center justify-center gap-2">
            Browse More PSDs
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </div>
  );
}

// Import hooks inside the component
import { useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';

// Main page with Suspense
export default function SuccessPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-2xl font-hand mb-4">Processing payment...</div>
          <div className="text-muted-foreground">Preparing your download</div>
        </div>
      </div>
    }>
      <SuccessContent />
    </Suspense>
  );
}