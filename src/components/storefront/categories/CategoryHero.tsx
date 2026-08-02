import type { Category } from "@/types/category";
import Image from "next/image";

interface CategoryHeroProps {
  category: Category;
  productCount: number;
}

export default function CategoryHero({ category, productCount }: CategoryHeroProps) {
  return (
    <div className="relative w-full min-h-[260px] sm:min-h-[320px] flex items-center justify-center overflow-hidden bg-[#EAE2D1]">
      {/* Background Banner Image or Gradient */}
      {category.banner_url ? (
        <Image
          src={category.banner_url}
          alt={category.alt_text || category.name}
          fill
          className="object-cover object-center brightness-[0.65]"
          priority
        />
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-[#EAE2D1] via-[#D8CEBA] to-[#C8C7B5]" />
      )}

      {/* Subtle Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#434b01]/85 via-black/40 to-black/20" />

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 py-12 text-center text-white">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/15 backdrop-blur-md border border-white/30 text-xs font-semibold uppercase tracking-widest text-[#fff8f1] mb-4 shadow-xs">
          <span className="material-symbols-outlined text-sm">local_florist</span>
          <span>
            {productCount} {productCount === 1 ? "Product" : "Products"} Available
          </span>
        </div>

        <h1
          className="text-3xl sm:text-5xl font-bold tracking-tight text-white mb-4 leading-tight drop-shadow-sm"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          {category.name}
        </h1>

        {category.description && (
          <p
            className="text-sm sm:text-base text-white/90 max-w-2xl mx-auto leading-relaxed drop-shadow-xs"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            {category.description}
          </p>
        )}
      </div>

      {/* Bottom Wave Divider matching AL-HAYAT theme */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none z-10">
        <svg
          viewBox="0 0 1200 60"
          preserveAspectRatio="none"
          className="w-full h-8 sm:h-12"
          style={{ display: "block" }}
        >
          <path
            d="M0,30 C200,60 400,0 600,30 C800,60 1000,0 1200,30 L1200,60 L0,60 Z"
            fill="#fff8f1"
          />
        </svg>
      </div>
    </div>
  );
}
