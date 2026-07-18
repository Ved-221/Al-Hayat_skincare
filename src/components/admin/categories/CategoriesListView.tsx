"use client";

import React, { useState } from "react";
import type { CategoryWithStats, CategoryDropdownOption } from "@/types/category";
import CategoryTable from "./CategoryTable";
import CategoryCard from "./CategoryCard";
import BulkActionsToolbar from "./BulkActionsToolbar";
import EmptyCategories from "./EmptyCategories";

interface CategoriesListViewProps {
  categories: CategoryWithStats[];
  destinationOptions: CategoryDropdownOption[];
  hasFilters?: boolean;
}

export default function CategoriesListView({
  categories,
  destinationOptions,
  hasFilters = false,
}: CategoriesListViewProps) {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  if (categories.length === 0) {
    return <EmptyCategories hasFilters={hasFilters} />;
  }

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedIds(categories.map((c) => c.id));
    } else {
      setSelectedIds([]);
    }
  };

  const handleToggleSelect = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  return (
    <div className="space-y-6">
      {/* Desktop Table View */}
      <div className="hidden md:block">
        <CategoryTable
          categories={categories}
          selectedIds={selectedIds}
          onSelectAll={handleSelectAll}
          onToggleSelect={handleToggleSelect}
          destinationOptions={destinationOptions}
        />
      </div>

      {/* Mobile Card View */}
      <div className="block md:hidden">
        <div className="mb-3 flex items-center justify-between px-1 text-xs text-gray-500">
          <label className="flex items-center gap-2 cursor-pointer font-semibold">
            <input
              type="checkbox"
              checked={selectedIds.length === categories.length && categories.length > 0}
              onChange={(e) => handleSelectAll(e.target.checked)}
              className="rounded border-gray-300 text-gray-900 focus:ring-gray-900 h-4 w-4"
            />
            <span>Select All ({categories.length})</span>
          </label>
          <span>{selectedIds.length} selected</span>
        </div>

        <CategoryCard
          categories={categories}
          selectedIds={selectedIds}
          onToggleSelect={handleToggleSelect}
          destinationOptions={destinationOptions}
        />
      </div>

      {/* Bulk Actions Toolbar */}
      <BulkActionsToolbar
        selectedIds={selectedIds}
        onClearSelection={() => setSelectedIds([])}
        destinationOptions={destinationOptions}
      />
    </div>
  );
}
