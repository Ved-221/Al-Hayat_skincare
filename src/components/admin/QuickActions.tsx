/**
 * QuickActions.tsx
 * ----------------
 * Action cards allowing rapid access to primary admin tasks.
 * Includes short descriptions, icons, and smooth hover animations.
 */

import Link from "next/link";

interface ActionItem {
  label: string;
  description: string;
  href: string;
  icon: string;
  primary?: boolean;
}

const QUICK_ACTIONS: ActionItem[] = [
  {
    label: "Add Product",
    description: "Create a new catalog item or formulation",
    href: "/admin/products/new",
    icon: "add_circle",
    primary: true,
  },
  {
    label: "Add Category",
    description: "Create a new store category or collection",
    href: "/admin/categories/new",
    icon: "category",
    primary: true,
  },
  {
    label: "View Orders",
    description: "Review orders, statuses & WhatsApp dispatches",
    href: "/admin/orders",
    icon: "shopping_cart",
  },
  {
    label: "Manage Categories",
    description: "Organize hierarchy, visibility & sort orders",
    href: "/admin/categories",
    icon: "folder_open",
  },
];

export default function QuickActions() {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-xs sm:p-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-base font-semibold text-gray-900">Quick Actions</h2>
          <p className="mt-0.5 text-xs text-gray-500">
            Rapid access to your primary management operations
          </p>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {QUICK_ACTIONS.map((action) => (
          <Link
            key={action.label}
            href={action.href}
            className={`group flex flex-col justify-between rounded-xl border p-4 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md ${
              action.primary
                ? "border-gray-900 bg-gray-900 text-white hover:bg-gray-800"
                : "border-gray-200 bg-gray-50/60 text-gray-900 hover:border-gray-300 hover:bg-white"
            }`}
          >
            <div className="flex items-start justify-between gap-3">
              <span
                className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${
                  action.primary
                    ? "bg-white/10 text-white"
                    : "bg-white text-gray-700 shadow-2xs border border-gray-200/60 group-hover:text-blue-600"
                }`}
              >
                <span className="material-symbols-outlined text-xl">
                  {action.icon}
                </span>
              </span>

              <span
                className={`material-symbols-outlined text-sm transition-transform duration-200 group-hover:translate-x-0.5 ${
                  action.primary ? "text-gray-400" : "text-gray-400 group-hover:text-blue-600"
                }`}
              >
                arrow_forward
              </span>
            </div>

            <div className="mt-3">
              <h3 className="text-sm font-semibold">{action.label}</h3>
              <p
                className={`mt-1 text-xs leading-relaxed ${
                  action.primary ? "text-gray-300" : "text-gray-500"
                }`}
              >
                {action.description}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
