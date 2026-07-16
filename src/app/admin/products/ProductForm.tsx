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

import { useActionState } from "react";
import type { ActionResult } from "./actions";
import type { DbProduct } from "@/services/adminProductService";

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
  submitLabel = "Save Product",
}: Props) {
  const [state, formAction, isPending] = useActionState(action, null);

  const errors = state?.success === false ? state.errors : undefined;

  // Serialize JSONB arrays back to string for the textarea default value
  const di = JSON.stringify(defaultValues?.detailed_ingredients ?? [], null, 2);
  const db = JSON.stringify(defaultValues?.detailed_benefits ?? [], null, 2);
  const ritual = JSON.stringify(defaultValues?.ritual ?? [], null, 2);
  const ingredients = (defaultValues?.ingredients ?? []).join(", ");

  return (
    <form action={formAction} className="space-y-6">
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
          <Field
            label="Category"
            name="category"
            required
            placeholder="Hair Care"
            defaultValue={defaultValues?.category}
            errors={errors}
          />
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
        <h2 className="mb-4 text-base font-semibold text-gray-900">Image</h2>
        <Field
          label="Image Path"
          name="img"
          required
          placeholder="/products/herbal-hair-oil.png"
          defaultValue={defaultValues?.img}
          errors={errors}
          hint="Enter the public image path. Image uploads are handled separately."
        />
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

        <div className="mt-4">
          <TextareaField
            label="Detailed Ingredients (JSON)"
            name="detailed_ingredients"
            rows={6}
            required
            defaultValue={di}
            errors={errors}
            hint='Array of { "name": "...", "desc": "..." } objects.'
          />
        </div>
      </section>

      {/* ── Benefits ───────────────────────────────────────────── */}
      <section className="rounded-lg border bg-white p-6">
        <h2 className="mb-4 text-base font-semibold text-gray-900">Detailed Benefits</h2>
        <TextareaField
          label="Detailed Benefits (JSON)"
          name="detailed_benefits"
          rows={6}
          required
          defaultValue={db}
          errors={errors}
          hint='Array of { "icon": "spa", "title": "...", "sub": "..." } objects.'
        />
      </section>

      {/* ── Ritual ─────────────────────────────────────────────── */}
      <section className="rounded-lg border bg-white p-6">
        <h2 className="mb-4 text-base font-semibold text-gray-900">Usage Ritual</h2>
        <TextareaField
          label="Ritual (JSON)"
          name="ritual"
          rows={6}
          required
          defaultValue={ritual}
          errors={errors}
          hint='Array of { "icon": "water_drop", "step": "1. Apply", "desc": "..." } objects.'
        />
      </section>

      {/* ── Submit ─────────────────────────────────────────────── */}
      <div className="flex items-center gap-4">
        <button
          type="submit"
          disabled={isPending}
          className="rounded bg-gray-900 px-6 py-2.5 text-sm font-medium text-white hover:bg-gray-700 disabled:opacity-60"
        >
          {isPending ? "Saving…" : submitLabel}
        </button>
        <a
          href="/admin/products"
          className="text-sm text-gray-500 hover:text-gray-800"
        >
          Cancel
        </a>
      </div>
    </form>
  );
}
