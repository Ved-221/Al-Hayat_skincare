import Link from "next/link";
import { requireAdmin } from "@/lib/auth";
import { getOrderByIdWithProductDetails } from "@/services/orderService";
import StatusBadge from "@/components/admin/orders/StatusBadge";
import StatusDropdown from "@/components/admin/orders/StatusDropdown";
import CopyOrderNumberButton from "@/components/admin/orders/CopyOrderNumberButton";
import OrderTimeline from "@/components/admin/orders/OrderTimeline";
import { formatOrderDate } from "@/components/admin/orders/OrderTable";

export const metadata = { title: "Order Details — Admin | AL-HAYAT" };

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function AdminOrderDetailsPage({ params }: PageProps) {
  await requireAdmin();

  // Await page params
  const { id } = await params;

  let order;
  try {
    order = await getOrderByIdWithProductDetails(id);
  } catch (error: any) {
    console.error("Order details fetch error:", error);
    return (
      <div className="max-w-3xl mx-auto p-6 text-center space-y-4">
        <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-red-50 text-red-600 border border-red-100">
          <span className="material-symbols-outlined text-2xl">error</span>
        </div>
        <h2 className="text-xl font-bold text-gray-900">Order Not Found</h2>
        <p className="text-sm text-gray-500 max-w-sm mx-auto">
          The order you are looking for does not exist, has been deleted, or there was a database error.
        </p>
        <Link
          href="/admin/orders"
          className="inline-flex items-center rounded-lg border border-gray-200 bg-white px-4 py-2 text-xs font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
        >
          Back to Orders
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-4 sm:p-6 max-w-7xl mx-auto">
      {/* Back Link */}
      <div>
        <Link
          href="/admin/orders"
          className="inline-flex items-center gap-1 text-xs font-semibold text-gray-500 hover:text-gray-900 transition-colors"
        >
          <span className="material-symbols-outlined text-sm">arrow_back</span>
          <span>Back to Orders</span>
        </Link>
      </div>

      {/* Main Order Header Block */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between border-b border-gray-200 pb-6">
        <div className="space-y-1.5">
          <div className="flex flex-wrap items-center gap-3">
            <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
              Order {order.order_number}
            </h1>
            <StatusBadge status={order.status} />
          </div>
          <p className="text-xs text-gray-500">
            Placed on <span className="font-mono">{formatOrderDate(order.created_at)}</span>
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex flex-wrap items-center gap-3">
          <CopyOrderNumberButton orderNumber={order.order_number} />
          <StatusDropdown orderId={order.id} currentStatus={order.status} />
        </div>
      </div>

      {/* Two Column Grid */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        
        {/* Left Side: Order Items and Summary */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Order Items List */}
          <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-xs">
            <h3 className="text-sm font-bold uppercase tracking-wider text-gray-500 mb-4">
              Ordered Items
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-left text-sm">
                <thead>
                  <tr className="border-b border-gray-200 pb-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                    <th className="py-2.5 pr-4">Product</th>
                    <th className="py-2.5 px-4 text-center">Price</th>
                    <th className="py-2.5 px-4 text-center">Quantity</th>
                    <th className="py-2.5 pl-4 text-right">Total</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {(order.items as any[]).map((item) => (
                    <tr key={item.id} className="align-middle">
                      {/* Product details and thumbnail */}
                      <td className="py-4 pr-4">
                        <div className="flex items-center gap-4">
                          {item.product?.img ? (
                            <img
                              src={item.product.img}
                              alt={item.product_name}
                              className="h-12 w-12 rounded-lg border border-gray-150 object-cover bg-gray-50"
                            />
                          ) : (
                            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gray-100 text-gray-400 border border-gray-150">
                              <span className="material-symbols-outlined text-lg">image</span>
                            </div>
                          )}
                          <div>
                            <div className="font-semibold text-gray-900 text-sm">
                              {item.product_name}
                            </div>
                            <div className="text-xs text-gray-400 font-mono">
                              ID: {item.product_id}
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* Product Unit Price */}
                      <td className="py-4 px-4 text-center font-mono text-gray-700">
                        ₹{item.product_price}
                      </td>

                      {/* Quantity */}
                      <td className="py-4 px-4 text-center font-semibold text-gray-900">
                        {item.quantity}
                      </td>

                      {/* Line Total */}
                      <td className="py-4 pl-4 text-right font-mono font-bold text-gray-900">
                        ₹{item.line_total}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Customer Notes */}
          {order.notes && order.notes.trim() && (
            <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-xs">
              <h3 className="text-sm font-bold uppercase tracking-wider text-gray-500 mb-3">
                Customer Notes
              </h3>
              <p className="text-sm text-gray-700 bg-gray-50 border border-gray-150 rounded-lg p-4 leading-relaxed font-serif italic">
                &ldquo;{order.notes}&rdquo;
              </p>
            </div>
          )}

          {/* Pricing Breakdown Summary */}
          <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-xs">
            <h3 className="text-sm font-bold uppercase tracking-wider text-gray-500 mb-4">
              Payment Summary
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between text-sm text-gray-600">
                <span>Subtotal</span>
                <span className="font-mono">₹{order.subtotal}</span>
              </div>
              <div className="flex justify-between text-sm text-gray-600">
                <span>
                  Discount {order.discount_type ? `(${order.discount_type})` : ""}
                </span>
                <span className="font-mono text-green-600">-₹{order.discount_amount}</span>
              </div>
              <div className="flex justify-between text-sm text-gray-600">
                <span>Delivery Charges</span>
                <span className="font-mono">₹{order.delivery_charge}</span>
              </div>
              
              <div className="flex justify-between items-center font-bold text-gray-900 border-t border-gray-100 pt-4 mt-2">
                <span className="text-base">Grand Total</span>
                <span className="font-mono text-lg text-gray-950">
                  ₹{order.total_amount}
                </span>
              </div>
            </div>
          </div>

        </div>

        {/* Right Side: Customer Info, Address, Timeline */}
        <div className="space-y-6">
          
          {/* Customer Card */}
          <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-xs">
            <h3 className="text-sm font-bold uppercase tracking-wider text-gray-500 mb-4">
              Customer Information
            </h3>
            <div className="space-y-3.5 text-sm">
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-gray-400 text-lg">person</span>
                <span className="font-semibold text-gray-800">{order.customer_name}</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-gray-400 text-lg">call</span>
                <a
                  href={`tel:${order.customer_phone}`}
                  className="font-mono text-blue-600 hover:underline"
                >
                  {order.customer_phone}
                </a>
              </div>
              {order.customer_email && (
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-gray-400 text-lg">mail</span>
                  <a
                    href={`mailto:${order.customer_email}`}
                    className="text-blue-600 hover:underline truncate"
                  >
                    {order.customer_email}
                  </a>
                </div>
              )}
            </div>
          </div>

          {/* Delivery Address Card */}
          <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-xs">
            <h3 className="text-sm font-bold uppercase tracking-wider text-gray-500 mb-4">
              Delivery Address
            </h3>
            <div className="space-y-3 text-sm text-gray-700 leading-relaxed">
              <div className="flex items-start gap-3">
                <span className="material-symbols-outlined text-gray-400 text-lg mt-0.5">home</span>
                <div>
                  <p className="font-medium text-gray-800">{order.customer_address}</p>
                  {order.customer_landmark && (
                    <p className="text-xs text-gray-500 mt-0.5">
                      Landmark: <span className="font-medium">{order.customer_landmark}</span>
                    </p>
                  )}
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="material-symbols-outlined text-gray-400 text-lg mt-0.5">location_on</span>
                <div>
                  <p className="text-gray-850">
                    {order.customer_city}, {order.customer_state}
                  </p>
                  <p className="font-mono text-xs text-gray-500 font-semibold mt-0.5">
                    Pincode: {order.customer_pincode}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Order Lifecycle Timeline */}
          <OrderTimeline order={order} />

        </div>

      </div>
    </div>
  );
}
