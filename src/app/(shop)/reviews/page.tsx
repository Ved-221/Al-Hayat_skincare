import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Customer Reviews | AL-HAYAT by Dr. Farheen",
  description: "Read authentic customer reviews and stories about AL-HAYAT herbal skincare products. Real results from real people.",
};

const WHATSAPP_NUMBER = "919876543210";

const REVIEWS = [
  {
    name: "Priya Sharma",
    location: "Mumbai",
    rating: 5,
    date: "June 2024",
    product: "Herbal Neem Soap",
    text: "The Neem Soap completely transformed my skin! I had stubborn acne for years and within 3 weeks of using it, my skin cleared up beautifully. The natural fragrance is so calming. This is the only soap I'll ever use now.",
    verified: true,
  },
  {
    name: "Fatima Khan",
    location: "Hyderabad",
    rating: 5,
    date: "May 2024",
    product: "Herbal Hair Oil",
    text: "I've tried so many hair oils but the Herbal Hair Oil is truly special. My hair has grown noticeably faster and the texture is so much better. The fragrance is divine. Highly recommended to anyone with hair fall!",
    verified: true,
  },
  {
    name: "Ananya Reddy",
    location: "Bangalore",
    rating: 5,
    date: "June 2024",
    product: "Rice Rose Hip Face Wash",
    text: "The Rice Rose Hip face wash is absolutely luxurious. My skin stays hydrated all day — even in air-conditioned offices. Dr. Farheen's formulation is unlike anything I've used before — pure, effective, beautiful.",
    verified: true,
  },
  {
    name: "Zainab Ali",
    location: "Delhi",
    rating: 5,
    date: "April 2024",
    product: "Skin Brightening Face Wash",
    text: "Ordered the Face Wash after seeing a friend's results. My skin tone has evened out noticeably in just 4 weeks. Love that it's 100% natural. Will never go back to chemical-based products.",
    verified: true,
  },
  {
    name: "Sneha Patil",
    location: "Pune",
    rating: 5,
    date: "June 2024",
    product: "Deo Shield Herbal Soap",
    text: "The Deo Shield soap is incredible. It keeps me fresh all day and the sandalwood scent is so elegant. My whole family has switched to this. Doctor-formulated really does make a difference!",
    verified: true,
  },
  {
    name: "Meera Nair",
    location: "Kochi",
    rating: 5,
    date: "May 2024",
    product: "Beetroot Lip Balm",
    text: "Finally found a lip balm that actually works! The Beetroot Lip Balm keeps my lips soft for hours. The scent is gentle and lovely. Ordered 3 more to gift to my friends.",
    verified: true,
  },
  {
    name: "Rashida Begum",
    location: "Lucknow",
    rating: 5,
    date: "March 2024",
    product: "Herbal Hair Oil",
    text: "My mother introduced me to AL-HAYAT and I'm so grateful. The hair oil has completely reversed my hair fall. My scalp feels nourished and my hair shines beautifully. Nothing like natural formulations!",
    verified: true,
  },
  {
    name: "Kavya Rao",
    location: "Chennai",
    rating: 4,
    date: "April 2024",
    product: "Skin Brightening Face Wash",
    text: "Very impressed with the Face Wash. I've seen visible brightening in about 5 weeks. The texture is gentle and it doesn't strip my skin. Will definitely order again!",
    verified: true,
  },
  {
    name: "Divya Menon",
    location: "Thrissur",
    rating: 5,
    date: "June 2024",
    product: "Rice Rose Hip Face Wash",
    text: "Ordered the Rice Rose Hip face wash for my dry skin and it's been a game changer. My skin no longer feels tight after washing. The fragrance is subtle and therapeutic. So happy to have found this brand!",
    verified: true,
  },
];

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex">
      {Array.from({ length: 5 }).map((_, i) => (
        <span key={i} style={{ color: i < rating ? "#b22a2b" : "rgba(200,199,181,0.6)", fontSize: "14px" }}>
          ★
        </span>
      ))}
    </div>
  );
}

