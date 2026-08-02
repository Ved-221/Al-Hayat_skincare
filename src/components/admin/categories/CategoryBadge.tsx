import { resolveImageUrl } from "@/lib/utils";
import React from "react";
import Image from "next/image";

interface CategoryBadgeProps {
  category?: {
    id?: string;
    name: string;
    slug?: string;
    thumbnail_url?: string | null;
    visibility?: string;
    is_featured?: boolean;
  } | null;
  fallbackName?: string | null;
}

export default function CategoryBadge({ category, fallbackName }: CategoryBadgeProps) {
  const displayName = category?.name || fallbackName || "Unassigned";

  return (
    <div className="inline-flex items-center gap-1.5 rounded-full border border-gray-200 bg-gray-50/80 px-2.5 py-1 text-xs font-medium text-gray-700 transition-colors hover:bg-gray-100">
        <div className="relative h-4 w-4 flex-shrink-0 overflow-hidden rounded-full border border-gray-200 bg-white flex items-center justify-center text-[9px]">
        {category?.thumbnail_url ? (
          <Image
            src={resolveImageUrl(category.thumbnail_url)}
            alt={displayName}
            fill
            sizes="16px"
            className="object-cover"
          />
        ) : (
          <span>🌿</span>
        )}
      </div>
      <span className="truncate max-w-[140px]">{displayName}</span>
      {category?.is_featured && (
        <span className="text-amber-500 font-bold" title="Featured Category">★</span>
      )}
    </div>
  );
}
