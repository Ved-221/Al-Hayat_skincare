import { ORDER_STATUS, OrderStatus } from "@/types/order";

interface StatusBadgeProps {
  status: OrderStatus;
}

export default function StatusBadge({ status }: StatusBadgeProps) {
  const map: Record<OrderStatus, { label: string; className: string }> = {
    [ORDER_STATUS.PENDING]: {
      label: "Pending",
      className: "bg-amber-50 text-amber-700 border border-amber-200",
    },
    [ORDER_STATUS.ACCEPTED]: {
      label: "Accepted",
      className: "bg-blue-50 text-blue-700 border border-blue-200",
    },
    [ORDER_STATUS.PREPARING]: {
      label: "Preparing",
      className: "bg-purple-50 text-purple-700 border border-purple-200",
    },
    [ORDER_STATUS.READY]: {
      label: "Ready",
      className: "bg-cyan-50 text-cyan-700 border border-cyan-200",
    },
    [ORDER_STATUS.COMPLETED]: {
      label: "Completed",
      className: "bg-green-50 text-green-700 border border-green-200",
    },
    [ORDER_STATUS.CANCELLED]: {
      label: "Cancelled",
      className: "bg-red-50 text-red-700 border border-red-200",
    },
  };

  const { label, className } = map[status] ?? {
    label: status,
    className: "bg-gray-50 text-gray-700 border border-gray-200",
  };

  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${className}`}>
      {label}
    </span>
  );
}
