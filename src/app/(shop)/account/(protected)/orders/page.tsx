import { requireCustomer } from "@/lib/auth";
import { createClient } from "@/lib/supabase-server";
import Link from "next/link";
import { Order } from "@/types/order";
import { Package, ChevronRight, ShoppingBag } from "lucide-react";

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
      
      {/* Header */}
      <div className="rounded-3xl border border-[#c8c7b5]/30 bg-white p-8 shadow-[0_4px_20px_rgba(0,0,0,0.02)] relative overflow-hidden">
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-32 h-32 bg-[#faf3ea] rounded-full opacity-50 blur-3xl"></div>
        <div className="relative z-10 flex items-center gap-4">
          <div className="h-14 w-14 rounded-2xl bg-[#434b01] flex items-center justify-center text-white shadow-md">
            <ShoppingBag size={26} strokeWidth={1.5} />
          </div>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-[#434b01]" style={{ fontFamily: "'Playfair Display', serif" }}>
              Order History
            </h1>
            <p className="text-sm text-[#787868] mt-1">
              View and track all your premium herbal orders.
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {(!orders || orders.length === 0) ? (
          <div className="rounded-3xl border border-[#c8c7b5]/30 bg-white p-12 text-center shadow-[0_4px_20px_rgba(0,0,0,0.02)]">
            <div className="h-20 w-20 bg-[#faf3ea] rounded-full flex items-center justify-center mx-auto mb-5 text-[#787868]">
              <Package size={32} strokeWidth={1.5} />
            </div>
            <h2 className="text-xl font-bold text-[#434b01] mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
              No Orders Found
            </h2>
            <p className="text-[#787868] mb-8 max-w-sm mx-auto text-sm">
              You haven&apos;t placed any orders yet. Explore our handcrafted selection of skincare products.
            </p>
            <Link href="/products" className="inline-block bg-[#434b01] px-8 py-3.5 text-sm font-bold text-white transition-all hover:bg-[#5a6401] hover:shadow-lg rounded-xl tracking-wide">
              DISCOVER PRODUCTS
            </Link>
          </div>
        ) : (
          (orders as Order[]).map((order) => (
            <div key={order.id} className="group rounded-3xl border border-[#c8c7b5]/30 bg-white p-6 shadow-sm hover:shadow-md transition-all flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
              
              <div className="flex items-start gap-4 w-full md:w-auto">
                <div className="h-12 w-12 rounded-xl bg-[#faf3ea] flex items-center justify-center text-[#434b01] shrink-0 mt-1 md:mt-0">
                  <Package size={20} strokeWidth={1.5} />
                </div>
                <div className="w-full">
                  <Link href={`/account/orders/${order.id}`} className="font-bold text-lg text-[#434b01] hover:text-[#b22a2b] transition-colors inline-block mb-1">
                    Order #{order.order_number}
                  </Link>
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-[#787868]">
                    <p className="flex items-center gap-1">
                      {new Date(order.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}
                    </p>
                    <span className="hidden md:inline text-[#c8c7b5]">•</span>
                    <p className="font-semibold text-[#434b01]">₹{order.total_amount} Total</p>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-row md:flex-col items-center md:items-end justify-between w-full md:w-auto border-t md:border-t-0 border-[#c8c7b5]/20 pt-4 md:pt-0 gap-4">
                <span className={`text-xs px-3 py-1.5 rounded-full font-bold tracking-wide uppercase ${
                  order.status === 'Completed' ? 'bg-green-100 text-green-700 border border-green-200' :
                  order.status === 'Cancelled' ? 'bg-red-100 text-red-700 border border-red-200' :
                  'bg-blue-100 text-blue-700 border border-blue-200'
                }`}>
                  {order.status}
                </span>
                
                <Link href={`/account/orders/${order.id}`} className="flex items-center gap-1 text-sm font-bold text-[#b22a2b] hover:text-[#8a2020] transition-colors">
                  View Details <ChevronRight size={16} />
                </Link>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
