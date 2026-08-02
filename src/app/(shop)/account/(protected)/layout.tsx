import { requireCustomer } from "@/lib/auth";
import Link from "next/link";
import { LogOut } from "lucide-react";
import { logoutAction } from "./actions";

export default async function AccountLayout({ children }: { children: React.ReactNode }) {
  await requireCustomer();

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 w-full flex-1">
      <div className="flex flex-col md:flex-row gap-8">
        
        {/* Sidebar Nav */}
        <div className="w-full md:w-64 shrink-0 space-y-6">
          <div>
            <h2 className="text-xl font-bold text-[#434b01] mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
              My Account
            </h2>
            <nav className="flex flex-col gap-2">
              <Link href="/account" className="text-sm font-medium text-[#434b01] hover:text-[#5a6401] hover:bg-[#faf3ea]/50 p-2 rounded-lg transition-colors">
                Overview
              </Link>
              <Link href="/account/orders" className="text-sm font-medium text-[#434b01] hover:text-[#5a6401] hover:bg-[#faf3ea]/50 p-2 rounded-lg transition-colors">
                Order History
              </Link>
              <Link href="/account/wishlist" className="text-sm font-medium text-[#434b01] hover:text-[#5a6401] hover:bg-[#faf3ea]/50 p-2 rounded-lg transition-colors">
                Wishlist
              </Link>
            </nav>
          </div>
          
          <div className="pt-4 border-t border-[#c8c7b5]/30">
            <form action={logoutAction}>
              <button 
                type="submit"
                className="flex items-center gap-2 text-sm font-medium text-red-600 hover:text-red-700 p-2 hover:bg-red-50 rounded-lg transition-colors w-full"
              >
                <LogOut size={16} />
                Logout
              </button>
            </form>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 min-w-0">
          {children}
        </div>
        
      </div>
    </div>
  );
}
