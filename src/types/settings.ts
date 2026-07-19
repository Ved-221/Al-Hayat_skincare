/**
 * settings.ts
 * -----------
 * TypeScript interfaces and default configurations for the Store Settings module.
 * Represents the single-store architecture row in the `settings` Supabase table.
 */

export { StoreSettingsSchema } from "@/lib/validations/settingsSchema";

export type StoreStatus = "Open" | "Maintenance";

export interface StoreSettings {
  id: string;
  store_name: string;
  store_tagline: string;
  store_description: string;
  logo_url: string | null;
  favicon_url: string | null;
  business_email: string;
  support_email: string;
  phone_number: string;
  whatsapp_number: string;
  business_address: string;
  working_hours: string;
  instagram_url: string;
  facebook_url: string;
  linkedin_url: string;
  x_url: string;
  youtube_url: string;
  currency: string;
  currency_symbol: string;
  timezone: string;
  language: string;
  free_shipping_threshold: number;
  shipping_charge: number;
  tax_percentage: number;
  store_status: StoreStatus;
  created_at?: string;
  updated_at?: string;
}

export type StoreSettingsPayload = Omit<
  StoreSettings,
  "id" | "created_at" | "updated_at"
>;

export const DEFAULT_STORE_SETTINGS: StoreSettings = {
  id: "default",
  store_name: "AL-HAYAT",
  store_tagline:
    "Premium herbal skincare & haircare by Dr. Farheen. Botanical Wisdom. Clinical Precision.",
  store_description:
    "AL-HAYAT by Dr. Farheen — premium herbal skincare, haircare, and lip care. Handcrafted botanical formulations. 100% natural ingredients. Order on WhatsApp.",
  logo_url: null,
  favicon_url: null,
  business_email: "info@alhayat.in",
  support_email: "support@alhayat.in",
  phone_number: "+91 87965 13654",
  whatsapp_number: "918796513654",
  business_address: "Mumbai, Maharashtra, India",
  working_hours: "Mon–Sat: 9 AM – 6 PM",
  instagram_url: "https://instagram.com",
  facebook_url: "https://facebook.com",
  linkedin_url: "",
  x_url: "",
  youtube_url: "",
  currency: "INR",
  currency_symbol: "₹",
  timezone: "Asia/Kolkata",
  language: "en-IN",
  free_shipping_threshold: 999,
  shipping_charge: 50,
  tax_percentage: 18,
  store_status: "Open",
};
