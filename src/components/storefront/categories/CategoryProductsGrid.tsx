"use client";


import type { Product } from "@/data/products";
import CategoryEmptyState from "./CategoryEmptyState";
import { ProductRevealCard } from "@/components/ProductRevealCard";

interface CategoryProductsGridProps {
  products: Product[];
  categoryName?: string;
}

export default function CategoryProductsGrid({
  products,
  categoryName,
}: CategoryProductsGridProps) {
  if (!products || products.length === 0) {
    return <CategoryEmptyState categoryName={categoryName} />;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {products.map((product) => (
        <ProductRevealCard key={product.slug} product={product} />
      ))}
    </div>
  );
}
