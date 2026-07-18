"use client";

import type { StorefrontCategoryWithCount } from "@/services/storefrontCategoryService";

interface CategorySidebarProps {
  categories: StorefrontCategoryWithCount[];
  activeCategorySlug: string;
  totalProductsCount: number;
  onSelectCategory: (slug: string) => void;
}

export default function CategorySidebar({
  categories,
  activeCategorySlug,
  totalProductsCount,
  onSelectCategory,
}: CategorySidebarProps) {
  return (
    <aside className="w-full rounded-2xl bg-white p-5 border border-gray-200/60 shadow-xs space-y-4">
      <div>
        <h3
          className="text-lg font-bold text-[#434b01] tracking-tight flex items-center gap-2"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          <span className="material-symbols-outlined text-xl">category</span>
          Categories
        </h3>
        <p className="text-xs text-[#47483a]/70 mt-1" style={{ fontFamily: "'Inter', sans-serif" }}>
          Filter products by collection
        </p>
      </div>

      <div className="border-t border-gray-150 pt-3 space-y-1">
        {/* All Products button */}
        <button
          type="button"
          onClick={() => onSelectCategory("all")}
          className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs transition-all duration-200 ${
            activeCategorySlug === "all" || !activeCategorySlug
              ? "bg-[#434b01] text-[#fff8f1] font-bold shadow-xs"
              : "text-[#47483a] hover:bg-[#EAE2D1]/60 font-medium"
          }`}
          style={{ fontFamily: "'Inter', sans-serif" }}
        >
          <span>All Products</span>
          <span
            className={`px-2 py-0.5 rounded-full text-[10px] ${
              activeCategorySlug === "all" || !activeCategorySlug
                ? "bg-white/20 text-[#fff8f1]"
                : "bg-gray-100 text-gray-600"
            }`}
          >
            {totalProductsCount}
          </span>
        </button>

        {/* Dynamic Category items */}
        {categories.map((cat) => {
          const isActive = activeCategorySlug === cat.slug;
          return (
            <button
              key={cat.id}
              type="button"
              onClick={() => onSelectCategory(cat.slug)}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs transition-all duration-200 ${
                isActive
                  ? "bg-[#434b01] text-[#fff8f1] font-bold shadow-xs"
                  : "text-[#47483a] hover:bg-[#EAE2D1]/60 font-medium"
              }`}
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              <span className="truncate pr-2">{cat.name}</span>
              <span
                className={`px-2 py-0.5 rounded-full text-[10px] shrink-0 ${
                  isActive ? "bg-white/20 text-[#fff8f1]" : "bg-gray-100 text-gray-600"
                }`}
              >
                {cat.productCount}
              </span>
            </button>
          );
        })}
      </div>
    </aside>
  );
}
