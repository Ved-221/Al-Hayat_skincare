"use client";

/**
 * ProductForm.tsx
 * ---------------
 * Shared Client Component for Add / Edit product forms.
 * Wired to either createProductAction or updateProductAction via `useActionState`.
 *
 * Props:
 *   - action: the bound Server Action
 *   - defaultValues?: pre-filled values when editing
 */

import React, { useActionState, useState, useEffect } from "react";
import Link from "next/link";
import type { ActionResult } from "./actions";
import type { DbProduct } from "@/services/adminProductService";
import type { CategoryDropdownOption } from "@/types/category";
import CategorySelector from "@/components/admin/categories/CategorySelector";
import CategoryPreview from "@/components/admin/categories/CategoryPreview";
import ImageUploader from "@/components/admin/ImageUploader";
import IngredientBuilder from "@/components/admin/products/builders/IngredientBuilder";
import DetailedBenefitBuilder from "@/components/admin/products/builders/DetailedBenefitBuilder";
import RitualBuilder from "@/components/admin/products/builders/RitualBuilder";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

type Props = {
  /** A Server Action already bound to its id if editing */
  action: (
    prevState: ActionResult | null,
    formData: FormData
  ) => Promise<ActionResult>;
  defaultValues?: Partial<DbProduct>;
  categories?: CategoryDropdownOption[];
  submitLabel?: string;
};

// ---------------------------------------------------------------------------
// Small helper: show per-field error
// ---------------------------------------------------------------------------

function FieldError({ errors, field }: { errors?: Record<string, string[]>; field: string }) {
  const msgs = errors?.[field];
  if (!msgs?.length) return null;
  return (
    <p className="mt-1 text-xs text-red-600">{msgs.join(", ")}</p>
  );
}

// ---------------------------------------------------------------------------
// Label + Input wrapper
// ---------------------------------------------------------------------------

function Field({
  label,
  name,
  type = "text",
  placeholder,
  required,
  defaultValue,
  errors,
  hint,
}: {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
  defaultValue?: string;
  errors?: Record<string, string[]>;
  hint?: string;
}) {
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={name} className="text-sm font-medium text-gray-700">
        {label}
        {required && <span className="ml-0.5 text-red-500">*</span>}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        required={required}
        defaultValue={defaultValue ?? ""}
        className="rounded border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900"
      />
      {hint && <p className="text-xs text-gray-400">{hint}</p>}
      <FieldError errors={errors} field={name} />
    </div>
  );
}

// ---------------------------------------------------------------------------
// Textarea wrapper
// ---------------------------------------------------------------------------

