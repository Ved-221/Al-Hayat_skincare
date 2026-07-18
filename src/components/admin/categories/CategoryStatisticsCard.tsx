import type { CategoryWithStats } from "@/types/category";

interface CategoryStatisticsCardProps {
  stats: CategoryWithStats;
}

export default function CategoryStatisticsCard({ stats }: CategoryStatisticsCardProps) {
  const formatDate = (isoString?: string) => {
    if (!isoString) return "—";
    try {
      return new Date(isoString).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch {
      return isoString;
    }
  };

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-xs">
      <h3 className="text-base font-bold text-gray-900 mb-4 flex items-center gap-2">
        <span className="material-symbols-outlined text-gray-500 text-lg">analytics</span>
        Category Statistics & Audit
      </h3>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        {/* Total Products */}
        <div className="rounded-lg border border-gray-100 bg-gray-50 p-3.5">
          <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">
            Total Products
          </p>
          <p className="mt-1.5 text-2xl font-black text-gray-900">
            {stats.totalProducts}
          </p>
        </div>

        {/* Visible Products */}
        <div className="rounded-lg border border-green-100 bg-green-50/50 p-3.5">
          <p className="text-xs font-semibold uppercase tracking-wider text-green-700">
            Visible
          </p>
          <p className="mt-1.5 text-2xl font-black text-green-800">
            {stats.visibleProducts}
          </p>
        </div>

        {/* Hidden Products */}
        <div className="rounded-lg border border-gray-200 bg-gray-100/50 p-3.5">
          <p className="text-xs font-semibold uppercase tracking-wider text-gray-600">
            Hidden
          </p>
          <p className="mt-1.5 text-2xl font-black text-gray-800">
            {stats.hiddenProducts}
          </p>
        </div>

        {/* Out of Stock */}
        <div className="rounded-lg border border-red-100 bg-red-50/50 p-3.5">
          <p className="text-xs font-semibold uppercase tracking-wider text-red-700">
            Out Of Stock
          </p>
          <p className="mt-1.5 text-2xl font-black text-red-800">
            {stats.outOfStockProducts}
          </p>
        </div>

        {/* Low Stock */}
        <div className="rounded-lg border border-amber-100 bg-amber-50/50 p-3.5">
          <p className="text-xs font-semibold uppercase tracking-wider text-amber-700">
            Low Stock
          </p>
          <p className="mt-1.5 text-2xl font-black text-amber-800">
            {stats.lowStockProducts}
          </p>
        </div>
      </div>

      {/* Audit Timestamps */}
      <div className="mt-4 pt-4 border-t border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between text-xs text-gray-500 gap-2">
        <div>
          <span className="font-semibold text-gray-700">Created:</span>{" "}
          {formatDate(stats.created_at)}
        </div>
        <div>
          <span className="font-semibold text-gray-700">Last Updated:</span>{" "}
          {formatDate(stats.updated_at)}
        </div>
      </div>
    </div>
  );
}
