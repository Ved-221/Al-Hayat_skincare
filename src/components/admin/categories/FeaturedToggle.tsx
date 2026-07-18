"use client";

import { useState, useTransition } from "react";
import { toggleFeaturedAction } from "@/app/admin/(protected)/categories/actions";

interface FeaturedToggleProps {
  id: string;
  initialFeatured: boolean;
  disabled?: boolean;
}

export default function FeaturedToggle({
  id,
  initialFeatured,
  disabled = false,
}: FeaturedToggleProps) {
  const [isPending, startTransition] = useTransition();
  const [isFeatured, setIsFeatured] = useState(initialFeatured);

  const handleToggle = () => {
    if (disabled || isPending) return;

    const nextFeatured = !isFeatured;
    setIsFeatured(nextFeatured);

    startTransition(async () => {
      const res = await toggleFeaturedAction(id);
      if (!res.success) {
        setIsFeatured(initialFeatured);
        alert(res.error || "Failed to toggle featured status");
      }
    });
  };

  return (
    <button
      type="button"
      onClick={handleToggle}
      disabled={disabled || isPending}
      title={isFeatured ? "Click to unfeature category" : "Click to feature category on storefront"}
      className={`inline-flex items-center justify-center p-1.5 rounded-lg transition-colors duration-150 ${
        disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
      } ${
        isFeatured
          ? "bg-amber-50 text-amber-500 hover:bg-amber-100 border border-amber-200"
          : "bg-gray-50 text-gray-400 hover:bg-gray-100 border border-gray-200 hover:text-gray-600"
      }`}
    >
      {isPending ? (
        <span className="animate-spin h-4 w-4 border-2 border-current border-t-transparent rounded-full" />
      ) : (
        <span className="text-sm leading-none">{isFeatured ? "★" : "☆"}</span>
      )}
    </button>
  );
}
