"use client";

import React, { useState } from "react";

export interface DetailedIngredient {
  name: string;
  desc: string;
}

interface IngredientBuilderProps {
  defaultValue?: DetailedIngredient[] | string | null;
}

export default function IngredientBuilder({ defaultValue }: IngredientBuilderProps) {
  const [items, setItems] = useState<DetailedIngredient[]>(() => {
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
    setItems((prev) => [...prev, { name: "", desc: "" }]);
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

  const handleChange = (index: number, field: keyof DetailedIngredient, value: string) => {
    setItems((prev) => {
      const copy = [...prev];
      copy[index] = { ...copy[index], [field]: value };
      return copy;
    });
  };

  return (
    <div className="space-y-4 rounded-xl border border-gray-200 bg-gray-50/50 p-4 sm:p-5">
      {/* Hidden field guaranteeing exact JSON serialization to server action */}
      <input type="hidden" name="detailed_ingredients" value={JSON.stringify(items)} />

      {/* Header & Tabs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-gray-200 pb-3">
        <div>
          <h3 className="text-sm font-semibold text-gray-900">
            Key Botanical Ingredients ({items.length})
          </h3>
          <p className="text-xs text-gray-500">
            Structured formulation breakdown shown on the storefront product details page.
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
              Edit Items
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
            Add Ingredient
          </button>
        </div>
      </div>

      {/* Content Area */}
      {items.length === 0 ? (
        <div className="rounded-xl border-2 border-dashed border-gray-200 bg-white p-8 text-center">
          <span className="material-symbols-outlined mx-auto mb-2 block text-3xl text-gray-300">
            science
          </span>
          <p className="text-xs font-semibold text-gray-700">No ingredients configured yet</p>
          <p className="mt-1 text-[11px] text-gray-400">
            Click &quot;Add Ingredient&quot; to list natural herbs, botanical oils, and active formulations.
          </p>
        </div>
      ) : activeTab === "edit" ? (
        <div className="space-y-3">
          {items.map((item, index) => (
            <div
              key={index}
              className="group relative rounded-xl border border-gray-200 bg-white p-4 shadow-xs transition-shadow hover:shadow-md"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-2">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gray-100 text-xs font-bold text-gray-600">
                    {index + 1}
                  </span>
                  <span className="text-xs font-semibold text-gray-700">Ingredient #{index + 1}</span>
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
                    title="Remove ingredient"
                    className="ml-1 rounded-md p-1 text-red-400 hover:bg-red-50 hover:text-red-700"
                  >
                    <span className="material-symbols-outlined text-base">delete</span>
                  </button>
                </div>
              </div>

              <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-3">
                <div className="sm:col-span-1">
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    Ingredient Name *
                  </label>
                  <input
                    type="text"
                    value={item.name}
                    onChange={(e) => handleChange(index, "name", e.target.value)}
                    placeholder="e.g. Amla (Indian Gooseberry)"
                    required
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-gray-900"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    Botanical Benefit & Description *
                  </label>
                  <input
                    type="text"
                    value={item.desc}
                    onChange={(e) => handleChange(index, "desc", e.target.value)}
                    placeholder="e.g. Rich in Vitamin C, deeply strengthens hair follicles and prevents premature greying."
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
            <p className="text-sm font-semibold text-gray-900">Botanical Formulation</p>
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {items.map((item, index) => (
              <div
                key={index}
                className="flex items-start gap-3 rounded-lg border border-gray-100 bg-gray-50/60 p-3.5"
              >
                <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#434b01]/10 text-[#434b01]">
                  <span className="material-symbols-outlined text-base">eco</span>
                </div>
                <div>
                  <h5 className="text-xs font-bold text-gray-900">
                    {item.name || `[Ingredient #${index + 1} Name]`}
                  </h5>
                  <p className="mt-0.5 text-[11px] leading-relaxed text-gray-600">
                    {item.desc || `[Enter the botanical benefits above to preview...]`}
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
