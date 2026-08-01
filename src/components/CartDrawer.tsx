"use client";

import { useCartStore } from "@/store/cartStore";
import { useLockBodyScroll } from "@/lib/useLockBodyScroll";
import Link from "next/link";
import Image from "next/image";
import { resolveImageUrl } from "@/lib/utils";
interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CartDrawer({ isOpen, onClose }: CartDrawerProps) {
  const { items, removeItem, updateQuantity, getSubtotal } = useCartStore();

  useLockBodyScroll(isOpen);

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-[200] transition-opacity duration-300 ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        style={{ background: "rgba(30,27,22,0.55)", backdropFilter: "blur(4px)" }}
        onClick={onClose}
      />

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 h-full z-[210] flex flex-col transition-transform duration-300 w-full max-w-sm`}
        style={{
          background: "#fff8f1",
          boxShadow: "-4px 0 32px rgba(0,0,0,0.12)",
          transform: isOpen ? "translateX(0)" : "translateX(100%)",
        }}
      >
        <div className="flex items-center justify-between p-6 border-b border-[#c8c7b5]">
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "24px", color: "#434b01" }}>
            Your Cart
          </h2>
          <button onClick={onClose} className="text-[#47483a] hover:text-[#b22a2b]">
            <span className="material-symbols-outlined" style={{ fontSize: "28px" }}>close</span>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center opacity-70">
              <span className="material-symbols-outlined mb-4" style={{ fontSize: "48px" }}>shopping_bag</span>
              <p style={{ fontFamily: "'Inter', sans-serif", color: "#47483a" }}>Your cart is empty.</p>
              <button 
                onClick={onClose}
                className="mt-6 px-6 py-2 rounded border border-[#434b01] text-[#434b01] hover:bg-[#434b01] hover:text-white transition-colors"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            <div className="flex flex-col gap-6">
              {items.map((item) => (
                <div key={item.productId} className="flex gap-4">
                  <div className="w-20 h-20 rounded bg-[#faf3ea] overflow-hidden flex-shrink-0 relative">
                    <Image src={resolveImageUrl(item.image)} alt={item.name} fill className="object-cover" sizes="80px" />
                  </div>
                  <div className="flex-1 flex flex-col justify-between">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 style={{ fontFamily: "'Inter', sans-serif", fontSize: "14px", fontWeight: 600, color: "#1A1A1A" }}>
                          {item.name}
                        </h3>
                        <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "12px", color: "#787868" }}>
                          ₹{item.price.toFixed(2)}
                        </p>
                      </div>
                      <button 
                        onClick={() => removeItem(item.productId)}
                        className="text-[#787868] hover:text-[#b22a2b]"
                      >
                        <span className="material-symbols-outlined" style={{ fontSize: "18px" }}>delete</span>
                      </button>
                    </div>
                    
                    <div className="flex justify-between items-center mt-2">
                      <div className="flex items-center border border-[#c8c7b5] rounded">
                        <button 
                          onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                          className="px-2 py-1 hover:text-[#434b01]"
                        >
                          <span className="material-symbols-outlined" style={{ fontSize: "16px" }}>remove</span>
                        </button>
                        <span className="px-2 text-sm">{item.quantity}</span>
                        <button 
                          onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                          className="px-2 py-1 hover:text-[#434b01]"
                        >
                          <span className="material-symbols-outlined" style={{ fontSize: "16px" }}>add</span>
                        </button>
                      </div>
                      <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "14px", fontWeight: 600, color: "#434b01" }}>
                        ₹{(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {items.length > 0 && (
          <div className="p-6 border-t border-[#c8c7b5] bg-white">
            <div className="flex justify-between items-center mb-6">
              <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "16px", color: "#47483a" }}>Subtotal</span>
              <span style={{ fontFamily: "'Playfair Display', serif", fontSize: "24px", fontWeight: 700, color: "#434b01" }}>
                ₹{getSubtotal().toFixed(2)}
              </span>
            </div>
            <Link 
              href="/cart"
              onClick={onClose}
              className="block w-full text-center py-4 rounded-lg bg-[#434b01] text-white hover:opacity-90 transition-opacity"
              style={{ fontFamily: "'Inter', sans-serif", fontSize: "14px", fontWeight: 600, letterSpacing: "0.1em" }}
            >
              VIEW CART
            </Link>
          </div>
        )}
      </div>
    </>
  );
}
