# Product Requirements Document (PRD)

# AL-HAYAT by Dr. Farheen
## Immersive Premium Herbal Skincare & Haircare Experience

**Version:** 2.0

**Prepared for:** Cursor / Antigravity Development

**Prepared by:** Ved

**Date:** June 2026

---

# 1. Project Vision

AL-HAYAT by Dr. Farheen is a premium herbal skincare and haircare brand that combines traditional herbal ingredients with handcrafted formulations to create high-quality personal care products.

The goal of this project is **not** to build a conventional e-commerce website.

Instead, the website should feel like an immersive cinematic experience where users naturally discover the brand before discovering the products.

Rather than presenting products inside static sections, every scroll should tell a story.

The experience begins with nature awakening.

Flowers bloom.

Leaves sway.

Light filters through the environment.

Ingredients emerge naturally.

Only after users understand the ingredients should the products reveal themselves.

The journey should create the feeling that every product has been born from nature itself.

The experience should feel similar to premium product launches such as Apple, Dior, Aesop and luxury cosmetic campaigns where storytelling comes before selling.

The website should guide visitors through one continuous scroll-based narrative rather than multiple disconnected website sections.

---

# 2. Experience Vision

The entire homepage should behave as one continuous animated timeline.

Users should never feel that they are entering separate pages.

Instead, the camera should feel fixed while the world evolves around them.

The website should create a sense of curiosity, calmness and discovery.

Every transition should feel intentional.

Nothing should suddenly appear.

Everything should naturally grow, bloom, dissolve or transform.

The overall emotional progression should be:

Nature awakens

↓

Curiosity begins

↓

Ingredients are discovered

↓

Nature transforms

↓

Products emerge

↓

Trust is established

↓

Customers share experiences

↓

The journey concludes with a cinematic call-to-action.

---

# 3. Core Design Principles

## Story Before Commerce

The website should educate and emotionally engage users before introducing products.

Products should feel like the natural result of the journey rather than the first thing users see.

---

## Continuous Scroll Experience

The homepage should behave as one long cinematic animation.

Transitions should seamlessly blend into one another.

Avoid obvious section breaks.

The user should experience a continuous flow rather than scrolling through stacked content blocks.

---

## Nature First

Natural ingredients are the heroes.

Flowers, herbs, leaves, petals, sunlight, flowing liquids and botanical illustrations should guide the experience.

Products are introduced only after users understand the ingredients.

---

## Premium Editorial Design

Layouts should resemble luxury skincare campaigns.

Use large typography.

Generous spacing.

Minimal UI.

Elegant photography.

Immersive compositions.

Avoid clutter.

---

## Motion as Storytelling

Animations should always communicate purpose.

Every movement should explain the story.

Examples:

• Flowers bloom because nature awakens.

• Leaves move because wind flows.

• Ingredients dissolve because they transform into products.

Avoid decorative animations that do not contribute to storytelling.

---

# 4. Visual Direction

Instead of relying on the existing AL-HAYAT branding colors, the website should adopt the visual language of the provided reference artwork.

The supplied concept image serves as the primary source of inspiration for colors, lighting, composition and atmosphere.

The website should feel bright, premium, organic and luxurious.

Visual characteristics include:

- Warm cream backgrounds
- Botanical greens
- Soft blush pinks
- Floral gradients
- Golden sunlight
- Glass reflections
- Bloom lighting
- Floating particles
- Organic curves
- Layered botanical illustrations
- Elegant editorial layouts
- Soft shadows
- Premium skincare photography

The existing AL-HAYAT logo and products remain unchanged.

Only the website's visual atmosphere should follow the reference artwork.

---

# 5. User Journey

The homepage should follow one continuous cinematic narrative.

Nature Awakens

↓

The Botanical World

↓

Ingredient Discovery

↓

Ingredient Transformation

↓

Product Reveal

↓

Benefits & Trust

↓

Testimonials

↓

Final Bloom

↓

Order on WhatsApp

Every chapter should smoothly transition into the next without abrupt section changes.

---

# 6. Success Criteria

| Goal | Success Metric |
|------|----------------|
| Premium Brand Perception | Website feels comparable to luxury cosmetic brands rather than traditional ecommerce stores |
| Storytelling | Users experience a continuous narrative from herbs to products |
| Scroll Performance | Stable 60 FPS animations on modern desktop and mid-range mobile devices |
| Mobile Optimization | Lighthouse Mobile Performance above 80 |
| Desktop Performance | Lighthouse Desktop Performance above 90 |
| Accessibility | Full support for reduced-motion users and keyboard navigation |
| WhatsApp Conversion | Every product page and homepage contains optimized WhatsApp ordering CTAs |
| SEO | Fully server-rendered pages with metadata and structured data |

---

# 7. Target Audience

Primary Audience

- Indian premium skincare buyers
- Herbal skincare enthusiasts
- Mobile-first users
- Instagram traffic
- WhatsApp-first customers

Secondary Audience

- Gift buyers
- Existing offline customers
- Premium beauty enthusiasts
- Organic skincare buyers

---

# 8. Technology Stack

The project should be built using modern frontend technologies optimized for immersive storytelling.

| Layer | Technology |
|---------|-------------|
| Framework | Next.js 15 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS v4 |
| Component Architecture | React Server Components |
| Animation Engine | GSAP |
| Scroll Animation | GSAP ScrollTrigger |
| Smooth Scrolling | Lenis |
| Micro Interactions | Framer Motion |
| Optional 3D Experiences | Three.js + React Three Fiber |
| Icons | Lucide React |
| Image Optimization | Next/Image with AVIF and WebP |
| Fonts | Playfair Display + Inter |
| State Management | React Context (Zustand if required) |
| Forms | Resend / Formspree |
| Analytics | Google Analytics 4 |
| Deployment | Vercel |
| Version Control | Git + GitHub |
| Development Environment | Cursor + Antigravity |
| Package Manager | pnpm |

