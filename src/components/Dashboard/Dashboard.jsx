import { useState } from 'react'
import NoteList from '../Notes/NoteList'
import NoteForm from '../Notes/NoteForm'
import AIChat from '../AI/AIChat'

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('notes') // 'notes' or 'ai'
  const [selectedNote, setSelectedNote] = useState(null)
  const [showNoteForm, setShowNoteForm] = useState(false)
  const [refreshTrigger, setRefreshTrigger] = useState(0)

  const handleCreateNote = () => {
    setSelectedNote(null)
    setShowNoteForm(true)
  }

  const handleEditNote = (note) => {
    setSelectedNote(note)
    setShowNoteForm(true)
  }

  const handleCloseForm = () => {
    setShowNoteForm(false)
    setSelectedNote(null)
  }

  const handleNoteSaved = () => {
    handleCloseForm()
    setRefreshTrigger((prev) => prev + 1)
  }

  const handleNoteDeleted = () => {
    setRefreshTrigger((prev) => prev + 1)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Dashboard</h2>
          <p className="mt-1 text-sm text-gray-600">
            Manage your notes and ask questions with AI
          </p>
        </div>
        {activeTab === 'notes' && (
          <button
            onClick={handleCreateNote}
            className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 transition-colors"
          >
            + New Note
          </button>
        )}
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setActiveTab('notes')}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'notes'
                ? 'border-primary-500 text-primary-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            My Notes
          </button>
          <button
            onClick={() => setActiveTab('ai')}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'ai'
                ? 'border-primary-500 text-primary-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            AI Assistant
          </button>
        </nav>
      </div>

      {/* Content */}
      <div className="mt-6">
        {activeTab === 'notes' ? (
          <NoteList 
            onEditNote={handleEditNote} 
            onDelete={handleNoteDeleted}
            refreshTrigger={refreshTrigger}
          />
        ) : (
          <AIChat />
        )}
      </div>

      {/* Note Form Modal */}
      {showNoteForm && (
        <NoteForm
          note={selectedNote}
          onClose={handleCloseForm}
          onSave={handleNoteSaved}
        />
      )}
    </div>
  )
}

export default Dashboard
