"use client";

import React, { useState } from "react";
import Link from "next/link";
import type { CategoryWithStats, CategoryDropdownOption } from "@/types/category";
import CategoryStatusBadge from "./CategoryStatusBadge";
import VisibilityToggle from "./VisibilityToggle";
import FeaturedToggle from "./FeaturedToggle";
import DeleteCategoryDialog from "./DeleteCategoryDialog";
import TransferCategoryDialog from "./TransferCategoryDialog";
import { restoreCategoryAction } from "@/app/admin/(protected)/categories/actions";

interface CategoryCardProps {
  categories: CategoryWithStats[];
  selectedIds: string[];
  onToggleSelect: (id: string) => void;
  destinationOptions: CategoryDropdownOption[];
}

export default function CategoryCard({
  categories,
  selectedIds,
  onToggleSelect,
  destinationOptions,
}: CategoryCardProps) {
  const [deleteModalCat, setDeleteModalCat] = useState<CategoryWithStats | null>(null);
  const [transferModalCat, setTransferModalCat] = useState<CategoryWithStats | null>(null);

  const handleRestore = async (id: string) => {
    const res = await restoreCategoryAction(id);
    if (!res.success) {
      alert(res.error || "Failed to restore category");
    }
  };

  const formatDate = (isoString?: string) => {
    if (!isoString) return "—";
    try {
      return new Date(isoString).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      });
    } catch {
      return isoString;
    }
  };

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {categories.map((cat) => {
          const isSelected = selectedIds.includes(cat.id);
          const isDeleted = Boolean(cat.deleted_at);

          return (
            <div
              key={cat.id}
              className={`rounded-xl border p-4 transition-colors ${
                isSelected
                  ? "border-amber-400 bg-amber-50/40 shadow-sm"
                  : isDeleted
                  ? "border-red-200 bg-red-50/20"
                  : "border-gray-200 bg-white shadow-xs hover:border-gray-300"
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={isSelected}
                    onChange={() => onToggleSelect(cat.id)}
                    className="rounded border-gray-300 text-gray-900 focus:ring-gray-900 cursor-pointer h-4 w-4 shrink-0 mt-1"
                  />

                  <div className="h-12 w-12 shrink-0 overflow-hidden rounded-lg border border-gray-200 bg-gray-50 flex items-center justify-center">
                    {cat.thumbnail_url ? (
                      <img
                        src={cat.thumbnail_url}
                        alt={cat.alt_text || cat.name}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <span className="material-symbols-outlined text-gray-400 text-xl">
                        category
                      </span>
                    )}
                  </div>

                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-bold text-gray-900">{cat.name}</span>
                      {isDeleted && <CategoryStatusBadge type="deleted" />}
                    </div>
                    <span className="inline-block font-mono text-xs text-gray-500 rounded bg-gray-100 px-1.5 py-0.5 mt-1 border border-gray-200">
                      /{cat.slug}
                    </span>
                  </div>
                </div>

                <div className="shrink-0 flex items-center gap-1">
                  <FeaturedToggle
                    id={cat.id}
                    initialFeatured={cat.is_featured}
                    disabled={isDeleted}
                  />
                </div>
              </div>

              {cat.description && (
                <p className="mt-3 text-xs text-gray-600 line-clamp-2">
                  {cat.description}
                </p>
              )}

              <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between text-xs text-gray-600">
                <div className="flex items-center gap-2">
                  <span className="font-medium text-gray-500">Products:</span>
                  <span className="rounded-full bg-gray-100 px-2.5 py-0.5 font-bold text-gray-800 border border-gray-200">
                    {cat.totalProducts}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="font-medium text-gray-500">Visibility:</span>
                  <VisibilityToggle
                    id={cat.id}
                    initialVisibility={cat.visibility}
                    disabled={isDeleted}
                  />
                </div>
              </div>

              <div className="mt-3 pt-3 border-t border-gray-100 flex items-center justify-between text-xs text-gray-400">
                <div>
                  <span>Sort: {cat.sort_order}</span>
                  <span className="mx-2">|</span>
                  <span>Created: {formatDate(cat.created_at)}</span>
                </div>

                <div className="flex items-center gap-2">
                  {!isDeleted ? (
                    <>
                      <Link
                        href={`/admin/categories/${cat.id}/edit`}
                        className="rounded-lg border border-gray-200 bg-white px-3 py-1 text-xs font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
                      >
                        Edit
                      </Link>
                      <button
                        type="button"
                        onClick={() => {
                          if (cat.totalProducts > 0) {
                            setTransferModalCat(cat);
                          } else {
                            setDeleteModalCat(cat);
                          }
                        }}
                        className="rounded-lg border border-red-200 bg-red-50/50 px-3 py-1 text-xs font-semibold text-red-600 hover:bg-red-100 transition-colors cursor-pointer"
                      >
                        Delete
                      </button>
                    </>
                  ) : (
                    <button
                      type="button"
                      onClick={() => handleRestore(cat.id)}
                      className="rounded-lg bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700 border border-blue-200 hover:bg-blue-100 transition-colors cursor-pointer"
                    >
                      Restore
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <DeleteCategoryDialog
        category={deleteModalCat}
        onClose={() => setDeleteModalCat(null)}
      />

      <TransferCategoryDialog
        category={transferModalCat}
        destinationOptions={destinationOptions}
        onClose={() => setTransferModalCat(null)}
      />
    </>
  );
}
