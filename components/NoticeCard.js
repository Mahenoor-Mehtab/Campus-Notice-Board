import Link from 'next/link'
import { format } from 'date-fns'

export default function NoticeCard({ notice, onDelete }) {
  const isUrgent = notice.priority === 'Urgent'
  const isUpdated = notice.updatedAt !== notice.createdAt

  return (
    <div className={`
      bg-white rounded-lg shadow-sm border-l-4 p-5 relative flex flex-col justify-between h-full
      ${isUrgent ? 'border-l-red-500' : 'border-l-blue-500'}
    `}>
      <div>
        {/* Top Badges */}
        <div className="flex items-center gap-2 mb-2">
          {isUrgent && (
            <span className="bg-red-100 text-red-600 text-xs font-bold px-2 py-0.5 rounded">
              URGENT
            </span>
          )}
          {isUpdated && (
            <span className="bg-blue-50 text-blue-500 text-xs font-medium px-2 py-0.5 rounded">
              Updated
            </span>
          )}
        </div>

        {/* 🔥 BONUS: Image Rendering */}
{notice.imageUrl && notice.imageUrl.trim() !== "" ? (
  <div className="mb-3 w-full h-40 relative rounded-md overflow-hidden bg-gray-100">
    <img 
      src={notice.imageUrl} 
      alt={notice.title} 
      className="w-full h-full object-cover"
      onError={(e) => { 
        e.target.src = 'https://placehold.co/600x400/f3f4f6/2563eb?text=Notice'; 
      }} 
    />
  </div>
) : (
  <div className="mb-3 w-full h-40 relative rounded-md overflow-hidden bg-gray-100">
    <img 
      src="https://placehold.co/600x400/f3f4f6/2563eb?text=Notice" 
      alt="Default Notice" 
      className="w-full h-full object-cover"
    />
  </div>
)}

        {/* Title */}
        <h2 className="text-base font-bold text-gray-900 mb-1">{notice.title}</h2>

        {/* Body */}
        <p className="text-sm text-gray-500 mb-4 line-clamp-3">{notice.body}</p>
      </div>

      {/* Bottom Row */}
      <div className="flex items-center justify-between mt-auto pt-2 border-t border-gray-50">
        <div className="flex items-center gap-2">
          <span className="bg-gray-100 text-gray-600 text-xs px-2 py-0.5 rounded">
            {notice.category}
          </span>
          <span className="text-xs text-gray-400">
            {format(new Date(notice.publishDate), 'dd MMM yyyy')}
          </span>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <Link href={`/notices/${notice.id}/edit`}>
            <button className="text-gray-400 hover:text-blue-600 transition" title="Edit">
              ✏️
            </button>
          </Link>
          <button
            onClick={() => onDelete(notice)}
            className="text-gray-400 hover:text-red-500 transition"
            title="Delete"
          >
            🗑️
          </button>
        </div>
      </div>
    </div>
  )
}