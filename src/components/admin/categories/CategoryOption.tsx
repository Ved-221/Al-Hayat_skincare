"use client";

import React from "react";
import type { CategoryDropdownOption } from "@/types/category";
import Image from "next/image";

interface CategoryOptionProps {
  category: CategoryDropdownOption;
  isSelected: boolean;
  isFocused: boolean;
  onSelect: (category: CategoryDropdownOption) => void;
  onMouseEnter: () => void;
}

export default function CategoryOption({
  category,
  isSelected,
  isFocused,
  onSelect,
  onMouseEnter,
}: CategoryOptionProps) {
  return (
    <li
      role="option"
      aria-selected={isSelected}
      onClick={() => onSelect(category)}
      onMouseEnter={onMouseEnter}
      className={`flex cursor-pointer items-center justify-between px-3 py-2 text-sm transition-colors ${
        isFocused
          ? "bg-gray-100 text-gray-900"
          : isSelected
          ? "bg-emerald-50 text-emerald-900 font-medium"
          : "text-gray-700 hover:bg-gray-50"
      }`}
    >
      <div className="flex items-center gap-2.5 overflow-hidden">
        {/* Thumbnail or Botanical Icon Fallback */}
        <div className="relative h-7 w-7 flex-shrink-0 overflow-hidden rounded border border-gray-200 bg-gray-50 flex items-center justify-center text-xs">
          {category.thumbnail_url ? (
            <Image
              src={category.thumbnail_url}
              alt={category.name}
              fill
              sizes="28px"
              className="object-cover"
            />
          ) : (
            <span>🌿</span>
          )}
        </div>

        <div className="truncate">
          <div className="font-medium truncate">{category.name}</div>
          <div className="text-[11px] text-gray-400 font-mono truncate">
            /{category.slug}
          </div>
        </div>
      </div>

      {isSelected && (
        <span className="ml-2 flex-shrink-0 text-emerald-600 font-bold">
          ✓
        </span>
      )}
    </li>
  );
}
