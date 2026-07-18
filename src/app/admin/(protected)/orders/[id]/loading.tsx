import { OrderDetailsSkeleton } from "@/components/admin/orders/LoadingSkeleton";
import Link from "next/link";

export default function Loading() {
  return (
    <div className="space-y-6 p-4 sm:p-6 max-w-7xl mx-auto">
      {/* Back Link */}
      <div>
        <Link
          href="/admin/orders"
          className="inline-flex items-center gap-1 text-xs font-semibold text-gray-400 cursor-not-allowed select-none"
        >
          <span className="material-symbols-outlined text-sm">arrow_back</span>
          <span>Back to Orders</span>
        </Link>
      </div>

      <OrderDetailsSkeleton />
    </div>
  );
}
