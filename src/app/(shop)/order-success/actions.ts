"use server";

import { getOrderByOrderNumber } from "@/services/orderService";
import { Order, WhatsAppOrderPayload } from "@/types/order";

export type OrderResponse = 
  | { success: true; data: WhatsAppOrderPayload }
  | { success: false; error: string };

export async function getOrderForWhatsAppAction(orderNumber: string): Promise<OrderResponse> {
  try {
    const order: Order = await getOrderByOrderNumber(orderNumber);
    
    if (!order) {
      return { success: false, error: "Order not found" };
    }

    const payload: WhatsAppOrderPayload = {
      orderNumber: order.order_number,
      customerName: order.customer_name,
      customerPhone: order.customer_phone,
      address: order.customer_address,
      landmark: order.customer_landmark,
      city: order.customer_city,
      state: order.customer_state,
      pincode: order.customer_pincode,
      notes: order.notes,
      items: (order.items || []).map((item) => ({
        name: item.product_name,
        quantity: item.quantity,
        price: item.product_price,
      })),
      subtotal: order.subtotal,
      deliveryCharge: order.delivery_charge,
      discountAmount: order.discount_amount,
      totalAmount: order.total_amount,
    };

    return { success: true, data: payload };
  } catch (error: unknown) {
    console.error("Error fetching order for WhatsApp:", error);
    return { success: false, error: error instanceof Error ? error.message : "Failed to load order" };
  }
}
