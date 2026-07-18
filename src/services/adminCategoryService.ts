/**
 * adminCategoryService.ts
 * -----------------------
 * Server-only service layer for Categories CRUD, visibility management,
 * reordering, statistics, and dropdown helpers.
 *
 * All queries enforce soft-delete filtering (deleted_at IS NULL) unless
 * explicitly noted. Uses the SSR Supabase client.
 *
 * Do NOT import this from client components.
 */

import { createClient } from "@/lib/supabase-server";
import type {
  Category,
  CategoryWithStats,
  CategoryDropdownOption,
  CategoryDashboardMetrics,
  CreateCategoryInput,
  UpdateCategoryInput,
  CategoryVisibility,
} from "@/types/category";
import { CATEGORY_VISIBILITY } from "@/types/category";

// ============================================================================
// READ
// ============================================================================

/**
 * Fetches all non-deleted categories sorted by sort_order then name.
 */
export async function getCategories(): Promise<Category[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("categories")
    .select("*")
    .is("deleted_at", null)
    .order("sort_order", { ascending: true })
    .order("name", { ascending: true });

  if (error) {
    throw new Error(`Failed to fetch categories: ${error.message}`);
  }

  return (data as Category[]) ?? [];
}

/**
 * Fetches only visible, non-deleted categories.
 */
export async function getVisibleCategories(): Promise<Category[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("categories")
    .select("*")
    .eq("visibility", CATEGORY_VISIBILITY.VISIBLE)
    .is("deleted_at", null)
    .order("sort_order", { ascending: true })
    .order("name", { ascending: true });

  if (error) {
    throw new Error(`Failed to fetch visible categories: ${error.message}`);
  }

  return (data as Category[]) ?? [];
}

/**
 * Fetches only hidden, non-deleted categories.
 */
export async function getHiddenCategories(): Promise<Category[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("categories")
    .select("*")
    .eq("visibility", CATEGORY_VISIBILITY.HIDDEN)
    .is("deleted_at", null)
    .order("sort_order", { ascending: true })
    .order("name", { ascending: true });

  if (error) {
    throw new Error(`Failed to fetch hidden categories: ${error.message}`);
  }

  return (data as Category[]) ?? [];
}

/**
 * Fetches a single category by UUID.
 */
export async function getCategoryById(id: string): Promise<Category> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("categories")
    .select("*")
    .eq("id", id)
    .is("deleted_at", null)
    .single();

  if (error || !data) {
    throw new Error(`Category not found (id: ${id})`);
  }

  return data as Category;
}

/**
 * Fetches a single category by slug.
 */
export async function getCategoryBySlug(slug: string): Promise<Category> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("categories")
    .select("*")
    .eq("slug", slug)
    .is("deleted_at", null)
    .single();

  if (error || !data) {
    throw new Error(`Category not found (slug: ${slug})`);
  }

  return data as Category;
}

/**
 * Fetches featured, visible, non-deleted categories.
 */
export async function getFeaturedCategories(): Promise<Category[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("categories")
    .select("*")
    .eq("is_featured", true)
    .eq("visibility", CATEGORY_VISIBILITY.VISIBLE)
    .is("deleted_at", null)
    .order("sort_order", { ascending: true });

  if (error) {
    throw new Error(`Failed to fetch featured categories: ${error.message}`);
  }

  return (data as Category[]) ?? [];
}

/**
 * Lightweight list for dropdowns and product forms.
 * Returns only visible, non-deleted categories sorted by sort_order then name.
 */
export async function getCategoriesForDropdown(): Promise<CategoryDropdownOption[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("categories")
    .select("id, name, slug, thumbnail_url, visibility, is_featured, sort_order")
    .eq("visibility", CATEGORY_VISIBILITY.VISIBLE)
    .is("deleted_at", null)
    .order("sort_order", { ascending: true })
    .order("name", { ascending: true });

  if (error) {
    throw new Error(`Failed to fetch categories for dropdown: ${error.message}`);
  }

  return (data as CategoryDropdownOption[]) ?? [];
}

// ============================================================================
// CREATE
// ============================================================================

/**
 * Creates a new category. Throws on duplicate slug.
 */
