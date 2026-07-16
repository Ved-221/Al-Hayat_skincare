/**
 * Admin Layout
 * Wraps all /admin/* pages with a simple sidebar + top nav.
 * The sidebar renders on the server; no client JS needed.
 */

import Link from "next/link";
import type { ReactNode } from "react";

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* ── Sidebar ────────────────────────────────────────────── */}
      <aside className="w-56 shrink-0 border-r border-gray-200 bg-white">
        {/* Logo / brand */}
        <div className="border-b border-gray-100 px-6 py-5">
          <span className="text-lg font-bold tracking-tight text-gray-900">
            AL-HAYAT
          </span>
          <span className="ml-2 rounded bg-gray-900 px-1.5 py-0.5 text-[10px] font-semibold text-white">
            ADMIN
          </span>
        </div>

        {/* Navigation */}
        <nav className="flex flex-col gap-0.5 p-3">
          <NavItem href="/admin" label="Dashboard" icon="space_dashboard" exact />
          <NavItem href="/admin/products" label="Products" icon="inventory_2" />
        </nav>

        {/* Back to site */}
        <div className="absolute bottom-0 w-56 border-t border-gray-100 p-3">
          <Link
            href="/"
            className="flex items-center gap-2 rounded px-3 py-2 text-sm text-gray-500 hover:bg-gray-50 hover:text-gray-900"
          >
            <span className="material-symbols-outlined text-base">
              arrow_back
            </span>
            Back to site
          </Link>
        </div>
      </aside>

      {/* ── Main content ───────────────────────────────────────── */}
      <main className="flex-1 overflow-auto">{children}</main>
    </div>
  );
}

// ---------------------------------------------------------------------------
// NavItem — active state via CSS :has() trick (no client JS)
// ---------------------------------------------------------------------------

function NavItem({
  href,
  label,
  icon,
  exact = false,
}: {
  href: string;
  label: string;
  icon: string;
  exact?: boolean;
}) {
  // We can't read pathname server-side in a layout without extra work.
  // Using a plain <a> so the browser applies :visited / active styling naturally.
  // For a richer active indicator, we'd promote this to a Client Component.
  return (
    <a
      href={href}
      className="flex items-center gap-2.5 rounded px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 hover:text-gray-900"
    >
      <span className="material-symbols-outlined text-base leading-none">{icon}</span>
      {label}
    </a>
  );
}