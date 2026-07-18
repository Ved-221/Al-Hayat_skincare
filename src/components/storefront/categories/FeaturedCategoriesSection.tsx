"use client";

import { useEffect, useState } from "react";
import { getFeaturedStorefrontCategories, type StorefrontCategoryWithCount } from "@/services/storefrontCategoryService";
import FeaturedCategoryCard from "./FeaturedCategoryCard";

export default function FeaturedCategoriesSection() {
  const [categories, setCategories] = useState<StorefrontCategoryWithCount[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    getFeaturedStorefrontCategories()
      .then((data) => {
        if (mounted && data) {
          setCategories(data);
        }
      })
      .catch((err) => {
        console.error("Error loading featured categories:", err);
      })
      .finally(() => {
        if (mounted) setLoading(false);
      });

    return () => {
      mounted = false;
    };
  }, []);

  if (loading) {
    return (
      <section className="py-20 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <span
            className="text-xs font-bold uppercase tracking-widest text-[#b22a2b] block mb-2"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            Our Collections
          </span>
          <h2
            className="text-3xl sm:text-4xl font-bold text-[#434b01] mb-3"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Crafted for Every Skin Need
          </h2>
          <p
            className="text-sm text-[#47483a] max-w-md mx-auto"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            Loading our botanical product families...
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 animate-pulse">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="w-full aspect-[4/5] rounded-[24px] bg-[#EAE2D1]/60"
            />
          ))}
        </div>
      </section>
    );
  }

  if (categories.length === 0) {
    return null;
  }

  return (
    <section className="py-20 px-6 max-w-7xl mx-auto">
      <div className="text-center mb-12">
        <span
          className="text-xs font-bold uppercase tracking-widest text-[#b22a2b] block mb-2"
          style={{ fontFamily: "'Inter', sans-serif" }}
        >
          Our Collections
        </span>
        <h2
          className="text-3xl sm:text-4xl font-bold text-[#434b01] mb-3"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          Crafted for Every Skin Need
        </h2>
        <p
          className="text-sm text-[#47483a] max-w-md mx-auto leading-relaxed"
          style={{ fontFamily: "'Inter', sans-serif" }}
        >
          From face care to hair oils — discover product families born from nature&apos;s finest ingredients.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {categories.map((cat) => (
          <FeaturedCategoryCard key={cat.id} category={cat} />
        ))}
      </div>
    </section>
  );
}
