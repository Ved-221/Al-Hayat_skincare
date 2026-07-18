"use client";

import { useEffect, useState, useTransition } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";

export default function CategorySearch() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  const initialSearch = searchParams.get("search") || "";
  const [searchVal, setSearchVal] = useState(initialSearch);

  useEffect(() => {
    const handler = setTimeout(() => {
      if (searchVal !== initialSearch) {
        startTransition(() => {
          const params = new URLSearchParams(searchParams.toString());
          if (searchVal.trim() === "") {
            params.delete("search");
          } else {
            params.set("search", searchVal.trim());
          }
          params.set("page", "1"); // Reset pagination
          router.push(`${pathname}?${params.toString()}`);
        });
      }
    }, 400);

    return () => clearTimeout(handler);
  }, [searchVal, initialSearch, pathname, router, searchParams]);

  return (
    <div className="relative flex-1 min-w-[280px]">
      <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 select-none pointer-events-none text-lg">
        search
      </span>
      <input
        type="text"
        value={searchVal}
        onChange={(e) => setSearchVal(e.target.value)}
        placeholder="Search category name, slug, or description..."
        className="w-full rounded-lg border border-gray-200 py-2.5 pl-10 pr-9 text-sm text-gray-700 outline-hidden placeholder-gray-400 focus:border-gray-900 transition-colors bg-white shadow-xs"
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
  );
}
