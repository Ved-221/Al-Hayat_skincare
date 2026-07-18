import Link from "next/link";
import { Order } from "@/types/order";
import StatusBadge from "./StatusBadge";

interface OrderTableProps {
  orders: Order[];
}

export function formatOrderDate(dateString: string): string {
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return "—";
  
  const day = date.getDate();
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const month = months[date.getMonth()];
  const year = date.getFullYear();

  let hours = date.getHours();
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12;
  hours = hours ? hours : 12; // hour '0' should be '12'

  return `${day} ${month} ${year}, ${hours}:${minutes} ${ampm}`;
}

export default function OrderTable({ orders }: OrderTableProps) {
  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-xs">
      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-left text-sm">
          <thead>
            <tr className="border-b border-gray-200 bg-gray-50 text-xs font-semibold uppercase tracking-wider text-gray-500">
              <th className="py-3.5 px-4 font-semibold text-gray-900">Order Number</th>
              <th className="py-3.5 px-4 font-semibold text-gray-900">Customer Name</th>
              <th className="py-3.5 px-4 font-semibold text-gray-900">Phone</th>
              <th className="py-3.5 px-4 font-semibold text-gray-900">Total</th>
              <th className="py-3.5 px-4 font-semibold text-gray-900">Status</th>
              <th className="py-3.5 px-4 font-semibold text-gray-900">Date</th>
              <th className="py-3.5 px-4 font-semibold text-gray-900 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {orders.map((order) => (
              <tr key={order.id} className="hover:bg-gray-50/80 transition-colors">
                <td className="py-4 px-4 font-mono text-sm font-semibold text-gray-900">
                  {order.order_number}
                </td>
                <td className="py-4 px-4 font-medium text-gray-700">
                  {order.customer_name}
                </td>
                <td className="py-4 px-4 text-gray-500 font-mono text-xs">
                  {order.customer_phone}
                </td>
                <td className="py-4 px-4 font-mono font-bold text-gray-900">
                  ₹{order.total_amount}
                </td>
                <td className="py-4 px-4">
                  <StatusBadge status={order.status} />
                </td>
                <td className="py-4 px-4 text-xs text-gray-500 whitespace-nowrap">
                  {formatOrderDate(order.created_at)}
                </td>
                <td className="py-4 px-4 text-right">
                  <Link
                    href={`/admin/orders/${order.id}`}
                    className="inline-flex items-center rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-xs font-semibold text-gray-700 shadow-xs hover:bg-gray-50 transition-colors"
                  >
                    View
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
