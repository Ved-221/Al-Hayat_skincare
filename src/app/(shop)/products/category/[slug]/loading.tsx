export default function CategoryPageLoading() {
  return (
    <div className="min-h-screen bg-[#faf3ea] pb-24 animate-pulse">
      {/* Breadcrumb skeleton */}
      <div className="w-full py-4 px-6 max-w-7xl mx-auto flex items-center gap-2">
        <div className="h-4 w-12 bg-[#EAE2D1] rounded" />
        <div className="h-4 w-4 bg-[#EAE2D1] rounded" />
        <div className="h-4 w-16 bg-[#EAE2D1] rounded" />
        <div className="h-4 w-4 bg-[#EAE2D1] rounded" />
        <div className="h-4 w-24 bg-[#EAE2D1] rounded" />
      </div>

      {/* Hero Banner Skeleton */}
      <div className="w-full min-h-[260px] sm:min-h-[320px] bg-[#EAE2D1] flex flex-col items-center justify-center p-6 space-y-4">
        <div className="h-6 w-36 bg-[#D8CEBA] rounded-full" />
        <div className="h-10 sm:h-12 w-64 sm:w-96 bg-[#D8CEBA] rounded-xl" />
        <div className="h-4 w-48 sm:w-80 bg-[#D8CEBA] rounded" />
      </div>

      {/* Grid Skeleton */}
      <div className="max-w-7xl mx-auto px-6 pt-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
            <div key={i} className="bg-white rounded-2xl overflow-hidden p-4 space-y-3 border border-gray-200/40">
              <div className="w-full aspect-square bg-[#EAE2D1] rounded-xl" />
              <div className="h-3 w-16 bg-[#EAE2D1] rounded" />
              <div className="h-5 w-3/4 bg-[#EAE2D1] rounded" />
              <div className="h-4 w-full bg-[#EAE2D1] rounded" />
              <div className="h-6 w-20 bg-[#EAE2D1] rounded pt-2" />
              <div className="h-10 w-full bg-[#EAE2D1] rounded-xl" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
