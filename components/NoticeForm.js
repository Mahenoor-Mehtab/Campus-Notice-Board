 import { useState } from 'react'
import { useRouter } from 'next/router'
import toast from 'react-hot-toast'

export default function NoticeForm({ initialData }) {
  const router = useRouter()
  const isEditing = !!initialData

  const [form, setForm] = useState({
    title: initialData?.title || '',
    body: initialData?.body || '',
    category: initialData?.category || 'General',
    priority: initialData?.priority || 'Normal',
    publishDate: initialData?.publishDate
      ? new Date(initialData.publishDate).toISOString().split('T')[0]
      : '',
    imageUrl: initialData?.imageUrl || ''
  })

  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)

  function validate() {
    const e = {}
    if (!form.title.trim()) e.title = 'Title is required'
    if (!form.body.trim()) e.body = 'Body is required'
    if (!form.publishDate) e.publishDate = 'Date is required'
    return e
  }

  async function handleSubmit(e) {
    e.preventDefault()
    const e2 = validate()
    if (Object.keys(e2).length > 0) {
      setErrors(e2)
      return
    }

    setLoading(true)
    try {
      const url = isEditing
        ? `/api/notices/${initialData.id}`
        : '/api/notices'
      const method = isEditing ? 'PUT' : 'POST'

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      })

      const data = await res.json()

      if (!res.ok) {
        toast.error(data.error || 'Something went wrong')
        return
      }

      toast.success(isEditing ? 'Notice updated!' : 'Notice created!')
      router.push('/')
    } catch (err) {
      toast.error('Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  function handleChange(e) {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }))
  }

  return (
    <div className="min-h-screen bg-white px-4 py-10">
      <div className="max-w-xl mx-auto">

        {/* Header */}
        <h1 className="text-2xl font-bold text-gray-900 mb-8">
          {isEditing ? 'Edit Notice' : 'Add New Notice'}
        </h1>

        <form onSubmit={handleSubmit} className="space-y-5">

          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Title <span className="text-red-500">*</span>
            </label>
            <input
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="Notice title"
              className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm text-gray-900 focus:outline-none focus:border-blue-500"
            />
            {errors.title && (
              <p className="text-red-500 text-xs mt-1">{errors.title}</p>
            )}
          </div>

          {/* Body */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Body <span className="text-red-500">*</span>
            </label>
            <textarea
              name="body"
              value={form.body}
              onChange={handleChange}
              placeholder="Notice details..."
              rows={4}
              className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm text-gray-900 focus:outline-none focus:border-blue-500 resize-none"
            />
            {errors.body && (
              <p className="text-red-500 text-xs mt-1">{errors.body}</p>
            )}
          </div>

          {/* Category + Priority */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Category
              </label>
              <select
                name="category"
                value={form.category}
                onChange={handleChange}
                className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm text-gray-900 focus:outline-none focus:border-blue-500"
              >
                <option>General</option>
                <option>Exam</option>
                <option>Event</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Priority
              </label>
              <select
                name="priority"
                value={form.priority}
                onChange={handleChange}
                className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm text-gray-900 focus:outline-none focus:border-blue-500"
              >
                <option>Normal</option>
                <option>Urgent</option>
              </select>
            </div>
          </div>

          {/* Date */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Publish Date <span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              name="publishDate"
              value={form.publishDate}
              onChange={handleChange}
              className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm text-gray-900 focus:outline-none focus:border-blue-500"
            />
            {errors.publishDate && (
              <p className="text-red-500 text-xs mt-1">{errors.publishDate}</p>
            )}
          </div>

          {/* Image URL (optional) */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Image URL <span className="text-gray-400 font-normal">(optional)</span>
            </label>
            <input
              name="imageUrl"
              value={form.imageUrl}
              onChange={handleChange}
              placeholder="https://..."
              className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm text-gray-900 focus:outline-none focus:border-blue-500"
            />
          </div>

          {/* Buttons */}
          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={() => router.push('/')}
              className="flex-1 border border-gray-200 text-gray-600 text-sm font-medium py-2 rounded-md hover:bg-gray-50 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium py-2 rounded-md transition disabled:opacity-50"
            >
              {loading ? 'Saving...' : isEditing ? 'Update Notice' : 'Add Notice'}
            </button>
          </div>

        </form>
      </div>
    </div>
  )
}