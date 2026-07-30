import React from "react";
import { getStoreSettings } from "@/services/settingsService";
import ContactFormClient from "./ContactFormClient";

export async function generateMetadata() {
  const settings = await getStoreSettings();
  return {
    title: `Contact Us | ${settings.store_name}`,
    description: `Get in touch with ${settings.store_name} — ${settings.store_tagline}`,
  };
}

export default async function ContactPage() {
  const settings = await getStoreSettings();

  const waLink = `https://wa.me/${settings.whatsapp_number}?text=${encodeURIComponent(
    `Hello! I'd like to get in touch with ${settings.store_name}.`
  )}`;

  return (
    <main className="min-h-screen pt-[72px]" style={{ background: "#fff8f1" }}>
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          {/* Main Title - Inspired by clean minimalist typography */}
          <h1
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(48px, 8vw, 84px)",
              fontWeight: 700,
              color: "#434b01",
              marginBottom: "40px",
              lineHeight: 1.1,
            }}
            className="tracking-tight"
          >
            Contact
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-start mt-4">
            {/* Left Column: Form */}
            <div className="md:col-span-7">
              <ContactFormClient whatsappNumber={settings.whatsapp_number} />
            </div>

            {/* Right Column: Inspiration-Style Contact Details Card */}
            <div className="md:col-span-5 flex justify-center md:justify-end w-full">
              <div
                className="w-full max-w-[380px] rounded-[24px] overflow-hidden bg-white flex flex-col"
                style={{
                  boxShadow: "0 10px 40px rgba(0,0,0,0.06)",
                  border: "1px solid rgba(200,199,181,0.3)",
                }}
              >
                {/* Dark Header Block */}
                <div style={{ background: "#434b01" }} className="py-8 px-6 text-center">
                  <h3
                    style={{
                      fontFamily: "'Playfair Display', serif",
                      fontSize: "20px",
                      fontWeight: 600,
                      color: "#fff8f1",
                      marginBottom: "4px",
                    }}
                  >
                    Get in touch with us!
                  </h3>
                  <p
                    style={{
                      fontFamily: "'Dancing Script', cursive",
                      fontSize: "18px",
                      color: "#EAE2D1",
                    }}
                  >
                    Let&apos;s talk!
                  </p>
                </div>

                {/* Card Body */}
                <div className="p-7 flex flex-col gap-6 bg-white">
                  {/* Email */}
                  <a
                    href={`mailto:${settings.business_email}`}
                    className="flex items-center gap-4 text-decoration-none hover:opacity-85 transition-opacity"
                  >
                    <div className="w-10 h-10 rounded-full flex items-center justify-center bg-[#434b01] text-white flex-shrink-0">
                      <span className="material-symbols-outlined" style={{ fontSize: "18px" }}>
                        mail
                      </span>
                    </div>
                    <span
                      style={{
                        fontFamily: "'Inter', sans-serif",
                        fontSize: "14px",
                        fontWeight: 500,
                        color: "#47483a",
                      }}
                      className="break-all"
                    >
                      {settings.business_email}
                    </span>
                  </a>

                  {/* Phone / WhatsApp */}
                  <a
                    href={waLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 text-decoration-none hover:opacity-85 transition-opacity"
                  >
                    <div className="w-10 h-10 rounded-full flex items-center justify-center bg-[#434b01] text-white flex-shrink-0">
                      <span className="material-symbols-outlined" style={{ fontSize: "18px" }}>
                        call
                      </span>
                    </div>
                    <span
                      style={{
                        fontFamily: "'Inter', sans-serif",
                        fontSize: "14px",
                        fontWeight: 500,
                        color: "#47483a",
                      }}
                    >
                      {settings.phone_number}
                    </span>
                  </a>

                  {/* Business Address */}
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center bg-[#434b01] text-white flex-shrink-0">
                      <span className="material-symbols-outlined" style={{ fontSize: "18px" }}>
                        location_on
                      </span>
                    </div>
                    <span
                      style={{
                        fontFamily: "'Inter', sans-serif",
                        fontSize: "14px",
                        fontWeight: 500,
                        color: "#47483a",
                      }}
                    >
                      {settings.business_address}
                    </span>
                  </div>

                  {/* Social Handle */}
                  {settings.instagram_url && (
                    <a
                      href={settings.instagram_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-4 text-decoration-none hover:opacity-85 transition-opacity"
                    >
                      <div className="w-10 h-10 rounded-full flex items-center justify-center bg-[#434b01] text-white flex-shrink-0">
                        <span className="material-symbols-outlined" style={{ fontSize: "18px" }}>
                          share
                        </span>
                      </div>
                      <span
                        style={{
                          fontFamily: "'Inter', sans-serif",
                          fontSize: "14px",
                          fontWeight: 500,
                          color: "#47483a",
                        }}
                      >
                        @al_hayat_skincare
                      </span>
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
