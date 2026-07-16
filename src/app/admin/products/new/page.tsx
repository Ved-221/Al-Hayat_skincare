/**
 * /admin/products/new — Add Product (Server Component shell)
 * ----------------------------------------------------------
 * The page itself is a Server Component that just protects the route
 * and renders the shared ProductForm client component bound to createProductAction.
 */

import { requireAdmin } from "@/lib/auth";
import { createProductAction } from "../actions";
import ProductForm from "../ProductForm";
import Link from "next/link";

export const metadata = { title: "Add Product — Admin | AL-HAYAT" };

export default async function NewProductPage() {
  await requireAdmin();

  return (
    <div className="p-8">
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
        <span className="text-gray-900">New</span>
      </nav>

      <h1 className="mb-6 text-2xl font-bold text-gray-900">Add Product</h1>

      <ProductForm action={createProductAction} submitLabel="Create Product" />
    </div>
  );
}
