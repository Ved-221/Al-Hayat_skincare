import Link from "next/link";

interface EmptyOrdersProps {
  hasFilters: boolean;
}

export default function EmptyOrders({ hasFilters }: EmptyOrdersProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center rounded-xl border border-gray-200 bg-white shadow-xs">
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gray-50 text-gray-400 mb-4 border border-gray-100">
        <span className="material-symbols-outlined text-3xl">shopping_cart</span>
      </div>
      <h3 className="text-lg font-bold text-gray-900 mb-1">
        {hasFilters ? "No matching orders found" : "No orders yet"}
      </h3>
      <p className="max-w-xs text-sm text-gray-500 leading-relaxed">
        {hasFilters
          ? "Try adjusting your filters, search term, or sorting to find what you're looking for."
          : "Customer orders will appear here automatically after a successful checkout."}
      </p>
      {hasFilters && (
        <Link
          href="/admin/orders"
          className="mt-5 rounded-lg border border-gray-200 bg-white px-4 py-2 text-xs font-semibold text-gray-700 shadow-xs hover:bg-gray-50"
        >
          Clear All Filters
        </Link>
      )}
    </div>
  );
}
