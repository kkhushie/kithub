'use client';
import ProductCard from '@/components/ProductCard';
import { products } from '@/lib/products';
import { useState } from 'react';

export default function ProductsPage() {
  const [activeCategory, setActiveCategory] = useState('All');
  
  // Your 3 main categories
  const categories = ['All', 'Tech', 'Podcast', 'Edtech','Trading'];
  
  const filteredProducts = activeCategory === 'All' 
    ? products 
    : products.filter(p => p.category === activeCategory);

  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2 font-hand">All PSD Templates</h1>
          <p className="text-muted-foreground">
            Browse my collection of thumbnail PSDs designed for creators
          </p>
        </div>

        {/* Simple Category Filter */}
        <div className="flex flex-wrap gap-3 mb-8">
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
          {filteredProducts.map((product, index) => (
            <ProductCard key={product.id} product={product} accentIndex={index} />
          ))}
        </div>

        {/* Empty State */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-16">
            <p className="text-2xl text-muted-foreground font-hand mb-4">No PSDs in this category yet</p>
            <p className="text-muted-foreground mb-8">More coming soon!</p>
            <button
              onClick={() => setActiveCategory('All')}
              className="btn-primary"
            >
              View All PSDs
            </button>
          </div>
        )}
      </div>
    </div>
  );
}