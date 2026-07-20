"use client";

import { useCartStore } from "@/store/cartStore";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import { useEffect, useState } from "react";
import type { StoreSettings } from "@/types/settings";
import { DEFAULT_STORE_SETTINGS } from "@/types/settings";

export default function CartPage() {
  const { items, removeItem, updateQuantity, getSubtotal, getTotalItems } = useCartStore();
  const [settings, setSettings] = useState<StoreSettings>(DEFAULT_STORE_SETTINGS);
  const [toast, setToast] = useState<{ message: string; type: "success" | "info" } | null>(null);

  useEffect(() => {
    async function fetchSettings() {
      try {
        const { data, error } = await supabase
          .from("settings")
          .select("*")
          .eq("id", "default")
          .single();
        if (!error && data) {
          setSettings({ ...DEFAULT_STORE_SETTINGS, ...data });
        }
      } catch (err) {
        console.error("Error fetching settings:", err);
      }
    }
    fetchSettings();
  }, []);

  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => setToast(null), 6000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  const handleWhatsAppCheckout = () => {
    const whatsappNumber = settings?.whatsapp_number || "918796513654";
    const itemsList = items
      .map((item) => `• ${item.name} ×${item.quantity} (₹${item.price.toFixed(2)})`)
      .join("\n");

    const message = `Hello AL-HAYAT,

I would like to place an order for the following items in my cart:

${itemsList}

Estimated Total: ₹${getSubtotal().toFixed(2)}

Please guide me on how to proceed. Thank you!`;

    try {
      navigator.clipboard.writeText(message);
      setToast({
        message: "Order details copied! If WhatsApp doesn't load the text due to an existing draft, just paste this new message directly.",
        type: "success",
      });
    } catch (err) {
      console.warn("Failed to copy to clipboard:", err);
    }

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <main className="min-h-screen bg-[#fff8f1] flex flex-col">
      <div className="flex-1 pt-[120px] pb-24 px-6 max-w-5xl mx-auto w-full">
        <h1 
          className="text-center mb-10"
          style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(28px,4vw,40px)", fontWeight: 600, color: "#434b01" }}
        >
          Shopping Cart
        </h1>

        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center text-center py-20 bg-white rounded-2xl shadow-sm">
            <span className="material-symbols-outlined mb-6 text-[#c8c7b5]" style={{ fontSize: "64px" }}>shopping_bag</span>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "24px", color: "#1A1A1A", marginBottom: "8px" }}>
              Your cart is empty
            </h2>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "15px", color: "#787868", marginBottom: "24px" }}>
              Looks like you haven&apos;t added any products to your cart yet.
            </p>
            <Link 
              href="/products" 
              className="px-8 py-3 rounded-lg text-white hover:opacity-90 transition-opacity"
              style={{ background: "#434b01", fontFamily: "'Inter', sans-serif", fontWeight: 600, fontSize: "14px", textDecoration: "none" }}
            >
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* Cart Items List */}
            <div className="lg:col-span-8 flex flex-col gap-6">
              <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm">
                <div className="hidden md:grid grid-cols-12 gap-4 pb-4 border-b border-[#c8c7b5] mb-6">
                  <div className="col-span-6" style={{ fontFamily: "'Inter', sans-serif", fontSize: "12px", fontWeight: 600, color: "#787868", textTransform: "uppercase", letterSpacing: "0.05em" }}>Product</div>
                  <div className="col-span-2 text-center" style={{ fontFamily: "'Inter', sans-serif", fontSize: "12px", fontWeight: 600, color: "#787868", textTransform: "uppercase", letterSpacing: "0.05em" }}>Price</div>
                  <div className="col-span-2 text-center" style={{ fontFamily: "'Inter', sans-serif", fontSize: "12px", fontWeight: 600, color: "#787868", textTransform: "uppercase", letterSpacing: "0.05em" }}>Quantity</div>
                  <div className="col-span-2 text-right" style={{ fontFamily: "'Inter', sans-serif", fontSize: "12px", fontWeight: 600, color: "#787868", textTransform: "uppercase", letterSpacing: "0.05em" }}>Total</div>
                </div>

                <div className="flex flex-col gap-6">
                  {items.map((item) => (
                    <div key={item.productId} className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                      
                      {/* Product details */}
                      <div className="col-span-1 md:col-span-6 flex gap-4 items-center">
                        <div className="w-24 h-24 rounded bg-[#faf3ea] overflow-hidden flex-shrink-0">
                          <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                        </div>
                        <div>
                          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "10px", fontWeight: 600, color: "#b22a2b", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "4px" }}>
                            {item.category}
                          </p>
                          <Link href={`/product/${item.productId}`} style={{ textDecoration: "none" }}>
                            <h3 className="hover:text-[#b22a2b] transition-colors" style={{ fontFamily: "'Playfair Display', serif", fontSize: "18px", fontWeight: 600, color: "#1A1A1A" }}>
                              {item.name}
                            </h3>
                          </Link>
                          <button 
                            onClick={() => removeItem(item.productId)}
                            className="text-[#787868] hover:text-[#b22a2b] flex items-center gap-1 mt-2 transition-colors"
                            style={{ fontFamily: "'Inter', sans-serif", fontSize: "12px" }}
                          >
                            <span className="material-symbols-outlined" style={{ fontSize: "14px" }}>delete</span>
                            Remove
                          </button>
                        </div>
                      </div>

                      {/* Price */}
                      <div className="col-span-1 md:col-span-2 flex justify-between md:block md:text-center mt-2 md:mt-0">
                        <span className="md:hidden" style={{ fontFamily: "'Inter', sans-serif", fontSize: "13px", color: "#787868" }}>Price:</span>
                        <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "15px", fontWeight: 500, color: "#1A1A1A" }}>
                          ₹{item.price.toFixed(2)}
                        </span>
                      </div>

                      {/* Quantity */}
                      <div className="col-span-1 md:col-span-2 flex justify-between md:justify-center items-center mt-2 md:mt-0">
                        <span className="md:hidden" style={{ fontFamily: "'Inter', sans-serif", fontSize: "13px", color: "#787868" }}>Quantity:</span>
                        <div className="flex items-center border border-[#c8c7b5] rounded bg-[#fff8f1]">
                          <button 
                            onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                            className="px-2 py-1.5 hover:text-[#434b01] text-[#787868]"
                          >
                            <span className="material-symbols-outlined" style={{ fontSize: "16px" }}>remove</span>
                          </button>
                          <span className="px-3 text-[14px] font-semibold text-[#1A1A1A]">{item.quantity}</span>
                          <button 
                            onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                            className="px-2 py-1.5 hover:text-[#434b01] text-[#787868]"
                          >
                            <span className="material-symbols-outlined" style={{ fontSize: "16px" }}>add</span>
                          </button>
                        </div>
                      </div>

                      {/* Line Total */}
                      <div className="col-span-1 md:col-span-2 flex justify-between md:block md:text-right mt-2 md:mt-0">
                        <span className="md:hidden" style={{ fontFamily: "'Inter', sans-serif", fontSize: "13px", color: "#787868" }}>Total:</span>
                        <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "16px", fontWeight: 700, color: "#434b01" }}>
                          ₹{(item.price * item.quantity).toFixed(2)}
                        </span>
                      </div>
                      
                    </div>
                  ))}
                </div>
              </div>
              
              <Link 
                href="/products"
                className="inline-flex items-center gap-2 hover:text-[#b22a2b] transition-colors w-fit"
                style={{ fontFamily: "'Inter', sans-serif", fontSize: "14px", fontWeight: 600, color: "#434b01" }}
              >
                <span className="material-symbols-outlined" style={{ fontSize: "18px" }}>arrow_back</span>
                Continue Shopping
              </Link>
            </div>

            {/* Cart Summary */}
            <div className="lg:col-span-4">
              <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm lg:sticky lg:top-28">
                <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "20px", fontWeight: 600, color: "#1A1A1A", marginBottom: "20px" }}>
                  Order Summary
                </h2>
                
                <div className="flex flex-col gap-4 border-b border-[#c8c7b5] pb-6 mb-6">
                  <div className="flex justify-between items-center">
                    <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "14px", color: "#47483a" }}>Subtotal ({getTotalItems()} items)</span>
                    <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "15px", fontWeight: 500, color: "#1A1A1A" }}>₹{getSubtotal().toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "14px", color: "#47483a" }}>Estimated Delivery</span>
                    <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "15px", fontWeight: 500, color: "#1A1A1A" }}>Calculated on WhatsApp</span>
                  </div>
                </div>

                <div className="flex justify-between items-center mb-8">
                  <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "16px", fontWeight: 600, color: "#1A1A1A" }}>Estimated Total</span>
                  <span style={{ fontFamily: "'Playfair Display', serif", fontSize: "28px", fontWeight: 700, color: "#434b01" }}>
                    ₹{getSubtotal().toFixed(2)}
                  </span>
                </div>

                <button
                  onClick={handleWhatsAppCheckout}
                  className="w-full py-4 rounded-lg text-white hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
                  style={{ background: "#25D366", fontFamily: "'Inter', sans-serif", fontWeight: 600, fontSize: "14px", letterSpacing: "0.1em" }}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  ORDER ON WHATSAPP
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {toast && (
        <div 
          className="fixed bottom-6 right-6 z-50 flex items-start gap-3 bg-white border border-[#c8c7b5] shadow-lg rounded-xl px-5 py-4 max-w-sm animate-fade-in-up"
          style={{ boxShadow: "0 10px 30px rgba(0,0,0,0.08)" }}
        >
          <span className="material-symbols-outlined text-[#25D366] mt-0.5" style={{ fontSize: "22px" }}>
            content_copy
          </span>
          <div className="flex-1">
            <h4 style={{ fontFamily: "'Playfair Display', serif", fontSize: "14px", fontWeight: 600, color: "#434b01", marginBottom: "2px" }}>
              Order Copied!
            </h4>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "11px", color: "#47483a", lineHeight: 1.45 }}>
              {toast.message}
            </p>
          </div>
          <button
            onClick={() => setToast(null)}
            className="text-gray-400 hover:text-gray-600 transition-colors mt-0.5"
            style={{ background: "none", border: "none", cursor: "pointer", padding: 0 }}
          >
            <span className="material-symbols-outlined" style={{ fontSize: "18px" }}>close</span>
          </button>
        </div>
      )}
    </main>
  );
}
