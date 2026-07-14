"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Footer from "@/components/Footer";
import { PRODUCTS } from "@/data/products";

const WHATSAPP_NUMBER = "919876543210";

function waLink(productName: string) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(`Hello! I'm interested in ordering: ${productName}. Please guide me through the ordering process. Thank you.`)}`;
}

const CATEGORIES = ["All", "Face Care", "Hair Care", "Handmade Soaps", "Lip Care", "Body Care"];

// Products loaded from shared data file

export default function ProductsPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [view, setView] = useState<"grid" | "list">("grid");
  const [sort, setSort] = useState("recommended");
  const [productsList, setProductsList] = useState(PRODUCTS);

  // Load products from Supabase dynamically on mount
  useEffect(() => {
    import("@/services/productService").then((mod) => {
      mod.getProducts().then((data) => {
        if (data && data.length > 0) {
          setProductsList(data);
        }
      });
    });
  }, []);

  const filtered = productsList.filter((p) =>
    activeCategory === "All" ? true : p.category === activeCategory
  ).sort((a, b) => {
    if (sort === "price-asc") return parseInt(a.price.replace("₹", "")) - parseInt(b.price.replace("₹", ""));
    if (sort === "price-desc") return parseInt(b.price.replace("₹", "")) - parseInt(a.price.replace("₹", ""));
    return 0;
  });

  return (
    <main className="min-h-screen pt-[72px]" style={{ background: "#fff8f1" }}>

      {/* Hero */}
      <section
        className="relative w-full flex items-center justify-center py-16 px-6"
        style={{ background: "#EAE2D1", minHeight: "280px" }}
      >
        <div className="text-center max-w-2xl mx-auto">
          <span
            style={{ fontFamily: "'Dancing Script', cursive", fontSize: "22px", color: "#b22a2b", display: "block", marginBottom: "10px" }}
          >
            Our Collection
          </span>
          <h1
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(30px,5vw,52px)",
              fontWeight: 700,
              color: "#434b01",
              lineHeight: 1.2,
              marginBottom: "12px",
            }}
          >
            All Products
          </h1>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "15px", color: "#47483a", lineHeight: 1.7 }}>
            Handcrafted with 100% natural botanical ingredients. Order directly on WhatsApp.
          </p>
        </div>

        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none">
          <svg viewBox="0 0 1200 60" preserveAspectRatio="none" className="w-full" style={{ height: "60px", display: "block" }}>
            <path d="M0,30 C200,60 400,0 600,30 C800,60 1000,0 1200,30 L1200,60 L0,60 Z" fill="#fff8f1" />
          </svg>
        </div>
      </section>

      {/* Filter bar */}
      <section className="px-6 py-8">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            {/* Category filters */}
            <div className="flex flex-wrap gap-2">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className="px-4 py-2 rounded-full text-sm transition-all duration-200"
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "12px",
                    fontWeight: 600,
                    letterSpacing: "0.04em",
                    background: activeCategory === cat ? "#434b01" : "#EAE2D1",
                    color: activeCategory === cat ? "#fff8f1" : "#47483a",
                    border: "none",
                    cursor: "pointer",
                  }}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Sort + View controls */}
            <div className="flex items-center gap-3">
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "12px",
                  color: "#434b01",
                  background: "#EAE2D1",
                  border: "none",
                  borderRadius: "20px",
                  padding: "8px 14px",
                  outline: "none",
                  cursor: "pointer",
                }}
              >
                <option value="recommended">Recommended</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
              </select>

              <div className="flex gap-1">
                <button
                  onClick={() => setView("grid")}
                  className="p-2 rounded-lg transition-colors"
                  style={{ background: view === "grid" ? "#434b01" : "#EAE2D1", color: view === "grid" ? "white" : "#434b01" }}
                  aria-label="Grid view"
                >
                  <span className="material-symbols-outlined" style={{ fontSize: "18px" }}>grid_view</span>
                </button>
                <button
                  onClick={() => setView("list")}
                  className="p-2 rounded-lg transition-colors"
                  style={{ background: view === "list" ? "#434b01" : "#EAE2D1", color: view === "list" ? "white" : "#434b01" }}
                  aria-label="List view"
                >
                  <span className="material-symbols-outlined" style={{ fontSize: "18px" }}>view_list</span>
                </button>
              </div>
            </div>
          </div>

          {/* Results count */}
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "12px", color: "#787868", marginBottom: "24px" }}>
            Showing {filtered.length} product{filtered.length !== 1 ? "s" : ""}
          </p>

          {/* Product Grid */}
          {view === "grid" ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
              {filtered.map((product) => (
                <div
                  key={product.slug}
                  className="group bg-white rounded-2xl overflow-hidden hover:-translate-y-1 transition-transform duration-300"
                  style={{ boxShadow: "0 4px 24px rgba(0,0,0,0.07)" }}
                >
                  <Link href={`/product/${product.slug}`} style={{ textDecoration: "none" }}>
                    <div className="relative" style={{ aspectRatio: "1 / 1", background: "#faf3ea" }}>
                      {product.badge && (
                        <span
                          className="absolute top-2 left-2 z-10 px-2 py-0.5 rounded-sm text-white"
                          style={{ fontFamily: "'Inter',sans-serif", fontSize: "8px", fontWeight: 700, letterSpacing: "0.1em", background: "#b22a2b" }}
                        >
                          {product.badge}
                        </span>
                      )}
                      <img
                        src={product.img}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="p-4 pb-2">
                      <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "9px", fontWeight: 700, color: "#b22a2b", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "3px" }}>
                        {product.category}
                      </p>
                      <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "15px", fontWeight: 600, color: "#434b01", marginBottom: "4px" }}>
                        {product.name}
                      </h2>
                      <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "11px", color: "#47483a", lineHeight: 1.5, marginBottom: "8px" }}>
                        {product.benefit}
                      </p>
                      <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "15px", fontWeight: 700, color: "#434b01" }}>
                        {product.price}
                      </span>
                    </div>
                  </Link>
                  <div className="px-4 pb-4 pt-2">
                    <a
                      href={waLink(product.name)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-1.5 w-full py-2 rounded-xl text-white hover:opacity-90 transition-opacity"
                      style={{
                        background: "#25D366",
                        fontFamily: "'Inter', sans-serif",
                        fontSize: "10px",
                        fontWeight: 700,
                        letterSpacing: "0.06em",
                        textDecoration: "none",
                      }}
                    >
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="white">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                      </svg>
                      ORDER ON WHATSAPP
                    </a>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            /* List View */
            <div className="flex flex-col gap-4">
              {filtered.map((product) => (
                <div
                  key={product.slug}
                  className="group bg-white rounded-2xl overflow-hidden hover:-translate-y-0.5 transition-transform duration-300"
                  style={{ boxShadow: "0 4px 20px rgba(0,0,0,0.06)" }}
                >
                  <div className="flex gap-0">
                    <Link href={`/product/${product.slug}`} className="flex items-center gap-5 flex-1 p-4" style={{ textDecoration: "none" }}>
                      <div
                        className="relative flex-shrink-0 rounded-xl overflow-hidden"
                        style={{ width: "100px", height: "100px", background: "#faf3ea" }}
                      >
                        {product.badge && (
                          <span
                            className="absolute top-1 left-1 z-10 px-1.5 py-0.5 rounded-sm text-white"
                            style={{ fontFamily: "'Inter',sans-serif", fontSize: "7px", fontWeight: 700, letterSpacing: "0.1em", background: "#b22a2b" }}
                          >
                            {product.badge}
                          </span>
                        )}
                        <img src={product.img} alt={product.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1">
                        <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "9px", fontWeight: 700, color: "#b22a2b", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "3px" }}>
                          {product.category}
                        </p>
                        <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "17px", fontWeight: 600, color: "#434b01", marginBottom: "4px" }}>
                          {product.name}
                        </h2>
                        <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "12px", color: "#47483a", lineHeight: 1.5, marginBottom: "8px", maxWidth: "400px" }}>
                          {product.desc}
                        </p>
                        <div className="flex flex-wrap gap-1.5 mb-2">
                          {product.ingredients.map((ing) => (
                            <span
                              key={ing}
                              className="px-2 py-0.5 rounded-md"
                              style={{ fontFamily: "'Inter', sans-serif", fontSize: "9px", color: "#434b01", background: "#EAE2D1" }}
                            >
                              {ing}
                            </span>
                          ))}
                        </div>
                        <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "17px", fontWeight: 700, color: "#434b01" }}>
                          {product.price}
                        </span>
                      </div>
                    </Link>
                    <div className="flex items-center px-4">
                      <a
                        href={waLink(product.name)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-white hover:opacity-90 transition-opacity"
                        style={{
                          background: "#25D366",
                          fontFamily: "'Inter', sans-serif",
                          fontSize: "10px",
                          fontWeight: 700,
                          letterSpacing: "0.06em",
                          textDecoration: "none",
                          whiteSpace: "nowrap",
                        }}
                      >
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="white">
                          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                        </svg>
                        Order
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}
