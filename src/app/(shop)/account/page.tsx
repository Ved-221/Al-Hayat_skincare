import { requireCustomer } from "@/lib/auth";
import Link from "next/link";
import { createClient } from "@/lib/supabase-server";

export default async function AccountOverviewPage() {
  const user = await requireCustomer();
  const supabase = await createClient();

  // Fetch recent orders for this customer specifically
  const { data: recentOrders } = await supabase
    .from("orders")
    .select("*")
    .eq("customer_id", user.id)
    .is("deleted_at", null)
    .order("created_at", { ascending: false })
    .limit(3);

  return (
    <div className="space-y-6">
      <div className="rounded-xl border border-[#c8c7b5]/40 bg-white p-6 shadow-xs">
        <h1 className="text-2xl font-bold text-[#434b01]" style={{ fontFamily: "'Playfair Display', serif" }}>
          Welcome back{user.email ? `, ${user.email.split('@')[0]}` : ""}!
        </h1>
        <p className="mt-2 text-sm text-[#787868]">
          Here you can view your recent orders and manage your wishlist.
        </p>
      </div>

      <div className="rounded-xl border border-[#c8c7b5]/40 bg-white p-6 shadow-xs">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-[#434b01]" style={{ fontFamily: "'Playfair Display', serif" }}>
            Recent Orders
          </h2>
          <Link href="/account/orders" className="text-sm font-semibold text-[#b22a2b] hover:underline">
            View All
          </Link>
        </div>

        {(!recentOrders || recentOrders.length === 0) ? (
          <p className="text-sm text-[#787868]">You have no recent orders.</p>
        ) : (
          <div className="space-y-4">
            {recentOrders.map((order) => (
              <div key={order.id} className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 border rounded-lg gap-4 bg-[#faf3ea]/30">
                <div>
                  <p className="font-semibold text-sm">Order #{order.order_number}</p>
                  <p className="text-xs text-[#787868] mt-1">
                    Placed on {new Date(order.created_at).toLocaleDateString()}
                  </p>
                </div>
                <div className="flex flex-col items-end gap-1">
                  <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                    order.status === 'Completed' ? 'bg-green-100 text-green-700' :
                    order.status === 'Cancelled' ? 'bg-red-100 text-red-700' :
                    'bg-blue-100 text-blue-700'
                  }`}>
                    {order.status}
                  </span>
                  <p className="font-bold text-sm">₹{order.total_amount}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
