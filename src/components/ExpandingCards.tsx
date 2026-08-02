"use client";

import * as React from "react";
import { cn, resolveImageUrl } from "@/lib/utils";
import Image from "next/image";

export interface CardItem {
  id: string | number;
  title: string;
  description: string;
  imgSrc: string;
  emoji: string;
  benefit: string;
  color: string;
}

interface ExpandingCardsProps extends React.HTMLAttributes<HTMLDivElement> {
  items: CardItem[];
}

export const ExpandingCards = React.forwardRef<
  HTMLDivElement,
  ExpandingCardsProps
>(({ className, items, ...props }, ref) => {
  return (
    <div 
      ref={ref} 
      className={cn(
        "w-full flex overflow-x-auto gap-4 pb-6 snap-x snap-mandatory no-scrollbar", 
        className
      )} 
      {...props}
    >
      {items.map((item) => (
        <div
          key={item.id}
          className="relative shrink-0 w-[260px] sm:w-[300px] h-[340px] sm:h-[380px] rounded-2xl overflow-hidden snap-center group border border-[#c8c7b5]/30 shadow-sm flex flex-col justify-end"
          style={{ backgroundColor: item.color }}
        >
          {/* Background image */}
          <Image
            src={resolveImageUrl(item.imgSrc)}
            alt={item.title}
            fill
            sizes="(max-width: 640px) 260px, 300px"
            className="object-cover opacity-[0.2] group-hover:scale-105 transition-transform duration-700 ease-out pointer-events-none select-none"
          />

          {/* Persistent Horizontal Label Band at Bottom */}
          <div className="relative z-10 w-full p-5 bg-white/70 backdrop-blur-md border-t border-white/30 transition-colors duration-300 group-hover:bg-white/85">
            <h3
              className="text-xl sm:text-2xl font-semibold text-[#434b01] mb-1"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              {item.title}
            </h3>
            <p
              className="text-[10px] font-bold text-[#b22a2b] tracking-[0.1em] uppercase mb-2"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              {item.benefit}
            </p>
            <p
              className="text-[12px] text-[#47483a] leading-relaxed line-clamp-3"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              {item.description}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
});

ExpandingCards.displayName = "ExpandingCards";