---

# 9. Development Philosophy

The website should prioritize maintainability alongside visual quality.

All animations should remain modular.

Every major homepage chapter should own its own animation timeline.

Reusable animation hooks should be preferred over repeated GSAP code.

All content such as products, ingredients and testimonials should be data-driven rather than hardcoded.

The website should remain scalable for future additions including:

- Online payments
- CMS integration
- Multiple languages
- Interactive 3D product showcases
- Personalized product recommendations

The architecture should be designed with these future enhancements in mind while keeping Version 1 focused on delivering an exceptional storytelling experience.
# 10. Brand Identity & Visual Language

## Brand Overview

AL-HAYAT by Dr. Farheen represents handcrafted herbal skincare inspired by nature.

The digital experience should communicate purity, craftsmanship, elegance and trust through visuals rather than excessive text.

Instead of feeling like a typical Ayurvedic ecommerce store, the website should resemble a premium editorial experience where products are discovered naturally through storytelling.

The user should feel immersed inside a botanical world where herbs gradually transform into luxury skincare products.

---

# 11. Visual Direction

The overall visual language should be inspired by the supplied reference artwork.

The design should prioritize atmosphere over decoration.

Every screen should feel alive while remaining calm and elegant.

The experience should evoke:

- Fresh morning light
- Blooming flowers
- Flowing botanical extracts
- Soft organic gradients
- Delicate particles
- Premium cosmetic photography
- Natural textures
- Spacious editorial layouts

The website should feel cinematic rather than commercial.

---

# 12. Color System

Instead of using the existing AL-HAYAT brand palette as the primary UI colors, derive the website's colors directly from the provided reference artwork.

The interface should use a soft botanical palette that complements the product photography.

Suggested palette direction:

### Primary Backgrounds

- Warm Cream
- Ivory White
- Soft Botanical Beige

### Secondary Backgrounds

- Light Botanical Green
- Pale Sage
- Soft Olive Tint

### Accent Colors

- Rose Pink
- Hibiscus Red
- Beetroot Burgundy
- Golden Sunlight
- Lemon Yellow
- Watermelon Coral

### Neutral Colors

- Charcoal
- Warm Gray
- Deep Brown

Avoid overly saturated colors.

Everything should feel soft, premium and naturally lit.

---

# 13. Lighting Style

Lighting is a core storytelling element.

Every major section should include subtle lighting effects such as:

• Warm sunrise glow

• Bloom lighting

• Soft rim lighting

• Light rays

• Ambient gradients

• Glass reflections

• Volumetric highlights

Lighting should slowly evolve throughout the scroll experience.

The environment should never feel flat.

---

# 14. Background System

The background should never remain static.

Every chapter should include subtle environmental movement.

Examples include:

- Floating dust
- Pollen particles
- Soft moving gradients
- Leaf shadows
- Atmospheric haze
- Gentle floating petals
- Light fog
- Animated botanical textures

The movement should remain slow enough that users almost don't notice it consciously.

---

# 15. Typography

Typography should reinforce the premium editorial feeling.

## Heading Font

Elegant serif typography.

Examples:

- Playfair Display
- Cormorant Garamond
- Canela (if licensed)

Large headings with generous spacing.

Minimal use of bold weights.

---

## Body Font

Modern humanist sans-serif.

Examples:

- Inter
- Manrope
- General Sans

Body copy should remain highly readable across mobile devices.

---

## Typography Scale

Display

72–120px

Hero Heading

56–72px

Section Heading

40–56px

Subheading

24–32px

Body

16–18px

Caption

12–14px

Whitespace should be considered part of the typography.

Avoid dense layouts.

---

# 16. Photography Style

Product photography should remain the primary visual focus.

Photography should use:

- Clean backgrounds
- Soft natural shadows
- High resolution
- Consistent angles
- Editorial compositions
- Premium lighting

Products should appear luxurious without excessive editing.

---

# 17. Botanical Assets

The website should make extensive use of botanical imagery.

Required assets include:

Flowers

- Rose
- Hibiscus
- Chamomile
- Lavender (optional)

Leaves

- Neem
- Mint
- Tulsi
- General botanical foliage

Ingredients

- Beetroot
- Rice
- Lemon
- Coconut
- Sandalwood
- Manjistha
- Watermelon
- Strawberry

Supporting Elements

- Water droplets
- Botanical extracts
- Liquid ribbons
- Floating petals
- Floating leaves
- Organic textures

Assets should appear layered to create depth.

---

# 18. Illustration Style

Illustrations should feel elegant and subtle.

Preferred style:

- Botanical line art
- Soft watercolor textures
- Organic curves
- Minimal vector illustrations
- Layered floral compositions

Avoid flat cartoon-style illustrations.

---

# 19. Glass & Surface Effects

The UI should include subtle premium materials.

Examples:

- Frosted glass cards
- Soft translucent overlays
- Thin borders
- Diffused reflections
- Soft shadows

Avoid heavy neumorphism.

Avoid excessive blur.

Everything should feel refined.

---

# 20. Design Language

The visual design should combine influences from:

- Apple product storytelling
- Dior Beauty campaigns
- Aesop
- L'Occitane
- Rituals Cosmetics

Characteristics include:

- Large imagery
- Minimal UI
- Elegant whitespace
- Slow cinematic motion
- Layered compositions
- Editorial typography
- Organic transitions

The website should never resemble a traditional Shopify storefront.

---

# 21. Navigation

The navigation should remain minimal and unobtrusive.

### Desktop

Sticky transparent navigation.

Contains:

- Logo
- Home
- About
- Ingredients
- Products
- Reviews
- Contact

Primary CTA

Order on WhatsApp

Navigation background should become slightly opaque while scrolling.

---

### Mobile

