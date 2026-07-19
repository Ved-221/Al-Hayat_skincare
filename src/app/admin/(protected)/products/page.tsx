/**
 * /admin/products — Products List (Server Component)
 * ---------------------------------------------------
 * Fetches all products from Supabase via adminProductService (SSR client).
 * Delete is handled by the DeleteProductButton client component.
 */

import { requireAdmin } from "@/lib/auth";
import { getAdminProducts } from "@/services/adminProductService";
import Link from "next/link";
import ProductTableResponsive from "@/components/admin/products/ProductTableResponsive";

export const metadata = { title: "Products — Admin | AL-HAYAT" };

export default async function AdminProductsPage() {
  await requireAdmin();

  const products = await getAdminProducts();

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
            Products Management
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            {products.length} product{products.length !== 1 ? "s" : ""} total in store catalog
          </p>
        </div>

        <Link
          href="/admin/products/new"
          className="inline-flex items-center justify-center gap-1.5 rounded-lg bg-gray-900 px-4 py-2.5 text-xs font-semibold text-white shadow-xs hover:bg-gray-800 transition-colors w-full sm:w-auto text-center"
        >
          <span className="material-symbols-outlined text-base">add</span>
          Add Product
        </Link>
      </div>

      {/* Responsive Dual Table / Cards View */}
      <ProductTableResponsive products={products} />
    </div>
  );
}