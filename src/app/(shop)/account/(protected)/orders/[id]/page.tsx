import { requireCustomer } from "@/lib/auth";
import { getOrderByIdWithProductDetails } from "@/services/orderService";
import { resolveImageUrl } from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";
import OrderTimeline from "@/components/admin/orders/OrderTimeline";
import { formatOrderDate } from "@/components/admin/orders/OrderTable";
import { ArrowLeft, Package, MapPin, Receipt } from "lucide-react";

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
      <div className="rounded-3xl border border-[#c8c7b5]/30 bg-white p-12 text-center shadow-sm max-w-2xl mx-auto mt-10">
        <div className="h-16 w-16 bg-[#faf3ea] rounded-full flex items-center justify-center mx-auto mb-4 text-[#787868]">
          <Package size={28} strokeWidth={1.5} />
        </div>
        <h2 className="text-2xl font-bold text-[#434b01] mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>Order Not Found</h2>
        <p className="text-[#787868] mb-8">We couldn&apos;t find that order, or you don&apos;t have permission to view it.</p>
        <Link href="/account/orders" className="inline-block rounded-xl bg-[#434b01] px-8 py-3.5 text-sm font-bold text-white transition-colors hover:bg-[#5a6401] hover:shadow-lg">
          RETURN TO ORDERS
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
          className="inline-flex items-center gap-2 text-sm font-bold text-[#787868] hover:text-[#434b01] transition-colors bg-white px-4 py-2 rounded-full border border-[#c8c7b5]/30 shadow-sm hover:shadow"
        >
          <ArrowLeft size={16} /> Back to Orders
        </Link>
      </div>

      {/* Order Header */}
      <div className="rounded-3xl border border-[#c8c7b5]/30 bg-white p-6 md:p-8 shadow-[0_4px_20px_rgba(0,0,0,0.02)] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#faf3ea] rounded-full opacity-30 blur-3xl -mr-20 -mt-20"></div>
        <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div>
            <p className="text-xs font-bold text-[#787868] tracking-widest uppercase mb-1">Order Details</p>
            <h1 className="text-2xl md:text-3xl font-bold text-[#434b01]" style={{ fontFamily: "'Playfair Display', serif" }}>
              #{order.order_number}
            </h1>
            <div className="flex items-center gap-2 text-sm text-[#787868] mt-2">
              <span className="font-medium text-[#434b01]">{formatOrderDate(order.created_at)}</span>
            </div>
          </div>
          <div className="flex flex-col sm:items-end gap-2">
            <span className="text-xs font-bold text-[#787868] uppercase tracking-wider">Status</span>
            <span className={`px-5 py-2 rounded-full text-sm font-bold uppercase tracking-wide border ${
              order.status === 'Completed' ? 'bg-green-50 text-green-700 border-green-200' :
              order.status === 'Cancelled' ? 'bg-red-50 text-red-700 border-red-200' :
              'bg-blue-50 text-blue-700 border-blue-200'
            }`}>
              {order.status}
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Side: Items & Totals */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Order Items */}
          <div className="rounded-3xl border border-[#c8c7b5]/30 bg-white shadow-[0_4px_20px_rgba(0,0,0,0.02)] overflow-hidden">
            <div className="bg-[#faf3ea]/30 px-6 py-4 border-b border-[#c8c7b5]/20 flex items-center gap-3">
              <Package size={20} className="text-[#434b01]" />
              <h3 className="text-lg font-bold text-[#434b01]" style={{ fontFamily: "'Playfair Display', serif" }}>
                Items Ordered
              </h3>
            </div>
            
            <div className="divide-y divide-[#c8c7b5]/10 px-2 md:px-4">
              {(order.items || []).map((item) => (
                <div key={item.id} className="p-4 flex flex-col sm:flex-row justify-between gap-6 hover:bg-[#faf3ea]/10 transition-colors rounded-2xl">
                  <div className="flex items-center gap-4">
                    {item.product?.img ? (
                      <div className="relative h-20 w-20 rounded-2xl overflow-hidden bg-[#faf3ea] border border-[#c8c7b5]/20 shrink-0">
                        <Image
                          src={resolveImageUrl(item.product.img)}
                          alt={item.product_name}
                          fill
                          className="object-cover"
                        />
                      </div>
                    ) : (
                      <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-[#faf3ea] border border-[#c8c7b5]/20 shrink-0">
                        <Package className="text-[#c8c7b5]" />
                      </div>
                    )}
                    <div>
                      <h4 className="font-bold text-[#434b01] text-lg">{item.product_name}</h4>
                      <p className="text-sm text-[#787868] mt-1 font-medium bg-[#faf3ea] inline-block px-2 py-0.5 rounded-md">Qty: {item.quantity}</p>
                    </div>
                  </div>
                  <div className="text-right sm:self-center">
                    <p className="font-bold text-[#434b01] text-lg">₹{item.line_total}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Payment Summary */}
          <div className="rounded-3xl border border-[#c8c7b5]/30 bg-white shadow-[0_4px_20px_rgba(0,0,0,0.02)] overflow-hidden">
            <div className="bg-[#faf3ea]/30 px-6 py-4 border-b border-[#c8c7b5]/20 flex items-center gap-3">
              <Receipt size={20} className="text-[#434b01]" />
              <h3 className="text-lg font-bold text-[#434b01]" style={{ fontFamily: "'Playfair Display', serif" }}>
                Payment Summary
              </h3>
            </div>
            <div className="p-6 md:p-8 space-y-4 text-sm text-[#787868]">
              <div className="flex justify-between items-center">
                <span className="font-medium">Subtotal</span>
                <span className="font-bold text-[#434b01]">₹{order.subtotal}</span>
              </div>
              {order.discount_amount > 0 && (
                <div className="flex justify-between items-center text-[#b22a2b] bg-red-50 p-3 rounded-xl border border-red-100">
                  <span className="font-medium">Discount {order.discount_type ? `(${order.discount_type})` : ""}</span>
                  <span className="font-bold">-₹{order.discount_amount}</span>
                </div>
              )}
              <div className="flex justify-between items-center">
                <span className="font-medium">Delivery Charge</span>
                <span className="font-bold text-[#434b01]">₹{order.delivery_charge}</span>
              </div>
              <div className="pt-6 border-t border-[#c8c7b5]/20 flex justify-between items-center font-bold text-xl text-[#434b01]">
                <span>Total Amount</span>
                <span>₹{order.total_amount}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Timeline & Address */}
        <div className="space-y-6">
          <div className="rounded-3xl border border-[#c8c7b5]/30 bg-white shadow-[0_4px_20px_rgba(0,0,0,0.02)] overflow-hidden">
            <div className="bg-[#434b01] px-6 py-4 border-b border-[#c8c7b5]/20 text-white">
              <h3 className="text-lg font-bold" style={{ fontFamily: "'Playfair Display', serif" }}>
                Order Status
              </h3>
            </div>
            <div className="p-6">
              <OrderTimeline order={order} />
            </div>
          </div>

          <div className="rounded-3xl border border-[#c8c7b5]/30 bg-white shadow-[0_4px_20px_rgba(0,0,0,0.02)] overflow-hidden">
            <div className="bg-[#faf3ea]/30 px-6 py-4 border-b border-[#c8c7b5]/20 flex items-center gap-3">
              <MapPin size={20} className="text-[#434b01]" />
              <h3 className="text-lg font-bold text-[#434b01]" style={{ fontFamily: "'Playfair Display', serif" }}>
                Delivery Address
              </h3>
            </div>
            <div className="p-6 text-sm text-[#787868] space-y-3">
              <div>
                <p className="font-bold text-[#434b01] text-base">{order.customer_name}</p>
                <div className="mt-1 flex items-center gap-3">
                  <span className="bg-[#faf3ea] px-2 py-0.5 rounded text-xs font-medium">{order.customer_phone}</span>
                  {order.customer_email && <span className="bg-[#faf3ea] px-2 py-0.5 rounded text-xs font-medium truncate max-w-[150px]">{order.customer_email}</span>}
                </div>
              </div>
              <div className="pt-3 border-t border-[#c8c7b5]/20 leading-relaxed">
                <p className="font-medium text-[#434b01]">{order.customer_address}</p>
                {order.customer_landmark && <p>Landmark: {order.customer_landmark}</p>}
                <p className="mt-1">{order.customer_city}, {order.customer_state}</p>
                <p className="font-bold text-[#434b01] mt-1">{order.customer_pincode}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
