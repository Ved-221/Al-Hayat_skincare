"use client";

import React from "react";
import type { CategoryDropdownOption } from "@/types/category";
import CategoryStatusBadge from "./CategoryStatusBadge";

interface CategoryPreviewProps {
  category: CategoryDropdownOption | null;
  fallbackName?: string | null;
}

export default function CategoryPreview({ category, fallbackName }: CategoryPreviewProps) {
  if (!category && !fallbackName) return null;

  return (
    <div className="mt-3 rounded-lg border border-gray-200 bg-gray-50/70 p-3.5 transition-all">
      <div className="flex items-center justify-between text-xs text-gray-500 mb-2">
        <span className="font-semibold uppercase tracking-wider text-[10px] text-gray-400">
          Selected Category Preview
        </span>
        {category?.is_featured && (
          <span className="rounded-full bg-amber-100 px-2 py-0.5 text-[10px] font-bold text-amber-800 border border-amber-200">
            ★ Featured Category
          </span>
        )}
      </div>

      <div className="flex items-center gap-3">
        {/* Thumbnail */}
        <div className="h-10 w-10 flex-shrink-0 overflow-hidden rounded-md border border-gray-200 bg-white flex items-center justify-center shadow-sm">
          {category?.thumbnail_url ? (
            <img
              src={category.thumbnail_url}
              alt={category.name}
              className="h-full w-full object-cover"
            />
          ) : (
            <span className="text-base">🌿</span>
          )}
        </div>

        {/* Details */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-gray-900 text-sm truncate">
              {category?.name || fallbackName || "Unassigned"}
            </span>
            {category?.visibility && (
              <CategoryStatusBadge visibility={category.visibility} />
            )}
          </div>

          {category?.slug && (
            <div className="text-xs text-gray-400 font-mono mt-0.5 truncate">
              /products/category/{category.slug}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
