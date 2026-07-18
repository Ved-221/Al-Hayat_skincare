/**
 * /admin/(protected)/loading.tsx
 * ------------------------------
 * Skeleton loading state for the Admin Dashboard.
 * Matches the layout and dimensions of page.tsx to prevent layout shifts.
 */

export default function AdminDashboardLoading() {
  return (
    <div className="space-y-8 animate-pulse">
      {/* Header Skeleton */}
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="h-8 w-56 rounded-lg bg-gray-200" />
          <div className="mt-2 h-4 w-80 rounded bg-gray-100" />
        </div>
      </div>

      {/* 1. Statistics Cards Skeleton Grid (5 cards) */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {Array.from({ length: 5 }).map((_, index) => (
          <div
            key={index}
            className="flex flex-col justify-between rounded-xl border border-gray-200 bg-white p-5 shadow-xs sm:p-6"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="h-3 w-20 rounded bg-gray-200" />
                <div className="mt-3 h-7 w-16 rounded bg-gray-300" />
              </div>
              <div className="h-11 w-11 shrink-0 rounded-lg bg-gray-100" />
            </div>
            <div className="mt-4 flex items-center justify-between">
              <div className="h-3 w-28 rounded bg-gray-100" />
            </div>
          </div>
        ))}
      </div>

      {/* 2. Quick Actions Skeleton */}
      <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-xs sm:p-6">
        <div className="h-5 w-32 rounded bg-gray-200" />
        <div className="mt-1 h-3 w-64 rounded bg-gray-100" />
        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
          {Array.from({ length: 3 }).map((_, index) => (
            <div
              key={index}
              className="flex flex-col justify-between rounded-xl border border-gray-200 p-4"
            >
              <div className="flex items-start justify-between">
                <div className="h-10 w-10 rounded-lg bg-gray-100" />
                <div className="h-4 w-4 rounded bg-gray-100" />
              </div>
              <div className="mt-4">
                <div className="h-4 w-24 rounded bg-gray-200" />
                <div className="mt-2 h-3 w-full rounded bg-gray-100" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 3. Recent Orders & Low Stock Skeleton Grid */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3 items-stretch">
        {/* Recent Orders Table Skeleton */}
        <div className="lg:col-span-2 rounded-xl border border-gray-200 bg-white p-5 sm:p-6 shadow-xs">
          <div className="flex items-center justify-between border-b border-gray-100 pb-4">
            <div>
              <div className="h-5 w-32 rounded bg-gray-200" />
              <div className="mt-1 h-3 w-48 rounded bg-gray-100" />
            </div>
            <div className="h-3 w-16 rounded bg-gray-200" />
          </div>
          <div className="mt-4 space-y-3">
            {Array.from({ length: 5 }).map((_, index) => (
              <div
                key={index}
                className="flex items-center justify-between border-b border-gray-100 py-3 last:border-0"
              >
                <div className="h-4 w-16 rounded bg-gray-200" />
                <div className="h-4 w-28 rounded bg-gray-100" />
                <div className="h-5 w-20 rounded-full bg-gray-200" />
                <div className="h-4 w-16 rounded bg-gray-200" />
                <div className="h-6 w-12 rounded bg-gray-100" />
              </div>
            ))}
          </div>
        </div>

        {/* Low Stock Widget Skeleton */}
        <div className="lg:col-span-1 rounded-xl border border-gray-200 bg-white p-5 sm:p-6 shadow-xs">
          <div className="flex items-center justify-between border-b border-gray-100 pb-4">
            <div>
              <div className="h-5 w-28 rounded bg-gray-200" />
              <div className="mt-1 h-3 w-36 rounded bg-gray-100" />
            </div>
          </div>
          <div className="mt-4 space-y-3">
            {Array.from({ length: 4 }).map((_, index) => (
              <div
                key={index}
                className="flex items-center justify-between border-b border-gray-100 py-3 last:border-0"
              >
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-lg bg-gray-100" />
                  <div>
                    <div className="h-4 w-24 rounded bg-gray-200" />
                    <div className="mt-1 h-3 w-16 rounded bg-gray-100" />
                  </div>
                </div>
                <div className="h-5 w-20 rounded-full bg-gray-200" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 4. Recent Products & Activity Skeleton Grid */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3 items-stretch">
        <div className="lg:col-span-2 rounded-xl border border-gray-200 bg-white p-5 sm:p-6 shadow-xs">
          <div className="flex items-center justify-between border-b border-gray-100 pb-4">
            <div>
              <div className="h-5 w-32 rounded bg-gray-200" />
              <div className="mt-1 h-3 w-48 rounded bg-gray-100" />
            </div>
          </div>
          <div className="mt-4 space-y-3">
            {Array.from({ length: 5 }).map((_, index) => (
              <div
                key={index}
                className="flex items-center justify-between border-b border-gray-100 py-3 last:border-0"
              >
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-lg bg-gray-100" />
                  <div>
                    <div className="h-4 w-32 rounded bg-gray-200" />
                    <div className="mt-1 h-3 w-20 rounded bg-gray-100" />
                  </div>
                </div>
                <div className="h-4 w-16 rounded bg-gray-200" />
                <div className="h-6 w-16 rounded bg-gray-100" />
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-1 rounded-xl border border-gray-200 bg-white p-5 sm:p-6 shadow-xs">
          <div className="flex items-center justify-between border-b border-gray-100 pb-4">
            <div>
              <div className="h-5 w-32 rounded bg-gray-200" />
              <div className="mt-1 h-3 w-40 rounded bg-gray-100" />
            </div>
          </div>
          <div className="mt-4 space-y-4">
            {Array.from({ length: 5 }).map((_, index) => (
              <div key={index} className="flex items-start gap-3 py-2">
                <div className="h-9 w-9 rounded-lg bg-gray-100" />
                <div className="flex-1 space-y-1">
                  <div className="h-4 w-28 rounded bg-gray-200" />
                  <div className="h-3 w-full rounded bg-gray-100" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
