import React from "react";
import Link from "next/link";

export const metadata = {
  title: "Returns & Refund Policy | AL-HAYAT",
  description: "Understand AL-HAYAT's hassle-free return, replacement, and refund policies.",
};

export default function ReturnsPolicyPage() {
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
            Customer Satisfaction First
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
            Returns & Refund Policy
          </h1>
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "14px",
              color: "#47483a",
            }}
          >
            We stand behind the purity and quality of every botanical batch.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="max-w-4xl mx-auto px-6 py-12">
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-[#c8c7b5]/30 shadow-xs space-y-8">
          
          {/* Policy Highlights */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-5 rounded-2xl bg-[#faf3ea] border border-[#c8c7b5]/20 flex items-start gap-4">
              <span className="material-symbols-outlined text-3xl text-[#b22a2b]">published_with_changes</span>
              <div>
                <h3 className="font-bold text-sm text-[#434b01]">7-Day Return Window</h3>
                <p className="text-xs text-[#47483a] mt-1">Eligible for unopened products in original condition within 7 days of delivery.</p>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-[#faf3ea] border border-[#c8c7b5]/20 flex items-start gap-4">
              <span className="material-symbols-outlined text-3xl text-[#b22a2b]">verified</span>
              <div>
                <h3 className="font-bold text-sm text-[#434b01]">Immediate Damage Replacement</h3>
                <p className="text-xs text-[#47483a] mt-1">Free instant replacement if products arrive damaged or leaked.</p>
              </div>
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
              1. Return Eligibility
            </h2>
            <p
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "14px",
                color: "#47483a",
                lineHeight: 1.7,
              }}
            >
              To be eligible for a return or exchange:
            </p>
            <ul className="list-disc list-inside space-y-1 text-sm text-[#47483a] pl-2">
              <li>The item must be unused, unopened, and in its original seal and packaging.</li>
              <li>The return request must be initiated within 7 calendar days of receipt.</li>
              <li>Proof of purchase (order confirmation or receipt) must be presented.</li>
            </ul>
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
              2. Non-Returnable Items
            </h2>
            <p
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "14px",
                color: "#47483a",
                lineHeight: 1.7,
              }}
            >
              For hygiene and health safety reasons, we cannot accept returns for items that have been opened, unsealed, or used. Customized formulation batches or promotional gift packs are also non-returnable unless defective.
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
              3. Damaged / Incorrect Product Received
            </h2>
            <p
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "14px",
                color: "#47483a",
                lineHeight: 1.7,
              }}
            >
              If you receive a defective, damaged, or wrong item, please notify us within 48 hours of delivery:
            </p>
            <ol className="list-decimal list-inside space-y-1 text-sm text-[#47483a] pl-2">
              <li>Take clear photos or a short video of the package and item condition.</li>
              <li>Send the media to our support WhatsApp line at <a href="https://wa.me/918796513654" target="_blank" rel="noopener noreferrer" className="text-[#b22a2b] font-semibold underline">+91 87965 13654</a>.</li>
              <li>Our team will arrange a free reverse pickup and immediately dispatch a brand-new replacement.</li>
            </ol>
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
              4. Refund Process
            </h2>
            <p
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "14px",
                color: "#47483a",
                lineHeight: 1.7,
              }}
            >
              Once your returned item is received and inspected by our quality assurance team, we will notify you of the approval or rejection of your refund. If approved, your refund will be processed to your original payment method (or via UPI for COD orders) within <strong>5 to 7 business days</strong>.
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
