"use client";

import { useState, useTransition } from "react";
import { deleteCategoryAction } from "@/app/admin/(protected)/categories/actions";
import type { CategoryWithStats } from "@/types/category";

interface DeleteCategoryDialogProps {
  category: CategoryWithStats | null;
  onClose: () => void;
}

export default function DeleteCategoryDialog({
  category,
  onClose,
}: DeleteCategoryDialogProps) {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  if (!category) return null;

  const handleDelete = () => {
    setError(null);
    startTransition(async () => {
      const res = await deleteCategoryAction(category.id);
      if (res.success) {
        onClose();
      } else {
        setError(res.error || "Failed to delete category");
      }
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4 animate-fadeIn">
      <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl border border-gray-100">
        <div className="flex items-center gap-3 text-red-600 mb-4">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-red-100">
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              />
            </svg>
          </div>
          <h3 className="text-lg font-bold text-gray-900">Delete Category</h3>
        </div>

        <p className="text-sm text-gray-600">
          Are you sure you want to delete <strong className="text-gray-900">&quot;{category.name}&quot;</strong>?
          This category has 0 products and will be soft-deleted. You can restore it later from the Deleted view.
        </p>

        {error && (
          <div className="mt-4 rounded-lg bg-red-50 p-3 text-xs font-medium text-red-700 border border-red-200">
            {error}
          </div>
        )}

        <div className="mt-6 flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            disabled={isPending}
            className="rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors disabled:opacity-50 cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleDelete}
            disabled={isPending}
            className="inline-flex items-center justify-center rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700 transition-colors disabled:opacity-50 cursor-pointer gap-2"
          >
            {isPending ? (
              <>
                <span className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full" />
                Deleting...
              </>
            ) : (
              "Delete Category"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