function TextareaField({
  label,
  name,
  rows = 3,
  placeholder,
  required,
  defaultValue,
  errors,
  hint,
}: {
  label: string;
  name: string;
  rows?: number;
  placeholder?: string;
  required?: boolean;
  defaultValue?: string;
  errors?: Record<string, string[]>;
  hint?: string;
}) {
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={name} className="text-sm font-medium text-gray-700">
        {label}
        {required && <span className="ml-0.5 text-red-500">*</span>}
      </label>
      <textarea
        id={name}
        name={name}
        rows={rows}
        placeholder={placeholder}
        required={required}
        defaultValue={defaultValue ?? ""}
        className="rounded border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900"
      />
      {hint && <p className="text-xs text-gray-400">{hint}</p>}
      <FieldError errors={errors} field={name} />
    </div>
  );
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function ProductForm({
  action,
  defaultValues,
  categories = [],
  submitLabel = "Save Product",
}: Props) {
  const [state, formAction, isPending] = useActionState(action, null);

  const errors = state?.success === false ? state.errors : undefined;

  const [selectedCategory, setSelectedCategory] = useState<CategoryDropdownOption | null>(() => {
    if (!categories.length) return null;
    if (defaultValues?.category_id) {
      return categories.find((c) => c.id === defaultValues.category_id) || null;
    }
    return null;
  });

  const [isDirty, setIsDirty] = useState(false);

  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (isDirty) {
        e.preventDefault();
        e.returnValue = "";
      }
    };
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [isDirty]);

  const ingredients = (defaultValues?.ingredients ?? []).join(", ");

  return (
    <form action={formAction} onChangeCapture={() => setIsDirty(true)} className="space-y-6 pb-24">
      {/* Global form error */}
      {errors?._form && (
        <div className="rounded border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-700">
          {errors._form.join(". ")}
        </div>
      )}

      {/* ── Basic Info ─────────────────────────────────────────── */}
      <section className="rounded-lg border bg-white p-6">
        <h2 className="mb-4 text-base font-semibold text-gray-900">Basic Info</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Field
            label="Name"
            name="name"
            required
            placeholder="Herbal Hair Oil"
            defaultValue={defaultValues?.name}
            errors={errors}
          />
          <Field
            label="Slug"
            name="slug"
            required
            placeholder="herbal-hair-oil"
            defaultValue={defaultValues?.slug}
            errors={errors}
            hint="Lowercase letters, numbers, hyphens only. Used in product URLs."
          />
          <div className="sm:col-span-2">
            <CategorySelector
              categories={categories}
              defaultValue={defaultValues?.category_id}
              required
              errors={errors}
              onChange={(selectedId, cat) => setSelectedCategory(cat)}
            />
            <CategoryPreview
              category={selectedCategory}
              fallbackName={defaultValues?.category}
            />
          </div>
          <Field
            label="Badge"
            name="badge"
            placeholder="BEST SELLER"
            defaultValue={defaultValues?.badge ?? ""}
            errors={errors}
            hint="Optional. Short label shown on the product card."
          />
        </div>
        <div className="mt-4">
          <TextareaField
            label="Description"
            name="desc"
            required
            placeholder="One-line product description…"
            defaultValue={defaultValues?.desc}
            errors={errors}
          />
        </div>
        <div className="mt-4">
          <Field
            label="Tagline"
            name="tagline"
            required
            placeholder="Formulated by Dr. Farheen for…"
            defaultValue={defaultValues?.tagline}
            errors={errors}
          />
        </div>
        <div className="mt-4">
          <Field
            label="Suitable For"
            name="suitable_for"
            required
            placeholder="All hair types"
            defaultValue={defaultValues?.suitable_for}
            errors={errors}
          />
        </div>
        <div className="mt-4">
          <Field
            label="Benefit (short)"
            name="benefit"
            required
            placeholder="Nourishes scalp & hair"
            defaultValue={defaultValues?.benefit}
            errors={errors}
          />
        </div>
      </section>

      {/* ── Pricing ────────────────────────────────────────────── */}
      <section className="rounded-lg border bg-white p-6">
        <h2 className="mb-4 text-base font-semibold text-gray-900">Pricing</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <Field
            label="Price"
            name="price"
            required
            placeholder="₹499"
            defaultValue={defaultValues?.price}
            errors={errors}
          />
          <Field
            label="Original Price"
            name="price_original"
            required
            placeholder="₹999"
            defaultValue={defaultValues?.price_original}
            errors={errors}
          />
          <Field
            label="Discount Label"
            name="discount"
            placeholder="50% OFF"
            defaultValue={defaultValues?.discount}
            errors={errors}
          />
        </div>
      </section>

      {/* ── Image ──────────────────────────────────────────────── */}
      <section className="rounded-lg border bg-white p-6">
        <h2 className="mb-4 text-base font-semibold text-gray-900">Product Image</h2>
        <ImageUploader
          name="img"
          label="Product Image"
          required
          defaultValue={defaultValues?.img}
          folder="products"
          hint="Drag & drop or select an image file (PNG, JPG, WEBP). This image appears on product cards and details page."
        />
        <FieldError errors={errors} field="img" />
      </section>

      {/* ── Inventory ──────────────────────────────────────────── */}
      <section className="rounded-lg border bg-white p-6">
        <h2 className="mb-4 text-base font-semibold text-gray-900">Inventory</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="flex flex-col gap-1">
            <label htmlFor="stock_status" className="text-sm font-medium text-gray-700">
              Stock Status
            </label>
            <select
              id="stock_status"
              name="stock_status"
              defaultValue={defaultValues?.stock_status ?? "in_stock"}
              className="rounded border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900"
            >
              <option value="in_stock">In Stock</option>
              <option value="low_stock">Low Stock</option>
              <option value="out_of_stock">Out of Stock</option>
            </select>
            <FieldError errors={errors} field="stock_status" />
          </div>

          <div className="flex items-end gap-2 pb-0.5">
            <input
              id="featured"
              name="featured"
              type="checkbox"
              defaultChecked={defaultValues?.featured ?? false}
              className="h-4 w-4 rounded border-gray-300 text-gray-900"
            />
            <label htmlFor="featured" className="text-sm font-medium text-gray-700">
              Featured product
            </label>
          </div>
        </div>
      </section>

      {/* ── Ingredients ────────────────────────────────────────── */}
      <section className="rounded-lg border bg-white p-6">
        <h2 className="mb-4 text-base font-semibold text-gray-900">Ingredients</h2>

        <Field
          label="Ingredients (comma-separated)"
          name="ingredients"
          required
          placeholder="Amla, Coconut, Hibiscus"
          defaultValue={ingredients}
          errors={errors}
          hint="Used for the short ingredient tag list on product cards."
        />

        <div className="mt-6">
          <IngredientBuilder defaultValue={defaultValues?.detailed_ingredients as React.ComponentProps<typeof IngredientBuilder>['defaultValue']} />
          <FieldError errors={errors} field="detailed_ingredients" />
        </div>
      </section>

      {/* ── Benefits ───────────────────────────────────────────── */}
      <section className="rounded-lg border bg-white p-6">
        <h2 className="mb-4 text-base font-semibold text-gray-900">Detailed Benefits</h2>
        <DetailedBenefitBuilder defaultValue={defaultValues?.detailed_benefits as React.ComponentProps<typeof DetailedBenefitBuilder>['defaultValue']} />
        <FieldError errors={errors} field="detailed_benefits" />
      </section>

      {/* ── Ritual ─────────────────────────────────────────────── */}
      <section className="rounded-lg border bg-white p-6">
        <h2 className="mb-4 text-base font-semibold text-gray-900">Usage Ritual</h2>
        <RitualBuilder defaultValue={defaultValues?.ritual as React.ComponentProps<typeof RitualBuilder>['defaultValue']} />
        <FieldError errors={errors} field="ritual" />
      </section>

      {/* ── Sticky Bottom Save Bar ─────────────────────────────── */}
      <div className="sticky bottom-0 z-20 flex flex-col sm:flex-row items-center justify-between gap-4 rounded-xl border border-gray-200 bg-white/95 p-4 shadow-lg backdrop-blur-md">
        <div className="flex items-center gap-2">
          {isDirty ? (
            <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-700 border border-amber-200">
              <span className="h-2 w-2 rounded-full bg-amber-500 animate-pulse" />
              Unsaved changes
            </span>
          ) : (
            <span className="text-xs text-gray-400">All changes saved or unchanged</span>
          )}
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
          <Link
            href="/admin/products"
            className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-xs font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
          >
            Cancel
          </Link>
          <button
            type="submit"
            disabled={isPending}
            onClick={() => setIsDirty(false)}
            className="inline-flex items-center gap-1.5 rounded-lg bg-gray-900 px-6 py-2 text-xs font-semibold text-white shadow-xs hover:bg-gray-800 disabled:opacity-60 transition-all min-h-[38px]"
          >
            {isPending && (
              <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
            )}
            <span>{isPending ? "Saving Product..." : submitLabel}</span>
          </button>
        </div>
      </div>
    </form>
  );
}
