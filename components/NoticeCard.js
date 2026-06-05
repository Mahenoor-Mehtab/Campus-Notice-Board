 import Link from 'next/link'
import { format, isPast } from 'date-fns'

export default function NoticeCard({ notice, onDelete }) {
  const isExpired = isPast(new Date(notice.publishDate))
  const isUrgent = notice.priority === 'Urgent'
  const isUpdated = notice.updatedAt !== notice.createdAt

  return (
    <div className={`
      bg-white rounded-lg shadow-sm border-l-4 p-5 relative
      ${isExpired ? 'opacity-60 bg-gray-50' : ''}
      ${isUrgent ? 'border-l-red-500' : 'border-l-blue-500'}
    `}>

      {/* Top Badges */}
      <div className="flex items-center gap-2 mb-2">
        {isUrgent && (
          <span className="bg-red-100 text-red-600 text-xs font-bold px-2 py-0.5 rounded">
            URGENT
          </span>
        )}
        {isExpired && (
          <span className="bg-gray-100 text-gray-500 text-xs font-medium px-2 py-0.5 rounded">
            Expired
          </span>
        )}
        {isUpdated && !isExpired && (
          <span className="bg-blue-50 text-blue-500 text-xs font-medium px-2 py-0.5 rounded">
            Updated
          </span>
        )}
      </div>

      {/* Title */}
      <h2 className="text-base font-bold text-gray-900 mb-1">{notice.title}</h2>

      {/* Body */}
      <p className="text-sm text-gray-500 mb-4 line-clamp-2">{notice.body}</p>

      {/* Bottom Row */}
      <div className="flex items-center justify-between">
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