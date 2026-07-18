"use client";

import { useTransition } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";

export default function CategoryFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  const visibility = searchParams.get("visibility") || "All";
  const featured = searchParams.get("featured") || "All";
  const deleted = searchParams.get("deleted") || "Active";
  const sort = searchParams.get("sort") || "sort_order";

  function updateParams(updates: Record<string, string>) {
    startTransition(() => {
      const params = new URLSearchParams(searchParams.toString());
      Object.entries(updates).forEach(([key, value]) => {
        if (
          value === "" ||
          value === "All" ||
          (key === "deleted" && value === "Active") ||
          (key === "sort" && value === "sort_order")
        ) {
          params.delete(key);
        } else {
          params.set(key, value);
        }
      });
      params.set("page", "1");
      router.push(`${pathname}?${params.toString()}`);
    });
  }

  return (
    <div className="flex flex-wrap items-center gap-3">
      {/* Visibility Filter */}
      <div className="flex items-center gap-1.5">
        <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
          Visibility
        </label>
        <select
          value={visibility}
          onChange={(e) => updateParams({ visibility: e.target.value })}
          disabled={isPending}
          className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-700 outline-hidden focus:border-gray-900 cursor-pointer shadow-xs disabled:opacity-50"
        >
          <option value="All">All Status</option>
          <option value="visible">Visible</option>
          <option value="hidden">Hidden</option>
        </select>
      </div>

      {/* Featured Filter */}
      <div className="flex items-center gap-1.5">
        <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
          Featured
        </label>
        <select
          value={featured}
          onChange={(e) => updateParams({ featured: e.target.value })}
          disabled={isPending}
          className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-700 outline-hidden focus:border-gray-900 cursor-pointer shadow-xs disabled:opacity-50"
        >
          <option value="All">All Featured</option>
          <option value="Featured">Featured</option>
          <option value="Not Featured">Not Featured</option>
        </select>
      </div>

      {/* Deleted Filter */}
      <div className="flex items-center gap-1.5">
        <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
          Lifecycle
        </label>
        <select
          value={deleted}
          onChange={(e) => updateParams({ deleted: e.target.value })}
          disabled={isPending}
          className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-700 outline-hidden focus:border-gray-900 cursor-pointer shadow-xs disabled:opacity-50"
        >
          <option value="Active">Active Only</option>
          <option value="Deleted">Deleted Only</option>
          <option value="All">All (Including Deleted)</option>
        </select>
      </div>

      {/* Sort Filter */}
      <div className="flex items-center gap-1.5">
        <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
          Sort By
        </label>
        <select
          value={sort}
          onChange={(e) => updateParams({ sort: e.target.value })}
          disabled={isPending}
          className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-700 outline-hidden focus:border-gray-900 cursor-pointer shadow-xs disabled:opacity-50"
        >
          <option value="sort_order">Sort Order</option>
          <option value="newest">Newest First</option>
          <option value="oldest">Oldest First</option>
          <option value="name_asc">Alphabetical (A - Z)</option>
          <option value="name_desc">Alphabetical (Z - A)</option>
          <option value="featured_first">Featured First</option>
        </select>
      </div>
    </div>
  );
}
