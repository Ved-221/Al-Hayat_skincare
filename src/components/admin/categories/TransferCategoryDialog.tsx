"use client";

import { useState, useTransition } from "react";
import { deleteCategoryAction } from "@/app/admin/(protected)/categories/actions";
import type { CategoryWithStats, CategoryDropdownOption } from "@/types/category";

interface TransferCategoryDialogProps {
  category: CategoryWithStats | null;
  destinationOptions: CategoryDropdownOption[];
  onClose: () => void;
}

export default function TransferCategoryDialog({
  category,
  destinationOptions,
  onClose,
}: TransferCategoryDialogProps) {
  const [isPending, startTransition] = useTransition();
  const [targetId, setTargetId] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  if (!category) return null;

  const validDestinations = destinationOptions.filter((opt) => opt.id !== category.id);

  const handleTransferAndDelete = () => {
    if (!targetId) {
      setError("Please select a destination category to transfer existing products.");
      return;
    }

    setError(null);
    startTransition(async () => {
      const res = await deleteCategoryAction(category.id, targetId);
      if (res.success) {
        onClose();
      } else {
        setError(res.error || "Failed to transfer products and delete category");
      }
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4 animate-fadeIn">
      <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl border border-gray-100">
        <div className="flex items-center gap-3 text-amber-600 mb-4">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-amber-100">
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </div>
          <h3 className="text-lg font-bold text-gray-900">Transfer Products & Delete</h3>
        </div>

        <p className="text-sm text-gray-600">
          The category <strong className="text-gray-900">"{category.name}"</strong> currently contains{" "}
          <span className="font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
            {category.totalProducts} product(s)
          </span>
          . To prevent orphaned products, you must transfer them to an active destination category before soft-deleting this category.
        </p>

        <div className="mt-5 space-y-2">
          <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700">
            Destination Category *
          </label>
          <select
            value={targetId}
            onChange={(e) => {
              setTargetId(e.target.value);
              setError(null);
            }}
            disabled={isPending || validDestinations.length === 0}
            className="w-full rounded-lg border border-gray-200 bg-white px-3.5 py-2.5 text-sm font-medium text-gray-800 outline-hidden focus:border-gray-900 cursor-pointer shadow-xs disabled:opacity-50"
          >
            <option value="">-- Select a destination category --</option>
            {validDestinations.map((dest) => (
              <option key={dest.id} value={dest.id}>
                {dest.name} ({dest.slug})
              </option>
            ))}
          </select>
          {validDestinations.length === 0 && (
            <p className="text-xs text-red-600">
              No other visible categories exist. Please create another visible category before deleting this one.
            </p>
          )}
        </div>

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
            onClick={handleTransferAndDelete}
            disabled={isPending || !targetId || validDestinations.length === 0}
            className="inline-flex items-center justify-center rounded-lg bg-amber-600 px-4 py-2 text-sm font-semibold text-white hover:bg-amber-700 transition-colors disabled:opacity-50 cursor-pointer gap-2 shadow-xs"
          >
            {isPending ? (
              <>
                <span className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full" />
                Transferring & Deleting...
              </>
            ) : (
              "Transfer & Delete Category"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
