/**
 * StatCard.tsx
 * ------------
 * Reusable statistics card component with support for clickable links,
 * custom icons, descriptions, and skeleton loading states.
 */

import Link from "next/link";


export interface StatCardProps {
  title: string;
  value: number | string;
  description: string;
  icon: string;
  href?: string;
  loading?: boolean;
  iconBgColor?: string;
  iconTextColor?: string;
}

export default function StatCard({
  title,
  value,
  description,
  icon,
  href,
  loading = false,
  iconBgColor = "bg-gray-100",
  iconTextColor = "text-gray-700",
}: StatCardProps) {
  const cardContent = (
    <div className="flex flex-col justify-between rounded-xl border border-gray-200 bg-white p-5 shadow-xs transition-all duration-200 hover:border-gray-300 hover:shadow-md sm:p-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-500">
            {title}
          </h3>
          {loading ? (
            <div className="mt-2 h-8 w-16 animate-pulse rounded bg-gray-200" />
          ) : (
            <div className="mt-1 font-mono text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
              {value}
            </div>
          )}
        </div>

        <div
          className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-lg ${iconBgColor} ${iconTextColor}`}
        >
          <span className="material-symbols-outlined text-2xl">{icon}</span>
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between text-xs text-gray-500">
        <span>{description}</span>
        {href && href !== "#" && (
          <span className="flex items-center gap-0.5 font-medium text-blue-600 group-hover:underline">
            <span>View</span>
            <span className="material-symbols-outlined text-sm">
              chevron_right
            </span>
          </span>
        )}
      </div>
    </div>
  );

  if (href && href !== "#") {
    return (
      <Link href={href} className="group block focus:outline-hidden">
        {cardContent}
      </Link>
    );
  }

  return <div className="group block">{cardContent}</div>;
}
