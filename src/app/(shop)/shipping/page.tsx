import React from "react";
import Link from "next/link";

export const metadata = {
  title: "Shipping & Delivery Policy | AL-HAYAT",
  description: "Read AL-HAYAT's shipping timelines, delivery charges, and small-batch dispatch process.",
};

export default function ShippingPolicyPage() {
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
            Fresh & Safe Delivery
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
            Shipping & Delivery Policy
          </h1>
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "14px",
              color: "#47483a",
            }}
          >
            Every product is freshly prepared in small batches before dispatch.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="max-w-4xl mx-auto px-6 py-12">
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-[#c8c7b5]/30 shadow-xs space-y-8">
          
          {/* Key Highlights Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-2xl bg-[#faf3ea] text-center border border-[#c8c7b5]/20">
              <span className="material-symbols-outlined text-2xl text-[#b22a2b] mb-1">local_shipping</span>
              <h3 className="font-bold text-xs uppercase tracking-wider text-[#434b01]">Pan-India Shipping</h3>
              <p className="text-xs text-[#47483a] mt-1">Delivered to 18,000+ pincodes nationwide.</p>
            </div>
            <div className="p-4 rounded-2xl bg-[#faf3ea] text-center border border-[#c8c7b5]/20">
              <span className="material-symbols-outlined text-2xl text-[#b22a2b] mb-1">timer</span>
              <h3 className="font-bold text-xs uppercase tracking-wider text-[#434b01]">3–7 Business Days</h3>
              <p className="text-xs text-[#47483a] mt-1">Standard domestic delivery timeline.</p>
            </div>
            <div className="p-4 rounded-2xl bg-[#faf3ea] text-center border border-[#c8c7b5]/20">
              <span className="material-symbols-outlined text-2xl text-[#b22a2b] mb-1">payments</span>
              <h3 className="font-bold text-xs uppercase tracking-wider text-[#434b01]">Cash on Delivery</h3>
              <p className="text-xs text-[#47483a] mt-1">Available across most major locations.</p>
            </div>
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
              1. Order Processing Time
            </h2>
            <p
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "14px",
                color: "#47483a",
                lineHeight: 1.7,
              }}
            >
              Because AL-HAYAT formulations are handcrafted in small artisanal batches to maintain maximum botanical freshness and potency, orders are typically processed and packed within <strong>24 to 48 hours</strong> of order confirmation. Orders placed on Sundays or public holidays will be processed on the next business day.
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
              2. Shipping Charges
            </h2>
            <p
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "14px",
                color: "#47483a",
                lineHeight: 1.7,
              }}
            >
              Standard shipping charges are calculated at checkout based on order location. We offer <strong>FREE Shipping</strong> on all prepaid orders above ₹999 across India.
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
              3. Order Tracking & WhatsApp Notifications
            </h2>
            <p
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "14px",
                color: "#47483a",
                lineHeight: 1.7,
              }}
            >
              Once your package is handed over to our courier partner, you will receive a tracking link via WhatsApp and SMS. You can use this tracking link to monitor the real-time movement of your shipment.
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
              4. Damaged or Non-Delivered Shipments
            </h2>
            <p
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "14px",
                color: "#47483a",
                lineHeight: 1.7,
              }}
            >
              If your package arrives visibly damaged or tampered with, please take photos or a short video before opening it and contact our support team immediately on WhatsApp at <a href="https://wa.me/918796513654" target="_blank" rel="noopener noreferrer" className="text-[#b22a2b] font-semibold underline">+91 87965 13654</a>. We will dispatch a fresh replacement immediately.
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
