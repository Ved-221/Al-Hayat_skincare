import React from "react";
import Link from "next/link";

export const metadata = {
  title: "Sourcing Ethics & Botanical Integrity | AL-HAYAT",
  description: "Discover AL-HAYAT's commitment to organic farm sourcing, zero synthetics, and small-batch production.",
};

export default function SourcingEthicsPage() {
  return (
    <main className="min-h-screen pt-[80px] pb-20" style={{ background: "#fff8f1" }}>
      {/* Header Banner */}
      <section className="py-16 px-6 text-center" style={{ background: "#EAE2D1" }}>
        <div className="max-w-3xl mx-auto">
          <span
            style={{
              fontFamily: "'Dancing Script', cursive",
              fontSize: "24px",
              color: "#b22a2b",
              display: "block",
              marginBottom: "8px",
            }}
          >
            Pure Botanicals
          </span>
          <h1
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(30px, 4.5vw, 48px)",
              fontWeight: 700,
              color: "#434b01",
              marginBottom: "12px",
            }}
          >
            Sourcing Ethics & Standards
          </h1>
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "15px",
              color: "#47483a",
              maxWidth: "540px",
              margin: "0 auto",
              lineHeight: 1.7,
            }}
          >
            Rooted in nature. Formulated with integrity. Crafted to restore skin and hair health naturally.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="max-w-4xl mx-auto px-6 py-12">
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-[#c8c7b5]/30 shadow-xs space-y-10">
          
          {/* Pillar Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-[#faf3ea] border border-[#c8c7b5]/30">
              <span className="text-3xl mb-3 block">🌿</span>
              <h3
                style={{ fontFamily: "'Playfair Display', serif", fontSize: "18px", fontWeight: 600, color: "#434b01" }}
                className="mb-2"
              >
                Direct Farm Partnerships
              </h3>
              <p className="text-xs text-[#47483a] lineHeight-[1.6]">
                We source our herbs, cold-pressed oils, and floral extracts directly from ethical organic farmers who practice sustainable cultivation without chemical pesticides.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#faf3ea] border border-[#c8c7b5]/30">
              <span className="text-3xl mb-3 block">🧪</span>
              <h3
                style={{ fontFamily: "'Playfair Display', serif", fontSize: "18px", fontWeight: 600, color: "#434b01" }}
                className="mb-2"
              >
                100% Free From Synthetics
              </h3>
              <p className="text-xs text-[#47483a] lineHeight-[1.6]">
                Zero sulphates, zero parabens, zero mineral oils, and zero artificial dyes. Every ingredient serves a direct therapeutic purpose for your skin.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#faf3ea] border border-[#c8c7b5]/30">
              <span className="text-3xl mb-3 block">🐰</span>
              <h3
                style={{ fontFamily: "'Playfair Display', serif", fontSize: "18px", fontWeight: 600, color: "#434b01" }}
                className="mb-2"
              >
                Cruelty-Free Commitment
              </h3>
              <p className="text-xs text-[#47483a] lineHeight-[1.6]">
                We never test on animals. All products undergo clinical dermatological evaluations and real human volunteer testing under medical supervision.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#faf3ea] border border-[#c8c7b5]/30">
              <span className="text-3xl mb-3 block">🏺</span>
              <h3
                style={{ fontFamily: "'Playfair Display', serif", fontSize: "18px", fontWeight: 600, color: "#434b01" }}
                className="mb-2"
              >
                Artisanal Small Batches
              </h3>
              <p className="text-xs text-[#47483a] lineHeight-[1.6]">
                By handcrafting in limited quantities, we ensure maximum potency of active botanical vitamins, antioxidants, and phytonutrients in every bottle.
              </p>
            </div>
          </div>

          <hr className="border-[#c8c7b5]/20" />

          {/* Detailed Narrative */}
          <div className="space-y-4">
            <h2
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "24px",
                fontWeight: 600,
                color: "#434b01",
              }}
            >
              The AL-HAYAT Purity Promise
            </h2>
            <p
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "14px",
                color: "#47483a",
                lineHeight: 1.8,
              }}
            >
              Dr. Farheen established AL-HAYAT on a foundational promise: skincare should nourish, heal, and honor the body. From hand-picked Indian neem, damask rose, and hibiscus to cold-pressed virgin coconut and organic rice water extracts — every single raw ingredient undergoes stringent purity checks before formulation.
            </p>
            <p
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "14px",
                color: "#47483a",
                lineHeight: 1.8,
              }}
            >
              We believe in full ingredient transparency. You will never find hidden fillers, synthetic preservatives, or artificial masking fragrances in AL-HAYAT products.
            </p>
          </div>

          <div className="pt-4 text-center">
            <Link
              href="/ingredients"
              className="inline-flex items-center justify-center px-8 py-3 rounded-full text-white transition-all hover:bg-[#343a01]"
              style={{ background: "#434b01", fontFamily: "'Inter', sans-serif", fontSize: "13px", fontWeight: 600, letterSpacing: "0.06em" }}
            >
              EXPLORE INGREDIENT LIBRARY →
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
