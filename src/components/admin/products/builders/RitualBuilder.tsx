"use client";

import React, { useState } from "react";

export interface RitualStep {
  icon: string;
  step: string;
  desc: string;
}

interface RitualBuilderProps {
  defaultValue?: RitualStep[] | string | null;
}

const RITUAL_ICONS = [
  { icon: "clean_hands", label: "Apply / Massage" },
  { icon: "water_drop", label: "Rinse / Wash" },
  { icon: "schedule", label: "Wait / Time" },
  { icon: "wb_sunny", label: "Morning Ritual" },
  { icon: "bedtime", label: "Evening Ritual" },
  { icon: "spa", label: "Botanical Infusion" },
  { icon: "auto_awesome", label: "Final Glow" },
];

export default function RitualBuilder({ defaultValue }: RitualBuilderProps) {
  const [items, setItems] = useState<RitualStep[]>(() => {
    if (!defaultValue) return [];
    if (Array.isArray(defaultValue)) return defaultValue;
    try {
      const parsed = JSON.parse(defaultValue);
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  });

  const [activeTab, setActiveTab] = useState<"edit" | "preview">("edit");

  const handleAddItem = () => {
    setItems((prev) => [
      ...prev,
      { icon: "clean_hands", step: `Step ${prev.length + 1}: `, desc: "" },
    ]);
    setActiveTab("edit");
  };

  const handleRemoveItem = (index: number) => {
    setItems((prev) => prev.filter((_, i) => i !== index));
  };

  const handleMove = (index: number, direction: "up" | "down") => {
    setItems((prev) => {
      const copy = [...prev];
      const targetIndex = direction === "up" ? index - 1 : index + 1;
      if (targetIndex < 0 || targetIndex >= copy.length) return copy;
      const temp = copy[index];
      copy[index] = copy[targetIndex];
      copy[targetIndex] = temp;
      return copy;
    });
  };

  const handleChange = (index: number, field: keyof RitualStep, value: string) => {
    setItems((prev) => {
      const copy = [...prev];
      copy[index] = { ...copy[index], [field]: value };
      return copy;
    });
  };

  return (
    <div className="space-y-4 rounded-xl border border-gray-200 bg-gray-50/50 p-4 sm:p-5">
      {/* Hidden field guaranteeing exact JSON serialization to server action */}
      <input type="hidden" name="ritual" value={JSON.stringify(items)} />

      {/* Header & Tabs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-gray-200 pb-3">
        <div>
          <h3 className="text-sm font-semibold text-gray-900">
            Daily Usage Ritual Steps ({items.length})
          </h3>
          <p className="text-xs text-gray-500">
            Step-by-step application instructions for best therapeutic results.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="inline-flex rounded-lg bg-gray-200/80 p-0.5 text-xs font-semibold">
            <button
              type="button"
              onClick={() => setActiveTab("edit")}
              className={`rounded-md px-3 py-1.5 transition-all ${
                activeTab === "edit"
                  ? "bg-white text-gray-900 shadow-xs"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Edit Steps
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("preview")}
              className={`rounded-md px-3 py-1.5 transition-all flex items-center gap-1 ${
                activeTab === "preview"
                  ? "bg-white text-gray-900 shadow-xs"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              <span className="material-symbols-outlined text-sm">visibility</span>
              Live Preview
            </button>
          </div>

          <button
            type="button"
            onClick={handleAddItem}
            className="inline-flex items-center gap-1 rounded-lg bg-gray-900 px-3.5 py-1.5 text-xs font-semibold text-white shadow-xs hover:bg-gray-800 transition-colors"
          >
            <span className="material-symbols-outlined text-base">add</span>
            Add Step
          </button>
        </div>
      </div>

      {/* Content Area */}
      {items.length === 0 ? (
        <div className="rounded-xl border-2 border-dashed border-gray-200 bg-white p-8 text-center">
          <span className="material-symbols-outlined mx-auto mb-2 block text-3xl text-gray-300">
            format_list_numbered
          </span>
          <p className="text-xs font-semibold text-gray-700">No usage steps configured yet</p>
          <p className="mt-1 text-[11px] text-gray-400">
            Click "Add Step" to guide customers on exact application rituals and timings.
          </p>
        </div>
      ) : activeTab === "edit" ? (
        <div className="space-y-3">
          {items.map((item, index) => (
            <div
              key={index}
              className="group relative rounded-xl border border-gray-200 bg-white p-4 shadow-xs transition-shadow hover:shadow-md"
            >
              <div className="flex items-start justify-between gap-4 border-b border-gray-100 pb-3 mb-3">
                <div className="flex items-center gap-2">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gray-900 text-xs font-bold text-white">
                    {index + 1}
                  </span>
                  <span className="text-xs font-semibold text-gray-900">Ritual Step #{index + 1}</span>
                </div>

                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={() => handleMove(index, "up")}
                    disabled={index === 0}
                    title="Move up"
                    className="rounded-md p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-700 disabled:opacity-30"
                  >
                    <span className="material-symbols-outlined text-base">arrow_upward</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleMove(index, "down")}
                    disabled={index === items.length - 1}
                    title="Move down"
                    className="rounded-md p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-700 disabled:opacity-30"
                  >
                    <span className="material-symbols-outlined text-base">arrow_downward</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleRemoveItem(index)}
                    title="Remove step"
                    className="ml-1 rounded-md p-1 text-red-400 hover:bg-red-50 hover:text-red-700"
                  >
                    <span className="material-symbols-outlined text-base">delete</span>
                  </button>
                </div>
              </div>

              {/* Step Inputs */}
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-12">
                <div className="sm:col-span-3">
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    Step Action Icon *
                  </label>
                  <select
                    value={item.icon}
                    onChange={(e) => handleChange(index, "icon", e.target.value)}
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-gray-900 bg-white"
                  >
                    {RITUAL_ICONS.map((p) => (
                      <option key={p.icon} value={p.icon}>
                        {p.label} ({p.icon})
                      </option>
                    ))}
                  </select>
                </div>

                <div className="sm:col-span-4">
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    Step Heading *
                  </label>
                  <input
                    type="text"
                    value={item.step}
                    onChange={(e) => handleChange(index, "step", e.target.value)}
                    placeholder="e.g. Step 1: Warm & Warm"
                    required
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-gray-900"
                  />
                </div>

                <div className="sm:col-span-5">
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    Instruction / Guidance *
                  </label>
                  <input
                    type="text"
                    value={item.desc}
                    onChange={(e) => handleChange(index, "desc", e.target.value)}
                    placeholder="e.g. Take 3-5ml and massage gently into scalp using circular motions for 5 minutes."
                    required
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-gray-900"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* Storefront Live Preview Card */
        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-xs">
          <div className="mb-4 border-b border-gray-150 pb-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-gray-400">
              Storefront Preview
            </h4>
            <p className="text-sm font-semibold text-gray-900">How to Use (The Daily Ritual)</p>
          </div>

          <div className="space-y-3">
            {items.map((item, index) => (
              <div
                key={index}
                className="flex items-start gap-4 rounded-xl border border-gray-100 bg-gray-50/60 p-4"
              >
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#434b01] text-white font-bold text-xs">
                  {index + 1}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-base text-[#434b01]">
                      {item.icon || "clean_hands"}
                    </span>
                    <h5 className="text-xs font-bold text-gray-900">
                      {item.step || `[Step #${index + 1}]`}
                    </h5>
                  </div>
                  <p className="mt-1 text-[11px] leading-relaxed text-gray-600">
                    {item.desc || `[Enter application instructions above to preview...]`}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
