"use client";

import { useState, useTransition } from "react";
import { toggleVisibilityAction } from "@/app/admin/(protected)/categories/actions";
import type { CategoryVisibility } from "@/types/category";
import { CATEGORY_VISIBILITY } from "@/types/category";

interface VisibilityToggleProps {
  id: string;
  initialVisibility: CategoryVisibility | string;
  disabled?: boolean;
}

export default function VisibilityToggle({
  id,
  initialVisibility,
  disabled = false,
}: VisibilityToggleProps) {
  const [isPending, startTransition] = useTransition();
  const [visibility, setVisibility] = useState(initialVisibility);

  const isVisible = visibility === CATEGORY_VISIBILITY.VISIBLE || visibility === "visible";

  const handleToggle = () => {
    if (disabled || isPending) return;

    const nextVisibility = isVisible
      ? CATEGORY_VISIBILITY.HIDDEN
      : CATEGORY_VISIBILITY.VISIBLE;

    // Optimistic update
    setVisibility(nextVisibility);

    startTransition(async () => {
      const res = await toggleVisibilityAction(id);
      if (!res.success) {
        // Revert on failure
        setVisibility(isVisible ? CATEGORY_VISIBILITY.VISIBLE : CATEGORY_VISIBILITY.HIDDEN);
        alert(res.error || "Failed to toggle visibility");
      }
    });
  };

  return (
    <button
      type="button"
      onClick={handleToggle}
      disabled={disabled || isPending}
      title={isVisible ? "Click to hide from storefront" : "Click to make visible on storefront"}
      className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-hidden focus:ring-2 focus:ring-gray-900 focus:ring-offset-2 ${
        disabled ? "opacity-50 cursor-not-allowed" : ""
      } ${isVisible ? "bg-green-600" : "bg-gray-200"}`}
    >
      <span className="sr-only">Toggle visibility</span>
      <span
        className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out flex items-center justify-center text-[10px] ${
          isVisible ? "translate-x-5 text-green-700" : "translate-x-0 text-gray-400"
        }`}
      >
        {isPending ? (
          <span className="animate-spin h-3 w-3 border-2 border-current border-t-transparent rounded-full" />
        ) : isVisible ? (
          "✓"
        ) : (
          "✕"
        )}
      </span>
    </button>
  );
}
