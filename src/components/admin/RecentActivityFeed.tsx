/**
 * RecentActivityFeed.tsx
 * ----------------------
 * Widget displaying a unified chronological activity feed of recent order and product events.
 */

import Link from "next/link";
import type { ActivityItem } from "@/services/dashboardService";

interface RecentActivityFeedProps {
  activities: ActivityItem[];
}

export default function RecentActivityFeed({ activities }: RecentActivityFeedProps) {
  const getIconConfig = (type: ActivityItem["type"]) => {
    switch (type) {
      case "order_new":
        return {
          icon: "shopping_bag",
          bg: "bg-blue-50 text-blue-600 border border-blue-200",
        };
      case "order_completed":
        return {
          icon: "check_circle",
          bg: "bg-green-50 text-green-600 border border-green-200",
        };
      case "product_added":
        return {
          icon: "add_box",
          bg: "bg-purple-50 text-purple-600 border border-purple-200",
        };
      case "product_updated":
      default:
        return {
          icon: "edit_note",
          bg: "bg-amber-50 text-amber-600 border border-amber-200",
        };
    }
  };

  const formatRelativeOrDate = (isoString: string) => {
    if (!isoString) return "—";
    const date = new Date(isoString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / (1000 * 60));
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffMins < 1) return "Just now";
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays === 1) return "Yesterday";
    if (diffDays < 7) return `${diffDays}d ago`;

    return date.toLocaleDateString("en-IN", {
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="flex h-full flex-col overflow-hidden rounded-xl border border-gray-200 bg-white shadow-xs">
      {/* Section Header */}
      <div className="flex items-center justify-between border-b border-gray-100 px-5 py-4 sm:px-6">
        <div>
          <h2 className="text-base font-semibold text-gray-900">
            Recent Activity
          </h2>
          <p className="mt-0.5 text-xs text-gray-500">
            Real-time feed of store operations
          </p>
        </div>
      </div>

      {/* Feed / Empty State */}
      <div className="flex-1 p-5 sm:p-6">
        {activities.length === 0 ? (
          <div className="flex h-full flex-col items-center justify-center py-8 text-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-100 text-gray-400">
              <span className="material-symbols-outlined text-2xl">
                history
              </span>
            </div>
            <h3 className="mt-3 text-sm font-semibold text-gray-900">
              No Activity Recorded
            </h3>
            <p className="mt-1 max-w-xs text-xs text-gray-500">
              New orders and catalog updates will appear here chronologically.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {activities.map((activity) => {
              const { icon, bg } = getIconConfig(activity.type);
              return (
                <Link
                  key={activity.id}
                  href={activity.href}
                  className="group flex items-start gap-3 rounded-lg p-2 transition-colors hover:bg-gray-50/80"
                >
                  <div
                    className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${bg}`}
                  >
                    <span className="material-symbols-outlined text-lg">
                      {icon}
                    </span>
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-2">
                      <p className="text-xs font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                        {activity.title}
                      </p>
                      <span className="shrink-0 text-[11px] text-gray-400">
                        {formatRelativeOrDate(activity.timestamp)}
                      </span>
                    </div>
                    <p className="mt-0.5 text-xs text-gray-600 line-clamp-2">
                      {activity.description}
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
