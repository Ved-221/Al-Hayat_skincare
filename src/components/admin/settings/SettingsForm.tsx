"use client";

import React, { useState, useEffect, useTransition } from "react";
import type { StoreSettings, StoreStatus } from "@/types/settings";
import { StoreSettingsSchema } from "@/types/settings";
import { updateStoreSettingsAction } from "@/app/admin/(protected)/settings/actions";
import SettingsSection from "./SettingsSection";
import SettingsCard from "./SettingsCard";
import ImagePreview from "./ImagePreview";
import StatusSelector from "./StatusSelector";
import ImageUploader from "@/components/admin/ImageUploader";

interface SettingsFormProps {
  initialSettings: StoreSettings;
}

export default function SettingsForm({ initialSettings }: SettingsFormProps) {
  const [formData, setFormData] = useState<StoreSettings>(initialSettings);
  const [errors, setErrors] = useState<Record<string, string[]>>({});
  const [toast, setToast] = useState<{ type: "success" | "error"; message: string } | null>(null);
  const [isPending, startTransition] = useTransition();

  // Dirty state detection
  const isDirty = JSON.stringify(formData) !== JSON.stringify(initialSettings);

  // Warn before leaving with unsaved changes
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (isDirty && !isPending) {
        e.preventDefault();
        e.returnValue = "You have unsaved changes. Are you sure you want to leave?";
        return e.returnValue;
      }
    };
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [isDirty, isPending]);

  // Auto-dismiss toast
  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => setToast(null), 5000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    let parsedValue: any = value;
    if (type === "number") {
      parsedValue = value === "" ? 0 : Number(value);
    }

    setFormData((prev) => ({
      ...prev,
      [name]: parsedValue,
    }));

    // Clear inline error when typing
    if (errors[name]) {
      setErrors((prev) => {
        const copy = { ...prev };
        delete copy[name];
        return copy;
      });
    }
  };

  const handleStatusChange = (status: StoreStatus) => {
    setFormData((prev) => ({
      ...prev,
      store_status: status,
    }));
  };

  const handleCancel = () => {
    setFormData(initialSettings);
    setErrors({});
    setToast({ type: "success", message: "Form reset to current saved settings." });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    setToast(null);

    // Client-side Zod validation pass
    const validationResult = StoreSettingsSchema.safeParse(formData);
    if (!validationResult.success) {
      const fieldErrors = validationResult.error.flatten().fieldErrors;
      setErrors(fieldErrors);
      setToast({
        type: "error",
        message: "Please correct the highlighted validation errors before saving.",
      });
      // Scroll to top or first error
      window.scrollTo({ top: 150, behavior: "smooth" });
      return;
    }

    startTransition(async () => {
      const res = await updateStoreSettingsAction(validationResult.data);
      if (res.success) {
        setFormData(res.data);
        setToast({
          type: "success",
          message: "✓ Store settings updated and synchronized across all pages successfully!",
        });
      } else {
        if (res.errors) {
          setErrors(res.errors);
        }
        setToast({
          type: "error",
          message: res.error || "Failed to save settings. Please check errors.",
        });
      }
    });
  };

  const inputClass = (fieldName: string) =>
    `w-full rounded-lg border ${
      errors[fieldName]
        ? "border-red-500 bg-red-50/30 focus:border-red-500 focus:ring-red-500 text-red-900"
        : "border-gray-300 bg-white focus:border-gray-900 focus:ring-gray-900 text-gray-900"
    } px-3.5 py-2.5 text-sm transition-colors disabled:bg-gray-100 disabled:text-gray-500 disabled:cursor-not-allowed shadow-2xs`;

  const renderError = (fieldName: string) => {
    if (!errors[fieldName]?.length) return null;
    return (
      <p className="mt-1.5 text-xs font-medium text-red-600 flex items-center gap-1">
        <span className="material-symbols-outlined text-sm">error</span>
        {errors[fieldName][0]}
      </p>
    );
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-12 pb-24">
      {/* Toast notification */}
      {toast && (
        <div
          className={`fixed bottom-6 right-6 z-50 flex items-center gap-3 rounded-xl px-5 py-4 shadow-xl transition-all animate-bounce ${
            toast.type === "success"
              ? "bg-gray-900 text-white border border-gray-700"
              : "bg-red-600 text-white border border-red-500"
          }`}
        >
          <span className="material-symbols-outlined text-xl">
            {toast.type === "success" ? "check_circle" : "error"}
          </span>
          <p className="text-sm font-medium">{toast.message}</p>
          <button
            type="button"
            onClick={() => setToast(null)}
            className="ml-2 rounded-lg p-1 text-white/80 hover:bg-white/10"
          >
            <span className="material-symbols-outlined text-base">close</span>
          </button>
        </div>
      )}

      {/* Unsaved changes alert bar */}
      {isDirty && (
        <div className="sticky top-20 z-30 flex items-center justify-between gap-4 rounded-xl border border-amber-300 bg-amber-50 px-5 py-3.5 text-amber-900 shadow-md transition-all">
          <div className="flex items-center gap-2.5">
            <span className="material-symbols-outlined text-amber-600 animate-pulse">
              edit_note
            </span>
            <p className="text-xs sm:text-sm font-semibold">
              You have unsaved modifications in your store configuration.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleCancel}
              disabled={isPending}
              className="rounded-lg bg-white px-3 py-1.5 text-xs font-semibold text-gray-700 border border-gray-300 hover:bg-gray-50 disabled:opacity-50"
            >
              Reset
            </button>
            <button
              type="submit"
              disabled={isPending}
              className="rounded-lg bg-gray-900 px-3.5 py-1.5 text-xs font-semibold text-white shadow-xs hover:bg-black disabled:opacity-50 flex items-center gap-1.5"
            >
              {isPending && (
                <span className="h-3 w-3 animate-spin rounded-full border-2 border-white/30 border-t-white" />
              )}
              Save Now
            </button>
          </div>
        </div>
      )}

      {/* SECTION 1: Store Information */}
      <SettingsSection
        title="Store Information"
        description="Public identity of your business across navigation bars, metadata titles, and order invoices."
        badge="General"
      >
        <SettingsCard>
          <div className="space-y-5">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700 mb-1.5">
                Store Name *
              </label>
              <input
                type="text"
                name="store_name"
                value={formData.store_name}
                onChange={handleChange}
                disabled={isPending}
                placeholder="AL-HAYAT"
                className={inputClass("store_name")}
              />
              <p className="mt-1 text-[11px] text-gray-400">
                Primary business name displayed across header and metadata.
              </p>
              {renderError("store_name")}
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700 mb-1.5">
                Store Tagline *
              </label>
              <input
                type="text"
                name="store_tagline"
                value={formData.store_tagline}
                onChange={handleChange}
                disabled={isPending}
                placeholder="Premium herbal skincare & haircare by Dr. Farheen..."
                className={inputClass("store_tagline")}
              />
              <p className="mt-1 text-[11px] text-gray-400">
                Short subtitle describing brand essence shown next to logo or hero banners.
              </p>
              {renderError("store_tagline")}
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700 mb-1.5">
                Store Description *
              </label>
              <textarea
                name="store_description"
                rows={3}
                value={formData.store_description}
                onChange={handleChange}
                disabled={isPending}
                placeholder="Handcrafted botanical formulations..."
                className={inputClass("store_description")}
              />
              <p className="mt-1 text-[11px] text-gray-400">
                Comprehensive overview used for SEO meta descriptions and about sections.
              </p>
              {renderError("store_description")}
            </div>
          </div>
        </SettingsCard>
      </SettingsSection>

      {/* SECTION 2: Branding */}
      <SettingsSection
        title="Branding & Assets"
        description="Configure your primary logo and browser favicon URLs. Live preview renders automatically."
        badge="Assets"
      >
        <SettingsCard>
          <div className="space-y-6">
            <div>
              <ImageUploader
                name="logo_url"
                label="Store Logo"
                defaultValue={formData.logo_url}
                folder="settings"
                hint="This logo appears in the website header and navigation bar. Recommended format: PNG with transparent background."
                onChange={(url) => setFormData((prev) => ({ ...prev, logo_url: url }))}
              />
              {renderError("logo_url")}
            </div>

            <div className="border-t border-gray-100 pt-6">
              <ImageUploader
                name="favicon_url"
                label="Browser Icon (Favicon)"
                defaultValue={formData.favicon_url}
                folder="settings"
                hint="Small square icon displayed in browser tabs and bookmarks. Recommended format: PNG or ICO (32x32)."
                onChange={(url) => setFormData((prev) => ({ ...prev, favicon_url: url }))}
              />
              {renderError("favicon_url")}
            </div>
          </div>
        </SettingsCard>
      </SettingsSection>

      {/* SECTION 3: Contact Information */}
      <SettingsSection
        title="Contact Information"
        description="Public contact details displayed across the footer, contact us page, and customer support channels."
        badge="Support"
      >
        <SettingsCard>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700 mb-1.5">
                Store Email (Primary Contact) *
              </label>
              <input
                type="email"
                name="business_email"
                value={formData.business_email}
                onChange={handleChange}
                disabled={isPending}
                placeholder="info@alhayat.in"
                className={inputClass("business_email")}
              />
              <p className="mt-1 text-[11px] text-gray-400">
                Primary contact email displayed on the store contact page.
              </p>
              {renderError("business_email")}
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700 mb-1.5">
                Customer Support Email *
              </label>
              <input
                type="email"
                name="support_email"
                value={formData.support_email}
                onChange={handleChange}
                disabled={isPending}
                placeholder="support@alhayat.in"
                className={inputClass("support_email")}
              />
              <p className="mt-1 text-[11px] text-gray-400">
                Dedicated email where order inquiries and customer support requests are sent.
              </p>
              {renderError("support_email")}
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700 mb-1.5">
                Phone Number *
              </label>
              <input
                type="text"
                name="phone_number"
                value={formData.phone_number}
                onChange={handleChange}
                disabled={isPending}
                placeholder="+91 87965 13654"
                className={inputClass("phone_number")}
              />
              {renderError("phone_number")}
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700 mb-1.5">
                WhatsApp Number (Digits Only) *
              </label>
              <input
                type="text"
                name="whatsapp_number"
                value={formData.whatsapp_number}
                onChange={handleChange}
                disabled={isPending}
                placeholder="918796513654"
                className={inputClass("whatsapp_number")}
              />
              <p className="mt-1 text-[11px] text-gray-400">
                Used for instant checkout redirect and header WhatsApp floating button.
              </p>
              {renderError("whatsapp_number")}
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700 mb-1.5">
                Business Address *
              </label>
              <input
                type="text"
                name="business_address"
                value={formData.business_address}
                onChange={handleChange}
                disabled={isPending}
                placeholder="Mumbai, Maharashtra, India"
                className={inputClass("business_address")}
              />
              {renderError("business_address")}
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700 mb-1.5">
                Working Hours *
              </label>
              <input
                type="text"
                name="working_hours"
                value={formData.working_hours}
                onChange={handleChange}
                disabled={isPending}
                placeholder="Mon–Sat: 9 AM – 6 PM"
                className={inputClass("working_hours")}
              />
              {renderError("working_hours")}
            </div>
          </div>
        </SettingsCard>
      </SettingsSection>

      {/* SECTION 4: Social Media */}
      <SettingsSection
        title="Social Media Profiles"
        description="URLs for social media icons displayed in the website footer. Leave blank to hide an icon."
        badge="Social"
      >
        <SettingsCard>
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1.5 flex items-center gap-1.5">
                <span className="material-symbols-outlined text-sm text-pink-600">photo_camera</span>
                Instagram URL
              </label>
              <input
                type="url"
                name="instagram_url"
                value={formData.instagram_url || ""}
                onChange={handleChange}
                disabled={isPending}
                placeholder="https://instagram.com/alhayat"
                className={inputClass("instagram_url")}
              />
              {renderError("instagram_url")}
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1.5 flex items-center gap-1.5">
                <span className="material-symbols-outlined text-sm text-blue-600">thumb_up</span>
                Facebook URL
              </label>
              <input
                type="url"
                name="facebook_url"
                value={formData.facebook_url || ""}
                onChange={handleChange}
                disabled={isPending}
                placeholder="https://facebook.com/alhayat"
                className={inputClass("facebook_url")}
              />
              {renderError("facebook_url")}
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1.5 flex items-center gap-1.5">
                <span className="material-symbols-outlined text-sm text-blue-700">work</span>
                LinkedIn URL
              </label>
              <input
                type="url"
                name="linkedin_url"
                value={formData.linkedin_url || ""}
                onChange={handleChange}
                disabled={isPending}
                placeholder="https://linkedin.com/company/alhayat"
                className={inputClass("linkedin_url")}
              />
              {renderError("linkedin_url")}
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1.5 flex items-center gap-1.5">
                <span className="material-symbols-outlined text-sm text-gray-900">tag</span>
                X (Twitter) URL
              </label>
              <input
                type="url"
                name="x_url"
                value={formData.x_url || ""}
                onChange={handleChange}
                disabled={isPending}
                placeholder="https://x.com/alhayat"
                className={inputClass("x_url")}
              />
              {renderError("x_url")}
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1.5 flex items-center gap-1.5">
                <span className="material-symbols-outlined text-sm text-red-600">play_circle</span>
                YouTube URL
              </label>
              <input
                type="url"
                name="youtube_url"
                value={formData.youtube_url || ""}
                onChange={handleChange}
                disabled={isPending}
                placeholder="https://youtube.com/@alhayat"
                className={inputClass("youtube_url")}
              />
              {renderError("youtube_url")}
            </div>
          </div>
        </SettingsCard>
      </SettingsSection>

      {/* SECTION 5: Localization */}
      <SettingsSection
        title="Localization & Regional"
        description="Set default currency, symbol, timezone, and language preferences across the storefront."
        badge="Region"
      >
        <SettingsCard>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700 mb-1.5">
                Currency Code *
              </label>
              <input
                type="text"
                name="currency"
                value={formData.currency}
                onChange={handleChange}
                disabled={isPending}
                placeholder="INR"
                className={inputClass("currency")}
              />
              {renderError("currency")}
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700 mb-1.5">
                Currency Symbol *
              </label>
              <input
                type="text"
                name="currency_symbol"
                value={formData.currency_symbol}
                onChange={handleChange}
                disabled={isPending}
                placeholder="₹"
                className={inputClass("currency_symbol")}
              />
              {renderError("currency_symbol")}
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700 mb-1.5">
                Timezone *
              </label>
              <input
                type="text"
                name="timezone"
                value={formData.timezone}
                onChange={handleChange}
                disabled={isPending}
                placeholder="Asia/Kolkata"
                className={inputClass("timezone")}
              />
              {renderError("timezone")}
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700 mb-1.5">
                Language Code *
              </label>
              <input
                type="text"
                name="language"
                value={formData.language}
                onChange={handleChange}
                disabled={isPending}
                placeholder="en-IN"
                className={inputClass("language")}
              />
              {renderError("language")}
            </div>
          </div>
        </SettingsCard>
      </SettingsSection>

      {/* SECTION 6: Business & Thresholds */}
      <SettingsSection
        title="Business Parameters"
        description="Adjust free shipping thresholds, standard shipping charges, and applicable tax percentages."
        badge="Finance"
      >
        <SettingsCard>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700 mb-1.5">
                Free Shipping Threshold ({formData.currency_symbol}) *
              </label>
              <input
                type="number"
                name="free_shipping_threshold"
                value={formData.free_shipping_threshold}
                onChange={handleChange}
                disabled={isPending}
                placeholder="999"
                className={inputClass("free_shipping_threshold")}
              />
              {renderError("free_shipping_threshold")}
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700 mb-1.5">
                Standard Shipping Charge ({formData.currency_symbol}) *
              </label>
              <input
                type="number"
                name="shipping_charge"
                value={formData.shipping_charge}
                onChange={handleChange}
                disabled={isPending}
                placeholder="50"
                className={inputClass("shipping_charge")}
              />
              {renderError("shipping_charge")}
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700 mb-1.5">
                Tax Percentage (%) *
              </label>
              <input
                type="number"
                name="tax_percentage"
                value={formData.tax_percentage}
                onChange={handleChange}
                disabled={isPending}
                placeholder="18"
                className={inputClass("tax_percentage")}
              />
              {renderError("tax_percentage")}
            </div>
          </div>
        </SettingsCard>
      </SettingsSection>

      {/* SECTION 7: Store Status */}
      <SettingsSection
        title="Operational Status"
        description="Control customer access to your storefront. Switch to Maintenance mode when upgrading or temporarily offline."
        badge="Status"
      >
        <SettingsCard>
          <StatusSelector
            value={formData.store_status}
            onChange={handleStatusChange}
            disabled={isPending}
          />
          {renderError("store_status")}
        </SettingsCard>
      </SettingsSection>

      {/* Sticky Action Footer */}
      <div className="sticky bottom-0 z-20 flex flex-col sm:flex-row items-center justify-between gap-4 rounded-xl border border-gray-200 bg-white/95 p-4 shadow-lg backdrop-blur-md">
        <div className="flex items-center gap-2">
          {isDirty ? (
            <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-700 border border-amber-200">
              <span className="h-2 w-2 rounded-full bg-amber-500 animate-pulse" />
              Unsaved modifications
            </span>
          ) : (
            <span className="text-xs text-gray-400">Store settings up to date</span>
          )}
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
          <button
            type="button"
            onClick={handleCancel}
            disabled={!isDirty || isPending}
            className="rounded-xl border border-gray-300 bg-white px-5 py-2.5 text-xs font-semibold text-gray-700 transition-colors hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed shadow-2xs"
          >
            Cancel / Reset
          </button>
          <button
            type="submit"
            disabled={isPending}
            className="flex items-center gap-2 rounded-xl bg-gray-900 px-6 py-2.5 text-xs font-semibold text-white transition-all hover:bg-black disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg min-h-[38px]"
          >
            {isPending ? (
              <>
                <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                <span>Saving Settings...</span>
              </>
            ) : (
              <>
                <span className="material-symbols-outlined text-base">save</span>
                <span>Save Store Settings</span>
              </>
            )}
          </button>
        </div>
      </div>
    </form>
  );
}
