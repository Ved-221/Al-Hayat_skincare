import Link from "next/link";

interface EmptyCategoriesProps {
  hasFilters?: boolean;
}

export default function EmptyCategories({ hasFilters = false }: EmptyCategoriesProps) {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-gray-300 bg-white px-6 py-16 text-center shadow-xs">
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gray-100 text-gray-400 mb-4">
        <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
          />
        </svg>
      </div>

      <h3 className="text-lg font-bold text-gray-900">
        {hasFilters ? "No matching categories found" : "No Categories Yet"}
      </h3>
      <p className="mt-1.5 max-w-md text-sm text-gray-500">
        {hasFilters
          ? "Try adjusting your search keywords or clearing active filters to see more results."
          : "Get started by organizing your storefront products into clean, hierarchical categories."}
      </p>

      <div className="mt-6 flex items-center gap-3">
        {hasFilters ? (
          <Link
            href="/admin/categories"
            className="rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-xs font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
          >
            Clear Filters
          </Link>
        ) : null}

        <Link
          href="/admin/categories/new"
          className="inline-flex items-center justify-center rounded-lg bg-gray-900 px-5 py-2.5 text-xs font-semibold text-white shadow-xs hover:bg-gray-800 transition-colors gap-2"
        >
          <span>+ Create First Category</span>
        </Link>
      </div>
    </div>
  );
}
