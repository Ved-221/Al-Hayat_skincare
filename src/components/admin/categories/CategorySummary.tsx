import React from "react";
import type { CategoryDashboardMetrics } from "@/types/category";
import Link from "next/link";

interface CategorySummaryProps {
  metrics: CategoryDashboardMetrics;
}

export default function CategorySummary({ metrics }: CategorySummaryProps) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-base font-bold text-gray-900">Category Ecosystem</h2>
          <p className="text-xs text-gray-500 mt-0.5">
            System-wide category visibility and distribution overview
          </p>
        </div>
        <Link
          href="/admin/categories"
          className="text-xs font-semibold text-emerald-600 hover:text-emerald-700 underline"
        >
          Manage All &rarr;
        </Link>
      </div>

      {/* Grid of counters */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mb-5">
        <div className="rounded-lg bg-gray-50 p-3 border border-gray-100">
          <div className="text-xs font-medium text-gray-500">Total</div>
          <div className="text-xl font-bold text-gray-900 mt-1">{metrics.totalCategories}</div>
        </div>
        <div className="rounded-lg bg-emerald-50/60 p-3 border border-emerald-100">
          <div className="text-xs font-medium text-emerald-700">Visible</div>
          <div className="text-xl font-bold text-emerald-900 mt-1">{metrics.visibleCategories}</div>
        </div>
        <div className="rounded-lg bg-amber-50/60 p-3 border border-amber-100">
          <div className="text-xs font-medium text-amber-700">Hidden</div>
          <div className="text-xl font-bold text-amber-900 mt-1">{metrics.hiddenCategories}</div>
        </div>
        <div className="rounded-lg bg-purple-50/60 p-3 border border-purple-100">
          <div className="text-xs font-medium text-purple-700">Featured</div>
          <div className="text-xl font-bold text-purple-900 mt-1">{metrics.featuredCategories}</div>
        </div>
        <div className="rounded-lg bg-rose-50/60 p-3 border border-rose-100">
          <div className="text-xs font-medium text-rose-700">Empty</div>
          <div className="text-xl font-bold text-rose-900 mt-1">{metrics.emptyCategories}</div>
        </div>
      </div>

      {/* Highlights footer */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4 border-t border-gray-100 text-xs">
        <div className="flex items-center justify-between rounded-md bg-gray-50 px-3 py-2 border border-gray-100">
          <span className="text-gray-500 font-medium">Largest Category:</span>
          {metrics.largestCategory ? (
            <span className="font-semibold text-gray-900 truncate">
              {metrics.largestCategory.name} ({metrics.largestCategory.productCount} items)
            </span>
          ) : (
            <span className="text-gray-400">—</span>
          )}
        </div>

        <div className="flex items-center justify-between rounded-md bg-gray-50 px-3 py-2 border border-gray-100">
          <span className="text-gray-500 font-medium">Newest Category:</span>
          {metrics.newestCategory ? (
            <span className="font-semibold text-gray-900 truncate">
              {metrics.newestCategory.name}
            </span>
          ) : (
            <span className="text-gray-400">—</span>
          )}
        </div>
      </div>
    </div>
  );
}
