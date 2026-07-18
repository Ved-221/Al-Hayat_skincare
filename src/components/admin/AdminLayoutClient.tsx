"use client";

/**
 * AdminLayoutClient.tsx
 * ---------------------
 * Client shell that manages the mobile sidebar toggle state (`isSidebarOpen`)
 * and coordinates rendering between Sidebar, DashboardHeader, and children.
 */

import { useState, type ReactNode } from "react";
import Sidebar from "./Sidebar";
import DashboardHeader from "./DashboardHeader";

interface AdminLayoutClientProps {
  children: ReactNode;
  userEmail?: string;
}

export default function AdminLayoutClient({
  children,
  userEmail,
}: AdminLayoutClientProps) {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-gray-50/70 text-gray-900 antialiased">
      {/* Sidebar (Fixed on desktop, slide-over on mobile) */}
      <Sidebar
        isOpen={isSidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      {/* Main Content Area */}
      <div className="flex flex-1 flex-col overflow-x-hidden">
        <DashboardHeader
          onMenuClick={() => setSidebarOpen(true)}
          userEmail={userEmail}
        />

        <main className="flex-1 p-4 sm:p-6 lg:p-8">{children}</main>
      </div>
    </div>
  );
}
