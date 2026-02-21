'use client';
import { useState } from 'react';
import { ShoppingCart, Trash2, Plus, Minus, ArrowRight, Tag } from 'lucide-react';
import Link from 'next/link';
import { products } from '@/lib/products';

export default function CartPage() {
  const [cartItems, setCartItems] = useState([
    { ...products[0] },
    { ...products[1] },
    { ...products[2] },
  ]);


  const removeItem = (id: string) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price), 0);
  const discount = subtotal > 1000 ? 200 : 0;
  const total = subtotal - discount;

  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-3 h-3 bg-accent-mint rounded-full"></div>
            <h1 className="text-4xl font-bold font-hand">Your Cart</h1>
          </div>
          <p className="text-muted-foreground">{cartItems.length} items in cart</p>
        </div>

        {cartItems.length > 0 ? (
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <div className="space-y-6">
                {cartItems.map(item => (
                  <div key={item.id} className="card p-6">
                    <div className="flex gap-6">
                      {/* Product Image */}
                      <div className="relative">
                        <img
                          src={item.preview_image}
                          alt={item.title}
                          className="w-32 h-32 object-cover rounded-lg doodle-border"
                        />
                        <button
                          onClick={() => removeItem(item.id)}
                          className="absolute -top-2 -right-2 w-8 h-8 -40 bg-red-400 rounded-full doodle-border flex items-center justify-center hover:bg-accent-coral/90"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      {/* Product Info */}
                      <div className="flex-1">
                        <div className="flex justify-between">
                          <div>
                            <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                            {/* <p className="text-muted-foreground text-sm mb-4">{item.author}</p> */}
                          </div>
                          <div className="text-2xl font-bold font-hand">₹{item.price}</div>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">

                            <div className="text-sm text-muted-foreground">
                              Total: <span className="font-bold text-foreground">₹{item.price}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

                {/* Promo Code */}
                <div className="card p-6">
                  <h3 className="font-bold mb-4 flex items-center gap-2">
                    <Tag className="w-5 h-5" />
                    Apply Promo Code
                  </h3>
                  <div className="flex gap-4">
                    <input
                      type="text"
                      placeholder="Enter promo code"
                      className="flex-1 bg-card doodle-border rounded-lg px-4 py-3 focus:outline-none"
                    />
                    <button className="btn-secondary">Apply</button>
                  </div>
                  <div className="mt-4 flex flex-wrap gap-2">
                    <button className="px-3 py-1 bg-accent-yellow rounded-full text-sm doodle-border hover:-translate-y-0.5 transition-all">
                      RETRO20 - 20% off
                    </button>
                    <button className="px-3 py-1 bg-accent-mint rounded-full text-sm doodle-border hover:-translate-y-0.5 transition-all">
                      WELCOME10 - 10% off
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="card p-6 sticky top-24">
                <h2 className="text-2xl font-bold mb-6 font-hand">Order Summary</h2>

                <div className="space-y-4 mb-8">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span className="font-bold">₹{subtotal}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Discount</span>
                    <span className="font-bold text-green-600">-₹{discount}</span>
                  </div>
                  <div className="border-t-2 border-foreground pt-4">
                    <div className="flex justify-between text-xl font-bold">
                      <span>Total</span>
                      <span className="font-hand text-2xl">₹{total}</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <Link href="/checkout" className="btn-primary w-full flex items-center justify-center gap-2">
                    Proceed to Checkout
                    <ArrowRight className="w-5 h-5" />
                  </Link>

                  <Link
                    href="/products"
                    className="block w-full py-3 text-center doodle-border rounded-lg font-medium hover:bg-muted transition-colors"
                  >
                    Continue Shopping
                  </Link>
                </div>

                <div className="mt-8 pt-8 border-t-2 border-foreground">
                  <h3 className="font-bold mb-4">Secure Payment</h3>
                  <div className="space-y-3 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      SSL encrypted checkout
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      7-day refund guarantee
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      Instant download after payment
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="card p-12 text-center">
            <div className="w-16 h-16 bg-accent-yellow rounded-full flex items-center justify-center mx-auto mb-4 doodle-border">
              <ShoppingCart className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-bold mb-4 font-hand">Your cart is empty</h3>
            <p className="text-muted-foreground mb-8">Add some PSD templates to get started!</p>
            <Link href="/products" className="btn-primary inline-flex items-center gap-2">
              Browse Products
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}