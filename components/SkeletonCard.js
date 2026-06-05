 export default function SkeletonCard() {
  return (
    <div className="bg-white rounded-lg shadow-sm border-l-4 border-l-gray-200 p-5 animate-pulse">
      
      {/* Badge placeholder */}
      <div className="h-4 w-16 bg-gray-200 rounded mb-3" />

      {/* Title placeholder */}
      <div className="h-5 w-3/4 bg-gray-200 rounded mb-2" />

      {/* Body placeholder */}
      <div className="space-y-2 mb-4">
        <div className="h-3 w-full bg-gray-100 rounded" />
        <div className="h-3 w-5/6 bg-gray-100 rounded" />
      </div>

      {/* Bottom row placeholder */}
      <div className="flex items-center justify-between">
        <div className="flex gap-2">
          <div className="h-4 w-14 bg-gray-100 rounded" />
          <div className="h-4 w-20 bg-gray-100 rounded" />
        </div>
        <div className="flex gap-3">
          <div className="h-5 w-5 bg-gray-100 rounded" />
          <div className="h-5 w-5 bg-gray-100 rounded" />
        </div>
      </div>

    </div>
  )
}