"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { PRODUCTS } from "@/data/products";

import FeaturedCategoriesSection from "@/components/storefront/categories/FeaturedCategoriesSection";
import { ExpandingCards } from "@/components/ExpandingCards";
import BestSellersCarousel from "@/components/BestSellersCarousel";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
  ScrollTrigger.config({ ignoreMobileResize: true });
}



const WHATSAPP_NUMBER = "919876543210";

function waLink(product?: string) {
  const msg = product
    ? `Hello! I'm interested in ordering: ${product}. Please guide me.`
    : "Hello! I'd like to order from AL-HAYAT. Please guide me.";
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
}

/* ──────────────── Ingredient data ──────────────── */
const INGREDIENTS = [
  {
    name: "Rose",
    benefit: "Hydrates & Soothes",
    image: "/bgremoved_photos/rose.png",
    color: "#fce4ec",
    emoji: "🌹",
    desc: "Rich in natural oils, rose helps retain moisture in the skin and brings a beautiful dewy glow. Known for its anti-inflammatory properties, it calms redness and restores the skin's natural radiance."
  },
  {
    name: "Beetroot",
    benefit: "Natural Glow",
    image: "/bgremoved_photos/beetroot.png",
    color: "#fce4ec",
    emoji: "🟣",
    desc: "Rich in Vitamin C, iron and antioxidants, beetroot combats pigmentation, evens skin tone and provides a natural rosy glow. Its betalain content helps fight free radicals."
  },
  {
    name: "Lemon",
    benefit: "Brightens & Refreshes",
    image: "/bgremoved_photos/lemon.png",
    color: "#fffde7",
    emoji: "🍋",
    desc: "A natural source of Vitamin C, lemon juice brightens the skin, reduces dark spots and provides antioxidant protection. Formulated at skin-safe concentrations for gentle daily use."
  },
  {
    name: "Rice",
    benefit: "Brightens Skin",
    image: "/bgremoved_photos/rice.png",
    color: "#f9fbe7",
    emoji: "🌾",
    desc: "Rice water contains inositol which penetrates damaged hair and skin. Rich in ferulic acid and vitamin E, it brightens complexion, tightens pores and reduces signs of aging."
  },
  {
    name: "Hibiscus",
    benefit: "Hair Care & Growth",
    image: "/bgremoved_photos/hibiscus.png",
    color: "#fce4ec",
    emoji: "🌺",
    desc: "Rich in amino acids, Vitamin C and flavonoids, hibiscus nourishes hair follicles, stimulates hair growth and adds natural shine. It also acts as a natural conditioner."
  },
  {
    name: "Neem",
    benefit: "Purifies & Clarifies",
    image: "/bgremoved_photos/neem.png",
    color: "#e8f5e9",
    emoji: "🌿",
    desc: "Known as nature's antibiotic, neem is packed with nimbidin and quercetin that fight acne-causing bacteria, soothe inflammation and help regulate sebum production."
  },
  {
    name: "Coconut",
    benefit: "Deep Nourishment",
    image: "/bgremoved_photos/coconut.png",
    color: "#f9fbe7",
    emoji: "🥥",
    desc: "Cold-pressed coconut oil is packed with lauric acid and fatty acids that penetrate deep into hair and skin. It strengthens hair, prevents breakage, and leaves skin supremely nourished."
  },
  {
    name: "Mint",
    benefit: "Cooling Effect",
    image: "/bgremoved_photos/mint.png",
    color: "#e8f5e9",
    emoji: "🌱",
    desc: "Menthol from mint provides an instant cooling sensation, relieves skin irritation and reduces redness. Its antimicrobial properties make it effective for oily and acne-prone skin."
  },
  {
    name: "Watermelon",
    benefit: "Intense Hydration",
    image: "/bgremoved_photos/watermelon.png",
    color: "#fce4ec",
    emoji: "🍉",
    desc: "Watermelon extract is rich in lycopene, vitamins A, B6 and C, and amino acids. It provides intense hydration without clogging pores and is perfect for all skin types, including oily skin."
  },
  {
    name: "Strawberry",
    benefit: "Rich in Antioxidants",
    image: "/bgremoved_photos/strawberry.png",
    color: "#fce4ec",
    emoji: "🍓",
    desc: "Strawberries contain salicylic acid which gently exfoliates, fights blackheads and brightens the complexion. Rich in Vitamin C and ellagic acid, they protect skin from UV damage."
  }
];

