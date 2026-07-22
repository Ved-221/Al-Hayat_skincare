import React from "react";
import Link from "next/link";

export const metadata = {
  title: "Privacy Policy | AL-HAYAT Botanical Skincare",
  description: "Learn how AL-HAYAT collects, uses, and protects your personal information.",
};

export default function PrivacyPolicyPage() {
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
            Transparency & Trust
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
            Privacy Policy
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
              At <strong>AL-HAYAT by Dr. Farheen</strong>, we respect your privacy and are committed to protecting the personal information you share with us. This Privacy Policy explains how we collect, use, disclose, and safeguard your data when you visit our website or interact with us via WhatsApp and our customer service channels.
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
              1. Information We Collect
            </h2>
            <p
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "14px",
                color: "#47483a",
                lineHeight: 1.7,
              }}
            >
              We collect information that you voluntarily provide to us when you place an order, inquire on WhatsApp, sign up for updates, or contact our customer support. This includes:
            </p>
            <ul className="list-disc list-inside space-y-1 text-sm text-[#47483a] pl-2">
              <li>Contact details: Name, email address, phone number, and delivery address.</li>
              <li>Order details: Products ordered, transaction preferences, and delivery status.</li>
              <li>Communication records: Correspondence via WhatsApp, email, or contact forms.</li>
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
              2. How We Use Your Information
            </h2>
            <p
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "14px",
                color: "#47483a",
                lineHeight: 1.7,
              }}
            >
              Your personal data is used solely to provide you with an exceptional skincare experience. We use your data to:
            </p>
            <ul className="list-disc list-inside space-y-1 text-sm text-[#47483a] pl-2">
              <li>Process and fulfill your orders, including delivery updates via WhatsApp and SMS.</li>
              <li>Provide personalized consultations and customer assistance.</li>
              <li>Improve our botanical product offerings and website features.</li>
              <li>Comply with applicable legal and financial obligations.</li>
            </ul>
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
              3. Data Security & Protection
            </h2>
            <p
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "14px",
                color: "#47483a",
                lineHeight: 1.7,
              }}
            >
              We enforce strict organizational and technical security measures to protect your personal information. We do not sell, rent, or trade your personal information to any third party for marketing purposes.
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
              4. Third-Party Logistics & Payments
            </h2>
            <p
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "14px",
                color: "#47483a",
                lineHeight: 1.7,
              }}
            >
              To complete your delivery, we share your necessary shipping details (name, phone number, address) with our verified courier partners (e.g. Delhivery, BlueDart, India Post). Online payment transactions are securely processed by authorized payment gateways compliant with PCI-DSS standards.
            </p>
          </div>

          {/* Section 5 */}
          <div className="space-y-3">
            <h2
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "22px",
                fontWeight: 600,
                color: "#434b01",
              }}
            >
              5. Your Rights & Contact Us
            </h2>
            <p
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "14px",
                color: "#47483a",
                lineHeight: 1.7,
              }}
            >
              You have the right to access, update, or request the deletion of your personal data at any time. For any privacy-related queries or requests, please reach out to us at:
            </p>
            <div className="p-4 rounded-2xl bg-[#EAE2D1]/40 border border-[#c8c7b5]/30 text-sm text-[#434b01]">
              <p className="font-semibold">AL-HAYAT Care Team</p>
              <p>Email: <a href="mailto:alhayat.care26@gmail.com" className="text-[#b22a2b] underline">alhayat.care26@gmail.com</a></p>
              <p>WhatsApp Support: <a href="https://wa.me/918796513654" target="_blank" rel="noopener noreferrer" className="text-[#b22a2b] underline">+91 87965 13654</a></p>
            </div>
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
