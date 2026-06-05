 export default function DeleteModal({ notice, onConfirm, onCancel }) {
  if (!notice) return null

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-sm w-full mx-4">

        {/* Icon */}
        <div className="text-center mb-4">
          <span className="text-4xl">🗑️</span>
        </div>

        {/* Text */}
        <h2 className="text-lg font-bold text-gray-900 text-center mb-1">
          Delete Notice?
        </h2>
        <p className="text-sm text-gray-500 text-center mb-6">
          <span className="font-medium text-gray-700">"{notice.title}"</span> permanently delete ho jayegi. Ye action undo nahi hogi.
        </p>

        {/* Buttons */}
        <div className="flex gap-3">
          <button
            onClick={onCancel}
            className="flex-1 border border-gray-200 text-gray-600 text-sm font-medium py-2 rounded-md hover:bg-gray-50 transition"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 bg-red-500 hover:bg-red-600 text-white text-sm font-medium py-2 rounded-md transition"
          >
            Delete
          </button>
        </div>

      </div>
    </div>
  )
}