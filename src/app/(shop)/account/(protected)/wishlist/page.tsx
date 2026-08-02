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
        <div className="rounded-xl border border-[#c8c7b5]/40 bg-white p-6 shadow-xs">
          <div className="h-8 w-48 bg-[#EAE2D1] rounded mb-2" />
          <div className="h-4 w-64 bg-[#EAE2D1] rounded" />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="rounded-xl border border-[#c8c7b5]/40 bg-white p-6 shadow-xs">
        <h1 className="text-2xl font-bold text-[#434b01] mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
          Your Wishlist
        </h1>
        <p className="text-sm text-[#787868]">
          View and manage the products you&apos;ve saved for later.
        </p>
      </div>

      {wishlistItems.length === 0 ? (
        <div className="rounded-xl border border-[#c8c7b5]/40 bg-white p-12 text-center shadow-xs flex flex-col items-center justify-center min-h-[300px]">
          <div className="w-16 h-16 rounded-full bg-[#faf3ea] flex items-center justify-center mb-5 text-[#b22a2b]">
            <Heart className="w-7 h-7" />
          </div>
          <h2 className="text-xl font-bold text-[#434b01] mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
            Your Wishlist is Empty
          </h2>
          <p className="text-[#787868] mb-6 max-w-sm text-sm">
            Explore our range of premium herbal skincare & haircare products and save your favorites here.
          </p>
          <Link href="/products" className="inline-block rounded-xl bg-[#434b01] px-6 py-2 text-sm font-bold text-white transition-colors hover:bg-[#5a6401]">
            Explore Products
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
