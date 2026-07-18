"use client";

/**
 * Sidebar.tsx
 * -----------
 * Configuration-driven, responsive navigation sidebar.
 * Fixed on desktop (w-64), collapses into a slide-over drawer on mobile (< 1024px).
 */

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ADMIN_NAV_ITEMS } from "./navigationConfig";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const pathname = usePathname();

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 z-40 bg-black/40 backdrop-blur-xs transition-opacity lg:hidden"
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r border-gray-200 bg-white transition-transform duration-300 ease-in-out lg:static lg:translate-x-0 ${
          isOpen ? "translate-x-0 shadow-2xl" : "-translate-x-full"
        }`}
      >
        {/* Brand Header */}
        <div className="flex h-16 shrink-0 items-center justify-between border-b border-gray-100 px-6">
          <Link href="/admin" onClick={onClose} className="flex items-center gap-2">
            <span className="font-serif text-xl font-bold tracking-tight text-gray-900">
              AL-HAYAT
            </span>
            <span className="rounded-md bg-gray-900 px-2 py-0.5 text-[10px] font-semibold tracking-wider text-white">
              ADMIN
            </span>
          </Link>

          {/* Close button on mobile */}
          <button
            onClick={onClose}
            className="rounded-lg p-1.5 text-gray-400 hover:bg-gray-100 hover:text-gray-600 lg:hidden"
          >
            <span className="material-symbols-outlined text-xl">close</span>
          </button>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-4">
          <div className="px-3 pb-2 text-[11px] font-semibold uppercase tracking-wider text-gray-400">
            Menu
          </div>

          {ADMIN_NAV_ITEMS.map((item) => {
            const isActive =
              item.href === "/admin"
                ? pathname === "/admin"
                : pathname.startsWith(item.href) && item.href !== "#";

            if (item.disabled) {
              return (
                <div
                  key={item.label}
                  className="flex items-center justify-between rounded-lg px-3 py-2.5 text-sm font-medium text-gray-300 cursor-not-allowed select-none"
                >
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-xl text-gray-300">
                      {item.icon}
                    </span>
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <span className="rounded bg-gray-100 px-1.5 py-0.5 text-[10px] font-medium text-gray-400">
                      {item.badge}
                    </span>
                  )}
                </div>
              );
            }

            return (
              <Link
                key={item.label}
                href={item.href}
                onClick={onClose}
                className={`flex items-center justify-between rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-gray-900 text-white shadow-sm"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                }`}
              >
                <div className="flex items-center gap-3">
                  <span
                    className={`material-symbols-outlined text-xl ${
                      isActive ? "text-white" : "text-gray-400"
                    }`}
                  >
                    {item.icon}
                  </span>
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span
                    className={`rounded px-1.5 py-0.5 text-[10px] font-medium ${
                      isActive
                        ? "bg-gray-800 text-gray-200"
                        : "bg-amber-100 text-amber-700"
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Footer Link — Back to site */}
        <div className="border-t border-gray-100 p-4">
          <Link
            href="/"
            target="_blank"
            className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-gray-500 transition-colors hover:bg-gray-50 hover:text-gray-900"
          >
            <span className="material-symbols-outlined text-xl text-gray-400">
              open_in_new
            </span>
            <span>View Public Store</span>
          </Link>
        </div>
      </aside>
    </>
  );
}
