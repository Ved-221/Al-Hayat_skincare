import { requireCustomer } from "@/lib/auth";
import Link from "next/link";
import { LogOut, User, ShoppingBag, Heart, LayoutDashboard } from "lucide-react";
import { logoutAction } from "./actions";

export default async function AccountLayout({ children }: { children: React.ReactNode }) {
  const user = await requireCustomer();
  // We can get the email name part as a display name
  const displayName = user.email ? user.email.split('@')[0] : "Customer";

  return (
    <div className="min-h-screen bg-[#fff8f1] pt-[90px] pb-20">
      <div className="mx-auto max-w-6xl px-4 w-full flex-1">
        
        {/* Mobile Header (Only visible on small screens) */}
        <div className="md:hidden mb-4 flex items-center justify-between bg-white p-4 rounded-2xl shadow-sm border border-[#c8c7b5]/30">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-[#434b01] flex items-center justify-center text-white font-bold text-lg">
              {displayName.charAt(0).toUpperCase()}
            </div>
            <div>
              <p className="text-xs text-[#787868] font-medium uppercase tracking-wider">Welcome</p>
              <p className="text-sm font-bold text-[#434b01]">{displayName}</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-6 md:gap-8">
          
          {/* Sidebar Nav */}
          <div className="w-full md:w-72 shrink-0 space-y-4 md:space-y-6">
            
            {/* Desktop User Profile Card */}
            <div className="hidden md:flex flex-col items-center text-center p-6 bg-white rounded-3xl border border-[#c8c7b5]/30 shadow-[0_4px_20px_rgba(0,0,0,0.02)]">
              <div className="h-20 w-20 rounded-full bg-[#faf3ea] border-2 border-[#434b01]/10 flex items-center justify-center text-[#434b01] mb-4 shadow-inner">
                <User size={32} strokeWidth={1.5} />
              </div>
              <h2 className="text-xl font-bold text-[#434b01]" style={{ fontFamily: "'Playfair Display', serif" }}>
                {displayName}
              </h2>
              <p className="text-sm text-[#787868] mt-1">{user.email}</p>
            </div>

            {/* Navigation Menu */}
            <div className="bg-white rounded-2xl md:rounded-3xl border border-[#c8c7b5]/30 p-2 md:p-3 shadow-sm md:shadow-[0_4px_20px_rgba(0,0,0,0.02)]">
              <nav className="flex flex-row md:flex-col gap-1 overflow-x-auto no-scrollbar items-center md:items-stretch">
                <Link href="/account" className="flex items-center gap-2 md:gap-3 text-sm font-semibold text-[#434b01] hover:text-[#5a6401] hover:bg-[#faf3ea]/70 px-3 md:px-4 py-2.5 md:py-3 rounded-xl md:rounded-2xl transition-all whitespace-nowrap">
                  <LayoutDashboard size={18} className="text-[#787868] shrink-0" />
                  Overview
                </Link>
                <Link href="/account/orders" className="flex items-center gap-2 md:gap-3 text-sm font-semibold text-[#434b01] hover:text-[#5a6401] hover:bg-[#faf3ea]/70 px-3 md:px-4 py-2.5 md:py-3 rounded-xl md:rounded-2xl transition-all whitespace-nowrap">
                  <ShoppingBag size={18} className="text-[#787868] shrink-0" />
                  Order History
                </Link>
                <Link href="/account/wishlist" className="flex items-center gap-2 md:gap-3 text-sm font-semibold text-[#434b01] hover:text-[#5a6401] hover:bg-[#faf3ea]/70 px-3 md:px-4 py-2.5 md:py-3 rounded-xl md:rounded-2xl transition-all whitespace-nowrap">
                  <Heart size={18} className="text-[#787868] shrink-0" />
                  Wishlist
                </Link>
                
                <div className="hidden md:block h-px bg-[#c8c7b5]/20 my-2 mx-2 shrink-0"></div>
                <div className="md:hidden w-px h-6 bg-[#c8c7b5]/30 mx-1 shrink-0"></div>
                
                <form action={logoutAction} className="shrink-0">
                  <button 
                    type="submit"
                    className="flex items-center gap-2 md:gap-3 text-sm font-semibold text-[#b22a2b] hover:bg-red-50 px-3 md:px-4 py-2.5 md:py-3 rounded-xl md:rounded-2xl transition-all whitespace-nowrap w-full"
                  >
                    <LogOut size={18} className="shrink-0" />
                    Sign Out
                  </button>
                </form>
              </nav>
            </div>
            
            {/* Help Block */}
            <div className="hidden md:block bg-[#434b01] rounded-3xl p-6 text-white text-center shadow-md relative overflow-hidden">
              <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-white opacity-5 rounded-full blur-2xl"></div>
              <h3 className="font-bold mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>Need Help?</h3>
              <p className="text-xs text-white/80 mb-4 leading-relaxed">Have questions about your order or our products?</p>
              <Link href="/contact" className="inline-block bg-white text-[#434b01] text-xs font-bold px-5 py-2.5 rounded-xl hover:bg-[#faf3ea] transition-colors">
                Contact Us
              </Link>
            </div>

          </div>
  
          {/* Main Content Area */}
          <div className="flex-1 min-w-0">
            {children}
          </div>
          
        </div>
      </div>
    </div>
  );
}
