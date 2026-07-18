/**
 * RecentProducts.tsx
 * ------------------
 * Purely presentational component rendering the latest products table.
 * Sorting and limiting are handled by the dashboardService layer.
 */

import Link from "next/link";
import type { DbProduct } from "@/services/adminProductService";
import EmptyState from "./EmptyState";

interface RecentProductsProps {
  products: DbProduct[];
}

export default function RecentProducts({ products }: RecentProductsProps) {
  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-xs">
      {/* Section Header */}
      <div className="flex items-center justify-between border-b border-gray-100 px-5 py-4 sm:px-6">
        <div>
          <h2 className="text-base font-semibold text-gray-900">
            Recent Products
          </h2>
          <p className="mt-0.5 text-xs text-gray-500">
            Latest formulations and inventory additions
          </p>
        </div>

        <Link
          href="/admin/products"
          className="text-xs font-medium text-blue-600 hover:underline"
        >
          View all catalog
        </Link>
      </div>

      {/* Table Content */}
      <div className="p-5 sm:p-6">
        {products.length === 0 ? (
          <EmptyState
            icon="inventory_2"
            title="No products found"
            description="You haven't created any products yet."
            actionLabel="+ Add Product"
            actionHref="/admin/products/new"
          />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-left text-sm">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50 text-xs font-semibold uppercase tracking-wider text-gray-500">
                  <th className="py-3 pr-4">Image</th>
                  <th className="px-4 py-3">Name</th>
                  <th className="px-4 py-3">Price</th>
                  <th className="px-4 py-3">Created</th>
                  <th className="py-3 pl-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {products.map((product) => (
                  <tr key={product.id} className="hover:bg-gray-50/80 transition-colors">
                    <td className="py-3 pr-4">
                      {product.img ? (
                        <img
                          src={product.img}
                          alt={product.name}
                          className="h-10 w-10 rounded-lg border border-gray-200 object-cover bg-gray-50"
                        />
                      ) : (
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-100 text-gray-400">
                          <span className="material-symbols-outlined text-lg">
                            image
                          </span>
                        </div>
                      )}
                    </td>

                    <td className="px-4 py-3">
                      <div className="font-medium text-gray-900">
                        {product.name}
                      </div>
                      <div className="text-xs text-gray-400">
                        {product.category}
                      </div>
                    </td>

                    <td className="px-4 py-3">
                      <div className="font-medium text-gray-900">
                        {product.price}
                      </div>
                      {product.discount && (
                        <span className="text-[11px] font-medium text-green-600">
                          {product.discount}
                        </span>
                      )}
                    </td>

                    <td className="px-4 py-3 text-xs text-gray-500">
                      {product.created_at
                        ? new Date(product.created_at).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          })
                        : "—"}
                    </td>

                    <td className="py-3 pl-4 text-right">
                      <div className="flex items-center justify-end gap-3">
                        <Link
                          href={`/admin/products/${product.id}/edit`}
                          className="text-xs font-medium text-blue-600 hover:underline"
                        >
                          Edit
                        </Link>
                        <span className="text-gray-200">|</span>
                        <Link
                          href={`/product/${product.slug}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-0.5 text-xs font-medium text-gray-600 hover:text-gray-900 hover:underline"
                          title="View on public store"
                        >
                          <span>View</span>
                          <span className="material-symbols-outlined text-xs">
                            open_in_new
                          </span>
                        </Link>
                      </div>
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
