'use client';
import ProductCard from '@/components/ProductCard';
import { supabase } from '@/lib/supabaseClient';
import { useEffect, useState } from 'react';
import { Product } from '@/lib/products';

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('All');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data, error } = await supabase
          .from("products")
          .select("*")
          .eq("active", true);

        if (error) throw error;
        // Cast or map data if necessary, assuming keys match for now
        setProducts(data as Product[] || []);
      } catch (err) {
        console.error("Error fetching products:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Your 3 main categories
  const categories = ['All', 'Tech', 'Podcast', 'Edtech', 'Trading'];

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
              className={`px-5 py-2 rounded-lg font-medium transition-all hover:-translate-y-0.5 ${activeCategory === cat
                ? 'bg-foreground text-primary-foreground doodle-border'
                : 'bg-card text-foreground doodle-border hover:bg-muted'
                }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Product Grid */}
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="w-12 h-12 border-4 border-black border-t-purple-500 rounded-full animate-spin"></div>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product, index) => (
              <ProductCard key={product.id} product={product} accentIndex={index} />
            ))}
          </div>
        )}

        {/* Empty State */}
        {!loading && filteredProducts.length === 0 && (
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