import { requireCustomer } from "@/lib/auth";
import { getOrderByIdWithProductDetails } from "@/services/orderService";
import { resolveImageUrl } from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";
import OrderTimeline from "@/components/admin/orders/OrderTimeline";
import { formatOrderDate } from "@/components/admin/orders/OrderTable";

export const metadata = { title: "Order Details | AL-HAYAT" };

export default async function CustomerOrderDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const user = await requireCustomer();
  const { id } = await params;

  let order;
  try {
    order = await getOrderByIdWithProductDetails(id);
    
    // Ensure the order actually belongs to this customer
    if (order.customer_id !== user.id) {
      throw new Error("Unauthorized");
    }
  } catch {
    return (
      <div className="rounded-xl border border-[#c8c7b5]/40 bg-white p-8 text-center shadow-xs">
        <h2 className="text-xl font-bold text-[#434b01] mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>Order Not Found</h2>
        <p className="text-[#787868] mb-6">We couldn&apos;t find that order, or you don&apos;t have permission to view it.</p>
        <Link href="/account/orders" className="inline-block rounded-xl bg-[#434b01] px-6 py-2 text-sm font-bold text-white transition-colors hover:bg-[#5a6401]">
          Back to Orders
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Back Link */}
      <div>
        <Link
          href="/account/orders"
          className="inline-flex items-center gap-1 text-sm font-semibold text-[#b22a2b] hover:underline"
        >
          ← Back to Orders
        </Link>
      </div>

      <div className="rounded-xl border border-[#c8c7b5]/40 bg-white p-6 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-[#434b01]" style={{ fontFamily: "'Playfair Display', serif" }}>
              Order #{order.order_number}
            </h1>
            <p className="text-sm text-[#787868] mt-1">
              Placed on <span className="font-medium">{formatOrderDate(order.created_at)}</span>
            </p>
          </div>
          <span className={`px-4 py-1.5 rounded-full text-sm font-bold ${
            order.status === 'Completed' ? 'bg-green-100 text-green-700' :
            order.status === 'Cancelled' ? 'bg-red-100 text-red-700' :
            'bg-blue-100 text-blue-700'
          }`}>
            {order.status}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Side: Items & Totals */}
        <div className="lg:col-span-2 space-y-6">
          <div className="rounded-xl border border-[#c8c7b5]/40 bg-white p-6 shadow-xs">
            <h3 className="text-lg font-bold text-[#434b01] mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
              Items in this Order
            </h3>
            
            <div className="divide-y divide-[#c8c7b5]/20">
              {(order.items || []).map((item) => (
                <div key={item.id} className="py-4 flex flex-col sm:flex-row justify-between gap-4">
                  <div className="flex items-center gap-4">
                    {item.product?.img ? (
                      <Image
                        src={resolveImageUrl(item.product.img)}
                        alt={item.product_name}
                        width={64}
                        height={64}
                        className="h-16 w-16 rounded-xl object-cover bg-[#faf3ea]"
                      />
                    ) : (
                      <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-[#faf3ea]">
                        <span className="material-symbols-outlined text-gray-400">image</span>
                      </div>
                    )}
                    <div>
                      <h4 className="font-bold text-[#434b01]">{item.product_name}</h4>
                      <p className="text-sm text-[#787868]">Qty: {item.quantity}</p>
                    </div>
                  </div>
                  <div className="text-right sm:self-center">
                    <p className="font-bold text-[#434b01]">₹{item.line_total}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-xl border border-[#c8c7b5]/40 bg-white p-6 shadow-xs">
            <h3 className="text-lg font-bold text-[#434b01] mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
              Payment Summary
            </h3>
            <div className="space-y-2 text-sm text-[#787868]">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>₹{order.subtotal}</span>
              </div>
              {order.discount_amount > 0 && (
                <div className="flex justify-between text-[#b22a2b]">
                  <span>Discount {order.discount_type ? `(${order.discount_type})` : ""}</span>
                  <span>-₹{order.discount_amount}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Delivery Charge</span>
                <span>₹{order.delivery_charge}</span>
              </div>
              <div className="pt-4 border-t border-[#c8c7b5]/20 flex justify-between font-bold text-lg text-[#434b01]">
                <span>Total Amount</span>
                <span>₹{order.total_amount}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Timeline & Address */}
        <div className="space-y-6">
          <OrderTimeline order={order} />

          <div className="rounded-xl border border-[#c8c7b5]/40 bg-white p-6 shadow-xs">
            <h3 className="text-lg font-bold text-[#434b01] mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
              Delivery Address
            </h3>
            <div className="text-sm text-[#787868] space-y-1">
              <p className="font-bold text-[#434b01]">{order.customer_name}</p>
              <p>{order.customer_phone}</p>
              {order.customer_email && <p>{order.customer_email}</p>}
              <div className="pt-2">
                <p>{order.customer_address}</p>
                {order.customer_landmark && <p>{order.customer_landmark}</p>}
                <p>{order.customer_city}, {order.customer_state} {order.customer_pincode}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
