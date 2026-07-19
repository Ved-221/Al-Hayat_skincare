import { z } from "zod";

/**
 * settingsSchema.ts
 * -----------------
 * Zod validation schema for Store Settings.
 * Enforces valid emails, phone formats, URL formats, required strings,
 * maximum field lengths, and numeric constraints for business parameters.
 */

export const StoreSettingsSchema = z.object({
  store_name: z
    .string()
    .min(1, "Store Name is required")
    .max(100, "Store Name must be under 100 characters"),
  store_tagline: z
    .string()
    .min(1, "Store Tagline is required")
    .max(200, "Tagline must be under 200 characters"),
  store_description: z
    .string()
    .min(1, "Store Description is required")
    .max(1000, "Description must be under 1000 characters"),
  logo_url: z
    .string()
    .url("Must be a valid URL")
    .nullable()
    .optional()
    .or(z.literal("")),
  favicon_url: z
    .string()
    .url("Must be a valid URL")
    .nullable()
    .optional()
    .or(z.literal("")),
  business_email: z
    .string()
    .min(1, "Business Email is required")
    .email("Must be a valid email address"),
  support_email: z
    .string()
    .min(1, "Support Email is required")
    .email("Must be a valid email address"),
  phone_number: z
    .string()
    .min(5, "Phone Number is required")
    .max(30, "Phone number is too long"),
  whatsapp_number: z
    .string()
    .min(5, "WhatsApp Number is required")
    .max(30, "WhatsApp number is too long")
    .regex(/^[0-9+-\s()]+$/, "WhatsApp number can only contain digits and phone formatting characters"),
  business_address: z
    .string()
    .min(1, "Business Address is required")
    .max(300, "Address must be under 300 characters"),
  working_hours: z
    .string()
    .min(1, "Working Hours is required")
    .max(150, "Working hours string is too long"),
  instagram_url: z
    .string()
    .url("Must be a valid URL")
    .or(z.literal("")),
  facebook_url: z
    .string()
    .url("Must be a valid URL")
    .or(z.literal("")),
  linkedin_url: z
    .string()
    .url("Must be a valid URL")
    .or(z.literal("")),
  x_url: z
    .string()
    .url("Must be a valid URL")
    .or(z.literal("")),
  youtube_url: z
    .string()
    .url("Must be a valid URL")
    .or(z.literal("")),
  currency: z
    .string()
    .min(1, "Currency code is required")
    .max(10, "Currency code is too long"),
  currency_symbol: z
    .string()
    .min(1, "Currency Symbol is required")
    .max(5, "Currency symbol is too long"),
  timezone: z
    .string()
    .min(1, "Timezone is required")
    .max(50, "Timezone is too long"),
  language: z
    .string()
    .min(1, "Language code is required")
    .max(20, "Language code is too long"),
  free_shipping_threshold: z.coerce
    .number()
    .min(0, "Free shipping threshold cannot be negative"),
  shipping_charge: z.coerce
    .number()
    .min(0, "Shipping charge cannot be negative"),
  tax_percentage: z.coerce
    .number()
    .min(0, "Tax percentage cannot be negative")
    .max(100, "Tax percentage cannot exceed 100%"),
  store_status: z.enum(["Open", "Maintenance"], {
    message: "Store status must be either Open or Maintenance",
  }),
});

export type StoreSettingsValidatedPayload = z.infer<typeof StoreSettingsSchema>;
