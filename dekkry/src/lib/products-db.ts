import { Product } from '@/types';

// Static import — bundled at build time, zero runtime I/O
const products: Product[] = [
  {
    id: 'p1',
    name: 'DEKKRY OVERSIZED TEE VOL.1',
    description: 'Premium heavyweight oversized tee. Pure cotton. Dropped shoulders, boxy fit. Made for the streets.',
    price: 45,
    images: [
      'https://media.base44.com/images/public/69d65ddb96ea190c515ae882/0797a93e1_generated_image.png',
    ],
    sizes: ['M', 'L', 'XL', '2XL', '3XL'],
    variants: [
      { color: 'Black', colorHex: '#0a0a0a', sizes: ['M', 'L', 'XL', '2XL', '3XL'], images: ['https://media.base44.com/images/public/69d65ddb96ea190c515ae882/0797a93e1_generated_image.png'] },
      { color: 'White', colorHex: '#f5f5f5', sizes: ['M', 'L', 'XL', '2XL', '3XL'], images: ['https://media.base44.com/images/public/69d65ddb96ea190c515ae882/a0943634e_generated_image.png'] },
    ],
    sourceUrl: 'https://mulebuy.com/product?id=903913002851&platform=TAOBAO',
    category: 'tops',
    featured: true,
    createdAt: '2025-01-01T00:00:00.000Z',
  },
  {
    id: 'p2',
    name: 'DEKKRY STRIPE LONG SLEEVE',
    description: 'American-style 3-stripe long sleeve. Pure cotton. Couples wear, versatile streetwear essential.',
    price: 48,
    images: [
      'https://media.base44.com/images/public/69d65ddb96ea190c515ae882/8678bd189_generated_image.png',
    ],
    sizes: ['M', 'L', 'XL', '2XL', '3XL'],
    variants: [
      { color: 'White/Black', colorHex: '#f5f5f5', sizes: ['M', 'L', 'XL', '2XL', '3XL'], images: ['https://media.base44.com/images/public/69d65ddb96ea190c515ae882/541c96dbe_generated_image.png'] },
      { color: 'Black/White', colorHex: '#0a0a0a', sizes: ['M', 'L', 'XL', '2XL', '3XL'], images: ['https://media.base44.com/images/public/69d65ddb96ea190c515ae882/8678bd189_generated_image.png'] },
    ],
    sourceUrl: 'https://mulebuy.com/product?id=965410559753&platform=TAOBAO',
    category: 'tops',
    featured: true,
    createdAt: '2025-01-01T00:00:00.000Z',
  },
  {
    id: 'p3',
    name: 'DEKKRY HOODIE ARCH',
    description: 'Heavyweight fleece hoodie. Kangaroo pocket, ribbed cuffs. The core DEKKRY piece.',
    price: 75,
    images: [
      'https://media.base44.com/images/public/69d65ddb96ea190c515ae882/75d2ba4d8_generated_image.png',
    ],
    sizes: ['M', 'L', 'XL', '2XL', '3XL'],
    variants: [
      { color: 'Black', colorHex: '#0a0a0a', sizes: ['M', 'L', 'XL', '2XL', '3XL'], images: ['https://media.base44.com/images/public/69d65ddb96ea190c515ae882/75d2ba4d8_generated_image.png'] },
      { color: 'Grey', colorHex: '#888888', sizes: ['M', 'L', 'XL', '2XL', '3XL'], images: ['https://media.base44.com/images/public/69d65ddb96ea190c515ae882/7399309fc_generated_image.png'] },
    ],
    sourceUrl: 'https://mulebuy.com/product?id=885213176913&platform=TAOBAO',
    category: 'tops',
    featured: true,
    createdAt: '2025-01-01T00:00:00.000Z',
  },
  {
    id: 'p4',
    name: 'DEKKRY BRAND SHORTS',
    description: 'American-style retro fashion shorts. Drawstring waist, knee-length. Printed branding, unisex fit.',
    price: 42,
    images: [
      'https://media.base44.com/images/public/69d65ddb96ea190c515ae882/14950445f_generated_image.png',
    ],
    sizes: ['M', 'L', 'XL', '2XL', '3XL'],
    variants: [
      { color: 'Navy', colorHex: '#1a2744', sizes: ['M', 'L', 'XL', '2XL', '3XL'], images: ['https://media.base44.com/images/public/69d65ddb96ea190c515ae882/fbcfa3555_generated_image.png'] },
      { color: 'Black', colorHex: '#0a0a0a', sizes: ['M', 'L', 'XL', '2XL', '3XL'], images: ['https://media.base44.com/images/public/69d65ddb96ea190c515ae882/14950445f_generated_image.png'] },
      { color: 'Burgundy', colorHex: '#6e1423', sizes: ['M', 'L', 'XL', '2XL', '3XL'], images: ['https://media.base44.com/images/public/69d65ddb96ea190c515ae882/5a90552d1_generated_image.png'] },
    ],
    sourceUrl: 'https://mulebuy.com/product?id=952145287625&platform=TAOBAO',
    category: 'bottoms',
    featured: false,
    createdAt: '2025-01-01T00:00:00.000Z',
  },
  {
    id: 'p5',
    name: 'DEKKRY LOGO CAP',
    description: 'Six-panel structured cap. Embroidered DEKKRY arch logo. Adjustable strap back.',
    price: 35,
    images: [
      'https://media.base44.com/images/public/69d65ddb96ea190c515ae882/fefc4560e_generated_image.png',
    ],
    sizes: ['One Size'],
    variants: [
      { color: 'Black', colorHex: '#0a0a0a', sizes: ['One Size'], images: ['https://media.base44.com/images/public/69d65ddb96ea190c515ae882/fefc4560e_generated_image.png'] },
      { color: 'Cream', colorHex: '#f5f0e8', sizes: ['One Size'], images: ['https://media.base44.com/images/public/69d65ddb96ea190c515ae882/920a3d0dd_generated_image.png'] },
    ],
    sourceUrl: 'https://mulebuy.com/product?id=912588536138&platform=TAOBAO',
    category: 'accessories',
    featured: false,
    createdAt: '2025-01-01T00:00:00.000Z',
  },
  {
    id: 'p6',
    name: 'DEKKRY WIDE LEG PANTS',
    description: 'Wide-leg relaxed pants with drawstring waist. Versatile streetwear silhouette.',
    price: 65,
    images: [
      'https://media.base44.com/images/public/69d65ddb96ea190c515ae882/2965b1241_generated_image.png',
    ],
    sizes: ['M', 'L', 'XL', '2XL', '3XL'],
    variants: [
      { color: 'Black', colorHex: '#0a0a0a', sizes: ['M', 'L', 'XL', '2XL', '3XL'], images: ['https://media.base44.com/images/public/69d65ddb96ea190c515ae882/2965b1241_generated_image.png'] },
      { color: 'Grey', colorHex: '#888888', sizes: ['M', 'L', 'XL', '2XL', '3XL'], images: ['https://media.base44.com/images/public/69d65ddb96ea190c515ae882/59f3fc4d1_generated_image.png'] },
    ],
    sourceUrl: 'https://mulebuy.com/product?id=931719525623&platform=TAOBAO',
    category: 'bottoms',
    featured: false,
    createdAt: '2025-01-01T00:00:00.000Z',
  },
  {
    id: 'p7',
    name: 'DEKKRY UTILITY VEST',
    description: 'Multi-pocket utility vest. Adjustable straps, zippered compartments. Tactical streetwear essential.',
    price: 68,
    images: [
      'https://media.base44.com/images/public/69d65ddb96ea190c515ae882/2e9b05985_generated_image.png',
    ],
    sizes: ['M', 'L', 'XL', '2XL', '3XL'],
    variants: [
      { color: 'Black', colorHex: '#0a0a0a', sizes: ['M', 'L', 'XL', '2XL', '3XL'], images: ['https://media.base44.com/images/public/69d65ddb96ea190c515ae882/2e9b05985_generated_image.png'] },
    ],
    sourceUrl: 'https://mulebuy.com/product?id=974669702994&platform=TAOBAO',
    category: 'outerwear',
    featured: false,
    createdAt: '2025-01-01T00:00:00.000Z',
  },
  {
    id: 'p8',
    name: 'DEKKRY LONG SLEEVE THERMAL',
    description: 'Waffle-knit thermal long sleeve. Slim fit, crew neck. Layering essential for any season.',
    price: 52,
    images: [
      'https://media.base44.com/images/public/69d65ddb96ea190c515ae882/b5c4ee726_generated_image.png',
    ],
    sizes: ['M', 'L', 'XL', '2XL', '3XL'],
    variants: [
      { color: 'Off White', colorHex: '#f0ede6', sizes: ['M', 'L', 'XL', '2XL', '3XL'], images: ['https://media.base44.com/images/public/69d65ddb96ea190c515ae882/fe59432be_generated_image.png'] },
      { color: 'Black', colorHex: '#0a0a0a', sizes: ['M', 'L', 'XL', '2XL', '3XL'], images: ['https://media.base44.com/images/public/69d65ddb96ea190c515ae882/b5c4ee726_generated_image.png'] },
    ],
    sourceUrl: 'https://mulebuy.com/product?id=985987652341&platform=TAOBAO',
    category: 'tops',
    featured: false,
    createdAt: '2025-01-01T00:00:00.000Z',
  },
];

export function getAllProducts(): Product[] {
  return products;
}

export function getProductById(id: string): Product | null {
  return products.find((p) => p.id === id) ?? null;
}

export function saveProduct(_product: Product): void {
  // no-op on static build
}

export function deleteProduct(_id: string): void {
  // no-op on static build
}