export default function ReviewsPage() {
  const avgRating = (REVIEWS.reduce((acc, r) => acc + r.rating, 0) / REVIEWS.length).toFixed(1);
  const fiveStarCount = REVIEWS.filter((r) => r.rating === 5).length;

  return (
    <main className="min-h-screen pt-[72px]" style={{ background: "#fff8f1" }}>

      {/* Hero */}
      <section
        className="relative flex items-center justify-center py-16 px-6"
        style={{ background: "#EAE2D1", minHeight: "300px" }}
      >
        <div className="text-center max-w-2xl mx-auto">
          <span
            style={{ fontFamily: "'Dancing Script', cursive", fontSize: "22px", color: "#b22a2b", display: "block", marginBottom: "10px" }}
          >
            Real Stories
          </span>
          <h1
            style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(30px,5vw,52px)", fontWeight: 700, color: "#434b01", lineHeight: 1.2, marginBottom: "16px" }}
          >
            Customer Reviews
          </h1>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "15px", color: "#47483a", lineHeight: 1.7 }}>
            Real results from real people. Our customers&apos; stories inspire everything we do.
          </p>

          {/* Rating summary */}
          <div className="flex items-center justify-center gap-6 mt-8">
            <div className="text-center">
              <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "56px", fontWeight: 700, color: "#434b01", lineHeight: 1 }}>
                {avgRating}
              </div>
              <div className="flex justify-center mt-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <span key={i} style={{ color: "#b22a2b", fontSize: "20px" }}>★</span>
                ))}
              </div>
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "12px", color: "#47483a", marginTop: "4px" }}>
                Average Rating
              </p>
            </div>
            <div className="w-px h-16 bg-[rgba(200,199,181,0.6)]" />
            <div className="text-center">
              <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "56px", fontWeight: 700, color: "#434b01", lineHeight: 1 }}>
                {REVIEWS.length}
              </div>
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "12px", color: "#47483a", marginTop: "6px" }}>
                Total Reviews
              </p>
            </div>
            <div className="w-px h-16 bg-[rgba(200,199,181,0.6)]" />
            <div className="text-center">
              <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "56px", fontWeight: 700, color: "#434b01", lineHeight: 1 }}>
                {fiveStarCount}
              </div>
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "12px", color: "#47483a", marginTop: "6px" }}>
                5-Star Reviews
              </p>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none">
          <svg viewBox="0 0 1200 60" preserveAspectRatio="none" className="w-full" style={{ height: "60px", display: "block" }}>
            <path d="M0,30 C200,60 400,0 600,30 C800,60 1000,0 1200,30 L1200,60 L0,60 Z" fill="#fff8f1" />
          </svg>
        </div>
      </section>

      {/* Reviews Grid */}
      <section className="py-16 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {REVIEWS.map((review, i) => (
              <div
                key={i}
                className="flex flex-col p-6 rounded-2xl hover:-translate-y-1 transition-transform duration-300"
                style={{
                  background: "rgba(255,248,241,0.9)",
                  backdropFilter: "blur(10px)",
                  boxShadow: "0 4px 24px rgba(0,0,0,0.07)",
                  border: "1px solid rgba(200,199,181,0.4)",
                }}
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "14px", fontWeight: 700, color: "#434b01" }}>
                      {review.name}
                    </p>
                    <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "11px", color: "#787868" }}>
                      {review.location}
                    </p>
                  </div>
                  {review.verified && (
                    <span
                      className="flex items-center gap-1 px-2 py-0.5 rounded-full"
                      style={{ background: "#e8f5e9", fontFamily: "'Inter', sans-serif", fontSize: "8px", fontWeight: 700, color: "#2e7d32", letterSpacing: "0.06em" }}
                    >
                      ✓ VERIFIED
                    </span>
                  )}
                </div>

                <StarRating rating={review.rating} />

                <p
                  className="flex-1 mt-3 mb-4"
                  style={{ fontFamily: "'Playfair Display', serif", fontStyle: "italic", fontSize: "14px", color: "#47483a", lineHeight: 1.75 }}
                >
                  &ldquo;{review.text}&rdquo;
                </p>

                <div style={{ borderTop: "1px solid rgba(200,199,181,0.4)", paddingTop: "12px" }}>
                  <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "10px", fontWeight: 600, color: "#b22a2b", letterSpacing: "0.06em" }}>
                    {review.product}
                  </p>
                  <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "10px", color: "#787868" }}>
                    {review.date}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA — Share Your Experience */}
      <section
        className="py-16 px-6 text-center"
        style={{ background: "#EAE2D1" }}
      >
        <div className="max-w-xl mx-auto">
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(24px,3.5vw,36px)", fontWeight: 600, color: "#434b01", marginBottom: "12px" }}>
            Share Your AL-HAYAT Experience
          </h2>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "14px", color: "#47483a", lineHeight: 1.7, marginBottom: "24px" }}>
            Tried our products and love them? We&apos;d love to hear your story. Message us on WhatsApp and we&apos;ll feature your review.
          </p>
          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Hello! I'd like to share my AL-HAYAT experience and review.")}`}
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
            Share Your Story
          </a>
        </div>
      </section>
    </main>
  );
}
