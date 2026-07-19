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

  return (
    <main className="min-h-screen pt-[72px]" style={{ background: "#fff8f1" }}>
      {/* Hero */}
      <section
        className="relative flex items-center justify-center py-16 px-6"
        style={{ background: "#EAE2D1", minHeight: "260px" }}
      >
        <div className="text-center max-w-xl mx-auto">
          <span
            style={{ fontFamily: "'Dancing Script', cursive", fontSize: "22px", color: "#b22a2b", display: "block", marginBottom: "10px" }}
          >
            We&apos;re Here For You
          </span>
          <h1
            style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(30px,5vw,52px)", fontWeight: 700, color: "#434b01", lineHeight: 1.2 }}
          >
            Contact Us
          </h1>
        </div>
        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none">
          <svg viewBox="0 0 1200 60" preserveAspectRatio="none" className="w-full" style={{ height: "60px", display: "block" }}>
            <path d="M0,30 C200,60 400,0 600,30 C800,60 1000,0 1200,30 L1200,60 L0,60 Z" fill="#fff8f1" />
          </svg>
        </div>
      </section>

      <section className="py-16 px-6">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "28px", fontWeight: 600, color: "#434b01", marginBottom: "24px" }}>
              Get in Touch
            </h2>

            <div className="flex flex-col gap-6">
              {/* WhatsApp */}
              <a
                href={`https://wa.me/${settings.whatsapp_number}?text=${encodeURIComponent(`Hello! I'd like to get in touch with ${settings.store_name}.`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-4 p-5 rounded-2xl hover:-translate-y-0.5 transition-transform duration-200"
                style={{ background: "#EAE2D1", textDecoration: "none" }}
              >
                <div
                  className="w-11 h-11 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ background: "#25D366" }}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                </div>
                <div>
                  <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "11px", fontWeight: 700, color: "#787868", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "3px" }}>
                    WhatsApp (Fastest Response)
                  </p>
                  <p style={{ fontFamily: "'Playfair Display', serif", fontSize: "17px", fontWeight: 600, color: "#434b01" }}>
                    {settings.phone_number}
                  </p>
                  <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "12px", color: "#47483a" }}>
                    {settings.working_hours}
                  </p>
                </div>
              </a>

              {/* Email */}
              <a
                href={`mailto:${settings.business_email}`}
                className="flex items-start gap-4 p-5 rounded-2xl hover:-translate-y-0.5 transition-transform duration-200"
                style={{ background: "#EAE2D1", textDecoration: "none" }}
              >
                <div
                  className="w-11 h-11 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ background: "#b22a2b" }}
                >
                  <span className="material-symbols-outlined text-white" style={{ fontSize: "20px", fontVariationSettings: "'FILL' 0" }}>mail</span>
                </div>
                <div>
                  <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "11px", fontWeight: 700, color: "#787868", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "3px" }}>
                    Email
                  </p>
                  <p style={{ fontFamily: "'Playfair Display', serif", fontSize: "17px", fontWeight: 600, color: "#434b01" }}>
                    {settings.business_email}
                  </p>
                </div>
              </a>

              {/* Phone */}
              <div
                className="flex items-start gap-4 p-5 rounded-2xl"
                style={{ background: "#EAE2D1" }}
              >
                <div
                  className="w-11 h-11 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ background: "#434b01" }}
                >
                  <span className="material-symbols-outlined text-white" style={{ fontSize: "20px", fontVariationSettings: "'FILL' 0" }}>call</span>
                </div>
                <div>
                  <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "11px", fontWeight: 700, color: "#787868", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "3px" }}>
                    Phone
                  </p>
                  <p style={{ fontFamily: "'Playfair Display', serif", fontSize: "17px", fontWeight: 600, color: "#434b01" }}>
                    {settings.phone_number}
                  </p>
                </div>
              </div>

              {/* Business Address */}
              <div
                className="flex items-start gap-4 p-5 rounded-2xl"
                style={{ background: "#EAE2D1" }}
              >
                <div
                  className="w-11 h-11 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ background: "#434b01" }}
                >
                  <span className="material-symbols-outlined text-white" style={{ fontSize: "20px", fontVariationSettings: "'FILL' 0" }}>location_on</span>
                </div>
                <div>
                  <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "11px", fontWeight: 700, color: "#787868", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "3px" }}>
                    Address
                  </p>
                  <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "14px", fontWeight: 500, color: "#434b01", lineHeight: 1.5 }}>
                    {settings.business_address}
                  </p>
                </div>
              </div>

              {/* Business Hours */}
              <div
                className="p-5 rounded-2xl"
                style={{ background: "#EAE2D1" }}
              >
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "11px", fontWeight: 700, color: "#787868", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "10px" }}>
                  Business Hours
                </p>
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined" style={{ fontSize: "16px", color: "#b22a2b" }}>schedule</span>
                    <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "14px", fontWeight: 600, color: "#434b01" }}>
                      {settings.working_hours}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form Client Component */}
          <ContactFormClient whatsappNumber={settings.whatsapp_number} />
        </div>
      </section>
    </main>
  );
}
