"use client";
import { resolveImageUrl } from "@/lib/utils";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import type { DbProduct } from "@/services/adminProductService";
import CategoryBadge from "@/components/admin/categories/CategoryBadge";
import DeleteProductButton from "@/app/admin/(protected)/products/DeleteProductButton";

interface ProductTableResponsiveProps {
  products: DbProduct[];
}

export default function ProductTableResponsive({ products }: ProductTableResponsiveProps) {
  if (products.length === 0) {
    return (
      <div className="rounded-xl border border-gray-200 bg-white p-12 text-center shadow-xs">
        <span className="material-symbols-outlined mx-auto mb-3 block text-4xl text-gray-300">
          inventory_2
        </span>
        <h3 className="text-base font-semibold text-gray-900">No products found</h3>
        <p className="mt-1 text-sm text-gray-500">
          Get started by creating your first product.
        </p>
        <div className="mt-6">
          <Link
            href="/admin/products/new"
            className="inline-flex items-center gap-2 rounded-lg bg-gray-900 px-4 py-2.5 text-xs font-semibold text-white shadow-xs hover:bg-gray-800 transition-colors"
          >
            <span className="material-symbols-outlined text-base">add</span>
            Add Product
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* ── Desktop Table View (hidden on mobile/tablet below md) ── */}
      <div className="hidden md:block overflow-x-auto rounded-xl border border-gray-200 bg-white shadow-xs">
        <table className="w-full border-collapse text-left text-sm">
          <thead>
            <tr className="border-b border-gray-150 bg-gray-50/80 text-xs font-semibold uppercase tracking-wider text-gray-500">
              <th className="px-4 py-3.5 w-16">ID</th>
              <th className="px-4 py-3.5">Product</th>
              <th className="px-4 py-3.5">Category</th>
              <th className="px-4 py-3.5">Price</th>
              <th className="px-4 py-3.5">Stock Status</th>
              <th className="px-4 py-3.5">Featured</th>
              <th className="px-4 py-3.5 text-right">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100">
            {products.map((product) => (
              <tr key={product.id} className="hover:bg-gray-50/60 transition-colors">
                <td className="px-4 py-3.5 font-mono text-xs text-gray-400">
                  #{product.id}
                </td>

                <td className="px-4 py-3.5">
                  <div className="flex items-center gap-3">
                    <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-lg border border-gray-200 bg-gray-50 flex items-center justify-center">
                      {product.img ? (
                        <Image
                          src={resolveImageUrl(product.img)}
                          alt={product.name}
                          fill
                          sizes="44px"
                          className="object-cover"
                          onError={(e) => {
                            (e.target as HTMLElement).style.display = "none";
                          }}
                        />
                      ) : (
                        <span className="material-symbols-outlined text-gray-300 text-lg">
                          image
                        </span>
                      )}
                    </div>
                    <div className="min-w-0">
                      <div className="font-semibold text-gray-900 truncate">
                        {product.name}
                      </div>
                      <div className="text-xs text-gray-400 font-mono truncate">
                        {product.slug}
                      </div>
                    </div>
                  </div>
                </td>

                <td className="px-4 py-3.5">
                  <CategoryBadge
                    category={product.categories}
                    fallbackName={product.category}
                  />
                </td>

                <td className="px-4 py-3.5">
                  <div className="font-semibold text-gray-900">{product.price}</div>
                  {product.discount ? (
                    <div className="text-xs font-medium text-green-600">
                      {product.discount}
                    </div>
                  ) : product.price_original ? (
                    <div className="text-xs text-gray-400 line-through">
                      {product.price_original}
                    </div>
                  ) : null}
                </td>

                <td className="px-4 py-3.5">
                  <StockBadge status={product.stock_status} />
                </td>

                <td className="px-4 py-3.5">
                  {product.featured ? (
                    <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-2 py-0.5 text-xs font-semibold text-amber-700 border border-amber-200/60">
                      ★ Featured
                    </span>
                  ) : (
                    <span className="text-xs text-gray-400">—</span>
                  )}
                </td>

                <td className="px-4 py-3.5 text-right">
                  <div className="flex items-center justify-end gap-3">
                    <Link
                      href={`/products/${product.slug}`}
                      target="_blank"
                      className="text-xs font-medium text-gray-500 hover:text-gray-900 transition-colors"
                      title="View on storefront"
                    >
                      View
                    </Link>
                    <Link
                      href={`/admin/products/${product.id}/edit`}
                      className="rounded-lg bg-gray-100 px-3 py-1.5 text-xs font-semibold text-gray-700 hover:bg-gray-200 transition-colors"
                    >
                      Edit
                    </Link>
                    <DeleteProductButton id={product.id} name={product.name} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ── Mobile & Tablet Card View (visible below md) ── */}
      <div className="block md:hidden space-y-4">
        {products.map((product) => (
          <div
            key={product.id}
            className="rounded-xl border border-gray-200 bg-white p-4 shadow-xs transition-shadow hover:shadow-md"
          >
            {/* Card Header: Image & Details */}
            <div className="flex items-start gap-3.5">
              <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl border border-gray-200 bg-gray-50 flex items-center justify-center">
                {product.img ? (
                  <Image
                    src={resolveImageUrl(product.img)}
                    alt={product.name}
                    fill
                    sizes="64px"
                    className="object-cover"
                    onError={(e) => {
                      (e.target as HTMLElement).style.display = "none";
                    }}
                  />
                ) : (
                  <span className="material-symbols-outlined text-gray-300 text-2xl">
                    image
                  </span>
                )}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <span className="font-mono text-xs text-gray-400">#{product.id}</span>
                  <div className="flex items-center gap-1.5">
                    {product.featured && (
                      <span className="inline-flex items-center rounded-full bg-amber-50 px-2 py-0.5 text-xs font-semibold text-amber-700 border border-amber-200/60">
                        ★ Featured
                      </span>
                    )}
                  </div>
                </div>

                <h3 className="mt-1 font-semibold text-gray-900 text-base truncate">
                  {product.name}
                </h3>
                <p className="text-xs text-gray-400 font-mono truncate">{product.slug}</p>

                <div className="mt-2.5 flex flex-wrap items-center gap-2">
                  <CategoryBadge
                    category={product.categories}
                    fallbackName={product.category}
                  />
                  <StockBadge status={product.stock_status} />
                </div>
              </div>
            </div>

            {/* Price Info */}
            <div className="mt-3.5 rounded-lg bg-gray-50/80 px-3.5 py-2.5 flex items-center justify-between border border-gray-150">
              <span className="text-xs font-medium text-gray-500">Price</span>
              <div className="flex items-center gap-2">
                {product.price_original && product.price_original !== product.price && (
                  <span className="text-xs text-gray-400 line-through">
                    {product.price_original}
                  </span>
                )}
                <span className="text-sm font-bold text-gray-900">{product.price}</span>
                {product.discount && (
                  <span className="rounded bg-green-100 px-1.5 py-0.5 text-xs font-semibold text-green-700">
                    {product.discount}
                  </span>
                )}
              </div>
            </div>

            {/* Quick Actions Footer (Always Visible on Mobile) */}
            <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between gap-2">
              <Link
                href={`/products/${product.slug}`}
                target="_blank"
                className="inline-flex items-center gap-1 text-xs font-semibold text-gray-600 hover:text-gray-900 px-2.5 py-2 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <span className="material-symbols-outlined text-base">open_in_new</span>
                Storefront
              </Link>

              <div className="flex items-center gap-2">
                <Link
                  href={`/admin/products/${product.id}/edit`}
                  className="inline-flex items-center gap-1 rounded-lg bg-gray-900 px-4 py-2 text-xs font-semibold text-white shadow-xs hover:bg-gray-800 transition-colors min-h-[38px]"
                >
                  <span className="material-symbols-outlined text-base">edit</span>
                  Edit
                </Link>
                <DeleteProductButton id={product.id} name={product.name} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Stock Status Badge Helper
// ---------------------------------------------------------------------------
function StockBadge({ status }: { status: string }) {
  const map: Record<string, { label: string; className: string }> = {
    in_stock: {
      label: "In Stock",
      className: "bg-green-50 text-green-700 border border-green-200/60",
    },
    low_stock: {
      label: "Low Stock",
      className: "bg-amber-50 text-amber-700 border border-amber-200/60",
    },
    out_of_stock: {
      label: "Out of Stock",
      className: "bg-red-50 text-red-700 border border-red-200/60",
    },
  };
  const { label, className } = map[status] ?? {
    label: status || "Unknown",
    className: "bg-gray-100 text-gray-700 border border-gray-200",
  };
  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${className}`}>
      {label}
    </span>
  );
}
