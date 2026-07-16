/**
 * /admin/products — Products List (Server Component)
 * ---------------------------------------------------
 * Fetches all products from Supabase via adminProductService (SSR client).
 * Delete is handled by the DeleteProductButton client component.
 */

import { requireAdmin } from "@/lib/auth";
import { getAdminProducts } from "@/services/adminProductService";
import Link from "next/link";
import DeleteProductButton from "./DeleteProductButton";

export const metadata = { title: "Products — Admin | AL-HAYAT" };

export default async function AdminProductsPage() {
  await requireAdmin();

  const products = await getAdminProducts();

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Products</h1>
          <p className="mt-0.5 text-sm text-gray-500">
            {products.length} product{products.length !== 1 ? "s" : ""} total
          </p>
        </div>

        <Link
          href="/admin/products/new"
          className="rounded bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-700"
        >
          + Add Product
        </Link>
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-lg border border-gray-200 bg-white">
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="border-b bg-gray-50 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
              <th className="px-4 py-3">ID</th>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Category</th>
              <th className="px-4 py-3">Price</th>
              <th className="px-4 py-3">Stock</th>
              <th className="px-4 py-3">Featured</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100">
            {products.length === 0 && (
              <tr>
                <td
                  colSpan={7}
                  className="px-4 py-8 text-center text-gray-400"
                >
                  No products yet.{" "}
                  <Link href="/admin/products/new" className="underline">
                    Add one.
                  </Link>
                </td>
              </tr>
            )}

            {products.map((product) => (
              <tr key={product.id} className="hover:bg-gray-50">
                <td className="px-4 py-3 font-mono text-xs text-gray-400">
                  {product.id}
                </td>

                <td className="px-4 py-3">
                  <div className="font-medium text-gray-900">{product.name}</div>
                  <div className="text-xs text-gray-400">{product.slug}</div>
                </td>

                <td className="px-4 py-3 text-gray-600">{product.category}</td>

                <td className="px-4 py-3">
                  <div className="font-medium text-gray-900">{product.price}</div>
                  {product.discount && (
                    <div className="text-xs text-green-600">{product.discount}</div>
                  )}
                </td>

                <td className="px-4 py-3">
                  <StockBadge status={product.stock_status} />
                </td>

                <td className="px-4 py-3">
                  {product.featured ? (
                    <span className="text-xs font-medium text-amber-600">★ Yes</span>
                  ) : (
                    <span className="text-xs text-gray-400">—</span>
                  )}
                </td>

                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <Link
                      href={`/admin/products/${product.id}/edit`}
                      className="text-sm text-blue-600 hover:underline"
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
    </div>
  );
}

// ---------------------------------------------------------------------------
// Sub-component: stock status badge
// ---------------------------------------------------------------------------

function StockBadge({ status }: { status: string }) {
  const map: Record<string, { label: string; className: string }> = {
    in_stock: { label: "In Stock", className: "bg-green-100 text-green-700" },
    low_stock: { label: "Low Stock", className: "bg-amber-100 text-amber-700" },
    out_of_stock: { label: "Out of Stock", className: "bg-red-100 text-red-700" },
  };
  const { label, className } = map[status] ?? {
    label: status,
    className: "bg-gray-100 text-gray-700",
  };
  return (
    <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${className}`}>
      {label}
    </span>
  );
}