Responsive slide-out navigation.

Large touch targets.

Smooth opening animation.

Background blur.

Minimal menu items.

Persistent WhatsApp CTA.

---

# 22. Sitemap

The website consists of the following pages.

Home

The immersive storytelling homepage.

---

About

Brand philosophy.

Founder story.

Craftsmanship.

---

Ingredients

Detailed ingredient encyclopedia.

Benefits.

Scientific information.

Products containing each ingredient.

---

Products

Complete product catalog.

Filtering by category.

---

Product Details

Individual product pages.

Images.

Benefits.

Ingredients.

Usage instructions.

WhatsApp ordering.

---

Reviews

Customer testimonials.

Community stories.

---

Contact

Phone

Email

WhatsApp

FAQ

Location

---

Legal

Privacy Policy

Shipping Policy

Terms & Conditions

Returns Policy

---

# 23. Component Hierarchy

The project should be built using reusable components.

Global Components

- Header
- Footer
- Navigation
- WhatsApp Button
- Section Wrapper
- Animated Background

Homepage Components

Hero

Nature

Ingredient Journey

Transformation

Product Reveal

Benefits

Testimonials

CTA

Shared Components

Buttons

Cards

Section Titles

Ingredient Cards

Product Cards

Floating Particles

Light Rays

Petals

Leaves

Botanical Decorations

Animations should remain independent from component logic whenever possible.

---

# 24. Design Principles

Every component should follow five core principles.

1.

Elegant

Not flashy.

2.

Purposeful

Every animation supports storytelling.

3.

Organic

Everything grows, blooms or transforms naturally.

4.

Immersive

The environment should feel alive.

5.

Minimal

Only essential UI elements remain visible.

The storytelling should always remain the primary focus.
# 25. Homepage Experience

The homepage is the centerpiece of the entire website.

It should not feel like a traditional ecommerce homepage.

Instead, it should behave like one continuous cinematic experience where every scroll advances the story.

There should never be obvious section breaks.

Each chapter should naturally flow into the next through animations, transitions, lighting, particles and environmental effects.

The user should feel as though they are travelling through a living botanical world where nature gradually transforms into premium skincare.

The homepage should be driven by one master GSAP timeline composed of multiple independent animation sequences.

---

# 26. Scroll Story

The homepage follows this narrative.

```

Nature Awakens

↓

The Botanical World

↓

Ingredient Discovery

↓

Transformation

↓

Product Reveal

↓

Benefits & Trust

↓

Customer Stories

↓

Final Bloom

↓

Order on WhatsApp

```

Each chapter should blend into the next.

No sudden transitions.

No static page sections.

---

# 27. Master Animation Architecture

The homepage should be controlled using a single master timeline.

```

Master Timeline

│

├── Intro Timeline

├── Bloom Timeline

├── Nature Timeline

├── Ingredient Timeline

├── Transformation Timeline

├── Product Timeline

├── Benefits Timeline

├── Testimonials Timeline

└── CTA Timeline

```

Every timeline should own:

- ScrollTrigger
- pin
- scrub
- responsive behavior
- cleanup
- mobile fallback

The entire experience should feel synchronized.

---

# 28. Camera Behaviour

Instead of the page scrolling normally, the viewport should feel fixed.

The environment evolves around the user.

Objects move.

Flowers bloom.

Leaves grow.

Liquids flow.

Light changes.

The user feels like they are watching a cinematic sequence rather than browsing a website.

---

# 29. Chapter One — Nature Awakens

Approximate Height

250vh

This chapter introduces the world.

Products should NOT appear yet.

Instead, nature slowly awakens.

The opening should feel peaceful.

The screen begins almost empty.

Soft ambient lighting slowly appears.

Morning mist fades in.

Tiny floating pollen particles drift through the air.

Petals begin floating.

Leaves gently sway.

Flowers bloom naturally.

Liquid ribbons slowly emerge and weave through the composition.

The AL-HAYAT logo fades in only after the environment has established itself.

The headline appears gradually.

Example headline:

"Beauty Born From Nature."

or

"Every Herb Tells A Story."

No product should appear during this stage.

The objective is to create curiosity.

---

Animation Sequence

0%

Dark screen

↓

Soft sunlight

↓

Floating particles

↓

Petals

↓

Leaves

↓

Flowers bloom

↓

Liquid ribbon appears

↓

Logo fades in

↓

Headline appears

↓

Scroll continues

---

Ambient Animations

Continuous

- Floating dust
- Pollen
- Petals
- Soft gradient movement
- Bloom lighting
- Leaf movement

These should remain extremely subtle.

---

# 30. Chapter Two — Nature Flow

Approximate Height

180vh

The hero slowly dissolves.

Nature becomes more dynamic.

A botanical vine begins growing across the screen.

The vine acts as a visual guide leading users deeper into the story.

Growth sequence

Left

↓

Center

↓

Right

↓

Bottom

Leaves unfurl while growing.

Flowers bloom from the vine.

Tiny particles follow the vine.

The vine eventually opens into the ingredient world.

This section serves as the bridge between atmosphere and product education.

---

Animation Details

The vine should feel alive.

Growth speed follows scroll progress.

Leaves should slightly overshoot before settling.

Flowers should bloom with subtle scaling.

No abrupt movements.

---

# 31. Chapter Three — Ingredient Discovery

Approximate Height

300vh

This is the most important chapter of the homepage.

The ingredients are the heroes.

Instead of showing a complete ingredient grid immediately, every ingredient receives its own spotlight.

Each ingredient should emerge individually.

One.

At.

A.

Time.

Each reveal includes:

- Ingredient image
- Ingredient name
- Short benefit
- Subtle animation
- Botanical particles

Example progression

Rose

↓

Hydrates

↓

Fade away

↓

Beetroot

↓

Natural Glow

↓

Fade away

↓

Lemon

