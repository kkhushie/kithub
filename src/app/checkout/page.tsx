'use client';
import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Shield, CreditCard, Smartphone, Check } from 'lucide-react';
import { products } from '@/lib/products';

export default function CheckoutPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const productId = parseInt(searchParams.get('id') || '1');
  
  const product = products.find(p => p.id === productId) || products[0];
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [loading, setLoading] = useState(false);

  const handlePayment = async () => {
    setLoading(true);
    
    // TODO: Integrate Razorpay here
    // For now, simulate payment
    setTimeout(() => {
      setLoading(false);
      router.push(`/success?id=${productId}`);
    }, 1500);
  };

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold mb-2 font-hand">Checkout</h1>
          <p className="text-muted-foreground">Complete your purchase securely</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Order Summary */}
          <div className="card p-6">
            <h2 className="text-2xl font-bold mb-6 font-hand">Order Summary</h2>
            
            {/* Product Info */}
            <div className="flex gap-4 mb-6 p-4 doodle-border rounded-lg">
              <img
                src={product.image}
                alt={product.title}
                className="w-16 h-16 rounded-lg doodle-border object-cover"
              />
              <div>
                <h3 className="font-bold">{product.title}</h3>
                <p className="text-sm text-muted-foreground">{product.category}</p>
                <div className="mt-2 font-bold font-hand text-xl">₹{product.price}</div>
              </div>
            </div>

            {/* Price Breakdown */}
            <div className="space-y-4 mb-8">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="font-bold">₹{product.price}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Discount</span>
                <span className="font-bold text-green-600">₹0</span>
              </div>
              <div className="border-t-2 border-foreground pt-4">
                <div className="flex justify-between text-xl font-bold">
                  <span>Total</span>
                  <span className="font-hand text-2xl">₹{product.price}</span>
                </div>
              </div>
            </div>

            {/* Features */}
            <div className="space-y-3">
              {[
                'Instant download after payment',
                'Commercial license included',
                '7-day refund guarantee',
                'Lifetime updates'
              ].map((feature, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-accent-mint rounded-full flex items-center justify-center">
                    <Check className="w-3 h-3" />
                  </div>
                  <span className="text-sm">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Payment Section */}
          <div className="card p-6">
            <h2 className="text-2xl font-bold mb-6">Payment Method</h2>
            
            {/* Payment Options */}
            <div className="space-y-4 mb-8">
              <button
                onClick={() => setPaymentMethod('card')}
                className={`w-full p-4 rounded-lg doodle-border flex items-center justify-between transition-all hover:-translate-y-0.5 ${
                  paymentMethod === 'card' ? 'bg-foreground text-primary-foreground' : 'hover:bg-muted'
                }`}
              >
                <div className="flex items-center gap-3">
                  <CreditCard className="w-5 h-5" />
                  <div>
                    <div className="font-medium">Credit/Debit Card</div>
                    <div className="text-sm opacity-75">Pay with card</div>
                  </div>
                </div>
                {paymentMethod === 'card' && <Check className="w-5 h-5" />}
              </button>

              <button
                onClick={() => setPaymentMethod('upi')}
                className={`w-full p-4 rounded-lg doodle-border flex items-center justify-between transition-all hover:-translate-y-0.5 ${
                  paymentMethod === 'upi' ? 'bg-foreground text-primary-foreground' : 'hover:bg-muted'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Smartphone className="w-5 h-5" />
                  <div>
                    <div className="font-medium">UPI</div>
                    <div className="text-sm opacity-75">Google Pay, PhonePe, etc.</div>
                  </div>
                </div>
                {paymentMethod === 'upi' && <Check className="w-5 h-5" />}
              </button>
            </div>

            {/* Security Badge */}
            <div className="p-4 bg-accent-yellow/20 rounded-lg doodle-border mb-8">
              <div className="flex items-center gap-3">
                <Shield className="w-8 h-8" />
                <div>
                  <div className="font-bold">Secure Payment</div>
                  <div className="text-sm text-muted-foreground">Encrypted with 256-bit SSL</div>
                </div>
              </div>
            </div>

            {/* Pay Button */}
            <button 
              onClick={handlePayment}
              disabled={loading}
              className={`btn-primary w-full flex items-center justify-center gap-2 ${
                loading ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              {loading ? 'Processing...' : `Pay ₹${product.price} Now`}
            </button>

            {/* Note */}
            <p className="text-sm text-center text-muted-foreground mt-6">
              You'll be redirected to secure payment page
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}