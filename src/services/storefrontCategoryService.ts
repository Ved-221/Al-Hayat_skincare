import { supabase } from "@/lib/supabase";
import type { Category } from "@/types/category";
import { CATEGORY_VISIBILITY } from "@/types/category";
import { mapDbProduct } from "@/services/productService";
import type { Product } from "@/data/products";

export interface StorefrontCategoryWithCount extends Category {
  productCount: number;
}

/**
 * Fetches all visible, non-deleted categories sorted by sort_order ASC, name ASC.
 */
export async function getStorefrontCategories(): Promise<Category[]> {
  try {
    const { data, error } = await supabase
      .from("categories")
      .select("*")
      .eq("visibility", CATEGORY_VISIBILITY.VISIBLE)
      .is("deleted_at", null)
      .order("sort_order", { ascending: true })
      .order("name", { ascending: true });

    if (error) {
      console.error("Failed to fetch storefront categories:", error.message);
      return [];
    }

    return (data as Category[]) || [];
  } catch (err) {
    console.error("Error fetching storefront categories:", err);
    return [];
  }
}

/**
 * Fetches featured, visible, non-deleted categories (max 6) with active product count.
 */
export async function getFeaturedStorefrontCategories(): Promise<StorefrontCategoryWithCount[]> {
  try {
    const { data: categories, error } = await supabase
      .from("categories")
      .select("*")
      .eq("visibility", CATEGORY_VISIBILITY.VISIBLE)
      .eq("is_featured", true)
      .is("deleted_at", null)
      .order("sort_order", { ascending: true })
      .order("name", { ascending: true })
      .limit(6);

    if (error || !categories) {
      console.error("Failed to fetch featured categories:", error?.message);
      return [];
    }

    const categoriesWithCount = await Promise.all(
      categories.map(async (cat) => {
        const { count } = await supabase
          .from("products")
          .select("*", { count: "exact", head: true })
          .eq("category_id", cat.id)
          .is("deleted_at", null);

        return {
          ...(cat as Category),
          productCount: count || 0,
        };
      })
    );

    return categoriesWithCount;
  } catch (err) {
    console.error("Error fetching featured categories with counts:", err);
    return [];
  }
}

/**
 * Fetches all visible, non-deleted categories with active product count for filter sidebars and chips.
 */
export async function getCategoriesWithProductCounts(): Promise<StorefrontCategoryWithCount[]> {
  try {
    const categories = await getStorefrontCategories();
    if (!categories.length) return [];

    const categoriesWithCount = await Promise.all(
      categories.map(async (cat) => {
        const { count } = await supabase
          .from("products")
          .select("*", { count: "exact", head: true })
          .eq("category_id", cat.id)
          .is("deleted_at", null);

        return {
          ...cat,
          productCount: count || 0,
        };
      })
    );

    return categoriesWithCount;
  } catch (err) {
    console.error("Error fetching categories with product counts:", err);
    return [];
  }
}

/**
 * Fetches a single visible category by slug along with its active products.
 */
export async function getStorefrontCategoryBySlug(
  slug: string
): Promise<{ category: Category; products: Product[] } | null> {
  try {
    const { data: category, error: catError } = await supabase
      .from("categories")
      .select("*")
      .eq("slug", slug)
      .eq("visibility", CATEGORY_VISIBILITY.VISIBLE)
      .is("deleted_at", null)
      .maybeSingle();

    if (catError || !category) {
      return null;
    }

    // Fetch active products in this category
    const { data: productsData, error: prodError } = await supabase
      .from("products")
      .select("*")
      .eq("category_id", category.id)
      .is("deleted_at", null)
      .order("id", { ascending: true });

    if (prodError) {
      console.error("Failed to fetch category products:", prodError.message);
      return { category: category as Category, products: [] };
    }

    const products = (productsData || []).map(mapDbProduct);
    return { category: category as Category, products };
  } catch (err) {
    console.error(`Error in getStorefrontCategoryBySlug for "${slug}":`, err);
    return null;
  }
}
