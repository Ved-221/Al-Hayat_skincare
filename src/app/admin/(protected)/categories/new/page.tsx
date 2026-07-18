import { requireAdmin } from "@/lib/auth";
import CategoryForm from "@/components/admin/categories/CategoryForm";
import Link from "next/link";

export const metadata = { title: "Create Category — Admin | AL-HAYAT" };

export default async function NewCategoryPage() {
  await requireAdmin();

  return (
    <div className="space-y-6 p-4 sm:p-6 max-w-5xl mx-auto">
      {/* Breadcrumb & Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between border-b border-gray-200 pb-5">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1">
            <Link href="/admin/categories" className="hover:text-gray-700 transition-colors">
              Categories
            </Link>
            <span>/</span>
            <span className="text-gray-700">New Category</span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
            Create Storefront Category
          </h1>
        </div>

        <Link
          href="/admin/categories"
          className="inline-flex items-center justify-center rounded-lg border border-gray-200 bg-white px-4 py-2 text-xs font-semibold text-gray-700 shadow-xs hover:bg-gray-50 transition-colors"
        >
          ← Back to Categories
        </Link>
      </div>

      {/* Form */}
      <CategoryForm />
    </div>
  );
}
