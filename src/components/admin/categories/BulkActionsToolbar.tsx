"use client";

import { useState, useTransition } from "react";
import { bulkActionCategoriesAction } from "@/app/admin/(protected)/categories/actions";
import type { CategoryDropdownOption } from "@/types/category";

interface BulkActionsToolbarProps {
  selectedIds: string[];
  onClearSelection: () => void;
  destinationOptions: CategoryDropdownOption[];
}

export default function BulkActionsToolbar({
  selectedIds,
  onClearSelection,
  destinationOptions,
}: BulkActionsToolbarProps) {
  const [isPending, startTransition] = useTransition();
  const [showConfirmModal, setShowConfirmModal] = useState<boolean>(false);
  const [confirmAction, setConfirmAction] = useState<
    "delete" | "restore" | "visible" | "hidden" | "feature" | "unfeature" | null
  >(null);
  const [targetId, setTargetId] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  if (selectedIds.length === 0) return null;

  const validDestinations = destinationOptions.filter(
    (opt) => !selectedIds.includes(opt.id)
  );

  const triggerAction = (
    action: "delete" | "restore" | "visible" | "hidden" | "feature" | "unfeature"
  ) => {
    setError(null);
    if (action === "delete") {
      setConfirmAction("delete");
      setShowConfirmModal(true);
      return;
    }

    startTransition(async () => {
      const res = await bulkActionCategoriesAction(selectedIds, action);
      if (res.success) {
        onClearSelection();
      } else {
        alert(res.error || `Failed bulk action (${action})`);
      }
    });
  };

  const executeBulkDelete = () => {
    setError(null);
    startTransition(async () => {
      const res = await bulkActionCategoriesAction(
        selectedIds,
        "delete",
        targetId || undefined
      );
      if (res.success) {
        setShowConfirmModal(false);
        setConfirmAction(null);
        setTargetId("");
        onClearSelection();
      } else {
        setError(res.error || "Failed to delete selected categories");
      }
    });
  };

  return (
    <>
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 flex items-center justify-between gap-4 rounded-2xl bg-gray-900/95 backdrop-blur-md px-6 py-3.5 shadow-2xl border border-gray-800 text-white animate-slideUp max-w-4xl w-[92%] sm:w-auto">
        <div className="flex items-center gap-2.5 shrink-0">
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white/10 text-xs font-bold text-white">
            {selectedIds.length}
          </span>
          <span className="text-xs sm:text-sm font-medium">selected</span>
        </div>

        <div className="h-4 w-px bg-gray-700 hidden sm:block shrink-0" />

        <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
          <button
            type="button"
            onClick={() => triggerAction("visible")}
            disabled={isPending}
            className="rounded-lg bg-white/10 hover:bg-white/20 px-3 py-1.5 text-xs font-medium transition-colors cursor-pointer disabled:opacity-50"
          >
            Make Visible
          </button>
          <button
            type="button"
            onClick={() => triggerAction("hidden")}
            disabled={isPending}
            className="rounded-lg bg-white/10 hover:bg-white/20 px-3 py-1.5 text-xs font-medium transition-colors cursor-pointer disabled:opacity-50"
          >
            Hide
          </button>
          <button
            type="button"
            onClick={() => triggerAction("feature")}
            disabled={isPending}
            className="rounded-lg bg-white/10 hover:bg-white/20 px-3 py-1.5 text-xs font-medium transition-colors cursor-pointer disabled:opacity-50"
          >
            ★ Feature
          </button>
          <button
            type="button"
            onClick={() => triggerAction("unfeature")}
            disabled={isPending}
            className="rounded-lg bg-white/10 hover:bg-white/20 px-3 py-1.5 text-xs font-medium transition-colors cursor-pointer disabled:opacity-50"
          >
            ☆ Unfeature
          </button>
          <button
            type="button"
            onClick={() => triggerAction("restore")}
            disabled={isPending}
            className="rounded-lg bg-blue-600/30 text-blue-300 hover:bg-blue-600/50 px-3 py-1.5 text-xs font-medium transition-colors cursor-pointer disabled:opacity-50 border border-blue-500/30"
          >
            Restore
          </button>
          <button
            type="button"
            onClick={() => triggerAction("delete")}
            disabled={isPending}
            className="rounded-lg bg-red-600/30 text-red-300 hover:bg-red-600/50 px-3 py-1.5 text-xs font-medium transition-colors cursor-pointer disabled:opacity-50 border border-red-500/30"
          >
            Delete
          </button>
        </div>

        <button
          type="button"
          onClick={onClearSelection}
          disabled={isPending}
          className="ml-2 rounded-full p-1 hover:bg-white/10 text-gray-400 hover:text-white transition-colors cursor-pointer disabled:opacity-50 shrink-0"
          title="Clear selection"
        >
          ✕
        </button>
      </div>

      {/* Confirmation modal for Bulk Delete */}
      {showConfirmModal && confirmAction === "delete" && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-fadeIn">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl border border-gray-100">
            <h3 className="text-lg font-bold text-gray-900 mb-2">
              Bulk Delete ({selectedIds.length} Categories)
            </h3>
            <p className="text-sm text-gray-600 mb-4">
              If any of the selected categories contain products, those products will be transferred to your chosen destination category below before soft-deletion.
            </p>

            <div className="space-y-2 mb-4">
              <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700">
                Destination Category (Optional for empty categories, Required if categories have products)
              </label>
              <select
                value={targetId}
                onChange={(e) => setTargetId(e.target.value)}
                disabled={isPending}
                className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-800 outline-hidden focus:border-gray-900 cursor-pointer shadow-xs"
              >
                <option value="">-- No Transfer (Fail if products exist) --</option>
                {validDestinations.map((dest) => (
                  <option key={dest.id} value={dest.id}>
                    {dest.name} ({dest.slug})
                  </option>
                ))}
              </select>
            </div>

            {error && (
              <div className="mb-4 rounded-lg bg-red-50 p-3 text-xs font-medium text-red-700 border border-red-200">
                {error}
              </div>
            )}

            <div className="flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => {
                  setShowConfirmModal(false);
                  setConfirmAction(null);
                  setError(null);
                }}
                disabled={isPending}
                className="rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors disabled:opacity-50 cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={executeBulkDelete}
                disabled={isPending}
                className="inline-flex items-center justify-center rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700 transition-colors disabled:opacity-50 cursor-pointer gap-2"
              >
                {isPending ? "Deleting..." : "Confirm Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
