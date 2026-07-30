"use client";

import { useState, use, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { PRODUCTS, Product } from "@/data/products";
import { useCartStore } from "@/store/cartStore";
import { useWishlistStore } from "@/store/wishlistStore";
import { Heart } from "lucide-react";

const WHATSAPP_NUMBER = "918796513654"; // Updated as per PDF requirements

function waLink(productName: string, qty: number) {
  const msg = `Hello! I'm interested in ordering: ${qty} x ${productName}. Please guide me through the ordering process. Thank you.`;
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
}

// Reusable label style
const labelStyle: React.CSSProperties = {
  fontFamily: "'Inter', sans-serif",
  fontSize: "10px",
  fontWeight: 600,
  letterSpacing: "0.12em",
  textTransform: "uppercase",
};

interface Props {
  params: Promise<{ slug: string }>;
}

export default function ProductDetailPage({ params }: Props) {
  const { slug } = use(params);
  const router = useRouter();
  const [qty, setQty] = useState(1);
  const addItem = useCartStore((state) => state.addItem);
  const { items: wishlistItems, toggleWishlist } = useWishlistStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Find product by slug initially from static list, then fetch updated from Supabase
  const initialProduct = PRODUCTS.find((p) => p.slug === slug) || null;
  const [product, setProduct] = useState<Product | null>(initialProduct);
  const [loading, setLoading] = useState(!initialProduct);

  useEffect(() => {
    import("@/services/productService").then((mod) => {
      mod.getProductBySlug(slug).then((data) => {
        if (data) {
          setProduct(data);
        }
        setLoading(false);
      });
    });
  }, [slug]);

  if (loading) {
    return (
      <main className="min-h-screen bg-[#fff8f1] pt-[120px] pb-24 text-center px-6">
        <div className="flex items-center justify-center gap-2">
          <span
            className="material-symbols-outlined animate-spin text-[#434b01]"
            style={{ fontSize: "32px" }}
          >
            progress_activity
          </span>
          <span
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "16px",
              color: "#47483a",
            }}
          >
            Loading product...
          </span>
        </div>
      </main>
    );
  }

  if (!product) {
    return (
      <main className="min-h-screen bg-[#fff8f1] pt-[120px] pb-24 text-center px-6">
        <h1
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "32px",
            color: "#434b01",
            marginBottom: "16px",
          }}
        >
          Product Not Found
        </h1>
        <p
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "16px",
            color: "#47483a",
            marginBottom: "24px",
          }}
        >
          We couldn't find the product you're looking for.
        </p>
        <Link
          href="/products"
          className="inline-block px-6 py-3 rounded-lg text-white"
          style={{
            background: "#434b01",
            fontFamily: "'Inter', sans-serif",
            fontWeight: 600,
            fontSize: "14px",
            textDecoration: "none",
          }}
        >
          Back to Products
        </Link>
      </main>
    );
  }

  const isFavorite = mounted && product ? wishlistItems.some((item) => item.slug === product.slug) : false;

  return (
    <main className="min-h-screen bg-[#fff8f1] pt-[72px]">
      {/* ═══ TOP SECTION: 2-col layout ═══ */}
      <section className="max-w-5xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
        {/* ─── LEFT: Image Gallery ─── */}
        <div className="md:sticky md:top-28 flex flex-col gap-3">
          {/* Main Image */}
          <div
            className="relative w-full overflow-hidden rounded-xl bg-[#faf3ea]"
            style={{ aspectRatio: "4/5" }}
          >
            {product.badge && (
              <span
                className="absolute top-3 left-3 z-10 text-white px-2.5 py-1 rounded-sm"
                style={{ ...labelStyle, background: "#b22a2b" }}
              >
                {product.badge}
              </span>
            )}
            <button
              onClick={() => toggleWishlist(product)}
              className={`absolute top-4 right-4 z-10 w-10 h-10 rounded-full border shadow-sm transition duration-200 transform hover:scale-110 flex items-center justify-center group cursor-pointer ${
                isFavorite
                  ? "bg-red-500 text-white border-red-500"
                  : "bg-white/95 text-[#787868] border-gray-200/30 hover:border-[#b22a2b] hover:text-[#b22a2b]"
              }`}
            >
              <Heart
                className={`w-[18px] h-[18px] transition-colors ${
                  isFavorite ? "fill-current" : "fill-none group-hover:fill-current"
                }`}
              />
            </button>
            <img
              src={product.img}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* ─── RIGHT: Product Info ─── */}
        <div className="flex flex-col">
          {/* Breadcrumb */}
          <nav
            className="flex items-center gap-1.5 mb-5"
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "11px",
              color: "#787868",
              letterSpacing: "0.08em",
            }}
          >
            <Link href="/" className="hover:text-[#434b01] transition-colors">
              Home
            </Link>
            <span
              className="material-symbols-outlined"
              style={{ fontSize: "14px" }}
            >
              chevron_right
            </span>
            <Link
              href="/products"
              className="hover:text-[#434b01] transition-colors"
            >
              Products
            </Link>
            <span
              className="material-symbols-outlined"
              style={{ fontSize: "14px" }}
            >
              chevron_right
            </span>
            <span style={{ color: "#434b01", fontWeight: 600 }}>
              {product.category}
            </span>
          </nav>

          {/* Product Name */}
          <h1
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(24px,3vw,36px)",
              fontWeight: 600,
              color: "#1A1A1A",
              lineHeight: 1.2,
              marginBottom: "8px",
            }}
          >
            {product.name}
          </h1>
          <p
            style={{
              fontFamily: "'Playfair Display', serif",
              fontStyle: "italic",
              fontSize: "15px",
              color: "#47483a",
              marginBottom: "20px",
            }}
          >
            {product.tagline}
          </p>

          {/* Price Row */}
          <div className="flex items-center gap-3 mb-6">
            <span
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "28px",
                fontWeight: 700,
                color: "#434b01",
              }}
            >
              {product.price}
            </span>
            <span
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "14px",
                color: "#787868",
                textDecoration: "line-through",
              }}
            >
              {product.priceOriginal}
            </span>
            <span
              className="px-2 py-0.5 rounded-sm"
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "11px",
                fontWeight: 700,
                background: "#ffb4aa",
                color: "#84231c",
              }}
            >
              {product.discount}
            </span>
          </div>

          {/* Description */}
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "14px",
              color: "#47483a",
              lineHeight: 1.7,
              marginBottom: "20px",
            }}
          >
            {product.desc}
          </p>

          {/* Key Benefits Grid */}
          <div
            className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6 py-5"
            style={{
              borderTop: "1px solid #c8c7b5",
              borderBottom: "1px solid #c8c7b5",
            }}
          >
            {product.detailedBenefits.map((b) => (
              <div key={b.title} className="flex items-start gap-2">
                <span
                  className="material-symbols-outlined text-[#434b01]"
                  style={{ fontSize: "20px", marginTop: "2px" }}
                >
                  {b.icon}
                </span>
                <div>
                  <div
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: "12px",
                      fontWeight: 600,
                      color: "#1A1A1A",
                    }}
                  >
                    {b.title}
                  </div>
                  <div
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: "11px",
                      color: "#787868",
                    }}
                  >
                    {b.sub}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Quantity + Add to Cart */}
          <div className="flex gap-3 mb-3">
            {/* Qty */}
            <div
              className="flex items-center rounded-lg overflow-hidden"
              style={{ border: "1px solid #c8c7b5", background: "#fff8f1" }}
            >
              <button
                className="px-3 py-3 hover:text-[#434b01] transition-colors"
                onClick={() => setQty(Math.max(1, qty - 1))}
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "16px",
                  color: "#787868",
                }}
              >
                <span
                  className="material-symbols-outlined"
                  style={{ fontSize: "18px" }}
                >
                  remove
                </span>
              </button>
              <span
                className="px-4 font-semibold"
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "15px",
                  color: "#1A1A1A",
                }}
              >
                {qty}
              </span>
              <button
                className="px-3 py-3 hover:text-[#434b01] transition-colors"
                onClick={() => setQty(qty + 1)}
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "16px",
                  color: "#787868",
                }}
              >
                <span
                  className="material-symbols-outlined"
                  style={{ fontSize: "18px" }}
                >
                  add
                </span>
              </button>
            </div>

            {/* Add to Cart */}
            <button
              onClick={() => {
                addItem(product, qty);
                router.push("/cart");
              }}
              className="flex-1 flex items-center justify-center gap-2 rounded-lg hover:opacity-90 transition-opacity text-center"
              style={{
                background: "#434b01",
                color: "#ffffff",
                ...labelStyle,
                fontSize: "12px",
                padding: "14px 20px",
                border: "none",
                cursor: "pointer",
              }}
            >
              <span
                className="material-symbols-outlined"
                style={{ fontSize: "16px" }}
              >
                shopping_cart
              </span>
              ADD TO CART
            </button>
          </div>

          {/* WhatsApp */}
          <a
            href={waLink(product.name, qty)}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex items-center justify-center gap-2 rounded-lg hover:opacity-90 transition-opacity mb-6 text-center"
            style={{
              background: "#25D366",
              color: "#fff",
              ...labelStyle,
              fontSize: "12px",
              padding: "14px 20px",
              textDecoration: "none",
            }}
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
              <path d="M12.04 2C6.492 2 2 6.492 2 12.04c0 1.99.583 3.844 1.594 5.399L2.067 22l4.629-1.512A9.973 9.973 0 0012.04 22C17.587 22 22 17.508 22 12.04 22 6.492 17.588 2 12.04 2zm0 18.158c-1.792 0-3.454-.494-4.876-1.351l-.35-.207-3.622 1.182 1.208-3.528-.228-.365C3.278 14.36 2.88 13.244 2.88 12.04c0-5.047 4.115-9.158 9.16-9.158 5.05 0 9.16 4.113 9.16 9.16 0 5.046-4.11 9.156-9.16 9.156z" />
            </svg>
            ORDER ON WHATSAPP
          </a>

          {/* Accordions */}
          <div style={{ borderTop: "1px solid #c8c7b5" }}>
            {[
              {
                title: "Ingredients",
                content: (
                  <ul className="space-y-2">
                    {product.detailedIngredients.map((ing) => (
                      <li key={ing.name} className="flex items-start gap-2">
                        <span
                          className="material-symbols-outlined text-[#434b01]"
                          style={{ fontSize: "14px", marginTop: "2px" }}
                        >
                          eco
                        </span>
                        <span
                          style={{
                            fontFamily: "'Inter', sans-serif",
                            fontSize: "13px",
                            color: "#47483a",
                          }}
                        >
                          <strong>{ing.name}:</strong> {ing.desc}
                        </span>
                      </li>
                    ))}
                  </ul>
                ),
              },
              {
                title: "Suitable For",
                content: (
                  <p
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: "13px",
                      color: "#47483a",
                      lineHeight: 1.6,
                    }}
                  >
                    This formulation is suitable for:{" "}
                    <strong>{product.suitableFor}</strong>.
                  </p>
                ),
              },
              {
                title: "Shipping & Returns",
                content: (
                  <p
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: "13px",
                      color: "#47483a",
                      lineHeight: 1.6,
                    }}
                  >
                    Free shipping on orders over ₹500. Standard delivery within
                    3–5 business days. 14-day return policy for unopened items.
                  </p>
                ),
              },
            ].map((acc) => (
              <details
                key={acc.title}
                className="group py-4"
                style={{ borderBottom: "1px solid #c8c7b5" }}
              >
                <summary
                  className="flex items-center justify-between cursor-pointer list-none"
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: "16px",
                    color: "#1A1A1A",
                  }}
                >
                  {acc.title}
                  <span
                    className="material-symbols-outlined transition-transform group-open:rotate-180"
                    style={{ fontSize: "20px" }}
                  >
                    expand_more
                  </span>
                </summary>
                <div className="mt-4">{acc.content}</div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ WAVE DIVIDER ═══ */}
      <div className="w-full overflow-hidden -mb-px">
        <svg
          viewBox="0 0 1440 80"
          preserveAspectRatio="none"
          className="w-full"
          style={{ height: "80px", display: "block" }}
        >
          <path
            d="M0,40 C360,80 720,0 1080,40 C1260,60 1380,48 1440,44 L1440,80 L0,80 Z"
            fill="#EAE2D1"
          />
        </svg>
      </div>

      {/* ═══ INGREDIENT STORY ═══ */}
      <section className="bg-[#EAE2D1] py-16 px-6 relative overflow-hidden">
        {/* Decorative leaf */}
        <div className="absolute -right-16 top-0 opacity-10 pointer-events-none">
          <svg
            width="300"
            height="300"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#434b01"
            strokeWidth="0.5"
          >
            <path d="M12 22C12 22 17 18 17 12C17 6 12 2 12 2C12 2 7 6 7 12C7 18 12 22 12 22Z" />
            <path d="M12 22V12" />
          </svg>
        </div>

        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <span
              style={{
                fontFamily: "'Dancing Script', cursive",
                fontSize: "22px",
                color: "#434b01",
                display: "block",
                marginBottom: "8px",
              }}
            >
              Botanical Wisdom
            </span>
            <h2
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "clamp(24px,3vw,36px)",
                fontWeight: 600,
                color: "#1A1A1A",
              }}
            >
              The Ingredient Story
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {product.detailedIngredients.slice(0, 2).map((ing, index) => (
              <div
                key={ing.name}
                className={`flex flex-col sm:flex-row gap-6 items-center bg-white rounded-xl p-6 hover:-translate-y-1 transition-transform duration-300 ${index === 1 ? "sm:flex-row-reverse sm:text-right" : ""}`}
                style={{ boxShadow: "0 4px 20px rgba(0,0,0,0.06)" }}
              >
                <div
                  className="flex-shrink-0 overflow-hidden bg-[#E7DBCA] flex items-center justify-center"
                  style={{
                    width: "100px",
                    height: "120px",
                    borderRadius: "60px 60px 8px 8px",
                  }}
                >
                  <span
                    className="material-symbols-outlined text-[#434b01]"
                    style={{ fontSize: "40px" }}
                  >
                    eco
                  </span>
                </div>
                <div>
                  <h3
                    style={{
                      fontFamily: "'Playfair Display', serif",
                      fontSize: "20px",
                      fontWeight: 600,
                      color: "#b22a2b",
                      marginBottom: "8px",
                    }}
                  >
                    {ing.name}
                  </h3>
                  <p
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: "13px",
                      color: "#47483a",
                      lineHeight: 1.6,
                      marginBottom: "10px",
                    }}
                  >
                    {ing.desc}
                  </p>
                  <Link
                    href="/ingredients"
                    className={`flex items-center gap-1 text-[#434b01] hover:text-[#b22a2b] transition-colors ${index === 1 ? "sm:justify-end" : ""}`}
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: "10px",
                      fontWeight: 600,
                      letterSpacing: "0.1em",
                      textDecoration: "none",
                    }}
                  >
                    EXPLORE BENEFITS{" "}
                    <span
                      className="material-symbols-outlined"
                      style={{ fontSize: "12px" }}
                    >
                      arrow_forward
                    </span>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ WAVE DIVIDER (inverted) ═══ */}
      <div className="w-full overflow-hidden -mt-px">
        <svg
          viewBox="0 0 1440 80"
          preserveAspectRatio="none"
          className="w-full"
          style={{ height: "80px", display: "block" }}
        >
          <path
            d="M0,40 C360,0 720,80 1080,40 C1260,20 1380,32 1440,36 L1440,0 L0,0 Z"
            fill="#EAE2D1"
          />
        </svg>
      </div>

      {/* ═══ DR FARHEEN INSIGHT + THE RITUAL ═══ */}
      <section className="bg-[#fff8f1] py-16 px-6">
        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Quote Card */}
          <div
            className="lg:col-span-5 rounded-2xl p-8 relative"
            style={{ background: "#f4ede4" }}
          >
            <span
              className="material-symbols-outlined absolute top-4 left-4 text-[#434b01]/15"
              style={{ fontSize: "56px" }}
            >
              format_quote
            </span>
            <div className="relative pt-6">
              <p
                className="mb-6"
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontStyle: "italic",
                  fontSize: "15px",
                  color: "#1A1A1A",
                  lineHeight: 1.7,
                }}
              >
                "I formulated this {product.name.toLowerCase()} to bridge the
                gap between clinical efficacy and the soul-soothing rituals of
                our heritage. We use nature's finest to deliver beautiful,
                reliable results."
              </p>
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-full overflow-hidden border border-[#c8c7b5]">
                  <img
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuAxoy7RodN7XBiMu155S73O0Vno3hJCIUtJKnjIQWSFhlx2WFvOhtE198Ab23JzqRCZ9GFBqm2fR6NXHtq_1xykdvbd-8UycSwMalfG9-50t8nhy6q3hXftkRQsYMz_9riQNZc3X-tRUzYU0cnKKagC4rXSkPqmWP72E-fjDR2lPrVPwR6023dit2phhmSYDD2F8p38rYlsLgPhT5v7E4AK9V-b5mL0x4BBiot9KuliaKKRFwNuYcri5bEAFlzllSX3fYBUMXjRcK__"
                    alt="Dr. Farheen"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <div
                    style={{
                      fontFamily: "'Playfair Display', serif",
                      fontSize: "14px",
                      fontWeight: 600,
                      color: "#1A1A1A",
                    }}
                  >
                    Dr. Farheen
                  </div>
                  <div
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: "10px",
                      color: "#787868",
                      letterSpacing: "0.08em",
                    }}
                  >
                    Founder & Formulator
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* The Ritual */}
          <div className="lg:col-span-7">
            <h2
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "clamp(22px,3vw,30px)",
                fontWeight: 600,
                color: "#1A1A1A",
                marginBottom: "24px",
                textAlign: "center",
              }}
            >
              The Ritual
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {product.ritual.map((r) => (
                <div
                  key={r.step}
                  className="flex flex-col items-center text-center p-5 rounded-xl hover:-translate-y-1 transition-transform duration-300"
                  style={{ background: "#fff8f1", border: "1px solid #c8c7b5" }}
                >
                  <div
                    className="w-14 h-14 rounded-full flex items-center justify-center mb-3"
                    style={{ background: "#EAE2D1" }}
                  >
                    <span
                      className="material-symbols-outlined text-[#434b01]"
                      style={{ fontSize: "26px" }}
                    >
                      {r.icon}
                    </span>
                  </div>
                  <div
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: "13px",
                      fontWeight: 600,
                      color: "#1A1A1A",
                      marginBottom: "6px",
                    }}
                  >
                    {r.step}
                  </div>
                  <p
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: "11px",
                      color: "#47483a",
                      lineHeight: 1.5,
                    }}
                  >
                    {r.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
