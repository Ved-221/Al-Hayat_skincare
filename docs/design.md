# Al-Hayat Skincare – Design System & Architecture

This document outlines the core design philosophy, typography, color palette, and animation strategies for the Al-Hayat Skincare website.

## 1. Design Philosophy: "Quiet Luxury"

The aesthetic of Al-Hayat is inspired by high-end, premium cosmetic brands. The goal is to create a digital experience that feels like flipping through a luxury editorial magazine.
- **Organic Flow over Rigid Grids**: We avoid hard section dividers. Instead, the journey relies on continuous, fluid scrolling with background colors that morph seamlessly.
- **Product as Hero**: Large, high-impact photography with subtle parallax effects.
- **Breathing Room**: Generous use of negative space to allow typography and imagery to stand out.

## 2. Typography

We utilize two primary fonts to balance elegance with modern readability:

- **Primary Heading Font**: `Playfair Display` (Serif)
  - Used for dramatic, massive hero texts (e.g., up to `10rem` in size).
  - Conveys heritage, elegance, and natural beauty.
- **Body & Utility Font**: `Outfit` (Sans-Serif)
  - Used for paragraphs, navigation, and small uppercase labels.
  - Clean, legible, and modern.

## 3. Color Palette

The color system is designed to transition the user through different moods of nature (morning freshness to deep, nourishing forests).

### Background Tones (Morphing Canvas)
- **Cream** (`#fcf9f2`): Used for introductory, fresh sections (Hero).
- **Soft Sage** (`#e8ebe9`): Used for storytelling and ingredient deep-dives.
- **Forest Green** (`#2a3d2c`): Used for the high-end "Dark Luxury Showcase" to make products pop.
- **Warm Blush** (`#fdf5f3`): Used for concluding sections and CTAs.

### Accent & Text Colors
- **Primary Text Dark**: `#2a3d2c` (on light backgrounds)
- **Primary Text Light**: `#fcf9f2` (on dark backgrounds)
- **Brand Green**: `#4b6e51`
- **Gold**: `#d4af37` (Used sparingly for luxury accents and reviews)

## 4. UI Components & Layouts

- **Glassmorphism**: When containers are needed, we use translucent backgrounds (`bg-white/30` or `bg-white/80`) paired with `backdrop-blur-md` to ensure the environment behind is never fully obscured.
- **Sticky Editorial Sections**: A side-by-side layout where text remains pinned (`sticky top-40`) while related imagery scrolls past it, keeping the user engaged in the narrative.
- **Minimalist CTAs**: Buttons are rounded (`rounded-full`), bordered, or solid, utilizing subtle hover scaling (`hover:-translate-y-1`) with soft drop shadows.
