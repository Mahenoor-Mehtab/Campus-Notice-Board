import { useState } from 'react'
import { useRouter } from 'next/router' // 1. Router import kiya redirect karne ke liye
import useSWR, { mutate } from 'swr'
import toast, { Toaster } from 'react-hot-toast'
import Navbar from '../components/Navbar'
import NoticeCard from '../components/NoticeCard'
import SkeletonCard from '../components/SkeletonCard'
import DeleteModal from '../components/DeleteModal'

const fetcher = (url) => fetch(url).then((r) => r.json())

export default function Home() {
  const router = useRouter() // 2. Router initialize kiya
  const { data: notices, isLoading } = useSWR('/api/notices', fetcher)
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('All')
  const [deleteTarget, setDeleteTarget] = useState(null)

  // Filter notices
  const filtered = (notices || []).filter((n) => {
    const matchSearch = n.title.toLowerCase().includes(search.toLowerCase())
    const matchCategory = category === 'All' || n.category === category
    return matchSearch && matchCategory
  })

  // Counts
  const total = (notices || []).length
  const urgent = (notices || []).filter((n) => n.priority === 'Urgent').length
  const normal = total - urgent

  // Delete handler
  async function handleDelete() {
    try {
      const res = await fetch(`/api/notices/${deleteTarget.id}`, {
        method: 'DELETE'
      })
      if (!res.ok) throw new Error()
      toast.success('Notice deleted!')
      mutate('/api/notices')
    } catch {
      toast.error('Failed to delete')
    } finally {
      setDeleteTarget(null)
    }
  }

  const categories = ['All', 'Exam', 'Event', 'General']

  return (
    <div className="min-h-screen bg-white">
      <Toaster position="top-right" />
      <Navbar />

      {/* Notice Count Bar */}
      <div className="bg-gray-50 border-b border-gray-100 px-4 py-2">
        <div className="max-w-6xl mx-auto text-sm text-gray-500">
          {isLoading ? 'Loading...' : (
            <span>
              <span className="font-medium text-gray-700">{total}</span> Notices &nbsp;•&nbsp;
              <span className="font-medium text-red-500">{urgent}</span> Urgent &nbsp;•&nbsp;
              <span className="font-medium text-blue-500">{normal}</span> Normal
            </span>
          )}
        </div>
      </div>

      {/* Search + Filter */}
      <div className="max-w-6xl mx-auto px-4 py-5 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">

        {/* Search */}
        <div className="relative w-full sm:w-72">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">🔍</span>
          <input
            type="text"
            placeholder="Search notices..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-gray-100 border-none rounded-md pl-9 pr-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-200"
          />
        </div>

        {/* Category Tabs */}
        <div className="flex gap-1">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`px-3 py-1.5 text-sm rounded-md font-medium transition ${
                category === cat
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-500 hover:bg-gray-100'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Cards Grid */}
      <div className="max-w-6xl mx-auto px-4 pb-10">
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[...Array(6)].map((_, i) => <SkeletonCard key={i} />)}
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20 text-gray-400">
            <p className="text-4xl mb-3">📭</p>
            <p className="text-sm">No notices found</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map((notice) => (
              <NoticeCard
                key={notice.id}
                notice={notice}
                onDelete={setDeleteTarget}
              />
            ))}
          </div>
        )}
      </div>

      {/* Delete Modal */}
      <DeleteModal
        notice={deleteTarget}
        onConfirm={handleDelete}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  )
}