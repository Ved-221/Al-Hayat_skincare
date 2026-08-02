"use client";
import { resolveImageUrl } from "@/lib/utils";

import React, { useState, useEffect, useRef, useMemo } from "react";
import type { CategoryDropdownOption } from "@/types/category";
import { CATEGORY_VISIBILITY } from "@/types/category";
import CategoryOption from "./CategoryOption";
import Image from "next/image";

interface CategorySelectorProps {
  categories: CategoryDropdownOption[];
  defaultValue?: string | null;
  required?: boolean;
  errors?: Record<string, string[]>;
  onChange?: (selectedId: string, selectedCategory: CategoryDropdownOption | null) => void;
}

export default function CategorySelector({
  categories,
  defaultValue,
  required = false,
  errors,
  onChange,
}: CategorySelectorProps) {
  // Ensure we sort and filter visible categories
  const sortedCategories = useMemo(() => {
    return [...categories]
      .filter((c) => !c.visibility || c.visibility === CATEGORY_VISIBILITY.VISIBLE)
      .sort((a, b) => {
        const orderA = a.sort_order ?? 0;
        const orderB = b.sort_order ?? 0;
        if (orderA !== orderB) return orderA - orderB;
        return a.name.localeCompare(b.name);
      });
  }, [categories]);

  const [selectedId, setSelectedId] = useState<string>(defaultValue || "");
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [focusIndex, setFocusIndex] = useState(0);

  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);



  // Find currently selected category
  const selectedCategory = useMemo(() => {
    return sortedCategories.find((c) => c.id === selectedId) || null;
  }, [sortedCategories, selectedId]);

  // Filter categories by search query
  const filteredCategories = useMemo(() => {
    if (!searchQuery.trim()) return sortedCategories;
    const q = searchQuery.toLowerCase().trim();
    return sortedCategories.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        c.slug.toLowerCase().includes(q)
    );
  }, [sortedCategories, searchQuery]);

  // Reset focus index when filtered list changes
  useEffect(() => {
    const timer = setTimeout(() => setFocusIndex(0), 0);
    return () => clearTimeout(timer);
  }, [filteredCategories.length, searchQuery]);

  // Handle outside click to close dropdown
  useEffect(() => {
    function handleOutsideClick(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
        setSearchQuery("");
      }
    }
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  function handleSelect(category: CategoryDropdownOption) {
    setSelectedId(category.id);
    setIsOpen(false);
    setSearchQuery("");
    if (onChange) onChange(category.id, category);
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (!isOpen) {
      if (e.key === "ArrowDown" || e.key === "Enter") {
        e.preventDefault();
        setIsOpen(true);
      }
      return;
    }

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setFocusIndex((prev) =>
        prev < filteredCategories.length - 1 ? prev + 1 : 0
      );
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setFocusIndex((prev) =>
        prev > 0 ? prev - 1 : filteredCategories.length - 1
      );
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (filteredCategories[focusIndex]) {
        handleSelect(filteredCategories[focusIndex]);
      }
    } else if (e.key === "Escape") {
      e.preventDefault();
      setIsOpen(false);
      setSearchQuery("");
    }
  }

  const fieldErrors = errors?.["category_id"] || errors?.["category"];

  return (
    <div className="flex flex-col gap-1" ref={containerRef}>
      {/* Hidden inputs for Server Action FormData submission */}
      <input type="hidden" name="category_id" value={selectedId} />
      <input type="hidden" name="category" value={selectedCategory?.name || ""} />

      <label className="text-sm font-medium text-gray-700">
        Category
        {required && <span className="ml-0.5 text-red-500">*</span>}
      </label>

      {/* Trigger Box */}
      <div
        role="combobox"
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        aria-controls="category-options-list"
        onClick={() => {
          setIsOpen(!isOpen);
          if (!isOpen) {
            setTimeout(() => inputRef.current?.focus(), 10);
          }
        }}
        onKeyDown={handleKeyDown}
        tabIndex={0}
        className={`flex w-full items-center justify-between rounded border px-3 py-2 text-sm bg-white cursor-pointer focus:outline-none focus:ring-2 focus:ring-gray-900 ${
          fieldErrors?.length ? "border-red-500" : "border-gray-300"
        }`}
      >
        {selectedCategory ? (
          <div className="flex items-center gap-2.5 truncate">
            <div className="relative h-6 w-6 flex-shrink-0 overflow-hidden rounded border border-gray-200 bg-gray-50 flex items-center justify-center text-xs">
              {selectedCategory.thumbnail_url ? (
                <Image
                  src={resolveImageUrl(selectedCategory.thumbnail_url)}
                  alt={selectedCategory.name}
                  fill
                  sizes="24px"
                  className="object-cover"
                />
              ) : (
                <span>🌿</span>
              )}
            </div>
            <span className="font-medium text-gray-900 truncate">
              {selectedCategory.name}
            </span>
          </div>
        ) : (
          <span className="text-gray-400">Select a category...</span>
        )}

        <span className="ml-2 text-xs text-gray-400">
          {isOpen ? "▲" : "▼"}
        </span>
      </div>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute z-50 mt-16 w-full max-w-md rounded-md border border-gray-200 bg-white shadow-lg">
          {/* Search Bar inside dropdown */}
          <div className="border-b border-gray-100 p-2">
            <input
              ref={inputRef}
              type="text"
              placeholder="Search categories by name or slug..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              className="w-full rounded border border-gray-200 px-2.5 py-1.5 text-xs focus:border-gray-900 focus:outline-none focus:ring-1 focus:ring-gray-900"
            />
          </div>

          {/* Options List */}
          <ul
            id="category-options-list"
            role="listbox"
            className="max-h-60 overflow-y-auto divide-y divide-gray-50 py-1"
          >
            {filteredCategories.length === 0 ? (
              <li className="px-3 py-4 text-center text-xs text-gray-400">
                No categories matching &quot;{searchQuery}&quot;
              </li>
            ) : (
              filteredCategories.map((cat, index) => (
                <CategoryOption
                  key={cat.id}
                  category={cat}
                  isSelected={cat.id === selectedId}
                  isFocused={index === focusIndex}
                  onSelect={handleSelect}
                  onMouseEnter={() => setFocusIndex(index)}
                />
              ))
            )}
          </ul>
        </div>
      )}

      {fieldErrors && fieldErrors.length > 0 && (
        <p className="mt-1 text-xs text-red-600">{fieldErrors.join(", ")}</p>
      )}
    </div>
  );
}
