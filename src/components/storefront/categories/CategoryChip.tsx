"use client";

import type { StorefrontCategoryWithCount } from "@/services/storefrontCategoryService";

interface CategoryChipProps {
  categories: StorefrontCategoryWithCount[];
  activeCategorySlug: string;
  totalProductsCount: number;
  onSelectCategory: (slug: string) => void;
}

export default function CategoryChip({
  categories,
  activeCategorySlug,
  totalProductsCount,
  onSelectCategory,
}: CategoryChipProps) {
  return (
    <div className="w-full overflow-x-auto no-scrollbar py-2">
      <div className="flex items-center gap-2.5 min-w-max px-1">
        {/* All Products pill */}
        <button
          type="button"
          onClick={() => onSelectCategory("all")}
          className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold transition-all duration-200 shadow-xs shrink-0 ${
            activeCategorySlug === "all" || !activeCategorySlug
              ? "bg-[#434b01] text-[#fff8f1] scale-105"
              : "bg-[#EAE2D1] text-[#47483a] hover:bg-[#D8CEBA]"
          }`}
          style={{ fontFamily: "'Inter', sans-serif" }}
        >
          <span>All Products</span>
          <span
            className={`px-1.5 py-0.5 rounded-full text-[10px] ${
              activeCategorySlug === "all" || !activeCategorySlug
                ? "bg-white/20 text-[#fff8f1]"
                : "bg-white/60 text-[#434b01]"
            }`}
          >
            {totalProductsCount}
          </span>
        </button>

        {/* Dynamic Category chips */}
        {categories.map((cat) => {
          const isActive = activeCategorySlug === cat.slug;
          return (
            <button
              key={cat.id}
              type="button"
              onClick={() => onSelectCategory(cat.slug)}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold transition-all duration-200 shadow-xs shrink-0 ${
                isActive
                  ? "bg-[#434b01] text-[#fff8f1] scale-105"
                  : "bg-[#EAE2D1] text-[#47483a] hover:bg-[#D8CEBA]"
              }`}
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              <span>{cat.name}</span>
              <span
                className={`px-1.5 py-0.5 rounded-full text-[10px] ${
                  isActive
                    ? "bg-white/20 text-[#fff8f1]"
                    : "bg-white/60 text-[#434b01]"
                }`}
              >
                {cat.productCount}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
