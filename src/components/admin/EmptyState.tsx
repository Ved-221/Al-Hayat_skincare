/**
 * EmptyState.tsx
 * --------------
 * Reusable empty state display for tables and lists across the admin dashboard.
 */

import Link from "next/link";
import type { ReactNode } from "react";

export interface EmptyStateProps {
  icon?: string;
  title: string;
  description: string;
  actionLabel?: string;
  actionHref?: string;
  children?: ReactNode;
}

export default function EmptyState({
  icon = "inbox",
  title,
  description,
  actionLabel,
  actionHref,
  children,
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-gray-200 bg-gray-50/50 px-6 py-12 text-center">
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-100 text-gray-400">
        <span className="material-symbols-outlined text-2xl">{icon}</span>
      </div>

      <h3 className="mt-4 text-sm font-semibold text-gray-900">{title}</h3>
      <p className="mt-1 max-w-sm text-xs text-gray-500">{description}</p>

      {actionLabel && actionHref && (
        <Link
          href={actionHref}
          className="mt-4 rounded-lg bg-gray-900 px-4 py-2 text-xs font-medium text-white shadow-xs hover:bg-gray-800"
        >
          {actionLabel}
        </Link>
      )}

      {children && <div className="mt-4">{children}</div>}
    </div>
  );
}
