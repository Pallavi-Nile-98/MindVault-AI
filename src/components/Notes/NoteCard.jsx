import { useState } from 'react'
import { deleteNote } from '../../services/notesService'

const NoteCard = ({ note, onEdit, onDelete }) => {
  const [isDeleting, setIsDeleting] = useState(false)

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this note?')) {
      return
    }

    setIsDeleting(true)
    try {
      await deleteNote(note.id)
      if (onDelete) {
        onDelete()
      }
    } catch (error) {
      console.error('Error deleting note:', error)
      alert('Failed to delete note. Please try again.')
    } finally {
      setIsDeleting(false)
    }
  }

  const handleSummarize = async () => {
    // TODO: Call Firebase Function to summarize note
    console.log('Summarize note:', note.id)
  }

  const formatDate = (timestamp) => {
    if (!timestamp) return 'No date'
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp)
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    })
  }

  const truncateContent = (content, maxLength = 150) => {
    if (content.length <= maxLength) return content
    return content.substring(0, maxLength) + '...'
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-2">
        <h3 className="text-lg font-semibold text-gray-900 flex-1">
          {note.title || 'Untitled Note'}
        </h3>
        <div className="flex space-x-2 ml-2">
          <button
            onClick={() => onEdit(note)}
            className="text-gray-400 hover:text-primary-600 transition-colors"
            title="Edit note"
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
          </button>
          <button
            onClick={handleDelete}
            disabled={isDeleting}
            className="text-gray-400 hover:text-red-600 transition-colors disabled:opacity-50"
            title="Delete note"
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </div>
      </div>

      <p className="text-sm text-gray-600 mb-3 line-clamp-3">
        {truncateContent(note.content || '')}
      </p>

      <div className="flex items-center justify-between pt-3 border-t border-gray-100">
        <span className="text-xs text-gray-500">
          {formatDate(note.updatedAt || note.createdAt)}
        </span>
        <button
          onClick={handleSummarize}
          className="text-xs px-2 py-1 bg-primary-50 text-primary-700 rounded hover:bg-primary-100 transition-colors"
        >
          Summarize
        </button>
      </div>
    </div>
  )
}

export default NoteCard