↓

Refreshes

↓

Rice

↓

Brightens

↓

Hibiscus

↓

Hair Care

↓

Neem

↓

Purifies

↓

Coconut

↓

Nourishes

↓

Mint

↓

Cooling

↓

Watermelon

↓

Hydration

↓

Strawberry

↓

Antioxidants

↓

All ingredients arrange into one beautiful botanical composition.

Only after every ingredient has been introduced should the final ingredient grid appear.

---

Animations

Each ingredient should combine:

Opacity

Scale

Rotation

Blur

Y Translation

Parallax

Depth

Background lighting

Every reveal should feel organic.

---

Background Evolution

Cream

↓

Soft Green

↓

Warm Pink

↓

Botanical Composition

Transitions should remain extremely slow.

---

# 32. Chapter Four — Transformation

Approximate Height

200vh

This chapter does not exist in most ecommerce websites.

It creates the emotional connection between ingredients and finished products.

The ingredient grid begins dissolving.

Flowers release petals.

Leaves float upward.

Ingredients slowly break apart into tiny glowing botanical particles.

Liquid extracts begin flowing together.

The particles converge.

A soft golden glow forms.

Natural extracts swirl around the center.

The glow intensifies.

Only then does the first skincare product begin to materialize.

The transformation should communicate:

Nature

↓

Craftsmanship

↓

Finished Product

This is the emotional climax of the first half of the website.

---

Animation Sequence

Ingredient Grid

↓

Ingredients dissolve

↓

Liquid extracts flow

↓

Particles combine

↓

Golden light

↓

Bottle silhouette

↓

Product appears

---

Visual Effects

Glow

Light Rays

Bloom

Floating particles

Liquid ribbons

Botanical smoke

Soft reflections

Everything should feel magical without becoming fantasy.

---

# 33. Chapter Five — Product Reveal

Approximate Height

350vh

The products are finally introduced.

Instead of scrolling through product cards, the products remain pinned while the environment changes around them.

Inspired by Apple's product pages.

One product family appears at a time.

Soap

↓

Face Wash

↓

Hair Care

↓

Lip Care

Each reveal should include:

Product image

Name

Short description

Key ingredients

Primary benefit

WhatsApp CTA

Products should rotate slightly while scrolling.

Approximately 10–15 degrees.

Leaves should open like curtains before every reveal.

Lighting should adapt to each product.

Background gradients should subtly change.

Products should never abruptly swap.

Instead, they should morph naturally into one another.

---

Transition

Soap

↓

Liquid transition

↓

Face Wash

↓

Liquid transition

↓

Hair Oil

↓

Liquid transition

↓

Lip Balm

---

Ambient Details

Floating petals

Soft reflections

Botanical shadows

Light rays

Floating dust

Very subtle camera zoom

---

# 34. Design Objective

At the end of the Product Reveal chapter, users should feel that they have witnessed the complete journey:

Nature

↓

Ingredients

↓

Transformation

↓

Finished Herbal Products

Only after this emotional journey should the website begin explaining why customers should trust the brand.
# 35. Chapter Six — Benefits & Trust

Approximate Height

220vh

After users have experienced the transformation from nature to finished products, the website should reinforce trust through carefully animated storytelling rather than static badges.

This chapter should feel clean, calm and reassuring.

The visual intensity should reduce slightly, allowing users to focus on the brand's values.

Instead of displaying a grid of icons immediately, each trust element should animate into existence as if it is being created by nature.

---

## Trust Journey

Natural Ingredients

↓

Handcrafted Formulations

↓

Safe Daily Care

↓

Customer Trust

↓

Brand Commitment

---

## Trust Cards

Each trust card should contain:

- Animated icon
- Title
- Short supporting description

Suggested trust items include:

- 100% Natural Ingredients
- Herbal Formulations
- Handcrafted with Care
- Cruelty-Free *(Confirm with client before enabling globally)*
- Dermatologically Tested *(Only if legally verified)*
- Made in Small Batches
- Sulphate & Paraben Free *(Client confirmation required)*

---

## Icon Animations

Rather than fading in, every icon should have a unique animation.

Leaf Icon

Draws itself using SVG path animation.

---

Water Drop

Liquid fills from bottom to top.

---

Heart

Soft pulse animation.

---

Shield

Outline draws first.

Then fills.

---

Flower

Petals bloom one after another.

---

Herbal Jar

Appears through soft scale and rotation.

---

## Statistics

Statistics should animate upward while entering the viewport.

Examples

0

↓

100

↓

1000

↓

10000

Numbers should ease naturally.

Suggested metrics:

- Happy Customers
- Herbal Ingredients Used
- Products Crafted
- Orders Delivered
- Years of Experience *(if available)*

---

## Background

The environment should remain alive.

Subtle effects:

- Floating pollen
- Botanical shadows
- Soft rays
- Slow gradient movement
- Tiny drifting leaves

Movement should remain extremely subtle.

---

# 36. Chapter Seven — Testimonials

Approximate Height

180vh

Testimonials should feel personal rather than promotional.

Avoid large review grids.

Instead, reviews should slowly drift into the viewport while users continue scrolling.

The atmosphere should become warmer and calmer.

---

## Testimonial Layout

Floating review cards.

Slight depth.

Glass surface.

Soft shadows.

Rounded corners.

Generous spacing.

Cards should overlap slightly to create depth.

---

## Animation

Cards rise upward.

Small rotation.

-3°

↓

0°

↓

2°

Opacity

0

↓

1

Scale

0.95

↓

1

Cards should gently float while visible.

---

## Carousel

Desktop

Three visible cards.

Auto-rotating slowly.

Pause on hover.

---

Mobile

Single card.

Swipe enabled.

Auto-scroll every few seconds.

---

## Optional Enhancements

Customer photographs.

Product photos.

Verified badge.

Location.

