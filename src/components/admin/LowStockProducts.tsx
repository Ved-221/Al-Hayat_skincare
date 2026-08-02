import { resolveImageUrl } from "@/lib/utils";
/**
 * LowStockProducts.tsx
 * --------------------
 * Widget displaying products where stock_status != 'in_stock'.
 * Features clean badge formatting, image fallbacks, and positive empty state when all stock is healthy.
 */

import Link from "next/link";
import Image from "next/image";
import type { DbProduct } from "@/services/adminProductService";

interface LowStockProductsProps {
  products: DbProduct[];
}

export default function LowStockProducts({ products }: LowStockProductsProps) {
  return (
    <div className="flex h-full flex-col overflow-hidden rounded-xl border border-gray-200 bg-white shadow-xs">
      {/* Section Header */}
      <div className="flex items-center justify-between border-b border-gray-100 px-5 py-4 sm:px-6">
        <div>
          <h2 className="text-base font-semibold text-gray-900">
            Low Stock Alert
          </h2>
          <p className="mt-0.5 text-xs text-gray-500">
            Products needing inventory replenishment
          </p>
        </div>

        {products.length > 0 && (
          <Link
            href="/admin/products"
            className="text-xs font-medium text-blue-600 hover:underline"
          >
            Manage all
          </Link>
        )}
      </div>

      {/* Table / Positive Empty State Content */}
      <div className="flex-1 p-5 sm:p-6">
        {products.length === 0 ? (
          <div className="flex h-full flex-col items-center justify-center py-8 text-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-50 text-green-600">
              <span className="material-symbols-outlined text-2xl">
                check_circle
              </span>
            </div>
            <h3 className="mt-3 text-sm font-semibold text-gray-900">
              Inventory Healthy
            </h3>
            <p className="mt-1 max-w-xs text-xs text-gray-500">
              All products are currently in stock. No immediate inventory alerts right now.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-left text-sm">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50 text-xs font-semibold uppercase tracking-wider text-gray-500">
                  <th className="py-3 pr-4">Image</th>
                  <th className="px-4 py-3">Product</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="py-3 pl-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {products.map((product) => (
                  <tr key={product.id} className="hover:bg-gray-50 transition-colors">
                    <td className="py-3 pr-4">
                      {product.img ? (
                        <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-lg border border-gray-200 bg-gray-50">
                          <Image
                            src={resolveImageUrl(product.img)}
                            alt={product.name}
                            fill
                            sizes="40px"
                            className="object-cover"
                          />
                        </div>
                      ) : (
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-100 text-gray-400">
                          <span className="material-symbols-outlined text-lg">
                            inventory_2
                          </span>
                        </div>
                      )}
                    </td>

                    <td className="px-4 py-3">
                      <div className="font-medium text-gray-900 line-clamp-1">
                        {product.name}
                      </div>
                      <div className="text-xs text-gray-400">
                        {product.category}
                      </div>
                    </td>

                    <td className="px-4 py-3">
                      <span
                        className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                          product.stock_status === "out_of_stock"
                            ? "bg-red-50 text-red-700 border border-red-200"
                            : "bg-amber-50 text-amber-700 border border-amber-200"
                        }`}
                      >
                        {product.stock_status === "out_of_stock"
                          ? "Out of Stock"
                          : "Low Stock"}
                      </span>
                    </td>

                    <td className="py-3 pl-4 text-right">
                      <Link
                        href={`/admin/products/${product.id}/edit`}
                        className="inline-flex items-center gap-1 rounded-md px-2.5 py-1 text-xs font-medium text-blue-600 hover:bg-blue-50 transition-colors"
                      >
                        <span>Edit</span>
                        <span className="material-symbols-outlined text-xs">
                          edit
                        </span>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
