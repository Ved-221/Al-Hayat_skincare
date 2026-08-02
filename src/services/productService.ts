import { supabase } from "@/lib/supabase";
import { PRODUCTS, Product } from "@/data/products";

interface DbProduct {
  id: string | number;
  name: string;
  category?: string;
  category_id?: string | number;
  categories?: { id: string | number; name: string; slug: string };
  desc?: string;
  price?: string | number;
  price_original?: string | number;
  priceOriginal?: string | number;
  discount?: string;
  badge?: string;
  ingredients?: string[];
  benefit?: string;
  img?: string;
  slug?: string;
  suitable_for?: string;
  suitableFor?: string;
  tagline?: string;
  detailed_ingredients?: { name: string; desc: string }[];
  detailedIngredients?: { name: string; desc: string }[];
  detailed_benefits?: { icon: string; title: string; sub: string }[];
  detailedBenefits?: { icon: string; title: string; sub: string }[];
  ritual?: { icon: string; step: string; desc: string }[];
}

// Maps database fields back to the local Product interface format
export function mapDbProduct(dbProduct: DbProduct): Product {
  return {
    id: dbProduct.id,
    name: dbProduct.name,
    category: dbProduct.categories?.name || dbProduct.category || "",
    categoryId: dbProduct.category_id 
      ? String(dbProduct.category_id) 
      : (dbProduct.categories?.id ? String(dbProduct.categories.id) : null),
    categorySlug: dbProduct.categories?.slug || null,
    desc: dbProduct.desc || "",
    price: dbProduct.price ? String(dbProduct.price) : "",
    priceOriginal: dbProduct.price_original ? String(dbProduct.price_original) : (dbProduct.priceOriginal ? String(dbProduct.priceOriginal) : ""),
    discount: dbProduct.discount ? String(dbProduct.discount) : "",
    badge: dbProduct.badge || null,
    ingredients: dbProduct.ingredients || [],
    benefit: dbProduct.benefit || "",
    img: dbProduct.img 
      ? dbProduct.img.startsWith("http") 
        ? dbProduct.img
        : `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/site-assets${dbProduct.img.replace(".png", ".webp")}`
      : "",
    slug: dbProduct.slug || "",
    suitableFor: dbProduct.suitable_for || dbProduct.suitableFor || "",
    tagline: dbProduct.tagline || "",
    detailedIngredients: dbProduct.detailed_ingredients || dbProduct.detailedIngredients || [],
    detailedBenefits: dbProduct.detailed_benefits || dbProduct.detailedBenefits || [],
    ritual: dbProduct.ritual || [],
  };
}

export async function getProducts(): Promise<Product[]> {
  try {
    const { data, error } = await supabase
      .from("products")
      .select("*, categories(id, name, slug)")
      .order("id", { ascending: true });

    if (error || !data || data.length === 0) {
      console.warn("Falling back to static products. Database error or empty:", error?.message);
      return PRODUCTS;
    }

    return data.map(mapDbProduct);
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error("Failed to fetch products from Supabase:", msg);
    return PRODUCTS;
  }
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  try {
    const { data, error } = await supabase
      .from("products")
      .select("*, categories(id, name, slug)")
      .eq("slug", slug)
      .maybeSingle();

    if (error || !data) {
      console.warn(`Product slug "${slug}" not found in DB, falling back to static products.`);
      return PRODUCTS.find((p) => p.slug === slug) || null;
    }

    return mapDbProduct(data);
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error(`Failed to fetch product by slug "${slug}" from Supabase:`, msg);
    return PRODUCTS.find((p) => p.slug === slug) || null;
  }
}

export async function getProductsByCategory(categorySlug: string): Promise<Product[]> {
  try {
    const { data, error } = await supabase
      .from("products")
      .select("*, categories!inner(id, name, slug)")
      .eq("categories.slug", categorySlug)
      .order("id", { ascending: true });

    if (error || !data) {
      console.warn(`Failed to fetch products for category slug "${categorySlug}":`, error?.message);
      return [];
    }

    return data.map(mapDbProduct);
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error(`Error fetching products for category slug "${categorySlug}":`, msg);
    return [];
  }
}
