"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect, useMemo } from "react";
import CartDrawer from "./CartDrawer";
import { useCartStore } from "@/store/cartStore";
import CategoryNavigation from "@/components/storefront/categories/CategoryNavigation";
import type { Category } from "@/types/category";

const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "918796513654";
const WHATSAPP_GREETING = encodeURIComponent("Hello, I'd like to learn more about AL-HAYAT products.");

const NAV_LINKS_BEFORE = [
  { label: "Home", href: "/" },
  { label: "Products", href: "/products" },
];

const NAV_LINKS_AFTER = [
  { label: "About", href: "/about" },
  { label: "Ingredients", href: "/ingredients" },
  { label: "Reviews", href: "/reviews" },
  { label: "Contact", href: "/contact" },
];

interface TopNavBarProps {
  categories?: Category[];
}

export default function TopNavBar({ categories = [] }: TopNavBarProps) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(pathname !== "/");
  const { getTotalItems } = useCartStore();
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (pathname !== "/") {
      setIsVisible(true);
      return;
    }

    const handleScroll = () => {
      const scrollDistance = 1575; // matches TOTAL_FRAMES * pixelsPerFrame in page.tsx
      setIsVisible(window.scrollY >= scrollDistance);
    };

    // Initial check
    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [pathname]);

  return (
    <>
      <header
        className="fixed top-0 left-0 w-full z-[100] transition-all duration-500 ease-out"
        style={{
          transform: isVisible ? "translateY(0)" : "translateY(-100%)",
          opacity: isVisible ? 1 : 0,
          pointerEvents: isVisible ? "auto" : "none",
          background: "linear-gradient(135deg, rgba(255, 255, 255, 0.45) 0%, rgba(255, 248, 241, 0.15) 100%)",
          backdropFilter: "blur(20px) saturate(160%)",
          WebkitBackdropFilter: "blur(20px) saturate(160%)",
          borderBottom: "1px solid rgba(255, 255, 255, 0.45)",
          boxShadow: "0 8px 32px 0 rgba(67, 75, 1, 0.05), inset 0 1px 0 0 rgba(255, 255, 255, 0.6)",
        }}
      >
        <div
          className="flex items-center justify-between w-full px-6 py-3 mx-auto"
          style={{ maxWidth: "1280px" }}
        >
          {/* ─── Left: Desktop Nav Links ─── */}
          <nav className="hidden md:flex items-center gap-5 lg:gap-6 flex-1">
            {NAV_LINKS_BEFORE.map((link) => {
              const isActive =
                (link.href === "/" && pathname === "/") ||
                (link.href !== "/" && pathname.startsWith(link.href) && !pathname.startsWith("/products/category"));
              return (
                <Link
                  key={link.label}
                  href={link.href}
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "13px",
                    fontWeight: isActive ? 700 : 400,
                    color: isActive ? "#b22a2b" : "#47483a",
                    textDecoration: "none",
                    borderBottom: isActive ? "2px solid #b22a2b" : "2px solid transparent",
                    paddingBottom: "2px",
                    transition: "color 0.2s, border-color 0.2s",
                  }}
                  className="hover:text-[#b22a2b] transition-colors"
                >
                  {link.label}
                </Link>
              );
            })}

            {/* Dynamic Categories Dropdown */}
            <CategoryNavigation categories={categories} />

            {NAV_LINKS_AFTER.map((link) => {
              const isActive = pathname.startsWith(link.href);
              return (
                <Link
                  key={link.label}
                  href={link.href}
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "13px",
                    fontWeight: isActive ? 700 : 400,
                    color: isActive ? "#b22a2b" : "#47483a",
                    textDecoration: "none",
                    borderBottom: isActive ? "2px solid #b22a2b" : "2px solid transparent",
                    paddingBottom: "2px",
                    transition: "color 0.2s, border-color 0.2s",
                  }}
                  className="hover:text-[#b22a2b] transition-colors"
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* ─── Mobile Hamburger ─── */}
          <button
            className="md:hidden p-2 text-[#434b01]"
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
          >
            <span className="material-symbols-outlined" style={{ fontSize: "26px" }}>menu</span>
          </button>

          {/* ─── Center: Brand Logo ─── */}
          <Link
            href="/"
            className="absolute left-1/2 -translate-x-1/2 md:static md:translate-x-0 flex items-center justify-center"
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(20px,3vw,28px)",
              fontWeight: 700,
              color: "#434b01",
              letterSpacing: "-0.02em",
              textDecoration: "none",
              lineHeight: 1,
              whiteSpace: "nowrap",
              flex: "1",
              textAlign: "center",
            }}
          >
            AL-HAYAT
          </Link>

          {/* ─── Right: WhatsApp CTA + Search ─── */}
          <div className="hidden md:flex items-center gap-3 flex-1 justify-end">
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_GREETING}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 rounded-full text-white transition-all duration-200 hover:scale-105"
              style={{
                background: "#25D366",
                fontFamily: "'Inter', sans-serif",
                fontSize: "12px",
                fontWeight: 600,
                letterSpacing: "0.04em",
                boxShadow: "0 2px 12px rgba(37,211,102,0.35)",
                textDecoration: "none",
              }}
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="white">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              Order on WhatsApp
            </a>
            
            <button
              onClick={() => setCartOpen(true)}
              className="relative p-2 text-[#434b01] hover:text-[#b22a2b] transition-colors"
              aria-label="Cart"
            >
              <span className="material-symbols-outlined" style={{ fontSize: "24px" }}>shopping_bag</span>
              {mounted && getTotalItems() > 0 && (
                <span 
                  className="absolute top-0 right-0 w-4 h-4 bg-[#b22a2b] text-white text-[10px] font-bold flex items-center justify-center rounded-full"
                >
                  {getTotalItems()}
                </span>
              )}
            </button>
          </div>

          {/* Mobile right side — WhatsApp icon & Cart */}
          <div className="md:hidden flex items-center gap-2 flex-1 justify-end">
            <button
              onClick={() => setCartOpen(true)}
              className="relative p-2 text-[#434b01] transition-colors"
              aria-label="Cart"
            >
              <span className="material-symbols-outlined" style={{ fontSize: "24px" }}>shopping_bag</span>
              {mounted && getTotalItems() > 0 && (
                <span 
                  className="absolute top-0 right-0 w-4 h-4 bg-[#b22a2b] text-white text-[10px] font-bold flex items-center justify-center rounded-full"
                >
                  {getTotalItems()}
                </span>
              )}
            </button>
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_GREETING}`}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-[#25D366]"
              aria-label="WhatsApp"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
            </a>
          </div>
        </div>
      </header>

      {/* ─── Mobile Slide-out Drawer ─── */}
      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-[200] transition-opacity duration-300 md:hidden ${
          mobileOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        style={{ background: "rgba(30,27,22,0.55)", backdropFilter: "blur(4px)" }}
        onClick={() => setMobileOpen(false)}
      />

      {/* Drawer panel */}
      <div
        className={`fixed top-0 left-0 h-full z-[210] flex flex-col py-8 px-8 transition-transform duration-300 md:hidden`}
        style={{
          width: "280px",
          background: "rgba(255,248,241,0.97)",
          backdropFilter: "blur(20px)",
          boxShadow: "4px 0 32px rgba(0,0,0,0.12)",
          transform: mobileOpen ? "translateX(0)" : "translateX(-100%)",
        }}
      >
        <div className="flex items-center justify-between mb-10">
          <span
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "22px",
              fontWeight: 700,
              color: "#434b01",
              letterSpacing: "-0.02em",
            }}
          >
            AL-HAYAT
          </span>
          <button
            onClick={() => setMobileOpen(false)}
            className="text-[#47483a] hover:text-[#b22a2b] transition-colors"
            aria-label="Close menu"
          >
            <span className="material-symbols-outlined" style={{ fontSize: "24px" }}>close</span>
          </button>
        </div>

        <nav className="flex flex-col gap-1 flex-1">
          {NAV_LINKS_BEFORE.map((link) => {
            const isActive =
              (link.href === "/" && pathname === "/") ||
              (link.href !== "/" && pathname.startsWith(link.href) && !pathname.startsWith("/products/category"));
            return (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "22px",
                  fontWeight: isActive ? 700 : 400,
                  color: isActive ? "#b22a2b" : "#434b01",
                  textDecoration: "none",
                  padding: "10px 0",
                  borderBottom: "1px solid rgba(200,199,181,0.35)",
                  display: "block",
                  transition: "color 0.2s",
                }}
              >
                {link.label}
              </Link>
            );
          })}

          {/* Dynamic Categories Mobile Accordion */}
          <CategoryNavigation
            categories={categories}
            isMobile
            onMobileClose={() => setMobileOpen(false)}
          />

          {NAV_LINKS_AFTER.map((link) => {
            const isActive = pathname.startsWith(link.href);
            return (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "22px",
                  fontWeight: isActive ? 700 : 400,
                  color: isActive ? "#b22a2b" : "#434b01",
                  textDecoration: "none",
                  padding: "10px 0",
                  borderBottom: "1px solid rgba(200,199,181,0.35)",
                  display: "block",
                  transition: "color 0.2s",
                }}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <a
          href={`https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_GREETING}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 mt-8 px-5 py-3 rounded-full text-white"
          style={{
            background: "#25D366",
            fontFamily: "'Inter', sans-serif",
            fontSize: "14px",
            fontWeight: 600,
            boxShadow: "0 4px 16px rgba(37,211,102,0.35)",
            textDecoration: "none",
          }}
          onClick={() => setMobileOpen(false)}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
          </svg>
          Order on WhatsApp
        </a>
      </div>
      <CartDrawer isOpen={cartOpen} onClose={() => setCartOpen(false)} />
    </>
  );
}
