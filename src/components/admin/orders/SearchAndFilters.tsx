"use client";

import { useEffect, useState, useTransition } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { ORDER_STATUS } from "@/types/order";

export default function SearchAndFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  // Get initial values from URL
  const initialSearch = searchParams.get("search") || "";
  const initialStatus = searchParams.get("status") || "All";
  const initialSort = searchParams.get("sort") || "newest";

  // Local state for instant typing feel
  const [searchVal, setSearchVal] = useState(initialSearch);

  // Debounce search input
  useEffect(() => {
    const handler = setTimeout(() => {
      if (searchVal !== initialSearch) {
        updateParams({ search: searchVal, page: "1" }); // Reset page on new search
      }
    }, 400);

    return () => clearTimeout(handler);
  }, [searchVal]);

  // Handle URL updates
  function updateParams(updates: Record<string, string>) {
    startTransition(() => {
      const params = new URLSearchParams(searchParams.toString());
      
      Object.entries(updates).forEach(([key, value]) => {
        if (value === "" || value === "All" || (key === "sort" && value === "newest")) {
          params.delete(key);
        } else {
          params.set(key, value);
        }
      });

      router.push(`${pathname}?${params.toString()}`);
    });
  }

  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between rounded-xl border border-gray-200 bg-white p-4 shadow-xs">
      
      {/* Search Input */}
      <div className="relative flex-1 min-w-[280px]">
        <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 select-none pointer-events-none text-lg">
          search
        </span>
        <input
          type="text"
          value={searchVal}
          onChange={(e) => setSearchVal(e.target.value)}
          placeholder="Search by order #, name, phone, or email..."
          className="w-full rounded-lg border border-gray-200 py-2.5 pl-10 pr-4 text-sm text-gray-700 outline-hidden placeholder-gray-400 focus:border-gray-900 transition-colors"
        />
        {isPending && (
          <div className="absolute right-3.5 top-1/2 -translate-y-1/2 flex items-center justify-center">
            <svg
              className="h-4 w-4 animate-spin text-gray-400"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
          </div>
        )}
      </div>

      {/* Filters & Sorting */}
      <div className="flex flex-wrap items-center gap-3">
        {/* Status Filter */}
        <div className="flex items-center gap-1.5">
          <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
            Status
          </label>
          <select
            value={initialStatus}
            onChange={(e) => updateParams({ status: e.target.value, page: "1" })}
            className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-700 outline-hidden focus:border-gray-900 cursor-pointer"
          >
            <option value="All">All Statuses</option>
            {Object.values(ORDER_STATUS).map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </div>

        {/* Sort option */}
        <div className="flex items-center gap-1.5">
          <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
            Sort
          </label>
          <select
            value={initialSort}
            onChange={(e) => updateParams({ sort: e.target.value })}
            className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-700 outline-hidden focus:border-gray-900 cursor-pointer"
          >
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
            <option value="highest_amount">Highest Amount</option>
            <option value="lowest_amount">Lowest Amount</option>
          </select>
        </div>
      </div>

    </div>
  );
}
