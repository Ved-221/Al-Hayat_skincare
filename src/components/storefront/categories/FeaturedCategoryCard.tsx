import { resolveImageUrl } from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";
import type { StorefrontCategoryWithCount } from "@/services/storefrontCategoryService";

interface FeaturedCategoryCardProps {
  category: StorefrontCategoryWithCount;
}

export default function FeaturedCategoryCard({ category }: FeaturedCategoryCardProps) {
  return (
    <Link
      href={`/products/category/${category.slug}`}
      className="group block relative overflow-hidden rounded-[24px] bg-[#EAE2D1] shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1"
      style={{ textDecoration: "none" }}
    >
      {/* Aspect Ratio Container */}
      <div className="relative w-full aspect-[4/5] overflow-hidden bg-[#D8CEBA]">
        {category.thumbnail_url ? (
          <Image
            src={resolveImageUrl(category.thumbnail_url)}
            alt={category.alt_text || category.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-[#EAE2D1] to-[#C8C7B5] p-6">
            <span className="material-symbols-outlined text-6xl text-[#434b01]/30">
              local_florist
            </span>
          </div>
        )}

        {/* Gradient Overlay for Text Legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/25 to-transparent transition-opacity duration-300 group-hover:opacity-90" />

        {/* Badge: Product Count */}
        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full border border-white/40 shadow-xs">
          <span
            className="text-[11px] font-semibold text-[#434b01] tracking-wider uppercase"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            {category.productCount} {category.productCount === 1 ? "Product" : "Products"}
          </span>
        </div>

        {/* Bottom Info Content */}
        <div className="absolute bottom-0 left-0 right-0 p-6 flex flex-col justify-end text-white">
          <h3
            className="text-2xl font-bold leading-tight mb-2 group-hover:text-[#fff8f1] transition-colors"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            {category.name}
          </h3>

          {category.description && (
            <p
              className="text-xs text-white/80 line-clamp-2 mb-4 leading-relaxed"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              {category.description}
            </p>
          )}

          <div className="flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-[#fff8f1] group-hover:translate-x-1 transition-transform duration-300">
            <span>Shop Now</span>
            <span className="material-symbols-outlined text-base">arrow_forward</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
