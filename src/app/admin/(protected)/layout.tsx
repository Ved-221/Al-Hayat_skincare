/**
 * /admin/(protected)/layout.tsx
 * -----------------------------
 * Server Component Layout for all authenticated admin routes.
 * Calls requireAdmin() on the server to enforce security across every protected page,
 * and renders the responsive AdminLayoutClient around child routes.
 */

import { requireAdmin } from "@/lib/auth";
import type { ReactNode } from "react";
import AdminLayoutClient from "@/components/admin/AdminLayoutClient";

export default async function ProtectedAdminLayout({
  children,
}: {
  children: ReactNode;
}) {
  const user = await requireAdmin();

  return (
    <AdminLayoutClient userEmail={user.email || "Admin"}>
      {children}
    </AdminLayoutClient>
  );
}
