-- ==============================================================================
-- Add Customer Accounts to Orders
-- ==============================================================================

-- 1. Add new columns to the orders table
ALTER TABLE orders
ADD COLUMN IF NOT EXISTS customer_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
ADD COLUMN IF NOT EXISTS preparing_at TIMESTAMPTZ,
ADD COLUMN IF NOT EXISTS ready_at TIMESTAMPTZ;

-- 2. Create index for faster lookups by customer
CREATE INDEX IF NOT EXISTS idx_orders_customer_id ON orders(customer_id);

-- 3. Add RLS policies for customers to view their own orders
-- (Assuming orders table already has RLS enabled. If not, enable it.)
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;

-- Allow authenticated users to view their own orders
CREATE POLICY "Customers can view their own orders"
ON orders
FOR SELECT
TO authenticated
USING (customer_id = auth.uid());

-- Allow authenticated users to view order items for their own orders
CREATE POLICY "Customers can view items for their own orders"
ON order_items
FOR SELECT
TO authenticated
USING (
  order_id IN (
    SELECT id FROM orders WHERE customer_id = auth.uid()
  )
);