/* ──────────────── Testimonials ──────────────── */
const TESTIMONIALS = [
  {
    name: "Priya Sharma",
    location: "Mumbai",
    rating: 5,
    text: "The Neem Soap completely transformed my skin! I had stubborn acne for years and within 3 weeks of using it, my skin cleared up beautifully. The natural fragrance is so calming.",
    product: "Herbal Neem Soap",
  },
  {
    name: "Fatima Khan",
    location: "Hyderabad",
    rating: 5,
    text: "I've tried so many hair oils but Al-Hayat's Herbal Hair Oil is truly special. My hair has grown noticeably faster and the texture is so much better. Highly recommended!",
    product: "Herbal Hair Oil",
  },
  {
    name: "Ananya Reddy",
    location: "Bangalore",
    rating: 5,
    text: "The Rice Rose Hip face wash is absolutely luxurious. My skin stays hydrated all day. Dr. Farheen's formulation is unlike anything I've used before — pure, effective, beautiful.",
    product: "Rice Rose Hip Face Wash",
  },
  {
    name: "Zainab Ali",
    location: "Delhi",
    rating: 5,
    text: "Ordered the Face Wash after seeing a friend's results. My skin tone has evened out noticeably. Love that it's 100% natural. Will never go back to chemical-based products.",
    product: "Skin Brightening Face Wash",
  },
];

/* ──────────────── FAQ data ──────────────── */
const FAQS = [
  {
    q: "Are all AL-HAYAT products 100% natural?",
    a: "Yes. Every product is formulated with natural botanical ingredients, free from sulphates, parabens, and harsh synthetic chemicals. Dr. Farheen personally oversees every formulation.",
  },
  {
    q: "How do I place an order?",
    a: "Simply click any 'Order on WhatsApp' button and our team will guide you through the process personally. We'll confirm your order, share payment details, and arrange delivery.",
  },
  {
    q: "Do you offer Cash on Delivery?",
    a: "Yes, we offer Cash on Delivery across India. You can also pay via UPI or bank transfer. All payment details are shared on WhatsApp.",
  },
  {
    q: "How long does delivery take?",
    a: "Standard delivery takes 3–7 business days across India. We ship from our production facility and all products are freshly prepared.",
  },
  {
    q: "Are the products suitable for sensitive skin?",
    a: "Our products are formulated with gentle botanical ingredients suitable for most skin types. If you have specific skin concerns, please consult with our team on WhatsApp for personalized recommendations.",
  },
  {
    q: "Can I return a product?",
    a: "We have a 7-day return policy for unopened products. For product quality concerns, please contact us on WhatsApp and we'll resolve it immediately.",
  },
];

/* ──────────────── Trust Cards ──────────────── */
const TRUST_ITEMS = [
  { icon: "🌿", title: "100% Natural Ingredients", desc: "Every ingredient sourced directly from nature. No synthetic chemicals, ever." },
  { icon: "🧪", title: "Herbal Formulations", desc: "Traditional herbal wisdom meets modern scientific precision in every batch." },
  { icon: "✋", title: "Handcrafted with Care", desc: "Made in small batches to ensure quality, freshness and potency." },
  { icon: "🌱", title: "Sulphate & Paraben Free", desc: "Gentle on your skin and safe for daily use across all skin types." },
  { icon: "🏺", title: "Small Batch Production", desc: "Limited quantities ensure every product is at its peak freshness." },
  { icon: "💚", title: "Ethical Sourcing", desc: "Ingredients sourced responsibly from trusted botanical farmers." },
];

/* ──────────────── Statistics ──────────────── */
const STATS = [
  { value: "2000+", label: "Happy Customers" },
  { value: "30+", label: "Herbal Ingredients" },
  { value: "15+", label: "Products Crafted" },
  { value: "5000+", label: "Orders Delivered" },
];

/* ──────────────── FAQItem component ──────────────── */
function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div
      className="border-b cursor-pointer"
      style={{ borderColor: "rgba(200,199,181,0.45)" }}
      onClick={() => setOpen((v) => !v)}
    >
      <div className="flex items-center justify-between py-5 gap-4">
        <p style={{ fontFamily: "'Playfair Display', serif", fontSize: "16px", fontWeight: 600, color: "#434b01" }}>
          {q}
        </p>
        <span
          className="transition-transform duration-300"
          style={{ transform: open ? "rotate(45deg)" : "rotate(0deg)", color: "#b22a2b", fontSize: "22px", flexShrink: 0 }}
        >
          +
        </span>
      </div>
      <div
        className="overflow-hidden transition-all duration-300"
        style={{ maxHeight: open ? "300px" : "0", opacity: open ? 1 : 0 }}
      >
        <p
          className="pb-5"
          style={{ fontFamily: "'Inter', sans-serif", fontSize: "14px", color: "#47483a", lineHeight: 1.7 }}
        >
          {a}
        </p>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════
   MAIN HOMEPAGE COMPONENT
