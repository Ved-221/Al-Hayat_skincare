"use client";

import { useCartStore } from "@/store/cartStore";
import { useEffect, useState } from "react";
import Image from "next/image";
import { resolveImageUrl } from "@/lib/utils";
export default function CartSummary() {
  const { items, getSubtotal, getGrandTotal, getTotalItems } = useCartStore();
  const [mounted, setMounted] = useState(false);

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm">
      <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "20px", fontWeight: 600, color: "#1A1A1A", marginBottom: "20px" }}>
        Order Summary
      </h2>
      
      <div className="flex flex-col gap-4 border-b border-[#c8c7b5] pb-6 mb-6">
        {items.map((item) => (
          <div key={item.productId} className="flex gap-4">
            <div className="w-16 h-16 rounded bg-[#faf3ea] overflow-hidden flex-shrink-0 relative border border-[#EAE2D1]">
              <Image src={resolveImageUrl(item.image)} alt={item.name} fill className="object-cover" sizes="64px" />
              <div className="absolute -top-2 -right-2 bg-[#434b01] text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-full">
                {item.quantity}
              </div>
            </div>
            <div className="flex-1 flex flex-col justify-center">
              <span style={{ fontFamily: "'Playfair Display', serif", fontSize: "14px", fontWeight: 600, color: "#1A1A1A" }}>
                {item.name}
              </span>
              <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "12px", color: "#787868" }}>
                ₹{item.price.toFixed(2)} x {item.quantity}
              </span>
            </div>
            <div className="flex flex-col justify-center items-end">
              <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "14px", fontWeight: 500, color: "#434b01" }}>
                ₹{(item.price * item.quantity).toFixed(2)}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="flex flex-col gap-3 border-b border-[#c8c7b5] pb-6 mb-6">
        <div className="flex justify-between items-center">
          <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "14px", color: "#47483a" }}>Subtotal ({getTotalItems()} items)</span>
          <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "15px", fontWeight: 500, color: "#1A1A1A" }}>₹{getSubtotal().toFixed(2)}</span>
        </div>
        <div className="flex justify-between items-center">
          <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "14px", color: "#47483a" }}>Delivery</span>
          <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "15px", fontWeight: 500, color: "#1A1A1A" }}>₹0.00</span>
        </div>
      </div>

      <div className="flex justify-between items-center">
        <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "16px", fontWeight: 600, color: "#1A1A1A" }}>Total</span>
        <span style={{ fontFamily: "'Playfair Display', serif", fontSize: "28px", fontWeight: 700, color: "#434b01" }}>
          ₹{getGrandTotal(0, 0).toFixed(2)}
        </span>
      </div>
    </div>
  );
}
