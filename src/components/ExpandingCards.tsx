"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface CardItem {
  id: string | number;
  title: string;
  description: string;
  imgSrc: string;
  emoji: string;
  benefit: string;
  color: string;
}

interface ExpandingCardsProps extends React.HTMLAttributes<HTMLUListElement> {
  items: CardItem[];
  defaultActiveIndex?: number;
}

export const ExpandingCards = React.forwardRef<
  HTMLUListElement,
  ExpandingCardsProps
>(({ className, items, defaultActiveIndex = 0, ...props }, ref) => {
  const [activeIndex, setActiveIndex] = React.useState<number | null>(
    defaultActiveIndex
  );

  const [isDesktop, setIsDesktop] = React.useState(false);

  React.useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const gridStyle = React.useMemo(() => {
    if (activeIndex === null) return {};

    if (isDesktop) {
      const columns = items
        .map((_, index) => (index === activeIndex ? "5fr" : "1fr"))
        .join(" ");
      return { gridTemplateColumns: columns };
    } else {
      const rows = items
        .map((_, index) => (index === activeIndex ? "5fr" : "1fr"))
        .join(" ");
      return { gridTemplateRows: rows };
    }
  }, [activeIndex, items.length, isDesktop]);

  const handleInteraction = (index: number) => {
    setActiveIndex(index);
  };

  return (
    <ul
      className={cn(
        "w-full max-w-5xl gap-3",
        "grid",
        "h-[700px] md:h-[480px]",
        "transition-[grid-template-columns,grid-template-rows] duration-500 ease-out",
        className
      )}
      style={{
        ...gridStyle,
        ...(isDesktop
          ? { gridTemplateRows: "1fr" }
          : { gridTemplateColumns: "1fr" }
        ),
      }}
      ref={ref}
      {...props}
    >
      {items.map((item, index) => {
        const isActive = activeIndex === index;

        return (
          <li
            key={item.id}
            className={cn(
              "group relative cursor-pointer overflow-hidden rounded-2xl border transition-all duration-300 shadow-sm",
              "border-[#c8c7b5]/30 md:min-w-[70px]",
              "min-h-0 min-w-0"
            )}
            style={{ backgroundColor: item.color }}
            onMouseEnter={() => handleInteraction(index)}
            onFocus={() => handleInteraction(index)}
            onClick={() => handleInteraction(index)}
            tabIndex={0}
            data-active={isActive}
          >
            {/* Cover image acting as background texture with reduced opacity */}
            <img
              src={item.imgSrc}
              alt={item.title}
              className={cn(
                "absolute inset-0 h-full w-full object-cover transition-all duration-700 ease-out pointer-events-none select-none",
                isActive 
                  ? "scale-105 opacity-20" 
                  : "scale-100 opacity-[0.08] group-hover:opacity-12"
              )}
            />

            {/* Translucent overlay to bind the image to the background and keep text readable */}
            <div className="absolute inset-0 bg-white/40 backdrop-blur-[1px] transition-all duration-300 group-data-[active=true]:bg-white/55" />

            {/* Layout when card is collapsed (vertical label on desktop, horizontal label on mobile) */}
            <div
              className={cn(
                "absolute inset-0 flex items-center justify-center p-3 transition-opacity duration-300 pointer-events-none select-none",
                isActive ? "opacity-0" : "opacity-100"
              )}
            >
              <h3
                className={cn(
                  "font-semibold text-xs tracking-[0.15em] uppercase text-[#434b01] whitespace-nowrap",
                  isDesktop ? "origin-center rotate-90" : "text-center"
                )}
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                {item.title}
              </h3>
            </div>

            {/* Layout when card is active (expanded content) */}
            <article
              className={cn(
                "absolute inset-0 flex flex-col justify-end p-6 md:p-8 transition-all duration-300 pointer-events-none select-none",
                isActive ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              )}
            >
              {/* Glassmorphic Text Box Container */}
              <div 
                className="flex flex-col gap-2 p-5 md:p-6 rounded-2xl bg-white/75 backdrop-blur-[4px] border border-white/20 max-w-lg shadow-sm transform translate-y-2 group-data-[active=true]:translate-y-0 transition-all duration-500 delay-100"
              >
                {/* Title & Benefit */}
                <div className="flex flex-col gap-0.5">
                  <h3 
                    className="text-2xl md:text-3xl font-semibold text-[#434b01]"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                  >
                    {item.title}
                  </h3>
                  
                  <p 
                    className="text-[10px] font-bold text-[#b22a2b] tracking-[0.1em] uppercase"
                    style={{ fontFamily: "'Inter', sans-serif" }}
                  >
                    {item.benefit}
                  </p>
                </div>

                {/* Description */}
                <p 
                  className="text-[13px] md:text-sm text-[#47483a] leading-relaxed"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  {item.description}
                </p>
              </div>
            </article>
          </li>
        );
      })}
    </ul>
  );
});

ExpandingCards.displayName = "ExpandingCards";
