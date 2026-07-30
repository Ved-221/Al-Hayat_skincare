import { WhatsAppOrderPayload } from "@/types/order";

/**
 * Builds a readable, business-friendly message for orders.
 * Separated from WhatsApp specifically so it can be reused for Email/SMS later.
 */
export function buildOrderMessage(payload: WhatsAppOrderPayload): string {
  const {
    orderNumber,
    customerName,
    customerPhone,
    address,
    landmark,
    city,
    state,
    pincode,
    notes,
    items,
    subtotal,
    deliveryCharge,
    discountAmount,
    totalAmount,
  } = payload;

  const addressLines = [
    address,
    landmark ? `${landmark}` : null,
    city,
    state,
    pincode,
  ].filter(Boolean).join(",\n  ");

  const itemsList = items
    .map(
      (item) =>
        `• ${item.name} ×${item.quantity}\n  ₹${item.price} × ${item.quantity} = ₹${item.price * item.quantity}`
    )
    .join("\n\n");

  const notesSection = (notes && notes.trim())
    ? `\n*NOTES*\n━━━━━━━━━━━━━━━━━━━━━━\n${notes}\n`
    : "";

  return `Hello Al-Hayat,

I would like to place the following order:

*ORDER DETAILS*
━━━━━━━━━━━━━━━━━━━━━━
• Order Number: ${orderNumber}

*CUSTOMER INFORMATION*
━━━━━━━━━━━━━━━━━━━━━━
• Name: ${customerName}
• Phone: ${customerPhone}
• Delivery Address:
  ${addressLines}

*ORDER ITEMS*
━━━━━━━━━━━━━━━━━━━━━━
${itemsList}

*PAYMENT SUMMARY*
━━━━━━━━━━━━━━━━━━━━━━
• Subtotal: ₹${subtotal}
• Delivery: ₹${deliveryCharge}
• Discount: ₹${discountAmount}
• Grand Total: ₹${totalAmount}
${notesSection}
Thank you.`;
}

/**
 * Generates the final wa.me URL utilizing the built message.
 * Throws an error if NEXT_PUBLIC_WHATSAPP_NUMBER is not set.
 */
export function generateWhatsAppUrl(message: string): string {
  const businessNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "918796513654";
  
  // Clean up any non-numeric characters from phone number just in case
  const cleanNumber = businessNumber.replace(/\D/g, "");
  const encodedMessage = encodeURIComponent(message);
  
  return `https://wa.me/${cleanNumber}?text=${encodedMessage}`;
}
