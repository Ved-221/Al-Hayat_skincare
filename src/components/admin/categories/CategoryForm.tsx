"use client";

import React, { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createCategoryAction, updateCategoryAction } from "@/app/admin/(protected)/categories/actions";
import type { Category, CategoryVisibility } from "@/types/category";
import { CATEGORY_VISIBILITY } from "@/types/category";

interface CategoryFormProps {
  initialData?: Category | null;
}

export default function CategoryForm({ initialData }: CategoryFormProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const isEditing = Boolean(initialData?.id);

  const [name, setName] = useState(initialData?.name || "");
  const [slug, setSlug] = useState(initialData?.slug || "");
  const [description, setDescription] = useState(initialData?.description || "");
  const [thumbnailUrl, setThumbnailUrl] = useState(initialData?.thumbnail_url || "");
  const [bannerUrl, setBannerUrl] = useState(initialData?.banner_url || "");
  const [altText, setAltText] = useState(initialData?.alt_text || "");
  const [visibility, setVisibility] = useState<CategoryVisibility>(
    initialData?.visibility || CATEGORY_VISIBILITY.VISIBLE
  );
  const [isFeatured, setIsFeatured] = useState(initialData?.is_featured || false);
  const [sortOrder, setSortOrder] = useState<number>(initialData?.sort_order ?? 10);
  const [metaTitle, setMetaTitle] = useState(initialData?.meta_title || "");
  const [metaDescription, setMetaDescription] = useState(initialData?.meta_description || "");
  const [metaKeywords, setMetaKeywords] = useState(initialData?.meta_keywords || "");

  const [autoSlug, setAutoSlug] = useState(!isEditing);
  const [globalError, setGlobalError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string[]>>({});

  // Auto-generate slug when name changes and autoSlug is enabled
  const handleNameChange = (val: string) => {
    setName(val);
    if (autoSlug) {
      const generated = val
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, "")
        .trim()
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-");
      setSlug(generated);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setGlobalError(null);
    setFieldErrors({});

    startTransition(async () => {
      const payload = {
        name: name.trim(),
        slug: slug.trim(),
        description: description.trim() || null,
        thumbnail_url: thumbnailUrl.trim() || null,
        banner_url: bannerUrl.trim() || null,
        alt_text: altText.trim() || null,
        visibility,
        is_featured: isFeatured,
        sort_order: Number(sortOrder),
        meta_title: metaTitle.trim() || null,
        meta_description: metaDescription.trim() || null,
        meta_keywords: metaKeywords.trim() || null,
      };

      let res;
      if (isEditing && initialData?.id) {
        res = await updateCategoryAction(initialData.id, payload);
      } else {
        res = await createCategoryAction(payload);
      }

      if (res.success) {
        router.push("/admin/categories");
        router.refresh();
      } else {
        setGlobalError(res.error || "Failed to save category");
        if (res.errors) {
          setFieldErrors(res.errors);
        }
      }
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 animate-fadeIn">
      {globalError && (
        <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm font-medium text-red-700 flex items-center gap-2">
          <span className="material-symbols-outlined text-red-600">error</span>
          <span>{globalError}</span>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left 2 Columns: Main Details & SEO */}
        <div className="lg:col-span-2 space-y-6">
          {/* General Information Card */}
          <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-xs space-y-5">
            <h3 className="text-base font-bold text-gray-900 border-b pb-3">
              General Information
            </h3>

            {/* Name */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700">
                Category Name *
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => handleNameChange(e.target.value)}
                placeholder="e.g. Hair Care, Handmade Soaps..."
                className="mt-1.5 w-full rounded-lg border border-gray-200 py-2.5 px-3.5 text-sm text-gray-900 outline-hidden focus:border-gray-900 transition-colors"
              />
              {fieldErrors.name && (
                <p className="mt-1 text-xs text-red-600">{fieldErrors.name.join(", ")}</p>
              )}
            </div>

            {/* Slug */}
            <div>
              <div className="flex items-center justify-between">
                <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700">
                  Slug *
                </label>
                <button
                  type="button"
                  onClick={() => {
                    setAutoSlug(!autoSlug);
                    if (!autoSlug && name) {
                      handleNameChange(name);
                    }
                  }}
                  className="text-xs font-medium text-blue-600 hover:text-blue-800 transition-colors cursor-pointer"
                >
                  {autoSlug ? "Unlock manual slug" : "Lock to auto-generate"}
                </button>
              </div>
              <div className="mt-1.5 flex rounded-lg border border-gray-200 overflow-hidden focus-within:border-gray-900 transition-colors">
                <span className="bg-gray-50 px-3 py-2.5 text-xs text-gray-500 border-r border-gray-200 font-mono flex items-center select-none">
                  /products/
                </span>
                <input
                  type="text"
                  required
                  value={slug}
                  onChange={(e) => {
                    setAutoSlug(false);
                    setSlug(e.target.value);
                  }}
                  placeholder="hair-care"
                  className="w-full py-2.5 px-3.5 text-sm font-mono text-gray-900 outline-hidden bg-white"
                />
              </div>
              <p className="mt-1 text-xs text-gray-500">
                Unique identifier used in URL paths. Only lowercase alphanumeric characters and hyphens allowed.
              </p>
              {fieldErrors.slug && (
                <p className="mt-1 text-xs text-red-600">{fieldErrors.slug.join(", ")}</p>
              )}
            </div>

            {/* Description */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700">
                Description
              </label>
              <textarea
                rows={4}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Brief description of products featured inside this category..."
                className="mt-1.5 w-full rounded-lg border border-gray-200 py-2.5 px-3.5 text-sm text-gray-900 outline-hidden focus:border-gray-900 transition-colors"
              />
              {fieldErrors.description && (
                <p className="mt-1 text-xs text-red-600">{fieldErrors.description.join(", ")}</p>
              )}
            </div>
          </div>

          {/* Media Card */}
          <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-xs space-y-5">
            <h3 className="text-base font-bold text-gray-900 border-b pb-3">
              Media & Banners
            </h3>

            {/* Thumbnail URL */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700">
                Thumbnail URL
              </label>
              <div className="mt-1.5 flex gap-4 items-center">
                <input
                  type="url"
                  value={thumbnailUrl}
                  onChange={(e) => setThumbnailUrl(e.target.value)}
                  placeholder="https://.../thumbnail.jpg"
                  className="flex-1 rounded-lg border border-gray-200 py-2.5 px-3.5 text-sm text-gray-900 outline-hidden focus:border-gray-900 transition-colors"
                />
                <div className="h-12 w-12 shrink-0 rounded-lg border border-gray-200 bg-gray-50 overflow-hidden flex items-center justify-center">
                  {thumbnailUrl ? (
                    <img
                      src={thumbnailUrl}
                      alt="Preview"
                      className="h-full w-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLElement).style.display = "none";
                      }}
                    />
                  ) : (
                    <span className="material-symbols-outlined text-gray-400 text-xl">image</span>
                  )}
                </div>
              </div>
              {fieldErrors.thumbnail_url && (
                <p className="mt-1 text-xs text-red-600">{fieldErrors.thumbnail_url.join(", ")}</p>
              )}
            </div>

            {/* Banner URL */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700">
                Banner URL (Storefront Header)
              </label>
              <div className="mt-1.5 flex gap-4 items-center">
                <input
                  type="url"
                  value={bannerUrl}
                  onChange={(e) => setBannerUrl(e.target.value)}
                  placeholder="https://.../banner-wide.jpg"
                  className="flex-1 rounded-lg border border-gray-200 py-2.5 px-3.5 text-sm text-gray-900 outline-hidden focus:border-gray-900 transition-colors"
                />
                <div className="h-12 w-24 shrink-0 rounded-lg border border-gray-200 bg-gray-50 overflow-hidden flex items-center justify-center">
                  {bannerUrl ? (
                    <img
                      src={bannerUrl}
                      alt="Banner Preview"
                      className="h-full w-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLElement).style.display = "none";
                      }}
                    />
                  ) : (
                    <span className="material-symbols-outlined text-gray-400 text-xl">panorama</span>
                  )}
                </div>
              </div>
              {fieldErrors.banner_url && (
                <p className="mt-1 text-xs text-red-600">{fieldErrors.banner_url.join(", ")}</p>
              )}
            </div>

            {/* Alt Text */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700">
                Image Alt Text
              </label>
              <input
                type="text"
                value={altText}
                onChange={(e) => setAltText(e.target.value)}
                placeholder="Descriptive text for accessibility and SEO..."
                className="mt-1.5 w-full rounded-lg border border-gray-200 py-2.5 px-3.5 text-sm text-gray-900 outline-hidden focus:border-gray-900 transition-colors"
              />
              {fieldErrors.alt_text && (
                <p className="mt-1 text-xs text-red-600">{fieldErrors.alt_text.join(", ")}</p>
              )}
            </div>
          </div>

          {/* SEO Metadata Card */}
          <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-xs space-y-5">
            <h3 className="text-base font-bold text-gray-900 border-b pb-3 flex items-center justify-between">
              <span>Search Engine Optimization (SEO)</span>
              <span className="text-xs font-normal text-gray-400">Optional</span>
            </h3>

            {/* Meta Title */}
            <div>
              <div className="flex items-center justify-between">
                <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700">
                  Meta Title
                </label>
                <span className={`text-xs ${metaTitle.length > 60 ? "text-red-600 font-bold" : "text-gray-400"}`}>
                  {metaTitle.length} / 60
                </span>
              </div>
              <input
                type="text"
                value={metaTitle}
                onChange={(e) => setMetaTitle(e.target.value)}
                placeholder="Natural Organic Hair Care Products | AL-HAYAT"
                className="mt-1.5 w-full rounded-lg border border-gray-200 py-2.5 px-3.5 text-sm text-gray-900 outline-hidden focus:border-gray-900 transition-colors"
              />
            </div>

            {/* Meta Description */}
            <div>
              <div className="flex items-center justify-between">
                <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700">
                  Meta Description
                </label>
                <span className={`text-xs ${metaDescription.length > 160 ? "text-red-600 font-bold" : "text-gray-400"}`}>
                  {metaDescription.length} / 160
                </span>
              </div>
              <textarea
                rows={3}
                value={metaDescription}
                onChange={(e) => setMetaDescription(e.target.value)}
                placeholder="Shop premium organic skincare and natural oils crafted for radiant skin..."
                className="mt-1.5 w-full rounded-lg border border-gray-200 py-2.5 px-3.5 text-sm text-gray-900 outline-hidden focus:border-gray-900 transition-colors"
              />
            </div>

            {/* Meta Keywords */}
            <div>
              <div className="flex items-center justify-between">
                <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700">
                  Meta Keywords
                </label>
                <span className="text-xs text-gray-400">Comma separated</span>
              </div>
              <input
                type="text"
                value={metaKeywords}
                onChange={(e) => setMetaKeywords(e.target.value)}
                placeholder="skincare, hair oil, natural soaps, organic skincare"
                className="mt-1.5 w-full rounded-lg border border-gray-200 py-2.5 px-3.5 text-sm text-gray-900 outline-hidden focus:border-gray-900 transition-colors"
              />
            </div>
          </div>
        </div>

        {/* Right 1 Column: Status, Ordering & Actions */}
        <div className="space-y-6">
          {/* Status & Visibility Card */}
          <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-xs space-y-5">
            <h3 className="text-base font-bold text-gray-900 border-b pb-3">
              Organization & Visibility
            </h3>

            {/* Visibility Switch */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700 mb-2">
                Visibility Status
              </label>
              <div className="grid grid-cols-2 gap-2 p-1 bg-gray-100 rounded-lg border border-gray-200">
                <button
                  type="button"
                  onClick={() => setVisibility(CATEGORY_VISIBILITY.VISIBLE)}
                  className={`py-2 px-3 text-xs font-semibold rounded-md transition-colors cursor-pointer ${
                    visibility === CATEGORY_VISIBILITY.VISIBLE
                      ? "bg-white text-green-700 shadow-xs border border-green-200"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  ✓ Visible
                </button>
                <button
                  type="button"
                  onClick={() => setVisibility(CATEGORY_VISIBILITY.HIDDEN)}
                  className={`py-2 px-3 text-xs font-semibold rounded-md transition-colors cursor-pointer ${
                    visibility === CATEGORY_VISIBILITY.HIDDEN
                      ? "bg-white text-gray-800 shadow-xs border border-gray-300"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  ✕ Hidden
                </button>
              </div>
              <p className="mt-1.5 text-xs text-gray-500">
                Hidden categories disappear from public storefront navigation but remain linked to existing products.
              </p>
            </div>

            {/* Featured Toggle */}
            <div className="pt-3 border-t border-gray-100">
              <label className="flex items-center justify-between cursor-pointer">
                <div>
                  <span className="block text-xs font-semibold uppercase tracking-wider text-gray-700">
                    Featured Category
                  </span>
                  <span className="text-xs text-gray-500">
                    Highlight on homepage and prominent storefront sections.
                  </span>
                </div>
                <input
                  type="checkbox"
                  checked={isFeatured}
                  onChange={(e) => setIsFeatured(e.target.checked)}
                  className="rounded border-gray-300 text-amber-600 focus:ring-amber-500 h-5 w-5 cursor-pointer"
                />
              </label>
            </div>

            {/* Sort Order */}
            <div className="pt-3 border-t border-gray-100">
              <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700">
                Sort Order
              </label>
              <input
                type="number"
                value={sortOrder}
                onChange={(e) => setSortOrder(Number(e.target.value))}
                className="mt-1.5 w-full rounded-lg border border-gray-200 py-2.5 px-3.5 text-sm font-mono text-gray-900 outline-hidden focus:border-gray-900 transition-colors"
              />
              <p className="mt-1.5 text-xs text-gray-500">
                Lower values display first (e.g. 10, 20, 30). You can also drag-and-drop rows directly in the categories table.
              </p>
            </div>
          </div>

          {/* Form Submit Buttons */}
          <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-xs space-y-3">
            <button
              type="submit"
              disabled={isPending}
              className="w-full rounded-lg bg-gray-900 py-3 px-4 text-sm font-bold text-white shadow-md hover:bg-gray-800 focus:outline-hidden focus:ring-2 focus:ring-gray-900 focus:ring-offset-2 transition-all disabled:opacity-50 cursor-pointer flex items-center justify-center gap-2"
            >
              {isPending ? (
                <>
                  <span className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full" />
                  Saving Category...
                </>
              ) : isEditing ? (
                "Save Changes"
              ) : (
                "Create Category"
              )}
            </button>

            <Link
              href="/admin/categories"
              className="block w-full text-center rounded-lg border border-gray-200 bg-white py-2.5 px-4 text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Cancel & Return
            </Link>
          </div>
        </div>
      </div>
    </form>
  );
}
