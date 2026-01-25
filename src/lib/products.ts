// lib/products.ts
export interface Product {
  id: number;
  title: string;
  category: string;
  price: number;
  image: string;
  description: string;
}

export const products: Product[] = [
  {
    id: 1,
    title: 'YouTube Tech Thumbnails',
    category: 'Tech',
    price: 299,
    image: '/images/products/three.png',
    description: '10 modern tech YouTube thumbnail PSDs'
  },
  {
    id: 2,
    title: 'Podcast Cover Pack',
    category: 'Podcast',
    price: 399,
    image: '/images/products/podcast1.png',
    description: '8 professional podcast cover PSDs'
  },
  {
    id: 3,
    title: 'Coding Tutorial Thumbnails',
    category: 'Edtech',
    price: 599,
    image: '/images/products/tech.png',
    description: '12 coding tutorial thumbnail PSDs'
  },
  {
    id: 4,
    title: 'Trading Thumbnails',
    category: 'Trading',
    price: 599,
    image: '/images/products/trading.png',
    description: '12 trading strategy thumbnail PSDs'
  },
  {
    id: 5,
    title: 'Trading Course Thumbnails',
    category: 'Trading',
    price: 599,
    image: '/images/products/trading-course.png',
    description: '12 trading strategy thumbnail PSDs'
  },
];