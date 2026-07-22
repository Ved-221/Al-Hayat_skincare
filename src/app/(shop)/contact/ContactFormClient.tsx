"use client";

import React, { useState } from "react";

interface ContactFormClientProps {
  whatsappNumber: string;
}

export default function ContactFormClient({ whatsappNumber }: ContactFormClientProps) {
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="w-full">
      {submitted ? (
        <div
          className="flex flex-col items-center justify-center text-center p-12 rounded-2xl animate-fadeIn"
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
        <form onSubmit={handleSubmit} className="flex flex-col gap-6 w-full">
          {/* Full Name */}
          <div className="flex flex-col w-full">
            <label style={{ fontFamily: "'Inter', sans-serif", fontSize: "11px", fontWeight: 600, color: "#787868", letterSpacing: "0.08em", textTransform: "uppercase", display: "block" }}>
              Full name *
            </label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              placeholder="Your full name"
              className="w-full py-2.5 bg-transparent border-b border-[#c8c7b5]/80 focus:border-[#434b01] outline-none transition-colors text-[15px] font-medium text-[#434b01] placeholder-[#c8c7b5]/60 rounded-none"
              style={{ fontFamily: "'Inter', sans-serif" }}
            />
          </div>

          {/* Grid for Email & Phone */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full">
            {/* Email Address */}
            <div className="flex flex-col">
              <label style={{ fontFamily: "'Inter', sans-serif", fontSize: "11px", fontWeight: 600, color: "#787868", letterSpacing: "0.08em", textTransform: "uppercase", display: "block" }}>
                Email address *
              </label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
                placeholder="your@email.com"
                className="w-full py-2.5 bg-transparent border-b border-[#c8c7b5]/80 focus:border-[#434b01] outline-none transition-colors text-[15px] font-medium text-[#434b01] placeholder-[#c8c7b5]/60 rounded-none"
                style={{ fontFamily: "'Inter', sans-serif" }}
              />
            </div>
            {/* Phone Number */}
            <div className="flex flex-col">
              <label style={{ fontFamily: "'Inter', sans-serif", fontSize: "11px", fontWeight: 600, color: "#787868", letterSpacing: "0.08em", textTransform: "uppercase", display: "block" }}>
                Phone number
              </label>
              <input
                type="tel"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                placeholder="+91 XXXXX XXXXX"
                className="w-full py-2.5 bg-transparent border-b border-[#c8c7b5]/80 focus:border-[#434b01] outline-none transition-colors text-[15px] font-medium text-[#434b01] placeholder-[#c8c7b5]/60 rounded-none"
                style={{ fontFamily: "'Inter', sans-serif" }}
              />
            </div>
          </div>

          {/* Messages */}
          <div className="flex flex-col w-full">
            <label style={{ fontFamily: "'Inter', sans-serif", fontSize: "11px", fontWeight: 600, color: "#787868", letterSpacing: "0.08em", textTransform: "uppercase", display: "block" }}>
              Messages *
            </label>
            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              required
              rows={4}
              placeholder="Tell us how we can help you..."
              className="w-full py-2.5 bg-transparent border-b border-[#c8c7b5]/80 focus:border-[#434b01] outline-none transition-colors text-[15px] font-medium text-[#434b01] placeholder-[#c8c7b5]/60 rounded-none resize-none"
              style={{ fontFamily: "'Inter', sans-serif" }}
            />
          </div>

          {/* Submit Button (Pill-shaped, left aligned) */}
          <button
            type="submit"
            className="px-10 py-3.5 rounded-full text-white hover:opacity-95 transition-opacity shadow-sm hover:shadow-md w-fit cursor-pointer border-none"
            style={{
              background: "#434b01",
              fontFamily: "'Inter', sans-serif",
              fontSize: "13px",
              fontWeight: 700,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
            }}
          >
            Submit
          </button>
        </form>
      )}

      {/* Quick WhatsApp CTA */}
      <div className="mt-8 pt-6 border-t border-[#c8c7b5]/30">
        <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "13px", color: "#787868", marginBottom: "12px" }}>
          Prefer instant support?
        </p>
        <a
          href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent("Hello! I'd like to get in touch with AL-HAYAT.")}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-white hover:scale-105 transition-all duration-300 shadow-md"
          style={{
            background: "#25D366",
            fontFamily: "'Inter', sans-serif",
            fontSize: "13px",
            fontWeight: 600,
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
  );
}
