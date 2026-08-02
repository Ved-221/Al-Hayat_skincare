import { requireAdmin } from "@/lib/auth";
import { getOrdersPaged } from "@/services/orderService";
import SearchAndFilters from "@/components/admin/orders/SearchAndFilters";
import OrderTable from "@/components/admin/orders/OrderTable";
import OrderCard from "@/components/admin/orders/OrderCard";
import EmptyOrders from "@/components/admin/orders/EmptyOrders";
import Link from "next/link";
import { OrderStatus } from "@/types/order";

export const metadata = { title: "Orders — Admin | AL-HAYAT" };

interface PageProps {
  searchParams: Promise<{
    search?: string;
    status?: string;
    sort?: string;
    page?: string;
  }>;
}

export default async function AdminOrdersPage({ searchParams }: PageProps) {
  await requireAdmin();

  // Await the search parameters
  const params = await searchParams;
  const search = params.search || "";
  const status = (params.status as OrderStatus | "All") || "All";
  const sort = (params.sort as "newest" | "oldest" | "highest_amount" | "lowest_amount" | undefined) || "newest";
  const page = parseInt(params.page || "1", 10);
  const limit = 10;

  // Fetch orders from database
  const { orders, totalCount } = await getOrdersPaged({
    search,
    status,
    sort,
    page,
    limit,
  });

  const totalPages = Math.ceil(totalCount / limit);
  const hasFilters = !!(search || (status && status !== "All") || (sort && sort !== "newest"));

  // Build pagination links helper
  const getPageLink = (pageNumber: number) => {
    const urlParams = new URLSearchParams();
    if (search) urlParams.set("search", search);
    if (status && status !== "All") urlParams.set("status", status);
    if (sort && sort !== "newest") urlParams.set("sort", sort);
    urlParams.set("page", pageNumber.toString());
    return `/admin/orders?${urlParams.toString()}`;
  };

  return (
    <div className="space-y-6 p-4 sm:p-6 max-w-7xl mx-auto">
      {/* Page Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
            Orders Management
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            Track customer orders, status transitions, and checkout records.
          </p>
        </div>

        <Link
          href="/admin"
          className="inline-flex items-center justify-center rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-xs font-semibold text-gray-700 shadow-xs hover:bg-gray-50 transition-colors w-full sm:w-auto text-center"
        >
          Back to Dashboard
        </Link>
      </div>

      {/* Search & Filters */}
      <SearchAndFilters />

      {/* Main Content Area */}
      {orders.length === 0 ? (
        <EmptyOrders hasFilters={hasFilters} />
      ) : (
        <div className="space-y-6">
          {/* Desktop Table View */}
          <div className="hidden md:block">
            <OrderTable orders={orders} />
          </div>

          {/* Mobile Cards View */}
          <div className="block md:hidden">
            <OrderCard orders={orders} />
          </div>

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between border border-gray-200 bg-white px-4 py-3 sm:px-6 rounded-xl shadow-xs mt-4">
              <div className="flex flex-1 justify-between sm:hidden">
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
                    <span className="font-semibold">{totalCount}</span> orders
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
      )}
    </div>
  );
}
