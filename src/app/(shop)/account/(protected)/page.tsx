import { requireCustomer } from "@/lib/auth";
import Link from "next/link";
import { createClient } from "@/lib/supabase-server";
import { Package, Clock, ShieldCheck, ChevronRight } from "lucide-react";

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

  const displayName = user.email ? user.email.split('@')[0] : "Customer";

  return (
    <div className="space-y-6">
      
      {/* Welcome Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-[#434b01] p-8 md:p-10 shadow-lg text-white">
        <div className="absolute top-0 right-0 -mt-12 -mr-12 w-48 h-48 bg-white opacity-10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 -mb-12 -ml-12 w-32 h-32 bg-white opacity-5 rounded-full blur-2xl"></div>
        
        <div className="relative z-10">
          <h1 className="text-3xl md:text-4xl font-bold mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>
            Welcome back, {displayName}!
          </h1>
          <p className="text-white/80 max-w-lg leading-relaxed text-sm">
            Manage your AL-HAYAT profile, track your premium herbal orders, and review your wishlist all in one place.
          </p>
        </div>
      </div>

      {/* Quick Stats/Info Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-3xl p-6 border border-[#c8c7b5]/30 shadow-[0_4px_20px_rgba(0,0,0,0.02)] flex items-center gap-4 hover:shadow-md transition-shadow">
          <div className="h-12 w-12 rounded-full bg-[#faf3ea] flex items-center justify-center text-[#434b01]">
            <Package size={24} strokeWidth={1.5} />
          </div>
          <div>
            <p className="text-xs text-[#787868] uppercase font-bold tracking-wider mb-1">Orders</p>
            <Link href="/account/orders" className="text-sm font-semibold text-[#434b01] hover:text-[#b22a2b] transition-colors flex items-center gap-1">
              View History <ChevronRight size={14} />
            </Link>
          </div>
        </div>
        
        <div className="bg-white rounded-3xl p-6 border border-[#c8c7b5]/30 shadow-[0_4px_20px_rgba(0,0,0,0.02)] flex items-center gap-4 hover:shadow-md transition-shadow">
          <div className="h-12 w-12 rounded-full bg-[#faf3ea] flex items-center justify-center text-[#434b01]">
            <ShieldCheck size={24} strokeWidth={1.5} />
          </div>
          <div>
            <p className="text-xs text-[#787868] uppercase font-bold tracking-wider mb-1">Security</p>
            <p className="text-sm font-semibold text-[#434b01]">Protected Account</p>
          </div>
        </div>
        
        <div className="bg-white rounded-3xl p-6 border border-[#c8c7b5]/30 shadow-[0_4px_20px_rgba(0,0,0,0.02)] flex items-center gap-4 hover:shadow-md transition-shadow">
          <div className="h-12 w-12 rounded-full bg-[#faf3ea] flex items-center justify-center text-[#434b01]">
            <Clock size={24} strokeWidth={1.5} />
          </div>
          <div>
            <p className="text-xs text-[#787868] uppercase font-bold tracking-wider mb-1">Member Since</p>
            <p className="text-sm font-semibold text-[#434b01]">Today</p>
          </div>
        </div>
      </div>

      {/* Recent Orders Section */}
      <div className="bg-white rounded-3xl p-6 md:p-8 border border-[#c8c7b5]/30 shadow-[0_4px_20px_rgba(0,0,0,0.02)]">
        <div className="flex items-center justify-between mb-6 pb-4 border-b border-[#c8c7b5]/20">
          <h2 className="text-2xl font-bold text-[#434b01]" style={{ fontFamily: "'Playfair Display', serif" }}>
            Recent Orders
          </h2>
          <Link href="/account/orders" className="text-sm font-bold text-[#b22a2b] hover:text-[#8a2020] transition-colors flex items-center gap-1 bg-red-50 px-4 py-2 rounded-full">
            View All
          </Link>
        </div>

        {(!recentOrders || recentOrders.length === 0) ? (
          <div className="py-12 text-center">
            <div className="h-16 w-16 bg-[#faf3ea] rounded-full flex items-center justify-center mx-auto mb-4 text-[#787868]">
              <Package size={28} strokeWidth={1.5} />
            </div>
            <p className="text-[#434b01] font-bold text-lg mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>No recent orders</p>
            <p className="text-sm text-[#787868] max-w-sm mx-auto mb-6">You haven&apos;t placed any orders yet. Discover our premium herbal collection.</p>
            <Link href="/products" className="inline-block bg-[#434b01] text-white font-bold text-sm px-8 py-3 rounded-xl hover:bg-[#5a6401] transition-all">
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {recentOrders.map((order) => (
              <div key={order.id} className="group flex flex-col md:flex-row justify-between items-start md:items-center p-5 md:p-6 border border-[#c8c7b5]/30 rounded-2xl gap-4 bg-white hover:border-[#434b01]/30 transition-all shadow-sm hover:shadow-md">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-xl bg-[#faf3ea] flex items-center justify-center text-[#434b01] shrink-0">
                    <Package size={20} strokeWidth={1.5} />
                  </div>
                  <div>
                    <p className="font-bold text-[#434b01]">Order #{order.order_number}</p>
                    <p className="text-sm text-[#787868] mt-1">
                      {new Date(order.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                    </p>
                  </div>
                </div>
                
                <div className="flex flex-row md:flex-col items-center md:items-end justify-between w-full md:w-auto gap-4 md:gap-2 border-t md:border-t-0 border-[#c8c7b5]/20 pt-4 md:pt-0">
                  <div className="flex items-center gap-3">
                    <span className="font-bold text-[#434b01] md:hidden">Total:</span>
                    <p className="font-bold text-[#434b01] text-lg">₹{order.total_amount}</p>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <span className={`text-xs px-3 py-1.5 rounded-full font-bold tracking-wide ${
                      order.status === 'Completed' ? 'bg-green-100 text-green-700' :
                      order.status === 'Cancelled' ? 'bg-red-100 text-red-700' :
                      'bg-blue-100 text-blue-700'
                    }`}>
                      {order.status}
                    </span>
                    <Link href={`/account/orders/${order.id}`} className="p-2 rounded-full bg-gray-50 text-[#434b01] opacity-0 group-hover:opacity-100 transition-opacity hidden md:flex">
                      <ChevronRight size={16} />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
