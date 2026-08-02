/**
 * settingsService.ts
 * ------------------
 * Server-only service layer for Store Settings management.
 * Responsibilities:
 * • Get Settings (wrapped with React `cache` for zero duplicate database queries per SSR request)
 * • Update Settings (with Zod validation)
 * • Create default settings if none exist
 * • Centralize all database operations for the `settings` table
 * • Return safe defaults if database values are missing or unreachable
 */

import { cache } from "react";
import { createClient } from "@/lib/supabase-server";
import {
  type StoreSettings,
  type StoreSettingsPayload,
  DEFAULT_STORE_SETTINGS,
  StoreSettingsSchema,
} from "@/types/settings";

/**
 * Creates default settings in the database if the row does not exist.
 * Uses upsert to guarantee idempotency.
 */
export async function createDefaultSettings(): Promise<StoreSettings> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("settings")
      .upsert(DEFAULT_STORE_SETTINGS, { onConflict: "id" })
      .select("*")
      .single();

    if (error) {
      if (error.message?.includes("schema cache") || error.code === "PGRST204" || error.code === "42P01") {
        console.warn("[settingsService] Settings table not found in Supabase schema cache. Please run `supabase-migration-phase8-settings.sql` in your Supabase SQL Editor.");
      } else {
        console.error("[settingsService] Error creating default settings:", error.message);
      }
      return DEFAULT_STORE_SETTINGS;
    }

    return (data as StoreSettings) || DEFAULT_STORE_SETTINGS;
  } catch (err: unknown) {
    if (typeof err === 'object' && err !== null && 'digest' in err && (err as Record<string, unknown>).digest === 'DYNAMIC_SERVER_USAGE') {
      throw err;
    }
    console.error("[settingsService] Exception creating default settings:", err);
    return DEFAULT_STORE_SETTINGS;
  }
}

/**
 * Retrieves the single store settings row (`id = 'default'`).
 * Wrapped in React `cache()` so multiple components (Metadata, Navbar, Footer, Contact Page)
 * calling this function within the same request lifecycle trigger exactly ONE database query.
 */
export const getStoreSettings = cache(async (): Promise<StoreSettings> => {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("settings")
      .select("*")
      .eq("id", "default")
      .single();

    if (error || !data) {
      // If table is missing from cache, warn gently instead of throwing error overlay
      if (error?.message?.includes("schema cache") || error?.code === "PGRST204" || error?.code === "42P01") {
        console.warn("[settingsService] Settings table not found in Supabase. Falling back to defaults. Run `supabase-migration-phase8-settings.sql` in SQL Editor.");
        return DEFAULT_STORE_SETTINGS;
      }
      // If table exists but row `id = 'default'` is missing (PGRST116), auto-seed default settings
      if (error?.code === "PGRST116" || !data) {
        return await createDefaultSettings();
      }
      console.error("[settingsService] Error fetching settings:", error?.message || "No data returned");
      return DEFAULT_STORE_SETTINGS;
    }

    // Merge with defaults to guarantee no undefined/null required fields occur if schema evolved
    return {
      ...DEFAULT_STORE_SETTINGS,
      ...(data as Partial<StoreSettings>),
    };
  } catch (err: unknown) {
    if (typeof err === 'object' && err !== null && 'digest' in err && (err as Record<string, unknown>).digest === 'DYNAMIC_SERVER_USAGE') {
      throw err;
    }
    console.error("[settingsService] Exception fetching settings:", err);
    return DEFAULT_STORE_SETTINGS;
  }
});

/**
 * Alias for `getStoreSettings` to fulfill both naming conventions.
 */
export const getSettings = getStoreSettings;

/**
 * Updates the store settings with validated payload data.
 */
export async function updateStoreSettings(
  payload: Partial<StoreSettingsPayload>
): Promise<StoreSettings> {
  const supabase = await createClient();

  // Fetch current settings to validate merged outcome cleanly
  const current = await getStoreSettings();
  const merged = { ...current, ...payload };

  // Validate via Zod
  const validationResult = StoreSettingsSchema.safeParse(merged);
  if (!validationResult.success) {
    const firstError = validationResult.error.issues[0]?.message || "Validation failed";
    throw new Error(`Invalid settings: ${firstError}`);
  }

  const validatedData = validationResult.data;
  const now = new Date().toISOString();

  const { data, error } = await supabase
    .from("settings")
    .upsert(
      {
        ...validatedData,
        id: "default",
        updated_at: now,
      },
      { onConflict: "id" }
    )
    .select("*")
    .single();

  if (error) {
    throw new Error(`Failed to update store settings: ${error.message}`);
  }

  return (data as StoreSettings) || { ...DEFAULT_STORE_SETTINGS, ...validatedData };
}

/**
 * Alias for `updateStoreSettings` to fulfill both naming conventions.
 */
export const updateSettings = updateStoreSettings;
