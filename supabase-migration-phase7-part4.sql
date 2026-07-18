-- ============================================================================
-- Phase 7 (Part 4/4) — Category Migration Audit & Constraint Enforcement
-- ============================================================================
-- This script audits and verifies the migration from the deprecated text
-- `category` field to the relational `category_id` foreign key.
-- It ensures no data loss occurs and allows safe, verified constraint enforcement.
-- ============================================================================

-- Step 1: Pre-Verification Audit Query
-- Check for products where category_id IS NULL or invalid
DO $$
DECLARE
    v_unmigrated_count INTEGER;
    v_total_count INTEGER;
BEGIN
    SELECT COUNT(*) INTO v_total_count FROM products;
    SELECT COUNT(*) INTO v_unmigrated_count FROM products WHERE category_id IS NULL;

    RAISE NOTICE '=== CATEGORY MIGRATION AUDIT REPORT ===';
    RAISE NOTICE 'Total Products: %', v_total_count;
    RAISE NOTICE 'Migrated Products: %', (v_total_count - v_unmigrated_count);
    RAISE NOTICE 'Unmigrated Products (category_id IS NULL): %', v_unmigrated_count;

    IF v_unmigrated_count > 0 THEN
        RAISE NOTICE 'WARNING: There are % unmigrated products. Attempting fallback matching...', v_unmigrated_count;
        
        -- Step 2: Fallback matching by exact or normalized category name
        UPDATE products p
        SET category_id = c.id
        FROM categories c
        WHERE p.category_id IS NULL
          AND c.deleted_at IS NULL
          AND LOWER(TRIM(p.category)) = LOWER(TRIM(c.name));

        -- Re-check unmigrated count after fallback matching
        SELECT COUNT(*) INTO v_unmigrated_count FROM products WHERE category_id IS NULL;
        RAISE NOTICE 'Remaining unmigrated products after fallback matching: %', v_unmigrated_count;
    END IF;

    IF v_unmigrated_count > 0 THEN
        RAISE WARNING 'CRITICAL: % products still have category_id IS NULL.', v_unmigrated_count;
        RAISE WARNING 'Please use the Admin Dashboard verifyCategoryMigrationIntegrity() tool or manually assign categories before enabling NOT NULL constraint.';
    ELSE
        RAISE NOTICE 'SUCCESS: 100%% of products are assigned a valid category_id.';
    END IF;
END $$;

-- ============================================================================
-- Step 3: Optional / Guarded NOT NULL Constraint Enforcement
-- ============================================================================
-- IMPORTANT: Only execute the block below once verifyCategoryMigrationIntegrity()
-- or the audit above confirms 0 unmigrated products. If run while category_id IS NULL
-- records exist, PostgreSQL will abort the transaction.
-- ============================================================================

/*
DO $$
DECLARE
    v_remaining_nulls INTEGER;
BEGIN
    SELECT COUNT(*) INTO v_remaining_nulls FROM products WHERE category_id IS NULL;

    IF v_remaining_nulls > 0 THEN
        RAISE EXCEPTION 'Cannot apply NOT NULL constraint: % products still have category_id IS NULL.', v_remaining_nulls;
    ELSE
        ALTER TABLE products ALTER COLUMN category_id SET NOT NULL;
        RAISE NOTICE 'Successfully applied NOT NULL constraint to products.category_id.';
    END IF;
END $$;
*/
