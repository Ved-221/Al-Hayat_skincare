/**
 * RecentOrders.tsx
 * ----------------
 * Presentational component for recent orders on the Admin Dashboard.
 * Reuses StatusBadge from the Orders module for strict visual consistency.
 */

import Link from "next/link";
import type { Order } from "@/types/order";
import StatusBadge from "@/components/admin/orders/StatusBadge";
import EmptyState from "./EmptyState";

interface RecentOrdersProps {
  orders: Order[];
}

export default function RecentOrders({ orders }: RecentOrdersProps) {
  const displayOrders = orders.slice(0, 5);

  return (
    <div className="flex h-full flex-col overflow-hidden rounded-xl border border-gray-200 bg-white shadow-xs">
      {/* Section Header */}
      <div className="flex items-center justify-between border-b border-gray-100 px-5 py-4 sm:px-6">
        <div>
          <h2 className="text-base font-semibold text-gray-900">
            Recent Orders
          </h2>
          <p className="mt-0.5 text-xs text-gray-500">
            Latest customer orders and status updates
          </p>
        </div>

        {orders.length > 0 && (
          <Link
            href="/admin/orders"
            className="text-xs font-medium text-blue-600 hover:underline"
          >
            View all ({orders.length})
          </Link>
        )}
      </div>

      {/* Table / Empty State Content */}
      <div className="flex-1 p-5 sm:p-6">
        {displayOrders.length === 0 ? (
          <EmptyState
            icon="shopping_cart"
            title="No orders yet"
            description="When customers place orders, they will appear right here with real-time status updates."
          />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-left text-sm">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50 text-xs font-semibold uppercase tracking-wider text-gray-500">
                  <th className="py-3 pr-4">Order #</th>
                  <th className="px-4 py-3">Customer</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3">Amount</th>
                  <th className="px-4 py-3">Time</th>
                  <th className="py-3 pl-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {displayOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                    <td className="py-3 pr-4 font-mono text-xs font-medium text-gray-900">
                      #{order.order_number || order.id}
                    </td>
                    <td className="px-4 py-3 font-medium text-gray-700">
                      {order.customer_name}
                    </td>
                    <td className="px-4 py-3">
                      <StatusBadge status={order.status} />
                    </td>
                    <td className="px-4 py-3 font-semibold text-gray-900">
                      ₹{Number(order.total_amount || 0).toLocaleString("en-IN")}
                    </td>
                    <td className="px-4 py-3 text-xs text-gray-500">
                      {new Date(order.created_at).toLocaleDateString("en-IN", {
                        month: "short",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </td>
                    <td className="py-3 pl-4 text-right">
                      <Link
                        href={`/admin/orders/${order.id}`}
                        className="inline-flex items-center gap-1 rounded-md px-2.5 py-1 text-xs font-medium text-blue-600 hover:bg-blue-50 transition-colors"
                      >
                        <span>View</span>
                        <span className="material-symbols-outlined text-xs">
                          arrow_forward
                        </span>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