Star rating.

Date.

These can be introduced once authentic testimonials become available.

---

## Background

Very soft floral particles.

Gentle sunlight.

Subtle blur.

The environment should never feel static.

---

# 37. Chapter Eight — Final Bloom

Approximate Height

220vh

The final chapter should feel like the conclusion of the entire journey.

Everything the user has experienced returns.

Flowers.

Leaves.

Liquid.

Ingredients.

Light.

Products.

Instead of introducing something new, the website brings together every visual element from previous chapters.

This creates emotional closure.

---

## Story

Flowers bloom again.

Leaves return.

Petals swirl gently.

Liquid ribbons reconnect.

Ingredients float inward.

Golden light grows.

The featured product settles at the center.

The composition becomes complete.

---

## Headline

Examples

Begin Your Natural Skincare Journey

or

Nature's Finest.

Crafted For You.

or

Beauty of Herbs.

Radiance of You.

Headline should fade upward.

Large typography.

Elegant spacing.

---

## Primary CTA

Large button.

Order on WhatsApp

Gentle pulse animation.

Soft glow.

Arrow slides slightly on hover.

---

## Secondary CTA

Browse Products

Learn About Ingredients

---

## Ending

The animation should slow dramatically.

Allow users to naturally continue into the footer.

Avoid abrupt endings.

---

# 38. Global Micro Interactions

Micro interactions should exist throughout the website.

They should always feel subtle.

Never distracting.

---

## Buttons

Hover

Scale

1

↓

1.05

Soft shadow.

Arrow slides.

Background slightly brightens.

---

## Cards

Translate upward.

Approximately

8px

Small shadow increase.

---

## Images

Very gentle zoom.

Around

1.02

No excessive scaling.

---

## Product Images

Tiny floating animation.

Slow rotation.

Very subtle.

---

## Leaves

Continuous swaying.

Wind simulation.

---

## Flowers

Breathing animation.

Scale

0.98

↓

1

↓

0.98

---

## Petals

Continuous floating.

Different speeds.

Different rotations.

Randomized movement.

---

## Background

Soft animated gradients.

Never static.

---

# 39. Ambient Environment System

Every chapter should contain environmental animation.

Examples

- Floating dust
- Pollen
- Petals
- Leaves
- Botanical shadows
- Soft light rays
- Fog
- Glow particles
- Liquid reflections

These elements should be layered.

Foreground.

Midground.

Background.

Creating depth.

---

# 40. GSAP Architecture

The homepage should use one master timeline.

Each chapter owns its own timeline.

Example

Master Timeline

│

├── Intro

├── Bloom

├── Nature

├── Ingredients

├── Transformation

├── Products

├── Benefits

├── Testimonials

└── Final CTA

Each chapter should register itself with the master timeline.

Avoid deeply nested animation logic.

Animations should remain modular.

---

# 41. ScrollTrigger Configuration

Every major chapter should use:

- pin
- scrub
- start
- end
- invalidateOnRefresh

Pin durations should be responsive.

Desktop and mobile should use different values where necessary.

Avoid excessive pinning on smaller devices.

---

# 42. Lenis Integration

Lenis should provide smooth scrolling.

Requirements

- RequestAnimationFrame integration
- GSAP synchronization
- Touch support
- Mobile optimization
- Resize handling

Scrolling should remain responsive even on lower-powered devices.

---

# 43. Framer Motion Usage

Framer Motion should be reserved for UI interactions only.

Examples

- Buttons
- Navigation
- Cards
- Dropdowns
- Modals
- Mobile Menu

Avoid mixing Framer Motion with ScrollTrigger-controlled sections.

GSAP remains responsible for scroll-driven storytelling.

---

# 44. Mobile Experience

The mobile experience should preserve the narrative while simplifying heavy animations.

Reduce:

- Particle density
- Blur
- Light rays
- Floating elements
- Pin duration

Keep:

- Story progression
- Ingredient reveals
- Product reveals
- CTA animations

Performance should always take priority over visual complexity.

---

# 45. Reduced Motion Support

If the user's system requests reduced motion:

Disable

- Scroll scrubbing
- Heavy parallax
- Continuous floating particles
- Camera movement

Replace with

Simple fades.

Opacity transitions.

Static layouts.

Accessibility should never compromise usability.

---

# 46. Homepage Completion Goal

When users finish scrolling the homepage, they should feel as though they have experienced the complete lifecycle of the products:

Nature awakens.

↓

Ingredients are discovered.

↓

Nature transforms.

↓

Products emerge.

↓

Trust is established.

↓

Customers validate the brand.

↓

The journey concludes with a confident invitation to begin their own skincare experience.

The homepage should leave users with an emotional connection to the brand rather than simply exposing them to products.
# 47. Application Requirements

The AL-HAYAT website should be architected as a **production-ready, scalable web application** rather than a static marketing website.

Although **Phase 1** focuses on delivering an immersive storytelling experience with WhatsApp ordering, the overall architecture should anticipate future backend expansion without requiring major restructuring.

The application should follow a phased development approach where each release builds upon a stable foundation.

---

# 48. Development Phases

## Phase 1 – Premium Landing Experience

Deliver an immersive, scroll-driven storytelling website focused on brand experience and product discovery.

### Scope

- Cinematic homepage
- Brand storytelling
- Ingredient journey
- Product catalogue
- Product detail pages
- Ingredient library
- Contact page
- FAQ
- WhatsApp ordering
- Responsive UI
- SEO optimization

> **Note:** No authentication, shopping cart or payment gateway in this phase.

---

## Phase 2 – Dynamic Product Platform

Integrate Supabase and convert the website into a dynamic content-driven platform.

### Scope

- Supabase integration
- Dynamic products
- Categories
- Ingredient pages
- Admin dashboard
- Contact management
- Website settings
- Review moderation

---

## Phase 3 – Customer Features

