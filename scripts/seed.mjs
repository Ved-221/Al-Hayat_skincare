import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

// Load environment variables
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, "../.env.local") });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error("Error: Supabase environment variables not found in .env.local");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

const PRODUCTS = [
  {
    name: "Herbal Hair Oil",
    category: "Hair Care",
    desc: "Organic herbal hair oil that deeply nourishes scalp & hair, reduces hair fall, and promotes lush growth.",
    price: "₹499",
    price_original: "₹999",
    discount: "50% OFF",
    badge: "BEST SELLER",
    ingredients: ["Amla", "Coconut", "Hibiscus", "Organic Herbs"],
    benefit: "Nourishes scalp & hair",
    img: "/products/herbal-hair-oil.png",
    slug: "herbal-hair-oil",
    suitable_for: "All hair types",
    tagline: "Formulated by Dr. Farheen for strong, thick, and lustrous hair.",
    detailed_ingredients: [
      { name: "Amla Fruit Extract", desc: "Rich in Vitamin C and antioxidants to strengthen hair roots." },
      { name: "Cold-Pressed Coconut Oil", desc: "Penetrates deep into hair shafts to prevent protein loss." },
      { name: "Hibiscus Petal Extract", desc: "Nourishes follicles and adds a natural silky shine." }
    ],
    detailed_benefits: [
      { icon: "spa", title: "Scalp Nourishment", sub: "Deeply hydrates dry and itchy scalps." },
      { icon: "water_drop", title: "Root Strengthening", sub: "Reduces breakage and fortifies strands." },
      { icon: "psychiatry", title: "Traditional Recipe", sub: "Crafted with age-old botanical wisdom." },
      { icon: "verified_user", title: "100% Organic", sub: "Free from mineral oil and synthetic additives." }
    ],
    ritual: [
      { icon: "water_drop", step: "1. Apply", desc: "Warm a small amount and apply gently to the scalp and hair roots." },
      { icon: "front_hand", step: "2. Massage", desc: "Massage in circular motions for 5-10 minutes to boost circulation." },
      { icon: "clear_all", step: "3. Wash", desc: "Leave on for at least 2 hours or overnight, then wash with Al-Hayat shampoo." }
    ]
  },
  {
    name: "Herbal Shampoo",
    category: "Hair Care",
    desc: "A gentle cleansing herbal shampoo powered by natural botanical extracts to nourish and condition hair.",
    price: "₹200",
    price_original: "₹399",
    discount: "50% OFF",
    badge: "BEST SELLER",
    ingredients: ["Shikakai", "Reetha", "Amla", "Herbal Blend"],
    benefit: "Gentle cleansing & nourishment",
    img: "/products/shampoo.png",
    slug: "herbal-shampoo",
    suitable_for: "All hair types",
    tagline: "A sulphate-free daily cleanser for naturally soft and healthy hair.",
    detailed_ingredients: [
      { name: "Reetha (Soapnut)", desc: "Natural cleansing agent that gently lifts dirt without stripping oils." },
      { name: "Shikakai", desc: "Naturally detangles hair and restores healthy shine." },
      { name: "Amla Extract", desc: "Strengthens follicles and adds body and volume." }
    ],
    detailed_benefits: [
      { icon: "spa", title: "Gentle Cleansing", sub: "Sulphate-free formula suitable for sensitive scalps." },
      { icon: "water_drop", title: "Moisturizing Cleanse", sub: "Leaves hair hydrated, soft, and bouncy." },
      { icon: "psychiatry", title: "Herb-Infused", sub: "Natural botanical recipe for hair vitality." },
      { icon: "verified_user", title: "Color Safe", sub: "Gentle enough for chemically treated hair." }
    ],
    ritual: [
      { icon: "water_drop", step: "1. Wet", desc: "Thoroughly wet your hair and scalp with lukewarm water." },
      { icon: "front_hand", step: "2. Lather", desc: "Apply a small amount, lather gently, and massage onto the scalp." },
      { icon: "clear_all", step: "3. Rinse", desc: "Rinse completely. Follow with Al-Hayat hair oil for deep hydration." }
    ]
  },
  {
    name: "Deo Shield Herbal Soap",
    category: "Handmade Soaps",
    desc: "A purifying, deodorizing handmade soap powered by fresh Lemon and cooling Mint extracts.",
    price: "₹150",
    price_original: "₹299",
    discount: "50% OFF",
    badge: "FRESHNESS",
    ingredients: ["Lemon", "Mint", "Sandalwood", "Coconut Oil"],
    benefit: "Freshness, deodorizing, daily cleansing",
    img: "/products/soap.png",
    slug: "deo-shield-herbal-soap",
    suitable_for: "All skin types",
    tagline: "Start your day with the revitalizing shield of Lemon & Mint.",
    detailed_ingredients: [
      { name: "Lemon Oil", desc: "Natural astringent and deodorizer that brightens skin." },
      { name: "Peppermint Extract", desc: "Provides an instant cooling sensation and fights bacteria." },
      { name: "Sandalwood Extract", desc: "Calms skin irritation and leaves a beautiful warm fragrance." }
    ],
    detailed_benefits: [
      { icon: "spa", title: "Deodorizing Shield", sub: "Natural odor protection that lasts all day." },
      { icon: "water_drop", title: "Invigorating Cleanse", sub: "Refreshes and wakes up tired skin." },
      { icon: "psychiatry", title: "Handcrafted Luxury", sub: "Cold-processed in small batches to preserve potency." },
      { icon: "verified_user", title: "Anti-Bacterial", sub: "Helps wash away germs and impurities naturally." }
    ],
    ritual: [
      { icon: "water_drop", step: "1. Lather", desc: "Rub the soap between wet hands to create a rich, creamy lather." },
      { icon: "front_hand", step: "2. Apply", desc: "Massage the lather onto your body, focusing on high-perspiration areas." },
      { icon: "clear_all", step: "3. Rinse", desc: "Rinse off thoroughly with water and pat dry." }
    ]
  },
  {
    name: "Watermelon Soap",
    category: "Handmade Soaps",
    desc: "A cooling and hydrating handmade soap infused with pure watermelon extract to revive tired skin.",
    price: "₹100",
    price_original: "₹199",
    discount: "50% OFF",
    badge: "HYDRATING",
    ingredients: ["Watermelon Extract", "Aloe Vera", "Coconut Oil"],
    benefit: "Hydrating, cooling, reviving",
    img: "/products/watermelon-soap.png",
    slug: "watermelon-soap",
    suitable_for: "All skin types",
    tagline: "Indulge in a splash of cooling hydration and fruity freshness.",
    detailed_ingredients: [
      { name: "Watermelon Juice Extract", desc: "Packed with lycopene and amino acids to hydrate and soothe." },
      { name: "Aloe Vera Gel", desc: "Moisturizes skin and calms redness or sun irritation." },
      { name: "Coconut Oil Base", desc: "Provides a rich, skin-softening lather." }
    ],
    detailed_benefits: [
      { icon: "spa", title: "Intense Hydration", sub: "Prevents skin from feeling dry or tight after washing." },
      { icon: "water_drop", title: "Cooling & Reviving", sub: "Perfect for refreshing skin after hot days." },
      { icon: "psychiatry", title: "Vibrant Skin", sub: "Boosts skin elasticity and natural radiance." },
      { icon: "verified_user", title: "Eco-Friendly", sub: "Biodegradable, natural ingredients only." }
    ],
    ritual: [
      { icon: "water_drop", step: "1. Wet", desc: "Wet your skin and the soap bar under warm or cool water." },
      { icon: "front_hand", step: "2. Smooth", desc: "Gently glide the soap over your body to form a rich bubble mask." },
      { icon: "clear_all", step: "3. Rinse", desc: "Rinse away for clean, plump, and hydrated skin." }
    ]
  },
  {
    name: "Rice Lemon Rose Soap",
    category: "Handmade Soaps",
    desc: "A brightening face and body soap made with finely ground rice, clarifying lemon, and nourishing rose.",
    price: "₹150",
    price_original: "₹299",
    discount: "50% OFF",
    badge: "BRIGHTENING",
    ingredients: ["Rice", "Lemon", "Rose", "Coconut Oil"],
    benefit: "Brightens and refreshes skin",
    img: "/products/ricelemon-soap.png",
    slug: "rice-lemon-rose-soap",
    suitable_for: "All skin types",
    tagline: "Brighten your face and body with the traditional power of Rice & Rose.",
    detailed_ingredients: [
      { name: "Rice Powder", desc: "Exfoliates gently to polish skin texture and unclog pores." },
      { name: "Lemon Oil", desc: "Helps fade dark spots and evens skin tone." },
      { name: "Rose Extract", desc: "Tones the skin and adds a premium, soothing aroma." }
    ],
    detailed_benefits: [
      { icon: "spa", title: "Gentle Exfoliation", sub: "Removes dead skin cells for a smooth feel." },
      { icon: "water_drop", title: "Skin Brightening", sub: "Gives a radiant, even-toned complexion." },
      { icon: "psychiatry", title: "Heritage Care", sub: "Inspired by ancient Asian beauty secrets." },
      { icon: "verified_user", title: "Dual Purpose", sub: "Gentle enough for the face, nourishing for the body." }
    ],
    ritual: [
      { icon: "water_drop", step: "1. Lather", desc: "Create a creamy foam with water and the soap bar." },
      { icon: "front_hand", step: "2. Massage", desc: "Apply to face and body, massaging gently in circular motions." },
      { icon: "clear_all", step: "3. Wash Off", desc: "Rinse off with cool water to lock in the brightened glow." }
    ]
  },
  {
    name: "Herbal Neem Soap",
    category: "Handmade Soaps",
    desc: "An anti-acne herbal soap crafted with neem, aloe vera, tulsi, and tea tree oil to purify acne-prone skin.",
    price: "₹100",
    price_original: "₹199",
    discount: "50% OFF",
    badge: "DOCTOR'S CHOICE",
    ingredients: ["Neem", "Aloe Vera", "Tulsi", "Tea Tree Oil"],
    benefit: "Controls oil, reduces pimples",
    img: "/products/baby-soap.png",
    slug: "herbal-neem-soap",
    suitable_for: "Oily/acne-prone skin",
    tagline: "Reclaim clear, calm, and blemish-free skin with Neem & Tea Tree.",
    detailed_ingredients: [
      { name: "Neem Leaf Extract", desc: "Potent antibacterial herb that targets acne-causing germs." },
      { name: "Tea Tree Essential Oil", desc: "Helps regulate excess oil production and clear blemishes." },
      { name: "Aloe Vera & Tulsi", desc: "Soothes skin inflammation and reduces redness." }
    ],
    detailed_benefits: [
      { icon: "spa", title: "Acne Control", sub: "Visibly reduces pimples and stops future breakouts." },
      { icon: "water_drop", title: "Oil Balancing", sub: "Removes excess sebum without over-drying." },
      { icon: "psychiatry", title: "Soothes Redness", sub: "Calms irritated, inflamed, or itchy skin." },
      { icon: "verified_user", title: "Doctor Formulated", sub: "Scientifically balanced herbal recipe for clear skin." }
    ],
    ritual: [
      { icon: "water_drop", step: "1. Foam", desc: "Wet the bar and create a thick, disinfecting lather." },
      { icon: "front_hand", step: "2. Wash", desc: "Massage onto oily and acne-prone areas for 30-60 seconds." },
      { icon: "clear_all", step: "3. Dry", desc: "Rinse completely and pat dry with a clean towel." }
    ]
  },
  {
    name: "Summer Cooling Hair Oil",
    category: "Hair Care",
    desc: "A cooling herbal hair oil with a base of fresh coconut oil and cooling herbs to soothe and refresh the scalp.",
    price: "₹499",
    price_original: "₹999",
    discount: "50% OFF",
    badge: "COOLING EFFECT",
    ingredients: ["Coconut Oil", "Cooling Herbs", "Mint", "Amla"],
    benefit: "Refreshes scalp",
    img: "/products/hair-oil.png",
    slug: "summer-cooling-hair-oil",
    suitable_for: "All hair types",
    tagline: "Chill your mind and scalp with our premium cooling oil.",
    detailed_ingredients: [
      { name: "Coconut Oil", desc: "Lightweight base that conditions and protects hair strands." },
      { name: "Cooling Herbal Blend", desc: "A proprietary mix of calming botanicals for stress relief." },
      { name: "Mint Oil", desc: "Delivers an instant refreshing chill to the scalp." }
    ],
    detailed_benefits: [
      { icon: "spa", title: "Scalp Cooling", sub: "Reduces head heat and provides deep relaxation." },
      { icon: "water_drop", title: "Stress Relief", sub: "Calms your senses and helps improve sleep quality." },
      { icon: "psychiatry", title: "Nourishes Roots", sub: "Keeps hair follicles healthy and hydrated during summer." },
      { icon: "verified_user", title: "Non-Greasy", sub: "Absorbs comfortably without heavy residue." }
    ],
    ritual: [
      { icon: "water_drop", step: "1. Cool", desc: "Pour oil onto your palms and apply evenly over your scalp." },
      { icon: "front_hand", step: "2. Press", desc: "Gently press and massage the scalp to experience the cooling relief." },
      { icon: "clear_all", step: "3. Rest", desc: "Leave on for 1-2 hours before washing or keep it overnight." }
    ]
  },
  {
    name: "Rice Rose Hip Face Wash",
    category: "Face Care",
    desc: "A gentle, clarifying daily cleanser that harnesses the traditional brightening power of rice and rejuvenating rose hip.",
    price: "₹149",
    price_original: "₹299",
    discount: "50% OFF",
    badge: "DOCTOR'S CHOICE",
    ingredients: ["Rice Extract", "Rose Hip Oil", "Aloe Vera"],
    benefit: "Cleanse & refresh",
    img: "/products/facewash.png",
    slug: "rice-rose-hip-face-wash",
    suitable_for: "All skin types",
    tagline: "Formulated by Dr. Farheen for a luminous, heritage-inspired cleanse.",
    detailed_ingredients: [
      { name: "Milled Rice Powder", desc: "Gently buffs away dead skin cells and tightens pores." },
      { name: "Rose Hip Oil", desc: "Rich in Vitamin A and C to regenerate skin and improve tone." },
      { name: "Aloe Barbadensis Gel", desc: "Soothes skin and prevents dryness." }
    ],
    detailed_benefits: [
      { icon: "spa", title: "Gentle Exfoliation", sub: "Rice enzymes smooth and polish skin texture." },
      { icon: "water_drop", title: "Deep Hydration", sub: "Rose hip oil nourishes and softens skin." },
      { icon: "psychiatry", title: "Ayurvedic Precision", sub: "A perfect blend of heritage and modern care." },
      { icon: "verified_user", title: "Sulphate Free", sub: "Safe for sensitive skin and everyday use." }
    ],
    ritual: [
      { icon: "water_drop", step: "1. Dampen", desc: "Splash face with lukewarm water to prepare your skin." },
      { icon: "front_hand", step: "2. Massage", desc: "Apply a small amount and massage in gentle upward circles." },
      { icon: "clear_all", step: "3. Rinse", desc: "Rinse thoroughly and pat dry. Follow with Al-Hayat cream." }
    ]
  },
  {
    name: "Skin Brightening Face Wash",
    category: "Face Care",
    desc: "A brightening face wash infused with saffron, turmeric, manjistha, and sandalwood for a visible, radiant glow.",
    price: "₹170",
    price_original: "₹340",
    discount: "50% OFF",
    badge: "RADIANCE",
    ingredients: ["Manjistha", "Sandalwood", "Saffron", "Turmeric"],
    benefit: "Visible glow",
    img: "/products/facewash2.png",
    slug: "skin-brightening-face-wash",
    suitable_for: "All skin types",
    tagline: "Unveil a radiant, glowing complexion with Manjistha & Sandalwood.",
    detailed_ingredients: [
      { name: "Manjistha Extract", desc: "Purifies skin, fights blemishes, and evens out complexion." },
      { name: "Pure Sandalwood Oil", desc: "Cools skin and fades hyperpigmentation and dark spots." },
      { name: "Saffron & Turmeric", desc: "Traditional skin brighteners that offer antioxidant benefits." }
    ],
    detailed_benefits: [
      { icon: "spa", title: "Hyperpigmentation Care", sub: "Fades dark spots, sun tan, and patches." },
      { icon: "water_drop", title: "Antioxidant Glow", sub: "Saffron and turmeric give a premium golden glow." },
      { icon: "psychiatry", title: "Deep Clarifying", sub: "Removes deep-seated dirt and toxins from pores." },
      { icon: "verified_user", title: "No Harsh Chemicals", sub: "100% natural foaming base, paraben free." }
    ],
    ritual: [
      { icon: "water_drop", step: "1. Wet", desc: "Wet your face and neck with cool water." },
      { icon: "front_hand", step: "2. Lather", desc: "Squeeze a coin-sized amount, build lather, and massage skin." },
      { icon: "clear_all", step: "3. Glow", desc: "Rinse completely and feel the instant herbal freshness." }
    ]
  },
  {
    name: "Beetroot & Hibiscus Face Wash",
    category: "Face Care",
    desc: "A hydrating, nutrient-rich face wash featuring beetroot and hibiscus to leave skin plump, youthful, and rosy.",
    price: "₹120",
    price_original: "₹240",
    discount: "50% OFF",
    badge: "YOUTH GLOW",
    ingredients: ["Beetroot Extract", "Hibiscus Extract", "Rose Water"],
    benefit: "Youthful looking skin",
    img: "/products/hibuscuss_beetroot-facewash.png",
    slug: "beetroot-hibiscus-face-wash",
    suitable_for: "All skin types",
    tagline: "Nourish your skin with the vitamin-rich combination of Beetroot & Hibiscus.",
    detailed_ingredients: [
      { name: "Beetroot Extract", desc: "Packed with Vitamin C to support skin brightness and rosy tone." },
      { name: "Hibiscus Extract", desc: "Rich in AHA acids to support natural cell renewal." },
      { name: "Pure Rose Water", desc: "Hydrates, tones, and tightens pores naturally." }
    ],
    detailed_benefits: [
      { icon: "spa", title: "Collagen Support", sub: "Hibiscus helps firm and tone skin naturally." },
      { icon: "water_drop", title: "Dewy Hydration", sub: "Beetroot keeps the skin barrier plump and moist." },
      { icon: "psychiatry", title: "Rose Glow", sub: "Restores a fresh, youthful, and naturally flushed look." },
      { icon: "verified_user", title: "pH Balanced", sub: "Maintains your skin's natural acidic mantle." }
    ],
    ritual: [
      { icon: "water_drop", step: "1. Splash", desc: "Splash your face with water to prep the skin." },
      { icon: "front_hand", step: "2. Cleanse", desc: "Massage the face wash over your cheeks, nose, and forehead." },
      { icon: "clear_all", step: "3. Revive", desc: "Wash off and pat dry to reveal soft, rosy, hydrated skin." }
    ]
  },
  {
    name: "Strawberry Lip Balm",
    category: "Lip Care",
    desc: "A deeply moisturizing natural lip balm infused with strawberry extract and beeswax to protect and hydrate dry lips.",
    price: "₹150",
    price_original: "₹299",
    discount: "50% OFF",
    badge: "MOISTURIZING",
    ingredients: ["Strawberry Extract", "Beeswax", "Shea Butter", "Almond Oil"],
    benefit: "Moisturizes lips",
    img: "/products/strawberry_lipbalm.png",
    slug: "strawberry-lip-balm",
    suitable_for: "All skin types",
    tagline: "Lock in juicy strawberry moisture and protect against chapping.",
    detailed_ingredients: [
      { name: "Strawberry Extract", desc: "Provides natural antioxidants and a delicious fruity aroma." },
      { name: "Pure Beeswax", desc: "Creates a breathable barrier to lock in essential moisture." },
      { name: "Shea Butter & Almond Oil", desc: "Deeply repairs chapped lips and makes them smooth." }
    ],
    detailed_benefits: [
      { icon: "spa", title: "Deep Hydration", sub: "Instantly heals dry, rough, or cracked lips." },
      { icon: "water_drop", title: "Glossy Protection", sub: "Adds a subtle healthy shine and long-lasting barrier." },
      { icon: "psychiatry", title: "Rich in Vitamins", sub: "Nourishes lips with Vitamin C and E from nature." },
      { icon: "verified_user", title: "100% Edible-Grade", sub: "Formulated without synthetic petrolatum or paraffin." }
    ],
    ritual: [
      { icon: "water_drop", step: "1. Scoop", desc: "Use your fingertip to scoop a small quantity of balm." },
      { icon: "front_hand", step: "2. Apply", desc: "Smooth evenly over clean lips as often as needed." },
      { icon: "clear_all", step: "3. Night Mask", desc: "Apply a thicker layer before sleep to wake up with baby-soft lips." }
    ]
  },
  {
    name: "Beetroot Lip Balm",
    category: "Lip Care",
    desc: "A softening, natural lip balm formulated with beetroot juice to restore pinkness and hydrate dry lips.",
    price: "₹150",
    price_original: "₹299",
    discount: "50% OFF",
    badge: "SOFTENING",
    ingredients: ["Beetroot Juice", "Beeswax", "Cocoa Butter", "Coconut Oil"],
    benefit: "Softens lips",
    img: "/products/beetroot-lipbalm.png",
    slug: "beetroot-lip-balm",
    suitable_for: "All skin types",
    tagline: "Add a natural rosy tint and supreme softness to your lips.",
    detailed_ingredients: [
      { name: "Beetroot Extract", desc: "Imparts a beautiful natural pink tint and fades lip darkness." },
      { name: "Cocoa Butter", desc: "Melts on the lips to provide rich, creamy moisture." },
      { name: "Coconut Oil Base", desc: "Nourishes and keeps lips soft and conditioned all day." }
    ],
    detailed_benefits: [
      { icon: "spa", title: "Natural Pink Tint", sub: "Gives lips a healthy, beautiful rosy glow without makeup." },
      { icon: "water_drop", title: "Lip Softening", sub: "Restores elasticity and smoothness to chapped lips." },
      { icon: "psychiatry", title: "Hyperpigmentation Care", sub: "Helps lighten dark patches caused by dryness or sun." },
      { icon: "verified_user", title: "Chemical Free", sub: "Free from artificial colors, dyes, and petroleum jellies." }
    ],
    ritual: [
      { icon: "water_drop", step: "1. Dab", desc: "Press your clean fingertip into the rich lip balm." },
      { icon: "front_hand", step: "2. Glide", desc: "Spread smoothly across upper and lower lips." },
      { icon: "clear_all", step: "3. Reapply", desc: "Use throughout the day for continuous hydration and natural color." }
    ]
  }
];

async function seed() {
  console.log("Starting database seeding for products...");
  
  for (const product of PRODUCTS) {
    console.log(`Inserting ${product.name}...`);
    const { error } = await supabase
      .from("products")
      .upsert(product, { onConflict: "slug" });

    if (error) {
      console.error(`Failed to insert ${product.name}:`, error.message);
    } else {
      console.log(`Successfully seeded ${product.name}`);
    }
  }

  console.log("Seeding process finished!");
}

seed();
