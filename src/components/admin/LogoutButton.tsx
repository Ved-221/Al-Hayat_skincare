"use client";

/**
 * LogoutButton.tsx
 * ----------------
 * Isolated client component for logging out of the admin panel.
 * Keeps the DashboardHeader layout component separated from auth business logic.
 */

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase-browser";

export default function LogoutButton() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  async function handleLogout() {
    setLoading(true);
    try {
      await supabase.auth.signOut();
      router.replace("/admin/login");
      router.refresh();
    } catch (err) {
      console.error("Logout failed:", err);
      setLoading(false);
    }
  }

  return (
    <button
      onClick={handleLogout}
      disabled={loading}
      type="button"
      className="flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-3.5 py-1.5 text-sm font-medium text-gray-700 shadow-sm transition-all hover:bg-red-50 hover:text-red-600 hover:border-red-200 disabled:opacity-50"
      title="Logout of admin session"
    >
      <span className="material-symbols-outlined text-lg leading-none">
        logout
      </span>
      <span className="hidden sm:inline">{loading ? "Logging out..." : "Logout"}</span>
    </button>
  );
}
