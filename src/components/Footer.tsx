import Link from "next/link";
import type { StoreSettings } from "@/types/settings";

const WHATSAPP_GREETING = encodeURIComponent("Hello! I'd like to learn more about AL-HAYAT products.");

export default function Footer({ settings }: { settings?: StoreSettings | null }) {
  const whatsappNumber = settings?.whatsapp_number || "918796513654";
  const whatsappHref = `https://wa.me/${whatsappNumber}?text=${WHATSAPP_GREETING}`;
  const storeName = settings?.store_name || "AL-HAYAT";
  const storeTagline = settings?.store_tagline || "Premium herbal skincare & haircare by Dr. Farheen. Botanical Wisdom. Clinical Precision.";
  const businessEmail = settings?.business_email || "info@alhayat.in";
  const workingHours = settings?.working_hours || "Mon–Sat: 9 AM – 6 PM";

  const socialProfiles = [
    ...(settings?.instagram_url ? [{ label: "Instagram", href: settings.instagram_url, icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
      </svg>
    ) }] : []),
    ...(settings?.facebook_url ? [{ label: "Facebook", href: settings.facebook_url, icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
      </svg>
    ) }] : []),
    ...(settings?.linkedin_url ? [{ label: "LinkedIn", href: settings.linkedin_url, icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
      </svg>
    ) }] : []),
    ...(settings?.x_url ? [{ label: "X (Twitter)", href: settings.x_url, icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
      </svg>
    ) }] : []),
    ...(settings?.youtube_url ? [{ label: "YouTube", href: settings.youtube_url, icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
      </svg>
    ) }] : []),
    {
      label: "WhatsApp",
      href: whatsappHref,
      icon: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
      ),
    },
  ];

  return (
    <footer style={{ background: "#EAE2D1", borderTop: "1px solid rgba(200,199,181,0.4)" }}>
      {/* Main footer grid */}
      <div className="max-w-5xl mx-auto px-6 pt-14 pb-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
        {/* Brand Column */}
        <div className="sm:col-span-2 md:col-span-1">
          <div
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "28px",
              fontWeight: 700,
              color: "#434b01",
              letterSpacing: "-0.02em",
              marginBottom: "10px",
            }}
          >
            {storeName}
          </div>
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "12px",
              color: "#47483a",
              lineHeight: 1.7,
              marginBottom: "16px",
            }}
          >
            {storeTagline}
          </p>

          {/* Social icons */}
          <div className="flex items-center gap-3 flex-wrap">
            {socialProfiles.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                className="w-8 h-8 flex items-center justify-center rounded-full hover:scale-110 transition-transform"
                style={{ background: "#fff8f1", color: "#434b01" }}
              >
                {s.icon}
              </a>
            ))}
          </div>
        </div>

        {/* Explore Column */}
        <div>
          <h4
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "11px",
              fontWeight: 700,
              color: "#1e1b16",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              marginBottom: "14px",
            }}
          >
            Explore
          </h4>
          {[
            { label: "Home", href: "/" },
            { label: "About Us", href: "/about" },
            { label: "Ingredients", href: "/ingredients" },
            { label: "Products", href: "/products" },
            { label: "Reviews", href: "/reviews" },
            { label: "Contact", href: "/contact" },
          ].map((l) => (
            <Link
              key={l.label}
              href={l.href}
              className="block hover:text-[#b22a2b] transition-colors hover:translate-x-1 duration-200"
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "13px",
                color: "#47483a",
                marginBottom: "9px",
                textDecoration: "none",
                display: "block",
              }}
            >
              {l.label}
            </Link>
          ))}
        </div>

        {/* Information Column */}
        <div>
          <h4
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "11px",
              fontWeight: 700,
              color: "#1e1b16",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              marginBottom: "14px",
            }}
          >
            Information
          </h4>
          {[
            { label: "Privacy Policy", href: "/privacy-policy" },
            { label: "Shipping Policy", href: "/shipping" },
            { label: "Terms & Conditions", href: "/terms" },
            { label: "Returns Policy", href: "/returns" },
            { label: "Sourcing Ethics", href: "#" },
          ].map((l) => (
            <a
              key={l.label}
              href={l.href}
              className="block hover:text-[#b22a2b] transition-colors hover:translate-x-1 duration-200"
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "13px",
                color: "#47483a",
                marginBottom: "9px",
                textDecoration: "none",
                display: "block",
              }}
            >
              {l.label}
            </a>
          ))}
        </div>

        {/* Contact Column */}
        <div>
          <h4
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "11px",
              fontWeight: 700,
              color: "#1e1b16",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              marginBottom: "14px",
            }}
          >
            Contact Us
          </h4>
          <div className="flex flex-col gap-4">
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 hover:text-[#25D366] transition-colors"
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "13px",
                color: "#47483a",
                textDecoration: "none",
              }}
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" style={{ color: "#25D366", flexShrink: 0 }}>
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              WhatsApp Us
            </a>
            <a
              href={`mailto:${businessEmail}`}
              className="flex items-center gap-2 hover:text-[#b22a2b] transition-colors"
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "13px",
                color: "#47483a",
                textDecoration: "none",
              }}
            >
              <span className="material-symbols-outlined" style={{ fontSize: "15px", color: "#b22a2b", flexShrink: 0 }}>
                mail
              </span>
              {businessEmail}
            </a>
            <div
              className="flex items-start gap-2"
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "12px",
                color: "#787868",
                lineHeight: 1.5,
              }}
            >
              <span className="material-symbols-outlined" style={{ fontSize: "15px", color: "#b22a2b", flexShrink: 0, marginTop: "1px" }}>
                schedule
              </span>
              {workingHours}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div
        style={{ borderTop: "1px solid rgba(200,199,181,0.4)" }}
        className="px-6 py-5"
      >
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "11px",
              color: "#787868",
            }}
          >
            © {new Date().getFullYear()} {storeName} by Dr. Farheen. All rights reserved.
          </p>
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "11px",
              color: "#787868",
            }}
          >
            Handcrafted with ♥ from nature&apos;s finest ingredients.
          </p>
        </div>
      </div>
    </footer>
  );
}