═══════════════════════════════════════════════════ */
export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const progressFillRef = useRef<HTMLDivElement>(null);
  const scrollHintRef = useRef<HTMLDivElement>(null);

  const [isLoaded, setIsLoaded] = useState(false);
  const [loaderProgress, setLoaderProgress] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [productsList, setProductsList] = useState(PRODUCTS);
  const [isMobile, setIsMobile] = useState(false);

  const [mediaMap, setMediaMap] = useState<Record<string, string>>({});

  // Detect screen size for mobile responsive video source
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const videoSrc = isMobile
    ? mediaMap["hero/keep_everything_in_this_video_gwr_video_mvp.mp4"] || "/hero_video_fallback.mp4"
    : mediaMap["hero/hero_video.mp4"] || "/hero_video_fallback.mp4";

  // Intro animation state variables
  const [introPlaying, setIntroPlaying] = useState(false);
  const [logoState, setLogoState] = useState<'init' | 'fade-in' | 'hold' | 'fade-out' | 'completed'>('init');

  // Verify if the intro animation needs to play on mount
  useEffect(() => {
    const introPlayed = sessionStorage.getItem("alhayat-intro-played");
    if (!introPlayed) {
      setTimeout(() => {
        setIntroPlaying(true);
        document.body.classList.add("intro-active");
      }, 0);
    }
    return () => {
      document.body.classList.remove("intro-active");
    };
  }, []);

  // Check reduced motion preference
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setTimeout(() => {
      setReducedMotion(mediaQuery.matches);
    }, 0);
    const listener = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mediaQuery.addEventListener("change", listener);
    return () => mediaQuery.removeEventListener("change", listener);
  }, []);

  // Load products and media from Supabase dynamically on mount
  useEffect(() => {
    import("@/services/productService").then((mod) => {
      mod.getProducts().then((data) => {
        if (data && data.length > 0) {
          setProductsList(data);
        }
      });
    });

    import("@/services/siteMediaService").then((mod) => {
      mod.getSiteMedia().then((data) => {
        setMediaMap(data);
      });
    });
  }, []);

  // Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonial((v) => (v + 1) % TESTIMONIALS.length);
    }, 4500);
    return () => clearInterval(interval);
  }, []);

  // Lock scroll position at scrollY = 0 during intro animation
  useEffect(() => {
    if (introPlaying && isLoaded) {
      const lockScroll = () => {
        if (window.scrollY !== 0) {
          window.scrollTo(0, 0);
        }
      };
      window.addEventListener("scroll", lockScroll);
      lockScroll();
      return () => window.removeEventListener("scroll", lockScroll);
    }
  }, [introPlaying, isLoaded]);

  // Manage intro animation sequence
  useEffect(() => {
    if (isLoaded && introPlaying) {
      // Start fade-in transition
      const fadeInTimer = setTimeout(() => {
        setLogoState("fade-in");
      }, 300);

      // Transition to hold state
      const holdTimer = setTimeout(() => {
        setLogoState("hold");
      }, 1800);

      // Start fade-out transition
      const fadeOutTimer = setTimeout(() => {
        setLogoState("fade-out");
      }, 3300);

      // Finish intro animation
      const completeTimer = setTimeout(() => {
        setLogoState("completed");
        setIntroPlaying(false);
        document.body.classList.remove("intro-active");
        sessionStorage.setItem("alhayat-intro-played", "true");
      }, 4300);

      return () => {
        clearTimeout(fadeInTimer);
        clearTimeout(holdTimer);
        clearTimeout(fadeOutTimer);
        clearTimeout(completeTimer);
      };
    }
  }, [isLoaded, introPlaying]);

  // Simulated loader progress increment on mount
  useEffect(() => {
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.random() * 15;
      if (progress >= 90) {
        progress = 90;
        clearInterval(interval);
      }
      setLoaderProgress(Math.floor(progress));
    }, 100);

    return () => clearInterval(interval);
  }, []);

  // Handle video ready callback to complete loader
  const handleVideoReady = () => {
    setLoaderProgress(100);
    setTimeout(() => {
      setIsLoaded(true);
    }, 300);
  };

  // Video load event bindings to handle readyState correctly (browser caching helper)
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const checkReady = () => {
      if (video.readyState >= 2) {
        handleVideoReady();
        return true;
      }
      return false;
    };

    if (!checkReady()) {
      const onCanPlay = () => {
        handleVideoReady();
        video.removeEventListener("canplay", onCanPlay);
      };
      video.addEventListener("canplay", onCanPlay);
      return () => {
        video.removeEventListener("canplay", onCanPlay);
      };
    }
  }, [videoSrc]);

  const targetTimeRef = useRef<number>(0);

  // Dedicated requestAnimationFrame loop for smooth video seeking without queue overflow
  useEffect(() => {
    let animId: number;
    const updateFrame = () => {
      const video = videoRef.current;
      if (video && !video.seeking && !isMobile) {
        const target = targetTimeRef.current;
        const diff = Math.abs(video.currentTime - target);
        if (diff > 0.02) {
          try {
            video.currentTime = target;
          } catch {
            // Ignore temporary seek errors before load
          }
        }
      }
      animId = requestAnimationFrame(updateFrame);
    };
    animId = requestAnimationFrame(updateFrame);
    return () => cancelAnimationFrame(animId);
  }, [isMobile]);

  // Initialize GSAP ScrollTrigger
  useEffect(() => {
    if (!isLoaded || introPlaying) return;

    // Only normalize scroll on desktop/non-touch to prevent jitter on mobile devices
    if (typeof window !== "undefined" && !("ontouchstart" in window)) {
      ScrollTrigger.normalizeScroll(true);
    } else {
      ScrollTrigger.normalizeScroll(false);
    }

    const video = videoRef.current;
    const container = containerRef.current;
    if (!video || !container) return;

    // Reduced motion accessibility fallback: Skip ScrollTrigger scrub/pin and show frame
    if (reducedMotion) {
      const setLastFrame = () => {
        if (!isNaN(video.duration) && video.duration > 0) {
          video.currentTime = isMobile ? 0 : video.duration;
        }
      };
      if (video.readyState >= 1) {
        setLastFrame();
      } else {
        video.addEventListener("loadedmetadata", setLastFrame);
        return () => video.removeEventListener("loadedmetadata", setLastFrame);
      }
      return;
    }

    const ctx = gsap.context(() => {
      const initScrollTrigger = () => {
        const duration = video.duration;
        if (isNaN(duration) || duration === 0) return;

        const scrollDist = isMobile ? 2200 : 3500;

        if (isMobile) {
          // Mobile: Autoplay video, disable scrub, ignore resize
          video.loop = true;
          video.play().catch(() => {});
          
          gsap.to(container, {
            scrollTrigger: {
              trigger: container,
              start: "top top",
              end: () => `+=${scrollDist}`,
              pin: true,
              scrub: false,
              invalidateOnRefresh: false,
              onUpdate: (self) => {
                if (progressFillRef.current) {
                  progressFillRef.current.style.width = `${self.progress * 100}%`;
                }
                if (scrollHintRef.current) {
                  if (self.scroll() > 100) {
                    scrollHintRef.current.style.opacity = "0";
                    scrollHintRef.current.style.transform = "translate(-50%, 20px)";
                    scrollHintRef.current.style.pointerEvents = "none";
                  } else {
                    scrollHintRef.current.style.opacity = "1";
                    scrollHintRef.current.style.transform = "translate(-50%, 0)";
                    scrollHintRef.current.style.pointerEvents = "auto";
                  }
                }
              },
            },
          });
          return;
        }

        // Desktop: Forward video scroll animation (start at 0, scrub to duration)
        const startVal = 0;
        const targetVal = duration;

        video.currentTime = startVal;
        targetTimeRef.current = startVal;
        const proxy = { currentTime: startVal };

        gsap.to(proxy, {
          currentTime: targetVal,
          ease: "none",
          scrollTrigger: {
            trigger: container,
            start: "top top",
            end: () => `+=${scrollDist}`,
            pin: true,
            scrub: 1.2,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              if (!isNaN(proxy.currentTime)) {
                targetTimeRef.current = proxy.currentTime;
              }

              if (progressFillRef.current) {
                progressFillRef.current.style.width = `${self.progress * 100}%`;
              }

              if (scrollHintRef.current) {
                if (self.scroll() > 100) {
                  scrollHintRef.current.style.opacity = "0";
                  scrollHintRef.current.style.transform = "translate(-50%, 20px)";
                  scrollHintRef.current.style.pointerEvents = "none";
                } else {
                  scrollHintRef.current.style.opacity = "1";
                  scrollHintRef.current.style.transform = "translate(-50%, 0)";
                  scrollHintRef.current.style.pointerEvents = "auto";
                }
              }
            },
          },
        });
      };

      if (video.readyState >= 1) {
        initScrollTrigger();
      } else {
        video.addEventListener("loadedmetadata", initScrollTrigger);
      }
    }, container);

    return () => {
      ctx.revert();
    };
  }, [isLoaded, introPlaying, reducedMotion, isMobile, videoSrc]);

  // Fallback scroll listener for scroll hint when reduced motion is active
  useEffect(() => {
    if (!reducedMotion || !isLoaded || introPlaying) return;

    const handleScroll = () => {
      if (scrollHintRef.current) {
        if (window.scrollY > 100) {
          scrollHintRef.current.style.opacity = "0";
          scrollHintRef.current.style.transform = "translate(-50%, 20px)";
          scrollHintRef.current.style.pointerEvents = "none";
        } else {
          scrollHintRef.current.style.opacity = "1";
          scrollHintRef.current.style.transform = "translate(-50%, 0)";
          scrollHintRef.current.style.pointerEvents = "auto";
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [reducedMotion, isLoaded, introPlaying]);

  const circumference = 2 * Math.PI * 45;
  const strokeDashoffset = circumference * (1 - loaderProgress / 100);

  return (
    <main>
      {/* ── Loading Screen ── */}
      <div
        id="loader"
        className={`fixed inset-0 z-[1000] flex items-center justify-center bg-[#0a0a0a] transition-all duration-700 ${isLoaded ? "opacity-0 invisible pointer-events-none" : "opacity-100 visible"
          }`}
      >
        <div className="flex flex-col items-center gap-6">
          <div className="loader-ring">
            <svg viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="45" />
              <circle cx="50" cy="50" r="45" className="loader-progress" style={{ strokeDashoffset }} />
            </svg>
            <span className="absolute inset-0 flex items-center justify-center text-[22px] font-semibold tracking-tight text-[#e0e0e0]">
              {loaderProgress}%
            </span>
          </div>
          <p className="text-[14px] font-normal text-white/40 tracking-[2px] uppercase">Loading…</p>
        </div>
      </div>

      {/* ── Scroll Hint ── */}
      <div
        ref={scrollHintRef}
        className={`fixed bottom-12 left-1/2 z-[90] transition-all duration-500 ${isLoaded && !introPlaying ? "opacity-100" : "opacity-0 translate-y-5 pointer-events-none"
          }`}
        style={{ transform: "translate(-50%, 0)" }}
      >
        <div className="flex flex-col items-center gap-3">
          <div className="scroll-mouse">
            <div className="scroll-wheel"></div>
          </div>
          <span className="text-[11px] font-medium text-white/50 tracking-[2px] uppercase">Scroll to explore</span>
        </div>
      </div>

      {/* ── Progress Bar ── */}
      <div
        className={`fixed bottom-0 left-0 w-full h-[3px] z-[90] bg-white/5 transition-opacity duration-500 ${isLoaded && !introPlaying && !reducedMotion ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
      >
        <div
          ref={progressFillRef}
          id="progress-fill"
          className="h-full rounded-r-[2px] transition-[width] duration-75 ease-linear"
          style={{ width: "0%" }}
        />
      </div>

      {/* ── Premium Intro Logo Overlay ── */}
      {introPlaying && (
        <div className="intro-overlay">
          <div
            className={`intro-logo ${
              logoState === "fade-in" || logoState === "hold"
                ? "intro-logo-fade-in"
                : logoState === "fade-out"
                ? "intro-logo-fade-out"
                : ""
            }`}
          >
            <Image
              src={mediaMap["branding/logo_withoutbg.webp"] || "/logo_withoutbg.png"}
              alt="AL-HAYAT Logo"
              width={300}
              height={300}
              style={{
                width: "clamp(200px, 35vw, 320px)",
                height: "clamp(200px, 35vw, 320px)",
                objectFit: "contain",
                filter: "drop-shadow(0 10px 30px rgba(67,75,1,0.06))",
              }}
            />
          </div>
        </div>
      )}

      {/* ── Hero Video Section ── */}
      <div ref={containerRef} className="video-container-cropped z-10">
        <video
          ref={videoRef}
          key={videoSrc}
          id="hero-video"
          muted
          playsInline
          preload="metadata"
          src={videoSrc}
          poster="/hero_video_fallback.jpg"
          className="video-element-cropped"
        />
      </div>

      {/* ═══════════════════════════════════════════════════════
          MAIN WEBSITE CONTENT — starts directly after animation
      ════════════════════════════════════════════════════════ */}
      <div className="relative z-20 bg-[#fff8f1]">

        {/* ══ SECTION 1: Brand Story / Why We Exist ══ */}
        <section className="py-20 px-6" style={{ background: "#fff8f1" }}>
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-14 items-center">
              {/* Image */}
              <div
                className="relative overflow-hidden group"
                style={{
                  borderRadius: "180px 180px 16px 16px",
                  aspectRatio: "3/4",
                  maxWidth: "380px",
                  margin: "0 auto",
                  background: "#EAE2D1",
                }}
              >
                <Image
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuC663Sc3KM_zaIw8CqAE6KJJUKmurCW5lKL6RENlj7i1zaOHZWOwaQ_IFHCwQSGBCIX3RXa099VHx4tFW05po9CkKm_Vnn5QW-3PcCom4zkjtSCX_PS_DTs1pQ1xhzQ23slmSppvyZ7jMAAkC5u-3jYoCflo6Yrac2ZLiWVH8ZU_qEfa554t5h4W7ExszJmplzuFcIkjfRJhukL8zhpag3WSGpdyygkCJMA4PgF1ePHmqeHfrTG-VgmN3uvZkYfNUx1Qq40273S0N2e"
                  alt="AL-HAYAT Botanical Skincare"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
              </div>

              {/* Text */}
              <div>
                <span
                  style={{ fontFamily: "'Dancing Script', cursive", fontSize: "22px", color: "#b22a2b", display: "block", marginBottom: "10px" }}
                >
                  Our Story
                </span>
                <h2
                  style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(26px,3.5vw,40px)", fontWeight: 600, color: "#434b01", lineHeight: 1.2, marginBottom: "18px" }}
                >
                  Beauty Born From<br />Nature Itself
                </h2>
                <div className="w-10 h-px bg-[#b22a2b] mb-6" />
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "15px", color: "#47483a", lineHeight: 1.8, marginBottom: "14px" }}>
                  AL-HAYAT by Dr. Farheen began with a simple truth: the most powerful skincare ingredients are the ones nature has already perfected over centuries.
                </p>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "14px", color: "#47483a", lineHeight: 1.8, marginBottom: "24px" }}>
                  Each product is handcrafted in small batches, using time-honored herbal formulations combined with clinical expertise. The result is skincare that truly works — gently, naturally, and beautifully.
                </p>
                <Link
                  href="/about"
                  className="inline-flex items-center gap-2 hover:gap-3 transition-all duration-200"
                  style={{ fontFamily: "'Inter', sans-serif", fontSize: "13px", fontWeight: 600, color: "#434b01", letterSpacing: "0.08em", textDecoration: "none" }}
                >
                  Our Full Story →
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Wave divider */}
        <div className="w-full overflow-hidden leading-none" style={{ marginTop: "-2px" }}>
          <svg viewBox="0 0 1200 60" preserveAspectRatio="none" className="w-full" style={{ height: "60px", display: "block" }}>
            <path d="M0,20 C300,60 900,0 1200,40 L1200,60 L0,60 Z" fill="#EAE2D1" />
          </svg>
        </div>

        {/* ══ SECTION 2: Ingredient Journey ══ */}
        <section style={{ background: "#EAE2D1" }} className="py-20 px-6">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-14">
              <span
                style={{ fontFamily: "'Dancing Script', cursive", fontSize: "20px", color: "#b22a2b", display: "block", marginBottom: "8px" }}
              >
                From Nature&apos;s Heart
              </span>
              <h2
                style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(26px,3.5vw,40px)", fontWeight: 600, color: "#434b01", marginBottom: "12px" }}
              >
                The Ingredients Behind Every Product
              </h2>
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "15px", color: "#47483a", maxWidth: "520px", margin: "0 auto", lineHeight: 1.7 }}>
                Every herb, flower and botanical element is chosen for its proven benefit. Discover the ingredients that make AL-HAYAT extraordinary.
              </p>
            </div>

            {/* Ingredient Expanding Cards */}
            <ExpandingCards
              className="mx-auto mt-8"
              items={INGREDIENTS.map((ing, index) => {
                const fileName = ing.image.split('/').pop()?.replace('.png', '.webp');
                const mediaKey = `ingredients/${fileName}`;
                return {
                  id: index,
                  title: ing.name,
                  description: ing.desc,
                  imgSrc: mediaMap[mediaKey] || ing.image,
                  emoji: ing.emoji,
                  benefit: ing.benefit,
                  color: ing.color
                };
              })}
            />

            <div className="text-center mt-10">
              <Link
                href="/ingredients"
                className="inline-flex items-center gap-2 px-7 py-3 rounded-full border hover:bg-[#434b01] hover:text-white transition-all duration-300"
                style={{ fontFamily: "'Inter', sans-serif", fontSize: "12px", fontWeight: 600, letterSpacing: "0.1em", color: "#434b01", border: "1.5px solid #434b01", textDecoration: "none" }}
              >
                EXPLORE INGREDIENT LIBRARY →
              </Link>
            </div>
          </div>
        </section>

        {/* Wave divider */}
        <div className="w-full overflow-hidden leading-none">
          <svg viewBox="0 0 1200 60" preserveAspectRatio="none" className="w-full" style={{ height: "60px", display: "block" }}>
            <path d="M0,40 C300,0 900,60 1200,20 L1200,60 L0,60 Z" fill="#fff8f1" />
          </svg>
        </div>

        {/* ══ SECTION 3: Product Categories Showcase ══ */}
        <div style={{ background: "#fff8f1" }}>
          <FeaturedCategoriesSection />
        </div>

        {/* Wave divider */}
        <div className="w-full overflow-hidden leading-none">
          <svg viewBox="0 0 1200 60" preserveAspectRatio="none" className="w-full" style={{ height: "60px", display: "block" }}>
            <path d="M0,20 C300,60 900,0 1200,40 L1200,60 L0,60 Z" fill="#EAE2D1" />
          </svg>
        </div>

        {/* ══ SECTION 4: Best Sellers / Featured Products ══ */}
        <section style={{ background: "#EAE2D1" }} className="py-20 px-6 overflow-hidden">
          <div className="max-w-5xl mx-auto mb-10">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div>
                <span style={{ fontFamily: "'Dancing Script', cursive", fontSize: "20px", color: "#b22a2b", display: "block", marginBottom: "6px" }}>
                  Bestsellers
                </span>
                <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(24px,3.5vw,36px)", fontWeight: 600, color: "#434b01" }}>
                  Most Loved Products
                </h2>
              </div>
              <Link
                href="/products"
                className="hover:text-[#b22a2b] transition-colors"
                style={{ fontFamily: "'Inter', sans-serif", fontSize: "12px", fontWeight: 600, color: "#434b01", letterSpacing: "0.1em", textDecoration: "none", whiteSpace: "nowrap" }}
              >
                VIEW ALL PRODUCTS →
              </Link>
            </div>
          </div>

          <div className="w-full">
            <BestSellersCarousel productsList={productsList} />
          </div>
        </section>

        {/* Wave */}
        <div className="w-full overflow-hidden leading-none">
          <svg viewBox="0 0 1200 60" preserveAspectRatio="none" className="w-full" style={{ height: "60px", display: "block" }}>
            <path d="M0,40 C300,0 900,60 1200,20 L1200,60 L0,60 Z" fill="#fff8f1" />
          </svg>
        </div>

        {/* ══ SECTION 5: Why Choose Us — Trust Cards ══ */}
        <section className="py-20 px-6" style={{ background: "#fff8f1" }}>
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-14">
              <span style={{ fontFamily: "'Dancing Script', cursive", fontSize: "20px", color: "#b22a2b", display: "block", marginBottom: "8px" }}>
                Our Promise
              </span>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(26px,3.5vw,40px)", fontWeight: 600, color: "#434b01", marginBottom: "12px" }}>
                Why Choose AL-HAYAT
              </h2>
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "15px", color: "#47483a", maxWidth: "480px", margin: "0 auto", lineHeight: 1.7 }}>
                Every formulation is made with a commitment to purity, efficacy and care for your skin.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {TRUST_ITEMS.map((item) => (
                <div
                  key={item.title}
                  className="flex flex-col items-start p-6 rounded-2xl hover:-translate-y-1 transition-transform duration-300"
                  style={{ background: "#EAE2D1", boxShadow: "0 4px 20px rgba(0,0,0,0.04)" }}
                >
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 text-2xl"
                    style={{ background: "#fff8f1" }}
                  >
                    {item.icon}
                  </div>
                  <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: "17px", fontWeight: 600, color: "#434b01", marginBottom: "8px" }}>
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

        {/* ══ SECTION 6: Statistics Band ══ */}
        <section className="py-14 px-6" style={{ background: "#434b01" }}>
          <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {STATS.map((s) => (
              <div key={s.label}>
                <div
                  style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(28px,4vw,48px)", fontWeight: 700, color: "#fff8f1", marginBottom: "4px" }}
                >
                  {s.value}
                </div>
                <div style={{ fontFamily: "'Inter', sans-serif", fontSize: "12px", color: "rgba(255,248,241,0.65)", letterSpacing: "0.08em", textTransform: "uppercase" }}>
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ══ SECTION 7: Testimonials ══ */}
        <section className="py-20 px-6" style={{ background: "#faf3ea" }}>
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-14">
              <span style={{ fontFamily: "'Dancing Script', cursive", fontSize: "20px", color: "#b22a2b", display: "block", marginBottom: "8px" }}>
                Real Stories
              </span>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(26px,3.5vw,40px)", fontWeight: 600, color: "#434b01", marginBottom: "12px" }}>
                What Our Customers Say
              </h2>
            </div>

            {/* Desktop: 3 cards visible */}
            <div className="hidden md:grid grid-cols-3 gap-6">
              {TESTIMONIALS.slice(0, 3).map((t, i) => (
                <div
                  key={i}
                  className="flex flex-col p-6 rounded-2xl"
                  style={{
                    background: "rgba(255,248,241,0.85)",
                    backdropFilter: "blur(10px)",
                    boxShadow: "0 8px 32px rgba(0,0,0,0.08)",
                    border: "1px solid rgba(200,199,181,0.4)",
                  }}
                >
                  <div className="flex mb-3">
                    {Array.from({ length: t.rating }).map((_, si) => (
                      <span key={si} style={{ color: "#b22a2b", fontSize: "14px" }}>★</span>
                    ))}
                  </div>
                  <p style={{ fontFamily: "'Playfair Display', serif", fontStyle: "italic", fontSize: "14px", color: "#47483a", lineHeight: 1.7, flex: 1, marginBottom: "16px" }}>
                    &ldquo;{t.text}&rdquo;
                  </p>
                  <div>
                    <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "13px", fontWeight: 600, color: "#434b01" }}>{t.name}</p>
                    <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "11px", color: "#787868" }}>{t.location} · {t.product}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Mobile: single card carousel */}
            <div className="md:hidden">
              <div
                className="p-6 rounded-2xl"
                style={{
                  background: "rgba(255,248,241,0.9)",
                  boxShadow: "0 8px 32px rgba(0,0,0,0.08)",
                  border: "1px solid rgba(200,199,181,0.4)",
                }}
              >
                <div className="flex mb-3">
                  {Array.from({ length: TESTIMONIALS[activeTestimonial].rating }).map((_, si) => (
                    <span key={si} style={{ color: "#b22a2b", fontSize: "14px" }}>★</span>
                  ))}
                </div>
                <p style={{ fontFamily: "'Playfair Display', serif", fontStyle: "italic", fontSize: "15px", color: "#47483a", lineHeight: 1.7, marginBottom: "16px" }}>
                  &ldquo;{TESTIMONIALS[activeTestimonial].text}&rdquo;
                </p>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "13px", fontWeight: 600, color: "#434b01" }}>
                  {TESTIMONIALS[activeTestimonial].name}
                </p>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "11px", color: "#787868" }}>
                  {TESTIMONIALS[activeTestimonial].location} · {TESTIMONIALS[activeTestimonial].product}
                </p>
              </div>

              {/* Dots */}
              <div className="flex justify-center gap-2 mt-5">
                {TESTIMONIALS.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveTestimonial(i)}
                    className="rounded-full transition-all duration-300"
                    style={{
                      width: i === activeTestimonial ? "20px" : "8px",
                      height: "8px",
                      background: i === activeTestimonial ? "#b22a2b" : "rgba(200,199,181,0.6)",
                    }}
                    aria-label={`Testimonial ${i + 1}`}
                  />
                ))}
              </div>
            </div>

            <div className="text-center mt-10">
              <Link
                href="/reviews"
                className="inline-flex items-center gap-2 hover:text-[#b22a2b] transition-colors"
                style={{ fontFamily: "'Inter', sans-serif", fontSize: "12px", fontWeight: 600, color: "#434b01", letterSpacing: "0.1em", textDecoration: "none" }}
              >
                READ ALL REVIEWS →
              </Link>
            </div>
          </div>
        </section>

        {/* ══ SECTION 8: FAQ ══ */}
        <section className="py-20 px-6" style={{ background: "#fff8f1" }}>
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <span style={{ fontFamily: "'Dancing Script', cursive", fontSize: "20px", color: "#b22a2b", display: "block", marginBottom: "8px" }}>
                Questions?
              </span>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(26px,3.5vw,40px)", fontWeight: 600, color: "#434b01" }}>
                Frequently Asked Questions
              </h2>
            </div>

            <div>
              {FAQS.map((faq, i) => (
                <FAQItem key={i} q={faq.q} a={faq.a} />
              ))}
            </div>
          </div>
        </section>

        {/* ══ SECTION 9: Final CTA — Final Bloom ══ */}
        <section
          className="relative py-24 px-6 overflow-hidden"
          style={{
            background: "linear-gradient(135deg, #434b01 0%, #5c6601 50%, #6d7a02 100%)",
          }}
        >
          {/* Decorative botanical elements */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
            <div
              className="absolute top-0 right-0 w-80 h-80 rounded-full"
              style={{ background: "rgba(255,248,241,0.04)", transform: "translate(30%, -30%)" }}
            />
            <div
              className="absolute bottom-0 left-0 w-60 h-60 rounded-full"
              style={{ background: "rgba(255,248,241,0.04)", transform: "translate(-30%, 30%)" }}
            />
          </div>

          <div className="relative z-10 max-w-3xl mx-auto text-center">
            <span
              style={{ fontFamily: "'Dancing Script', cursive", fontSize: "24px", color: "rgba(255,248,241,0.7)", display: "block", marginBottom: "14px" }}
            >
              Begin Your Journey
            </span>
            <h2
              style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(30px,5vw,56px)", fontWeight: 700, color: "#fff8f1", lineHeight: 1.15, marginBottom: "20px" }}
            >
              Nature&apos;s Finest.<br />Crafted For You.
            </h2>
            <p
              style={{ fontFamily: "'Inter', sans-serif", fontSize: "16px", color: "rgba(255,248,241,0.75)", maxWidth: "480px", margin: "0 auto 36px", lineHeight: 1.7 }}
            >
              Begin your natural skincare journey today. Every product is handcrafted with love, delivered with care.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              {/* Primary CTA */}
              <a
                href={waLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 px-8 py-4 rounded-full text-white hover:scale-105 transition-all duration-300"
                style={{
                  background: "#25D366",
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "14px",
                  fontWeight: 700,
                  letterSpacing: "0.06em",
                  boxShadow: "0 6px 24px rgba(37,211,102,0.45)",
                  textDecoration: "none",
                }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                Order on WhatsApp
              </a>

              {/* Secondary CTA */}
              <Link
                href="/products"
                className="px-8 py-4 rounded-full border border-white/40 text-white hover:bg-white/10 transition-all duration-300"
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "13px",
                  fontWeight: 600,
                  letterSpacing: "0.08em",
                  textDecoration: "none",
                }}
              >
                Browse Products
              </Link>

              <Link
                href="/ingredients"
                className="px-8 py-4 rounded-full border border-white/40 text-white hover:bg-white/10 transition-all duration-300"
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "13px",
                  fontWeight: 600,
                  letterSpacing: "0.08em",
                  textDecoration: "none",
                }}
              >
                Learn About Ingredients
              </Link>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
