"use client";

import { useState, useEffect, Suspense, useMemo } from "react";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import Image from "next/image";
import { PRODUCTS, type Product } from "@/data/products";
import { useCartStore } from "@/store/cartStore";
import { ProductRevealCard } from "@/components/ProductRevealCard";
import { getCategoriesWithProductCounts, type StorefrontCategoryWithCount } from "@/services/storefrontCategoryService";
import CategorySidebar from "@/components/storefront/categories/CategorySidebar";
import CategoryChip from "@/components/storefront/categories/CategoryChip";
import CategoryEmptyState from "@/components/storefront/categories/CategoryEmptyState";

const WHATSAPP_NUMBER = "919876543210";

function ProductsContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const urlCategorySlug = searchParams.get("category") || "all";
  const urlSearchQuery = searchParams.get("search") || "";

  const [activeCategorySlug, setActiveCategorySlug] = useState(urlCategorySlug);
  const [searchQuery, setSearchQuery] = useState(urlSearchQuery);
  const [view, setView] = useState<"grid" | "list">("grid");
  const [sort, setSort] = useState("recommended");
  const [productsList, setProductsList] = useState<Product[]>(PRODUCTS);
  const [categories, setCategories] = useState<StorefrontCategoryWithCount[]>([]);
  const [loadingData, setLoadingData] = useState(true);

  const addItem = useCartStore((state) => state.addItem);

  // Sync state with URL params on navigation change
  useEffect(() => {
    setActiveCategorySlug(searchParams.get("category") || "all");
    setSearchQuery(searchParams.get("search") || "");
  }, [searchParams]);

  // Load dynamic categories & products from Supabase
  useEffect(() => {
    let mounted = true;
    setLoadingData(true);

    Promise.all([
      getCategoriesWithProductCounts(),
      import("@/services/productService").then((mod) => mod.getProducts()),
    ])
      .then(([catsData, prodsData]) => {
        if (!mounted) return;
        if (catsData) setCategories(catsData);
        if (prodsData && prodsData.length > 0) setProductsList(prodsData);
      })
      .catch((err) => console.error("Failed to load products page data:", err))
      .finally(() => {
        if (mounted) setLoadingData(false);
      });

    return () => {
      mounted = false;
    };
  }, []);

  // Handle category selection
  const handleSelectCategory = (slug: string) => {
    setActiveCategorySlug(slug);

    const params = new URLSearchParams();
    if (slug && slug !== "all") {
      params.set("category", slug);
    }
    if (searchQuery.trim()) {
      params.set("search", searchQuery.trim());
    }

    const queryString = params.toString();
    router.push(`/products${queryString ? `?${queryString}` : ""}`, { scroll: false });
  };

  // Handle search query updates
  const handleSearchChange = (query: string) => {
    setSearchQuery(query);

    const params = new URLSearchParams();
    if (activeCategorySlug && activeCategorySlug !== "all") {
      params.set("category", activeCategorySlug);
    }
    if (query.trim()) {
      params.set("search", query.trim());
    }

    const queryString = params.toString();
    router.push(`/products${queryString ? `?${queryString}` : ""}`, { scroll: false });
  };

  // Compute active category object
  const activeCategoryObj = useMemo(() => {
    if (activeCategorySlug === "all") return null;
    return categories.find((c) => c.slug === activeCategorySlug) || null;
  }, [categories, activeCategorySlug]);

  // Compute filtered & sorted products
  const filtered = useMemo(() => {
    return productsList
      .filter((p) => {
        // Category Filter
        if (activeCategorySlug !== "all") {
          if (activeCategoryObj) {
            const matchesId = p.categoryId === activeCategoryObj.id;
            const matchesName = p.category && p.category.toLowerCase() === activeCategoryObj.name.toLowerCase();
            const matchesSlugWord =
              p.category &&
              activeCategorySlug.split("-")[0] &&
              p.category.toLowerCase().includes(activeCategorySlug.split("-")[0].toLowerCase());
            if (!matchesId && !matchesName && !matchesSlugWord) return false;
          } else {
            // Fallback if category object hasn't loaded yet
            if (
              !p.category?.toLowerCase().includes(activeCategorySlug.split("-")[0].toLowerCase()) &&
              p.slug !== activeCategorySlug
            ) {
              return false;
            }
          }
        }

        // Search Query Filter
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase().trim();
          const matchesName = p.name?.toLowerCase().includes(q);
          const matchesDesc = p.desc?.toLowerCase().includes(q) || p.benefit?.toLowerCase().includes(q);
          const matchesIng = p.ingredients?.some((i) => i.toLowerCase().includes(q));
          const matchesCat = p.category?.toLowerCase().includes(q);
          if (!matchesName && !matchesDesc && !matchesIng && !matchesCat) return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (sort === "price-asc") {
          return parseInt(String(a.price).replace(/[^0-9]/g, "")) - parseInt(String(b.price).replace(/[^0-9]/g, ""));
        }
        if (sort === "price-desc") {
          return parseInt(String(b.price).replace(/[^0-9]/g, "")) - parseInt(String(a.price).replace(/[^0-9]/g, ""));
        }
        return 0;
      });
  }, [productsList, activeCategorySlug, activeCategoryObj, searchQuery, sort]);

  const totalActiveProductsCount = useMemo(() => {
    return productsList.length;
  }, [productsList]);

  return (
    <main className="min-h-screen pt-[72px]" style={{ background: "#fff8f1" }}>
      {/* Hero Banner */}
      <section
        className="relative w-full flex items-center justify-center py-16 px-6"
        style={{ background: "#EAE2D1", minHeight: "260px" }}
      >
        <div className="text-center max-w-2xl mx-auto z-10">
          <span
            style={{
              fontFamily: "'Dancing Script', cursive",
              fontSize: "22px",
              color: "#b22a2b",
              display: "block",
              marginBottom: "8px",
            }}
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
            {activeCategoryObj ? activeCategoryObj.name : "All Products"}
          </h1>
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "15px",
              color: "#47483a",
              lineHeight: 1.7,
            }}
          >
            {activeCategoryObj?.description ||
              "Handcrafted with 100% natural botanical ingredients. Order directly on WhatsApp."}
          </p>
        </div>

        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none">
          <svg
            viewBox="0 0 1200 60"
            preserveAspectRatio="none"
            className="w-full"
            style={{ height: "50px", display: "block" }}
          >
            <path
              d="M0,30 C200,60 400,0 600,30 C800,60 1000,0 1200,30 L1200,60 L0,60 Z"
              fill="#fff8f1"
            />
          </svg>
        </div>
      </section>

      {/* Main Container */}
      <section className="max-w-7xl mx-auto px-6 py-8">
        {/* Mobile / Tablet Horizontal Category Chips */}
        <div className="block lg:hidden mb-6">
          <CategoryChip
            categories={categories}
            activeCategorySlug={activeCategorySlug}
            totalProductsCount={totalActiveProductsCount}
            onSelectCategory={handleSelectCategory}
          />
        </div>

        {/* Top Controls Bar: Search + Sort + View */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8 bg-white/70 backdrop-blur-sm p-4 rounded-2xl border border-gray-200/50 shadow-xs">
          {/* Search Bar */}
          <div className="relative w-full sm:w-80">
            <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-lg">
              search
            </span>
            <input
              type="text"
              placeholder="Search products, ingredients..."
              value={searchQuery}
              onChange={(e) => handleSearchChange(e.target.value)}
              className="w-full pl-10 pr-9 py-2 rounded-xl bg-[#EAE2D1]/40 border border-transparent focus:border-[#434b01] focus:bg-white text-xs text-[#434b01] placeholder-gray-500 outline-none transition-all"
              style={{ fontFamily: "'Inter', sans-serif" }}
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => handleSearchChange("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none flex items-center justify-center"
              >
                <span className="material-symbols-outlined text-sm">close</span>
              </button>
            )}
          </div>

          {/* Results Info & Controls */}
          <div className="flex items-center justify-between sm:justify-end w-full sm:w-auto gap-4">
            <span
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "12px",
                color: "#787868",
              }}
            >
              Showing <strong className="text-[#434b01]">{filtered.length}</strong>{" "}
              {filtered.length === 1 ? "product" : "products"}
            </span>

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
                  className="p-2 rounded-lg transition-colors flex items-center justify-center"
                  style={{
                    background: view === "grid" ? "#434b01" : "#EAE2D1",
                    color: view === "grid" ? "white" : "#434b01",
                  }}
                  aria-label="Grid view"
                >
                  <span className="material-symbols-outlined text-base">grid_view</span>
                </button>
                <button
                  onClick={() => setView("list")}
                  className="p-2 rounded-lg transition-colors flex items-center justify-center"
                  style={{
                    background: view === "list" ? "#434b01" : "#EAE2D1",
                    color: view === "list" ? "white" : "#434b01",
                  }}
                  aria-label="List view"
                >
                  <span className="material-symbols-outlined text-base">view_list</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Layout: Sidebar (Desktop) + Product Grid/List */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
          {/* Desktop Category Sidebar */}
          <div className="hidden lg:block lg:col-span-1 sticky top-24">
            <CategorySidebar
              categories={categories}
              activeCategorySlug={activeCategorySlug}
              totalProductsCount={totalActiveProductsCount}
              onSelectCategory={handleSelectCategory}
            />
          </div>

          {/* Product Listing Section */}
          <div className="lg:col-span-3">
            {loadingData ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 animate-pulse">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div key={i} className="bg-white rounded-2xl p-4 space-y-3">
                    <div className="w-full aspect-square bg-[#EAE2D1] rounded-xl" />
                    <div className="h-4 w-3/4 bg-[#EAE2D1] rounded" />
                    <div className="h-3 w-full bg-[#EAE2D1] rounded" />
                    <div className="h-10 w-full bg-[#EAE2D1] rounded-xl mt-4" />
                  </div>
                ))}
              </div>
            ) : filtered.length === 0 ? (
              <CategoryEmptyState categoryName={activeCategoryObj?.name} />
            ) : view === "grid" ? (
              /* Grid View */
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {filtered.map((product) => (
                  <ProductRevealCard key={product.slug} product={product} />
                ))}
              </div>
            ) : (
              /* List View */
              <div className="flex flex-col gap-4">
                {filtered.map((product) => (
                  <div
                    key={product.slug}
                    className="group bg-white rounded-2xl overflow-hidden hover:-translate-y-0.5 transition-all duration-300 border border-gray-200/40"
                    style={{ boxShadow: "0 4px 20px rgba(0,0,0,0.06)" }}
                  >
                    <div className="flex flex-col sm:flex-row items-center gap-0">
                      <Link
                        href={`/product/${product.slug}`}
                        className="flex items-center gap-5 flex-1 p-4 w-full"
                        style={{ textDecoration: "none" }}
                      >
                        <div
                          className="relative flex-shrink-0 rounded-xl overflow-hidden"
                          style={{ width: "110px", height: "110px", background: "#faf3ea" }}
                        >
                          {product.badge && (
                            <span
                              className="absolute top-1.5 left-1.5 z-10 px-1.5 py-0.5 rounded-sm text-white"
                              style={{
                                fontFamily: "'Inter',sans-serif",
                                fontSize: "8px",
                                fontWeight: 700,
                                letterSpacing: "0.1em",
                                background: "#b22a2b",
                              }}
                            >
                              {product.badge}
                            </span>
                          )}
                          <Image src={product.img} alt={product.name} fill className="object-cover" sizes="110px" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p
                            style={{
                              fontFamily: "'Inter', sans-serif",
                              fontSize: "10px",
                              fontWeight: 700,
                              color: "#b22a2b",
                              letterSpacing: "0.1em",
                              textTransform: "uppercase",
                              marginBottom: "3px",
                            }}
                          >
                            {product.category}
                          </p>
                          <h2
                            style={{
                              fontFamily: "'Playfair Display', serif",
                              fontSize: "18px",
                              fontWeight: 600,
                              color: "#434b01",
                              marginBottom: "4px",
                            }}
                            className="group-hover:text-[#b22a2b] transition-colors truncate"
                          >
                            {product.name}
                          </h2>
                          <p
                            style={{
                              fontFamily: "'Inter', sans-serif",
                              fontSize: "12px",
                              color: "#47483a",
                              lineHeight: 1.5,
                              marginBottom: "8px",
                            }}
                            className="line-clamp-2 max-w-lg"
                          >
                            {product.desc}
                          </p>
                          <div className="flex flex-wrap gap-1.5 mb-2">
                            {(product.ingredients || []).slice(0, 4).map((ing) => (
                              <span
                                key={ing}
                                className="px-2 py-0.5 rounded-md"
                                style={{
                                  fontFamily: "'Inter', sans-serif",
                                  fontSize: "9px",
                                  color: "#434b01",
                                  background: "#EAE2D1",
                                }}
                              >
                                {ing}
                              </span>
                            ))}
                          </div>
                          <span
                            style={{
                              fontFamily: "'Inter', sans-serif",
                              fontSize: "17px",
                              fontWeight: 700,
                              color: "#434b01",
                            }}
                          >
                            {product.price}
                          </span>
                        </div>
                      </Link>
                      <div className="flex items-center px-4 pb-4 sm:pb-0 w-full sm:w-auto justify-end">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            addItem(product, 1);
                            alert("Added to cart!");
                          }}
                          className="flex items-center justify-center gap-1.5 px-5 py-2.5 rounded-xl text-white hover:bg-[#343a01] transition-all shadow-xs w-full sm:w-auto"
                          style={{
                            background: "#434b01",
                            fontFamily: "'Inter', sans-serif",
                            fontSize: "11px",
                            fontWeight: 700,
                            letterSpacing: "0.06em",
                            border: "none",
                            cursor: "pointer",
                            whiteSpace: "nowrap",
                          }}
                        >
                          <span className="material-symbols-outlined text-base">shopping_cart</span>
                          ADD TO CART
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}

export default function ProductsPage() {
  return (
    <Suspense
      fallback={
        <main className="min-h-screen pt-[72px] bg-[#fff8f1] flex items-center justify-center">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#434b01]" />
        </main>
      }
    >
      <ProductsContent />
    </Suspense>
  );
}
