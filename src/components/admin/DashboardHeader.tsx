"use client";

/**
 * DashboardHeader.tsx
 * -------------------
 * Top bar header for the admin dashboard.
 * Purely structural layout component: contains breadcrumb, date, avatar placeholder,
 * and delegates logout to the isolated LogoutButton component.
 */

import Link from "next/link";
import { usePathname } from "next/navigation";
import LogoutButton from "./LogoutButton";

interface DashboardHeaderProps {
  onMenuClick: () => void;
  userEmail?: string;
}

export default function DashboardHeader({
  onMenuClick,
  userEmail = "Admin",
}: DashboardHeaderProps) {
  const pathname = usePathname();

  // Generate breadcrumbs from pathname
  const segments = pathname
    .split("/")
    .filter(Boolean)
    .filter((s) => s !== "admin");

  const todayStr = new Date().toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return (
    <header className="sticky top-0 z-30 flex h-16 w-full items-center justify-between border-b border-gray-200 bg-white/90 px-4 backdrop-blur-md sm:px-6">
      {/* Left section: Hamburger + Breadcrumb / Title */}
      <div className="flex items-center gap-3 sm:gap-4">
        {/* Mobile menu toggle */}
        <button
          onClick={onMenuClick}
          type="button"
          className="rounded-lg p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-900 lg:hidden"
          aria-label="Open sidebar menu"
        >
          <span className="material-symbols-outlined text-2xl leading-none">
            menu
          </span>
        </button>

        {/* Breadcrumbs */}
        <nav className="flex items-center gap-1 text-sm sm:gap-2">
          <Link
            href="/admin"
            className="font-medium text-gray-500 hover:text-gray-900"
          >
            Dashboard
          </Link>
          {segments.map((segment, index) => {
            const isLast = index === segments.length - 1;
            const href = `/admin/${segments.slice(0, index + 1).join("/")}`;
            const label =
              segment.charAt(0).toUpperCase() +
              segment.slice(1).replace(/-/g, " ");

            return (
              <div key={href} className="flex items-center gap-1 sm:gap-2">
                <span className="text-gray-300">/</span>
                {isLast ? (
                  <span className="font-semibold text-gray-900">{label}</span>
                ) : (
                  <Link
                    href={href}
                    className="font-medium text-gray-500 hover:text-gray-900"
                  >
                    {label}
                  </Link>
                )}
              </div>
            );
          })}
        </nav>
      </div>

      {/* Right section: Date, Avatar, Logout */}
      <div className="flex items-center gap-3 sm:gap-5">
        {/* Current Date */}
        <div className="hidden items-center gap-1.5 text-xs font-medium text-gray-500 md:flex">
          <span className="material-symbols-outlined text-base text-gray-400">
            calendar_today
          </span>
          <span>{todayStr}</span>
        </div>

        {/* Divider */}
        <div className="hidden h-5 w-px bg-gray-200 md:block" />

        {/* Admin Avatar + Email */}
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-amber-100 font-semibold text-amber-800 ring-2 ring-white">
            <span className="material-symbols-outlined text-lg">
              admin_panel_settings
            </span>
          </div>
          <span className="hidden max-w-[140px] truncate text-xs font-semibold text-gray-700 sm:block">
            {userEmail}
          </span>
        </div>

        {/* Logout button */}
        <LogoutButton />
      </div>
    </header>
  );
}
