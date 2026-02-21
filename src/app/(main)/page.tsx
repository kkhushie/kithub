'use client';
import { useState } from 'react';
import ProductCard from '../components/ProductCard';
import { products } from '../../lib/products';
import { ChevronRight, Download, Star, Shield, Layers, Check } from 'lucide-react';
import Link from 'next/link';

export default function Home() {
  const [activeCategory, setActiveCategory] = useState('All');
  
  // Only 3 main categories for PSDs
  const categories = ['All', 'Tech', 'Podcast', 'Edtech','Trading'];
  
  return (
    <div className="min-h-screen">
      {/* Hero Section - Simple & Clean */}
      <section className="px-4 sm:px-6 lg:px-8 pt-24 pb-16">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex justify-center mb-6">
            <div className="flex gap-2">
              <div className="w-3 h-3 bg-accent-coral rounded-full"></div>
              <div className="w-3 h-3 bg-accent-yellow rounded-full"></div>
              <div className="w-3 h-3 bg-accent-mint rounded-full"></div>
            </div>
          </div>
          
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold mb-6 font-hand leading-tight">
            Thumbnail PSDs
            <br />
            <span className="text-accent-coral">for Creators</span>
          </h1>
          
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
            Premium, editable PSD templates I designed for creators.
            Download instantly and customize in minutes.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Link 
              href="/products" 
              className="btn-secondary bg-purple-300 flex items-center justify-center gap-2 group px-8 py-4 text-lg"
            >
              Browse All PSDs
              <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <button className="btn-secondary flex items-center justify-center gap-2 px-8 py-4 text-lg">
              <Download className="w-5 h-5" />
              See Examples
            </button>
          </div>
          
          {/* Trust Badge */}
          <div className="inline-flex items-center gap-3 px-6 py-3 bg-accent-mint/30 rounded-full doodle-border mb-12">
            <Shield className="w-5 h-5 text-green-600" />
            <span className="font-medium">Secure payments with Razorpay</span>
          </div>
        </div>
      </section>

      {/* Simple Stats */}
      <section className="px-4 sm:px-6 lg:px-8 pb-16">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center p-4">
              <div className="text-3xl font-bold font-hand text-accent-coral mb-2">50+</div>
              <div className="text-sm text-muted-foreground">PSD Templates</div>
            </div>
            <div className="text-center p-4">
              <div className="text-3xl font-bold font-hand text-accent-yellow mb-2">4.8★</div>
              <div className="text-sm text-muted-foreground">Creator Reviews</div>
            </div>
            <div className="text-center p-4">
              <div className="text-3xl font-bold font-hand text-accent-mint mb-2">Instant</div>
              <div className="text-sm text-muted-foreground">Downloads</div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured PSDs */}
      <section className="px-4 sm:px-6 lg:px-8 pb-20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 font-hand">Featured PSDs</h2>
            <p className="text-muted-foreground">My most popular thumbnail templates</p>
          </div>

          {/* Simple Category Filter */}
          <div className="flex flex-wrap gap-3 justify-center mb-10">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2 rounded-lg font-medium transition-all hover:-translate-y-0.5 ${
                  activeCategory === cat
                    ? 'bg-foreground text-primary-foreground doodle-border'
                    : 'bg-card text-foreground doodle-border hover:bg-muted'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Product Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products
              .filter(p => activeCategory === 'All' || p.category === activeCategory)
              .slice(0, 3)
              .map((product, index) => (
                <ProductCard key={product.id} product={product} accentIndex={index} />
              ))}
          </div>

          <div className="text-center mt-12">
            <Link 
              href="/products" 
              className="btn-primary inline-flex items-center gap-2 px-8 py-3"
            >
              View All PSDs
              <ChevronRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Simple How It Works */}
      <section className="px-4 sm:px-6 lg:px-8 pb-20 bg-card">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 font-hand">How It Works</h2>
            <p className="text-muted-foreground">Simple 3-step process</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-accent-yellow rounded-full flex items-center justify-center mx-auto mb-4 doodle-border">
                <div className="text-2xl font-bold font-hand">1</div>
              </div>
              <h3 className="text-xl font-bold mb-2">Browse & Select</h3>
              <p className="text-muted-foreground">Choose a PSD template you like</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-accent-mint rounded-full flex items-center justify-center mx-auto mb-4 doodle-border">
                <div className="text-2xl font-bold font-hand">2</div>
              </div>
              <h3 className="text-xl font-bold mb-2">Pay Securely</h3>
              <p className="text-muted-foreground">Quick checkout with Razorpay</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-accent-coral rounded-full flex items-center justify-center mx-auto mb-4 doodle-border">
                <div className="text-2xl font-bold font-hand">3</div>
              </div>
              <h3 className="text-xl font-bold mb-2">Download & Edit</h3>
              <p className="text-muted-foreground">Get PSD instantly & customize</p>
            </div>
          </div>
        </div>
      </section>

      {/* Simple Features */}
      <section className="px-4 sm:px-6 lg:px-8 pb-20">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 font-hand">What You Get</h2>
          </div>

          <div className="grid sm:grid-cols-2 gap-6">
            {[
              { icon: Layers, text: 'Fully editable PSD files' },
              { icon: Check, text: 'Commercial license included' },
              { icon: Download, text: 'Instant download access' },
              { icon: Star, text: 'Free updates & support' },
            ].map((feature, idx) => (
              <div key={idx} className="flex items-center gap-4 p-4 bg-card rounded-lg doodle-border">
                <div className="w-12 h-12 bg-accent-yellow/30 rounded-lg flex items-center justify-center">
                  <feature.icon className="w-6 h-6" />
                </div>
                <span className="font-medium">{feature.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Simple CTA */}
      <section className="px-4 sm:px-6 lg:px-8 pb-20">
        <div className="max-w-3xl mx-auto text-center">
          <div className="card p-8">
            <h2 className="text-3xl font-bold mb-4 font-hand">Ready to upgrade your thumbnails?</h2>
            <p className="text-muted-foreground mb-8">
              Start creating professional thumbnails in minutes with my PSD templates.
            </p>
            <Link 
              href="/products" 
              className="btn-secondary bg-purple-300 inline-flex items-center gap-2 px-8 py-4 text-lg"
            >
              Browse All PSDs
              <ChevronRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}