Introduce customer accounts and personalized experiences.

### Scope

- Authentication
- User profiles
- Wishlist
- Saved products
- Customer reviews
- Personalized recommendations

---

## Phase 4 – Full Ecommerce Platform

Transform the application into a complete ecommerce solution.

### Scope

- Shopping cart
- Checkout
- Razorpay / Stripe integration
- Orders
- Inventory management
- Coupons
- Notifications
- Order tracking

---

# 49. Website Structure

```text
Home
│
├── Hero
├── Brand Story
├── Why Choose Us
├── Featured Ingredients
├── Product Categories
├── Product Showcase
├── Skin Concerns
├── Best Sellers
├── Customer Reviews
├── FAQ
├── Contact
├── WhatsApp CTA
└── Footer
```

The homepage remains the primary storytelling experience described in the previous sections.

---

# 50. Main Pages

| Route | Page |
|--------|------|
| `/` | Home |
| `/about` | About Us |
| `/products` | Products |
| `/products/[slug]` | Product Details |
| `/categories` | Categories |
| `/ingredients` | Ingredient Library |
| `/contact` | Contact |
| `/faqs` | FAQs |
| `/privacy-policy` | Privacy Policy |
| `/terms` | Terms & Conditions |

The routing architecture should remain scalable for future pages.

---

# 51. Product Categories

The product catalogue should support the following categories.

- Face Care
- Hair Care
- Body Care
- Handmade Soaps
- Face Packs
- Hair Oils
- Shampoo
- Scrubs
- Lip Care
- Gift Combos

The category system should support unlimited future additions.

---

# 52. Product Detail Page

Every Product Detail Page should contain:

- Product Gallery
- Product Name
- Price
- Description
- Benefits
- Ingredients
- Suitable For
- How To Use
- Key Features
- Customer Reviews
- Related Products
- Order on WhatsApp

All product information should eventually be loaded dynamically from Supabase.

---

# 53. Ingredient Library

Each ingredient should have a dedicated page.

### Initial Ingredients

- Rose
- Beetroot
- Manjistha
- Sandalwood
- Orange
- Coconut
- Hibiscus
- Rice
- Melon
- Amla
- Strawberry
- Watermelon
- Herbal Extracts

Each ingredient page should include:

- Description
- Benefits
- Origin
- Products Using This Ingredient
- High-quality Images

---

# 54. Homepage Features

The homepage should include:

- Premium Hero
- Scroll Storytelling
- Animated Ingredients
- Featured Products
- Best Sellers
- Why Choose Us
- Customer Testimonials
- FAQ
- WhatsApp CTA

The homepage should act as the primary conversion funnel.

---

# 55. Navigation

## Desktop Navigation

- Sticky Navbar
- Transparent → Blurred Background
- Search
- Product Navigation
- WhatsApp CTA

### Optional

- Mega Menu

---

## Mobile Navigation

- Slide-out Drawer
- Smooth Animation
- Responsive Layout
- Persistent WhatsApp Button

---

# 56. Product Catalogue Features

The Products page should support:

- Grid View
- List View
- Category Filters
- Search
- Sorting
- Product Details
- Related Products
- WhatsApp Ordering

### Future Enhancements

- Wishlist
- Product Comparison
- Recently Viewed Products

---

# 57. Product Cards

Each product card should display:

- Product Image
- Product Name
- Category
- Price
- Short Description
- View Details
- WhatsApp Order Button

### Desktop Interactions

- Hover Lift
- Soft Shadow
- Image Zoom
- Background Glow

### Mobile Interactions

- Optimized Touch Feedback
- Fast Navigation

---

# 58. Contact Experience

The Contact page should contain:

- Google Map
- Phone Number
- WhatsApp
- Email
- Contact Form
- Social Media Links
- Business Hours

Submitted messages should eventually be stored inside Supabase.

---

# 59. WhatsApp Ordering

Every Order button should generate a pre-filled WhatsApp message.

### Example

```text
Hello,

I'm interested in purchasing:

Product Name

Price:

Please guide me through the ordering process.

Thank you.
```

WhatsApp CTAs should be available throughout the website:

- Homepage
- Product Cards
- Product Detail Pages
- Sticky Navigation
- Footer
- Contact Page

---

# 60. Admin Dashboard (Phase 2)

The application architecture should anticipate an internal dashboard.

## Modules

- Dashboard
- Products
- Categories
- Orders
- Customers
- Reviews
- FAQs
- Media Library
- Website Settings

Authentication should restrict access to administrators only.

---

# 61. Product Management

Administrators should be able to:

- Add Products
- Edit Products
- Delete Products
- Upload Images
- Manage Categories
- Update Prices
- Change Stock Status

All product data should be database-driven.

---

# 62. Review Management

Admin functionality should include:

- Approve Reviews
- Reject Reviews
- Hide Reviews
- Delete Reviews
- Feature Reviews

Only approved reviews should appear publicly.

---

# 63. Contact Management

Administrators should be able to:

- View Contact Requests
- Reply
- Archive
- Delete Messages

All contact submissions should be stored securely.

---

# 64. Backend Architecture

The backend should be powered by **Supabase**.

## Core Services

- Supabase Authentication
- PostgreSQL Database
- Supabase Storage
- Row Level Security (RLS)
- Supabase Edge Functions (Optional)

The frontend should communicate through reusable service layers rather than coupling UI components directly to database queries.

This architecture ensures long-term maintainability and simplifies future migrations or feature additions.
# 65. Backend Architecture (Supabase)

The backend should use **Supabase** as the Backend-as-a-Service (BaaS), providing authentication, PostgreSQL database, object storage, security policies, and optional serverless functions.

The frontend should remain completely decoupled from the database by communicating through reusable service functions.

## Backend Stack

