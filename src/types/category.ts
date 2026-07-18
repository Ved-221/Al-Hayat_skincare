import { z } from "zod";

// ============================================================================
// VISIBILITY MODEL
// ============================================================================

export const CATEGORY_VISIBILITY = {
  VISIBLE: "visible",
  HIDDEN: "hidden",
} as const;

export type CategoryVisibility =
  (typeof CATEGORY_VISIBILITY)[keyof typeof CATEGORY_VISIBILITY];

// ============================================================================
// CORE TYPES
// ============================================================================

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  thumbnail_url: string | null;
  banner_url: string | null;
  alt_text: string | null;
  visibility: CategoryVisibility;
  is_featured: boolean;
  sort_order: number;

  // SEO
  meta_title: string | null;
  meta_description: string | null;
  meta_keywords: string | null;

  // Timestamps
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface CategoryWithStats extends Category {
  totalProducts: number;
  visibleProducts: number;
  hiddenProducts: number;
  outOfStockProducts: number;
  lowStockProducts: number;

  newestProduct?: { id: number; name: string; slug: string; created_at: string } | null;
  latestUpdatedProduct?: { id: number; name: string; slug: string; updated_at: string } | null;

  // Future metrics — safe defaults provided by the service layer.
  // These will be wired to real queries when Orders-per-category analysis is built.
  totalRevenue: number;
  totalOrders: number;
  averageOrderValue: number;
}

/**
 * Lightweight shape for dropdowns and selects.
 */
export interface CategoryDropdownOption {
  id: string;
  name: string;
  slug: string;
  thumbnail_url?: string | null;
  visibility?: CategoryVisibility | string;
  is_featured?: boolean;
  sort_order?: number;
}

/**
 * Aggregated dashboard health metrics across all categories.
 */
export interface CategoryDashboardMetrics {
  totalCategories: number;
  visibleCategories: number;
  hiddenCategories: number;
  featuredCategories: number;
  emptyCategories: number;
  largestCategory: { id: string; name: string; slug: string; productCount: number } | null;
  newestCategory: { id: string; name: string; slug: string; created_at: string } | null;
}

// ============================================================================
// INPUT TYPES
// ============================================================================

export interface CreateCategoryInput {
  name: string;
  slug: string;
  description?: string | null;
  thumbnail_url?: string | null;
  banner_url?: string | null;
  alt_text?: string | null;
  visibility?: CategoryVisibility;
  is_featured?: boolean;
  sort_order?: number;
  meta_title?: string | null;
  meta_description?: string | null;
  meta_keywords?: string | null;
}

export interface UpdateCategoryInput {
  name?: string;
  slug?: string;
  description?: string | null;
  thumbnail_url?: string | null;
  banner_url?: string | null;
  alt_text?: string | null;
  visibility?: CategoryVisibility;
  is_featured?: boolean;
  sort_order?: number;
  meta_title?: string | null;
  meta_description?: string | null;
  meta_keywords?: string | null;
}

// ============================================================================
// ZOD VALIDATION SCHEMAS
// ============================================================================

export const CreateCategorySchema = z.object({
  name: z.string().min(1, "Category name is required").max(100),
  slug: z
    .string()
    .min(1, "Slug is required")
    .max(100)
    .regex(
      /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
      "Slug must be lowercase, alphanumeric with hyphens only"
    ),
  description: z.string().max(1000).optional().nullable(),
  thumbnail_url: z.string().url("Must be a valid URL").optional().nullable().or(z.literal("")),
  banner_url: z.string().url("Must be a valid URL").optional().nullable().or(z.literal("")),
  alt_text: z.string().max(200).optional().nullable(),
  visibility: z.enum(["visible", "hidden"]).default("visible"),
  is_featured: z.boolean().default(false),
  sort_order: z.number().int().min(0).default(0),
  meta_title: z.string().max(70).optional().nullable(),
  meta_description: z.string().max(160).optional().nullable(),
  meta_keywords: z.string().max(300).optional().nullable(),
});

export const UpdateCategorySchema = CreateCategorySchema.partial();
