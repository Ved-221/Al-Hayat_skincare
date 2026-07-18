"use client";

import React, { useState } from "react";
import Link from "next/link";
import type { CategoryWithStats, CategoryDropdownOption } from "@/types/category";
import CategoryStatusBadge from "./CategoryStatusBadge";
import VisibilityToggle from "./VisibilityToggle";
import FeaturedToggle from "./FeaturedToggle";
import ReorderHandle from "./ReorderHandle";
import DeleteCategoryDialog from "./DeleteCategoryDialog";
import TransferCategoryDialog from "./TransferCategoryDialog";
import { reorderCategoriesAction, restoreCategoryAction } from "@/app/admin/(protected)/categories/actions";

interface CategoryTableProps {
  categories: CategoryWithStats[];
  selectedIds: string[];
  onSelectAll: (checked: boolean) => void;
  onToggleSelect: (id: string) => void;
  destinationOptions: CategoryDropdownOption[];
}

export default function CategoryTable({
  categories,
  selectedIds,
  onSelectAll,
  onToggleSelect,
  destinationOptions,
}: CategoryTableProps) {
  const [draggedIdx, setDraggedIdx] = useState<number | null>(null);
  const [localCategories, setLocalCategories] = useState<CategoryWithStats[]>(categories);
  const [isReordering, setIsReordering] = useState(false);

  // Modal states for delete/transfer
  const [deleteModalCat, setDeleteModalCat] = useState<CategoryWithStats | null>(null);
  const [transferModalCat, setTransferModalCat] = useState<CategoryWithStats | null>(null);

  // Sync state if props change
  React.useEffect(() => {
    setLocalCategories(categories);
  }, [categories]);

  const allSelected =
    localCategories.length > 0 && selectedIds.length === localCategories.length;

  // Drag & Drop Handlers
  const handleDragStart = (e: React.DragEvent, index: number) => {
    setDraggedIdx(index);
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    if (draggedIdx === null || draggedIdx === index) return;

    const updated = [...localCategories];
    const [draggedItem] = updated.splice(draggedIdx, 1);
    updated.splice(index, 0, draggedItem);

    setDraggedIdx(index);
    setLocalCategories(updated);
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    setDraggedIdx(null);
    if (isReordering) return;

    setIsReordering(true);
    const orderedIds = localCategories.map((c) => c.id);
    const res = await reorderCategoriesAction(orderedIds);
    setIsReordering(false);

    if (!res.success) {
      alert(res.error || "Failed to reorder categories");
      setLocalCategories(categories);
    }
  };

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
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-xs">
        <table className="w-full border-collapse text-left text-sm">
          <thead>
            <tr className="border-b border-gray-200 bg-gray-50/75 text-xs font-semibold uppercase tracking-wider text-gray-500">
              <th className="px-3 py-3.5 w-10 text-center">
                <input
                  type="checkbox"
                  checked={allSelected}
                  onChange={(e) => onSelectAll(e.target.checked)}
                  className="rounded border-gray-300 text-gray-900 focus:ring-gray-900 cursor-pointer h-4 w-4"
                />
              </th>
              <th className="px-2 py-3.5 w-10 text-center">Reorder</th>
              <th className="px-4 py-3.5">Category</th>
              <th className="px-4 py-3.5">Slug</th>
              <th className="px-4 py-3.5 text-center">Products</th>
              <th className="px-4 py-3.5 text-center">Visibility</th>
              <th className="px-4 py-3.5 text-center">Featured</th>
              <th className="px-4 py-3.5 text-center">Sort Order</th>
              <th className="px-4 py-3.5">Created</th>
              <th className="px-4 py-3.5 text-right">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100">
            {localCategories.map((cat, idx) => {
              const isSelected = selectedIds.includes(cat.id);
              const isDeleted = Boolean(cat.deleted_at);

              return (
                <tr
                  key={cat.id}
                  onDragOver={(e) => handleDragOver(e, idx)}
                  onDrop={handleDrop}
                  className={`transition-colors ${
                    isSelected
                      ? "bg-amber-50/50"
                      : draggedIdx === idx
                      ? "bg-gray-100 opacity-60"
                      : isDeleted
                      ? "bg-red-50/30"
                      : "hover:bg-gray-50/60"
                  }`}
                >
                  {/* Checkbox */}
                  <td className="px-3 py-3.5 text-center">
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => onToggleSelect(cat.id)}
                      className="rounded border-gray-300 text-gray-900 focus:ring-gray-900 cursor-pointer h-4 w-4"
                    />
                  </td>

                  {/* Drag Handle */}
                  <td className="px-2 py-3.5 text-center">
                    <ReorderHandle
                      disabled={isDeleted || isReordering}
                      onDragStart={(e) => handleDragStart(e, idx)}
                    />
                  </td>

                  {/* Thumbnail & Name */}
                  <td className="px-4 py-3.5">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 shrink-0 overflow-hidden rounded-lg border border-gray-200 bg-gray-50 flex items-center justify-center">
                        {cat.thumbnail_url ? (
                          <img
                            src={cat.thumbnail_url}
                            alt={cat.alt_text || cat.name}
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <span className="material-symbols-outlined text-gray-400 text-lg">
                            category
                          </span>
                        )}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-gray-900">{cat.name}</span>
                          {isDeleted && <CategoryStatusBadge type="deleted" />}
                        </div>
                        {cat.description && (
                          <p className="text-xs text-gray-500 line-clamp-1 max-w-xs">
                            {cat.description}
                          </p>
                        )}
                      </div>
                    </div>
                  </td>

                  {/* Slug */}
                  <td className="px-4 py-3.5 font-mono text-xs text-gray-600">
                    <span className="rounded bg-gray-100 px-2 py-1 border border-gray-200">
                      /{cat.slug}
                    </span>
                  </td>

                  {/* Products Count */}
                  <td className="px-4 py-3.5 text-center">
                    <span
                      title={`${cat.visibleProducts} visible, ${cat.hiddenProducts} hidden / out of stock`}
                      className="inline-flex items-center justify-center rounded-full bg-gray-100 px-3 py-1 text-xs font-bold text-gray-800 border border-gray-200"
                    >
                      {cat.totalProducts}
                    </span>
                  </td>

                  {/* Visibility Toggle & Badge */}
                  <td className="px-4 py-3.5 text-center">
                    <div className="flex items-center justify-center gap-2">
                      <VisibilityToggle
                        id={cat.id}
                        initialVisibility={cat.visibility}
                        disabled={isDeleted}
                      />
                    </div>
                  </td>

                  {/* Featured Toggle */}
                  <td className="px-4 py-3.5 text-center">
                    <FeaturedToggle
                      id={cat.id}
                      initialFeatured={cat.is_featured}
                      disabled={isDeleted}
                    />
                  </td>

                  {/* Sort Order */}
                  <td className="px-4 py-3.5 text-center font-mono text-xs font-semibold text-gray-700">
                    {cat.sort_order}
                  </td>

                  {/* Created Date */}
                  <td className="px-4 py-3.5 text-xs text-gray-500 whitespace-nowrap">
                    {formatDate(cat.created_at)}
                  </td>

                  {/* Actions Menu */}
                  <td className="px-4 py-3.5 text-right whitespace-nowrap">
                    <div className="flex items-center justify-end gap-2">
                      {!isDeleted ? (
                        <>
                          <Link
                            href={`/admin/categories/${cat.id}/edit`}
                            title="Edit category"
                            className="inline-flex items-center justify-center p-1.5 rounded-lg text-gray-500 hover:bg-gray-100 hover:text-gray-900 transition-colors"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                              />
                            </svg>
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
                            title="Soft delete category"
                            className="inline-flex items-center justify-center p-1.5 rounded-lg text-red-500 hover:bg-red-50 hover:text-red-700 transition-colors cursor-pointer"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                              />
                            </svg>
                          </button>
                        </>
                      ) : (
                        <button
                          type="button"
                          onClick={() => handleRestore(cat.id)}
                          className="inline-flex items-center gap-1.5 rounded-lg bg-blue-50 px-2.5 py-1 text-xs font-semibold text-blue-700 border border-blue-200 hover:bg-blue-100 transition-colors cursor-pointer"
                        >
                          Restore
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Delete Modal for 0 products */}
      <DeleteCategoryDialog
        category={deleteModalCat}
        onClose={() => setDeleteModalCat(null)}
      />

      {/* Transfer Modal for >0 products */}
      <TransferCategoryDialog
        category={transferModalCat}
        destinationOptions={destinationOptions}
        onClose={() => setTransferModalCat(null)}
      />
    </>
  );
}