| Layer | Technology |
|--------|------------|
| Backend | Supabase |
| Database | PostgreSQL |
| Authentication | Supabase Auth |
| Storage | Supabase Storage |
| Security | Row Level Security (RLS) |
| Server Functions | Supabase Edge Functions (Optional) |

---

# 66. Database Schema

The database should follow a relational architecture that supports future ecommerce functionality.

## profiles

```sql
id (uuid)
name
email
phone
role
created_at
updated_at
```

---

## categories

```sql
id
name
slug
image
description
created_at
```

---

## ingredients

```sql
id
name
slug
image
description
benefits
origin
created_at
```

---

## products

```sql
id
name
slug
price
description
category_id
featured
stock_status
image
gallery
weight
created_at
updated_at
```

---

## product_ingredients

Many-to-many relationship.

```sql
product_id
ingredient_id
```

---

## reviews

```sql
id
product_id
customer_name
rating
review
approved
created_at
```

---

## contact_messages

```sql
id
name
email
phone
message
created_at
```

---

## website_settings

```sql
id
brand_name
logo
whatsapp_number
email
address
instagram
facebook
working_hours
```

---

# 67. Supabase Storage Buckets

The following buckets should be created.

```text
products/

ingredients/

hero/

gallery/

logos/

icons/

testimonials/

backgrounds/

animations/
```

Assets should remain organized to simplify future content management.

---

# 68. Backend Service Layer

Avoid calling Supabase directly inside UI components.

Instead, create reusable services.

## Product Services

- getProducts()
- getFeaturedProducts()
- getProductBySlug()
- searchProducts()
- filterProducts()
- getRelatedProducts()

---

## Category Services

- getCategories()
- getCategoryBySlug()
- getCategoryProducts()

---

## Ingredient Services

- getIngredients()
- getIngredientBySlug()
- getProductsUsingIngredient()

---

## Review Services

- getApprovedReviews()
- submitReview()

---

## Contact Services

- submitContactForm()

---

## Website Services

- getWebsiteSettings()
- getSocialLinks()
- getContactInformation()

---

# 69. Next.js Project Structure

```text
app/
│
├── (marketing)/
│   ├── page.tsx
│   ├── about/
│   ├── ingredients/
│   ├── products/
│   ├── contact/
│   ├── reviews/
│   └── faq/
│
├── admin/
│   ├── dashboard/
│   ├── products/
│   ├── categories/
│   ├── reviews/
│   └── settings/
│
├── api/
│
└── layout.tsx
```

---

# 70. Component Architecture

```text
components/

layout/
navigation/
footer/

hero/
nature/
ingredients/
transformation/
products/
benefits/
testimonials/
faq/
contact/

shared/

buttons/
cards/
inputs/
modals/
badges/
icons/

animations/

particles/
petals/
light-rays/
floating-elements/
```

Every component should be modular and reusable.

---

# 71. Animation Structure

```text
animations/

masterTimeline.ts

hero.ts

nature.ts

ingredients.ts

transformation.ts

products.ts

benefits.ts

reviews.ts

cta.ts

helpers.ts
```

The homepage should be orchestrated by a single `masterTimeline.ts`.

---

# 72. Hooks

Reusable hooks should manage application behavior.

```text
hooks/

useLenis.ts

useScrollAnimations.ts

useIntersection.ts

useMediaQuery.ts

useWindowSize.ts

useWhatsApp.ts
```

---

# 73. Libraries

```text
lib/

supabase.ts

products.ts

ingredients.ts

constants.ts

metadata.ts

utils.ts
```

No component should contain hardcoded business data.

---

# 74. TypeScript Models

Every entity should have its own interface.

Example:

```ts
interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  image: string;
  gallery: string[];
  categoryId: string;
  featured: boolean;
  stockStatus: string;
}
```

Likewise create interfaces for:

- Category
- Ingredient
- Review
- ContactMessage
- WebsiteSettings

---

# 75. State Management

Use local React state wherever possible.

Introduce global state only when necessary.

Recommended:

- React Context
- Zustand (only if application complexity increases)

Avoid unnecessary global state.

---

# 76. Data Fetching Strategy

Use:

- Server Components for static content
- Client Components only for interactions
- Server Actions where appropriate
- Suspense for loading states

This maximizes performance and SEO.

---

# 77. Coding Standards

The codebase should follow these conventions.

- TypeScript Strict Mode
- ESLint
- Prettier
- Modular Components
- Reusable Hooks
- No duplicated animation logic
- No hardcoded strings
- Semantic HTML
- Accessible components

Every component should have a single responsibility.

---

# 78. Scalability Guidelines

The architecture should support future additions without major restructuring.

Examples include:

- Shopping Cart
- Razorpay
- Stripe
- Inventory
- User Accounts
- AI Recommendations
- Blog
- Multi-language Support
- Analytics Dashboard
- Email Notifications

The application should be designed as a scalable platform rather than a one-time landing page.
# 79. Performance Requirements

The website should deliver a premium experience while maintaining excellent performance across desktop and mobile devices.

Animations should never compromise usability or loading speed.

## Performance Targets

| Metric | Target |
|---------|---------|
| Lighthouse Performance (Desktop) | ≥ 90 |
| Lighthouse Performance (Mobile) | ≥ 80 |
| Largest Contentful Paint (LCP) | < 2.5s |
| First Contentful Paint (FCP) | < 1.8s |
| Cumulative Layout Shift (CLS) | < 0.1 |
| Time to Interactive (TTI) | < 3.5s |
| Animation Frame Rate | Stable 60 FPS |

---

# 80. Animation Performance Guidelines

The immersive experience should remain performant even on mid-range mobile devices.

## Best Practices

- Animate only `transform` and `opacity`
- Avoid animating layout properties (`top`, `left`, `width`, `height`)
- Use `will-change` only on actively animating elements
- Destroy GSAP timelines when components unmount
- Lazy-load heavy sections
- Reduce particle density on mobile
- Limit simultaneous animations
- Optimize ScrollTrigger refreshes

