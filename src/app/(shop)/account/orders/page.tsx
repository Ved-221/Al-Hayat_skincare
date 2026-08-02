import { requireCustomer } from "@/lib/auth";
import { createClient } from "@/lib/supabase-server";
import Link from "next/link";
import { Order } from "@/types/order";

export default async function AccountOrdersPage() {
  const user = await requireCustomer();
  const supabase = await createClient();

  const { data: orders } = await supabase
    .from("orders")
    .select("*")
    .eq("customer_id", user.id)
    .is("deleted_at", null)
    .order("created_at", { ascending: false });

  return (
    <div className="space-y-6">
      <div className="rounded-xl border border-[#c8c7b5]/40 bg-white p-6 shadow-xs">
        <h1 className="text-2xl font-bold text-[#434b01] mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
          Order History
        </h1>
        <p className="text-sm text-[#787868]">
          View and track all your previous orders.
        </p>
      </div>

      <div className="space-y-4">
        {(!orders || orders.length === 0) ? (
          <div className="rounded-xl border border-[#c8c7b5]/40 bg-white p-8 text-center shadow-xs">
            <p className="text-[#787868] mb-4">You haven&apos;t placed any orders yet.</p>
            <Link href="/products" className="inline-block rounded-xl bg-[#434b01] px-6 py-2 text-sm font-bold text-white transition-colors hover:bg-[#5a6401]">
              Start Shopping
            </Link>
          </div>
        ) : (
          (orders as Order[]).map((order) => (
            <div key={order.id} className="rounded-xl border border-[#c8c7b5]/40 bg-white p-6 shadow-xs flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <Link href={`/account/orders/${order.id}`} className="font-semibold text-lg hover:underline text-[#434b01]">
                  Order #{order.order_number}
                </Link>
                <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4 mt-1 text-sm text-[#787868]">
                  <p>Placed on {new Date(order.created_at).toLocaleDateString()}</p>
                  <p className="hidden sm:block">•</p>
                  <p>₹{order.total_amount} Total</p>
                </div>
              </div>
              
              <div className="flex flex-col sm:items-end gap-3 w-full sm:w-auto">
                <span className={`self-start sm:self-end text-xs px-3 py-1 rounded-full font-medium ${
                  order.status === 'Completed' ? 'bg-green-100 text-green-700' :
                  order.status === 'Cancelled' ? 'bg-red-100 text-red-700' :
                  'bg-blue-100 text-blue-700'
                }`}>
                  {order.status}
                </span>
                <Link href={`/account/orders/${order.id}`} className="text-sm font-semibold text-[#b22a2b] hover:underline whitespace-nowrap">
                  View Details & Tracking →
                </Link>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
