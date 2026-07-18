import LoadingSkeleton from "@/components/admin/orders/LoadingSkeleton";

export default function Loading() {
  return (
    <div className="space-y-6 p-4 sm:p-6 max-w-7xl mx-auto">
      {/* Page Header Skeleton */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between pb-2">
        <div className="space-y-2">
          <div className="h-8 w-48 animate-pulse rounded bg-gray-200" />
          <div className="h-4 w-64 animate-pulse rounded bg-gray-150" />
        </div>
        <div className="h-10 w-32 animate-pulse rounded-lg bg-gray-200" />
      </div>

      <LoadingSkeleton />
    </div>
  );
}