The homepage should feel smooth rather than visually overwhelming.

---

# 81. Image Optimization

All raster assets should be optimized before deployment.

## Guidelines

- Use **AVIF** wherever supported
- Fallback to **WebP**
- Use transparent PNGs only when required
- Compress hero assets without visible quality loss
- Deliver responsive image sizes using `next/image`
- Lazy-load off-screen images
- Preload hero assets

---

# 82. Accessibility

The website should comply with WCAG AA guidelines wherever practical.

## Requirements

- Support `prefers-reduced-motion`
- Keyboard-accessible navigation
- Semantic HTML
- Proper heading hierarchy
- Descriptive alt text for all images
- Focus-visible states
- Sufficient color contrast
- Screen-reader-friendly forms

When reduced motion is enabled:

- Disable heavy scroll scrubbing
- Replace complex animations with simple fades
- Remove parallax effects
- Maintain full usability

---

# 83. Search Engine Optimization (SEO)

The application should be optimized for discoverability.

## Requirements

- Server-side rendering using Next.js App Router
- Semantic HTML structure
- Unique meta titles and descriptions
- Open Graph metadata
- Twitter Card metadata
- Canonical URLs
- XML sitemap
- Robots.txt
- Structured data (Schema.org)

### Product Pages

Each Product Detail Page should include structured `Product` schema with:

- Product Name
- Description
- Price
- Availability
- Brand
- Images

### Ingredient Pages

Ingredient pages should include structured metadata to improve search visibility.

---

# 84. Security

The application should follow secure development practices.

## Frontend

- Environment variables for sensitive keys
- Input validation
- XSS protection
- CSRF considerations where applicable

## Backend (Supabase)

- Row Level Security (RLS)
- Role-based access
- Secure storage policies
- Auth-protected admin routes

---

# 85. Browser Compatibility

The website should be tested on:

- Chrome
- Safari
- Firefox
- Edge

Mobile support should include:

- Android Chrome
- iOS Safari

The latest two major versions of each browser should be supported.

---

# 86. Responsive Design

The experience should adapt across:

- Mobile
- Tablet
- Laptop
- Desktop
- Large Desktop Displays

The cinematic storytelling should remain intact while simplifying heavy effects on smaller screens.

---

# 87. Testing & Quality Assurance

Before launch, the application should undergo:

## Functional Testing

- Navigation
- Product browsing
- Search
- Filters
- WhatsApp links
- Contact form
- Responsive layouts

---

## Animation Testing

- Scroll synchronization
- GSAP timelines
- Lenis integration
- Mobile performance
- Reduced-motion behavior

---

## Performance Testing

- Lighthouse
- Core Web Vitals
- Image optimization
- JavaScript bundle size

---

## Cross-Browser Testing

Verify consistent behavior across all supported browsers.

---

# 88. Deployment

## Frontend

- Vercel

## Backend

- Supabase

## Version Control

- Git
- GitHub

## CI/CD

Automatic deployment from the main branch.

Preview deployments for pull requests.

---

# 89. Environment Variables

The application should use environment variables for all sensitive configuration.

Example:

```env
NEXT_PUBLIC_SUPABASE_URL=

NEXT_PUBLIC_SUPABASE_ANON_KEY=

SUPABASE_SERVICE_ROLE_KEY=

NEXT_PUBLIC_WHATSAPP_NUMBER=
```

No secrets should be committed to the repository.

---

# 90. Deliverables

The completed Phase 1 project should include:

- Responsive Next.js application
- Cinematic homepage
- Product catalogue
- Product detail pages
- Ingredient library
- Contact page
- FAQ
- WhatsApp ordering
- SEO setup
- Performance optimization
- Animation system
- Reusable component library

---

# 91. Build Roadmap

## Phase 1

- Design system
- Homepage
- Storytelling animations
- Product catalogue
- Product detail pages
- Ingredient pages
- Contact
- FAQ
- WhatsApp ordering

---

## Phase 2

- Supabase integration
- Dynamic content
- Admin dashboard
- Product management
- Review moderation

---

## Phase 3

- Authentication
- User accounts
- Wishlist
- Customer reviews
- Personalized experiences

---

## Phase 4

- Shopping cart
- Checkout
- Payment gateway
- Orders
- Inventory
- Coupons
- Notifications

---

# 92. Open Questions

The following items require client confirmation before development is finalized.

- Final product catalogue
- Missing Neem Soap photography
- Transparent logo asset
- Business address
- Social media links
- Verified product claims (Cruelty-Free, Vegan, etc.)
- Founder biography and imagery
- Legal policy content
- Product weights and dimensions
- Shipping coverage
- Customer testimonials
- Brand copy approval

---

# 93. Future Enhancements

The platform should be architected to support:

- Shopping cart
- Online payments
- AI Skin Analysis
- AI Product Recommendation
- Loyalty Program
- Subscription Plans
- Inventory Dashboard
- Blog & Articles
- Multi-language Support
- Customer Accounts
- Email Notifications
- Analytics Dashboard
- Progressive Web App (PWA)
- Native Mobile Applications

---

# 94. Final Vision

AL-HAYAT should not feel like a conventional ecommerce website.

It should feel like an immersive digital experience where visitors journey through the world of herbs, discover the origins of every formulation, witness the transformation from nature to skincare, and leave with a lasting impression of craftsmanship, trust, and premium quality.

The website should inspire exploration before encouraging purchase.

Every interaction should reinforce the idea that AL-HAYAT products are thoughtfully crafted from nature's finest ingredients.

The ultimate objective is to create a memorable storytelling experience that strengthens the brand, builds customer trust, and provides a scalable technical foundation capable of evolving into a full-featured ecommerce platform in future releases.