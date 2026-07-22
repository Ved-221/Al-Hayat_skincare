import { supabase } from "@/lib/supabase";
import { PRODUCTS, Product } from "@/data/products";

// Maps database fields back to the local Product interface format
export function mapDbProduct(dbProduct: any): Product {
  return {
    id: dbProduct.id,
    name: dbProduct.name,
    category: dbProduct.categories?.name || dbProduct.category || "",
    categoryId: dbProduct.category_id || dbProduct.categories?.id || null,
    categorySlug: dbProduct.categories?.slug || null,
    desc: dbProduct.desc || "",
    price: dbProduct.price || "",
    priceOriginal: dbProduct.price_original || dbProduct.priceOriginal || "",
    discount: dbProduct.discount || "",
    badge: dbProduct.badge || null,
    ingredients: dbProduct.ingredients || [],
    benefit: dbProduct.benefit || "",
    img: dbProduct.img ? `${dbProduct.img}?v=2` : "",
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
  } catch (err: any) {
    console.error("Failed to fetch products from Supabase:", err);
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
  } catch (err: any) {
    console.error(`Failed to fetch product by slug "${slug}" from Supabase:`, err);
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
  } catch (err: any) {
    console.error(`Error fetching products for category slug "${categorySlug}":`, err);
    return [];
  }
}
