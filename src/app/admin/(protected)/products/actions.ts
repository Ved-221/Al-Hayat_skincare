"use server";

/**
 * actions.ts — Admin Product Server Actions
 * -----------------------------------------
 * Every action:
 *   1. Calls requireAdmin() — throws/redirects if not authenticated.
 *   2. Parses FormData with Zod — returns field-level errors on failure.
 *   3. Calls the admin service layer.
 *   4. Revalidates /admin/products so the list is fresh in the same round-trip.
 *   5. Redirects on success.
 *
 * Return type: ActionResult — { success: true } | { success: false; errors: Record<string,string[]> }
 * This lets forms surface per-field validation messages without a full page reload.
 */

import { requireAdmin } from "@/lib/auth";
import {
  createProduct,
  updateProduct,
  deleteProduct,
  type ProductPayload,
} from "@/services/adminProductService";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

// ---------------------------------------------------------------------------
// Shared types
// ---------------------------------------------------------------------------

export type ActionResult =
  | { success: true }
  | { success: false; errors: Record<string, string[]> };

// ---------------------------------------------------------------------------
// Zod schema
// ---------------------------------------------------------------------------

/** Comma-separated string → string[] */
const csvToArray = z
  .string()
  .transform((v) =>
    v
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean)
  );

/**
 * JSON string → validated array.
 * Returns unknown[] — caller casts to the concrete type via `as`.
 */
function jsonArrayField(itemSchema: z.ZodTypeAny) {
  return z.string().transform((v, ctx): unknown[] => {
    let parsed: unknown;
    try {
      parsed = JSON.parse(v);
    } catch {
      ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Invalid JSON" });
      return [];
    }
    if (!Array.isArray(parsed)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Expected a JSON array",
      });
      return [];
    }
    return parsed.map((item, i) => {
      const result = itemSchema.safeParse(item);
      if (!result.success) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: `Item ${i}: ${result.error.issues.map((e) => e.message).join(", ")}`,
        });
        return null;
      }
      return result.data;
    });
  });
}

const DetailedIngredientSchema = z.object({
  name: z.string().min(1),
  desc: z.string().min(1),
});

const DetailedBenefitSchema = z.object({
  icon: z.string().min(1),
  title: z.string().min(1),
  sub: z.string().min(1),
});

const RitualSchema = z.object({
  icon: z.string().min(1),
  step: z.string().min(1),
  desc: z.string().min(1),
});

const ProductSchema = z.object({
  name: z.string().min(1, "Name is required"),
  slug: z
    .string()
    .min(1, "Slug is required")
    .regex(
      /^[a-z0-9-]+$/,
      "Slug must be lowercase letters, numbers, and hyphens only"
    ),
  category_id: z.string().min(1, "Please select a category"),
  category: z.string().optional().nullable(),
  desc: z.string().min(1, "Description is required"),
  price: z.string().min(1, "Price is required"),
  price_original: z.string().min(1, "Original price is required"),
  discount: z.string().default(""),
  badge: z.string().optional().nullable(),
  benefit: z.string().min(1, "Benefit is required"),
  img: z.string().min(1, "Image path is required"),
  suitable_for: z.string().min(1, "Suitable for is required"),
  tagline: z.string().min(1, "Tagline is required"),
  featured: z
    .string()
    .optional()
    .transform((v) => v === "on" || v === "true"),
  stock_status: z
    .enum(["in_stock", "out_of_stock", "low_stock"])
    .default("in_stock"),
  ingredients: csvToArray,
  detailed_ingredients: jsonArrayField(DetailedIngredientSchema),
  detailed_benefits: jsonArrayField(DetailedBenefitSchema),
  ritual: jsonArrayField(RitualSchema),
});

type ParsedProduct = z.infer<typeof ProductSchema>;

// ---------------------------------------------------------------------------
// Helper: build ProductPayload from parsed Zod data
// (casts unknown[] arrays to their concrete types)
// ---------------------------------------------------------------------------

function buildPayload(data: ParsedProduct): ProductPayload {
  return {
    name: data.name,
    slug: data.slug,
    category_id: data.category_id,
    category: data.category ?? null,
    desc: data.desc,
    price: data.price,
    price_original: data.price_original,
    discount: data.discount,
    badge: data.badge ?? null,
    ingredients: data.ingredients,
    benefit: data.benefit,
    img: data.img,
    suitable_for: data.suitable_for,
    tagline: data.tagline,
    detailed_ingredients: data.detailed_ingredients as ProductPayload["detailed_ingredients"],
    detailed_benefits: data.detailed_benefits as ProductPayload["detailed_benefits"],
    ritual: data.ritual as ProductPayload["ritual"],
    featured: data.featured,
    stock_status: data.stock_status,
  };
}

// ---------------------------------------------------------------------------
// Helper: parse FormData → validated data or ActionResult error
// ---------------------------------------------------------------------------

function parseProduct(
  formData: FormData
):
  | { success: true; data: ParsedProduct }
  | { success: false; errors: Record<string, string[]> } {
  const raw = Object.fromEntries(formData.entries());
  const result = ProductSchema.safeParse(raw);

  if (!result.success) {
    const errors: Record<string, string[]> = {};
    for (const [field, messages] of Object.entries(
      result.error.flatten().fieldErrors
    )) {
      errors[field] = messages as string[];
    }
    return { success: false, errors };
  }

  return { success: true, data: result.data };
}

// ---------------------------------------------------------------------------
// CREATE
// ---------------------------------------------------------------------------

export async function createProductAction(
  _prevState: ActionResult | null,
  formData: FormData
): Promise<ActionResult> {
  await requireAdmin();

  const parsed = parseProduct(formData);
  if (!parsed.success) return parsed;

  try {
    await createProduct(buildPayload(parsed.data));
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return { success: false, errors: { _form: [message] } };
  }

  revalidatePath("/admin/products");
  redirect("/admin/products");
}

// ---------------------------------------------------------------------------
// UPDATE
// ---------------------------------------------------------------------------

export async function updateProductAction(
  id: number,
  _prevState: ActionResult | null,
  formData: FormData
): Promise<ActionResult> {
  await requireAdmin();

  const parsed = parseProduct(formData);
  if (!parsed.success) return parsed;

  try {
    await updateProduct(id, buildPayload(parsed.data));
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return { success: false, errors: { _form: [message] } };
  }

  revalidatePath("/admin/products");
  redirect("/admin/products");
}

// ---------------------------------------------------------------------------
// DELETE
// ---------------------------------------------------------------------------

export async function deleteProductAction(id: number): Promise<ActionResult> {
  await requireAdmin();

  try {
    await deleteProduct(id);
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return { success: false, errors: { _form: [message] } };
  }

  revalidatePath("/admin/products");
  return { success: true };
}
