"use client";

import { useCartStore } from "@/store/cartStore";
import Link from "next/link";
import Footer from "@/components/Footer";
import { useRouter } from "next/navigation";

export default function CartPage() {
  const { items, removeItem, updateQuantity, getSubtotal, getTotalItems } = useCartStore();
  const router = useRouter();

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
              Looks like you haven't added any products to your cart yet.
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
                    <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "15px", fontWeight: 500, color: "#1A1A1A" }}>Calculated at checkout</span>
                  </div>
                </div>

                <div className="flex justify-between items-center mb-8">
                  <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "16px", fontWeight: 600, color: "#1A1A1A" }}>Estimated Total</span>
                  <span style={{ fontFamily: "'Playfair Display', serif", fontSize: "28px", fontWeight: 700, color: "#434b01" }}>
                    ₹{getSubtotal().toFixed(2)}
                  </span>
                </div>

                <button
                  onClick={() => router.push("/checkout")}
                  className="w-full py-4 rounded-lg text-white hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
                  style={{ background: "#434b01", fontFamily: "'Inter', sans-serif", fontWeight: 600, fontSize: "14px", letterSpacing: "0.1em" }}
                >
                  PROCEED TO CHECKOUT
                  <span className="material-symbols-outlined" style={{ fontSize: "18px" }}>arrow_forward</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      <Footer />
    </main>
  );
}
