"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Heart } from "lucide-react";
import { useWishlistStore } from "@/store/wishlistStore";
import { ProductRevealCard } from "@/components/ProductRevealCard";

export default function WishlistPage() {
  const { items: wishlistItems } = useWishlistStore();
  const [mounted, setMounted] = useState(false);

  // Avoid hydration mismatch by waiting for client mount
  useEffect(() => {
    const tm = setTimeout(() => setMounted(true), 0);
    return () => clearTimeout(tm);
  }, []);

  if (!mounted) {
    return (
      <main className="min-h-screen pt-[72px]" style={{ background: "#fff8f1" }}>
        <div className="max-w-5xl mx-auto px-6 py-16 animate-pulse">
          <div className="h-12 w-48 bg-[#EAE2D1] rounded mb-8" />
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="bg-white rounded-2xl h-[410px] border border-gray-200/40" />
            ))}
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen pt-[72px]" style={{ background: "#fff8f1" }}>
      <div className="max-w-5xl mx-auto px-6 py-16">
        {/* Title */}
        <div className="flex items-center gap-3 mb-8">
          <span className="material-symbols-outlined text-3xl text-[#b22a2b]">favorite</span>
          <h1
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(32px, 5vw, 42px)",
              fontWeight: 700,
              color: "#434b01",
            }}
          >
            Your Wishlist
          </h1>
        </div>

        {wishlistItems.length === 0 ? (
          /* Empty State */
          <div
            className="flex flex-col items-center justify-center text-center p-12 rounded-3xl border border-[#c8c7b5]/30 bg-white"
            style={{ minHeight: "360px", boxShadow: "0 4px 20px rgba(0,0,0,0.02)" }}
          >
            <div className="w-16 h-16 rounded-full bg-[#faf3ea] flex items-center justify-center mb-5 text-[#b22a2b]">
              <Heart className="w-7 h-7" />
            </div>
            <h2
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "24px",
                fontWeight: 600,
                color: "#434b01",
                marginBottom: "10px",
              }}
            >
              Your Wishlist is Empty
            </h2>
            <p
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "14px",
                color: "#787868",
                maxWidth: "380px",
                lineHeight: 1.6,
                marginBottom: "24px",
              }}
            >
              Explore our range of premium herbal skincare & haircare products and save your favorites here.
            </p>
            <Link
              href="/products"
              className="inline-flex items-center justify-center px-8 py-3 rounded-full text-white hover:scale-105 transition-all duration-300 shadow-sm"
              style={{
                background: "#434b01",
                fontFamily: "'Inter', sans-serif",
                fontSize: "13px",
                fontWeight: 700,
                letterSpacing: "0.08em",
                textDecoration: "none",
              }}
            >
              EXPLORE PRODUCTS
            </Link>
          </div>
        ) : (
          /* Grid of Wishlisted Products */
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {wishlistItems.map((product) => (
              <ProductRevealCard key={product.slug} product={product} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
