"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Category } from "@/types/category";

interface CategoryNavigationProps {
  categories: Category[];
  isMobile?: boolean;
  onMobileClose?: () => void;
}

export default function CategoryNavigation({
  categories,
  isMobile = false,
  onMobileClose,
}: CategoryNavigationProps) {
  const pathname = usePathname();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const isCategoriesActive = pathname.startsWith("/products/category") || (pathname === "/products" && typeof window !== "undefined" && window.location.search.includes("category="));

  // Close dropdown on click outside
  useEffect(() => {
    if (isMobile) return;

    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape" && dropdownOpen) {
        setDropdownOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [dropdownOpen, isMobile]);

  // Mobile Accordion Mode
  if (isMobile) {
    return (
      <div className="w-full border-b border-gray-200/35 py-2">
        <button
          type="button"
          onClick={() => setMobileExpanded(!mobileExpanded)}
          className="flex items-center justify-between w-full text-left py-2 focus:outline-none"
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "22px",
            fontWeight: isCategoriesActive ? 700 : 400,
            color: isCategoriesActive ? "#b22a2b" : "#434b01",
          }}
          aria-expanded={mobileExpanded}
        >
          <span>Categories</span>
          <span className="material-symbols-outlined text-xl transition-transform duration-200">
            {mobileExpanded ? "expand_less" : "expand_more"}
          </span>
        </button>

        {mobileExpanded && (
          <div className="flex flex-col pl-4 mt-1 space-y-2 pb-2 animate-fadeIn">
            <Link
              href="/products"
              onClick={onMobileClose}
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "15px",
                fontWeight: pathname === "/products" ? 600 : 400,
                color: pathname === "/products" ? "#b22a2b" : "#47483a",
              }}
              className="py-1.5 hover:text-[#b22a2b] transition-colors block"
            >
              All Products
            </Link>
            {categories.map((cat) => {
              const active = pathname === `/products/category/${cat.slug}`;
              return (
                <Link
                  key={cat.id}
                  href={`/products/category/${cat.slug}`}
                  onClick={onMobileClose}
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "15px",
                    fontWeight: active ? 600 : 400,
                    color: active ? "#b22a2b" : "#47483a",
                  }}
                  className="py-1.5 hover:text-[#b22a2b] transition-colors block"
                >
                  {cat.name}
                </Link>
              );
            })}
          </div>
        )}
      </div>
    );
  }

  // Desktop / Tablet Dropdown Mode
  return (
    <div
      ref={containerRef}
      className="relative inline-block text-left"
      onMouseEnter={() => setDropdownOpen(true)}
      onMouseLeave={() => setDropdownOpen(false)}
    >
      <button
        type="button"
        onClick={() => setDropdownOpen(!dropdownOpen)}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            setDropdownOpen(!dropdownOpen);
          }
        }}
        aria-expanded={dropdownOpen}
        aria-haspopup="true"
        className="flex items-center gap-1 focus:outline-none py-1 group"
        style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: "13px",
          fontWeight: isCategoriesActive ? 700 : 400,
          color: isCategoriesActive ? "#b22a2b" : "#47483a",
          borderBottom: isCategoriesActive ? "2px solid #b22a2b" : "2px solid transparent",
          paddingBottom: "2px",
        }}
      >
        <span className="group-hover:text-[#b22a2b] transition-colors">Categories</span>
        <span
          className={`material-symbols-outlined text-sm transition-transform duration-200 group-hover:text-[#b22a2b] ${
            dropdownOpen ? "rotate-180" : ""
          }`}
        >
          expand_more
        </span>
      </button>

      {dropdownOpen && (
        <div
          className="absolute left-0 top-full mt-1 w-64 rounded-2xl bg-[#fff8f1] p-3 shadow-xl ring-1 ring-black/5 z-50 focus:outline-none transition-all duration-200"
          role="menu"
          aria-orientation="vertical"
        >
          <div className="py-1 space-y-1">
            <Link
              href="/products"
              role="menuitem"
              onClick={() => setDropdownOpen(false)}
              className="flex items-center justify-between rounded-xl px-3.5 py-2 text-xs font-semibold text-[#434b01] hover:bg-[#EAE2D1] transition-colors"
            >
              <span>All Products</span>
              <span className="material-symbols-outlined text-xs text-[#434b01]/60">arrow_forward</span>
            </Link>

            <div className="border-t border-[#EAE2D1] my-1" />

            {categories.map((cat) => {
              const active = pathname === `/products/category/${cat.slug}`;
              return (
                <Link
                  key={cat.id}
                  href={`/products/category/${cat.slug}`}
                  role="menuitem"
                  onClick={() => setDropdownOpen(false)}
                  className={`flex items-center justify-between rounded-xl px-3.5 py-2 text-xs transition-colors ${
                    active
                      ? "bg-[#434b01] text-[#fff8f1] font-bold"
                      : "text-[#47483a] hover:bg-[#EAE2D1] hover:text-[#434b01] font-medium"
                  }`}
                >
                  <span className="truncate">{cat.name}</span>
                  {active && (
                    <span className="material-symbols-outlined text-xs">check</span>
                  )}
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
