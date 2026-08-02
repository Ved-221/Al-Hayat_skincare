"use server";

/**
 * actions.ts — Admin Category Server Actions
 * ------------------------------------------
 * Every action:
 *   1. Calls requireAdmin() — throws/redirects if not authenticated.
 *   2. Validates input using Zod or checks requirements.
 *   3. Calls the adminCategoryService layer.
 *   4. Revalidates relevant paths (`/admin/categories`, `/products`, etc.).
 */

import { requireAdmin } from "@/lib/auth";
import {
  createCategory,
  updateCategory,
  deleteCategory,
  restoreCategory,
  toggleVisibility,
  toggleFeatured,
  reorderCategories,
  bulkUpdateCategories,
  transferProductsAndDeleteCategory,
  getCategoryStatistics,
} from "@/services/adminCategoryService";
import { CreateCategorySchema, UpdateCategorySchema, type CreateCategoryInput, type UpdateCategoryInput } from "@/types/category";
import { revalidatePath } from "next/cache";

export type CategoryActionResult =
  | { success: true; data?: unknown }
  | { success: false; error: string; errors?: Record<string, string[]> };

// ---------------------------------------------------------------------------
// CREATE CATEGORY
// ---------------------------------------------------------------------------

export async function createCategoryAction(
  input: CreateCategoryInput
): Promise<CategoryActionResult> {
  await requireAdmin();

  // Validate with Zod
  const validation = CreateCategorySchema.safeParse(input);
  if (!validation.success) {
    const fieldErrors = validation.error.flatten().fieldErrors;
    return {
      success: false,
      error: "Validation failed. Please check the form fields.",
      errors: fieldErrors as Record<string, string[]>,
    };
  }

  try {
    const category = await createCategory(validation.data);
    revalidatePath("/admin/categories");
    revalidatePath("/products");
    return { success: true, data: category };
  } catch (err: unknown) {
    return { success: false, error: err instanceof Error ? err.message : "Failed to create category" };
  }
}

// ---------------------------------------------------------------------------
// UPDATE CATEGORY
// ---------------------------------------------------------------------------

export async function updateCategoryAction(
  id: string,
  input: UpdateCategoryInput
): Promise<CategoryActionResult> {
  await requireAdmin();

  const validation = UpdateCategorySchema.safeParse(input);
  if (!validation.success) {
    const fieldErrors = validation.error.flatten().fieldErrors;
    return {
      success: false,
      error: "Validation failed. Please check the form fields.",
      errors: fieldErrors as Record<string, string[]>,
    };
  }

  try {
    const category = await updateCategory(id, validation.data);
    revalidatePath("/admin/categories");
    revalidatePath(`/admin/categories/${id}/edit`);
    revalidatePath("/products");
    if (category.slug) revalidatePath(`/products/${category.slug}`);
    return { success: true, data: category };
  } catch (err: unknown) {
    return { success: false, error: err instanceof Error ? err.message : "Failed to update category" };
  }
}

// ---------------------------------------------------------------------------
// DELETE / TRANSFER CATEGORY
// ---------------------------------------------------------------------------

export async function deleteCategoryAction(
  id: string,
  targetCategoryId?: string
): Promise<CategoryActionResult> {
  await requireAdmin();

  try {
    const stats = await getCategoryStatistics(id);

    if (stats.totalProducts > 0) {
      if (!targetCategoryId) {
        return {
          success: false,
          error: `Cannot delete category directly: it contains ${stats.totalProducts} product(s). Please transfer products first.`,
        };
      }
      if (targetCategoryId === id) {
        return {
          success: false,
          error: "Destination category cannot be the same as the category being deleted.",
        };
      }
      await transferProductsAndDeleteCategory(id, targetCategoryId);
    } else {
      await deleteCategory(id);
    }

    revalidatePath("/admin/categories");
    revalidatePath("/products");
    return { success: true };
  } catch (err: unknown) {
    return { success: false, error: err instanceof Error ? err.message : "Failed to delete category" };
  }
}

// ---------------------------------------------------------------------------
// RESTORE CATEGORY
// ---------------------------------------------------------------------------

export async function restoreCategoryAction(id: string): Promise<CategoryActionResult> {
  await requireAdmin();

  try {
    await restoreCategory(id);
    revalidatePath("/admin/categories");
    revalidatePath("/products");
    return { success: true };
  } catch (err: unknown) {
    return { success: false, error: err instanceof Error ? err.message : "Failed to restore category" };
  }
}

// ---------------------------------------------------------------------------
// TOGGLE VISIBILITY & FEATURED
// ---------------------------------------------------------------------------

export async function toggleVisibilityAction(id: string): Promise<CategoryActionResult> {
  await requireAdmin();

  try {
    const updated = await toggleVisibility(id);
    revalidatePath("/admin/categories");
    revalidatePath("/products");
    return { success: true, data: updated };
  } catch (err: unknown) {
    return { success: false, error: err instanceof Error ? err.message : "Failed to toggle visibility" };
  }
}

export async function toggleFeaturedAction(id: string): Promise<CategoryActionResult> {
  await requireAdmin();

  try {
    const updated = await toggleFeatured(id);
    revalidatePath("/admin/categories");
    return { success: true, data: updated };
  } catch (err: unknown) {
    return { success: false, error: err instanceof Error ? err.message : "Failed to toggle featured status" };
  }
}

// ---------------------------------------------------------------------------
// REORDER CATEGORIES
// ---------------------------------------------------------------------------

export async function reorderCategoriesAction(orderedIds: string[]): Promise<CategoryActionResult> {
  await requireAdmin();

  try {
    await reorderCategories(orderedIds);
    revalidatePath("/admin/categories");
    revalidatePath("/products");
    return { success: true };
  } catch (err: unknown) {
    return { success: false, error: err instanceof Error ? err.message : "Failed to reorder categories" };
  }
}

// ---------------------------------------------------------------------------
// BULK ACTIONS
// ---------------------------------------------------------------------------

export async function bulkActionCategoriesAction(
  ids: string[],
  action: "delete" | "restore" | "visible" | "hidden" | "feature" | "unfeature",
  targetCategoryId?: string
): Promise<CategoryActionResult> {
  await requireAdmin();

  try {
    await bulkUpdateCategories(ids, action, targetCategoryId);
    revalidatePath("/admin/categories");
    revalidatePath("/products");
    return { success: true };
  } catch (err: unknown) {
    return { success: false, error: err instanceof Error ? err.message : `Failed to execute bulk action (${action})` };
  }
}
