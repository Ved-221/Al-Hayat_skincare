import React from "react";
import Link from "next/link";

export const metadata = {
  title: "Terms & Conditions | AL-HAYAT Botanical Skincare",
  description: "Read the official terms and conditions governing the use of AL-HAYAT products and website.",
};

export default function TermsPage() {
  return (
    <main className="min-h-screen pt-[80px] pb-20" style={{ background: "#fff8f1" }}>
      {/* Header Banner */}
      <section className="py-14 px-6 text-center" style={{ background: "#EAE2D1" }}>
        <div className="max-w-3xl mx-auto">
          <span
            style={{
              fontFamily: "'Dancing Script', cursive",
              fontSize: "22px",
              color: "#b22a2b",
              display: "block",
              marginBottom: "8px",
            }}
          >
            Guidelines & Policies
          </span>
          <h1
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(30px, 4vw, 44px)",
              fontWeight: 700,
              color: "#434b01",
              marginBottom: "12px",
            }}
          >
            Terms & Conditions
          </h1>
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "14px",
              color: "#47483a",
            }}
          >
            Last Updated: July 2026
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="max-w-4xl mx-auto px-6 py-12">
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-[#c8c7b5]/30 shadow-xs space-y-8">
          <div>
            <p
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "15px",
                color: "#47483a",
                lineHeight: 1.8,
              }}
            >
              Welcome to <strong>AL-HAYAT by Dr. Farheen</strong>. By accessing our website, purchasing products, or communicating with us via WhatsApp, you agree to be bound by the following Terms and Conditions. Please review them carefully before placing an order.
            </p>
          </div>

          <hr className="border-[#c8c7b5]/20" />

          {/* Section 1 */}
          <div className="space-y-3">
            <h2
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "22px",
                fontWeight: 600,
                color: "#434b01",
              }}
            >
              1. Botanical Product Formulations & Disclaimer
            </h2>
            <p
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "14px",
                color: "#47483a",
                lineHeight: 1.7,
              }}
            >
              All AL-HAYAT products are handcrafted with 100% natural herbs, essential oils, and botanical extracts. Because natural ingredients vary slightly across seasonal harvests, slight variations in color, aroma, or texture may occur between batches. These natural variations do not affect product efficacy or quality.
            </p>
            <p
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "14px",
                color: "#47483a",
                lineHeight: 1.7,
              }}
            >
              <strong>Skin Patch Test Advice:</strong> Although our formulations are non-toxic and sulphate/paraben-free, individual natural allergies can still occur. We recommend performing a small 24-hour patch test inside your elbow before full application.
            </p>
          </div>

          {/* Section 2 */}
          <div className="space-y-3">
            <h2
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "22px",
                fontWeight: 600,
                color: "#434b01",
              }}
            >
              2. Pricing & Orders
            </h2>
            <p
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "14px",
                color: "#47483a",
                lineHeight: 1.7,
              }}
            >
              All product prices are listed in Indian Rupees (INR) and are inclusive of applicable taxes. We reserve the right to modify prices or discontinue items without prior notice. An order is deemed accepted only after order confirmation is issued via website or WhatsApp.
            </p>
          </div>

          {/* Section 3 */}
          <div className="space-y-3">
            <h2
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "22px",
                fontWeight: 600,
                color: "#434b01",
              }}
            >
              3. Intellectual Property
            </h2>
            <p
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "14px",
                color: "#47483a",
                lineHeight: 1.7,
              }}
            >
              All content on this website — including product names, logos, branding, graphics, product photography, and text formulations — is the exclusive property of AL-HAYAT by Dr. Farheen. Unauthorized reproduction or commercial use is strictly prohibited.
            </p>
          </div>

          {/* Section 4 */}
          <div className="space-y-3">
            <h2
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "22px",
                fontWeight: 600,
                color: "#434b01",
              }}
            >
              4. Governing Law
            </h2>
            <p
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "14px",
                color: "#47483a",
                lineHeight: 1.7,
              }}
            >
              These Terms & Conditions shall be governed by and construed in accordance with the laws of India. Any legal disputes arising in connection with our services shall be subject to the exclusive jurisdiction of the competent courts in India.
            </p>
          </div>

          <div className="pt-4 text-center">
            <Link
              href="/"
              className="inline-flex items-center justify-center px-6 py-2.5 rounded-full text-white transition-all hover:bg-[#343a01]"
              style={{ background: "#434b01", fontFamily: "'Inter', sans-serif", fontSize: "13px", fontWeight: 600 }}
            >
              ← Return to Home
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
