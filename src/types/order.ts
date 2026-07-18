import { z } from "zod";

// ============================================================================
// STATUS MODEL
// ============================================================================

export const ORDER_STATUS = {
  PENDING: "Pending",
  ACCEPTED: "Accepted",
  PREPARING: "Preparing",
  READY: "Ready",
  COMPLETED: "Completed",
  CANCELLED: "Cancelled",
} as const;

export type OrderStatus = typeof ORDER_STATUS[keyof typeof ORDER_STATUS];

// ============================================================================
// TYPES
// ============================================================================

export interface OrderItem {
  id: string;
  order_id: string;
  product_id: number | string;
  product_name: string;
  product_price: number;
  quantity: number;
  line_total: number;
  created_at: string;
}

export interface Order {
  id: string;
  order_number: string;
  customer_name: string;
  customer_phone: string;
  customer_email: string | null;
  customer_address: string;
  customer_landmark: string | null;
  customer_city: string;
  customer_state: string;
  customer_pincode: string;
  notes: string | null;
  
  subtotal: number;
  discount_type: string | null;
  discount_value: number | null;
  discount_amount: number;
  delivery_charge: number;
  total_amount: number;
  
  status: OrderStatus;
  
  created_at: string;
  updated_at: string;
  accepted_at: string | null;
  completed_at: string | null;
  cancelled_at: string | null;
  
  updated_by: string | null;
  deleted_at: string | null;
  
  items?: OrderItem[];
}

export interface DashboardOrderPreview {
  id: string;
  order_number: string;
  customer_name: string;
  total_amount: number;
  status: OrderStatus;
  created_at: string;
}

export interface WhatsAppOrderPayload {
  orderNumber: string;
  customerName: string;
  customerPhone: string;
  address: string;
  landmark: string | null;
  city: string;
  state: string;
  pincode: string;
  notes?: string | null;
  items: Array<{ name: string; quantity: number; price: number }>;
  subtotal: number;
  deliveryCharge: number;
  discountAmount: number;
  totalAmount: number;
}

export interface CreateOrderInput {
  customer_name: string;
  customer_phone: string;
  customer_email?: string | null;
  customer_address: string;
  customer_landmark?: string | null;
  customer_city: string;
  customer_state: string;
  customer_pincode: string;
  notes?: string | null;
  
  subtotal: number;
  discount_type?: string | null;
  discount_value?: number | null;
  discount_amount?: number;
  delivery_charge?: number;
  total_amount: number;
  
  items: Array<{
    product_id: number | string;
    product_name: string;
    product_price: number;
    quantity: number;
    line_total: number;
  }>;
}

// ============================================================================
// ZOD VALIDATION SCHEMAS
// ============================================================================

export const OrderItemSchema = z.object({
  product_id: z.union([z.number(), z.string()]),
  product_name: z.string().min(1, "Product name is required"),
  product_price: z.number().min(0, "Product price cannot be negative"),
  quantity: z.number().int().min(1, "Quantity must be at least 1"),
  line_total: z.number().min(0, "Line total cannot be negative"),
});

export const CreateOrderSchema = z.object({
  customer_name: z.string().min(2, "Name must be at least 2 characters"),
  customer_phone: z.string().regex(/^\+?[1-9]\d{9,14}$/, "Invalid phone number format"),
  customer_email: z.string().email("Invalid email address").optional().nullable(),
  customer_address: z.string().min(5, "Address must be at least 5 characters"),
  customer_landmark: z.string().optional().nullable(),
  customer_city: z.string().min(2, "City is required"),
  customer_state: z.string().min(2, "State is required"),
  customer_pincode: z.string().min(5, "Pincode must be at least 5 characters"),
  notes: z.string().optional().nullable(),
  
  subtotal: z.number().min(0, "Subtotal cannot be negative"),
  discount_type: z.string().optional().nullable(),
  discount_value: z.number().min(0).optional().nullable(),
  discount_amount: z.number().min(0).default(0),
  delivery_charge: z.number().min(0).default(0),
  total_amount: z.number().min(0, "Total amount cannot be negative"),
  
  items: z.array(OrderItemSchema).min(1, "Order must contain at least one item"),
});
