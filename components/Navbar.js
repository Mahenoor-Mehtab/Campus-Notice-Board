 import Link from 'next/link'

export default function Navbar() {
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <h1 className="text-xl font-bold text-gray-900">📋 Notice Board</h1>
        <Link href="/notices/new">
          <button className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-4 py-2 rounded-md transition">
            + Add Notice
          </button>
        </Link>
      </div>
    </header>
  )
}