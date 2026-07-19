"use client";

import React from "react";

interface SettingsCardProps {
  children: React.ReactNode;
  className?: string;
  title?: string;
  description?: string;
}

export default function SettingsCard({
  children,
  className = "",
  title,
  description,
}: SettingsCardProps) {
  return (
    <div className={`rounded-xl border border-gray-200 bg-white p-6 shadow-xs transition-all ${className}`}>
      {(title || description) && (
        <div className="mb-4 border-b border-gray-100 pb-3">
          {title && <h3 className="text-base font-semibold text-gray-900">{title}</h3>}
          {description && <p className="mt-0.5 text-xs text-gray-500">{description}</p>}
        </div>
      )}
      {children}
    </div>
  );
}
