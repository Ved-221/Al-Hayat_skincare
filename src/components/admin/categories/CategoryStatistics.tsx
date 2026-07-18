import React from "react";
import type { CategoryWithStats } from "@/types/category";
import Link from "next/link";

interface CategoryStatisticsProps {
  stats: CategoryWithStats;
}

export default function CategoryStatistics({ stats }: CategoryStatisticsProps) {
  const formatDate = (isoString?: string) => {
    if (!isoString) return "—";
    try {
      return new Date(isoString).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      });
    } catch {
      return isoString;
    }
  };

  return (
    <div className="space-y-6">
      {/* Primary Audit Counters */}
      <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-xs">
        <h3 className="text-base font-bold text-gray-900 mb-4 flex items-center gap-2">
          <span>📊</span>
          <span>Category Inventory & Stock Audit</span>
        </h3>

        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
          <div className="rounded-lg border border-gray-100 bg-gray-50 p-3.5">
            <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">
              Total Products
            </p>
            <p className="mt-1.5 text-2xl font-black text-gray-900">
              {stats.totalProducts}
            </p>
          </div>

          <div className="rounded-lg border border-green-100 bg-green-50/50 p-3.5">
            <p className="text-xs font-semibold uppercase tracking-wider text-green-700">
              Visible
            </p>
            <p className="mt-1.5 text-2xl font-black text-green-800">
              {stats.visibleProducts}
            </p>
          </div>

          <div className="rounded-lg border border-gray-200 bg-gray-100/50 p-3.5">
            <p className="text-xs font-semibold uppercase tracking-wider text-gray-600">
              Hidden
            </p>
            <p className="mt-1.5 text-2xl font-black text-gray-800">
              {stats.hiddenProducts}
            </p>
          </div>

          <div className="rounded-lg border border-red-100 bg-red-50/50 p-3.5">
            <p className="text-xs font-semibold uppercase tracking-wider text-red-700">
              Out Of Stock
            </p>
            <p className="mt-1.5 text-2xl font-black text-red-800">
              {stats.outOfStockProducts}
            </p>
          </div>

          <div className="rounded-lg border border-amber-100 bg-amber-50/50 p-3.5">
            <p className="text-xs font-semibold uppercase tracking-wider text-amber-700">
              Low Stock
            </p>
            <p className="mt-1.5 text-2xl font-black text-amber-800">
              {stats.lowStockProducts}
            </p>
          </div>
        </div>

        {/* Newest & Latest Updated Products */}
        <div className="mt-5 pt-4 border-t border-gray-100 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div className="flex items-center justify-between bg-gray-50/80 rounded-md p-2.5 border border-gray-100">
            <span className="text-gray-500 font-medium">Newest Product:</span>
            {stats.newestProduct ? (
              <Link
                href={`/admin/products/${stats.newestProduct.id}`}
                className="font-semibold text-emerald-600 hover:text-emerald-700 underline truncate max-w-[180px]"
              >
                {stats.newestProduct.name}
              </Link>
            ) : (
              <span className="text-gray-400">—</span>
            )}
          </div>

          <div className="flex items-center justify-between bg-gray-50/80 rounded-md p-2.5 border border-gray-100">
            <span className="text-gray-500 font-medium">Latest Updated:</span>
            {stats.latestUpdatedProduct ? (
              <Link
                href={`/admin/products/${stats.latestUpdatedProduct.id}`}
                className="font-semibold text-emerald-600 hover:text-emerald-700 underline truncate max-w-[180px]"
              >
                {stats.latestUpdatedProduct.name} ({formatDate(stats.latestUpdatedProduct.updated_at)})
              </Link>
            ) : (
              <span className="text-gray-400">—</span>
            )}
          </div>
        </div>
      </div>

      {/* Financial Analytics Placeholders */}
      <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-xs">
        <h3 className="text-base font-bold text-gray-900 mb-1 flex items-center gap-2">
          <span>💰</span>
          <span>Category Financial Analytics</span>
        </h3>
        <p className="text-xs text-gray-500 mb-4">
          Future metrics placeholder — will be populated when category-level order analytics are enabled.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="rounded-lg border border-dashed border-gray-300 bg-gray-50/50 p-3.5">
            <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">
              Total Revenue
            </p>
            <p className="mt-1 text-xl font-bold text-gray-400">
              ₹{stats.totalRevenue.toLocaleString("en-IN")}
            </p>
          </div>

          <div className="rounded-lg border border-dashed border-gray-300 bg-gray-50/50 p-3.5">
            <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">
              Total Orders
            </p>
            <p className="mt-1 text-xl font-bold text-gray-400">
              {stats.totalOrders}
            </p>
          </div>

          <div className="rounded-lg border border-dashed border-gray-300 bg-gray-50/50 p-3.5">
            <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">
              Avg. Order Value
            </p>
            <p className="mt-1 text-xl font-bold text-gray-400">
              ₹{stats.averageOrderValue.toLocaleString("en-IN")}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
