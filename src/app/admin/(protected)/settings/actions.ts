"use server";

/**
 * actions.ts — Admin Store Settings Server Actions
 * ------------------------------------------------
 * 1. Calls requireAdmin() to verify admin session.
 * 2. Validates incoming settings payload via Zod schema.
 * 3. Calls `updateStoreSettings()` from service layer.
 * 4. Revalidates paths globally so Navbar, Footer, Contact, and Metadata refresh immediately.
 */

import { requireAdmin } from "@/lib/auth";
import { updateStoreSettings } from "@/services/settingsService";
import {
  type StoreSettings,
  type StoreSettingsPayload,
  StoreSettingsSchema,
} from "@/types/settings";
import { revalidatePath } from "next/cache";

export type SettingsActionResult =
  | { success: true; data: StoreSettings }
  | { success: false; errors?: Record<string, string[]>; error?: string };

export async function updateStoreSettingsAction(
  payload: Partial<StoreSettingsPayload>
): Promise<SettingsActionResult> {
  try {
    await requireAdmin();

    // Validate payload against Zod schema
    const validationResult = StoreSettingsSchema.safeParse(payload);
    if (!validationResult.success) {
      const errors = validationResult.error.flatten().fieldErrors;
      return { success: false, errors };
    }

    const updated = await updateStoreSettings(validationResult.data);

    // Revalidate global routes so new branding/info reflects across the app
    revalidatePath("/", "layout");
    revalidatePath("/admin", "layout");
    revalidatePath("/admin/settings");

    return { success: true, data: updated };
  } catch (err: unknown) {
    console.error("[updateStoreSettingsAction] Error:", err);
    return {
      success: false,
      error: err instanceof Error ? err.message : "Failed to update store settings",
    };
  }
}
