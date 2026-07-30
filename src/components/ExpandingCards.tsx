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

interface ExpandingCardsProps extends React.HTMLAttributes<HTMLDivElement> {
  items: CardItem[];
  defaultActiveIndex?: number;
}

export const ExpandingCards = React.forwardRef<
  HTMLDivElement,
  ExpandingCardsProps
>(({ className, items, defaultActiveIndex = 0, ...props }, ref) => {
  const [activeIndex, setActiveIndex] = React.useState<number | null>(
    defaultActiveIndex
  );

  const [viewMode, setViewMode] = React.useState<"desktop" | "tablet" | "mobile">("desktop");

  React.useEffect(() => {
    const handleResize = () => {
      const w = window.innerWidth;
      if (w >= 768) setViewMode("desktop");
      else if (w >= 480) setViewMode("tablet");
      else setViewMode("mobile");
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleInteraction = (index: number) => {
    setActiveIndex(index);
  };

  // ── DESKTOP: horizontal expanding grid (original behavior) ──
  if (viewMode === "desktop") {
    const gridStyle = activeIndex !== null
      ? { gridTemplateColumns: items.map((_, i) => (i === activeIndex ? "5fr" : "1fr")).join(" ") }
      : {};

    return (
      <ul
        className={cn(
          "w-full max-w-5xl gap-3 grid h-[480px]",
          "transition-[grid-template-columns] duration-500 ease-out",
          className
        )}
        style={{ ...gridStyle, gridTemplateRows: "1fr" }}
        ref={ref as React.Ref<HTMLUListElement>}
        {...(props as React.HTMLAttributes<HTMLUListElement>)}
      >
        {items.map((item, index) => (
          <ExpandingCardItem
            key={item.id}
            item={item}
            index={index}
            isActive={activeIndex === index}
            isDesktop
            onInteract={handleInteraction}
          />
        ))}
      </ul>
    );
  }

  // ── MOBILE / TABLET: scrollable card list with active expansion ──
  return (
    <div ref={ref} className={cn("w-full", className)} {...props}>
      <div className="flex flex-col gap-3">
        {items.map((item, index) => {
          const isActive = activeIndex === index;
          return (
            <div
              key={item.id}
              className={cn(
                "relative cursor-pointer overflow-hidden rounded-2xl border border-[#c8c7b5]/30 shadow-sm transition-all duration-500 ease-out",
              )}
              style={{
                backgroundColor: item.color,
                height: isActive
                  ? (viewMode === "tablet" ? "260px" : "240px")
                  : "52px",
              }}
              onClick={() => handleInteraction(index)}
              onFocus={() => handleInteraction(index)}
              tabIndex={0}
              data-active={isActive}
            >
              {/* Background image */}
              <img
                src={item.imgSrc}
                alt={item.title}
                className={cn(
                  "absolute inset-0 h-full w-full object-cover transition-all duration-700 ease-out pointer-events-none select-none",
                  isActive
                    ? "scale-105 opacity-20"
                    : "scale-100 opacity-[0.08]"
                )}
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-white/40 backdrop-blur-[1px] transition-all duration-300 data-[active=true]:bg-white/55" data-active={isActive} />

              {/* Collapsed label */}
              <div
                className={cn(
                  "absolute inset-0 flex items-center px-5 transition-opacity duration-300 pointer-events-none select-none",
                  isActive ? "opacity-0" : "opacity-100"
                )}
              >
                <div className="flex items-center gap-3 w-full">
                  <span className="text-lg">{item.emoji}</span>
                  <h3
                    className="font-semibold text-xs tracking-[0.15em] uppercase text-[#434b01]"
                    style={{ fontFamily: "'Inter', sans-serif" }}
                  >
                    {item.title}
                  </h3>
                  <span
                    className="ml-auto text-[10px] text-[#787868] tracking-wider uppercase"
                    style={{ fontFamily: "'Inter', sans-serif" }}
                  >
                    {item.benefit}
                  </span>
                </div>
              </div>

              {/* Expanded content */}
              <article
                className={cn(
                  "absolute inset-0 flex flex-col justify-end p-5 transition-all duration-300 pointer-events-none select-none",
                  isActive ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                )}
              >
                <div className="flex flex-col gap-2 p-4 rounded-2xl bg-white/75 backdrop-blur-[4px] border border-white/20 shadow-sm">
                  <div className="flex flex-col gap-0.5">
                    <h3
                      className="text-xl font-semibold text-[#434b01]"
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
                  <p
                    className="text-[12px] text-[#47483a] leading-relaxed"
                    style={{ fontFamily: "'Inter', sans-serif" }}
                  >
                    {item.description}
                  </p>
                </div>
              </article>
            </div>
          );
        })}
      </div>
    </div>
  );
});

ExpandingCards.displayName = "ExpandingCards";

/* ── Desktop card item (unchanged logic from original) ── */
function ExpandingCardItem({
  item,
  index,
  isActive,
  isDesktop,
  onInteract,
}: {
  item: CardItem;
  index: number;
  isActive: boolean;
  isDesktop: boolean;
  onInteract: (index: number) => void;
}) {
  return (
    <li
      className={cn(
        "group relative cursor-pointer overflow-hidden rounded-2xl border transition-all duration-300 shadow-sm",
        "border-[#c8c7b5]/30 md:min-w-[70px]",
        "min-h-0 min-w-0"
      )}
      style={{ backgroundColor: item.color }}
      onMouseEnter={() => onInteract(index)}
      onFocus={() => onInteract(index)}
      onClick={() => onInteract(index)}
      tabIndex={0}
      data-active={isActive}
    >
      {/* Cover image */}
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

      {/* Translucent overlay */}
      <div className="absolute inset-0 bg-white/40 backdrop-blur-[1px] transition-all duration-300 group-data-[active=true]:bg-white/55" />

      {/* Collapsed label */}
      <div
        className={cn(
          "absolute inset-0 flex items-center justify-center p-3 transition-opacity duration-300 pointer-events-none select-none",
          isActive ? "opacity-0" : "opacity-100"
        )}
      >
        <h3
          className={cn(
            "font-semibold text-xs tracking-[0.15em] uppercase text-[#434b01] whitespace-nowrap",
            "origin-center rotate-90"
          )}
          style={{ fontFamily: "'Inter', sans-serif" }}
        >
          {item.title}
        </h3>
      </div>

      {/* Expanded content */}
      <article
        className={cn(
          "absolute inset-0 flex flex-col justify-end p-6 md:p-8 transition-all duration-300 pointer-events-none select-none",
          isActive ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        )}
      >
        <div className="flex flex-col gap-2 p-5 md:p-6 rounded-2xl bg-white/75 backdrop-blur-[4px] border border-white/20 max-w-lg shadow-sm transform translate-y-2 group-data-[active=true]:translate-y-0 transition-all duration-500 delay-100">
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
}
