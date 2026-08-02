import { Order } from "@/types/order";
import { formatOrderDate } from "./OrderTable";

interface OrderTimelineProps {
  order: Order;
}

export default function OrderTimeline({ order }: OrderTimelineProps) {
  const events = [
    {
      key: "created",
      label: "Order Created",
      time: order.created_at,
      icon: "shopping_cart",
      color: "bg-gray-100 text-gray-600 border-gray-200",
    },
    {
      key: "accepted",
      label: "Order Accepted",
      time: order.accepted_at,
      icon: "check",
      color: "bg-blue-50 text-blue-600 border-blue-200",
    },
    {
      key: "completed",
      label: "Order Completed",
      time: order.completed_at,
      icon: "done_all",
      color: "bg-green-50 text-green-600 border-green-200",
    },
    {
      key: "cancelled",
      label: "Order Cancelled",
      time: order.cancelled_at,
      icon: "close",
      color: "bg-red-50 text-red-600 border-red-200",
    },
  ].filter((e) => e.time !== null && e.time !== undefined); // Only display lifecycle events that actually exist

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-xs">
      <h3 className="text-sm font-bold uppercase tracking-wider text-gray-500 mb-6">
        Order Lifecycle Timeline
      </h3>

      <div className="relative border-l border-gray-200 ml-3 space-y-6">
        {events.map((e) => (
          <div key={e.key} className="relative pl-7">
            {/* Timeline dot/icon */}
            <span
              className={`absolute -left-3.5 top-0.5 flex h-7 w-7 items-center justify-center rounded-full border text-xs font-semibold shadow-xs ${e.color}`}
            >
              <span className="material-symbols-outlined text-sm">{e.icon}</span>
            </span>

            {/* Event Details */}
            <div className="space-y-1">
              <h4 className="text-sm font-semibold text-gray-800">
                {e.label}
              </h4>
              <p className="font-mono text-xs text-gray-500">
                {formatOrderDate(e.time!)}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
