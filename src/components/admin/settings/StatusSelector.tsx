"use client";

import React from "react";
import type { StoreStatus } from "@/types/settings";

interface StatusSelectorProps {
  value: StoreStatus;
  onChange: (status: StoreStatus) => void;
  disabled?: boolean;
}

export default function StatusSelector({
  value,
  onChange,
  disabled = false,
}: StatusSelectorProps) {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {/* Open Option */}
        <label
          onClick={() => !disabled && onChange("Open")}
          className={`relative flex cursor-pointer rounded-xl border p-4 transition-all ${
            disabled ? "opacity-60 cursor-not-allowed" : ""
          } ${
            value === "Open"
              ? "border-emerald-600 bg-emerald-50/50 ring-1 ring-emerald-600 shadow-xs"
              : "border-gray-200 bg-white hover:border-gray-300"
          }`}
        >
          <div className="flex w-full items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                <span className="material-symbols-outlined text-lg">storefront</span>
              </span>
              <div>
                <div className="flex items-center gap-2">
                  <p className="text-sm font-semibold text-gray-900">Open</p>
                  <span className="inline-flex items-center rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-bold text-emerald-800">
                    Active
                  </span>
                </div>
                <p className="mt-0.5 text-xs text-gray-500">
                  Storefront is live and accepting customer orders normally.
                </p>
              </div>
            </div>
            <input
              type="radio"
              name="store_status"
              value="Open"
              checked={value === "Open"}
              onChange={() => onChange("Open")}
              disabled={disabled}
              className="h-4 w-4 border-gray-300 text-emerald-600 focus:ring-emerald-600"
            />
          </div>
        </label>

        {/* Maintenance Option */}
        <label
          onClick={() => !disabled && onChange("Maintenance")}
          className={`relative flex cursor-pointer rounded-xl border p-4 transition-all ${
            disabled ? "opacity-60 cursor-not-allowed" : ""
          } ${
            value === "Maintenance"
              ? "border-amber-600 bg-amber-50/50 ring-1 ring-amber-600 shadow-xs"
              : "border-gray-200 bg-white hover:border-gray-300"
          }`}
        >
          <div className="flex w-full items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-amber-100 text-amber-600">
                <span className="material-symbols-outlined text-lg">construction</span>
              </span>
              <div>
                <div className="flex items-center gap-2">
                  <p className="text-sm font-semibold text-gray-900">Maintenance</p>
                  <span className="inline-flex items-center rounded-full bg-amber-100 px-2 py-0.5 text-[10px] font-bold text-amber-800">
                    Offline
                  </span>
                </div>
                <p className="mt-0.5 text-xs text-gray-500">
                  Storefront is paused and shows maintenance banner / screen.
                </p>
              </div>
            </div>
            <input
              type="radio"
              name="store_status"
              value="Maintenance"
              checked={value === "Maintenance"}
              onChange={() => onChange("Maintenance")}
              disabled={disabled}
              className="h-4 w-4 border-gray-300 text-amber-600 focus:ring-amber-600"
            />
          </div>
        </label>
      </div>

      {/* Informational Warning Banner if Maintenance is selected */}
      {value === "Maintenance" && (
        <div className="rounded-lg border border-amber-200 bg-amber-50 p-4 text-amber-900 shadow-xs animate-fadeIn">
          <div className="flex items-start gap-3">
            <span className="material-symbols-outlined text-amber-600 flex-shrink-0 mt-0.5">
              warning
            </span>
            <div className="text-xs space-y-1">
              <p className="font-semibold text-amber-900">
                Informational Warning: Storefront in Maintenance Mode
              </p>
              <p className="text-amber-800 leading-relaxed">
                When set to Maintenance, the storefront will display a maintenance notice to visiting customers. Admin access and dashboard operations remain fully functional, and you can still preview the storefront.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
