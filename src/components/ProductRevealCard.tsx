"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ShoppingCart, Heart, Check, X } from "lucide-react";
import { type Product } from "@/data/products";
import { useCartStore } from "@/store/cartStore";
import { useWishlistStore } from "@/store/wishlistStore";
import { resolveImageUrl } from "@/lib/utils";

interface ProductRevealCardProps {
  product: Product;
  onAdd?: () => void;
  enableAnimations?: boolean;
  showFavoriteTopRight?: boolean;
  enableHoverOverlay?: boolean;
  className?: string;
}

export function ProductRevealCard({
  product,
  onAdd,
  enableAnimations = true,
  showFavoriteTopRight = true, // Default to true so heart icons are visible across grids on all devices
  enableHoverOverlay = true,
  className = "",
}: ProductRevealCardProps) {
  const shouldReduceMotion = useReducedMotion();
  const shouldAnimate = enableAnimations && !shouldReduceMotion;

  const [isAdded, setIsAdded] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const [mobileOverlayOpen, setMobileOverlayOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const addItem = useCartStore((state) => state.addItem);
  const { items: wishlistItems, toggleWishlist } = useWishlistStore();
  
  // Guard against hydration mismatch (server vs client state) by checking mounted status first
  const isFavorite = mounted && wishlistItems.some((item) => item.slug === product.slug);

  const handleCardClick = (e: React.MouseEvent) => {
    if (!isDesktop && enableHoverOverlay && !mobileOverlayOpen) {
      e.preventDefault();
      setMobileOverlayOpen(true);
    }
  };

  const handleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product);
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (onAdd) {
      onAdd();
    } else {
      addItem(product, 1);
      setIsAdded(true);
      setTimeout(() => setIsAdded(false), 1500);
    }
  };

  const containerVariants: any = {
    rest: {
      scale: 1,
      y: 0,
    },
    hover: shouldAnimate
      ? {
        scale: 1.02,
        y: -6,
        transition: {
          type: "spring",
          stiffness: 300,
          damping: 25,
          mass: 0.8,
        },
      }
      : {},
  };

  const imageVariants: any = {
    rest: { scale: 1 },
    hover: { scale: 1.06 },
  };

  const overlayVariants: any = {
    rest: {
      y: "100%",
      opacity: 0,
    },
    hover: {
      y: "0%",
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 350,
        damping: 26,
        mass: 0.6,
      },
    },
  };

  const contentVariants: any = {
    rest: {
      opacity: 0,
      y: 15,
    },
    hover: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 25,
        mass: 0.5,
        delay: 0.1,
      },
    },
  };

  const buttonVariants_motion: any = {
    rest: { scale: 1, y: 0 },
    hover: shouldAnimate
      ? {
        scale: 1.02,
        y: -1,
        transition: {
          type: "spring",
          stiffness: 400,
          damping: 25,
        },
      }
      : {},
    tap: shouldAnimate ? { scale: 0.98 } : {},
  };

  const favoriteVariants: any = {
    rest: { scale: 1, rotate: 0 },
    favorite: {
      scale: [1, 1.3, 1],
      rotate: [0, 10, -10, 0],
      transition: {
        duration: 0.4,
        ease: "easeInOut",
      },
    },
  };

  return (
    <motion.div
      initial="rest"
      whileHover={isDesktop ? "hover" : undefined}
      animate={mobileOverlayOpen ? "hover" : "rest"}
      variants={containerVariants}
      onClick={handleCardClick}
      className={`relative w-full rounded-2xl border border-gray-200/40 bg-white overflow-hidden shadow-xs hover:shadow-md cursor-pointer group flex flex-col justify-between ${className}`}
      style={{ minHeight: "410px" }}
    >
      {/* Top Part: Image and badges (separately linked to avoid invalid button-inside-anchor nesting) */}
      <div className="flex flex-col flex-1">
        {/* Image Container */}
        <div className="relative overflow-hidden w-full aspect-square bg-[#faf3ea]">
          <Link href={`/product/${product.slug}`} className="block w-full h-full">
            <motion.img
              src={resolveImageUrl(product.img)}
              alt={product.name}
              className="w-full h-full object-contain p-4"
              variants={imageVariants}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            />
          </Link>

          {/* Badge */}
          {product.badge && (
            <span
              className="absolute top-3 left-3 z-10 px-2.5 py-1 rounded-md text-white shadow-xs pointer-events-none"
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "9px",
                fontWeight: 700,
                letterSpacing: "0.1em",
                background: "#b22a2b",
              }}
            >
              {product.badge}
            </span>
          )}

          {/* Favorite Button (top right, outside link to prevent click hijacking) */}
          {showFavoriteTopRight && (
            <motion.button
              type="button"
              onClick={handleFavorite}
              variants={favoriteVariants}
              animate={isFavorite ? "favorite" : "rest"}
              className={`absolute top-3 right-3 z-10 w-10 h-10 rounded-full border border-gray-200/30 shadow-xs transition-colors flex items-center justify-center group ${isFavorite
                  ? "bg-red-500 text-white border-red-500"
                  : "bg-white/90 text-[#787868] hover:text-[#b22a2b] hover:border-[#b22a2b]"
                }`}
            >
              <Heart
                className={`w-4 h-4 transition-colors ${isFavorite ? "fill-current" : "fill-none group-hover:fill-current"}`}
              />
            </motion.button>
          )}
        </div>

        {/* Content Area */}
        <div className="p-4 flex-1 flex flex-col justify-between">
          <Link href={`/product/${product.slug}`} className="block text-inherit no-underline space-y-1">
            {/* Category */}
            <p
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "9px",
                fontWeight: 700,
                color: "#b22a2b",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
              }}
            >
              {product.category}
            </p>

            {/* Title */}
            <h3
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "16px",
                fontWeight: 600,
                color: "#434b01",
              }}
              className="line-clamp-1 group-hover:text-[#b22a2b] transition-colors"
            >
              {product.name}
            </h3>

            {/* Benefit / Small Desc */}
            <p
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "12px",
                color: "#47483a",
                lineHeight: 1.4,
              }}
              className="line-clamp-2"
            >
              {product.benefit || product.desc}
            </p>
          </Link>

          {/* Price & Action Row (separately aligned) */}
          <div className="pt-3 flex items-center justify-between gap-2 mt-auto border-t border-gray-100/80">
            <div className="flex items-center gap-1.5">
              <span
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "16px",
                  fontWeight: 700,
                  color: "#434b01",
                }}
              >
                {product.price}
              </span>
              {product.priceOriginal &&
                product.priceOriginal !== product.price && (
                  <span className="text-xs text-gray-400 line-through">
                    {product.priceOriginal}
                  </span>
                )}
            </div>
          </div>
        </div>
      </div>

      {/* Slide-Up Reveal Overlay */}
      {enableHoverOverlay && (
        <motion.div
          variants={overlayVariants}
          className="absolute inset-0 bg-[#fff8f1]/97 backdrop-blur-md flex flex-col justify-between p-5 z-20"
        >
          {/* Overlay Upper Info */}
          <motion.div variants={contentVariants} className="space-y-3">
            <div className="flex justify-between items-start">
              <div className="flex-1 min-w-0 pr-2">
                <p className="text-[9px] font-bold text-[#b22a2b] tracking-widest uppercase">
                  {product.category}
                </p>
                <h4
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: "17px",
                    fontWeight: 600,
                    color: "#434b01",
                  }}
                  className="truncate"
                >
                  {product.name}
                </h4>
              </div>
              <div className="text-right flex-shrink-0 flex items-center gap-2">
                <span className="text-[16px] font-bold text-[#434b01]">
                  {product.price}
                </span>
                {!isDesktop && (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      setMobileOverlayOpen(false);
                    }}
                    className="p-1 rounded-full bg-[#434b01]/10 text-[#434b01] hover:text-[#b22a2b] transition-colors cursor-pointer border-none"
                    aria-label="Close details"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>

            <div>
              <span className="text-[10px] font-bold uppercase text-[#787868] tracking-wider block mb-1">
                Description
              </span>
              <p
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "11px",
                  color: "#47483a",
                  lineHeight: 1.5,
                }}
                className="line-clamp-4 text-justify"
              >
                {product.desc}
              </p>
            </div>

            {/* Botanical Features grid */}
            <div className="grid grid-cols-2 gap-2 pt-1">
              <div className="bg-[#faf3ea] rounded-lg p-2 text-center border border-[#c8c7b5]/20">
                <div className="text-[9px] font-bold text-[#434b01] uppercase tracking-wider">
                  Suitable For
                </div>
                <div className="text-[10px] text-[#47483a] truncate">
                  {product.suitableFor || "All Skin Types"}
                </div>
              </div>
              <div className="bg-[#faf3ea] rounded-lg p-2 text-center border border-[#c8c7b5]/20">
                <div className="text-[9px] font-bold text-[#434b01] uppercase tracking-wider">
                  Ingredients
                </div>
                <div className="text-[10px] text-[#47483a] truncate">
                  {product.ingredients.slice(0, 2).join(", ")}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Action/Overlay Buttons */}
          <motion.div variants={contentVariants} className="space-y-2 pt-2">
            {/* Add to Cart */}
            <motion.button
              type="button"
              onClick={handleAddToCart}
              variants={buttonVariants_motion}
              className="flex items-center justify-center gap-1.5 w-full py-2.5 rounded-xl text-white hover:opacity-95 transition-opacity shadow-xs text-xs font-bold tracking-wider cursor-pointer border-none"
              style={{ background: "#434b01" }}
            >
              {isAdded ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  ADDED ✓
                </>
              ) : (
                <>
                  <ShoppingCart className="w-3.5 h-3.5" />
                  ADD TO CART
                </>
              )}
            </motion.button>

            {/* View Details Link + Wishlist Heart button */}
            <div className="flex gap-2 items-center">
              <Link
                href={`/product/${product.slug}`}
                className="flex-1 flex items-center justify-center py-2.5 rounded-xl border border-[#434b01] text-[#434b01] hover:bg-[#434b01]/5 transition-all text-xs font-bold tracking-wider text-center no-underline cursor-pointer"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                VIEW DETAILS
              </Link>
              <motion.button
                type="button"
                onClick={handleFavorite}
                variants={favoriteVariants}
                animate={isFavorite ? "favorite" : "rest"}
                className={`w-9 h-9 rounded-full border shadow-xs transition-colors flex items-center justify-center cursor-pointer group ${isFavorite
                    ? "bg-red-500 text-white border-red-500"
                    : "bg-white text-[#787868] hover:text-[#b22a2b] border-gray-200/60"
                  }`}
              >
                <Heart
                  className={`w-4 h-4 transition-colors ${isFavorite ? "fill-current" : "fill-none group-hover:fill-current"}`}
                />
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </motion.div>
  );
}
