import { Product } from '@/types';
import fs from 'fs';
import path from 'path';

const DB_PATH = path.join(process.cwd(), 'data', 'products.json');

function ensureDb() {
  const dir = path.dirname(DB_PATH);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  if (!fs.existsSync(DB_PATH)) {
    fs.writeFileSync(DB_PATH, JSON.stringify(defaultProducts, null, 2));
  }
}

export function getAllProducts(): Product[] {
  ensureDb();
  const raw = fs.readFileSync(DB_PATH, 'utf-8');
  return JSON.parse(raw);
}

export function getProductById(id: string): Product | null {
  const products = getAllProducts();
  return products.find((p) => p.id === id) || null;
}

export function saveProduct(product: Product): void {
  ensureDb();
  const products = getAllProducts();
  const idx = products.findIndex((p) => p.id === product.id);
  if (idx >= 0) {
    products[idx] = product;
  } else {
    products.push(product);
  }
  fs.writeFileSync(DB_PATH, JSON.stringify(products, null, 2));
}

export function deleteProduct(id: string): void {
  ensureDb();
  const products = getAllProducts().filter((p) => p.id !== id);
  fs.writeFileSync(DB_PATH, JSON.stringify(products, null, 2));
}

// Default seed products using placeholder data - import real data via /admin/import
const defaultProducts: Product[] = [
  {
    id: 'p1',
    name: 'DEKKRY OVERSIZED TEE VOL.1',
    description: 'Premium heavyweight oversized tee. 320gsm cotton. Dropped shoulders, boxy fit. Made for the streets.',
    price: 45,
    images: [
      'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=800&q=80',
      'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&q=80',
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    variants: [
      { color: 'Black', colorHex: '#0a0a0a', sizes: ['S', 'M', 'L', 'XL'], images: ['https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=800&q=80'] },
      { color: 'Cement', colorHex: '#8a8a8a', sizes: ['S', 'M', 'L', 'XL'], images: ['https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&q=80'] },
    ],
    sourceUrl: 'https://mulebuy.com/product?id=903913002851&platform=TAOBAO',
    category: 'tops',
    featured: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: 'p2',
    name: 'DEKKRY CARGO PANTS',
    description: 'Tactical cargo pants with utility pockets. Relaxed fit, tapered leg. Heavy-duty twill fabric.',
    price: 89,
    images: [
      'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=800&q=80',
      'https://images.unsplash.com/photo-1552902865-b72c031ac5ea?w=800&q=80',
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    variants: [
      { color: 'Black', colorHex: '#0a0a0a', sizes: ['S', 'M', 'L', 'XL'], images: ['https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=800&q=80'] },
      { color: 'Olive', colorHex: '#556B2F', sizes: ['S', 'M', 'L'], images: ['https://images.unsplash.com/photo-1552902865-b72c031ac5ea?w=800&q=80'] },
    ],
    sourceUrl: 'https://mulebuy.com/product?id=965410559753&platform=TAOBAO',
    category: 'bottoms',
    featured: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: 'p3',
    name: 'DEKKRY HOODIE ARCH',
    description: 'Heavyweight 400gsm fleece hoodie. Kangaroo pocket, ribbed cuffs. The core piece.',
    price: 75,
    images: [
      'https://images.unsplash.com/photo-1556821840-3a63f15732ce?w=800&q=80',
      'https://images.unsplash.com/photo-1509942774463-acf339cf87d5?w=800&q=80',
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    variants: [
      { color: 'Charcoal', colorHex: '#333333', sizes: ['S', 'M', 'L', 'XL'], images: ['https://images.unsplash.com/photo-1556821840-3a63f15732ce?w=800&q=80'] },
      { color: 'Stone', colorHex: '#a0998a', sizes: ['M', 'L', 'XL'], images: ['https://images.unsplash.com/photo-1509942774463-acf339cf87d5?w=800&q=80'] },
    ],
    sourceUrl: 'https://mulebuy.com/product?id=885213176913&platform=TAOBAO',
    category: 'tops',
    featured: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: 'p4',
    name: 'DEKKRY TRACK JACKET',
    description: 'Retro-inspired track jacket. Contrast zip, side pockets. Lightweight and versatile.',
    price: 95,
    images: [
      'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=800&q=80',
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    variants: [
      { color: 'Black', colorHex: '#0a0a0a', sizes: ['S', 'M', 'L', 'XL'], images: ['https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=800&q=80'] },
    ],
    sourceUrl: 'https://mulebuy.com/product?id=952145287625&platform=TAOBAO',
    category: 'outerwear',
    featured: false,
    createdAt: new Date().toISOString(),
  },
  {
    id: 'p5',
    name: 'DEKKRY LOGO CAP',
    description: 'Six-panel structured cap. Embroidered DEKKRY arch logo. Adjustable strap.',
    price: 35,
    images: [
      'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=800&q=80',
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    variants: [
      { color: 'Black', colorHex: '#0a0a0a', sizes: ['S', 'M', 'L', 'XL'], images: ['https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=800&q=80'] },
      { color: 'Cream', colorHex: '#f5f0e8', sizes: ['S', 'M', 'L', 'XL'], images: ['https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=800&q=80'] },
    ],
    sourceUrl: 'https://mulebuy.com/product?id=912588536138&platform=TAOBAO',
    category: 'accessories',
    featured: false,
    createdAt: new Date().toISOString(),
  },
  {
    id: 'p6',
    name: 'DEKKRY WIDE LEG DENIM',
    description: 'Wide-leg denim with raw hem. Washed black finish. Heavyweight Japanese-style denim.',
    price: 110,
    images: [
      'https://images.unsplash.com/photo-1542272604-787c3835535d?w=800&q=80',
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    variants: [
      { color: 'Washed Black', colorHex: '#2a2a2a', sizes: ['S', 'M', 'L', 'XL'], images: ['https://images.unsplash.com/photo-1542272604-787c3835535d?w=800&q=80'] },
    ],
    sourceUrl: 'https://mulebuy.com/product?id=931719525623&platform=TAOBAO',
    category: 'bottoms',
    featured: false,
    createdAt: new Date().toISOString(),
  },
  {
    id: 'p7',
    name: 'DEKKRY UTILITY VEST',
    description: 'Multi-pocket utility vest. Adjustable straps, zippered compartments. Tactical streetwear essential.',
    price: 68,
    images: [
      'https://images.unsplash.com/photo-1548126032-079a0fb0099d?w=800&q=80',
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    variants: [
      { color: 'Black', colorHex: '#0a0a0a', sizes: ['S', 'M', 'L', 'XL'], images: ['https://images.unsplash.com/photo-1548126032-079a0fb0099d?w=800&q=80'] },
    ],
    sourceUrl: 'https://mulebuy.com/product?id=1019223341961&platform=TAOBAO',
    category: 'outerwear',
    featured: false,
    createdAt: new Date().toISOString(),
  },
  {
    id: 'p8',
    name: 'DEKKRY LONG SLEEVE THERMAL',
    description: 'Waffle-knit thermal long sleeve. Slim fit, crew neck. Layering essential.',
    price: 55,
    images: [
      'https://images.unsplash.com/photo-1618354691792-d1d42acfd860?w=800&q=80',
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    variants: [
      { color: 'Off White', colorHex: '#f0ece4', sizes: ['S', 'M', 'L', 'XL'], images: ['https://images.unsplash.com/photo-1618354691792-d1d42acfd860?w=800&q=80'] },
      { color: 'Black', colorHex: '#0a0a0a', sizes: ['S', 'M', 'L', 'XL'], images: ['https://images.unsplash.com/photo-1618354691792-d1d42acfd860?w=800&q=80'] },
    ],
    sourceUrl: 'https://mulebuy.com/product?id=903628839009&platform=TAOBAO',
    category: 'tops',
    featured: false,
    createdAt: new Date().toISOString(),
  },
];
