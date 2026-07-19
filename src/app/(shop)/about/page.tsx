import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us | AL-HAYAT by Dr. Farheen",
  description: "Learn about AL-HAYAT's founder Dr. Farheen, our heritage, philosophy and commitment to herbal skincare craftsmanship.",
};

const WHATSAPP_NUMBER = "919876543210";
const waLink = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Hello! I'd like to know more about AL-HAYAT products.")}`;

const labelStyle: React.CSSProperties = {
  fontFamily: "'Inter', sans-serif",
  fontSize: "10px",
  fontWeight: 600,
  letterSpacing: "0.12em",
  textTransform: "uppercase",
};

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#fff8f1] pt-[72px]">

      {/* ═══ HERO ═══ */}
      <section
        className="relative w-full flex items-center justify-center overflow-hidden"
        style={{ minHeight: "560px", background: "#EAE2D1" }}
      >
        <div className="absolute inset-0">
          <img
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuC663Sc3KM_zaIw8CqAE6KJJUKmurCW5lKL6RENlj7i1zaOHZWOwaQ_IFHCwQSGBCIX3RXa099VHx4tFW05po9CkKm_Vnn5QW-3PcCom4zkjtSCX_PS_DTs1pQ1xhzQ23slmSppvyZ7jMAAkC5u-3jYoCflo6Yrac2ZLiWVH8ZU_qEfa554t5h4W7ExszJmplzuFcIkjfRJhukL8zhpag3WSGpdyygkCJMA4PgF1ePHmqeHfrTG-VgmN3uvZkYfNUx1Qq40273S0N2e"
            alt="Botanical background"
            className="w-full h-full object-cover opacity-45 mix-blend-multiply"
          />
        </div>

        <div className="relative z-10 text-center px-6 py-20 max-w-3xl mx-auto flex flex-col items-center">
          <span
            style={{ fontFamily: "'Dancing Script', cursive", fontSize: "22px", color: "#b22a2b", display: "block", marginBottom: "12px" }}
          >
            Botanical Wisdom
          </span>
          <h1
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(34px,6vw,64px)",
              fontWeight: 700,
              color: "#434b01",
              lineHeight: 1.15,
              marginBottom: "16px",
            }}
          >
            The Wisdom of Nature,<br />The Precision of Science
          </h1>
          <p
            style={{ fontFamily: "'Playfair Display', serif", fontStyle: "italic", fontSize: "16px", color: "#47483a", maxWidth: "500px" }}
          >
            Merging ancestral herbal traditions with modern clinical rigor to create skincare that honors your skin&apos;s natural intelligence.
          </p>
        </div>

        {/* Wave bottom */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none">
          <svg viewBox="0 0 1200 60" preserveAspectRatio="none" className="w-full" style={{ height: "60px", display: "block" }}>
            <path d="M0,30 C200,60 400,0 600,30 C800,60 1000,0 1200,30 L1200,60 L0,60 Z" fill="#fff8f1" />
          </svg>
        </div>
      </section>

      {/* ═══ OUR HERITAGE ═══ */}
      <section className="py-16 px-6 max-w-5xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Arch image */}
          <div
            className="relative overflow-hidden"
            style={{
              borderRadius: "180px 180px 12px 12px",
              aspectRatio: "3/4",
              maxWidth: "360px",
              margin: "0 auto",
              background: "#EAE2D1",
            }}
          >
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDY2BnJHnzCfRJXoWJ2rtCA7txuuZX1O_l4t0BpRReEF-nX-BEu5lqqVqkxI3-JPjVJhxncAKv2PZSTMNSZftBkEB29WelPnuKsF702hYnctkTfqCM1b2HwQMA-NhqgmJ0cF8jkZsOFKJOcT3vPVEv83X1y1EU6bKe4hqsgkHbP0swhEIbGsmSFL4WMVfuhLmyoCJjBkKtymEq59uqTLPPr82Hgi_64YbRv_jzUs7I25OnNygqT3rssgpJw7f_ZLP3KyzP9NfKF6cOk"
              alt="AL-HAYAT Heritage"
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
            />
          </div>

          {/* Text */}
          <div>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(22px,3vw,32px)", fontWeight: 600, color: "#434b01", marginBottom: "16px" }}>
              Our Heritage
            </h2>
            <div className="w-10 h-px bg-[#b22a2b] mb-5" />
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "15px", color: "#47483a", lineHeight: 1.7, marginBottom: "16px" }}>
              The foundation of AL-HAYAT was laid long before modern laboratories. It began in the courtyards of our ancestors, where potent botanicals were meticulously ground, infused, and preserved to heal and nourish.
            </p>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "14px", color: "#47483a", lineHeight: 1.7, marginBottom: "20px" }}>
              Today, we revive these forgotten recipes. Every formulation is a testament to the belief that true luxury lies in purity, and clinical efficacy is born from nature&apos;s profound complexity. We don&apos;t just extract; we honor the whole plant.
            </p>
            <span style={{ fontFamily: "'Dancing Script', cursive", fontSize: "20px", color: "#b22a2b" }}>
              Crafted with intention.
            </span>
          </div>
        </div>
      </section>

      {/* ═══ DR. FARHEEN BIO ═══ */}
      <section className="py-16 px-6 relative overflow-hidden" style={{ background: "#faf3ea" }}>
        {/* Top wave */}
        <div className="absolute top-0 left-0 w-full overflow-hidden rotate-180">
          <svg viewBox="0 0 1200 60" preserveAspectRatio="none" className="w-full" style={{ height: "60px", display: "block" }}>
            <path d="M0,30 C200,60 400,0 600,30 C800,60 1000,0 1200,30 L1200,60 L0,60 Z" fill="#fff8f1" />
          </svg>
        </div>

        <div className="max-w-5xl mx-auto relative z-10 pt-8">
          <div className="mb-2">
            <span style={{ ...labelStyle, color: "#b22a2b" }}>THE FOUNDER</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-stretch">
            {/* Text Card */}
            <div
              className="md:col-span-7 rounded-xl p-8 flex flex-col justify-center"
              style={{ background: "#fff8f1", boxShadow: "0 4px 20px rgba(0,0,0,0.06)" }}
            >
              <h2
                style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(28px,4vw,44px)", fontWeight: 600, color: "#434b01", marginBottom: "16px" }}
              >
                Dr. Farheen
              </h2>
              <p style={{ fontFamily: "'Playfair Display', serif", fontStyle: "italic", fontSize: "15px", color: "#47483a", lineHeight: 1.7, marginBottom: "16px" }}>
                &ldquo;Skincare should not be a compromise between clinical results and natural purity. It must be the perfect synthesis of both.&rdquo;
              </p>
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "14px", color: "#47483a", lineHeight: 1.7 }}>
                With over a decade of clinical experience in dermatology and a deep-rooted passion for holistic healing, Dr. Farheen established AL-HAYAT to bridge the gap between medical science and herbal lore. Her approach is uncompromising: meticulously sourced ingredients, clinically proven concentrations, and formulations that respect the skin&apos;s microbiome.
              </p>
            </div>

            {/* Photo Card */}
            <div
              className="md:col-span-5 relative rounded-xl overflow-hidden group"
              style={{ minHeight: "360px", boxShadow: "0 4px 20px rgba(0,0,0,0.08)" }}
            >
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBJw-Rz4g-EHA_rhrYwYCdydd0leKV04DgY4Ou0izS3fvD5pt_KqgyXMAC8PtexttEzZSOTCSGgW6XJXe8lhS0fgWZSbCeLtpN2qpXATCI-iCjLkfXehQol0IH6fjN58f4Me3Z21KHlkeqp3B0zBJ2korJjqPPkuhuJvpzRI-lumDG9ngU-9MKPO6kD74hYAYf_F7waCtnr1AxiZyOcXPlU3h8xL0DtWZTqm6cfIOx6-1nNdfXe1O-6r15mNDVv_776S4mLARNYD1Iw"
                alt="Dr. Farheen"
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute bottom-0 left-0 right-0 p-5" style={{ background: "linear-gradient(to top, rgba(26,26,26,0.75), transparent)" }}>
                <span style={{ fontFamily: "'Dancing Script', cursive", fontSize: "28px", color: "#fff8f1" }}>Dr. Farheen</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom wave */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden">
          <svg viewBox="0 0 1200 60" preserveAspectRatio="none" className="w-full" style={{ height: "60px", display: "block" }}>
            <path d="M0,30 C200,60 400,0 600,30 C800,60 1000,0 1200,30 L1200,60 L0,60 Z" fill="#fff8f1" />
          </svg>
        </div>
      </section>

      {/* ═══ CRAFTSMANSHIP ═══ */}
      <section className="py-16 px-6" style={{ background: "#fff8f1" }}>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <span style={{ fontFamily: "'Dancing Script', cursive", fontSize: "20px", color: "#b22a2b", display: "block", marginBottom: "8px" }}>
              How We Work
            </span>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(24px,3.5vw,38px)", fontWeight: 600, color: "#434b01", marginBottom: "12px" }}>
              Our Craftsmanship
            </h2>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "15px", color: "#47483a", maxWidth: "520px", margin: "0 auto", lineHeight: 1.7 }}>
              Every product goes through a carefully designed process to ensure quality, purity, and efficacy.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { step: "01", title: "Source", desc: "Botanical ingredients are hand-selected from trusted farmers and ethical suppliers." },
              { step: "02", title: "Formulate", desc: "Dr. Farheen personally designs each formulation, combining tradition with clinical science." },
              { step: "03", title: "Craft", desc: "Products are handcrafted in small batches to maintain freshness and potency." },
              { step: "04", title: "Deliver", desc: "Carefully packaged and delivered directly to your door, fresh from our facility." },
            ].map((item) => (
              <div
                key={item.step}
                className="flex flex-col p-6 rounded-2xl hover:-translate-y-1 transition-transform duration-300"
                style={{ background: "#EAE2D1", boxShadow: "0 4px 16px rgba(0,0,0,0.04)" }}
              >
                <div
                  style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "40px", fontWeight: 700, color: "rgba(67,75,1,0.2)", marginBottom: "8px", lineHeight: 1 }}
                >
                  {item.step}
                </div>
                <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: "18px", fontWeight: 600, color: "#434b01", marginBottom: "8px" }}>
                  {item.title}
                </h3>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "13px", color: "#47483a", lineHeight: 1.65 }}>
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ CERTIFICATIONS BAND ═══ */}
      <section className="py-7 px-6" style={{ background: "#b22a2b" }}>
        <div className="max-w-5xl mx-auto flex flex-wrap justify-center items-center gap-8 md:gap-16">
          {[
            { icon: "eco", label: "100% NATURAL" },
            { icon: "science", label: "HERBAL FORMULATIONS" },
            { icon: "spa", label: "HANDCRAFTED" },
            { icon: "psychiatry", label: "SMALL BATCH" },
          ].map((c) => (
            <div key={c.label} className="flex items-center gap-2 text-white">
              <span className="material-symbols-outlined" style={{ fontSize: "28px", fontVariationSettings: "'FILL' 0" }}>{c.icon}</span>
              <span style={{ ...labelStyle, fontSize: "11px", color: "#fff" }}>{c.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ═══ INGREDIENTS WE LOVE ═══ */}
      <section className="py-16 px-6 bg-[#fff8f1]">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(24px,3vw,38px)", fontWeight: 600, color: "#434b01", marginBottom: "10px" }}>
              Ingredients We Love
            </h2>
            <p style={{ fontFamily: "'Playfair Display', serif", fontStyle: "italic", fontSize: "15px", color: "#47483a", maxWidth: "520px", margin: "0 auto" }}>
              Sourced from the earth, validated by science. Our hero ingredients are chosen for their profound impact on skin health.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              {
                name: "Beetroot",
                tag: "BRIGHTENING",
                desc: "Rich in Vitamin C and natural antioxidants, it combats pigmentation and provides a radiant, rosy glow.",
                img: "https://lh3.googleusercontent.com/aida-public/AB6AXuC2GaHl04l1TaqVbubTA8pKgsAq4xg3claUDh_04fUy1FvTXIwsREy-cx4L0DpCMzaWYQ9KXSIkG1NslCzl7R14iwkMiGdQOk-WEntWxUK5jwUce-F7zC-DxcSb3L6-3hvZDuccaeWcZz9UIzCpzw57z8ko-n8BZB7ZF2NsIrZ7qm7m0pt1yLBGQZqnONL7QZVuDvVe93tO-Fy2Q2PsBOFDYgx_kHQ5X0-KAsn6cFLol26D3pKmhWNEMqFEjz3kw9sXjhlcqCYj-8-4",
              },
              {
                name: "Neem",
                tag: "CLARIFYING",
                desc: "A powerhouse of antibacterial properties, neem clarifies the skin, preventing breakouts and soothing inflammation.",
                img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCqgE7H8HeR-_o4A-oyEqDxFsCJq8hUqtzWUBl49qJgRUJzCcxcKm5qEkzGHaOVnhi5mghSPbeyC0Z9CiO0w7q7LHgkQwoagRrEES7g7ckwf_xDyFqRNL48FgdGlUesuei9vrJrP7oKcvFlQx5D-v20qPbwPGfu33TrjdWjuC_M2iOsGBk_SbKpH8soA6inwwHMIOm6lDPHound9FuPvGS_5AvGVkI-X-qoXBEqVMiHI3qEg9fQMP6ls5mtKbQgJ_iDrOa_np2R0AIH",
              },
              {
                name: "Manjistha",
                tag: "REJUVENATING",
                desc: "Known as a 'blood purifier' in Ayurveda, it promotes a flawless complexion and supports natural cell turnover.",
                img: "https://lh3.googleusercontent.com/aida-public/AB6AXuC6CC18xvoJdVMkAiXXbT4YnawZ9ub0ARSiFGAmaWXTuXr4G-nGiinhMUp0vrYU13vK6l_LXMJYyQLhO-k7J5n4Kyr3pfryq6hXb7JGF2f_cudERIXR6Dw2H5lUCOM2hkJndwHS7573fP_inBBiuYA-sAfvQU-i94xd8pnxsthS67d0Ch9bokbCuTv7gTrJECYUrrkgDivgSiDncJ3fulEaBRBsmwkmDKrvwS61IcxFpnkZpehHTHnS7hvOsHvdLjOGcN-9SH0B-vvY",
              },
            ].map((ing) => (
              <div
                key={ing.name}
                className="bg-white rounded-xl p-6 flex flex-col items-center text-center hover:-translate-y-1 transition-transform duration-300"
                style={{ boxShadow: "0 4px 20px rgba(0,0,0,0.06)" }}
              >
                <div className="w-28 h-28 rounded-full overflow-hidden mb-5 border-4 border-[#EAE2D1]">
                  <img src={ing.img} alt={ing.name} className="w-full h-full object-cover hover:scale-110 transition-transform duration-500" />
                </div>
                <h4 style={{ fontFamily: "'Playfair Display', serif", fontSize: "20px", fontWeight: 600, color: "#434b01", marginBottom: "8px" }}>
                  {ing.name}
                </h4>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "13px", color: "#47483a", lineHeight: 1.6, marginBottom: "12px" }}>
                  {ing.desc}
                </p>
                <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "9px", fontWeight: 600, letterSpacing: "0.12em", color: "#b22a2b" }}>
                  {ing.tag}
                </span>
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link
              href="/ingredients"
              className="inline-flex items-center gap-2 px-7 py-3 rounded-full border hover:bg-[#434b01] hover:text-white transition-all duration-300"
              style={{ fontFamily: "'Inter', sans-serif", fontSize: "12px", fontWeight: 600, letterSpacing: "0.1em", color: "#434b01", border: "1.5px solid #434b01", textDecoration: "none" }}
            >
              EXPLORE ALL INGREDIENTS →
            </Link>
          </div>
        </div>
      </section>

      {/* ═══ ABOUT CTA ═══ */}
      <section className="py-16 px-6 text-center" style={{ background: "#EAE2D1" }}>
        <div className="max-w-xl mx-auto">
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(24px,3.5vw,36px)", fontWeight: 600, color: "#434b01", marginBottom: "14px" }}>
            Ready to Experience Nature&apos;s Best?
          </h2>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "14px", color: "#47483a", lineHeight: 1.7, marginBottom: "24px" }}>
            Talk to our team directly on WhatsApp and discover the right products for your skin.
          </p>
          <a
            href={waLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-8 py-4 rounded-full text-white hover:scale-105 transition-all duration-300"
            style={{
              background: "#25D366",
              fontFamily: "'Inter', sans-serif",
              fontSize: "14px",
              fontWeight: 700,
              boxShadow: "0 4px 20px rgba(37,211,102,0.4)",
              textDecoration: "none",
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            Order on WhatsApp
          </a>
        </div>
      </section>
    </main>
  );
}
