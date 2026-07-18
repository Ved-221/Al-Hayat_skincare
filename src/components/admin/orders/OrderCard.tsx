import Link from "next/link";
import { Order } from "@/types/order";
import StatusBadge from "./StatusBadge";
import { formatOrderDate } from "./OrderTable";

interface OrderCardProps {
  orders: Order[];
}

export default function OrderCard({ orders }: OrderCardProps) {
  return (
    <div className="space-y-4">
      {orders.map((order) => (
        <div
          key={order.id}
          className="rounded-xl border border-gray-200 bg-white p-5 shadow-xs hover:border-gray-300 transition-all duration-200"
        >
          {/* Header row */}
          <div className="flex items-center justify-between gap-4 mb-3">
            <span className="font-mono text-sm font-bold text-gray-900">
              {order.order_number}
            </span>
            <StatusBadge status={order.status} />
          </div>

          {/* Customer info */}
          <div className="space-y-1 mb-4">
            <h4 className="text-sm font-semibold text-gray-800">
              {order.customer_name}
            </h4>
            <div className="flex flex-col text-xs text-gray-500 gap-0.5">
              <span className="font-mono">{order.customer_phone}</span>
              {order.customer_email && (
                <span className="truncate">{order.customer_email}</span>
              )}
            </div>
          </div>

          {/* Footer row */}
          <div className="flex items-center justify-between pt-3.5 border-t border-gray-100">
            <div className="flex flex-col">
              <span className="text-[10px] text-gray-400 font-semibold uppercase tracking-wider">
                Total Amount
              </span>
              <span className="font-mono text-base font-extrabold text-gray-900">
                ₹{order.total_amount}
              </span>
            </div>
            
            <div className="flex items-center gap-3">
              <span className="text-[10px] text-gray-400 text-right hidden sm:inline-block">
                {formatOrderDate(order.created_at)}
              </span>
              <Link
                href={`/admin/orders/${order.id}`}
                className="inline-flex items-center rounded-lg border border-gray-200 bg-white px-4 py-2 text-xs font-bold text-gray-700 shadow-xs hover:bg-gray-50 transition-colors"
              >
                View Details
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
