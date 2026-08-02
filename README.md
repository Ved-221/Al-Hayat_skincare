# Al-Hayat Skincare

An e-commerce storefront and admin dashboard for Al-Hayat Skincare, built with Next.js 16, Tailwind CSS, Zustand, and Supabase.

## Tech Stack

- **Framework:** [Next.js 16](https://nextjs.org/) (App Router)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **State Management:** [Zustand](https://github.com/pmndrs/zustand)
- **Database & Auth & Storage:** [Supabase](https://supabase.com/)
- **Icons:** Google Material Symbols & Lucide React

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment Variables

Copy the example environment file and fill in your Supabase credentials:

```bash
cp .env.example .env.local
```

Required variables:
- `NEXT_PUBLIC_SUPABASE_URL`: Your Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Your Supabase anon key
- `SUPABASE_SERVICE_ROLE_KEY`: Your Supabase service role key (for admin actions)
- `NEXT_PUBLIC_SITE_URL`: The production URL of the site (used for sitemap/robots generation)
- `NEXT_PUBLIC_WHATSAPP_NUMBER`: The WhatsApp number for receiving orders

### 3. Database Setup

Ensure your Supabase project has the following tables configured:
- `products`: Product catalog
- `categories`: Product categories
- `orders`: Customer orders
- `admins`: List of authenticated users allowed to access the admin dashboard
- `settings`: Site settings (e.g., maintenance mode, logo)

Run the seed script to populate initial data if needed:
```bash
node scripts/seed.mjs
```

### 4. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Building for Production

To create an optimized production build:

```bash
npm run build
npm start
```

## Admin Dashboard

The admin dashboard is accessible at `/admin`. You must log in with a Supabase user account whose ID exists in the `admins` table.

Features include:
- Product and Category management
- Order tracking and status updates
- Store settings (Logo upload, Maintenance mode)
- Media library management
