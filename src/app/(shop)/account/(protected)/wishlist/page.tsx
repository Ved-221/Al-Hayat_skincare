"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Heart } from "lucide-react";
import { useWishlistStore } from "@/store/wishlistStore";
import { ProductRevealCard } from "@/components/ProductRevealCard";

export default function AccountWishlistPage() {
  const { items: wishlistItems } = useWishlistStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const tm = setTimeout(() => setMounted(true), 0);
    return () => clearTimeout(tm);
  }, []);

  if (!mounted) {
    return (
      <div className="space-y-6 animate-pulse">
        <div className="rounded-3xl border border-[#c8c7b5]/30 bg-white p-8 shadow-sm">
          <div className="h-8 w-48 bg-[#EAE2D1] rounded mb-2" />
          <div className="h-4 w-64 bg-[#EAE2D1] rounded" />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="rounded-3xl border border-[#c8c7b5]/30 bg-white p-8 shadow-[0_4px_20px_rgba(0,0,0,0.02)] relative overflow-hidden">
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-32 h-32 bg-[#faf3ea] rounded-full opacity-50 blur-3xl"></div>
        <div className="relative z-10 flex items-center gap-4">
          <div className="h-14 w-14 rounded-2xl bg-[#b22a2b] flex items-center justify-center text-white shadow-md">
            <Heart size={26} strokeWidth={1.5} className="fill-white/20" />
          </div>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-[#434b01]" style={{ fontFamily: "'Playfair Display', serif" }}>
              Your Wishlist
            </h1>
            <p className="text-sm text-[#787868] mt-1">
              View and manage the premium products you&apos;ve saved for later.
            </p>
          </div>
        </div>
      </div>

      {wishlistItems.length === 0 ? (
        <div className="rounded-3xl border border-[#c8c7b5]/30 bg-white p-12 text-center shadow-[0_4px_20px_rgba(0,0,0,0.02)] flex flex-col items-center justify-center min-h-[300px]">
          <div className="w-20 h-20 rounded-full bg-[#faf3ea] flex items-center justify-center mb-5 text-[#b22a2b]">
            <Heart size={32} strokeWidth={1.5} />
          </div>
          <h2 className="text-xl md:text-2xl font-bold text-[#434b01] mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>
            Your Wishlist is Empty
          </h2>
          <p className="text-[#787868] mb-8 max-w-sm text-sm leading-relaxed">
            Explore our range of premium herbal skincare & haircare products and save your favorites here.
          </p>
          <Link href="/products" className="inline-block bg-[#434b01] px-8 py-3.5 text-sm font-bold text-white transition-all hover:bg-[#5a6401] hover:shadow-lg rounded-xl tracking-wide">
            DISCOVER PRODUCTS
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {wishlistItems.map((product) => (
            <ProductRevealCard key={product.slug} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
