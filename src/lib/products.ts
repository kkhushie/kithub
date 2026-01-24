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
    category: 'YouTube',
    price: 499,
    image: '/images/tech-thumbnails.jpg',
    description: '10 modern tech YouTube thumbnail PSDs'
  },
  {
    id: 2,
    title: 'Podcast Cover Pack',
    category: 'Podcast',
    price: 399,
    image: '/images/podcast-covers.jpg',
    description: '8 professional podcast cover PSDs'
  },
  {
    id: 3,
    title: 'Coding Tutorial Thumbnails',
    category: 'Coding',
    price: 599,
    image: '/images/coding-thumbnails.jpg',
    description: '12 coding tutorial thumbnail PSDs'
  },
  // Add more of your actual PSDs here
];