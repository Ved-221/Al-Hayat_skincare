/**
 * /admin/products/[id] — Admin Product Details Page
 * -------------------------------------------------
 * Displays detailed information about a single product alongside a dedicated
 * Category info card with quick actions and link to category management.
 */

import React from "react";
import { requireAdmin } from "@/lib/auth";
import { getAdminProductById } from "@/services/adminProductService";
import { getCategoryById } from "@/services/adminCategoryService";
import Link from "next/link";
import { notFound } from "next/navigation";
import CategoryPreview from "@/components/admin/categories/CategoryPreview";
import type { CategoryDropdownOption } from "@/types/category";

export const metadata = { title: "Product Details — Admin | AL-HAYAT" };

interface Props {
  params: Promise<{ id: string }>;
}

export default async function AdminProductDetailsPage({ params }: Props) {
  await requireAdmin();

  const { id: idStr } = await params;
  const id = parseInt(idStr, 10);
  if (isNaN(id)) notFound();

  let product;
  try {
    product = await getAdminProductById(id);
  } catch {
    notFound();
  }

  let fullCategory = null;
  if (product.category_id) {
    try {
      fullCategory = await getCategoryById(product.category_id);
    } catch {
      // Category might be soft-deleted or missing
    }
  }

  const categoryOption: CategoryDropdownOption | null = fullCategory
    ? {
        id: fullCategory.id,
        name: fullCategory.name,
        slug: fullCategory.slug,
        thumbnail_url: fullCategory.thumbnail_url,
        visibility: fullCategory.visibility,
        is_featured: fullCategory.is_featured,
      }
    : product.categories || null;

  return (
    <div className="p-8 max-w-5xl">
      {/* Breadcrumb */}
      <nav className="mb-4 flex items-center gap-2 text-sm text-gray-500">
        <Link href="/admin" className="hover:text-gray-800">
          Dashboard
        </Link>
        <span>/</span>
        <Link href="/admin/products" className="hover:text-gray-800">
          Products
        </Link>
        <span>/</span>
        <span className="text-gray-900">#{product.id} {product.name}</span>
      </nav>

      {/* Header */}
      <div className="mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-200 pb-5">
        <div>
          <h1 className="text-2xl font-black text-gray-900 flex items-center gap-3">
            {product.name}
            {product.featured && (
              <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-bold text-amber-800 border border-amber-200">
                ★ Featured Product
              </span>
            )}
          </h1>
          <p className="text-sm text-gray-500 font-mono mt-1">/{product.slug}</p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href={`/admin/products/${product.id}/edit`}
            className="rounded-lg bg-gray-900 px-4 py-2 text-sm font-semibold text-white hover:bg-gray-800 transition-colors shadow-sm"
          >
            Edit Product
          </Link>
          <Link
            href={`/products/${product.slug}`}
            target="_blank"
            className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
          >
            View on Storefront &nearr;
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left 2 Cols: Product Core Details */}
        <div className="lg:col-span-2 space-y-6">
          <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-xs">
            <h2 className="text-base font-bold text-gray-900 mb-4">Pricing & Inventory</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-sm">
              <div className="rounded-lg bg-gray-50 p-3.5 border border-gray-100">
                <span className="text-xs font-semibold text-gray-400 uppercase">Price</span>
                <div className="text-lg font-bold text-gray-900 mt-1">{product.price}</div>
              </div>
              <div className="rounded-lg bg-gray-50 p-3.5 border border-gray-100">
                <span className="text-xs font-semibold text-gray-400 uppercase">Original Price</span>
                <div className="text-lg font-bold text-gray-500 line-through mt-1">{product.price_original}</div>
              </div>
              <div className="rounded-lg bg-gray-50 p-3.5 border border-gray-100">
                <span className="text-xs font-semibold text-gray-400 uppercase">Discount / Badge</span>
                <div className="text-sm font-bold text-emerald-600 mt-1">
                  {product.discount || product.badge || "—"}
                </div>
              </div>
              <div className="rounded-lg bg-gray-50 p-3.5 border border-gray-100 col-span-2 sm:col-span-3">
                <span className="text-xs font-semibold text-gray-400 uppercase">Stock Status</span>
                <div className="mt-1 flex items-center gap-2 font-semibold capitalize text-gray-800">
                  <span className={`h-2.5 w-2.5 rounded-full ${
                    product.stock_status === "in_stock" ? "bg-emerald-500" :
                    product.stock_status === "low_stock" ? "bg-amber-500" : "bg-rose-500"
                  }`} />
                  {product.stock_status.replace(/_/g, " ")}
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-xs space-y-4">
            <h2 className="text-base font-bold text-gray-900">Descriptions & Benefit</h2>
            <div>
              <span className="text-xs font-semibold uppercase text-gray-400">Tagline</span>
              <p className="text-sm font-medium text-gray-800 mt-1">{product.tagline}</p>
            </div>
            <div>
              <span className="text-xs font-semibold uppercase text-gray-400">Main Benefit</span>
              <p className="text-sm text-gray-700 mt-1">{product.benefit}</p>
            </div>
            <div>
              <span className="text-xs font-semibold uppercase text-gray-400">Suitable For</span>
              <p className="text-sm text-gray-700 mt-1">{product.suitable_for}</p>
            </div>
            <div>
              <span className="text-xs font-semibold uppercase text-gray-400">Full Description</span>
              <p className="text-sm text-gray-600 mt-1 whitespace-pre-line leading-relaxed">{product.desc}</p>
            </div>
          </div>
        </div>

        {/* Right 1 Col: Assigned Category Card & Audit Info */}
        <div className="space-y-6">
          <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-xs">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-base font-bold text-gray-900">Assigned Category</h2>
              {categoryOption?.id && (
                <Link
                  href={`/admin/categories/${categoryOption.id}/edit`}
                  className="text-xs font-semibold text-emerald-600 hover:text-emerald-700 underline"
                >
                  Edit Category &rarr;
                </Link>
              )}
            </div>

            <CategoryPreview
              category={categoryOption}
              fallbackName={product.category}
            />

            {!categoryOption && !product.category && (
              <div className="rounded-lg bg-amber-50 border border-amber-200 p-3 text-xs text-amber-800 mt-2">
                ⚠️ This product has no category assigned. Edit the product to select a category.
              </div>
            )}
          </div>

          <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-xs text-xs space-y-3">
            <h3 className="font-bold text-gray-900 uppercase tracking-wider text-[11px] text-gray-400">
              Audit Timestamps
            </h3>
            <div className="flex justify-between py-1 border-b border-gray-100">
              <span className="text-gray-500 font-medium">Created At:</span>
              <span className="text-gray-900 font-mono">
                {product.created_at ? new Date(product.created_at).toLocaleDateString() : "—"}
              </span>
            </div>
            <div className="flex justify-between py-1">
              <span className="text-gray-500 font-medium">Updated At:</span>
              <span className="text-gray-900 font-mono">
                {product.updated_at ? new Date(product.updated_at).toLocaleDateString() : "—"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
