-- ==============================================================================
-- AL-HAYAT Supabase Orders Module Schema (Phase 4A)
-- Run this in the Supabase SQL Editor.
-- ==============================================================================

-- 1. CREATE ENUM
CREATE TYPE order_status AS ENUM (
    'Pending',
    'Accepted',
    'Preparing',
    'Ready',
    'Completed',
    'Cancelled'
);

-- 2. CREATE ORDER NUMBER SEQUENCE
-- Starts at 1001 for user-friendly order numbers (e.g., AH1001)
CREATE SEQUENCE IF NOT EXISTS order_number_seq START 1001;

-- 3. CREATE ORDERS TABLE
CREATE TABLE IF NOT EXISTS orders (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    order_number TEXT NOT NULL UNIQUE DEFAULT 'AH' || nextval('order_number_seq')::TEXT,
    
    -- Customer Info
    customer_name TEXT NOT NULL,
    customer_phone TEXT NOT NULL,
    customer_email TEXT,
    customer_address TEXT NOT NULL,
    customer_landmark TEXT,
    customer_city TEXT NOT NULL,
    customer_state TEXT NOT NULL,
    customer_pincode TEXT NOT NULL,
    notes TEXT,

    -- Totals & Discounts
    subtotal NUMERIC(10,2) NOT NULL,
    discount_type TEXT, -- e.g., 'percentage', 'flat'
    discount_value NUMERIC(10,2),
    discount_amount NUMERIC(10,2) NOT NULL DEFAULT 0,
    delivery_charge NUMERIC(10,2) NOT NULL DEFAULT 0,
    total_amount NUMERIC(10,2) NOT NULL,

    -- Status & Lifecycle
    status order_status NOT NULL DEFAULT 'Pending',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    accepted_at TIMESTAMPTZ,
    completed_at TIMESTAMPTZ,
    cancelled_at TIMESTAMPTZ,

    -- Admin & Audit
    updated_by UUID REFERENCES auth.users(id),
    deleted_at TIMESTAMPTZ -- Soft delete flag
);

-- 4. CREATE ORDER ITEMS TABLE
CREATE TABLE IF NOT EXISTS order_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    order_id UUID NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
    product_id BIGINT NOT NULL REFERENCES products(id),
    
    -- Snapshots (historical record)
    product_name TEXT NOT NULL,
    product_price NUMERIC(10,2) NOT NULL,
    
    quantity INTEGER NOT NULL CHECK (quantity > 0),
    line_total NUMERIC(10,2) NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 5. CREATE INDEXES
-- Rapid lookups for customer support and sharing
CREATE INDEX IF NOT EXISTS idx_orders_order_number ON orders(order_number);
-- Dashboard filtering by status
CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(status);
-- Time-series analytics and recent orders fetching
CREATE INDEX IF NOT EXISTS idx_orders_created_at ON orders(created_at DESC);
-- Look up order history by customer
CREATE INDEX IF NOT EXISTS idx_orders_customer_phone ON orders(customer_phone);

-- 6. ENABLE RLS
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;

-- 7. RLS POLICIES FOR ORDERS
-- Allow public to insert orders (checkout process)
CREATE POLICY "Allow public insert to orders" ON orders
    FOR INSERT WITH CHECK (true);

-- Allow authenticated admins to view all (non-deleted) orders
CREATE POLICY "Allow admins read access to orders" ON orders
    FOR SELECT USING (auth.role() = 'authenticated');

-- Allow authenticated admins to update orders
CREATE POLICY "Allow admins update access to orders" ON orders
    FOR UPDATE USING (auth.role() = 'authenticated');

-- 8. RLS POLICIES FOR ORDER ITEMS
-- Allow public to insert order items
CREATE POLICY "Allow public insert to order_items" ON order_items
    FOR INSERT WITH CHECK (true);

-- Allow authenticated admins to view all order items
CREATE POLICY "Allow admins read access to order_items" ON order_items
    FOR SELECT USING (auth.role() = 'authenticated');

-- 9. ATOMIC ORDER CREATION RPC
-- Creates an order and its items in a single transaction.
-- Rolls back automatically if any step fails.
CREATE OR REPLACE FUNCTION create_order_with_items(
    order_data JSONB,
    items_data JSONB
) RETURNS UUID AS $$
DECLARE
    new_order_id UUID;
    item JSONB;
BEGIN
    -- Insert the main order
    INSERT INTO orders (
        customer_name, customer_phone, customer_email, customer_address, 
        customer_landmark, customer_city, customer_state, customer_pincode, 
        notes, subtotal, discount_type, discount_value, discount_amount, 
        delivery_charge, total_amount
    ) VALUES (
        order_data->>'customer_name',
        order_data->>'customer_phone',
        order_data->>'customer_email',
        order_data->>'customer_address',
        order_data->>'customer_landmark',
        order_data->>'customer_city',
        order_data->>'customer_state',
        order_data->>'customer_pincode',
        order_data->>'notes',
        (order_data->>'subtotal')::NUMERIC,
        order_data->>'discount_type',
        (order_data->>'discount_value')::NUMERIC,
        COALESCE((order_data->>'discount_amount')::NUMERIC, 0),
        COALESCE((order_data->>'delivery_charge')::NUMERIC, 0),
        (order_data->>'total_amount')::NUMERIC
    ) RETURNING id INTO new_order_id;

    -- Insert order items
    FOR item IN SELECT * FROM jsonb_array_elements(items_data)
    LOOP
        INSERT INTO order_items (
            order_id, product_id, product_name, product_price, quantity, line_total
        ) VALUES (
            new_order_id,
            (item->>'product_id')::BIGINT,
            item->>'product_name',
            (item->>'product_price')::NUMERIC,
            (item->>'quantity')::INTEGER,
            (item->>'line_total')::NUMERIC
        );
    END LOOP;

    RETURN new_order_id;
END;
$$ LANGUAGE plpgsql;
