"use client";

import React from "react";

interface SettingsSectionProps {
  title: string;
  description: string;
  children: React.ReactNode;
  badge?: string;
}

export default function SettingsSection({
  title,
  description,
  children,
  badge,
}: SettingsSectionProps) {
  return (
    <section className="grid grid-cols-1 gap-6 pt-6 border-t border-gray-200 md:grid-cols-3 md:gap-8 first:pt-0 first:border-t-0">
      {/* Section Info (Left column on desktop) */}
      <div className="md:col-span-1">
        <div className="flex items-center gap-2">
          <h2 className="text-base font-semibold leading-6 text-gray-900">{title}</h2>
          {badge && (
            <span className="inline-flex items-center rounded-full bg-amber-50 px-2 py-0.5 text-[10px] font-medium text-amber-800 border border-amber-200">
              {badge}
            </span>
          )}
        </div>
        <p className="mt-1 text-sm text-gray-500 leading-relaxed">{description}</p>
      </div>

      {/* Section Form Content (Right columns on desktop) */}
      <div className="md:col-span-2 space-y-6">
        {children}
      </div>
    </section>
  );
}
