import { createClient } from "@/lib/supabase-server";
import { createClient as createSupabaseClient } from "@supabase/supabase-js";
import {
  Order,
  OrderItem,
  CreateOrderInput,
  OrderStatus,
  CreateOrderSchema,
  ORDER_STATUS,
} from "@/types/order";

/**
 * Service for interacting with Orders in the database.
 * Designed to respect soft deletes and enforce strong typing.
 */

// ============================================================================
// CREATE
// ============================================================================

export async function createOrder(input: CreateOrderInput): Promise<Order> {
  // Validate input
  const validated = CreateOrderSchema.parse(input);

  const supabase = await createClient();

  // Create order via RPC for atomicity
  const { data: newOrderId, error } = await supabase.rpc("create_order_with_items", {
    order_data: {
      customer_name: validated.customer_name,
      customer_phone: validated.customer_phone,
      customer_email: validated.customer_email,
      customer_address: validated.customer_address,
      customer_landmark: validated.customer_landmark,
      customer_city: validated.customer_city,
      customer_state: validated.customer_state,
      customer_pincode: validated.customer_pincode,
      notes: validated.notes,
      subtotal: validated.subtotal,
      discount_type: validated.discount_type,
      discount_value: validated.discount_value,
      discount_amount: validated.discount_amount,
      delivery_charge: validated.delivery_charge,
      total_amount: validated.total_amount,
    },
    items_data: validated.items,
  });

  if (error || !newOrderId) {
    throw new Error(`Failed to create order: ${error?.message || "Unknown error"}`);
  }

  // Update the customer_id if it was provided
  if (validated.customer_id) {
    const adminSupabase = createSupabaseClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );
    await adminSupabase
      .from("orders")
      .update({ customer_id: validated.customer_id })
      .eq("id", newOrderId as string);
  }

  // Fetch and return the newly created order
  return getOrderById(newOrderId as string);
}

// ============================================================================
// READ
// ============================================================================

export async function getOrderById(id: string): Promise<Order> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("orders")
    .select(`
      *,
      items:order_items(*)
    `)
    .eq("id", id)
    .is("deleted_at", null)
    .single();

  if (error || !data) {
    throw new Error(`Order not found or deleted (id: ${id})`);
  }

  return data as Order;
}

export async function getOrderByOrderNumber(orderNumber: string): Promise<Order> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("orders")
    .select(`
      *,
      items:order_items(*)
    `)
    .eq("order_number", orderNumber)
    .is("deleted_at", null)
    .single();

  if (error || !data) {
    throw new Error(`Order not found or deleted (order_number: ${orderNumber})`);
  }

  return data as Order;
}

export interface GetOrdersOptions {
  search?: string;
  status?: OrderStatus | "All";
  sort?: "newest" | "oldest" | "highest_amount" | "lowest_amount";
  page?: number;
  limit?: number;
}

export async function getOrders(): Promise<Order[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("orders")
    .select("*")
    .is("deleted_at", null)
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error(`Failed to fetch orders: ${error.message}`);
  }

  return (data as Order[]) ?? [];
}

/**
 * Fetches filtered, sorted, searched and paginated orders at the database level.
 */
export async function getOrdersPaged(options?: GetOrdersOptions): Promise<{ orders: Order[]; totalCount: number }> {
  const supabase = await createClient();

  let query = supabase
    .from("orders")
    .select("*", { count: "exact" })
    .is("deleted_at", null);

  // Search by Order Number, Customer Name, Phone, and Email
  if (options?.search && options.search.trim()) {
    const searchVal = `%${options.search.trim()}%`;
    query = query.or(
      `order_number.ilike.${searchVal},customer_name.ilike.${searchVal},customer_phone.ilike.${searchVal},customer_email.ilike.${searchVal}`
    );
  }

  // Filter by Status (case-insensitive to support lowercase URL queries like ?status=pending)
  if (options?.status && options.status !== "All") {
    const matchedStatus = Object.values(ORDER_STATUS).find(
      (s) => s.toLowerCase() === (options.status as string).toLowerCase()
    );
    if (matchedStatus) {
      query = query.eq("status", matchedStatus);
    }
  }

  // Sorting
  const sort = options?.sort || "newest";
  if (sort === "newest") {
    query = query.order("created_at", { ascending: false });
  } else if (sort === "oldest") {
    query = query.order("created_at", { ascending: true });
  } else if (sort === "highest_amount") {
    query = query.order("total_amount", { ascending: false });
  } else if (sort === "lowest_amount") {
    query = query.order("total_amount", { ascending: true });
  }

  // Pagination
  const page = options?.page || 1;
  const limit = options?.limit || 10;
  const from = (page - 1) * limit;
  const to = from + limit - 1;

  query = query.range(from, to);

  const { data, count, error } = await query;

  if (error) {
    throw new Error(`Failed to fetch paged orders: ${error.message}`);
  }

  return {
    orders: (data as Order[]) ?? [],
    totalCount: count ?? 0,
  };
}

/**
 * Fetches order by ID with associated products' details (specifically image URL thumbnails).
 */
export async function getOrderByIdWithProductDetails(id: string): Promise<Order & { items: (OrderItem & { product?: { img: string } })[] }> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("orders")
    .select(`
      *,
      items:order_items(
        *,
        product:products(img)
      )
    `)
    .eq("id", id)
    .is("deleted_at", null)
    .single();

  if (error || !data) {
    throw new Error(`Order not found or deleted (id: ${id})`);
  }

  return data as Order & { items: (OrderItem & { product?: { img: string } })[] };
}

