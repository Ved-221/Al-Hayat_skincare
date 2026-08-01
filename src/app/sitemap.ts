import type { MetadataRoute } from 'next';
import { getProducts } from '@/services/productService';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.alhayat.com';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const products = await getProducts();

  const productRoutes = products.map((product) => ({
    url: `${SITE_URL}/product/${product.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  const staticRoutes = [
    '',
    '/about',
    '/contact',
    '/ingredients',
    '/products',
    '/reviews',
    '/shipping',
    '/returns',
    '/privacy-policy',
    '/terms',
    '/sourcing-ethics',
  ].map((route) => ({
    url: `${SITE_URL}${route}`,
    lastModified: new Date(),
    changeFrequency: (route === '' ? 'daily' : 'weekly') as "daily" | "weekly",
    priority: route === '' ? 1 : 0.7,
  }));

  return [...staticRoutes, ...productRoutes];
}
