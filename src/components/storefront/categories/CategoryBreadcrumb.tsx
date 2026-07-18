import Link from "next/link";

interface CategoryBreadcrumbProps {
  categoryName: string;
}

export default function CategoryBreadcrumb({ categoryName }: CategoryBreadcrumbProps) {
  return (
    <nav aria-label="Breadcrumb" className="w-full py-4 px-6 max-w-7xl mx-auto">
      <ol
        className="flex items-center space-x-2 text-xs text-[#47483a]/80"
        style={{ fontFamily: "'Inter', sans-serif" }}
      >
        <li>
          <Link href="/" className="hover:text-[#b22a2b] transition-colors font-medium">
            Home
          </Link>
        </li>
        <li>
          <span className="text-gray-400">/</span>
        </li>
        <li>
          <Link href="/products" className="hover:text-[#b22a2b] transition-colors font-medium">
            Products
          </Link>
        </li>
        <li>
          <span className="text-gray-400">/</span>
        </li>
        <li className="font-bold text-[#434b01] truncate max-w-[200px] sm:max-w-none" aria-current="page">
          {categoryName}
        </li>
      </ol>
    </nav>
  );
}