export async function createCategory(input: CreateCategoryInput): Promise<Category> {
  const supabase = await createClient();

  // Check slug uniqueness (including soft-deleted to prevent conflicts on restore)
  const { data: existing } = await supabase
    .from("categories")
    .select("id")
    .eq("slug", input.slug)
    .maybeSingle();

  if (existing) {
    throw new Error(`A category with slug "${input.slug}" already exists.`);
  }

  const { data, error } = await supabase
    .from("categories")
    .insert({
      name: input.name,
      slug: input.slug,
      description: input.description ?? null,
      thumbnail_url: input.thumbnail_url || null,
      banner_url: input.banner_url || null,
      alt_text: input.alt_text ?? null,
      visibility: input.visibility ?? CATEGORY_VISIBILITY.VISIBLE,
      is_featured: input.is_featured ?? false,
      sort_order: input.sort_order ?? 0,
      meta_title: input.meta_title ?? null,
      meta_description: input.meta_description ?? null,
      meta_keywords: input.meta_keywords ?? null,
    })
    .select()
    .single();

  if (error || !data) {
    throw new Error(`Failed to create category: ${error?.message ?? "Unknown error"}`);
  }

  return data as Category;
}

// ============================================================================
// UPDATE
// ============================================================================

/**
 * Partially updates a category. Guards against duplicate slugs.
 */
export async function updateCategory(
  id: string,
  input: UpdateCategoryInput
): Promise<Category> {
  const supabase = await createClient();

  // Guard: check slug uniqueness if slug is being changed
  if (input.slug) {
    const { data: existing } = await supabase
      .from("categories")
      .select("id")
      .eq("slug", input.slug)
      .neq("id", id)
      .maybeSingle();

    if (existing) {
      throw new Error(`A category with slug "${input.slug}" already exists.`);
    }
  }

  // Clean empty string URLs to null
  const payload: Record<string, unknown> = {
    ...input,
    updated_at: new Date().toISOString(),
  };
  if (payload.thumbnail_url === "") payload.thumbnail_url = null;
  if (payload.banner_url === "") payload.banner_url = null;

  const { data, error } = await supabase
    .from("categories")
    .update(payload)
    .eq("id", id)
    .is("deleted_at", null)
    .select()
    .single();

  if (error || !data) {
    throw new Error(
      `Failed to update category (id: ${id}): ${error?.message ?? "Not found"}`
    );
  }

  return data as Category;
}

// ============================================================================
// DELETE & RESTORE
// ============================================================================

/**
 * Soft-deletes a category by setting deleted_at.
 */
export async function deleteCategory(id: string): Promise<void> {
  const supabase = await createClient();

  const { error } = await supabase
    .from("categories")
    .update({
      deleted_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    })
    .eq("id", id)
    .is("deleted_at", null);

  if (error) {
    throw new Error(`Failed to delete category (id: ${id}): ${error.message}`);
  }
}

/**
 * Restores a soft-deleted category by clearing deleted_at.
 */
export async function restoreCategory(id: string): Promise<Category> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("categories")
    .update({
      deleted_at: null,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id)
    .not("deleted_at", "is", null)
    .select()
    .single();

  if (error || !data) {
    throw new Error(
      `Failed to restore category (id: ${id}): ${error?.message ?? "Not found or not deleted"}`
    );
  }

  return data as Category;
}

// ============================================================================
// VISIBILITY & ORDERING
// ============================================================================

/**
 * Toggles visibility between 'visible' and 'hidden'.
 */
