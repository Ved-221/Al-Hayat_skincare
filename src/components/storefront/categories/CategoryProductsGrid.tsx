"use client";

import Link from "next/link";
import { useCartStore } from "@/store/cartStore";
import type { Product } from "@/data/products";
import CategoryEmptyState from "./CategoryEmptyState";

interface CategoryProductsGridProps {
  products: Product[];
  categoryName?: string;
}

export default function CategoryProductsGrid({
  products,
  categoryName,
}: CategoryProductsGridProps) {
  const addItem = useCartStore((state) => state.addItem);

  if (!products || products.length === 0) {
    return <CategoryEmptyState categoryName={categoryName} />;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {products.map((product) => (
        <div
          key={product.slug}
          className="group bg-white rounded-2xl overflow-hidden hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between border border-gray-200/40"
          style={{ boxShadow: "0 4px 24px rgba(0,0,0,0.06)" }}
        >
          <div>
            <Link href={`/product/${product.slug}`} style={{ textDecoration: "none" }}>
              <div className="relative overflow-hidden" style={{ aspectRatio: "1 / 1", background: "#faf3ea" }}>
                {product.badge && (
                  <span
                    className="absolute top-3 left-3 z-10 px-2.5 py-1 rounded-md text-white shadow-xs"
                    style={{
                      fontFamily: "'Inter',sans-serif",
                      fontSize: "9px",
                      fontWeight: 700,
                      letterSpacing: "0.1em",
                      background: "#b22a2b",
                    }}
                  >
                    {product.badge}
                  </span>
                )}
                <img
                  src={product.img}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                />
              </div>

              <div className="p-4 pb-2">
                <p
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "10px",
                    fontWeight: 700,
                    color: "#b22a2b",
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    marginBottom: "4px",
                  }}
                >
                  {product.category || categoryName}
                </p>
                <h3
                  className="text-base font-bold text-[#434b01] mb-1 group-hover:text-[#b22a2b] transition-colors line-clamp-1"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  {product.name}
                </h3>
                <p
                  className="text-xs text-[#47483a] line-clamp-2 leading-relaxed mb-3"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  {product.benefit || product.desc}
                </p>
                <div className="flex items-center gap-2">
                  <span
                    className="text-base font-bold text-[#434b01]"
                    style={{ fontFamily: "'Inter', sans-serif" }}
                  >
                    {product.price}
                  </span>
                  {product.priceOriginal && product.priceOriginal !== product.price && (
                    <span
                      className="text-xs text-gray-400 line-through"
                      style={{ fontFamily: "'Inter', sans-serif" }}
                    >
                      {product.priceOriginal}
                    </span>
                  )}
                </div>
              </div>
            </Link>
          </div>

          <div className="px-4 pb-4 pt-2">
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                addItem(product, 1);
                alert("Added to cart!");
              }}
              className="flex items-center justify-center gap-1.5 w-full py-2.5 rounded-xl text-white hover:bg-[#343a01] transition-all duration-200 shadow-xs"
              style={{
                background: "#434b01",
                fontFamily: "'Inter', sans-serif",
                fontSize: "11px",
                fontWeight: 700,
                letterSpacing: "0.06em",
              }}
            >
              <span className="material-symbols-outlined text-base">shopping_cart</span>
              ADD TO CART
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
