import { requireAdmin } from "@/lib/auth";
import { getCategoryById } from "@/services/adminCategoryService";
import CategoryForm from "@/components/admin/categories/CategoryForm";
import Link from "next/link";
import { notFound } from "next/navigation";

export const metadata = { title: "Edit Category — Admin | AL-HAYAT" };

interface EditPageProps {
  params: Promise<{ id: string }>;
}

export default async function EditCategoryPage({ params }: EditPageProps) {
  await requireAdmin();

  const { id } = await params;
  let category;
  try {
    category = await getCategoryById(id);
  } catch {
    notFound();
  }

  if (!category) {
    notFound();
  }

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
            <span className="text-gray-700">Edit Category</span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl flex items-center gap-3">
            <span>Edit "{category.name}"</span>
            <span className="font-mono text-xs font-normal text-gray-500 rounded bg-gray-100 px-2 py-1 border border-gray-200">
              /{category.slug}
            </span>
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href={`/products/${category.slug}`}
            target="_blank"
            className="inline-flex items-center justify-center rounded-lg border border-gray-200 bg-white px-4 py-2 text-xs font-semibold text-gray-700 shadow-xs hover:bg-gray-50 transition-colors gap-1.5"
          >
            <span>View on Storefront</span>
            <span className="material-symbols-outlined text-sm">open_in_new</span>
          </Link>
          <Link
            href="/admin/categories"
            className="inline-flex items-center justify-center rounded-lg border border-gray-200 bg-white px-4 py-2 text-xs font-semibold text-gray-700 shadow-xs hover:bg-gray-50 transition-colors"
          >
            ← Back to Categories
          </Link>
        </div>
      </div>

      {/* Form with initial data */}
      <CategoryForm initialData={category} />
    </div>
  );
}
