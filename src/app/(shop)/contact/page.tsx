"use client";

import { useState } from "react";
import Footer from "@/components/Footer";

const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "918796513654";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In Phase 2, this will submit to Supabase
    setSubmitted(true);
  };

  const inputStyle: React.CSSProperties = {
    width: "100%",
    padding: "12px 16px",
    borderRadius: "10px",
    border: "1.5px solid rgba(200,199,181,0.6)",
    background: "#fff8f1",
    fontFamily: "'Inter', sans-serif",
    fontSize: "14px",
    color: "#434b01",
    outline: "none",
  };

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
                href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Hello! I'd like to get in touch with AL-HAYAT.")}`}
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
                    +91 87965 13654
                  </p>
                  <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "12px", color: "#47483a" }}>
                    Mon–Sat, 9 AM – 6 PM
                  </p>
                </div>
              </a>

              {/* Email */}
              <a
                href="mailto:info@alhayat.in"
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
                    info@alhayat.in
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
                    +91 87965 13654
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
                  {[
                    { day: "Monday – Friday", time: "9:00 AM – 6:00 PM" },
                    { day: "Saturday", time: "10:00 AM – 4:00 PM" },
                    { day: "Sunday", time: "Closed" },
                  ].map((h) => (
                    <div key={h.day} className="flex justify-between">
                      <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "13px", color: "#47483a" }}>{h.day}</span>
                      <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "13px", fontWeight: 600, color: "#434b01" }}>{h.time}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "28px", fontWeight: 600, color: "#434b01", marginBottom: "24px" }}>
              Send a Message
            </h2>

            {submitted ? (
              <div
                className="flex flex-col items-center justify-center text-center p-12 rounded-2xl"
                style={{ background: "#EAE2D1", minHeight: "320px" }}
              >
                <div className="text-5xl mb-4">🌿</div>
                <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: "22px", fontWeight: 600, color: "#434b01", marginBottom: "10px" }}>
                  Message Received!
                </h3>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "14px", color: "#47483a", lineHeight: 1.7 }}>
                  Thank you for reaching out. We&apos;ll get back to you within 24 hours. For faster response, message us on WhatsApp.
                </p>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="flex flex-col gap-4"
              >
                <div>
                  <label style={{ fontFamily: "'Inter', sans-serif", fontSize: "11px", fontWeight: 600, color: "#787868", letterSpacing: "0.08em", textTransform: "uppercase", display: "block", marginBottom: "6px" }}>
                    Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    required
                    placeholder="Your full name"
                    style={inputStyle}
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label style={{ fontFamily: "'Inter', sans-serif", fontSize: "11px", fontWeight: 600, color: "#787868", letterSpacing: "0.08em", textTransform: "uppercase", display: "block", marginBottom: "6px" }}>
                      Email *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      required
                      placeholder="your@email.com"
                      style={inputStyle}
                    />
                  </div>
                  <div>
                    <label style={{ fontFamily: "'Inter', sans-serif", fontSize: "11px", fontWeight: 600, color: "#787868", letterSpacing: "0.08em", textTransform: "uppercase", display: "block", marginBottom: "6px" }}>
                      Phone
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      placeholder="+91 XXXXX XXXXX"
                      style={inputStyle}
                    />
                  </div>
                </div>

                <div>
                  <label style={{ fontFamily: "'Inter', sans-serif", fontSize: "11px", fontWeight: 600, color: "#787868", letterSpacing: "0.08em", textTransform: "uppercase", display: "block", marginBottom: "6px" }}>
                    Message *
                  </label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    placeholder="Tell us how we can help you..."
                    style={{ ...inputStyle, resize: "vertical" }}
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-4 rounded-xl text-white hover:opacity-90 transition-opacity"
                  style={{
                    background: "#434b01",
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "13px",
                    fontWeight: 700,
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    border: "none",
                    cursor: "pointer",
                    marginTop: "4px",
                  }}
                >
                  Send Message
                </button>
              </form>
            )}

            {/* Quick WhatsApp CTA */}
            <div className="mt-6 text-center">
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "13px", color: "#787868", marginBottom: "10px" }}>
                Prefer instant support?
              </p>
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Hello! I'd like to get in touch with AL-HAYAT.")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-white hover:scale-105 transition-all duration-300"
                style={{
                  background: "#25D366",
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "13px",
                  fontWeight: 600,
                  boxShadow: "0 4px 16px rgba(37,211,102,0.35)",
                  textDecoration: "none",
                }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                Chat on WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
