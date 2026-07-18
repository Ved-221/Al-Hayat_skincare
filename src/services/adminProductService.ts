/**
 * adminProductService.ts
 * -----------------------
 * Server-only. Uses the SSR Supabase client so session cookies are forwarded.
 * Do NOT import this from client components.
 *
 * Uses numeric `id` (bigint → number) for update / delete routes,
 * never slug, so stale slugs after an edit can't cause data corruption.
 */

import { createClient } from "@/lib/supabase-server";

// ---------------------------------------------------------------------------
// DB row shape (snake_case, matches the Supabase products table exactly)
// ---------------------------------------------------------------------------
export interface DbProduct {
  id: number;
  name: string;
  slug: string;
  /** @deprecated Use category_id FK instead. Retained for backward compatibility. */
  category: string | null;
  category_id: string | null;
  categories?: {
    id: string;
    name: string;
    slug: string;
    thumbnail_url: string | null;
    visibility: string;
    is_featured: boolean;
  } | null;
  desc: string;
  price: string;
  price_original: string;
  discount: string;
  badge: string | null;
  ingredients: string[];
  benefit: string;
  img: string;
  suitable_for: string;
  tagline: string;
  detailed_ingredients: { name: string; desc: string }[];
  detailed_benefits: { icon: string; title: string; sub: string }[];
  ritual: { icon: string; step: string; desc: string }[];
  featured: boolean;
  stock_status: string;
  created_at: string;
  updated_at: string;
}

// ---------------------------------------------------------------------------
// Payload type for create / update (omits server-generated fields)
// ---------------------------------------------------------------------------
export type ProductPayload = Omit<
  DbProduct,
  "id" | "created_at" | "updated_at" | "categories" | "category"
> & {
  category_id: string;
  /** @deprecated Fallback category string for legacy reads */
  category?: string | null;
};

// ---------------------------------------------------------------------------
// Read helpers
// ---------------------------------------------------------------------------

export async function getAdminProducts(): Promise<DbProduct[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("products")
    .select("*, categories(id, name, slug, thumbnail_url, visibility, is_featured)")
    .order("id", { ascending: true });

  if (error) throw new Error(`Failed to fetch products: ${error.message}`);
  return (data as DbProduct[]) ?? [];
}

export async function getAdminProductById(id: number): Promise<DbProduct> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("products")
    .select("*, categories(id, name, slug, thumbnail_url, visibility, is_featured)")
    .eq("id", id)
    .single();

  if (error || !data)
    throw new Error(`Product id=${id} not found: ${error?.message ?? ""}`);
  return data as DbProduct;
}

// ---------------------------------------------------------------------------
// Mutation helpers
// ---------------------------------------------------------------------------

export async function createProduct(payload: ProductPayload): Promise<DbProduct> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("products")
    .insert(payload)
    .select("*, categories(id, name, slug, thumbnail_url, visibility, is_featured)")
    .single();

  if (error || !data)
    throw new Error(`Failed to create product: ${error?.message ?? ""}`);
  return data as DbProduct;
}

export async function updateProduct(
  id: number,
  payload: Partial<ProductPayload>
): Promise<DbProduct> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("products")
    .update({ ...payload, updated_at: new Date().toISOString() })
    .eq("id", id)
    .select("*, categories(id, name, slug, thumbnail_url, visibility, is_featured)")
    .single();

  if (error || !data)
    throw new Error(`Failed to update product id=${id}: ${error?.message ?? ""}`);
  return data as DbProduct;
}

export async function deleteProduct(id: number): Promise<void> {
  const supabase = await createClient();

  const { error } = await supabase
    .from("products")
    .delete()
    .eq("id", id)
    .select();

  if (error) {
    throw new Error(`Failed to delete product id=${id}: ${error.message}`);
  }
}

// ============================================================================
// DASHBOARD & ANALYTICS HELPERS
// ============================================================================

export async function getProductStats(): Promise<{ totalProducts: number }> {
  const supabase = await createClient();

  const { count, error } = await supabase
    .from("products")
    .select("id", { count: "exact", head: true });

  if (error) {
    console.error("Error counting products:", error.message);
  }

  return { totalProducts: count ?? 0 };
}

export async function getLowStockProducts(limit = 5): Promise<DbProduct[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("products")
    .select("*, categories(id, name, slug, thumbnail_url, visibility, is_featured)")
    .neq("stock_status", "in_stock")
    .order("updated_at", { ascending: false })
    .limit(limit);

  if (error) {
    console.error("Failed to fetch low stock products:", error.message);
    return [];
  }

  return (data as DbProduct[]) ?? [];
}

export async function getRecentProducts(limit = 5): Promise<DbProduct[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("products")
    .select("*, categories(id, name, slug, thumbnail_url, visibility, is_featured)")
    .order("created_at", { ascending: false })
    .limit(limit);

  if (error) {
    console.error("Failed to fetch recent products:", error.message);
    return [];
  }

  return (data as DbProduct[]) ?? [];
}

// ============================================================================
// MIGRATION AUDIT & VERIFICATION
// ============================================================================

export interface CategoryMigrationReport {
  totalProducts: number;
  migratedCount: number;
  unmigratedCount: number;
  isComplete: boolean;
  unmigratedProducts?: { id: number; name: string; category: string | null }[];
}

export async function verifyCategoryMigrationIntegrity(): Promise<CategoryMigrationReport> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("products")
    .select("id, name, category, category_id");

  if (error) {
    throw new Error(`Failed to verify category migration integrity: ${error.message}`);
  }

  const products = (data || []) as { id: number; name: string; category: string | null; category_id: string | null }[];
  const unmigrated = products.filter((p) => !p.category_id);

  return {
    totalProducts: products.length,
    migratedCount: products.length - unmigrated.length,
    unmigratedCount: unmigrated.length,
    isComplete: unmigrated.length === 0,
    unmigratedProducts: unmigrated.map((p) => ({ id: p.id, name: p.name, category: p.category })),
  };
}

