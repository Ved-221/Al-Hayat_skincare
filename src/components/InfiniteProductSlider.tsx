"use client";

import { motion, useMotionValue, animate } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { ProductRevealCard } from "@/components/ProductRevealCard";

// Custom light-weight useMeasure hook using ResizeObserver & scrollWidth to avoid external library dependencies
function useMeasure() {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const updateDimensions = () => {
      if (ref.current) {
        setDimensions({
          width: ref.current.scrollWidth,
          height: ref.current.scrollHeight,
        });
      }
    };

    updateDimensions();

    const observer = new ResizeObserver(() => updateDimensions());
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return [ref, dimensions] as const;
}

interface InfiniteSliderProps {
  children: React.ReactNode;
  gap?: number;
  duration?: number;
  durationOnHover?: number;
  direction?: "horizontal" | "vertical";
  reverse?: boolean;
  className?: string;
}

export function InfiniteSlider({
  children,
  gap = 20,
  duration = 35,
  durationOnHover = 120, // Slows down significantly when touched/hovered for easy interaction
  direction = "horizontal",
  reverse = false,
  className,
}: InfiniteSliderProps) {
  const [currentDuration, setCurrentDuration] = useState(duration);
  const [ref, { width, height }] = useMeasure();
  const translation = useMotionValue(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [key, setKey] = useState(0);

  useEffect(() => {
    let controls: any;
    const size = direction === "horizontal" ? width : height;
    const contentSize = size + gap;
    const from = reverse ? -contentSize / 2 : 0;
    const to = reverse ? 0 : -contentSize / 2;

    // Guard against zero dimensions on initial render
    if (size === 0) return;

    if (isTransitioning) {
      controls = animate(translation, [translation.get(), to], {
        ease: "linear",
        duration:
          currentDuration * Math.abs((translation.get() - to) / contentSize),
        onComplete: () => {
          setIsTransitioning(false);
          setKey((prevKey) => prevKey + 1);
        },
      });
    } else {
      controls = animate(translation, [from, to], {
        ease: "linear",
        duration: currentDuration,
        repeat: Infinity,
        repeatType: "loop",
        repeatDelay: 0,
        onRepeat: () => {
          translation.set(from);
        },
      });
    }

    return () => controls?.stop();
  }, [
    key,
    translation,
    currentDuration,
    width,
    height,
    gap,
    isTransitioning,
    direction,
    reverse,
  ]);

  const interactionProps = durationOnHover
    ? {
        onHoverStart: () => {
          setIsTransitioning(true);
          setCurrentDuration(durationOnHover);
        },
        onHoverEnd: () => {
          setIsTransitioning(true);
          setCurrentDuration(duration);
        },
        onTouchStart: () => {
          setIsTransitioning(true);
          setCurrentDuration(durationOnHover);
        },
        onTouchEnd: () => {
          setIsTransitioning(true);
          setCurrentDuration(duration);
        },
      }
    : {};

  return (
    <div className={cn("overflow-hidden w-full relative", className)}>
      <motion.div
        className="flex w-max"
        style={{
          ...(direction === "horizontal"
            ? { x: translation }
            : { y: translation }),
          gap: `${gap}px`,
          flexDirection: direction === "horizontal" ? "row" : "column",
        }}
        ref={ref}
        {...interactionProps}
      >
        {children}
        {children}
      </motion.div>
    </div>
  );
}

interface InfiniteProductSliderProps {
  productsList: any[];
  addItem: (product: any, qty: number) => void;
}

export default function InfiniteProductSlider({ productsList, addItem }: InfiniteProductSliderProps) {
  return (
    <InfiniteSlider
      gap={24}
      duration={35}
      durationOnHover={150} // Slower speed on hover/touch for easier card clicks
      className="py-4"
    >
      {productsList.map((product) => (
        <ProductRevealCard
          key={product.slug}
          product={product}
          enableHoverOverlay={false}
          className="w-[270px] sm:w-[300px] md:w-[340px] flex-shrink-0"
        />
      ))}
    </InfiniteSlider>
  );
}
