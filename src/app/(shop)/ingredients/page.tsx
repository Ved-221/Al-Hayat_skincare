import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ingredient Library | AL-HAYAT by Dr. Farheen",
  description: "Discover the 30+ natural botanicals behind every AL-HAYAT product. Learn about each ingredient's origin, benefits, and how it transforms your skin.",
};

const WHATSAPP_NUMBER = "919876543210";

const STATIC_INGREDIENTS = [
  {
    name: "Rose",
    slug: "rose",
    tag: "HYDRATING",
    origin: "India & Bulgaria",
    benefit: "Deeply hydrates and soothes irritated skin",
    desc: "Rich in natural oils, rose helps retain moisture in the skin and brings a beautiful dewy glow. Known for its anti-inflammatory properties, it calms redness and restores the skin's natural radiance.",
    emoji: "🌹",
    image: "/bgremoved_photos/rose.png",
    color: "#fce4ec",
    products: ["Rice Lemon Rose Soap"],
  },
  {
    name: "Beetroot",
    slug: "beetroot",
    tag: "BRIGHTENING",
    origin: "India",
    benefit: "Natural brightening and pigmentation reduction",
    desc: "Rich in Vitamin C, iron and antioxidants, beetroot combats pigmentation, evens skin tone and provides a natural rosy glow. Its betalain content helps fight free radicals.",
    emoji: "🟣",
    image: "/bgremoved_photos/beetroot.png",
    color: "#fce4ec",
    products: ["Beetroot & Hibiscus Face Wash", "Beetroot Lip Balm"],
  },
  {
    name: "Manjistha",
    slug: "manjistha",
    tag: "REJUVENATING",
    origin: "Himalayan foothills",
    benefit: "Blood purification and complexion enhancement",
    desc: "Known as 'Rubia cordifolia', Manjistha is revered in Ayurveda as a blood purifier. It promotes flawless complexion, supports natural cell turnover and reduces hyperpigmentation.",
    emoji: "🌿",
    color: "#e8f5e9",
    products: ["Skin Brightening Face Wash"],
  },
  {
    name: "Sandalwood",
    slug: "sandalwood",
    tag: "SOOTHING",
    origin: "Karnataka, India",
    benefit: "Deep calming and skin tone evening",
    desc: "Sandalwood has been used in Indian skincare for centuries. Its anti-inflammatory and antimicrobial properties calm irritation, reduce blemishes and leave skin feeling silky smooth.",
    emoji: "🪵",
    color: "#fff8e1",
    products: ["Skin Brightening Face Wash"],
  },
  {
    name: "Lemon",
    slug: "lemon",
    tag: "BRIGHTENING",
    origin: "India",
    benefit: "Vitamin C boost and natural brightening",
    desc: "A natural source of Vitamin C, lemon juice brightens the skin, reduces dark spots and provides antioxidant protection. Formulated at skin-safe concentrations for gentle daily use.",
    emoji: "🍋",
    image: "/bgremoved_photos/lemon.png",
    color: "#fffde7",
    products: ["Deo Shield Herbal Soap", "Rice Lemon Rose Soap"],
  },
  {
    name: "Coconut",
    slug: "coconut",
    tag: "NOURISHING",
    origin: "Kerala, India",
    benefit: "Deep moisturization and hair strengthening",
    desc: "Cold-pressed coconut oil is packed with lauric acid and fatty acids that penetrate deep into hair and skin. It strengthens hair, prevents breakage, and leaves skin supremely nourished.",
    emoji: "🥥",
    image: "/bgremoved_photos/coconut.png",
    color: "#f9fbe7",
    products: ["Summer Cooling Hair Oil", "Herbal Hair Oil"],
  },
  {
    name: "Hibiscus",
    slug: "hibiscus",
    tag: "HAIR CARE",
    origin: "India",
    benefit: "Promotes hair growth and reduces hair fall",
    desc: "Rich in amino acids, Vitamin C and flavonoids, hibiscus nourishes hair follicles, stimulates hair growth and adds natural shine. It also acts as a natural conditioner.",
    emoji: "🌺",
    image: "/bgremoved_photos/hibiscus.png",
    color: "#fce4ec",
    products: ["Beetroot & Hibiscus Face Wash", "Herbal Hair Oil"],
  },
  {
    name: "Rice",
    slug: "rice",
    tag: "BRIGHTENING",
    origin: "India",
    benefit: "Skin brightening and anti-aging",
    desc: "Rice water contains inositol which penetrates damaged hair and skin. Rich in ferulic acid and vitamin E, it brightens complexion, tightens pores and reduces signs of aging.",
    emoji: "🌾",
    image: "/bgremoved_photos/rice.png",
    color: "#f9fbe7",
    products: ["Rice Lemon Rose Soap", "Rice Rose Hip Face Wash"],
  },
  {
    name: "Orange",
    slug: "orange",
    tag: "VITAMIN C",
    origin: "India",
    benefit: "Antioxidant protection and glow boost",
    desc: "Packed with Vitamin C and citric acid, orange peel extract brightens skin, minimizes pores and provides powerful antioxidant protection against environmental damage.",
    emoji: "🍊",
    color: "#fff3e0",
    products: [],
  },
  {
    name: "Neem",
    slug: "neem",
    tag: "CLARIFYING",
    origin: "India",
    benefit: "Antibacterial purification and acne control",
    desc: "Known as nature's antibiotic, neem is packed with nimbidin and quercetin that fight acne-causing bacteria, soothe inflammation and help regulate sebum production.",
    emoji: "🌿",
    image: "/bgremoved_photos/neem.png",
    color: "#e8f5e9",
    products: ["Herbal Neem Soap"],
  },
  {
    name: "Amla",
    slug: "amla",
    tag: "STRENGTHENING",
    origin: "India",
    benefit: "Hair strengthening and premature greying prevention",
    desc: "One of the richest natural sources of Vitamin C, amla strengthens hair from roots, prevents premature greying, and adds beautiful shine. Rich in tannins that protect hair from environmental stress.",
    emoji: "🟢",
    image: "/bgremoved_photos/amla.png",
    color: "#e8f5e9",
    products: ["Herbal Hair Oil"],
  },
  {
    name: "Watermelon",
    slug: "watermelon",
    tag: "HYDRATING",
    origin: "India",
    benefit: "Intense hydration and antioxidant boost",
    desc: "Watermelon extract is rich in lycopene, vitamins A, B6 and C, and amino acids. It provides intense hydration without clogging pores and is perfect for all skin types, including oily skin.",
    emoji: "🍉",
    image: "/bgremoved_photos/watermelon.png",
    color: "#fce4ec",
    products: ["Watermelon Soap"],
  },
  {
    name: "Strawberry",
    slug: "strawberry",
    tag: "ANTIOXIDANT",
    origin: "India",
    benefit: "Rich in antioxidants and natural exfoliation",
    desc: "Strawberries contain salicylic acid which gently exfoliates, fights blackheads and brightens the complexion. Rich in Vitamin C and ellagic acid, they protect skin from UV damage.",
    emoji: "🍓",
    image: "/bgremoved_photos/strawberry.png",
    color: "#fce4ec",
    products: ["Strawberry Lip Balm"],
  },
  {
    name: "Mint",
    slug: "mint",
    tag: "COOLING",
    origin: "India",
    benefit: "Cooling, refreshing and soothing effect",
    desc: "Menthol from mint provides an instant cooling sensation, relieves skin irritation and reduces redness. Its antimicrobial properties make it effective for oily and acne-prone skin.",
    emoji: "🌱",
    image: "/bgremoved_photos/mint.png",
    color: "#e8f5e9",
    products: ["Deo Shield Herbal Soap"],
  },
  {
    name: "Melon",
    slug: "melon",
    tag: "SOOTHING",
    origin: "India",
    benefit: "Skin softening and radiance enhancing",
    desc: "Melon extract is packed with enzymes and vitamins that gently soften the skin, brighten complexion and provide antioxidant protection. Ideal for sensitive and dry skin types.",
    emoji: "🍈",
    color: "#f9fbe7",
    products: ["Watermelon Soap"],
  },
];

const supabaseBaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://zhdqcobqpzbpheusckym.supabase.co";
const INGREDIENTS = STATIC_INGREDIENTS.map(ing => ({
  ...ing,
  image: ing.image 
    ? `${supabaseBaseUrl}/storage/v1/object/public/site-assets/ingredients/${ing.image.split('/').pop()?.replace('.png', '.webp')}`
    : undefined
}));

const getProductSlug = (name: string) => {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
};

export default function IngredientsPage() {
  return (
    <main className="min-h-screen pt-[72px]" style={{ background: "#fff8f1" }}>

      {/* Hero */}
      <section
        className="relative w-full flex items-center justify-center py-20 px-6 overflow-hidden"
        style={{ background: "#EAE2D1", minHeight: "360px" }}
      >
        <div className="text-center max-w-2xl mx-auto">
          <span
            style={{ fontFamily: "'Dancing Script', cursive", fontSize: "22px", color: "#b22a2b", display: "block", marginBottom: "10px" }}
          >
            From Earth to Skin
          </span>
          <h1
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(32px,5vw,56px)",
              fontWeight: 700,
              color: "#434b01",
              lineHeight: 1.2,
              marginBottom: "16px",
            }}
          >
            Ingredient Library
          </h1>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "16px", color: "#47483a", lineHeight: 1.7 }}>
            Every AL-HAYAT product is powered by nature&apos;s most potent botanicals. Discover the science and tradition behind each ingredient.
          </p>
        </div>

        {/* Wave */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none">
          <svg viewBox="0 0 1200 60" preserveAspectRatio="none" className="w-full" style={{ height: "60px", display: "block" }}>
            <path d="M0,30 C200,60 400,0 600,30 C800,60 1000,0 1200,30 L1200,60 L0,60 Z" fill="#fff8f1" />
          </svg>
        </div>
      </section>

      {/* Ingredient grid */}
      <section className="py-16 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {INGREDIENTS.map((ing) => (
              <div
                key={ing.slug}
                className="group bg-white rounded-2xl overflow-hidden hover:-translate-y-1 transition-transform duration-300"
                style={{ boxShadow: "0 4px 24px rgba(0,0,0,0.07)" }}
              >
                {/* Color header */}
                <div
                  className="flex items-center justify-center overflow-hidden"
                  style={{ height: "120px", background: ing.color }}
                >
                  {ing.image ? (
                    <img
                      src={ing.image}
                      alt={ing.name}
                      className="w-24 h-24 object-contain group-hover:scale-110 transition-transform duration-300"
                    />
                  ) : (
                    <span className="text-6xl group-hover:scale-110 transition-transform duration-300">
                      {ing.emoji}
                    </span>
                  )}
                </div>

                <div className="p-5">
                  <div className="flex items-center justify-between mb-2">
                    <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "20px", fontWeight: 600, color: "#434b01" }}>
                      {ing.name}
                    </h2>
                    <span
                      className="px-2 py-0.5 rounded-sm"
                      style={{ fontFamily: "'Inter', sans-serif", fontSize: "8px", fontWeight: 700, letterSpacing: "0.1em", color: "#b22a2b", background: "#fce4ec" }}
                    >
                      {ing.tag}
                    </span>
                  </div>

                  <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "11px", color: "#787868", marginBottom: "10px" }}>
                    Origin: {ing.origin}
                  </p>

                  <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "13px", fontWeight: 600, color: "#434b01", marginBottom: "8px" }}>
                    {ing.benefit}
                  </p>

                  <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "12px", color: "#47483a", lineHeight: 1.65, marginBottom: "14px" }}>
                    {ing.desc}
                  </p>

                  {ing.products.length > 0 && (
                    <div>
                      <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "9px", fontWeight: 700, color: "#787868", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "6px" }}>
                        Found In:
                      </p>
                      <div className="flex overflow-x-auto gap-2 no-scrollbar pb-1 flex-nowrap w-full">
                        {ing.products.map((p) => (
                          <Link
                            key={p}
                            href={`/product/${getProductSlug(p)}`}
                            className="px-2.5 py-1.5 rounded-lg border border-[#c8c7b5]/30 hover:bg-[#434b01] hover:text-[#fff8f1] transition-all whitespace-nowrap text-[10px] font-medium flex-shrink-0"
                            style={{ fontFamily: "'Inter', sans-serif", color: "#434b01", background: "#fff8f1", textDecoration: "none" }}
                          >
                            {p}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-14 px-6 text-center" style={{ background: "#EAE2D1" }}>
        <div className="max-w-xl mx-auto">
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(24px,3.5vw,36px)", fontWeight: 600, color: "#434b01", marginBottom: "14px" }}>
            Discover Products With These Ingredients
          </h2>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "14px", color: "#47483a", lineHeight: 1.7, marginBottom: "24px" }}>
            Browse our full product catalog to find the perfect herbal formulation for your skin needs.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/products"
              className="inline-flex items-center gap-2 px-7 py-3 rounded-full text-white hover:opacity-90 transition-opacity"
              style={{ background: "#434b01", fontFamily: "'Inter', sans-serif", fontSize: "13px", fontWeight: 600, letterSpacing: "0.08em", textDecoration: "none" }}
            >
              Browse Products
            </Link>
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Hello! I'd like to know which AL-HAYAT products are best for my skin.")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-7 py-3 rounded-full text-white hover:opacity-90 transition-opacity"
              style={{ background: "#25D366", fontFamily: "'Inter', sans-serif", fontSize: "13px", fontWeight: 600, textDecoration: "none" }}
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="white">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              Ask on WhatsApp
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
