/**
 * /admin/settings — Store Settings Page (Server Component)
 * --------------------------------------------------------
 * Fetches current store settings and renders the interactive client form.
 */

import React from "react";
import { requireAdmin } from "@/lib/auth";
import { getStoreSettings } from "@/services/settingsService";
import SettingsForm from "@/components/admin/settings/SettingsForm";

export const metadata = {
  title: "Store Settings — Admin | AL-HAYAT",
};

export default async function AdminSettingsPage() {
  await requireAdmin();
  const settings = await getStoreSettings();

  return (
    <div className="mx-auto max-w-5xl space-y-6 pb-16">
      {/* Page Header */}
      <div>
        <h1 className="font-serif text-2xl font-bold text-gray-900 sm:text-3xl">
          Store Settings
        </h1>
        <p className="mt-1 text-sm text-gray-500">
          Manage core business information, branding, contact details, social links, and store operational status.
        </p>
      </div>

      {/* Interactive Form */}
      <SettingsForm initialSettings={settings} />
    </div>
  );
}
