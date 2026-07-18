import Link from "next/link";

interface CategoryEmptyStateProps {
  categoryName?: string;
}

export default function CategoryEmptyState({ categoryName }: CategoryEmptyStateProps) {
  return (
    <div className="w-full py-20 px-6 text-center max-w-xl mx-auto rounded-3xl bg-white/80 border border-gray-200/50 shadow-xs my-8">
      <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[#EAE2D1] flex items-center justify-center text-[#434b01]">
        <span className="material-symbols-outlined text-3xl">inventory_2</span>
      </div>

      <h3
        className="text-xl sm:text-2xl font-bold text-[#434b01] mb-2 tracking-tight"
        style={{ fontFamily: "'Playfair Display', serif" }}
      >
        No products found{categoryName ? ` in ${categoryName}` : ""}
      </h3>

      <p
        className="text-xs sm:text-sm text-[#47483a] mb-6 max-w-md mx-auto leading-relaxed"
        style={{ fontFamily: "'Inter', sans-serif" }}
      >
        We are currently updating our botanical formulation batch or restock is in progress. Please explore our other natural skincare essentials.
      </p>

      <Link
        href="/products"
        className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#434b01] text-white text-xs font-bold tracking-wider uppercase shadow-sm hover:bg-[#343a01] transition-all duration-200 transform hover:-translate-y-0.5"
        style={{ fontFamily: "'Inter', sans-serif" }}
      >
        <span>Browse All Products</span>
        <span className="material-symbols-outlined text-sm">arrow_forward</span>
      </Link>
    </div>
  );
}
