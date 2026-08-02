const fs = require('fs');
const path = require('path');

const applyFix = (filePath, search, replace) => {
  const fullPath = path.join(__dirname, filePath);
  if (fs.existsSync(fullPath)) {
    let content = fs.readFileSync(fullPath, 'utf8');
    if (typeof search === 'string') {
      content = content.split(search).join(replace);
    } else {
      content = content.replace(search, replace);
    }
    fs.writeFileSync(fullPath, content, 'utf8');
  }
};

// 1. DeleteCategoryDialog
applyFix('src/components/admin/categories/DeleteCategoryDialog.tsx', 
  /type "DELETE"/g, 
  'type &quot;DELETE&quot;');

// 2. TransferCategoryDialog
applyFix('src/components/admin/categories/TransferCategoryDialog.tsx', 
  /type "TRANSFER"/g, 
  'type &quot;TRANSFER&quot;');

// 3. OrderTimeline
applyFix('src/components/admin/orders/OrderTimeline.tsx', 
  /map\(\(event, index\) =>/g, 
  'map((event) =>');

// 4. SearchAndFilters
applyFix('src/components/admin/orders/SearchAndFilters.tsx', 
  /, \[searchQuery, statusFilter\]\);/g, 
  ', [searchQuery, statusFilter, initialSearch, updateParams]);');

// 5. DetailedBenefitBuilder
applyFix('src/components/admin/products/builders/DetailedBenefitBuilder.tsx', 
  /e\.g\., "Deep Hydration"/g, 
  'e.g., &quot;Deep Hydration&quot;');
applyFix('src/components/admin/products/builders/DetailedBenefitBuilder.tsx', 
  /e\.g\., "Penetrates deep into the skin's layers"/g, 
  'e.g., &quot;Penetrates deep into the skin&apos;s layers&quot;');

// 6. IngredientBuilder
applyFix('src/components/admin/products/builders/IngredientBuilder.tsx', 
  /import { useState, useEffect } from "react";/g, 
  'import { useState } from "react";');
applyFix('src/components/admin/products/builders/IngredientBuilder.tsx', 
  /e\.g\., "Rose"/g, 
  'e.g., &quot;Rose&quot;');
applyFix('src/components/admin/products/builders/IngredientBuilder.tsx', 
  /e\.g\., "Rosa Damascena"/g, 
  'e.g., &quot;Rosa Damascena&quot;');

// 7. RitualBuilder
applyFix('src/components/admin/products/builders/RitualBuilder.tsx', 
  /e\.g\., "Cleanse"/g, 
  'e.g., &quot;Cleanse&quot;');
applyFix('src/components/admin/products/builders/RitualBuilder.tsx', 
  /e\.g\., "Massage gently in circular motions"/g, 
  'e.g., &quot;Massage gently in circular motions&quot;');

// 8. ImagePreview
applyFix('src/components/admin/settings/ImagePreview.tsx', 
  `  useEffect(() => {\n    setHasError(false);\n  }, [url]);`, 
  '');
applyFix('src/components/admin/settings/ImagePreview.tsx', 
  /<img/g, 
  '<Image layout="fill" objectFit="cover" unoptimized');
applyFix('src/components/admin/settings/ImagePreview.tsx', 
  /import { useState, useEffect } from "react";/,
  'import { useState } from "react";\nimport Image from "next/image";');

// 9. SettingsForm
applyFix('src/components/admin/settings/SettingsForm.tsx', 
  /import ImagePreview from "\.\/ImagePreview";\n/g, 
  '');
applyFix('src/components/admin/settings/SettingsForm.tsx', 
  /const parseError = \(err: any\) =>/g, 
  'const parseError = (err: unknown) =>');
applyFix('src/components/admin/settings/SettingsForm.tsx', 
  /err\.message \|\|/g, 
  '(err instanceof Error ? err.message : "") ||');

// 10. CheckoutForm
applyFix('src/components/checkout/CheckoutForm.tsx', 
  /import { useCartStore } from "@\/store\/cartStore";\n/g, 
  '');

// 11. WhatsAppButton
applyFix('src/components/checkout/WhatsAppButton.tsx', 
  /import { useEffect, useState } from "react";\n/g, 
  '');

// 12. CategoryProductsGrid
applyFix('src/components/storefront/categories/CategoryProductsGrid.tsx', 
  /import Link from "next\/link";\n/g, 
  '');
applyFix('src/components/storefront/categories/CategoryProductsGrid.tsx', 
  /const addItem = useCartStore\(\(state\) => state\.addItem\);\n/g, 
  '');

// 13. auth.ts
applyFix('src/lib/auth.ts', 
  /const { data: userData, error: userError }/g, 
  'const { data: userData }');
applyFix('src/lib/auth.ts', 
  /const { data: adminData, error: adminError }/g, 
  'const { data: adminData }');

// 14. proxy.ts
applyFix('src/proxy.ts', 
  /export async function proxyRequest\(url: string, options\?: RequestInit\) {/g, 
  'export async function proxyRequest(url: string, _options?: RequestInit) {');

// 15. orderService
applyFix('src/services/orderService.ts', 
  /DashboardOrderPreview, /g, 
  '');

console.log('Done applying lint fixes.');