export async function toggleVisibility(id: string): Promise<Category> {
  const supabase = await createClient();

  // Fetch current
  const current = await getCategoryById(id);
  const newVisibility: CategoryVisibility =
    current.visibility === CATEGORY_VISIBILITY.VISIBLE
      ? CATEGORY_VISIBILITY.HIDDEN
      : CATEGORY_VISIBILITY.VISIBLE;

  const { data, error } = await supabase
    .from("categories")
    .update({
      visibility: newVisibility,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id)
    .is("deleted_at", null)
    .select()
    .single();

  if (error || !data) {
    throw new Error(
      `Failed to toggle category visibility (id: ${id}): ${error?.message ?? "Not found"}`
    );
  }

  return data as Category;
}

/**
 * Atomically batch-updates sort_order for an array of category IDs.
 * Uses the `reorder_categories` RPC function to execute all updates in a
 * single database transaction, preventing inconsistent sort_order values
 * if an update fails midway.
 */
export async function reorderCategories(orderedIds: string[]): Promise<void> {
  const supabase = await createClient();

  const items = orderedIds.map((id, index) => ({
    id,
    sort_order: (index + 1) * 10,
  }));

  const { error } = await supabase.rpc("reorder_categories", {
    items: JSON.stringify(items),
  });

  if (error) {
    throw new Error(`Failed to reorder categories: ${error.message}`);
  }
}

// ============================================================================
// STATISTICS
// ============================================================================

/**
 * Computes product statistics for a given category.
 * Returns counts and placeholders for future metrics (revenue, orders, AOV).
 * The return shape is stable — new metrics are added as fields with default
 * values so callers never break.
 */
export async function getCategoryStatistics(
  categoryId: string
): Promise<CategoryWithStats> {
  const supabase = await createClient();

  // Fetch the category itself
  const category = await getCategoryById(categoryId);

  // Run product count and activity queries concurrently
  const [
    { count: totalProducts, error: totalErr },
    { count: outOfStockProducts, error: oosErr },
    { count: lowStockProducts, error: lsErr },
    { data: newestData, error: newestErr },
    { data: latestUpdateData, error: latestErr },
  ] = await Promise.all([
    supabase
      .from("products")
      .select("id", { count: "exact", head: true })
      .eq("category_id", categoryId),
    supabase
      .from("products")
      .select("id", { count: "exact", head: true })
      .eq("category_id", categoryId)
      .eq("stock_status", "out_of_stock"),
    supabase
      .from("products")
      .select("id", { count: "exact", head: true })
      .eq("category_id", categoryId)
      .eq("stock_status", "low_stock"),
    supabase
      .from("products")
      .select("id, name, slug, created_at")
      .eq("category_id", categoryId)
      .order("created_at", { ascending: false })
      .limit(1),
    supabase
      .from("products")
      .select("id, name, slug, updated_at")
      .eq("category_id", categoryId)
      .order("updated_at", { ascending: false })
      .limit(1),
  ]);

  if (totalErr) console.error("Error counting total products:", totalErr.message);
  if (oosErr) console.error("Error counting OOS products:", oosErr.message);
  if (lsErr) console.error("Error counting low stock products:", lsErr.message);
  if (newestErr) console.error("Error fetching newest product:", newestErr.message);
  if (latestErr) console.error("Error fetching latest updated product:", latestErr.message);

  const total = totalProducts ?? 0;
  const oos = outOfStockProducts ?? 0;
  const ls = lowStockProducts ?? 0;

  return {
    ...category,
    totalProducts: total,
    visibleProducts: total - oos,
    hiddenProducts: oos,
    outOfStockProducts: oos,
    lowStockProducts: ls,
    newestProduct: newestData?.[0] || null,
    latestUpdatedProduct: latestUpdateData?.[0] || null,
    // Future metrics — safe defaults, wired when Orders-per-category queries exist
    totalRevenue: 0,
    totalOrders: 0,
    averageOrderValue: 0,
  };
}

/**
 * Computes system-wide category health metrics safely using concurrent queries.
 */
export async function getCategoryDashboardMetrics(): Promise<CategoryDashboardMetrics> {
  const supabase = await createClient();

  const [
    { count: totalCategories },
    { count: visibleCategories },
    { count: hiddenCategories },
    { count: featuredCategories },
    { data: allCategories },
    { data: allProducts },
  ] = await Promise.all([
    supabase.from("categories").select("id", { count: "exact", head: true }).is("deleted_at", null),
    supabase.from("categories").select("id", { count: "exact", head: true }).is("deleted_at", null).eq("visibility", CATEGORY_VISIBILITY.VISIBLE),
    supabase.from("categories").select("id", { count: "exact", head: true }).is("deleted_at", null).eq("visibility", CATEGORY_VISIBILITY.HIDDEN),
    supabase.from("categories").select("id", { count: "exact", head: true }).is("deleted_at", null).eq("is_featured", true),
    supabase.from("categories").select("id, name, slug, created_at").is("deleted_at", null).order("created_at", { ascending: false }),
    supabase.from("products").select("category_id"),
  ]);

  const categoriesList = allCategories ?? [];
  const productsList = allProducts ?? [];

  // Count products per category_id
  const countByCatId: Record<string, number> = {};
  for (const p of productsList) {
    if (p.category_id) {
      countByCatId[p.category_id] = (countByCatId[p.category_id] || 0) + 1;
    }
  }

  let emptyCount = 0;
  let largestCat: { id: string; name: string; slug: string; productCount: number } | null = null;
  let maxCount = -1;

  for (const cat of categoriesList) {
    const cCount = countByCatId[cat.id] || 0;
    if (cCount === 0) emptyCount++;
    if (cCount > maxCount) {
      maxCount = cCount;
      largestCat = { id: cat.id, name: cat.name, slug: cat.slug, productCount: cCount };
    }
  }

  const newestCat = categoriesList.length > 0
    ? { id: categoriesList[0].id, name: categoriesList[0].name, slug: categoriesList[0].slug, created_at: categoriesList[0].created_at }
    : null;

  return {
    totalCategories: totalCategories ?? 0,
    visibleCategories: visibleCategories ?? 0,
    hiddenCategories: hiddenCategories ?? 0,
    featuredCategories: featuredCategories ?? 0,
    emptyCategories: emptyCount,
    largestCategory: largestCat,
    newestCategory: newestCat,
  };
}

// ============================================================================
// PAGINATED SEARCH & FILTER
// ============================================================================

export interface GetCategoriesPagedParams {
  search?: string;
  visibility?: string; // 'All' | 'visible' | 'hidden'
  featured?: string; // 'All' | 'Featured' | 'Not Featured' | 'true' | 'false'
  deleted?: string; // 'Active' | 'Deleted' | 'All'
  sort?: string; // 'sort_order' | 'newest' | 'oldest' | 'name_asc' | 'name_desc' | 'featured_first'
  page?: number;
  limit?: number;
}

export async function getCategoriesPaged(
  params: GetCategoriesPagedParams
): Promise<{ categories: CategoryWithStats[]; totalCount: number }> {
  const supabase = await createClient();
  const page = params.page && params.page > 0 ? params.page : 1;
  const limit = params.limit && params.limit > 0 ? params.limit : 10;
  const from = (page - 1) * limit;
  const to = from + limit - 1;

  let query = supabase.from("categories").select("*", { count: "exact" });

  // 1. Soft-delete filter
  if (params.deleted === "Deleted") {
    query = query.not("deleted_at", "is", null);
  } else if (params.deleted === "All") {
    // No deleted_at filter
  } else {
    query = query.is("deleted_at", null);
  }

  // 2. Search (Name, Slug, Description)
  if (params.search && params.search.trim()) {
    const s = params.search.trim();
    query = query.or(`name.ilike.%${s}%,slug.ilike.%${s}%,description.ilike.%${s}%`);
  }

  // 3. Visibility filter
  if (params.visibility && params.visibility !== "All") {
    query = query.eq("visibility", params.visibility);
  }

  // 4. Featured filter
  if (params.featured === "Featured" || params.featured === "true") {
    query = query.eq("is_featured", true);
  } else if (params.featured === "Not Featured" || params.featured === "false") {
    query = query.eq("is_featured", false);
  }

  // 5. Sorting
  switch (params.sort) {
    case "newest":
      query = query.order("created_at", { ascending: false });
      break;
    case "oldest":
      query = query.order("created_at", { ascending: true });
      break;
    case "name_asc":
      query = query.order("name", { ascending: true });
      break;
    case "name_desc":
      query = query.order("name", { ascending: false });
      break;
    case "featured_first":
      query = query.order("is_featured", { ascending: false }).order("sort_order", { ascending: true });
      break;
    case "sort_order":
    default:
      query = query.order("sort_order", { ascending: true }).order("name", { ascending: true });
      break;
  }

  // 6. Pagination
  query = query.range(from, to);

  const { data, error, count } = await query;
  if (error) {
    throw new Error(`Failed to fetch paged categories: ${error.message}`);
  }

  const categories = (data as Category[]) ?? [];
  const totalCount = count ?? 0;

  if (categories.length === 0) {
    return { categories: [], totalCount };
  }

  // Batch query product counts for these categories
  const categoryIds = categories.map((c) => c.id);
  const { data: prodData } = await supabase
    .from("products")
    .select("category_id, stock_status")
    .in("category_id", categoryIds);

  const statsMap = new Map<
    string,
    { total: number; oos: number; ls: number }
  >();

  for (const id of categoryIds) {
    statsMap.set(id, { total: 0, oos: 0, ls: 0 });
  }

  if (prodData) {
    for (const p of prodData) {
      if (!p.category_id) continue;
      const s = statsMap.get(p.category_id);
      if (s) {
        s.total += 1;
        if (p.stock_status === "out_of_stock") s.oos += 1;
        else if (p.stock_status === "low_stock") s.ls += 1;
      }
    }
  }

  const categoriesWithStats: CategoryWithStats[] = categories.map((cat) => {
    const s = statsMap.get(cat.id) ?? { total: 0, oos: 0, ls: 0 };
    return {
      ...cat,
      totalProducts: s.total,
      visibleProducts: s.total - s.oos,
      hiddenProducts: s.oos,
      outOfStockProducts: s.oos,
      lowStockProducts: s.ls,
      totalRevenue: 0,
      totalOrders: 0,
      averageOrderValue: 0,
    };
  });

  return { categories: categoriesWithStats, totalCount };
}

// ============================================================================
// TOGGLE FEATURED
// ============================================================================

export async function toggleFeatured(id: string): Promise<Category> {
  const supabase = await createClient();

  const current = await getCategoryById(id);
  const newFeatured = !current.is_featured;

  const { data, error } = await supabase
    .from("categories")
    .update({
      is_featured: newFeatured,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id)
    .is("deleted_at", null)
    .select()
    .single();

  if (error || !data) {
    throw new Error(
      `Failed to toggle category featured state (id: ${id}): ${error?.message ?? "Not found"}`
    );
  }

  return data as Category;
}

// ============================================================================
// SAFE DELETE WITH PRODUCT TRANSFER
// ============================================================================

export async function transferProductsAndDeleteCategory(
  sourceId: string,
  targetId: string
): Promise<void> {
  const supabase = await createClient();

  const { error } = await supabase.rpc("transfer_products_and_delete_category", {
    p_source_id: sourceId,
    p_target_id: targetId,
  });

  if (error) {
    throw new Error(`Failed to transfer products and delete category: ${error.message}`);
  }
}

// ============================================================================
// BULK OPERATIONS
// ============================================================================

export async function bulkUpdateCategories(
  ids: string[],
  action: "delete" | "restore" | "visible" | "hidden" | "feature" | "unfeature",
  targetCategoryId?: string
): Promise<void> {
  const supabase = await createClient();
  if (ids.length === 0) return;

  if (action === "delete") {
    for (const id of ids) {
      if (targetCategoryId) {
        if (id !== targetCategoryId) {
          await transferProductsAndDeleteCategory(id, targetCategoryId);
        }
      } else {
        await deleteCategory(id);
      }
    }
    return;
  }

  if (action === "restore") {
    for (const id of ids) {
      await restoreCategory(id);
    }
    return;
  }

  const payload: Record<string, unknown> = {
    updated_at: new Date().toISOString(),
  };

  if (action === "visible") payload.visibility = CATEGORY_VISIBILITY.VISIBLE;
  else if (action === "hidden") payload.visibility = CATEGORY_VISIBILITY.HIDDEN;
  else if (action === "feature") payload.is_featured = true;
  else if (action === "unfeature") payload.is_featured = false;

  const { error } = await supabase
    .from("categories")
    .update(payload)
    .in("id", ids)
    .is("deleted_at", null);

  if (error) {
    throw new Error(`Failed bulk operation (${action}): ${error.message}`);
  }
}
