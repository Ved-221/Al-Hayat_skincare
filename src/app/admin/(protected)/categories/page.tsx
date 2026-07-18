import { requireAdmin } from "@/lib/auth";
import { getCategoriesPaged, getCategoriesForDropdown } from "@/services/adminCategoryService";
import CategoryStatisticsCard from "@/components/admin/categories/CategoryStatisticsCard";
import CategorySearch from "@/components/admin/categories/CategorySearch";
import CategoryFilters from "@/components/admin/categories/CategoryFilters";
import CategoriesListView from "@/components/admin/categories/CategoriesListView";
import Link from "next/link";
import type { CategoryWithStats } from "@/types/category";

export const metadata = { title: "Categories — Admin | AL-HAYAT" };

interface PageProps {
  searchParams: Promise<{
    search?: string;
    visibility?: string;
    featured?: string;
    deleted?: string;
    sort?: string;
    page?: string;
  }>;
}

export default async function AdminCategoriesPage({ searchParams }: PageProps) {
  await requireAdmin();

  const params = await searchParams;
  const search = params.search || "";
  const visibility = params.visibility || "All";
  const featured = params.featured || "All";
  const deleted = params.deleted || "Active";
  const sort = params.sort || "sort_order";
  const page = parseInt(params.page || "1", 10);
  const limit = 10;

  const [{ categories, totalCount }, destinationOptions] = await Promise.all([
    getCategoriesPaged({
      search,
      visibility,
      featured,
      deleted,
      sort,
      page,
      limit,
    }),
    getCategoriesForDropdown(),
  ]);

  const totalPages = Math.ceil(totalCount / limit);
  const hasFilters = Boolean(
    search ||
      (visibility && visibility !== "All") ||
      (featured && featured !== "All") ||
      (deleted && deleted !== "Active") ||
      (sort && sort !== "sort_order")
  );

  // Compute aggregated audit summary across current active set
  const summaryStats: CategoryWithStats = {
    id: "summary",
    name: "Overall Audit Summary",
    slug: "summary",
    description: null,
    thumbnail_url: null,
    banner_url: null,
    alt_text: null,
    meta_title: null,
    meta_description: null,
    meta_keywords: null,
    deleted_at: null,
    sort_order: 0,
    is_featured: false,
    visibility: "visible",
    created_at: categories[categories.length - 1]?.created_at || new Date().toISOString(),
    updated_at: categories[0]?.updated_at || new Date().toISOString(),
    totalProducts: categories.reduce((acc, c) => acc + c.totalProducts, 0),
    visibleProducts: categories.reduce((acc, c) => acc + c.visibleProducts, 0),
    hiddenProducts: categories.reduce((acc, c) => acc + c.hiddenProducts, 0),
    outOfStockProducts: categories.reduce((acc, c) => acc + c.outOfStockProducts, 0),
    lowStockProducts: categories.reduce((acc, c) => acc + c.lowStockProducts, 0),
    totalRevenue: 0,
    totalOrders: 0,
    averageOrderValue: 0,
  };

  const getPageLink = (pageNumber: number) => {
    const urlParams = new URLSearchParams();
    if (search) urlParams.set("search", search);
    if (visibility !== "All") urlParams.set("visibility", visibility);
    if (featured !== "All") urlParams.set("featured", featured);
    if (deleted !== "Active") urlParams.set("deleted", deleted);
    if (sort !== "sort_order") urlParams.set("sort", sort);
    urlParams.set("page", pageNumber.toString());
    return `/admin/categories?${urlParams.toString()}`;
  };

  return (
    <div className="space-y-6 p-4 sm:p-6 max-w-7xl mx-auto">
      {/* Page Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl flex items-center gap-2">
            <span className="material-symbols-outlined text-2xl text-amber-600">category</span>
            Categories Management
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            Organize storefront taxonomy, feature collections, and manage product hierarchy.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/admin"
            className="inline-flex items-center justify-center rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-xs font-semibold text-gray-700 shadow-xs hover:bg-gray-50 transition-colors"
          >
            Dashboard
          </Link>
          <Link
            href="/admin/categories/new"
            className="inline-flex items-center justify-center rounded-lg bg-gray-900 px-5 py-2.5 text-xs font-semibold text-white shadow-xs hover:bg-gray-800 transition-colors gap-2"
          >
            <span>+ New Category</span>
          </Link>
        </div>
      </div>

      {/* Audit Stats Card */}
      <CategoryStatisticsCard stats={summaryStats} />

      {/* Search & Filters */}
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between rounded-xl border border-gray-200 bg-white p-4 shadow-xs">
        <CategorySearch />
        <CategoryFilters />
      </div>

      {/* Categories List & Bulk Actions */}
      <CategoriesListView
        categories={categories}
        destinationOptions={destinationOptions}
        hasFilters={hasFilters}
      />

      {/* Pagination Footer */}
      {totalCount > 0 && (
        <div className="flex flex-col items-center justify-between gap-4 border-t border-gray-200 pt-6 sm:flex-row">
          <div className="flex flex-1 justify-between sm:hidden w-full">
            {page > 1 ? (
              <Link
                href={getPageLink(page - 1)}
                className="relative inline-flex items-center rounded-lg border border-gray-200 bg-white px-4 py-2 text-xs font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Previous
              </Link>
            ) : (
              <span className="relative inline-flex items-center rounded-lg border border-gray-150 bg-gray-50 px-4 py-2 text-xs font-semibold text-gray-400 cursor-not-allowed">
                Previous
              </span>
            )}
            {page < totalPages ? (
              <Link
                href={getPageLink(page + 1)}
                className="relative ml-3 inline-flex items-center rounded-lg border border-gray-200 bg-white px-4 py-2 text-xs font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Next
              </Link>
            ) : (
              <span className="relative ml-3 inline-flex items-center rounded-lg border border-gray-150 bg-gray-50 px-4 py-2 text-xs font-semibold text-gray-400 cursor-not-allowed">
                Next
              </span>
            )}
          </div>

          <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
            <div>
              <p className="text-xs text-gray-700">
                Showing <span className="font-semibold">{Math.min((page - 1) * limit + 1, totalCount)}</span> to{" "}
                <span className="font-semibold">{Math.min(page * limit, totalCount)}</span> of{" "}
                <span className="font-semibold">{totalCount}</span> categories
              </p>
            </div>
            <div>
              <nav className="inline-flex -space-x-px rounded-lg shadow-xs" aria-label="Pagination">
                {page > 1 ? (
                  <Link
                    href={getPageLink(page - 1)}
                    className="inline-flex items-center rounded-l-lg border border-gray-200 bg-white px-3 py-2 text-xs font-semibold text-gray-500 hover:bg-gray-50 transition-colors"
                  >
                    <span className="material-symbols-outlined text-base">chevron_left</span>
                    <span className="ml-1">Previous</span>
                  </Link>
                ) : (
                  <span className="inline-flex items-center rounded-l-lg border border-gray-200 bg-gray-50 px-3 py-2 text-xs font-semibold text-gray-400 cursor-not-allowed">
                    <span className="material-symbols-outlined text-base">chevron_left</span>
                    <span className="ml-1">Previous</span>
                  </span>
                )}

                <span className="inline-flex items-center border-y border-gray-200 bg-gray-50 px-4 py-2 text-xs font-bold text-gray-700 select-none">
                  Page {page} of {totalPages}
                </span>

                {page < totalPages ? (
                  <Link
                    href={getPageLink(page + 1)}
                    className="inline-flex items-center rounded-r-lg border border-gray-200 bg-white px-3 py-2 text-xs font-semibold text-gray-500 hover:bg-gray-50 transition-colors"
                  >
                    <span className="mr-1">Next</span>
                    <span className="material-symbols-outlined text-base">chevron_right</span>
                  </Link>
                ) : (
                  <span className="inline-flex items-center rounded-r-lg border border-gray-200 bg-gray-50 px-3 py-2 text-xs font-semibold text-gray-400 cursor-not-allowed">
                    <span className="mr-1">Next</span>
                    <span className="material-symbols-outlined text-base">chevron_right</span>
                  </span>
                )}
              </nav>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
