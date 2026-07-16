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
  category: string;
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
  "id" | "created_at" | "updated_at"
>;

// ---------------------------------------------------------------------------
// Read helpers
// ---------------------------------------------------------------------------

export async function getAdminProducts(): Promise<DbProduct[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .order("id", { ascending: true });

  if (error) throw new Error(`Failed to fetch products: ${error.message}`);
  return (data as DbProduct[]) ?? [];
}

export async function getAdminProductById(id: number): Promise<DbProduct> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("products")
    .select("*")
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
    .select()
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
    .select()
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
