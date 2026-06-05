import { useState } from 'react'
import { useRouter } from 'next/router'
import toast, { Toaster } from 'react-hot-toast'
import Navbar from '../../components/Navbar'

export default function NewNotice() {
  const router = useRouter()

  // Form states with default values
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')
  const [category, setCategory] = useState('General')
  const [priority, setPriority] = useState('Normal')
  const [publishDate, setPublishDate] = useState('')
  const [imageUrl, setImageUrl] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Handle Form Submission (POST)
  async function handleSubmit(e) {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const res = await fetch('/api/notices', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, body, category, priority, publishDate, imageUrl }),
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error || 'Failed to create notice')
      }

      toast.success('Notice published successfully! 🎉')
      
      setTimeout(() => {
        router.push('/')
      }, 1500)
    } catch (err) {
      toast.error(err.message || 'Something went wrong')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <Toaster position="top-right" />
      <Navbar />

      <div className="max-w-2xl mx-auto px-4 py-10">
        {/* Back Button */}
        <button
          onClick={() => router.push('/')}
          className="mb-6 flex items-center text-sm text-gray-700 hover:text-gray-900 font-bold transition"
        >
          ← Back to Dashboard
        </button>

        {/* Form Container */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 sm:p-8">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-900">Add New Notice</h1>
            <p className="text-sm text-gray-700 mt-1">Fill in the details below to broadcast a new campus notice.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Title */}
            <div>
              <label className="block text-sm font-bold text-gray-800 mb-1">Notice Title *</label>
              <input
                type="text"
                required
                placeholder="e.g., Summer Vacation Announcement 2026"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm text-gray-900 placeholder-gray-500 font-medium focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-600 transition"
              />
            </div>

            {/* Body */}
            <div>
              <label className="block text-sm font-bold text-gray-800 mb-1">Notice Content *</label>
              <textarea
                required
                rows={6}
                placeholder="Write the complete notice description or instructions here..."
                value={body}
                onChange={(e) => setBody(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm text-gray-900 placeholder-gray-500 font-medium focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-600 transition"
              />
            </div>

            {/* Category & Priority Dropdowns */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-bold text-gray-800 mb-1">Category *</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm text-gray-900 bg-white font-bold focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-600 transition"
                >
                  <option value="General" className="text-gray-900 font-medium">General</option>
                  <option value="Exam" className="text-gray-900 font-medium">Exam</option>
                  <option value="Event" className="text-gray-900 font-medium">Event</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-800 mb-1">Priority Level *</label>
                <select
                  value={priority}
                  onChange={(e) => setPriority(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm text-gray-900 bg-white font-bold focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-600 transition"
                >
                  <option value="Normal" className="text-gray-900 font-medium">Normal</option>
                  <option value="Urgent" className="text-gray-900 font-medium">Urgent</option>
                </select>
              </div>
            </div>

            {/* Publish Date & Image URL */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-bold text-gray-800 mb-1">Publish Date *</label>
                <input
                  type="date"
                  required
                  value={publishDate}
                  onChange={(e) => setPublishDate(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm text-gray-900 font-medium focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-600 transition"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-800 mb-1">Image URL (Optional)</label>
                <input
                  type="url"
                  placeholder="https://example.com/banner.png"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm text-gray-900 placeholder-gray-500 font-medium focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-600 transition"
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
              <button
                type="button"
                onClick={() => router.push('/')}
                disabled={isSubmitting}
                className="px-4 py-2 text-sm font-bold text-gray-700 hover:text-gray-950 disabled:opacity-50 transition"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-5 py-2.5 bg-blue-600 text-white font-bold text-sm rounded-lg hover:bg-blue-700 transition shadow-sm disabled:opacity-50"
              >
                {isSubmitting ? 'Publishing...' : 'Publish Notice'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}