export async function getRecentOrders(limit: number = 5): Promise<Order[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("orders")
    .select("*")
    .is("deleted_at", null)
    .order("created_at", { ascending: false })
    .limit(limit);

  if (error) {
    console.error("Failed to fetch recent orders:", error.message);
    return [];
  }

  return (data as Order[]) ?? [];
}

// ============================================================================
// UPDATE
// ============================================================================

/**
 * Validates order lifecycle transitions:
 * Pending -> Accepted -> Preparing -> Ready -> Completed.
 * Cancelled is allowed from any status except Completed.
 */
export function isValidStatusTransition(current: OrderStatus, target: OrderStatus): boolean {
  if (current === target) return true;
  
  if (current === ORDER_STATUS.CANCELLED || current === ORDER_STATUS.COMPLETED) {
    return false;
  }
  
  if (target === ORDER_STATUS.CANCELLED) {
    return true;
  }

  const flow = [
    ORDER_STATUS.PENDING,
    ORDER_STATUS.ACCEPTED,
    ORDER_STATUS.PREPARING,
    ORDER_STATUS.READY,
    ORDER_STATUS.COMPLETED,
  ];

  const currentIndex = flow.indexOf(current);
  const targetIndex = flow.indexOf(target);

  if (currentIndex === -1 || targetIndex === -1) return false;

  return targetIndex === currentIndex + 1;
}

export async function updateOrderStatus(
  id: string,
  status: OrderStatus,
  adminId: string
): Promise<Order> {
  const supabase = await createClient();

  // Fetch current order to check transition validity
  const currentOrder = await getOrderById(id);
  if (!isValidStatusTransition(currentOrder.status, status)) {
    throw new Error(`Invalid status transition from "${currentOrder.status}" to "${status}"`);
  }

  // Determine lifecycle timestamp to update
  const updates: {
    status: OrderStatus;
    updated_by: string;
    updated_at: string;
    accepted_at?: string;
    preparing_at?: string;
    ready_at?: string;
    completed_at?: string;
    cancelled_at?: string;
  } = {
    status,
    updated_by: adminId,
    updated_at: new Date().toISOString(),
  };

  if (status === ORDER_STATUS.ACCEPTED) {
    updates.accepted_at = new Date().toISOString();
  } else if (status === ORDER_STATUS.PREPARING) {
    updates.preparing_at = new Date().toISOString();
  } else if (status === ORDER_STATUS.READY) {
    updates.ready_at = new Date().toISOString();
  } else if (status === ORDER_STATUS.COMPLETED) {
    updates.completed_at = new Date().toISOString();
  } else if (status === ORDER_STATUS.CANCELLED) {
    updates.cancelled_at = new Date().toISOString();
  }

  const { data, error } = await supabase
    .from("orders")
    .update(updates)
    .eq("id", id)
    .is("deleted_at", null)
    .select()
    .single();

  if (error || !data) {
    throw new Error(`Failed to update order status: ${error?.message || "Order not found"}`);
  }

  return data as Order;
}

// ============================================================================
// DELETE (SOFT DELETE)
// ============================================================================

export async function deleteOrder(id: string, adminId: string): Promise<void> {
  const supabase = await createClient();

  const { error } = await supabase
    .from("orders")
    .update({
      deleted_at: new Date().toISOString(),
      updated_by: adminId,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id)
    .is("deleted_at", null);

  if (error) {
    throw new Error(`Failed to delete order: ${error.message}`);
  }
}

// ============================================================================
// DASHBOARD & ANALYTICS HELPERS
// ============================================================================

export interface OrderStats {
  pendingOrders: number;
  completedOrders: number;
  todaysOrders: number;
  revenueToday: number;
}

export async function getOrderStats(): Promise<OrderStats> {
  const supabase = await createClient();

  const now = new Date();
  const startOfToday = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate(),
    0,
    0,
    0,
    0
  ).toISOString();

  const [
    { count: pendingCount, error: pendingError },
    { count: completedCount, error: completedError },
    { count: todayCount, error: todayError },
    { data: revenueRows, error: revenueError },
  ] = await Promise.all([
    supabase
      .from("orders")
      .select("id", { count: "exact", head: true })
      .eq("status", ORDER_STATUS.PENDING)
      .is("deleted_at", null),
    supabase
      .from("orders")
      .select("id", { count: "exact", head: true })
      .eq("status", ORDER_STATUS.COMPLETED)
      .is("deleted_at", null),
    supabase
      .from("orders")
      .select("id", { count: "exact", head: true })
      .gte("created_at", startOfToday)
      .is("deleted_at", null),
    supabase
      .from("orders")
      .select("total_amount")
      .gte("created_at", startOfToday)
      .neq("status", ORDER_STATUS.CANCELLED)
      .is("deleted_at", null),
  ]);

  if (pendingError) console.error("Error fetching pending orders count:", pendingError.message);
  if (completedError) console.error("Error fetching completed orders count:", completedError.message);
  if (todayError) console.error("Error fetching today orders count:", todayError.message);
  if (revenueError) console.error("Error fetching today revenue:", revenueError.message);

  const revenueToday =
    revenueRows?.reduce((sum, row) => sum + (Number(row.total_amount) || 0), 0) ?? 0;

  return {
    pendingOrders: pendingCount ?? 0,
    completedOrders: completedCount ?? 0,
    todaysOrders: todayCount ?? 0,
    revenueToday,
  };
}

