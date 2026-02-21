import Link from 'next/link';
import { ShoppingCart } from 'lucide-react';
import { Product } from '@/lib/products';
import Image from 'next/image';

interface ProductCardProps {
  product: Product;
  accentIndex?: number;
}

const accentStyles = [
  'bg-accent-coral',
  'bg-accent-yellow',
  'bg-accent-mint',
  'bg-accent-lavender',
];

export default function ProductCard({ product, accentIndex = 0 }: ProductCardProps) {
  const accent = accentStyles[accentIndex % accentStyles.length];

  return (
    <div className="group bg-white doodle-border doodle-shadow doodle-hover overflow-hidden rounded-xl">
      {/* Image Container */}
      <Link href={`/product/${product.id}`}>
        <div className="relative overflow-hidden doodle-border-b">
          <Image
            src={product.image}
            alt={product.title}
            width={410}
            height={300}
          />
          {/* Price Tag */}
          <div className={`absolute top-3 right-3 ${accent} px-4 py-2 doodle-border doodle-shadow-sm rounded-lg bg-purple-300 text-black`}>
            <span className="font-hand text-xl font-bold text-foreground">₹{product.price}</span>
          </div>
        </div>
      </Link>

      {/* Content */}
      <div className="p-5">
        {/* Category */}
        <span className="inline-block px-3 py-1 text-sm font-medium doodle-border-dashed rounded-full mb-3">
          {product.category}
        </span>

        {/* Title */}
        <Link href={`/product/${product.id}`}>
          <h3 className="text-xl font-bold mb-2 font-hand hover:text-accent-coral transition-colors">
            {product.title}
          </h3>
        </Link>

        {/* Description */}
        <div className="text-muted-foreground text-sm mb-4">
          {product.description}
        </div>

        {/* Button */}
        <Link
          href={`/product/${product.id}`}
          className="block w-full py-3 bg-foreground text-primary-foreground font-semibold rounded-lg doodle-border doodle-hover text-center"
        >
          <span className="flex items-center justify-center gap-2">
            View Details
            <ShoppingCart className="w-4 h-4" />
          </span>
        </Link>
      </div>
    </div>
  );
}