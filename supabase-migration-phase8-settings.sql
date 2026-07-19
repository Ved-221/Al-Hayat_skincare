-- ============================================================================
-- Phase 8 — Store Settings Migration
-- ============================================================================
-- Creates the `settings` table using a single-store architecture (id = 'default').
-- Automatically seeds the default business configuration row.
-- ============================================================================

CREATE TABLE IF NOT EXISTS settings (
    id TEXT PRIMARY KEY DEFAULT 'default' CHECK (id = 'default'),
    store_name TEXT NOT NULL DEFAULT 'AL-HAYAT',
    store_tagline TEXT NOT NULL DEFAULT 'Premium herbal skincare & haircare by Dr. Farheen. Botanical Wisdom. Clinical Precision.',
    store_description TEXT NOT NULL DEFAULT 'AL-HAYAT by Dr. Farheen — premium herbal skincare, haircare, and lip care. Handcrafted botanical formulations. 100% natural ingredients. Order on WhatsApp.',
    logo_url TEXT NULL,
    favicon_url TEXT NULL,
    business_email TEXT NOT NULL DEFAULT 'info@alhayat.in',
    support_email TEXT NOT NULL DEFAULT 'support@alhayat.in',
    phone_number TEXT NOT NULL DEFAULT '+91 87965 13654',
    whatsapp_number TEXT NOT NULL DEFAULT '918796513654',
    business_address TEXT NOT NULL DEFAULT 'Mumbai, Maharashtra, India',
    working_hours TEXT NOT NULL DEFAULT 'Mon–Sat: 9 AM – 6 PM',
    instagram_url TEXT NOT NULL DEFAULT 'https://instagram.com',
    facebook_url TEXT NOT NULL DEFAULT 'https://facebook.com',
    linkedin_url TEXT NOT NULL DEFAULT '',
    x_url TEXT NOT NULL DEFAULT '',
    youtube_url TEXT NOT NULL DEFAULT '',
    currency TEXT NOT NULL DEFAULT 'INR',
    currency_symbol TEXT NOT NULL DEFAULT '₹',
    timezone TEXT NOT NULL DEFAULT 'Asia/Kolkata',
    language TEXT NOT NULL DEFAULT 'en-IN',
    free_shipping_threshold NUMERIC NOT NULL DEFAULT 999,
    shipping_charge NUMERIC NOT NULL DEFAULT 50,
    tax_percentage NUMERIC NOT NULL DEFAULT 18,
    store_status TEXT NOT NULL DEFAULT 'Open' CHECK (store_status IN ('Open', 'Maintenance')),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Seed initial default row if missing
INSERT INTO settings (
    id,
    store_name,
    store_tagline,
    store_description,
    logo_url,
    favicon_url,
    business_email,
    support_email,
    phone_number,
    whatsapp_number,
    business_address,
    working_hours,
    instagram_url,
    facebook_url,
    linkedin_url,
    x_url,
    youtube_url,
    currency,
    currency_symbol,
    timezone,
    language,
    free_shipping_threshold,
    shipping_charge,
    tax_percentage,
    store_status
) VALUES (
    'default',
    'AL-HAYAT',
    'Premium herbal skincare & haircare by Dr. Farheen. Botanical Wisdom. Clinical Precision.',
    'AL-HAYAT by Dr. Farheen — premium herbal skincare, haircare, and lip care. Handcrafted botanical formulations. 100% natural ingredients. Order on WhatsApp.',
    NULL,
    NULL,
    'info@alhayat.in',
    'support@alhayat.in',
    '+91 87965 13654',
    '918796513654',
    'Mumbai, Maharashtra, India',
    'Mon–Sat: 9 AM – 6 PM',
    'https://instagram.com',
    'https://facebook.com',
    '',
    '',
    '',
    'INR',
    '₹',
    'Asia/Kolkata',
    'en-IN',
    999,
    50,
    18,
    'Open'
) ON CONFLICT (id) DO NOTHING;

-- Enable Row Level Security (optional / standard setup)
ALTER TABLE settings ENABLE ROW LEVEL SECURITY;

-- Allow public read access to settings
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies WHERE tablename = 'settings' AND policyname = 'Allow public read access on settings'
    ) THEN
        CREATE POLICY "Allow public read access on settings"
            ON settings
            FOR SELECT
            USING (true);
    END IF;
END
$$;

-- Allow authenticated / service role access for write operations
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies WHERE tablename = 'settings' AND policyname = 'Allow all access for authenticated users on settings'
    ) THEN
        CREATE POLICY "Allow all access for authenticated users on settings"
            ON settings
            FOR ALL
            USING (auth.role() = 'authenticated' OR auth.role() = 'service_role')
            WITH CHECK (auth.role() = 'authenticated' OR auth.role() = 'service_role');
    END IF;
END
$$;
