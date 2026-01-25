'use client';
import { useParams, useRouter } from 'next/navigation';
import { products } from '@/lib/products';
import { Star, ShoppingCart, Download, Check, Share2, ArrowLeft } from 'lucide-react';
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function ProductPage() {
  const params = useParams();
  const router = useRouter();
  const productId = parseInt(params.id as string);
  const product = products.find(p => p.id === productId);
  
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4 font-hand">PSD not found</h1>
          <Link href="/products" className="btn-primary inline-flex items-center gap-2">
            <ArrowLeft className="w-4 h-4" />
            Back to Products
          </Link>
        </div>
      </div>
    );
  }

  // Mock product images


  const features = [
    'Fully editable PSD file',
    'All fonts included',
    'Commercial license',
    '24/7 download access',
    'Free future updates',
    'Layered organization'
  ];

  // Mock buy function (replace with real Razorpay)
  const handleBuyNow = () => {
    alert(`Buying ${product.title} for ₹${product.price * quantity}`);
    // TODO: Integrate Razorpay here
    // router.push('/checkout?id=' + product.id);
  };

  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Breadcrumb */}
        <div className="mb-8">
          <Link href="/products" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-4">
            <ArrowLeft className="w-4 h-4" />
            Back to Products
          </Link>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div>
            {/* Main Image */}
            <div className="card mb-4 overflow-hidden">
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-full object-cover"
              />
            </div>

          </div>

          {/* Product Info */}
          <div>
            {/* Category & Title */}
            <div className="mb-6">
              <span className="inline-block px-3 py-1 bg-accent-yellow rounded-full text-sm font-medium doodle-border mb-3">
                {product.category}
              </span>
              
              <h1 className="text-4xl font-bold mb-4 font-hand">{product.title}</h1>
              
              <p className="text-lg text-muted-foreground mb-6">{product.description}</p>
            </div>

            {/* Price */}
            <div className="mb-8">
              <div className="flex items-baseline gap-4">
                <div className="text-5xl font-bold font-hand">₹{product.price}</div>
                {product.price > 399 && (
                  <div className="text-muted-foreground">
                    <span className="line-through text-lg">₹{product.price + 100}</span>
                    <span className="ml-2 bg-accent-coral px-2 py-1 rounded text-sm font-bold">Save ₹100</span>
                  </div>
                )}
              </div>
              <p className="text-sm text-muted-foreground mt-2">One-time payment • Lifetime access</p>
            </div>

            {/* Features */}
            <div className="card p-6 mb-8">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Check className="w-5 h-5 text-green-500" />
                What&apos;s Included
              </h3>
              <div className="grid sm:grid-cols-2 gap-3">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-accent-mint rounded-full flex items-center justify-center">
                      <Check className="w-3 h-3" />
                    </div>
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Quantity & Actions */}
            <div className="card p-6">
              {/* Quantity */}
              <div className="flex items-center gap-4 mb-6">
                <span className="font-medium">Quantity:</span>
                <div className="flex items-center doodle-border rounded-lg overflow-hidden">
                  <button 
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-4 py-2 hover:bg-muted"
                  >
                    -
                  </button>
                  <span className="px-4 py-2 border-x-2 border-foreground">{quantity}</span>
                  <button 
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-4 py-2 hover:bg-muted"
                  >
                    +
                  </button>
                </div>
                <div className="text-muted-foreground">
                  Total: <span className="font-bold text-foreground">₹{product.price * quantity}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-4">
                <button 
                  onClick={handleBuyNow}
                  className="btn-primary w-full flex items-center justify-center gap-2 group"
                >
                  <ShoppingCart className="w-5 h-5" />
                  Buy Now - ₹{product.price * quantity}
                </button>

                <div className="flex gap-4">
                  <button 
                    onClick={() => setIsFavorite(!isFavorite)}
                    className={`flex-1 py-3 rounded-lg doodle-border flex items-center justify-center gap-2 transition-colors ${
                      isFavorite 
                        ? 'bg-accent-coral text-foreground' 
                        : 'hover:bg-muted'
                    }`}
                  >
                    <svg 
                      className={`w-5 h-5 ${isFavorite ? 'fill-current' : ''}`} 
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                    </svg>
                    {isFavorite ? 'Saved' : 'Save'}
                  </button>
                  <button className="flex-1 py-3 rounded-lg doodle-border flex items-center justify-center gap-2 hover:bg-muted transition-colors">
                    <Share2 className="w-5 h-5" />
                    Share
                  </button>
                </div>
              </div>

              {/* Quick Info */}
              <div className="mt-8 pt-8 border-t-2 border-foreground space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Format</span>
                  <span className="font-bold">.PSD</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Software</span>
                  <span className="font-bold">Photoshop</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Delivery</span>
                  <span className="font-bold text-green-600">Instant</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <div className="mt-16">
          <div className="border-b-2 border-foreground mb-8">
            <div className="flex gap-8">
              <button className="py-4 font-bold relative text-foreground after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-foreground">
                Details
              </button>
              <button className="py-4 font-medium text-muted-foreground hover:text-foreground">
                How to Use
              </button>
              <button className="py-4 font-medium text-muted-foreground hover:text-foreground">
                License
              </button>
            </div>
          </div>

          {/* Details Content */}
          <div className="card p-8">
            <h3 className="text-2xl font-bold mb-6 font-hand">About this PSD</h3>
            
            <div className="prose max-w-none">
              <p className="text-lg mb-6">
                This {product.category.toLowerCase()} thumbnail template is designed to help you create professional-looking thumbnails quickly. Every element is fully editable and organized in layers for easy customization.
              </p>
              
              <div className="grid md:grid-cols-2 gap-8 mb-8">
                <div>
                  <h4 className="font-bold mb-4">What You&apos;ll Get</h4>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-foreground rounded-full"></div>
                      Fully layered PSD file
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-foreground rounded-full"></div>
                      Font links included
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-foreground rounded-full"></div>
                      Help documentation
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-bold mb-4">Requirements</h4>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-foreground rounded-full"></div>
                      Adobe Photoshop (free)
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-foreground rounded-full"></div>
                      Basic Photoshop knowledge
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-foreground rounded-full"></div>
                      Free fonts (links provided)
                    </li>
                  </ul>
                </div>
              </div>

              <div className="card p-6 bg-accent-yellow/20">
                <h4 className="font-bold mb-3">License Information</h4>
                <p className="text-muted-foreground">
                  This template comes with a commercial license. You can use it for personal projects, YouTube thumbnails, social media, and client work. You cannot resell or redistribute the template files.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        <div className="mt-16">
          <h3 className="text-2xl font-bold mb-6 font-hand">You might also like</h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products
              .filter(p => p.id !== product.id && p.category === product.category)
              .slice(0, 3)
              .map((relatedProduct, index) => (
                <div key={relatedProduct.id} className="card p-6 doodle-hover">
                  <div className="flex gap-4">
                    <img
                      src={relatedProduct.image}
                      alt={relatedProduct.title}
                      className="w-20 h-20 rounded-lg doodle-border object-cover"
                    />
                    <div className="flex-1">
                      <h4 className="font-bold mb-1">{relatedProduct.title}</h4>
                      <div className="text-muted-foreground text-sm mb-2">{relatedProduct.category}</div>
                      <div className="flex items-center justify-between">
                        <div className="font-bold text-xl font-hand">₹{relatedProduct.price}</div>
                        <Link 
                          href={`/product/${relatedProduct.id}`}
                          className="text-sm text-accent-coral hover:underline"
                        >
                          View →
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}