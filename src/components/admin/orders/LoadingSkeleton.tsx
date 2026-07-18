export default function LoadingSkeleton() {
  return (
    <div className="space-y-6">
      {/* Search and Filters Skeleton */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between rounded-xl border border-gray-200 bg-white p-4 shadow-xs">
        <div className="h-10 w-full max-w-md animate-pulse rounded-lg bg-gray-100" />
        <div className="flex gap-3">
          <div className="h-10 w-32 animate-pulse rounded-lg bg-gray-100" />
          <div className="h-10 w-32 animate-pulse rounded-lg bg-gray-100" />
        </div>
      </div>

      {/* Desktop Table Skeleton */}
      <div className="hidden md:block overflow-hidden rounded-xl border border-gray-200 bg-white">
        <table className="w-full border-collapse text-left text-sm">
          <thead>
            <tr className="border-b border-gray-200 bg-gray-50">
              <th className="py-3 px-4 h-10 w-24"><div className="h-4 w-12 animate-pulse rounded bg-gray-200" /></th>
              <th className="py-3 px-4 h-10"><div className="h-4 w-20 animate-pulse rounded bg-gray-200" /></th>
              <th className="py-3 px-4 h-10"><div className="h-4 w-16 animate-pulse rounded bg-gray-200" /></th>
              <th className="py-3 px-4 h-10"><div className="h-4 w-14 animate-pulse rounded bg-gray-200" /></th>
              <th className="py-3 px-4 h-10"><div className="h-4 w-16 animate-pulse rounded bg-gray-200" /></th>
              <th className="py-3 px-4 h-10"><div className="h-4 w-24 animate-pulse rounded bg-gray-200" /></th>
              <th className="py-3 px-4 h-10 text-right"><div className="h-4 w-12 ml-auto animate-pulse rounded bg-gray-200" /></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {Array.from({ length: 5 }).map((_, i) => (
              <tr key={i} className="h-16">
                {Array.from({ length: 7 }).map((_, j) => (
                  <td key={j} className="py-3 px-4">
                    <div className="h-4 w-3/4 animate-pulse rounded bg-gray-100" />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Card Skeleton */}
      <div className="block md:hidden space-y-4">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="rounded-xl border border-gray-200 bg-white p-5 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div className="h-4 w-20 animate-pulse rounded bg-gray-200" />
              <div className="h-6 w-16 animate-pulse rounded-full bg-gray-200" />
            </div>
            <div className="space-y-2">
              <div className="h-4 w-32 animate-pulse rounded bg-gray-100" />
              <div className="h-4 w-24 animate-pulse rounded bg-gray-100" />
            </div>
            <div className="flex items-center justify-between pt-2 border-t border-gray-100">
              <div className="h-4 w-16 animate-pulse rounded bg-gray-200" />
              <div className="h-8 w-16 animate-pulse rounded-lg bg-gray-200" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function OrderDetailsSkeleton() {
  return (
    <div className="space-y-6">
      {/* Header Skeleton */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-gray-100 pb-5">
        <div className="space-y-2">
          <div className="h-8 w-48 animate-pulse rounded bg-gray-200" />
          <div className="h-4 w-32 animate-pulse rounded bg-gray-100" />
        </div>
        <div className="h-10 w-36 animate-pulse rounded-lg bg-gray-200" />
      </div>

      {/* Grid Skeleton */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Left Col (Summary, Items) */}
        <div className="lg:col-span-2 space-y-6">
          {/* Items Skeleton */}
          <div className="rounded-xl border border-gray-200 bg-white p-6 space-y-4">
            <div className="h-6 w-32 animate-pulse rounded bg-gray-200" />
            <div className="space-y-3">
              {Array.from({ length: 2 }).map((_, i) => (
                <div key={i} className="flex gap-4 items-center">
                  <div className="h-12 w-12 animate-pulse rounded-lg bg-gray-200" />
                  <div className="flex-1 space-y-2">
                    <div className="h-4 w-1/3 animate-pulse rounded bg-gray-200" />
                    <div className="h-3 w-1/4 animate-pulse rounded bg-gray-100" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Pricing Summary Skeleton */}
          <div className="rounded-xl border border-gray-200 bg-white p-6 space-y-3">
            <div className="h-6 w-32 animate-pulse rounded bg-gray-200" />
            <div className="space-y-2 pt-2">
              <div className="flex justify-between"><div className="h-4 w-16 animate-pulse rounded bg-gray-100" /><div className="h-4 w-12 animate-pulse rounded bg-gray-100" /></div>
              <div className="flex justify-between"><div className="h-4 w-16 animate-pulse rounded bg-gray-100" /><div className="h-4 w-12 animate-pulse rounded bg-gray-100" /></div>
              <div className="flex justify-between font-bold pt-2 border-t border-gray-100"><div className="h-5 w-20 animate-pulse rounded bg-gray-200" /><div className="h-5 w-16 animate-pulse rounded bg-gray-200" /></div>
            </div>
          </div>
        </div>

        {/* Right Col (Customer Info, Timeline) */}
        <div className="space-y-6">
          {/* Customer Skeleton */}
          <div className="rounded-xl border border-gray-200 bg-white p-6 space-y-4">
            <div className="h-6 w-36 animate-pulse rounded bg-gray-200" />
            <div className="space-y-2">
              <div className="h-4 w-32 animate-pulse rounded bg-gray-100" />
              <div className="h-4 w-40 animate-pulse rounded bg-gray-100" />
            </div>
          </div>

          {/* Address Skeleton */}
          <div className="rounded-xl border border-gray-200 bg-white p-6 space-y-4">
            <div className="h-6 w-36 animate-pulse rounded bg-gray-200" />
            <div className="space-y-2">
              <div className="h-4 w-full animate-pulse rounded bg-gray-100" />
              <div className="h-4 w-2/3 animate-pulse rounded bg-gray-100" />
            </div>
          </div>

          {/* Timeline Skeleton */}
          <div className="rounded-xl border border-gray-200 bg-white p-6 space-y-4">
            <div className="h-6 w-36 animate-pulse rounded bg-gray-200" />
            <div className="space-y-3">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="flex gap-3">
                  <div className="h-4 w-4 animate-pulse rounded-full bg-gray-200 mt-1" />
                  <div className="space-y-2 flex-1">
                    <div className="h-4 w-20 animate-pulse rounded bg-gray-200" />
                    <div className="h-3 w-32 animate-pulse rounded bg-gray-100" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
