import { supabase } from "@/lib/supabase";
import { PRODUCTS, Product } from "@/data/products";

// Maps database fields back to the local Product interface format
function mapDbProduct(dbProduct: any): Product {
  return {
    name: dbProduct.name,
    category: dbProduct.category,
    desc: dbProduct.desc,
    price: dbProduct.price,
    priceOriginal: dbProduct.price_original || dbProduct.priceOriginal || "",
    discount: dbProduct.discount || "",
    badge: dbProduct.badge,
    ingredients: dbProduct.ingredients || [],
    benefit: dbProduct.benefit,
    img: dbProduct.img,
    slug: dbProduct.slug,
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
      .select("*")
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
      .select("*")
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
