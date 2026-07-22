"use client";

import { motion, useTransform, useScroll } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import { ProductRevealCard } from "@/components/ProductRevealCard";

// Local ProductCard removed in favor of ProductRevealCard

interface HorizontalProductScrollProps {
  productsList: any[];
  addItem: (product: any, qty: number) => void;
}

export default function HorizontalProductScroll({ productsList, addItem }: HorizontalProductScrollProps) {
  const targetRef = useRef<HTMLDivElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const [xTranslation, setXTranslation] = useState(0);

  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  useEffect(() => {
    const updateTranslation = () => {
      if (carouselRef.current) {
        const scrollWidth = carouselRef.current.scrollWidth;
        const clientWidth = carouselRef.current.clientWidth;
        // Calculate the maximum horizontal scroll distance (content width minus viewport width)
        // Add additional padding offset to keep layout neat at the end of the scroll
        const maxScroll = Math.max(0, scrollWidth - clientWidth + 24);
        setXTranslation(maxScroll);
      }
    };

    updateTranslation();
    window.addEventListener("load", updateTranslation);
    window.addEventListener("resize", updateTranslation);
    return () => {
      window.removeEventListener("load", updateTranslation);
      window.removeEventListener("resize", updateTranslation);
    };
  }, [productsList.length]);

  // Map vertical scroll progress (0 to 1) directly to horizontal translation (0 to -xTranslation)
  const x = useTransform(scrollYProgress, [0, 1], [0, -xTranslation]);

  return (
    <div ref={targetRef} className="relative h-[300vh] w-full" style={{ background: "#EAE2D1" }}>
      <div className="sticky top-0 h-screen flex items-center overflow-hidden w-full">
        <motion.div style={{ x }} className="flex gap-5 px-6 md:px-12 w-fit" ref={carouselRef}>
          {productsList.map((product) => (
            <ProductRevealCard
              key={product.slug}
              product={product}
              enableHoverOverlay={false}
              className="w-[290px] sm:w-[320px] md:w-[350px] flex-shrink-0"
            />
          ))}
        </motion.div>
      </div>
    </div>
  );
}
