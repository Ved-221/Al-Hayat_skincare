"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { ProductRevealCard } from "@/components/ProductRevealCard";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface BestSellersCarouselProps {
  productsList: any[];
  addItem: (product: any, qty: number) => void;
}

export default function BestSellersCarousel({ productsList, addItem }: BestSellersCarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 4);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 4);
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    checkScroll();
    el.addEventListener("scroll", checkScroll, { passive: true });
    window.addEventListener("resize", checkScroll);
    return () => {
      el.removeEventListener("scroll", checkScroll);
      window.removeEventListener("resize", checkScroll);
    };
  }, [checkScroll]);

  const scroll = (direction: "left" | "right") => {
    const el = scrollRef.current;
    if (!el) return;
    const cardWidth = el.querySelector<HTMLElement>(":scope > div")?.offsetWidth ?? 320;
    const amount = cardWidth + 24; // card width + gap
    el.scrollBy({
      left: direction === "left" ? -amount : amount,
      behavior: "smooth",
    });
  };

  // Limit to first 12 products for the carousel
  const items = productsList.slice(0, 12);

  return (
    <div className="relative group/carousel">
      {/* Left arrow */}
      <button
        type="button"
        onClick={() => scroll("left")}
        aria-label="Scroll left"
        className="absolute left-0 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 cursor-pointer border-none md:-left-2"
        style={{
          background: canScrollLeft ? "rgba(67,75,1,0.85)" : "rgba(67,75,1,0.25)",
          color: "#fff8f1",
          opacity: canScrollLeft ? 1 : 0,
          pointerEvents: canScrollLeft ? "auto" : "none",
          boxShadow: "0 4px 16px rgba(0,0,0,0.12)",
        }}
      >
        <ChevronLeft className="w-5 h-5" />
      </button>

      {/* Right arrow */}
      <button
        type="button"
        onClick={() => scroll("right")}
        aria-label="Scroll right"
        className="absolute right-0 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 cursor-pointer border-none md:-right-2"
        style={{
          background: canScrollRight ? "rgba(67,75,1,0.85)" : "rgba(67,75,1,0.25)",
          color: "#fff8f1",
          opacity: canScrollRight ? 1 : 0,
          pointerEvents: canScrollRight ? "auto" : "none",
          boxShadow: "0 4px 16px rgba(0,0,0,0.12)",
        }}
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      {/* Scroll container */}
      <div
        ref={scrollRef}
        className="bestseller-scroll flex gap-6 overflow-x-auto pb-4 scroll-smooth"
        style={{
          scrollSnapType: "x mandatory",
          WebkitOverflowScrolling: "touch",
          scrollbarWidth: "none",        /* Firefox */
          msOverflowStyle: "none",       /* IE/Edge */
        }}
      >
        <style>{`
          .bestseller-scroll::-webkit-scrollbar { display: none; }
        `}</style>
        {items.map((product) => (
          <div
            key={product.slug}
            className="flex-shrink-0 w-[280px] sm:w-[300px] md:w-[320px] lg:w-[280px]"
            style={{ scrollSnapAlign: "start" }}
          >
            <ProductRevealCard
              product={product}
              enableHoverOverlay={false}
              showFavoriteTopRight
              className="w-full"
            />
          </div>
        ))}
      </div>

      {/* Scroll indicator dots (mobile) */}
      <div className="flex justify-center gap-1.5 mt-4 md:hidden">
        {items.slice(0, Math.min(items.length, 8)).map((_, i) => (
          <div
            key={i}
            className="w-1.5 h-1.5 rounded-full"
            style={{ background: "rgba(67,75,1,0.25)" }}
          />
        ))}
      </div>
    </div>
  );
}
