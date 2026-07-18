import type { CategoryVisibility } from "@/types/category";
import { CATEGORY_VISIBILITY } from "@/types/category";

interface CategoryStatusBadgeProps {
  visibility?: CategoryVisibility | string;
  isDeleted?: boolean;
  isFeatured?: boolean;
  type?: "visibility" | "featured" | "deleted";
}

export default function CategoryStatusBadge({
  visibility,
  isDeleted,
  isFeatured,
  type = "visibility",
}: CategoryStatusBadgeProps) {
  if (type === "deleted" || isDeleted) {
    return (
      <span className="inline-flex items-center rounded-full bg-red-50 px-2.5 py-0.5 text-xs font-semibold text-red-700 border border-red-200">
        Deleted
      </span>
    );
  }

  if (type === "featured" || (type === "visibility" && isFeatured)) {
    return (
      <span className="inline-flex items-center rounded-full bg-amber-50 px-2.5 py-0.5 text-xs font-semibold text-amber-800 border border-amber-200 gap-1">
        ★ Featured
      </span>
    );
  }

  const isVisible = visibility === CATEGORY_VISIBILITY.VISIBLE || visibility === "visible";

  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold border ${
        isVisible
          ? "bg-green-50 text-green-700 border-green-200"
          : "bg-gray-50 text-gray-700 border-gray-200"
      }`}
    >
      {isVisible ? "Visible" : "Hidden"}
    </span>
  );
}
