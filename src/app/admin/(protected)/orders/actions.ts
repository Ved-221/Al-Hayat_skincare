"use server";

import { requireAdmin } from "@/lib/auth";
import {
  createOrder,
  deleteOrder,
  updateOrderStatus,
} from "@/services/orderService";
import { CreateOrderInput, OrderStatus } from "@/types/order";
import { revalidatePath } from "next/cache";

export type ActionResponse<T = unknown> =
  | { success: true; data?: T }
  | { success: false; error: string; errors?: Record<string, string[]> };

// ============================================================================
// CREATE
// ============================================================================

export async function createOrderAction(
  input: CreateOrderInput
): Promise<ActionResponse> {
  // In a real scenario, this might also take FormData,
  // but for API-like usage from a future checkout/cart, accepting the typed object is often better.
  // The service layer handles Zod validation.
  try {
    const order = await createOrder(input);
    revalidatePath("/admin/orders"); // Future UI path
    return { success: true, data: order };
  } catch (error: unknown) {
    console.error("Error creating order:", error);
    
    // Handle Zod errors if they bubble up, or generic errors
    if (typeof error === 'object' && error !== null && 'issues' in error && Array.isArray((error as { issues: unknown[] }).issues)) {
      const fieldErrors: Record<string, string[]> = {};
      (error as { issues: Array<{ path: (string | number)[], message: string }> }).issues.forEach((issue) => {
        const path = issue.path.join(".");
        if (!fieldErrors[path]) fieldErrors[path] = [];
        fieldErrors[path].push(issue.message);
      });
      return { success: false, error: "Validation failed", errors: fieldErrors };
    }
    
    return { success: false, error: error instanceof Error ? error.message : "Failed to create order" };
  }
}

// ============================================================================
// UPDATE
// ============================================================================

export async function updateOrderStatusAction(
  id: string,
  status: OrderStatus
): Promise<ActionResponse> {
  try {
    const adminUser = await requireAdmin();
    
    const updatedOrder = await updateOrderStatus(id, status, adminUser.id);
    
    revalidatePath("/admin/orders"); // Future UI path
    revalidatePath(`/admin/orders/${id}`); // Future UI path
    
    return { success: true, data: updatedOrder };
  } catch (error: unknown) {
    console.error("Error updating order status:", error);
    return { success: false, error: error instanceof Error ? error.message : "Failed to update order status" };
  }
}

// ============================================================================
// DELETE (SOFT DELETE)
// ============================================================================

export async function deleteOrderAction(id: string): Promise<ActionResponse> {
  try {
    const adminUser = await requireAdmin();
    
    await deleteOrder(id, adminUser.id);
    
    revalidatePath("/admin/orders"); // Future UI path
    
    return { success: true };
  } catch (error: unknown) {
    console.error("Error deleting order:", error);
    return { success: false, error: error instanceof Error ? error.message : "Failed to delete order" };
  }
}
